/**
 * L4 derive — Authority → src/data/disclosurePolicy/{caseId}.json
 *
 * 권위 (Authority가 결정):
 *   - surfaceMap.evidence (id, name, surfaceName, surfaceDescription)
 *   - surfaceMap.disputes (id, name, truth, truthLexemes from forbiddenKeywords)
 *   - surfaceMap.witnesses (id, name, knowledgeScope, truthProtected from hiddenAgenda)
 *   - forbiddenLexemes.globalTruthLexemes (aggregate from disputes[].truthStages[]*.forbiddenKeywords.ko)
 *   - localePolicy.forbiddenLexemes.{en,ja,zh-CN} (aggregate when present)
 *   - localePolicy.paraphraseLexemes (from freeInterrogation.paraphraseRules)
 *   - discoveryText (from combinationRecipes — discoveryText / gate / surfaceFallback)
 *   - issueProgression (from disputes[].progressionStages)
 *   - channelAuthority (from disputes[].channelExposure aggregation)
 *
 * 보존 (Authority schema가 currently carry하지 않음):
 *   - schemaVersion / baselineTargetSha / generatedAt / runtimeImportAllowed /
 *     draftStatus / sourcePolicy / sourceCaseId
 *   - lieStateGate (runtime semantics — truthThrottle / channelMatrix / npcPolicies — Step 4에서 마이그레이션)
 *   - uiSurfaceMap (UI flagging — sourceText/surfaceText 페어는 사람 검토 결과물)
 *   - crossCheck (참조 메타)
 *   - forbiddenLexemes.{surfaceOnlyChannels, nonConfessionNpcBeforeS5, allowedSurfaceSubstitutes}
 */

function ko(loc) {
  if (loc == null) return null
  if (typeof loc === 'string') return loc
  return loc.ko ?? null
}

