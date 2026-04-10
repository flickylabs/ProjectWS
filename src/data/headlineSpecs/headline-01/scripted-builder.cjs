const path = require('path')
const { spawnSync } = require('child_process')

function run(root, scriptName) {
  const scriptPath = path.join(root, 'scripts', scriptName)
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    stdio: 'inherit',
  })
  const exitCode = result.status ?? 1
  if (exitCode !== 0) {
    throw new Error(`${scriptName} exited with status ${exitCode}`)
  }
}

function compile({ root, outPath }) {
  run(root, 'headline-01-stage1b-scripted-bootstrap.cjs')
  run(root, 'headline-01-stage2-refine.cjs')
  return { outPath }
}

module.exports = {
  compile,
}
