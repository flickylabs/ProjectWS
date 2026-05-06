import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const port = Number(process.env.SMOKE_PORT || 3201);
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['index.js'], {
  cwd: new URL('../server/', import.meta.url),
  env: { ...process.env, PORT: String(port), STEAM_REQUIRE_API_AUTH: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let stderr = '';
server.stderr.on('data', (chunk) => {
  stderr += chunk.toString();
});

async function waitForHealth() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const res = await fetch(`${baseUrl}/api/health`);
      if (res.ok) return res.json();
    } catch {
      // retry
    }
    await delay(250);
  }
  throw new Error('server_health_timeout');
}

try {
  const health = await waitForHealth();
  const authRes = await fetch(`${baseUrl}/api/auth/steam`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ticketHex: Buffer.from('fake-live-ticket').toString('hex'),
      personaName: 'Smoke Test',
    }),
  });
  const authBody = await authRes.json().catch(() => ({}));
  const protectedRes = await fetch(`${baseUrl}/api/notices`);
  const protectedBody = await protectedRes.json().catch(() => ({}));

  console.log(JSON.stringify({
    ok: (
      health.status === 'ok' &&
      (authRes.status === 200 || authRes.status === 401) &&
      protectedRes.status === 401
    ),
    health: health.status,
    fakeTicketStatus: authRes.status,
    fakeTicketMode: authRes.status === 200 ? 'mock-accepted' : 'live-rejected',
    fakeTicketError: authBody.error || null,
    protectedApiStatus: protectedRes.status,
    protectedApiError: protectedBody.error || null,
  }, null, 2));
} catch (err) {
  console.error(JSON.stringify({
    ok: false,
    error: err instanceof Error ? err.message : String(err),
    serverStderr: stderr.slice(-800),
  }, null, 2));
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
}
