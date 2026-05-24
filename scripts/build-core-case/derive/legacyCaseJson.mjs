/**
 * L1 derive — Authority → src/data/cases/generated/{caseId}.json
 *
 * 권위 (Authority가 결정):
 *   - meta / sensitivityTags / context
 *   - duo.partyA, partyB (parties)
 *   - duo.relationshipLedger
 *   - duo.socialGraph (witness 기본 필드)
 *   - disputes (모든 schema fields)
 *   - evidence (top-level schema fields + v3DepthPlan/v3TrustStates)
 *   - truthTable / solutions / activeLedgerEntries / activeThirdParties /
 *     baseEvidenceIds / monetaryDisputeIds
 *   - lieConfigA / lieConfigB (transitions 자동 derive)
 *   - combinationLab.recipes (from combinationRecipes)
 *   - combinationLab.outputs (from dossierCards)
 *   - combinationLab.nodes (evidence + dossier + witness-angle)
 *   - v3Design.{evidenceAxisLegend, hiddenDisputes, leadLines, authorityPlacements,
 *               sensitiveSealTargets, officialRecordRecommendations}
 *
 * 보존 (Authority가 carry하지 않음 — 기존 파일에서 가져옴):
 *   - duo.duoId
 *   - duo.partyA/B.fearLabel / customFields (없으면 무시)
 *   - duo.socialGraph[].{slot, surfaceKnowledge, witnessedDirectly, witnessProfile.relationToA/B,
 *     sentimentToA/B, speechStyle, addressJudge, addressA, addressB, relationTo}
 *   - evidence[].{meta, viewerData, investigationResults}
 *   - evidenceCombinations (top-level, legacy shortcut)
 *   - combinationLab.{analysisPointsBase, analysisPointRefundOnFirstHidden, nodes의 statement nodes}
 *   - disputes[].wrongTruths / disputes[].tier / disputes[].visualImpact (기존 추가 필드)
 */

const DEPTH_LABELS = { stub: 'Stub', excerpt: 'Excerpt', original: 'Original', context: 'Context', established: 'Established' }
const TRUST_LABELS = {
  submitted: '제출됨',
  verifying: '검증 중',
  authenticated: '인증됨',
  challenged: '이의 제기됨',
  misread: '조작/오독 판정',
}

/** LocalizedString → .ko string. */
function ko(loc) {
  if (loc == null) return null
  if (typeof loc === 'string') return loc
  return loc.ko ?? null
}

/** truthStages.transitionTrigger를 lieConfig.transitions[]로 derive.
 *  S0→S1, S1→S2 등 단계 사이의 trigger를 추출. */
function deriveLieTransitions(disputeId, partyEntry, truthStages) {
  const stages = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const transitions = []
  for (let i = 1; i < stages.length; i += 1) {
    const fromState = stages[i - 1]
    const toState = stages[i]
    const trigger = truthStages?.[toState]?.[partyEntry]?.transitionTrigger
    if (!trigger) continue
    const triggerStr = mapTrigger(trigger)
    transitions.push({ from: fromState, to: toState, trigger: triggerStr })
  }
  return transitions
}

function mapTrigger(t) {
  // Authority TransitionTrigger: 'direct' | 'motive' | 'hard_evidence' | 'empathy'
  // 기존 lieConfig: 'direct_question' | 'motive_question' | 'hard_evidence' | 'empathy_question'
  return (
    {
      direct: 'direct_question',
      motive: 'motive_question',
      hard_evidence: 'hard_evidence',
      empathy: 'empathy_question',
    }[t] ?? t
  )
}

function deriveDuoId(caseId, existing) {
  const existingDuoId = existing?.duo?.duoId
  if (existingDuoId) return existingDuoId
  return `duo-${caseId}`
}

function deriveLegacyCaseId(authorityCaseId, existing) {
  if (existing?.caseId) return existing.caseId
  return `case-${authorityCaseId}`
}

