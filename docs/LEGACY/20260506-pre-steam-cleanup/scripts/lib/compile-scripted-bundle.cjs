#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { compilePilotScriptedBundle } = require('./build-pilot-scripted-bundle.cjs')
const { enrichScriptedBundle } = require('./scripted-metadata-enricher.cjs')
const { normalizeScriptedBundle } = require('./scripted-semantic-normalizer.cjs')
const { applyReleaseReadyScriptedHotfix } = require('./release-ready-scripted-hotfix.cjs')
const { findFileRecursiveByName } = require('./scripted-korean-utils.cjs')
const { validateScriptedTemplateCoverage } = require('../validate-scripted-template-coverage.cjs')
const { validateScriptedSemanticQuality } = require('../validate-scripted-semantic-quality.cjs')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function summarize(issues) {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1
    return acc
  }, {})
}

function getOutPath(root, caseId, outPath) {
  return outPath || path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
}

function getOverrideBuilderPath(root, caseId) {
  const candidates = [
    path.join(root, 'src', 'data', 'headlineSpecs', caseId, 'scripted-builder.cjs'),
  ]
  return candidates.find((candidate) => fs.existsSync(candidate)) || null
}

function getLegacyStagePath(root, caseId) {
  const candidate = path.join(root, 'scripts', `${caseId}-stage2-scripted-bootstrap.cjs`)
  return fs.existsSync(candidate) ? candidate : null
}

function getDefaultExternalScriptedPath(root, caseId) {
  return path.join(root, 'src', 'data', 'scriptedText', 'external', `${caseId}.json`)
}

function resolveMaybeRelativePath(root, filePath) {
  if (!filePath) return null
  return path.isAbsolute(filePath) ? filePath : path.join(root, filePath)
}

function resolveExplicitExternalScriptedPath(root, caseId, externalInputPath) {
  const resolvedPath = resolveMaybeRelativePath(root, externalInputPath)
  if (!resolvedPath) return null

  let candidate = resolvedPath
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    candidate = path.join(candidate, `${caseId}.json`)
  }

  if (!fs.existsSync(candidate)) {
    throw new Error(`external scripted JSON not found: ${path.relative(root, candidate).replace(/\\/g, '/')}`)
  }

  return candidate
}

function resolveExternalScriptedPath(root, caseId, mode, externalInputPath) {
  if (externalInputPath && mode !== 'external_scripted_json') {
    throw new Error('external scripted JSON input requires mode=external_scripted_json')
  }

  const resolvedExplicitPath = resolveExplicitExternalScriptedPath(root, caseId, externalInputPath)
  if (resolvedExplicitPath) return resolvedExplicitPath

  const defaultPath = getDefaultExternalScriptedPath(root, caseId)
  if (mode === 'external_scripted_json') {
    if (!fs.existsSync(defaultPath)) {
      throw new Error(`external scripted JSON not found: ${path.relative(root, defaultPath).replace(/\\/g, '/')}`)
    }
    return defaultPath
  }

  return null
}

function hasGenericInputs(root, caseId) {
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const v3Path = findFileRecursiveByName(path.join(root, 'docs', 'ref'), `${caseId}-v3-game-loop-data.json`)
  return fs.existsSync(runtimePath) && Boolean(v3Path)
}

function runLegacyStage(root, scriptPath) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    env: {
      ...process.env,
      CODEX_COMPILE_SCRIPTED_LEGACY: '1',
    },
    stdio: 'inherit',
  })
  const exitCode = result.status ?? 1
  if (exitCode !== 0) {
    throw new Error(`${path.relative(root, scriptPath).replace(/\\/g, '/')} exited with status ${exitCode}`)
  }
}

function runOverrideBuilder(root, builderPath, caseId, outPath) {
  delete require.cache[require.resolve(builderPath)]
  const builder = require(builderPath)
  if (typeof builder?.compile !== 'function') {
    throw new Error(`scripted override builder missing compile(): ${path.relative(root, builderPath).replace(/\\/g, '/')}`)
  }
  return builder.compile({ root, caseId, outPath }) || { outPath }
}

