import { getCurrentLocale } from '../i18n'
import { createTelemetryUuid, getOrCreateAnonId, peekAnonId } from './anonId'
import type { TelemetryEvent, TelemetryEventName, TelemetryEventPayloadMap, TelemetryClientPlatform } from './eventTypes'

export const TELEMETRY_QUEUE_KEY = 'solomon.telemetry.queue'
export const TELEMETRY_OPT_OUT_KEY = 'solomon.telemetry.optOut'
export const TELEMETRY_CONSENT_KEY = 'solomon.telemetry.consent.v1'

const FLUSH_INTERVAL_MS = 5000
const FLUSH_BATCH_SIZE = 30
const MAX_SEND_BATCH_SIZE = 100
const MAX_QUEUE_SIZE = 500
const MAX_RETRY_COUNT = 3

let anonId: string | null = null
let sessionId: string | null = null
let initialized = false
let flushTimer: number | null = null
let flushing = false
let queue: TelemetryEvent[] = []

function readQueue(): TelemetryEvent[] {
  try {
    const raw = localStorage.getItem(TELEMETRY_QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(-MAX_QUEUE_SIZE) : []
  } catch {
    return []
  }
}

function persistQueue(): void {
  try {
    if (queue.length === 0) {
      localStorage.removeItem(TELEMETRY_QUEUE_KEY)
      return
    }
    localStorage.setItem(TELEMETRY_QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE_SIZE)))
  } catch {
    // Telemetry must never affect game flow.
  }
}

function clearQueue(): void {
  queue = []
  try {
    localStorage.removeItem(TELEMETRY_QUEUE_KEY)
  } catch {
    // Telemetry must never affect game flow.
  }
}

function isDevAutoDisabled(): boolean {
  return import.meta.env.DEV && import.meta.env.VITE_TELEMETRY_FORCE_ON !== 'true'
}

export function isTelemetryOptedOut(): boolean {
  try {
    return localStorage.getItem(TELEMETRY_OPT_OUT_KEY) === 'true'
  } catch {
    return true
  }
}

export function isTelemetryRuntimeEnabled(): boolean {
  return !isDevAutoDisabled() && !isTelemetryOptedOut()
}

export function hasTelemetryConsentDecision(): boolean {
  try {
    return localStorage.getItem(TELEMETRY_CONSENT_KEY) === 'accepted'
  } catch {
    return true
  }
}

export function setTelemetryConsentDecision(): void {
  try {
    localStorage.setItem(TELEMETRY_CONSENT_KEY, 'accepted')
  } catch {
    // Telemetry consent UI should not block play if storage is unavailable.
  }
}

function getTelemetryUrl(): string {
  const baseUrl = ((import.meta.env.VITE_API_URL as string | undefined) || '/api').replace(/\/+$/, '')
  return `${baseUrl}/telemetry/events`
}

function getClientPlatform(): TelemetryClientPlatform {
  const hasSteamBridge = typeof window !== 'undefined' && Boolean(window.steam)
  if (hasSteamBridge) return import.meta.env.DEV ? 'electron-dev' : 'electron-steam'
  return import.meta.env.DEV ? 'web-dev' : 'web-vercel'
}

function getClientBuild(): string {
  return [
    (import.meta.env.VITE_APP_VERSION as string | undefined) || '0.0.0',
    import.meta.env.MODE || 'unknown',
  ].join(':')
}

function ensureInitialized(): void {
  if (initialized) return
  initialized = true
  sessionId = createTelemetryUuid()
  queue = readQueue()

  if (!isTelemetryRuntimeEnabled()) {
    if (isTelemetryOptedOut()) clearQueue()
    return
  }

  anonId = getOrCreateAnonId()
  scheduleFlush()
  window.addEventListener('pagehide', flushWithBeacon)
  window.addEventListener('beforeunload', flushWithBeacon)
}

function scheduleFlush(): void {
  if (flushTimer != null || !isTelemetryRuntimeEnabled()) return
  flushTimer = window.setTimeout(() => {
    flushTimer = null
    void flushNow()
  }, FLUSH_INTERVAL_MS)
}

async function postEvents(events: TelemetryEvent[]): Promise<boolean> {
  for (let attempt = 0; attempt < MAX_RETRY_COUNT; attempt += 1) {
    try {
      const res = await fetch(getTelemetryUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
        keepalive: events.length <= 30,
      })
      if (res.ok) return true
    } catch {
      // Retry below.
    }

    if (attempt < MAX_RETRY_COUNT - 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 250 * (2 ** attempt)))
    }
  }
  return false
}

function flushWithBeacon(): void {
  if (!isTelemetryRuntimeEnabled() || queue.length === 0 || typeof navigator === 'undefined') return
  const batch = queue.slice(0, MAX_SEND_BATCH_SIZE)
  const body = JSON.stringify({ events: batch })
  const blob = new Blob([body], { type: 'application/json' })
  const sent = typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(getTelemetryUrl(), blob)
  if (!sent) return
  queue = queue.slice(batch.length)
  persistQueue()
}

export function initTelemetry(): void {
  try {
    ensureInitialized()
  } catch {
    // Telemetry must never affect game flow.
  }
}

export function trackEvent<N extends TelemetryEventName>(
  name: N,
  payload: TelemetryEventPayloadMap[N],
  caseId?: string | null,
): void {
  try {
    ensureInitialized()
    if (!isTelemetryRuntimeEnabled()) return
    const activeAnonId = anonId ?? getOrCreateAnonId()
    const activeSessionId = sessionId ?? createTelemetryUuid()
    anonId = activeAnonId
    sessionId = activeSessionId

    queue.push({
      event_id: createTelemetryUuid(),
      anon_id: activeAnonId,
      session_id: activeSessionId,
      event_name: name,
      event_payload: payload,
      case_id: caseId ?? null,
      client_ts: new Date().toISOString(),
      client_build: getClientBuild(),
      client_platform: getClientPlatform(),
      client_locale: getCurrentLocale(),
    } as TelemetryEvent<N>)
    queue = queue.slice(-MAX_QUEUE_SIZE)
    persistQueue()

    if (queue.length >= FLUSH_BATCH_SIZE) {
      void flushNow()
    } else {
      scheduleFlush()
    }
  } catch {
    // Telemetry must never affect game flow.
  }
}

export async function flushNow(): Promise<void> {
  if (flushing || !isTelemetryRuntimeEnabled()) return
  if (queue.length === 0) return

  flushing = true
  try {
    while (queue.length > 0 && isTelemetryRuntimeEnabled()) {
      const batch = queue.splice(0, MAX_SEND_BATCH_SIZE)
      persistQueue()
      const ok = await postEvents(batch)
      if (!ok) {
        queue = [...batch, ...queue].slice(-MAX_QUEUE_SIZE)
        persistQueue()
        break
      }
    }
  } catch {
    persistQueue()
  } finally {
    flushing = false
    if (queue.length > 0) scheduleFlush()
  }
}

export function setOptOut(optOut: boolean): void {
  try {
    if (optOut) {
      localStorage.setItem(TELEMETRY_OPT_OUT_KEY, 'true')
      clearQueue()
    } else {
      localStorage.removeItem(TELEMETRY_OPT_OUT_KEY)
      if (initialized && !anonId && !isDevAutoDisabled()) {
        anonId = getOrCreateAnonId()
      }
      if (initialized && isTelemetryRuntimeEnabled()) scheduleFlush()
    }
  } catch {
    // Telemetry must never affect game flow.
  }
}

export function getAnonId(): string {
  try {
    return peekAnonId() ?? getOrCreateAnonId()
  } catch {
    return ''
  }
}
