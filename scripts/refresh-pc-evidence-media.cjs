const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const GENERATED_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const REFINED_MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const REPORT_PATH = path.join(ROOT, 'tmp', 'pc-evidence-media-report-2026-04-10.json')

const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function hasMedia(node) {
  const media = node?.viewerData?.media
  if (!media || typeof media !== 'object') return false
  if (media.imageUrl || media.thumbnailUrl || media.posterUrl) return true
  if (Array.isArray(media.frameImages) && media.frameImages.length > 0) return true
  if (Array.isArray(media.screenshotImages) && media.screenshotImages.length > 0) return true
  return false
}

function accumulate(report, runtimeCase, refinedSet, caseKey) {
  const isRefined = refinedSet.has(caseKey)

  report.generatedCases += 1
  if (isRefined) report.refinedCases += 1
  for (const node of runtimeCase.evidence || []) {
    report.generatedEvidence += 1
    if (isRefined) report.refinedEvidence += 1
    if (hasMedia(node)) {
      report.generatedEvidenceWithMedia += 1
      if (isRefined) report.refinedEvidenceWithMedia += 1
      const rawType = String(node?.viewerData?.meta?.type || node?.type || 'unknown').toLowerCase()
      report.rawMediaTypes[rawType] = (report.rawMediaTypes[rawType] || 0) + 1
    }
  }
}

function main() {
  const manifest = readJson(REFINED_MANIFEST_PATH)
  const refinedSet = new Set(Array.isArray(manifest.refined) ? manifest.refined : [])
  const files = fs.readdirSync(GENERATED_DIR).filter((file) => file.endsWith('.json')).sort()

  const report = {
    generatedCases: 0,
    generatedEvidence: 0,
    generatedEvidenceWithMedia: 0,
    refinedCases: 0,
    refinedEvidence: 0,
    refinedEvidenceWithMedia: 0,
    rawMediaTypes: {},
  }

  for (const file of files) {
    const filePath = path.join(GENERATED_DIR, file)
    const runtimeCase = enrichRuntimeFile(filePath)
    const caseKey = path.basename(file, '.json').replace(/^case-/, '')
    accumulate(report, runtimeCase, refinedSet, caseKey)
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({ reportPath: REPORT_PATH, ...report }, null, 2))
}

main()
