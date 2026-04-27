#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_OUTPUT_DIR = path.join(ROOT, 'tmp', 'qa-visual-report');
const RESULT_DIRS = {
  manifest: path.join(ROOT, 'tmp', 'qa-route-simulator-results'),
  exhaustive: path.join(ROOT, 'tmp', 'qa-route-exhaustive-results'),
};

main();

function main() {
  const cli = parseArgs(process.argv.slice(2));
  const routeMode = selectRouteMode(cli);
  const routeDir = cli.routeDir ? path.resolve(ROOT, cli.routeDir) : RESULT_DIRS[routeMode];
  const outputDir = cli.outputDir ? path.resolve(ROOT, cli.outputDir) : DEFAULT_OUTPUT_DIR;

  const data = buildReportData(routeMode, routeDir);
  resetDir(outputDir);
  const html = renderHtml(data);
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(outputDir, 'summary.json'), `${JSON.stringify(data.summary, null, 2)}\n`, 'utf8');

  console.log(`qa-visual-report: mode=${routeMode} routes=${data.routes.length} findings=${data.findings.length}`);
  console.log(`report: ${relative(path.join(outputDir, 'index.html'))}`);
}

function buildReportData(routeMode, routeDir) {
  const trace = readJson(path.join(routeDir, 'action-by-action-trace.json'), []);
  const findings = readJson(path.join(routeDir, 'findings.json'), []);
  const coverage = readJson(path.join(routeDir, 'coverage-summary.json'), null);
  const deep = readJson(path.join(ROOT, 'tmp', 'qa-deep-results', 'consolidated-summary.json'), null);
  const fast = readJson(path.join(ROOT, 'tmp', 'qa-fast-results', 'consolidated-summary.json'), null);
  const browser = readJson(path.join(ROOT, 'tmp', 'qa-browser-results', 'summary.json'), null);
  const generation = readJson(path.join(routeDir, 'exhaustive-generation-summary.json'), null);

  const findingsByStep = new Map();
  for (const finding of findings) {
    const key = stepKey(finding.caseId, finding.routeId, finding.actionIndex);
    if (!findingsByStep.has(key)) findingsByStep.set(key, []);
    findingsByStep.get(key).push(minFinding(finding));
  }

  const routeMap = new Map();
  for (const item of trace) {
    const routeKey = `${item.caseId}/${item.routeId}`;
    if (!routeMap.has(routeKey)) {
      routeMap.set(routeKey, {
        key: routeKey,
        caseId: item.caseId,
        routeId: item.routeId,
        routeSummary: item.routeSummary || '',
        routePattern: item.routePattern || 'unspecified',
        phase: item.phase || 'unknown',
        actions: [],
        findings: [],
        severity: { P0: 0, P1: 0, P2: 0 },
      });
    }
    const route = routeMap.get(routeKey);
    const stepFindings = findingsByStep.get(stepKey(item.caseId, item.routeId, item.actionIndex)) || [];
    for (const finding of stepFindings) {
      route.findings.push(finding);
      route.severity[finding.severity] = (route.severity[finding.severity] || 0) + 1;
    }
    route.actions.push(minTraceStep(item, stepFindings));
  }

  const routes = [...routeMap.values()].sort((a, b) => {
    const sev = (b.severity.P0 - a.severity.P0) || (b.severity.P1 - a.severity.P1) || (b.severity.P2 - a.severity.P2);
    return sev || a.key.localeCompare(b.key);
  });

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    routeMode,
    routeDir: relative(routeDir),
    files: {
      trace: relative(path.join(routeDir, 'action-by-action-trace.json')),
      findings: relative(path.join(routeDir, 'findings.json')),
      coverage: relative(path.join(routeDir, 'coverage-summary.json')),
      deep: relative(path.join(ROOT, 'tmp', 'qa-deep-results', 'consolidated-summary.json')),
      browser: relative(path.join(ROOT, 'tmp', 'qa-browser-results', 'summary.json')),
    },
    summary: buildSummary({ routeMode, routeDir, routes, trace, findings, coverage, deep, fast, browser, generation }),
    coverage,
    deep: minDeep(deep),
    fast: minFast(fast),
    browser: minBrowser(browser),
    routes,
    findings: findings.map(minFinding),
  };
}

