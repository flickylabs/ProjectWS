# 출시 전 PC QA — 플레이 순서별 테스트 가이드

작성일: 2026-05-19 (확장: 플레이 순서 + 단계별 카피/시각/타이밍 구체화)
대상 HEAD: `ffca8775` 또는 그 이후
플레이 시간: KO 1회 약 2시간 + EN/JA/ZH-CN 각 1시간 + family-01 30분 + friend-01 30분 = **약 5~6시간**

---

## §0. 사용 가이드

이 문서는 **사용자가 직접 한 회씩 차근차근 플레이하면서** 매 단계마다 확인하는 형식. 한 화면씩 보면서:

1. **위치/시점** — 지금 어디서 무엇을 보고 있는지
2. **시각** — 화면에 무엇이 나타나야 하는지
3. **카피** — 정확 텍스트가 무엇인지 (다국어 회차 시 비교)
4. **동작** — 어떤 버튼/메뉴를 누르는지
5. **기대 결과** — 누른 후 무엇이 보여야 하는지
6. **Pass/Fail 판정** — 명확 기준
7. **메모란** — 발견 사항 즉시 기록

발견 사항은 §8 보고 포맷대로 정리 후 다음 메인 세션에 전달.

---

## §1. 사전 준비

### §1.1. 빌드 선택

| 명령 | 용도 | 게임 플레이? |
|---|---|---|
| **`run-pc.bat`** | Vite dev server + local API proxy → `http://127.0.0.1:5174/index-pc.html` | ✅ **TC 진행용 — 본 문서의 모든 §2~§7 회차는 이 명령으로 진입** |
| `npm run dev` | `run-pc.bat` 내부에서 호출되는 dev 서버 단독 명령 | ✅ (API proxy 별도 기동 필요 시 직접 호출) |
| `simulator.bat` | qa:deep + qa:visual HTML 리포트 생성 → 브라우저에 리포트 표시 | ❌ **게임 안 띄움 — 정적 QA 게이트 자동화 (qa-route-simulator 등 코드 시뮬레이션)** |
| `npm run build` + `npm run preview` | 프로덕션 빌드 + 정적 serve | ✅ (Steam 빌드 직전 최종 검증용, dev와 동작 차이 spot check) |

→ **P0/P1/P2 TC 모두 `run-pc.bat`으로 진행 가능**. Steam release 빌드 최종 검증은 별도 트랙.
→ `simulator.bat`은 commit 단위 회귀 게이트로 사용 (TC 회차 후 또는 fix 후 자동 검증).

### §1.2. 데이터 초기화

각 회차 시작 전:

1. **F12** → Application 탭 → Local Storage → 도메인 선택 → 우클릭 "Clear"
2. 또는 시크릿 창 / InPrivate 창에서 새로 진입
3. localStorage 키 중 다음이 초기화되어야 함:
   - `solomons:caseProgress:*`
   - `solomons:tutorialCompleted:*`
   - `solomons:telemetry:consent`
   - `solomons:settings:locale`

### §1.3. 단축키 / 도구

| 동작 | 키 | 메모 |
|---|---|---|
| 진술 advance | Enter | Phase 1 진술 화면 |
| 모달 / 컷씬 skip | Esc | review montage / cutscene |
| devtools 열기 | F12 | Telemetry/콘솔 확인 |
| 풀스크린 toggle | F11 | 시각 검증 시 |
| 언어 전환 | 설정 화면 → 언어 → 즉시 적용 (게임 재시작 불요) |

### §1.4. 발견 사항 즉시 기록

- 별도 메모장에 `[FAIL TC-XXX] 짧은 제목` 형식 (§8 포맷)
- 스크린샷 권장 (Win+Shift+S)
- 다국어 회차 시 어느 언어에서 발견했는지 명시

---

## §2. 1회차 KO — spouse-01 정공법 + 튜토리얼 + Park fix 핵심 검증

**소요**: 약 2시간. P0/P1 핵심 다수 포함.

### §2.0. 게임 첫 진입 — Splash + Intro

**위치**: 게임 실행 직후

**시각**:
- Splash 화면 (게임 로고) 최소 1.2초 표시 후 fade out
- Intro → 홈 화면 자동 전환

**기대**: 1.2초 ± 0.3초, 자연 fade 트랜지션. 검은 화면 멈춤이나 깜빡임 없음.

**Pass**: 부드러운 진입
**Fail**: 멈춤, 깜빡임, fade 부자연

---

### §2.1. Telemetry 동의 모달 — TC-Tele-01

**위치**: 첫 진입 직후 (localStorage clean 상태에서만)

**시각**:
- 모달 다이얼로그 가운데 표시
- 제목: 텔레메트리 동의 안내 (KO)
- 본문: 게임 개선을 위한 데이터 수집 설명
- 버튼 2개: "동의" / "거부"

**동작**: 동의 클릭

**기대**:
- 모달 닫힘
- localStorage에 `solomons:telemetry:consent: "granted"` 저장
- 이후 telemetry 이벤트 발화 시작
- F12 Network 탭에서 `/api/telemetry` 요청 확인 가능

**Pass**: 모달 정상 + 동의 후 이벤트 발화
**Fail**: 모달 미표시 / 동의 후 이벤트 미발화

**메모란**: 이 모달은 회차마다 다시 보지 않음 (localStorage 재초기화 시만). 다국어 회차에서는 메시지 텍스트 자연성만 spot.

---

### §2.2. 홈 화면 — 사건 선택

**위치**: Intro 종료 직후

**시각**:
- 상단 게임 타이틀: "솔로몬의 딜레마: 진실의 재판"
- 태그라인: "법이 닿지 못한 진실, 당신의 판단에 맡깁니다." (KO)
- 사건 카드 3개 (spouse-01 / family-01 / friend-01) 가로 정렬
- 각 카드에 양측 archetype 라벨 (예: "Vulnerable Witness" → "취약한 증인")

**동작**: spouse-01 카드 클릭

**기대**:
- 사건 브리핑 화면 진입 (Phase 0 / Briefing 단계)
- 양측 초상화 + 이름 + 나이 + 직업 + archetype 라벨 표시
- 하단 [시작] 버튼

**Pass**: 카드 정보 자연 + 클릭 후 브리핑 진입
**Fail**: 카드 정보 누락 / archetype 라벨 어색

---

### §2.3. 사건 브리핑 — Tutorial Step 1 (briefing-advance)

**위치**: 사건 브리핑 화면

**시각 (튜토리얼 활성화 시)**:
- Hand-pointer 아이콘이 하단 [시작] 버튼 위에 표시 (fingertip 위치 = 버튼 좌측 기준 37%, 13%)
- 메시지 카드가 hand 위 또는 위쪽 영역에 popup
- 카드 상단 chip: "1 / 11"
- 카드 제목 (KO): **"사건 브리핑"**
- 카드 본문 (KO): **"사건 개요를 확인하고 아래 시작 버튼을 눌러주세요."**
- 우상단 close-x 버튼 / 우하단 skip 버튼

**동작**: [시작] 버튼 클릭

**기대**:
- 튜토리얼 Step 1 완료
- Phase 1 (양측 진술) 진입
- Step 2 메시지 카드 자동 표시

**Pass**: hand-pointer 위치 자연 + 카피 정확 + 클릭 후 Step 2 진입
**Fail**:
- hand-pointer가 버튼 가운데가 아닌 어색한 위치
- 메시지 카드 자르기/잘림
- 카드 텍스트 오타/번역 어색
- 클릭해도 advance 안 됨

