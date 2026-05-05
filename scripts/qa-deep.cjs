#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const RESULT_DIR = path.join(ROOT, 'tmp', 'qa-deep-results');

const STEPS = [
  {
    id: 'fast',
    label: 'Fast static + manifest route gate',
    command: ['npm', ['run', 'qa:fast']],
    summaryFile: path.join(ROOT, 'tmp', 'qa-fast-results', 'consolidated-summary.json'),
  },
  {
    id: 'routeExhaustive',
    label: 'Bounded exhaustive route exploration',
    command: ['npm', ['run', 'qa:route:exhaustive']],
    summaryFile: path.join(ROOT, 'tmp', 'qa-route-exhaustive-results', 'coverage-summary.json'),
  },
  {
    id: 'browser',
    label: 'Browser actual play harness',
    command: ['npm', ['run', 'qa:browser']],
    summaryFile: path.join(ROOT, 'tmp', 'qa-browser-results', 'summary.json'),
  },
];

main();

function main() {
  const startedAt = new Date();
  resetResultDir();

  const runs = {};
  for (const step of STEPS) {
    runs[step.id] = runStep(step);
  }

  const summary = buildSummary({
    startedAt,
    finishedAt: new Date(),
    runs,
  });
  writeOutputs(summary);
  printConsoleSummary(summary);

  if (summary.release.status !== 'DEEP READY') process.exit(1);
}

function runStep(step) {
  const [command, args] = step.command;
  const startedAt = new Date();
  console.log(`qa:deep: running ${step.id}...`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    shell: process.platform === 'win32',
    stdio: 'inherit',
    env: process.env,
  });

  const finishedAt = new Date();
  return {
    id: step.id,
    label: step.label,
    command: [command, ...args].join(' '),
    exitCode: typeof result.status === 'number' ? result.status : 1,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: finishedAt.getTime() - startedAt.getTime(),
    summaryFile: relative(step.summaryFile),
    summary: readJson(step.summaryFile),
  };
}

function buildSummary({ startedAt, finishedAt, runs }) {
  const fast = runs.fast.summary || {};
  const routeExhaustive = runs.routeExhaustive.summary || {};
  const browser = runs.browser.summary || {};

  const reasons = [];
  for (const run of Object.values(runs)) {
    if (run.exitCode !== 0 || run.error) {
      reasons.push(`${run.id} runner failed: exit ${run.exitCode}${run.error ? ` (${run.error})` : ''}`);
    }
    if (!run.summary) reasons.push(`${run.id} summary missing or unreadable: ${run.summaryFile}`);
  }

  const fastStatus = fast.release?.status || 'unknown';
  if (fastStatus !== 'RELEASE READY') reasons.push(`qa:fast status is ${fastStatus}`);

  const exhaustiveHard = routeExhaustive.totals?.hardFindings ?? routeExhaustive.combined?.bySeverity?.P0 ?? null;
  if (exhaustiveHard == null) reasons.push('bounded exhaustive hard finding count unavailable');
  else if (exhaustiveHard > 0) reasons.push(`bounded exhaustive P0 hard findings present: ${exhaustiveHard}`);

  const browserPass = browser.status === 'PASS';
  const browserConsoleErrors = browser.consoleErrors?.length || 0;
  const browserPageErrors = browser.pageErrors?.length || 0;
  if (!browserPass) reasons.push(`browser harness status is ${browser.status || 'unknown'}`);
  if (browserPageErrors > 0) reasons.push(`browser page errors present: ${browserPageErrors}`);

  return {
    schemaVersion: 1,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    runs,
    modes: {
      fast: {
      status: fastStatus,
      total: fast.combined?.total ?? null,
      P0: fast.combined?.bySeverity?.P0 ?? 0,
      P1: fast.combined?.bySeverity?.P1 ?? 0,
      P2: fast.combined?.bySeverity?.P2 ?? 0,
      },
      routeExhaustive: {
        total: routeExhaustive.totals?.findings ?? null,
        routes: routeExhaustive.totals?.routes ?? null,
        actions: routeExhaustive.totals?.actions ?? null,
        P0: exhaustiveHard,
        byCategory: routeExhaustive.findingsByCategory || {},
      },
      browser: {
        status: browser.status || 'unknown',
        checks: browser.checks?.length ?? null,
        consoleErrors: browserConsoleErrors,
        pageErrors: browserPageErrors,
        actualPlay: browser.actualPlay || null,
      },
    },
    release: {
      status: reasons.length === 0 ? 'DEEP READY' : 'DEEP BLOCK',
      reasons,
    },
  };
}

