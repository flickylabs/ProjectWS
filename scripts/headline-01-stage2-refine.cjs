#!/usr/bin/env node
const { spawnSync } = require('child_process')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const scripts = [
  path.join(ROOT, 'tmp', 'refine-headline01-scripted-pass2.cjs'),
  path.join(ROOT, 'tmp', 'diversify-headline01-interrogation-pass3.cjs'),
  path.join(ROOT, 'tmp', 'diversify-headline01-evidence-pass4.cjs'),
]

for (const script of scripts) {
  const result = spawnSync(process.execPath, [script], {
    cwd: ROOT,
    stdio: 'inherit',
  })

  if (result.status !== 0) process.exit(result.status ?? 1)
}
