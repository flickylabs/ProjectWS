# 게임 개선 정리: 번역, 튜토리얼, 임팩트, 퍼널

작성일: 2026-05-18

## 현재 이해

이 프로젝트는 플레이어가 재판관 역할을 맡아 A/B 양측의 진술, 증거, 증인, 숨은 쟁점을 대조하고 최종 판단을 내리는 PC/Steam용 법정 갈등 시뮬레이션이다.

현재 핵심 흐름은 대략 다음과 같다.

1. 홈/사건 선택
2. 브리핑
3. 초기 진술/선택지
4. 심문: 대상, 쟁점, 질문 타입 선택
5. 증거 조사 및 제시
6. 숨은 쟁점, 감정 누설, 판단 충돌, 증인/조합 이벤트 처리
7. 조정 또는 판결
8. 결과/후일담/재판관 성장

Spouse-01의 중심 구조는 “남편의 오피스텔 방문과 새벽 전화”라는 외도 의심에서 시작하지만, 실제로는 가족 돌봄, 개인 비자금, 아내의 공동 적금 해지와 위임장 조작으로 책임 축이 뒤집히는 사건이다. 초반 유저가 길을 잃는 이유는 이 게임의 재미가 “정답 클릭”이 아니라 “쟁점-증거-질문-상태 변화의 연결”에 있는데, 그 연결 규칙이 첫 플레이에서 충분히 드러나지 않기 때문이다.

## 1. 번역 추출

추출 스크립트를 추가했다.

- 스크립트: `scripts/extract-non-dialogue-text.cjs`
- 전체 감사 CSV: `docs/localization/non-dialogue-extract/non_dialogue_text_inventory.csv`
- 1차 번역용 CSV: `docs/localization/non-dialogue-extract/translation_priority_inventory.csv`
- GPT Pro 전달 브리프: `docs/localization/non-dialogue-extract/gpt-pro-translation-brief.md`

추출 결과:

| 구분 | 행 수 |
| --- | ---: |
| 전체 감사 목록 | 21,324 |
| 1차 번역 우선 목록 | 19,203 |

1차 번역 우선 목록의 범위:

| 카테고리 | 행 수 |
| --- | ---: |
| non_party_scripted_text | 5,875 |
| case_surface_content | 4,594 |
| judge_question_script | 4,080 |
| hardcoded_source_literal | 3,422 |
| ui_i18n_message | 979 |
| witness_testimony | 180 |
| phase_dialogue_judge_choice | 33 |
| question_angle_catalog | 28 |
| mediation_judge_line | 12 |

포함한 것:

- UI, 시스템 메시지, 패널, 버튼, 툴팁
- 사건 메타, 인물 프로필, 쟁점, 증거명, 증거 내용, 증거 뷰어 텍스트
- 판사 질문, 판사/시스템/증인/후일담/조정/마일스톤 계열 비당사자 스크립트
- Phase 1의 시스템 내레이션과 재판관 선택지
- 활성 조정 경로의 재판관 멘트
- 증인 질문/증언/행동 힌트
- `src/i18n`/`src/data` 밖에 남아 있는 한국어/CJK 하드코딩 문자열

제외한 것:

- `speaker: "a"` 또는 `speaker: "b"`인 Phase 1 대화
- `speaker: "a"` 또는 `speaker: "b"`인 조정 대화
- `party: "a"` 또는 `party: "b"`인 scriptedText 엔트리
- `*_interrogation_answers*.json`
- 내부 ID, schema key, tag, enum, 파일 경로성 문자열

권장 번역 흐름:

1. GPT Pro 5.5 Web에 `translation_priority_inventory.csv`와 `gpt-pro-translation-brief.md`를 전달한다.
2. 결과 CSV는 동일 행 순서와 동일 컬럼을 유지하고, `en`, `ja`, `zh-CN`만 교체한다.
3. Codex에서 결과 CSV를 받아 실제 소스 파일에 반영한다.
4. placeholder 보존, 누락 키, CJK 잔류, UI overflow를 자동 검증한다.
5. `npm run check:all`과 PC 화면 QA를 돌린다.

Codex와 GPT Pro 5.5 역할 분리:

