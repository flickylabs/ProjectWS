# GPT Pro 프롬프트 — spouse-v4-01 ScriptedText 생성

## 사용법

### Step 1: GPT Pro 프로젝트 세팅

`session-0-context/` 폴더의 **3개 파일**을 GPT Pro에 프로젝트 파일로 업로드하세요:
- `01-PROJECT-CONTEXT.md` — 사건/캐릭터/타임라인/증거/쟁점
- `02-QUALITY-RULES.md` — 품질 규칙 (Truth Throttle, 호칭, variant, 금지어)
- `03-OUTPUT-FORMAT.md` — JSON 출력 포맷 규격

### Step 2: 세션별 생성

각 세션 폴더의 `PROMPT.md`를 복사해서 GPT Pro에 보내면 됩니다.

| 세션 | 폴더 | 내용 | 예상 entry | 예상 variant |
|------|------|------|-----------|-------------|
| 1 | `session-1-d1-interrogation/` | d-1 심문 (오피스텔/전화) | 36 | 180 |
| 2 | `session-2-d2-interrogation/` | d-2 심문 (비자금 출금) | 36 | 180 |
| 3 | `session-3-hd3-interrogation/` | h-d3 심문 (적금 해지) | 36 | 180 |
| 4 | `session-4-hd4-interrogation/` | h-d4 심문 (누가 먼저) | 36 | 180 |
| 5 | `session-5-evidence-witness/` | 증거+증인+도시에+후일담+시스템 | ~81 | ~341 |
| **합계** | | | **~225** | **~1,061** |

### Step 3: 후처리

GPT Pro 출력 JSON을 받으면:
1. **Thread R**: 표현 다듬기 (한국어 품질 검수)
2. **Thread QW**: 검증 (체크리스트 기반)
3. **태그 자동 주입**: 후처리 스크립트로 tags, sourceRefs, id 자동 생성
4. **번들 조립**: 6개 채널을 spouse-v4-01.json으로 합침

---

## 세션 분할 기준

- **Session 1~4**: 쟁점별 분할 (각 쟁점 = A+B × S0~S5 × 3 질문유형)
- **Session 5**: 심문 이외 전체 (분량이 크면 5a/5b/5c/5d/5e로 분할)

## 파일 구조

```
gpt-pro-prompts/
├── README.md                          ← 이 파일
├── session-0-context/
│   ├── 01-PROJECT-CONTEXT.md          ← 사건/캐릭터/타임라인
│   ├── 02-QUALITY-RULES.md            ← 품질 규칙
│   └── 03-OUTPUT-FORMAT.md            ← JSON 출력 포맷
├── session-1-d1-interrogation/
│   └── PROMPT.md                      ← d-1 생성 지시 + 매핑
├── session-2-d2-interrogation/
│   └── PROMPT.md                      ← d-2 생성 지시 + 매핑
├── session-3-hd3-interrogation/
│   └── PROMPT.md                      ← h-d3 생성 지시 + 매핑
├── session-4-hd4-interrogation/
│   └── PROMPT.md                      ← h-d4 생성 지시 + 매핑
└── session-5-evidence-witness/
    └── PROMPT.md                      ← 증거+증인+기타 생성 지시
```
