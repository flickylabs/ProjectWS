// Restart Thread 03 — zh-CN message patch proposal
//
// Scope: replacement proposal for the *current* values of every key in
// src/i18n/messages/{common,settings,home,court,verdict,profile}.ts (zh-CN locale only).
//
// Most existing zh-CN values are already aligned with the new brand and locked rules.
// Items marked `// CHANGED` carry a different value from the current source.
// Items marked `// REVIEW` should pass through native review before merge.
//
// Brand & rule reminders (from restart prompt):
//   - Public CN title:  真相裁决：零点审判
//   - Internal name:    Project_Solomon (never translated)
//   - 不要使用 所罗门的法庭 / 所罗门的两难 / 所罗门困境
//   - objection (UI noun): 异议 — 反对！只在角色对白(bark)中使用
//   - 체념 emotion: 认命
//   - Preserve interpolation placeholders {count} {name} {seconds} {minutes} {required} {visible} {hidden} {party} verbatim.

export const zhCnMessagePatch = {
  common: {
    'app.title': '真相裁决：零点审判',
    'brand.internalProjectName': 'Project_Solomon',
    'brand.title': '真相裁决',
    'brand.subtitle': '零点审判',
    'brand.fullTitle': '真相裁决：零点审判',
    'splash.subtitle': '法庭模拟游戏',
    'language.selectorLabel': '语言',
    'language.selectorTitle': '选择显示语言',
    'steam.authRequired.title': '需要 Steam 认证',
    'steam.authRequired.description': '请检查 Steam 客户端和服务器认证状态，然后重试。',
    'steam.authRequired.retry': '重试',
    'steam.authFailedFallback': 'Steam 认证失败。',
    'session.preparing.title': '正在准备会话',
    'session.preparing.description': '正在加载案件数据和审判环境。',
  },

  settings: {
    'settings.about.credits.title': '真相裁决：零点审判',
    'settings.about.credits.description': '用人类判断审理 AI 证词冲突的可重玩推理游戏',
    'settings.language.title': '语言',
    'settings.language.description': '选择游戏 UI 使用的显示语言。',
    'settings.language.displayLanguage': '显示语言',
    'settings.language.displayLanguageDescription': '会立即应用到主页、设置与系统 UI。',
    'settings.language.current': '当前语言',
    'settings.language.restartNote': '部分案件正文和已保存记录可能会在下一次界面切换后刷新。',
  },

  home: {
    'home.gameTitle': '真相裁决：零点审判',
    'home.tagline': '化身现代裁判官，辨明证词背后的真相。', // CHANGED — glossary 재판관→裁判官 (was 审判者)
    'pc.home.moreCases': '另 {count} 件',
    'pc.home.countdown.ready': '即将补充', // CHANGED — KO 곧 충전 (recharge); 补充 reads more accurate than 恢复
    'pc.home.countdown.minutesSeconds': '{minutes}分{seconds}秒',
    'pc.home.countdown.seconds': '{seconds}秒',
    'pc.resolutionConfirm.rollback': '{seconds}秒后将恢复到之前的分辨率。',
  },

  court: {
    'pc.notes.unseen': '（未确认项目 {count} 个）',
    'pc.combo.ready': '可组合 {count} 个 — 现在可连接', // REVIEW — only difference from current is em-dash vs hyphen for visual polish
    'pc.combo.potential': '需要线索 {count} 个 — 似乎还有未发现的线索',
    'pc.combo.readyPairToast': '可组合的一组已准备好',
    'pc.combo.readyItemsNotice': '有 {count} 个可组合项目',
    'pc.combo.readyMaterialsNotice': '已准备 {count} 个可组合材料',
    'pc.combo.readyDetailLabel': '可组合项目详情',
    'pc.recordSummary.moreConvincing': '判定 {party} 一方的主张更有说服力。',
    // 裁决 vs 判决 — 公共品牌为「真相裁决」，verdictAdvance 流程统一使用 裁决；
    // 裁判官「判决记录」「判决依据」等保留 判决（依词法分工，见 SUMMARY.md §裁决/判决）。
    'pc.verdictAdvance.minimumVisible': '需要至少揭示 {required} 个争议点后才能进入裁决。当前已揭示 {visible} 个。',
    'pc.verdictAdvance.conditionsMissing': '尚未满足裁决条件。请先确认各争议点的真相与证据。',
    'pc.verdictAdvance.hidden.title': '仍有尚未揭示的争议点',
    'pc.verdictAdvance.hidden.subtitle': '裁决前确认',
    'pc.verdictAdvance.hidden.body':
      '当前已揭示 {visible} 个争议点。\n仍有 {hidden} 个争议点尚未揭示。\n\n仍要直接进入裁决吗？',
    'pc.verdictAdvance.hidden.visibleTag': '已公开争议 {count}',
    'pc.verdictAdvance.hidden.hiddenTag': '隐藏争议 {count}',
    'pc.verdictAdvance.hidden.confirm': '仍然进入裁决',
    'pc.verdictAdvance.hidden.collapse': '仅隐藏裁决按钮',
    'pc.verdictAdvance.hidden.keepInvestigating': '继续调查',
  },

  verdict: {
    'pc.verdict.factOption.partyClaimCorrect': '{party} 一方的主张正确',
    'pc.verdict.factOption.partyClaimCorrectWithContradiction': '该争议点与事实不符 — {party} 一方的主张正确',
    'pc.verdict.responsibility.major': '{party} 一方承担主要责任',
    'pc.verdict.responsibility.greater': '{party} 一方承担更大责任',
    'pc.verdict.responsibility.similar': '双方责任相近',
  },

  profile: {
    'pc.perk.required': '需要 {name}',
    'pc.profile.fragments.needCount': '至少需要 {count} 个',
  },
} as const
