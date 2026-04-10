#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { runScriptedValidate } = require('./run-scripted-validate.cjs')

const SUPPORTED_SCRIPTED_MODES = new Set(['auto', 'external_scripted_json'])

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').trim()
  return raw ? JSON.parse(raw) : { schemaVersion: 1 }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  const tmpPath = `${filePath}.tmp`
  fs.writeFileSync(tmpPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      fs.renameSync(tmpPath, filePath)
      return
    } catch (error) {
      if (error?.code !== 'EPERM' && error?.code !== 'EACCES') throw error
      try {
        fs.copyFileSync(tmpPath, filePath)
        fs.unlinkSync(tmpPath)
        return
      } catch (copyError) {
        if (attempt === 4) throw copyError
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20)
    }
  }
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function parseValidationSummary(logPath) {
  if (!fs.existsSync(logPath)) return null
  const log = fs.readFileSync(logPath, 'utf8')
  const match = log.match(/summary=(\{.*?\})/)
  if (!match) return null
  try {
    return JSON.parse(match[1])
  } catch {
    return null
  }
}

function parseBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value
  if (value == null) return fallback

  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false
  return fallback
}

function displayPath(root, filePath) {
  if (!filePath) return null
  if (!path.isAbsolute(filePath)) return String(filePath).replace(/\\/g, '/')

  const relative = path.relative(root, filePath)
  if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    return relative.replace(/\\/g, '/')
  }

  return filePath.replace(/\\/g, '/')
}

function resolvePipelineOptions(config) {
  const scriptedMode = config.mode || process.env.PIPELINE_SCRIPTED_MODE || 'auto'
  if (!SUPPORTED_SCRIPTED_MODES.has(scriptedMode)) {
    throw new Error(`unsupported scripted pipeline mode: ${scriptedMode}`)
  }

  const externalInputPath = config.externalInputPath || process.env.PIPELINE_EXTERNAL_INPUT || null
  if (externalInputPath && scriptedMode !== 'external_scripted_json') {
    throw new Error('external scripted input requires mode=external_scripted_json')
  }

  const validateOnly = config.validateOnly ?? parseBoolean(process.env.PIPELINE_VALIDATE_ONLY, false)
  if (validateOnly && (scriptedMode !== 'auto' || externalInputPath)) {
    throw new Error('validate-only does not support scripted mode overrides or external input')
  }
  return {
    scriptedMode,
    externalInputPath,
    validateOnly,
  }
}

function isValidationStep(step) {
  return step.action === 'scripted_validate' || /validate/i.test(step.name || '')
}

function withPipelineOptions(step, options) {
  const nextStep = {
    ...step,
    ...(Array.isArray(step.scriptArgs) ? { scriptArgs: [...step.scriptArgs] } : {}),
  }

  const isStage2Script = nextStep.script && path.basename(nextStep.script) === 'case-stage2-scripted-bootstrap.cjs'
  if (isStage2Script) {
    nextStep.mode = options.scriptedMode
    if (options.externalInputPath) nextStep.inputPath = options.externalInputPath

    if (options.scriptedMode !== 'auto') {
      nextStep.scriptArgs = [...(nextStep.scriptArgs || []), '--mode', options.scriptedMode]
    }
    if (options.externalInputPath) {
      nextStep.scriptArgs = [...(nextStep.scriptArgs || []), '--external-input', options.externalInputPath]
    }
  }

  return nextStep
}

function prepareSteps(config, options) {
  const baseSteps = options.validateOnly
    ? config.steps.filter((step) => isValidationStep(step))
    : config.steps

  if (options.validateOnly && baseSteps.length === 0) {
    throw new Error(`no validation steps found for ${config.caseId}`)
  }

  return baseSteps.map((step) => withPipelineOptions(step, options))
}

function buildWorkstream(config, root, options, steps) {
  return {
    name: config.name,
    caseId: config.caseId,
    status: 'running',
    currentStep: steps[0]?.id || 'completed',
    mode: options.scriptedMode,
    ...(options.externalInputPath ? { inputPath: displayPath(root, options.externalInputPath) } : {}),
    ...(options.validateOnly ? { validateOnly: true } : {}),
    steps: steps.map((step) => ({
      id: step.id,
      name: step.name,
      status: 'pending',
      ...(step.script ? { script: path.relative(root, step.script).replace(/\\/g, '/') } : {}),
      ...(step.scriptArgs ? { scriptArgs: step.scriptArgs } : {}),
      ...(step.action ? { action: step.action } : {}),
      ...(step.outputPath ? { outputPath: path.relative(root, step.outputPath).replace(/\\/g, '/') } : {}),
      ...(step.logPath ? { logPath: path.relative(root, step.logPath).replace(/\\/g, '/') } : {}),
      ...(step.mode ? { mode: step.mode } : {}),
      ...(step.inputPath ? { inputPath: displayPath(root, step.inputPath) } : {}),
    })),
  }
}

