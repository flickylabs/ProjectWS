import { authFetch } from '../api/steamAuth'

/**
 * LLM API 클라이언트.
 * 프로덕션에서는 서버 프록시를 통해 OpenAI를 호출하고,
 * 로컬 개발에서는 LM Studio를 사용한다.
 */

/** 대화/심문/증언 등 NPC 대사 생성용 — 품질 우선 */
export const MODEL_DIALOGUE = 'gpt-4o'
/** 분류/분석/요약 등 내부 처리용 — 비용 우선 */
export const MODEL_ANALYSIS = 'gpt-4o-mini'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionResponse {
  choices: { message: { content: string } }[]
}

interface LLMConfig {
  provider: 'openai' | 'local'
  baseUrl: string
  modelId: string
}

function getRuntimeEnv(name: string): string | undefined {
  const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env?.[name]
  if (typeof viteEnv === 'string' && viteEnv) return viteEnv
  if (typeof process !== 'undefined') return process.env?.[name]
  return undefined
}

function getConfig(): LLMConfig {
  const providerOverride = getRuntimeEnv('VITE_LLM_PROVIDER')?.toLowerCase()
  const useLocal = providerOverride === 'local'

  if (!useLocal) {
    return {
      provider: 'openai',
      baseUrl: '/api/llm',
      modelId: MODEL_DIALOGUE,
    }
  }

  return {
    provider: 'local',
    baseUrl: 'http://localhost:1234/v1',
    modelId: 'local-model',
  }
}

let cachedLocalModelId: string | null = null

async function resolveModelId(config: LLMConfig): Promise<string> {
  if (config.provider === 'openai') return config.modelId

  if (cachedLocalModelId) return cachedLocalModelId
  try {
    const res = await fetch(`${config.baseUrl}/models`)
    const data = await res.json()
    if (data.data?.length > 0) {
      cachedLocalModelId = data.data[0].id as string
      return cachedLocalModelId!
    }
  } catch { /* ignore */ }
  return config.modelId
}

export async function chatCompletion(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number; model?: string; endpoint?: 'dialogue' | 'aftermath' } = {},
): Promise<string> {
  const config = getConfig()
  if (config.provider === 'local') {
    console.warn('[LLM] 로컬 LM Studio 모드로 동작합니다.')
  }
  const modelId = options.model && config.provider === 'openai'
    ? options.model
    : await resolveModelId(config)

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const endpoint = options.endpoint === 'aftermath' ? 'aftermath' : 'dialogue'
  const url = config.provider === 'openai'
    ? `${config.baseUrl}/${endpoint}`
    : `${config.baseUrl}/chat/completions`

  const timeout = options.maxTokens && options.maxTokens >= 400 ? 90000 : 60000
  const fetchImpl = config.provider === 'openai' ? authFetch : fetch
  const res = await fetchImpl(url, {
    method: 'POST',
    headers,
    signal: AbortSignal.timeout(timeout),
    body: JSON.stringify({
      model: modelId,
      messages,
      temperature: options.temperature ?? 1.0,
      max_tokens: options.maxTokens ?? 400,
      stream: false,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`[LLM API] ${res.status} ${res.statusText}`, text.slice(0, 200))
    throw new Error(`LLM API error: ${res.status} ${res.statusText} ${text.slice(0, 100)}`)
  }

  const data: ChatCompletionResponse = await res.json()
  return data.choices[0]?.message?.content ?? ''
}

export async function checkConnection(): Promise<{
  connected: boolean
  provider?: 'openai' | 'local'
  modelId?: string
  error?: string
}> {
  const config = getConfig()
  const providerOverride = getRuntimeEnv('VITE_LLM_PROVIDER')?.toLowerCase()

  if (config.provider === 'openai') {
    if (providerOverride !== 'openai' && providerOverride !== 'proxy') {
      return { connected: false, provider: 'openai', error: 'LLM provider is not configured.' }
    }

    try {
      const res = await authFetch(`${config.baseUrl}/dialogue`, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) return { connected: false, error: `OpenAI 프록시 오류: ${res.status}` }
      return { connected: true, provider: 'openai', modelId: config.modelId }
    } catch {
      return { connected: false, error: 'OpenAI 프록시에 연결할 수 없습니다.' }
    }
  }

  // 로컬 LM Studio
  try {
    const res = await fetch(`${config.baseUrl}/models`, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return { connected: false, error: `HTTP ${res.status}` }
    const data = await res.json()
    if (data.data?.length > 0) {
      cachedLocalModelId = data.data[0].id as string
      return { connected: true, provider: 'local' as const, modelId: cachedLocalModelId! }
    }
    return { connected: false, error: '모델이 로드되지 않았습니다.' }
  } catch {
    return { connected: false, error: 'LM Studio 서버에 연결할 수 없습니다.' }
  }
}

export function getProviderName(): string {
  const config = getConfig()
  return config.provider === 'openai' ? 'OpenAI GPT-4o (서버 프록시)' : 'LM Studio (로컬)'
}
