import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLocale, type LocaleCode } from './locales.ts'

export function getRuntimeScriptLocale(): LocaleCode {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY))
      if (stored) return stored
    } catch {
      // Ignore storage access failures in restricted runtimes.
    }
  }

  if (typeof document !== 'undefined') {
    const documentLocale = normalizeLocale(document.documentElement.lang)
    if (documentLocale) return documentLocale
  }

  if (typeof navigator !== 'undefined') {
    const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language]
    for (const browserLocale of browserLocales) {
      const locale = normalizeLocale(browserLocale)
      if (locale) return locale
    }
  }

  return DEFAULT_LOCALE
}
