import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/mail/player/:playerId — 플레이어 우편함 ──
router.get('/player/:playerId', (req, res) => {
  const db = getDB();
  const { playerId } = req.params;
  const now = new Date().toISOString();

  const rows = db.prepare(`
    SELECT m.id, m.title, m.content, m.sender, m.reward_type, m.reward_amount, m.reward_data,
           m.created_at, m.expires_at,
           COALESCE(mrs.is_read, 0) as is_read,
           COALESCE(mrs.reward_claimed, 0) as reward_claimed,
           mrs.read_at
    FROM mail m
    LEFT JOIN mail_read_status mrs ON mrs.mail_id = m.id AND mrs.player_id = ?
    WHERE m.is_active = 1
      AND (m.expires_at IS NULL OR m.expires_at >= ?)
      AND (m.target_type = 'all' OR json_extract(m.target_players, '$') LIKE '%' || ? || '%')
    ORDER BY m.created_at DESC
  `).all(playerId, now, playerId);

  res.json(rows);
});

// ── POST /api/mail/read — 우편 읽음 처리 ──
router.post('/read', (req, res) => {
  const db = getDB();
  const { mail_id, player_id } = req.body;
  if (!mail_id || !player_id) return res.status(400).json({ error: 'mail_id and player_id required' });

  db.prepare(`
    INSERT INTO mail_read_status (mail_id, player_id, is_read, read_at)
    VALUES (?, ?, 1, datetime('now'))
    ON CONFLICT(mail_id, player_id) DO UPDATE SET is_read = 1, read_at = datetime('now')
  `).run(mail_id, player_id);

  res.json({ ok: true });
});

// ── POST /api/mail/claim — 보상 수령 ──
router.post('/claim', (req, res) => {
  const db = getDB();
  const { mail_id, player_id } = req.body;
  if (!mail_id || !player_id) return res.status(400).json({ error: 'mail_id and player_id required' });

  const mail = db.prepare('SELECT * FROM mail WHERE id = ?').get(mail_id);
  if (!mail) return res.status(404).json({ error: 'Mail not found' });

  const status = db.prepare(
    'SELECT * FROM mail_read_status WHERE mail_id = ? AND player_id = ?'
  ).get(mail_id, player_id);

  if (status?.reward_claimed) return res.status(400).json({ error: 'Already claimed' });

  db.prepare(`
    INSERT INTO mail_read_status (mail_id, player_id, is_read, read_at, reward_claimed, claimed_at)
    VALUES (?, ?, 1, datetime('now'), 1, datetime('now'))
    ON CONFLICT(mail_id, player_id) DO UPDATE SET
      reward_claimed = 1, claimed_at = datetime('now'), is_read = 1, read_at = COALESCE(read_at, datetime('now'))
  `).run(mail_id, player_id);

  res.json({
    ok: true,
    reward: {
      type: mail.reward_type,
      amount: mail.reward_amount,
      data: mail.reward_data ? JSON.parse(mail.reward_data) : null
    }
  });
});

// ── GET /api/mail/unread-count/:playerId — 미읽은 우편 수 ──
router.get('/unread-count/:playerId', (req, res) => {
  const db = getDB();
  const { playerId } = req.params;
  const now = new Date().toISOString();

  const result = db.prepare(`
    SELECT COUNT(*) as count FROM mail m
    LEFT JOIN mail_read_status mrs ON mrs.mail_id = m.id AND mrs.player_id = ?
    WHERE m.is_active = 1
      AND (m.expires_at IS NULL OR m.expires_at >= ?)
      AND (m.target_type = 'all' OR json_extract(m.target_players, '$') LIKE '%' || ? || '%')
      AND (mrs.is_read IS NULL OR mrs.is_read = 0)
  `).get(playerId, now, playerId);

  res.json({ count: result.count });
});

// ═══ 어드민 API ═══

// ── GET /api/mail/all — 전체 우편 (어드민) ──
router.get('/all', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM mail ORDER BY created_at DESC').all();
  res.json(rows);
});

// ── POST /api/mail — 우편 생성 (어드민) ──
router.post('/', (req, res) => {
  const db = getDB();
  const {
    title, content, sender = '솔로몬 운영팀',
    reward_type, reward_amount = 0, reward_data,
    target_type = 'all', target_players = '[]',
    expires_at
  } = req.body;

  if (!title || !content) return res.status(400).json({ error: 'title and content required' });

  const result = db.prepare(`
    INSERT INTO mail (title, content, sender, reward_type, reward_amount, reward_data, target_type, target_players, expires_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, content, sender, reward_type || null, reward_amount, reward_data || null, target_type, target_players, expires_at || null);

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/mail/:id ──
router.put('/:id', (req, res) => {
  const db = getDB();
  const { title, content, sender, reward_type, reward_amount, reward_data, target_type, target_players, is_active, expires_at } = req.body;

  db.prepare(`
    UPDATE mail SET
      title = COALESCE(?, title),
      content = COALESCE(?, content),
      sender = COALESCE(?, sender),
      reward_type = ?,
      reward_amount = COALESCE(?, reward_amount),
      reward_data = ?,
      target_type = COALESCE(?, target_type),
      target_players = COALESCE(?, target_players),
      is_active = COALESCE(?, is_active),
      expires_at = ?
    WHERE id = ?
  `).run(
    title ?? null, content ?? null, sender ?? null,
    reward_type !== undefined ? reward_type : null,
    reward_amount ?? null, reward_data !== undefined ? reward_data : null,
    target_type ?? null, target_players ?? null, is_active ?? null,
    expires_at !== undefined ? expires_at : null,
    req.params.id
  );
  res.json({ ok: true });
});

// ── DELETE /api/mail/:id ──
router.delete('/:id', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM mail WHERE id = ?').run(req.params.id);
  db.prepare('DELETE FROM mail_read_status WHERE mail_id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
