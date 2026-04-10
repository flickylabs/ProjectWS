const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const GENERATED_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const REFINED_MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const OUTPUT_PATH = path.join(ROOT, 'tmp', 'pc-evidence-missing-media-report-2026-04-10.json')

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

function main() {
  const manifest = readJson(REFINED_MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []
  const byRawType = {}
  const missing = []

  for (const caseKey of refined) {
    const filePath = path.join(GENERATED_DIR, `${caseKey}.json`)
    if (!fs.existsSync(filePath)) continue
    const runtimeCase = readJson(filePath)
    for (const node of runtimeCase.evidence || []) {
      if (hasMedia(node)) continue
      const rawType = String(node?.viewerData?.meta?.type || node?.type || 'unknown').toLowerCase()
      const viewerType = String(node?.viewerData?.meta?.viewerType || 'unknown').toLowerCase()
      byRawType[rawType] = (byRawType[rawType] || 0) + 1
      missing.push({
        caseId: caseKey,
        evidenceId: node.id,
        rawType,
        viewerType,
        name: node.surfaceName || node.name || node.id,
      })
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    refinedCaseCount: refined.length,
    missingMediaCount: missing.length,
    byRawType,
    items: missing,
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({ outputPath: OUTPUT_PATH, missingMediaCount: missing.length, byRawType }, null, 2))
}

main()
