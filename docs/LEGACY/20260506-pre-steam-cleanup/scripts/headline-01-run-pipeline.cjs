#!/usr/bin/env node
const path = require('path')
const { runStagedPipeline } = require('./lib/run-staged-pipeline.cjs')
const { getPipelineStatusPath, getPipelineValidateLogPath } = require('./lib/pipeline-paths.cjs')

const ROOT = path.join(__dirname, '..')
const STATUS_PATH = process.env.PIPELINE_STATUS_PATH || getPipelineStatusPath(ROOT, 'headline-01')
const VALIDATE_LOG_PATH = process.env.PIPELINE_VALIDATE_LOG_PATH || getPipelineValidateLogPath(ROOT, 'headline-01')

runStagedPipeline({
  root: ROOT,
  statusPath: STATUS_PATH,
  caseId: 'headline-01',
  name: 'headline-01 staged generation',
  validateLogPath: VALIDATE_LOG_PATH,
  validationNote: 'headline-01 staged pipeline completed.',
  steps: [
    {
      id: 'stage1a',
      name: 'runtime_case_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1a-runtime.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      outputPath: path.join(ROOT, 'src', 'data', 'cases', 'generated', 'headline-01.json'),
    },
    {
      id: 'stage1b',
      name: 'v3_structure_generate',
      script: path.join(ROOT, 'scripts', 'headline-stage1b-v3.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      outputPath: path.join(ROOT, 'docs', 'ref', '\uB9AC\uB274\uC5BC\uCC38\uACE0', 'headline-01-v3-game-loop-data.json'),
    },
    {
      id: 'stage1c',
      name: 'runtime_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-runtime-template-coverage.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      logPath: path.join(ROOT, 'tmp', 'headline-01-runtime-template-validate.txt'),
    },
    {
      id: 'stage1d',
      name: 'phase_dialogues_generate',
      script: path.join(ROOT, 'scripts', 'headline-stage1c-phase-dialogues.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      outputPath: path.join(ROOT, 'src', 'data', 'dialogues', 'phase2', 'headline-01.json'),
    },
    {
      id: 'stage1e',
      name: 'mediation_dialogues_generate',
      script: path.join(ROOT, 'scripts', 'case-stage1e-mediation-dialogues.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      outputPath: path.join(ROOT, 'src', 'data', 'dialogues', 'mediation', 'headline-01.json'),
    },
    {
      id: 'stage2',
      name: 'scripted_bootstrap_generate',
      script: path.join(ROOT, 'scripts', 'case-stage2-scripted-bootstrap.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      outputPath: path.join(ROOT, 'src', 'data', 'scriptedText', 'headline-01.json'),
    },
    {
      id: 'stage2b',
      name: 'scripted_template_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-template-coverage.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      logPath: path.join(ROOT, 'tmp', 'headline-01-scripted-template-validate.txt'),
    },
    {
      id: 'stage2c',
      name: 'scripted_semantic_validate',
      script: path.join(ROOT, 'scripts', 'validate-scripted-semantic-quality.cjs'),
      scriptArgs: ['--case', 'headline-01'],
      logPath: path.join(ROOT, 'tmp', 'headline-01-semantic-validate.txt'),
    },
    {
      id: 'stage3',
      name: 'scripted_validate',
      action: 'scripted_validate',
      caseId: 'headline-01',
      logPath: VALIDATE_LOG_PATH,
    },
  ],
})