function deriveParty(party, existingParty) {
  return {
    id: party.id,
    name: ko(party.name),
    age: party.age,
    occupation: ko(party.occupation),
    ...(party.incomeBracket ? { incomeBracket: party.incomeBracket } : {}),
    archetype: party.archetype,
    speechStyle: ko(party.speechStyle),
    pride: party.pride,
    fear: ko(party.fear),
    riskAppetite: party.riskAppetite,
    ...(party.digitalHabit ? { digitalHabit: party.digitalHabit } : {}),
    dailyRoutine: ko(party.dailyRoutine),
    sensitivePoints: party.sensitivePoints.map((p) => ko(p)),
    verbalTells: party.verbalTells.map((t) => ({
      type: t.type,
      trigger: t.trigger,
      pattern: ko(t.pattern),
    })),
    callTerms: {
      toPartner: ko(party.callTerms.toPartner),
      toJudge: ko(party.callTerms.toJudge),
      ...(party.callTerms.angry ? { angry: ko(party.callTerms.angry) } : {}),
    },
    ...(party.pcFaceType ? { pcFaceType: party.pcFaceType } : {}),
  }
}

function deriveRelationshipLedger(authority) {
  return authority.relationshipLedger.map((e) => ({
    id: e.id,
    category: e.category,
    description: ko(e.description),
    isReal: e.isReal,
    whoRemembersAccurately: e.whoRemembersAccurately,
    whoDistorts: e.whoDistorts,
    distortionDirection: ko(e.distortionDirection) ?? '',
    currentlyResolved: e.currentlyResolved,
    emotionalResidue: e.emotionalResidue,
    connectionToCurrent: e.connectionToCurrent,
    ...(e.parties ? { parties: e.parties } : {}),
    ...(e.thirdPartyId ? { thirdPartyId: e.thirdPartyId } : {}),
  }))
}

function deriveSocialGraph(authority, existing) {
  const existingByWid = new Map(
    (existing?.duo?.socialGraph ?? []).map((w) => [w.id, w]),
  )
  return authority.witnesses.map((w) => {
    const ex = existingByWid.get(w.id) ?? {}
    // bias → relationTo fallback
    const relationTo =
      ex.relationTo ??
      (w.bias === 'pro_a' || w.bias === 'hostile_b'
        ? 'a'
        : w.bias === 'pro_b' || w.bias === 'hostile_a'
          ? 'b'
          : 'neutral')
    return {
      id: w.id,
      ...(ex.slot ? { slot: ex.slot } : {}),
      name: ko(w.name),
      relationTo,
      knowledgeScope: ko(w.knowledgeScope),
      ...(ex.witnessedDirectly !== undefined ? { witnessedDirectly: ex.witnessedDirectly } : {}),
      bias: w.bias,
      distortionRisk: w.distortionRisk,
      ...(ex.surfaceKnowledge ? { surfaceKnowledge: ex.surfaceKnowledge } : {}),
      relatedDisputeIds: w.relatedDisputes,
      witnessProfile: {
        age: w.age,
        occupation: ko(w.occupation),
        ...(ex.witnessProfile?.relationToA
          ? { relationToA: ex.witnessProfile.relationToA }
          : ex.witnessProfile?.relationToA === ''
            ? { relationToA: '' }
            : {}),
        ...(ex.witnessProfile?.relationToB
          ? { relationToB: ex.witnessProfile.relationToB }
          : {}),
        ...(ex.witnessProfile?.sentimentToA !== undefined
          ? { sentimentToA: ex.witnessProfile.sentimentToA }
          : {}),
        ...(ex.witnessProfile?.sentimentToB !== undefined
          ? { sentimentToB: ex.witnessProfile.sentimentToB }
          : {}),
        ...(ex.witnessProfile?.speechStyle
          ? { speechStyle: ex.witnessProfile.speechStyle }
          : {}),
        ...(ex.witnessProfile?.addressJudge
          ? { addressJudge: ex.witnessProfile.addressJudge }
          : { addressJudge: '재판관님' }),
        ...(ex.witnessProfile?.addressA ? { addressA: ex.witnessProfile.addressA } : {}),
        ...(ex.witnessProfile?.addressB ? { addressB: ex.witnessProfile.addressB } : {}),
        hiddenAgenda: ko(w.hiddenAgenda) ?? ex.witnessProfile?.hiddenAgenda ?? '없음.',
      },
      unlockedByDossier: w.unlockedByDossier,
    }
  })
}

