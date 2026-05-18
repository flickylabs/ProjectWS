# 출시 전 PC QA — 집중 테스트 케이스

작성일: 2026-05-19
대상 HEAD: `dfb50431` (Refine truth-leak detector channel scope...)
도구: `run-pc.bat` 또는 `simulator.bat`
환경: Windows 11, dev 빌드 또는 prod 빌드
주체: 사용자 직접 (시각/타이밍/체감 판단), 메인 세션 = fix 대기

---

## §0. 우선순위 + 시간 가이드

| Pri | 영역 | 추정 시간 | 목적 |
|---|---|---|---|
| **P0** | Park fix 검증 (TC-Park) | 30분 | 방금 commit한 회귀 fix가 실제 게임에서 의미 보존 |
| **P0** | family-01 dc-4 dossier 출생 비밀 (TC-Leak) | 10분 | 자동 검출된 잠재 누설 3건의 실제 노출 여부 |
| **P1** | Tutorial 11-step × 4 lang (TC-Tut) | 60분 | 신규 시스템 시각/카피/타겟 앵커 검증 |
| **P1** | Impact-VFX + verdict cutscene (TC-Impact) | 30분 | T3 climax 발동·체감, 컷씬 타이밍 |
| **P1** | Verdict review montage (TC-Review) | 15분 | Phase 6 → montage → cutscene → verdict 체인 |
| **P2** | Telemetry consent (TC-Tele) | 10분 | 동의 모달 + 이벤트 발화 (devtools 확인) |
| **P2** | 직접질문 spot (TC-FreeQ) | 30분 | 4 카테고리 현 동작 (Phase A/B/C 적용 전 baseline) |
| **P2** | 번역 자연성 spot (TC-Trans) | 60분 | 각 언어 무작위 발화 자연성 |

**총 P0+P1**: 약 2.5시간. P2 추가 시 4~5시간.

---

## §1. P0 — Park fix 검증 (TC-Park)

**배경**: spouse-01 h-d4 박지연 측 [102][104][106] judge 질문 EN/JA/ZH-CN 재번역됨 (commit 4411e5e9). 자연성 + 의미 보존을 게임 내 발화로 검증.

### TC-Park-01: 박지연 사실 추궁 [102] 발화 4언어

**Pre**: spouse-01 시작, Phase 3 진입, h-d4 dispute 노출 (dossier 조합으로 emerge), 박지연(party A) 타겟, 사실 추궁 메뉴 진입.

**Steps**:
1. KO 빌드로 박지연에게 d-4 사실 추궁 질문 5 variants 모두 청취
2. 언어 EN 전환, 동일 5 variants 청취
3. JA 전환, 동일
4. ZH-CN 전환, 동일

**Expected (각 언어 + variant)**:
- 질문 주체가 "남편의 은폐를 박지연이 어떻게 판단했는지" (KO 의미)와 일치
- "박지연 본인이 무엇을 숨겼는지" 단정형으로 뒤바뀌지 않음
- "what you hid and when" / "何をいつ隠したのか" / "你在何时隐瞒了什么" 같은 일반 placeholder 어색 표현 없음

**Pass**: 4 lang × 5 variants 모두 자연 + 의미 일치
**Fail**: 어느 하나라도 주체 뒤바뀜 / placeholder 잔류 / 어색 → 메인 세션 fix 의뢰

### TC-Park-02: 박지연 동기 탐색 [104] — 단정 회피 검증

**Pre**: TC-Park-01과 동일 + 동기 탐색 메뉴 진입.

**Steps**: 1~4 동일 (4 lang × 5 variants)

**Expected**:
- v[1] "남편의 숨김을 마주한 뒤..."에서 "상대가 먼저 숨겼다"는 단정 표현 없음
- 가정형 보존 (e.g., EN "what you regarded as your husband's concealment", JA "ご主人の隠し事に向き合った後")

**Fail**: 단정 표현 발견 시 [feedback_truth_leak_prohibition](memory) 잘못 패턴 #9 위배

### TC-Park-03: 박지연 공감 접근 [106] — 분노→책임 2단 구조

**Pre**: 동일

**Steps**: 동일

