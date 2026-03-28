import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/ai-blocks — 전체 블록 목록 ──
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM ai_prompt_blocks ORDER BY category, name').all();
  res.json(rows);
});

// ── GET /api/ai-blocks/:key — 블록 상세 + 히스토리 ──
router.get('/:key', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM ai_prompt_blocks WHERE key = ?').get(req.params.key);
  if (!row) return res.status(404).json({ error: 'Not found' });

  const history = db.prepare(
    'SELECT * FROM ai_block_history WHERE block_id = ? ORDER BY version DESC LIMIT 20'
  ).all(row.id);

  res.json({ ...row, variables: JSON.parse(row.variables || '[]'), history });
});

// ── POST /api/ai-blocks — 블록 생성 ──
router.post('/', (req, res) => {
  const db = getDB();
  const { key, name, description, category = 'common', content, variables = [] } = req.body;
  if (!key || !name || !content) return res.status(400).json({ error: 'key, name, content required' });

  const existing = db.prepare('SELECT id FROM ai_prompt_blocks WHERE key = ?').get(key);
  if (existing) return res.status(409).json({ error: 'Key already exists' });

  const result = db.prepare(
    'INSERT INTO ai_prompt_blocks (key, name, description, category, content, variables) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(key, name, description || '', category, content, JSON.stringify(variables));

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/ai-blocks/:key — 블록 수정 (버전 히스토리 자동 기록) ──
router.put('/:key', (req, res) => {
  const db = getDB();
  const { name, description, category, content, variables, is_active } = req.body;

  const existing = db.prepare('SELECT * FROM ai_prompt_blocks WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  if (content && content !== existing.content) {
    db.prepare(
      'INSERT INTO ai_block_history (block_id, content, version) VALUES (?, ?, ?)'
    ).run(existing.id, existing.content, existing.version);
  }

  const newVersion = content && content !== existing.content ? existing.version + 1 : existing.version;

  db.prepare(`
    UPDATE ai_prompt_blocks SET
      name = COALESCE(?, name), description = COALESCE(?, description),
      category = COALESCE(?, category), content = COALESCE(?, content),
      variables = COALESCE(?, variables), is_active = COALESCE(?, is_active),
      version = ?, updated_at = datetime('now')
    WHERE key = ?
  `).run(
    name ?? null, description ?? null, category ?? null,
    content ?? null, variables ? JSON.stringify(variables) : null,
    is_active ?? null, newVersion, req.params.key
  );

  res.json({ ok: true, version: newVersion });
});

// ── POST /api/ai-blocks/:key/rollback/:version ──
router.post('/:key/rollback/:version', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT * FROM ai_prompt_blocks WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const historyEntry = db.prepare(
    'SELECT * FROM ai_block_history WHERE block_id = ? AND version = ?'
  ).get(existing.id, parseInt(req.params.version));
  if (!historyEntry) return res.status(404).json({ error: 'Version not found' });

  db.prepare(
    'INSERT INTO ai_block_history (block_id, content, version, changed_by) VALUES (?, ?, ?, ?)'
  ).run(existing.id, existing.content, existing.version, 'rollback');

  db.prepare(
    'UPDATE ai_prompt_blocks SET content = ?, version = version + 1, updated_at = datetime(\'now\') WHERE key = ?'
  ).run(historyEntry.content, req.params.key);

  res.json({ ok: true });
});

// ── DELETE /api/ai-blocks/:key ──
router.delete('/:key', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT id FROM ai_prompt_blocks WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM ai_block_history WHERE block_id = ?').run(existing.id);
  db.prepare('DELETE FROM ai_agent_blocks WHERE block_key = ?').run(req.params.key);
  db.prepare('DELETE FROM ai_prompt_blocks WHERE key = ?').run(req.params.key);
  res.json({ ok: true });
});

export default router;