function writeOutputs(summary) {
  ensureDir(RESULT_DIR);
  writeJson(path.join(RESULT_DIR, 'consolidated-summary.json'), summary);
  writeText(path.join(RESULT_DIR, 'consolidated-summary.md'), renderMarkdown(summary));
  writeText(path.join(RESULT_DIR, 'release-readiness.md'), renderReleaseReadiness(summary));
}

function renderMarkdown(summary) {
  const lines = [
    '# QA Deep Test Consolidated Summary',
    '',
    `- started: ${summary.startedAt}`,
    `- finished: ${summary.finishedAt}`,
    `- status: **${summary.release.status}**`,
    '',
    '## Mode Totals',
    '',
    `- fast: status ${summary.modes.fast.status} / total ${summary.modes.fast.total ?? 'n/a'} / P0 ${summary.modes.fast.P0 ?? 'n/a'} / P1 ${summary.modes.fast.P1 ?? 'n/a'} / P2 ${summary.modes.fast.P2 ?? 'n/a'}`,
    `- route exhaustive: routes ${summary.modes.routeExhaustive.routes ?? 'n/a'} / actions ${summary.modes.routeExhaustive.actions ?? 'n/a'} / findings ${summary.modes.routeExhaustive.total ?? 'n/a'} / P0 ${summary.modes.routeExhaustive.P0 ?? 'n/a'}`,
    `- browser: status ${summary.modes.browser.status} / checks ${summary.modes.browser.checks ?? 'n/a'} / console errors ${summary.modes.browser.consoleErrors} / page errors ${summary.modes.browser.pageErrors}`,
    '',
    '## Runner Status',
    '',
    ...Object.values(summary.runs).map((run) => `- ${run.id}: exit ${run.exitCode} (${run.durationMs}ms)`),
    '',
    '## Release Readiness',
    '',
    ...renderReasons(summary),
  ];
  if (summary.modes.browser.actualPlay) {
    lines.push(
      '',
      '## Browser Actual Play',
      `- case: ${summary.modes.browser.actualPlay.caseId}`,
      `- action: question/${summary.modes.browser.actualPlay.target}/${summary.modes.browser.actualPlay.disputeId}`,
      `- dialogue delta: ${summary.modes.browser.actualPlay.dialogueDelta}`,
      `- turn count: ${summary.modes.browser.actualPlay.turnCount}`,
    );
  }
  return `${lines.join('\n')}\n`;
}

function renderReleaseReadiness(summary) {
  return `${[
    '# Deep Release Readiness Decision',
    '',
    `## Status: ${summary.release.status}`,
    '',
    '## Reasoning',
    '',
    ...renderReasons(summary),
    '',
    '## Scope',
    '',
    '- `qa:deep` runs the committed fast gate, bounded exhaustive route exploration, and browser actual play harness.',
    '- Bounded exhaustive exploration is capped by depth/state/route/action limits; it is not an infinite proof over every possible future UI sequence.',
    '- Browser actual play validates a real PC route in Chromium through Vite dev mode and dispatches one runtime question action.',
    '- Browser console resource errors are recorded as diagnostics; page errors or scenario failures block the run.',
  ].join('\n')}\n`;
}

function renderReasons(summary) {
  if (summary.release.reasons.length === 0) {
    return [
      '- `qa:fast` is RELEASE READY.',
      '- bounded exhaustive route exploration has P0 hard count 0.',
      '- browser actual play harness passed with no page errors or scenario failures.',
    ];
  }
  return summary.release.reasons.map((reason) => `- ${reason}`);
}

function printConsoleSummary(summary) {
  console.log('');
  console.log(`qa:deep: ${summary.release.status}`);
  console.log(`qa:deep: fast P0=${summary.modes.fast.P0 ?? 'n/a'}, exhaustive P0=${summary.modes.routeExhaustive.P0 ?? 'n/a'}, browser=${summary.modes.browser.status}`);
  console.log(`qa:deep: results=${relative(RESULT_DIR)}`);
  for (const reason of summary.release.reasons) console.log(`qa:deep: block reason: ${reason}`);
}

function readJson(file) {
  try {
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
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
