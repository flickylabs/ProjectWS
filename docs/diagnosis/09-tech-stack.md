# 9. 기술 스택 & 아키텍처

## 프론트엔드
- **React 19** + **TypeScript**
- **Vite 8** (빌드 도구)
- **Tailwind CSS v4** (스타일링)
- **Zustand 5** (상태 관리, 슬라이스 패턴)

## 백엔드
- **Express.js** (API 서버)
- **SQLite** (better-sqlite3)
- 12개 API 라우트: aiAgents, aiBlocks, aiDataFields, aiPrompts, caseMeta, eval, llmLog, mail, notices, players, seasons, stats

## LLM 통합
- **OpenAI GPT-4o-mini** (런타임 Phase 3~5 대화)
- **GPT Pro** (사전 생성: 84개 사건 + 168개 스크립트)
- **Claude Code** (텍스트 정제, 구조 검수, 개발 전반)

## 비주얼
- **MS Fluent Emoji** (81종, 256×256 PNG)
- 캐릭터/장면은 이모지 기반 (별도 일러스트 없음)

## 사운드
- **Web Audio API** (음향 합성)
- BGM 4트랙 + SFX 9종 (MP3)

## 상태 관리 (Zustand 8 Slices)

```
useGameStore
├── phaseSlice      — 현재 페이즈, 턴 카운트, 전환 조건
├── dialogueSlice   — 대화 이력, 현재 대화 노드
├── evidenceSlice   — 증거 상태 (잠금/해제/제시)
├── discoverySlice  — Discovery 4 메커닉 상태 (v7.0 신규)
├── agentSlice      — AI 에이전트 상태 (거짓말, 감정, 신뢰)
├── resourceSlice   — 플레이어 리소스 (토큰, 통제력)
├── shopSlice       — 글로벌 리소스, 캡
└── verdictSlice    — 판결 입력, 점수
```

## 주요 엔진 파일 (20개, 361KB)

| 파일 | 크기 | 역할 |
|------|------|------|
| llmDialogueResolver.ts | 68KB | LLM 대화 생성 메인 |
| discoveryEngine.ts | 16KB | Discovery 4 메커닉 |
| dialogueResolver.ts | 15KB | 대화 노드 선택 (폴백) |
| llmFreeQuestion.ts | 14KB | 자유 질문 처리 |
| witnessEngine.ts | 12KB | 증인 소환/증언 |
| llmCaseGenerator.ts | 10KB | AI 사건 생성 |
| llmSpeechGuide.ts | 7.7KB | 말투 가이드 |
| verdictEngine.ts | 6.5KB | 판결 채점 |
| soundEngine.ts | 5.1KB | 오디오 재생 |
| lieStateMachine.ts | 4.9KB | 거짓말 상태머신 |
| llmPhaseDialogue.ts | 4.9KB | 페이즈 대화 |
| evidenceEngine.ts | 4.3KB | 증거 관리 |
| emotionEngine.ts | 3.4KB | 감정 시스템 |
| contradictionEngine.ts | 3.8KB | 모순 탐지 |
| rewardEngine.ts | 3.5KB | 보상 시스템 |
| trustEngine.ts | 923B | 신뢰 계산 |
| evalRunner.ts | 7KB | 평가 모드 |
| llmClient.ts | 4.1KB | OpenAI API 래퍼 |
| llmTestimonyAnalysis.ts | 2.3KB | 증언 분석 |

## 데이터 파일 규모

| 파일 | 크기 | 내용 |
|------|------|------|
| caseEnrichmentData.ts | 850KB | 증인 말투 샘플, 상성 데이터 |
| truthPolicy.ts | 568KB | 쟁점별 진실 평가 정책 |
| witnessBudget.ts | 267KB | 증인별 증언 예산 |
| evalCases.ts | 35KB | 평가 테스트 케이스 |
| 84 generated JSON | ~3MB | 84개 사건 데이터 |
| 84 phase1-input JSON | ~2MB | Phase 1 대화 입력 |
| 121 refined JSON | ~4MB | 정제된 사건 데이터 |

## 배포
- **Vercel** (프론트엔드)
- **PWA** (manifest.json + sw.js)
- **localStorage** (로컬 세이브)
- Supabase (온라인 리더보드, 계획 중)
