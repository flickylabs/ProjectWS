#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DATA_ROOT = path.join(ROOT, 'src', 'data');
const BASELINE_SHA = 'a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3';
const CASES = ['spouse-01', 'family-01', 'friend-01'];
const SURFACE_ONLY_CHANNELS = [
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'system_message',
  'dossier',
];
const WANT_JSON = process.argv.includes('--json');
const STRICT_LEXEME = process.argv.includes('--strict-lexeme');

main();

function main() {
  const report = {
    baselineAnchor: BASELINE_SHA,
    generatedAt: new Date().toISOString(),
    cases: [],
  };

  for (const caseId of CASES) {
    report.cases.push(checkCase(caseId));
  }

  const hardIssues = report.cases.flatMap((caseReport) => caseReport.checks.flatMap((check) => check.issues));
  const warnings = report.cases.flatMap((caseReport) => caseReport.checks.flatMap((check) => check.warnings));
  report.result = hardIssues.length === 0 ? 'PASS' : 'FAIL';
  report.issueCount = hardIssues.length;
  report.warningCount = warnings.length;

  if (WANT_JSON) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHuman(report);
  }

  process.exit(report.issueCount === 0 ? 0 : 1);
}

function checkCase(caseId) {
  const caseData = readCaseData(caseId);
  const policy = readPolicy(caseId);
  const scriptedText = readScriptedText(caseId);
  const evidence = getEvidence(caseData);
  const disputes = getDisputes(caseData);
  const witnesses = getWitnesses(caseData);
  const availableIds = collectAvailableInputIds(caseData);

  const checks = [
    checkSurfaceEvidence(policy, evidence),
    checkSurfaceDisputes(policy, disputes),
    checkSurfaceWitnesses(policy, witnesses),
    checkForbiddenSurfaceOnly(caseId, policy, scriptedText),
    checkNpcPolicy(caseId, policy, scriptedText),
    checkIssueProgression(policy, evidence, disputes, witnesses),
    checkDiscoveryText(policy, caseData, availableIds),
  ];

  return { caseId, checks };
}

function checkSurfaceEvidence(policy, evidence) {
  const issues = [];
  const warnings = [];
  const policyMap = policy.surfaceMap?.evidence || {};
  for (const item of evidence) {
    const entry = policyMap[item.id];
    if (!entry) {
      issues.push(issue('missing_policy_evidence', item.id, 'case evidence is missing from policy surfaceMap'));
      continue;
    }
    if (entry.name !== item.name) {
      issues.push(issue('evidence_name_mismatch', item.id, `policy=${entry.name} case=${item.name}`));
    }
    if (entry.surfaceName !== item.surfaceName) {
      warnings.push(issue('evidence_surfaceName_alias', item.id, `policy=${entry.surfaceName} case=${item.surfaceName}`));
    }
  }
  for (const id of Object.keys(policyMap)) {
    if (!evidence.some((item) => item.id === id)) issues.push(issue('extra_policy_evidence', id, 'policy evidence id not found in case data'));
  }
  return check('surfaceMap.evidence', issues, `${evidence.length}/${evidence.length} case IDs checked`, warnings);
}

function checkSurfaceDisputes(policy, disputes) {
  const issues = [];
  const warnings = [];
  const policyMap = policy.surfaceMap?.disputes || {};
  for (const item of disputes) {
    const entry = policyMap[item.id];
    if (!entry) {
      issues.push(issue('missing_policy_dispute', item.id, 'case dispute is missing from policy surfaceMap'));
      continue;
    }
    const surface = entry.surface || entry.protectedSurface || '';
    const caseName = item.name || item.title || '';
    if (surface && caseName && !softTextOverlap(surface, caseName)) {
      warnings.push(issue('dispute_surface_weak_match', item.id, `policy=${surface} case=${caseName}`));
    }
  }
  for (const id of Object.keys(policyMap)) {
    if (!disputes.some((item) => item.id === id)) issues.push(issue('extra_policy_dispute', id, 'policy dispute id not found in case data'));
  }
  return check('surfaceMap.disputes', issues, `${disputes.length}/${disputes.length} case IDs checked`, warnings);
}

function checkSurfaceWitnesses(policy, witnesses) {
  const issues = [];
  const warnings = [];
  const policyMap = policy.surfaceMap?.witnesses || {};
  for (const item of witnesses) {
    const entry = policyMap[item.id];
    if (!entry) {
      issues.push(issue('missing_policy_witness', item.id, 'case witness is missing from policy surfaceMap'));
      continue;
    }
    if (entry.name !== item.name) {
      issues.push(issue('witness_name_mismatch', item.id, `policy=${entry.name} case=${item.name}`));
    }
  }
  for (const id of Object.keys(policyMap)) {
    if (!witnesses.some((item) => item.id === id)) issues.push(issue('extra_policy_witness', id, 'policy witness id not found in case data'));
  }
  return check('surfaceMap.witnesses', issues, `${witnesses.length}/${witnesses.length} case IDs checked`);
}

