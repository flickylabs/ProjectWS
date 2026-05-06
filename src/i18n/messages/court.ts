import type { LocaleCode } from '../locales'

export type CourtMessageKey =
  "pc.notes.unseen"
  | "pc.combo.ready"
  | "pc.combo.potential"
  | "pc.combo.readyPairToast"
  | "pc.combo.readyItemsNotice"
  | "pc.combo.readyMaterialsNotice"
  | "pc.combo.readyDetailLabel"
  | "pc.recordSummary.moreConvincing"
  | "pc.verdictAdvance.minimumVisible"
  | "pc.verdictAdvance.conditionsMissing"
  | "pc.verdictAdvance.hidden.title"
  | "pc.verdictAdvance.hidden.subtitle"
  | "pc.verdictAdvance.hidden.body"
  | "pc.verdictAdvance.hidden.visibleTag"
  | "pc.verdictAdvance.hidden.hiddenTag"
  | "pc.verdictAdvance.hidden.confirm"
  | "pc.verdictAdvance.hidden.collapse"
  | "pc.verdictAdvance.hidden.keepInvestigating"

export const courtMessages = {
  ko: {
    "pc.notes.unseen": "(미확인 항목 {count}개)",
    "pc.combo.ready": "조합 가능 {count}개 - 지금 바로 연결 가능",
    "pc.combo.potential": "실마리 필요 {count}개 - 아직 찾지 못한 단서가 있는 듯",
    "pc.combo.readyPairToast": "조합 가능한 쌍이 준비되었습니다",
    "pc.combo.readyItemsNotice": "조합 가능한 항목이 {count}개 있습니다",
    "pc.combo.readyMaterialsNotice": "조합 가능한 재료가 {count}개 준비되었습니다",
    "pc.combo.readyDetailLabel": "조합 가능 항목 상세",
    "pc.recordSummary.moreConvincing": "{party} 쪽 주장이 더 설득력 있다고 판단했습니다.",
    "pc.verdictAdvance.minimumVisible": "판결은 쟁점이 {required}개 이상 드러난 뒤 진행할 수 있습니다. 현재 드러난 쟁점은 {visible}개입니다.",
    "pc.verdictAdvance.conditionsMissing": "아직 판결 조건을 충족하지 못했습니다. 쟁점별 진실과 증거를 더 확인하세요.",
    "pc.verdictAdvance.hidden.title": "아직 밝혀지지 않은 쟁점이 있습니다",
    "pc.verdictAdvance.hidden.subtitle": "판결 전 확인",
    "pc.verdictAdvance.hidden.body": "현재 드러난 쟁점은 {visible}개입니다.\\n아직 밝혀지지 않은 쟁점이 {hidden}개 남아 있습니다.\\n\\n그래도 바로 판결을 진행하시겠습니까?",
    "pc.verdictAdvance.hidden.visibleTag": "공개 쟁점 {count}",
    "pc.verdictAdvance.hidden.hiddenTag": "숨은 쟁점 {count}",
    "pc.verdictAdvance.hidden.confirm": "그래도 판결 진행",
    "pc.verdictAdvance.hidden.collapse": "판결 버튼만 숨기기",
    "pc.verdictAdvance.hidden.keepInvestigating": "더 조사하기",
  },
  en: {
    "pc.notes.unseen": "({count} unverified)",
    "pc.combo.ready": "{count} ready to combine — connect now",
    "pc.combo.potential": "{count} leads still missing — keep investigating",
    "pc.combo.readyPairToast": "A combinable pair is ready",
    "pc.combo.readyItemsNotice": "{count} combinable items available",
    "pc.combo.readyMaterialsNotice": "{count} combinable materials ready",
    "pc.combo.readyDetailLabel": "Combinable Item Details",
    "pc.recordSummary.moreConvincing": "{party}’s claim is more convincing.",
    "pc.verdictAdvance.minimumVisible": "A verdict needs at least {required} revealed disputes. Currently revealed: {visible}.",
    "pc.verdictAdvance.conditionsMissing": "Verdict conditions are not met yet. Verify each dispute, truth, and evidence first.",
    "pc.verdictAdvance.hidden.title": "Unrevealed disputes remain",
    "pc.verdictAdvance.hidden.subtitle": "Before the verdict",
    "pc.verdictAdvance.hidden.body": "{visible} disputes are currently revealed.\\n{hidden} disputes remain hidden.\\n\\nProceed to the verdict anyway?",
    "pc.verdictAdvance.hidden.visibleTag": "Revealed {count}",
    "pc.verdictAdvance.hidden.hiddenTag": "Hidden {count}",
    "pc.verdictAdvance.hidden.confirm": "Proceed Anyway",
    "pc.verdictAdvance.hidden.collapse": "Hide Verdict Button",
    "pc.verdictAdvance.hidden.keepInvestigating": "Keep Investigating",
  },
  ja: {
    "pc.notes.unseen": "（未確認項目 {count}件）",
    "pc.combo.ready": "組み合わせ可能 {count}件 ─ 今すぐ連結できます",
    "pc.combo.potential": "手がかり要 {count}件 ─ まだ見つかっていない手がかりがあるようです",
    "pc.combo.readyPairToast": "組み合わせ可能なペアが準備できました",
    "pc.combo.readyItemsNotice": "組み合わせ可能な項目が{count}件あります",
    "pc.combo.readyMaterialsNotice": "組み合わせ可能な材料が{count}件揃いました",
    "pc.combo.readyDetailLabel": "組み合わせ可能項目の詳細",
    "pc.recordSummary.moreConvincing": "{party}側の主張のほうが説得力があると判断しました。",
    "pc.verdictAdvance.minimumVisible": "判決は争点が{required}件以上明らかになってから進行できます。現在明らかな争点は{visible}件です。",
    "pc.verdictAdvance.conditionsMissing": "まだ判決条件を満たしていません。争点ごとの真相と証拠をさらに確認してください。",
    "pc.verdictAdvance.hidden.title": "まだ明らかになっていない争点があります",
    "pc.verdictAdvance.hidden.subtitle": "判決前の確認",
    "pc.verdictAdvance.hidden.body": "現在明らかな争点は{visible}件です。\\nまだ明らかになっていない争点が{hidden}件残っています。\\n\\nそれでも判決へ進みますか？",
    "pc.verdictAdvance.hidden.visibleTag": "公開争点 {count}",
    "pc.verdictAdvance.hidden.hiddenTag": "隠れた争点 {count}",
    "pc.verdictAdvance.hidden.confirm": "それでも判決へ進む",
    "pc.verdictAdvance.hidden.collapse": "判決ボタンだけ隠す",
    "pc.verdictAdvance.hidden.keepInvestigating": "さらに調査する",
  },
  "zh-CN": {
    "pc.notes.unseen": "（未确认项目 {count} 个）",
    "pc.combo.ready": "可组合 {count} 个 — 现在可连接",
    "pc.combo.potential": "需要线索 {count} 个 — 似乎还有未发现的线索",
    "pc.combo.readyPairToast": "可组合的一组已准备好",
    "pc.combo.readyItemsNotice": "有 {count} 个可组合项目",
    "pc.combo.readyMaterialsNotice": "已准备 {count} 个可组合材料",
    "pc.combo.readyDetailLabel": "可组合项目详情",
    "pc.recordSummary.moreConvincing": "判定 {party} 一方的主张更有说服力。",
    "pc.verdictAdvance.minimumVisible": "需要至少揭示 {required} 个争议点后才能进入裁决。当前已揭示 {visible} 个。",
    "pc.verdictAdvance.conditionsMissing": "尚未满足裁决条件。请先确认各争议点的真相与证据。",
    "pc.verdictAdvance.hidden.title": "仍有尚未揭示的争议点",
    "pc.verdictAdvance.hidden.subtitle": "裁决前确认",
    "pc.verdictAdvance.hidden.body": "当前已揭示 {visible} 个争议点。\\n仍有 {hidden} 个争议点尚未揭示。\\n\\n仍要直接进入裁决吗？",
    "pc.verdictAdvance.hidden.visibleTag": "已公开争议 {count}",
    "pc.verdictAdvance.hidden.hiddenTag": "隐藏争议 {count}",
    "pc.verdictAdvance.hidden.confirm": "仍然进入裁决",
    "pc.verdictAdvance.hidden.collapse": "仅隐藏裁决按钮",
    "pc.verdictAdvance.hidden.keepInvestigating": "继续调查",
  },
} as const satisfies Record<LocaleCode, Record<CourtMessageKey, string>>
