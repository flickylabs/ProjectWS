#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_DIR = path.join(ROOT, 'tmp', 'qa-runtime-gate-manifests');
const RESULT_DIR = path.join(ROOT, 'tmp', 'qa-runtime-gate-results');
const TRANSCRIPT_DIR = path.join(RESULT_DIR, 'route-transcripts');

const CASES = ['spouse-01', 'family-01', 'friend-01'];
const QUESTION_TYPES = ['fact_pursuit', 'motive_search', 'empathy_approach'];
const RESPONSE_REQUIRED_ACTIONS = new Set([
  'judge_question',
  'evidence_present',
  'evidence_combine',
  'evidence_investigate',
  'contradiction_pursuit',
  'witness_summon',
  'witness_question',
  'dossier',
  'discovery_event',
  'emergence_event',
]);
const SURFACE_ONLY_CHANNELS = new Set([
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'system_message',
  'dossier',
]);
const INTERNAL_LABEL_RE = /\[(?:SCRIPT|FALLBACK|LLM)\]/;
const INTERNAL_TERM_RE = /\b(?:intent|classifier|guard|policy|LLM)\b|누설/;
const GENERIC_FALLBACK_RE = /잘 모르겠|모르겠습니다|답하기 어렵|말씀드리기 어렵|범위를 벗어납니다|사건과 연결되는 부분/;
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
    '친생자', '친자 관계', '출생에 관한 사실', '60대 40', '60대40',
    '40 대 60', '4 대 6',
  ],
  'friend-01': [
    '선을 넘는 메시지', '선을 넘은 말', '선을 넘은 메시지', '선 넘는 메시지',
    '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸',
    '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸',
    '거절했다는', '거절한 사실', '같은 패턴 반복',
    '같은 방식으로 돈 얘기', '다은이 아버지가 제 돈을 가져간 게 맞습니다',
  ],
};

const SAFE_CONTEXT_FALLBACKS = {
  'spouse-01:a': '재판관님, 그 질문은 제가 겪은 일과 바로 이어지지 않습니다. 사건에 관한 부분을 물어봐 주세요.',
  'spouse-01:b': '재판관님, 그 질문은 제가 확인해서 답할 수 있는 범위를 벗어납니다. 사건에 관한 부분만 말씀드리겠습니다.',
  'family-01:a': '재판관님, 그 질문은 이 일과 바로 이어지지 않습니다. 어머니 일에 관한 부분을 물어보십시오.',
  'family-01:b': '재판관님, 그 질문은 제가 답할 수 있는 범위를 벗어납니다. 확인할 수 있는 부분만 말씀드리겠습니다.',
  'friend-01:a': '재판관님, 그 질문은 지금 다루는 일과 맞지 않습니다. 확인된 이야기로 물어봐 주세요.',
  'friend-01:b': '재판관님, 그 질문은 제가 답할 수 있는 범위를 벗어납니다. 확인된 일만 말씀드리겠습니다.',
};

const args = new Set(process.argv.slice(2));
const wantedCase = valueArg('--case');
const wantedRoute = valueArg('--route');
let globalFindingCounter = 1;

main();

function main() {
  if (args.has('--legacy-route')) {
    runLegacyRouteGate();
    return;
  }

  runAllCasesFastQa();
}

function runAllCasesFastQa() {
  resetResultDir();

  const allFindings = [];
  const caseResults = [];

  for (const caseId of CASES) {
    if (wantedCase && caseId !== wantedCase) continue;
    const ctx = loadCaseScanContext(caseId);
    const result = scanCaseAllVariants(ctx);
    allFindings.push(...result.findings);
    caseResults.push(result);
    writeCaseSummary(result);
  }

  writeJson(path.join(RESULT_DIR, 'findings.json'), allFindings);
  writeAllCasesSummary(caseResults, allFindings);
  writeChannelSummary(caseResults, allFindings);
  writePatchPrioritySummary(caseResults, allFindings);

  const hardCount = allFindings.filter((f) => f.severity === 'P0').length;
  const candidateCount = allFindings.length - hardCount;
  const variantCount = caseResults.reduce((sum, result) => sum + result.stats.scriptedVariants, 0);
  console.log(`qa-runtime-gate: mode=all-cases cases=${caseResults.length} scriptedVariants=${variantCount} findings=${allFindings.length} hard=${hardCount} candidates=${candidateCount}`);
  console.log(`results: ${path.relative(ROOT, RESULT_DIR)}`);

  if (args.has('--fail-on-hard') && hardCount > 0) process.exit(1);
}

function runLegacyRouteGate() {
  ensureDir(RESULT_DIR);
  ensureDir(TRANSCRIPT_DIR);

  const manifests = loadManifests();
  const traces = [];
  const findings = [];

  for (const manifest of manifests) {
    if (wantedCase && manifest.caseId !== wantedCase) continue;
    for (const route of manifest.routes || []) {
      if (wantedRoute && route.routeId !== wantedRoute) continue;
      const result = runRoute(manifest, route);
      traces.push(...result.traces);
      findings.push(...result.findings);
      writeTranscript(result);
    }
  }

  writeJson(path.join(RESULT_DIR, 'findings.json'), findings);
  writeJson(path.join(RESULT_DIR, 'action-by-action-trace.json'), traces);
  writeResolverSummary(traces, findings);
  writeSourceSummary(traces);
  writeSpikeSummary(traces, findings);

  const hardCount = findings.filter((f) => f.severity === 'P0').length;
  const candidateCount = findings.length - hardCount;
  console.log(`qa-runtime-gate: routes=${new Set(traces.map((t) => t.routeId)).size} actions=${traces.length} findings=${findings.length} hard=${hardCount} candidates=${candidateCount}`);
  console.log(`results: ${path.relative(ROOT, RESULT_DIR)}`);

  if (args.has('--fail-on-hard') && hardCount > 0) process.exit(1);
}

function resetResultDir() {
  fs.rmSync(RESULT_DIR, { recursive: true, force: true });
  ensureDir(RESULT_DIR);
}

function loadCaseScanContext(caseId) {
  return {
    caseId,
    caseData: readJson(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)),
    scripted: readJson(path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)),
    policy: readJson(path.join(ROOT, 'src', 'data', 'disclosurePolicy', `${caseId}.json`)),
    emergenceHooks: readEmergenceHooks(caseId),
  };
}

function scanCaseAllVariants(ctx) {
  const findings = [];
  const stats = {
    caseId: ctx.caseId,
    scriptedEntries: 0,
    scriptedVariants: 0,
    caseTextFields: 0,
    policyTextFields: 0,
    emergenceVariants: 0,
    channels: {},
  };

  scanScriptedText(ctx, findings, stats);
  scanGeneratedCaseData(ctx, findings, stats);
  scanDisclosurePolicy(ctx, findings, stats);
  scanEmergenceHooks(ctx, findings, stats);
  scanResponseCoverage(ctx, findings, stats);

  return { caseId: ctx.caseId, stats, findings };
}

function scanScriptedText(ctx, findings, stats) {
  for (const [channel, channelData] of Object.entries(ctx.scripted.channels || {})) {
    const entries = channelData.entries || [];
    const channelStats = getChannelStats(stats, channel);
    channelStats.entries += entries.length;
    stats.scriptedEntries += entries.length;

    entries.forEach((entry, entryIndex) => {
      const variants = entry.variants || [];
      if (variants.length === 0) {
        addFinding(findings, {
          caseId: ctx.caseId,
          severity: 'P0',
          category: 'response_missing',
          detectors: ['response_missing'],
          summary: `Scripted entry has no variants in ${channel}.`,
          expected: 'Every scripted entry must provide at least one visible response variant.',
          actual: 'variants=[]',
          sourceKind: 'scriptedText',
          sourcePath: scriptedEntrySourcePath(ctx.caseId, channel, entry.key || entryIndex),
          channel,
          entryKey: entry.key,
          patchPriority: 'P0-scripted-response-coverage',
        });
      }

      variants.forEach((variant, variantIndex) => {
        stats.scriptedVariants += 1;
        channelStats.variants += 1;
        const item = scriptedVariantToScanItem(ctx.caseId, channel, entry, variant, entryIndex, variantIndex);
        scanVisibleText(ctx, findings, item);
        if (variant.behaviorHint) {
          scanVisibleText(ctx, findings, {
            ...item,
            text: variant.behaviorHint,
            textField: 'behaviorHint',
            sourcePath: `${item.sourcePath}.behaviorHint`,
            behaviorHint: true,
          });
        }
      });
    });
  }
}

function scriptedVariantToScanItem(caseId, channel, entry, variant, entryIndex, variantIndex) {
  const tags = tagsToMap(variant.tags || []);
  const speaker = tags.speaker || entry.party || entry.targetParty || entry.speaker || 'unknown';
  const party = speaker === 'a' || speaker === 'b' ? speaker : entry.party || tags.targetParty;
  return {
    caseId,
    sourceKind: 'scriptedText',
    sourcePath: scriptedVariantSourcePath(caseId, channel, entry.key || entryIndex, variant.id || variantIndex),
    textField: 'text',
    text: variant.text || '',
    channel,
    speaker,
    party,
    target: entry.targetParty || tags.targetParty || entry.party,
    entryKey: entry.key,
    variantId: variant.id,
    entry,
    variant,
    tags,
    disputeId: entry.disputeId || tags.disputeId,
    evidenceId: entry.evidenceId || tags.evidenceId,
    witnessId: entry.witnessId || tags.witnessId,
    questionType: entry.questionType || tags.questionType,
    lieState: entry.lieState || tags.lieState,
    lieBand: entry.lieBand || tags.lieBand,
    evidenceStage: normalizeEvidenceStage(entry.investigationStage || entry.stage || tags.stage),
    reveal: entry.truthLevel || tags.reveal,
    revealGuard: tags.revealGuard,
  };
}

