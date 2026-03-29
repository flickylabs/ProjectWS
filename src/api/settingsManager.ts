/**
 * 동적 설정 매니저.
 * 서버 settings API에서 밸런스 상수를 로드하여 런타임에 적용.
 * 로드 실패 시 constants.ts의 하드코딩 값을 폴백으로 사용.
 */
import type { Resources } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL as string) || '/api'

// ── 캐시 ──
let settings: Record<string, string> = {}
let loaded = false

export async function loadSettings(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/stats/settings`)
    if (res.ok) {
      settings = await res.json()
      loaded = true
    }
  } catch {
    console.warn('[Settings] Server unavailable, using defaults')
  }
}

function get(key: string, fallback: string): string {
  return settings[key] ?? fallback
}

function getNum(key: string, fallback: number): number {
  const val = settings[key]
  return val != null ? Number(val) : fallback
}

function getBool(key: string, fallback: boolean): boolean {
  const val = settings[key]
  if (val === 'true') return true
  if (val === 'false') return false
  return fallback
}

function getJSON<T>(key: string, fallback: T): T {
  const val = settings[key]
  if (!val) return fallback
  try { return JSON.parse(val) as T } catch { return fallback }
}

// ── 초기 리소스 ──
export function getInitialResources(): Resources {
  return {
    investigationTokens: getNum('balance.initial.investigationTokens', 6),
    skillPoints: getNum('balance.initial.skillPoints', 5),
    courtControl: getNum('balance.initial.courtControl', 3),
  }
}

// ── 스킬 비용 ──
export function getSkillCost(skillKey: string): { resource: keyof Resources; amount: number } | null {
  return getJSON(`balance.cost.${skillKey}`, null)
}

// ── 스킬 제한 ──
export function getSkillLimit(skillKey: string): number {
  return getNum(`balance.limit.${skillKey}`, Infinity)
}

// ── 글로벌 리소스 ──
export function getGlobalConfig() {
  return {
    freeCap: getNum('balance.global.freeCap', 10),
    paidCap: getNum('balance.global.paidCap', 99),
    rechargeIntervalMs: getNum('balance.global.rechargeIntervalMs', 3600000),
    maxAdInvest: getNum('balance.global.maxAdInvest', 5),
    maxAdSkill: getNum('balance.global.maxAdSkill', 2),
    adRewardAmount: getNum('balance.global.adRewardAmount', 1),
  }
}

// ── 신뢰/감정 ──
export function getTrustDeltas() {
  return {
    empathyQuestion: getNum('balance.trust.empathyQuestion', 12),
    confidentialProtection: getNum('balance.trust.confidentialProtection', 20),
    separationRetaliation: getNum('balance.trust.separationRetaliation', -10),
    excessivePressure: getNum('balance.trust.excessivePressure', -15),
  }
}

export function getTrustThresholds() {
  return {
    voluntaryConfession: getNum('balance.trust.voluntaryConfession', 70),
    confidentialAcceptance: getNum('balance.trust.confidentialAcceptance', 50),
    preDisclosureConsent: getNum('balance.trust.preDisclosureConsent', 60),
  }
}

// ── Phase 최소 턴 ──
export function getMinTurns(phase: string): number {
  const map: Record<string, string> = {
    phase3: 'balance.phase.minTurnsPhase3',
    Phase3_Interrogation: 'balance.phase.minTurnsPhase3',
    phase4: 'balance.phase.minTurnsPhase4',
    Phase4_Evidence: 'balance.phase.minTurnsPhase4',
    phase5: 'balance.phase.minTurnsPhase5',
    Phase5_ReExamination: 'balance.phase.minTurnsPhase5',
  }
  const defaults: Record<string, number> = { phase3: 3, phase4: 1, phase5: 2 }
  const key = map[phase]
  return key ? getNum(key, defaults[phase] ?? 1) : 1
}

// ── 점수 기준 ──
export function getScoreThreshold(key: string): number {
  return getNum(`balance.score.${key}`, 85)
}

// ── 기능 플래그 ──
export function isFeatureEnabled(feature: string): boolean {
  return getBool(`feature.${feature}`, true)
}

export function isMaintenanceMode(): boolean {
  return getBool('feature.maintenanceMode', false)
}

export function isSettingsLoaded(): boolean {
  return loaded
}
