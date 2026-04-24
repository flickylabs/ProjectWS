# CT → Thread QW (신규 세션): V6 3사건 스크립트 전면 QA — 100라운드 반복

> 발신: CT (Control Tower)
> 수신: **Thread QW (Quality Writing)** — 신규 Claude Code 세션
> 일시: 2026-04-28
> 베이스 커밋: `8d18a39`
> 검증 대상: **spouse-01 / friend-01 / family-01** (활성 3건)

---

## ⚠️ 이 세션은 신규 생성

기존 QW 세션 컨텍스트는 없습니다. **이 문서가 유일한 입력**이므로 상단부터 순서대로 읽어주세요.

---

## ⚠️ V5(2026-04-14) PASS 이후 등장한 V6 신규 문제 3종

V5 검증은 **정적 JSON 스캔**에서 PASS 판정이었습니다. 그러나 2026-04-28 실플레이에서 **런타임 LLM 출력 + 시스템 메시지 조합** 영역에 아래 3종 문제가 발견되었습니다. V6의 최우선 목표는 이 3종을 제로화하는 것.

### 문제 1. 호칭 혼종 단일 문장 (치명)

한 발화(말풍선 1개) 내에 **재판관 존칭**과 **상대방 직접 호칭/반말**이 섞여 있는 경우.

실플레이 스크린샷 샘플:

> "재판관님, 그 메시지를 보면서 정말 가슴이 아팠습니다. … 재판관님, 그새벽에 전화하고 왜 메시지를 그렇게 보냈던 겁니까?"

문제: 앞은 재판관 대상 서술(합니다체), **마지막 질문은 상대방(남편)에게 하는 말**인데 "재판관님" 호칭이 붙어 있음.

> "… 재판관님, 그때 왜 솔직하게 말하지 않았어?"

문제: `재판관님` + **반말 종결** 결합. 재판관에게 반말 금지.

### 문제 2. 조사/Placeholder 원시 노출

시스템 메시지(또는 일부 빌더 출력)에 조사 placeholder가 치환되지 않고 UI에 그대로 노출.

실플레이 스크린샷 샘플:

> "박미라이(가) 증언대에 섰다."
> "은행 직원이(가) 증언대에 섰다."

원인 추정: 해당 시스템 메시지 빌더가 `koreanPostposition.fixPostpositions()`를 호출하지 않음. 올바른 출력: "박미라가 증언대에 섰다." / "은행 직원이 증언대에 섰다."

### 문제 3. 맥락 꼬임 / 시스템-NPC 경계 오염

- 재판관 질문 직후 NPC 응답이 **빈 메시지** 또는 `undefined`
- 시스템 메시지(이벤트 알림, 상태 변화)가 **일반 대사 말풍선**으로 렌더
- speaker/role 필드와 UI 분기의 불일치

---

## V6 = V5 상속 + 신규 Phase

| Phase | 라운드 | 상속/신규 | 초점 |
|---|---|---|---|
| A — 정적 스캔 | R1~R13 | V5 상속 | 금지패턴/조사/호칭/viewerData |
| D — 런타임 검증 | R14~R53 (40R) | ★ V6 신규 | 헤드리스 로그 파싱 + 집중-8/9/10 |
| E — 엔진 코드 스캔 | R54~R63 (10R) | ★ V6 신규 | `fixPostpositions()` 호출 누락 + placeholder 유출 + speaker 분기 |
| F — 반복 수정 루프 | R64~R100 (37R) | ★ V6 신규 | 수정 → 재플레이 → 잔존 확인 |

---

## 프로젝트 요약 (30초 브리핑)

"솔로몬 법정" — AI 둘의 싸움을 인간 재판관이 심문하는 추리 게임.

Phase 0(사건소개) → 1(초기진술) → 2(반박) → 3(심문) → 4(증거조사) → 5(재심문) → 6(중재) → 7(판결) → Result.

Phase 3~5가 핵심. 플레이어 질문 선택 → 재판관 질문 생성 → NPC 응답(LLM) → 상태 전이.
NPC 거짓말 상태 S0→S5. LieState에 따라 정보 공개 수준(Truth Throttle) 다름.

