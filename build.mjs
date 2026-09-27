#!/usr/bin/env node
// 构建脚本：把 src/ 下的源文件合并为可直接粘贴部署的单文件 CFNext.js
//
//   node build.mjs          生成 CFNext.js
//   node build.mjs --check  仅校验 CFNext.js 是否与 src/ 同步（CI 使用，不同步时退出码 1）
//
// 合并规则（无第三方依赖）：
//   - src/worker.js 中形如  const X = /* @inline panel/panel.html */ '';  的语句，
//     替换为  const X = String.raw`<文件内容>`;
//   - 被内联的 HTML 文件中独占一行的  @include 文件名  替换为同目录下该文件的内容
//   - 输出统一使用 CRLF 换行（与仓库历史版本保持一致，便于网页端对比）
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'CFNext.js');

const BANNER = '// ⚠ 本文件由 build.mjs 自动生成：请修改 src/ 下的源文件后运行 `node build.mjs`，不要直接编辑本文件。\n';

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
}

function expandIncludes(file) {
  const dir = dirname(file);
  return read(file).replace(/^[ \t]*@include[ \t]+(\S+)[ \t]*\n/gm, (_, name) => {
    const inc = join(dir, name);
    if (!existsSync(inc)) throw new Error(`${file}: @include 的文件不存在：${name}`);
    const text = expandIncludes(inc);
    return text.endsWith('\n') ? text : text + '\n';
  });
}

export function build() {
  const worker = read(join(SRC, 'worker.js'));
  const out = worker.replace(/\/\*\s*@inline\s+(\S+)\s*\*\/\s*''/g, (_, name) => {
    const file = join(SRC, name);
    const text = expandIncludes(file);
    // String.raw 模板内不能出现反引号与 ${，否则会提前结束模板或被当作插值
    if (text.includes('`')) throw new Error(`${name}: 内联内容不能包含反引号 \``);
    if (text.includes('${')) throw new Error(`${name}: 内联内容不能包含 \${`);
    return 'String.raw`\n' + text + '`';
  });
  if (/@inline/.test(out.replace(/\/\/.*$/gm, ''))) throw new Error('存在未处理的 @inline 标记');
  return (BANNER + out).replace(/\n/g, '\r\n');
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const code = build();
  if (process.argv.includes('--check')) {
    const cur = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
    if (cur !== code) {
      console.error('CFNext.js 与 src/ 不同步：请运行 `node build.mjs` 并提交生成结果。');
      process.exit(1);
    }
    console.log('CFNext.js 与 src/ 同步。');
  } else {
    writeFileSync(OUT, code);
    console.log(`已生成 CFNext.js（${code.length} 字符）`);
  }
}
