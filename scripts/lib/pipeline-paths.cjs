const path = require('path')

function getPipelineStatusPath(root, caseId) {
  return path.join(root, 'tmp', 'pipeline-status', `${caseId}.json`)
}

function getPipelineValidateLogPath(root, caseId) {
  return path.join(root, 'tmp', `${caseId}-stage3-validate.txt`)
}

module.exports = {
  getPipelineStatusPath,
  getPipelineValidateLogPath,
}
