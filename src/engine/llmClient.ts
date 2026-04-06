/**
 * LLM API 클라이언트.
 * 로컬 LM Studio 또는 OpenAI API를 지원한다.
 * 환경변수 VITE_OPENAI_API_KEY가 있으면 OpenAI, 없으면 로컬.
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
  apiKey: string
  modelId: string
}

function getRuntimeEnv(name: string): string | undefined {
  const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.[name]
  if (viteEnv) return viteEnv
  if (typeof process !== 'undefined') return process.env?.[name]
  return undefined
}

function getConfig(): LLMConfig {
  const apiKey = getRuntimeEnv('VITE_OPENAI_API_KEY')

  if (apiKey) {
    return {
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey,
      modelId: MODEL_DIALOGUE,
    }
  }

  return {
    provider: 'local',
    baseUrl: 'http://localhost:1234/v1',
    apiKey: '',
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
  options: { temperature?: number; maxTokens?: number; model?: string } = {},
): Promise<string> {
  const config = getConfig()
  const modelId = options.model && config.provider === 'openai'
    ? options.model
    : await resolveModelId(config)

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  const timeout = options.maxTokens && options.maxTokens >= 400 ? 90000 : 60000
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
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

  if (config.provider === 'openai') {
    try {
      // OpenAI는 간단한 테스트 요청으로 확인
      const res = await fetch(`${config.baseUrl}/models`, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) return { connected: false, error: `OpenAI API 오류: ${res.status}` }
      return { connected: true, provider: 'openai', modelId: config.modelId }
    } catch (e) {
      return { connected: false, error: 'OpenAI API에 연결할 수 없습니다.' }
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
  return config.provider === 'openai' ? 'OpenAI GPT-4o' : 'LM Studio (로컬)'
}