function scanGeneratedCaseData(ctx, findings, stats) {
  for (const ev of ctx.caseData.evidence || []) {
    scanCaseTextField(ctx, findings, stats, ev.surfaceName, {
      sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.surfaceName`,
      textField: 'surfaceName',
      evidenceId: ev.id,
      evidenceStage: 0,
      surfaceText: true,
    });
    scanCaseTextField(ctx, findings, stats, ev.surfaceDescription, {
      sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.surfaceDescription`,
      textField: 'surfaceDescription',
      evidenceId: ev.id,
      evidenceStage: 0,
      surfaceText: true,
    });
    scanCaseTextField(ctx, findings, stats, ev.description, {
      sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.description`,
      textField: 'description',
      evidenceId: ev.id,
      evidenceStage: 0,
      hiddenText: true,
    });

    for (const [key, value] of Object.entries(ev.investigationResults || {})) {
      scanCaseTextField(ctx, findings, stats, value, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.investigationResults.${key}`,
        textField: `investigationResults.${key}`,
        channel: 'evidence_discovery',
        evidenceId: ev.id,
        disputeId: ev.proves?.[0],
        evidenceStage: stageForInvestigationKey(key),
      });
    }

    for (const stage of ev.investigationStages || []) {
      const stageNumber = normalizeEvidenceStage(stage.stage);
      scanCaseTextField(ctx, findings, stats, stage.label, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.investigationStages.${stage.stage}.label`,
        textField: 'investigationStage.label',
        evidenceId: ev.id,
        evidenceStage: stageNumber,
        surfaceText: stageNumber <= 1,
      });
      scanCaseTextField(ctx, findings, stats, stage.unlockHint, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.investigationStages.${stage.stage}.unlockHint`,
        textField: 'investigationStage.unlockHint',
        evidenceId: ev.id,
        evidenceStage: stageNumber,
        surfaceText: stageNumber <= 1,
      });
      scanCaseTextField(ctx, findings, stats, stage.question?.text, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.investigationStages.${stage.stage}.question.text`,
        textField: 'investigationStage.question.text',
        channel: 'judge_question',
        evidenceId: ev.id,
        disputeId: ev.proves?.[0],
        evidenceStage: stageNumber,
      });
    }

    for (const plan of ev.v3DepthPlan || []) {
      const stageNumber = stageForDepthPlan(plan.id);
      scanCaseTextField(ctx, findings, stats, plan.summary, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.v3DepthPlan.${plan.id}.summary`,
        textField: 'v3DepthPlan.summary',
        evidenceId: ev.id,
        evidenceStage: stageNumber,
        surfaceText: stageNumber <= 1,
      });
    }

    for (const [party, partyContext] of Object.entries(ev.partyContext || {})) {
      scanCaseTextField(ctx, findings, stats, partyContext.questionAngle, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.partyContext.${party}.questionAngle`,
        textField: 'partyContext.questionAngle',
        channel: 'judge_question',
        evidenceId: ev.id,
        disputeId: ev.proves?.[0],
        target: party,
        evidenceStage: 0,
      });
      scanCaseTextField(ctx, findings, stats, partyContext.implication, {
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.partyContext.${party}.implication`,
        textField: 'partyContext.implication',
        evidenceId: ev.id,
        disputeId: ev.proves?.[0],
        target: party,
        evidenceStage: 0,
        hiddenText: true,
      });
    }
  }

  for (const [index, recipe] of (ctx.caseData.combinationLab?.recipes || []).entries()) {
    scanCaseTextField(ctx, findings, stats, recipe.discoveryText, {
      sourcePath: `src/data/cases/generated/${ctx.caseId}.json:combinationLab.recipes.${recipe.id || index}.discoveryText`,
      textField: 'discoveryText',
      channel: 'player_discovered',
      evidenceId: (recipe.inputs || []).filter((id) => /^e-/.test(id)).join('+') || undefined,
      playerDiscovered: true,
    });
  }
}

function scanCaseTextField(ctx, findings, stats, text, extra) {
  if (text === undefined || text === null || text === '') return;
  stats.caseTextFields += 1;
  scanVisibleText(ctx, findings, {
    caseId: ctx.caseId,
    sourceKind: 'caseData',
    channel: extra.channel || 'case_data',
    speaker: 'system',
    text: String(text),
    ...extra,
  });
}

function scanDisclosurePolicy(ctx, findings, stats) {
  for (const [evidenceId, ev] of Object.entries(ctx.policy.surfaceMap?.evidence || {})) {
    for (const field of ['surfaceName', 'surfaceDescription']) {
      if (!ev[field]) continue;
      stats.policyTextFields += 1;
      scanVisibleText(ctx, findings, {
        caseId: ctx.caseId,
        sourceKind: 'disclosurePolicy',
        sourcePath: `src/data/disclosurePolicy/${ctx.caseId}.json:surfaceMap.evidence.${evidenceId}.${field}`,
        textField: field,
        channel: 'system_message',
        speaker: 'system',
        text: String(ev[field]),
        evidenceId,
        evidenceStage: 0,
        surfaceText: true,
      });
    }
  }

  for (const entry of policyDiscoveryEntries(ctx.policy)) {
    for (const field of ['surfaceFallback']) {
      if (!entry.value?.[field]) continue;
      stats.policyTextFields += 1;
      scanVisibleText(ctx, findings, {
        caseId: ctx.caseId,
        sourceKind: 'disclosurePolicy',
        sourcePath: `src/data/disclosurePolicy/${ctx.caseId}.json:discoveryText.entries.${entry.id}.${field}`,
        textField: `discoveryText.${field}`,
        channel: 'system_message',
        speaker: 'system',
        text: String(entry.value[field]),
        evidenceId: (entry.value.inputs || []).filter((id) => /^e-/.test(id)).join('+') || undefined,
        evidenceStage: 0,
        surfaceText: true,
      });
    }

    const truthTerms = entry.value?.truthLexemes || entry.value?.truthTerms || [];
    const sourceText = entry.value?.sourceText;
    if (sourceText && truthTerms.length > 0 && !entry.value?.gate) {
      addFinding(findings, {
        caseId: ctx.caseId,
        severity: 'P1',
        category: 'evidence_stage_truth_description_exposure',
        detectors: ['evidence_stage_before_hidden_truth'],
        summary: `Policy discovery sourceText contains truth terms without an explicit gate: ${entry.id}.`,
        expected: 'Truth-bearing discovery text should declare route/evidence/truth-stage gates.',
        actual: `truthTerms=${truthTerms.join(', ')}; text=${snippet(sourceText)}`,
        sourceKind: 'disclosurePolicy',
        sourcePath: `src/data/disclosurePolicy/${ctx.caseId}.json:discoveryText.entries.${entry.id}.sourceText`,
        channel: 'player_discovered',
        evidenceId: (entry.value.inputs || []).filter((id) => /^e-/.test(id)).join('+') || undefined,
        patchPriority: 'P1-discovery-gate-review',
      });
    }
  }
}

function scanEmergenceHooks(ctx, findings, stats) {
  for (const [disputeId, hook] of Object.entries(ctx.emergenceHooks || {})) {
    for (const variant of hook.variants || []) {
      stats.emergenceVariants += 1;
      const lieState = variant.tone === 'resignation' ? 'S5' : variant.tone === 'confession' ? 'S3' : 'S0';
      scanVisibleText(ctx, findings, {
        caseId: ctx.caseId,
        sourceKind: 'emergenceHooks',
        sourcePath: `src/data/emergenceHooks.ts:${ctx.caseId}.${disputeId}.${variant.tone}.text`,
        textField: 'text',
        channel: 'emergence_event',
        speaker: hook.speaker,
        party: hook.speaker,
        target: hook.speaker,
        text: variant.text,
        disputeId,
        lieState,
        variantId: variant.tone,
      });
      scanVisibleText(ctx, findings, {
        caseId: ctx.caseId,
        sourceKind: 'emergenceHooks',
        sourcePath: `src/data/emergenceHooks.ts:${ctx.caseId}.${disputeId}.${variant.tone}.behaviorHint`,
        textField: 'behaviorHint',
        channel: 'emergence_event',
        speaker: hook.speaker,
        party: hook.speaker,
        target: hook.speaker,
        text: variant.behaviorHint,
        disputeId,
        lieState,
        variantId: variant.tone,
        behaviorHint: true,
      });
    }
  }
}

function scanResponseCoverage(ctx, findings) {
  for (const [channel, channelData] of Object.entries(ctx.scripted.channels || {})) {
    for (const entry of channelData.entries || []) {
      for (const variant of entry.variants || []) {
        if (String(variant.text || '').trim()) continue;
        addFinding(findings, {
          caseId: ctx.caseId,
          severity: 'P0',
          category: 'response_missing',
          detectors: ['response_missing'],
          summary: `Scripted variant text is empty in ${channel}.`,
          expected: 'Every selected variant must render visible text.',
          actual: `variantId=${variant.id || 'unknown'} text is empty`,
          sourceKind: 'scriptedText',
          sourcePath: scriptedVariantSourcePath(ctx.caseId, channel, entry.key, variant.id),
          channel,
          entryKey: entry.key,
          variantId: variant.id,
          patchPriority: 'P0-scripted-response-coverage',
        });
      }
    }
  }

  for (const ev of ctx.caseData.evidence || []) {
    const expectedKeys = (ev.investigationStages || [])
      .map((stage) => stage.revealKey)
      .filter(Boolean);
    for (const key of expectedKeys) {
      if (ev.investigationResults?.[key]) continue;
      addFinding(findings, {
        caseId: ctx.caseId,
        severity: 'P0',
        category: 'response_missing',
        detectors: ['response_missing'],
        summary: `Evidence investigation revealKey is missing response text: ${ev.id}.${key}.`,
        expected: 'Every investigationStage.revealKey must resolve to investigationResults text.',
        actual: `missing investigationResults.${key}`,
        sourceKind: 'caseData',
        sourcePath: `src/data/cases/generated/${ctx.caseId}.json:evidence.${ev.id}.investigationResults.${key}`,
        channel: 'evidence_discovery',
        evidenceId: ev.id,
        patchPriority: 'P0-case-data-response-coverage',
      });
    }
  }
}

function scanVisibleText(ctx, findings, item) {
  const text = String(item.text || '');
  if (!text) return;

  detectTruthLexemeLeaks(ctx, findings, item, text);
  detectEvidenceStageLeaks(ctx, findings, item, text);
  detectLockedEvidenceNameLeaks(ctx, findings, item, text);
  detectQaMismatchCandidates(ctx, findings, item, text);
  detectFallbackCandidates(findings, item, text);
  detectInternalTermLeaks(findings, item, text);
  detectKoreanPolishCandidates(findings, item, text);
}