**Expected**:
- v[3] "분노 위에 본인이 시작한 일의 책임" 2단 구조 보존 (분노 인정 → 그 위 책임 인정)
- 호칭 "박지연 씨" 일관 (v[0]·v[4]은 외국어에서도 호칭 있음, v[1]~v[3]은 KO만 호칭 있을 수 있음 — 메모)

**Pass**: 분노/책임 분리 유지 + 외국어에서 v[2] EN의 "감정 vs 시점" 구분이 모호하면 P2 메모

---

## §2. P0 — family-01 dc-4 dossier 출생 비밀 직접 언급 (TC-Leak)

**배경**: truth-leak 스캐너가 family-01 dossier dc-4 questionText에서 "출생 비밀" 직접 언급 3건 검출. 메모리 정책 "dossier 카드 의미는 추상화" 위배 가능성. 실제 게임 내 노출 시점 확인.

### TC-Leak-01: family-01 dc-4 dossier 카드 questionText

**Pre**: family-01 시작, dossier 조합으로 dc-4 unlock (어머니 일기장 + 공증 메모 등).

**Steps**:
1. dc-4 dossier 카드 열기 → 윤정후(party B) 측 질문 q1 노출 확인
2. 표시되는 질문 텍스트 확인: "윤정후 씨, 형의 출생 비밀을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까?"
3. requiredLieState 진입 시점(S2~) 확인 — 어느 lieState에서 이 질문 등장하는지

**Expected (디자인 의도 확인)**:
- 만약 player가 dc-4 unlock 시점에 evidence로 "출생 비밀" 사실을 이미 인지했다면 → 노출 OK
- 만약 dc-4 unlock 후에도 NPC가 자백하기 전(S5 미만)이면 → "출생 비밀" 직접 언급은 메모리 정책 위배 가능

**Pass**: 디자인 의도 일치 (사용자 판단)
**Fail (수정 필요)**: 직접 언급이 노출 톤 위배 → dossier questionText 추상화 ("어머니 일기장에서 알게 된 사실" 등으로)

**참고**: 같은 questionText가 entries[18][19][20] 3 lieBand로 반복됨. 수정 시 3 entry의 questionText 동일 갱신 필요.

---

## §3. P1 — Tutorial 11-step × 4 lang (TC-Tut)

**배경**: spouse-01 튜토리얼 11 step 신규 (commit ae4203b1). 데이터 타겟 13개 앵커, 카피 4언어 26 key.

### TC-Tut-01: 11-step 순차 진행 (각 언어)

**Pre**: spouse-01 신규 진입, 튜토리얼 활성화.

**Steps (각 언어 4회 반복)**:
1. Step 1 (briefing-advance) — case brief에서 hand-pointer 위치, 메시지 카드, [시작] 버튼 클릭
2. Step 2 (initial-statement-acknowledge) — 진술 화면에서 [다음 진술] 또는 선택지 클릭, bodyVariants 정확 발동
3. Step 3 (dispute-focus-d1) — d-1 dispute chip 하이라이트, 클릭
4. Step 4 (target-select-b) — 캐릭터 슬롯 B 하이라이트, 클릭
5. Step 5 (question-fact) — 사실 추궁 패널 하이라이트, multi-target cycling, 질문 선택
6. Step 6 (evidence-investigate-e2) — e-2 증거 카드 또는 detail 패널 하이라이트, 조사 클릭
7. Step 7 (evidence-present-e2-to-b) — e-2 → 박지연 제시 버튼 하이라이트, 클릭
8. Step 8 (feedback-acknowledge) — 피드백 카드 하이라이트, 자동 dismiss
9. Step 9 (observation-hint) — 재판관 노트 섹션 하이라이트, 자동 dismiss
10. Step 10 (tutorial-complete) — 종료 메시지 + Flicky 마스코트 표시
11. Step 11 — 종료 후 일반 플레이 진입

**Expected (각 step)**:
- Hand-pointer 손가락 위치 정확 (메모리 design_tutorial_overlay_finalized: fingertip 37%, 13%)
- 메시지 카드 가독성 (블루 액센트, popup 애니메이션)
- 카피 UI 라벨 대괄호 통일 ([다음 진술] / [Next Statement] / [次の陳述] / [下一陈述])
- 다국어 톤 자연 (KO 존댓말, EN polite, JA 敬語, ZH 礼貌)

