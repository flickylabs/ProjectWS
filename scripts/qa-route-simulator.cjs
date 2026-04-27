#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_DIR = path.join(ROOT, 'tmp', 'qa-route-simulator-manifests');
const RESULT_DIR = path.join(ROOT, 'tmp', 'qa-route-simulator-results');
const TRANSCRIPT_DIR = path.join(RESULT_DIR, 'route-transcripts');

const DEFAULT_CASES = ['spouse-01', 'family-01', 'friend-01'];
const QUESTION_TYPES = ['fact_pursuit', 'motive_search', 'empathy_approach'];
const HANDLED_ACTIONS = new Set([
  'judge_question',
  'evidence_present',
  'evidence_investigate',
  'evidence_combine',
  'contradiction_pursuit',
  'witness_summon',
  'witness_question',
  'dossier',
  'discovery_event',
  'emergence_event',
]);
const RESPONSE_REQUIRED_ACTIONS = new Set([
  'judge_question',
  'evidence_present',
  'evidence_combine',
  'contradiction_pursuit',
  'witness_summon',
  'witness_question',
  'dossier',
  'discovery_event',
  'emergence_event',
]);
const LIE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 };

const PARAPHRASE_LABELS = {
  'spouse-01': [
    '어린 친척', '친 가족', '혈육', '친 혈육', '가족의 한 사람',
    '돌봐 드', '생필품을 사다', '가족을 돕는', '빚 대신',
    '따로 모은 돈', '몰래 마련한 돈', '가족을 돕는 일이 급',
  ],
  'family-01': [
    '유서를 손댄', '유서를 고친', '유서를 바꾼', '원본 유서를 고친',
    '문서를 손으로 고친', '자기 몫을 줄', '공장 자금',
    '20년 동안 매달 보낸', '20년 간 송금', '어머니 통장으로 꾸준히 돈을 넣었습니다',
    '정기적이라고 불러도 될 만큼 보낸', '장기 송금', '혈연이 다른',
    '친생자', '친자 관계', '출생에 관한 사실',
  ],
  'friend-01': [
    '선을 넘는 메시지', '선을 넘은 말', '선을 넘은 메시지', '선 넘는 메시지',
    '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸',
    '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸',
    '거절했다는', '거절한 사실', '같은 패턴 반복',
  ],
};

const GATE_SPEC_OPTIONS = [
  {
    id: 'i',
    title: 'Keep evidence_investigate response-required and add NPC follow-up data',
    runnerLoc: 20,
    dataChanges: 'caseData or scriptedText NPC follow-up fields needed for every investigation branch',
    runtimeImpact: 'dispatch must read and emit those NPC follow-ups; current runtime explicitly blocks automatic NPC interrogation after evidence investigation',
    uxFit: 'weak - conflicts with the current "NPC speaks only after explicit question" action contract',
    recommendation: 'Do not choose for Phase B-1/B-3 unless product explicitly changes evidence investigation into a hybrid investigation+question action.',
  },
  {
    id: 'ii',
    title: 'Redefine evidence_investigate as system-only and remove it from response-required',
    runnerLoc: 20,
    dataChanges: 'none',
    runtimeImpact: 'none',
    uxFit: 'strong - evidence investigation remains an information-acquisition action; follow-up NPC speech happens through a later explicit judge_question',
    recommendation: 'Recommended. Reclassify the current P0 response_missing to a P1 informational evidence_investigate_no_npc_followup detector.',
  },
  {
    id: 'iii',
    title: 'Wire investigationStages[].scriptedNpcResponses into runtime and Gate',
    runnerLoc: 80,
    dataChanges: 'investigationStages.scriptedNpcResponses coverage needed across caseData plus type/schema validation',
    runtimeImpact: 'dispatch and resolver integration required; existing type allows the field but current runtime/Gate do not read it',
    uxFit: 'medium - preserves authored follow-ups but still changes the current no-auto-NPC investigation contract',
    recommendation: 'Only choose as a separate Phase B-6/data-runtime track after user approval.',
  },
];

let globalFindingCounter = 1;

main();

function main() {
  const cli = parseArgs(process.argv.slice(2));
  resetResultDir();
  ensureDir(TRANSCRIPT_DIR);

  const manifests = loadManifests(cli);
  if (manifests.length === 0) {
    console.error(`qa-route-simulator: no manifests found in ${path.relative(ROOT, MANIFEST_DIR)}`);
    process.exit(1);
  }

  const routeResults = [];
  const traces = [];
  const findings = [];

  for (const manifest of manifests) {
    const manifestCaseId = normalizeCaseId(manifest.caseId);
    if (cli.caseId && manifestCaseId !== cli.caseId) continue;

    for (const route of manifest.routes || []) {
      const routeId = getRouteId(route);
      if (cli.routeId && routeId !== cli.routeId) continue;
      const result = runRoute(manifest, route, cli);
      routeResults.push(result);
      traces.push(...result.traces);
      findings.push(...result.findings);
      writeTranscript(result);
    }
  }

  const emittedFindings = cli.coverageOnly ? [] : findings;
  writeJson(path.join(RESULT_DIR, 'findings.json'), emittedFindings);
  writeJson(path.join(RESULT_DIR, 'action-by-action-trace.json'), traces);
  writeCoverageSummary(routeResults, traces, emittedFindings);
  writeCaseSummaries(routeResults, emittedFindings);
  writeAllRoutesSummary(routeResults, traces, emittedFindings);
  writeGateSpecReport(routeResults, traces, emittedFindings);
  writeSpikeSummary(routeResults, traces, emittedFindings);

  const hardCount = emittedFindings.filter((item) => item.severity === 'P0').length;
  const routeCount = new Set(traces.map((item) => `${item.caseId}/${item.routeId}`)).size;
  console.log(`qa-route-simulator: routes=${routeCount} actions=${traces.length} findings=${emittedFindings.length} hard=${hardCount}`);
  console.log(`results: ${path.relative(ROOT, RESULT_DIR)}`);

  if (cli.failOnHard && hardCount > 0) process.exit(1);
}

function runRoute(manifest, route, cli) {
  const caseId = normalizeCaseId(manifest.caseId);
  const routeId = getRouteId(route);
  const ctx = loadContext(caseId);
  const state = createInitialState(ctx.caseData, route.initialState || route.initial || {});
  const traces = [];
  const findings = [];

  (route.actions || []).forEach((rawAction, index) => {
    const action = normalizeAction(rawAction);
    const before = snapshotState(state);
    const outputs = executeAction({ ...ctx, state, action });
    const after = snapshotState(state);
    const trace = {
      schemaVersion: 1,
      caseId,
      routeId,
      routeSummary: route.summary || route.description || '',
      routePattern: route.routePattern || route.pattern || 'unspecified',
      phase: route.phase || manifest.phase || 'unknown',
      actionIndex: index + 1,
      action,
      stateBefore: before,
      outputs,
      stateAfter: after,
      stateDelta: diffState(before, after),
    };
    const stepFindings = cli.coverageOnly ? [] : runDetectors(trace, ctx);
    trace.findingIds = stepFindings.map((item) => item.id);
    findings.push(...stepFindings);
    traces.push(trace);
    if (actionConsumesTurn(action)) state.turn += 1;
  });

  return { manifest: { ...manifest, caseId }, route, routeId, traces, findings };
}