**메모**: 다국어 회차에서 카드 카피는 §9.2 표 참조하여 정확 비교.

---

### §2.4. Phase 1 양측 진술 — Tutorial Step 2 (initial-statement-acknowledge)

**위치**: Phase 1 진술 화면

**시각**:
- 화면 가운데 NPC 발화 박스 (이준호 또는 박지연 진술 차례대로)
- 하단 dialogue advance 버튼 (KO): **"[다음 진술]"**
- 우측 dialogue log 점차 누적
- 튜토리얼 카드 Step 2

**카드 카피 (multi-target bodyVariants)**:
- 일반 (advance 대상): 제목 **"양측의 진술"** / 본문 **"[다음 진술] 버튼을 눌러 다음 발언으로 넘어가주세요."**
- 선택지 대상 (`.v4-choice-panel__option`): 제목 동일 / 본문 **"재판관으로서 판단해주세요. 어느 선택지든 마음에 드는 것을 골라보세요."**

**동작**:
1. [다음 진술] 5~7회 클릭 (양측 진술 청취 완료)
2. 도중 재판관 개입 선택지 등장 시 임의 선택

**기대**:
- 진술 끝나면 Phase 3 진입 (Investigation/Interrogation 단계)
- 튜토리얼 Step 3 카드 자동 표시
- dialogue log에 누적 발화 보존

**Pass**: 진술 흐름 자연 + 카드 bodyVariants 정확 분기 + Phase 진입 정상
**Fail**: 진술 박스 잘림 / advance 버튼 라벨 오타 / bodyVariants 잘못된 본문 표시 / Phase 미진입

---

### §2.5. Phase 3 진입 — Tutorial Steps 3·4 (dispute-focus-d1, target-select-b)

**위치**: Phase 3 시작 직후 (재판관 진행 단계)

**시각**:
- 상단 dispute ribbon: d-1, d-2 dispute chip 가시 (h-d3, h-d4는 hidden 상태로 미표시)
- 좌측 dispute panel
- 하단 hotbar: 6 슬롯 + 양측 캐릭터 슬롯 A / B

#### Step 3 (dispute-focus-d1)

**카드 카피 (KO)**: 제목 **"쟁점 선택"** / 본문 **"심리할 쟁점을 골라주세요. 강조된 쟁점부터 시작해볼까요?"**

**시각**: d-1 chip이 하이라이트(glow/border), hand-pointer가 d-1 chip 위.

**동작**: d-1 chip 클릭

**기대**: d-1 dispute 활성, 카드 Step 4로 advance

#### Step 4 (target-select-b)

**카드 카피 (KO)**: 제목 **"대상 선택"** / 본문 **"누구에게 질문할지 골라주세요. 대상에 따라 답이 달라져요."**

**시각**: 캐릭터 슬롯 B (박지연) 하이라이트, hand-pointer가 슬롯 B 위.

**동작**: 슬롯 B 클릭

**기대**: 박지연 타겟팅 활성 (`pcTargetParty: 'b'`), 카드 Step 5로 advance

**Pass**: 양 step 모두 정상 진행
**Fail**: chip이 highlighted 안 됨 / 캐릭터 슬롯 잘못 highlighted / 클릭 후 advance 실패

---

### §2.6. 사실 추궁 메뉴 — Tutorial Step 5 (question-fact)

**위치**: Phase 3, 박지연 타겟팅 상태

**시각**:
- 하단 hotbar에서 [사실 추궁] 슬롯 (data-tutorial-target="question-type-fact") 하이라이트
- hand-pointer 사실 추궁 버튼 위 → 클릭 후 → 사실 추궁 패널 펼침 → 패널 내부 질문 버튼 위로 cycle

**카드 카피 (KO)**: 제목 **"사실 추궁"** / 본문 **"[사실 추궁] 메뉴에서 묻고 싶은 질문을 골라주세요. 어떤 질문이든 좋아요."**

**동작**:
1. [사실 추궁] 슬롯 클릭 → 질문 선택 패널 펼침
2. 임의 질문 버튼 클릭

**기대**:
- 질문 발화 + NPC 응답 + Step 6 advance
- 질문 패널이 question-fact-panel data-tutorial-target 가짐

**Pass**: 패널 펼침 자연 + 질문 선택 후 응답 + advance
**Fail**: 패널 안 열림 / 질문 클릭 후 응답 없음 / advance 안 됨

---

### §2.7. 증거 조사 e-2 — Tutorial Step 6 (evidence-investigate-e2)

**위치**: Phase 3 진행 중

**시각**:
- 좌측 panel의 evidence 목록에 e-2 카드 하이라이트
- 또는 evidence detail 영역 하이라이트
- hand-pointer e-2 카드 위

**카드 카피 (KO)**: 제목 **"증거 조사"** / 본문 **"증거 카드를 눌러 자세히 살펴보세요. 단서가 추가로 드러나요."**

**동작**:
1. e-2 카드 클릭 → detail 패널 열림
2. [조사] 액션 버튼 클릭

**기대**:
- e-2 investigationStage 증가 (0 → 1 또는 1 → 2)
- 조사 토큰 비용 차감 (1 또는 2개)
- 새 단서 노출 (text/SFX)
- Step 7 advance

**Pass**: 조사 정상 + 단서 노출 + advance
**Fail**: 클릭 후 조사 안 됨 / 토큰 비용 잘못 / 단서 미표시

---

### §2.8. 증거 제시 e-2 → 박지연 — Tutorial Step 7 (evidence-present-e2-to-b)

**위치**: e-2 조사 후

**시각**:
- e-2 detail 패널 내 [제시] 버튼 또는 hotbar [증거 제시] 슬롯 하이라이트
- hand-pointer 제시 버튼 위

**카드 카피 (KO)**: 제목 **"증거 제시"** / 본문 **"조사한 증거를 상대에게 제시해 진술을 흔들어보세요."**

**동작**: [제시] 클릭 → 박지연 (b) 대상 자동 또는 선택 후 제시

**기대**:
- court beat 발동 (`evidence_hit_major`)
- **Impact VFX 발동 (TC-Impact-02 확인)**:
  - `card-slam` (피드백 카드 슬램 480ms)
  - `portrait-shake` (박지연 portrait 흔들림 460ms)
  - `screen-shake-light` (전체 화면 살짝 쉐이크 240ms)
  - chip label: **"결정적 단서"**
- 박지연 lieState transition (S0 → S1 또는 그 이상)
- Step 8 advance

**Pass**: 3종 VFX 동시 발동 + timing 자연 (~0.5초 내 완료) + lieState 진행
**Fail**:
- VFX 누락 (어느 효과가 안 보임)
- timing 부자연 (너무 길거나 짧음)
- "결정적 단서" 라벨 미표시
- portrait-shake가 portrait를 못 찾고 다른 요소 흔들림

**메모**: 다국어 회차에서 chip label "결정적 단서" 다국어 확인 필요. (§9.3 표 참조 — TBD: 영문/일문/중문 라벨)

---

### §2.9. 피드백 확인 — Tutorial Step 8 (feedback-acknowledge)

**위치**: 증거 제시 직후 (피드백 카드 표시 중)

**시각**:
- 피드백 카드 (EventFeedbackCard) 화면 가운데 또는 상단
- `data-tutorial-target="feedback-card"` 앵커
- hand-pointer 카드 위
- 카드 내용: 박지연 반응 묘사 + lieState 변화 표시

