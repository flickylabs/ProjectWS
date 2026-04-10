#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const RENEWAL_REF_DIR = '\uB9AC\uB274\uC5BC\uCC38\uACE0'

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function toPascalCase(value) {
  return String(value)
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function getHeadlineSpecDir(root, caseId) {
  return path.join(root, 'src', 'data', 'headlineSpecs', caseId)
}

function getHeadlinePaths(root, caseId) {
  return {
    specDir: getHeadlineSpecDir(root, caseId),
    runtimeOutPath: path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`),
    scriptedOutPath: path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`),
    v3JsonOutPath: path.join(root, 'docs', 'ref', RENEWAL_REF_DIR, `${caseId}-v3-game-loop-data.json`),
    v3TsOutPath: path.join(root, 'docs', 'ref', RENEWAL_REF_DIR, `${caseId}-v3-game-loop-data.ts`),
  }
}

function loadHeadlineSpec(root, caseId) {
  const specPath = path.join(getHeadlineSpecDir(root, caseId), 'index.cjs')
  if (!fs.existsSync(specPath)) {
    throw new Error(`missing headline spec index: ${path.relative(root, specPath).replace(/\\/g, '/')}`)
  }

  delete require.cache[require.resolve(specPath)]
  const spec = require(specPath)
  if (!spec || typeof spec !== 'object') {
    throw new Error(`invalid headline spec export: ${path.relative(root, specPath).replace(/\\/g, '/')}`)
  }
  if (spec.caseId !== caseId) {
    throw new Error(`headline spec caseId mismatch: expected "${caseId}", got "${spec.caseId}"`)
  }
  if (!spec.runtimeCase || !spec.v3) {
    throw new Error(`headline spec missing runtimeCase or v3: ${path.relative(root, specPath).replace(/\\/g, '/')}`)
  }
  return spec
}

function compileHeadlineRuntime(root, caseId) {
  const spec = loadHeadlineSpec(root, caseId)
  const paths = getHeadlinePaths(root, caseId)
  writeJson(paths.runtimeOutPath, spec.runtimeCase)
  return {
    caseId,
    outPath: paths.runtimeOutPath,
    runtimeCase: spec.runtimeCase,
  }
}

function compileHeadlineV3(root, caseId) {
  const spec = loadHeadlineSpec(root, caseId)
  const paths = getHeadlinePaths(root, caseId)
  const exportName = `${toPascalCase(caseId)}V3GameLoopData`

  writeJson(paths.v3JsonOutPath, spec.v3)
  ensureParentDir(paths.v3TsOutPath)
  fs.writeFileSync(
    paths.v3TsOutPath,
    `export const ${exportName} = ${JSON.stringify(spec.v3, null, 2)} as const\n`,
    'utf8',
  )

  return {
    caseId,
    jsonOutPath: paths.v3JsonOutPath,
    tsOutPath: paths.v3TsOutPath,
    v3: spec.v3,
  }
}

module.exports = {
  writeJson,
  getHeadlineSpecDir,
  getHeadlinePaths,
  loadHeadlineSpec,
  compileHeadlineRuntime,
  compileHeadlineV3,
}
