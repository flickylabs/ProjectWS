import { Router } from 'express';

const router = Router();
const ALLOWED_ENDPOINTS = new Set(['dialogue', 'aftermath']);

router.get('/:endpoint', (req, res) => {
  if (!ALLOWED_ENDPOINTS.has(req.params.endpoint)) {
    return res.status(404).json({ error: 'unknown_llm_endpoint' });
  }
  res.json({
    ok: true,
    endpoint: req.params.endpoint,
    authenticated: true,
    steamId: req.steamSession.steamId,
  });
});

router.post('/:endpoint', async (req, res) => {
  if (!ALLOWED_ENDPOINTS.has(req.params.endpoint)) {
    return res.status(404).json({ error: 'unknown_llm_endpoint' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'openai_api_key_missing' });
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        ...req.body,
        stream: false,
      }),
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const body = await upstream.text();
    res.status(upstream.status).type(contentType).send(body);
  } catch (err) {
    res.status(502).json({
      error: 'openai_proxy_failed',
      message: err instanceof Error ? err.message : 'OpenAI proxy request failed.',
    });
  }
});

export default router;