**카드 카피 (KO)**: 제목 **"반응 확인"** / 본문 **"상대의 반응을 살펴보세요. 진술이 어떻게 흔들리는지 보여요."**

**동작**: 피드백 카드 클릭 (auto-dismiss 또는 수동 닫기)

**기대**: 카드 닫힘 + Step 9 advance

**Pass**: 카드 표시 + 닫기 정상
**Fail**: 카드 표시 안 됨 / 닫히지 않음

---

### §2.10. 재판관 노트 — Tutorial Step 9 (observation-hint)

**위치**: 피드백 카드 닫힌 후

**시각**:
- 화면 우측 또는 상단의 재판관 노트 섹션 하이라이트 (`data-tutorial-target="judge-notebook-section"`)
- hand-pointer 섹션 위
- 섹션 내부: 방금 발생한 변화 자동 기록됨

**카드 카피 (KO)**: 제목 **"재판관 수첩"** / 본문 **"중요한 변화는 [재판관 수첩]에 자동으로 기록돼요. 잠시 후 다음으로 넘어가요."**

**동작**: 대기 (자동 advance 예정 — `actionType: 'auto'`)

**기대**: 2~3초 후 자동 Step 10 advance

**Pass**: 자동 advance 정상
**Fail**: 무한 대기 / advance 안 됨

---

### §2.11. 튜토리얼 종료 — Tutorial Steps 10·11

**위치**: Step 9 자동 advance 후

#### Step 10 (tutorial-complete)

**카드 카피 (KO)**: 제목 **"준비 완료!"** / 본문 **"이제 진실은 당신의 손에 달려 있어요. 직접 밝혀주세요."**

**시각**: Flicky 마스코트 또는 종료 메시지 가운데 표시

**동작**: 카드 닫기 (자동 또는 수동)

**기대**: 튜토리얼 종료 → 일반 플레이 진입

#### Step 11 (튜토리얼 후 일반 플레이)

**위치**: 일반 Phase 3 진행

**기대**:
- 튜토리얼 오버레이 사라짐
- localStorage `solomons:tutorialCompleted:spouse-01: true` 저장
- 동일 case 재진입 시 튜토리얼 자동 시작 안 함

**Pass**: 종료 + 재진입 시 미반복
**Fail**: 종료 안 됨 / 재진입 시 처음부터 다시

---

### §2.12. Phase 3 본격 — d-1 / d-2 진행

**위치**: 튜토리얼 종료 후 Phase 3

**시각**: dispute ribbon에 d-1 (오피스텔 방문), d-2 (현금 인출) chip 가시

**동작**:
1. d-1 dispute 진행 — 박지연/이준호 양측에 사실 추궁 × 2~3회씩
2. lieState progression 관찰 (S0 → S1 → S2)
3. d-2 dispute 진행 — 동일 패턴
4. 증거 조사 e-3, e-4 등 추가 진행
5. 증거 조합 시도 (combinationLab) — h-d3 unlock 노력

**기대**:
- 양 dispute 자연 진행
- lieState 단계 변화에 따라 NPC 발화 톤 변경 (S0 강한 부정 → S2 회피 → S3 일부 인정)
- 증거 노출 시 surfaceName만 사용 (진실 직접 노출 X)

**Pass**: lieState progression 자연 + NPC 발화 톤 변화 인지 가능
**Fail**: NPC가 S0에서 진실 자백 / lieState 안 변함

---

### §2.13. h-d3 dispute emerge — TC-Impact-01 (T3 climax 후보)

**위치**: 증거 조합 (e.g., e-2 + e-5 또는 비슷한 hidden combination) 완료 시점

**시각 (h-d3 emerge 순간)**:
- combination 완료 알림 → dispute ribbon에 h-d3 chip 신규 표시
- **T3 climax VFX 발동 가능**:
  - `screen-flash-dark` (다크 플래시, 440ms)
  - `screen-shake-medium` (중간 쉐이크, 420ms)
  - `vignette-strong` (강한 비네팅, 780ms)
  - **bigTypography** (큰 자막 — "결정적 진술" 같은)
  - BGM ducking (-30dB)
- 카드 chip: T3 인디케이터

**기대 timing**:
- 모든 효과 1초 이내 동시 발동
- BGM ducking 자연 fade (in/out 각 200ms)
- bigTypography 자막 2~3초 유지
- 1 per case 하드캡 (이번 playthrough에서 h-d4 unlock 시 재발동 X)

**Pass**:
- 클라이맥스 느낌 강함 (시각/청각 모두)
- 효과 timing 부드러움
- 1 per case 동작 (h-d4에서 재발동 안 함 확인은 §2.15에서)

**Fail**:
- 효과 누락 (어느 하나라도)
- 너무 강함 (모니터 깜빡임 과도) 또는 너무 약함 (인지 어려움)
- BGM ducking 부자연 (갑작스러운 음소거)
- bigTypography 잘림/위치 어색

**메모란**: 발동 시점 스크린샷 권장. 다국어 회차에서는 bigTypography 텍스트 자연성 확인.

---

### §2.14. h-d3 박지연 추궁 — 다국어 spot

**위치**: h-d3 emerge 후 박지연 측 사실 추궁

**시각**: dispute h-d3 활성, 박지연 타겟, 사실 추궁 메뉴

**동작**: h-d3 관련 질문 1~2개 발화

**기대**: 자연 한국어 + 의미 정확

**Pass**: 질문 발화 자연 / 응답 자연
**Fail**: 부자연 표현 (P2 후보)

**메모**: 외국어 회차에서 비교 — 일반적으로 h-d3 박지연 측 질문은 KO에서 "공동 적금을 본인 혼자 해지 신청까지 진행해야 한다고 판단한 결정의 동기가 무엇입니까" 같은 형식. 외국어 회차에서 동일 자연성 검증.

---

### §2.15. h-d4 dispute emerge

**위치**: 추가 증거 조합 (e.g., 위임장 관련) 완료 시점

**시각**:
- h-d4 chip 신규 표시
- **T3 climax 재발동 안 함** (1 per case 캡 — h-d3에서 이미 발동)
- 일반 evidence_hit_major VFX 정도만 (`card-slam` + `portrait-shake` + `screen-shake-light`)

**기대**: T3 효과 미발동 (이미 1회 소진), 일반 진행

**Pass**: 1 per case 캡 정확
**Fail**: T3 효과 재발동 (캡 무시)

---

### §2.16. ★ h-d4 박지연 [102][104][106] 추궁 — TC-Park 핵심

**위치**: Phase 3, h-d4 active, 박지연 타겟, 추궁 메뉴

**기대 카피 (KO)**: §9.1 부록 참조

**Steps**:
1. **[102] 사실 추궁** 메뉴 진입 → 5 variants 차례로 발화
2. **[104] 동기 탐색** 메뉴 진입 → 5 variants 차례로 발화
3. **[106] 공감 접근** 메뉴 진입 → 5 variants 차례로 발화

**기대 (KO 발화 자연성 검증)**:
- [102] v[0]: "박지연 씨, 남편이 무엇을 가장 먼저 숨겼다고 보는지, 그 판단의 근거 자료부터 답해 주십시오."
  → 남편의 은폐를 박지연이 어떻게 판단했는지 묻는 자연 질문. 박지연 본인을 추궁하는 형태 아님.
- [104] v[1]: "남편의 숨김을 마주한 뒤 본인 쪽 숨김을 시작했는지, 그보다 앞서 시작한 숨김이 따로 있었는지 나눠 말씀해 주십시오."
  → 가정형 분리. "상대가 먼저 숨겼다"는 단정 회피.
