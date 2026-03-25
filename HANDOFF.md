# 솔로몬 프로젝트 인수인계 문서

> 다른 PC의 Claude Code가 이 문서를 읽고 바로 작업을 이어갈 수 있도록 작성됨.
> 최종 업데이트: 2026-03-26

---

## 1. 프로젝트 개요

**솔로몬** — AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임 (H5 웹)

- **저장소**: https://github.com/flickylabs/ProjectWS
- **기술 스택**: React + TypeScript + Vite 8 + Tailwind CSS v4 + Zustand
- **LLM**: OpenAI GPT-4o-mini (실시간 대화) — `.env`에 `VITE_OPENAI_API_KEY` 설정 필요
- **사건 데이터**: ChatGPT 5.4 Pro 확장모드로 사전 생성 → JSON 파일
- **배포 준비**: Vercel (vercel.json 설정 완료, 아직 미배포)

---

## 2. 현재 완성 상태

### 완성된 것
- **GDD v2.0**: 7페이지 HTML 문서 (`docs/gdd/`)
- **전체 플레이 루프**: Phase 0(사건소개) → 1(초기진술) → 2(반박) → 3(심문) → 4(증거) → 5(재심문) → 6(중재안) → 7(판결) → Result
- **룰 엔진**: lieStateMachine, emotionEngine, trustEngine, evidenceEngine, verdictEngine, contradictionEngine
- **LLM 연동**: OpenAI GPT-4o-mini + LM Studio 이중 지원 (llmClient.ts)
- **사건 13개**: 하드코딩 1 + 부부 생성 12 (glob import 자동 인식)
- **UI**: 모바일 세로형, Pretendard 폰트, 사운드 10종, 타이핑 애니메이션
- **기능**: 캠페인 10 Stage, 칭호 12종, 분리심문, 증거 4축 + 조사 6종, 신뢰/보호 5종, 스킬 7종, 주장 그래프, 설정, 이력, 공유, PWA, 에러 바운더리
- **리소스 체크리스트**: Google Sheets 연동 HTML (`docs/resource_checklist/checklist.html`)
- **커밋 10회, 소스 77개 파일**

### 미완성 / 다음 단계

| 우선순위 | 작업 | 상태 |
|----------|------|------|
| **1** | 이웃(neighbor) 사건 12개 생성 | 프롬프트 준비됨 (`docs/prompts/batches/session2-neighbor-A~F.md`) |
| **2** | 직장/동업/가족/세입자/친구 사건 생성 | 프롬프트 준비됨 (session3~7) |
| **3** | Vercel 실제 배포 | vercel.json 준비됨, 계정 연결만 하면 됨 |
| **4** | 실 플레이테스트 (모바일) | 배포 후 가능 |
| **5** | BGM 3종 (법정/타이틀/결과) | 미구현. AI 음악 생성 권장 (Suno/Udio) |
| **6** | 이미지 리소스 제작 | 전부 이모지 대체 중. PWA 아이콘 SVG만 완성 |

---

## 3. 핵심 아키텍처 결정사항

### 3층 데이터 구조
```
DuoSeed (인물쌍, 게임 전체 유지)
  → ContextSeed (배경 압박, 한 판에만)
    → CaseSeed (사건 자체, 매 판 새로 생성)
```

### LLM 분업
- **사건 생성**: ChatGPT 5.4 Pro (사전 생성, JSON 파일)
- **실시간 대화**: OpenAI GPT-4o-mini API (턴당 호출)
- **판정**: 룰 엔진 (LLM 불필요, 서버 로직)

### 사건 자동 로드
- `src/data/cases/generated/` 폴더에 JSON 파일을 넣으면 **코드 수정 없이 자동 인식**
- `caseLoader.ts`가 `import.meta.glob('./generated/*.json')` 사용
- 정규화 자동 처리 (비표준 archetype, digitalHabit 등)

### 대사 시스템
- LLM 연결 시: `llmDialogueResolver.ts` → GPT-4o-mini 실시간 생성
- LLM 미연결 시: `dialogueResolver.ts` → 대사 트리 매칭 + 동적 폴백
- Phase 1~2: LLM 생성 또는 `generic-phase1.ts` 범용 대사
- 하드코딩 대사(`data/dialogues/`)는 `case-001`(민준&서연)에만 적용

---

## 4. 주요 파일 구조