function executeAction(ctx) {
  const { action } = ctx;
  if (!HANDLED_ACTIONS.has(action.type)) {
    return [{
      speaker: 'system',
      text: `Route simulator action is not implemented: ${action.type}`,
      channel: 'system_message',
      resolverPath: 'route_simulator_unhandled',
      sourcePath: 'scripts/qa-route-simulator.cjs:executeAction',
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId,
      evidenceId: action.evidenceId,
      routeActionUnhandled: true,
    }];
  }

  if (action.type === 'judge_question') return doJudgeQuestion(ctx);
  if (action.type === 'evidence_present') return doEvidencePresent(ctx);
  if (action.type === 'evidence_investigate') return doEvidenceInvestigate(ctx);
  if (action.type === 'evidence_combine') return doEvidenceCombine(ctx);
  if (action.type === 'contradiction_pursuit') return doContradictionPursuit(ctx);
  if (action.type === 'witness_summon') return doWitnessSummon(ctx);
  if (action.type === 'witness_question') return doWitnessQuestion(ctx);
  if (action.type === 'dossier') return doDossier(ctx);
  if (action.type === 'discovery_event') return doDiscoveryEvent(ctx);
  if (action.type === 'emergence_event') return doEmergenceEvent(ctx);
  return [];
}

function doJudgeQuestion(ctx) {
  const { caseId, caseData, scripted, state, action } = ctx;
  const outputs = [];
  const questionType = action.questionType;
  const depth = action.depth || getQuestionDepth(state, action);
  const judge = pickEntry(scripted, 'judge_question', `${action.disputeId}|${questionType}|${depth}`, action.variantIds?.judge);

  if (judge) {
    outputs.push(toOutput('judge', judge, {
      channel: 'judge_question',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'judge_question', judge.entry.key, judge.variant.id),
      action,
      disputeId: action.disputeId,
      target: action.target,
    }));
  } else {
    outputs.push(systemOutput('재판관 질문 스크립트가 없습니다.', action, 'fallback', missingSource(caseId, 'judge_question', `${action.disputeId}|${questionType}|${depth}`), 'judge_question'));
  }

  const lieState = getLieState(state, action.target, action.disputeId);
  const npc = pickEntry(scripted, 'interrogation', `${action.target}|${action.disputeId}|${lieState}|${questionType}`, action.variantIds?.npc);
  if (npc) {
    outputs.push(toOutput(action.target, npc, {
      channel: 'interrogation',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'interrogation', npc.entry.key, npc.variant.id),
      action,
      disputeId: action.disputeId,
      target: action.target,
      lieState,
    }));
  }

  trackQuestionAndMaybeTransition(state, caseData, action);
  checkEvidenceUnlocks(state, caseData);
  return outputs;
}

function doEvidencePresent(ctx) {
  const { caseId, caseData, scripted, state, action } = ctx;
  const outputs = [];
  const ev = findEvidence(caseData, action.evidenceId);
  const evState = state.evidence[action.evidenceId];
  if (!ev || !evState?.unlocked) {
    return [systemOutput(`증거를 제시할 수 없습니다: ${action.evidenceId}`, action, 'fallback', missingSource(caseId, 'caseData.evidence', action.evidenceId))];
  }

  evState.presented = true;
  evState.presentedTo = [...new Set([...(evState.presentedTo || []), action.target])];
  const displayName = getEvidenceDisplayName(ev, evState);
  outputs.push({
    speaker: 'system',
    text: `증거 제시: ${displayName} [${ev.reliability === 'hard' ? 'Hard' : 'Soft'}]`,
    channel: 'system_message',
    resolverPath: 'runtime_system',
    sourcePath: `src/hooks/useActionDispatch.ts:getEvidenceDisplayName:${action.evidenceId}`,
    actionType: action.type,
    disputeId: action.disputeId || ev.proves?.[0],
    evidenceId: action.evidenceId,
    target: action.target,
    evidenceStage: evState.stage,
  });

  const disputeId = action.disputeId || ev.proves?.[0];
  const lieState = getLieState(state, action.target, disputeId);
  const subjectRole = resolveSubjectRole(ev, action.target);
  let npc = pickEntry(scripted, 'evidence_present', `${action.target}|${action.evidenceId}|${toLieBand(lieState)}|${subjectRole}`, action.variantIds?.npc);
  if (!npc) {
    for (const fallbackRole of ['self', 'other', 'both']) {
      if (fallbackRole === subjectRole) continue;
      npc = pickEntry(scripted, 'evidence_present', `${action.target}|${action.evidenceId}|${toLieBand(lieState)}|${fallbackRole}`, action.variantIds?.npc);
      if (npc) break;
    }
  }
  if (npc) {
    outputs.push(toOutput(action.target, npc, {
      channel: 'evidence_present',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'evidence_present', npc.entry.key, npc.variant.id),
      action,
      disputeId,
      evidenceId: action.evidenceId,
      target: action.target,
      lieState,
      evidenceStage: evState.stage,
    }));
  }

  transitionByEvidence(state, caseData, action.target, ev);
  checkEvidenceUnlocks(state, caseData);
  return outputs;
}

function doEvidenceInvestigate(ctx) {
  const { caseId, caseData, state, action } = ctx;
  const ev = findEvidence(caseData, action.evidenceId);
  const evState = state.evidence[action.evidenceId];
  if (!ev || !evState?.unlocked) {
    return [systemOutput(`증거를 조사할 수 없습니다: ${action.evidenceId}`, action, 'fallback', missingSource(caseId, 'caseData.evidence', action.evidenceId), 'evidence_discovery')];
  }

  const stageBefore = evState.stage;
  const subAction = action.subAction || Object.keys(ev.investigationResults || {})[stageBefore] || 'request_original';
  const result = ev.investigationResults?.[subAction] || '';
  evState.investigatedActions = [...new Set([...(evState.investigatedActions || []), subAction])];
  evState.stage = evState.investigatedActions.length;
  evState.deepInvestigated = true;
  checkEvidenceUnlocks(state, caseData);

  return [{
    speaker: 'system',
    text: result,
    channel: 'evidence_discovery',
    resolverPath: 'runtime_system',
    sourcePath: `src/data/cases/generated/${caseId}.json:evidence.${action.evidenceId}.investigationResults.${subAction}`,
    actionType: action.type,
    evidenceId: action.evidenceId,
    disputeId: action.disputeId || ev.proves?.[0],
    target: action.target,
    evidenceStage: stageBefore,
    runtimeContract: 'system_only_no_auto_npc',
  }].filter((output) => output.text);
}

function doEvidenceCombine(ctx) {
  const { caseId, caseData, state, action } = ctx;
  const recipe = findCombinationRecipe(caseData, action);
  if (!recipe) {
    return [systemOutput(`Evidence combination recipe not found: ${action.recipeId || (action.inputs || []).join('+')}`, action, 'fallback', missingSource(caseId, 'caseData.combinationLab.recipes', action.recipeId || (action.inputs || []).join('+')), 'evidence_combine')];
  }

  const missing = (recipe.inputs || []).filter((id) => id.startsWith('e-') && !state.evidence[id]?.unlocked);
  if (missing.length > 0) {
    return [systemOutput(`Evidence combination blocked; locked inputs: ${missing.join(', ')}`, action, 'fallback', `src/data/cases/generated/${caseId}.json:combinationLab.recipes[id=${recipe.id}]`, 'evidence_combine')];
  }

  applyCombinationEffects(state, caseData, recipe, action);
  checkEvidenceUnlocks(state, caseData);
  return [
    {
      speaker: 'system',
      text: recipe.discoveryText || `Evidence combination ${recipe.id} resolved.`,
      channel: 'evidence_combine',
      resolverPath: 'runtime_system',
      sourcePath: `src/data/cases/generated/${caseId}.json:combinationLab.recipes[id=${recipe.id}].discoveryText`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId || recipe.proves?.[0],
      evidenceId: (recipe.inputs || []).find((id) => id.startsWith('e-')),
      combinationId: recipe.id,
      dossierCardId: recipe.outputId,
    },
    {
      speaker: 'witness',
      text: `Analysis note ${recipe.outputId || recipe.id} is ready for follow-up.`,
      channel: 'evidence_combine',
      resolverPath: 'route_simulator_facsimile',
      sourcePath: `src/data/cases/generated/${caseId}.json:combinationLab.outputs[id=${recipe.outputId}]`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId || recipe.proves?.[0],
      combinationId: recipe.id,
      dossierCardId: recipe.outputId,
    },
  ];
}

