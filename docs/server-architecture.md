# 솔로몬 서버 아키텍처 설계

> 최종 업데이트: 2026-03-27

---

## 1. 개요

현재: 100% 클라이언트 (localStorage)
목표: Vercel (프론트) + Supabase (DB/Auth) 구조로 전환

---

## 2. 인프라

| 구성 | 기술 | 비용 (월) |
|------|------|----------|
| 프론트엔드 | Vercel (정적 배포) | Free ~ $20 |
| 데이터베이스 | Supabase (PostgreSQL) | Free ~ $25 |
| 인증 | Supabase Auth (익명 + 소셜) | 포함 |
| 파일 스토리지 | 불필요 (정적 JSON은 번들) | - |
| LLM API | OpenAI GPT-4o-mini | 사용량 비례 |

---

## 3. 데이터베이스 스키마

### 3.1 players — 유저

```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL CHECK (char_length(nickname) BETWEEN 2 AND 8),
  region TEXT DEFAULT '서울',
  device_id TEXT,  -- 기기 식별 (익명 모드)
  auth_provider TEXT,  -- 'anonymous' | 'google' | 'kakao'
  created_at TIMESTAMPTZ DEFAULT now(),
  last_played_at TIMESTAMPTZ DEFAULT now(),
  total_games INT DEFAULT 0,
  best_score INT DEFAULT 0
);

CREATE UNIQUE INDEX idx_players_device ON players(device_id) WHERE device_id IS NOT NULL;
```

### 3.2 scores — 판결 점수

```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  season_id TEXT NOT NULL,  -- 's1', 's2', ...
  case_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  insight INT NOT NULL CHECK (insight BETWEEN 0 AND 100),
  authority INT NOT NULL CHECK (authority BETWEEN 0 AND 100),
  wisdom INT NOT NULL CHECK (wisdom BETWEEN 0 AND 100),
  total INT NOT NULL CHECK (total BETWEEN 0 AND 100),
  turns_used INT DEFAULT 0,
  free_questions_used INT DEFAULT 0,
  titles TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 리더보드 조회용 인덱스
CREATE INDEX idx_scores_season_total ON scores(season_id, total DESC);
CREATE INDEX idx_scores_season_insight ON scores(season_id, insight DESC);
CREATE INDEX idx_scores_season_authority ON scores(season_id, authority DESC);
CREATE INDEX idx_scores_season_wisdom ON scores(season_id, wisdom DESC);
CREATE INDEX idx_scores_player ON scores(player_id);
CREATE INDEX idx_scores_case ON scores(case_id);
```

### 3.3 verdict_logs — 판단 로그 (명예의 전당 리플레이용)

```sql
CREATE TABLE verdict_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score_id UUID REFERENCES scores(id) ON DELETE CASCADE,

  -- 플레이어의 판단 내용
  fact_findings JSONB NOT NULL,
  -- {"d-1": "true", "d-2": "false", "d-3": "pending", ...}

  responsibility JSONB NOT NULL,
  -- {"d-1": {"a": 70, "b": 30}, "d-2": {"a": 20, "b": 80}, ...}

  selected_solutions TEXT[] DEFAULT '{}',

  evidence_legality JSONB DEFAULT '{}',
  -- {"e-3": false, "e-5": true, ...}

  -- 진행 통계
  questions_asked JSONB DEFAULT '{}',
  -- {"fact_pursuit": 5, "motive_search": 3, "empathy_approach": 2, "free": 1}

  evidence_presented TEXT[] DEFAULT '{}',
  -- ["e-1", "e-2", "e-4"]

  evidence_investigated JSONB DEFAULT '{}',
  -- {"e-1": 3, "e-3": 2}  (조사 횟수)

  skills_used JSONB DEFAULT '{}',
  -- {"immediate_answer": 1, "evasion_reading": 1}

  objections_used INT DEFAULT 0,
  confidential_used BOOLEAN DEFAULT false,
  separation_used BOOLEAN DEFAULT false,

  -- 대화 요약 (전체 로그는 너무 크므로 핵심만)
  key_moments TEXT[] DEFAULT '{}',
  -- ["d-1 S5 붕괴 (턴 8)", "e-3 제시 후 반전 (턴 12)", ...]

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_verdict_logs_score ON verdict_logs(score_id);
```