function detectTruthLexemeLeaks(ctx, findings, item, text) {
  const surfaceLexemes = getSurfaceOnlyLexemes(ctx.policy, item.channel);
  const surfaceMatches = matchLexemes(text, surfaceLexemes);
  if (surfaceMatches.length > 0) {
    addFinding(findings, {
      ...findingBase(item),
      severity: 'P0',
      category: 'surface_only_channel_truth_leak',
      detectors: ['truth_lexeme_early_exposure', 'surface_only_channel_truth_leak'],
      summary: `Truth lexeme appears in surface-only channel ${item.channel}.`,
      expected: 'Surface-only channels must use policy surface substitutes and must not reveal truth lexemes.',
      actual: matchedActual(surfaceMatches, text),
      matchedLexemes: surfaceMatches,
      patchPriority: 'P0-disclosure-gate',
    });
  }

  const speakerIsNpc = item.speaker === 'a' || item.speaker === 'b';
  if (speakerIsNpc && isEarlyLieState(item.lieState)) {
    const npcLexemes = getNpcBlockedLexemes(ctx.policy, item.speaker, item.lieState, ctx.caseId);
    const npcMatches = matchLexemes(text, npcLexemes);
    if (npcMatches.length > 0) {
      addFinding(findings, {
        ...findingBase(item),
        severity: 'P0',
        category: 'npc_truth_leak_s0_s2',
        detectors: ['truth_lexeme_early_exposure', 's0_s2_npc_truth_leak'],
        summary: `NPC truth lexeme appears before confession gate (${item.speaker}/${item.lieState || 'unknown'}).`,
        expected: 'S0-S2 NPC lines should deny, hedge, or use surface substitutes without truth lexemes.',
        actual: matchedActual(npcMatches, text),
        matchedLexemes: npcMatches,
        patchPriority: 'P0-disclosure-gate',
      });
    }
  }

  if (!surfaceMatches.length && !speakerIsNpc && isEarlyTruthContext(item)) {
    const globalMatches = matchLexemes(text, getGlobalTruthLexemes(ctx.policy, ctx.caseId));
    if (globalMatches.length > 0) {
      addFinding(findings, {
        ...findingBase(item),
        severity: 'P0',
        category: 'truth_lexeme_early_exposure',
        detectors: ['truth_lexeme_early_exposure'],
        summary: 'Truth lexeme appears before the context is allowed to reveal it.',
        expected: 'Pre-reveal text must stay on surface-safe wording.',
        actual: matchedActual(globalMatches, text),
        matchedLexemes: globalMatches,
        patchPriority: 'P0-disclosure-gate',
      });
    }
  }
}

function detectEvidenceStageLeaks(ctx, findings, item, text) {
  if (item.playerDiscovered) return;
  const stage = item.evidenceStage;
  if (stage === undefined || stage === null || stage >= 3) return;

  const evidenceIds = splitEvidenceIds(item.evidenceId);
  for (const evidenceId of evidenceIds) {
    const lexemes = getEvidenceTruthLexemes(ctx, evidenceId);
    const matches = matchLexemes(text, lexemes);
    if (matches.length === 0) continue;
    addFinding(findings, {
      ...findingBase(item),
      severity: stage <= 1 ? 'P0' : 'P1',
      category: 'evidence_stage_truth_description_exposure',
      detectors: ['evidence_stage_before_hidden_truth'],
      summary: `Evidence truth text appears before deep investigation stage: ${evidenceId}.`,
      expected: 'Stub/excerpt/request-original surfaces should not expose hidden/truth description terms.',
      actual: `stage=${stage}; ${matchedActual(matches, text)}`,
      matchedLexemes: matches,
      evidenceId,
      patchPriority: stage <= 1 ? 'P0-evidence-stage-gate' : 'P1-evidence-stage-review',
    });
  }
}

function detectLockedEvidenceNameLeaks(ctx, findings, item, text) {
  for (const ev of ctx.caseData.evidence || []) {
    if (!ev.name || ev.name === ev.surfaceName) continue;
    if (!text.includes(ev.name)) continue;
    if (item.sourceKind === 'caseData' && item.textField === 'name') continue;

    const isSurfaceNameField = item.textField === 'surfaceName';
    const preUnlock = item.surfaceText || SURFACE_ONLY_CHANNELS.has(item.channel) || (item.evidenceStage ?? 0) < 3 || item.lieBand === 'early' || item.lieBand === 'mid';
    if (!isSurfaceNameField && !preUnlock) continue;

    addFinding(findings, {
      ...findingBase(item),
      severity: 'P0',
      category: isSurfaceNameField ? 'surface_name_violation' : 'locked_evidence_name_exposed',
      detectors: ['locked_evidence_name_exposed', 'surfaceName_violation'],
      summary: `Locked evidence name appears where surfaceName should be used: ${ev.id}.`,
      expected: `Use surfaceName until unlock/deep investigation: ${ev.surfaceName || ev.id}.`,
      actual: snippet(text),
      evidenceId: ev.id,
      patchPriority: 'P0-surface-name-gate',
    });
  }
}

function detectQaMismatchCandidates(ctx, findings, item, text) {
  if (!item.entry || !item.variant) return;
  const tags = item.tags || {};
  const mismatches = [];
  if (tags.speaker && item.entry.party && tags.speaker !== item.entry.party) mismatches.push(`speaker tag ${tags.speaker} != entry.party ${item.entry.party}`);
  if (tags.disputeId && item.entry.disputeId && tags.disputeId !== item.entry.disputeId) mismatches.push(`disputeId tag ${tags.disputeId} != entry.disputeId ${item.entry.disputeId}`);
  if (tags.evidenceId && item.entry.evidenceId && tags.evidenceId !== item.entry.evidenceId) mismatches.push(`evidenceId tag ${tags.evidenceId} != entry.evidenceId ${item.entry.evidenceId}`);
  if (tags.questionType && item.entry.questionType && tags.questionType !== item.entry.questionType) mismatches.push(`questionType tag ${tags.questionType} != entry.questionType ${item.entry.questionType}`);
  if (tags.channel && !channelTagMatches(item.channel, tags.channel)) mismatches.push(`channel tag ${tags.channel} != channel ${item.channel}`);

  if (mismatches.length > 0) {
    addFinding(findings, {
      ...findingBase(item),
      severity: 'P1',
      category: 'qa_mismatch_candidate',
      detectors: ['qa_mismatch_candidate'],
      summary: 'Scripted entry metadata and variant tags disagree.',
      expected: 'Entry fields, tags, and channel should point to the same Q-A context.',
      actual: mismatches.join('; '),
      patchPriority: 'P1-script-metadata-review',
    });
  }

  if (!item.disputeId || item.behaviorHint) return;
  const focus = buildFocusModel(ctx.caseData, item.disputeId);
  if (focus.otherHit(text) && !focus.expectedHit(text)) {
    addFinding(findings, {
      ...findingBase(item),
      severity: 'P1',
      category: 'qa_mismatch_candidate',
      detectors: ['qa_mismatch_candidate'],
      summary: 'Response appears to focus on another dispute.',
      expected: `Text should stay focused on ${item.disputeId} unless explicitly bridging disputes.`,
      actual: snippet(text),
      patchPriority: 'P1-script-focus-review',
    });
  }
}

function detectFallbackCandidates(findings, item, text) {
  if (GENERIC_FALLBACK_RE.test(text) || /답변을 준비|자료가 없습니다|확인된 일만|사건에 관한 부분/.test(text)) {
    addFinding(findings, {
      ...findingBase(item),
      severity: 'P2',
      category: 'generic_fallback_candidate',
      detectors: ['generic_fallback_candidate', 'archetype_irrelevant_fallback_candidate'],
      summary: 'Generic fallback-like wording found.',
      expected: 'Fallbacks should be explicit safe fallbacks or character/archetype-specific.',
      actual: snippet(text),
      patchPriority: 'P2-fallback-polish',
    });
  }
}

function detectInternalTermLeaks(findings, item, text) {
  const internalMatches = [];
  if (INTERNAL_LABEL_RE.test(text)) internalMatches.push('[SCRIPT/FALLBACK/LLM]');
  if (INTERNAL_TERM_RE.test(text)) internalMatches.push('internal term');
  const rawMatches = text.match(/\b(?:lieState|truthLexeme|evidenceId|disputeId|DossierCard|fallback|classifier|guard|policy|route|Phase)\b|(?:^|[^\w])(?:S[0-5]|d-\d+|h-d\d+|e-\d+|dc-\d+)(?:$|[^\w])/g) || [];
  internalMatches.push(...rawMatches.map((m) => m.trim()).filter(Boolean));
  if (internalMatches.length === 0) return;

  addFinding(findings, {
    ...findingBase(item),
    severity: INTERNAL_LABEL_RE.test(text) ? 'P0' : 'P1',
    category: 'internal_label_or_term_exposed',
    detectors: ['internal_label_exposed', 'internal_term_exposed'],
    summary: 'Internal label or implementation term appears in visible text.',
    expected: 'Visible text should not expose labels, ids, runtime terms, or implementation terminology.',
    actual: `matched=${unique(internalMatches).join(', ')}; text=${snippet(text)}`,
    matchedLexemes: unique(internalMatches),
    patchPriority: 'P1-surface-copy-hygiene',
  });
}

function detectKoreanPolishCandidates(findings, item, text) {
  const issues = [];
  if (/[�]/.test(text)) issues.push('replacement-character');
  if (/\?\?/.test(text)) issues.push('double-question-mark');
  if (/\.\.\./.test(text)) issues.push('ascii-ellipsis');
  if (/\s+[,.!?]/.test(text)) issues.push('space-before-punctuation');
  if (/[A-Z]→|→[A-Z]|\b[AB]\b/.test(text)) issues.push('raw-A/B-label');
  if (/[A-Za-z]{4,}/.test(text) && !/\b(?:SNS|CCTV|GPS|USB|AI)\b/.test(text)) issues.push('english-token-review');
  if (text.length > 260 && /[가-힣]/.test(text) && !item.behaviorHint) issues.push('long-dialogue-line');
  if (issues.length === 0) return;

  addFinding(findings, {
    ...findingBase(item),
    severity: 'P2',
    category: 'korean_polish_candidate',
    detectors: ['korean_polish_candidate'],
    summary: 'Korean copy polish candidate found.',
    expected: 'Korean UI/dialogue text should avoid mojibake, raw labels, awkward punctuation, and overly long lines.',
    actual: `issues=${issues.join(', ')}; text=${snippet(text)}`,
    patchPriority: 'P2-korean-polish',
  });
}

function findingBase(item) {
  return {
    caseId: item.caseId,
    sourceKind: item.sourceKind,
    sourcePath: item.sourcePath,
    textField: item.textField,
    channel: item.channel,
    speaker: item.speaker,
    target: item.target,
    disputeId: item.disputeId,
    evidenceId: item.evidenceId,
    witnessId: item.witnessId,
    lieState: item.lieState,
    lieBand: item.lieBand,
    evidenceStage: item.evidenceStage,
    entryKey: item.entryKey,
    variantId: item.variantId,
  };
}

