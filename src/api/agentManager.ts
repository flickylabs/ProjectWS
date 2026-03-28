/**
 * AI Agent Manager — 블록 조합 기반 프롬프트 관리
 *
 * 핵심 기능:
 * 1. 서버에서 에이전트 + 블록 로드/캐시
 * 2. 조건부 블록 필터링 (예: phase=Phase3 → phase3_guide만 포함)
 * 3. 블록 순서대로 조립 + 변수 치환 → 최종 프롬프트
 * 4. 에이전트별 LLM 설정 (temperature, maxTokens) 제공
 * 5. 서버 미연결 시 promptManager 폴백
 */

import { agentApi, type AgentConfig, type AgentBlockComposition, type PromptBlock } from './client'

// ── 캐시 ──
let agentCache: Record<string, AgentConfig> = {}
let blockCache: Record<string, PromptBlock> = {}
let loaded = false
let lastFetchTime = 0
let fetchPromise: Promise<void> | null = null
const CACHE_TTL = 60_000

/**
 * 서버에서 에이전트 + 블록 로드
 */
export async function loadAgents(force = false): Promise<void> {
  const now = Date.now()
  if (!force && loaded && now - lastFetchTime < CACHE_TTL) return
  if (fetchPromise) return fetchPromise

  fetchPromise = (async () => {
    try {
      const [agents, blocks] = await Promise.all([
        agentApi.getAll(),
        agentApi.getBlocks(),
      ])

      agentCache = {}
      for (const a of agents) {
        agentCache[a.key] = a
      }

      blockCache = {}
      for (const b of blocks) {
        blockCache[b.key] = b
      }

      loaded = true
      lastFetchTime = Date.now()
    } catch {
      console.warn('[AgentManager] Server unavailable, using cached data')
    } finally {
      fetchPromise = null
    }
  })()

  return fetchPromise
}

/**
 * 에이전트 로드 여부
 */
export function isAgentLoaded(): boolean {
  return loaded && Object.keys(agentCache).length > 0
}

/**
 * 에이전트의 LLM 설정 조회
 */
export function getAgentConfig(agentKey: string): { temperature: number; maxTokens: number } {
  const agent = agentCache[agentKey]
  return {
    temperature: agent?.temperature ?? 0.8,
    maxTokens: agent?.max_tokens ?? 300,
  }
}

/**
 * 에이전트의 context_flags 조회
 */
export function getContextFlags(agentKey: string): Record<string, unknown> {
  const agent = agentCache[agentKey]
  if (!agent) return {}
  try {
    const raw = (agent as unknown as { context_flags?: string }).context_flags
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

/**
 * 에이전트 프롬프트 조립
 *
 * @param agentKey - 에이전트 키 (e.g. 'interrogation')
 * @param variables - 변수 치환 맵 (e.g. { name: '한지석', age: '35' })
 * @param conditions - 조건부 블록 필터 (e.g. { phase: 'Phase3_Interrogation' })
 * @returns 최종 프롬프트 문자열
 */
export function buildAgentPrompt(
  agentKey: string,
  variables: Record<string, string> = {},
  conditions: Record<string, string> = {},
): string {
  const agent = agentCache[agentKey]
  if (!agent) {
    console.warn(`[AgentManager] Unknown agent: ${agentKey}`)
    return ''
  }

  // 1. 블록 목록에서 조건부 필터링
  const activeBlocks = agent.blocks.filter(comp => {
    if (!comp.condition_field) return true // 무조건 포함
    return conditions[comp.condition_field] === comp.condition_value
  })

  // 2. sort_order 순 정렬
  activeBlocks.sort((a, b) => a.sort_order - b.sort_order)

  // 3. 블록 content 조립
  const parts: string[] = []
  for (const comp of activeBlocks) {
    const block = blockCache[comp.block_key]
    if (block && block.is_active) {
      parts.push(block.content)
    }
  }

  // 4. 변수 치환
  let result = parts.join('\n\n')
  for (const [k, v] of Object.entries(variables)) {
    result = result.replaceAll(`{${k}}`, v)
  }

  return result
}

/**
 * 주기적 갱신 시작
 */
let pollTimer: ReturnType<typeof setInterval> | null = null

export function startAgentPolling(interval = 60_000): void {
  if (pollTimer) return
  pollTimer = setInterval(() => loadAgents(true), interval)
}

export function stopAgentPolling(): void {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}