### 3.4 hall_of_fame — 명예의 전당

```sql
CREATE TABLE hall_of_fame (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id TEXT NOT NULL,
  category TEXT NOT NULL,  -- 'total' | 'insight' | 'authority' | 'wisdom'
  rank INT NOT NULL CHECK (rank BETWEEN 1 AND 5),
  player_id UUID REFERENCES players(id),
  score_id UUID REFERENCES scores(id),
  nickname TEXT NOT NULL,
  score_value INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(season_id, category, rank)
);

CREATE INDEX idx_hof_season ON hall_of_fame(season_id, category);
```

### 3.5 groups — 친구 그룹 (리더보드)

```sql
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 20),
  created_by UUID REFERENCES players(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE group_members (
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (group_id, player_id)
);

CREATE INDEX idx_group_members_player ON group_members(player_id);
```

### 3.6 operation_logs — 운영 로그

```sql
CREATE TABLE operation_logs (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  -- 'game_start' | 'game_complete' | 'score_submit' | 'error' | 'suspicious'

  player_id UUID REFERENCES players(id),
  case_id TEXT,
  payload JSONB DEFAULT '{}',
  -- 이벤트별 상세 데이터

  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_op_logs_type ON operation_logs(event_type, created_at DESC);
CREATE INDEX idx_op_logs_player ON operation_logs(player_id, created_at DESC);

-- 30일 이상 된 로그 자동 삭제 (비용 관리)
-- Supabase cron 또는 Edge Function으로 처리
```

---

## 4. BM (비즈니스 모델)

### 4.1 화폐 구조

```
현금 → 💎 다이아 (중간 화폐) → 🔍 조사 토큰 / ⚡ 스킬 포인트
```

### 4.2 다이아 패키지

| 패키지 | 가격 | 다이아 | 보너스 |
|--------|------|--------|--------|
| 소량 | ₩1,200 | 60 | - |
| 중량 | ₩3,300 | 180 | +10% |
| 대량 | ₩5,900 | 350 | +18% |
| 특대 | ₩11,000 | 750 | +25% |

### 4.3 다이아 → 아이템 교환

| 아이템 | 다이아 | 용도 |
|--------|--------|------|
| 🔍 조사 토큰 10개 | 30💎 | 사건 입장 + 증거 조사 + 자유 질문 + 분리 심문 |
| ⚡ 스킬 포인트 5개 | 50💎 | 이의 제기 + 즉답 요구 + 회피 판독 |
| ⚡ 스킬 포인트 15개 | 120💎 | 20% 할인 |

### 4.4 조사 토큰 (스태미나)

```
사건 입장: 1개 소모
증거 조사: 1개 소모
자유 질문: 1개 소모
분리 심문: 1개 소모

최대 보유: 10개
자동 충전: 1시간마다 1개
광고 시청: 즉시 1개 (1일 5회)
구매: 10개 = 30💎

1판 평균 소모: 4~6개
1일 무료 충전: 10개(자동) + 5개(광고) = 15개
→ 하루 2~3판 무료 플레이
```

### 4.5 스킬 포인트 (프리미엄)

```
이의 제기: 1개 소모
즉답 요구: 1개 소모
회피 판독: 1개 소모

없어도 게임 완주 가능 → Pay for Convenience

무료 획득:
- 출석 보상: 5💎/일 (간접)
- 캠페인 클리어: 1개/스테이지
- 칭호 달성: 1~2개
- 시즌 시작: 3개
- 광고: 1일 2회
```

### 4.6 무료 다이아 획득

| 방법 | 다이아 | 빈도 |
|------|--------|------|
| 출석 보상 | 5💎 | 매일 |
| 7일 연속 출석 | 30💎 보너스 | 주 1회 |
| 캠페인 스테이지 | 10💎 | 스테이지당 |
| 칭호 달성 | 15💎 | 칭호당 |
| 시즌 시작 | 50💎 | 시즌당 |
| 광고 시청 | 3💎 | 1일 5회 |
| 명예의 전당 | 100💎 | 시즌당 |

### 4.7 시즌 패스 (직접 구매, 다이아 아님)

