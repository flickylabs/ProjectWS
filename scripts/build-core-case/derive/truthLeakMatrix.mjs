/**
 * L5 derive — Authority → docs/localization/non-dialogue-extract/truth-leak-matrix.json
 *
 * matrix는 모든 case가 공유하는 단일 파일이다. derive는 spouse-01 영역만 교체하고
 * family-01 / friend-01 영역은 보존한다.
 *
 * 권위 (Authority가 결정 — spouse-01 영역):
 *   - {caseId}.{disputeId}.hidden.{ko,en,ja,zh-CN} = 기존 매트릭스 hidden 보존 + Authority의
 *     truthLeakOverride.perDispute[disputeId].hidden 보강. truthStages.forbiddenKeywords는 *합치지 않음*
 *     — forbiddenKeywords는 LLM 자유 심문 frame inject 영역에 가까운 키워드 (일상어/메타 포함)이고,
 *     매트릭스 hidden은 surface 검출에 안전한 phrase 단위 정밀 키워드여야 함. 너무 광역 키워드를
 *     매트릭스에 등록하면 surface text가 대량 leak로 검출되어 detect-truth-leak --strict 회귀.
 *   - {caseId}.{disputeId}._designIntentTags = truthLeakOverride.designIntentTags (선택)
 *
 * 보존 (Authority schema 미정의):
 *   - {caseId}.{disputeId}.surface (publicly disclosable lexemes — 공개 가능한 surface 키워드)
 *     surface는 audit 영역으로 사람이 작성. Authority가 별도 schema 정의하지 않은 한 기존 보존.
 *   - _notes / _explicitWhitelist (matrix 메타)
 *   - 다른 case 영역 전체 (family-01, friend-01)
 */

function ko(loc) {
  if (loc == null) return null
  if (typeof loc === 'string') return loc
  return loc.ko ?? null
}

function dedupeKeepOrder(arr) {
  const seen = new Set()
  const out = []
  for (const v of arr) {
    if (v == null) continue
    if (seen.has(v)) continue
    seen.add(v)
    out.push(v)
  }
  return out
}

/** 매트릭스 hidden은 기존 매트릭스 보존 + Authority truthLeakOverride hidden 보강. */
function deriveCaseHiddenForDispute(authority, dispute, lang, existingDispute) {
  const collected = []
  const existing = existingDispute?.hidden?.[lang]
  if (Array.isArray(existing)) collected.push(...existing)
  const override = authority.truthLeakOverride?.perDispute?.[dispute.id]?.hidden?.[lang]
  if (Array.isArray(override)) collected.push(...override)
  return dedupeKeepOrder(collected)
}

function deriveCaseSurfaceForDispute(authority, dispute, lang, existingCase) {
  // surface는 Authority가 carry하지 않음 → 기존 영역에서 가져옴
  const exDispute = existingCase?.[dispute.id]
  const exSurface = exDispute?.surface?.[lang]
  if (Array.isArray(exSurface)) return exSurface
  // truthLeakOverride.perDispute[*].surface 영역이 있으면 사용
  const override = authority.truthLeakOverride?.perDispute?.[dispute.id]?.surface?.[lang]
  if (Array.isArray(override)) return dedupeKeepOrder(override)
  return null
}

function buildCaseEntry(authority, existingCaseEntry) {
  const out = {}
  for (const d of authority.disputes) {
    const exDispute = existingCaseEntry?.[d.id]
    const hiddenKo = deriveCaseHiddenForDispute(authority, d, 'ko', exDispute)
    const hiddenEn = deriveCaseHiddenForDispute(authority, d, 'en', exDispute)
    const hiddenJa = deriveCaseHiddenForDispute(authority, d, 'ja', exDispute)
    const hiddenZh = deriveCaseHiddenForDispute(authority, d, 'zh-CN', exDispute)
    const surfaceKo = deriveCaseSurfaceForDispute(authority, d, 'ko', existingCaseEntry)
    const surfaceEn = deriveCaseSurfaceForDispute(authority, d, 'en', existingCaseEntry)
    const surfaceJa = deriveCaseSurfaceForDispute(authority, d, 'ja', existingCaseEntry)
    const surfaceZh = deriveCaseSurfaceForDispute(authority, d, 'zh-CN', existingCaseEntry)

    const entry = {
      hidden: {
        ko: hiddenKo,
        ...(hiddenEn.length > 0 ? { en: hiddenEn } : {}),
        ...(hiddenJa.length > 0 ? { ja: hiddenJa } : {}),
        ...(hiddenZh.length > 0 ? { 'zh-CN': hiddenZh } : {}),
      },
    }
    if (surfaceKo || surfaceEn || surfaceJa || surfaceZh) {
      entry.surface = {
        ...(surfaceKo ? { ko: surfaceKo } : {}),
        ...(surfaceEn ? { en: surfaceEn } : {}),
        ...(surfaceJa ? { ja: surfaceJa } : {}),
        ...(surfaceZh ? { 'zh-CN': surfaceZh } : {}),
      }
    }
    const intentTags = authority.truthLeakOverride?.perDispute?.[d.id]?.designIntentTags
      ?? authority.truthLeakOverride?.designIntentTags
    // Per-dispute _designIntentTags (exDispute already declared above)
    const exIntentTags = exDispute?._designIntentTags
    if (Array.isArray(intentTags) && intentTags.length > 0) {
      entry._designIntentTags = intentTags
    } else if (Array.isArray(exIntentTags)) {
      entry._designIntentTags = exIntentTags
    }
    out[d.id] = entry
  }
  return out
}

export function deriveTruthLeakMatrix(authority, existing) {
  const caseId = authority.meta.caseId
  const existingCaseEntry = existing?.[caseId] ?? {}
  const result = { ...existing }
  // ensure _notes / _explicitWhitelist preserved
  if (existing?._notes && !result._notes) result._notes = existing._notes
  if (existing?._explicitWhitelist && !result._explicitWhitelist) {
    result._explicitWhitelist = existing._explicitWhitelist
  }
  result[caseId] = buildCaseEntry(authority, existingCaseEntry)
  return result
}
