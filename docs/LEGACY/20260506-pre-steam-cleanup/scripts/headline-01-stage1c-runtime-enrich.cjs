#!/usr/bin/env node
const { spawnSync } = require('child_process')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const script = path.join(ROOT, 'tmp', 'enrich-headline01-runtime-evidence-viewer.cjs')
const result = spawnSync(process.execPath, [script], {
  cwd: ROOT,
  stdio: 'inherit',
})

if (result.status !== 0) process.exit(result.status ?? 1)