```
src/
  app/App.tsx              — 전체 라우팅, 타이틀 화면
  types/                   — GDD v2.0 데이터 모델 (5개)
  engine/                  — 룰 엔진 12개 (lie, emotion, trust, evidence, verdict, dialogue, llm...)
  store/useGameStore.ts    — Zustand 6슬라이스 통합
  data/
    cases/
      generated/           — JSON 사건 파일 (자동 인식)
      caseLoader.ts        — glob import + 정규화
      minjun-seoyeon.ts    — 하드코딩 사건 1개
    dialogues/             — 하드코딩 대사 트리 (폴백용)
    campaign.ts            — 캠페인 10 Stage 정의
    titles.ts              — 칭호 12종
  components/
    layout/                — CourtLayout, TopBar, PhaseTransition, Tutorial, Settings, History, ErrorBoundary
    court/                 — PartyStatusBar, DialogueLog, DialogueEntry
    actions/               — ActionPanel, QuestionSelector, EvidencePresenter, TrustActionPanel, SkillPanel
    info/                  — DisputeChecklist, ClaimGraph, EvidenceBoard
    phase/                 — Phase0_CaseIntro, AutoDialoguePhase, Phase6_Mediation, CampaignScreen
    verdict/               — VerdictScreen (5단계 위자드), FactChecklist, ResponsibilitySlider, SolutionPicker, EvidenceLegality
    result/                — ResultScreen (5탭), ScoreBreakdown, TruthReveal, TitleReveal, Aftermath, ShareResult
  hooks/
    useActionDispatch.ts   — 플레이어 행동 → 상태 변경 파이프라인 (핵심)
    useValidActions.ts     — 질문 유효성 필터링
    useLocalStorage.ts     — 저장/설정
  engine/
    soundEngine.ts         — Web Audio API 합성음 10종

docs/
  gdd/                     — GDD v2.0 HTML 7페이지
  prompts/batches/         — 사건 생성 프롬프트 29개 (session1~7)
  resource_checklist/      — Google Sheets 연동 체크리스트
```

---

## 5. 환경 설정

### 새 PC에서 시작
```bash
git clone https://github.com/flickylabs/ProjectWS.git
cd ProjectWS
npm install
```

### .env 파일 생성 (gitignore됨)
```
VITE_OPENAI_API_KEY=sk-proj-...  # OpenAI API 키
```

### 실행
```bash
npm run dev    # http://localhost:5173
```

---

## 6. 사건 생성 작업 현황

### 완료
| 세션 | 관계 | 파일 | 상태 |
|------|------|------|------|
| 1 | 부부 (spouse) | spouse-01~12.json | ✅ 12/12 완료 |

### 미착수 (프롬프트 준비됨)
| 세션 | 관계 | 프롬프트 파일 | 사건 수 |
|------|------|-------------|---------|
| 2 | 이웃 (neighbor) | session2-neighbor-A~F.md | 12개 |
| 3 | 직장 (boss_employee) | session3-workplace-A~F.md | 12개 |
| 4 | 동업 (partnership) | session4-partnership-A~E.md | 10개 |
| 5 | 가족 (family) | session5-family-A~B.md | 12개 |
| 6 | 세입자 (tenant_landlord) | session6-tenant-A~B.md | 10개 |
| 7 | 친구 (friend) | session7-friend-A~B.md | 10개 |

### 사건 생성 방법
1. ChatGPT Pro 확장모드에서 새 대화 열기
2. `docs/prompts/batches/session{N}-{type}-A.md` 파일 내용 전체 복사 → 전송
3. JSON 배열 응답 → 두 사건을 분리 → `src/data/cases/generated/` 폴더에 저장
4. 파일명: `{type}-01.json`, `{type}-02.json` ... (예: `neighbor-01.json`)
5. 같은 대화에서 B~F 파일 순서대로 전송
6. **코드 수정 불필요** — glob import가 자동 인식

### JSON 분리 방법
- 응답이 `[ {사건1}, {사건2} ]` 배열로 옴
- `"caseId"` 로 검색 → 두 번째 `"caseId"` 바로 앞의 `},{` 에서 분리
- 또는 배열 통째로 저장 후 Claude에게 분리 요청

---

## 7. 알려진 이슈 & 주의사항

1. **API 키 노출**: 이전 대화에서 OpenAI API 키가 노출됨. 키 교체 권장.
2. **번들 사이즈**: JSON 12개 포함 시 ~160KB gzipped. 사건이 78개가 되면 lazy loading 필요.
3. **Phase 1~2 대사**: 생성 사건에서는 범용 대사(`generic-phase1.ts`) 또는 LLM 생성. LLM 없이 플레이하면 대사가 밋밋할 수 있음.
4. **하드코딩 대사 트리**: `data/dialogues/phase3-5.ts`는 `case-001`(민준&서연) 전용. 다른 사건은 동적 폴백 사용.
5. **비공개 진술**: 신뢰 루트에서 비공개로 나온 정보가 판결 근거로 바로 쓰이는 문제 — 비공개 플래그 미구현.

---

## 8. 리소스 체크리스트

`docs/resource_checklist/checklist.html` — 브라우저에서 열면 전체 리소스 현황 확인 가능.
Google Sheets 연동 설정 시 팀원과 실시간 공유 가능.

Apps Script 코드: `docs/resource_checklist/apps_script_code.js`

---

## 9. GDD 참조

`docs/gdd/solomon-index.html` — 브라우저에서 열면 GDD v2.0 전체 열람 가능.

주요 페이지:
- overview: 3층 아키텍처, USP, 디자인 원칙, LLM 분업
- case: DuoSeed, Ledger, Social Graph, 모듈 시스템
- generator: 48h 타임라인, 증거 4축, 드라마 비트, 파이프라인
- ai: 거짓말 2축, 감정 징후, 신뢰/보호, LLM 프롬프트
- mechanics: 질문 6종, 스킬, 중재안, 판결 3축
- content: 캠페인 Stage, 샘플 사건
- production: 기술 스택, 리스크, MVP 범위
