/**
 * Case Meta API — 사건별 태그, 상성, 경로 등 보강 데이터 관리
 */
import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

/** GET / — 전체 사건 메타 목록 */
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM case_meta ORDER BY case_key').all();
  res.json(rows.map(r => ({
    ...r,
    personality_tags_a: JSON.parse(r.personality_tags_a || '[]'),
    personality_tags_b: JSON.parse(r.personality_tags_b || '[]'),
    content_tags: JSON.parse(r.content_tags || '{}'),
    truth_category: JSON.parse(r.truth_category || '{}'),
    action_affinity: JSON.parse(r.action_affinity || '{}'),
    optimal_path: JSON.parse(r.optimal_path || '{}'),
    narrative_expansion: JSON.parse(r.narrative_expansion || '{}'),
    witness_speech_sample: JSON.parse(r.witness_speech_sample || '{}'),
  })));
});

/** GET /:key — 단일 사건 메타 */
router.get('/:key', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM case_meta WHERE case_key = ?').get(req.params.key);
  if (!row) return res.json(null);
  res.json({
    ...row,
    personality_tags_a: JSON.parse(row.personality_tags_a || '[]'),
    personality_tags_b: JSON.parse(row.personality_tags_b || '[]'),
    content_tags: JSON.parse(row.content_tags || '{}'),
    truth_category: JSON.parse(row.truth_category || '{}'),
    action_affinity: JSON.parse(row.action_affinity || '{}'),
    optimal_path: JSON.parse(row.optimal_path || '{}'),
    narrative_expansion: JSON.parse(row.narrative_expansion || '{}'),
    witness_speech_sample: JSON.parse(row.witness_speech_sample || '{}'),
  });
});

/** PUT /:key — 사건 메타 저장 (upsert) */
router.put('/:key', (req, res) => {
  const db = getDB();
  const { personality_tags_a, personality_tags_b, content_tags, truth_category,
          action_affinity, optimal_path, narrative_expansion, witness_speech_sample } = req.body;

  db.prepare(`
    INSERT INTO case_meta (case_key, personality_tags_a, personality_tags_b, content_tags,
      truth_category, action_affinity, optimal_path, narrative_expansion, witness_speech_sample)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(case_key) DO UPDATE SET
      personality_tags_a = excluded.personality_tags_a,
      personality_tags_b = excluded.personality_tags_b,
      content_tags = excluded.content_tags,
      truth_category = excluded.truth_category,
      action_affinity = excluded.action_affinity,
      optimal_path = excluded.optimal_path,
      narrative_expansion = excluded.narrative_expansion,
      witness_speech_sample = excluded.witness_speech_sample,
      updated_at = datetime('now')
  `).run(
    req.params.key,
    JSON.stringify(personality_tags_a ?? []),
    JSON.stringify(personality_tags_b ?? []),
    JSON.stringify(content_tags ?? {}),
    JSON.stringify(truth_category ?? {}),
    JSON.stringify(action_affinity ?? {}),
    JSON.stringify(optimal_path ?? {}),
    JSON.stringify(narrative_expansion ?? {}),
    JSON.stringify(witness_speech_sample ?? {}),
  );

  res.json({ ok: true });
});

/** DELETE /:key — 삭제 */
router.delete('/:key', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM case_meta WHERE case_key = ?').run(req.params.key);
  res.json({ ok: true });
});

export default router;