```
가격: ₩4,900/시즌

무료 트랙: 사건 클리어 → 경험치 → 레벨업 → 소량 보상
유료 트랙:
  - 매 레벨 추가 다이아 5💎
  - 조사 토큰 자동 충전 2배 (1시간→30분)
  - 시즌 한정 칭호 프레임
  - 총 다이아 가치 ~300💎 (₩6,000 상당)
```

### 4.8 환불 방어

| 위험 | 방어 |
|------|------|
| 결제 후 미사용 | 다이아 잔여분 확인 가능 |
| 아이템 소실 주장 | 거래 로그로 추적 |
| 반복 환불 악용 | 다이아 차감 → 음수 잔액 차단 |
| 앱스토어 환불 | 다이아 단위 회수, 소진 아이템은 별도 |

---

## 5. 명성 시스템 + 유저 프로필

### 5.1 명성 포인트

```
사건 1개 해결 → 명성 포인트 획득

명성 = total 점수 기반
- 90점+: 50 명성
- 75점+: 35 명성
- 60점+: 20 명성
- 40점+: 10 명성
- 40점 미만: 5 명성

동일 사건 재도전: 더 높은 점수로 갈음 (차액만 추가)
예) spouse-01 첫 도전 70점 → 20명성
    spouse-01 재도전 90점 → 30명성 추가 (50-20)
```

### 5.2 명성 랭킹

```
1) 총 명성 랭킹 — 전체 사건 명성 합계
   "이 플레이어가 얼마나 많은 사건을 높은 점수로 해결했는가"

2) 사건별 명성 랭킹 — 특정 사건의 최고 점수 순위
   "spouse-01에서 누가 가장 잘했는가"
```

### 5.3 시즌 + 명예의 전당

```
시즌 (30일 단위):
- 시즌 동안 쌓은 명성으로 랭킹
- 시즌 종료 시 명성 리셋
- 각 카테고리 Top 5 → 명예의 전당 영구 등록

명예의 전당 카테고리:
- 총 명성 1~5위
- 통찰(insight) 평균 1~5위
- 권위(authority) 평균 1~5위
- 지혜(wisdom) 평균 1~5위
- 사건별 최고 점수 1위 (84개 사건 × 1위)

명예의 전당 등록자 혜택:
- 100💎 보상
- 특별 칭호 프레임 (시즌 표기)
- 판단 로그 공개 (다른 플레이어가 리플레이 가능)
```

### 5.4 명성 등급 (프로필 표시)

| 총 명성 | 등급 | 아이콘 |
|---------|------|--------|
| 0~99 | 수습 재판관 | 🔰 |
| 100~299 | 견습 재판관 | ⚖️ |
| 300~599 | 정식 재판관 | 🏛️ |
| 600~999 | 숙련 재판관 | ⭐ |
| 1000~1999 | 원로 재판관 | 🌟 |
| 2000+ | 솔로몬 | 👑 |

### 5.5 유저 프로필 페이지

```
┌─────────────────────────────┐
│ 👑 닉네임        시즌 3      │
│ 솔로몬 (2,350 명성)         │
│                              │
│ ┌──────┬──────┬──────┐      │
│ │통찰 82│권위 78│지혜 85│      │
│ └──────┴──────┴──────┘      │
│                              │
│ 📊 통계                      │
│ 총 판결: 47건  |  평균: 76점  │
│ 최고: 94점 (neighbor-03)     │
│ 강점: 지혜  |  약점: 권위     │
│                              │
│ 🏆 명예의 전당               │
│ S1 총명성 3위 / S2 지혜 1위   │
│                              │
│ 🎖️ 칭호                     │
│ [전설적 재판관] [솔로몬] ...  │
│                              │
│ 📂 사건별 최고 기록           │
│ spouse-01: 94점 ★            │
│ spouse-02: 81점              │
│ neighbor-01: 88점 ★          │
│ ...                          │
└─────────────────────────────┘
```

---

## 6. DB 추가 테이블

### 6.1 다이아 + 거래

