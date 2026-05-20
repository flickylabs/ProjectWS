# Tutorial Additions — 2026-05-20 다국어 검토 대기

본 세션(2026-05-20 evening)에 PCTutorialOverlay tutorial flow 변경에서 추가/수정된 i18n entries 추적. Claude가 KO 작성과 함께 EN/JA/ZH-CN 4 lang 1차 번역을 직접 작성했으므로 [[feedback-claude-ko-needs-codex-multilang]] 규칙에 따라 **Codex 톤/의미 검토 대상**.

## 작업 컨텍스트

- 본 세션 commit: `492820e3 Overhaul spouse-01 tutorial: click completion + new view/close steps`
- 변경 파일: `src/i18n/messages/tutorial.ts` (KO / EN / JA / ZH-CN 4 블록 동기 수정)
- 영향 흐름: spouse-01 튜토리얼 21 step (기존 19에서 evidence-view-open + evidence-view-close 2건 추가)

## 검토 대상 entries (8 key × 4 lang = 32 string)

| key | 종류 | 비고 |
|---|---|---|
| `pc.tutorial.spouse01.dispute-focus-d1.title` | 개정 | 기존 "쟁점 선택" → "쟁점 살펴보기" 류 (후속 question-dispute-select와 의미 충돌 해결) |
| `pc.tutorial.spouse01.dispute-focus-d1.body` | 개정 | "골라주세요"(선택) → "확인해봐요"(살펴보기) 톤 전환 |
| `pc.tutorial.spouse01.evidence-detail-open.title` | 개정 | 기존 "증거 열람" 류 → "증거 정보" 류 (신규 evidence-view-open과 충돌 회피) |
| `pc.tutorial.spouse01.evidence-view-open.title` | 신규 | SVG viewer 직접 열기 단계 제목 |
| `pc.tutorial.spouse01.evidence-view-open.body` | 신규 | `[증거 열람]` 대괄호 라벨 = `pc.interaction.openEvidence`와 정확 일치 검증 |
| `pc.tutorial.spouse01.evidence-view-close.title` | 신규 | SVG viewer 닫기 단계 제목 |
| `pc.tutorial.spouse01.evidence-view-close.body` | 신규 | `[×]` 기호 (4 lang 공통) |
| `pc.tutorial.spouse01.tutorial-complete.body` | 개정 | 끝에 `[화면을 클릭하면 시작해요]` 류 click prompt 추가 |

전체 항목 CSV: [`batches/batch_26_tutorial_session_20260520.csv`](../non-dialogue-extract/batches/batch_26_tutorial_session_20260520.csv) — 기존 batch_24/25 컨벤션 동일.

## 검토 기준

1. **톤 일관성** — [[feedback-tutorial-copy-tone]] 준수
   - 존댓말 + Flicky 마스코트 친근한 안내자 톤
   - 명령조 / 신문체 / 어린 톤 회피
   - "~해주세요" / "~해볼까요?" / "~좋아요" 패턴
   - 자유 선택 안내 시 "어떤 ~이든 좋아요" 명시

2. **대괄호 UI 라벨 정확 일치**
   - `[증거 열람]` / `[Open Evidence]` / `[証拠を開く]` / `[打开证据]`
   - cross-ref: `src/i18n/messages/layout.ts:445/948/1451/1954` (`pc.interaction.openEvidence`)
   - 불일치 시 사용자가 화면에서 찾기 어려움 = P0

3. **4 lang 동등 의미 (KO 기준)**
   - EN/JA/ZH-CN이 KO 의미를 손실 없이 전달
   - 단순 직역 X — 각 언어 자연 발화 우선
   - 예: KR "~봐요" → EN "let's check" 류 친근체

4. **자연 발화** ([[feedback-natural-korean-vs-translationese]])
   - 신문체 / 번역체 회피
   - 각 언어 native speaker가 자연스럽게 들리는 표현

## 검토 의뢰 절차

본 entries는 진행 중인 **Release Final QA Q2 thread** (`codex/q2-i18n-audit`) 범위에 포함:

- 의뢰서: `docs/design/release-final-qa/master-brief.md` §Q2
- spawn 명령: `docs/design/release-final-qa/spawn-instructions.md`
- 출력: `reports/release-final-qa/i18n-audit.csv` (P0 발견 시 src/i18n/messages/tutorial.ts 직접 patch + commit)

Q2 thread가 별도로 실행되지 않을 경우, 위 CSV(`batch_26_tutorial_session_20260520.csv`)를 standalone Codex thread로 의뢰 가능:

```
docs/localization/tutorial-additions-20260520/README.md 검토 기준에 따라
docs/localization/non-dialogue-extract/batches/batch_26_tutorial_session_20260520.csv
의 6 key × 4 lang을 audit하고 필요 시 src/i18n/messages/tutorial.ts patch.
```

## 적용 후 검증

- `npx tsc -b --force` exit 0
- `npm run qa:fast` RELEASE READY
- 사용자 dev (http://localhost:5173/index-pc.html)에서 spouse-01 튜토리얼 직접 재현 (`localStorage.removeItem('solomon.tutorial.spouse01.v1')` 후 새로고침)
- 4 lang 각각 전환 (`PCLanguageMiniSelect`) 후 21 step 표시 자연스러움 spot-check

## 관련 메모리

- [[feedback-claude-ko-needs-codex-multilang]] — Claude KO 수정 = Codex 다국어 의뢰 필수 (사고 학습)
- [[feedback-tutorial-copy-tone]] — 친근한 안내자 카피 톤 권위
- [[design-tutorial-overlay-finalized]] — PCTutorialOverlay UX 권위 (본 세션 변경 반영됨)
- [[feedback-natural-korean-vs-translationese]] — 자연 한국어 우선
