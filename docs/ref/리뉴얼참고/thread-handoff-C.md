# 스레드 C: GPT 배치 산출물 → 코드 통합 파이프라인

## 현재 진행 상황 (2026-04-02 기준)

### 통합 완료 (25개 사건)
```
spouse-01  : 기존 완료 (별도 구조 — session1/session2/supplement 머지 방식)
family-01  : 기존 완료 (별도 구조 — session3 + gpt-session1/2 방식)
family-02~12 : GPT 배치 → 정규화 → 등록 모듈 → Store 연결 완료
friend-01~12 : GPT 배치 → 정규화 → 등록 모듈 → Store 연결 완료
```

### GPT 배치 대기 (59개 사건)
```
spouse-02~12     : 11개
neighbor-01~12   : 12개
partnership-01~12: 12개
tenant-01~12     : 12개
workplace-01~12  : 12개
```
- 모든 대기 폴더의 `00-요청서.md`는 **업데이트된 템플릿**이 적용된 상태
- 요청서 + 사건원본 JSON을 GPT 새 스레드에 첨부하고 "진행해 주세요"로 실행

---

## GPT 배치 요청 방법 (변경 없음)

### 폴더 구조
```
docs/ref/리뉴얼참고/gpt-batch/{{CASE_ID}}/
├── 00-요청서.md              ← GPT에 첨부 (업데이트된 템플릿 적용 완료)
└── 사건원본_{{CASE_ID}}.json  ← GPT에 첨부
```

### GPT 실행
1. 새 스레드 생성
2. `00-요청서.md` + `사건원본_XXX.json` 2개 첨부
3. "진행해 주세요" 전송
4. 산출물 3개 파일(+ TS export) 수령 → 해당 폴더에 저장

### 산출물 저장 위치
```
docs/ref/리뉴얼참고/gpt-batch/{{CASE_ID}}/
├── {{CASE_ID}}-v2-atoms.json
├── {{CASE_ID}}-v2-atoms.ts
├── {{CASE_ID}}-tells-beats.json
├── {{CASE_ID}}-tells-beats.ts
├── {{CASE_ID}}-v3-game-loop-data.json
└── {{CASE_ID}}-v3-game-loop-data.ts
```

---

## 업데이트된 템플릿의 핵심 변경점

family/friend 배치에서 스레드마다 ID 패턴과 필드명이 불일치하는 문제가 발생했다.
원인: 프롬프트에 엄격한 명세가 없었고, GPT가 각 스레드에서 독립적으로 "합리적 추론"을 한 결과.

### 추가된 규칙 (요청서에 이미 반영됨)

| 항목 | 규칙 |
|------|------|
| ID 구분자 | 반드시 콜론(`:`) — 점/하이픈/언더스코어 금지 |
| caseId 접두사 | 하이픈 없음: `neighbor01` (O) / `neighbor-01` (X) |
| ClaimAtom ID | `{{CASE}}:{{PARTY}}:{{DISPUTE}}:{{TAG}}:{{INDEX}}` |
| Tell ID | `{{CASE}}:{{PARTY}}:tell:{{TELL_NAME}}` |
| BeatScript ID | `{{CASE}}:beat:{{PARTY}}:{{DISPUTE}}:{{BEAT_TYPE}}` (필수) |
| TransitionBeat ID | `{{CASE}}:transition:{{PARTY}}:{{DISPUTE}}:{{FROM}}_{{TO}}` (필수) |
| revealAtom ID | `{{CASE}}:{{PARTY}}:{{DISPUTE}}:unlock:{{STATE}}:{{INDEX}}` |
| events 필드명 | `trigger` (O) `cue` (X) / `text` (O) `line` (X) / `relatedDisputes` (O) `relatedEvidenceIds` (X) |
| slots 키 | `exact`, `neutral` (필수) / `target`, `fallback`, `cropped` 금지 |
| 임의 필드 | `followUpHint`, `narrationHint`, `impact`, `revealAtomIds` 등 추가 금지 |
| 최종 체크리스트 | 요청서 하단에 8항목 포함 |

---

## Claude Code가 하는 통합 작업 (산출물 수령 후)

### 1단계: 정규화 (안전망)
```bash
node tests/normalize-gpt-batch.cjs
```
- 업데이트된 템플릿으로 생성해도 만일의 불일치를 자동 수정
- idempotent — 여러 번 돌려도 안전
- 수정 항목: Tell ID 구분자, BeatScript/TransitionBeat id 누락, events 필드명, slots 키

### 2단계: 등록 모듈 생성
사건마다 `src/data/claimPolicies/{{CASE_ID}}.ts` 파일 생성.

