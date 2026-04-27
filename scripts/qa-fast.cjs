#!/usr/bin/env node
'use strict';

const { spawnSync, execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RESULT_DIR = path.join(ROOT, 'tmp', 'qa-fast-results');
const STATIC_RESULT_DIR = path.join(ROOT, 'tmp', 'qa-runtime-gate-results');
const ROUTE_RESULT_DIR = path.join(ROOT, 'tmp', 'qa-route-simulator-results');
const REQUIRED_TAGS = [
  'baseline-pre-policy-v3-stage1',
  'baseline-pre-policy-v3-stage2',
  'baseline-pre-policy-v3',
];

main();

function main() {
  const startedAt = new Date();
  resetResultDir();

  const staticRun = runQa('static', ['node', ['scripts/qa-runtime-gate.cjs']]);
  const staticFindings = readFindings(path.join(STATIC_RESULT_DIR, 'findings.json'));

  const routeRun = runQa('route', ['node', ['scripts/qa-route-simulator.cjs']]);
  const routeFindings = readFindings(path.join(ROUTE_RESULT_DIR, 'findings.json'));

  const tagStatus = getTagStatus();
  const summary = buildSummary({
    startedAt,
    finishedAt: new Date(),
    runs: { static: staticRun, route: routeRun },
    findings: {
      static: staticFindings,
      route: routeFindings,
    },
    tagStatus,
  });

  writeOutputs(summary);
  printConsoleSummary(summary);

  if (summary.release.status !== 'RELEASE READY') process.exit(1);
}

function runQa(mode, commandSpec) {
  const [command, args] = commandSpec;
  const startedAt = new Date();
  console.log(`qa:fast: running ${mode} runner...`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    shell: process.platform === 'win32',
    stdio: 'inherit',
    env: process.env,
  });

  return {
    mode,
    command: [command, ...args].join(' '),
    exitCode: typeof result.status === 'number' ? result.status : 1,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
  };
}

function readFindings(file) {
  if (!fs.existsSync(file)) {
    return {
      file: relative(file),
      items: [],
      readError: 'findings file missing',
    };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    const items = Array.isArray(parsed) ? parsed : parsed.findings || [];
    return {
      file: relative(file),
      items,
      readError: null,
    };
  } catch (error) {
    return {
      file: relative(file),
      items: [],
      readError: error.message,
    };
  }
}

function buildSummary({ startedAt, finishedAt, runs, findings, tagStatus }) {
  const staticStats = summarizeFindings('static', findings.static);
  const routeStats = summarizeFindings('route', findings.route);
  const combinedItems = [
    ...withMode('static', findings.static.items),
    ...withMode('route', findings.route.items),
  ];
  const combinedStats = summarizeItems(combinedItems);
  const runnerFailures = Object.values(runs).filter((run) => run.exitCode !== 0 || run.error);
  const readFailures = [findings.static, findings.route].filter((result) => result.readError);
  const missingRequiredTags = tagStatus.filter((tag) => !tag.present);
  const hardCount = combinedStats.bySeverity.P0 || 0;

  const releaseReasons = [];
  if (runnerFailures.length > 0) {
    releaseReasons.push(`runner failure: ${runnerFailures.map((run) => `${run.mode} exit ${run.exitCode}`).join(', ')}`);
  }
  if (readFailures.length > 0) {
    releaseReasons.push(`finding read failure: ${readFailures.map((item) => `${item.file} (${item.readError})`).join(', ')}`);
  }
  if (hardCount > 0) {
    releaseReasons.push(`P0 hard findings present: ${hardCount}`);
  }
  if (missingRequiredTags.length > 0) {
    releaseReasons.push(`required final tags missing: ${missingRequiredTags.map((tag) => tag.name).join(', ')}`);
  }

  return {
    schemaVersion: 1,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    runs,
    modes: {
      static: staticStats,
      route: routeStats,
    },
    combined: combinedStats,
    tags: tagStatus,
    release: {
      status: releaseReasons.length === 0 ? 'RELEASE READY' : 'RELEASE BLOCK',
      hardP0: hardCount,
      p1Informational: combinedStats.bySeverity.P1 || 0,
      p2Warning: combinedStats.bySeverity.P2 || 0,
      reasons: releaseReasons,
    },
    consolidatedFindings: combinedItems,
  };
}

function summarizeFindings(mode, result) {
  return {
    mode,
    file: result.file,
    readError: result.readError,
    ...summarizeItems(withMode(mode, result.items)),
  };
}

function summarizeItems(items) {
  return {
    total: items.length,
    bySeverity: countBy(items, (item) => item.severity || 'unknown'),
    byCategory: countBy(items, (item) => item.category || 'unknown'),
    byPatchPriority: countBy(items, (item) => item.patchPriority || 'unclassified'),
  };
}

function withMode(mode, items) {
  return items.map((item) => ({ mode, ...item }));
}