function useExternalScriptedJson(root, caseId, inputPath, outPath) {
  const bundle = readJson(inputPath)
  if (bundle.caseId && bundle.caseId !== caseId) {
    throw new Error(`external scripted JSON caseId mismatch: expected ${caseId}, received ${bundle.caseId}`)
  }
  writeJson(outPath, bundle)
}

function assertTemplateCoverage(root, caseId, outPath) {
  const bundle = readJson(outPath)
  const runtimeCase = readJson(path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`))
  const issues = validateScriptedTemplateCoverage(bundle, runtimeCase)
  const summary = summarize(issues)
  if (summary.FAIL) {
    const firstMessage = issues.find((issue) => issue.severity === 'FAIL')?.message || 'unknown scripted template coverage error'
    throw new Error(`[scripted-template-coverage] ${caseId} failed: ${firstMessage}`)
  }
}

function assertSemanticQuality(root, caseId, outPath) {
  const bundle = readJson(outPath)
  const runtimeCase = readJson(path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`))
  const issues = validateScriptedSemanticQuality({ bundle, runtimeCase })
  const summary = summarize(issues)
  if (summary.FAIL) {
    const firstMessage = issues.find((issue) => issue.severity === 'FAIL')?.message || 'unknown scripted semantic quality error'
    throw new Error(`[scripted-semantic-quality] ${caseId} failed: ${firstMessage}`)
  }
}

function applySemanticNormalization(root, caseId, outPath, mode) {
  const bundle = readJson(outPath)
  const runtimeCase = readJson(path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`))
  normalizeScriptedBundle({ bundle, runtimeCase, mode })
  applyReleaseReadyScriptedHotfix({ bundle, runtimeCase })
  fs.writeFileSync(outPath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
}

function compileScriptedBundle({ root, caseId, outPath, mode = 'auto', externalInputPath }) {
  if (!['auto', 'external_scripted_json'].includes(mode)) {
    throw new Error(`unsupported scripted compile mode: ${mode}`)
  }

  const resolvedOutPath = getOutPath(root, caseId, outPath)
  const overrideBuilderPath = getOverrideBuilderPath(root, caseId)
  const legacyStagePath = getLegacyStagePath(root, caseId)
  const externalScriptedPath = resolveExternalScriptedPath(root, caseId, mode, externalInputPath)
  const insideLegacyBridge = process.env.CODEX_COMPILE_SCRIPTED_LEGACY === '1'
  let resolvedMode = 'generic_builder'

  if (mode === 'external_scripted_json') {
    useExternalScriptedJson(root, caseId, externalScriptedPath, resolvedOutPath)
    resolvedMode = 'external_scripted_json'
  } else if (overrideBuilderPath) {
    runOverrideBuilder(root, overrideBuilderPath, caseId, resolvedOutPath)
    resolvedMode = 'override_builder'
  } else if (hasGenericInputs(root, caseId)) {
    compilePilotScriptedBundle({
      root,
      caseId,
      outPath: resolvedOutPath,
    })
  } else if (legacyStagePath && !insideLegacyBridge) {
    runLegacyStage(root, legacyStagePath)
    resolvedMode = 'legacy_stage2'
  } else {
    throw new Error(`no scripted builder inputs found for ${caseId}`)
  }

  if (resolvedMode !== 'external_scripted_json') {
    enrichScriptedBundle({ root, caseId, outPath: resolvedOutPath })
    applySemanticNormalization(root, caseId, resolvedOutPath, resolvedMode)
  }
  assertTemplateCoverage(root, caseId, resolvedOutPath)
  assertSemanticQuality(root, caseId, resolvedOutPath)

  return {
    caseId,
    outPath: resolvedOutPath,
    mode: resolvedMode,
    ...(externalScriptedPath ? { inputPath: externalScriptedPath } : {}),
  }
}

module.exports = {
  compileScriptedBundle,
}
