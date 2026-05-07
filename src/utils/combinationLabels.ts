import { getRuntimeTextLocale, localizeRuntimeText } from '../i18n/runtimeText'
import type { LocaleCode } from '../i18n/locales'

/**
 * Combination output label helpers
 * ─────────────────────────────────
 * combinationLab.outputs.label 은 보통 "dc-5 5,000만 원의 순서"처럼
 * 내부 코드 prefix를 포함한다. UI에 노출될 때는 반드시 stripOutputCodename
 * (또는 cleanOutputLabel)을 거쳐야 한다.
 */

/** "dc-1 오피스텔의 사람들" → "오피스텔의 사람들" */
export function stripOutputCodename(label: string | undefined | null): string {
  if (!label) return ''
  return label.replace(/^[A-Za-z]+-\d+\s+/i, '').trim()
}

/** 영문 Lead 패턴을 현재 locale에 맞는 UI 라벨로 번역 */
export function translateLeadLabel(text: string, locale: LocaleCode = getRuntimeTextLocale()): string {
  const leadCopy: Record<LocaleCode, Record<string, string>> = {
    ko: {
      timeline: '동선 단서',
      context: '맥락 단서',
      beneficiary: '수혜 단서',
      reframe: '재해석 단서',
      emotion: '감정 단서',
      motive: '동기 단서',
      responsibility: '책임 단서',
      lead: '단서',
    },
    en: {
      timeline: 'Timeline Lead',
      context: 'Context Lead',
      beneficiary: 'Beneficiary Lead',
      reframe: 'Reframe Lead',
      emotion: 'Emotion Lead',
      motive: 'Motive Lead',
      responsibility: 'Responsibility Lead',
      lead: 'Lead',
    },
    ja: {
      timeline: '時系列の手がかり',
      context: '文脈の手がかり',
      beneficiary: '受益者の手がかり',
      reframe: '再解釈の手がかり',
      emotion: '感情の手がかり',
      motive: '動機の手がかり',
      responsibility: '責任の手がかり',
      lead: '手がかり',
    },
    'zh-CN': {
      timeline: '时间线线索',
      context: '背景线索',
      beneficiary: '受益人线索',
      reframe: '重新解读线索',
      emotion: '情绪线索',
      motive: '动机线索',
      responsibility: '责任线索',
      lead: '线索',
    },
  }
  const copy = leadCopy[locale]
  return text
    .replace(/Timeline\s+Lead/gi, copy.timeline)
    .replace(/Context\s+Lead/gi, copy.context)
    .replace(/Beneficiary\s+Lead/gi, copy.beneficiary)
    .replace(/Reframe\s+Lead/gi, copy.reframe)
    .replace(/Emotion\s+Lead/gi, copy.emotion)
    .replace(/Motive\s+Lead/gi, copy.motive)
    .replace(/Responsibility\s+Lead/gi, copy.responsibility)
    .replace(/Lead/gi, copy.lead)
}

/** 코드명 제거 + Lead 번역 — 외부에 노출하는 모든 라벨에 적용 */
export function cleanOutputLabel(label: string | undefined | null): string {
  const locale = getRuntimeTextLocale()
  return localizeRuntimeText(translateLeadLabel(stripOutputCodename(label), locale), locale)
}

/** summary가 label과 동일하거나 중복이면 빈 문자열, 아니면 코드명 제거된 값 */
export function cleanOutputSummary(summary: string | undefined | null, label: string | undefined | null): string {
  const locale = getRuntimeTextLocale()
  const s = (summary ?? '').trim()
  if (!s) return ''
  const cleaned = localizeRuntimeText(translateLeadLabel(stripOutputCodename(s), locale), locale)
  const cleanedLabel = cleanOutputLabel(label)
  if (cleaned === cleanedLabel || cleaned === (label ?? '').trim()) return ''
  return cleaned
}
