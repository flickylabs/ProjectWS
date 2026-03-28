import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/notices — 활성 공지 목록 (프론트엔드용) ──
router.get('/', (req, res) => {
  const db = getDB();
  const now = new Date().toISOString();
  const rows = db.prepare(`
    SELECT id, title, content, type, priority, is_pinned, created_at, updated_at
    FROM notices
    WHERE is_active = 1
      AND (start_date IS NULL OR start_date <= ?)
      AND (end_date IS NULL OR end_date >= ?)
    ORDER BY is_pinned DESC, priority DESC, created_at DESC
  `).all(now, now);
  res.json(rows);
});

// ── GET /api/notices/all — 전체 공지 (어드민용) ──
router.get('/all', (req, res) => {
  const db = getDB();
  const rows = db.prepare(`
    SELECT * FROM notices ORDER BY created_at DESC
  `).all();
  res.json(rows);
});

// ── GET /api/notices/:id ──
router.get('/:id', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM notices WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// ── POST /api/notices — 공지 생성 ──
router.post('/', (req, res) => {
  const db = getDB();
  const { title, content, type = 'info', priority = 0, is_pinned = 0, start_date, end_date } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'title and content required' });

  const result = db.prepare(`
    INSERT INTO notices (title, content, type, priority, is_pinned, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(title, content, type, priority, is_pinned, start_date || null, end_date || null);

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/notices/:id — 공지 수정 ──
router.put('/:id', (req, res) => {
  const db = getDB();
  const { title, content, type, priority, is_pinned, is_active, start_date, end_date } = req.body;

  const existing = db.prepare('SELECT * FROM notices WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare(`
    UPDATE notices SET
      title = COALESCE(?, title),
      content = COALESCE(?, content),
      type = COALESCE(?, type),
      priority = COALESCE(?, priority),
      is_pinned = COALESCE(?, is_pinned),
      is_active = COALESCE(?, is_active),
      start_date = ?,
      end_date = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).run(
    title ?? null, content ?? null, type ?? null, priority ?? null,
    is_pinned ?? null, is_active ?? null,
    start_date !== undefined ? start_date : existing.start_date,
    end_date !== undefined ? end_date : existing.end_date,
    req.params.id
  );
  res.json({ ok: true });
});

// ── DELETE /api/notices/:id ──
router.delete('/:id', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM notices WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