```sql
ALTER TABLE players ADD COLUMN diamonds INT DEFAULT 0;
ALTER TABLE players ADD COLUMN investigation_tokens INT DEFAULT 10;
ALTER TABLE players ADD COLUMN skill_points INT DEFAULT 3;
ALTER TABLE players ADD COLUMN season_pass BOOLEAN DEFAULT false;
ALTER TABLE players ADD COLUMN last_token_charge TIMESTAMPTZ DEFAULT now();

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  type TEXT NOT NULL,
  -- 'diamond_purchase' | 'diamond_exchange' | 'reward' | 'refund' | 'ad_reward'
  item TEXT NOT NULL,
  -- 'diamond_60' | 'token_10' | 'skill_5' | 'daily_login' | 'campaign_clear'
  diamonds_delta INT NOT NULL,
  diamonds_after INT NOT NULL,
  real_money INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tx_player ON transactions(player_id, created_at DESC);
```

### 6.2 명성

```sql
CREATE TABLE reputation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  season_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  best_score INT NOT NULL,
  reputation_points INT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(player_id, season_id, case_id)
);

-- 사건별 랭킹
CREATE INDEX idx_rep_case ON reputation(season_id, case_id, reputation_points DESC);

-- 총 명성 집계용
CREATE INDEX idx_rep_player_season ON reputation(player_id, season_id);

-- 총 명성 뷰
CREATE VIEW player_season_reputation AS
SELECT
  player_id, season_id,
  SUM(reputation_points) AS total_reputation,
  COUNT(*) AS cases_played,
  MAX(best_score) AS highest_score
FROM reputation
GROUP BY player_id, season_id;

-- 명성 등급 함수
CREATE OR REPLACE FUNCTION get_reputation_grade(rep INT)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE
    WHEN rep >= 2000 THEN '솔로몬'
    WHEN rep >= 1000 THEN '원로 재판관'
    WHEN rep >= 600 THEN '숙련 재판관'
    WHEN rep >= 300 THEN '정식 재판관'
    WHEN rep >= 100 THEN '견습 재판관'
    ELSE '수습 재판관'
  END;
END;
$$ LANGUAGE plpgsql;
```

### 6.3 명예의 전당 확장

```sql
-- 기존 hall_of_fame에 명성 카테고리 추가
-- category: 'total' | 'insight' | 'authority' | 'wisdom' | 'reputation'

-- 사건별 1위 기록
CREATE TABLE case_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  player_id UUID REFERENCES players(id),
  score_id UUID REFERENCES scores(id),
  nickname TEXT NOT NULL,
  score_value INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(season_id, case_id)
);

CREATE INDEX idx_case_records_season ON case_records(season_id);
```

```sql
-- players: 자기 데이터만 수정 가능
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "자기 프로필 읽기" ON players FOR SELECT USING (true);
CREATE POLICY "자기 프로필 수정" ON players FOR UPDATE USING (auth.uid() = id);

-- scores: 누구나 읽기, 자기만 쓰기
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "점수 읽기" ON scores FOR SELECT USING (true);
CREATE POLICY "점수 쓰기" ON scores FOR INSERT WITH CHECK (auth.uid() = player_id);

-- verdict_logs: 명예의 전당 등록자만 공개, 나머지는 자기만
ALTER TABLE verdict_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "자기 로그 읽기" ON verdict_logs FOR SELECT
  USING (score_id IN (SELECT id FROM scores WHERE player_id = auth.uid()));
CREATE POLICY "명예의 전당 로그 공개" ON verdict_logs FOR SELECT
  USING (score_id IN (SELECT score_id FROM hall_of_fame));
CREATE POLICY "로그 쓰기" ON verdict_logs FOR INSERT
  WITH CHECK (score_id IN (SELECT id FROM scores WHERE player_id = auth.uid()));

-- operation_logs: 서버만 쓰기, 읽기 불가
ALTER TABLE operation_logs ENABLE ROW LEVEL SECURITY;
-- (Edge Function에서만 접근)

-- transactions: 자기 거래만
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "자기 거래 읽기" ON transactions FOR SELECT USING (player_id = auth.uid());
CREATE POLICY "거래 쓰기" ON transactions FOR INSERT WITH CHECK (player_id = auth.uid());

-- reputation: 누구나 읽기, 자기만 쓰기
ALTER TABLE reputation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "명성 읽기" ON reputation FOR SELECT USING (true);
CREATE POLICY "명성 쓰기" ON reputation FOR INSERT WITH CHECK (player_id = auth.uid());
CREATE POLICY "명성 갱신" ON reputation FOR UPDATE USING (player_id = auth.uid());

-- case_records: 누구나 읽기
ALTER TABLE case_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "사건 기록 읽기" ON case_records FOR SELECT USING (true);
```