**Pass**: 11-step 순차 완료 + 시각/카피 자연
**Fail**: hand-pointer 잘못된 위치 / 앵커 못 찾음 / 메시지 끊김 / 다국어 카피 어색

### TC-Tut-02: 튜토리얼 skip/close/reopen

**Pre**: 튜토리얼 진행 중

**Steps**:
1. skip 버튼 클릭 → 튜토리얼 종료, 정상 플레이
2. 다시 spouse-01 진입 → 튜토리얼 자동 시작 안 함 (이미 완료/skip)
3. 설정에서 "튜토리얼 안내" 재실행 → 처음부터 다시
4. close-x 버튼 → 카드 접힘, reopen 버튼으로 복귀
5. 4언어 각각 동일 동작

**Pass**: skip/close/reopen 정상

---

## §4. P1 — Impact-VFX + Verdict cutscene (TC-Impact)

**배경**: T3 climax visualEffects + verdictEntryCutscene (commit 2259f4a9). spouse-01 h-d3가 T3 tier 마킹.

### TC-Impact-01: T3 climax 발동 — spouse-01 h-d3

**Pre**: spouse-01에서 h-d3 dispute가 emerge (dossier 조합 trigger). 첫 emerge 시점.

**Steps**:
1. h-d3 emerge 시점 관찰
2. 발동 효과 확인:
   - `screen-flash-dark` (다크 플래시)
   - `screen-shake-medium` (중간 쉐이크)
   - `vignette-strong` (강한 비네팅)
   - card-slam (피드백 카드)
   - big typography (impact 자막)
3. BGM ducking 확인 (`duckBgmForImpact` -30dB)
4. 효과 timing 자연성 평가

**Expected**:
- 1초 이내 모든 효과 동시 발동
- 자연 (과도하게 강하지 않고 약하지 않음)
- T3 하드캡 (1 per case)이라 같은 playthrough에서 재발동 안 함

**Pass**: 클라이맥스 느낌 + timing 자연
**Fail**: 효과 누락 / 너무 강함/약함 / 두 번 발동

### TC-Impact-02: 증거 hit major (evidence_hit_major)

**Pre**: Phase 3에서 결정적 증거 제시 (e.g., e-2 → 박지연)

**Steps**:
1. 증거 제시 → court beat 발동
2. `card-slam` + `portrait-shake` + `screen-shake-light` 확인
3. "결정적 단서" chip label 표시 확인

**Pass**: 카드 슬램 + 포트레이트 흔들림 + 살짝 쉐이크 모두 발동

### TC-Impact-03: verdict 진입 cutscene

**Pre**: Phase 5 평결 진입 직전 (Phase 6 mediation 완료 후).

**Steps**:
1. mediation 완료 시 review montage 종료
2. `verdictEntryCutscene` 발동: 블랙아웃 → gavel SVG → 플래시 → 2.5초 후 verdict 화면 전환
3. SFX (cutscene SFX) 발화
4. `emitVerdictEntryCutscenePlayed` telemetry 발화 (devtools 확인)

**Pass**: 2.5초 자연 timing + gavel/플래시 명확 + SFX 동기

---

## §5. P1 — Verdict review montage (TC-Review)

**배경**: Phase 6 mediation → review montage → cutscene → verdict 체인 (commit 2259f4a9).

### TC-Review-01: review montage 자동 진행

**Pre**: Phase 6 mediation 종료 시점

**Steps**:
1. mediation 결정 후 → `PCVerdictReviewMontage` 표시
2. 3 key evidence 카드 + collapsed lie count + unresolved disputes 차례로 노출 (애니메이션 stagger)
3. 4초 후 자동 진행 OR Esc/click skip

**Expected**:
- 4초 자동 진행 정확
- skip 즉시 동작
- 진행 후 `completeReview` 콜백 → `verdictEntryCutscene` 시작

**Pass**: 자동/skip 모두 정상, cutscene 자연 연결
**Fail**: montage 중 멈춤 / cutscene 미진입 / 정보 표시 누락

### TC-Review-02: skip 후 cutscene fast-forward

