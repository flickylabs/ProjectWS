import { commonMessages } from './common'
import { settingsMessages } from './settings'
import { homeMessages } from './home'
import { courtMessages } from './court'
import { verdictMessages } from './verdict'
import { profileMessages } from './profile'
import { hotbarMessages } from './hotbar'
import { scriptMessages } from './scripts'
import { layoutMessages } from './layout'
import type { LocaleCode } from '../locales'

const ko = {
  ...commonMessages["ko"],
  ...settingsMessages["ko"],
  ...homeMessages["ko"],
  ...courtMessages["ko"],
  ...hotbarMessages["ko"],
  ...verdictMessages["ko"],
  ...profileMessages["ko"],
  ...scriptMessages["ko"],
  ...layoutMessages["ko"],
} as const

export type MessageKey = keyof typeof ko

export const messages: Record<LocaleCode, Record<MessageKey, string>> = {
  ko,
  en: {
  ...commonMessages["en"],
  ...settingsMessages["en"],
  ...homeMessages["en"],
  ...courtMessages["en"],
  ...hotbarMessages["en"],
  ...verdictMessages["en"],
  ...profileMessages["en"],
  ...scriptMessages["en"],
  ...layoutMessages["en"],
  },
  ja: {
  ...commonMessages["ja"],
  ...settingsMessages["ja"],
  ...homeMessages["ja"],
  ...courtMessages["ja"],
  ...hotbarMessages["ja"],
  ...verdictMessages["ja"],
  ...profileMessages["ja"],
  ...scriptMessages["ja"],
  ...layoutMessages["ja"],
  },
  'zh-CN': {
  ...commonMessages["zh-CN"],
  ...settingsMessages["zh-CN"],
  ...homeMessages["zh-CN"],
  ...courtMessages["zh-CN"],
  ...hotbarMessages["zh-CN"],
  ...verdictMessages["zh-CN"],
  ...profileMessages["zh-CN"],
  ...scriptMessages["zh-CN"],
  ...layoutMessages["zh-CN"],
  },
}
