#!/usr/bin/env node
const path = require('path')
const { compileScriptedBundle } = require('./compile-scripted-bundle.cjs')

function compileHeadlineScriptedBundle(root, caseId, outPath) {
  const result = compileScriptedBundle({
    root,
    caseId,
    outPath: outPath || path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`),
  })

  return {
    caseId,
    outPath: result.outPath,
    mode: 'compile_scripted_bundle_adapter',
  }
}

module.exports = {
  compile: ({ root, caseId, outPath }) => compileHeadlineScriptedBundle(root, caseId, outPath),
  compileHeadlineScriptedBundle,
}
