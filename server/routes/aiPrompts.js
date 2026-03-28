import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── GET /api/ai-prompts — 활성 프롬프트 목록 (프론트엔드용, 캐시 친화적) ──
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare(`
    SELECT id, key, name, category, content, variables, version, updated_at
    FROM ai_prompts WHERE is_active = 1
    ORDER BY category, name
  `).all();

  // key → content 맵으로 변환 (프론트엔드에서 바로 사용 가능)
  const promptMap = {};
  for (const row of rows) {
    promptMap[row.key] = {
      content: row.content,
      variables: JSON.parse(row.variables || '[]'),
      version: row.version,
      updatedAt: row.updated_at,
      temperature: row.temperature ?? null,
      maxTokens: row.max_tokens ?? null,
    };
  }
  res.json({ prompts: promptMap, list: rows });
});

// ── GET /api/ai-prompts/all — 전체 프롬프트 (어드민용) ──
router.get('/all', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM ai_prompts ORDER BY category, name').all();
  res.json(rows);
});

// ── GET /api/ai-prompts/:key — 특정 프롬프트 조회 ──
router.get('/:key', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM ai_prompts WHERE key = ?').get(req.params.key);
  if (!row) return res.status(404).json({ error: 'Not found' });

  // 변경 이력도 함께 반환
  const history = db.prepare(`
    SELECT * FROM ai_prompt_history WHERE prompt_id = ? ORDER BY version DESC LIMIT 20
  `).all(row.id);

  res.json({ ...row, variables: JSON.parse(row.variables || '[]'), history });
});

// ── POST /api/ai-prompts — 프롬프트 생성 ──
router.post('/', (req, res) => {
  const db = getDB();
  const { key, name, description, category = 'dialogue', content, variables = [], temperature, max_tokens } = req.body;
  if (!key || !name || !content) return res.status(400).json({ error: 'key, name, content required' });

  const existing = db.prepare('SELECT id FROM ai_prompts WHERE key = ?').get(key);
  if (existing) return res.status(409).json({ error: 'Key already exists' });

  const result = db.prepare(`
    INSERT INTO ai_prompts (key, name, description, category, content, variables, temperature, max_tokens)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(key, name, description || '', category, content, JSON.stringify(variables), temperature ?? null, max_tokens ?? null);

  res.status(201).json({ id: result.lastInsertRowid });
});

// ── PUT /api/ai-prompts/:key — 프롬프트 수정 (버전 히스토리 자동 기록) ──
router.put('/:key', (req, res) => {
  const db = getDB();
  const { name, description, category, content, variables, is_active, temperature, max_tokens } = req.body;

  const existing = db.prepare('SELECT * FROM ai_prompts WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  // 내용이 변경되면 히스토리에 현재 버전 저장
  if (content && content !== existing.content) {
    db.prepare(`
      INSERT INTO ai_prompt_history (prompt_id, content, version)
      VALUES (?, ?, ?)
    `).run(existing.id, existing.content, existing.version);
  }

  const newVersion = content && content !== existing.content ? existing.version + 1 : existing.version;

  db.prepare(`
    UPDATE ai_prompts SET
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      category = COALESCE(?, category),
      content = COALESCE(?, content),
      variables = COALESCE(?, variables),
      is_active = COALESCE(?, is_active),
      temperature = ?,
      max_tokens = ?,
      version = ?,
      updated_at = datetime('now')
    WHERE key = ?
  `).run(
    name ?? null, description ?? null, category ?? null,
    content ?? null, variables ? JSON.stringify(variables) : null,
    is_active ?? null,
    temperature !== undefined ? temperature : existing.temperature,
    max_tokens !== undefined ? max_tokens : existing.max_tokens,
    newVersion, req.params.key
  );

  res.json({ ok: true, version: newVersion });
});

// ── POST /api/ai-prompts/:key/rollback/:version — 특정 버전으로 롤백 ──
router.post('/:key/rollback/:version', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT * FROM ai_prompts WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Prompt not found' });

  const historyEntry = db.prepare(
    'SELECT * FROM ai_prompt_history WHERE prompt_id = ? AND version = ?'
  ).get(existing.id, parseInt(req.params.version));
  if (!historyEntry) return res.status(404).json({ error: 'Version not found' });

  // 현재 버전을 히스토리에 저장
  db.prepare(`
    INSERT INTO ai_prompt_history (prompt_id, content, version, changed_by)
    VALUES (?, ?, ?, 'rollback')
  `).run(existing.id, existing.content, existing.version);

  // 롤백 적용
  db.prepare(`
    UPDATE ai_prompts SET content = ?, version = version + 1, updated_at = datetime('now')
    WHERE key = ?
  `).run(historyEntry.content, req.params.key);

  res.json({ ok: true });
});

// ── DELETE /api/ai-prompts/:key ──
router.delete('/:key', (req, res) => {
  const db = getDB();
  const existing = db.prepare('SELECT id FROM ai_prompts WHERE key = ?').get(req.params.key);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM ai_prompt_history WHERE prompt_id = ?').run(existing.id);
  db.prepare('DELETE FROM ai_prompts WHERE key = ?').run(req.params.key);
  res.json({ ok: true });
});

export default router;
