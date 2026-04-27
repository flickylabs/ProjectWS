import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleChatCompletion } from '../../serverless/openaiProxy'

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  await handleChatCompletion(req, res, {
    defaultModel: 'gpt-4o-mini',
    defaultMaxTokens: 900,
  })
}