function addFinding(findings, finding) {
  findings.push({
    id: `QARG-${String(globalFindingCounter++).padStart(5, '0')}`,
    ...finding,
  });
}

function getSurfaceOnlyLexemes(policy, channel) {
  return resolveLexemeRef(policy, policy.forbiddenLexemes?.surfaceOnlyChannels?.[channel] || []);
}

function getNpcBlockedLexemes(policy, party, lieState, caseId) {
  const rules = policy.forbiddenLexemes?.nonConfessionNpcBeforeS5 || {};
  const partyKey = party === 'a' ? 'partyA' : party === 'b' ? 'partyB' : null;
  const direct = rules[lieState];
  const partySpecific = partyKey ? rules[partyKey]?.[lieState] : null;
  return unique([
    ...resolveLexemeRef(policy, partySpecific || direct || []),
    ...(PARAPHRASE_LABELS[caseId] || []),
  ]);
}

function getGlobalTruthLexemes(policy, caseId) {
  return unique([
    ...(policy.forbiddenLexemes?.globalTruthLexemes || []),
    ...(PARAPHRASE_LABELS[caseId] || []),
  ]);
}

function resolveLexemeRef(policy, value) {
  if (value === 'globalTruthLexemes') return policy.forbiddenLexemes?.globalTruthLexemes || [];
  if (Array.isArray(value)) return value;
  return [];
}

function getEvidenceTruthLexemes(ctx, evidenceId) {
  if (!evidenceId) return [];
  const fromPolicy = ctx.policy.surfaceMap?.evidence?.[evidenceId] || {};
  const ev = findEvidence(ctx.caseData, evidenceId) || {};
  return unique([
    ...(fromPolicy.truthLexemes || []),
    ...(fromPolicy.descriptionTruth || []),
    ...(ev.descriptionTruth || []),
    ...(ev.name && ev.name !== ev.surfaceName ? [ev.name] : []),
  ]);
}

function isEarlyTruthContext(item) {
  if (item.surfaceText) return true;
  if (SURFACE_ONLY_CHANNELS.has(item.channel)) return true;
  if (isEarlyLieState(item.lieState)) return true;
  if (item.lieBand === 'early') return true;
  if ((item.evidenceStage ?? 99) <= 1) return true;
  return false;
}

function isEarlyLieState(lieState) {
  return lieState === 'S0' || lieState === 'S1' || lieState === 'S2';
}

function normalizeEvidenceStage(stage) {
  if (stage === undefined || stage === null || stage === '') return undefined;
  if (typeof stage === 'number') return stage;
  if (/^\d+$/.test(String(stage))) return Number(stage);
  return stageForInvestigationKey(String(stage));
}

function stageForInvestigationKey(key) {
  if (key === 'request_original') return 1;
  if (key === 'check_metadata') return 2;
  if (key === 'restore_context') return 3;
  return undefined;
}

function stageForDepthPlan(id) {
  const order = { stub: 0, excerpt: 1, original: 2, context: 3, established: 4 };
  return order[id] ?? undefined;
}

function matchLexemes(text, lexemes) {
  const normalized = String(text || '').replace(/\s+/g, ' ');
  return unique((lexemes || [])
    .filter(Boolean)
    .map(String)
    .filter((lexeme) => lexeme.length >= 2)
    .filter((lexeme) => normalized.includes(lexeme)));
}

function splitEvidenceIds(value) {
  return String(value || '')
    .split('+')
    .map((item) => item.trim())
    .filter((item) => /^e-/.test(item));
}

function policyDiscoveryEntries(policy) {
  const entries = policy.discoveryText?.entries || {};
  if (Array.isArray(entries)) return entries.map((value, index) => ({ id: value.id || index, value }));
  return Object.entries(entries).map(([id, value]) => ({ id, value }));
}

function channelTagMatches(channel, tagChannel) {
  if (channel === tagChannel) return true;
  const aliases = {
    evidence_discovery: new Set(['evidence_discovery_sequence']),
    trust_action: new Set(['trust_action_response']),
  };
  return aliases[channel]?.has(tagChannel) || false;
}

function getChannelStats(stats, channel) {
  if (!stats.channels[channel]) stats.channels[channel] = { entries: 0, variants: 0 };
  return stats.channels[channel];
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function snippet(text, max = 180) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

function matchedActual(matches, text) {
  return `matched=${matches.join(', ')}; text=${snippet(text)}`;
}

function scriptedEntrySourcePath(caseId, channel, key) {
  return `src/data/scriptedText/${caseId}.json:channels.${channel}.entries[key=${key}]`;
}

function scriptedVariantSourcePath(caseId, channel, key, variantId) {
  return `src/data/scriptedText/${caseId}.json:channels.${channel}.entries[key=${key}].variants[id=${variantId}]`;
}

function writeAllCasesSummary(caseResults, findings) {
  const bySeverity = countBy(findings, 'severity');
  const byCategory = countBy(findings, 'category');
  const byDetector = countByDetector(findings);
  const lines = [
    '# 20260427 All-Cases Runtime QA Gate Summary',
    '',
    '## Scope',
    '- runner: `scripts/qa-runtime-gate.cjs`',
    '- mode: all-cases fast QA simulator, static/facsimile scan',
    `- cases: ${caseResults.map((result) => result.caseId).join(', ')}`,
    `- scripted variants scanned: ${caseResults.reduce((sum, result) => sum + result.stats.scriptedVariants, 0)}`,
    `- scripted entries scanned: ${caseResults.reduce((sum, result) => sum + result.stats.scriptedEntries, 0)}`,
    `- case data text fields scanned: ${caseResults.reduce((sum, result) => sum + result.stats.caseTextFields, 0)}`,
    `- disclosure policy text fields scanned: ${caseResults.reduce((sum, result) => sum + result.stats.policyTextFields, 0)}`,
    `- emergence hook variants scanned: ${caseResults.reduce((sum, result) => sum + result.stats.emergenceVariants, 0)}`,
    '',
    '## Constraints',
    '- OpenAI calls: none',
    '- browser full playthrough: none',
    '- runtime/source patch: none',
    '- ScriptedText/caseData mutation: none',
    '- `src/data/emergenceHooks.ts`: read-only scan',
    '',
    '## Findings',
    `- total: ${findings.length}`,
    `- P0: ${bySeverity.P0 || 0}`,
    `- P1: ${bySeverity.P1 || 0}`,
    `- P2: ${bySeverity.P2 || 0}`,
    '',
    '## Detector Coverage',
    `- truth lexeme early exposure: ${byDetector.truth_lexeme_early_exposure || 0}`,
    `- surface-only channel truth leak: ${byDetector.surface_only_channel_truth_leak || 0}`,
    `- evidenceStage-before hidden/truth description exposure: ${byDetector.evidence_stage_before_hidden_truth || 0}`,
    `- locked evidence name / surfaceName violation: ${countFindingsByAnyDetector(findings, ['locked_evidence_name_exposed', 'surfaceName_violation'])}`,
    `- S0-S2 NPC truth leak: ${byDetector.s0_s2_npc_truth_leak || 0}`,
    `- response missing: ${byDetector.response_missing || 0}`,
    `- Q-A mismatch candidate: ${byDetector.qa_mismatch_candidate || 0}`,
    `- generic/archetype-irrelevant fallback candidate: ${countFindingsByAnyDetector(findings, ['generic_fallback_candidate', 'archetype_irrelevant_fallback_candidate'])}`,
    `- internal label / internal term exposure: ${countFindingsByAnyDetector(findings, ['internal_label_exposed', 'internal_term_exposed'])}`,
    `- Korean polish candidate: ${byDetector.korean_polish_candidate || 0}`,
    '',
    '## Category Counts',
    ...formatCountLines(byCategory),
    '',
    '## Case Counts',
    ...caseResults.map((result) => {
      const counts = countBy(result.findings, 'severity');
      return `- ${result.caseId}: total ${result.findings.length}, P0 ${counts.P0 || 0}, P1 ${counts.P1 || 0}, P2 ${counts.P2 || 0}`;
    }),
    '',
    '## Outputs',
    '- `tmp/qa-runtime-gate-results/findings.json`',
    '- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`',
    '- `tmp/qa-runtime-gate-results/{caseId}-summary.md`',
    '- `tmp/qa-runtime-gate-results/channel-summary.md`',
    '- `tmp/qa-runtime-gate-results/patch-priority.md`',
  ];
  fs.writeFileSync(path.join(RESULT_DIR, '20260427-all-cases-summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function writeCaseSummary(result) {
  const bySeverity = countBy(result.findings, 'severity');
  const byCategory = countBy(result.findings, 'category');
  const byChannel = countBy(result.findings, 'channel');
  const lines = [
    `# ${result.caseId} QA Runtime Gate Summary`,
    '',
    '## Scan Volume',
    `- scripted entries: ${result.stats.scriptedEntries}`,
    `- scripted variants: ${result.stats.scriptedVariants}`,
    `- case data text fields: ${result.stats.caseTextFields}`,
    `- disclosure policy text fields: ${result.stats.policyTextFields}`,
    `- emergence hook variants: ${result.stats.emergenceVariants}`,
    '',
    '## Findings',
    `- total: ${result.findings.length}`,
    `- P0: ${bySeverity.P0 || 0}`,
    `- P1: ${bySeverity.P1 || 0}`,
    `- P2: ${bySeverity.P2 || 0}`,
    '',
    '## Category Counts',
    ...formatCountLines(byCategory),
    '',
    '## Channel Counts',
    ...formatCountLines(byChannel).slice(0, 20),
    '',
    '## Top P0 Examples',
    ...formatFindingExamples(result.findings.filter((finding) => finding.severity === 'P0'), 12),
  ];
  fs.writeFileSync(path.join(RESULT_DIR, `${result.caseId}-summary.md`), `${lines.join('\n')}\n`, 'utf8');
}

function writeChannelSummary(caseResults, findings) {
  const variantsByChannel = {};
  for (const result of caseResults) {
    for (const [channel, stats] of Object.entries(result.stats.channels || {})) {
      if (!variantsByChannel[channel]) variantsByChannel[channel] = { entries: 0, variants: 0 };
      variantsByChannel[channel].entries += stats.entries;
      variantsByChannel[channel].variants += stats.variants;
    }
  }

  const findingsByChannel = groupBy(findings, 'channel');
  const lines = ['# Channel Summary', '', '| Channel | Entries | Variants | Findings | P0 | Top Categories |', '| --- | ---: | ---: | ---: | ---: | --- |'];
  for (const channel of Object.keys({ ...variantsByChannel, ...findingsByChannel }).sort()) {
    const channelFindings = findingsByChannel[channel] || [];
    const categories = formatInlineCounts(countBy(channelFindings, 'category'), 3);
    lines.push(`| ${channel || 'unknown'} | ${variantsByChannel[channel]?.entries || 0} | ${variantsByChannel[channel]?.variants || 0} | ${channelFindings.length} | ${channelFindings.filter((finding) => finding.severity === 'P0').length} | ${categories || '-'} |`);
  }
  fs.writeFileSync(path.join(RESULT_DIR, 'channel-summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function writePatchPrioritySummary(caseResults, findings) {
  const byPriority = groupBy(findings, 'patchPriority');
  const lines = ['# Patch Priority', ''];
  for (const [priority, priorityFindings] of Object.entries(byPriority).sort(([a], [b]) => a.localeCompare(b))) {
    const bySeverity = countBy(priorityFindings, 'severity');
    lines.push(`## ${priority || 'unclassified'}`);
    lines.push(`- total: ${priorityFindings.length}`);
    lines.push(`- severity: P0 ${bySeverity.P0 || 0}, P1 ${bySeverity.P1 || 0}, P2 ${bySeverity.P2 || 0}`);
    lines.push(`- cases: ${formatInlineCounts(countBy(priorityFindings, 'caseId'), 5)}`);
    lines.push(`- categories: ${formatInlineCounts(countBy(priorityFindings, 'category'), 5)}`);
    lines.push('');
    lines.push(...formatFindingExamples(priorityFindings, 8));
    lines.push('');
  }
  lines.push('## Scan Baseline');
  for (const result of caseResults) {
    lines.push(`- ${result.caseId}: ${result.stats.scriptedVariants} scripted variants, ${result.stats.caseTextFields} case text fields`);
  }
  fs.writeFileSync(path.join(RESULT_DIR, 'patch-priority.md'), `${lines.join('\n')}\n`, 'utf8');
}

function formatFindingExamples(findings, limit) {
  if (findings.length === 0) return ['- none'];
  return findings.slice(0, limit).map((finding) => `- ${finding.id} [${finding.severity}/${finding.category}] ${finding.summary} (${finding.sourcePath})`);
}

function formatCountLines(counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (entries.length === 0) return ['- none'];
  return entries.map(([key, count]) => `- ${key || 'unknown'}: ${count}`);
}

function formatInlineCounts(counts, limit) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key, count]) => `${key || 'unknown'} ${count}`)
    .join(', ');
}

function countBy(values, key) {
  const counts = {};
  for (const value of values || []) {
    const bucket = value?.[key] || 'unknown';
    counts[bucket] = (counts[bucket] || 0) + 1;
  }
  return counts;
}

function countByDetector(findings) {
  const counts = {};
  for (const finding of findings || []) {
    for (const detector of finding.detectors || []) {
      counts[detector] = (counts[detector] || 0) + 1;
    }
  }
  return counts;
}

function countFindingsByAnyDetector(findings, detectors) {
  const wanted = new Set(detectors);
  return (findings || []).filter((finding) => (finding.detectors || []).some((detector) => wanted.has(detector))).length;
}

function groupBy(values, key) {
  const groups = {};
  for (const value of values || []) {
    const bucket = value?.[key] || 'unknown';
    if (!groups[bucket]) groups[bucket] = [];
    groups[bucket].push(value);
  }
  return groups;
}

function runRoute(manifest, route) {
  const caseId = manifest.caseId;
  const caseData = readJson(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`));
  const scripted = readJson(path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`));
  const policy = readJson(path.join(ROOT, 'src', 'data', 'disclosurePolicy', `${caseId}.json`));
  const emergenceHooks = readEmergenceHooks(caseId);
  const state = createInitialState(caseData, route.initial || {});
  const traces = [];
  const findings = [];

  route.actions.forEach((action, index) => {
    const before = snapshotState(state);
    const outputs = executeAction({ caseId, caseData, scripted, policy, emergenceHooks, state, action });
    const after = snapshotState(state);
    const actionTrace = {
      caseId,
      routeId: route.routeId,
      actionIndex: index + 1,
      action,
      stateBefore: before,
      outputs,
      stateAfter: after,
      stateDelta: diffState(before, after),
    };
    const stepFindings = runDetectors(actionTrace, { caseData, policy, scripted });
    actionTrace.findingIds = stepFindings.map((f) => f.id);
    findings.push(...stepFindings);
    traces.push(actionTrace);
    state.turn += 1;
  });

  return { manifest, route, traces, findings };
}