function doContradictionPursuit(ctx) {
  const { caseId, caseData, scripted, state, action } = ctx;
  const lieState = getLieState(state, action.target, action.disputeId);
  const picked = pickEntry(scripted, 'contradiction_pursuit', `${action.target}|${action.disputeId}|${lieState}`, action.variantIds?.npc);
  const outputs = [];
  if (picked) {
    outputs.push(toOutput(action.target, picked, {
      channel: 'contradiction_pursuit',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'contradiction_pursuit', picked.entry.key, picked.variant.id),
      action,
      disputeId: action.disputeId,
      target: action.target,
      lieState,
    }));
  } else {
    outputs.push(systemOutput(`Contradiction script missing for ${action.target}|${action.disputeId}|${lieState}`, action, 'fallback', missingSource(caseId, 'contradiction_pursuit', `${action.target}|${action.disputeId}|${lieState}`), 'contradiction_pursuit'));
  }

  for (const trigger of action.transitionTriggers || [action.transitionTrigger || 'direct_question']) {
    if (transitionByTrigger(state, caseData, action.target, action.disputeId, trigger)) break;
  }
  checkEvidenceUnlocks(state, caseData);
  return outputs;
}

function doWitnessSummon(ctx) {
  const { caseId, state, action } = ctx;
  const witnessId = action.witnessId || 'w-1';
  state.witnesses[witnessId] = { summoned: true, lastDisputeId: action.disputeId || null };
  return [
    {
      speaker: 'system',
      text: `Witness summoned: ${witnessId}`,
      channel: 'witness_summon',
      resolverPath: 'runtime_system',
      sourcePath: `src/data/cases/generated/${caseId}.json:activeThirdParties[id=${witnessId}]`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId,
      witnessId,
    },
    {
      speaker: 'witness',
      text: action.prompt || `${witnessId} is available for a focused route question.`,
      channel: 'witness_summon',
      resolverPath: 'route_simulator_facsimile',
      sourcePath: `tmp/qa-route-simulator-manifests/${caseId}.json:witness_summon.${witnessId}`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId,
      witnessId,
    },
  ];
}

function doWitnessQuestion(ctx) {
  const { caseId, state, action } = ctx;
  const witnessId = action.witnessId || 'w-1';
  state.witnesses[witnessId] = {
    ...(state.witnesses[witnessId] || {}),
    summoned: true,
    lastDisputeId: action.disputeId || null,
    questions: (state.witnesses[witnessId]?.questions || 0) + 1,
  };
  return [{
    speaker: 'witness',
    text: action.answer || `${witnessId} confirms the route focus for ${action.disputeId || action.evidenceId || 'the current issue'}.`,
    channel: 'witness_question',
    resolverPath: 'route_simulator_facsimile',
    sourcePath: `tmp/qa-route-simulator-manifests/${caseId}.json:witness_question.${witnessId}`,
    actionType: action.type,
    target: action.target,
    disputeId: action.disputeId,
    evidenceId: action.evidenceId,
    witnessId,
  }];
}

function doDossier(ctx) {
  const { caseId, caseData, scripted, state, action } = ctx;
  const target = action.target || 'b';
  const disputeId = action.disputeId || state.lastFocusedDisputeId;
  const lieState = getLieState(state, target, disputeId);
  const lieBand = action.lieBand || toLieBand(lieState);
  const questionId = action.questionId || `${action.dossierId}.${target}.q${action.questionNumber || 1}`;
  const key = action.dossierKey || `${questionId}|${lieBand}`;
  const picked = pickEntry(scripted, 'dossier', key, action.variantIds?.npc);
  const outputs = [];

  if (picked) {
    outputs.push(toOutput(target, picked, {
      channel: 'dossier',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'dossier', picked.entry.key, picked.variant.id),
      action,
      disputeId,
      target,
      lieState,
    }));
  } else {
    outputs.push(systemOutput(`Dossier script missing for ${key}`, action, 'fallback', missingSource(caseId, 'dossier', key), 'dossier'));
  }

  for (const trigger of action.transitionTriggers || []) {
    if (transitionByTrigger(state, caseData, target, disputeId, trigger)) break;
  }
  checkEvidenceUnlocks(state, caseData);
  return outputs;
}

function doDiscoveryEvent(ctx) {
  const { caseId, state, action } = ctx;
  applyRouteUnlocks(state, action);
  return [
    {
      speaker: 'system',
      text: action.text || `Discovery event applied: ${action.eventId || action.disputeId || action.evidenceId}`,
      channel: 'discovery_event',
      resolverPath: 'route_simulator_facsimile',
      sourcePath: `tmp/qa-route-simulator-manifests/${caseId}.json:discovery_event.${action.eventId || 'inline'}`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId,
      evidenceId: action.evidenceId,
    },
    {
      speaker: 'witness',
      text: action.followup || 'The newly discovered route item can now be tested.',
      channel: 'discovery_event',
      resolverPath: 'route_simulator_facsimile',
      sourcePath: `tmp/qa-route-simulator-manifests/${caseId}.json:discovery_event.${action.eventId || 'inline'}.followup`,
      actionType: action.type,
      target: action.target,
      disputeId: action.disputeId,
      evidenceId: action.evidenceId,
    },
  ];
}

function doEmergenceEvent(ctx) {
  const { caseId, state, action } = ctx;
  applyRouteUnlocks(state, action);
  if (action.disputeId) {
    state.disputes[action.disputeId] = {
      ...(state.disputes[action.disputeId] || {}),
      visibility: 'visible',
      emergedVia: action.eventId || action.type,
    };
  }
  return [{
    speaker: 'witness',
    text: action.text || `Emergence event opened ${action.disputeId || action.evidenceId || 'a route node'}.`,
    channel: 'emergence_event',
    resolverPath: 'route_simulator_facsimile',
    sourcePath: `tmp/qa-route-simulator-manifests/${caseId}.json:emergence_event.${action.eventId || 'inline'}`,
    actionType: action.type,
    target: action.target,
    disputeId: action.disputeId,
    evidenceId: action.evidenceId,
  }];
}

function runDetectors(trace, ctx) {
  const findings = [];
  detectUnhandledAction(trace, findings);
  detectEvidenceInvestigateNoNpcFollowup(trace, findings);
  detectMissingResponse(trace, findings);
  detectQaMismatchRuntime(trace, ctx, findings);
  detectLieStateRegression(trace, findings);
  detectEvidenceStageSkip(trace, findings);
  detectTruthLeakRuntime(trace, ctx, findings);
  detectSafeFallbackUsed(trace, findings);

  return findings.map((finding, localIndex) => ({
    id: `QARS-${String(globalFindingCounter++).padStart(4, '0')}`,
    caseId: trace.caseId,
    routeId: trace.routeId,
    phase: trace.phase,
    actionIndex: trace.actionIndex,
    actionType: trace.action.type,
    target: trace.action.target,
    disputeId: trace.action.disputeId,
    evidenceId: trace.action.evidenceId,
    localIndex: localIndex + 1,
    ...finding,
  }));
}

