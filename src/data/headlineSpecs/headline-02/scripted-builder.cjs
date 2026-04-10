const path = require('path')
const { spawnSync } = require('child_process')

function compile({ root, outPath }) {
  const scriptPath = path.join(root, 'scripts', 'headline-02-stage2-scripted-bootstrap.cjs')
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    stdio: 'inherit',
  })
  const exitCode = result.status ?? 1
  if (exitCode !== 0) {
    throw new Error(`headline-02-stage2-scripted-bootstrap.cjs exited with status ${exitCode}`)
  }
  return { outPath }
}

module.exports = {
  compile,
}
