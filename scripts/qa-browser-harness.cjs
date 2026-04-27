const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RESULT_DIR = path.join(ROOT, 'tmp', 'qa-browser-results');
const DEFAULT_PORT = 0;

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const cli = parseArgs(process.argv.slice(2));
  cli.port = cli.port || await findFreePort();
  resetResultDir();

  const summary = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    mode: 'browser-actual-play',
    url: `http://127.0.0.1:${cli.port}/index-pc.html`,
    status: 'unknown',
    checks: [],
    consoleErrors: [],
    pageErrors: [],
    serverLog: [],
  };

  const server = await startVite(cli);
  summary.serverLog.push(`vite dev server started: ${summary.url}`);

  try {
    await waitForHttp(summary.url, 30_000);
    const result = await runBrowserScenario(summary, cli);
    summary.status = result.ok ? 'PASS' : 'FAIL';
    summary.checks.push(...result.checks);
    summary.actualPlay = result.actualPlay;
  } finally {
    await server.close();
    writeSummary(summary);
  }

  if (summary.status !== 'PASS') process.exit(1);
  if (summary.pageErrors.length > 0) process.exit(1);

  console.log(`qa-browser-harness: status=${summary.status} checks=${summary.checks.length} consoleErrors=${summary.consoleErrors.length} pageErrors=${summary.pageErrors.length}`);
  console.log(`results: ${path.relative(ROOT, RESULT_DIR)}`);
}

async function runBrowserScenario(summary, cli) {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: !cli.headed });
  const context = await browser.newContext({
    viewport: { width: 1365, height: 768 },
    deviceScaleFactor: 1,
  });
  await context.addInitScript(() => {
    window.localStorage.setItem('solomon-intro-seen', 'true');
    window.localStorage.setItem('solomon-settings', JSON.stringify({
      typingSpeed: 'instant',
      autoAdvanceDialogue: true,
      soundEnabled: false,
      bgmEnabled: false,
    }));
  });

  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') summary.consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => summary.pageErrors.push(error.message));

  const checks = [];
  const mark = async (name, fn) => {
    const startedAt = Date.now();
    await fn();
    checks.push({ name, status: 'PASS', durationMs: Date.now() - startedAt });
  };

  try {
    await mark('load_pc_home', async () => {
      await page.goto(summary.url, { waitUntil: 'domcontentloaded' });
      await page.locator('.pc-home-shell').waitFor({ state: 'visible', timeout: 20_000 });
      await assertNonBlank(page);
    });

    await mark('open_general_session', async () => {
      await page.locator('.pc-home-v2__mode-grid button:not([disabled])').first().click();
      await page.locator('.pc-session-grid-v2').waitFor({ state: 'visible', timeout: 10_000 });
    });

    await mark('open_case_browser', async () => {
      await page.locator('.pc-session-card-v2:not(.is-disabled)').first().click();
      await page.locator('.cb').waitFor({ state: 'visible', timeout: 10_000 });
      await page.locator('.cb__brief-start').waitFor({ state: 'visible', timeout: 10_000 });
    });

    await mark('enter_case_play', async () => {
      await page.locator('.cb__brief-start').click();
      await page.locator('.app.pc-play-app').waitFor({ state: 'visible', timeout: 25_000 });
      await page.waitForFunction(() => Boolean(window.__pcStore?.getState?.().caseData && window.__pcDispatch), null, { timeout: 10_000 });
    });

    const actualPlay = await dispatchActualQuestion(page);
    checks.push({
      name: 'dispatch_actual_question',
      status: actualPlay.dialogueDelta > 0 ? 'PASS' : 'FAIL',
      durationMs: actualPlay.durationMs,
    });
    await page.screenshot({ path: path.join(RESULT_DIR, 'pc-actual-play.png'), fullPage: true });

    await browser.close();
    return {
      ok: checks.every((item) => item.status === 'PASS'),
      checks,
      actualPlay,
    };
  } catch (error) {
    await page.screenshot({ path: path.join(RESULT_DIR, 'pc-failure.png'), fullPage: true }).catch(() => {});
    await browser.close();
    checks.push({ name: 'browser_scenario', status: 'FAIL', error: error.message });
    return { ok: false, checks, actualPlay: null };
  }
}

