const ARCHETYPE_LABELS: Record<string, string> = {
  avoidant: '회피형',
  victim_cosplay: '피해 호소형',
  confrontational: '정면돌파형',
  affect_flattening: '감정 억제형',
  cold_logic: '냉정 분석형',
  premature_summary: '성급 결론형',
}

export function getArchetypeLabel(archetype: string | null | undefined): string {
  if (!archetype) return '기타'
  return ARCHETYPE_LABELS[archetype] ?? '기타'
}

export { ARCHETYPE_LABELS }
