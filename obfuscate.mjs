#!/usr/bin/env node
// 在构建产物 Hopline.js 基础上做进一步混淆，生成 obf_Hopline.js（供不想直接公开可读源码的部署场景使用）。
//
//   node obfuscate.mjs [light|medium|heavy]   生成 obf_Hopline.js（默认 medium，也可用环境变量 OBFUSCATION_LEVEL 指定）
//
// 说明：
//   - Hopline.js 现为 src/ 原样拼接（不再经 terser 压缩/重命名），这一步在其之上做变量重命名、
//     字符串数组加密 / 控制流平坦化 / 死代码注入等，让代码更难被人工读懂，但不是防止运行时逆向的强保证。
//   - target 固定为 service-worker，selfDefending / debugProtection 固定关闭：
//     这两个特性依赖 `Function(...)` 构造动态代码来获取全局对象引用或反调试，
//     Cloudflare Workers 运行时默认禁止动态生成代码执行，开启会导致部署后直接报错或请求失败。
//   - 混淆强度越高，产物体积和每次请求的 CPU 耗时都会上升（heavy 挡下 obf_Hopline.js 体积约为 Hopline.js 的 2.5 倍），
//     Workers 对每次请求有 CPU 时间限制，heavy 挡请谨慎用于生产，先实测再上线。
//   - 通过 npx 调用（与 `npm run lint` 使用 eslint 的方式一致），版本固定以保证可复现。
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const OBFUSCATOR = 'javascript-obfuscator@4.2.2';   // 固定版本：保证不同机器 / CI 产出一致
const SRC = 'Hopline.js';
const OUT = 'obf_Hopline.js';

// Cloudflare Workers 运行时下的安全基线：不依赖 eval/Function 动态取全局对象，不做自我防御 / 反调试。
const BASE_OPTIONS = {
  compact: true,
  target: 'service-worker',
  identifierNamesGenerator: 'mangled-shuffled',
  selfDefending: false,
  debugProtection: false,
};

const PRESETS = {
  light: {
    ...BASE_OPTIONS,
    stringArray: true,
    stringArrayThreshold: 0.5,
    stringArrayEncoding: ['base64'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    splitStrings: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
  },
  medium: {
    ...BASE_OPTIONS,
    stringArray: true,
    stringArrayThreshold: 1,
    stringArrayEncoding: ['rc4'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    splitStrings: true,
    splitStringsChunkLength: 10,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.25,
    deadCodeInjection: false,
  },
  heavy: {
    ...BASE_OPTIONS,
    stringArray: true,
    stringArrayThreshold: 1,
    stringArrayEncoding: ['rc4'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 3,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    splitStrings: true,
    splitStringsChunkLength: 5,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    numbersToExpressions: true,
    transformObjectKeys: true,
  },
};

function runObfuscator(code, opts) {
  const dir = mkdtempSync(join(tmpdir(), 'hopline-obf-'));
  try {
    const inp = join(dir, 'in.js');
    const cfg = join(dir, 'opts.json');
    const out = join(dir, 'out.js');
    writeFileSync(inp, code);
    writeFileSync(cfg, JSON.stringify(opts));
    execFileSync('npx', ['--yes', OBFUSCATOR, inp, '--config', cfg, '--output', out],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'inherit'] });
    return readFileSync(out, 'utf8');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  const level = process.argv[2] || process.env.OBFUSCATION_LEVEL || 'medium';
  const opts = PRESETS[level];
  if (!opts) {
    console.error(`未知混淆强度 "${level}"，可选值：${Object.keys(PRESETS).join(', ')}`);
    process.exit(1);
  }
  if (!existsSync(SRC)) {
    console.error(`未找到源文件：${SRC}（请先运行 node build.mjs）`);
    process.exit(1);
  }
  const code = readFileSync(SRC, 'utf8');
  if (!code.trim()) {
    console.error(`${SRC} 为空文件`);
    process.exit(1);
  }

  const versionBanner = (code.match(/^\/\*!Hopline v[\d.]+\*\//) || [''])[0];
  const obfuscated = runObfuscator(code, opts);
  const banner = versionBanner ? `${versionBanner.replace('*/', ` obfuscated:${level}*/`)}\n` : '';
  writeFileSync(OUT, banner + obfuscated, 'utf8');
  console.log(`已生成 ${OUT}（源：${SRC}，强度：${level}）`);
}

main();
