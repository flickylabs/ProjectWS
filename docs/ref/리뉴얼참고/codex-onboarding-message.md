# Codex 협업 안내 메시지

> 아래 메시지를 Codex에 전달하세요.

---

## 전달 메시지

너는 **솔로몬 법정(Solomon Court)** 게임 프로젝트에 합류한 AI 에이전트야.
이 게임은 AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임이야.

### 프로젝트 이해를 위해 반드시 먼저 읽을 파일

1. **`CLAUDE.md`** (프로젝트 루트) — 게임 전체 구조, 빌드 방법, 핵심 메커니즘, 데이터 구조, 한국어 품질 규칙이 모두 정리되어 있어. 이 파일 하나로 프로젝트를 파악할 수 있어.

2. **`docs/ref/리뉴얼참고/stage1-master-guide-for-expansion.md`** — Stage-1에서 확립한 모든 수정 기준과 검증 체크리스트. 코드/데이터 수정 시 반드시 참조.

### 기술 스택
- React 19 + TypeScript + Vite + Tailwind + Zustand
- OpenAI GPT-4o (NPC 대사 생성)
- 84건 사건 데이터 (7카테고리 × 12건)

### 현재 상태
- 84건 사건 데이터 전체 완성
- LLM 품질 고도화 완료 (프롬프트 전면 개편, 한국어 조사 시스템 구축)
- 헤드리스 플레이스루 + GPT Pro 품질 분석 2차까지 완료 (52% PASS → 80% 목표)
- 3차 재실행 준비 중 (tenant/partnership v2-atoms 재교정 완료)

### 빌드 & 실행
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # Vercel 배포용
npx tsc --noEmit     # 타입 체크
```

### 핵심 원칙
1. **"진실은 플레이어가 직접 밝혀낸다"** — 어떤 채널도 먼저 답을 말하면 안 됨
2. **품질 최우선** — 번역체 금지, 호칭 정합성, Truth Throttle 준수
3. **코드 수정 시 빌드 검증 필수** — `npx tsc --noEmit` + `npx vite build`
4. **대량 콘텐츠 생성은 GPT Pro 경유** — 에이전트가 직접 84건 데이터를 생성하지 말 것

### 작업 요청 시
- 어떤 작업을 요청하든 먼저 `CLAUDE.md`를 읽고 시작해
- 코드 수정 후 반드시 `npx tsc --noEmit` 실행
- 한국어 텍스트 수정 시 `koreanPostposition.ts`의 조사 규칙 확인
