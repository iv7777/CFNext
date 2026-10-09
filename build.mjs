#!/usr/bin/env node
// 构建脚本：把 src/ 下的源文件合并为可直接粘贴部署的单文件 Hopline.js
//
//   node build.mjs          生成 Hopline.js、dist/panel.html 与 dist/clash-template.yaml
//   node build.mjs --check  仅校验这三个产物是否与 src/ 同步（CI 使用，不同步时退出码 1）
//
// 处理流程：
//   1. 合并 src/worker.js 中的  // @include worker/xxx.js  （保持模块级顺序，保留注释与原始名称）
//   2. 把登录页内联进 worker；面板 HTML / CSS / JS 合并成 dist/panel.html（按语言各自去掉注释，保留 @HOPLINE_ 占位注释），
//      它不再内嵌进 Worker：Worker 运行时按版本标签 v<VERSION> 从 jsDelivr / GitHub 拉取并校验 SHA-256，
//      该哈希在此处计算并写进 Worker（/* @panel-sha256 */ 占位）
//   3. Clash 配置模板 src/worker/clash-template.yaml 同样不内嵌：原样复制为 dist/clash-template.yaml，
//      Worker 运行时按版本标签拉取并校验 SHA-256（/* @clash-sha256 */ 占位）
//   4. 顶部加一行版本横幅 /*!Hopline vX.Y.Z*/，供旧版「检测更新」从远端文件解析版本号
//
// Hopline.js 不再经 terser 压缩/重命名：内容即 src/ 原样拼接（如需混淆发布，见 obfuscate.mjs）。
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'Hopline.js');
const PANEL_OUT = join(ROOT, 'dist', 'panel.html');   // 面板页面成品：按版本标签发布，由 Worker 运行时拉取
const CLASH_SRC = join(SRC, 'worker', 'clash-template.yaml');
const CLASH_OUT = join(ROOT, 'dist', 'clash-template.yaml');   // Clash 配置模板成品：同上
const KEEP_COMMENT = /@HOPLINE_/;          // 内联面板代码时唯一保留的注释（运行时占位符）

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
}

// --- 去注释（保留 KEEP_COMMENT，其余原样保留空白与换行，不改变代码布局） -------------

// JavaScript：逐字符扫描，正确跳过字符串与正则字面量，避免误删其中的 // 与 /*
const REGEX_KW = new Set(['return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete',
  'void', 'throw', 'else', 'do', 'yield', 'case', 'await']);