function executeAction(ctx) {
  const { caseId, caseData, scripted, emergenceHooks, state, action } = ctx;
  switch (action.type) {
    case 'judge_question':
      return doJudgeQuestion(ctx);
    case 'evidence_present':
      return doEvidencePresent(ctx);
    case 'evidence_investigate':
      return doEvidenceInvestigate(ctx);
    case 'evidence_combine':
      return doEvidenceCombine(ctx);
    case 'contradiction_pursuit':
      return doContradictionPursuit(ctx);
    case 'witness_summon':
    case 'witness_question':
      return doWitness(ctx);
    case 'dossier':
      return doDossier(ctx);
    case 'discovery_event':
      return doDiscoveryEvent(ctx);
    case 'emergence_event':
      return doEmergenceEvent({ caseId, caseData, state, action, emergenceHooks });
    case 'free_interrogation':
      return doFreeInterrogation({ caseId, caseData, state, action });
    default:
      return [systemOutput(`Unsupported gate action: ${action.type}`, action, 'fallback', 'scripts/qa-runtime-gate.cjs')];
  }
}

function doJudgeQuestion(ctx) {
  const { caseId, scripted, state, action, caseData } = ctx;
  const outputs = [];
  const depth = action.depth || getQuestionDepth(state, action);
  const judge = pickEntry(scripted, 'judge_question', `${action.disputeId}|${action.questionType}|${depth}`, action.variantIds?.judge);
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
    outputs.push(systemOutput('재판관 질문 스크립트가 없습니다.', action, 'fallback', missingSource(caseId, 'judge_question', `${action.disputeId}|${action.questionType}|${depth}`), 'judge_question'));
  }

  const lieState = getLieState(state, action.target, action.disputeId);
  const npc = pickEntry(scripted, 'interrogation', `${action.target}|${action.disputeId}|${lieState}|${action.questionType}`, action.variantIds?.npc);
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
    outputs.push(systemOutput(`증거를 제시할 수 없습니다: ${action.evidenceId}`, action, 'fallback', missingSource(caseId, 'caseData.evidence', action.evidenceId)));
    return outputs;
  }

  evState.presented = true;
  evState.presentedTo = [...new Set([...(evState.presentedTo || []), action.target])];
  const displayName = evState.deepInvestigated ? ev.name : (ev.surfaceName || ev.name);
  outputs.push({
    speaker: 'system',
    text: `증거 제시: ${displayName}`,
    channel: 'system_message',
    resolverPath: 'runtime_system',
    sourcePath: `src/hooks/useActionDispatch.ts:getEvidenceDisplayName:${action.evidenceId}`,
    actionType: action.type,
    disputeId: ev.proves?.[0],
    evidenceId: action.evidenceId,
    target: action.target,
    evidenceStage: evState.stage,
  });

  const disputeId = action.disputeId || ev.proves?.[0];
  const lieState = getLieState(state, action.target, disputeId);
  const subjectRole = resolveSubjectRole(ev, action.target);
  const key = `${action.target}|${action.evidenceId}|${toLieBand(lieState)}|${subjectRole}`;
  let npc = pickEntry(scripted, 'evidence_present', key, action.variantIds?.npc);
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
    return [systemOutput(`증거를 조사할 수 없습니다: ${action.evidenceId}`, action, 'fallback', missingSource(caseId, 'caseData.evidence', action.evidenceId))];
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
    disputeId: ev.proves?.[0],
    target: action.target,
    evidenceStage: stageBefore,
  }].filter((output) => output.text);
}

function doEvidenceCombine(ctx) {
  const { caseId, caseData, state, action } = ctx;
  const recipe = (caseData.combinationLab?.recipes || []).find((item) => item.id === action.recipeId);
  if (!recipe) return [systemOutput(`조합 레시피가 없습니다: ${action.recipeId}`, action, 'fallback', missingSource(caseId, 'combinationLab.recipes', action.recipeId))];
  const output = (caseData.combinationLab?.outputs || []).find((item) => item.id === recipe.outputId);
  state.appliedRecipes.add(recipe.id);
  if (output) {
    for (const effect of output.effects || []) {
      if (effect.kind === 'unlock_dispute') {
        const disputeId = effect.unlockNodeId || effect.targetId;
        if (state.disputes[disputeId]?.visibility === 'hidden') {
          state.disputes[disputeId].visibility = 'emerged';
          state.disputes[disputeId].emergedVia = 'evidence_combine';
        }
      }
    }
  }
  return [{
    speaker: 'system',
    text: output?.summary || output?.noteText || output?.label || `조합 완료: ${recipe.id}`,
    channel: 'system_message',
    resolverPath: 'combination_lab',
    sourcePath: `src/data/cases/generated/${caseId}.json:combinationLab.outputs.${recipe.outputId}`,
    actionType: action.type,
    evidenceId: recipe.inputs?.filter((id) => /^e-/.test(id)).join('+') || undefined,
    disputeId: output?.effects?.find((effect) => effect.kind === 'unlock_dispute')?.unlockNodeId,
  }];
}

function doContradictionPursuit(ctx) {
  const { caseId, scripted, state, action, caseData } = ctx;
  const outputs = [];
  const lieState = getLieState(state, action.target, action.disputeId);
  const tone = LIE_RANK[lieState] >= 3 ? 'hard' : 'soft';
  const judge = pickEntry(scripted, 'judge_contradiction', `${action.disputeId}|${tone}`, action.variantIds?.judge);
  if (judge) {
    outputs.push(toOutput('judge', judge, {
      channel: 'judge_contradiction',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'judge_contradiction', judge.entry.key, judge.variant.id),
      action,
      disputeId: action.disputeId,
      target: action.target,
      lieState,
    }));
  }
  const npc = pickEntry(scripted, 'contradiction_pursuit', `${action.target}|${action.disputeId}|${lieState}`, action.variantIds?.npc);
  if (npc) {
    outputs.push(toOutput(action.target, npc, {
      channel: 'contradiction_pursuit',
      resolverPath: 'scripted',
      sourcePath: sourcePath(caseId, 'contradiction_pursuit', npc.entry.key, npc.variant.id),
      action,
      disputeId: action.disputeId,
      target: action.target,
      lieState,
    }));
  }
  transitionByTrigger(state, caseData, action.target, action.disputeId, 'contradiction_pursuit');
  return outputs;
}

