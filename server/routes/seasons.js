import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM seasons ORDER BY start_date DESC').all());
});

router.post('/', (req, res) => {
  const db = getDB();
  const { id, name, start_date, end_date, is_active } = req.body;
  db.prepare('INSERT INTO seasons (id, name, start_date, end_date, is_active) VALUES (?, ?, ?, ?, ?)').run(id, name, start_date, end_date, is_active ? 1 : 0);
  if (is_active) db.prepare("UPDATE seasons SET is_active = 0 WHERE id != ?").run(id);
  res.json({ ok: true });
});

router.put('/:id', (req, res) => {
  const db = getDB();
  const { name, start_date, end_date, is_active } = req.body;
  db.prepare('UPDATE seasons SET name=?, start_date=?, end_date=?, is_active=? WHERE id=?').run(name, start_date, end_date, is_active ? 1 : 0, req.params.id);
  if (is_active) db.prepare("UPDATE seasons SET is_active = 0 WHERE id != ?").run(req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM seasons WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