async function dispatchActualQuestion(page) {
  return page.evaluate(async () => {
    const startedAt = Date.now();
    const storeApi = window.__pcStore;
    const dispatch = window.__pcDispatch;
    if (!storeApi || !dispatch) throw new Error('PC dev dispatch/store globals are unavailable');
    const before = storeApi.getState();
    const caseData = before.caseData;
    if (!caseData) throw new Error('No active case after entering play');
    const firstConfig = caseData.lieConfigA?.[0] || caseData.lieConfigB?.[0];
    const target = caseData.lieConfigA?.[0] ? 'a' : 'b';
    const disputeId = firstConfig?.disputeId || caseData.disputes?.find((item) => !item.hidden && item.v3Visibility !== 'hidden')?.id;
    if (!disputeId) throw new Error('No playable dispute found in active case');

    const beforeDialogueCount = before.dialogueLog?.length || 0;
    dispatch({ type: 'question', questionType: 'fact_pursuit', target, disputeId });

    const deadline = Date.now() + 5_000;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const current = storeApi.getState();
      if ((current.dialogueLog?.length || 0) > beforeDialogueCount) break;
    }

    const after = storeApi.getState();
    const afterDialogueCount = after.dialogueLog?.length || 0;
    return {
      caseId: caseData.caseId,
      target,
      disputeId,
      phase: after.currentPhase,
      beforeDialogueCount,
      afterDialogueCount,
      dialogueDelta: afterDialogueCount - beforeDialogueCount,
      turnCount: after.turnCount,
      durationMs: Date.now() - startedAt,
      lastDialogue: after.dialogueLog?.at(-1) || null,
    };
  });
}

async function assertNonBlank(page) {
  const textLength = await page.locator('body').evaluate((body) => body.innerText.trim().length);
  if (textLength < 10) throw new Error(`Browser page appears blank; body text length=${textLength}`);
}

async function startVite(cli) {
  const { createServer } = await import('vite');
  const server = await createServer({
    configFile: path.join(ROOT, 'vite.config.pc.ts'),
    server: {
      host: '127.0.0.1',
      port: cli.port,
      strictPort: true,
      open: false,
    },
  });
  await server.listen();
  return server;
}

function waitForHttp(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const poll = () => {
      http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      }).on('error', retry);
    };
    const retry = () => {
      if (Date.now() >= deadline) {
        reject(new Error(`Timed out waiting for dev server: ${url}`));
        return;
      }
      setTimeout(poll, 250);
    };
    poll();
  });
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : null;
      server.close(() => {
        if (port) resolve(port);
        else reject(new Error('Unable to allocate a browser QA port'));
      });
    });
  });
}

function writeSummary(summary) {
  writeJson(path.join(RESULT_DIR, 'summary.json'), summary);
  const lines = [
    '# Browser QA Harness Summary',
    '',
    `- status: ${summary.status}`,
    `- url: ${summary.url}`,
    `- checks: ${summary.checks.length}`,
    `- console errors: ${summary.consoleErrors.length}`,
    `- page errors: ${summary.pageErrors.length}`,
    '',
    '## Checks',
    ...summary.checks.map((item) => `- ${item.name}: ${item.status}${item.durationMs != null ? ` (${item.durationMs}ms)` : ''}${item.error ? ` — ${item.error}` : ''}`),
  ];
  if (summary.actualPlay) {
    lines.push(
      '',
      '## Actual Play Dispatch',
      `- case: ${summary.actualPlay.caseId}`,
      `- action: question/${summary.actualPlay.target}/${summary.actualPlay.disputeId}`,
      `- dialogue delta: ${summary.actualPlay.dialogueDelta}`,
      `- turn count: ${summary.actualPlay.turnCount}`,
    );
  }
  fs.writeFileSync(path.join(RESULT_DIR, 'summary.md'), `${lines.join('\n')}\n`, 'utf8');
}

function resetResultDir() {
  fs.rmSync(RESULT_DIR, { recursive: true, force: true });
  fs.mkdirSync(RESULT_DIR, { recursive: true });
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function parseArgs(argv) {
  return {
    port: numberArg(argv, '--port', DEFAULT_PORT),
    headed: argv.includes('--headed'),
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

function numberArg(argv, name, fallback) {
  const value = valueArg(argv, name);
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}