**활성 사건 3건만 QA 대상** (나머지 81건은 Legacy, 건드리지 마세요):
- spouse-01 (박지연 vs 이준호)
- friend-01 (송다은 vs 최수민)
- family-01 (윤태성 vs 윤정후)

---

## V5 상속 검증 체계 (그대로 적용)

### 기본 6축

| 축 | 항목 | PASS 기준 |
|---|---|---|
| 1 | **의미** | LieState에 맞는 정보 수준, 쟁점에 대한 답, 심문유형 맞는 반응 |
| 2 | **내용** | 사건 사실관계 무모순, Hidden 쟁점 조기 노출 없음, 정보 비대칭 위반 없음 |
| 3 | **맥락** | 직전 질문/증거에 대한 적절한 답, 감정 흐름 자연스러움 |
| 4 | **호칭** | 부부 직접=반말(자기야), 재판관에게=제 아내/남편(합니다체), 격앙=이름! |
| 5 | **존칭** | 당사자→재판관=합니다체, 부부간=반말, 증인→재판관=합니다체 |
| 6 | **어법** | 번역체 0건, 메타 누출 0건, 조사 정확, 자연스러운 구어체 |

### 추가 2축

| 축 | 항목 | PASS 기준 |
|---|---|---|
| 7 | **재판관 품질** | 기계적 관찰문 금지, 직접 인용 금지, 간접 화법만, depth별 구체성 증가 |
| 8 | **특수 상황 정합성** | 끼어들기/모순추궁/증인소환 시 대상(party) 정확, 메시지 누락 없음 |

### V5 집중 항목 1~7 (상속)

1. 조사(助詞) 오류 — "이준호은" → "이준호는"
2. 재판관 메시지 누락 — 모순 추궁/끼어들기/증거/증인 후 재판관 코멘트 존재
3. 끼어들기 대상 — 상대방 party 정확
4. 모순 추궁 시 NPC 응답 — 무응답/엉뚱한 쟁점 금지
5. 증인 다층 증언 — depth 1→2→3 체인
6. 증거 뷰어 데이터 정합성 — viewerData 키와 사건 스토리 일치
7. 판결/결과 화면 — 4지선다/저울/aftermath

상세 샘플·실행 방법은 [V5 가이드](ct-to-threadQW-v5-fulltest.md) 참조 — **V6 가이드를 먼저 완독한 뒤 V5 가이드의 집중 1~7 섹션도 반드시 훑을 것**.

---

## ★ V6 신규 집중 항목 3종 — 이번 검증의 핵심

### 집중-8: 호칭 혼종 단일 문장

**정의**: 한 발화(bubble 1개) 내에서 "재판관 호칭/존칭"과 "상대방 직접 호칭/반말"이 섞인 경우.

**검출 패턴 (regex)**:

| 서브타입 | 패턴 | 설명 |
|---|---|---|
| 8-a | `재판관님` ∧ (`자기야` \| `\b너\b` \| 이름 뒤 `아,` 또는 `야,`) | 재판관 호칭 + 상대 호격 공존 |
| 8-b | `재판관님` ∧ (`-았어\?` \| `-었어\?` \| `-잖아` \| `-지\?` \| `-\bㄴ데\?`) | 재판관 호칭 + 반말 종결 |
| 8-c | (`-습니다` \| `-십니다` \| `-ㅂ니다`) ∧ (`-았어` \| `-았지` \| `-잖아`) | 합니다체 + 반말 종결 혼재 |
| 8-d | `제\s*(남편\|아내)` ∧ (`자기야` \| `\b너\b`) | 간접 지칭 + 직접 호격 공존 |

**정합 규칙 (이 중 하나)**:
1. **재판관에게 말하는 발화** → 전 문장 합니다체 + `제 남편/제 아내`(간접) + `재판관님` 호칭
2. **상대방에게 직접 말하는 발화** → 전 문장 반말 + callTerms.toPartner(`자기야` 등) + 재판관 호칭 제외
3. **한 발화 내 두 대상 혼합 금지**. 대상 전환이 필요하면 **다음 발화로 분리**.

**교정 샘플**:

```
원문: "재판관님, … 재판관님, 그때 왜 솔직하게 말하지 않았어?"

교정 A (재판관 대상 유지):
"재판관님, … 그때 왜 솔직하게 말씀드리지 못했는지 저 자신도 모르겠습니다."

교정 B (상대방 대상으로 분리):
말풍선 1 (재판관에게): "재판관님, 그 메시지를 보면서 정말 힘들었습니다."
말풍선 2 (상대방에게): "자기야, 그때 왜 솔직하게 말하지 않았어?"
```

### 집중-9: 조사/Placeholder 원시 노출

**정의**: UI 최종 출력에 조사 placeholder 또는 템플릿 토큰이 치환되지 않은 원시 형태로 노출.

**검출 패턴 (regex)**:

| 서브타입 | 패턴 | 설명 |
|---|---|---|
| 9-a | `\([이가]\)` | "이(가)" 병기 원시 노출 |
| 9-b | `\([은는]\)` | "은(는)" |
| 9-c | `\([을를]\)` | "을(를)" |
| 9-d | `\([과와]\)` | "과(와)" |
| 9-e | `\([으]?로\)` | "(으)로" |
| 9-f | `\{[A-Z]+\}` | `{A}`, `{B}`, `{CASE}` 미치환 |
| 9-g | `\{[a-z_]+\}` | 소문자 템플릿 변수 미치환 |

**원인 추정**:
- `koreanPostposition.fixPostpositions()` 호출 누락한 시스템 메시지 빌더
- 템플릿 문자열의 변수 치환 누락
- 이름+조사 결합 시 `withSubjectParticle()` 등 헬퍼 사용 누락

**교정 방향**:
- 빌더 함수에 `fixPostpositions()` 호출 **추가** (로직 변경 없이)
- 또는 이름+조사 결합 지점에 `koreanPostposition`의 개별 헬퍼 적용

### 집중-10: 시스템↔NPC 경계 오염

**정의**: speaker/role 필드와 UI 말풍선 렌더 분기의 불일치.

**검출 패턴**:

| 서브타입 | 조건 | 설명 |
|---|---|---|
| 10-a | `speaker === 'system'` ∧ UI에 chat bubble로 렌더 | 시스템이 대사로 |
| 10-b | `speaker ∈ {A, B}` ∧ `!content \|\| content === 'undefined'` | 빈 NPC 응답 |
| 10-c | `speaker ∈ {A, B}` ∧ content가 관찰자 서술체 (`~한다\.` \| `~했다\.` \| `~되었다\.` \| `~섰다\.`) | NPC가 시스템 톤으로 말함 |
| 10-d | `speaker === 'judge'` ∧ content가 1인칭 대화체(`저는`, `제가`) | 재판관이 당사자 톤으로 |
| 10-e | NPC 말풍선에 `[시스템]` 프리픽스 또는 이벤트 뱃지 삽입 | 채널 오염 |

**정합 규칙**:
- `system` 메시지 = 관찰자 톤(`~한다`/`~했다`/`~되었다`) + 전용 컨테이너(시스템 알림/이벤트 피드)
- NPC 메시지 = 1인칭/대화체 + chat bubble 컴포넌트
- judge 메시지 = 합니다체 질문/관찰 + judge 말풍선 스타일
- **경계 중간 상태 금지**: 빈 NPC bubble, 시스템 톤 NPC content, 재판관 톤 NPC content 등

---

## 100라운드 실행 계획

### Phase A — 정적 스캔 (V5 상속, R1~R13)

| R | 대상 | 내용 |
|---|---|---|
| R1 | spouse-01 ScriptedText + Phase1/2 | 금지패턴 grep + 조사 오류 + 호칭 위반 |
| R2 | friend-01 ScriptedText + Phase1 + 증인 다층 | 동일 + 증인 testimony 텍스트 |
| R3 | family-01 ScriptedText + Phase1 + 증인 다층 | 동일 + 증인 testimony 텍스트 |
| R4 | 3사건 viewerData + R1~R3 수정 후 재스캔 | 영수증/GPS/통화/카톡 교차검증 |
| R5 | spouse-01 Phase 0→2 심층 | 맥락·호칭·존칭 |
| R6 | spouse-01 Phase 3~5 | 심문 루프 + 모순 + 끼어들기 + 증인 |
| R7 | spouse-01 Phase 6→Result | 중재 + 판결 + 후일담 |
| R8 | friend-01 전 구간 | Phase1 + 증인 다층 + LLM fallback |
| R9 | family-01 전 구간 | 동일 |
| R10 | R5~R9 수정 확인 | 사건별 빠른 재검증 |
| R11 | 3사건 끼어들기 + 모순 추궁 (집중-3/4) | speaker 정확성 |
| R12 | 3사건 증인 다층 (집중-5) | depth 체인 |
| R13 | 3사건 증거/판결/결과 (집중-6/7) | viewerData, solutions, aftermath |