function getTagStatus() {
  return REQUIRED_TAGS.map((name) => {
    try {
      const sha = execFileSync('git', ['rev-parse', '--verify', `${name}^{}`], {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      return { name, present: true, sha };
    } catch {
      return { name, present: false, sha: null };
    }
  });
}

function writeOutputs(summary) {
  ensureDir(RESULT_DIR);
  writeJson(path.join(RESULT_DIR, 'consolidated-findings.json'), summary.consolidatedFindings);
  writeJson(path.join(RESULT_DIR, 'consolidated-summary.json'), {
    schemaVersion: summary.schemaVersion,
    startedAt: summary.startedAt,
    finishedAt: summary.finishedAt,
    runs: summary.runs,
    modes: summary.modes,
    combined: summary.combined,
    tags: summary.tags,
    release: summary.release,
  });
  writeText(path.join(RESULT_DIR, 'consolidated-summary.md'), renderConsolidatedSummary(summary));
  writeText(path.join(RESULT_DIR, 'release-readiness.md'), renderReleaseReadiness(summary));
  writeText(path.join(RESULT_DIR, `${datestamp()}-fast-summary.md`), renderConsolidatedSummary(summary));
}

function renderConsolidatedSummary(summary) {
  const lines = [
    '# QA Fast Test Consolidated Summary',
    '',
    `- started: ${summary.startedAt}`,
    `- finished: ${summary.finishedAt}`,
    `- status: **${summary.release.status}**`,
    '',
    '## Mode Totals',
    '',
    modeLine(summary.modes.static),
    modeLine(summary.modes.route),
    '',
    '## Combined Severity',
    '',
    `- P0 hard: ${summary.combined.bySeverity.P0 || 0}`,
    `- P1 informational: ${summary.combined.bySeverity.P1 || 0}`,
    `- P2 warning: ${summary.combined.bySeverity.P2 || 0}`,
    `- total findings: ${summary.combined.total}`,
    '',
    '## P0 By Patch Priority',
    '',
    ...renderPriorityLines(summary.consolidatedFindings.filter((item) => item.severity === 'P0')),
    '',
    '## Runner Status',
    '',
    `- static: exit ${summary.runs.static.exitCode}${summary.runs.static.error ? ` (${summary.runs.static.error})` : ''}`,
    `- route: exit ${summary.runs.route.exitCode}${summary.runs.route.error ? ` (${summary.runs.route.error})` : ''}`,
    '',
    '## Release Readiness',
    '',
    ...renderReleaseReasons(summary),
  ];
  return `${lines.join('\n')}\n`;
}

function renderReleaseReadiness(summary) {
  const lines = [
    '# Release Readiness Decision',
    '',
    `## Status: ${summary.release.status}`,
    '',
    '## Reasoning',
    '',
    ...renderReleaseReasons(summary),
    '',
    '## Tag Verification',
    '',
    ...summary.tags.map((tag) => `- ${tag.name}: ${tag.present ? `${tag.sha} OK` : 'MISSING'}`),
    '',
    '## Mode Comparison',
    '',
    modeLine(summary.modes.static),
    modeLine(summary.modes.route),
    '',
    '## Notes',
    '',
    '- P0 findings block release.',
    '- P1 findings are informational by default.',
    '- P2 findings are warnings by default.',
    '- `evidence_investigate_no_npc_followup` is expected as P1 under Gate spec option (ii).',
  ];
  return `${lines.join('\n')}\n`;
}

function modeLine(modeSummary) {
  const severity = modeSummary.bySeverity;
  return `- ${modeSummary.mode}: total ${modeSummary.total} / P0 ${severity.P0 || 0} / P1 ${severity.P1 || 0} / P2 ${severity.P2 || 0}`;
}

function renderPriorityLines(items) {
  if (items.length === 0) return ['- none'];
  const byModePriority = countBy(items, (item) => `${item.mode} / ${item.patchPriority || 'unclassified'}`);
  return Object.entries(byModePriority)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => `- ${name}: ${count}`);
}

function renderReleaseReasons(summary) {
  if (summary.release.reasons.length === 0) return ['- P0 hard count is 0 across static and route runners.', '- Required final tags are present.'];
  return summary.release.reasons.map((reason) => `- ${reason}`);
}

function printConsoleSummary(summary) {
  console.log('');
  console.log(`qa:fast: ${summary.release.status}`);
  console.log(`qa:fast: static P0=${summary.modes.static.bySeverity.P0 || 0}, route P0=${summary.modes.route.bySeverity.P0 || 0}, combined P0=${summary.combined.bySeverity.P0 || 0}`);
  console.log(`qa:fast: results=${relative(RESULT_DIR)}`);
  if (summary.release.reasons.length > 0) {
    for (const reason of summary.release.reasons) console.log(`qa:fast: block reason: ${reason}`);
  }
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function resetResultDir() {
  fs.rmSync(RESULT_DIR, { recursive: true, force: true });
  ensureDir(RESULT_DIR);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeText(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, value, 'utf8');
}

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function datestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}
