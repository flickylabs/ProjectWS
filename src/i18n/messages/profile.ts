import type { LocaleCode } from '../locales'

export const profileMessages = {
  ko: {
    "pc.perk.required": "{name} 필요",
    "pc.profile.fragments.needCount": "{count}개 이상 필요",
  },
  en: {
    "pc.perk.required": "{name} required",
    "pc.profile.fragments.needCount": "At least {count} required",
  },
  ja: {
    "pc.perk.required": "{name}が必要",
    "pc.profile.fragments.needCount": "{count}個以上必要",
  },
  "zh-CN": {
    "pc.perk.required": "需要 {name}",
    "pc.profile.fragments.needCount": "至少需要 {count} 个",
  },
} as const satisfies Record<LocaleCode, Record<string, string>>

export type ProfileMessageKey = keyof typeof profileMessages.ko