function checkForbiddenSurfaceOnly(caseId, policy, scriptedText) {
  const issues = [];
  const warnings = [];
  const byChannel = policy.forbiddenLexemes?.surfaceOnlyChannels || {};
  for (const channel of SURFACE_ONLY_CHANNELS) {
    const lexemes = resolveLexemeList(policy, byChannel[channel]);
    const entries = scriptedText.channels?.[channel]?.entries || [];
    for (const entry of entries) {
      for (const variant of entry.variants || []) {
        const text = variant.text || '';
        for (const lexeme of lexemes) {
          if (containsLexeme(text, lexeme)) {
            const finding = issue('surface_only_forbidden_lexeme_candidate', `${channel}:${variant.id}`, `${lexeme} in ${caseId}`);
            if (STRICT_LEXEME) issues.push(finding);
            else warnings.push(finding);
          }
        }
      }
    }
  }
  return check('forbiddenLexemes.surfaceOnly', issues, `${SURFACE_ONLY_CHANNELS.length} channels scanned`, warnings);
}

function checkNpcPolicy(caseId, policy, scriptedText) {
  const issues = [];
  const npcPolicies = policy.lieStateGate?.npcPolicies || {};
  const entries = scriptedText.channels?.interrogation?.entries || [];
  for (const entry of entries) {
    const parsed = parseInterrogationKey(entry.key);
    if (!parsed) continue;
    const partyPolicy = npcPolicies[parsed.party];
    const blocked = uniqueStrings(partyPolicy?.states?.[parsed.state]?.blocked || []);
    for (const variant of entry.variants || []) {
      const text = variant.text || '';
      for (const lexeme of blocked) {
        if (containsLexeme(text, lexeme)) {
          issues.push(issue('npc_blocked_lexeme', variant.id, `${lexeme} in ${caseId} ${parsed.party} ${parsed.state}`));
        }
      }
    }
  }
  return check('lieStateGate.npcPolicies', issues, `${entries.length} interrogation entries scanned`);
}

function checkIssueProgression(policy, evidence, disputes, witnesses) {
  const issues = [];
  const evidenceIds = new Set(evidence.map((item) => item.id));
  const disputeIds = new Set(disputes.map((item) => item.id));
  const witnessIds = new Set(witnesses.map((item) => item.id));
  const progression = policy.issueProgression?.disputes || {};

  for (const [disputeId, disputePolicy] of Object.entries(progression)) {
    if (!disputeIds.has(disputeId)) {
      issues.push(issue('progression_unknown_dispute', disputeId, 'issueProgression dispute id not found in case data'));
    }
    for (const stage of disputePolicy.truthStages || []) {
      for (const evidenceId of stage.requiredEvidence || []) {
        if (!evidenceIds.has(evidenceId)) issues.push(issue('unknown_required_evidence', `${disputeId}:${stage.stage}`, evidenceId));
      }
      for (const witnessId of stage.requiredWitness || []) {
        if (!witnessIds.has(witnessId)) issues.push(issue('unknown_required_witness', `${disputeId}:${stage.stage}`, witnessId));
      }
      for (const condition of stage.entryConditions || []) {
        for (const id of extractDisputeIds(condition)) {
          if (!disputeIds.has(id)) issues.push(issue('unknown_entry_condition_dispute', `${disputeId}:${stage.stage}`, id));
        }
      }
    }
  }

  return check('issueProgression.references', issues, `${Object.keys(progression).length} disputes checked`);
}

function checkDiscoveryText(policy, caseData, availableIds) {
  const issues = [];
  const entries = normalizeDiscoveryEntries(policy.discoveryText?.entries);
  const recipeIds = new Set((caseData.combinationLab?.recipes || []).map((recipe) => recipe.id));
  const outputIds = new Set((caseData.combinationLab?.outputs || []).map((output) => output.id));
  const disputeIds = new Set(getDisputes(caseData).map((item) => item.id));

  for (const entry of entries) {
    if (!recipeIds.has(entry.id) && !outputIds.has(entry.id)) {
      issues.push(issue('unknown_discovery_entry_id', entry.id, 'not found in combinationLab recipes or outputs'));
    }
    for (const input of entry.inputs || []) {
      if (!availableIds.has(input)) issues.push(issue('unknown_discovery_input', entry.id, input));
    }
    const requiredStages = entry.gate?.requiredEvidenceStages || {};
    for (const evidenceId of Object.keys(requiredStages)) {
      if (!availableIds.has(evidenceId)) issues.push(issue('unknown_discovery_required_evidence', entry.id, evidenceId));
    }
    const requiredTruthStage = entry.gate?.requiredTruthStage || {};
    for (const disputeId of Object.keys(requiredTruthStage)) {
      if (!disputeIds.has(disputeId)) issues.push(issue('unknown_discovery_required_dispute', entry.id, disputeId));
    }
  }

  return check('discoveryText.entries', issues, `${entries.length} entries checked`);
}

