#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DATA_ROOT = path.join(ROOT, 'src', 'data');
const BASELINE_SHA = 'a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3';
const CASES = ['spouse-01', 'family-01', 'friend-01'];
const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
const WANT_JSON = process.argv.includes('--json');
const TIER = parseTier(process.argv);

const EXPECTED = {
  surfaceOnly: ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon', 'system_message', 'dossier'],
  lieStateDriven: ['interrogation', 'contradiction_pursuit', 'interjection', 'emotional_overload', 'evidence_present', 'mediation', 'trust_action', 'rapport_milestone', 'contradict_milestone'],
  playerDiscovered: ['evidence_discovery', 'discoveryText'],
  freeAfterVerdict: ['aftermath'],
  meterRole: {
    emotion: 'short-term vulnerability signal',
    trust: 'cooperation posture',
    leak: 'conditional result, not a separate progression resource',
  },
};

main();

function main() {
  const markdown = fs.readFileSync(path.join(ROOT, 'docs', 'disclosure-policy.md'), 'utf8');
  const policies = Object.fromEntries(CASES.map((caseId) => [caseId, readPolicy(caseId)]));
  const checks = [
    checkMarkdownMentions(markdown),
    checkChannelAuthority(policies),
    checkTruthThrottle(policies),
    checkChannelMatrix(policies),
    checkSpouseSurfaceMap(markdown, policies['spouse-01']),
    checkMeterRole(markdown, policies),
  ];
  const issues = checks.flatMap((check) => check.issues);
  const result = issues.length === 0 ? 'PASS' : (TIER === 1 ? 'WARN' : 'FAIL');
  const report = {
    baselineAnchor: BASELINE_SHA,
    generatedAt: new Date().toISOString(),
    tier: TIER,
    mode: TIER === 1 ? 'WARN-ONLY' : TIER === 2 ? 'QUALITY-GATE' : 'RELEASE-GATE',
    result,
    issueCount: issues.length,
    checks,
  };

  if (WANT_JSON) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHuman(report);
  }

  process.exit(result === 'FAIL' ? 1 : 0);
}

function checkMarkdownMentions(markdown) {
  const issues = [];
  for (const channel of [...EXPECTED.surfaceOnly, ...EXPECTED.lieStateDriven, ...EXPECTED.playerDiscovered, ...EXPECTED.freeAfterVerdict]) {
    if (!markdown.includes(`\`${channel}\``) && !markdown.includes(channel)) {
      issues.push(issue('markdown_missing_channel', channel, 'channel is not mentioned in disclosure policy markdown'));
    }
  }
  for (const state of LIE_STATES) {
    if (!markdown.includes(state)) issues.push(issue('markdown_missing_lie_state', state, 'lieState is not mentioned in markdown'));
  }
  for (const term of ['emotion', 'trust', 'leak']) {
    if (!markdown.includes(term)) issues.push(issue('markdown_missing_meter_role', term, 'meter role keyword is not mentioned in markdown'));
  }
  return check('markdown taxonomy mentions', issues, 'channel, lieState, and meter keywords');
}

function checkChannelAuthority(policies) {
  const issues = [];
  for (const [caseId, policy] of Object.entries(policies)) {
    const authority = policy.channelAuthority || {};
    const surfaceOnly = (authority.surfaceOnly || []).map((entry) => entry.channel);
    compareSet(issues, caseId, 'surfaceOnly', surfaceOnly, EXPECTED.surfaceOnly);
    compareSet(issues, caseId, 'lieStateDriven', authority.lieStateDriven || [], EXPECTED.lieStateDriven);
    compareSet(issues, caseId, 'playerDiscovered', (authority.playerDiscovered || []).map((entry) => entry.channel), EXPECTED.playerDiscovered);
    compareSet(issues, caseId, 'freeAfterVerdict', (authority.freeAfterVerdict || []).map((entry) => entry.channel), EXPECTED.freeAfterVerdict);
  }
  return check('section 2 channel taxonomy vs JSON', issues, `${CASES.length} policies`);
}

function checkTruthThrottle(policies) {
  const issues = [];
  for (const [caseId, policy] of Object.entries(policies)) {
    const throttle = policy.lieStateGate?.truthThrottle || {};
    for (const state of LIE_STATES) {
      const entry = throttle[state];
      if (!entry) {
        issues.push(issue('missing_truth_throttle_state', `${caseId}:${state}`, 'truthThrottle state missing'));
        continue;
      }
      for (const field of ['amount', 'person', 'institution', 'truthLexemeAccess']) {
        if (!(field in entry)) issues.push(issue('missing_truth_throttle_field', `${caseId}:${state}:${field}`, 'truthThrottle field missing'));
      }
    }
  }
  return check('section 3.1 truth throttle vs JSON', issues, 'S0-S5 required fields');
}