function buildSummary({ routeMode, routeDir, routes, trace, findings, coverage, deep, fast, browser, generation }) {
  return {
    routeMode,
    routeDir: relative(routeDir),
    generatedAt: new Date().toISOString(),
    deepStatus: deep?.release?.status || 'unknown',
    fastStatus: fast?.release?.status || 'unknown',
    browserStatus: browser?.status || 'unknown',
    totals: {
      routes: routes.length || coverage?.totals?.routes || 0,
      actions: trace.length || coverage?.totals?.actions || 0,
      findings: findings.length || coverage?.totals?.findings || 0,
      hardFindings: findings.filter((item) => item.severity === 'P0').length,
    },
    severity: countBy(findings, (item) => item.severity || 'unknown'),
    categories: countBy(findings, (item) => item.category || 'unknown'),
    actions: coverage?.actions || countBy(trace, (item) => item.action?.type || 'unknown'),
    cases: coverage?.cases || countBy(trace, (item) => item.caseId || 'unknown'),
    generation: generation ? {
      mode: generation.mode,
      limits: generation.limits,
      cases: generation.cases,
    } : null,
  };
}

function minTraceStep(item, findings) {
  return {
    caseId: item.caseId,
    routeId: item.routeId,
    actionIndex: item.actionIndex,
    phase: item.phase,
    action: minAction(item.action),
    outputs: (item.outputs || []).map((output) => ({
      speaker: output.speaker || 'unknown',
      channel: output.channel || 'unknown',
      resolverPath: output.resolverPath || '',
      sourcePath: output.sourcePath || '',
      text: truncate(output.text || '', 260),
    })),
    stateDelta: minStateDelta(item.stateDelta),
    findingIds: findings.map((finding) => finding.id),
    findings,
  };
}

function minAction(action = {}) {
  return {
    type: action.type || 'unknown',
    target: action.target || '',
    disputeId: action.disputeId || '',
    evidenceId: action.evidenceId || '',
    dossierId: action.dossierId || '',
    recipeId: action.recipeId || '',
    questionType: action.questionType || '',
    subAction: action.subAction || '',
    witnessId: action.witnessId || '',
    inputs: action.inputs || [],
  };
}

function minStateDelta(delta = {}) {
  return {
    lieStates: delta.lieStates || [],
    evidence: (delta.evidence || []).map((item) => ({
      evidenceId: item.evidenceId,
      before: item.before ? compactEvidenceState(item.before) : null,
      after: item.after ? compactEvidenceState(item.after) : null,
    })),
    disputes: delta.disputes || [],
    dossier: delta.dossier || [],
    witnesses: delta.witnesses || [],
  };
}

function compactEvidenceState(value) {
  return {
    unlocked: value.unlocked,
    stage: value.stage,
    presentedTo: value.presentedTo || [],
    investigatedActions: value.investigatedActions || [],
  };
}

function minFinding(item) {
  return {
    id: item.id,
    caseId: item.caseId,
    routeId: item.routeId,
    phase: item.phase,
    actionIndex: item.actionIndex,
    actionType: item.actionType || item.action?.type || '',
    target: item.target || item.action?.target || '',
    disputeId: item.disputeId || item.action?.disputeId || '',
    evidenceId: item.evidenceId || item.action?.evidenceId || '',
    severity: item.severity || 'unknown',
    category: item.category || 'unknown',
    summary: item.summary || '',
    expected: item.expected || '',
    actual: truncate(item.actual || '', 360),
    resolverPath: item.resolverPath || '',
    sourcePath: item.sourcePath || '',
    patchPriority: item.patchPriority || 'unclassified',
  };
}

function minDeep(value) {
  if (!value) return null;
  return {
    status: value.release?.status || 'unknown',
    reasons: value.release?.reasons || [],
    modes: value.modes || {},
    runs: Object.fromEntries(Object.entries(value.runs || {}).map(([key, run]) => [key, {
      exitCode: run.exitCode,
      durationMs: run.durationMs,
      summaryFile: run.summaryFile,
    }])),
  };
}

function minFast(value) {
  if (!value) return null;
  return {
    status: value.release?.status || 'unknown',
    release: value.release || {},
    combined: value.combined || {},
    modes: value.modes || {},
  };
}