function detectUnhandledAction(trace, findings) {
  const unhandled = trace.outputs.find((output) => output.routeActionUnhandled);
  if (!unhandled) return;
  findings.push({
    severity: 'P0',
    category: 'route_action_unhandled',
    detectors: ['route_action_unhandled'],
    summary: `Route action is not handled by the simulator: ${trace.action.type}.`,
    expected: 'Every manifest action should have an explicit dispatch facsimile.',
    actual: unhandled.text,
    resolverPath: unhandled.resolverPath,
    sourcePath: unhandled.sourcePath,
    patchPriority: 'P0-route-simulator-coverage',
  });
}

function detectMissingResponse(trace, findings) {
  if (!RESPONSE_REQUIRED_ACTIONS.has(trace.action.type)) return;
  const npc = trace.outputs.filter((output) => output.speaker === 'a' || output.speaker === 'b' || output.speaker === 'witness');
  const safeFallback = trace.outputs.some((output) => output.safeFallback || output.resolverPath === 'fallback');
  if (npc.length > 0 || safeFallback) return;
  findings.push({
    severity: 'P0',
    category: 'response_missing',
    detectors: ['response_missing'],
    summary: `${trace.action.type} produced no NPC response and no explicit safe fallback.`,
    expected: 'At least one NPC/witness response or an explicit safe fallback after the action under the current legacy Gate spec.',
    actual: `${trace.outputs.length} visible outputs; speakers=${trace.outputs.map((output) => output.speaker).join(',') || 'none'}`,
    resolverPath: trace.outputs.map((output) => output.resolverPath).filter(Boolean).join(' | ') || 'none',
    sourcePath: trace.outputs.map((output) => output.sourcePath).filter(Boolean).join(' | ') || 'none',
    patchPriority: 'P0-runtime-response-coverage',
  });
}

function detectEvidenceInvestigateNoNpcFollowup(trace, findings) {
  if (trace.action.type !== 'evidence_investigate') return;
  const npc = trace.outputs.filter((output) => output.speaker === 'a' || output.speaker === 'b' || output.speaker === 'witness');
  const systemOnly = trace.outputs.some((output) => output.runtimeContract === 'system_only_no_auto_npc');
  if (!systemOnly || npc.length > 0) return;
  findings.push({
    severity: 'P1',
    category: 'evidence_investigate_no_npc_followup',
    detectors: ['evidence_investigate_no_npc_followup'],
    summary: 'evidence_investigate ended as a system-only discovery action with no automatic NPC follow-up.',
    expected: 'Gate option ii treats evidence_investigate as system-only; any follow-up NPC speech must be a later explicit judge_question.',
    actual: `${trace.outputs.length} system output(s); speakers=${trace.outputs.map((output) => output.speaker).join(',') || 'none'}`,
    resolverPath: trace.outputs.map((output) => output.resolverPath).filter(Boolean).join(' | ') || 'none',
    sourcePath: trace.outputs.map((output) => output.sourcePath).filter(Boolean).join(' | ') || 'none',
    patchPriority: 'P1-route-contract-observability',
  });
}

function detectQaMismatchRuntime(trace, ctx, findings) {
  for (const output of trace.outputs) {
    if ((output.speaker === 'a' || output.speaker === 'b') && trace.action.target && output.speaker !== trace.action.target) {
      findings.push(makeP0(output, 'qa_mismatch_runtime', 'NPC speaker does not match action target.', `target=${trace.action.target}`, `speaker=${output.speaker}`, 'P0-route-source-path'));
    }
    if (output.entryDisputeId && trace.action.disputeId && output.entryDisputeId !== trace.action.disputeId) {
      findings.push(makeP0(output, 'qa_mismatch_runtime', 'Scripted entry dispute does not match action dispute.', trace.action.disputeId, output.entryDisputeId, 'P0-route-source-path'));
    }
    if (output.entryQuestionType && trace.action.questionType && output.entryQuestionType !== trace.action.questionType) {
      findings.push(makeP0(output, 'qa_mismatch_runtime', 'Scripted entry questionType does not match action questionType.', trace.action.questionType, output.entryQuestionType, 'P0-route-source-path'));
    }
  }

  const npcText = trace.outputs
    .filter((output) => output.speaker === 'a' || output.speaker === 'b')
    .map((output) => output.text)
    .join(' ');
  if (!npcText || !trace.action.disputeId) return;
  const focus = buildFocusModel(ctx.caseData, trace.action.disputeId);
  if (focus.otherHit && !focus.expectedHit(npcText) && focus.otherHit(npcText)) {
    findings.push({
      severity: 'P0',
      category: 'qa_mismatch_runtime',
      detectors: ['qa_mismatch_runtime'],
      summary: 'NPC response appears to focus on another dispute in the executed route.',
      expected: `Response should stay focused on ${trace.action.disputeId}.`,
      actual: npcText,
      resolverPath: trace.outputs.map((output) => output.resolverPath).join(' | '),
      sourcePath: trace.outputs.map((output) => output.sourcePath).join(' | '),
      patchPriority: 'P0-script-focus-review',
    });
  }
}

function detectLieStateRegression(trace, findings) {
  for (const item of trace.stateDelta.lieStates || []) {
    if ((LIE_RANK[item.to] ?? 0) >= (LIE_RANK[item.from] ?? 0)) continue;
    findings.push({
      severity: 'P0',
      category: 'lie_state_regression',
      detectors: ['lie_state_regression'],
      summary: `lieState regressed for ${item.party}/${item.disputeId}.`,
      expected: 'lieState should never move to a lower disclosure state during a route.',
      actual: `${item.from} -> ${item.to}`,
      patchPriority: 'P0-lie-state-policy',
    });
  }
}

function detectEvidenceStageSkip(trace, findings) {
  for (const item of trace.stateDelta.evidence || []) {
    const beforeStage = Number(item.before?.stage || 0);
    const afterStage = Number(item.after?.stage || 0);
    if (afterStage <= beforeStage + 1) continue;
    findings.push({
      severity: 'P0',
      category: 'evidence_stage_skip',
      detectors: ['evidence_stage_skip'],
      summary: `evidenceStage skipped for ${item.evidenceId}.`,
      expected: 'Evidence investigation should advance stage by at most one step per action.',
      actual: `${beforeStage} -> ${afterStage}`,
      evidenceId: item.evidenceId,
      patchPriority: 'P0-evidence-stage-policy',
    });
  }
}

function detectTruthLeakRuntime(trace, ctx, findings) {
  for (const output of trace.outputs) {
    if (!(output.speaker === 'a' || output.speaker === 'b' || output.speaker === 'witness')) continue;
    const matched = findForbiddenNpcLexemes(output, trace, ctx.policy, ctx.caseId);
    if (matched.length === 0) continue;
    findings.push({
      severity: 'P0',
      category: 'truth_leak_runtime',
      detectors: ['truth_leak_runtime'],
      summary: `Forbidden truth lexeme exposed by runtime-selected NPC output in ${output.channel}.`,
      expected: 'No hidden truth lexeme before allowed lieState/evidenceStage/channel gate.',
      actual: `matched=${matched.join(', ')}; text=${output.text}`,
      resolverPath: output.resolverPath,
      sourcePath: output.sourcePath,
      evidenceId: output.evidenceId,
      disputeId: output.disputeId,
      target: output.target,
      patchPriority: 'P0-disclosure-gate',
    });
  }
}

function detectSafeFallbackUsed(trace, findings) {
  for (const output of trace.outputs) {
    if (!output.safeFallback && output.resolverPath !== 'fallback') continue;
    findings.push({
      severity: 'P2',
      category: 'safe_fallback_used',
      detectors: ['safe_fallback_used'],
      summary: `Safe fallback used for ${trace.action.type}.`,
      expected: 'Fallback should be visible in route results for manual review.',
      actual: output.text,
      resolverPath: output.resolverPath,
      sourcePath: output.sourcePath,
      patchPriority: 'P2-route-observability',
    });
  }
}

