const API_BASE = (import.meta.env.VITE_API_URL as string) || '/api'
const STORAGE_KEY = 'solomon-steam-session'
const SESSION_REFRESH_MARGIN_MS = 60_000
const AUTH_TIMEOUT_MS = 8_000

export interface SteamAuthSession {
  token: string
  steamId: string
  ownerSteamId?: string | null
  personaName: string | null
  mock: boolean
  vacBanned?: boolean
  publisherBanned?: boolean
  expiresAt: string
}

interface SteamAuthResponse {
  ok: boolean
  token: string
  session: Omit<SteamAuthSession, 'token'>
}

let cachedSession: SteamAuthSession | null = null
let authPromise: Promise<SteamAuthSession> | null = null

function isSessionFresh(session: SteamAuthSession | null): session is SteamAuthSession {
  if (!session?.token || !session.expiresAt) return false
  return Date.parse(session.expiresAt) - Date.now() > SESSION_REFRESH_MARGIN_MS
}

function readStoredSession(): SteamAuthSession | null {
  if (cachedSession) return cachedSession
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    cachedSession = raw ? JSON.parse(raw) as SteamAuthSession : null
  } catch {
    cachedSession = null
  }
  return cachedSession
}

function storeSession(session: SteamAuthSession): void {
  cachedSession = session
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Session storage can be unavailable in restricted browser contexts.
  }
}

function textToHex(value: string): string {
  const bytes = new TextEncoder().encode(value)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function browserMockSteam(): SteamBridge {
  const mockSteamId = localStorage.getItem('solomon-mock-steam-id') || '76561198000000000'
  return {
    isAvailable: async () => false,
    getSteamId: async () => mockSteamId,
    getPersonaName: async () => 'Steam Mock Player',
    getAuthTicketForWebApi: async (identity?: string) => textToHex(JSON.stringify({
      kind: 'browser-mock-steam-web-api-ticket',
      steamId: mockSteamId,
      identity: identity || null,
      nonce: crypto.randomUUID(),
      issuedAt: new Date().toISOString(),
    })),
    cloud: {
      readTextFile: async () => ({ ok: false, reason: 'Steam Cloud is unavailable in browser mock mode' }),
      writeTextFile: async () => ({ ok: false, reason: 'Steam Cloud is unavailable in browser mock mode' }),
      listFiles: async () => ({ ok: false, reason: 'Steam Cloud is unavailable in browser mock mode', files: [] }),
    },
    achievements: {
      unlock: async () => ({ ok: false, reason: 'Steam achievements are unavailable in browser mock mode' }),
      get: async () => ({ ok: false, reason: 'Steam achievements are unavailable in browser mock mode', achieved: false }),
      list: async () => ({ ok: false, reason: 'Steam achievements are unavailable in browser mock mode', achievements: [] }),
    },
    stats: {
      get: async () => ({ ok: false, reason: 'Steam stats are unavailable in browser mock mode', value: undefined }),
      set: async () => ({ ok: false, reason: 'Steam stats are unavailable in browser mock mode' }),
      store: async () => ({ ok: false, reason: 'Steam stats are unavailable in browser mock mode' }),
    },
  }
}

function steamBridge(): SteamBridge {
  return window.steam ?? browserMockSteam()
}

function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

function withTimeout(): AbortSignal {
  return AbortSignal.timeout(AUTH_TIMEOUT_MS)
}

async function requestSteamSession(): Promise<SteamAuthSession> {
  const bridge = steamBridge()
  const [steamAvailable, steamId, personaName] = await Promise.all([
    bridge.isAvailable().catch(() => false),
    bridge.getSteamId().catch(() => '76561198000000000'),
    bridge.getPersonaName().catch(() => 'Steam Player'),
  ])

  const ticketHex = await bridge.getAuthTicketForWebApi()
  const res = await fetch(apiUrl('/auth/steam'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: withTimeout(),
    body: JSON.stringify({
      ticketHex,
      steamId,
      personaName,
      source: steamAvailable ? 'steamworks' : 'mock',
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Steam authentication failed: ${res.status} ${text}`)
  }

  const data = await res.json() as SteamAuthResponse
  if (!data.ok || !data.token) {
    throw new Error('Steam authentication response did not include a session token.')
  }

  const session = { ...data.session, token: data.token }
  storeSession(session)
  return session
}

export async function ensureSteamAuthSession(force = false): Promise<SteamAuthSession> {
  const current = readStoredSession()
  if (!force && isSessionFresh(current)) return current
  if (authPromise) return authPromise

  authPromise = requestSteamSession().finally(() => {
    authPromise = null
  })

  return authPromise
}

export function getSteamAuthSession(): SteamAuthSession | null {
  const session = readStoredSession()
  return isSessionFresh(session) ? session : null
}

export function clearSteamAuthSession(): void {
  cachedSession = null
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof URL) return input.toString()
  return input.url
}

function isAuthApiRequest(url: string): boolean {
  return url.includes('/api/auth/') || url.includes('/auth/steam')
}

function shouldAttachSteamSession(input: RequestInfo | URL): boolean {
  const url = requestUrl(input)
  if (isAuthApiRequest(url)) return false
  return url.startsWith('/api') || url.startsWith(API_BASE) || url.includes('/api/')
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)

  if (shouldAttachSteamSession(input)) {
    const session = await ensureSteamAuthSession()
    headers.set('Authorization', `Bearer ${session.token}`)
  }

  return fetch(input, {
    ...init,
    headers,
  })
}