function doWitness(ctx) {
  const { caseId, scripted, action } = ctx;
  const depth = action.depth || 'vague';
  const witness = pickEntry(scripted, 'witness', `${action.witnessId}|${depth}`, action.variantIds?.witness);
  if (!witness) return [];
  return [toOutput('witness', witness, {
    channel: 'witness',
    resolverPath: 'scripted',
    sourcePath: sourcePath(caseId, 'witness', witness.entry.key, witness.variant.id),
    action,
    witnessId: action.witnessId,
  })];
}

function doDossier(ctx) {
  const { caseId, scripted, state, action } = ctx;
  const lieState = getLieState(state, action.target, action.disputeId);
  const key = `${action.target}|${action.dossierQuestionId}|${toLieBand(lieState)}`;
  const dossier = pickEntry(scripted, 'dossier', key, action.variantIds?.npc);
  if (!dossier) return [];
  return [toOutput(action.target, dossier, {
    channel: 'dossier',
    resolverPath: 'scripted',
    sourcePath: sourcePath(caseId, 'dossier', dossier.entry.key, dossier.variant.id),
    action,
    target: action.target,
    disputeId: action.disputeId,
    lieState,
    dossierStage: toLieBand(lieState),
  })];
}

function doDiscoveryEvent(ctx) {
  const { caseId, caseData, scripted, state, action } = ctx;
  const ev = findEvidence(caseData, action.evidenceId);
  const evState = state.evidence[action.evidenceId];
  if (!ev) return [systemOutput(`Evidence definition not found: ${action.evidenceId}`, action, 'fallback', missingSource(caseId, 'caseData.evidence', action.evidenceId))];

  const outputs = [];
  for (const step of action.steps || ['probe', 'slip', 'capture', 'confirm']) {
    const found = pickEntry(scripted, 'evidence_discovery', `${action.target}|${action.evidenceId}|${step}`, action.variantIds?.[step]);
    const speaker = step === 'slip' ? action.target : step === 'capture' ? 'system' : 'judge';
    if (found) {
      outputs.push(toOutput(speaker, found, {
        channel: 'evidence_discovery',
        resolverPath: 'scripted',
        sourcePath: sourcePath(caseId, 'evidence_discovery', found.entry.key, found.variant.id),
        action,
        target: action.target,
        evidenceId: action.evidenceId,
        disputeId: found.entry.disputeId,
        evidenceStage: evState?.stage ?? 0,
      }));
    } else {
      outputs.push(discoveryFallbackOutput({ caseId, caseData, state, action, ev, step, speaker }));
    }
  }
  if (evState) evState.unlocked = true;
  outputs.push({
    speaker: 'system',
    text: `새 증거: ${getEvidenceDisplayName(ev, evState)}`,
    channel: 'system_message',
    resolverPath: 'runtime_system',
    sourcePath: `src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getEvidenceDisplayName:${action.evidenceId}`,
    actionType: action.type,
    target: action.target,
    evidenceId: action.evidenceId,
    disputeId: ev.proves?.[0],
    evidenceStage: evState?.stage ?? 0,
  });
  return outputs;
}

function discoveryFallbackOutput({ caseId, caseData, state, action, ev, step, speaker }) {
  const disputeId = action.disputeId || ev.proves?.[0];
  const lieState = getLieState(state, action.target || 'a', disputeId);
  const name = getPartyName(caseData, action.target || 'a');
  const lines = getDiscoveryLinesForGate(ev, name, lieState);
  const text = step === 'capture'
    ? `${name}의 말에서 새로운 증거를 확보했다`
    : lines[step] || '';
  return {
    speaker,
    text,
    behaviorHint: step === 'slip' ? getSlipBehaviorForGate(lieState) : undefined,
    channel: 'evidence_discovery',
    resolverPath: 'runtime_discovery_fallback',
    sourcePath: `src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getDiscoveryLines:${action.evidenceId}:${step}`,
    actionType: action.type,
    target: action.target,
    evidenceId: action.evidenceId,
    disputeId,
    lieState,
    evidenceStage: state.evidence[action.evidenceId]?.stage ?? 0,
  };
}

function getDiscoveryLinesForGate(ev, npcName, lieState) {
  const slipContext = {
    S0: '그때 그 일은… 아, 아닙니다. 그냥 제가 잘못 말했습니다.',
    S1: '그건… 사실 그때…',
    S2: '아니, 그러니까… 그것도 관련이 있긴 한데…',
    S3: '그쪽이야말로! …아, 그건 제가 말할 부분이 아니었는데.',
    S4: '그게 그렇게 된 건 — 아…',
    S5: '… 솔직히 말씀드리면, 그것도 있습니다.',
  };
  const ctx = slipContext[lieState] || '…';
  const typeLines = {
    bank: {
      probe: `${npcName} 씨, 당시 금전 흐름에 대해 좀 더 구체적으로 설명해 주시겠습니까.`,
      slip: `${ctx} 그 돈 문제는… 거래 내역을 보시면 아시겠지만…`,
      confirm: '지금 거래 내역을 언급하셨습니다. 해당 금융 기록을 확인하겠습니다.',
    },
    chat: {
      probe: `${npcName} 씨, 당시 상대방과 연락을 주고받은 적이 있습니까.`,
      slip: `${ctx} 그때 주고받은 메시지가 있긴 한데…`,
      confirm: '메시지 기록이 있다고 하셨습니다. 해당 대화 내용을 확보하겠습니다.',
    },
    cctv: {
      probe: `${npcName} 씨, 그 시간대에 정확히 어디에 계셨는지 다시 한번 말씀해 주십시오.`,
      slip: `${ctx} 그 시간에 거기 있었던 건 맞는데… 카메라가 있는 줄은…`,
      confirm: '해당 장소에 있었다고 인정하셨습니다. 영상 기록을 확인하겠습니다.',
    },
    contract: {
      probe: `${npcName} 씨, 혹시 사전에 서로 합의하거나 약속한 부분이 있었습니까.`,
      slip: `${ctx} 그때 서로 약속한 게 있긴 했습니다…`,
      confirm: '약속이 있었다고 하셨습니다. 관련 문서를 확인하겠습니다.',
    },
    testimony: {
      probe: `${npcName} 씨, 그 상황을 목격하거나 알고 있는 다른 사람이 있습니까.`,
      slip: `${ctx} 그 자리에 다른 사람도 있었는데…`,
      confirm: '제3자가 있었다고 하셨습니다. 해당 인물의 증언을 확보하겠습니다.',
    },
    log: {
      probe: `${npcName} 씨, 당시 상황을 뒷받침할 기록이 남아 있습니까.`,
      slip: `${ctx} 기록을 보면 알 수 있을 텐데…`,
      confirm: '기록이 존재한다고 하셨습니다. 해당 로그를 확인하겠습니다.',
    },
    device: {
      probe: `${npcName} 씨, 그 시점에 휴대폰이나 기기를 사용하신 적이 있습니까.`,
      slip: `${ctx} 그때 폰으로 확인한 건 맞는데…`,
      confirm: '기기를 사용한 사실을 인정하셨습니다. 해당 데이터를 확보하겠습니다.',
    },
    sns: {
      probe: `${npcName} 씨, 이 건과 관련해 온라인에 게시하거나 공유한 적이 있습니까.`,
      slip: `${ctx} 그게 온라인에 올라간 건 맞지만…`,
      confirm: '온라인 게시 사실을 인정하셨습니다. 해당 게시물을 확인하겠습니다.',
    },
  };
  return typeLines[ev.type] || {
    probe: `${npcName} 씨, 이 부분에 대해 좀 더 자세히 설명해 주시겠습니까.`,
    slip: `${ctx} 그것도 사실 관련이 있긴 합니다…`,
    confirm: '지금 하신 말씀에서 단서가 포착됐습니다. 관련 자료를 확인하겠습니다.',
  };
}

function getSlipBehaviorForGate(lieState) {
  const behaviors = {
    S0: '무심코 말을 꺼내다 멈칫한다.',
    S1: '말끝이 흔들리며 시선을 피한다.',
    S2: '설명하다 자신도 모르게 말이 새어 나온다.',
    S3: '상대를 탓하다 의도치 않게 단서를 흘린다.',
    S4: '감정이 격해지며 입에서 튀어나온다.',
    S5: '체념한 듯 결국 내뱉는다.',
  };
  return behaviors[lieState] || '잠시 말을 멈추더니 다시 이어간다.';
}

function doEmergenceEvent(ctx) {
  const { caseId, state, action, emergenceHooks } = ctx;
  const hook = emergenceHooks[action.disputeId];
  if (!hook) return [];
  const lieState = getLieState(state, hook.speaker, action.disputeId);
  const tone = action.tone || (LIE_RANK[lieState] <= 2 ? 'attack' : LIE_RANK[lieState] >= 5 ? 'resignation' : 'confession');
  const variant = hook.variants.find((item) => item.tone === tone) || hook.variants[0];
  if (state.disputes[action.disputeId]) {
    state.disputes[action.disputeId].visibility = 'emerged';
    state.disputes[action.disputeId].emergedVia = action.via || 'runtime_gate';
  }
  return [{
    speaker: hook.speaker,
    text: variant.text,
    behaviorHint: variant.behaviorHint,
    channel: 'emergence_event',
    resolverPath: 'event_hook',
    sourcePath: `src/data/emergenceHooks.ts:${caseId}.${action.disputeId}.${variant.tone}`,
    actionType: action.type,
    target: hook.speaker,
    disputeId: action.disputeId,
    lieState,
  }];
}

function doFreeInterrogation(ctx) {
  const { caseId, action, state } = ctx;
  const key = `${caseId}:${action.target || 'a'}`;
  const text = SAFE_CONTEXT_FALLBACKS[key] || SAFE_CONTEXT_FALLBACKS['spouse-01:a'];
  return [{
    speaker: action.target || 'a',
    text,
    behaviorHint: '잠시 침묵한 뒤 짧게 답한다.',
    channel: 'interrogation',
    resolverPath: 'fallback',
    sourcePath: 'src/engine/freeInterrogation/fallback.ts:SAFE_CONTEXT_FALLBACKS',
    actionType: action.type,
    target: action.target || 'a',
    disputeId: action.disputeId || state.lastFocusedDisputeId,
    lieState: getLieState(state, action.target || 'a', action.disputeId || state.lastFocusedDisputeId),
    safeFallback: true,
    freeInterrogation: {
      rawText: action.rawText,
      intent: action.intent || 'unmapped',
    },
  }];
}