- Codex 강점: 코드 맥락 파악, 추출, 일괄 반영, placeholder/키 검증, UI 레이아웃 QA.
- GPT Pro 5.5 Web 강점: 대량 번역의 문체 일관성, 문화권별 용어 선택, 자연스러운 현지화 리뷰.
- 결론: “번역 품질 최종 생산”은 GPT Pro 5.5 Web에 맡기고, “적용/검증/수정 루프”는 Codex가 맡는 흐름을 추천한다. 소량의 용어 정리나 특정 UI 묶음 재작성은 Codex에서도 가능하지만, 19k행 전체를 한 번에 현지화 품질까지 보장하는 작업은 별도 번역 패스를 두는 편이 안전하다.

## 2. Spouse-01 튜토리얼

목표는 첫 플레이어가 다음 연결을 한 번 직접 경험하게 하는 것이다.

쟁점 선택 → 대상 선택 → 질문 타입 선택 → 증거 조사 → 증거 제시 → 상태 변화/새 쟁점 확인 → 기록 확인

구현 방향:

- `tutorialSlice` 또는 `tutorialStore`를 추가한다.
- `PCTutorialOverlay`를 `PCCourtLayout` 최상단에 붙인다.
- target은 `data-tutorial-target` 또는 기존 `data-guide-target`을 사용한다.
- overlay는 전체를 어둡게 덮고, 현재 target만 밝게 뚫거나 target rect 위에 glow ring을 얹는다.
- 손가락/포인터 아이콘은 target 근처에 배치한다.
- target 외부 클릭은 막되, `Skip tutorial`은 항상 제공한다.
- 완료 조건은 단순 클릭이 아니라 실제 게임 상태 변화로 판정한다.
- 저장 키는 `localStorage["solomon.tutorial.spouse01.v1"]` 정도로 두고, 재플레이 시 설정에서 다시 켤 수 있게 한다.

추천 Step:

| Step | Target | 완료 조건 | 안내 의도 |
| --- | --- | --- | --- |
| 1 | 브리핑 진행 버튼 | 재판 화면 진입 | 사건은 먼저 요약을 읽고 시작한다 |
| 2 | 대화 로그/다음 진술 | 초기 진술 선택지 도달 | 말풍선과 선택지가 기록으로 남는다는 점 |
| 3 | 쟁점 리본 `d-1` | `d-1` 포커스 | 지금 다루는 질문 축을 고른다 |
| 4 | 대상 선택 B | target이 B | 같은 쟁점도 누구에게 묻느냐가 다르다 |
| 5 | `사실 추궁` | 질문 1회 실행 | 사실 확인 질문의 기본 사용법 |
| 6 | 좌측 증거 `블랙박스 GPS 기록` | 증거 viewer open/investigate | 증거는 조사해야 깊어진다 |
| 7 | `증거 제시` | e-2를 B에게 제시 | 증거는 대상과 쟁점에 맞춰 써야 한다 |
| 8 | 피드백 카드 | 새 정보/상태 변화 acknowledge | 결과 팝업은 단순 알림이 아니라 다음 행동의 힌트다 |
| 9 | 재판관 관찰/수첩 | 관찰 또는 수첩 열람 | 중요한 변화가 기록되는 위치 |
| 10 | 종료 | 첫 숨은 쟁점 발현 또는 증거 제시 성공 | 이후부터 자유 플레이 |

초기 튜토리얼은 너무 길면 역효과가 난다. 첫 버전은 Step 1~8까지만 강제하고, Step 9~10은 “선택 안내”로 처리하는 편이 좋다.

필요한 코드 작업:

- `src/store/slices/tutorialSlice.ts` 추가
- `src/components/pc/tutorial/PCTutorialOverlay.tsx` 추가
- `src/app/pc.css`에 spotlight/glow/hand pointer 스타일 추가
- `PCBottomDock`, `PCLeftPanel`, `PCDisputeRibbon`, `EventFeedbackCard`, `PCCaseBrief`에 tutorial target 부여
- `useActionDispatch`나 store mutation 지점에서 tutorial step completion event emit

## 3. 게임성/임팩트 강화

현재 코드에는 이미 아래 기반이 있다.

- `src/engine/vfxHierarchyEngine.ts`: 컷씬/라이트닝 쿨다운과 빈도 제한
- `src/engine/presentationEngine.ts`: 이벤트 기반 VFX/SFX
- `src/components/pc/feedback/EventFeedbackCard.tsx`: 중요 피드백 카드/컷씬 카드
- `src/components/pc/observation/ResonanceLayer.tsx`: 라이트닝/공명 연결선
- `src/engine/soundEngine.ts`: 컷씬, 라이트닝, court beat 사운드