function deriveDisputes(authority, existing) {
  const existingById = new Map((existing?.disputes ?? []).map((d) => [d.id, d]))
  return authority.disputes.map((d) => {
    const ex = existingById.get(d.id) ?? {}
    return {
      id: d.id,
      name: ko(d.name),
      truth: d.truth,
      truthDescription: ko(d.truthDescription),
      quadrant: d.quadrant,
      ...(d.requiredEvidence ? { requiredEvidence: d.requiredEvidence } : {}),
      correctResponsibility: d.correctResponsibility,
      ambiguity: d.ambiguity,
      weight: d.weight,
      mediationLink: d.mediationLink,
      legitimacyIssue: d.legitimacyIssue,
      ...(d.judgmentStatement ? { judgmentStatement: ko(d.judgmentStatement) } : {}),
      hidden: d.hidden,
      ...(ex.tier ? { tier: ex.tier } : {}),
      ...(ex.visualImpact ? { visualImpact: ex.visualImpact } : {}),
      v3Visibility: d.v3Visibility,
      ...(d.unlockCondition
        ? {
            unlockCondition: {
              ...(d.unlockCondition.requireDispute
                ? { requireDispute: d.unlockCondition.requireDispute }
                : {}),
              ...(d.unlockCondition.requireEvidence
                ? { requireEvidence: d.unlockCondition.requireEvidence }
                : {}),
              ...(ex.unlockCondition?.note ? { note: ex.unlockCondition.note } : {}),
            },
          }
        : {}),
      ...(d.unlockCondition?.runtimeRule || d.unlockCondition?.authoredRule
        ? {
            v3UnlockPlan: {
              ...(d.unlockCondition?.runtimeRule
                ? { runtimeRule: ko(d.unlockCondition.runtimeRule) }
                : {}),
              ...(d.unlockCondition?.authoredRule
                ? { authoredRule: ko(d.unlockCondition.authoredRule) }
                : {}),
            },
          }
        : ex.v3UnlockPlan
          ? { v3UnlockPlan: ex.v3UnlockPlan }
          : {}),
      verdictOptions: {
        wrong: ko(d.verdictOptions.wrong),
        partial: ko(d.verdictOptions.partial),
        truth: ko(d.verdictOptions.truth),
        defer: ko(d.verdictOptions.defer),
      },
      ...(ex.wrongTruths !== undefined ? { wrongTruths: ex.wrongTruths } : {}),
    }
  })
}

function deriveEvidence(authority, existing) {
  const existingById = new Map((existing?.evidence ?? []).map((e) => [e.id, e]))
  return authority.evidence.map((e) => {
    const ex = existingById.get(e.id) ?? {}
    return {
      id: e.id,
      name: ko(e.name),
      ...(e.surfaceName ? { surfaceName: ko(e.surfaceName) } : {}),
      description: ko(e.description),
      ...(e.surfaceDescription ? { surfaceDescription: ko(e.surfaceDescription) } : {}),
      type: e.type,
      reliability: e.reliability,
      completeness: e.completeness,
      provenance: e.provenance,
      legitimacy: e.legitimacy,
      proves: e.proves,
      isTrap: e.isTrap,
      requires: e.requires,
      ...(e.requiredLieState ? { requiredLieState: e.requiredLieState } : {}),
      ...(ex.investigationResults ? { investigationResults: ex.investigationResults } : {}),
      subjectParty: e.subjectParty,
      ...(e.investigationStages
        ? {
            investigationStages: e.investigationStages.map((s, idx) => ({
              stage: s.stage,
              revealKey: s.revealKey,
              question: {
                text: ko(s.question.text),
                attackVector: s.question.attackVector,
              },
              ...(ex.investigationStages?.[idx]?.label
                ? { label: ex.investigationStages[idx].label }
                : {}),
              ...(ex.investigationStages?.[idx]?.unlockHint !== undefined
                ? { unlockHint: ex.investigationStages[idx].unlockHint }
                : { unlockHint: null }),
            })),
          }
        : ex.investigationStages
          ? { investigationStages: ex.investigationStages }
          : {}),
      // partyContext text: 기존 surface phrasing 우선 보존 (Authority가 truth lexeme을 직접
      // 노출하는 경향. depthStages summary와 동일 정책 — Step 6에서 Authority text 별도 polish 필요.)
      partyContext: {
        ...(e.partyContext.a
          ? {
              a: {
                questionAngle:
                  ex.partyContext?.a?.questionAngle ?? ko(e.partyContext.a.questionAngle),
                implication:
                  ex.partyContext?.a?.implication ?? ko(e.partyContext.a.implication),
              },
            }
          : {}),
        ...(e.partyContext.b
          ? {
              b: {
                questionAngle:
                  ex.partyContext?.b?.questionAngle ?? ko(e.partyContext.b.questionAngle),
                implication:
                  ex.partyContext?.b?.implication ?? ko(e.partyContext.b.implication),
              },
            }
          : {}),
      },
      // v3DepthPlan: id/label은 Authority 정규화, summary는 기존 보존이 우선
      // (Authority depthStages.summary가 disclosure-tier discipline 못 갖춘 경우 qa-runtime-gate
      // 'evidence_stage_truth_description_exposure' P0를 일으킴. 본 derive는 기존 polish 텍스트 보존.
      // 향후 Step 6에서 Authority summary를 tier-safe로 다듬는 작업이 별도 필요.)
      ...(e.depthStages
        ? {
            v3DepthPlan: e.depthStages.map((d) => {
              const exStage = (ex.v3DepthPlan ?? []).find((s) => s.id === d.id)
              return {
                id: d.id,
                label: DEPTH_LABELS[d.id] ?? d.id,
                summary: exStage?.summary ?? ko(d.summary),
              }
            }),
          }
        : {}),
      ...(e.trustStates
        ? {
            v3TrustStates: e.trustStates.map((t) => {
              const exStage = (ex.v3TrustStates ?? []).find((s) => s.id === t.id)
              return {
                id: t.id,
                label: TRUST_LABELS[t.id] ?? t.id,
                summary: exStage?.summary ?? ko(t.summary),
              }
            }),
          }
        : {}),
      ...(ex.meta ? { meta: ex.meta } : {}),
      ...(ex.viewerData ? { viewerData: ex.viewerData } : {}),
      ...(ex.viewerDataByStage ? { viewerDataByStage: ex.viewerDataByStage } : {}),
      // Core narrative wrapper (Cycle 1+) — Authority가 권위, runtime은 그대로 통과.
      ...(e.narrativeTriggers ? { narrativeTriggers: e.narrativeTriggers } : {}),
    }
  })
}