function normalizeDiscoveryEntries(entries) {
  if (Array.isArray(entries)) return entries;
  return Object.entries(entries || {}).map(([id, entry]) => ({ id, ...entry }));
}

function collectAvailableInputIds(caseData) {
  const ids = new Set();
  for (const item of getEvidence(caseData)) ids.add(item.id);
  for (const item of caseData.combinationLab?.nodes || []) {
    if (item.id) ids.add(item.id);
    if (item.sourceRef) ids.add(item.sourceRef);
  }
  return ids;
}

function parseInterrogationKey(key) {
  const match = String(key || '').match(/^(a|b)\|[^|]+\|(S[0-5])\|/);
  if (!match) return null;
  return { party: match[1] === 'a' ? 'partyA' : 'partyB', state: match[2] };
}

function extractDisputeIds(text) {
  const ids = new Set();
  for (const match of String(text || '').matchAll(/\b(?:h-)?d-\d+\b/g)) ids.add(match[0]);
  return [...ids];
}

function containsLexeme(text, lexeme) {
  if (!lexeme || !String(lexeme).trim()) return false;
  return String(text || '').includes(String(lexeme));
}

function uniqueStrings(values) {
  const list = Array.isArray(values) ? values : (typeof values === 'string' ? [values] : []);
  return [...new Set(list.filter((value) => typeof value === 'string' && value.trim()))];
}

function resolveLexemeList(policy, value) {
  if (typeof value === 'string' && Array.isArray(policy.forbiddenLexemes?.[value])) {
    return uniqueStrings(policy.forbiddenLexemes[value]);
  }
  return uniqueStrings(value);
}

function softTextOverlap(a, b) {
  if (a === b) return true;
  const aTokens = tokenizeKoreanish(a);
  const bTokens = tokenizeKoreanish(b);
  return aTokens.some((token) => bTokens.includes(token)) || bTokens.some((token) => aTokens.includes(token));
}

function tokenizeKoreanish(text) {
  return String(text || '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function check(name, issues, summary, warnings = []) {
  return { name, status: issues.length === 0 ? (warnings.length === 0 ? 'PASS' : 'WARN') : 'FAIL', summary, issues, warnings };
}

function issue(type, id, message) {
  return { type, id, message };
}

function readCaseData(caseId) {
  return readJson(path.join(DATA_ROOT, 'cases', 'generated', `${caseId}.json`));
}

function readPolicy(caseId) {
  return readJson(path.join(DATA_ROOT, 'disclosurePolicy', `${caseId}.json`));
}

function readScriptedText(caseId) {
  return readJson(path.join(DATA_ROOT, 'scriptedText', `${caseId}.json`));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function getEvidence(caseData) {
  return caseData.evidence || caseData.duo?.evidence || [];
}

function getDisputes(caseData) {
  return caseData.disputes || caseData.duo?.disputes || [];
}

function getWitnesses(caseData) {
  return caseData.duo?.socialGraph || [];
}

function printHuman(report) {
  console.log('=== policy-vs-data-cross-check.cjs ===');
  console.log(`baseline anchor: ${report.baselineAnchor}`);
  console.log('');
  for (const caseReport of report.cases) {
    console.log(`[case ${caseReport.caseId}]`);
    for (const item of caseReport.checks) {
      console.log(`  ${item.name}: ${item.status} (${item.summary})`);
      for (const detail of item.issues.slice(0, 5)) {
        console.log(`    - ${detail.type} ${detail.id}: ${detail.message}`);
      }
      if (item.issues.length > 5) console.log(`    ... ${item.issues.length - 5} more`);
      for (const detail of item.warnings.slice(0, 5)) {
        console.log(`    warn: ${detail.type} ${detail.id}: ${detail.message}`);
      }
      if (item.warnings.length > 5) console.log(`    ... ${item.warnings.length - 5} more warnings`);
    }
    console.log('');
  }
  console.log(`result: ${report.result} (${report.issueCount} hard issues, ${report.warningCount} warnings)`);
  console.log(`exitCode: ${report.result === 'PASS' ? 0 : 1}`);
}