- [106] v[3]: "박지연 씨, 상대 침묵에 대한 분노는 잠시 두고, 그 분노 위에 본인이 시작한 일의 책임을 인정할 수 있는 만큼 말씀해 주십시오."
  → 분노 → 책임 2단 구조 보존.

**Pass**: 15 variants 모두 KO 베이스라인과 일치, 자연 발화
**Fail**: 어느 variant라도:
- 주체 뒤바뀜 (남편의 은폐 → 박지연의 은폐)
- 단정 표현 ("상대가 먼저 숨겼다")
- 부자연 어휘 / 번역체

**메모란**: 다국어 회차(EN/JA/ZH-CN)에서 §9.1 표 참조하여 외국어 발화 비교. 각 lang × 3 indices × 5 variants = 60 발화 청취.

---

### §2.17. 직접질문 spot — TC-FreeQ-01~05

**위치**: Phase 3 박지연 타겟

**Steps (5 카테고리 × 1~2 질문씩)**:

#### TC-FreeQ-01 — 세계관 기반

KO 입력:
- "직업이 무엇입니까?"
- "결혼한 지 얼마나 됐어요?"
- "취미가 있나요?"

**기대**: 세계관 답변 (캐릭터 배경 톤) — 사건 routing 안 됨. 비용/턴 0.
**Fail**: 사건 routing 후 빈약/회피 답변 → Phase A worldFacts 미구현 (현재 known limitation)

#### TC-FreeQ-02 — 사건 + 진실 단계

KO 입력:
- "왜 그날 그 오피스텔에 갔습니까?" (d-1 surface)
- "공동 적금은 누가 해지했습니까?" (h-d3 hidden)

**기대 (lieState 기반)**:
- S0~S2: 회피/표면적 답변
- S3+: 부분 인정
- S5: 자백

**Fail**: lieState 무시한 일정 답변

#### TC-FreeQ-03 — 사건 + 예민 (스포일러 위험)

KO 입력:
- "위임장을 조작하셨습니까?"
- "투자 사기에 휘말렸나요?"

**기대**: NPC 또는 시스템 deflection. **진실 누설 0건**.
**Fail**: NPC가 "네, 조작했습니다" 등 진실 직접 확인 → [feedback_truth_leak_prohibition](memory) 위배 P0

#### TC-FreeQ-04 — 게임 무관

KO 입력:
- "오늘 날씨 어때요?"
- "이 게임 어떻게 만들었나요?"
- "다음 사건은 언제 나오나요?"

**기대**: off_topic_redirect — 시스템 메시지 또는 NPC archetype 톤 자연 deflection. 비용/턴 0.
**Fail**: 사건 routing / 무응답 / 시스템 crash

#### TC-FreeQ-05 — 복합 질문

KO 입력:
- "왜 그때 전화 안 했고 누가 그렇게 결정했어요?" (motive + responsibility)
- "오늘 날씨도 좋은데 이준호 씨는 뭘 했어요?" (off_topic + fact_pursuit)

**기대 (현 baseline)**:
- 한 intent로 collapse — 부분 응답
- 누설 없음

**Fail**: 양쪽 모두 무시 / 누설 / crash

---

### §2.18. Phase 4 합의 (mediation)

**위치**: 모든 dispute 처리 완료 후 Phase 4 자동 진입

**시각**:
- 합의 옵션 4종 (KO):
  - 즉시 합의 (immediate)
  - 조건부 합의 (conditional)
  - 합의 보류 (postpone)
  - 사실관계 우선 (fact_first)
- 각 옵션 카드 + 설명

**동작**: 임의 옵션 선택 (e.g., 조건부 합의)

**기대**:
- 선택 후 mediation 결정 저장
- Phase 6_Mediation 화면 → review montage 진입 (§2.19로)

**Pass**: 옵션 자연 + 선택 후 다음 phase 진입
**Fail**: 옵션 카피 어색 / 진입 안 됨

---

### §2.19. Phase 5 진입 — Review montage — TC-Review-01

**위치**: Phase 4 mediation 결정 직후

**시각**: `PCVerdictReviewMontage` 컴포넌트 표시
- 3 key evidence 카드 (e-2, e-4 등) 차례 노출
- collapsed lie count 표시 (총 거짓말 횟수)
- unresolved disputes 목록
- 애니메이션 stagger (각 요소 0.5초 간격 fade in)

**기대 timing**:
- 총 진행 4초 (auto-advance)
- Esc 또는 클릭 시 즉시 skip

**동작 (option A)**: 4초 대기 (자동 진행)
**동작 (option B)**: Esc 또는 클릭 (skip)

**기대 (양 옵션 공통)**: montage 종료 → `completeReview` 콜백 → `verdictEntryCutscene` 시작

**Pass**: 4초 자동 정확 OR skip 즉시 + cutscene 진입
**Fail**: 멈춤 / 정보 누락 / skip 미동작 / cutscene 미진입

---

### §2.20. Verdict cutscene — TC-Impact-03

**위치**: Review montage 종료 직후

**시각**: `verdictEntryCutscene` 발동
1. 블랙아웃 페이드 (0.3초)
2. gavel SVG 등장 (1.5초)
3. 플래시 (0.3초)
4. 페이드 아웃 (0.4초)
5. verdict 화면 fade in
- 총 2.5초

**SFX**: cutscene SFX 발화 (gavel 타격음 등)

**Telemetry**: `emitVerdictEntryCutscenePlayed` 이벤트 (devtools 확인)

**Pass**: 2.5초 ± 0.3초 + SFX 동기 + 자연 트랜지션
**Fail**:
- timing 어색 (너무 길거나 짧음)
- gavel SVG 위치 / 크기 어색
- SFX 미발화 / 미동기
- 검은 화면 멈춤

---

### §2.21. Phase 6 평결 + aftermath

**위치**: Cutscene 종료 직후

**시각**:
- 평결 점수 화면 (총점 + 항목별 점수)
- 평결 텍스트 (NPC 결말 narration)
- aftermath 자막 (KO 원문 충실 번역)

**동작**:
1. 점수 화면 확인
2. [다음] 또는 [확인] 클릭
3. aftermath narration 청취
4. 종료 또는 홈으로

**기대**:
- 점수 정확 (각 항목 합산)
- aftermath 자연 한국어 (번역체/신문체 회피)
- `emitVerdictSubmit` telemetry 이벤트 (점수 포함)
- Steam achievement `ACH_FIRST_CASE_CLEARED` unlock (Steam 빌드만)

**Pass**: 점수 정확 + 자연 발화 + telemetry + achievement
**Fail**: 점수 계산 오류 / 부자연 발화 / telemetry 미발화

---

### §2.22. Telemetry 검증 — TC-Tele-02

**위치**: 1회 playthrough 종료 후 (devtools 확인)

**Steps**:
1. F12 → Network 탭 (XHR 필터)
2. 또는 Application → Local Storage → telemetry queue 확인
3. 또는 콘솔에서 `useTelemetryStore.getState()` (있다면)

**기대 이벤트 (한 playthrough 최소)**:

| 이벤트 | 발화 시점 | 페이로드 핵심 |
|---|---|---|
| `session_start` | PCApp mount | entry_point |
| `phase_enter` × 5+ | 각 Phase 전환 | phase, turn, caseId |
| `phase_exit` × 5+ | 각 Phase 전환 | phase, durationSec |
| `truth_stage_changed` | 박지연/이준호 lieState transition | party, disputeId, from, to |
| `action_select` × N | 매 행동 | actionType, caseId |
| `evidence_present_result` × 1+ | e-2 제시 시 | evidenceId, target, result |
| `hidden_dispute_emerged` × 2 | h-d3, h-d4 emerge | disputeId, via |
| `impact_beat_played` × 1+ | T3 climax + evidence hits | beatId, intensity, caseId |
| `t3_climax_reached` × 1 | h-d3 T3 발동 | beatId, caseId |
| `verdict_entry_cutscene_played` × 1 | cutscene 발동 | caseId |
| `verdict_submit` × 1 | 평결 제출 | score |
| `session_end` | pagehide / 명시 종료 | lastPhase, endedBy |

**Pass**: 12+ 이벤트 정확 발화 + 페이로드 정상
**Fail**: 이벤트 누락 / 페이로드 빈약 / 중복 발화

---

## §3. 2회차 EN — spouse-01 (KO 차이 spot)

**소요**: 약 1시간 (KO보다 빠름 — 시각은 동일, 카피만 확인)

**진입**:
1. 게임 종료 또는 홈 복귀
2. 설정 → 언어 → English
3. spouse-01 재진입 (튜토리얼 자동 시작 안 함, 설정에서 "Tutorial Guide" 재실행 필요)

### §3.1. 튜토리얼 11-step EN 카피 검증

§2.3 ~ §2.11 반복하되, **카피만 확인** (시각/동작은 KO와 동일). §9.2 부록 표 참조.

핵심 검증:
- UI 라벨 대괄호 통일: `[Next Statement]` / `[Press for Facts]` / `[Judge's Notebook]`
- 호칭 자연: "Ms. Park Ji-yeon" / "Mr. Lee Jun-ho"
- 톤: 정중 + polite (한국어 존댓말 대응)

### §3.2. ★ TC-Park EN 핵심 — §2.16 EN 반복

§2.16 단계 그대로 진행. **15 variants × 3 indices를 §9.1 EN 컬럼과 비교**.

핵심 검증 (특히 주의):
- [102] v[0] EN: "Ms. Park Ji-yeon, please answer first what you believe your husband concealed first, and what material supports that judgment."
  → "what you hid and when" 같은 placeholder 잔류 없음 (Park fix 적용 확인)
- [104] v[1] EN: "Please separate whether your own concealment began after you encountered **what you regarded as your husband's concealment**, or whether..."
  → 가정형 보존 (단정 회피)
- [106] v[3] EN: "Set aside your anger at the other side's silence for the moment, and state as much as you can acknowledge about your responsibility for what you began on top of that anger."
  → 분노→책임 2단 구조 보존

**Fail**: 어느 variant에라도 주체 뒤바뀜 / placeholder 잔류 / 어색 영어

### §3.3. Impact-VFX bigTypography EN 텍스트

§2.13 T3 climax 발동 시 bigTypography 자막 EN 자연성 확인. (정확 텍스트는 게임 데이터 의존 — 발화 시 추가 메모)

### §3.4. 평결 점수 화면 EN

§2.21 평결 화면 영문 카피 자연성. 점수 라벨, 결말 narration, aftermath.

---

## §4. 3회차 JA — spouse-01

§3 EN과 유사. 추가 일본어 특이 사항:

### §4.1. 일본어 호칭

- "パク・ジヨンさん" / "イ・ジュノさん" — 가타카나 표기 일관
- 합쇼체/てください 톤 일관 (재판관 발화)
- 어색한 한자 표기 없음

### §4.2. Park fix JA 핵심 — §2.16 JA 반복

§9.1 JA 컬럼 비교. 핵심:
- [102] v[0] JA: "パク・ジヨンさん、ご主人が何を最初に隠したと見ているのか、その判断を支える資料から答えてください。"
- [104] v[1] JA: "ご主人の隠し事に向き合った後でご自身の側の隠し事を始めたのか..."
- [106] v[3] JA: "相手の沈黙に対する怒りはいったん脇に置き、その怒りの上でご自身が始めたことの責任を、認められる範囲で話してください。"

### §4.3. JA 미세 톤 P2 (이미 확인된 발견사항)

- [104] v[2] JA: "応酬" 어휘 — KO "응징"보다 약함. "報復" 또는 "懲らしめ"가 더 정확 (사용자 판단 필요).
- [106] v[1]/v[2]/v[3] JA: 호칭 "パク・ジヨンさん" 누락 — KO는 매 variant에 호칭 있음. 일본어 자연성 트레이드오프 (반복 호칭 부담).

---

## §5. 4회차 ZH-CN — spouse-01

§3 EN과 유사. 추가 중국어 특이 사항:

### §5.1. 호칭 + 简化字

- "朴智妍女士" / "李俊浩先生" — 일관
- 简化字 통일 (繁體字 잔류 0)
- 한국어식 어순 회피 ("X的Y是Z" 패턴 없음)

### §5.2. Park fix ZH 핵심 — §2.16 ZH 반복

§9.1 ZH 컬럼 비교. 핵심:
- [102] v[0] ZH: "朴智妍女士，请先回答你认为丈夫最先隐瞒了什么，以及支撑这一判断的资料是什么。"
- [104] v[1] ZH: "请分开说明，你是在面对丈夫的隐瞒之后才开始自己这一方的隐瞒..."
- [106] v[3] ZH: "请先暂时放下对对方沉默的愤怒，并在你能够承认的范围内，说明你在那份愤怒之上开始做的事所对应的责任。"

---

## §6. family-01 5회차 — TC-Leak 중심

**소요**: 약 30분

### §6.1. dc-4 dossier card unlock 경로

**위치**: family-01 시작 → Phase 3 진행 → dossier 조합

**Steps**:
1. family-01 신규 진입
2. Phase 1 양측 진술 청취 (윤태성 / 윤정후)
3. Phase 3 진입 — d-1, d-2, d-3 dispute 진행
4. **dossier 조합 시도** — dc-4 unlock 조합 (일기장 + 어머니 메모 + 공증 관련 evidence)
5. dc-4 card unlock 시점 확인

**기대**: dc-4 dossier card "출생 비밀" 관련 unlock

### §6.2. ★ TC-Leak-01 — dc-4 dossier questionText "출생 비밀"

**위치**: dc-4 unlock 직후 또는 Phase 3 진행 중 윤정후 측 추궁

**Steps**:
1. dossier 카드 dc-4 열기
2. 또는 윤정후 측 dossier 관련 질문 메뉴 진입
3. 다음 question text 표시 여부 확인:
   - KO: **"윤정후 씨, 형의 출생 비밀을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까?"**
4. 표시 시점의 lieState 확인 (entries[18][19][20]은 requiredLieState=S2)

**기대 (디자인 의도 판단)**:
- player가 dc-4 unlock 시점에 이미 "출생 비밀" 사실을 evidence로 인지했다면 → 노출 OK
- player가 dc-4 unlock 시점에 "출생 비밀"을 모르는데 dossier 질문에서 단어가 직접 나타나면 → **메모리 정책 위배 후보 P0**

**Pass (디자인 의도 일치)**: dossier 카드 unlock = surface 노출이므로 직접 언급 OK
**Fail (정책 위배)**: 단어 추상화 필요 — e.g., "어머니 일기장에서 알게 된 사실" 등으로 수정
- 4언어 동일 위치 동일 결정 적용 필요

**메모란**: 같은 questionText가 entries[18][19][20] (early/mid/late lieBand) 3 entry에 반복. 수정 시 모두 갱신.

### §6.3. family-01 4언어 spot

