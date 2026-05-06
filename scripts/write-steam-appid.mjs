import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_STEAM_APP_ID = '4709340';
const appId = process.env.STEAM_APP_ID || process.argv[2] || DEFAULT_STEAM_APP_ID;

if (!/^\d+$/.test(appId)) {
  console.error(`[steam:appid] Invalid Steam App ID: ${appId}`);
  process.exit(1);
}

const target = resolve(process.cwd(), 'steam_appid.txt');
writeFileSync(target, `${appId}\n`, 'utf8');
console.log(`[steam:appid] Wrote ${target} with App ID ${appId}`);