### Phase D — ★ 런타임 검증 (R14~R53, 40R)

**실행 방법**:
1. 먼저 `tests/qw-runtime-audit.cjs` 스캐너를 작성 (아래 명세 참조)
2. `tests/run-84-headless.cjs`에 로그 덤프 옵션 존재 여부 확인. 없거나 부족하면 CT에 보고 — 최소 스키마는 아래 "로그 스키마" 참조
3. 각 라운드: 헤드리스 플레이 1회 → 로그 JSON 저장 → 스캐너 실행 → 결과 분석

**40라운드 경로 다양화**:

| R 범위 | 사건 | 경로 변형 축 |
|---|---|---|
| R14~R22 | spouse-01 × 9경로 | 퍼크 / 심문 순서 / 증거 타이밍 / 자백 유도 / 증인 순서 / 모순 시점 / 조합 / 자유질문 / 잠정인정 |
| R23~R31 | friend-01 × 9경로 | 동일 축 |
| R32~R40 | family-01 × 9경로 | 동일 축 |
| R41~R53 | 크로스 시나리오 (13R) | 경로 조합 변형 — 잔존 패턴 발견 목적 |

**라운드별 경로 설계 예시 (R14~R22 spouse-01)**:
- R14: 정상 경로 (표준 플레이)
- R15: 심문 대상을 A 집중 → B 집중 순으로
- R16: 증거 제시 타이밍 지연 (Phase 5에서만)
- R17: 자백 유도 집중 (empathy 위주)
- R18: 모순 추궁 집중 (fact_pursuit 위주)
- R19: 증인 소환 역순
- R20: 조합 최대치 달성
- R21: 자유 질문 전수 사용
- R22: 잠정 인정 반복

**라운드별 산출물 형식 (`tmp/qw-v6-rNN.md`, 최대 80줄)**:

```markdown
# QW V6 R{N}: {사건}-{경로요약}

## 실행
- 경로 시나리오: {간단 설명}
- 플레이 로그: `tmp/qw-v6-runtime-rNN.json`
- 스캐너 결과: `tmp/qw-v6-rNN-audit.json`

## 집중-8 호칭 혼종
- 카운트: 8-a={n}, 8-b={n}, 8-c={n}, 8-d={n}
- 샘플 최대 3건 (위치+원문+교정안)

## 집중-9 Placeholder 유출
- 카운트: 9-a~9-g 각
- 샘플 최대 3건

## 집중-10 경계 오염
- 카운트: 10-a~10-e 각
- 샘플 최대 3건

## V5 기본/집중 스냅샷
- 축1~8: PASS/FAIL 간단 요약
- V5 집중 1~7: 발견 건만 기록

## 수정 (이번 라운드, 권한 내)
- {파일}:{라인} — {변경 요약}

## CT 검토 요청 (권한 초과)
- {항목} — 2~3안 제시

## 다음 라운드로 이월
- {항목}
```

### Phase E — ★ 엔진 코드 스캔 (R54~R63, 10R)

| R | 대상 | 목적 |
|---|---|---|
| R54 | `src/engine/gameEventTriggerEngine.ts` + 시스템 메시지 빌더 전수 | `fixPostpositions()` 호출 누락 지점 색출 |
| R55 | `src/engine/judgeQuestionEngine.ts` + 재판관 관찰 빌더 | 재판관 질문/관찰 템플릿의 placeholder 치환 + 조사 처리 |
| R56 | `src/engine/blueprintPromptBuilderV2.ts` | 호칭 프롬프트의 toJudge/toPartner 분기 + few-shot 예시 부족 지점 |
| R57 | `src/engine/llmDialogueResolver.ts` | 호칭 혼종 후처리 hook 부재 여부 |
| R58 | `src/hooks/useActionDispatch.ts` | 시스템 메시지 push 지점의 role/speaker 분기 |
| R59 | `src/components/pc/layout/PCDialogueLog.tsx` + bubble 컴포넌트 | speaker 필드 → bubble 타입 매핑 |
| R60 | `src/engine/witnessEngine.ts` | 증인 증언 빌더의 이름+조사 처리 |
| R61 | `src/engine/interjectionV2.ts` | 끼어들기 대사의 호칭 분기 |
| R62 | `src/engine/scriptedTextLoader.ts` + 템플릿 변수 치환 파이프라인 | `{A}/{B}/{CASE}` 치환 누락 |
| R63 | 전수 재스캔 | 잔존 누락 확인 |