§6.1~§6.2 EN/JA/ZH-CN 회차 — 각 5분씩 (총 15분).
4언어 동일 dossier dc-4 questionText 확인:
- EN: TBD (게임에서 확인 필요)
- JA: TBD
- ZH-CN: TBD

---

## §7. friend-01 6회차 — 일반 spot

**소요**: 약 30분

### §7.1. friend-01 정공 플레이 spot (KO)

- Phase 1 ~ Phase 6 short playthrough
- 핵심 spot:
  - 양측 진술 자연 한국어
  - dispute 5개 (d-1 ~ d-5) chip 표시 + emerge 흐름
  - aftermath narration 자연성
- 외국어 회차는 시간 여유 시만 (P2)

### §7.2. friend-01 truth-leak matrix TBD

매트릭스에 friend-01 키워드 미작성 — 이번 회차에서 사용자가 메모하면 추후 매트릭스 채울 데이터.
- friend-01 hidden truth가 무엇인지 (배신/거짓말의 핵심 사실)
- 어느 dispute가 hidden인지 (h-d* prefix)

---

## §8. 발견 사항 보고 포맷

### §8.1. 즉시 메모 형식 (회차 중)

```
[FAIL TC-Park-02 / EN / spouse-01]
- 위치: Phase 3, h-d4, 박지연 동기 탐색 v[1]
- 관찰: "what your husband concealed" 표현이 있는데 KO는 가정형 "그렇게 본 부분이 있다면"이어서 톤이 어긋남
- 기대: EN도 "what you regarded as your husband's concealment" 가정형 유지
- 스크린샷: (path)
```

### §8.2. 회차 종료 시 정리

| TC ID | 결과 | 우선순위 | 메모 |
|---|---|---|---|
| TC-Tut-01 (KO) | Pass | — | 11-step 정상 |
| TC-Tut-01 (EN) | Pass | — | 11-step 정상 |
| TC-Park-01 (EN) | Fail | P0 | [102] v[0] 호칭 누락 |
| TC-Leak-01 | Pass | — | 디자인 의도 일치 (사용자 판단) |
| TC-Impact-01 | Pass | P2 | h-d3 T3 발동 자연, BGM ducking 살짝 길게 느낌 |
| ... | ... | ... | ... |

### §8.3. 메인 세션 의뢰 템플릿

```
PC QA 결과 정리:

P0 (즉시 fix):
- TC-Park-01 (EN) [102] v[0]: ...

P1 (Phase 2 LQA 통합):
- TC-Tut-02 (JA) skip 버튼 카피: ...

P2 (polish backlog):
- TC-Park-03 (JA) [104] v[2] "応酬" 톤: ...

전체 결과 표는 docs/design/pre-launch-pc-qa/results-{date}.md (가능하면)
```

---

## §9. 부록

### §9.1. ★ TC-Park 검증용 45 string 비교표

#### [102] dispute=h-d4, target=a (박지연), 의도: 사실 추궁

| Variant | KO (정답) | EN | JA | ZH-CN |
|---|---|---|---|---|
| v[0] | 박지연 씨, 남편이 무엇을 가장 먼저 숨겼다고 보는지, 그 판단의 근거 자료부터 답해 주십시오. | Ms. Park Ji-yeon, please answer first what you believe your husband concealed first, and what material supports that judgment. | パク・ジヨンさん、ご主人が何を最初に隠したと見ているのか、その判断を支える資料から答えてください。 | 朴智妍女士，请先回答你认为丈夫最先隐瞒了什么，以及支撑这一判断的资料是什么。 |
| v[1] | 본인이 직접 확인한 침묵과 다른 사람에게 듣고 알게 된 침묵을 나눠 정리해 주십시오. | Please separate the silence you confirmed directly from the silence you learned about from other people. | ご自身が直接確認した沈黙と、他の人から聞いて知った沈黙を分けて整理してください。 | 请把你本人直接确认的沉默，与从别人那里听说后得知的沉默分开整理。 |
| v[2] | 이준호 씨가 침묵의 출발점에 대해 다르게 설명하는 부분과 본인의 시점 사이에 어긋나는 지점을 짚어 주십시오. | Please identify where Mr. Lee Jun-ho's account of when the silence began diverges from your own timeline. | イ・ジュノさんが沈黙の出発点について異なる説明をしている部分と、ご自身の時点との間でずれる箇所を指摘してください。 | 请指出李俊浩先生对沉默起点的不同说明，与以你视角掌握的时间点之间有哪些不一致。 |
| v[3] | 같은 시기 본인 쪽에서 말하지 않은 항목이 있었는지, 양쪽 침묵을 자료 기준으로 시간순으로 정리해 주십시오. | Please organize, by source material and in chronological order, whether there were items on your side that went unstated during the same period and how the silence on both sides unfolded. | 同じ時期にご自身の側で話していなかった項目があったかどうか、双方の沈黙を資料に基づいて時系列で整理してください。 | 请按资料依据和时间顺序整理，同一时期你这一方是否也有未说出口的事项，以及双方的沉默如何展开。 |
| v[4] | 박지연 씨, 본인이 직접 확인하지 못한 채 추정으로 남은 침묵이 있다면 그 부분부터 답해 주십시오. | Ms. Park Ji-yeon, if any silence remains an inference because you did not confirm it directly, please begin with that part. | パク・ジヨンさん、ご自身が直接確認できず推定のまま残っている沈黙があれば、その部分から答えてください。 | 朴智妍女士，如果有你未能直接确认、仍停留在推断中的沉默，请先从那一部分回答。 |

#### [104] dispute=h-d4, target=a (박지연), 의도: 동기 탐색

| Variant | KO (정답) | EN | JA | ZH-CN |
|---|---|---|---|---|
| v[0] | 박지연 씨, 본인이 어떤 부분을 가장 먼저 숨겼는지, 그 시점의 동기가 무엇이었는지 본인 기준에서 답해 주십시오. | Ms. Park Ji-yeon, please answer, from your own perspective, what you hid first and what motivated you at that point. | パク・ジヨンさん、ご自身がどの部分を最初に隠したのか、その時点の動機が何だったのかを、ご自身の基準で答えてください。 | 朴智妍女士，请从你自己的角度回答，你最先隐瞒的是哪一部分，以及当时的动机是什么。 |
| v[1] (단정 회피 critical) | 남편의 숨김을 마주한 뒤 본인 쪽 숨김을 시작했는지, 그보다 앞서 시작한 숨김이 따로 있었는지 나눠 말씀해 주십시오. | Please separate whether your own concealment began after you encountered what you regarded as your husband's concealment, or whether there was a separate concealment that had begun earlier. | ご主人の隠し事に向き合った後でご自身の側の隠し事を始めたのか、それより前に始まっていた隠し事が別にあったのか、分けて話してください。 | 请分开说明，你是在面对丈夫的隐瞒之后才开始自己这一方的隐瞒，还是在那之前已有另一项隐瞒。 |
| v[2] (응징/応酬 P2) | 본인의 숨김에 어떤 자기방어 또는 응징의 측면이 있었는지 설명해 주십시오. | Please explain whether your concealment included an element of self-defense or retaliation. | ご自身の隠し事に、どのような自己防衛または応酬の側面があったのか説明してください。 ⚠ "応酬" 약함 | 请说明你自己的隐瞒中，是否包含自我防卫或回应性惩罚的成分。 |
| v[3] | 그 숨김을 풀 수 있었던 시점이 있었음에도 풀지 않은 결정의 동기를 답해 주십시오. | Please answer what motivated your decision not to resolve that concealment even when there was a point at which you could have done so. | その隠し事を解くことができた時点があったにもかかわらず、解かなかった決定の動機を答えてください。 | 请回答，明明曾有可以解开那项隐瞒的时点，你仍没有解开的决定动机是什么。 |
| v[4] | 지금 공개할 수 있는 범위 안에서, 본인이 가장 늦게 꺼낸 숨김이 어떤 종류였는지 말씀해 주십시오. | Within what you can disclose now, please state what kind of concealment was the last one you brought out. | 今開示できる範囲で、ご自身が最も遅く表に出した隠し事がどのような種類のものだったのか話してください。 | 请在现在可以公开的范围内说明，你最后才说出的隐瞒属于哪一种。 |