function stripJsComments(code) {
  const n = code.length;
  let out = '', i = 0, prevChar = '', prevWord = '', word = '';
  const markWord = (ch) => {
    if (/[\w$]/.test(ch)) { word += ch; } else { if (word) prevWord = word; word = ''; }
    if (!/\s/.test(ch)) prevChar = ch;
  };
  const emit = (s) => { for (const ch of s) markWord(ch); out += s; };
  while (i < n) {
    const c = code[i], d = code[i + 1];
    if (c === '/' && d === '/') {                       // 行注释
      let j = i + 2; while (j < n && code[j] !== '\n') j++;
      const text = code.slice(i, j);
      if (KEEP_COMMENT.test(text)) out += text;
      i = j; continue;
    }
    if (c === '/' && d === '*') {                       // 块注释
      let j = i + 2; while (j < n && !(code[j] === '*' && code[j + 1] === '/')) j++;
      j = Math.min(n, j + 2);
      const text = code.slice(i, j);
      if (KEEP_COMMENT.test(text)) out += text;         // 占位注释原样保留（含紧邻的 null）
      i = j; continue;
    }
    if (c === '"' || c === "'") {                       // 字符串
      let j = i + 1;
      while (j < n) { const e = code[j]; if (e === '\\') { j += 2; continue; } if (e === c) { j++; break; } if (e === '\n') break; j++; }
      emit(code.slice(i, j)); i = j; continue;
    }
    if (c === '`') {                                    // 模板字符串（面板无，稳妥起见仍处理）
      let j = i + 1;
      while (j < n) { const e = code[j]; if (e === '\\') { j += 2; continue; } if (e === '`') { j++; break; } j++; }
      emit(code.slice(i, j)); i = j; continue;
    }
    if (c === '/') {                                    // 正则字面量 or 除号
      let valueEnding;
      if (/[)\]}]/.test(prevChar)) valueEnding = true;
      else if (/[\w$]/.test(prevChar)) valueEnding = !REGEX_KW.has(prevWord);
      else valueEnding = false;
      if (!valueEnding) {
        let j = i + 1, inClass = false;
        while (j < n) { const e = code[j]; if (e === '\\') { j += 2; continue; } if (e === '[') inClass = true; else if (e === ']') inClass = false; else if (e === '/' && !inClass) { j++; break; } else if (e === '\n') break; j++; }
        emit(code.slice(i, j)); i = j; continue;
      }
    }
    emit(c); i++;
  }
  return out;
}
function stripCssComments(code) { return code.replace(/\/\*[\s\S]*?\*\//g, ''); }
function stripHtmlComments(code) { return code.replace(/<!--[\s\S]*?-->/g, ''); }

// --- 面板文件：按扩展名去注释，再展开其中的 @include（子文件已按自身类型去注释） ----------
function loadPanel(file) {
  const dir = dirname(file);
  let text = read(file);
  if (file.endsWith('.js')) text = stripJsComments(text);
  else if (file.endsWith('.css')) text = stripCssComments(text);
  else if (file.endsWith('.html')) text = stripHtmlComments(text);
  return text.replace(/^[ \t]*@include[ \t]+(\S+)[ \t]*\n/gm, (_, name) => {
    const inc = join(dir, name);
    if (!existsSync(inc)) throw new Error(`${file}: @include 的文件不存在：${name}`);
    const child = loadPanel(inc);
    return child.endsWith('\n') ? child : child + '\n';
  });
}

// --- worker：按出现顺序拼接 // @include worker/xxx.js（保留注释与原始名称） -------
function expandWorker(text, file) {
  const dir = dirname(file);
  return text.replace(/^\/\/ @include[ \t]+(\S+)[ \t]*\n/gm, (_, name) => {
    const inc = join(dir, name);
    if (!existsSync(inc)) throw new Error(`${file}: @include 的文件不存在：${name}`);
    const t = expandWorker(read(inc), inc);
    return t.endsWith('\n') ? t : t + '\n';
  });
}

// 面板页面成品（HTML + CSS + JS 合并、去注释，运行时占位符原样保留）。Worker 校验的就是这份内容的 SHA-256
export function assemblePanel() {
  const text = loadPanel(join(SRC, 'panel/panel.html'));
  return text.endsWith('\n') ? text : text + '\n';
}
const sha256Of = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
export function panelSha256(text = assemblePanel()) { return sha256Of(text); }

// Clash 配置模板成品（原样复制；Worker 校验的就是这份内容的 SHA-256）
export function assembleClash() { return read(CLASH_SRC); }
export function clashSha256(text = assembleClash()) { return sha256Of(text); }

// 合并出完整源码（含 worker 注释、登录页已去注释、保留 import / export）。这也是 Hopline.js 的内容。
// 测试用它取内部纯函数（这些函数不对外导出，无法直接 import，需借 Function() 在作用域内求值取出）。
export function assemble() {
  const entry = join(SRC, 'worker.js');
  const worker = expandWorker(read(entry), entry);
  const out = worker
    .replace(/\/\*\s*@panel-sha256\s*\*\/\s*''/g, () => `'${panelSha256()}'`)
    .replace(/\/\*\s*@clash-sha256\s*\*\/\s*''/g, () => `'${clashSha256()}'`)
    .replace(/\/\*\s*@inline\s+(\S+)\s*\*\/\s*''/g, (_, name) => {
      const text = loadPanel(join(SRC, name));
      if (text.includes('`')) throw new Error(`${name}: 内联内容不能包含反引号 \``);
      if (text.includes('${')) throw new Error(`${name}: 内联内容不能包含 \${`);
      return 'String.raw`\n' + text + '`';
    });
  if (/@inline|@panel-sha256|@clash-sha256/.test(out.replace(/\/\/.*$/gm, ''))) throw new Error('存在未处理的 @inline / @panel-sha256 / @clash-sha256 标记');
  return out;
}

function versionOf(src) {
  const m = src.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!m) throw new Error('未在源码中找到 VERSION');
  return m[1];
}

// 生成部署文件（CRLF，与仓库历史一致）：src/ 原样拼接，只加版本横幅，不做压缩/重命名
export function build() {
  const src = assemble();
  const version = versionOf(src);
  const code = `/*!Hopline v${version}*/\n${src}`.replace(/\n+$/, '');
  return (code + '\n').replace(/\n/g, '\r\n');
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const code = build();
  const outputs = [[PANEL_OUT, assemblePanel()], [CLASH_OUT, assembleClash()]];
  if (process.argv.includes('--check')) {
    const stale = [OUT, ...outputs.map(([f]) => f)].filter((f, i) => (existsSync(f) ? readFileSync(f, 'utf8') : '') !== (i === 0 ? code : outputs[i - 1][1]));
    if (stale.length) {
      console.error('Hopline.js / dist/ 下的构建产物与 src/ 不同步：请运行 `node build.mjs` 并提交生成结果。不同步的文件：' + stale.map(f => f.slice(ROOT.length + 1)).join('、'));
      process.exit(1);
    }
    console.log('Hopline.js、dist/panel.html 与 dist/clash-template.yaml 同步。');
  } else {
    writeFileSync(OUT, code);
    mkdirSync(dirname(PANEL_OUT), { recursive: true });
    for (const [f, text] of outputs) writeFileSync(f, text);
    console.log(`已生成 Hopline.js（${code.length} 字符）、dist/panel.html（${outputs[0][1].length} 字符，sha256 ${sha256Of(outputs[0][1]).slice(0, 12)}…）与 dist/clash-template.yaml（${outputs[1][1].length} 字符，sha256 ${sha256Of(outputs[1][1]).slice(0, 12)}…）`);
  }
}