따라서 핵심은 새 VFX 시스템을 만드는 것이 아니라, “클라이맥스 비트에 기존 시스템을 더 과감하게 연결”하는 것이다.

### 임팩트 계층

| Tier | 용도 | 연출 |
| --- | --- | --- |
| T0 Micro | hover, 선택 가능, 미세 상태 변화 | glow, pulse, 짧은 tick |
| T1 Action | 질문 실행, 증거 조사, 약한 실패 | 카드 반응, 작은 사운드 |
| T2 Breakthrough | 새 증거, 효과적 증거 제시, 조합 성공 | 라이트닝, 카드 slam, 짧은 shake |
| T3 Climax | 새 쟁점, S5 붕괴, 결정적 모순, 판결 진입 | full-screen cut-in, 강한 shake, BGM duck, portrait reaction |

가장 먼저 강화할 이벤트:

| 이벤트 | 현재 문제 | 수정 제안 |
| --- | --- | --- |
| 새 쟁점 등장 | “알림 하나”처럼 지나가면 클라이맥스가 약하다 | 화면 0.6초 freeze, 강한 shake, 쟁점명 대형 타이포, 쟁점 리본으로 라이트닝 연결 |
| 증거 hard hit | 증거를 맞게 쓴 쾌감이 약하다 | 증거 카드 slam → 상대 초상 흔들림 → 쟁점 gauge 상승을 한 컷으로 연결 |
| S4/S5 붕괴 | 자백이 그냥 다음 대사처럼 보이면 손해 | 초상 어둡게, truth gauge 파열, “방어 붕괴” 컷인 후 자백 출력 |
| 판단 충돌 | 게임의 핵심 재미인데 긴장감이 부족할 수 있다 | 좌우 주장 split-screen, 중앙 VS, 유지/수정 선택을 판결 도장처럼 연출 |
| 조합 성공 | 퍼즐 연결 쾌감이 약하다 | 두 카드에서 수첩/쟁점으로 전기선 연결, 결과 노드가 보드에 박히는 연출 |
| 판결 진입 | 마무리가 평평하면 기억에 안 남는다 | 판결 전 3초 기록 몽타주: 핵심 증거, 붕괴한 주장, 남은 미해결 표시 |

Spouse-01 전용 클라이맥스 비트:

1. `d-1` 초반: 블랙박스/GPS/영수증은 외도 의심을 강하게 만든다. 여기서는 “의심의 확증” 연출을 준다.
2. `e-4` 발신자 미상 문자와 `e-1` 영수증 묶음이 맞물릴 때: 외도가 아니라 가족 돌봄일 수 있다는 해석 전환을 강하게 보여준다.
3. `d-2` 남편 계좌 출금 등장: 단순 외도 사건에서 돈 문제로 판이 커지는 순간.
4. `h-d3` 공동 적금 해지/위임장 조작 등장: 책임 축이 뒤집히는 핵심 반전. 이 비트는 가장 강한 T3 연출이 필요하다.
5. 판결 전: 남편의 은폐, 아내의 계좌 감시, 아내의 위임장 조작을 “순서”로 보여주는 짧은 타임라인 컷이 필요하다.

주의점:

- 모든 이벤트를 강하게 만들면 피로하다. T3는 사건당 4~6회 이하로 제한한다.
- 강한 컷씬은 플레이어 선택 직후 또는 새 판단 축이 열릴 때만 사용한다.
- 단순 정보 알림은 관찰/수첩 쪽으로 조용히 흡수한다.

## 4. 퍼널/텔레메트리

현재는 `game_history`와 `ProcessMetrics` 중심이며, 유저가 어디서 막히는지 세밀하게 보기는 어렵다. Steam 출시 전에는 privacy-safe funnel event를 별도 수집하는 것이 좋다.

권장 구조:

- 클라이언트: `src/telemetry/funnelClient.ts`
- 서버: `POST /api/funnel/events`
- DB: `funnel_events`
- 오프라인/Steam 환경: local queue 후 flush. 실패해도 게임 진행 영향 없음.

수집 원칙:

- 자유 질문 원문, 대화 전문, 개인정보성 텍스트는 보내지 않는다.
- caseId, phase, turn, action type, disputeId, evidenceId, result type, duration 같은 구조화 데이터만 보낸다.
- sessionId는 익명 UUID로 두고 Steam ID가 필요하면 해시 처리한다.

핵심 이벤트:

| 이벤트 | 목적 |
| --- | --- |
| `session_start` | 사건별 진입 수 |
| `phase_enter`, `phase_exit` | phase별 이탈/체류 시간 |
| `tutorial_step_start`, `tutorial_step_complete`, `tutorial_skip` | 튜토리얼 병목 |
| `first_meaningful_action` | 처음 뭘 해야 할지 몰라 멈추는 문제 측정 |
| `action_select` | 질문/증거/증인/특수 행동 사용 분포 |
| `action_blocked` | 자원 부족, 조건 미충족, 잘못된 대상 선택 |
| `question_result` | lieState 변화, 효과 있음/없음 |
| `evidence_investigate`, `evidence_present_result` | 증거 사용 난이도 |
| `feedback_shown`, `feedback_action`, `feedback_dismiss` | 중요 팝업이 이해되는지 |
| `hidden_dispute_emerged` | 반전 도달률 |
| `truth_stage_changed`, `lie_collapse` | 클라이맥스 도달률 |
| `combo_attempt`, `combo_success`, `combo_fail` | 조합 퍼즐 난이도 |
| `verdict_enter`, `verdict_submit`, `verdict_retry` | 판결 화면 병목 |
| `session_end` | 종료 phase, 소요 시간, 완료 여부 |

주요 지표:

- 사건 시작 대비 첫 의미 행동 도달률
- 튜토리얼 Step별 이탈률
- Phase별 평균 체류 시간과 이탈률
- 같은 행동 3회 이상 반복률
- 증거 조사 없이 증거 제시 실패율
- 숨은 쟁점 발현 전 이탈률
- 첫 T3 클라이맥스 도달률
- 판결 진입 후 제출률

## 5. 추가 재미 요소

우선순위가 높은 것:

1. 논리 사슬 보드
   - 증거, 발언, 쟁점이 연결될 때 “논리 사슬”이 시각적으로 완성된다.
   - 이미 `CombinationLab`, `ResonanceLayer`, `JudgeNotebook`가 있으므로 확장 비용 대비 효과가 크다.

2. 결정적 추궁 버튼
   - 조건을 만족하면 `이 모순을 짚는다` 같은 한정 버튼이 뜬다.
   - 성공 시 강한 VFX, 실패 시 신뢰/감정 리스크를 준다.
   - Ace Attorney식 쾌감은 주되, 게임 정체성은 “재판관의 판단”으로 유지한다.

3. 반전 타임라인
   - 사건 후반에 “처음엔 이렇게 보였지만 실제 순서는 이랬다”를 시각화한다.
   - Spouse-01은 특히 은폐, 감시, 돈 이동, 위임장 조작의 순서가 재미의 핵심이다.

4. 재판관 성향의 실전 체감
   - 결과 화면에만 남기지 말고, 플레이 중 특정 성향이 선택지/힌트/판결문 톤에 영향을 주게 한다.
   - 단, 초반에는 복잡도를 늘리지 말고 결과 이후 장기 동기용으로 확장한다.

5. 막힘 감지형 힌트
   - 같은 질문 반복, 긴 idle, action_blocked 반복 시 스포일러 없는 힌트를 준다.
   - “B에게 d-1을 사실 추궁해 보세요”가 아니라 “방문 기록을 말한 사람에게 시간순으로 확인해 보세요”처럼 맥락 힌트로 준다.

낮은 우선순위:

- 별도 미니게임 추가. 이미 코드에 미니게임 계열이 있지만, 본편 재미 문제는 “클릭 액션 부족”이 아니라 “핵심 추론이 연출/피드백으로 충분히 보상되지 않는 문제”에 가깝다. 새 미니게임보다 본편 이벤트 보상을 강화하는 편이 먼저다.

## 추천 실행 순서

1. 번역: GPT Pro 5.5로 `translation_priority_inventory.csv` 재번역 → Codex로 적용/검증.
2. 튜토리얼: Spouse-01 첫 8단계만 구현.
3. 퍼널: 최소 telemetry skeleton과 tutorial/phase/action/evidence/verdict 이벤트부터 심는다.
4. 임팩트: 새 쟁점, hard evidence hit, S5 붕괴, 판단 충돌, 판결 진입 5개만 T3/T2로 강화한다.
5. 재미 확장: 논리 사슬 보드와 결정적 추궁 버튼을 추가한다.

ClaudeCode 쪽 제안이 나오면 이 문서의 실행 순서와 비교해서, 중복 제안은 합치고 상충되는 제안은 “개발 비용, 유저 이해도, 반복 플레이 가치” 기준으로 정리하면 된다.
