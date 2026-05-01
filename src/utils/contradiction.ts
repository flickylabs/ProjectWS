import type { DialogueEntry } from '../types'

type ContradictionMeta = NonNullable<DialogueEntry['contradictionMeta']>

function hasMeaningfulText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeContradictionClaim(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/["'`]/g, '')
    .replace(/[.,!?~:;()[\]{}<>\-\s]/g, '')
}

function tokenizeContradictionClaim(value: string): string[] {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/["'`]/g, '')
    .replace(/[.,!?~:;()[\]{}<>\-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function hasNearDuplicateTokenOverlap(previousClaim: string, currentClaim: string): boolean {
  const previousTokens = new Set(tokenizeContradictionClaim(previousClaim))
  const currentTokens = new Set(tokenizeContradictionClaim(currentClaim))
  const smallerSize = Math.min(previousTokens.size, currentTokens.size)

  if (smallerSize < 4) return false

  let shared = 0
  for (const token of previousTokens) {
    if (currentTokens.has(token)) shared += 1
  }

  return shared / smallerSize >= 0.85
}

function hasDistinctClaims(previousClaim: string, currentClaim: string): boolean {
  const previous = normalizeContradictionClaim(previousClaim)
  const current = normalizeContradictionClaim(currentClaim)

  if (previous.length < 6 || current.length < 6) return false
  if (previous === current) return false

  const [shorter, longer] = previous.length <= current.length
    ? [previous, current]
    : [current, previous]

  if (shorter.length >= 12 && longer.includes(shorter)) return false
  if (hasNearDuplicateTokenOverlap(previousClaim, currentClaim)) return false

  return true
}

export function hasContradictionComparison(meta: DialogueEntry['contradictionMeta']): meta is ContradictionMeta {
  return Boolean(
    meta &&
    hasMeaningfulText(meta.previousClaim) &&
    hasMeaningfulText(meta.currentClaim) &&
    hasMeaningfulText(meta.reason) &&
    hasDistinctClaims(meta.previousClaim, meta.currentClaim),
  )
}
