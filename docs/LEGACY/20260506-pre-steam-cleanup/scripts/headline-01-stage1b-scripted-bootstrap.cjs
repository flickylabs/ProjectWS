#!/usr/bin/env node
const { spawnSync } = require('child_process')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const script = path.join(ROOT, 'tmp', 'generate-headline01-assets.cjs')
const result = spawnSync(process.execPath, [script], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, HEADLINE01_OUTPUT_MODE: 'scripted' },
})

if (result.status !== 0) process.exit(result.status ?? 1)