### Phase F — ★ 반복 수정 루프 (R64~R100, 37R)

각 라운드:
1. 누적 카운트 상위 1~3종 선택
2. 권한 내 수정 (아래 분기 참조)
3. Phase D 방식으로 재플레이 (해당 경로)
4. 스캐너 재실행 → 감소 확인
5. 미감소 시 원인 분석 → 다음 라운드

감소 곡선 추적:
- `tmp/qw-v6-mini-NN.md` (10R마다, 15줄 요약)
- R50 → `tmp/qw-v6-mid-report.md` (누적 잔존 이슈 정리)
- R100 → `tmp/thread-qw-v6-final-report.md` (최종)

---

## 수정 권한 분기 (엄수)

### ✅ 직접 수정 가능 (커밋은 금지, 변경만 적용)

| 범주 | 범위 |
|---|---|
| **텍스트 교정** | ScriptedText / Phase1/2 / viewerData / 증인 텍스트의 조사/호칭/번역체/구어체 손질 (기존 문장 손질 수준) |
| **빌더 호출 추가** | `koreanPostposition.fixPostpositions()` 호출 **누락 지점 보강** (호출만 추가, 로직 불변) |
| **프롬프트 few-shot 추가** | `blueprintPromptBuilderV2.ts`에 호칭 혼종 방지 예시 추가 (기존 규칙 강화만) |
| **placeholder 명시 치환** | 미치환 지점에 명시적 치환 추가 (문자열 템플릿 레벨) |
| **시스템 메시지 서술체 교정** | "박미라이(가) 증언대에 섰다" → "박미라가 증언대에 섰다" 식 |

### ⚠️ CT 경유 (보고만, 직접 수정 금지)

| 범주 | 이유 |
|---|---|
| 엔진 로직 변경 (상태 전이, 트리거, 분기) | 설계 판단 필요 — Codex/CT 영역 |
| UI 렌더 레이어 변경 (bubble 컴포넌트 구조) | 전반 영향 — Codex 영역 |
| 의미/스토리를 바꾸는 텍스트 재작성 | 유저 확인 필요 |
| 새 엔트리/채널 추가 | 스키마 영향 |
| 여러 파일에 걸친 구조 변경 | 리뷰 필요 |
| 새 문구 생성 (기존 문장 교정이 아닌 의미 창출) | **후보 2~3안 제시** 후 CT/유저 선택 |

### 필수 절차

- 매 수정 후 `npx tsc -b --force` 통과 확인 (실패 시 되돌리기)
- 커밋은 하지 않음 — CT가 라운드 묶어 일괄 커밋
- 수정 내용은 해당 라운드 `tmp/qw-v6-rNN.md`의 "수정" 섹션에 기록
- 새 문구 생성이 필요한 경우 "CT 검토 요청" 섹션에 후보 2~3안 기재

---

## 신규 스캐너 스크립트 명세

### `tests/qw-runtime-audit.cjs` (직접 작성)

**입력**: 헤드리스 플레이 로그 JSON (`tmp/qw-v6-runtime-rNN.json`)

**로그 스키마 (최소)**:
```json
{
  "caseId": "spouse-01",
  "scenario": "R14 default",
  "turns": [
    {
      "turnNo": 1,
      "speaker": "judge" | "A" | "B" | "system" | "witness:<id>",
      "role": "question" | "response" | "system_event" | "observation" | "aftermath" | "interjection",
      "content": "...",
      "phase": 3,
      "lieState": "S1",
      "eventType": "witness_summon" | "contradiction" | null
    }
  ]
}
```

