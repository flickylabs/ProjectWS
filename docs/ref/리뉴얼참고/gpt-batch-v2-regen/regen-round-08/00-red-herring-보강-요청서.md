# Structure V2 — Red Herring 보강 요청서

## 배경

V2 배치(structure-v2) 84건 중 약 41건에서 `disputeKind: "red_herring"`이 0개입니다.
`shared_misconception`은 존재하지만 **red_herring이 없으면 M0~M4 함정 해소 메커닉이 비활성화**되어 게임플레이 핵심 루프가 빠집니다.

이 요청은 **structure-v2 전체 재생성이 아니라, dispute 1개의 disputeKind 변경 + misconception 블록 추가**만 수행하는 부분 보강입니다.

---

## 작업 범위

**변경 대상**: 첨부된 `{{CASE}}-structure-v2.json`의 dispute 블록 중 1개

**변경 내용**:
1. `sub_truth` dispute 1개를 `red_herring`으로 변경
2. 해당 dispute에 `misconception` 블록 추가
3. 나머지 structure 전체 유지 (evidence, freeQuestionHooks, phase3LogHints, 다른 dispute 등)

**변경하지 않는 것**:
- beats-v2-full.json (이번 요청 범위 밖)
- 다른 dispute의 disputeKind, depthLayers, linkEdges
- evidence timing
- freeQuestionHooks

---

## 변경할 dispute 선정 기준

첨부된 **사건원본 JSON**과 **structure-v2.json**을 참조하여:

1. 현재 `sub_truth`인 dispute 중에서 **오해/착각/가짜 쟁점으로 전환 가능한 것**을 선택
2. 선정 우선순위:
   - 한쪽 당사자가 잘못된 정보로 믿고 있는 쟁점
   - 겉으로 보면 중요해 보이지만 실제로는 핵심이 아닌 쟁점
   - 증거로 해소 가능한 오해가 자연스러운 쟁점
3. `core_truth`는 절대 변경하지 않음
4. `shared_misconception`도 변경하지 않음 (이미 양측 오해 역할)

---

## 변경 작업 상세

### Step 1: disputeKind 변경
```json
"disputeKind": "sub_truth"  →  "disputeKind": "red_herring"
```

### Step 2: misconception 블록 추가

해당 dispute 객체에 `misconception` 필드를 추가합니다:

```json
"misconception": {
  "beliefModeByParty": {
    "a": "knows" | "suspects" | "misbelief",
    "b": "knows" | "suspects" | "misbelief"
  },
  "stages": [
    { "state": "M0", "summary": "외형상 의심 — 겉증거가 먼저 눈에 들어온 단계", "npcMode": "confused_defensive" },
    { "state": "M1", "summary": "방어/당황 — 의심을 사실처럼 말하기 시작", "npcMode": "mistaken_certainty" },
    { "state": "M2", "summary": "잘못된 해석 고착 — 잘못된 인과를 굳혀 버린 단계", "npcMode": "mistaken_certainty" },
    { "state": "M3", "summary": "혼란/확신 약화 — 자료 모순이 보이며 확신이 흔들리는 단계", "npcMode": "doubt_creeping" },
    { "state": "M4", "summary": "오해 해소 — 실제 맥락이 드러나는 단계", "npcMode": "clarified" }
  ],
  "trapSignals": [
    "함정 신호 1 — 겉으로 그럴듯해 보이는 가짜 단서",
    "함정 신호 2 — 맥락 없이 보면 의심을 키우는 정보",
    "함정 신호 3 — 편견/선입견을 강화하는 단편 증거"
  ],
  "truthExitEvidenceIds": ["e-X", "e-Y"]
}
```

**필드별 규칙**:
- `beliefModeByParty`: 양측 중 **누가 알고 누가 오해하는지** 사건 맥락에 맞게 설정
  - `"knows"` — 진실을 알고 있음
  - `"suspects"` — 의심은 하지만 확신 없음
  - `"misbelief"` — 잘못 믿고 있음
- `stages`: M0~M4 5단계 필수. summary는 **이 사건의 구체적 맥락**으로 작성 (범용 문구 금지)
- `trapSignals`: 2~4개. **이 쟁점이 왜 함정인지** 구체적으로 설명
- `truthExitEvidenceIds`: 이 오해를 해소하는 데 필요한 evidence ID (기존 structure-v2의 evidence 목록에서 선택)

### Step 3: depthLayers 조정 (선택)

