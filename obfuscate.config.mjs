// 混淆强度配置：调整 level 的值即可整体调轻 / 调重，无需改动 obfuscate.mjs 或理解混淆器参数。
// 三档强度只调节「字符串如何被隐藏」与「标识符是否重命名」，不启用会增加运行时开销的变换
// （control-flow flattening、dead code injection、self-defending、debug-protection 等）——
// 本项目对 CPU 时间敏感（Workers 免费版每请求 10ms 硬限），这些变换即使只增加零点几毫秒也不值得。
//
//   light  （默认）：仅字符串数组 + base64 编码，不拆分字符串，产物体积增幅小
//   medium ：字符串数组命中率更高，加入有限长度的字符串拆分
//   heavy  ：字符串逐字符拆分、字符串数组命中率拉满，产物体积明显变大（仍远低于 Workers 脚本体积上限）
//
// 调整方式：改下面这一行的 level，或执行时传参覆盖，如 `node obfuscate.mjs heavy`

export const level = 'light';

const base = {
  compact: true,
  target: 'browser',
  renameGlobals: true,          // 顶层函数 / 变量名重命名；导出对象的属性名（如 fetch）不受影响
  renameProperties: false,      // 重命名属性名风险较高（容易误伤运行时/第三方约定的字段名），不开启
  identifierNamesGenerator: 'mangled-shuffled',
  unicodeEscapeSequence: false,
  // 不启用：controlFlowFlattening / deadCodeInjection / selfDefending / debugProtection
  // （均会增加运行时 CPU 开销或在部分环境下有副作用，与本项目的低 CPU 目标冲突）
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
};

export const presets = {
  light: {
    ...base,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.5,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 2,
    splitStrings: false,
  },
  medium: {
    ...base,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 3,
    splitStrings: true,
    splitStringsChunkLength: 20,
  },
  heavy: {
    ...base,
    unicodeEscapeSequence: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 3,
    splitStrings: true,
    splitStringsChunkLength: 1,
  },
};
