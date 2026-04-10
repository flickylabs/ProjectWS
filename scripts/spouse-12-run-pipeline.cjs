#!/usr/bin/env node
const path = require('path')
const { runStagedPipeline } = require('./lib/run-staged-pipeline.cjs')
const { getPipelineStatusPath, getPipelineValidateLogPath } = require('./lib/pipeline-paths.cjs')

const ROOT = path.join(__dirname, '..')
const STATUS_PATH = process.env.PIPELINE_STATUS_PATH || getPipelineStatusPath(ROOT, 'spouse-12')
const VALIDATE_LOG_PATH = process.env.PIPELINE_VALIDATE_LOG_PATH || getPipelineValidateLogPath(ROOT, 'spouse-12')

runStagedPipeline({
  root: ROOT,
  statusPath: STATUS_PATH,
  caseId: 'spouse-12',
  name: 'spouse-12 staged scripted generation',
  validateLogPath: VALIDATE_LOG_PATH,
  validationNote: 'spouse-12 staged pipeline completed.',
  steps: [
    {
      id: 'stage1a',
      name: 'runtime_case_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1a-runtime.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      outputPath: path.join(ROOT, 'src', 'data', 'cases', 'generated', 'spouse-12.json'),
    },
    {
      id: 'stage1b',
      name: 'runtime_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-runtime-template-coverage.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      logPath: path.join(ROOT, 'tmp', 'spouse-12-runtime-template-validate.txt'),
    },
    {
      id: 'stage1c',
      name: 'mediation_dialogues_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1e-mediation-dialogues.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      outputPath: path.join(ROOT, 'src', 'data', 'dialogues', 'mediation', 'spouse-12.json'),
    },
    {
      id: 'stage2',
      name: 'scripted_bootstrap_generate',
      script: path.join(ROOT, 'scripts', 'case-stage2-scripted-bootstrap.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      outputPath: path.join(ROOT, 'src', 'data', 'scriptedText', 'spouse-12.json'),
    },
    {
      id: 'stage2b',
      name: 'scripted_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-template-coverage.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      logPath: path.join(ROOT, 'tmp', 'spouse-12-scripted-template-validate.txt'),
    },
    {
      id: 'stage2c',
      name: 'scripted_semantic_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-semantic-quality.cjs'),
      scriptArgs: ['--case', 'spouse-12'],
      logPath: path.join(ROOT, 'tmp', 'spouse-12-semantic-validate.txt'),
    },
    {
      id: 'stage3',
      name: 'scripted_validate',
      action: 'scripted_validate',
      caseId: 'spouse-12',
      logPath: VALIDATE_LOG_PATH,
    },
  ],
})
