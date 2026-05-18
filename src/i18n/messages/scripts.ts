import type { LocaleCode } from '../locales'

export const scriptMessages = {
  ko: {
    "script.tag.speaker.a": "A",
    "script.tag.speaker.b": "B",
    "script.tag.speaker.judge": "재판관",
    "script.address.judgeVocative": "재판관님",
    "script.address.spouseIntimate": "자기야",
    "script.behaviorHint.unavailable": "행동 묘사는 현재 언어에서 준비 중입니다.",
  },
  en: {
    "script.tag.speaker.a": "A",
    "script.tag.speaker.b": "B",
    "script.tag.speaker.judge": "Judge",
    "script.address.judgeVocative": "Your Honor",
    "script.address.spouseIntimate": "Honey",
    "script.behaviorHint.unavailable": "Behavior notes are being prepared for the current language.",
  },
  ja: {
    "script.tag.speaker.a": "A",
    "script.tag.speaker.b": "B",
    "script.tag.speaker.judge": "裁判官",
    "script.address.judgeVocative": "裁判官",
    "script.address.spouseIntimate": "あなた",
    "script.behaviorHint.unavailable": "行動描写は現在の言語で準備中です。",
  },
  "zh-CN": {
    "script.tag.speaker.a": "A",
    "script.tag.speaker.b": "B",
    "script.tag.speaker.judge": "法官",
    "script.address.judgeVocative": "法官",
    "script.address.spouseIntimate": "亲爱的",
    "script.behaviorHint.unavailable": "行为描述正在为当前语言准备中。",
  },
} as const satisfies Record<LocaleCode, Record<string, string>>

export type ScriptMessageKey = keyof typeof scriptMessages.ko
