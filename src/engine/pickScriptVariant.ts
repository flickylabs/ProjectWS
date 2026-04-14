// Phase 3 interrogation variant picker for scriptedTextLoader
export type VariantId = 'v1' | 'v2' | 'v3' | 'v4' | 'v5'

export interface VariantHistoryItem {
  baseKey: string
  variantId: VariantId
  turn: number
}

export interface PickVariantArgs {
  baseKey: string
  available: VariantId[]
  history: VariantHistoryItem[]
  currentTurn: number
  archetype?: string
  emotion?: string
  rng?: () => number
}

const ARCHETYPE_PREFERENCES: Record<string, VariantId[]> = {
  avoidant: ['v2', 'v5', 'v4', 'v1', 'v3'],
  confrontational: ['v3', 'v1', 'v4', 'v2', 'v5'],
}

const EMOTION_WEIGHTS: Record<string, Partial<Record<VariantId, number>>> = {
  calm: { v2: 1.15, v4: 1.1 },
  angry: { v3: 2.0, v1: 1.5 },
  cornered: { v5: 2.0, v4: 1.35 },
  ashamed: { v5: 1.9, v2: 1.25 },
  anxious: { v2: 1.35, v5: 1.5, v3: 0.8 },
  resigned: { v1: 1.4, v5: 1.6 },
}

const PREFERENCE_WEIGHTS = [1.6, 1.4, 1.2, 1.0, 0.85] as const
const RECENCY_BLOCK = 3

export function pickScriptVariant({
  baseKey,
  available,
  history,
  currentTurn,
  archetype,
  emotion,
  rng = Math.random,
}: PickVariantArgs): VariantId {
  if (!available.length) {
    throw new Error('pickScriptVariant requires at least one available variant')
  }

  const scopedHistory = history
    .filter((item) => item.baseKey === baseKey)
    .sort((a, b) => b.turn - a.turn)

  const lastVariant = scopedHistory[0]?.variantId
  const recentBlocked = new Set<VariantId>(
    scopedHistory
      .filter((item) => currentTurn - item.turn <= RECENCY_BLOCK)
      .map((item) => item.variantId),
  )

  let pool = available.filter((variantId) => !recentBlocked.has(variantId))

  // If everything is blocked by recency, relax the 3-turn rule first.
  if (!pool.length) {
    pool = [...available]
  }

  // Keep immediate-repeat protection whenever possible.
  if (lastVariant) {
    const noImmediateRepeat = pool.filter((variantId) => variantId !== lastVariant)
    if (noImmediateRepeat.length) {
      pool = noImmediateRepeat
    }
  }

  const weights = new Map<VariantId, number>()
  for (const variantId of pool) {
    weights.set(variantId, 1)
  }

  const preferenceOrder = archetype ? ARCHETYPE_PREFERENCES[archetype] : undefined
  if (preferenceOrder) {
    preferenceOrder.forEach((variantId, idx) => {
      if (weights.has(variantId)) {
        weights.set(variantId, (weights.get(variantId) ?? 1) * PREFERENCE_WEIGHTS[idx])
      }
    })
  }

  const emotionWeightMap = emotion ? EMOTION_WEIGHTS[emotion] : undefined
  if (emotionWeightMap) {
    for (const [variantId, multiplier] of Object.entries(emotionWeightMap) as Array<[VariantId, number]>) {
      if (weights.has(variantId)) {
        weights.set(variantId, (weights.get(variantId) ?? 1) * multiplier)
      }
    }
  }

  return weightedPick(pool, weights, rng)
}

export function makeVariantKey(baseKey: string, variantId: VariantId): string {
  return `${baseKey}:${variantId}`
}

function weightedPick(
  pool: VariantId[],
  weights: Map<VariantId, number>,
  rng: () => number,
): VariantId {
  const total = pool.reduce((sum, variantId) => sum + (weights.get(variantId) ?? 1), 0)
  let roll = rng() * total

  for (const variantId of pool) {
    roll -= weights.get(variantId) ?? 1
    if (roll <= 0) return variantId
  }

  return pool[pool.length - 1]
}
