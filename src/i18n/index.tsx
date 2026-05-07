import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALES, isLocaleCode, normalizeLocale, type LocaleCode } from './locales'
import { messages, type MessageKey } from './messages'

type MessageValues = Record<string, string | number | boolean | null | undefined>

interface I18nContextValue {
  locale: LocaleCode
  locales: typeof LOCALES
  setLocale: (locale: LocaleCode) => void
  t: (key: MessageKey, values?: MessageValues) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function formatMessage(template: string, values?: MessageValues): string {
  if (!values) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key]
    return value === null || value === undefined ? '' : String(value)
  })
}

function readStoredLocale(): LocaleCode | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    return stored && isLocaleCode(stored) ? stored : null
  } catch {
    return null
  }
}

function detectInitialLocale(): LocaleCode {
  const stored = readStoredLocale()
  if (stored) return stored

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const browserLocale of browserLocales) {
    const locale = normalizeLocale(browserLocale)
    if (locale) return locale
  }

  return DEFAULT_LOCALE
}

export function getCurrentLocale(): LocaleCode {
  const stored = readStoredLocale()
  if (stored) return stored

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

export function translate(key: MessageKey, values?: MessageValues, locale: LocaleCode = getCurrentLocale()): string {
  const template = messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key
  return formatMessage(template, values)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(() => detectInitialLocale())

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // localStorage can be blocked in restricted browser contexts.
    }
  }, [locale])

  const setLocale = useCallback((nextLocale: LocaleCode) => {
    document.documentElement.lang = nextLocale
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    } catch {
      // localStorage can be blocked in restricted browser contexts.
    }
    setLocaleState(nextLocale)
  }, [])

  const t = useCallback((key: MessageKey, values?: MessageValues) => translate(key, values, locale), [locale])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    locales: LOCALES,
    setLocale,
    t,
  }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider.')
  }
  return context
}

export type { LocaleCode, MessageKey, MessageValues }