function makeP0(output, category, summary, expected, actual, patchPriority) {
  return {
    severity: 'P0',
    category,
    detectors: [category],
    summary,
    expected,
    actual,
    resolverPath: output.resolverPath,
    sourcePath: output.sourcePath,
    evidenceId: output.evidenceId,
    disputeId: output.disputeId,
    target: output.target,
    patchPriority,
  };
}

function createInitialState(caseData, initial) {
  const state = {
    turn: 0,
    lieStates: { a: {}, b: {} },
    evidence: {},
    disputes: {},
    dossier: {},
    witnesses: {},
    questionCounts: {},
    factTokens: {},
    lastFocusedDisputeId: initial.lastFocusedDisputeId || null,
  };

  for (const cfg of caseData.lieConfigA || []) state.lieStates.a[cfg.disputeId] = cfg.initialState || 'S0';
  for (const cfg of caseData.lieConfigB || []) state.lieStates.b[cfg.disputeId] = cfg.initialState || 'S0';
  if (initial.lieState) {
    for (const party of ['a', 'b']) {
      for (const disputeId of Object.keys(state.lieStates[party])) state.lieStates[party][disputeId] = initial.lieState;
    }
  }
  for (const [party, values] of Object.entries(initial.lieStates || {})) {
    for (const [disputeId, lieState] of Object.entries(values || {})) state.lieStates[party][disputeId] = lieState;
  }

  const base = new Set(initial.unlockedEvidence || caseData.baseEvidenceIds || []);
  for (const ev of caseData.evidence || []) {
    state.evidence[ev.id] = {
      id: ev.id,
      unlocked: base.has(ev.id),
      presented: false,
      presentedTo: [],
      stage: 0,
      deepInvestigated: false,
      investigatedActions: [],
    };
  }
  for (const [evidenceId, patch] of Object.entries(initial.evidenceStates || {})) {
    state.evidence[evidenceId] = { ...state.evidence[evidenceId], ...patch };
  }

  for (const dispute of caseData.disputes || []) {
    const hidden = dispute.hidden === true || dispute.v3Visibility === 'hidden';
    state.disputes[dispute.id] = { visibility: hidden ? 'hidden' : 'visible', emergedVia: null };
  }
  for (const [disputeId, value] of Object.entries(initial.disputeVisibility || {})) {
    state.disputes[disputeId] = { ...(state.disputes[disputeId] || {}), visibility: value };
  }

  return state;
}

function snapshotState(state) {
  return {
    turn: state.turn,
    lieStates: cloneJson(state.lieStates),
    evidence: cloneJson(state.evidence),
    disputes: cloneJson(state.disputes),
    dossier: cloneJson(state.dossier),
    witnesses: cloneJson(state.witnesses),
    lastFocusedDisputeId: state.lastFocusedDisputeId,
  };
}

function diffState(before, after) {
  const diff = { lieStates: [], evidence: [], disputes: [], dossier: [], witnesses: [] };
  for (const party of ['a', 'b']) {
    const disputeIds = new Set([...Object.keys(before.lieStates[party] || {}), ...Object.keys(after.lieStates[party] || {})]);
    for (const disputeId of disputeIds) {
      const from = before.lieStates[party]?.[disputeId];
      const to = after.lieStates[party]?.[disputeId];
      if (from !== to) diff.lieStates.push({ party, disputeId, from, to });
    }
  }
  for (const evidenceId of Object.keys(after.evidence || {})) {
    const b = before.evidence[evidenceId] || {};
    const a = after.evidence[evidenceId] || {};
    if (b.unlocked !== a.unlocked || b.presented !== a.presented || b.stage !== a.stage || b.deepInvestigated !== a.deepInvestigated) {
      diff.evidence.push({ evidenceId, before: compactEvidence(b), after: compactEvidence(a) });
    }
  }
  for (const disputeId of Object.keys(after.disputes || {})) {
    const b = before.disputes[disputeId]?.visibility;
    const a = after.disputes[disputeId]?.visibility;
    if (b !== a) diff.disputes.push({ disputeId, from: b, to: a, via: after.disputes[disputeId]?.emergedVia });
  }
  for (const dossierId of Object.keys(after.dossier || {})) {
    const b = before.dossier[dossierId]?.unlocked;
    const a = after.dossier[dossierId]?.unlocked;
    if (b !== a) diff.dossier.push({ dossierId, from: b, to: a });
  }
  for (const witnessId of Object.keys(after.witnesses || {})) {
    const b = before.witnesses[witnessId]?.questions || 0;
    const a = after.witnesses[witnessId]?.questions || 0;
    const summonedBefore = before.witnesses[witnessId]?.summoned === true;
    const summonedAfter = after.witnesses[witnessId]?.summoned === true;
    if (b !== a || summonedBefore !== summonedAfter) {
      diff.witnesses.push({ witnessId, summonedFrom: summonedBefore, summonedTo: summonedAfter, questionsFrom: b, questionsTo: a });
    }
  }
  return diff;
}

function compactEvidence(value) {
  return {
    unlocked: value.unlocked,
    presented: value.presented,
    stage: value.stage,
    deepInvestigated: value.deepInvestigated,
  };
}

function normalizeAction(action) {
  const normalized = { ...action };
  if (normalized.type === 'question') normalized.type = 'judge_question';
  if (normalized.type === 'call_witness') normalized.type = 'witness_summon';
  if (normalized.type === 'combine_evidence') normalized.type = 'evidence_combine';
  if (normalized.type === 'dossier_card') normalized.type = 'dossier';
  if (normalized.type === 'judge_question') normalized.questionType = normalized.questionType || normalized.subAction || 'fact_pursuit';
  return normalized;
}

function actionConsumesTurn(action) {
  return action.type !== 'evidence_investigate';
}

function getQuestionDepth(state, action) {
  const key = `${action.target}|${action.disputeId}|${action.questionType}`;
  const next = (state.questionCounts[key] || 0) + 1;
  state.questionCounts[key] = next;
  return Math.min(4, Math.max(1, next));
}

function trackQuestionAndMaybeTransition(state, caseData, action) {
  state.lastFocusedDisputeId = action.disputeId;
  if (!QUESTION_TYPES.includes(action.questionType)) return;
  if (action.questionType === 'fact_pursuit') {
    const tokenKey = `${action.target}|${action.disputeId}|fact`;
    const current = getLieState(state, action.target, action.disputeId);
    const threshold = LIE_RANK[current] <= 1 ? 2 : 3;
    state.factTokens[tokenKey] = (state.factTokens[tokenKey] || 0) + 1;
    if (state.factTokens[tokenKey] >= threshold) {
      state.factTokens[tokenKey] = 0;
      transitionByTrigger(state, caseData, action.target, action.disputeId, 'direct_question');
    }
    return;
  }
  const triggers = action.questionType === 'motive_search'
    ? ['motive_question', 'context_question']
    : ['empathy_question', 'provenance_question'];
  for (const trigger of triggers) {
    if (transitionByTrigger(state, caseData, action.target, action.disputeId, trigger)) break;
  }
}

function findCombinationRecipe(caseData, action) {
  const recipes = caseData.combinationLab?.recipes || [];
  if (action.recipeId) return recipes.find((recipe) => recipe.id === action.recipeId);
  const actionInputs = [...(action.inputs || [])].sort().join('|');
  return recipes.find((recipe) => [...(recipe.inputs || [])].sort().join('|') === actionInputs);
}

function findDossierOutput(caseData, dossierId) {
  return (caseData.combinationLab?.outputs || []).find((output) => output.id === dossierId);
}