function deriveLieConfigs(authority) {
  const lieConfigA = []
  const lieConfigB = []
  for (const d of authority.disputes) {
    const aCfg = d.lieConfig.a
    const bCfg = d.lieConfig.b
    lieConfigA.push({
      disputeId: d.id,
      lieType: aCfg.lieType,
      lieIntensity: aCfg.lieIntensity,
      lieMotive: aCfg.lieMotive,
      initialState: aCfg.initialState ?? 'S0',
      collapseViaTrust: aCfg.collapseViaTrust,
      transitions: aCfg.transitionsOverride
        ? aCfg.transitionsOverride
        : deriveLieTransitions(d.id, 'a', d.truthStages),
    })
    lieConfigB.push({
      disputeId: d.id,
      lieType: bCfg.lieType,
      lieIntensity: bCfg.lieIntensity,
      lieMotive: bCfg.lieMotive,
      initialState: bCfg.initialState ?? 'S0',
      collapseViaTrust: bCfg.collapseViaTrust,
      transitions: bCfg.transitionsOverride
        ? bCfg.transitionsOverride
        : deriveLieTransitions(d.id, 'b', d.truthStages),
    })
  }
  return { lieConfigA, lieConfigB }
}

function deriveCombinationLab(authority, existing) {
  const exLab = existing?.combinationLab ?? {}
  const evidenceById = new Map(authority.evidence.map((e) => [e.id, e]))
  const dossierById = new Map(authority.dossierCards.map((dc) => [dc.id, dc]))
  const witnessById = new Map(authority.witnesses.map((w) => [w.id, w]))

  // nodes
  const nodes = []
  // evidence
  for (const e of authority.evidence) {
    nodes.push({
      id: e.id,
      type: 'evidence',
      label: `${e.id} ${ko(e.surfaceName) ?? ko(e.name)}`,
      sourceRef: e.id,
      linkedDisputeIds: e.proves,
      linkedEvidenceIds: [e.id],
      visibility: 'base',
    })
  }
  // statement nodes (Authority가 carry하지 않음 — 기존 파일에서 보존)
  const exNodes = exLab.nodes ?? []
  for (const n of exNodes) {
    if (n.type === 'statement') {
      nodes.push(n)
    }
  }
  // witness-angle nodes
  for (const w of authority.witnesses) {
    nodes.push({
      id: `${w.id}-angle`,
      type: 'witness_angle',
      label: `${w.id} ${ko(w.name)} 증언 축`,
      sourceRef: w.id,
      linkedDisputeIds: w.relatedDisputes,
      visibility: 'base',
    })
  }
  // dossier nodes
  for (const dc of authority.dossierCards) {
    nodes.push({
      id: dc.id,
      type: dc.type, // 'derived_note' / 'derived_evidence' / 'note'
      label: `${dc.id} ${ko(dc.label)}`,
      linkedDisputeIds: dc.linkedDisputes,
      linkedEvidenceIds: dc.linkedEvidence,
      visibility: 'derived',
    })
  }

  // outputs (dossier cards as outputs)
  const existingOutputsById = new Map(
    (exLab.outputs ?? []).map((o) => [o.id, o]),
  )
  const outputs = authority.dossierCards.map((dc) => {
    const exOut = existingOutputsById.get(dc.id)
    // effects: Authority effects 우선 → 없으면 기존 보존 → 없으면 unlock_note 기본
    const effects = dc.effects && dc.effects.length > 0
      ? dc.effects
      : (exOut?.effects ?? deriveDossierEffects(dc))
    return {
      id: dc.id,
      label: `${dc.id} ${ko(dc.label)}`,
      summary: ko(dc.description),
      nodeType: dc.type,
      noteText: ko(dc.noteText) ?? ko(dc.label),
      effects,
      ...(dc.judgeHint ? { judgeHint: ko(dc.judgeHint) } : {}),
    }
  })

  // recipes
  const recipes = authority.combinationRecipes.map((r) => ({
    id: r.id,
    inputs: r.inputs,
    cost: r.cost,
    ...(r.hidden ? { hidden: r.hidden } : {}),
    ...(r.repeatable ? { repeatable: r.repeatable } : {}),
    discoveryText: ko(r.discoveryText),
    outputId: r.outputId,
    resultType: r.route === 'evidence_combine' ? 'upgrade' : 'dossier',
  }))

  return {
    analysisPointsBase: exLab.analysisPointsBase ?? 5,
    analysisPointRefundOnFirstHidden: exLab.analysisPointRefundOnFirstHidden ?? 1,
    nodes,
    outputs,
    recipes,
  }
}

