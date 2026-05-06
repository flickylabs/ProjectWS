export const LOCALES = [
  { code: 'ko', label: '한국어', nativeName: '한국어' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ja', label: '日本語', nativeName: '日本語' },
  { code: 'zh-CN', label: '简体中文', nativeName: '简体中文' },
] as const

export type LocaleCode = typeof LOCALES[number]['code']

export const DEFAULT_LOCALE: LocaleCode = 'ko'
export const LOCALE_STORAGE_KEY = 'solomon.locale'

const supportedLocales = new Set<string>(LOCALES.map((locale) => locale.code))

export function isLocaleCode(value: string): value is LocaleCode {
  return supportedLocales.has(value)
}

export function normalizeLocale(value: string | null | undefined): LocaleCode | null {
  if (!value) return null

  const normalized = value.replace('_', '-').toLowerCase()
  if (normalized.startsWith('ko')) return 'ko'
  if (normalized.startsWith('en')) return 'en'
  if (normalized.startsWith('ja') || normalized.startsWith('jp')) return 'ja'
  if (normalized.startsWith('zh')) return 'zh-CN'

  return null
}
