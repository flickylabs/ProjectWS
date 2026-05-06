#!/usr/bin/env node
const path = require('path')
const { runStagedPipeline } = require('./lib/run-staged-pipeline.cjs')
const { getPipelineStatusPath, getPipelineValidateLogPath } = require('./lib/pipeline-paths.cjs')

const ROOT = path.join(__dirname, '..')
const STATUS_PATH = process.env.PIPELINE_STATUS_PATH || getPipelineStatusPath(ROOT, 'family-09')
const VALIDATE_LOG_PATH = process.env.PIPELINE_VALIDATE_LOG_PATH || getPipelineValidateLogPath(ROOT, 'family-09')

runStagedPipeline({
  root: ROOT,
  statusPath: STATUS_PATH,
  caseId: 'family-09',
  name: 'family-09 staged scripted generation',
  validateLogPath: VALIDATE_LOG_PATH,
  validationNote: 'family-09 staged pipeline completed.',
  steps: [
    {
      id: 'stage1a',
      name: 'runtime_case_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1a-runtime.cjs'),
      scriptArgs: ['--case', 'family-09'],
      outputPath: path.join(ROOT, 'src', 'data', 'cases', 'generated', 'family-09.json'),
    },
    {
      id: 'stage1b',
      name: 'runtime_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-runtime-template-coverage.cjs'),
      scriptArgs: ['--case', 'family-09'],
      logPath: path.join(ROOT, 'tmp', 'family-09-runtime-template-validate.txt'),
    },
    {
      id: 'stage1c',
      name: 'mediation_dialogues_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1e-mediation-dialogues.cjs'),
      scriptArgs: ['--case', 'family-09'],
      outputPath: path.join(ROOT, 'src', 'data', 'dialogues', 'mediation', 'family-09.json'),
    },
    {
      id: 'stage2',
      name: 'scripted_bootstrap_generate',
      script: path.join(ROOT, 'scripts', 'case-stage2-scripted-bootstrap.cjs'),
      scriptArgs: ['--case', 'family-09'],
      outputPath: path.join(ROOT, 'src', 'data', 'scriptedText', 'family-09.json'),
    },
    {
      id: 'stage2b',
      name: 'scripted_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-template-coverage.cjs'),
      scriptArgs: ['--case', 'family-09'],
      logPath: path.join(ROOT, 'tmp', 'family-09-scripted-template-validate.txt'),
    },
    {
      id: 'stage2c',
      name: 'scripted_semantic_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-semantic-quality.cjs'),
      scriptArgs: ['--case', 'family-09'],
      logPath: path.join(ROOT, 'tmp', 'family-09-semantic-validate.txt'),
    },
    {
      id: 'stage3',
      name: 'scripted_validate',
      action: 'scripted_validate',
      caseId: 'family-09',
      logPath: VALIDATE_LOG_PATH,
    },
  ],
})
