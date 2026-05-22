/**
 * L3 derive — Authority → src/data/claimPolicies/{caseId}-v3-game-loop-data.json
 *
 * 권위 (Authority가 결정):
 *   - dossierCards (id, name, description, evidenceIds, relatedDisputes, subjectParty,
 *                   successConditionSummary, successEffects, challenges, leadId)
 *   - transitionBeats (from disputes[].truthStages[].{a,b}.transitionBeat)
 *   - evidenceProgressions (from evidence[].{depthStages, trustStates, sensitiveSealTargets})
 *   - leadLines (from dossierCards[].leadLine)
 *   - authorityPlacements
 *   - hiddenDisputePlans (from disputes where hidden=true)
 *   - sensitiveSealTargets (from evidence[].sensitiveSealTargets)
 *   - officialRecordRecommendations
 *
 * 보존 (Authority가 carry하지 않음):
 *   - caseId (기존 prefix 유지: 'spouse-v3-01' 등)
 *   - stateUnlockAtoms (factText/tags/stanceHints 자유 작성 영역)
 *   - events (contradictions/interjections/emotionalOutbursts)
 *   - evidenceProgressions[].name (evidence 표시 이름이 다를 수 있음 — 기존 보존)
 */

const DEPTH_LABELS = { stub: 'Stub', excerpt: 'Excerpt', original: 'Original', context: 'Context', established: 'Established' }
const TRUST_LABELS = {
  submitted: '제출됨',
  verifying: '검증 중',
  authenticated: '인증됨',
  challenged: '이의 제기됨',
  misread: '조작/오독 판정',
}

function ko(loc) {
  if (loc == null) return null
  if (typeof loc === 'string') return loc
  return loc.ko ?? null
}

function deriveCaseId(authorityCaseId, existing) {
  return existing?.caseId ?? authorityCaseId
}

function deriveDossierCards(authority) {
  return authority.dossierCards.map((dc) => {
    // challenges by party
    const challenges = []
    for (const side of ['a', 'b']) {
      const ch = dc.challenges?.[side]
      if (!ch) continue
      challenges.push({
        targetParty: side,
        questions: ch.questions.map((q) => ({
          id: q.id,
          text: ko(q.text),
          lockedHint: ko(q.lockedHint),
          attackVector: q.attackVector,
          requiredLieState: q.requiredLieState,
          onSuccess: {
            ...(q.onSuccess.blockVector ? { blockVector: q.onSuccess.blockVector } : {}),
            ...(q.onSuccess.revealAtom ? { revealAtom: q.onSuccess.revealAtom } : {}),
            ...(q.onSuccess.lieAdvance !== undefined
              ? { lieAdvance: q.onSuccess.lieAdvance }
              : {}),
          },
        })),
      })
    }
    return {
      id: dc.id,
      name: ko(dc.label),
      description: ko(dc.description),
      evidenceIds: dc.linkedEvidence,
      relatedDisputes: dc.linkedDisputes,
      subjectParty: dc.linkedParty,
      ...(dc.leadLine?.id ? { leadId: dc.leadLine.id } : {}),
      successConditionSummary: dc.successConditionSummary.map((s) => ko(s)),
      successEffects: dc.successEffects.map((s) => ko(s)),
      challenges,
    }
  })
}

function deriveTransitionBeats(authority, layerCaseId) {
  const beats = []
  const stages = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  // beat ID prefix는 L3 layer caseId 사용 (legacy 'spouse-v3-01' 유지)
  const caseId = layerCaseId ?? authority.meta.caseId
  for (const d of authority.disputes) {
    for (let i = 1; i < stages.length; i += 1) {
      const fromState = stages[i - 1]
      const toState = stages[i]
      for (const side of ['a', 'b']) {
        const entry = d.truthStages?.[toState]?.[side]
        if (!entry?.transitionBeat) continue
        const beatType = inferBeatType(entry.transitionTrigger, side, toState)
        beats.push({
          id: `${caseId}-beat-${side}-${d.id}-${fromState.toLowerCase()}-${toState.toLowerCase()}`,
          caseId,
          party: side,
          disputeId: d.id,
          fromState,
          toState,
          primaryBeatType: beatType,
          line: ko(entry.transitionBeat.line),
          behaviorHint: ko(entry.transitionBeat.behaviorHint),
        })
      }
    }
  }
  return beats
}

function inferBeatType(trigger, side, toState) {
  if (toState === 'S5') return 'confession'
  if (toState === 'S3' || toState === 'S4') {
    if (trigger === 'hard_evidence') return 'evidence_hit'
    if (trigger === 'empathy') return 'partial'
    return 'partial'
  }
  return 'partial'
}

