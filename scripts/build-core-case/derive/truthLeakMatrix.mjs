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

    // 2026-05-25: 4언어 모두 출력 (빈 배열도 포함). 검증 (detect-truth-leak.cjs)이
    //   hidden.{ko,en,ja,zh-CN} 4언어 array 필수로 요구하기 때문.
    //   이전 로직은 빈 배열 lang을 skip해서 misdirection 신규 dispute(d-3 등)가 검증 실패.
    const entry = {
      hidden: {
        ko: hiddenKo,
        en: hiddenEn,
        ja: hiddenJa,
        'zh-CN': hiddenZh,
      },
    }
    // 2026-05-25: surface entry도 항상 4언어 배열 출력 (빈 배열 포함).
    //   detect-truth-leak.cjs가 매 dispute의 surface 필수로 요구.
    entry.surface = {
      ko: surfaceKo ?? [],
      en: surfaceEn ?? [],
      ja: surfaceJa ?? [],
      'zh-CN': surfaceZh ?? [],
    }
    // _designIntentTags = baseline matrix 영역 ∪ Authority case-wide ∪ Authority per-dispute (union)
    //
    // Phase 3 friend-01 회귀 학습: 이전 정책은 Authority 영역이 baseline을 덮어썼다.
    //   - baseline matrix의 dispute별 `continuity:evidence_combo` 같은 scriptedText variant tag와
    //     sync된 tag가 Authority truthLeakOverride.designIntentTags 변경 시 누락 → detect-truth-leak
    //     P0 finding 회귀.
    // 새 정책 (union): baseline _designIntentTags는 무조건 보존. Authority는 case-wide + per-dispute로
    //   추가만 가능. 작성자가 truthLeakOverride.designIntentTags = [...new tags]로 의도해도 baseline
    //   tag (`continuity:*` 등)는 자동 carry-over.
    const baselineTags = Array.isArray(exDispute?._designIntentTags) ? exDispute._designIntentTags : []
    const caseWideTags = Array.isArray(authority.truthLeakOverride?.designIntentTags)
      ? authority.truthLeakOverride.designIntentTags
      : []
    const perDisputeTags = Array.isArray(authority.truthLeakOverride?.perDispute?.[d.id]?.designIntentTags)
      ? authority.truthLeakOverride.perDispute[d.id].designIntentTags
      : []
    const mergedTags = dedupeKeepOrder([...baselineTags, ...caseWideTags, ...perDisputeTags])
    if (mergedTags.length > 0) entry._designIntentTags = mergedTags
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