`tests/run-84-headless.cjs`에 이 스키마로 `--output <path>` 옵션이 없으면 CT에 보고하여 옵션 추가 요청.

**핵심 로직 (의사코드)**:

```js
const HON_JUDGE = /재판관님/;
const HON_PARTNER = /(자기야|\b너\b|[가-힣]+(아|야),)/;
const ENDING_INFORMAL = /(았어\?|었어\?|잖아|지\?|-ㄴ데\?)/;
const ENDING_FORMAL = /(습니다|십니다|ㅂ니다)/;
const INDIRECT_REF = /제\s*(남편|아내)/;

const PLACEHOLDER_PATTERNS = [
  { type: '9-a', re: /\([이가]\)/ },
  { type: '9-b', re: /\([은는]\)/ },
  { type: '9-c', re: /\([을를]\)/ },
  { type: '9-d', re: /\([과와]\)/ },
  { type: '9-e', re: /\([으]?로\)/ },
  { type: '9-f', re: /\{[A-Z]+\}/ },
  { type: '9-g', re: /\{[a-z_]+\}/ }
];

const SYSTEM_TONE = /(한다|했다|되었다|섰다)\.$/;

function audit(log) {
  const issues = [];
  for (const t of log.turns) {
    // 집중-8 (NPC 대사만)
    if (t.speaker === 'A' || t.speaker === 'B') {
      const j = HON_JUDGE.test(t.content);
      const p = HON_PARTNER.test(t.content);
      const i = ENDING_INFORMAL.test(t.content);
      const f = ENDING_FORMAL.test(t.content);
      const ind = INDIRECT_REF.test(t.content);
      if (j && p) issues.push({ type: '8-a', turn: t });
      if (j && i) issues.push({ type: '8-b', turn: t });
      if (f && i) issues.push({ type: '8-c', turn: t });
      if (ind && p) issues.push({ type: '8-d', turn: t });
    }
    // 집중-9 (모든 턴)
    for (const p of PLACEHOLDER_PATTERNS) {
      if (p.re.test(t.content)) issues.push({ type: p.type, turn: t });
    }
    // 집중-10
    if (t.speaker === 'system' && t.role === 'response') issues.push({ type: '10-a', turn: t });
    if ((t.speaker === 'A' || t.speaker === 'B') && (!t.content || t.content === 'undefined')) {
      issues.push({ type: '10-b', turn: t });
    }
    if ((t.speaker === 'A' || t.speaker === 'B') && SYSTEM_TONE.test(t.content)) {
      issues.push({ type: '10-c', turn: t });
    }
  }
  return issues;
}
```

**출력 형식** (`tmp/qw-v6-rNN-audit.json`):
```json
{
  "round": 14,
  "caseId": "spouse-01",
  "scenario": "R14 default",
  "counts": { "8-a": 2, "8-b": 1, "8-c": 0, "8-d": 0, "9-a": 3, "10-a": 0, "10-b": 1, "10-c": 0 },
  "issues": [
    { "type": "8-a", "turnNo": 5, "speaker": "A", "phase": 3, "content": "...", "suggestedFix": "..." }
  ]
}
```

**배포**: R13 종료 후 R14 시작 전에 작성 완료 → Phase D/F에서 모든 라운드에서 호출.

---

## 컨텍스트 관리 (100R 단일 세션 유지)

### 자원 규약

1. **라운드별 `tmp/qw-v6-rNN.md`는 최대 80줄** — 긴 샘플은 `tmp/qw-v6-rNN-audit.json`에 저장하고 md에는 상위 3건 요약만
2. **10라운드마다 `tmp/qw-v6-mini-NN.md`** (최대 15줄) — 직전 10R의 누적 카운트/수정/이월만
3. **R50 → `tmp/qw-v6-mid-report.md`** — 누적 잔존 이슈, Phase F 우선순위 재조정
4. **R100 → `tmp/thread-qw-v6-final-report.md`** — 최종 판정

### 세션 중단 시 인수인계 규약