function minBrowser(value) {
  if (!value) return null;
  return {
    status: value.status || 'unknown',
    url: value.url || '',
    checks: value.checks || [],
    consoleErrors: value.consoleErrors || [],
    pageErrors: value.pageErrors || [],
    actualPlay: value.actualPlay || null,
    screenshot: '../qa-browser-results/pc-actual-play.png',
  };
}

function renderHtml(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QA Visual Replay Report</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0d1017;
      --panel: #151a24;
      --panel-2: #10141d;
      --line: #273142;
      --muted: #8e99aa;
      --text: #e8edf6;
      --good: #38d996;
      --warn: #ffbf5f;
      --bad: #ff6575;
      --info: #6da7ff;
      --accent: #d5a24e;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
    header { padding: 24px 28px 16px; border-bottom: 1px solid var(--line); background: #0b0e14; position: sticky; top: 0; z-index: 10; }
    h1 { margin: 0 0 6px; font-size: 24px; letter-spacing: 0; }
    h2 { margin: 0 0 14px; font-size: 16px; letter-spacing: 0; }
    h3 { margin: 0 0 10px; font-size: 14px; letter-spacing: 0; }
    p { margin: 0; }
    button, input, select { font: inherit; }
    .sub { color: var(--muted); font-size: 13px; }
    .shell { display: grid; grid-template-columns: 340px minmax(0, 1fr); min-height: calc(100vh - 94px); }
    .sidebar { border-right: 1px solid var(--line); background: #0f131b; padding: 16px; overflow: auto; max-height: calc(100vh - 94px); position: sticky; top: 94px; }
    .main { padding: 18px 22px 36px; min-width: 0; }
    .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(140px, 1fr)); gap: 10px; margin: 16px 0 0; }
    .metric, .panel, .route-item, .step, .finding-row { border: 1px solid var(--line); background: var(--panel); border-radius: 8px; }
    .metric { padding: 12px; min-height: 74px; }
    .metric small { display: block; color: var(--muted); font-size: 11px; text-transform: uppercase; }
    .metric strong { display: block; margin-top: 6px; font-size: 22px; }
    .metric span { color: var(--muted); font-size: 12px; }
    .tabs { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
    .tab { border: 1px solid var(--line); color: var(--text); background: var(--panel-2); border-radius: 7px; padding: 8px 12px; cursor: pointer; }
    .tab.is-active { border-color: var(--accent); color: #ffe1a3; background: #201914; }
    .filters { display: grid; gap: 8px; margin-bottom: 12px; }
    .filters input, .filters select { width: 100%; border: 1px solid var(--line); border-radius: 7px; padding: 8px 10px; background: #0b0f16; color: var(--text); }
    .route-list { display: grid; gap: 8px; }
    .route-item { text-align: left; color: var(--text); padding: 10px; cursor: pointer; width: 100%; }
    .route-item.is-active { outline: 2px solid var(--accent); }
    .route-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 13px; font-weight: 700; }
    .route-meta { margin-top: 6px; color: var(--muted); font-size: 12px; line-height: 1.4; }
    .badges { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; }
    .badge { display: inline-flex; align-items: center; min-height: 20px; padding: 2px 7px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); font-size: 11px; }
    .sev-P0 { color: #ffd6dc; border-color: rgba(255,101,117,.7); background: rgba(255,101,117,.12); }
    .sev-P1 { color: #ffe2b8; border-color: rgba(255,191,95,.65); background: rgba(255,191,95,.1); }
    .sev-P2 { color: #cfe0ff; border-color: rgba(109,167,255,.6); background: rgba(109,167,255,.1); }
    .ok { color: var(--good); }
    .warn { color: var(--warn); }
    .bad { color: var(--bad); }
    .panel { padding: 14px; margin-bottom: 14px; }
    .panel-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .kv { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 8px; font-size: 13px; line-height: 1.45; }
    .kv b { color: var(--muted); font-weight: 600; }
    .timeline { display: grid; gap: 10px; }
    .step { padding: 12px; }
    .step-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--line); padding-bottom: 8px; margin-bottom: 8px; }
    .action { color: #ffe1a3; font-weight: 800; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .outputs, .delta, .finding-list { display: grid; gap: 8px; margin-top: 8px; }
    .output { border-left: 3px solid var(--info); padding: 7px 9px; background: #101721; border-radius: 5px; }
    .output small, .delta small { color: var(--muted); display: block; margin-bottom: 3px; }
    .delta { color: #cbd5e1; font-size: 12px; }
    .finding-row { padding: 10px; margin-bottom: 8px; }
    .finding-row strong { display: block; margin-bottom: 5px; }
    .finding-row p { color: #cbd5e1; font-size: 13px; line-height: 1.45; margin-top: 6px; }
    .bars { display: grid; gap: 8px; }
    .bar-row { display: grid; grid-template-columns: 180px minmax(0, 1fr) 54px; align-items: center; gap: 10px; font-size: 12px; }
    .bar { height: 9px; background: #0a0d12; border: 1px solid var(--line); border-radius: 99px; overflow: hidden; }
    .bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--info), var(--accent)); }
    .screenshot { max-width: 100%; border: 1px solid var(--line); border-radius: 8px; }
    .hidden { display: none; }
    a { color: #9cc2ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    @media (max-width: 980px) {
      header { position: static; }
      .shell { grid-template-columns: 1fr; }
      .sidebar { position: static; max-height: none; border-right: 0; border-bottom: 1px solid var(--line); }
      .summary-grid, .panel-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <h1>QA Visual Replay Report</h1>
    <p class="sub" id="reportSub"></p>
    <section class="summary-grid" id="summaryGrid"></section>
  </header>
  <div class="shell">
    <aside class="sidebar">
      <div class="tabs">
        <button class="tab is-active" data-tab="routes">Routes</button>
        <button class="tab" data-tab="findings">Findings</button>
        <button class="tab" data-tab="coverage">Coverage</button>
        <button class="tab" data-tab="browser">Browser</button>
      </div>
      <section id="routeFilters" class="filters">
        <input id="routeSearch" placeholder="Search routes, actions, case..." />
        <select id="caseFilter"></select>
        <select id="severityFilter">
          <option value="">All severities</option>
          <option value="P0">P0 only</option>
          <option value="P1">P1 only</option>
          <option value="P2">P2 only</option>
          <option value="clean">No findings</option>
        </select>
      </section>
      <section id="routeList" class="route-list"></section>
    </aside>
    <main class="main">
      <section id="routesTab"></section>
      <section id="findingsTab" class="hidden"></section>
      <section id="coverageTab" class="hidden"></section>
      <section id="browserTab" class="hidden"></section>
    </main>
  </div>
  <script>
    const report = ${json};
    const state = { tab: 'routes', selectedRouteKey: report.routes[0]?.key || null };
    const qs = (sel) => document.querySelector(sel);
    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    const count = (obj, key) => obj?.[key] || 0;
    const relLink = (file) => '../' + String(file || '').replace(/^tmp\\//, '').replaceAll('\\\\', '/');

    init();

    function init() {
      renderSummary();
      initFilters();
      bindEvents();
      renderRouteList();
      renderActiveTab();
    }

    function bindEvents() {
      document.querySelectorAll('.tab').forEach((button) => {
        button.addEventListener('click', () => {
          state.tab = button.dataset.tab;
          document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('is-active', item === button));
          qs('#routeFilters').classList.toggle('hidden', state.tab !== 'routes');
          qs('#routeList').classList.toggle('hidden', state.tab !== 'routes');
          renderActiveTab();
        });
      });
      ['routeSearch', 'caseFilter', 'severityFilter'].forEach((id) => qs('#' + id).addEventListener('input', renderRouteList));
    }

    function renderSummary() {
      const s = report.summary;
      qs('#reportSub').textContent = \`\${report.routeMode} mode · generated \${new Date(report.generatedAt).toLocaleString()} · source \${report.routeDir}\`;
      const statusClass = s.deepStatus === 'DEEP READY' || s.deepStatus === 'RELEASE READY' ? 'ok' : s.deepStatus.includes('BLOCK') ? 'bad' : 'warn';
      qs('#summaryGrid').innerHTML = [
        metric('Deep status', s.deepStatus, 'qa:deep consolidated', statusClass),
        metric('Routes', s.totals.routes, s.routeMode),
        metric('Actions', s.totals.actions, 'trace steps'),
        metric('P0 hard', s.totals.hardFindings, 'blocking findings', s.totals.hardFindings ? 'bad' : 'ok'),
        metric('Browser', s.browserStatus, 'actual play harness', s.browserStatus === 'PASS' ? 'ok' : 'warn'),
      ].join('');
    }

    function metric(label, value, sub, cls = '') {
      return \`<div class="metric"><small>\${esc(label)}</small><strong class="\${cls}">\${esc(value)}</strong><span>\${esc(sub)}</span></div>\`;
    }

    function initFilters() {
      const cases = [...new Set(report.routes.map((route) => route.caseId))].sort();
      qs('#caseFilter').innerHTML = '<option value="">All cases</option>' + cases.map((id) => \`<option value="\${esc(id)}">\${esc(id)}</option>\`).join('');
    }

    function filteredRoutes() {
      const search = qs('#routeSearch').value.trim().toLowerCase();
      const caseId = qs('#caseFilter').value;
      const sev = qs('#severityFilter').value;
      return report.routes.filter((route) => {
        if (caseId && route.caseId !== caseId) return false;
        if (sev === 'clean' && route.findings.length > 0) return false;
        if (sev && sev !== 'clean' && !route.findings.some((finding) => finding.severity === sev)) return false;
        if (!search) return true;
        const haystack = [route.key, route.routePattern, route.routeSummary, ...route.actions.map((step) => [step.action.type, step.action.target, step.action.disputeId, step.action.evidenceId].join(' '))].join(' ').toLowerCase();
        return haystack.includes(search);
      });
    }

    function renderRouteList() {
      const routes = filteredRoutes();
      if (!routes.some((route) => route.key === state.selectedRouteKey)) state.selectedRouteKey = routes[0]?.key || report.routes[0]?.key || null;
      qs('#routeList').innerHTML = routes.slice(0, 300).map((route) => {
        const actionPreview = route.actions.slice(0, 3).map((step) => step.action.type).join(' > ');
        return \`<button class="route-item \${route.key === state.selectedRouteKey ? 'is-active' : ''}" data-route="\${esc(route.key)}">
          <div class="route-title"><span>\${esc(route.routeId)}</span><span>\${route.actions.length} actions</span></div>
          <div class="route-meta">\${esc(route.caseId)} · \${esc(route.routePattern)}<br>\${esc(actionPreview)}</div>
          <div class="badges">\${severityBadges(route.severity)}\${route.findings.length ? \`<span class="badge">\${route.findings.length} findings</span>\` : '<span class="badge ok">clean</span>'}</div>
        </button>\`;
      }).join('') || '<p class="sub">No routes match the current filters.</p>';
      document.querySelectorAll('.route-item').forEach((button) => {
        button.addEventListener('click', () => {
          state.selectedRouteKey = button.dataset.route;
          renderRouteList();
          renderRoutesTab();
        });
      });
      if (routes.length > 300) qs('#routeList').insertAdjacentHTML('beforeend', \`<p class="sub">Showing 300 of \${routes.length} routes. Narrow the filters to see more.</p>\`);
    }

    function severityBadges(severity) {
      return ['P0', 'P1', 'P2'].map((key) => {
        const value = count(severity, key);
        return value ? \`<span class="badge sev-\${key}">\${key} \${value}</span>\` : '';
      }).join('');
    }

    function renderActiveTab() {
      qs('#routesTab').classList.toggle('hidden', state.tab !== 'routes');
      qs('#findingsTab').classList.toggle('hidden', state.tab !== 'findings');
      qs('#coverageTab').classList.toggle('hidden', state.tab !== 'coverage');
      qs('#browserTab').classList.toggle('hidden', state.tab !== 'browser');
      if (state.tab === 'routes') renderRoutesTab();
      if (state.tab === 'findings') renderFindingsTab();
      if (state.tab === 'coverage') renderCoverageTab();
      if (state.tab === 'browser') renderBrowserTab();
    }

    function renderRoutesTab() {
      const route = report.routes.find((item) => item.key === state.selectedRouteKey);
      if (!route) {
        qs('#routesTab').innerHTML = '<div class="panel">No route selected.</div>';
        return;
      }
      const transcript = \`../\${report.routeDir.replace(/^tmp\\//, '')}/route-transcripts/\${route.caseId}-\${route.routeId}.md\`;
      qs('#routesTab').innerHTML = \`
        <section class="panel">
          <h2>\${esc(route.caseId)} / \${esc(route.routeId)}</h2>
          <div class="kv">
            <b>pattern</b><span>\${esc(route.routePattern)}</span>
            <b>summary</b><span>\${esc(route.routeSummary || 'n/a')}</span>
            <b>findings</b><span>\${severityBadges(route.severity) || '<span class="ok">none</span>'}</span>
            <b>transcript</b><span><a href="\${esc(transcript)}" target="_blank">open markdown transcript</a></span>
          </div>
        </section>
        <section class="timeline">\${route.actions.map(renderStep).join('')}</section>
      \`;
    }

    function renderStep(step) {
      const actionBits = [step.action.target, step.action.disputeId, step.action.evidenceId, step.action.dossierId, step.action.recipeId, step.action.questionType, step.action.subAction].filter(Boolean).join(' · ');
      return \`<article class="step">
        <div class="step-head">
          <div><span class="badge">#\${step.actionIndex}</span> <span class="action">\${esc(step.action.type)}</span> <span class="sub">\${esc(actionBits)}</span></div>
          <div class="badges">\${step.findings.map((finding) => \`<span class="badge sev-\${finding.severity}">\${finding.id}</span>\`).join('')}</div>
        </div>
        <div class="outputs">\${step.outputs.map(renderOutput).join('') || '<p class="sub">No visible outputs.</p>'}</div>
        \${renderDelta(step.stateDelta)}
        \${step.findings.length ? \`<div class="finding-list">\${step.findings.map(renderFindingInline).join('')}</div>\` : ''}
      </article>\`;
    }

    function renderOutput(output) {
      return \`<div class="output"><small>\${esc(output.speaker)} · \${esc(output.channel)} · \${esc(output.resolverPath)}</small><div>\${esc(output.text)}</div><small class="mono">\${esc(output.sourcePath)}</small></div>\`;
    }

    function renderDelta(delta) {
      const rows = [];
      if (delta.lieStates.length) rows.push(\`lieState: \${delta.lieStates.map((item) => \`\${item.party}/\${item.disputeId} \${item.from}->\${item.to}\`).join(', ')}\`);
      if (delta.evidence.length) rows.push(\`evidence: \${delta.evidence.map((item) => \`\${item.evidenceId} stage \${item.before?.stage ?? '?'}->\${item.after?.stage ?? '?'}\`).join(', ')}\`);
      if (delta.disputes.length) rows.push(\`disputes: \${delta.disputes.map((item) => \`\${item.disputeId} \${item.from}->\${item.to}\`).join(', ')}\`);
      if (delta.dossier.length) rows.push(\`dossier: \${delta.dossier.map((item) => \`\${item.dossierId || item.id} \${item.from}->\${item.to}\`).join(', ')}\`);
      if (!rows.length) return '';
      return \`<div class="delta"><small>state delta</small>\${rows.map((row) => \`<div>\${esc(row)}</div>\`).join('')}</div>\`;
    }

    function renderFindingInline(finding) {
      return \`<div class="finding-row"><strong><span class="badge sev-\${finding.severity}">\${finding.severity}</span> \${esc(finding.category)} · \${esc(finding.id)}</strong><p>\${esc(finding.summary)}</p><p><b>actual:</b> \${esc(finding.actual)}</p><p class="mono">\${esc(finding.sourcePath)}</p></div>\`;
    }

    function renderFindingsTab() {
      const bySeverity = ['P0', 'P1', 'P2'].map((sev) => \`\${sev}: \${report.findings.filter((item) => item.severity === sev).length}\`).join(' · ');
      qs('#findingsTab').innerHTML = \`
        <section class="panel"><h2>Findings</h2><p class="sub">\${esc(bySeverity)} · total \${report.findings.length}</p></section>
        \${report.findings.map((finding) => \`<article class="finding-row">
          <strong><span class="badge sev-\${finding.severity}">\${finding.severity}</span> \${esc(finding.id)} · \${esc(finding.category)}</strong>
          <p>\${esc(finding.caseId)} / \${esc(finding.routeId)} / action #\${esc(finding.actionIndex)} · \${esc(finding.actionType)}</p>
          <p>\${esc(finding.summary)}</p>
          <p><b>expected:</b> \${esc(finding.expected)}</p>
          <p><b>actual:</b> \${esc(finding.actual)}</p>
          <p class="mono">\${esc(finding.sourcePath)}</p>
        </article>\`).join('')}
      \`;
    }

    function renderCoverageTab() {
      const coverage = report.coverage || {};
      qs('#coverageTab').innerHTML = \`
        <section class="panel"><h2>Coverage</h2><div class="panel-grid">
          \${renderBars('Cases', report.summary.cases)}
          \${renderBars('Actions', report.summary.actions)}
          \${renderBars('Finding Categories', report.summary.categories)}
          \${renderBars('Severity', report.summary.severity)}
        </div></section>
        <section class="panel"><h2>Generation</h2><pre class="mono">\${esc(JSON.stringify(report.summary.generation || coverage.totals || {}, null, 2))}</pre></section>
      \`;
    }

    function renderBars(title, values = {}) {
      const entries = Object.entries(values).sort((a, b) => b[1] - a[1]).slice(0, 16);
      const max = Math.max(1, ...entries.map(([, value]) => value));
      return \`<div><h3>\${esc(title)}</h3><div class="bars">\${entries.map(([key, value]) => \`<div class="bar-row"><span>\${esc(key)}</span><div class="bar"><i style="width:\${Math.max(2, (value / max) * 100)}%"></i></div><b>\${value}</b></div>\`).join('')}</div></div>\`;
    }

    function renderBrowserTab() {
      const browser = report.browser;
      if (!browser) {
        qs('#browserTab').innerHTML = '<section class="panel">No browser harness result found.</section>';
        return;
      }
      qs('#browserTab').innerHTML = \`
        <section class="panel"><h2>Browser Actual Play</h2>
          <div class="kv">
            <b>status</b><span class="\${browser.status === 'PASS' ? 'ok' : 'warn'}">\${esc(browser.status)}</span>
            <b>url</b><span>\${esc(browser.url)}</span>
            <b>console errors</b><span>\${browser.consoleErrors.length}</span>
            <b>page errors</b><span>\${browser.pageErrors.length}</span>
            <b>actual play</b><span>\${browser.actualPlay ? esc(\`\${browser.actualPlay.caseId} question/\${browser.actualPlay.target}/\${browser.actualPlay.disputeId}, dialogueDelta=\${browser.actualPlay.dialogueDelta}\`) : 'n/a'}</span>
          </div>
        </section>
        <section class="panel"><h2>Checks</h2>\${browser.checks.map((check) => \`<p><span class="badge \${check.status === 'PASS' ? 'ok' : 'bad'}">\${esc(check.status)}</span> \${esc(check.name)} \${check.durationMs ? \`· \${check.durationMs}ms\` : ''}</p>\`).join('')}</section>
        <section class="panel"><h2>Screenshot</h2><a href="\${esc(browser.screenshot)}" target="_blank"><img class="screenshot" src="\${esc(browser.screenshot)}" alt="PC actual play screenshot" /></a></section>
      \`;
    }
  </script>
</body>
</html>
`;
}

function stepKey(caseId, routeId, actionIndex) {
  return `${caseId}/${routeId}/${actionIndex}`;
}

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function truncate(text, max) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1).trim()}...` : normalized;
}

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function selectRouteMode(cli) {
  if (cli.mode) return cli.mode;
  if (fs.existsSync(path.join(RESULT_DIRS.exhaustive, 'action-by-action-trace.json'))) return 'exhaustive';
  return 'manifest';
}

function parseArgs(argv) {
  return {
    mode: valueArg(argv, '--mode'),
    routeDir: valueArg(argv, '--route-dir'),
    outputDir: valueArg(argv, '--output-dir'),
  };
}

function valueArg(argv, name) {
  const eqPrefix = `${name}=`;
  const eq = argv.find((arg) => arg.startsWith(eqPrefix));
  if (eq) return eq.slice(eqPrefix.length);
  const index = argv.indexOf(name);
  if (index >= 0) return argv[index + 1];
  return null;
}

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}
