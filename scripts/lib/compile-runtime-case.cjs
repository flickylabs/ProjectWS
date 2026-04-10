#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { compileHeadlineRuntime } = require('./headline-spec-compiler.cjs')
const { compileThreadECase, hasThreadECase } = require('./thread-e-case-compiler.cjs')
const { enrichRuntimeFile } = require('./runtime-gameplay-enricher.cjs')
const { validateRuntimeTemplateCoverage } = require('../validate-runtime-template-coverage.cjs')

function hasHeadlineSpec(root, caseId) {
  return fs.existsSync(path.join(root, 'src', 'data', 'headlineSpecs', caseId, 'index.cjs'))
}

function hasGeneratedRuntime(root, caseId) {
  return fs.existsSync(path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`))
}

function runNodeScript(scriptPath, root) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    stdio: 'inherit',
  })
  const exitCode = result.status ?? 1
  if (exitCode !== 0) {
    throw new Error(`${path.relative(root, scriptPath).replace(/\\/g, '/')} exited with status ${exitCode}`)
  }
}

function compileRuntimeCase({ root, caseId }) {
  let result
  if (hasHeadlineSpec(root, caseId)) {
    result = compileHeadlineRuntime(root, caseId)
  } else if (hasThreadECase(root, caseId)) {
    result = compileThreadECase(root, caseId)
  } else {
    const pilotRuntimeScript = path.join(root, 'scripts', `build-pilot-${caseId}-runtime.cjs`)
    if (fs.existsSync(pilotRuntimeScript)) {
      runNodeScript(pilotRuntimeScript, root)
    } else if (!hasGeneratedRuntime(root, caseId)) {
      throw new Error(`no runtime builder found for ${caseId}`)
    }
    result = {
      caseId,
      outPath: path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`),
    }
  }

  result.runtimeCase = enrichRuntimeFile(result.outPath)
  const issues = validateRuntimeTemplateCoverage(caseId, result.runtimeCase)
  const hasFail = issues.some((issue) => issue.severity === 'FAIL')
  if (hasFail) {
    const firstMessage = issues.find((issue) => issue.severity === 'FAIL')?.message || 'unknown runtime template coverage error'
    throw new Error(`[runtime-template-coverage] ${caseId} failed: ${firstMessage}`)
  }
  return result
}

module.exports = {
  compileRuntimeCase,
}
