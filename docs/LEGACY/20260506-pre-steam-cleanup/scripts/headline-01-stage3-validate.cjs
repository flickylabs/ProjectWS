#!/usr/bin/env node
const path = require('path')
const { runScriptedValidate } = require('./lib/run-scripted-validate.cjs')

const ROOT = path.join(__dirname, '..')

const exitCode = runScriptedValidate({
  root: ROOT,
  caseId: 'headline-01',
  logPath: path.join(ROOT, 'tmp', 'headline-01-stage3-validate.txt'),
})

process.exit(exitCode)
