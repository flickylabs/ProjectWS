# QA Test Cases — 스크립트 (Content / Text / Policy)

**대상**: 활성 3건 (spouse-01, family-01, friend-01)
**Tier**: 2 (정책 보호막 작동 검증 단계 — 30일 안정 운영)
**대응 baseline**: a10b801 (`baseline-pre-policy-v1`)
**HEAD 기준**: `5378700` (병렬 QA 결과 취합은 동일 HEAD에서만 가능)
**자매 문서**: [`qa-functional.md`](qa-functional.md) (기능성 영역) / [`qa-test-cases.md`](qa-test-cases.md) (인덱스)
**병렬 세션 가능**: 이 문서는 자기완결. Codex / ClaudeCode 별도 스레드에서 단독 실행 OK.

---

## 시작 조건 (모든 세션 필수)

QA 시작 전 반드시 실행 + 결과 보고서 헤더에 기록:

```bash
git status --short --branch
git log --oneline -1
npm run check:all
```

**중단 조건**:
- HEAD가 명시 기준과 다름 → 작업 중단 + CT-Main 보고
- working tree dirty (untracked 외 modified 있음) → 작업 중단
- `npm run check:all` hard issues > 0 → 작업 중단 (baseline 회귀 의심)

**진행 조건**:
- HEAD = `5378700` (또는 CT-Main이 갱신한 새 기준)
- working tree clean (untracked OK)
- `npm run check:all` hard 0 / warnings ≈ 157 (baseline-known)

---

## 범위

정적 텍스트 / 호칭 / 진실 누설 lexeme / lieState 정합 / 한국어 품질 / UI 누설 영역.

**제외**: 게임 흐름 / 시뮬레이션 / LLM 응답 / 동적 영역 → [`qa-functional.md`](qa-functional.md)에서 다룸.

