import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/ai-data-fields — 전체 데이터 필드 목록 ──
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM ai_data_fields ORDER BY source, key').all();
  res.json(rows);
});

// ── POST /api/ai-data-fields — 데이터 필드 추가 ──
router.post('/', (req, res) => {
  const db = getDB();
  const { key, name, description, source = 'computed', data_type = 'string', example } = req.body;
  if (!key || !name) return res.status(400).json({ error: 'key, name required' });

  const existing = db.prepare('SELECT id FROM ai_data_fields WHERE key = ?').get(key);
  if (existing) return res.status(409).json({ error: 'Key already exists' });

  const result = db.prepare(
    'INSERT INTO ai_data_fields (key, name, description, source, data_type, example) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(key, name, description || '', source, data_type, example || '');

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/ai-data-fields/:key — 데이터 필드 수정 ──
router.put('/:key', (req, res) => {
  const db = getDB();
  const { name, description, source, data_type, example } = req.body;

  const existing = db.prepare('SELECT * FROM ai_data_fields WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare(`
    UPDATE ai_data_fields SET
      name = COALESCE(?, name), description = COALESCE(?, description),
      source = COALESCE(?, source), data_type = COALESCE(?, data_type),
      example = COALESCE(?, example), updated_at = datetime('now')
    WHERE key = ?
  `).run(name ?? null, description ?? null, source ?? null, data_type ?? null, example ?? null, req.params.key);

  res.json({ ok: true });
});

// ── DELETE /api/ai-data-fields/:key ──
router.delete('/:key', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT id FROM ai_data_fields WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM ai_data_fields WHERE key = ?').run(req.params.key);
  res.json({ ok: true });
});

export default router;