function applyCombinationEffects(state, caseData, recipe, action) {
  if (recipe.outputId) {
    state.dossier[recipe.outputId] = { unlocked: true, via: recipe.id };
    const output = findDossierOutput(caseData, recipe.outputId);
    for (const effect of output?.effects || []) {
      if (effect.kind === 'unlock_note' && effect.unlockNodeId) {
        state.dossier[effect.unlockNodeId] = { unlocked: true, via: recipe.id };
      }
      if (effect.kind === 'unlock_dispute' && effect.unlockNodeId) {
        state.disputes[effect.unlockNodeId] = {
          ...(state.disputes[effect.unlockNodeId] || {}),
          visibility: 'visible',
          emergedVia: recipe.id,
        };
      }
      if (effect.kind === 'upgrade_evidence' && effect.evidenceUpgrade?.evidenceId && state.evidence[effect.evidenceUpgrade.evidenceId]) {
        state.evidence[effect.evidenceUpgrade.evidenceId].unlocked = true;
      }
    }
  }

  const matchingCombination = (caseData.evidenceCombinations || []).find((item) => (
    [...(item.requires || [])].sort().join('|') === [...(recipe.inputs || [])].filter((id) => id.startsWith('e-')).sort().join('|')
  ));
  const parties = action.target ? [action.target] : ['a', 'b'];
  for (const disputeId of recipe.proves || matchingCombination?.proves || []) {
    for (const party of parties) transitionByTrigger(state, caseData, party, disputeId, 'hard_evidence');
  }
}

function applyRouteUnlocks(state, action) {
  for (const evidenceId of action.unlockEvidence || []) {
    if (state.evidence[evidenceId]) state.evidence[evidenceId].unlocked = true;
  }
  for (const disputeId of action.unlockDisputes || []) {
    state.disputes[disputeId] = {
      ...(state.disputes[disputeId] || {}),
      visibility: 'visible',
      emergedVia: action.eventId || action.type,
    };
  }
  if (action.dossierId) state.dossier[action.dossierId] = { unlocked: true, via: action.eventId || action.type };
}

function transitionByEvidence(state, caseData, party, ev) {
  const trigger = ev.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence';
  for (const disputeId of ev.proves || []) transitionByTrigger(state, caseData, party, disputeId, trigger);
}

function transitionByTrigger(state, caseData, party, disputeId, trigger) {
  const configs = party === 'a' ? caseData.lieConfigA || [] : caseData.lieConfigB || [];
  const cfg = configs.find((item) => item.disputeId === disputeId);
  const current = getLieState(state, party, disputeId);
  const transition = (cfg?.transitions || []).find((item) => item.from === current && item.trigger === trigger);
  if (!transition) return false;
  state.lieStates[party][disputeId] = transition.to;
  return true;
}

function checkEvidenceUnlocks(state, caseData) {
  for (const ev of caseData.evidence || []) {
    const evState = state.evidence[ev.id];
    if (!evState || evState.unlocked) continue;
    const requirementsMet = (ev.requires || []).every((id) => state.evidence[id]?.presented || state.evidence[id]?.unlocked);
    if (!requirementsMet) continue;
    if (ev.requiredLieState) {
      const required = LIE_RANK[ev.requiredLieState] || 0;
      const maxRank = Math.max(0, ...(ev.proves || []).flatMap((disputeId) => [
        LIE_RANK[state.lieStates.a[disputeId] || 'S0'] || 0,
        LIE_RANK[state.lieStates.b[disputeId] || 'S0'] || 0,
      ]));
      if (maxRank < required) continue;
    }
    evState.unlocked = true;
  }
}

function getLieState(state, party, disputeId) {
  return state.lieStates?.[party]?.[disputeId] || 'S0';
}

function toLieBand(lieState) {
  if (lieState === 'S0' || lieState === 'S1') return 'early';
  if (lieState === 'S2' || lieState === 'S3') return 'mid';
  return 'late';
}

function resolveSubjectRole(ev, target) {
  const subject = ev?.subjectParty || 'both';
  if (subject === target) return 'self';
  if (subject === 'both') return 'both';
  return 'other';
}

function pickEntry(scripted, channel, key, variantId) {
  const entry = scripted.channels?.[channel]?.entries?.find((item) => item.key === key);
  if (!entry) return null;
  const variant = variantId ? entry.variants.find((item) => item.id === variantId) : entry.variants[0];
  if (!variant) return null;
  return { entry, variant };
}

function toOutput(speaker, picked, extra) {
  const tags = tagsToMap(picked.variant.tags || []);
  return {
    speaker,
    text: picked.variant.text || '',
    behaviorHint: picked.variant.behaviorHint,
    channel: extra.channel,
    resolverPath: extra.resolverPath,
    sourcePath: extra.sourcePath,
    actionType: extra.action.type,
    target: extra.target,
    disputeId: extra.disputeId,
    evidenceId: extra.evidenceId,
    lieState: extra.lieState,
    evidenceStage: extra.evidenceStage,
    variantId: picked.variant.id,
    entryKey: picked.entry.key,
    entryDisputeId: picked.entry.disputeId,
    entryQuestionType: picked.entry.questionType || tags.questionType,
    tags: picked.variant.tags || [],
  };
}

function systemOutput(text, action, resolverPath, sourcePath, channel = 'system_message') {
  return {
    speaker: 'system',
    text,
    channel,
    resolverPath,
    sourcePath,
    actionType: action.type,
    target: action.target,
    disputeId: action.disputeId,
    evidenceId: action.evidenceId,
  };
}

function findForbiddenNpcLexemes(output, trace, policy, caseId) {
  const context = {
    channel: output.channel,
    lieState: output.lieState,
    evidenceStage: output.evidenceStage ?? (output.evidenceId ? trace.stateBefore.evidence[output.evidenceId]?.stage : undefined),
  };
  if (!shouldScanNpcContext(context)) return [];

  const global = policy.forbiddenLexemes?.globalTruthLexemes || [];
  const resolved = new Set();
  if (
    context.channel === 'interrogation' ||
    context.channel === 'contradiction_pursuit' ||
    context.channel === 'evidence_present' ||
    context.channel === 'emergence_event'
  ) {
    const npcRules = policy.forbiddenLexemes?.nonConfessionNpcBeforeS5 || {};
    const stateRef = npcRules[context.lieState];
    if (stateRef === 'globalTruthLexemes') global.forEach((item) => resolved.add(item));
    else if (Array.isArray(stateRef)) stateRef.forEach((item) => resolved.add(item));
  }
  if (context.channel === 'evidence_present' && (context.evidenceStage ?? 0) <= 1) global.forEach((item) => resolved.add(item));
  for (const label of PARAPHRASE_LABELS[caseId] || []) resolved.add(label);

  const text = String(output.text || '').replace(/\s+/g, ' ');
  return [...resolved].filter((lexeme) => lexeme && text.includes(lexeme));
}

function shouldScanNpcContext(context) {
  if (context.channel === 'interrogation' || context.channel === 'contradiction_pursuit' || context.channel === 'emergence_event') {
    return LIE_RANK[context.lieState] <= 2;
  }
  if (context.channel === 'evidence_present') {
    return (context.evidenceStage ?? 0) <= 1 || LIE_RANK[context.lieState] <= 2;
  }
  return false;
}

function buildFocusModel(caseData, disputeId) {
  const target = caseData.disputes?.find((item) => item.id === disputeId);
  const other = (caseData.disputes || []).filter((item) => item.id !== disputeId);
  const expectedTokens = tokenSet([target?.name, target?.truthDescription, target?.truth].filter(Boolean).join(' '));
  const otherModels = other.map((item) => ({
    disputeId: item.id,
    tokens: tokenSet([item.name, item.truthDescription, item.truth].filter(Boolean).join(' ')),
  }));
  return {
    expectedHit(text) {
      return [...expectedTokens].some((token) => text.includes(token));
    },
    otherHit(text) {
      return otherModels.some((model) => [...model.tokens].some((token) => text.includes(token)));
    },
  };
}

