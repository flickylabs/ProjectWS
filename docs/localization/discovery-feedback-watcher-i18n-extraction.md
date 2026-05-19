---
name: discovery-feedback-watcher-i18n-extraction
description: DiscoveryFeedbackWatcher.tsx 인라인 KO 카피를 i18n 키로 추출 + 4언어 번역. 이전 Codex pc-qa-round2-followup result(2b2c7801)의 후속 권장 영역.
metadata:
  origin: claude (CT main thread)
  anchor: 5aa37f55
  predecessor: 08b0027f (pc-qa-round2-followup, Phase6_Mediation i18n 추출 패턴 baseline)
---

# DiscoveryFeedbackWatcher.tsx i18n 추출 의뢰서

Anchor: `5aa37f55`
선행 사례: `08b0027f` = Phase6_Mediation.tsx에서 인라인 KO → `pc.mediation.entry.*` 4언어 키 추출 패턴 적용.
본 의뢰서 = 동일 패턴을 DiscoveryFeedbackWatcher.tsx에 적용.

---

## 1. 배경

`src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`는 PC 플레이 화면의 핵심 피드백 컴포넌트로, Discovery emergence / 모순 발견 / 끼어들기 / 감정 실수 / 진실 공방 / 판단 충돌 등 다수의 system message + feedback card를 생성한다.

이전 LQA β 적용(64724457)과 후속 batch(058ad3d5)에서 P0 3건 / P1 chain body는 KO만 polish 적용했지만, **컴포넌트 자체의 인라인 KO 하드코딩 영역은 i18n 키 추출이 안 된 상태**.

Codex pc-qa-round2-followup result 문서 §4 "인라인 KO 컴포넌트 결정":
> `DiscoveryFeedbackWatcher.tsx`: PC가 KO-only라는 뜻은 아니다. 이 컴포넌트가 생성한 runtime feedback/dialogue 텍스트는 `EventFeedbackCard`와 `PCDialogueLog`에서 `localizeRuntimeText(...)`를 거친다. 다만 message-key 기반 i18n보다 추적성이 낮으므로 후속으로 runtime pattern coverage 점검 또는 key migration을 권장한다.

본 의뢰서 = **key migration 경로** 채택. runtime localization 의존도를 줄이고 i18n message key 표준으로 통합.

---

## 2. 작업 범위

### 2.1. 대상 파일

- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx` (전체 KO 리터럴 sweep)
- `src/i18n/messages/court.ts` (또는 신규 message 파일) — 신규 키 추가
- 영향 받을 수 있는 영역: `EventFeedbackCard.tsx` / `PCDialogueLog.tsx` (runtime localization 우회 시 변경 없음 확인)

### 2.2. 추출 대상 KO 리터럴 (1차 inventory — 전수 sweep 권장)

확인된 1차 리터럴 (line 번호 = 현재 main HEAD 기준):

| 영역 | line | KO 텍스트 |
|---|---:|---|
| dispute axis intro | 95 | `${axis}을/를 중심으로 양측 설명이 어디서 갈라지는지 확인합니다.` |
| 진실 공방 card | 209 | eyebrow `'진실 공방'` |
| 판단 충돌 card | 297 | eyebrow `'판단 충돌'` |
| VS big typography | 306 | `'VS'` |
| 충돌 정보 라벨 | 310, 315 | `'새 충돌 정보'` |
| 사건 시각 변화 hook | 391 | `'사건이 완전히 다르게 보인다'` |
| 사건 시각 변화 hook | 396 | `'어디서부터 어긋났을까'` |
| 새 쟁점 big typo | 407 | `'새로운 쟁점'` |
| 쟁점 emergence card | 419 | eyebrow `'새 쟁점 발견'` |
| 쟁점 emergence card | 422 | subtitle `'"${unlockSourceName}"을/를 확인하는 과정에서 다른 쟁점이 보입니다'` |
| 쟁점 emergence card | 423 | subtitle fallback `'확인해야 할 범위가 넓어졌습니다'` |
| 쟁점 emergence body | 425 | body (chain context, pp이가 적용됨) |
| 쟁점 emergence body | 426 | body fallback `'아직 결론은 아닙니다. 관련 기록과 진술을 더 확인한 뒤, 쟁점으로 다룰지 판단해주세요.'` |
| 쟁점 emergence card | 427 | tag `'쟁점 보드 갱신'` |
| 쟁점 emergence sysMsg | 439, 440 | `'"${unlockSourceName}"을/를 확인하는 과정에서 새 쟁점이 드러났다 - ${disputeName}'` / `'새 쟁점이 드러났다 — ${disputeName}'` |
| 쟁점 emergence card pending | 463 | eyebrow `'새 쟁점 발견'` |
| 쟁점 emergence card pending | 469 | tag `'쟁점 보드 + 재판관 수첩'` |
| 감정 실수 card | 596 | eyebrow `'감정 실수 포착'` |
| 모순 추궁 통함 | 702 | `'💥 모순 추궁이 통했습니다 — ${effectSummary.join(' / ')}'` |
| 모순 추궁 차단 | 716 | `'🔒 ${partyName}${pp이가(partyName)} 모순 추궁의 충격으로 답변을 거부합니다. (2턴간 질문 불가)'` |
| 진술 엇갈림 sysMsg | 772 | `'진술이 엇갈렸다 — ${partyName} · ${disputeName}'` |
| 모순 발견 card | 778 | eyebrow `'모순 발견'` |
| contrast 블록 라벨 | 752, 753 | `'이전 진술'`, `'지금 진술'` (fallback) |
| 모순 contrast body fallback | 780 | `CONTRADICTION_SURFACE_FALLBACK` (별도 상수) |
| 모순 reason 블록 | 782 | `'왜 어긋나는지'` |
| 발언 허용 (judge) | 819 | `'발언을 허용합니다.'` |
| 끼어들기 차단 (judge) | 833 | `'${partyName} 씨, 지금은 발언 순서가 아닙니다. 심문을 계속합니다.'` |
| 끼어들기 sysMsg | 845 | `'${partyName}${pp이가(partyName)} 끼어들려 한다 — ${disputeName}'` |
| 끼어들기 card | 851 | eyebrow `'끼어들기'` |
| outburst lieState jump sysMsg | 907 | `'감정이 격해지며 더 솔직한 진술이 나왔다 - ${disputeName} 단계 ${currentLie} → ${afterLie}'` |
| outburst press judge | 917 | `'계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.'` |
| outburst calm judge | 945 | `'잠시 진정하고, 사실만 다시 정리해 주세요.'` |
| follow-up | 920, 948 | `buildEmotionalBurstFollowUp('press' \| 'calm', boolean)` (별도 함수 호출 — 본문 sweep 필요) |

추가: `CONTRADICTION_SURFACE_FALLBACK` 상수 / `buildEmotionalBurstFollowUp(...)` 함수도 같은 파일에 KO 리터럴 보유. **전수 sweep 시 함께 처리**.

### 2.3. 키 네이밍 권장

`pc.discovery.feedback.*` namespace 사용. 예시:

| 영역 | 권장 키 |
|---|---|
| dispute axis intro | `pc.discovery.feedback.dispute.axisIntro` (`{axis}` placeholder + 조사 helper) |
| 진실 공방 card eyebrow | `pc.discovery.feedback.confrontation.eyebrow` |
| 판단 충돌 card eyebrow | `pc.discovery.feedback.conflict.eyebrow` |
| 새 충돌 정보 label | `pc.discovery.feedback.conflict.newInfoLabel` |
| VS label | `pc.discovery.feedback.conflict.vs` |
| 시각 변화 hook | `pc.discovery.feedback.viewShift.hookA` / `hookB` |
| 새로운 쟁점 typo | `pc.discovery.feedback.emergence.bigType` |
| 쟁점 emergence eyebrow | `pc.discovery.feedback.emergence.eyebrow` |
| 쟁점 emergence subtitle (chain) | `pc.discovery.feedback.emergence.subtitleChain` (`{sourceName}` + 조사) |
| 쟁점 emergence subtitle (fallback) | `pc.discovery.feedback.emergence.subtitleFallback` |
| 쟁점 emergence body (chain) | `pc.discovery.feedback.emergence.bodyChain` |
| 쟁점 emergence body (fallback) | `pc.discovery.feedback.emergence.bodyFallback` |
| 쟁점 emergence tag | `pc.discovery.feedback.emergence.tag` |
| 쟁점 emergence sysMsg | `pc.discovery.feedback.emergence.sysMsgChain` / `sysMsgFallback` |
| 쟁점 emergence card pending tag | `pc.discovery.feedback.emergence.tagWithJudge` |
| 감정 실수 eyebrow | `pc.discovery.feedback.emotionMistake.eyebrow` |
| 모순 추궁 통함 | `pc.discovery.feedback.contradiction.success` (`{effects}` placeholder) |
| 모순 추궁 차단 | `pc.discovery.feedback.contradiction.blocked` (`{party}` placeholder + 조사) |
| 진술 엇갈림 sysMsg | `pc.discovery.feedback.contradiction.sysMsg` (`{party}` `{dispute}` placeholders) |
| 모순 발견 eyebrow | `pc.discovery.feedback.contradiction.eyebrow` |
| 모순 contrast 이전 진술 | `pc.discovery.feedback.contradiction.previousLabel` |
| 모순 contrast 지금 진술 | `pc.discovery.feedback.contradiction.currentLabel` |
| 모순 reason 블록 | `pc.discovery.feedback.contradiction.reasonLabel` |
| judge: 발언 허용 | `pc.discovery.feedback.judge.allowSpeak` |
| judge: 끼어들기 차단 | `pc.discovery.feedback.judge.rejectInterject` |
| 끼어들기 sysMsg | `pc.discovery.feedback.interject.sysMsg` |
| 끼어들기 eyebrow | `pc.discovery.feedback.interject.eyebrow` |
| outburst lieState jump | `pc.discovery.feedback.outburst.lieJump` |
| outburst press judge | `pc.discovery.feedback.outburst.pressJudge` |
| outburst calm judge | `pc.discovery.feedback.outburst.calmJudge` |
| outburst follow-up | `pc.discovery.feedback.outburst.followUp.{mode}.{hasLine}` (4 조합 또는 함수 유지) |

배치 권장: `src/i18n/messages/court.ts` (기존 `pc.mediation.entry.*` 패턴과 통합) 또는 신규 `src/i18n/messages/discovery.ts` 분리.

### 2.4. 조사 helper 처리

KO에는 `pp이가(disputeName)` / `pp을를(unlockSourceName)` / `pp이가(partyName)` 등 조사 헬퍼 사용 중. i18n 키 추출 후 처리 옵션:

- **Option A**: i18n template에 placeholder `{particle}` 추가 → 컴포넌트에서 `pp이가(name)` 결과를 substitute. KO만 의미 있고 EN/JA/ZH-CN은 빈 문자열 또는 무시.
- **Option B**: KO 전용 fixPostpositions(`{name}이(가)` 같은 placeholder) 사용 후 후처리. 기존 `src/engine/koreanPostposition.ts`의 `fixPostpositions` 함수 활용.
- **Option C**: 키 자체를 받침 유무로 분기 (예: `*.subtitle.withFinal` / `withoutFinal`). 키 수 증가.

권장: **Option B**. `fixPostpositions` 함수가 이미 `{name}이(가)` 같은 placeholder를 처리. i18n 적용 후 출력 텍스트에 `fixPostpositions` wrap.

### 2.5. 4언어 번역 작성

추출된 모든 키에 대해 EN / JA / ZH-CN 번역 추가. 톤 가이드:

- **KO**: 현재 상태 유지 (LQA β + 후속 polish 반영 완료된 상태)
- **EN**: terse + system message tone. 게임 시스템 안내 어조. `pc.mediation.entry.*` 패턴 참고.
- **JA**: 体言止め + 自然 system tone. 합쇼체 회피.
- **ZH-CN**: 简体 + 自然 system tone.

진실 누설 회피: `feedback_truth_leak_prohibition` 정책 — surface 키워드만 사용. evidence/dossier는 surfaceName으로 표시. NPC 자백 전 진실 콘텐츠 직접 언급 금지.

조사 placeholder (`{name}이(가)` 같은) 영역은 EN/JA/ZH-CN에서 자연 위치 분리.

---

## 3. 작업 환경

### 3.1. 별도 worktree

```bash
git fetch
git worktree add D:/solomon-discovery-i18n -b codex/discovery-feedback-i18n 5aa37f55
cd D:/solomon-discovery-i18n
```

### 3.2. 진입 조건

- working tree clean
- HEAD = `5aa37f55`

### 3.3. 메모리 컨텍스트 (정독 권장)

본 thread는 메모리 시스템 직접 접근 X (Codex). 의뢰서에 핵심 정책 첨부:

- **자연 한국어**: 임팩트 카피/시스템 메시지에서 무형명사 능동동사 패턴(`이유가 거칠게 쏟아진다`) 회피. KO는 polish 완료 상태 유지.
- **진실 누설 금지**: evidence는 surfaceName만. dossier 카드 의미는 추상화. 자백 전 진실 콘텐츠 직접 언급 X.
- **튜토리얼 카피 톤**: Flicky 친근한 안내자. 단 본 컴포넌트는 시스템 메시지 영역으로 Flicky 톤 X, 합쇼체/관찰자 톤.

---

## 4. 작업 단계

1. **전수 sweep**: DiscoveryFeedbackWatcher.tsx + 관련 helper (`buildEmotionalBurstFollowUp` / `CONTRADICTION_SURFACE_FALLBACK` 등) 전체 KO 리터럴 식별.
2. **키 inventory**: 위 §2.3 권장 네이밍 따라 키 인벤토리 작성. 또는 더 자연스러운 네이밍 제안.
3. **i18n 추가**: `pc.discovery.feedback.*` 키를 court.ts 또는 신규 discovery.ts에 4언어 entry로 추가.
4. **컴포넌트 refactor**: `useI18n()` 또는 동등 hook 사용. 조사 helper는 `fixPostpositions` 또는 `pp이가` / `pp을를` 유지.
5. **runtime localization 우회 확인**: EventFeedbackCard / PCDialogueLog에서 `localizeRuntimeText(...)` 거치는 영역이라면 i18n 키로 추출한 메시지가 이중 처리 안 되도록 검증.
6. **검증**: tsc / qa:fast / qa:lqa.

---

## 5. 산출물

### 5.1. Commit 분리 권장

- commit 1: i18n 메시지 추가 (court.ts 또는 discovery.ts)
- commit 2: DiscoveryFeedbackWatcher.tsx refactor (i18n 적용)
- commit 3 (있다면): runtime localization 정리

### 5.2. 결과 문서

`docs/localization/discovery-feedback-watcher-i18n-extraction-result.md`:
- 추출된 키 일람 (KO + 3언어)
- runtime localization 영역 정리 결과
- 회귀 검증 결과 (tsc / qa:fast / 게임 플레이 spot-check 권고)

---

## 6. 검증

```bash
npx tsc -b --noEmit                       # 타입 검증
npm run qa:fast                           # P0=0 유지
node scripts/detect-truth-leak.cjs        # family-01 3건 baseline
npm run qa:lqa                            # KO/EN/JA/ZH-CN 누적 strict (기존 60,463건 + 본 키 증가분)
```

**참고**: qa:lqa는 현재 60,463건 누적 baseline. 본 batch가 신규 키 추가 시 verify-translations의 empty translation issue 카운트가 증가할 가능성 — 그러나 4언어 모두 entry 추가하면 0 증가. **신규 키는 반드시 4언어 entry 추가 필수**.

---

## 7. 안전 규칙

- ✅ READ from `src/`
- ✅ WRITE to `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
- ✅ WRITE to `src/i18n/messages/court.ts` (또는 신규 `discovery.ts`)
- ❌ scriptedAngles / scriptedText / cases generated 영역 수정 (Phase 1 thread 영역)
- ❌ origin/main push

---

## 8. 병렬 안전

본 thread 진행 중 메인 세션이 동시에 다음 작업 가능:
- A-3 phase 2 tutorial anchor 배선 (PCRightPanel.tsx / PCImportantNotesSection.tsx)
- runtimeText.generated.ts typo fix
- truth-leak matrix 확장 (matrix.json만 수정)

LQA Phase 1 thread (D:/solomon-lqa-phase1)와도 영역 disjoint.