---

## 5. API 엔드포인트

### 5.1 점수 제출 (게임 완료 시)

```
POST /api/scores
Body: {
  case_id, relationship_type,
  insight, authority, wisdom, total,
  turns_used, free_questions_used, titles,
  verdict_log: { fact_findings, responsibility, ... }
}
Response: { score_id, rank_in_season }
```

### 5.2 리더보드 조회

```
GET /api/leaderboard?season=s1&sort=total&limit=50
GET /api/leaderboard?season=s1&sort=insight&relationship=spouse
GET /api/leaderboard/group/{invite_code}?season=s1
```

### 5.3 명예의 전당

```
GET /api/hall-of-fame?season=s1
GET /api/hall-of-fame/{season}/{category}/{rank}/log  (판단 로그 공개)
```

### 5.4 그룹

```
POST /api/groups  (생성, invite_code 반환)
POST /api/groups/join  (참여)
GET  /api/groups/{id}/members
```

### 5.5 유저 프로필 + 명성

```
GET  /api/profile/{player_id}
  → nickname, grade, total_reputation, stats, titles, hall_of_fame_entries

GET  /api/profile/{player_id}/cases
  → 사건별 최고 기록 목록

GET  /api/reputation/ranking?season=s1&limit=50
  → 총 명성 랭킹

GET  /api/reputation/case/{case_id}?season=s1&limit=20
  → 사건별 명성 랭킹
```

### 5.6 상점 + 다이아

```
POST /api/shop/purchase  (다이아 구매 — 앱스토어 영수증 검증)
  Body: { package_id, receipt }
  → { diamonds_added, diamonds_total }

POST /api/shop/exchange  (다이아 → 아이템)
  Body: { item: 'token_10' | 'skill_5' | 'skill_15' }
  → { diamonds_remaining, items_added }

GET  /api/shop/balance
  → { diamonds, investigation_tokens, skill_points }

POST /api/rewards/ad  (광고 시청 보상)
  Body: { reward_type: 'diamond' | 'token' }
  → { amount, remaining_daily }

POST /api/rewards/daily  (출석 보상)
  → { diamonds, streak_days, bonus }
```

---

## 6. 부정행위 방어

| 방어 | 방법 |
|------|------|
| 점수 범위 | 서버에서 0~100 체크 |
| 중복 제출 | 같은 case_id + 10초 이내 차단 |
| 비정상 속도 | turns_used < 3이면 차단 (너무 빨리 끝냄) |
| insight+authority+wisdom 평균 = total | 서버 검증 |
| Rate limit | player당 분당 5회 제출 제한 |
| 의심 기록 | operation_logs에 'suspicious' 이벤트 |

---

## 7. 클라이언트 연동 계획

### Phase 1: MVP (배포 즉시)
- Supabase 익명 인증
- 점수 제출 + 리더보드 조회
- localStorage 데이터를 서버로 마이그레이션 (최초 1회)

### Phase 2: 소셜
- Google/Kakao 로그인
- 친구 그룹 리더보드
- 명예의 전당 판단 로그 공유

### Phase 3: 운영
- 관리자 대시보드 (Supabase Dashboard 활용)
- 시즌 자동 전환 (Edge Function cron)
- 부정행위 모니터링

---

## 8. 비용 예측

| 규모 | DAU | DB 크기 | 비용 (월) |
|------|-----|---------|----------|
| 초기 | ~100 | < 100MB | **무료** (Supabase Free) |
| 성장 | ~1,000 | < 1GB | **$25** (Supabase Pro) |
| 확대 | ~10,000 | < 10GB | **$75** (Pro + 추가 용량) |

---

## 9. 마이그레이션 순서

1. Supabase 프로젝트 생성 + 테이블 생성
2. `src/api/supabaseClient.ts` 생성 (환경변수로 URL/키 관리)
3. `src/api/leaderboardApi.ts` 생성 (점수 제출/조회)
4. VerdictScreen에서 게임 완료 시 서버 제출 추가
5. LeaderboardScreen에서 서버 데이터 조회로 전환
6. 기존 localStorage 데이터 → 서버 업로드 (1회)