function tokenSet(text) {
  return new Set(String(text || '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3));
}

function writeCoverageSummary(routeResults, traces, findings) {
  const coverage = buildCoverage(routeResults, traces, findings);
  writeJson(path.join(RESULT_DIR, 'coverage-summary.json'), coverage);

  const lines = [
    '# Route Simulator Coverage Summary',
    '',
    `- routes: ${coverage.totals.routes}`,
    `- actions: ${coverage.totals.actions}`,
    `- findings: ${coverage.totals.findings}`,
    `- hard findings: ${coverage.totals.hardFindings}`,
    '',
    '## Case Coverage',
  ];
  pushCounts(lines, coverage.cases);
  lines.push('', '## Route Pattern Coverage');
  pushCounts(lines, coverage.routePatterns);
  lines.push('', '## Action Coverage');
  pushCounts(lines, coverage.actions);
  lines.push('', '## Phase Coverage');
  pushCounts(lines, coverage.phases);
  lines.push('', '## Lie State Coverage');
  pushCounts(lines, coverage.lieStates);
  lines.push('', '## Evidence Stage Coverage');
  pushCounts(lines, coverage.evidenceStages);
  lines.push('', '## Finding Coverage');
  pushCounts(lines, coverage.findingsByCategory);
  fs.writeFileSync(path.join(RESULT_DIR, 'coverage-summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function buildCoverage(routeResults, traces, findings) {
  const coverage = {
    totals: {
      cases: new Set(routeResults.map((item) => item.manifest.caseId)).size,
      routes: routeResults.length,
      actions: traces.length,
      findings: findings.length,
      hardFindings: findings.filter((item) => item.severity === 'P0').length,
    },
    actions: {},
    cases: {},
    routePatterns: {},
    phases: {},
    lieStates: {},
    evidenceStages: {},
    findingsByCategory: {},
  };

  for (const trace of traces) {
    increment(coverage.actions, trace.action.type);
    increment(coverage.cases, trace.caseId);
    increment(coverage.routePatterns, trace.routePattern || 'unspecified');
    increment(coverage.phases, trace.phase || 'unknown');
    for (const party of ['a', 'b']) {
      for (const value of Object.values(trace.stateBefore.lieStates[party] || {})) increment(coverage.lieStates, value);
      for (const value of Object.values(trace.stateAfter.lieStates[party] || {})) increment(coverage.lieStates, value);
    }
    for (const evState of Object.values(trace.stateBefore.evidence || {})) increment(coverage.evidenceStages, `stage-${evState.stage || 0}`);
    for (const evState of Object.values(trace.stateAfter.evidence || {})) increment(coverage.evidenceStages, `stage-${evState.stage || 0}`);
  }
  for (const finding of findings) increment(coverage.findingsByCategory, finding.category);

  return coverage;
}

function writeCaseSummaries(routeResults, findings) {
  const byCase = new Map();
  for (const result of routeResults) {
    if (!byCase.has(result.manifest.caseId)) byCase.set(result.manifest.caseId, []);
    byCase.get(result.manifest.caseId).push(result);
  }

  for (const [caseId, results] of byCase) {
    const caseFindings = findings.filter((item) => item.caseId === caseId);
    const lines = [
      `# ${caseId} Route Summary`,
      '',
      `- routes: ${results.length}`,
      `- actions: ${results.reduce((sum, item) => sum + item.traces.length, 0)}`,
      `- findings: ${caseFindings.length}`,
      `- hard findings: ${caseFindings.filter((item) => item.severity === 'P0').length}`,
      '',
      '## Routes',
    ];
    for (const result of results) {
      lines.push(`- ${result.routeId} [${result.route.routePattern || result.route.pattern || 'unspecified'}]: ${result.route.summary || result.route.description || ''}`);
    }
    lines.push('', '## Findings');
    if (caseFindings.length === 0) lines.push('- none');
    for (const finding of caseFindings) lines.push(`- ${finding.id} [${finding.severity}/${finding.category}] ${finding.summary}`);
    fs.writeFileSync(path.join(RESULT_DIR, `${caseId}-route-summary.md`), `${lines.join('\n')}\n`, 'utf8');
  }
}

function writeAllRoutesSummary(routeResults, traces, findings) {
  const hard = findings.filter((item) => item.severity === 'P0');
  const lines = [
    '# 20260427 Route Simulator All Routes Summary',
    '',
    '- runner: `scripts/qa-route-simulator.cjs`',
    `- routes: ${routeResults.length}`,
    `- actions: ${traces.length}`,
    `- findings: ${findings.length}`,
    `- hard findings: ${hard.length}`,
    '',
    '## Routes',
  ];
  for (const result of routeResults) {
    lines.push(`- ${result.manifest.caseId}/${result.routeId} (${result.route.phase || result.manifest.phase || 'unknown'}, ${result.route.routePattern || result.route.pattern || 'unspecified'}): ${result.route.summary || result.route.description || ''}`);
  }
  lines.push('', '## P0 Findings');
  if (hard.length === 0) lines.push('- none');
  for (const finding of hard) lines.push(`- ${finding.id} [${finding.category}] ${finding.summary}`);
  fs.writeFileSync(path.join(RESULT_DIR, '20260427-all-routes-summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function writeGateSpecReport(routeResults, traces, findings) {
  const evidenceInvestigateActions = traces.filter((trace) => trace.action.type === 'evidence_investigate');
  const responseMissingFindings = findings.filter((finding) => finding.category === 'response_missing');
  const evidenceInvestigateNoFollowup = findings.filter((finding) => finding.category === 'evidence_investigate_no_npc_followup');
  const report = {
    phaseB1Spike: {
      spouse01_phase3_baseline: 'tmp/qa-route-simulator-results/route-transcripts/spouse-01-phase3-baseline.md',
      routes: routeResults.map((result) => `${result.manifest.caseId}/${result.routeId}`),
      actions: traces.length,
      evidenceInvestigateActions: evidenceInvestigateActions.length,
      responseMissingFindings: responseMissingFindings.length,
      evidenceInvestigateNoNpcFollowupFindings: evidenceInvestigateNoFollowup.length,
      legacyRouteSpotCompare: {
        source: 'tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md',
        phaseAReference: 'routes=3, actions=10, findings=3, hard=3; QARG-0003 is evidence_investigate system-only response_missing',
        phaseB3Result: 'evidence_investigate remains system-only and is reclassified from P0 response_missing to P1 evidence_investigate_no_npc_followup under Gate option ii',
        note: 'The legacy runner was not executed here because it writes to tmp/qa-runtime-gate-results; Phase B output is kept isolated.',
      },
    },
    reclassify: {
      B1_QARS_0001: 'P0 response_missing -> P1 evidence_investigate_no_npc_followup',
    },
    gateSpecOptions: GATE_SPEC_OPTIONS,
    ctRecommendation: 'Choose option ii for Phase B-3: keep runtime evidence investigation system-only, remove evidence_investigate from response-required, and emit a P1 informational evidence_investigate_no_npc_followup detector. Options i/iii require separate Phase B-6 approval because they change data/runtime behavior.',
  };
  writeJson(path.join(RESULT_DIR, 'phase-b-1-gate-spec-report.json'), report);
}

function writeSpikeSummary(routeResults, traces, findings) {
  const hard = findings.filter((item) => item.severity === 'P0');
  const byCategory = {};
  for (const finding of findings) increment(byCategory, finding.category);
  const evidenceInvestigateActions = traces.filter((trace) => trace.action.type === 'evidence_investigate').length;
  const responseMissing = byCategory.response_missing || 0;
  const evidenceInvestigateNoFollowup = byCategory.evidence_investigate_no_npc_followup || 0;

  const lines = [
    '# 20260427 Fast Tester Phase B-1 Route Simulator Spike Summary',
    '',
    '## Scope',
    '- runner: `scripts/qa-route-simulator.cjs`',
    '- mode: standalone route/runtime facsimile; no runtime source import; no LLM/browser playthrough',
    '- output root: `tmp/qa-route-simulator-results/`',
    '- manifest root: `tmp/qa-route-simulator-manifests/`',
    '',
    '## Spike Result',
    `- routes: ${routeResults.length}`,
    `- actions: ${traces.length}`,
    `- evidence_investigate actions: ${evidenceInvestigateActions}`,
    `- findings: ${findings.length}`,
    `- hard findings: ${hard.length}`,
    `- response_missing findings: ${responseMissing}`,
    `- evidence_investigate_no_npc_followup findings: ${evidenceInvestigateNoFollowup}`,
    '',
    '## Legacy Route Spot Compare',
    '- Phase A audit reference: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`',
    '- Phase A hard areas: e-4 early truth leak twice, evidence_investigate system-only response_missing once.',
    '- Phase B-1 route covers the evidence_investigate contract path; Phase B-3 reclassifies that system-only output to P1 informational under Gate option ii.',
    '- The legacy runner was not executed in this session because it writes to `tmp/qa-runtime-gate-results/`; Phase B output isolation was preserved.',
    '',
    '## P0 Findings',
  ];
  if (hard.length === 0) lines.push('- none');
  for (const finding of hard) {
    lines.push(`- ${finding.id} [${finding.category}] ${finding.summary}`);
    lines.push(`  source: ${finding.sourcePath}`);
    lines.push(`  actual: ${finding.actual}`);
  }

  lines.push('', '## Gate Spec Option Check');
  for (const option of GATE_SPEC_OPTIONS) {
    lines.push(`- (${option.id}) ${option.title}`);
    lines.push(`  runnerLoc: ${option.runnerLoc}; dataChanges: ${option.dataChanges}; runtimeImpact: ${option.runtimeImpact}`);
    lines.push(`  uxFit: ${option.uxFit}`);
    lines.push(`  recommendation: ${option.recommendation}`);
  }
  lines.push('', '## CT Recommendation');
  lines.push('- Recommend option (ii): `evidence_investigate` should be treated as system-only information acquisition, not response-required NPC interrogation.');
  lines.push('- If option (i) or (iii) is selected, split into Phase B-6 because data/runtime contracts must change.');
  lines.push('', '## Outputs');
  lines.push('- `tmp/qa-route-simulator-results/findings.json`');
  lines.push('- `tmp/qa-route-simulator-results/action-by-action-trace.json`');
  lines.push('- `tmp/qa-route-simulator-results/coverage-summary.md`');
  lines.push('- `tmp/qa-route-simulator-results/phase-b-1-gate-spec-report.json`');
  lines.push('- `tmp/qa-route-simulator-results/route-transcripts/spouse-01-phase3-baseline.md`');
  fs.writeFileSync(path.join(RESULT_DIR, '20260427-phase-b-spike-summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function loadManifests(cli) {
  if (!fs.existsSync(MANIFEST_DIR)) return [];
  const files = fs.readdirSync(MANIFEST_DIR)
    .filter((file) => file.endsWith('.json'))
    .filter((file) => !cli.caseId || file === `${cli.caseId}.json`)
    .filter((file) => cli.caseId || DEFAULT_CASES.includes(file.replace(/\.json$/, '')))
    .sort();
  return files.map((file) => readJson(path.join(MANIFEST_DIR, file)));
}

function loadContext(caseId) {
  return {
    caseId,
    caseData: readJson(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)),
    scripted: readJson(path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)),
    policy: readJson(path.join(ROOT, 'src', 'data', 'disclosurePolicy', `${caseId}.json`)),
  };
}

function parseArgs(argv) {
  return {
    caseId: valueArg(argv, '--case'),
    routeId: valueArg(argv, '--route'),
    coverageOnly: argv.includes('--coverage-only'),
    failOnHard: argv.includes('--fail-on-hard'),
  };
}

function valueArg(argv, name) {
  const eqPrefix = `${name}=`;
  const eq = argv.find((arg) => arg.startsWith(eqPrefix));
  if (eq) return normalizeCaseOrRouteArg(eq.slice(eqPrefix.length), name);
  const idx = argv.indexOf(name);
  if (idx >= 0 && argv[idx + 1] && !argv[idx + 1].startsWith('--')) return normalizeCaseOrRouteArg(argv[idx + 1], name);
  return null;
}

function normalizeCaseOrRouteArg(value, name) {
  return name === '--case' ? normalizeCaseId(value) : value;
}

function getRouteId(route) {
  return route.id || route.routeId;
}

function normalizeCaseId(caseId) {
  return String(caseId || '').replace(/^case-/, '');
}

function findEvidence(caseData, evidenceId) {
  return (caseData.evidence || []).find((item) => item.id === evidenceId);
}

function getEvidenceDisplayName(ev, evState) {
  if (!ev) return '';
  return evState?.deepInvestigated ? ev.name : (ev.surfaceName || ev.name);
}

function sourcePath(caseId, channel, key, variantId) {
  return `src/data/scriptedText/${caseId}.json:channels.${channel}.entries[key=${key}].variants[id=${variantId}]`;
}

function missingSource(caseId, channel, key) {
  return `missing:src/data/scriptedText/${caseId}.json:${channel}.${key}`;
}

function tagsToMap(tags) {
  const map = {};
  for (const tag of tags || []) {
    const idx = String(tag).indexOf(':');
    if (idx > 0) map[tag.slice(0, idx)] = tag.slice(idx + 1);
  }
  return map;
}

function pushCounts(lines, counts) {
  const entries = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  if (entries.length === 0) {
    lines.push('- none');
    return;
  }
  for (const [key, count] of entries) lines.push(`- ${key}: ${count}`);
}

function increment(map, key) {
  map[key || 'unknown'] = (map[key || 'unknown'] || 0) + 1;
}

function resetResultDir() {
  fs.rmSync(RESULT_DIR, { recursive: true, force: true });
  ensureDir(RESULT_DIR);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function writeTranscript(result) {
  const lines = [
    `# ${result.manifest.caseId}-${result.routeId}`,
    '',
    `caseId: ${result.manifest.caseId}`,
    `routeId: ${result.routeId}`,
    `phase: ${result.route.phase || result.manifest.phase || 'unknown'}`,
    `summary: ${result.route.summary || result.route.description || ''}`,
    '',
  ];

  for (const trace of result.traces) {
    lines.push(`## ${trace.actionIndex}. ${trace.action.type}`);
    lines.push('');
    lines.push(`action: \`${JSON.stringify(trace.action)}\``);
    if (
      trace.stateDelta.lieStates.length ||
      trace.stateDelta.evidence.length ||
      trace.stateDelta.disputes.length ||
      trace.stateDelta.dossier.length ||
      trace.stateDelta.witnesses.length
    ) {
      lines.push('');
      lines.push('stateDelta:');
      lines.push('```json');
      lines.push(JSON.stringify(trace.stateDelta, null, 2));
      lines.push('```');
    }
    lines.push('');
    for (const output of trace.outputs) {
      lines.push(`- ${output.speaker} [${output.channel}/${output.resolverPath}] ${output.sourcePath}`);
      lines.push(`  ${output.text}`);
    }
    if (trace.findingIds?.length) lines.push(`findings: ${trace.findingIds.join(', ')}`);
    lines.push('');
  }

  fs.writeFileSync(path.join(TRANSCRIPT_DIR, `${result.manifest.caseId}-${result.routeId}.md`), `${lines.join('\n')}\n`, 'utf8');
}
