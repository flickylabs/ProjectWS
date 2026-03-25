# ⚖️ 솔로몬

**AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임**

서로를 비난하는 두 AI 당사자를 심문하고, 증거를 조사하고, 판결을 내리세요.
같은 인물이라도 매번 다른 사건이 벌어집니다.

## 실행

```bash
npm install
npm run dev
```

http://localhost:5173 접속

## 기술 스택

- **프론트엔드**: React + TypeScript + Vite + Tailwind CSS v4
- **상태 관리**: Zustand (슬라이스 패턴)
- **LLM**: OpenAI GPT-4o-mini (실시간 대화) — `.env`에 `VITE_OPENAI_API_KEY` 설정
- **사건 데이터**: ChatGPT Pro 사전 생성 JSON
- **사운드**: Web Audio API 합성음

## 프로젝트 구조

```
src/
  app/          — App, main, CSS
  types/        — TypeScript 타입 정의 (GDD v2.0 기반)
  engine/       — 룰 엔진 (lie, emotion, trust, evidence, verdict, LLM)
  store/        — Zustand 6슬라이스 (phase, agent, resource, evidence, dialogue, verdict)
  data/         — 사건 JSON, 대사 트리, 캠페인, 칭호
  components/   — React 컴포넌트
  hooks/        — useActionDispatch, useValidActions, useLocalStorage
  utils/        — 상수

docs/
  gdd/          — GDD v2.0 HTML 문서
  prompts/      — 사건 생성 배치 프롬프트
  resource_checklist/ — 리소스 체크리스트 (Google Sheets 연동)
```

## 게임 흐름

```
타이틀 → Phase 0 사건소개 → Phase 1 초기진술 → Phase 2 반박
→ Phase 3 심문 → Phase 4 증거 → Phase 5 재심문
→ Phase 6 중재안 → Phase 7 판결 → 결과(점수/진실/칭호/후일담/공유)
```

## 환경 변수

```env
VITE_OPENAI_API_KEY=sk-your-key    # GPT-4o-mini 대화용 (없으면 대사 트리 폴백)
```

## 사건 추가

`src/data/cases/generated/` 폴더에 JSON 파일을 넣으면 자동 인식됩니다.

## 라이선스

Private
