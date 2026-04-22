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

/** 영문 Lead 패턴을 한글로 번역 */
export function translateLeadLabel(text: string): string {
  return text
    .replace(/Timeline\s+Lead/gi, '동선 단서')
    .replace(/Context\s+Lead/gi, '맥락 단서')
    .replace(/Beneficiary\s+Lead/gi, '수혜 단서')
    .replace(/Reframe\s+Lead/gi, '재해석 단서')
    .replace(/Emotion\s+Lead/gi, '감정 단서')
    .replace(/Motive\s+Lead/gi, '동기 단서')
    .replace(/Responsibility\s+Lead/gi, '책임 단서')
    .replace(/Lead/gi, '단서')
}

/** 코드명 제거 + Lead 번역 — 외부에 노출하는 모든 라벨에 적용 */
export function cleanOutputLabel(label: string | undefined | null): string {
  return translateLeadLabel(stripOutputCodename(label))
}

/** summary가 label과 동일하거나 중복이면 빈 문자열, 아니면 코드명 제거된 값 */
export function cleanOutputSummary(summary: string | undefined | null, label: string | undefined | null): string {
  const s = (summary ?? '').trim()
  if (!s) return ''
  const cleaned = translateLeadLabel(stripOutputCodename(s))
  const cleanedLabel = cleanOutputLabel(label)
  if (cleaned === cleanedLabel || cleaned === (label ?? '').trim()) return ''
  return cleaned
}