**Pre**: review montage 노출 직후

**Steps**:
1. ESC 또는 클릭 → 즉시 skip
2. cutscene 정상 발동 (skip해도 cutscene은 재생)

**Pass**: skip 후 cutscene 정상

---

## §6. P2 — Telemetry consent flow (TC-Tele)

**배경**: PCTelemetryConsentModal + funnelClient (commit 7b6a0c08).

### TC-Tele-01: 동의 모달 첫 진입

**Pre**: localStorage 클리어 (consent 미설정)

**Steps**:
1. 게임 첫 진입 → `PCTelemetryConsentModal` 표시 확인
2. 동의 → emit 활성, 거부 → emit 비활성
3. devtools Network에서 `/api/telemetry` 요청 확인 (동의 시만)

**Pass**: 모달 표시 + 선택 후 정상 동작

### TC-Tele-02: 핵심 이벤트 발화

**Pre**: 동의 후 spouse-01 1 playthrough

**Steps (devtools Network 또는 ConsentMode 확인)**:
1. `session_start` emit (PCApp 진입 시)
2. `phase_enter` × 6 (Pretrial → Investigation → Interrogation → Truth → Mediation → Result)
3. `truth_stage_changed` (NPC lieState transition 시)
4. `action_select` (질문/증거 제시 시)
5. `evidence_present_result` (제시 결과)
6. `verdict_submit` (평결 시 점수)
7. `session_end` (종료 또는 pagehide)

**Pass**: 7+ 이벤트 정확 발화 + 페이로드 caseId/phase 포함

---

## §7. P2 — 직접질문 4 카테고리 spot (TC-FreeQ)

**배경**: 현 시스템 baseline (직접질문 v2 Phase A/B/C 적용 전). 4 카테고리 응답 품질 검증.

### TC-FreeQ-01: 세계관 질문 (직업 / 가족)

**Pre**: spouse-01 Phase 3, 박지연 타겟

**Steps**:
1. "직업이 무엇입니까?" 입력
2. "가족 구성은 어떻게 되나요?" 입력
3. "취미가 있나요?" 입력

**Expected**:
- 사건 routing이 아닌 background 답변
- NPC archetype 톤 유지
- lieState 무관 일정 응답

**Fail**: 사건 routing되어 빈약/회피 응답 → Phase A worldFacts 데이터 필요

### TC-FreeQ-02: 사건 관련 + 진실 단계 기반

**Pre**: 박지연 S2 lieState

**Steps**:
1. "왜 그때 그 오피스텔에 갔습니까?" (d-1 surface)
2. "공동 적금을 누가 해지했습니까?" (h-d3 hidden)

**Expected**:
- d-1 질문: 박지연이 표면적 답변 (S2 수준 회피)
- h-d3 질문: dossier unlock 전이면 deflection, 후면 lieState 매트릭스 따라

**Pass**: lieState 매트릭스 정상 작동

### TC-FreeQ-03: 사건 관련 + 예민 (스포일러 위험)

**Pre**: 박지연 S1, h-d4 dossier 미unlock

**Steps**:
1. "위임장을 조작하셨습니까?" (hidden truth 직접 질문)
2. "투자 사기에 휘말렸나요?" (hidden truth 직접 질문)

**Expected**:
- NPC 또는 시스템이 deflection (직접 답변 회피)
- 진실 누설 0건 (guard.ts paraphrase 룰 정상)

**Pass**: 누설 없음
**Fail**: NPC가 진실 확인 답변 → [feedback_truth_leak_prohibition](memory) 위배

### TC-FreeQ-04: 게임 무관 / 메타

**Pre**: 임의 시점

**Steps**:
1. "오늘 날씨 어때요?"
2. "이 게임 어떻게 만들었나요?"
3. "다음에 만날 수 있을까요?"

**Expected**:
- off_topic_redirect 정상 (시스템 메시지 또는 NPC archetype 톤 deflection)
- 비용 / 턴 소모 없음

**Pass**: 자연 deflection, 게임 진행 영향 없음

### TC-FreeQ-05: 복합 질문

**Pre**: 박지연 Phase 3