패턴 (모든 사건 동일):
```typescript
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { {{camel}}V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/{{CASE_ID}}/{{CASE_ID}}-v2-atoms'
import { {{camel}}TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/{{CASE_ID}}/{{CASE_ID}}-tells-beats'
import { {{camel}}V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/{{CASE_ID}}/{{CASE_ID}}-v3-game-loop-data'

export function register{{CamelUpper}}Data(): void {
  registerClaimPolicies('{{CASE_ID}}', ({{camel}}V2Atoms as any).claimPolicies)
  registerExecutableTells('{{CASE_ID}}', 'a', ({{camel}}TellsBeats as any).executableTells.a)
  registerExecutableTells('{{CASE_ID}}', 'b', ({{camel}}TellsBeats as any).executableTells.b)
  registerV3GameLoopData({{camel}}V3GameLoopData as any)
  registerBeatScripts('{{CASE_ID}}', ({{camel}}TellsBeats as any).beatScripts)
}
```

변수명 규칙:
- `{{camel}}`: `neighbor-01` → `neighbor01`
- `{{CamelUpper}}`: `neighbor-01` → `Neighbor01`

### 3단계: Store 연결
`src/store/useGameStore.ts`의 `initializeCase` 함수에 등록 호출 추가:

```typescript
// import 추가 (파일 상단)
import { registerNeighbor01Data } from '../data/claimPolicies/neighbor-01'

// initializeCase 내부 (caseKey 분기)
if (caseKey === 'neighbor-01') registerNeighbor01Data()
```

### 4단계: 빌드 확인
```bash
npx tsc --noEmit     # TypeScript 컴파일 에러 확인
npx vite build       # 프로덕션 빌드 확인
```

---

## 현재 등록 구조 (useGameStore.ts initializeCase)

```
spouse-01   → registerSpouse01Data()   (별도 구조: session1 JSON + session2 JSON + supplement)
family-01   → registerFamily01Data()   (별도 구조: session3 JSON + gpt-session1/2 TS)
family-02~12 → registerFamily02~12Data()  (GPT 배치 통합)
friend-01~12 → registerFriend01~12Data()  (GPT 배치 통합)
```

### 주의: spouse-01과 family-01은 별도 구조
이 2개는 GPT 배치 이전에 수작업으로 만들어서, Bridge와 EvidenceChallenge가 별도 JSON에 포함돼 있다.
GPT 배치 사건(family-02 이후)은 Bridge/EvidenceChallenge가 없는 상태로 등록된다.
→ 추후 Bridge/EvidenceChallenge를 별도 배치로 생성하거나, 엔진이 없으면 graceful fallback하도록 처리 필요.

---

## V2 스크립트 전환 — A스레드 연동 (2026-04-02)

> 상세: `docs/ref/리뉴얼참고/thread-sync-V2-requirements.md`

### 배치 2단계 구조

| 단계 | 내용 | 산출물 | 대상 | GPT 세션 수 |
|------|------|--------|------|------------|
| **세션 A** | V1 확장 (3종→4종) | v2-atoms + tells-beats + v3-game-loop + **structure-v2** | 미진행 55개 | 55 |
| **세션 A 보충** | V2 구조 보충 | **structure-v2** | 기 진행 25개 (family+friend) | — (세션 B와 합산) |
| **세션 B** | V2 Beat 전용 | **beats-v2-full** | 84개 전체 | 84 |
| 합계 | — | — | — | **~139회** |

### 왜 2세션인가
- Structure V2(dispute 구조, evidence timing, freeQuestionHook)는 **사건 원본만으로 생성 가능** → V1 세션에 합칠 수 있음
- BeatScript V2는 **V1 atom + Structure V2가 입력으로 필요** + 가장 복잡(가변 밀도, 조건 6축, truthEnvelope) → 별도 세션이 품질에 유리
- 1세션 통합 시 토큰 한계 + 뒤쪽 요구사항 누락 위험

### V1/V2 관계
- V2 데이터가 없어도 **게임은 정상 동작** (기존 LLM 경로로 자동 fallback)
- V2 BeatScript 배치는 **V1 산출물 + Structure V2가 입력으로 필요** → 세션 A 먼저
- V1 템플릿: `docs/ref/리뉴얼참고/gpt-batch/00-배치요청서-템플릿.md`
- V2 추가배치 템플릿: `docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md`
  - structure-v2 + beats-v2-full 2종을 한번에 생성 (분리 불필요)

### V2 데이터 등록 방식

V2 데이터가 준비되면, 기존 V1 등록 모듈(`src/data/claimPolicies/{{CASE_ID}}.ts`)에 조건부 로딩 추가:

```typescript
// V1 등록 코드 끝에 추가
import { registerStructureV2, registerBeatsV2 } from '../../engine/v2DataLoader'

// V2 데이터가 있으면 등록 (파일이 없으면 무시)
try {
  const structureV2 = require('./{{CASE_ID}}-structure-v2.json')
  const beatsV2 = require('./{{CASE_ID}}-beats-v2-full.json')
  registerStructureV2(structureV2 as any)
  registerBeatsV2(beatsV2 as any)
  console.log(`[V2] ${caseId} V2 데이터 등록 완료`)
} catch {
  // V2 데이터 없음 — 기존 LLM 경로 사용
}
```

