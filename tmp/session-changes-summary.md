# 세션 변경 일람 — 2026-04-25 Phase A~F

> 사용자 부재 중 진행한 작업 모음. 커밋은 사용자 OK 신호 후.

## ✅ 완료 단계

### Phase A — 즉시 픽스 (텍스트·용어)
- "셧다운" → "체념" 전 사용자 노출 7곳 통일 (`discoveryEngine.ts` / `PartyStatusBar.tsx` ×2 / `EmotionGuidePopup.tsx` / `CourtHeader.tsx` / spouse-01.json description)
- "감정 과부하로 응답을 거부합니다" → "체념 상태에 빠져 답변을 거부합니다" (`useDiscoveryIntegration.ts`)
- handleQuestion 가드 메시지: "감정 과부하 상태입니다" → "체념 상태입니다" + 우회 안내(다른 당사자 명시)
- "기회 지남" → "만료" (`PCDialogueLog.tsx`)
- `require is not defined` ESM 에러 픽스 (`useActionDispatch.ts` evidence discovery)

### Phase G — GPT Pro 산출물 적용 (총 217건 정정)
- **G-1 자동 적용** 177건 (spouse 33 / family 87 / friend 57). 100% 적용 (notFound=0)
- **G-2 검증 에이전트 1차** — 30건 sample 중 12건 재정정 적용
- **G-3 검증 에이전트 2차 (백그라운드)** — '그 판단을 피하지 않겠습니다' 스톡 문구 40건 다변화 적용 (spouse 15 / family 25). 4가지 권장 표현 + 변형으로 분배. 잔여 0건. `그X그X` 충돌 0건.
- 산출물: `tmp/apply-proposals-summary.json`, `tmp/verification-result.json`, `tmp/stock-phrase-rewrite-summary.json`

### Phase B — 체념(셧다운) 시스템 보강
- **B-1** lockoutUntil 카운트 정확화 — `+2` → `+3`. 정확히 2턴 차단 (현재 1턴만 작동하던 결함 해결)
- **B-2** 체념 만료 시 emotion 자동 격앙 전환 — `phaseSlice.ts incrementTurn` hook. 만료 턴에 emotion ≥ 85이면 75로 자동 조정 + 시스템 메시지. 즉시 재진입 무한 루프 차단
- **B-3** 체념 상태에서 증거 제시도 차단 — `handleEvidencePresent` 시작 가드 추가. 카운팅 안 됨
- **B-4** 우회 안내 메시지 — handleQuestion / handleEvidencePresent 모두 "다른 당사자 OOO에게 질문(증거 제시)하거나 다른 행동을 취해주세요" 명시

### Phase D — 재판관의 수첩 신설
- **신규 슬라이스** `judgeNotebookSlice.ts` — `JudgeNotebookEntry` 타입 (category: confession / critical_contradiction / key_statement) + addNotebookEntry(dedup) / markRead / clear
- **신규 컴포넌트** `JudgeNotebookSection.tsx` — 좌측 패널의 '재판관의 관찰' 아래에 위치
- **CSS** `pc.css`에 카테고리별 색상(자백 gold / 결정적 모순 red / 핵심 발화 blue), 읽음·미읽음 상태, 호버, 클릭 시 dialogue jump pulse
- **자동 등록 트리거는 Phase C 작업** (자백 시스템 인프라 구축 시 통합)

### Phase E — 모달/UX 일부
- **새 쟁점 발견 모달**:
  - 모달 내용 정정 — "새 단서가 갈래를 바꿨다"가 단순 발견 알림 톤이라, 이미 쟁점 보드에 추가된 상태에 맞게 "이 쟁점에 대한 심문과 증거 제시가 본격적으로 가능합니다" 안내 톤으로 변경
  - 액션 라벨 "쟁점 보드에 반영" → "확인했습니다"
  - **번개 이펙트 순서** — 모달이 띄워진 직후 발사하던 enqueueResonance/enqueueAura를 모달 dismiss 시점(action onSelect 내부)으로 이동. 모달 블러로 가려지던 결함 해소
- 다른 3종(contradiction, interjection, emotional_burst) 모달은 사용자가 명확히 보고 안 했으므로 emergence만 1차 적용 (필요 시 동일 패턴 적용)

### Phase F — 회귀/데이터 일부
- **잠금 시 표시명 수정** — `handleEvidencePresent` 시스템 메시지("증거 제시: ${name}", "새로운 증거를 손에 넣었다") + pushGameEvent. `deepInvestigated` 전이면 `surfaceName` 우선 사용. spouse-01 e-4의 경우 "형 문자 스레드" 대신 "발신자 미상 문자" 표시
- **emergence hook 호칭 결함 12건 정정** — `emergenceHooks.ts`에서 "박지연 씨/이준호 씨/송다은 씨/최수민 씨" 같이 NPC가 다른 NPC에게 "OOO 씨" 호칭 사용한 결함 일괄 정정 → callTerms 규칙(toJudge: "제 아내/제 남편/다은이/제 전 친구")으로 변경
- **emergenceHook 발화 source 배지** — addDialogue에 `source: 'script'` (hook 매칭 시) / `source: 'fallback'` (폴백 발화) 추가. 사용자가 보고한 "[SCRIPT]/[LLM] 둘 다 안 뜸" 결함 해소

---

## ⚠️ 미해결 / 사용자 결정 필요 사항

### 결함 1, 2 — atom 식별 루프 잔존
이전 세션에서 "재판관님, ~ 아니야?" / "재판관님, ~ 말해줄 수 없습니까?" 등 LLM 위반 발화 5건을 정확 grep으로 미식별 (코드에 없음). 후처리 룰로 1건만 적용.