function runDetectors(trace, data) {
  const findings = [];
  detectMissingResponse(trace, findings);
  detectSpoilers(trace, data, findings);
  detectMismatch(trace, data, findings);
  detectFallbackQuality(trace, findings);
  return findings.map((finding, index) => ({
    id: `QARG-${String(globalFindingCounter++).padStart(4, '0')}`,
    caseId: trace.caseId,
    routeId: trace.routeId,
    action: trace.action,
    target: trace.action.target,
    disputeId: trace.action.disputeId,
    evidenceId: trace.action.evidenceId,
    witnessId: trace.action.witnessId,
    ...finding,
    localIndex: index + 1,
  }));
}

function detectMissingResponse(trace, findings) {
  const actionType = trace.action.type;
  if (!RESPONSE_REQUIRED_ACTIONS.has(actionType)) return;
  const npc = trace.outputs.filter((output) => output.speaker === 'a' || output.speaker === 'b' || output.speaker === 'witness');
  const safeFallback = trace.outputs.some((output) => output.safeFallback || output.resolverPath === 'fallback');
  if (npc.length > 0 || safeFallback) return;
  findings.push({
    severity: 'P0',
    category: 'response_missing',
    summary: `${actionType} produced no NPC response and no explicit safe fallback.`,
    expected: 'At least one NPC/witness response or an explicit safe fallback after the action.',
    actual: `${trace.outputs.length} visible outputs; speakers=${trace.outputs.map((o) => o.speaker).join(',') || 'none'}`,
    resolverPath: trace.outputs.map((o) => o.resolverPath).filter(Boolean).join(' | ') || 'none',
    sourcePath: trace.outputs.map((o) => o.sourcePath).filter(Boolean).join(' | ') || 'none',
    patchPriority: 'P0-runtime-response-coverage',
  });
}

function detectSpoilers(trace, data, findings) {
  const { caseData, policy } = data;
  for (const output of trace.outputs) {
    if (INTERNAL_LABEL_RE.test(output.text || '')) {
      findings.push(makeSpoiler(output, 'internal_label_exposed', 'Internal source label is visible in UI text.', '[SCRIPT]/[FALLBACK]/[LLM] must never be visible.', output.text));
    }

    const matchedLexemes = findForbiddenLexemes(output, trace, policy);
    if (matchedLexemes.length > 0) {
      findings.push(makeSpoiler(
        output,
        'truth_lexeme_early_exposure',
        `Forbidden truth lexeme exposed in ${output.channel}.`,
        'No truth lexeme before allowed lieState/evidenceStage/channel gate.',
        `matched=${matchedLexemes.join(', ')}; text=${output.text}`,
      ));
    }

    for (const ev of caseData.evidence || []) {
      if (!ev.name || ev.name === ev.surfaceName) continue;
      if (!String(output.text || '').includes(ev.name)) continue;
      const before = trace.stateBefore.evidence[ev.id] || {};
      if (!before.unlocked || (before.stage || 0) < 2) {
        findings.push(makeSpoiler(
          output,
          'locked_evidence_name_exposed',
          `Evidence truth name exposed before stage gate: ${ev.id}.`,
          `Use surfaceName only until unlocked and deeply investigated: ${ev.surfaceName || ev.id}.`,
          output.text,
          ev.id,
        ));
      }
    }
  }
}

function detectMismatch(trace, data, findings) {
  const action = trace.action;
  for (const output of trace.outputs) {
    if ((output.speaker === 'a' || output.speaker === 'b') && action.target && output.speaker !== action.target) {
      findings.push(candidate(output, 'qa_mismatch', 'NPC speaker does not match action target.', `target=${action.target}`, `speaker=${output.speaker}`, 'P1-routing'));
    }
    if (output.entryDisputeId && action.disputeId && output.entryDisputeId !== action.disputeId) {
      findings.push(candidate(output, 'qa_mismatch', 'Scripted entry dispute does not match action dispute.', action.disputeId, output.entryDisputeId, 'P1-source-path'));
    }
    if (output.entryQuestionType && action.questionType && output.entryQuestionType !== action.questionType) {
      findings.push(candidate(output, 'qa_mismatch', 'Scripted entry questionType does not match action questionType.', action.questionType, output.entryQuestionType, 'P1-source-path'));
    }
  }

  const npcText = trace.outputs
    .filter((output) => output.speaker === 'a' || output.speaker === 'b')
    .map((output) => output.text)
    .join(' ');
  if (!npcText || !action.disputeId) return;
  const focus = buildFocusModel(data.caseData, action.disputeId);
  if (focus.otherHit && !focus.expectedHit(npcText) && focus.otherHit(npcText)) {
    findings.push({
      severity: 'P1',
      category: 'qa_mismatch_candidate',
      summary: 'NPC response appears to focus on another dispute.',
      expected: `Response should stay focused on ${action.disputeId}.`,
      actual: npcText,
      resolverPath: trace.outputs.map((o) => o.resolverPath).join(' | '),
      sourcePath: trace.outputs.map((o) => o.sourcePath).join(' | '),
      patchPriority: 'P1-script-focus-review',
    });
  }
}

function detectFallbackQuality(trace, findings) {
  for (const output of trace.outputs) {
    if (INTERNAL_TERM_RE.test(output.text || '')) {
      findings.push(candidate(output, 'surface_quality', 'Internal implementation term is visible.', 'No internal terms in UI text.', output.text, 'P1-surface-policy'));
    }
    if (output.resolverPath === 'fallback' && GENERIC_FALLBACK_RE.test(output.text || '') && trace.action.type !== 'free_interrogation') {
      findings.push(candidate(output, 'fallback_quality', 'Generic fallback used outside a safe free-interrogation context.', 'Character-specific scripted response or explicit safe fallback.', output.text, 'P2-fallback-quality'));
    }
    if (trace.action.type === 'free_interrogation' && (trace.action.intent || 'unmapped') === 'unmapped') {
      const surface = trace.action.surfaceDelta || {};
      const noisy = (surface.observation || 0) + (surface.notebook || 0) + (surface.statementNote || 0) + (surface.vfx || 0);
      if (noisy > 0) {
        findings.push(candidate(output, 'surface_phase_violation', 'Unmapped free interrogation produced non-chat surfaces.', 'Only chat safe fallback; no observation/notebook/VFX.', JSON.stringify(surface), 'P1-free-question-surface'));
      }
    }
  }
}

function findForbiddenLexemes(output, trace, policy) {
  const context = {
    channel: output.channel,
    lieState: output.lieState,
    party: output.speaker === 'a' || output.speaker === 'b' ? output.speaker : trace.action.target,
    evidenceStage: output.evidenceStage ?? (output.evidenceId ? trace.stateBefore.evidence[output.evidenceId]?.stage : undefined),
  };
  if (!shouldScanContext(context)) return [];

  const global = policy.forbiddenLexemes?.globalTruthLexemes || [];
  const resolved = new Set();
  const surfaceRef = policy.forbiddenLexemes?.surfaceOnlyChannels?.[context.channel];
  if (surfaceRef === 'globalTruthLexemes') global.forEach((item) => resolved.add(item));
  else if (Array.isArray(surfaceRef)) surfaceRef.forEach((item) => resolved.add(item));

  if (
    context.channel === 'interrogation' ||
    context.channel === 'contradiction_pursuit' ||
    context.channel === 'evidence_present' ||
    context.channel === 'emergence_event'
  ) {
    const npcRules = policy.forbiddenLexemes?.nonConfessionNpcBeforeS5;
    const stateRef = npcRules?.[context.lieState];
    if (stateRef === 'globalTruthLexemes') global.forEach((item) => resolved.add(item));
    else if (Array.isArray(stateRef)) stateRef.forEach((item) => resolved.add(item));
  }

  if (context.channel === 'evidence_discovery' || (context.evidenceStage !== undefined && context.evidenceStage <= 1)) {
    global.forEach((item) => resolved.add(item));
  }

  for (const label of PARAPHRASE_LABELS[policy.caseId] || []) resolved.add(label);

  const text = String(output.text || '').replace(/\s+/g, ' ');
  return [...resolved].filter((lexeme) => lexeme && text.includes(lexeme));
}

function shouldScanContext(context) {
  if (context.channel === 'aftermath' || context.channel === 'emotional_overload' || context.channel === 'mediation' || context.channel === 'witness_full') return false;
  if (SURFACE_ONLY_CHANNELS.has(context.channel)) return true;
  if (context.channel === 'interrogation' || context.channel === 'contradiction_pursuit' || context.channel === 'emergence_event') {
    return LIE_RANK[context.lieState] <= 2;
  }
  if (context.channel === 'evidence_present' || context.channel === 'evidence_discovery') {
    return (context.evidenceStage ?? 0) <= 1 || LIE_RANK[context.lieState] <= 2;
  }
  return false;
}

function makeSpoiler(output, category, summary, expected, actual, evidenceId) {
  return {
    severity: 'P0',
    category,
    summary,
    expected,
    actual,
    resolverPath: output.resolverPath,
    sourcePath: output.sourcePath,
    evidenceId: evidenceId || output.evidenceId,
    disputeId: output.disputeId,
    target: output.target,
    patchPriority: 'P0-disclosure-gate',
  };
}

function candidate(output, category, summary, expected, actual, patchPriority) {
  return {
    severity: 'P1',
    category,
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
    questionCounts: {},
    factTokens: {},
    appliedRecipes: new Set(),
    lastFocusedDisputeId: initial.lastFocusedDisputeId || null,
  };

  for (const cfg of caseData.lieConfigA || []) state.lieStates.a[cfg.disputeId] = cfg.initialState || 'S0';
  for (const cfg of caseData.lieConfigB || []) state.lieStates.b[cfg.disputeId] = cfg.initialState || 'S0';
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
    lastFocusedDisputeId: state.lastFocusedDisputeId,
  };
}

