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
//   - HOT_FILES（WebSocket / XHTTP 的数据面：帧收发、出站读写循环、出站 SS 协议的 AEAD 实现）按请求/按帧反复执行；
//     字符串数组查表解密、控制流状态机分发等变换会直接体现为每次执行的 CPU 开销，在持续的代理连接下会触发
//     "Worker exceeded CPU time limit"。这些文件单独走 HOT_OPTIONS：只做零运行时成本的处理（压缩空白、
//     局部变量/参数改名），不加字符串数组、控制流平坦化等需要在每次执行时解密/跳转的变换；其余文件仍按所选强度处理。
//     这几个文件在 src/worker.js 的 @include 列表中相邻，在拼接后的 Hopline.js 里是连续的一段，按原文定位后单独处理，
//     其余部分整体处理，再按原顺序拼接——不影响输出结果，只是分段喂给混淆器。
//   - 顶层函数/变量名从不改名（renameGlobals 关闭且为默认值），分段处理后相互调用的名字保持一致。
//   - 通过 npx 调用（与 `npm run lint` 使用 eslint 的方式一致），版本固定以保证可复现。
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const OBFUSCATOR = 'javascript-obfuscator@4.2.2';   // 固定版本：保证不同机器 / CI 产出一致
const SRC = 'Hopline.js';
const OUT = 'obf_Hopline.js';

// WebSocket / XHTTP 数据面：每个代理连接的生命周期内反复执行，见上方说明
const HOT_FILES = ['src/worker/outbound-proxies.js', 'src/worker/relay.js', 'src/worker/proxy.js'];

// Cloudflare Workers 运行时下的安全基线：不依赖 eval/Function 动态取全局对象，不做自我防御 / 反调试。
// renameGlobals 显式关闭：HOT_FILES 与其余代码分段独立喂给混淆器，顶层名字必须在所有分段里保持一致才能相互调用。
const BASE_OPTIONS = {
  compact: true,
  target: 'service-worker',
  identifierNamesGenerator: 'mangled-shuffled',
  renameGlobals: false,
  selfDefending: false,
  debugProtection: false,
};

// 数据面热路径：只做零运行时成本的变换（压缩空白、局部变量/参数改名），关掉所有会在每次执行时
// 解密字符串 / 做控制流跳转的功能——这些函数会跑很多遍，上述功能的开销会被放大很多倍
const HOT_OPTIONS = {
  ...BASE_OPTIONS,
  stringArray: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  splitStrings: false,
  numbersToExpressions: false,
  transformObjectKeys: false,
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

// 把 code（Hopline.js 全文）按 HOT_FILES 的原文精确定位，切成 { hot, text } 段（按出现顺序，覆盖全文无遗漏）。
// 各 HOT_FILES 文件本身不含 @inline / @panel-sha256 / @clash-sha256 占位符，在合并产物里以原文一字不差出现，
// 定位失败说明 Hopline.js 与 src/ 已不同步（先重新运行 node build.mjs）。
function splitHotCold(code) {
  const ranges = HOT_FILES.map((rel) => {
    const raw = readFileSync(rel, 'utf8').replace(/\r\n/g, '\n');
    const text = raw.endsWith('\n') ? raw : raw + '\n';
    const start = code.indexOf(text);
    if (start < 0) throw new Error(`在 ${SRC} 中找不到 ${rel} 的原文，可能与 src/ 不同步（请先重新运行 node build.mjs）`);
    return [start, start + text.length];
  }).sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i][0] < ranges[i - 1][1]) throw new Error('HOT_FILES 在 ' + SRC + ' 中重叠或嵌套，无法切分');
  }
  const segments = [];
  let pos = 0;
  for (const [start, end] of ranges) {
    if (start > pos) segments.push({ hot: false, text: code.slice(pos, start) });
    segments.push({ hot: true, text: code.slice(start, end) });
    pos = end;
  }
  if (pos < code.length) segments.push({ hot: false, text: code.slice(pos) });
  return segments;
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
  const code = readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  if (!code.trim()) {
    console.error(`${SRC} 为空文件`);
    process.exit(1);
  }

  const versionBanner = (code.match(/^\/\*!Hopline v[\d.]+\*\//) || [''])[0];
  const segments = splitHotCold(code);
  // 每段各自独立调用混淆器，各自生成一套字符串数组及其辅助函数（并非重命名已有的顶层名字，
  // 是混淆器自己新插入的）。不加区分时不同段很容易分到同一个名字（哪怕 seed 不同：
  // mangled-shuffled 按 seed 顺序取名，相邻 seed 的取名有重叠），拼接后在同一顶层作用域里
  // 重复声明而报 SyntaxError。identifiersPrefix 按段号加前缀，确保各段新增的名字互不相同；
  // 已有的顶层名字不受影响（renameGlobals 关闭，跨段相互调用不受影响）
  const obfuscated = segments.map((seg, i) => runObfuscator(seg.text, { ...(seg.hot ? HOT_OPTIONS : opts), identifiersPrefix: `h${i}_` })).join('\n');
  const banner = versionBanner ? `${versionBanner.replace('*/', ` obfuscated:${level}*/`)}\n` : '';
  writeFileSync(OUT, banner + obfuscated, 'utf8');
  console.log(`已生成 ${OUT}（源：${SRC}，强度：${level}，数据面热路径 ${HOT_FILES.length} 个文件单独处理）`);
}

main();
