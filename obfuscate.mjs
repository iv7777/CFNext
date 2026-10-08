#!/usr/bin/env node
// 生成 Hopline.obf.js：在 build.mjs 的 terser 压缩之外，再叠加一层可调节强度的混淆
// （字符串隐藏 + 标识符重命名），供希望进一步增加静态分析门槛的用户使用。
//
//   node obfuscate.mjs          按 obfuscate.config.mjs 中的 level 生成
//   node obfuscate.mjs heavy    临时指定强度（light / medium / heavy），不改配置文件
//
// 直接混淆 assemble() 的未压缩合并源码（而不是已经过 terser 的 Hopline.js）：
// javascript-obfuscator 自带压缩与重命名，省去重复处理；且只有未压缩源码里才能用
// `/* javascript-obfuscator:disable */` 标记保护 checkFieldValue（见该函数上方注释）。
//
// javascript-obfuscator 通过 npx 获取（与 build.mjs 调用 terser 的方式一致），固定版本以保证可复现。
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { assemble } from './build.mjs';
import { presets, level as defaultLevel } from './obfuscate.config.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'Hopline.obf.js');
const OBFUSCATOR = 'javascript-obfuscator@5.9.0';   // 固定版本：保证不同机器 / CI 产出一致

function versionOf(src) {
  const m = src.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!m) throw new Error('未在源码中找到 VERSION');
  return m[1];
}

function runObfuscator(code, options) {
  const dir = mkdtempSync(join(tmpdir(), 'hopline-obf-'));
  try {
    const inp = join(dir, 'in.js'), out = join(dir, 'out.js'), cfg = join(dir, 'opts.json');
    writeFileSync(inp, code);
    writeFileSync(cfg, JSON.stringify(options));
    execFileSync('npx', ['--yes', OBFUSCATOR, inp, '--output', out, '--config', cfg],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    return readFileSync(out, 'utf8');
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

export function obfuscate(level) {
  const preset = presets[level];
  if (!preset) throw new Error(`未知强度档位：${level}（可选：${Object.keys(presets).join(' / ')}）`);
  const src = assemble();
  const version = versionOf(src);
  const code = runObfuscator(src, preset).replace(/\n+$/, '');
  return `/*!Hopline v${version} (obfuscated, level=${level})*/\n${code}\n`.replace(/\n/g, '\r\n');
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const level = process.argv[2] || defaultLevel;
  const code = obfuscate(level);
  writeFileSync(OUT, code);
  console.log(`已生成 Hopline.obf.js（强度 ${level}，${code.length} 字符）`);
}