red_herring으로 변경된 dispute의 depthLayers summary를 오해 해소 맥락에 맞게 미세 조정합니다.
- `surface.summary`: "~이 왜 그럴듯하게 보였는지" 방향
- `core.summary`: "가짜 쟁점을 벗겨 실제 맥락을 확인" 방향

---

## 출력 형식

사건별 1개 파일:
- `{{CASE}}-structure-v2-patched.json` — 전체 structure-v2 JSON (변경된 dispute 포함)

**중요**: 나머지 dispute, evidence, freeQuestionHooks, phase3LogHints는 원본 그대로 유지해서 전체 JSON을 출력해 주세요.

---

## 참고: 정상 red_herring 예시 (spouse-03, d-3)

```json
{
  "id": "d-3",
  "disputeKind": "red_herring",
  "disputeAliases": ["백화점 승인 알림", "정장 필수", "복장 가이드", "복지비 보전", "사치 오해", "수습 복장", "잠금화면 캡처", "교통 준비비"],
  "misconception": {
    "beliefModeByParty": { "a": "knows", "b": "misbelief" },
    "stages": [
      { "state": "M0", "summary": "겉증거가 먼저 눈에 들어온 단계", "npcMode": "confused_defensive" },
      { "state": "M1", "summary": "의심을 사실처럼 말하기 시작한 단계", "npcMode": "mistaken_certainty" },
      { "state": "M2", "summary": "잘못된 인과를 굳혀 버린 단계", "npcMode": "mistaken_certainty" },
      { "state": "M3", "summary": "자료 모순이 보이며 확신이 흔들리는 단계", "npcMode": "doubt_creeping" },
      { "state": "M4", "summary": "실제 맥락과 요청 주체가 드러나는 단계", "npcMode": "clarified" }
    ],
    "trapSignals": [
      "잠금 화면 승인 알림 크롭본",
      "품목과 보전 여부가 비어 있는 알림",
      "백화점 상호만 보고 사치로 읽히는 편견"
    ],
    "truthExitEvidenceIds": ["e-3", "e-4"]
  }
}
```

---

## ID 규칙 (기존과 동일)

- 구분자는 콜론(`:`) — 점/언더스코어/하이픈 금지
- caseId 접두사에 하이픈 없음: `family03`, `friend05` (O) / `family-03` (X)
- 새로 추가하는 atom ID가 있으면 `proposedUnlockAtoms`에 추가

---

## 최종 체크리스트

- [ ] 선택한 dispute가 원래 `sub_truth`였는지 확인
- [ ] `disputeKind`를 `"red_herring"`으로 변경
- [ ] `misconception` 블록 5필드 완비 (beliefModeByParty, stages M0~M4, trapSignals, truthExitEvidenceIds)
- [ ] `stages`의 summary가 **이 사건 맥락에 맞는 구체적 문구**인지 확인
- [ ] `trapSignals`가 2~4개이고 사건별 구체적인지 확인
- [ ] `truthExitEvidenceIds`가 기존 evidence 목록에 있는 유효한 ID인지 확인
- [ ] depthLayers summary가 red_herring 맥락에 맞게 조정되었는지 확인
- [ ] 다른 dispute / evidence / freeQuestionHooks / phase3LogHints가 원본 그대로인지 확인
- [ ] 출력이 유효한 JSON인지 확인

---

## 특수 사건 참고

### neighbor-02, neighbor-11, neighbor-12 (배치 오류 사건)

이 3건은 이미 `red_herring` disputeKind가 있지만 **배치 오류로 인해 misconception 블록 정합성 점검이 필요**합니다.
- 기존 misconception 블록이 있으면: 내용 검증 후 문제 없으면 그대로 유지
- 기존 misconception 블록에 누락/오류가 있으면: 수정하여 출력
- 변경이 없더라도 검증 완료 표시와 함께 전체 JSON을 출력

### tenant-09 (shared_misconception 부재 + red_herring 부재)

이 사건은 `shared_misconception`도 없고 `red_herring`도 없습니다 (kinds: core_truth, core_truth, sub_truth, sub_truth, sub_truth).
- `sub_truth` 1개를 `red_herring`으로 변경하는 것에 더해
- 가능하다면 다른 `sub_truth` 1개를 `shared_misconception`으로 변경하고 misconception 블록 추가도 고려

---

## 이번 라운드 대상 사건

- tenant-05
- tenant-06
- tenant-08
- tenant-09


각 사건의 기존 structure-v2.json + 사건원본.json이 첨부되어 있습니다.
사건별로 `{{CASE}}-structure-v2-patched.json`을 출력해 주세요.