**핵심 차별**:
- 정적 데이터 = 결정적 (1회로 충분). 1000회 반복 = 의미 X
- 의미 / 자연성 / 우회 표현 = 자동 한계 (잘못 패턴 #12) → 의미 review가 1000회 plan 영역
- 동의어 우회 lexeme 검출 = LLM 기반 sample plan만 1000회 의미 있음

---

## 사용 방법

각 TC 표기:
- **[Auto]** — `npm run check:all` 자동 검출 (정적 / 결정적)
- **[Review]** — LLM/모델 기반 semantic review (Codex / CT 별도 스레드)
- **[Manual]** — 사용자 게임 플레이 spot check

우선순위:
- **P0** — 게임 핵심 원칙 위반 (진실 누설 / 직접 인용)
- **P1** — 정책 위반 / 정책 우회 표현 / 호칭 오류
- **P2** — 품질 / 자연성

실패 발견 시 [`docs/spot-check-format.md`](spot-check-format.md) 8필드 → CT 분류.

---

## B. 호칭 / 명칭 — A/B 노출 금지 ★ 사용자 명시

### TC-B1 [Auto+Review, P0] 재판관 → 당사자 호칭
- **범위**: 모든 재판관 채널 (`judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon`)
- **합격**:
  - "OOO 씨" 사용 (예: "박지연 씨", "이준호 씨", "윤태성 씨", "윤정후 씨", "송다은 씨", "최수민 씨")
  - 다음 표현 금지: `당사자 A`, `당사자 B`, `A씨`, `B씨`, `원고`, `피고`, `남편`, `아내`, `이쪽`, `저쪽`, `이 분`, `저 분`
- **Auto**: scriptedText 정규식 검출 (`당사자\s*[AB]` / `\b[AB]씨` / `원고|피고`)
- **Review**: 우회 표현 (`이쪽 분`, `저 분`, `상대측` 등) semantic detection
- **실패 기록**: variant ID / 채널 / 노출된 호칭

### TC-B2 [Auto+Review, P0] 시스템 메시지 / narration 캐릭터명
- **범위**: `system_message` + 모든 narration / 행동 묘사 영역
- **합격**:
  - 캐릭터 이름 사용 (예: "박지연이 잠시 침묵한다")
  - 다음 노출 금지: `partyA`, `partyB`, `partner`, `이쪽`, `저쪽`
  - 영문 archetype 코드 (`avoidant`, `victim_cosplay`, `confrontational`, `affect_flattening`, `cold_logic`, `premature_summary`) UI 노출 X
  - verbal tell 코드 (`over_precision`, `counter_question`, `timeline_padding`, `evidence_waving`, `motive_jump`, `selective_quote`) UI 노출 X
- **Auto**: 영문 코드 / partyA·B 정규식 검출
- **실패 기록**: 노출된 코드명 / 위치 (어떤 메시지 / 모달 / 팝업)

### TC-B3 [Auto+Review+Manual, P0] 행동 설명 코멘트 (verbal tell description) ★ 사용자 명시
- **범위**: NPC 발화 직전/직후 행동 묘사 ("...라고 말하며 시선을 피한다" / "잠시 침묵한 뒤")
- **합격**:
  - 캐릭터 이름 / "그" / "그녀" 사용
  - 다음 표현 금지: `A는`, `B는`, `A가`, `B가`, `원고는`, `피고는`, `이쪽은`, `저쪽은`, `상대방은`
  - 사용자 발견 사례 영역 — 우선 점검
- **Auto**: 정규식 (`\b[AB][는가]` / `원고[는가]` / `피고[는가]` / `이쪽[은이]` / `저쪽[은이]`)
- **Review**: 자연체 부조화 ("그 사람은", "당사자가" 등 어색 표현)
- **실패 기록**: 노출 위치 / variant ID

### TC-B4 [Auto+Review, P1] dossier / evidence / discovery 라벨 호칭
- **범위**: dossier 카드 label, evidence card name/label, `discoveryText`
- **합격**:
  - 캐릭터 이름 사용
  - "B가 시댁 불화" 같이 A/B로 캐릭터 지칭 X → "이준호가 시댁 불화" (단 lieState gate 정합 시)
- **Auto**: 정규식 + uiSurfaceMap 정합
- **실패 기록**: variant ID / 노출된 영역

### TC-B5 [Manual+Review, P2] 당사자 간 호칭 (callTerms)
- **범위**: NPC `interrogation` / `contradiction_pursuit`
- **합격**:
  - 재판관에게 상대 언급 → `callTerms.toJudge` (예: "제 남편이~", "제 형이~")
  - 상대에게 직접 → `callTerms.toPartner` (예: "자기야~", "형~")
  - 격앙 → `callTerms.angry`
- **Review**: 호칭 부조화 사용 위치 sample
- **실패 기록**: 잘못된 호칭 사용 위치 / lieState

---

## C. Truth Disclosure (Tier 1 정책 보호막) — 진실 누설 검출

### TC-C1 [Auto+Review, P0] judge_question 진실 lexeme 0건
- **범위**: 모든 `judge_question` entries
- **합격**: 사건별 금지 lexeme 0건
  - **spouse-01**: `형`, `친형`, `조카`, `조카딸`, `중2`, `돌봄`, `가족을 돌본`, `가족 사정`, `가족 지원`, `위임장 조작`, `투자 사기`, `형 빚`, `형의 오피스텔`, `학용품`, `조카 학교 알림`
  - **family-01**: `출생 비밀`, `배다른`, `혈연 다른`, `20년 동안 B 돈`, `정후 돈으로 어머니`
  - **friend-01**: `예비신랑이 먼저`, `아버지의 사기`, `아버지 돈 갈취`, `같은 패턴 반복`
- **Auto**: `npm run check:all` (truth-leak detector + policy-vs-data)
- **Review**: 동의어 우회 표현 (예: "사정", "돌봄", "사정상" 같은 lexeme list 외 동의어) — semantic search 1차 sample
- **실패 기록**: 채널 / variant ID / 노출 lexeme 또는 우회 표현

### TC-C2 [Auto+Review, P0] judge_contradiction 진실 lexeme 0건 + 간접 인용
- **범위**: 모든 `judge_contradiction` entries
- **합격**:
  - 진실 lexeme 0건
  - 직접 인용 X (`'X'라고 하셨는데, 'Y'라는 내용이 확인됩니다` 패턴 절대 X)
  - 간접 인용으로만 진술 변화 짚기 ("아까는 ~쪽으로 말씀하셨는데, 지금은 ~. 왜 달라졌습니까?")
- **Auto**: 직접 인용 정규식 검출
- **Review**: "관찰문 + 직접 인용" 결합 패턴 (시스템 톤 보강)

### TC-C3 [Auto+Review, P0] judge_evidence_combo 진실 추상화
- **범위**: 모든 `judge_evidence_combo` + dossier card label
- **합격**:
  - dossier card label 진실어 X
  - "두 자료가 같은 시점·같은 사람을 가리킵니다" 류 추상화 OK
  - "GPS와 형 문자 스레드가 한 사실을 가리킵니다" 패턴 X
  - "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다" (surface 사용) OK
- **Auto**: dossier label vs `uiSurfaceMap.dossierLabel` 비교

### TC-C4 [Auto+Review, P1] judge_witness_summon 진실 보호
- **범위**: 모든 `judge_witness_summon` entries
- **합격**: 증인 `surfaceKnowledge`만 사용. 증인 진실 영역 (관계/내막) X
- **실패 기록**: 증인 ID / 노출 영역

### TC-C5 [Auto+Review, P1] system_message 진실 콘텐츠 X
- **범위**: 모든 `system_message` entries
- **합격**: 진술 패턴 / 메커니즘 변화 안내만 ("진술이 달라지기 시작한다"). 진실 콘텐츠 X

### TC-C6 [Manual+Review, P1] dossier 안내 추상화
- **범위**: dossier 안내 텍스트 (자동 해금 알림 / 사용 안내)
- **합격**: 추상화된 단서 방향성만. 진실 dossier card label 노출 X

### TC-C7 [Manual+Review, P0] aftermath 외 채널 진실 직접 X
- **범위**: 판결 후가 아닌 모든 시점의 모든 채널
- **합격**: 판결 후 `aftermath`만 진실 자유 공개. 그 외 모두 정책 따름

---

## D. lieState 정합 (Truth Throttle) — 정적 데이터 영역

### TC-D1 [Auto+Review, P0] NPC interrogation S0~S2 진실 lexeme 0건
- **범위**: `interrogation` entries `lieState ∈ {S0, S1, S2}`
- **합격**: NPC 본인 발화도 S0~S2에서는 진실 lexeme 0건
  - S0: 부정 / "그게 좀 복잡해서요"
  - S1: "사정이 있다"까지
  - S2: "가족 일이라" 일반화 (단 "친형", "조카" 직접 X)
- **Auto**: `tmp/detect-truth-leak.cjs` lieState gate
- **Review**: 우회 표현 (lexeme list 외 동의어) sample
- **실패 기록**: variant ID / lieState / 노출 lexeme

### TC-D2 [Review+Manual, P1] NPC interrogation S3+ 점진 노출 자연성
- **범위**: `interrogation` entries `lieState ∈ {S3, S4, S5}`
- **합격**:
  - S3: 일부 진실 (책임 전가 맥락)
  - S4: 감정 폭발 + 일부 진실
  - S5: 자백 (전부 공개)
  - lieState 단계와 진술 톤 부조화 X (예: S2에 자백 톤 / S3에 부정 톤 / S5에 회피 톤)
- **Review**: 같은 dispute × party의 S0~S5 entries 의미 흐름 cross-validation
- **실패 기록**: lieState와 부조화 entry / 단계 점프 위치

### TC-D3 [Review+Manual, P1] contradiction_pursuit lieState 정합
- **범위**: `contradiction_pursuit` entries
- **합격**: S0~S1에서 모순 추궁 시 진실 노출 X / S3+ 일부 허용

### TC-D4 [Auto, P2] emotional_overload S4+ only
- **범위**: `emotional_overload` entries
- **합격**: `lieState ≥ S4`에서만 발동. S0~S3에서 발동 X
- **Auto**: lieState 메타 정합 검출

### TC-D5 [Review+Manual, P1] archetype voice 정량 일관 (정적)
- **범위**: 같은 NPC entries 전체 (스크립트 영역만 — LLM 응답은 [`qa-functional.md`](qa-functional.md) TC-I2)
- **합격**:
  - `victim_cosplay` (박지연): 단정 빈도 ≥ 70%
  - `avoidant` (이준호): 모호어 ≥ 50% (S0~S2)
  - `affect_flattening` (윤정후 / 최수민): 격앙 ≤ 10%
  - `confrontational` (윤태성): 직접 공격 빈도 높음
  - `premature_summary` (송다은): 결론 jump 패턴
- **Review**: archetype별 entries 100~500 sample → 정량 메트릭

---

## F. 한국어 품질 — 정적 데이터 영역

### TC-F1 [Auto+Review, P1] 번역체 9패턴 X
- **합격**: `~된 것으로 생각됩니다` / `~인 측면이 있었습니다` / `부득이하게` 등 X
- **Auto**: scriptedText 정규식 검출
- **Review**: 변형 번역체 (자동 검출 외) sample

### TC-F2 [Manual+Review, P1] 톤 일관
- **범위**: 모든 channel
- **합격**:
  - 재판관 → 당사자: 합니다체
  - 당사자 → 재판관: 합니다체
  - 당사자 간: 반말 (`callTerms.toPartner`)
  - emotional / confession beat: 해요체 예외 OK
- **Review**: channel × tone sample → 부조화 검출
- **실패 기록**: 톤 부조화 위치

### TC-F3 [Auto+Review, P1] 기계적 관찰문 X
- **합격**: `태도에 변화가 감지됩니다` / `내용이 확인됩니다` / `흐름이 나타납니다` X
- **Auto**: 정규식 검출
- **Review**: 변형 표현 (`태도가 보입니다`, `내용을 알 수 있습니다` 류 부조화) sample

### TC-F4 [Auto+Review, P0] 직접 인용 X / 간접 인용 O
- **합격**: `'X'라고 하셨는데, 'Y'라는 내용이 확인됩니다` 패턴 절대 X
- **Auto**: `'.*'라고 하셨는데.*'.*'` 정규식 검출

### TC-F5 [Review+Manual, P2] 명사형 부자연 X
- **합격**: `X 돌봄` / `X 지원` 류 명사형 어색 표현 X. `X을 ~한 것` 동사형 OK
- **Review**: 명사형 어색 패턴 sample (사용자 모범 보정 학습 — `feedback_revision_meaning_over_form.md`)

### TC-F6 [Auto, P2] 조사 자동 교정 (이/가, 을/를, 은/는, 과/와)
- **합격**: `koreanPostposition.fixPostpositions()` 후처리 정상

### TC-F7 [Manual+Review, P1] 사건 fact 정합
- **범위**: 모든 채널
- **합격**: 비율 / 금액 / 날짜 / 인물 관계 일관
  - spouse-01: 적금 3,000만원 / 비자금 2,000만원 / 합산 5,000만원
  - family-01: A 40 / B 60
  - friend-01: 손절 사건 + 예비신랑 사건 패턴 동형
- **Review**: 핵심 fact 정합 sample 검증
- **실패 기록**: 사실 충돌 위치

---

## G. UI 누설 (P7) — 컴포넌트 렌더 영역

### TC-G1 [Manual+Review, P1] 증거 패널 surface만 표시
- **범위**: 증거 모달 / 증거 카드 / 핫바 증거 list
- **합격**: `surfaceName` + `surfaceDescription`만. `evidence.name` (진실) 노출 X
- **Review**: src/components/* 코드 audit
- **실패 기록**: 노출 위치 / evidence ID

### TC-G2 [Manual+Review, P1] dossier 패널 추상화
- **범위**: dossier 카드 / dossier 패널 / 자동 해금 알림
- **합격**: dossier card label 추상화. 진실어 X

### TC-G3 [Manual+Review, P0] 발언 노트 / 핫바 호칭
- **범위**: 발언 노트 드로어 / 하단 핫바 프로필 / 화자 라벨
- **합격**:
  - 캐릭터 이름 사용
  - `A`, `B`, `partyA`, `partyB`, `원고`, `피고` X
- **실패 기록**: 노출 위치

### TC-G4 [Manual+Review, P1] 모달 / 팝업 진실어 X
- **범위**: PCInteractionPanel / PCEvidenceDetail / 통합 팝업 / 판결 화면
- **합격**: 위 채널 정책 따름. 진실어 X

### TC-G5 [Manual+Review, P1] 시스템 메시지 (UI overlay) 정책 정합
- **범위**: 모달 안내 / 토스트 / 시스템 카드
- **합격**: 진실 콘텐츠 X / 추상화된 안내만

---

## Codex 1000회 plan — 우선순위 (스크립트 영역)

**핵심 인식**: 정적 데이터 = 결정적. 1000회 같은 검사 반복 = 자원 낭비. 다만 다음 영역은 다중 sample 의미 있음.

| Plan | 영역 | 회수 | 의미 | 우선 |
|---|---|---|---|---|
| **S-1** | 동의어 우회 lexeme semantic detection | sample 500~1000 entries × 9 차원 | TC-C1·D1 자동 한계 보강 (잘못 패턴 #12) | ★★★★★ |
| **S-2** | 9 specialist semantic review | random sample 500 × 9 차원 = 4500회 | TC-D2·D5·F2·F5 의미 review | ★★★★ |
| **S-3** | archetype voice 정량 (정적) | 6 archetype × 100 entries | TC-D5 캐릭터 일관성 | ★★★ |
| **S-4** | UI 코드 audit | src/components/* sweep | TC-G1~5 P7 누설 | ★★★ |
| **S-5** | uiSurfaceMap 정합 cross-check | 정적 1회 | TC-B4 / TC-C3 정합 | ★★ |

**Codex 단독 가능** (S-1, S-3, S-4, S-5)
**ClaudeCode 별도 스레드 교차 추천** (S-2 — 의미 차원 깊은 review, 잘못 패턴 #6)

---

## 분담

| 항목 | Codex 단독 | CT 별도 스레드 | 사용자 |
|---|---|---|---|
| TC-B1·B2·B3·B4 (호칭) | Auto + Review sample | 교차 sample | Manual |
| TC-B5 (callTerms) | Review sample | 교차 sample | Manual |
| TC-C1~5 (truth lexeme) | Auto + Review 우회 표현 | **교차 review (의미 차원)** | Manual |
| TC-C6·C7 (dossier·aftermath) | — | Review | Manual |
| TC-D1 (S0~S2 lexeme) | Auto | — | — |
| TC-D2·D3 (S3+ 자연성) | Review sample | **교차 review** | Manual |
| TC-D4 (emotional gate) | Auto | — | — |
| TC-D5 (archetype 정량) | Sim S-3 | 교차 review | — |
| TC-F1·F3·F4·F6 (한국어 자동) | Auto | — | — |
| TC-F2·F5·F7 (한국어 자연성) | Review sample | **교차 review** | Manual |
| TC-G1~5 (UI 누설) | S-4 코드 audit | 교차 코드 audit | Manual |

**자동 검출 한계** (잘못 패턴 #12):
- 동의어 우회 (lexeme list 외)
- lieState 자연성 (entry 의미 차원)
- 톤 자연성 / 명사형 부자연
- UI 노출 영역 광역
- archetype voice 자연성

→ Review (Codex/CT 양쪽) + Manual 사용자 spot check 필수.

---

## 합격 기준 (스크립트 영역)

3가지 동시 충족 시 Tier 2 안정 인정:
1. **Auto wrapper**: `npm run check:all` hard 0 + new warnings 사유 명시
2. **Review semantic**: Codex S-1 / CT 교차 S-2 검출 사례 처리 + 재검증 PASS
3. **Manual spot check**: 사용자 게임 플레이 중 P0/P1 발견 0건 (P2 누적 OK)

→ 한 사람 단독 완료 선언 X (잘못 패턴 #1).

**Tier 2 warning 기준**:
- baseline-known warnings (현재 ≈ 157건) = hard fail 아님
- `forbiddenLexemes.surfaceOnly` 기본 WARN (정적 분석 false positive 회피 — `--strict-lexeme` 옵션으로 hard 승격 가능)
- `surfaceName alias` 보호 alias 가능성 = WARN (Codex 설계로 의도된 추상화, 정책 align 여부는 사용자 결정 영역)
- 합격 기준은 **new hard issues = 0** + **new warnings 사유 설명** (baseline 회귀 X 입증)

---

## 결과 보고 공통 포맷

각 세션 완료 시 `tmp/qa-scripted-results/{YYYYMMDD}-{plan}-summary.md` 작성:

```md
# QA Scripted Result — Plan {S-1~S-5}

- **Session**: QA-Codex-Scripted / QA-CT-Cross
- **HEAD**: 5378700 (기준 HEAD, 변경 시 명시)
- **Scope**: TC-C1 / TC-D1 / TC-G3 / ...
- **Commands run**: `git log --oneline -1` / `npm run check:all` / ...
- **PASS / FAIL / BLOCKED**: 0 / 0 / 0
- **P0 findings**: 개수 + variant ID list
- **P1 findings**: 개수 + variant ID list
- **P2 findings**: 개수 + variant ID list
- **Known baseline warnings**: 157 (또는 갱신값)
- **New warnings**: 0 (변경 시 사유 명시)
- **New hard issues**: 0 (>0 = 작업 중단 + CT-Main 보고)
- **Warning delta explanation**: surfaceOnly WARN 영역 / surfaceName alias 보호 영역 명시
- **Repro variant ID / TC ID / channel / lieState**: 발견 case별
- **Suggested next action**: CT-Main 처리 / Codex 의뢰서 / GPT Pro 경유 / Manual spot check 보강
- **Files touched**: none (검출/보고 전용 — 수정 X)
```

---

## 실패 발견 시 워크플로우

1. 발견 (Auto wrapper / Review sample / Manual spot check)
2. [`docs/spot-check-format.md`](spot-check-format.md) 8필드 기록 (TC-? 식별자 부착)
3. 분류: B / C / D / F / G → 우선순위 (P0~P2)
4. CT 패턴 추출 (잘못 패턴 #11 — 사용자 사례 = 시작점, 동형 광범위 검출)
5. Codex 의뢰서 (필요시) 또는 직접 Edit (소규모 / 대규모는 GPT Pro 경유)
6. 처리 → 검증 (자동 wrapper + 상대 모델 review) → 사용자 confirm
7. baseline-pre-policy-v1 (a10b801) 회귀 X 확인 → commit

---

## 절대 회피

- **ScriptedText 자동 일괄 수정** (잘못 패턴 #6) — 9차원 의미 정확성 살린 수정만
- **사용자 1 사례만 처리** (잘못 패턴 #11) — 동형 광범위 검출 강제
- **자동 PASS = 완료 단정** (잘못 패턴 #1, #12) — Review + Manual 동시 충족
- **단순 어휘 교체** — 의미 정확성 우선 (`feedback_revision_meaning_over_form.md`)
- **GPT Pro 산출물 무비판 적용** — Claude 한국어 보정 필수 (`feedback_gpt_pro_claude_review.md`)

---

## 세션 절대 금지선 (검출/보고 전용)

QA 세션은 **검출 + 보고 전용**. 다음 모두 금지:

- ScriptedText 직접 수정 X
- caseData 직접 수정 X
- runtime code 직접 수정 X (`src/engine/`, `src/components/`, `src/hooks/`, `src/store/`)
- 정책 JSON 수정 X (`src/data/disclosurePolicy/`)
- 정책 Markdown 수정 X (`docs/disclosure-policy.md`)
- 검증 wrapper 수정 X (`tmp/run-all-checks.cjs` 등)
- TC 문서 수정 X (CT-Main 영역)
- baseline anchor 회귀 X (a10b801)
- runtime import 신규 X (Tier 3 진입 전)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader` 등 대형 리팩터 X (Tier 4+ 보류)

**S-4 (UI 코드 audit) 특별 명시**:
- `src/components/*` 읽기/보고만 허용
- 발견 P7 누설 = 보고서에 위치 + 사유 기록
- 수정은 **별도 Codex-Dev 의뢰** 분리 (QA 세션 외부)

발견 case → 보고서 작성 → CT-Main이 처리 결정.

---

## 다음 작업

이 TC 문서 검토 후:
- **Plan S-1** 우선 시작 (Codex 동의어 우회 semantic detection — TC-C1/D1 보강)
- **Plan S-2** 병렬 (CT 별도 스레드 9 specialist semantic review)
- 자동 wrapper 30일 안정 운영 (`npm run check:all` 정기 실행)
- 결과 패턴 → Tier 1 정책 lexeme list / 검증 wrapper 보강

---

## 관련 자료

- 정책: [`docs/disclosure-policy.md`](disclosure-policy.md)
- 의뢰서 표준: [`docs/codex-request-template.md`](codex-request-template.md)
- spot check 포맷: [`docs/spot-check-format.md`](spot-check-format.md)
- 자동 wrapper: [`tmp/run-all-checks.cjs`](../tmp/run-all-checks.cjs) / `npm run check:all`
- 정책 JSON: [`src/data/disclosurePolicy/`](../src/data/disclosurePolicy/) (runtime import 금지 — Tier 3 진입 전)
- baseline: [`baseline/pre-policy-v1/rollback-procedure.md`](../baseline/pre-policy-v1/rollback-procedure.md)
- 자매 문서: [`qa-functional.md`](qa-functional.md)
