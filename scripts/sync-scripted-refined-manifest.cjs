const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const SCRIPTED_DIR = path.join(ROOT, 'src', 'data', 'scriptedText')
const GENERATED_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const EXCLUDED_CASE_KEYS = new Set(['neighbor-new-10', 'civic-new-07'])

function main() {
  const scriptedSet = new Set(
    fs.readdirSync(SCRIPTED_DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.basename(file, '.json'))
      .filter((caseKey) => !EXCLUDED_CASE_KEYS.has(caseKey)),
  )

  const refined = fs.readdirSync(GENERATED_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.basename(file, '.json').replace(/^case-/, ''))
    .filter((caseKey) => scriptedSet.has(caseKey))
    .sort()

  const manifest = {
    refined,
    lastUpdated: new Date().toISOString().slice(0, 10),
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8')
  console.log(JSON.stringify({ count: refined.length, manifestPath: MANIFEST_PATH }, null, 2))
}

main()
