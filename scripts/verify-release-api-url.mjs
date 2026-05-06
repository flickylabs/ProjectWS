import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';

const explicitApiUrl = process.env.VITE_API_URL;

for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  const envPath = resolve(process.cwd(), file);
  if (existsSync(envPath)) {
    config({ path: envPath, override: true, quiet: true });
  }
}

if (explicitApiUrl) {
  process.env.VITE_API_URL = explicitApiUrl;
}

const apiUrl = process.env.VITE_API_URL;

if (!apiUrl) {
  console.error('[release] VITE_API_URL is required for Steam release builds.');
  console.error('[release] Set it in .env.production.local or in the shell.');
  console.error('[release] Example: VITE_API_URL=https://your-server.example.com/api');
  process.exit(1);
}

if (!/^https:\/\/.+\/api\/?$/.test(apiUrl)) {
  console.error('[release] VITE_API_URL must be an HTTPS /api endpoint.');
  console.error(`[release] Received: ${apiUrl.replace(/\/\/[^/]+/, '//<host>')}`);
  process.exit(1);
}

console.log('[release] VITE_API_URL is configured.');
