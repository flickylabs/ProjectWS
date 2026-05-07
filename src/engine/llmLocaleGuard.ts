import { chatCompletion, MODEL_DIALOGUE } from './llmClient.ts'
import type { LocaleCode } from '../i18n/locales.ts'
import {
  buildLlmLanguageDirective,
  getLlmLanguageName,
  getLocalizedFreeQuestionFallbackText,
  hasUnexpectedHangulForLocale,
} from '../i18n/llmLocale.ts'

function parseTextRepair(raw: string): string {
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as { text?: unknown }
      if (typeof parsed.text === 'string') return parsed.text.trim()
    } catch {
      // Fall through to raw cleanup.
    }
  }
  return raw.trim().replace(/^["']|["']$/g, '').trim()
}

export async function repairVisibleLlmTextLocale(
  text: string,
  locale: LocaleCode,
  options: {
    fieldName?: string
    fallbackReason?: string
    maxTokens?: number
  } = {},
): Promise<string> {
  if (!hasUnexpectedHangulForLocale(text, locale)) return text

  const language = getLlmLanguageName(locale)
  try {
    const raw = await chatCompletion(
      [
        {
          role: 'system',
          content: [
            'You are a translation repair layer for a game UI.',
            buildLlmLanguageDirective(locale),
            'Preserve meaning, character voice, tone, numbers, names, and evidence/dispute terms as much as possible.',
            'Return JSON only: {"text":"..."}',
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            `Target language: ${language}`,
            `Field: ${options.fieldName ?? 'visibleText'}`,
            'Translate this visible text into the target language:',
            text,
          ].join('\n'),
        },
      ],
      { temperature: 0, maxTokens: options.maxTokens ?? 360, model: MODEL_DIALOGUE },
    )
    const repaired = parseTextRepair(raw)
    if (repaired && !hasUnexpectedHangulForLocale(repaired, locale)) return repaired
  } catch {
    // Use deterministic localized fallback below.
  }

  return getLocalizedFreeQuestionFallbackText(options.fallbackReason ?? 'default', locale) ?? text
}
