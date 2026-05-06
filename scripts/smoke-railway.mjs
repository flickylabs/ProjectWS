import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';

for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  const envPath = resolve(process.cwd(), file);
  if (existsSync(envPath)) {
    config({ path: envPath, override: true, quiet: true });
  }
}

const rawApiUrl = process.env.VITE_API_URL;
if (!rawApiUrl) {
  console.error('[railway:smoke] VITE_API_URL is required.');
  process.exit(1);
}

const apiUrl = rawApiUrl.replace(/\/+$/, '');

async function readJson(res) {
  return res.json().catch(async () => ({ raw: await res.text().catch(() => '') }));
}

const healthRes = await fetch(`${apiUrl}/health`, {
  signal: AbortSignal.timeout(10_000),
});
const health = await readJson(healthRes);

const protectedRes = await fetch(`${apiUrl}/notices`, {
  signal: AbortSignal.timeout(10_000),
});
const protectedBody = await readJson(protectedRes);

const ok = healthRes.ok && health.status === 'ok' && protectedRes.status === 401;

console.log(JSON.stringify({
  ok,
  apiUrl: apiUrl.replace(/\/\/[^/]+/, '//<host>'),
  healthStatus: healthRes.status,
  health: health.status || null,
  protectedApiStatus: protectedRes.status,
  protectedApiError: protectedBody.error || null,
}, null, 2));

if (!ok) {
  process.exit(1);
}
