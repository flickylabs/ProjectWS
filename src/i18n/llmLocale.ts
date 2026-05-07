import type { LocaleCode } from './locales.ts'
import { getRuntimeTextLocale, hasHangulText } from './runtimeText.ts'

type NonKoreanLocale = Exclude<LocaleCode, 'ko'>

const LANGUAGE_NAMES: Record<LocaleCode, string> = {
  ko: 'Korean',
  en: 'English',
  ja: 'Japanese',
  'zh-CN': 'Simplified Chinese',
}

const LOCALIZED_FALLBACK_TEXT: Record<NonKoreanLocale, Record<string, string>> = {
  en: {
    default: 'I can only answer within the facts currently on the record. Please ask about the case, testimony, or disclosed evidence.',
    api_failure: 'I cannot give a reliable answer right now. Please ask again within the disclosed case record.',
    off_topic: 'That is outside this case. Please ask about the case, testimony, or disclosed evidence.',
    no_token: 'There are not enough investigation tokens. Public case information is still available, but valid questioning requires 1 investigation token.',
    gameplay_help: 'Free questioning lets you ask the current witness directly. Ask about facts, motives, emotions, or disclosed evidence. Hidden answers and unopened evidence will not be revealed.',
  },
  ja: {
    default: '現在記録上確認できる事実の範囲でしか答えられません。事件、証言、公開済みの証拠について質問してください。',
    api_failure: '今は信頼できる回答を出せません。公開済みの事件記録の範囲で、もう一度質問してください。',
    off_topic: 'それはこの事件の範囲外です。事件、証言、公開済みの証拠について質問してください。',
    no_token: '調査トークンが不足しています。公開済みの事件情報は確認できますが、有効な質問には調査トークンが1つ必要です。',
    gameplay_help: '自由質問では、現在尋問中の人物に直接質問できます。事実、動機、感情、公開済みの証拠について質問してください。隠された答えや未公開の証拠は明かされません。',
  },
  'zh-CN': {
    default: '我只能在目前记录中已经确认的事实范围内回答。请围绕案件、证言或已公开的证据提问。',
    api_failure: '我现在无法给出可靠回答。请在已公开的案件记录范围内重新提问。',
    off_topic: '这超出了本案范围。请围绕案件、证言或已公开的证据提问。',
    no_token: '调查令牌不足。仍可查看公开案件信息，但有效提问需要 1 个调查令牌。',
    gameplay_help: '自由提问可以直接询问当前受询问的人物。请围绕事实、动机、情绪或已公开的证据提问。隐藏答案和未公开证据不会被透露。',
  },
}

const LOCALIZED_BEHAVIOR_HINT: Record<NonKoreanLocale, string> = {
  en: 'Answers cautiously within the disclosed record.',
  ja: '公開済みの記録の範囲で慎重に答える。',
  'zh-CN': '在已公开记录范围内谨慎作答。',
}

export function getLlmLocale(): LocaleCode {
  return getRuntimeTextLocale()
}

export function getLlmLanguageName(locale: LocaleCode = getLlmLocale()): string {
  return LANGUAGE_NAMES[locale] ?? LANGUAGE_NAMES.ko
}

export function buildLlmLanguageDirective(locale: LocaleCode = getLlmLocale()): string {
  const language = getLlmLanguageName(locale)
  return [
    'OUTPUT LANGUAGE LOCK',
    `Selected display language: ${language}.`,
    `Write every user-visible string value only in ${language}.`,
    'This includes npcResponse, response, judgeQuestion, behaviorHint, fallback text, public answers, and short explanations.',
    'Keep JSON keys, enum values, ids, lie-state codes, evidence ids, and speaker ids unchanged.',
    locale === 'ko'
      ? 'Korean/Hangul is allowed because the selected language is Korean.'
      : 'Do not use Korean or Hangul in visible values unless it is part of an untranslated proper noun supplied by case data.',
    'If the prompt contains Korean instructions, follow their meaning but translate the visible output into the selected display language.',
  ].join('\n')
}

export function hasUnexpectedHangulForLocale(
  value: unknown,
  locale: LocaleCode = getLlmLocale(),
): boolean {
  return locale !== 'ko' && hasHangulText(value)
}

export function getLocalizedFreeQuestionFallbackText(
  reason = 'default',
  locale: LocaleCode = getLlmLocale(),
): string | null {
  if (locale === 'ko') return null
  return LOCALIZED_FALLBACK_TEXT[locale][reason] ?? LOCALIZED_FALLBACK_TEXT[locale].default
}

export function getLocalizedFreeQuestionBehaviorHint(
  locale: LocaleCode = getLlmLocale(),
): string | null {
  if (locale === 'ko') return null
  return LOCALIZED_BEHAVIOR_HINT[locale]
}