/**
 * evidenceCombinations[] — legacy top-level shortcut. Authority의 combinationRecipes 중
 * 모든 input이 evidence ID인 항목만 추출하여 (requires + upgradesTo + proves) 형식으로 emit.
 * proves는 outputId가 dossier card면 dossier.linkedDisputes, evidence면 evidence.proves.
 */
function deriveEvidenceCombinations(authority) {
  const evidenceIds = new Set(authority.evidence.map((e) => e.id))
  const evidenceById = new Map(authority.evidence.map((e) => [e.id, e]))
  const dossierById = new Map(authority.dossierCards.map((dc) => [dc.id, dc]))
  const out = []
  for (const r of authority.combinationRecipes) {
    // 모든 input이 evidence ID인 경우만 emit (stmt-* / L-* 제외)
    if (!r.inputs.every((id) => evidenceIds.has(id))) continue
    let proves = []
    const dc = dossierById.get(r.outputId)
    if (dc) {
      proves = dc.linkedDisputes
    } else if (evidenceById.has(r.outputId)) {
      proves = evidenceById.get(r.outputId).proves
    }
    if (proves.length === 0) continue
    out.push({
      requires: r.inputs,
      upgradesTo: 'hard',
      proves,
    })
  }
  return out
}

function deriveDossierEffects(dc) {
  const effects = [{ kind: 'unlock_note', unlockNodeId: dc.id }]
  // unlockCondition.requireDispute (hidden dispute)인 경우 unlock_dispute effect 추정 X
  // 기존 outputs와 비교해 차이 검토 시 사용자 결정 — 일단 unlock_note만
  return effects
}

