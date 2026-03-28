import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/players — 플레이어 목록 (어드민) ──
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare(`
    SELECT p.*,
      (SELECT COUNT(*) FROM game_history gh WHERE gh.player_id = p.id) as games_played,
      (SELECT MAX(gh.score) FROM game_history gh WHERE gh.player_id = p.id) as best_score
    FROM players p
    ORDER BY p.last_active DESC
  `).all();
  res.json(rows);
});

// ── GET /api/players/:id ──
router.get('/:id', (req, res) => {
  const db = getDB();
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.id);
  if (!player) return res.status(404).json({ error: 'Not found' });

  const history = db.prepare(
    'SELECT * FROM game_history WHERE player_id = ? ORDER BY played_at DESC LIMIT 50'
  ).all(req.params.id);

  res.json({ ...player, history });
});

// ── POST /api/players/sync — 프론트엔드에서 플레이어 등록/동기화 ──
router.post('/sync', (req, res) => {
  const db = getDB();
  const { id, name, region } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });

  db.prepare(`
    INSERT INTO players (id, name, region)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = COALESCE(?, name),
      region = COALESCE(?, region),
      last_active = datetime('now')
  `).run(id, name || '재판관', region || 'KR', name, region);

  res.json({ ok: true });
});

// ── POST /api/players/history — 게임 결과 기록 ──
router.post('/history', (req, res) => {
  const db = getDB();
  const {
    player_id, case_id, score, insight, authority, wisdom,
    relationship_type, name_a, name_b, season_id, titles = []
  } = req.body;

  if (!player_id || !case_id) return res.status(400).json({ error: 'player_id, case_id required' });

  const result = db.prepare(`
    INSERT INTO game_history (player_id, case_id, score, insight, authority, wisdom, relationship_type, name_a, name_b, season_id, titles)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(player_id, case_id, score || 0, insight || 0, authority || 0, wisdom || 0,
    relationship_type, name_a, name_b, season_id, JSON.stringify(titles));

  // 플레이어 활동 시간 업데이트
  db.prepare('UPDATE players SET last_active = datetime(\'now\') WHERE id = ?').run(player_id);

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── GET /api/players/:id/history — 특정 플레이어 게임 기록 ──
router.get('/:id/history', (req, res) => {
  const db = getDB();
  const rows = db.prepare(
    'SELECT * FROM game_history WHERE player_id = ? ORDER BY played_at DESC'
  ).all(req.params.id);
  res.json(rows);
});

export default router;
