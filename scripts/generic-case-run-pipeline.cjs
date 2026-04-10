#!/usr/bin/env node
const path = require('path')
const { runStagedPipeline } = require('./lib/run-staged-pipeline.cjs')
const { getPipelineStatusPath, getPipelineValidateLogPath } = require('./lib/pipeline-paths.cjs')

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

function parseBoolean(value, fallback = false) {
  if (value == null) return fallback
  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false
  return fallback
}

function parseCaseId(argv) {
  const argCase = argv.find((item) => item.startsWith('--case='))
  if (argCase) return argCase.slice('--case='.length)
  const idx = argv.indexOf('--case')
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return argv[0] || null
}

const ROOT = path.join(__dirname, '..')
const argv = process.argv.slice(2)
const caseId = parseCaseId(argv)
const mode = parseOption(argv, '--mode') || process.env.PIPELINE_SCRIPTED_MODE || 'auto'
const externalInputPath = parseOption(argv, '--external-input') || process.env.PIPELINE_EXTERNAL_INPUT || null
const validateOnly = hasFlag(argv, '--validate-only') || parseBoolean(process.env.PIPELINE_VALIDATE_ONLY, false)

if (!caseId) {
  console.error('missing caseId. usage: node scripts/generic-case-run-pipeline.cjs --case tenant-new-01 [--mode external_scripted_json] [--external-input src/data/scriptedText/external/tenant-new-01.json] [--validate-only]')
  process.exit(1)
}

if (externalInputPath && mode !== 'external_scripted_json') {
  console.error('--external-input requires --mode external_scripted_json')
  process.exit(1)
}

if (validateOnly && (mode !== 'auto' || externalInputPath)) {
  console.error('--validate-only does not support scripted mode overrides or external input')
  process.exit(1)
}

const STATUS_PATH = process.env.PIPELINE_STATUS_PATH || getPipelineStatusPath(ROOT, caseId)
const VALIDATE_LOG_PATH = process.env.PIPELINE_VALIDATE_LOG_PATH || getPipelineValidateLogPath(ROOT, caseId)

runStagedPipeline({
  root: ROOT,
  statusPath: STATUS_PATH,
  caseId,
  name: validateOnly ? `${caseId} staged validation` : `${caseId} staged scripted generation`,
  mode,
  externalInputPath,
  validateOnly,
  validateLogPath: VALIDATE_LOG_PATH,
  validationNote: validateOnly
    ? `${caseId} staged validation completed.`
    : `${caseId} staged pipeline completed.`,
  steps: [
    {
      id: 'stage1a',
      name: 'runtime_case_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1a-runtime.cjs'),
      scriptArgs: ['--case', caseId],
      outputPath: path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`),
    },
    {
      id: 'stage1b',
      name: 'runtime_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-runtime-template-coverage.cjs'),
      scriptArgs: ['--case', caseId],
      logPath: path.join(ROOT, 'tmp', `${caseId}-runtime-template-validate.txt`),
    },
    {
      id: 'stage1c',
      name: 'mediation_dialogues_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1e-mediation-dialogues.cjs'),
      scriptArgs: ['--case', caseId],
      outputPath: path.join(ROOT, 'src', 'data', 'dialogues', 'mediation', `${caseId}.json`),
    },
    {
      id: 'stage2',
      name: 'scripted_bootstrap_generate',
      script: path.join(ROOT, 'scripts', 'case-stage2-scripted-bootstrap.cjs'),
      scriptArgs: ['--case', caseId],
      outputPath: path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`),
    },
    {
      id: 'stage2b',
      name: 'scripted_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-template-coverage.cjs'),
      scriptArgs: ['--case', caseId],
      logPath: path.join(ROOT, 'tmp', `${caseId}-scripted-template-validate.txt`),
    },
    {
      id: 'stage2c',
      name: 'scripted_semantic_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-semantic-quality.cjs'),
      scriptArgs: ['--case', caseId],
      logPath: path.join(ROOT, 'tmp', `${caseId}-semantic-validate.txt`),
    },
    {
      id: 'stage3',
      name: 'scripted_validate',
      action: 'scripted_validate',
      caseId,
      logPath: VALIDATE_LOG_PATH,
    },
  ],
})
