/**
 * Solomon DB Schema — SQLite
 * 모든 테이블 생성 및 마이그레이션
 */

export function createTables(db) {
  db.exec(`
    -- ═══════════════════════════════════════════
    -- 플레이어
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS players (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL DEFAULT '재판관',
      region        TEXT DEFAULT 'KR',
      created_at    TEXT NOT NULL DEFAULT (datetime('now')),
      last_active   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- 게임 기록
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS game_history (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id         TEXT NOT NULL REFERENCES players(id),
      case_id           TEXT NOT NULL,
      score             INTEGER NOT NULL DEFAULT 0,
      insight           INTEGER NOT NULL DEFAULT 0,
      authority         INTEGER NOT NULL DEFAULT 0,
      wisdom            INTEGER NOT NULL DEFAULT 0,
      relationship_type TEXT,
      name_a            TEXT,
      name_b            TEXT,
      season_id         TEXT,
      titles            TEXT DEFAULT '[]',       -- JSON array
      played_at         TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_history_player ON game_history(player_id);
    CREATE INDEX IF NOT EXISTS idx_history_season ON game_history(season_id);

    -- ═══════════════════════════════════════════
    -- 명예의 전당
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS hall_of_fame (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id   TEXT NOT NULL REFERENCES players(id),
      player_name TEXT NOT NULL,
      score       INTEGER NOT NULL,
      insight     INTEGER NOT NULL DEFAULT 0,
      authority   INTEGER NOT NULL DEFAULT 0,
      wisdom      INTEGER NOT NULL DEFAULT 0,
      case_id     TEXT,
      season_id   TEXT NOT NULL,
      rank        INTEGER NOT NULL,
      recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_hof_season ON hall_of_fame(season_id);

    -- ═══════════════════════════════════════════
    -- 공지사항
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS notices (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      content     TEXT NOT NULL,
      type        TEXT NOT NULL DEFAULT 'info',      -- info, event, update, maintenance
      priority    INTEGER NOT NULL DEFAULT 0,        -- 0=normal, 1=important, 2=urgent
      is_pinned   INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1,
      start_date  TEXT,
      end_date    TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- 우편 (관리자 → 플레이어)
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS mail (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      title           TEXT NOT NULL,
      content         TEXT NOT NULL,
      sender          TEXT NOT NULL DEFAULT '솔로몬 운영팀',
      reward_type     TEXT,                           -- null, coin, item, title
      reward_amount   INTEGER DEFAULT 0,
      reward_data     TEXT,                           -- JSON (아이템 상세 등)
      target_type     TEXT NOT NULL DEFAULT 'all',    -- all, specific
      target_players  TEXT DEFAULT '[]',              -- JSON array of player IDs
      is_active       INTEGER NOT NULL DEFAULT 1,
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at      TEXT                            -- null = no expiry
    );

    -- ═══════════════════════════════════════════
    -- 우편 읽음 상태
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS mail_read_status (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      mail_id         INTEGER NOT NULL REFERENCES mail(id),
      player_id       TEXT NOT NULL REFERENCES players(id),
      is_read         INTEGER NOT NULL DEFAULT 0,
      reward_claimed  INTEGER NOT NULL DEFAULT 0,
      read_at         TEXT,
      claimed_at      TEXT,
      UNIQUE(mail_id, player_id)
    );
    CREATE INDEX IF NOT EXISTS idx_mail_read_player ON mail_read_status(player_id);

    -- ═══════════════════════════════════════════
    -- AI 프롬프트 관리
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_prompts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,               -- e.g. 'dialogue_system', 'free_question', 'testimony_analysis'
      name        TEXT NOT NULL,
      description TEXT,
      category    TEXT NOT NULL DEFAULT 'dialogue',   -- dialogue, analysis, generation, system
      content     TEXT NOT NULL,                       -- 실제 프롬프트 텍스트
      variables   TEXT DEFAULT '[]',                   -- JSON: 사용 가능한 변수 목록
      is_active   INTEGER NOT NULL DEFAULT 1,
      version     INTEGER NOT NULL DEFAULT 1,
      temperature REAL,                            -- LLM temperature (null = 기본값 사용)
      max_tokens  INTEGER,                         -- LLM max_tokens (null = 기본값 사용)
      updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- AI 프롬프트 변경 이력
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_prompt_history (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt_id   INTEGER NOT NULL REFERENCES ai_prompts(id),
      content     TEXT NOT NULL,
      version     INTEGER NOT NULL,
      changed_by  TEXT DEFAULT 'admin',
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- 글로벌 설정
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS settings (
      key         TEXT PRIMARY KEY,
      value       TEXT NOT NULL,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- AI 프롬프트 블록 (재사용 가능한 조각)
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_prompt_blocks (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT,
      category    TEXT NOT NULL DEFAULT 'common',
      content     TEXT NOT NULL,
      variables   TEXT DEFAULT '[]',
      version     INTEGER NOT NULL DEFAULT 1,
      is_active   INTEGER NOT NULL DEFAULT 1,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- AI 에이전트 (LLM 설정 + 블록 조합)
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_agents (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT,
      model       TEXT,
      temperature REAL,
      max_tokens  INTEGER,
      provider    TEXT,                              -- 'openai' | 'local' | null(기본)
      context_flags TEXT DEFAULT '{}',               -- JSON: 어떤 데이터 섹션을 포함할지 토글
      is_active   INTEGER NOT NULL DEFAULT 1,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- 에이전트-블록 조합 (순서 + 조건부)
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_agent_blocks (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_key       TEXT NOT NULL,
      block_key       TEXT NOT NULL,
      sort_order      INTEGER NOT NULL DEFAULT 0,
      condition_field TEXT,
      condition_value TEXT,
      UNIQUE(agent_key, block_key, condition_value)
    );

    -- ═══════════════════════════════════════════
    -- 세션 데이터 필드 레지스트리
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_data_fields (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT,
      source      TEXT NOT NULL DEFAULT 'computed',
      data_type   TEXT NOT NULL DEFAULT 'string',
      example     TEXT,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════
    -- 프롬프트 블록 변경 이력
    -- ═══════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_block_history (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      block_id    INTEGER NOT NULL REFERENCES ai_prompt_blocks(id),
      content     TEXT NOT NULL,
      version     INTEGER NOT NULL,
      changed_by  TEXT DEFAULT 'admin',
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── 마이그레이션: 기존 DB에 새 컬럼 추가 ──
  try { db.exec("ALTER TABLE ai_prompts ADD COLUMN temperature REAL"); } catch { /* 이미 존재 */ }
  try { db.exec("ALTER TABLE ai_prompts ADD COLUMN max_tokens INTEGER"); } catch { /* 이미 존재 */ }
  try { db.exec("ALTER TABLE ai_agents ADD COLUMN provider TEXT"); } catch { /* 이미 존재 */ }
  try { db.exec("ALTER TABLE ai_agents ADD COLUMN context_flags TEXT DEFAULT '{}'"); } catch { /* 이미 존재 */ }
}
