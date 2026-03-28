import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/stats — 대시보드 통계 ──
router.get('/', (req, res) => {
  const db = getDB();

  const totalPlayers = db.prepare('SELECT COUNT(*) as c FROM players').get().c;
  const totalGames = db.prepare('SELECT COUNT(*) as c FROM game_history').get().c;
  const activeNotices = db.prepare('SELECT COUNT(*) as c FROM notices WHERE is_active = 1').get().c;
  const activeMail = db.prepare('SELECT COUNT(*) as c FROM mail WHERE is_active = 1').get().c;
  const totalPrompts = db.prepare('SELECT COUNT(*) as c FROM ai_prompts').get().c;

  const avgScore = db.prepare('SELECT AVG(score) as avg FROM game_history').get().avg || 0;

  const todayGames = db.prepare(`
    SELECT COUNT(*) as c FROM game_history WHERE date(played_at) = date('now')
  `).get().c;

  const recentPlayers = db.prepare(`
    SELECT COUNT(*) as c FROM players WHERE last_active >= datetime('now', '-7 days')
  `).get().c;

  // 관계 유형별 게임 수
  const byRelationship = db.prepare(`
    SELECT relationship_type, COUNT(*) as count, AVG(score) as avg_score
    FROM game_history WHERE relationship_type IS NOT NULL
    GROUP BY relationship_type ORDER BY count DESC
  `).all();

  // 최근 게임 5개
  const recentGames = db.prepare(`
    SELECT gh.*, p.name as player_name
    FROM game_history gh
    LEFT JOIN players p ON p.id = gh.player_id
    ORDER BY gh.played_at DESC LIMIT 5
  `).all();

  res.json({
    totalPlayers,
    totalGames,
    activeNotices,
    activeMail,
    totalPrompts,
    avgScore: Math.round(avgScore),
    todayGames,
    recentPlayers,
    byRelationship,
    recentGames,
  });
});

// ── GET /api/stats/settings — 설정 조회 ──
router.get('/settings', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM settings').all();
  const settings = {};
  for (const row of rows) settings[row.key] = row.value;
  res.json(settings);
});

// ── PUT /api/stats/settings — 설정 업데이트 ──
router.put('/settings', (req, res) => {
  const db = getDB();
  const entries = Object.entries(req.body);
  const upsert = db.prepare(`
    INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')
  `);
  const tx = db.transaction(() => {
    for (const [k, v] of entries) {
      upsert.run(k, String(v), String(v));
    }
  });
  tx();
  res.json({ ok: true });
});

export default router;
