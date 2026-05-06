import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const pcIndex = resolve('dist-pc', 'index-pc.html')
const vercelIndex = resolve('dist-pc', 'index.html')

if (!existsSync(pcIndex)) {
  console.error(`[vercel:pc] Missing PC build entry: ${pcIndex}`)
  console.error('[vercel:pc] Run npm run build:pc before preparing the Vercel output.')
  process.exit(1)
}

copyFileSync(pcIndex, vercelIndex)
console.log(`[vercel:pc] Copied ${pcIndex} -> ${vercelIndex}`)