#### [106] dispute=h-d4, target=a (박지연), 의도: 공감 접근

| Variant | KO (정답) | EN | JA | ZH-CN |
|---|---|---|---|---|
| v[0] | 박지연 씨, 상대의 침묵을 알아챘을 때 본인 안에서도 어떤 결심이 빠르게 굳어졌을 것입니다. 그때의 마음을 말씀해 주실 수 있습니까. | Ms. Park Ji-yeon, when you noticed the other side's silence, a certain resolve may also have formed quickly within you. Could you tell us what you felt then? | パク・ジヨンさん、相手の沈黙に気づいたとき、ご自身の中でも何らかの決心が早く固まったはずです。その時の心境を話していただけますか。 | 朴智妍女士，当你察觉到对方的沉默时，你心里也可能很快形成了某种决定。可以说说当时的心情吗？ |
| v[1] (호칭 누락 P2) | 박지연 씨, 상대가 먼저 숨겼다고 본인이 판단한 근거와 그 판단을 직접 확인한 부분의 경계를 정리해 주십시오. | ⚠ Please separate the grounds for your judgment that the other side had concealed something first from the part you personally confirmed. | ⚠ 相手が先に隠したとご自身が判断した根拠と、その判断を直接確認した部分との境界を整理してください。 | ⚠ 请整理你判断对方先有隐瞒的依据，并把它与自己直接确认到的部分划清界线。 |
| v[2] (호칭 누락 P2 + EN 단순화 P2) | 박지연 씨, 상대의 침묵을 알아챈 첫 시점의 감정과 그 후 본인 행동으로 옮겨진 시점 사이가 얼마나 가까웠습니까. | ⚠ How close together were the first moment you noticed the other side's silence and the later point when that moved into your own action? | ⚠ 相手の沈黙に初めて気づいた時点の感情と、その後ご自身の行動に移った時点との間は、どれほど近かったのですか。 | ⚠ 你第一次察觉对方沉默时的情绪，与后来转为自己行动的时间点之间，相隔有多近？ |
| v[3] (호칭 누락 P2, 2단 구조 critical) | 박지연 씨, 상대 침묵에 대한 분노는 잠시 두고, 그 분노 위에 본인이 시작한 일의 책임을 인정할 수 있는 만큼 말씀해 주십시오. | ⚠ Set aside your anger at the other side's silence for the moment, and state as much as you can acknowledge about your responsibility for what you began on top of that anger. | ⚠ 相手の沈黙に対する怒りはいったん脇に置き、その怒りの上でご自身が始めたことの責任を、認められる範囲で話してください。 | ⚠ 请先暂时放下对对方沉默的愤怒，并在你能够承认的范围内，说明你在那份愤怒之上开始做的事所对应的责任。 |
| v[4] | 박지연 씨, 침묵의 선후를 지금 결론짓자는 뜻은 아닙니다. 상대 침묵을 본인이 처음 알아챈 한 시점만이라도 다시 짚어 주실 수 있겠습니까. | Ms. Park Ji-yeon, this is not meant to settle the order of silence now. Could you revisit even one moment when you first noticed the other side's silence? | パク・ジヨンさん、沈黙の先後を今ここで結論づけようという意味ではありません。相手の沈黙を初めて知った一つの時点だけでも、改めて示していただけますか。 | 朴智妍女士，现在并不是要判定沉默的先后。哪怕只指出你第一次察觉对方沉默的一个时间点，也请重新说明。 |

**범례**:
- ⚠ = 이미 알려진 P2 후보 (호칭 누락 / 미세 톤). P0/P1 회귀 새로 발견 시만 메모.
- "critical" = behaviorHint 정책 핵심 (단정 회피 / 2단 구조). 위배 시 P0.

---

### §9.2. 튜토리얼 11-step copy 4언어 비교표

