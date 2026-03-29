import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

/** POST /api/llm-log — LLM 호출 기록 */
router.post('/', (req, res) => {
  const db = getDB();
  const { agent_key, model, input_tokens, output_tokens, duration_ms } = req.body;
  db.prepare('INSERT INTO llm_call_log (agent_key, model, input_tokens, output_tokens, duration_ms) VALUES (?,?,?,?,?)')
    .run(agent_key || '', model || 'gpt-4o-mini', input_tokens || 0, output_tokens || 0, duration_ms || 0);
  res.json({ ok: true });
});

/** GET /api/llm-log/stats — 비용 대시보드 */
router.get('/stats', (req, res) => {
  const db = getDB();
  const today = new Date().toISOString().slice(0, 10);
  const thisMonth = today.slice(0, 7);

  const todayCalls = db.prepare("SELECT COUNT(*) as cnt, SUM(input_tokens) as inp, SUM(output_tokens) as out FROM llm_call_log WHERE created_at >= ?").get(today + 'T00:00:00');
  const monthCalls = db.prepare("SELECT COUNT(*) as cnt, SUM(input_tokens) as inp, SUM(output_tokens) as out FROM llm_call_log WHERE created_at >= ?").get(thisMonth + '-01T00:00:00');
  const byAgent = db.prepare("SELECT agent_key, COUNT(*) as cnt, SUM(input_tokens) as inp, SUM(output_tokens) as out FROM llm_call_log WHERE created_at >= ? GROUP BY agent_key ORDER BY cnt DESC").all(thisMonth + '-01T00:00:00');
  const totalCalls = db.prepare("SELECT COUNT(*) as cnt FROM llm_call_log").get();

  // gpt-4o-mini 기준 예상 비용 (input $0.15/1M, output $0.60/1M)
  const monthInp = monthCalls.inp || 0;
  const monthOut = monthCalls.out || 0;
  const estimatedCost = ((monthInp / 1000000) * 0.15 + (monthOut / 1000000) * 0.60).toFixed(4);

  res.json({
    today: { calls: todayCalls.cnt, inputTokens: todayCalls.inp || 0, outputTokens: todayCalls.out || 0 },
    month: { calls: monthCalls.cnt, inputTokens: monthInp, outputTokens: monthOut, estimatedCostUSD: estimatedCost },
    byAgent,
    total: totalCalls.cnt,
  });
});

/** GET /api/llm-log/recent — 최근 호출 */
router.get('/recent', (req, res) => {
  const db = getDB();
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const rows = db.prepare('SELECT * FROM llm_call_log ORDER BY id DESC LIMIT ?').all(limit);
  res.json(rows);
});

export default router;
