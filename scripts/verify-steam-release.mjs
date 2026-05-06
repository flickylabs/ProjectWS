import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const releaseDir = resolve(process.cwd(), 'release/steam/win-unpacked');
const requiredFiles = [
  'Project_Solomon.exe',
  'steam_api64.dll',
  'resources/app.asar',
];

function walk(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    entries.push(fullPath);
    if (statSync(fullPath).isDirectory()) {
      entries.push(...walk(fullPath));
    }
  }
  return entries;
}

const missing = requiredFiles.filter((file) => !existsSync(join(releaseDir, file)));
const includesSteamAppId = existsSync(releaseDir)
  ? walk(releaseDir).some((file) => /steam_appid\.txt$/i.test(file))
  : false;

const ok = existsSync(releaseDir) && missing.length === 0 && !includesSteamAppId;

console.log(JSON.stringify({
  ok,
  releaseDir,
  missing,
  includesSteamAppId,
}, null, 2));

if (!ok) {
  process.exit(1);
}
