# Solomon - 게임 진단 자료

이 폴더는 **Solomon** 게임의 구조와 내용을 외부 에이전트에게 공유하여 **재미 강화 조언**을 받기 위한 자료입니다.

## 파일 구성

| 파일 | 내용 |
|------|------|
| `01-game-concept.md` | 게임 핵심 컨셉, 장르, 타겟, USP, 설계 원칙 |
| `02-game-flow-and-phases.md` | 전체 게임 플로우, 9개 페이즈 상세, 페이즈 전환 조건 |
| `03-core-mechanics.md` | 질문/증거/기술 시스템, Discovery 4 메커닉, 감정 시스템 |
| `04-ai-and-lie-system.md` | AI 에이전트 아키텍처, 6단계 거짓말 상태머신, 7가지 거짓말 유형/동기 |
| `05-case-data-structure.md` | 사건 데이터 구조 + spouse-01 전체 샘플 |
| `06-scoring-and-progression.md` | 3축 채점, 칭호, 진행 시스템, 보상 |
| `07-engine-code-samples.md` | 핵심 엔진 코드 (거짓말 FSM, 감정, 증거, 판결, Discovery) |
| `08-content-scale.md` | 콘텐츠 규모, 7개 관계유형, 84사건, 캠페인 구조 |
| `09-tech-stack.md` | 기술 스택, 아키텍처, 상태 관리 |
| `10-actual-data-samples.md` | **실제 데이터 날것** — 사건 JSON, 거짓말 설정, 진실 정책, 증인 예산, Phase 1 스크립트, LLM 프롬프트 구성, 현재 AI 답변 문제 |

| `PROMPT-FOR-ADVISOR.md` | **에이전트에게 보낼 프롬프트** — 문제 상황, 요청 사항, 제약 조건 |

## 이 게임은?
- **장르**: LLM 심문 미스터리 / 내러티브 시뮬레이션
- **플레이어 역할**: 재판관 (판사가 아닌 조정관)
- **핵심 루프**: 두 AI 당사자를 심문 → 진실 발견 → 판결
- **세션 길이**: 10~20분
- **플랫폼**: 웹 (React + TypeScript)
- **AI**: OpenAI GPT-4o-mini (런타임 Phase 3~5 대화)
