#!/usr/bin/env node
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function runScriptedValidate({ root, caseId, logPath }) {
  const result = spawnSync(process.execPath, ['tests/validate-scripted-text.cjs', '--case', caseId], {
    cwd: root,
    encoding: 'utf8',
  })

  fs.mkdirSync(path.dirname(logPath), { recursive: true })
  fs.writeFileSync(logPath, `${result.stdout || ''}${result.stderr || ''}`, 'utf8')
  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)
  process.stdout.write(`[${caseId}] wrote ${path.relative(root, logPath)}\n`)

  return result.status ?? 1
}

module.exports = { runScriptedValidate }