| Step | Key | KO | EN | JA | ZH-CN |
|---|---|---|---|---|---|
| 1 | briefing-advance.title | 사건 브리핑 | Case Briefing | 事件ブリーフィング | 案件简报 |
| 1 | briefing-advance.body | 사건 개요를 확인하고 아래 시작 버튼을 눌러주세요. | Take a look at the case overview, then tap the Start button below. | 事件概要を確認したら、下の開始ボタンを押してください。 | 请先查看案件概要，然后点击下方的开始按钮。 |
| 2 | initial-statement-acknowledge.title | 양측의 진술 | Both Sides' Statements | 双方の陳述 | 双方陈述 |
| 2 | .body | 양측의 진술 단계예요. 화면 안내에 따라 진행해주세요. | You've heard statements from both sides. Tap the [Next Statement] button to continue. | 双方の陳述をすべて聞き終えました。[次の陳述]ボタンを押して、次へ進みましょう。 | 您已经听完双方的陈述了。请点击[下一陈述]按钮继续。 |
| 2 | .advance.body | [다음 진술] 버튼을 눌러 다음 발언으로 넘어가주세요. | Press the [Next Statement] button to move on to the next statement. | [次の陳述] ボタンを押して、次の発言へ進みましょう。 | 请点击 [下一陈述] 按钮，进入下一段发言吧。 |
| 2 | .choice.body | 재판관으로서 판단해주세요. 어느 선택지든 마음에 드는 것을 골라보세요. | As the Judge, make your call. Pick whichever option you like. | 裁判官として判断してください。どの選択肢でも大丈夫です。気に入ったものを選んでみましょう。 | 请以法官身份作出判断。哪个选项都可以，请选一个您喜欢的吧。 |
| 3 | dispute-focus-d1.title | 쟁점 선택 | Select Issue | 争点を選択 | 选择争议点 |
| 3 | .body | 심리할 쟁점을 골라주세요. 강조된 쟁점부터 시작해볼까요? | Pick an issue to examine. Let's start with the highlighted one. | 審理する争点を選んでください。まずは強調表示された争点から始めてみましょう。 | 请选择要审理的争议点。先从高亮的争议点开始试试看吧。 |
| 4 | target-select-b.title | 대상 선택 | Select Target | 対象を選択 | 选择对象 |
| 4 | .body | 누구에게 질문할지 골라주세요. 대상에 따라 답이 달라져요. | Choose who you'd like to question. The answer will change depending on who you choose. | 誰に質問するか選んでください。相手によって答えが変わります。 | 请选择要向谁提问。对象不同，回答也会不同。 |
| 5 | question-fact.title | 사실 추궁 | Press for Facts | 事実追及 | 事实追问 |
| 5 | .body | [사실 추궁] 메뉴에서 묻고 싶은 질문을 골라주세요. 어떤 질문이든 좋아요. | From the [Press for Facts] menu, choose any question you'd like to ask. | [事実追及]メニューから、聞いてみたい質問を選んでください。どの質問を選んでも大丈夫です。 | 请在[事实追问]菜单中选择想问的问题。任何问题都可以。 |
| 6 | evidence-investigate-e2.title | 증거 조사 | Examine Evidence | 証拠調査 | 证据调查 |
| 6 | .body | 증거 카드를 눌러 자세히 살펴보세요. 단서가 추가로 드러나요. | Tap an evidence card to examine it closely. More clues will come to light. | 証拠カードを押して、詳しく調べてみましょう。新しい手がかりが見えてきます。 | 请点击证据卡仔细查看。会有更多线索显现出来。 |
| 7 | evidence-present-e2-to-b.title | 증거 제시 | Present Evidence | 証拠提示 | 出示证据 |
| 7 | .body | 조사한 증거를 상대에게 제시해 진술을 흔들어보세요. | Present the evidence you've examined to the other party, and see if it shakes their statement. | 調べた証拠を相手に提示して、陳述を揺さぶってみましょう。 | 请把调查过的证据出示给对方，试着动摇对方的陈述。 |
| 8 | feedback-acknowledge.title | 반응 확인 | Check Reaction | 反応確認 | 查看反应 |
| 8 | .body | 상대의 반응을 살펴보세요. 진술이 어떻게 흔들리는지 보여요. | Watch the other party's response. You'll see how the statement starts to waver. | 相手の反応を見てみましょう。陳述がどう揺らぐのか分かります。 | 请看看对方的反应。你会看到陈述是如何动摇的。 |
| 9 | observation-hint.title | 재판관 수첩 | Judge's Notebook | 裁判官ノート | 法官笔记 |
| 9 | .body | 중요한 변화는 [재판관 수첩]에 자동으로 기록돼요. 잠시 후 다음으로 넘어가요. | Important changes are recorded automatically in [Judge's Notebook]. We'll move on in a moment. | 重要な変化は[裁判官ノート]に自動で記録されます。まもなく次へ進みます。 | 重要变化会自动记录在[法官笔记]中。稍后会进入下一步。 |
| 10 | tutorial-complete.title | 준비 완료! | All Set! | 準備完了! | 准备就绪! |
| 10 | .body | 이제 진실은 당신의 손에 달려 있어요. 직접 밝혀주세요. | Now the truth is in your hands. It's your turn to uncover it. | いよいよ真実はあなたの手に委ねられています。あなたの手で明らかにしてください。 | 现在，真相就掌握在你手中。请亲自揭开它。 |
| — | skip-button | 튜토리얼 건너뛰기 | Skip Tutorial | チュートリアルをスキップ | 跳过教程 |
| — | reopen-button | 튜토리얼 안내 | Tutorial Guide | チュートリアルガイド | 教程指引 |
| — | close-button | 안내 접기 | Close Guide | 案内を閉じる | 关闭指引 |

**검증 포인트**:
- UI 라벨 대괄호 표기 통일: `[다음 진술]` / `[Next Statement]` / `[次の陳述]` / `[下一陈述]`
- 톤: KO 존댓말 + EN polite + JA 敬語 + ZH 礼貌
- Flicky 마스코트 어휘 (귀여운 안내자) — `~주세요` / `please` / `~ましょう` / `请~`

---

### §9.3. Impact-VFX 효과 + timing 표

| 효과 ID | CSS 클래스 | 지속시간 | 발동 시점 | 시각 묘사 |
|---|---|---|---|---|
| screen-shake-light | `.pc-impact-screen-shake-light` | 240ms | evidence hit major | 전체 화면 살짝 흔들림 |
| screen-shake-medium | `.pc-impact-screen-shake-medium` | 420ms | T3 climax | 중간 강도 전체 흔들림 |
| screen-shake-heavy | `.pc-impact-screen-shake-heavy` | 680ms | (미사용?) | 강한 전체 흔들림 |
| screen-flash-white | `.pc-impact-screen-flash-white` | 240ms | (수동 발동 후보) | 흰 플래시 |
| screen-flash-dark | `.pc-impact-screen-flash-dark` | 440ms | T3 climax | 다크 플래시 |
| screen-freeze | `.pc-impact-screen-freeze` | 240ms | conflict feedback | 화면 순간 정지감 |
| vignette-strong | `.pc-impact-vignette-strong` | 780ms | T3 climax | 강한 비네팅 |
| vignette-red | `.pc-impact-vignette-red` | 780ms | (수동 발동 후보) | 붉은 비네팅 |
| portrait-shake | `.pc-impact-portrait-shake` | 460ms | evidence hit major | 대상 NPC portrait 흔들림 |
| portrait-desaturate | `.pc-impact-portrait-desaturate` | 1100ms | (수동 발동 후보) | portrait 채도 감소 |
| portrait-zoom-in | `.pc-impact-portrait-zoom-in` | 680ms | (수동 발동 후보) | portrait 확대 |
| card-slam | `is-effect-card-slam` modifier | 480ms | evidence hit + T3 | 피드백 카드 슬램 효과 |

**검증 동시 발동 조합**:
- **evidence_hit_major** (e-2 → 박지연): `card-slam` + `portrait-shake` + `screen-shake-light` (TC-Impact-02)
- **T3 climax** (h-d3 emerge 첫): `screen-flash-dark` + `screen-shake-medium` + `vignette-strong` + bigTypography + BGM duck (TC-Impact-01)
- **conflict feedback**: `screen-freeze` + `screen-shake-light` (DiscoveryFeedbackWatcher)
- **verdict cutscene**: 별도 cutscene (2.5초 컴포넌트, 위 효과 무관) (TC-Impact-03)

---

### §9.4. 단축키 / 콘솔 명령 / localStorage 키

#### 단축키

| 키 | 동작 |
|---|---|
| Enter | dialogue advance |
| Esc | modal/cutscene skip |
| F11 | 풀스크린 |
| F12 | devtools |

#### localStorage 키 (초기화 시 삭제 대상)

```
solomons:caseProgress:spouse-01
solomons:caseProgress:family-01
solomons:caseProgress:friend-01
solomons:tutorialCompleted:spouse-01
solomons:tutorialCompleted:family-01
solomons:tutorialCompleted:friend-01
solomons:telemetry:consent
solomons:telemetry:queue
solomons:settings:locale
solomons:settings:resolutionPreset
```

#### devtools 콘솔 명령 (있다면)

```js
// Telemetry queue 확인 (있다면)
useTelemetryStore?.getState?.()

// Tutorial 강제 재시작 (가능하다면)
useGameStore.getState().resetTutorial?.()

// caseData 확인
useGameStore.getState().caseData
```

(정확한 store API는 게임 코드에 의존. 위는 추정. 콘솔에 `useGameStore` 노출 여부에 따라.)

---

**참조 메모리**:
- [feedback_truth_leak_prohibition](memory) — 잘못 패턴 #9 (TC-FreeQ-03 / TC-Leak-01 본질)
- [feedback_translation_pipeline_placeholder_leak](memory) — TC-Park 도출 사례
- [design_tutorial_overlay_finalized](memory) — 튜토리얼 디자인 권위 (hand 위치 등)
- [feedback_tutorial_copy_tone](memory) — 튜토리얼 카피 톤 (Flicky 마스코트)
- [design_vfx_inventory_pc](memory) — VFX 인벤토리 (효과 카탈로그)
- [feedback_natural_korean_vs_translationese](memory) — 자연 한국어 정책 (TC-Trans 본질)
- [session_handoff_20260519_post_lqa_phase0](memory) — 현재 세션 핸드오프
