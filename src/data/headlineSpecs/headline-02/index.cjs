const runtimeCase = require('./runtime.json')
const v3 = require('./v3.json')
const scripted = require('./scripted-config.cjs')

module.exports = {
  caseId: 'headline-02',
  runtimeCase,
  v3,
  ...scripted,
}
