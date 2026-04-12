const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const targetPath = path.join(ROOT, 'src', 'data', 'scriptedText', 'spouse-01.json')
const inputFiles = process.argv.slice(2)

if (inputFiles.length === 0) {
  console.error('usage: node tmp/apply-spouse01-interrogation-map.cjs <map-file> [map-file...]')
  process.exit(1)
}

const bundle = JSON.parse(fs.readFileSync(targetPath, 'utf8'))
const entries = bundle.channels?.interrogation?.entries

if (!Array.isArray(entries)) {
  console.error('interrogation entries not found')
  process.exit(1)
}

const replacements = {}
for (const file of inputFiles) {
  const abs = path.resolve(ROOT, file)
  Object.assign(replacements, require(abs))
}

let updated = 0
for (const entry of entries) {
  for (const variant of entry.variants || []) {
    if (!Object.prototype.hasOwnProperty.call(replacements, variant.id)) continue
    variant.text = replacements[variant.id]
    updated += 1
  }
}

fs.writeFileSync(targetPath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
console.log(`updated ${updated} interrogation variants`)
