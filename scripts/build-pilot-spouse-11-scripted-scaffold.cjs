const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const sourcePath = path.join(root, 'docs', 'ref', 'scripted-text', 'full-scaffolds', 'spouse-11.json')
const outPath = path.join(root, 'src', 'data', 'scriptedText', 'spouse-11.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function main() {
  const scaffold = readJson(sourcePath)
  scaffold.generatedAt = new Date().toISOString()
  scaffold.notes = [
    'Pilot spouse-11 scaffold copied into runtime scriptedText path.',
    'This is a baseline only; interrogation, evidence_present, and dossier still require full rewrite.',
    'Use this file to establish validator baseline before replacing text with the new spouse-11 strategy.',
  ]
  writeJson(outPath, scaffold)
  process.stdout.write(`[build-pilot-spouse-11-scripted-scaffold] wrote ${path.relative(root, outPath)}\n`)
}

main()