### 결함 9 — "결정적 진술 확보 → 증거 게시판" 메시지 부적절
자백은 증거가 아닌데 게시판 안내. **Phase C 자백 시스템 재설계 시 함께 정리**. 자백 entry는 '재판관의 수첩'에 등록되도록 변경 예정.

### 결함 10 — 자백 → 사실추궁 시 비자금 자백 반복
자백 1회 제한 미구현. **Phase C에서 처리**.

### 결함 12 — atom 회피로 다른 쟁점 누설 (TC-5)
사용자 보고 6회째에 d-3 자백 발화 누출. atomSelectionEngine은 같은 disputeId 기반으로만 작동하므로 여기서 누출되는 건 **ScriptedText 매칭 시점에 다른 쟁점의 atom이 호출되는 것 같음**. 추후 ScriptedText 호출 키 검증 필요.

### 결함 17 — '확인'만 뜨는 시스템 메시지 ✅ 이번 세션 픽스
사용자 결정: '확인' 배지 제거. PCDialogueLog success 카테고리에서 action-badge 제거. 클릭 자체는 유지.

### 결함 23·24 — 모순 감지 모달 vs 구도 / 추궁 효과 시각화 → 사용자 결정 완료, 미적용
사용자 결정: **모순 감지 시 vs 구도로 변경 + 효과 시각화 필요**. 다음 세션 적용 (큰 UI 변경).

### 결함 26·27 — 모순 추궁/끼어들기 트리거 회귀 → 사용자 결정 완료, 미적용
사용자 보고: **모순 추궁은 그나마 발동되는데 끼어들기는 아예 발동 안 됨**. 끼어들기 트리거 조건/상황 구성 정리 필요. 다음 세션 적용.

### 결함 28 — 4-D 감정 폭발 클릭형 모달 미재현
사용자 dev 재현 시 추가 확인.

---

## 🔵 Phase C·D 트리거 통합 미적용

Phase D 인프라(슬라이스 + 컴포넌트)는 완료. 그러나 **자동 등록 트리거**는 Phase C 자백 시스템 재설계 시 통합:
- 자백 발동 시 → `addNotebookEntry({ category: 'confession', ... })`
- 결정적 모순 추궁 성공 시 → `addNotebookEntry({ category: 'critical_contradiction', ... })`
- S5 도달 + 구체 정보 노출 발화 → `addNotebookEntry({ category: 'key_statement', ... })`

GPT Pro 자백 패키지 (`gpt-pro-runs/confession-scripts/input/`) 작성 완료 — 사용자가 GPT Pro 의뢰 가능 상태.

---

## 📊 검증 통계

| 단계 | 변경 건수 |
|---|---|
| Phase A 텍스트·용어 | 11건 |
| Phase G-1 자동 적용 | 177건 |
| Phase G-2 검증 1차 | 12건 |
| Phase G-3 검증 2차(스톡) | 40건 |
| Phase B 코드 | 4건 |
| Phase D 신규 인프라 | 3 파일 |
| Phase E 모달 | 1건 |
| Phase F 데이터 | 14건 (호칭 12 + surfaceName 처리 2) |
| **총합** | **~263건 변경** |

---

## 🚦 다음 단계 (사용자 복귀 시)

1. **GPT Pro 자백 패키지 의뢰** — `gpt-pro-runs/confession-scripts/input/` 통째로 GPT Pro에 던지면 됨
2. **Phase C 자백 시스템 재설계 결정** — 새 기획(격앙→셧다운, 체념→자백) 적용 여부. `tmp/new-design-emotion-redesign.md` 참조
3. **dev 검증** — Phase B/D/E/F 변경 체감 + 잔존 결함 보고
4. **커밋 시점** — 사용자 OK 신호 후. 현재 워킹 트리: 코드 변경 + 데이터 변경(JSON) + 신규 파일 다수 untracked

## 📂 변경 파일 일람

### 코드 (수정)
- `src/store/slices/dialogueSlice.ts`
- `src/store/slices/phaseSlice.ts`
- `src/store/slices/judgeObservationSlice.ts`
- `src/store/useGameStore.ts`
- `src/hooks/useActionDispatch.ts`
- `src/hooks/useDiscoveryIntegration.ts`
- `src/engine/discoveryEngine.ts`
- `src/engine/llmDialogueResolver.ts`
- `src/engine/atomSelectionEngine.ts` (이전 세션)
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
- `src/components/pc/layout/PCDialogueLog.tsx`
- `src/components/pc/layout/PCDisputeRibbon.tsx`
- `src/components/pc/panels/PCLeftPanel.tsx`
- `src/components/court/PartyStatusBar.tsx`
- `src/components/discovery/EmotionGuidePopup.tsx`
- `src/components/layout/CourtHeader.tsx`
- `src/app/pc.css`

### 코드 (신규)
- `src/store/slices/judgeNotebookSlice.ts`
- `src/components/pc/observation/JudgeNotebookSection.tsx`

### 데이터 (수정)
- `src/data/scriptedText/spouse-01.json` (33+6+15 = 54건)
- `src/data/scriptedText/family-01.json` (87+6+25 = 118건)
- `src/data/scriptedText/friend-01.json` (57건)
- `src/data/cases/generated/spouse-01.json` (셧다운→체념)
- `src/data/emergenceHooks.ts` (호칭 12건)

### GPT Pro 폴더 (신규)
- `gpt-pro-runs/atom-script-tone-review/input/output/` — 산출물 도착 (sources/)
- `gpt-pro-runs/confession-scripts/input/` — Phase C 의뢰 패키지