function executeStep(step, config) {
  if (step.action === 'scripted_validate') {
    return runScriptedValidate({
      root: config.root,
      caseId: step.caseId || config.caseId,
      logPath: step.logPath,
    })
  }

  if (!step.script || !fs.existsSync(step.script)) {
    throw new Error(`missing step script: ${step.script || '(none)'}`)
  }

  const options = step.logPath
    ? {
        cwd: config.root,
        encoding: 'utf8',
      }
    : {
        cwd: config.root,
        stdio: 'inherit',
      }

  const result = spawnSync(process.execPath, [step.script, ...(step.scriptArgs || [])], options)

  if (step.logPath) {
    ensureParentDir(step.logPath)
    fs.writeFileSync(step.logPath, `${result.stdout || ''}${result.stderr || ''}`, 'utf8')
    if (result.stdout) process.stdout.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
  }

  return result.status ?? 1
}

function setStepStatus(workstream, stepId, status) {
  for (const step of workstream.steps || []) {
    if (step.id === stepId) step.status = status
  }
}

function updateStatus(statusPath, mutator) {
  const status = fs.existsSync(statusPath) ? readJson(statusPath) : { schemaVersion: 1 }
  mutator(status)
  status.updatedAt = new Date().toISOString()
  writeJson(statusPath, status)
  return status
}

function runStagedPipeline(config) {
  const root = config.root
  const statusPath = config.statusPath
  const validateLogPath = config.validateLogPath
  const options = resolvePipelineOptions(config)
  const steps = prepareSteps(config, options)

  updateStatus(statusPath, (status) => {
    status.owner = status.owner || 'Codex'
    status.workspace = status.workspace || root
    status.activeWorkstream = buildWorkstream(config, root, options, steps)
    delete status.activeWorkstream.blockingIssues
  })

  for (const step of steps) {
    updateStatus(statusPath, (status) => {
      status.activeWorkstream.status = 'running'
      status.activeWorkstream.currentStep = step.id
      delete status.activeWorkstream.blockingIssues
      setStepStatus(status.activeWorkstream, step.id, 'running')
    })

    let exitCode = 0
    try {
      exitCode = executeStep(step, config)
    } catch (error) {
      exitCode = 1
      updateStatus(statusPath, (status) => {
        status.activeWorkstream.status = 'blocked'
        status.activeWorkstream.currentStep = step.id
        setStepStatus(status.activeWorkstream, step.id, 'failed')
        status.activeWorkstream.blockingIssues = [
          error instanceof Error ? error.message : String(error),
        ]
      })
      process.exit(exitCode)
    }

    if (exitCode !== 0) {
      updateStatus(statusPath, (status) => {
        status.activeWorkstream.status = 'blocked'
        status.activeWorkstream.currentStep = step.id
        setStepStatus(status.activeWorkstream, step.id, 'failed')
        status.activeWorkstream.blockingIssues = [
          step.script
            ? `${path.relative(root, step.script).replace(/\\/g, '/')} exited with status ${exitCode}`
            : `${step.action || 'step'} exited with status ${exitCode}`,
        ]
      })
      process.exit(exitCode)
    }

    updateStatus(statusPath, (status) => {
      setStepStatus(status.activeWorkstream, step.id, 'completed')
    })
  }

  updateStatus(statusPath, (status) => {
    status.activeWorkstream.status = 'completed'
    status.activeWorkstream.currentStep = 'completed'
    delete status.activeWorkstream.blockingIssues

    const summary = validateLogPath ? parseValidationSummary(validateLogPath) : null
    if (summary !== null) {
      status.lastKnownValidation = {
        caseId: config.caseId,
        logPath: path.relative(root, validateLogPath).replace(/\\/g, '/'),
        summary,
        note: config.validationNote || 'Updated by staged pipeline.',
      }
    }
  })
}

module.exports = { runStagedPipeline }