function deriveV3Design(authority) {
  const hiddenDisputes = authority.disputes
    .filter((d) => d.hidden)
    .map((d) => ({
      id: d.id,
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

  // leadLines: dossierCards[].leadLine 영역 (있는 카드만)
  const leadLines = authority.dossierCards
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

  // sensitiveSealTargets: evidence[].sensitiveSealTargets 영역
  const sensitiveSealTargets = authority.evidence
    .filter((e) => e.sensitiveSealTargets)
    .map((e) => ({
      evidenceId: e.id,
      targets: e.sensitiveSealTargets.labels.map((l) => ko(l)),
      risk: e.sensitiveSealTargets.risks.map((r) => ko(r)).join(' '),
    }))

  return {
    evidenceAxisLegend: {
      depthStages: authority.meta.evidenceAxisLegend.depthStages.map((d) => ({
        id: d.id,
        label: ko(d.label),
        summary: ko(d.summary),
      })),
      trustStates: authority.meta.evidenceAxisLegend.trustStates.map((t) => ({
        id: t.id,
        label: ko(t.label),
        summary: ko(t.summary),
      })),
    },
    hiddenDisputes,
    leadLines,
    authorityPlacements: authority.authorityPlacements.map((ap) => ({
      action: ko(ap.action),
      recommendedMoment: ko(ap.recommendedMoment),
      purpose: ko(ap.purpose),
      ...(ap.contextDispute ? { contextDispute: ap.contextDispute } : {}),
    })),
    sensitiveSealTargets,
    officialRecordRecommendations: authority.officialRecordRecommendations.map((r) => ko(r)),
  }
}

function deriveContext(authority) {
  return {
    ...(authority.meta.contextType ? { contextType: authority.meta.contextType } : {}),
    description: ko(authority.context.description),
    emotionalPressure: authority.context.emotionalPressure,
    affects: authority.context.affects,
    triggerAmplifier: ko(authority.context.triggerAmplifier),
    ...(authority.meta.caseNumber ? { caseNumber: authority.meta.caseNumber } : {}),
    ...(authority.meta.caseName ? { caseName: ko(authority.meta.caseName) } : {}),
  }
}

function deriveMeta(authority) {
  return {
    relationshipType: authority.meta.relationshipType,
    conflictSeed: ko(authority.meta.conflictSeed),
    ...(authority.meta.variableModules ? { variableModules: authority.meta.variableModules } : {}),
    ...(authority.meta.twistModule !== undefined && authority.meta.twistModule !== null
      ? { twistModule: authority.meta.twistModule }
      : {}),
    difficulty: authority.meta.difficulty,
    anchorTruth: ko(authority.meta.anchorTruth),
    emotionalBait: ko(authority.meta.emotionalBait),
    resolutionDilemma: ko(authority.meta.resolutionDilemma),
    title: ko(authority.meta.title),
  }
}

function deriveSolutions(authority) {
  const out = {}
  for (const [category, descs] of Object.entries(authority.solutions)) {
    out[category] = descs.map((d) => ko(d))
  }
  return out
}

function deriveTruthTable(authority) {
  return authority.truthTable.map((t) => ({
    id: t.id,
    fact: ko(t.fact),
    isTrue: t.isTrue,
    weight: t.weight,
    quadrant: t.quadrant,
  }))
}

/**
 * @param {any} authority — parsed CoreCaseAuthority
 * @param {any} existing  — existing case JSON object (or null)
 */
export function deriveLegacyCaseJson(authority, existing) {
  const { lieConfigA, lieConfigB } = deriveLieConfigs(authority)
  const legacyCaseId = deriveLegacyCaseId(authority.meta.caseId, existing)
  const duoId = deriveDuoId(authority.meta.caseId, existing)

  return {
    caseId: legacyCaseId,
    sensitivityTags: authority.meta.sensitivityTags ?? [],
    meta: deriveMeta(authority),
    duo: {
      duoId,
      relationshipType: authority.meta.relationshipType,
      partyA: deriveParty(authority.parties.a, existing?.duo?.partyA),
      partyB: deriveParty(authority.parties.b, existing?.duo?.partyB),
      relationshipLedger: deriveRelationshipLedger(authority),
      socialGraph: deriveSocialGraph(authority, existing),
    },
    context: deriveContext(authority),
    disputes: deriveDisputes(authority, existing),
    evidence: deriveEvidence(authority, existing),
    evidenceCombinations: deriveEvidenceCombinations(authority),
    truthTable: deriveTruthTable(authority),
    lieConfigA,
    lieConfigB,
    solutions: deriveSolutions(authority),
    activeLedgerEntries: authority.activeLedgerEntries,
    activeThirdParties: authority.activeThirdParties,
    baseEvidenceIds: authority.baseEvidenceIds,
    monetaryDisputeIds: authority.monetaryDisputeIds,
    combinationLab: deriveCombinationLab(authority, existing),
    v3Design: deriveV3Design(authority),
  }
}
