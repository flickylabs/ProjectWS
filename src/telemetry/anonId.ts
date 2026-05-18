const ANON_ID_KEY = 'solomon.telemetry.anonId'

function fallbackUuid(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'))
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`
}

export function createTelemetryUuid(): string {
  return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : fallbackUuid()
}

export function getOrCreateAnonId(): string {
  const cached = localStorage.getItem(ANON_ID_KEY)
  if (cached) return cached
  const newId = createTelemetryUuid()
  localStorage.setItem(ANON_ID_KEY, newId)
  return newId
}

export function peekAnonId(): string | null {
  try {
    return localStorage.getItem(ANON_ID_KEY)
  } catch {
    return null
  }
}
