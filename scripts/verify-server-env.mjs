import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), 'server/.env'), quiet: true });

const required = [
  'STEAM_APP_ID',
  'STEAM_AUTH_IDENTITY',
  'STEAM_WEB_API_KEY',
  'STEAM_SESSION_SECRET',
  'OPENAI_API_KEY',
];

const optional = ['STEAM_AUTH_MOCK', 'STEAM_REQUIRE_API_AUTH', 'PORT', 'NODE_ENV'];
const missing = required.filter((key) => !process.env[key]);
const report = Object.fromEntries([...required, ...optional].map((key) => [
  key,
  {
    present: Boolean(process.env[key]),
    length: process.env[key]?.length || 0,
  },
]));

if (process.env.STEAM_APP_ID && !/^\d+$/.test(process.env.STEAM_APP_ID)) {
  missing.push('STEAM_APP_ID(numeric)');
}

if (process.env.NODE_ENV === 'production' && process.env.STEAM_AUTH_MOCK === '1') {
  missing.push('STEAM_AUTH_MOCK must not be 1 in production');
}

if (
  process.env.STEAM_REQUIRE_API_AUTH &&
  !['0', '1'].includes(process.env.STEAM_REQUIRE_API_AUTH)
) {
  missing.push('STEAM_REQUIRE_API_AUTH must be 0 or 1');
}

console.log(JSON.stringify({
  ok: missing.length === 0,
  missing,
  report,
}, null, 2));

if (missing.length > 0) process.exit(1);