function localized(loc, lang) {
  if (loc == null) return null
  return loc[lang] ?? null
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

function deriveSurfaceMapEvidence(authority, existing) {
  const existingEv = existing?.surfaceMap?.evidence ?? {}
  const out = {}
  for (const e of authority.evidence) {
    const ex = existingEv[e.id] ?? {}
    // truthLexemes / descriptionTruth는 evidence-specific 정밀 큐레이션이 필요 (Authority의
    // 통합 forbiddenKeywords 어그리게이트는 너무 광역이라 scripted text가 "가족" 등 일상어로
    // P0 차단됨). 기존 데이터 보존이 우선, 없으면 Authority aggregate fallback.
    const aggregated = collectTruthLexemesForEvidence(authority, e)
    const truthLexemes = ex.truthLexemes && ex.truthLexemes.length > 0 ? ex.truthLexemes : aggregated
    const descriptionTruth =
      ex.descriptionTruth && ex.descriptionTruth.length > 0
        ? ex.descriptionTruth
        : aggregated.slice(0, 4)
    out[e.id] = {
      evidenceId: e.id,
      name: ko(e.name),
      ...(e.surfaceName ? { surfaceName: ko(e.surfaceName) } : { surfaceName: ko(e.name) }),
      ...(e.surfaceDescription
        ? { surfaceDescription: ko(e.surfaceDescription) }
        : { surfaceDescription: ko(e.description) }),
      descriptionTruth,
      truthLexemes,
      sourceRefs: [`src/data/cases/generated/${authority.meta.caseId}.json:evidence.${e.id}`],
    }
  }
  return out
}

/** evidence가 proves하는 disputes의 forbiddenKeywords.ko를 집계하여 evidence별 truthLexemes 추출. */
function collectTruthLexemesForEvidence(authority, evidence) {
  const disputeIds = new Set(evidence.proves)
  const collected = []
  for (const d of authority.disputes) {
    if (!disputeIds.has(d.id)) continue
    for (const stage of ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']) {
      for (const side of ['a', 'b']) {
        const forbid = d.truthStages?.[stage]?.[side]?.forbiddenKeywords?.ko
        if (Array.isArray(forbid)) collected.push(...forbid)
      }
    }
  }
  return dedupeKeepOrder(collected)
}

function deriveSurfaceMapDisputes(authority, existing) {
  const existingD = existing?.surfaceMap?.disputes ?? {}
  const out = {}
  for (const d of authority.disputes) {
    const ex = existingD[d.id] ?? {}
    // 같은 정책: 기존 truthLexemes 우선, 없으면 Authority aggregate
    const aggregated = collectDisputeForbidden(d, 'ko')
    out[d.id] = {
      surface: ko(d.name),
      truth: ko(d.truthDescription),
      protectedSurface: ex.protectedSurface ?? ko(d.name),
      truthLexemes:
        ex.truthLexemes && ex.truthLexemes.length > 0 ? ex.truthLexemes : aggregated,
      sourceRefs: [`src/data/cases/generated/${authority.meta.caseId}.json:disputes.${d.id}`],
    }
  }
  return out
}

function collectDisputeForbidden(d, lang) {
  const collected = []
  for (const stage of ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']) {
    for (const side of ['a', 'b']) {
      const forbid = d.truthStages?.[stage]?.[side]?.forbiddenKeywords?.[lang]
      if (Array.isArray(forbid)) collected.push(...forbid)
    }
  }
  return dedupeKeepOrder(collected)
}

function deriveSurfaceMapWitnesses(authority, existing) {
  const out = {}
  const existingW = existing?.surfaceMap?.witnesses ?? {}
  for (const w of authority.witnesses) {
    const ex = existingW[w.id] ?? {}
    out[w.id] = {
      name: ko(w.name),
      surfaceKnowledge: ex.surfaceKnowledge ?? ko(w.knowledgeScope),
      truthProtected: ex.truthProtected ?? [ko(w.hiddenAgenda) ?? '없음'],
      sourceStatus: ex.sourceStatus ?? 'policy-defined; derived from Authority.witnesses',
    }
  }
  return out
}

function deriveForbiddenLexemesGlobal(authority) {
  const collected = []
  for (const d of authority.disputes) {
    collected.push(...collectDisputeForbidden(d, 'ko'))
  }
  // truthLeakOverride.hidden.ko 영역도 포함
  if (authority.truthLeakOverride?.perDispute) {
    for (const dOverride of Object.values(authority.truthLeakOverride.perDispute)) {
      if (Array.isArray(dOverride?.hidden?.ko)) collected.push(...dOverride.hidden.ko)
    }
  }
  return dedupeKeepOrder(collected)
}

function deriveForbiddenLexemesLocale(authority, lang) {
  const collected = []
  for (const d of authority.disputes) {
    collected.push(...collectDisputeForbidden(d, lang))
  }
  if (authority.truthLeakOverride?.perDispute) {
    for (const dOverride of Object.values(authority.truthLeakOverride.perDispute)) {
      const arr = dOverride?.hidden?.[lang]
      if (Array.isArray(arr)) collected.push(...arr)
    }
  }
  return dedupeKeepOrder(collected)
}

function deriveDiscoveryText(authority) {
  const entries = {}
  for (const r of authority.combinationRecipes) {
    // gate.requiredEvidenceStages: {e-1: 'Excerpt', ...}
    const gate = {
      allowedChannels: r.gate.allowedChannels.length > 0
        ? r.gate.allowedChannels
        : ['player_discovered'],
      route: r.route,
      ...(r.gate.requiredEvidenceStages
        ? { requiredEvidenceStages: r.gate.requiredEvidenceStages }
        : {}),
      ...(r.gate.requiredTruthStage ? { requiredTruthStage: r.gate.requiredTruthStage } : {}),
      autoSurfaceAllowed: r.gate.autoSurfaceAllowed,
    }
    entries[r.id] = {
      sourceText: ko(r.discoveryText),
      truthLexemes: [], // 사람 작성 — Authority가 별도 carry하지 않음. 기존 보존이 안전.
      gate,
      surfaceFallback: ko(r.surfaceFallback),
    }
  }
  return {
    gatePolicy: 'route-and-stage-gated-player-discovered-only',
    entries,
  }
}

function mergeDiscoveryText(derived, existing) {
  if (!existing?.discoveryText?.entries) return derived
  // existing.truthLexemes preserve
  for (const [id, entry] of Object.entries(derived.entries)) {
    const exEntry = existing.discoveryText.entries[id]
    if (exEntry?.truthLexemes) {
      entry.truthLexemes = exEntry.truthLexemes
    }
  }
  return derived
}

function deriveIssueProgression(authority) {
  const disputes = {}
  for (const d of authority.disputes) {
    if (!d.progressionStages) continue
    const truthStages = []
    const stageKeys = Object.keys(d.progressionStages).sort()
    for (const stageKey of stageKeys) {
      const stage = d.progressionStages[stageKey]
      const stageNum = parseInt(stageKey.replace('S', ''), 10)
      truthStages.push({
        stage: stageNum,
        name: ko(stage.surfaceClaim) ?? '',
        surfaceClaim: ko(stage.surfaceClaim),
        hiddenTruth: ko(stage.hiddenTruth),
        entryConditions: [], // Authority schema 미정의 영역 — 기존 보존 영역
        allowedDisclosure: [], // 동
        forbiddenDisclosure: [], // 동
        validActions: stage.validActions,
        requiredEvidence: stage.requiredEvidence,
        requiredWitness: stage.requiredWitness,
        meterTriggers: stage.meterTriggers ?? {},
        ...(stage.failureResponse ? { failureResponse: { npc: ko(stage.failureResponse) } } : {}),
        successUnlocks: stage.successUnlocks,
      })
    }
    disputes[d.id] = {
      title: ko(d.name),
      draftCompleteness: 'derived-from-authority',
      statementFracture: [], // 기존 보존
      truthStages,
    }
  }
  return {
    principles: {
      primaryAxis: 'statementFracture + truthStage',
      truthStageIsNotLieState: true,
      meterRole: {
        emotion: 'short-term vulnerability signal',
        trust: 'cooperation posture',
        leak: 'conditional result, not a separate progression resource',
      },
    },
    disputes,
  }
}

function mergeIssueProgression(derived, existing) {
  const exDisputes = existing?.issueProgression?.disputes ?? {}
  for (const [did, dEntry] of Object.entries(derived.disputes)) {
    const exDispute = exDisputes[did]
    if (!exDispute) continue
    // statementFracture, draftCompleteness 보존
    if (exDispute.statementFracture) dEntry.statementFracture = exDispute.statementFracture
    if (exDispute.draftCompleteness) dEntry.draftCompleteness = exDispute.draftCompleteness
    // entryConditions / allowedDisclosure / forbiddenDisclosure: stage 단위로 보존
    const exTruthByStage = new Map((exDispute.truthStages ?? []).map((s) => [s.stage, s]))
    for (const st of dEntry.truthStages) {
      const exSt = exTruthByStage.get(st.stage)
      if (!exSt) continue
      if (exSt.entryConditions) st.entryConditions = exSt.entryConditions
      if (exSt.allowedDisclosure) st.allowedDisclosure = exSt.allowedDisclosure
      if (exSt.forbiddenDisclosure) st.forbiddenDisclosure = exSt.forbiddenDisclosure
      if (exSt.failureResponse && !st.failureResponse) st.failureResponse = exSt.failureResponse
    }
  }
  // 기존 dispute가 derived에 없으면 (e.g. h-d4 폐기), 기존 dispute는 제외 (Authority 권위)
  return derived
}

function deriveChannelAuthority(authority) {
  const surfaceOnly = []
  const seenSurfaceOnly = new Set()
  for (const d of authority.disputes) {
    for (const [channel, policy] of Object.entries(d.channelExposure)) {
      if (policy.isSurfaceOnly && !seenSurfaceOnly.has(channel)) {
        seenSurfaceOnly.add(channel)
        surfaceOnly.push({
          channel,
          authority: 'surface-only',
          truthLexemePolicy: 'blocked',
          evidenceStagePolicy: 'does-not-expand-authority',
        })
      }
    }
  }
  return surfaceOnly
}

function mergeChannelAuthority(derivedSurfaceOnly, existing) {
  const existingCA = existing?.channelAuthority ?? {}
  return {
    surfaceOnly: derivedSurfaceOnly.length > 0
      ? derivedSurfaceOnly
      : (existingCA.surfaceOnly ?? []),
    lieStateDriven: existingCA.lieStateDriven ?? [
      'interrogation',
      'contradiction_pursuit',
      'evidence_present',
      'mediation',
    ],
    playerDiscovered: existingCA.playerDiscovered ?? [],
    freeAfterVerdict: existingCA.freeAfterVerdict ?? [],
  }
}

function deriveLocalePolicy(authority, existing) {
  const exLp = existing?.localePolicy ?? {}
  const exFL = exLp.forbiddenLexemes ?? {}
  // Same policy as globalTruthLexemes: 기존 보존, Authority는 L5 matrix용으로만.
  const en = exFL.en && exFL.en.length > 0
    ? exFL.en
    : deriveForbiddenLexemesLocale(authority, 'en')
  const ja = exFL.ja && exFL.ja.length > 0
    ? exFL.ja
    : deriveForbiddenLexemesLocale(authority, 'ja')
  const zhCN = exFL['zh-CN'] && exFL['zh-CN'].length > 0
    ? exFL['zh-CN']
    : deriveForbiddenLexemesLocale(authority, 'zh-CN')

  // freeInterrogation.paraphraseRules → paraphraseLexemes
  const paraphraseLexemes = (authority.freeInterrogation?.paraphraseRules ?? []).map((rule) => ({
    label: rule.label,
    dimension: rule.dimension ?? 'paraphrase',
    ...(rule.channels ? { channels: rule.channels } : {}),
    ...(rule.matcherPattern ? { matcherPattern: rule.matcherPattern } : {}),
    ...(rule.matcherPatternByLocale
      ? { matcherPatternByLocale: rule.matcherPatternByLocale }
      : {}),
  }))

  return {
    schemaVersion: exLp.schemaVersion ?? 'script-localization-v1',
    status: exLp.status ?? 'tier-a-draft',
    forbiddenLexemes: {
      ...(en.length > 0 ? { en } : {}),
      ...(ja.length > 0 ? { ja } : {}),
      ...(zhCN.length > 0 ? { 'zh-CN': zhCN } : {}),
    },
    ...(paraphraseLexemes.length > 0 ? { paraphraseLexemes } : {}),
    ...(exLp.allowedSurfaceSubstitutesByLocale
      ? { allowedSurfaceSubstitutesByLocale: exLp.allowedSurfaceSubstitutesByLocale }
      : {}),
  }
}

export function deriveDisclosurePolicy(authority, existing) {
  const caseId = authority.meta.caseId
  const exForbid = existing?.forbiddenLexemes ?? {}
  // forbiddenLexemes.globalTruthLexemes는 런타임 가드용 광역 블록리스트.
  // Authority truthStages.forbiddenKeywords는 L5 truth-leak-matrix용 hidden 정밀 키워드로 별도 사용.
  // L4 globalTruthLexemes는 기존을 보존한다 — Authority truthStages 키워드를 union하면 일상어
  // ('시댁', '가족', '개인회생' 등)가 surface 채널에 포함되어 기존 scripted text가 대량 P0로 차단됨.
  // L4 ↔ Authority 정합은 Step 4 engine 마이그레이션 + scripted text 일괄 audit 단계로 미룬다.
  const globalLex =
    exForbid.globalTruthLexemes && exForbid.globalTruthLexemes.length > 0
      ? exForbid.globalTruthLexemes
      : deriveForbiddenLexemesGlobal(authority)

  const discoveryText = mergeDiscoveryText(deriveDiscoveryText(authority), existing)
  const issueProgression = mergeIssueProgression(deriveIssueProgression(authority), existing)
  const channelAuthority = mergeChannelAuthority(deriveChannelAuthority(authority), existing)

  return {
    caseId,
    sourceCaseId: existing?.sourceCaseId ?? `case-${caseId}`,
    schemaVersion: existing?.schemaVersion ?? 'tier1-disclosure-policy-draft-v1',
    ...(existing?.baselineTargetSha ? { baselineTargetSha: existing.baselineTargetSha } : {}),
    ...(existing?.generatedAt ? { generatedAt: existing.generatedAt } : {}),
    ...(existing?.runtimeImportAllowed !== undefined
      ? { runtimeImportAllowed: existing.runtimeImportAllowed }
      : { runtimeImportAllowed: false }),
    ...(existing?.draftStatus ? { draftStatus: existing.draftStatus } : {}),
    ...(existing?.sourcePolicy ? { sourcePolicy: existing.sourcePolicy } : {}),
    surfaceMap: {
      evidence: deriveSurfaceMapEvidence(authority, existing),
      disputes: deriveSurfaceMapDisputes(authority, existing),
      witnesses: deriveSurfaceMapWitnesses(authority, existing),
    },
    forbiddenLexemes: {
      globalTruthLexemes: globalLex,
      surfaceOnlyChannels: exForbid.surfaceOnlyChannels ?? {
        judge_question: 'globalTruthLexemes',
        judge_contradiction: 'globalTruthLexemes',
        judge_evidence_combo: 'globalTruthLexemes',
        judge_witness_summon: 'globalTruthLexemes',
        system_message: 'globalTruthLexemes',
        dossier: 'globalTruthLexemes',
      },
      nonConfessionNpcBeforeS5: exForbid.nonConfessionNpcBeforeS5 ?? {},
      allowedSurfaceSubstitutes: exForbid.allowedSurfaceSubstitutes ?? {},
    },
    localePolicy: deriveLocalePolicy(authority, existing),
    channelAuthority,
    ...(existing?.lieStateGate ? { lieStateGate: existing.lieStateGate } : {}),
    ...(existing?.uiSurfaceMap ? { uiSurfaceMap: existing.uiSurfaceMap } : {}),
    discoveryText,
    issueProgression,
    ...(existing?.crossCheck ? { crossCheck: existing.crossCheck } : {}),
  }
}