function diffState(before, after) {
  const diff = { lieStates: [], evidence: [], disputes: [] };
  for (const party of ['a', 'b']) {
    for (const disputeId of new Set([...Object.keys(before.lieStates[party] || {}), ...Object.keys(after.lieStates[party] || {})])) {
      const from = before.lieStates[party]?.[disputeId];
      const to = after.lieStates[party]?.[disputeId];
      if (from !== to) diff.lieStates.push({ party, disputeId, from, to });
    }
  }
  for (const evidenceId of Object.keys(after.evidence || {})) {
    const b = before.evidence[evidenceId] || {};
    const a = after.evidence[evidenceId] || {};
    if (b.unlocked !== a.unlocked || b.presented !== a.presented || b.stage !== a.stage) {
      diff.evidence.push({ evidenceId, before: compactEvidence(b), after: compactEvidence(a) });
    }
  }
  for (const disputeId of Object.keys(after.disputes || {})) {
    const b = before.disputes[disputeId]?.visibility;
    const a = after.disputes[disputeId]?.visibility;
    if (b !== a) diff.disputes.push({ disputeId, from: b, to: a, via: after.disputes[disputeId]?.emergedVia });
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
  const variant = variantId
    ? entry.variants.find((item) => item.id === variantId)
    : entry.variants[0];
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
    witnessId: extra.witnessId,
    lieState: extra.lieState,
    evidenceStage: extra.evidenceStage,
    dossierStage: extra.dossierStage,
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
    witnessId: action.witnessId,
  };
}

function tagsToMap(tags) {
  const map = {};
  for (const tag of tags || []) {
    const idx = String(tag).indexOf(':');
    if (idx > 0) map[tag.slice(0, idx)] = tag.slice(idx + 1);
  }
  return map;
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

function readEmergenceHooks(caseId) {
  const file = path.join(ROOT, 'src', 'data', 'emergenceHooks.ts');
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, 'utf8');
  const caseBlock = extractBlockAfterMarker(src, `'${caseId}':`);
  if (!caseBlock) return {};
  const hooks = {};
  for (const disputeMatch of caseBlock.matchAll(/'((?:h-)?d-\d+)':\s*\{/g)) {
    const disputeId = disputeMatch[1];
    const start = disputeMatch.index + disputeMatch[0].lastIndexOf('{');
    const block = extractBalancedBlock(caseBlock, start);
    if (!block) continue;
    const speaker = (block.match(/speaker:\s*'([ab])'/) || [])[1];
    const variants = [];
    for (const variantMatch of block.matchAll(/tone:\s*'([^']+)'[\s\S]*?text:\s*'((?:\\'|[^'])*)'[\s\S]*?behaviorHint:\s*'((?:\\'|[^'])*)'/g)) {
      variants.push({
        tone: variantMatch[1],
        text: unescapeTsString(variantMatch[2]),
        behaviorHint: unescapeTsString(variantMatch[3]),
      });
    }
    if (speaker && variants.length > 0) hooks[disputeId] = { speaker, variants };
  }
  return hooks;
}

function extractBlockAfterMarker(src, marker) {
  const markerIndex = src.indexOf(marker);
  if (markerIndex < 0) return null;
  const open = src.indexOf('{', markerIndex);
  return extractBalancedBlock(src, open);
}

function extractBalancedBlock(src, openIndex) {
  if (openIndex < 0 || src[openIndex] !== '{') return null;
  let depth = 0;
  let inString = false;
  let quote = '';
  for (let i = openIndex; i < src.length; i += 1) {
    const char = src[i];
    const prev = src[i - 1];
    if (inString) {
      if (char === quote && prev !== '\\') inString = false;
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      inString = true;
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(openIndex, i + 1);
    }
  }
  return null;
}

function unescapeTsString(value) {
  return value.replace(/\\'/g, '\'').replace(/\\n/g, '\n');
}

function findEvidence(caseData, evidenceId) {
  return (caseData.evidence || []).find((item) => item.id === evidenceId);
}

function getEvidenceDisplayName(ev, evState) {
  if (!ev) return '';
  return evState?.deepInvestigated ? ev.name : (ev.surfaceName || ev.name);
}

function getPartyName(caseData, party) {
  if (party === 'b') return caseData.duo?.partyB?.name || '당사자';
  return caseData.duo?.partyA?.name || '당사자';
}

function sourcePath(caseId, channel, key, variantId) {
  return `src/data/scriptedText/${caseId}.json:channels.${channel}.entries[key=${key}].variants[id=${variantId}]`;
}

function missingSource(caseId, channel, key) {
  return `missing:src/data/scriptedText/${caseId}.json:channels.${channel}.entries[key=${key}]`;
}

function writeTranscript(result) {
  const lines = [
    `# ${result.route.routeId}`,
    '',
    `caseId: ${result.manifest.caseId}`,
    `description: ${result.route.description || ''}`,
    '',
  ];
  for (const trace of result.traces) {
    lines.push(`## ${trace.actionIndex}. ${trace.action.type}`);
    lines.push('');
    lines.push(`action: \`${JSON.stringify(trace.action)}\``);
    if (trace.stateDelta.lieStates.length || trace.stateDelta.evidence.length || trace.stateDelta.disputes.length) {
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
  fs.writeFileSync(path.join(TRANSCRIPT_DIR, `${result.manifest.caseId}-${result.route.routeId}.md`), lines.join('\n'), 'utf8');
}

function writeResolverSummary(traces, findings) {
  const counts = {};
  for (const trace of traces) {
    for (const output of trace.outputs) counts[output.resolverPath] = (counts[output.resolverPath] || 0) + 1;
  }
  const lines = ['# Resolver Path Summary', ''];
  for (const [key, count] of Object.entries(counts).sort()) lines.push(`- ${key}: ${count}`);
  lines.push('');
  lines.push('## Finding Counts');
  const byCategory = {};
  for (const finding of findings) byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
  for (const [key, count] of Object.entries(byCategory).sort()) lines.push(`- ${key}: ${count}`);
  fs.writeFileSync(path.join(RESULT_DIR, 'resolver-path-summary.md'), lines.join('\n'), 'utf8');
}

function writeSourceSummary(traces) {
  const counts = {};
  for (const trace of traces) {
    for (const output of trace.outputs) counts[output.sourcePath] = (counts[output.sourcePath] || 0) + 1;
  }
  const lines = ['# Source Path Summary', ''];
  for (const [source, count] of Object.entries(counts).sort()) lines.push(`- ${source}: ${count}`);
  fs.writeFileSync(path.join(RESULT_DIR, 'source-path-summary.md'), lines.join('\n'), 'utf8');
}

function writeSpikeSummary(traces, findings) {
  const hard = findings.filter((item) => item.severity === 'P0');
  const candidates = findings.filter((item) => item.severity !== 'P0');
  const byCategory = {};
  for (const finding of findings) byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
  const lines = [
    '# 20260427 Script Runtime QA Gate Phase A Spike Summary',
    '',
    '## 기술 방식',
    '- runner: `scripts/qa-runtime-gate.cjs`',
    '- mode: Node/CommonJS, ScriptedText/caseData/disclosurePolicy/emergenceHooks read-only runtime facsimile',
    '- actual OpenAI 호출 없음, browser full playthrough 없음, runtime source mutation 없음',
    '- 기본 실행은 결과 생성용 exit 0, `--fail-on-hard` 사용 시 P0 발견을 CI hard fail로 승격 가능',
    '',
    '## 실행 범위',
    `- routes: ${new Set(traces.map((t) => t.routeId)).size}`,
    `- actions: ${traces.length}`,
    `- hard findings: ${hard.length}`,
    `- candidates: ${candidates.length}`,
    '',
    '## 검출 영역 1차 검증',
    `- 응답 누락: ${byCategory.response_missing || 0}건. \`evidence_investigate\`가 system-only 결과를 만들고 NPC 응답/safe fallback이 없어 P0로 잡힘.`,
    `- Q-A 불일치: ${(byCategory.qa_mismatch || 0) + (byCategory.qa_mismatch_candidate || 0)}건. 이번 3-route spike에서는 후보 없음.`,
    `- 스포일러: ${(byCategory.truth_lexeme_early_exposure || 0) + (byCategory.locked_evidence_name_exposed || 0) + (byCategory.internal_label_exposed || 0)}건. \`e-4\` early evidence_present가 S0/S1 표면 단계에서 truth lexeme을 노출함.`,
    `- fallback/표면 품질: ${(byCategory.fallback_quality || 0) + (byCategory.surface_quality || 0) + (byCategory.surface_phase_violation || 0)}건. unmapped free question은 chat fallback-only로 통과, discovery_event는 runtime fallback path로 보정됨.`,
    '',
    '## P0 Findings',
  ];
  if (hard.length === 0) lines.push('- none');
  for (const finding of hard) {
    lines.push(`- ${finding.id} [${finding.category}] ${finding.summary}`);
    lines.push(`  source: ${finding.sourcePath}`);
    lines.push(`  actual: ${finding.actual}`);
  }
  lines.push('', '## Candidate Findings');
  if (candidates.length === 0) lines.push('- none');
  for (const finding of candidates.slice(0, 20)) {
    lines.push(`- ${finding.id} [${finding.category}] ${finding.summary}`);
    lines.push(`  source: ${finding.sourcePath}`);
  }
  lines.push('', '## 산출물');
  lines.push('- `tmp/qa-runtime-gate-results/findings.json`');
  lines.push('- `tmp/qa-runtime-gate-results/action-by-action-trace.json`');
  lines.push('- `tmp/qa-runtime-gate-results/route-transcripts/`');
  lines.push('- `tmp/qa-runtime-gate-results/resolver-path-summary.md`');
  lines.push('- `tmp/qa-runtime-gate-results/source-path-summary.md`');
  lines.push('', '## 한계');
  lines.push('- Phase A spike는 3개 route의 lightweight facsimile이며 browser store 전체 playthrough가 아님.');
  lines.push('- scriptedTextLoader의 Vite glob을 직접 import하지 않고 JSON source를 읽어 resolver/source path를 재구성함.');
  lines.push('- 실제 patch는 하지 않았고, findings는 root cause/source path 입력으로만 남김.');
  lines.push('', '## 다음 단계');
  lines.push('- spouse-01 Phase B에서는 fact_pursuit 반복, e-4/e-5 unlock, dossier card, hidden dispute emergence, witness/dossier action까지 manifest를 확장.');
  lines.push('- family-01/friend-01 확장은 CT/user 결정 후 동일 manifest/runner 구조로 추가.');
  fs.writeFileSync(path.join(RESULT_DIR, '20260427-spike-summary.md'), lines.join('\n'), 'utf8');
}

function loadManifests() {
  if (!fs.existsSync(MANIFEST_DIR)) return [];
  const files = fs.readdirSync(MANIFEST_DIR)
    .filter((file) => file.endsWith('.json'))
    .filter((file) => !wantedCase || file === `${wantedCase}.json`);
  return files.map((file) => readJson(path.join(MANIFEST_DIR, file)));
}

function valueArg(name) {
  const prefix = `${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
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
