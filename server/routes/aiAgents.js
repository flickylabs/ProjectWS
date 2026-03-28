import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/ai-agents — 에이전트 목록 (블록 조합 포함) ──
router.get('/', (req, res) => {
  const db = getDB();
  const agents = db.prepare('SELECT * FROM ai_agents ORDER BY name').all();

  // 각 에이전트에 블록 조합 첨부
  const getBlocks = db.prepare(
    'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order, id'
  );
  const result = agents.map(a => ({
    ...a,
    blocks: getBlocks.all(a.key),
  }));

  res.json(result);
});

// ── GET /api/ai-agents/:key — 에이전트 상세 ──
router.get('/:key', (req, res) => {
  const db = getDB();
  const agent = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(req.params.key);
  if (!agent) return res.status(404).json({ error: 'Not found' });

  const blocks = db.prepare(
    'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order, id'
  ).all(req.params.key);

  res.json({ ...agent, blocks });
});

// ── GET /api/ai-agents/:key/preview — 조립된 프롬프트 미리보기 ──
router.get('/:key/preview', (req, res) => {
  const db = getDB();
  const agent = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(req.params.key);
  if (!agent) return res.status(404).json({ error: 'Not found' });

  const compositions = db.prepare(
    'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order, id'
  ).all(req.params.key);

  // 조건 필터링 (쿼리 파라미터로 조건값 전달)
  const conditions = req.query;
  const filteredBlocks = compositions.filter(c => {
    if (!c.condition_field) return true;
    return conditions[c.condition_field] === c.condition_value;
  });

  // 블록 content 로드 및 조립
  const getBlock = db.prepare('SELECT content FROM ai_prompt_blocks WHERE key = ? AND is_active = 1');
  const parts = [];
  for (const fb of filteredBlocks) {
    const block = getBlock.get(fb.block_key);
    if (block) parts.push(block.content);
  }

  res.json({
    agent: agent.key,
    temperature: agent.temperature,
    max_tokens: agent.max_tokens,
    conditions,
    blockCount: filteredBlocks.length,
    prompt: parts.join('\n\n'),
  });
});

// ── POST /api/ai-agents — 에이전트 생성 ──
router.post('/', (req, res) => {
  const db = getDB();
  const { key, name, description, model, temperature, max_tokens, context_flags } = req.body;
  if (!key || !name) return res.status(400).json({ error: 'key, name required' });

  const existing = db.prepare('SELECT id FROM ai_agents WHERE key = ?').get(key);
  if (existing) return res.status(409).json({ error: 'Key already exists' });

  const result = db.prepare(
    'INSERT INTO ai_agents (key, name, description, model, temperature, max_tokens, context_flags) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(key, name, description || '', model ?? null, temperature ?? null, max_tokens ?? null, context_flags ? JSON.stringify(context_flags) : '{}');

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/ai-agents/:key — 에이전트 수정 ──
router.put('/:key', (req, res) => {
  const db = getDB();
  const { name, description, model, temperature, max_tokens, is_active, context_flags } = req.body;

  const existing = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare(`
    UPDATE ai_agents SET
      name = COALESCE(?, name), description = COALESCE(?, description),
      model = ?, temperature = ?, max_tokens = ?,
      context_flags = ?,
      is_active = COALESCE(?, is_active), updated_at = datetime('now')
    WHERE key = ?
  `).run(
    name ?? null, description ?? null,
    model !== undefined ? model : existing.model,
    temperature !== undefined ? temperature : existing.temperature,
    max_tokens !== undefined ? max_tokens : existing.max_tokens,
    context_flags !== undefined ? JSON.stringify(context_flags) : existing.context_flags,
    is_active ?? null, req.params.key
  );

  res.json({ ok: true });
});

// ── PUT /api/ai-agents/:key/blocks — 블록 조합 전체 교체 ──
router.put('/:key/blocks', (req, res) => {
  const db = getDB();
  const agent = db.prepare('SELECT id FROM ai_agents WHERE key = ?').get(req.params.key);
  if (!agent) return res.status(404).json({ error: 'Agent not found' });

  const { blocks } = req.body; // [{ block_key, sort_order, condition_field?, condition_value? }]
  if (!Array.isArray(blocks)) return res.status(400).json({ error: 'blocks array required' });

  const deleteTx = db.prepare('DELETE FROM ai_agent_blocks WHERE agent_key = ?');
  const insertTx = db.prepare(
    'INSERT INTO ai_agent_blocks (agent_key, block_key, sort_order, condition_field, condition_value) VALUES (?, ?, ?, ?, ?)'
  );

  db.transaction(() => {
    deleteTx.run(req.params.key);
    for (const b of blocks) {
      insertTx.run(req.params.key, b.block_key, b.sort_order ?? 0, b.condition_field ?? null, b.condition_value ?? null);
    }
  })();

  res.json({ ok: true, count: blocks.length });
});

// ── DELETE /api/ai-agents/:key ──
router.delete('/:key', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT id FROM ai_agents WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM ai_agent_blocks WHERE agent_key = ?').run(req.params.key);
  db.prepare('DELETE FROM ai_agents WHERE key = ?').run(req.params.key);
  res.json({ ok: true });
});

export default router;
