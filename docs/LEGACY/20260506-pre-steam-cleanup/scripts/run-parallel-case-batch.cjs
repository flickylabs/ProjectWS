#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const ROOT = path.join(__dirname, '..')
const DEFAULT_CASES = ['headline-01', 'headline-02', 'spouse-11']
const DEFAULT_MANIFEST = path.join(ROOT, 'scripts', 'manifests', 'parallel-default.json')
const BATCH_STATUS_PATH = path.join(ROOT, 'tmp', 'pipeline-batch-status.json')
const GLOBAL_STATUS_PATH = path.join(ROOT, 'tmp', 'codex-progress-status.json')
const PIPELINE_STATUS_DIR = path.join(ROOT, 'tmp', 'pipeline-status')
const PIPELINE_LOG_DIR = path.join(ROOT, 'tmp', 'pipeline-runs')
const GENERIC_RUNNER = path.join(ROOT, 'scripts', 'generic-case-run-pipeline.cjs')

function parseOption(argv, name) {
  const inline = argv.find((item) => item.startsWith(`${name}=`))
  if (inline) return inline.slice(`${name}=`.length)
  const idx = argv.indexOf(name)
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return null
}

function hasFlag(argv, name) {
  return argv.includes(name)
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureParentDir(filePath)
  const payload = `${JSON.stringify(value, null, 2)}\n`
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`
  fs.writeFileSync(tmpPath, payload, 'utf8')
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      fs.renameSync(tmpPath, filePath)
      return
    } catch (error) {
      if (!['EPERM', 'EACCES', 'ENOENT'].includes(error?.code)) throw error
      try {
        fs.copyFileSync(tmpPath, filePath)
        fs.unlinkSync(tmpPath)
        return
      } catch (copyError) {
        if (error?.code === 'ENOENT' || copyError?.code === 'ENOENT') {
          fs.writeFileSync(filePath, payload, 'utf8')
          try {
            fs.unlinkSync(tmpPath)
          } catch {}
          return
        }
        if (attempt === 4) throw copyError
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20)
    }
  }
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').trim()
  return raw ? JSON.parse(raw) : { schemaVersion: 1 }
}

function uniq(values) {
  return [...new Set(values)]
}

function uniqCaseSpecs(caseSpecs) {
  const byCaseId = new Map()
  for (const spec of caseSpecs) {
    if (!byCaseId.has(spec.caseId)) byCaseId.set(spec.caseId, spec)
  }
  return [...byCaseId.values()]
}

function discoverRunnerCases() {
  return fs.readdirSync(path.join(ROOT, 'scripts'))
    .filter((name) => name.endsWith('-run-pipeline.cjs'))
    .map((name) => name.replace(/-run-pipeline\.cjs$/, ''))
    .sort()
}

function normalizeCaseSpec(item, defaults = {}) {
  if (typeof item === 'string') {
    const caseId = item.trim()
    if (!caseId) throw new Error('empty caseId in batch spec')
    return {
      caseId,
      mode: defaults.mode || 'auto',
      externalInputPath: defaults.externalInputPath || null,
      validateOnly: Boolean(defaults.validateOnly),
    }
  }

  if (!item || typeof item !== 'object') {
    throw new Error(`invalid case spec: ${JSON.stringify(item)}`)
  }

  const caseId = String(item.caseId || item.case || item.id || '').trim()
  if (!caseId) {
    throw new Error(`case spec missing caseId: ${JSON.stringify(item)}`)
  }

  const mode = item.mode || defaults.mode || 'auto'
  const externalInputPath = item.externalInput || item.externalInputPath || defaults.externalInputPath || null
  const validateOnly = item.validateOnly ?? defaults.validateOnly ?? false

  if (externalInputPath && mode !== 'external_scripted_json') {
    throw new Error(`externalInput requires mode=external_scripted_json for ${caseId}`)
  }
  if (validateOnly && (mode !== 'auto' || externalInputPath)) {
    throw new Error(`validateOnly does not support mode overrides or externalInput for ${caseId}`)
  }

  return {
    caseId,
    mode,
    externalInputPath,
    validateOnly: Boolean(validateOnly),
  }
}

function readManifestCases(manifestPath, cliDefaults = {}) {
  const raw = readJson(manifestPath)
  const manifestDefaults = {
    mode: raw?.mode || cliDefaults.mode || 'auto',
    externalInputPath: raw?.externalInput || raw?.externalInputPath || cliDefaults.externalInputPath || null,
    validateOnly: raw?.validateOnly ?? cliDefaults.validateOnly ?? false,
  }

  if (manifestDefaults.externalInputPath && manifestDefaults.mode !== 'external_scripted_json') {
    throw new Error(`externalInput requires mode=external_scripted_json in ${path.relative(ROOT, manifestPath).replace(/\\/g, '/')}`)
  }
  if (manifestDefaults.validateOnly && (manifestDefaults.mode !== 'auto' || manifestDefaults.externalInputPath)) {
    throw new Error(`validateOnly does not support mode overrides or externalInput in ${path.relative(ROOT, manifestPath).replace(/\\/g, '/')}`)
  }

  if (Array.isArray(raw)) {
    return uniqCaseSpecs(raw.map((item) => normalizeCaseSpec(item, manifestDefaults)))
  }
  if (Array.isArray(raw?.cases)) {
    const explicit = raw.cases.map((item) => normalizeCaseSpec(item, manifestDefaults))
    if (raw.autoDiscoverRunners) {
      return uniqCaseSpecs([
        ...explicit,
        ...discoverRunnerCases().map((caseId) => normalizeCaseSpec(caseId, manifestDefaults)),
      ])
    }
    return uniqCaseSpecs(explicit)
  }
  if (raw?.autoDiscoverRunners) {
    return uniqCaseSpecs(discoverRunnerCases().map((caseId) => normalizeCaseSpec(caseId, manifestDefaults)))
  }
  throw new Error(`invalid manifest format: ${path.relative(ROOT, manifestPath).replace(/\\/g, '/')}`)
}

function splitCaseArgs(values) {
  return values
    .flatMap((item) => String(item).split(','))
    .map((item) => item.trim())
    .filter((item) => !item.startsWith('--'))
    .filter(Boolean)
}

function parseCases(argv) {
  const defaults = {
    mode: parseOption(argv, '--mode') || 'auto',
    externalInputPath: parseOption(argv, '--external-input'),
    validateOnly: hasFlag(argv, '--validate-only'),
  }

  if (defaults.externalInputPath && defaults.mode !== 'external_scripted_json') {
    throw new Error('--external-input requires --mode external_scripted_json')
  }
  if (defaults.validateOnly && (defaults.mode !== 'auto' || defaults.externalInputPath)) {
    throw new Error('--validate-only does not support mode overrides or external input')
  }

  const argManifest = argv.find((item) => item.startsWith('--manifest='))
  if (argManifest) {
    const manifestPath = path.resolve(ROOT, argManifest.slice('--manifest='.length))
    return readManifestCases(manifestPath, defaults)
  }

  const manifestIdx = argv.indexOf('--manifest')
  if (manifestIdx >= 0 && argv[manifestIdx + 1]) {
    const manifestPath = path.resolve(ROOT, argv[manifestIdx + 1])
    return readManifestCases(manifestPath, defaults)
  }

  const argCaseList = argv.find((item) => item.startsWith('--cases='))
  if (argCaseList) {
    return splitCaseArgs([argCaseList.slice('--cases='.length)]).map((caseId) => normalizeCaseSpec(caseId, defaults))
  }

  const idx = argv.indexOf('--cases')
  if (idx >= 0) {
    const values = []
    for (let i = idx + 1; i < argv.length; i += 1) {
      const item = String(argv[i])
      if (item.startsWith('--')) break
      values.push(item)
    }
    return splitCaseArgs(values).map((caseId) => normalizeCaseSpec(caseId, defaults))
  }

  if (fs.existsSync(DEFAULT_MANIFEST)) {
    return readManifestCases(DEFAULT_MANIFEST, defaults)
  }

  return DEFAULT_CASES.map((caseId) => normalizeCaseSpec(caseId, defaults))
}

function getRunnerPath(caseId) {
  const runnerPath = path.join(ROOT, 'scripts', `${caseId}-run-pipeline.cjs`)
  if (fs.existsSync(runnerPath)) {
    return {
      runnerPath,
      runnerArgs: [],
    }
  }
  if (fs.existsSync(GENERIC_RUNNER)) {
    return {
      runnerPath: GENERIC_RUNNER,
      runnerArgs: ['--case', caseId],
    }
  }
  throw new Error(`missing run-pipeline script for ${caseId}: ${path.relative(ROOT, runnerPath).replace(/\\/g, '/')}`)
}

function readValidationSummary(logPath) {
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

function buildCaseRun(spec) {
  const { runnerPath, runnerArgs } = getRunnerPath(spec.caseId)
  return {
    caseId: spec.caseId,
    mode: spec.mode,
    externalInputPath: spec.externalInputPath,
    validateOnly: spec.validateOnly,
    runnerPath,
    runnerArgs,
    statusPath: path.join(PIPELINE_STATUS_DIR, `${spec.caseId}.json`),
    outputLogPath: path.join(PIPELINE_LOG_DIR, `${spec.caseId}.log`),
    validateLogPath: path.join(ROOT, 'tmp', `${spec.caseId}-stage3-validate.txt`),
    pid: null,
    exitCode: null,
    state: 'pending',
  }
}

function buildAggregate(caseRuns) {
  const cases = caseRuns.map((item) => {
    const entry = {
      caseId: item.caseId,
      state: item.state,
      pid: item.pid,
      exitCode: item.exitCode,
      mode: item.mode,
      ...(item.externalInputPath ? { inputPath: item.externalInputPath.replace(/\\/g, '/') } : {}),
      ...(item.validateOnly ? { validateOnly: true } : {}),
      statusPath: path.relative(ROOT, item.statusPath).replace(/\\/g, '/'),
      outputLogPath: path.relative(ROOT, item.outputLogPath).replace(/\\/g, '/'),
      validateLogPath: path.relative(ROOT, item.validateLogPath).replace(/\\/g, '/'),
    }

    if (fs.existsSync(item.statusPath)) {
      try {
        const status = readJson(item.statusPath)
        entry.workstream = status.activeWorkstream || null
        entry.lastKnownValidation = status.lastKnownValidation || null
      } catch (error) {
        entry.statusReadError = error instanceof Error ? error.message : String(error)
      }
    }

    if (!entry.lastKnownValidation) {
      const summary = readValidationSummary(item.validateLogPath)
      if (summary !== null) {
        entry.lastKnownValidation = {
          caseId: item.caseId,
          logPath: path.relative(ROOT, item.validateLogPath).replace(/\\/g, '/'),
          summary,
        }
      }
    }

    return entry
  })

  return {
    schemaVersion: 1,
    owner: 'Codex',
    workspace: ROOT,
    batch: {
      name: 'parallel staged generation batch',
      status: cases.every((item) => item.state === 'completed')
        ? 'completed'
        : cases.some((item) => item.state === 'failed')
          ? 'failed'
          : 'running',
      cases,
    },
    updatedAt: new Date().toISOString(),
  }
}

function writeAggregate(caseRuns) {
  const aggregate = buildAggregate(caseRuns)
  writeJson(BATCH_STATUS_PATH, aggregate)
  writeJson(GLOBAL_STATUS_PATH, {
    schemaVersion: 1,
    owner: 'Codex',
    workspace: ROOT,
    ctGuidePath: 'docs/ref/scripted-text/ct-progress-monitoring.md',
    activeWorkstream: {
      name: 'parallel staged generation batch',
      type: 'batch',
      status: aggregate.batch.status,
      cases: aggregate.batch.cases,
    },
    operatorNotes: [
      'Per-case pipeline status files live under tmp/pipeline-status/*.json.',
      'Per-case stdout/stderr logs live under tmp/pipeline-runs/*.log.',
      'headline-02 is the idol stalking / sasaeng pipeline and is part of this batch.',
      'If UI looks stuck, inspect tmp/pipeline-batch-status.json first.',
    ],
    updatedAt: aggregate.updatedAt,
  })
}

async function run() {
  const caseIds = parseCases(process.argv.slice(2))
  const caseRuns = caseIds.map(buildCaseRun)

  fs.mkdirSync(PIPELINE_STATUS_DIR, { recursive: true })
  fs.mkdirSync(PIPELINE_LOG_DIR, { recursive: true })
  writeAggregate(caseRuns)

  const refreshTimer = setInterval(() => writeAggregate(caseRuns), 1000)

  const childRuns = caseRuns.map((item) => new Promise((resolve) => {
    const logStream = fs.createWriteStream(item.outputLogPath, { flags: 'w' })
    const childEnv = {
      ...process.env,
      PIPELINE_STATUS_PATH: item.statusPath,
      PIPELINE_VALIDATE_LOG_PATH: item.validateLogPath,
      PIPELINE_SCRIPTED_MODE: item.mode || 'auto',
    }
    if (item.externalInputPath) childEnv.PIPELINE_EXTERNAL_INPUT = item.externalInputPath
    if (item.validateOnly) childEnv.PIPELINE_VALIDATE_ONLY = '1'

    const child = spawn(process.execPath, [item.runnerPath, ...(item.runnerArgs || [])], {
      cwd: ROOT,
      env: childEnv,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    item.pid = child.pid || null
    item.state = 'running'
    writeAggregate(caseRuns)

    child.stdout.on('data', (chunk) => logStream.write(chunk))
    child.stderr.on('data', (chunk) => logStream.write(chunk))

    let settled = false

    child.on('error', (error) => {
      if (settled) return
      settled = true
      item.exitCode = 1
      item.state = 'failed'
      logStream.write(`${error instanceof Error ? error.stack : String(error)}\n`)
      logStream.end()
      writeAggregate(caseRuns)
      resolve()
    })

    child.on('close', (code) => {
      if (settled) return
      settled = true
      item.exitCode = code ?? 1
      item.state = item.exitCode === 0 ? 'completed' : 'failed'
      logStream.end()
      writeAggregate(caseRuns)
      resolve()
    })
  }))

  await Promise.all(childRuns)
  clearInterval(refreshTimer)
  writeAggregate(caseRuns)

  const failed = caseRuns.filter((item) => item.exitCode !== 0)
  if (failed.length > 0) {
    console.error(`[parallel-batch] failed cases: ${failed.map((item) => item.caseId).join(', ')}`)
    process.exit(1)
  }

  console.log(`[parallel-batch] completed: ${caseRuns.map((item) => item.caseId).join(', ')}`)
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error))
  process.exit(1)
})