ThreadQW 세션이 컨텍스트 한계로 중단될 경우:
- 신규 세션에 전달할 필수 입력: **(1) 이 가이드 + (2) 마지막 mini-summary + (3) 현재 라운드 번호**
- 이 세 가지만으로 이어받을 수 있도록, 각 mini-summary에는 **"상태 스냅샷"** 포함:
  - 누적 카운트 (집중-8/9/10 각 서브타입)
  - 수정 완료 파일 목록
  - 대기 중인 CT 검토 항목
  - 다음 라운드에서 다룰 항목

### 컨텍스트 압박 시 대응

- 라운드 산출물을 80줄에 맞추지 못하면 **audit.json**으로 분리
- md 본문에 긴 원문 인용 금지 — 항상 "turnNo + 핵심 발췌 30자 + audit.json 참조"
- 중복되는 문제가 같은 라운드에 많이 나오면 **"동일 유형 n건, 대표 1건만 기재"** 규칙 적용

---

## 다양한 경로 전략 (Phase D 세부)

각 라운드는 **직전 라운드와 다른 경로**여야 의미 있는 신규 문제를 수집할 수 있습니다.

### 경로 변형 축 (조합)

| 축 | 변형 선택지 |
|---|---|
| 퍼크 | 없음 / 논리의 눈 / 직감의 촉 / 냉정한 관찰 / 마음의 다리 |
| 심문 대상 순서 | A 선행 / B 선행 / 교차 |
| 증거 제시 타이밍 | Phase 3 조기 / Phase 4 집중 / Phase 5 지연 |
| 자백 유도 전략 | empathy 집중 / fact 집중 / motive 집중 / 혼합 |
| 증인 소환 순서 | 기본 / 역순 / 기관증인 선행 |
| 모순 발생 시점 | 초반 / 중반 / 후반 |
| 조합 사용 | 최소 / 중간 / 최대 |
| 자유 질문 빈도 | 0회 / 중간 / 최대 |
| 잠정 인정 | 없음 / 1회 / 다회 |

R14~R40은 각 사건별로 축 1~3개씩 변형. R41~R53은 여러 축 동시 변형으로 엣지 케이스 탐색.

---

## 참고 문서

- [V5 가이드](ct-to-threadQW-v5-fulltest.md) — 6+2축, 집중 1~7, Phase A~C 상세
- [LLM 품질 튜닝 가이드](llm-quality-tuning-guide.md) — 프롬프트 구조, ARCHETYPE/TELL/FOCUS, Truth Throttle
- [V5 최종 리포트](../../../tmp/thread-qw-v5-fulltest-report.md) — 당시 PASS 기록, 검증 규모
- [CLAUDE.md](../../../CLAUDE.md) — 프로젝트 전반
- 메모리 참고:
  - `feedback_judge_question_quality.md` — 재판관 질문 품질 규칙
  - `feedback_qw_thorough_review.md` — QW 검증 깊이 요구
  - `haeyo_policy_decision.md` — 해요체 정책 (emotional/confession만 예외)
  - `feedback_scope_clarification.md` — "사건 완성" = 1건만

---

## 시작 체크리스트

세션 시작 첫 턴:
- [ ] 이 문서 정독
- [ ] [V5 가이드](ct-to-threadQW-v5-fulltest.md) + [V5 최종 리포트](../../../tmp/thread-qw-v5-fulltest-report.md) 정독
- [ ] [CLAUDE.md](../../../CLAUDE.md) + 상기 메모리 문서 정독
- [ ] `git status` 확인 → clean 상태 검증
- [ ] `tests/run-84-headless.cjs` 옵션 확인 (로그 덤프 지원 여부) — 부족하면 CT 보고
- [ ] `tests/qw-runtime-audit.cjs` 작성 (R13 이후 R14 시작 전)
- [ ] Phase A R1부터 시작

100라운드 완주 혹은 R50/R100 정식 리포트 제출이 목표.

---

## PASS 기준

| 등급 | 조건 |
|---|---|
| **PASS** | R100 final에서 집중-8/9/10 모두 **0건** + V5 축/집중 1~7 모두 PASS + 빌드 통과 |
| CONDITIONAL | 집중-8/9/10 합 **5건 이하** + 각 서브타입 경미 + V5 FAIL 0건 |
| FAIL | 집중-8/9/10 중 하나라도 **6건 이상** 또는 V5 FAIL 1건 이상 |

최종 판정은 R100 final-report에서.
