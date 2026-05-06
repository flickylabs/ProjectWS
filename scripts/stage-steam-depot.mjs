import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = process.cwd();
const appId = process.env.STEAM_APP_ID || '4709340';
const sourceDir = resolve(root, 'release/steam/win-unpacked');
const stageRoot = resolve(root, 'release/steam-depot');
const stageDir = join(stageRoot, 'windows');
const manifestPath = join(stageRoot, 'manifest.json');

function assertInside(parent, child) {
  const rel = relative(parent, child);
  if (rel.startsWith('..') || rel === '' || /^[a-zA-Z]:/.test(rel)) {
    throw new Error(`Refusing to operate outside ${parent}: ${child}`);
  }
}

function requireFile(path) {
  if (!existsSync(path)) {
    throw new Error(`Required release file is missing: ${path}`);
  }
}

if (!existsSync(sourceDir)) {
  throw new Error(`Release directory does not exist: ${sourceDir}`);
}

requireFile(join(sourceDir, 'Project_Solomon.exe'));
requireFile(join(sourceDir, 'steam_api64.dll'));
requireFile(join(sourceDir, 'resources/app.asar'));

mkdirSync(stageRoot, { recursive: true });
assertInside(stageRoot, stageDir);
rmSync(stageDir, { recursive: true, force: true });
cpSync(sourceDir, stageDir, { recursive: true });
rmSync(join(stageDir, 'steam_appid.txt'), { force: true });

writeFileSync(manifestPath, JSON.stringify({
  appId,
  depot: 'windows',
  sourceDir,
  stageDir,
  executable: 'Project_Solomon.exe',
  generatedAt: new Date().toISOString(),
}, null, 2), 'utf8');

console.log(JSON.stringify({
  ok: true,
  appId,
  stageDir,
  manifestPath,
}, null, 2));