function checkChannelMatrix(policies) {
  const issues = [];
  const expectedChannels = ['judge_question', 'system_message', 'dossier', 'interrogation', 'contradiction_pursuit', 'emotional_overload', 'aftermath'];
  for (const [caseId, policy] of Object.entries(policies)) {
    const matrix = policy.lieStateGate?.channelMatrix || {};
    for (const channel of expectedChannels) {
      if (!matrix[channel]) {
        issues.push(issue('missing_channel_matrix', `${caseId}:${channel}`, 'channelMatrix channel missing'));
        continue;
      }
      for (const state of LIE_STATES) {
        if (!(state in matrix[channel])) issues.push(issue('missing_channel_matrix_state', `${caseId}:${channel}:${state}`, 'channelMatrix state missing'));
      }
    }
    for (const channel of ['judge_question', 'system_message', 'dossier']) {
      for (const state of LIE_STATES) {
        if (matrix[channel]?.[state] !== 'blocked') {
          issues.push(issue('surface_channel_not_blocked', `${caseId}:${channel}:${state}`, `value=${matrix[channel]?.[state]}`));
        }
      }
    }
  }
  return check('section 3.3 channel matrix vs JSON', issues, `${CASES.length} policies`);
}

function checkSpouseSurfaceMap(markdown, spousePolicy) {
  const issues = [];
  for (const [id, entry] of Object.entries(spousePolicy.surfaceMap?.evidence || {})) {
    if (!markdown.includes(id)) issues.push(issue('spouse_markdown_missing_evidence_id', id, 'evidence id is not present in section 4.1'));
    if (!markdown.includes(entry.surfaceName)) issues.push(issue('spouse_markdown_missing_surfaceName', id, entry.surfaceName));
    if (!markdown.includes(entry.name)) issues.push(issue('spouse_markdown_missing_name', id, entry.name));
  }
  return check('section 4.1 spouse surfaceMap vs JSON', issues, 'e-1 through e-7');
}

function checkMeterRole(markdown, policies) {
  const issues = [];
  for (const [key, expected] of Object.entries(EXPECTED.meterRole)) {
    if (!markdown.includes(key)) issues.push(issue('markdown_missing_meter_key', key, 'markdown does not mention meter role key'));
    for (const [caseId, policy] of Object.entries(policies)) {
      const actual = policy.issueProgression?.principles?.meterRole?.[key];
      if (actual !== expected) issues.push(issue('meter_role_mismatch', `${caseId}:${key}`, `policy=${actual}`));
    }
  }
  return check('section 11.1 meter role vs JSON', issues, 'emotion/trust/leak');
}

function compareSet(issues, caseId, name, actual, expected) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  for (const item of expectedSet) {
    if (!actualSet.has(item)) issues.push(issue('missing_channel_authority', `${caseId}:${name}:${item}`, 'expected channel missing'));
  }
  for (const item of actualSet) {
    if (!expectedSet.has(item)) issues.push(issue('extra_channel_authority', `${caseId}:${name}:${item}`, 'unexpected channel present'));
  }
}

function parseTier(argv) {
  const arg = argv.find((item) => item.startsWith('--tier='));
  if (!arg) return 1;
  const value = Number(arg.split('=')[1]);
  if (![1, 2, 3].includes(value)) {
    console.error('Invalid --tier value. Use --tier=1, --tier=2, or --tier=3.');
    process.exit(2);
  }
  return value;
}

function readPolicy(caseId) {
  return JSON.parse(fs.readFileSync(path.join(DATA_ROOT, 'disclosurePolicy', `${caseId}.json`), 'utf8'));
}

function check(name, issues, summary) {
  return { name, status: issues.length === 0 ? 'PASS' : 'WARN', summary, issues };
}

function issue(type, id, message) {
  return { type, id, message };
}

function printHuman(report) {
  console.log('=== policy-md-json-sync-check.cjs ===');
  console.log(`baseline anchor: ${report.baselineAnchor}`);
  console.log(`mode: ${report.mode} (tier ${report.tier})`);
  console.log('');
  for (const item of report.checks) {
    console.log(`[${item.status}] ${item.name}: ${item.summary}`);
    for (const detail of item.issues.slice(0, 5)) {
      console.log(`  - ${detail.type} ${detail.id}: ${detail.message}`);
    }
    if (item.issues.length > 5) console.log(`  ... ${item.issues.length - 5} more`);
  }
  console.log('');
  console.log(`result: ${report.result} (${report.issueCount} sync issues)`);
  console.log(`exitCode: ${report.result === 'FAIL' ? 1 : 0}`);
}
