#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BASELINE_SHA = 'a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3';
const WANT_JSON = process.argv.includes('--json');

const RESULT_FILES = [
  ['tmp', 'truth-leak-detection.json'],
  ['tmp', 'precheck-result.json'],
  ['tmp', 'codex-recovery-v3', 'precheck-stage-aware.json'],
  ['tmp', 'codex-recovery-v4', 'precheck-qa-coherence.json'],
  ['tmp', 'codex-recovery-v5', 'precheck-broad-detection.json'],
  ['tmp', 'codex-recovery-v6', 'precheck-liestate-flow.json'],
  ['tmp', 'codex-recovery-v6', 'precheck-evidence-unlock.json'],
  ['tmp', 'codex-recovery-v6', 'precheck-archetype-quant.json'],
  ['tmp', 'codex-recovery-v6', 'precheck-meter-timing.json'],
];

const LAYERS = [
  {
    id: 'truth-leak',
    label: 'truth-leak',
    script: ['tmp', 'detect-truth-leak.cjs'],
    summarize() {
      const data = readJson(['tmp', 'truth-leak-detection.json']);
      const total = Object.values(data || {}).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
      return {
        hardPass: total === 0,
        summary: total === 0 ? '0 leaks across 3 cases' : `${total} leak candidates`,
        details: { leakCount: total },
      };
    },
  },
  {
    id: 'v6-liestate-flow',
    label: 'v6-liestate-flow',
    script: ['tmp', 'codex-recovery-v6', 'precheck-liestate-flow.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v6-evidence-unlock',
    label: 'v6-evidence-unlock',
    script: ['tmp', 'codex-recovery-v6', 'precheck-evidence-unlock.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v6-archetype-quant',
    label: 'v6-archetype-quant',
    script: ['tmp', 'codex-recovery-v6', 'precheck-archetype-quant.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v6-meter-timing',
    label: 'v6-meter-timing',
    script: ['tmp', 'codex-recovery-v6', 'precheck-meter-timing.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v3-stage-aware',
    label: 'v3-stage-aware',
    script: ['tmp', 'codex-recovery-v3', 'precheck-stage-aware.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v4-qa-coherence',
    label: 'v4-qa-coherence',
    script: ['tmp', 'codex-recovery-v4', 'precheck-qa-coherence.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'v5-broad-detection',
    label: 'v5-broad-detection',
    script: ['tmp', 'codex-recovery-v5', 'precheck-broad-detection.cjs'],
    summarize: summarizeJsonStdout,
  },
  {
    id: 'legacy-precheck-matrix',
    label: 'legacy-precheck-matrix',
    script: ['tmp', 'precheck-matrix.cjs'],
    summarize() {
      const data = readJson(['tmp', 'precheck-result.json']);
      const issues = data?.issues || {};
      const critical = issues.critical || [];
      const high = issues.high || [];
      const knownHigh = high.filter(isKnownLegacyD5High);
      if (critical.length === 0 && high.length === 0) {
        return { hardPass: true, summary: '0 critical / 0 high', details: { critical: 0, high: 0 } };
      }
      if (critical.length === 0 && high.length === knownHigh.length) {
        return {
          hardPass: true,
          warn: true,
          summary: `${knownHigh.length} known family/friend d-5 HIGH issues`,
          details: { critical: 0, high: high.length, knownHigh: knownHigh.length },
        };
      }
      return {
        hardPass: false,
        summary: `${critical.length} critical / ${high.length} high`,
        details: { critical: critical.length, high: high.length, knownHigh: knownHigh.length },
      };
    },
  },
];

main();

function main() {
  const snapshot = snapshotFiles(RESULT_FILES);
  const results = [];
  try {
    for (const layer of LAYERS) {
      results.push(runLayer(layer));
    }
  } finally {
    restoreFiles(snapshot);
  }

  const failCount = results.filter((result) => !result.hardPass).length;
  const warnCount = results.filter((result) => result.warn).length;
  const report = {
    baselineAnchor: BASELINE_SHA,
    generatedAt: new Date().toISOString(),
    result: failCount === 0 ? 'PASS' : 'FAIL',
    hardPassCount: results.length - failCount,
    warnCount,
    failCount,
    layers: results,
  };

  if (WANT_JSON) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHuman(report);
  }

  process.exit(failCount === 0 ? 0 : 1);
}

function runLayer(layer) {
  const rel = path.join(...layer.script);
  const proc = spawnSync(process.execPath, [rel], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 20,
  });
  let summary;
  try {
    summary = layer.summarize(proc.stdout, proc.stderr, proc.status);
  } catch (error) {
    summary = {
      hardPass: false,
      summary: `summary parse failed: ${error.message}`,
      details: { parseError: error.message },
    };
  }

  const hardPass = Boolean(summary.hardPass) && proc.status === 0;
  return {
    id: layer.id,
    label: layer.label,
    status: hardPass ? (summary.warn ? 'WARN' : 'PASS') : 'FAIL',
    hardPass,
    warn: Boolean(summary.warn),
    exitCode: proc.status,
    summary: summary.summary,
    details: summary.details || {},
    stderr: proc.stderr ? proc.stderr.trim().slice(0, 2000) : '',
  };
}

function summarizeJsonStdout(stdout, stderr, exitCode) {
  const data = parseJsonFromStdout(stdout);
  const issueCount = data.issueCount ?? data.failCount ?? data.unaturalHits ?? 0;
  const candidateIssueCount = data.candidateIssueCount;
  const parts = [];
  if (typeof issueCount === 'number') parts.push(`${issueCount} hard`);
  if (typeof candidateIssueCount === 'number') parts.push(`${candidateIssueCount} candidates`);
  if (typeof data.totalVariants === 'number') parts.push(`${data.totalVariants} variants`);
  if (data.matrix) {
    const residual = Object.values(data.matrix).reduce((sum, row) => sum + (row.residual || 0), 0);
    parts.push(`${residual} residual`);
  }
  return {
    hardPass: data.passed === true && exitCode === 0,
    summary: parts.length > 0 ? parts.join(' / ') : `exit ${exitCode}`,
    details: data,
  };
}

function parseJsonFromStdout(stdout) {
  const text = (stdout || '').trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(text.slice(start, end + 1));
    throw new Error('stdout did not contain JSON');
  }
}

function isKnownLegacyD5High(issue) {
  return issue
    && issue.type === 'missing_disputeId_in_channel'
    && issue.disputeId === 'd-5'
    && (issue.caseId === 'family-01' || issue.caseId === 'friend-01');
}

function readJson(parts) {
  const file = path.join(ROOT, ...parts);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function snapshotFiles(partsList) {
  return partsList.map((parts) => {
    const file = path.join(ROOT, ...parts);
    return {
      file,
      exists: fs.existsSync(file),
      content: fs.existsSync(file) ? fs.readFileSync(file) : null,
    };
  });
}

function restoreFiles(snapshot) {
  for (const item of snapshot) {
    if (item.exists) {
      fs.writeFileSync(item.file, item.content);
    } else if (fs.existsSync(item.file)) {
      fs.unlinkSync(item.file);
    }
  }
}

function printHuman(report) {
  console.log('=== run-all-checks.cjs ===');
  console.log(`baseline anchor: ${report.baselineAnchor}`);
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log('');
  for (const result of report.layers) {
    const marker = result.status === 'PASS' ? '[PASS]' : result.status === 'WARN' ? '[WARN]' : '[FAIL]';
    console.log(`${marker} ${result.label.padEnd(25, '.')} ${result.summary}`);
    if (result.stderr && result.status === 'FAIL') console.log(`       stderr: ${result.stderr}`);
  }
  console.log('');
  console.log(`result: ${report.result} (${report.hardPassCount}/${report.layers.length} hard pass, ${report.warnCount} warn)`);
  console.log(`exitCode: ${report.result === 'PASS' ? 0 : 1}`);
}