Store 변경 불필요 — `registerXXXData()` 내부에서 V2까지 처리.

### 현재 V2 파일럿 현황

| 사건 | V1 (3종) | Structure V2 | Beats V2 | 비고 |
|------|----------|-------------|----------|------|
| spouse-01 | O | O | O | V2 활성 |
| family-01 | O | O | O | V2 활성 |
| family-02~12 | O | — | — | LLM fallback |
| friend-01~12 | O | — | — | LLM fallback |
| 나머지 55개 + 진행 중 4개 | 대기 | — | — | LLM fallback |

### V2 ID 규칙 (2026-04-02 갱신 — C스레드 규칙에 통일)
- V1 ID: 콜론(`:`) 구분자 — `spouse01:a:d-1:act:0`
- V2 BeatScript ID: **콜론(`:`) 구분자** — `family02:beat_v2:a:d-1:surface:pressure:timeline:01`
- V2 antiRepeatGroup: `a:d-1:surface:pressure:timeline`
- V2 coverageKey: `a:d-1:surface:early:pressure:timeline`
- V2 linkEdge ID: `link:d-1:d-5:supports`
- V2 freeQuestionHook ID: `fq:d-1:recipient_identity`
- 별도 레지스트리(`v2DataLoader`)에서 관리 → V1과 네임스페이스 분리
- **주의**: spouse-01, family-01 파일럿은 점(`.`) 구분자로 작성됨. 엔진이 ID를 파싱하지 않으므로 동작에 문제 없음.

---

## 파일 위치 요약

```
프롬프트 템플릿 (V1) : docs/ref/리뉴얼참고/gpt-batch/00-배치요청서-템플릿.md
프롬프트 템플릿 (V2 추가배치) : docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md
V2 전체 스펙        : docs/diagnosis/11-v2-script-transition-spec.md
V2 연동 문서        : docs/ref/리뉴얼참고/thread-sync-V2-requirements.md
정규화 스크립트      : tests/normalize-gpt-batch.cjs
등록 모듈 (완성)    : src/data/claimPolicies/family-{01~12}.ts, friend-{01~12}.ts
Store               : src/store/useGameStore.ts → initializeCase()
엔진 (V1 데이터 소비):
  - src/engine/v3GameLoopLoader.ts  (DossierCard, StateUnlockAtom, Event, TransitionBeat, BeatScript)
  - src/engine/tellValidator.ts     (ExecutableVerbalTell)
  - src/data/claimPolicyLoader.ts   (ClaimPolicy V2 atom)
  - src/engine/bridgeEngine.ts      (Bridge — 현재 배치 미포함)
  - src/engine/evidenceChallengeEngine.ts (EvidenceChallenge — 현재 배치 미포함)
엔진 (V2 데이터 소비):
  - src/engine/v2DataLoader.ts      (Structure V2 + BeatScript V2 등록/조회)
  - src/engine/beatSelectorV2.ts    (BeatScript V2 선택)
  - src/engine/npcReactionV2.ts     (순응/저항/역공 확률)
  - src/engine/questionFatigueEngine.ts (피로도 관리)
  - src/engine/interjectionV2.ts    (끼어들기 V2)
```

---

## 배치 로드맵

### Phase 1: V1 배치 (현재 진행)

```
기 완료: spouse-01, family-01~12, friend-01~12  (25개) — 정규화 + 등록 완료
진행 중: spouse-02~05 (4개) — 도착 시 정규화 + 등록 예정
미작업:
  1. spouse-06~12     (7개)
  2. neighbor-01~12   (12개)
  3. partnership-01~12 (12개)
  4. tenant-01~12     (12개)
  5. workplace-01~12  (12개)
  합계: 55개 — V1 3종, 업데이트된 템플릿 적용 완료
```

병렬 3~4개 동시 실행 가능. 산출물이 돌아오면 Claude Code에:
> "{{CASE_ID}} 산출물이 폴더에 저장됐어. 정규화 + 등록 + Store 연결 해줘."

### Phase 2: V2 추가 배치 (V1 완료 후)

V2 추가배치 템플릿(`00-V2-추가배치-템플릿.md`)으로 **structure-v2 + beats-v2-full 2종을 한 세션에서 동시 생성**.

```
전체 84개 사건 × V2 2종 (한 세션에서 함께 생성)
입력: 사건원본 + V1 산출물(v2-atoms + v3-game-loop-data)
V1 완료된 카테고리부터 순차 진행 가능
```

V2 데이터 배치 위치: `src/data/claimPolicies/{{CASE_ID}}-structure-v2.json`, `{{CASE_ID}}-beats-v2-full.json`

### 총 GPT 세션 수
```
Phase 1: 55개 (V1 미작업분, 진행 중 4개는 이미 실행됨)
Phase 2: 84개 (전체 V2)
합계: ~139회 (+ 진행 중 4개)
```