**Steps**:
1. "왜 그때 전화 안 했고 누가 그렇게 결정했어요?" (intent 2개 — motive + responsibility)
2. "오늘 날씨도 좋은데 이준호 씨는 뭘 했어요?" (intent 2개 — off_topic + fact_pursuit)

**Expected (현 baseline)**:
- 한 intent로 collapse되어 부분 응답 (Phase B 분해 적용 전 한계)
- 빈약하더라도 누설 없음

**Pass**: 누설 0, 합리적 부분 응답
**Fail**: 두 질문 모두 무시 / 누설 / 시스템 crash

---

## §8. P2 — 번역 자연성 spot (TC-Trans)

**배경**: Phase 3 retranslated 결과 일반 자연성 (Phase 2 LQA threads의 사전 spot).

### TC-Trans-01: 케이스 시작 화면 (case_surface_content)

**Pre**: 각 케이스 시작 화면

**Steps (4 lang × 3 case = 12회)**:
1. case_brief 화면 (party 이름/직업/관계 표시)
2. 도입 narration 표시 (system_message 채널)

**Expected**:
- 인명 표기 일관 (Park Ji-yeon / Lee Jun-ho / Yoon Tae-seong / Yoon Jeong-hu 등 glossary)
- 직업/관계 자연 어휘
- archetype 라벨 자연 ("Vulnerable Witness" / "脆弱な証人" / "脆弱的证人" 등)

**Fail**: 어색 어휘, 직역 영어, JA 가타카나 부적절, ZH 한국어식 어순

### TC-Trans-02: Phase 3 인터로게이션 무작위 5문 (각 언어)

**Pre**: spouse-01 Phase 3 진입

**Steps**:
1. 박지연/이준호에게 무작위 5 질문 × 4 lang = 20 발화
2. KO 원본 발화 의미와 외국어 발화 의미 일치 여부 (수동 검증)

**Expected**:
- 답변 자연성 (모국어 화자 시각)
- 의미 nuance 보존
- 톤 일관 (NPC archetype에 일치)

**Fail**: 의미 뒤바뀜 / 어색 / 직역 → Phase 2 LQA thread β1~9 추가 검출 필요

### TC-Trans-03: 평결 결과 화면

**Pre**: 1 playthrough 완료

**Steps**:
1. 평결 점수 화면 4 lang × 3 결과 (유죄/무죄/조정)
2. aftermath narration 4 lang

**Expected**: 자연 표현, 점수 포맷 정확

---

## §9. 환경 / 도구

### 실행
- **Dev 빌드**: `npm run dev` 또는 `run-pc.bat`
- **Prod 빌드 + 정확 simulator**: `simulator.bat` (메모리 권장)
- **devtools**: F12 → Network / Console에서 telemetry 이벤트 확인

### 언어 전환
설정 화면 → 언어 (4 lang 즉시 전환 가능)

### 케이스 초기화
- localStorage 클리어: devtools Application → Local Storage → 삭제
- 또는 새 시크릿 창

### 발견 사항 보고 포맷

각 TC 실패 시 메인 세션에 알림:

```
[FAIL TC-XXX-NN] {짧은 제목}
- 언어: KO / EN / JA / ZH-CN
- 케이스: spouse-01 / family-01 / friend-01
- Phase: 1~6
- 재현 절차: ...
- 관찰된 동작: ...
- 기대 동작: ...
- 스크린샷/로그: (가능하면)
```

---

## §10. 후속 작업 연결

PC QA 발견 사항 분류:
- **P0 즉시 fix**: 메인 세션 또는 Codex 직접 의뢰 (Park 패턴)
- **P1 Phase 2 LQA에 통합**: 9 lang × case Codex β thread가 검토할 행 목록에 추가
- **P2 polish backlog**: docs/design/backlog_deferred.md 또는 별도 issue

---

**참조 메모리**:
- [feedback_truth_leak_prohibition](memory) — 잘못 패턴 #9
- [design_tutorial_overlay_finalized](memory) — 튜토리얼 디자인 권위
- [feedback_tutorial_copy_tone](memory) — 튜토리얼 카피 톤
- [design_vfx_inventory_pc](memory) — VFX 인벤토리
- [session_handoff_20260519_post_lqa_phase0](memory) — 현재 세션 핸드오프
