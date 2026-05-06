import type { IncomingMessage, ServerResponse } from 'node:http'

type ChatRole = 'system' | 'user' | 'assistant'

type ChatMessage = {
  role: ChatRole
  content: string
}

type ChatRequestBody = {
  messages?: unknown
  model?: unknown
  temperature?: unknown
  max_tokens?: unknown
  maxTokens?: unknown
}

type ApiRequest = IncomingMessage & {
  body?: unknown
}

type JsonValue = Record<string, unknown> | unknown[]

function sendJson(res: ServerResponse, statusCode: number, body: JsonValue): void {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readJsonBody(req: ApiRequest): Promise<ChatRequestBody> {
  if (req.body && typeof req.body === 'object') return req.body as ChatRequestBody
  if (typeof req.body === 'string') return JSON.parse(req.body) as ChatRequestBody

  let raw = ''
  for await (const chunk of req) {
    raw += chunk
  }
  if (!raw.trim()) return {}
  return JSON.parse(raw) as ChatRequestBody
}

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) return null
  const messages: ChatMessage[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') return null
    const record = item as Record<string, unknown>
    if (record.role !== 'system' && record.role !== 'user' && record.role !== 'assistant') return null
    if (typeof record.content !== 'string') return null
    messages.push({ role: record.role, content: record.content })
  }
  return messages
}

function parseNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, Math.min(max, parsed))
}

function getModel(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function getServerApiKey(): string | null {
  const key = process.env.OPENAI_API_KEY?.trim()
  if (!key || key === '...' || key.length < 20 || key.includes('<') || key.includes('REDACTED')) return null
  return key
}

export async function handleChatCompletion(
  req: ApiRequest,
  res: ServerResponse,
  options: { defaultModel: string; defaultMaxTokens: number },
): Promise<void> {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const apiKey = getServerApiKey()

  if (req.method === 'GET') {
    if (!apiKey) {
      sendJson(res, 503, { error: 'OPENAI_API_KEY not set' })
      return
    }
    sendJson(res, 200, { ok: true, provider: 'openai', model: options.defaultModel })
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  if (!apiKey) {
    sendJson(res, 503, { error: 'OPENAI_API_KEY not set' })
    return
  }

  let body: ChatRequestBody
  try {
    body = await readJsonBody(req)
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON body' })
    return
  }

  const messages = parseMessages(body.messages)
  if (!messages || messages.length === 0) {
    sendJson(res, 400, { error: 'messages must be a non-empty chat message array' })
    return
  }

  const maxTokens = parseNumber(body.max_tokens ?? body.maxTokens, options.defaultMaxTokens, 1, 2000)
  const temperature = parseNumber(body.temperature, 1.0, 0, 2)
  const model = getModel(body.model, options.defaultModel)

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(maxTokens >= 400 ? 90000 : 60000),
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    }),
  })

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '')
    sendJson(res, upstream.status, {
      error: 'OpenAI request failed',
      status: upstream.status,
      detail: text.slice(0, 500),
    })
    return
  }

  const data = await upstream.json() as JsonValue
  sendJson(res, 200, data)
}