function deriveEvidenceProgressions(authority, existing) {
  const existingByEid = new Map(
    (existing?.evidenceProgressions ?? []).map((e) => [e.evidenceId, e]),
  )
  return authority.evidence.map((e) => {
    const ex = existingByEid.get(e.id) ?? {}
    const exDepthById = new Map((ex.depthStages ?? []).map((s) => [s.id, s]))
    const exTrustById = new Map((ex.trustStates ?? []).map((s) => [s.id, s]))
    return {
      evidenceId: e.id,
      // name: 기존 v3 표시 이름 보존 (Authority의 name과 다를 수 있음 — e.g. e-1: case=영수증묶음 vs v3=카드명세서 mismatch는
      // audit 결과로 Authority 기준 채택 — 새 derive는 Authority 이름 사용)
      name: ko(e.surfaceName) ?? ko(e.name),
      // summary 기존 보존 (disclosure tier — L1 v3DepthPlan과 동일 정책)
      depthStages: (e.depthStages ?? []).map((d) => ({
        id: d.id,
        label: DEPTH_LABELS[d.id] ?? d.id,
        summary: exDepthById.get(d.id)?.summary ?? ko(d.summary),
      })),
      trustStates: (e.trustStates ?? []).map((t) => ({
        id: t.id,
        label: TRUST_LABELS[t.id] ?? t.id,
        summary: exTrustById.get(t.id)?.summary ?? ko(t.summary),
      })),
      sealTargets: e.sensitiveSealTargets
        ? e.sensitiveSealTargets.labels.map((l) => ko(l))
        : (ex.sealTargets ?? []),
    }
  })
}

function deriveLeadLines(authority) {
  return authority.dossierCards
    .filter((dc) => dc.leadLine)
    .map((dc) => ({
      id: dc.leadLine.id,
      name: ko(dc.leadLine.name),
      leadType: dc.leadLine.leadType,
      firstInputs: dc.leadLine.firstInputs,
      secondInputs: dc.leadLine.secondInputs,
      dossierCardId: dc.id,
      interpretationChoices: dc.leadLine.interpretationChoices.map((c) => ({
        id: c.id,
        text: ko(c.text),
        implication: ko(c.implication),
      })),
    }))
}

function deriveAuthorityPlacements(authority) {
  return authority.authorityPlacements.map((ap) => ({
    action: ko(ap.action),
    recommendedMoment: ko(ap.recommendedMoment),
    purpose: ko(ap.purpose),
    ...(ap.contextDispute ? { contextDispute: ap.contextDispute } : {}),
  }))
}

function deriveHiddenDisputePlans(authority) {
  return authority.disputes
    .filter((d) => d.hidden)
    .map((d) => ({
      disputeId: d.id,
      name: ko(d.name),
      ...(d.unlockCondition?.runtimeRule || d.unlockCondition?.authoredRule
        ? {
            unlockPlan: {
              ...(d.unlockCondition?.runtimeRule
                ? { runtimeRule: ko(d.unlockCondition.runtimeRule) }
                : {}),
              ...(d.unlockCondition?.authoredRule
                ? { authoredRule: ko(d.unlockCondition.authoredRule) }
                : {}),
            },
          }
        : {}),
    }))
}

function deriveSensitiveSealTargets(authority) {
  return authority.evidence
    .filter((e) => e.sensitiveSealTargets)
    .map((e) => ({
      evidenceId: e.id,
      label: ko(e.surfaceName) ?? ko(e.name),
      targets: e.sensitiveSealTargets.labels.map((l) => ko(l)),
      recommendedTiming: e.sensitiveSealTargets.recommendedTiming.map((r) => ko(r)),
      risks: e.sensitiveSealTargets.risks.map((r) => ko(r)),
    }))
}

function deriveOfficialRecordRecommendations(authority) {
  return authority.officialRecordRecommendations.map((r) => ko(r))
}

export function deriveClaimPolicyV3(authority, existing) {
  const layerCaseId = deriveCaseId(authority.meta.caseId, existing)
  return {
    caseId: layerCaseId,
    dossierCards: deriveDossierCards(authority),
    // stateUnlockAtoms: factText는 자유 작성 영역, 기존 보존
    stateUnlockAtoms: existing?.stateUnlockAtoms ?? { a: {}, b: {} },
    // events: contradictions / interjections / emotionalOutbursts — 기존 보존
    events: existing?.events ?? { contradictions: [], interjections: [], emotionalOutbursts: [] },
    transitionBeats: deriveTransitionBeats(authority, layerCaseId),
    evidenceProgressions: deriveEvidenceProgressions(authority, existing),
    leadLines: deriveLeadLines(authority),
    authorityPlacements: deriveAuthorityPlacements(authority),
    hiddenDisputePlans: deriveHiddenDisputePlans(authority),
    sensitiveSealTargets: deriveSensitiveSealTargets(authority),
    officialRecordRecommendations: deriveOfficialRecordRecommendations(authority),
  }
}
