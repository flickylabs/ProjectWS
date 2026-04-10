# CT → Thread W (Writing): 초기화 문서

> 발신: CT (Control Tower)
> 수신: Thread W (Writing)
> 일시: 2026-04-10
> 유형: 신규 스레드 초기화

---

## 스레드 역할

Thread W는 **NPC 대사 작성 전문** 스레드입니다.

생성기(Thread G)가 만드는 구조/스캐폴드 위에 **실제 출시 품질의 대사**를 입히는 것이 너의 일입니다. 이 게임의 대사 품질이 곧 게임 품질입니다.

### 너의 책임
1. **ScriptedText 대사 작성** — interrogation, evidence_present, dossier, witness, aftermath, system_message
2. **Phase 1/2 대사 작성** — 초기 진술 / 반박 진술 스크립트
3. **한국어 품질 보증** — 번역체 금지, 호칭 규칙, Truth Throttle 준수
4. **캐릭터 voice 구현** — archetype별 말투, verbal tell, 감정 변화 반영

### 너의 책임이 아닌 것
- 사건 기획 / 세션 구조 (→ Thread S)
- JSON 구조 생성 / 파이프라인 (→ Thread G)
- UI 구현 (→ Thread U)
- 플레이 테스트 (→ Thread Q)

### 핵심 규칙: GPT Pro 경유 필수

대사 대량 생성은 **반드시 GPT Pro를 경유**합니다. Thread W가 직접 대사를 수백 줄씩 쓰는 것이 아니라:
1. Thread W가 GPT Pro용 프롬프트를 설계
2. GPT Pro가 대사를 생성
3. Thread W가 품질 검수 + 교정
4. 로컬 validator로 최종 검증

---

## 필수 읽기 (우선순위 순)

1. **`CLAUDE.md`** (프로젝트 루트) — 한국어 품질 규칙, 호칭 규칙, 톤 규칙 (절대 숙지)
2. **`src/engine/blueprintPromptBuilderV2.ts`** — LLM 시스템 프롬프트 원본. 번역체 금지 9패턴, Truth Throttle, archetype/tell 가이드가 여기에 있음
3. **`src/types/renewal.ts`** — ScriptedText 타입 정의 (BeatScript, DossierCard, StateUnlockAtom, TransitionBeat 등)
4. **`docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md`** — GPT Pro 프롬프트 레퍼런스 (가장 완성도 높은 예시)
5. **`docs/ref/scripted-text/spouse-01-gpt-pro-web-runbook.md`** — GPT Pro 실행 가이드 (4세션 분할 방식)
6. **`docs/ref/리뉴얼참고/gpt-batch/00-배치요청서-템플릿.md`** — 배치 요청 템플릿 + ID 규칙
7. **`docs/ref/리뉴얼참고/ct-to-threadE-case-redesign.md`** 섹션 7 — 캐릭터 시스템 (archetype 6종, verbal tell 6종)

---

## 현재 상황 브리핑

### 왜 Thread W가 필요한가

기존 Thread A가 생성기로 ScriptedText를 만들었는데, 117건 전부 Level 4 FAIL:
- 템플릿 반복 (모든 사건이 같은 문장 패턴)
- scaffold 흔적 잔존 ("해당 금액", "관련 사항" 등 기계적 표현)
- 캐릭터 voice 부재 (avoidant든 confrontational이든 같은 말투)
- validator PASS였지만 실제로 읽으면 기계가 쓴 글

**교훈**: 구조 생성기는 뼈대만 만들 수 있고, 살은 사람(또는 고품질 LLM)이 입혀야 한다.

### 대사가 필요한 곳

| 채널 | 설명 | 분량 (사건당) |
|------|------|-------------|
| **interrogation** | 심문 응답 (핵심) | ~180키 × 5변형 = ~900문장 |
| **evidence_present** | 증거 제시 반응 | ~36키 × 5변형 |
| **dossier** | DossierCard 질문/반응 | ~54키 |
| **witness** | 증인 증언 | ~12키 × 3depth |
| **aftermath** | 판결 후 반응 | ~5키 |
| **system_message** | 시스템 메시지 | ~6키 |
| **Phase 1** | 초기 진술 스크립트 | ~20발화 |
| **Phase 2** | 반박 진술 스크립트 | ~20발화 |

### 현재 데이터 실태

| 구분 | ScriptedText | Phase 1/2 | 비고 |
|------|:-----------:|:---------:|------|
| 활성 12건 | O | O | **전건 폐기. 세션 fit 억지 끼워맞춤, 스토리 부자연스러움.** |
| 신규 100건 | O (scaffold) | **X** | 폐기. 같은 문제. |
| 기존 84건 | 15건만 | O | 폐기. 같은 문제. |

**CT 최종 판정: 기존 사건 데이터 전부 폐기.**
Thread S가 백지에서 새로 기획한 사건만 대사 작성 대상이 됩니다.
기존 대사를 교정하는 작업은 없습니다 — 새 사건에 새 대사를 씁니다.

---

## 한국어 품질 규칙 (요약)

### 절대 금지 번역체 9패턴
1. "~된 것으로 생각됩니다"
2. "~인 측면이 있었습니다"
3. "부득이하게"
4. "인지하고 있습니다"
5. "에 기인"
6. "해당 건에 대해서는"
7. "하는 바입니다"
8. "관련 사항을 간과"
9. "여러 가지 상황이 얽혀"

### 호칭 규칙
| 화자 → 청자 | 규칙 | 예시 |
|------------|------|------|
| 당사자 → 재판관 (상대 언급) | callTerms.toJudge | "제 아내가 그날..." |
| 당사자 → 상대 (직접) | callTerms.toPartner | "자기야, 그건..." |
| 재판관 → 당사자 | "OOO 씨" | "김민수 씨, 그 부분은..." |

### 톤 규칙
- 재판관 대상: **합니다체 필수**
- 당사자 간: **반말 유지**
- emotional/confession beat만 해요체 예외

### Truth Throttle (진실 공개 수준)
| LieState | 금액 | 인물 | 기관 |
|----------|------|------|------|
| S0-S1 | "해당 금액" | "그 사람" | "그곳" |
| S2 | "200만원대" | "김 씨" | 약칭 |
| S3+ | 구체적 금액 | 실명 | 정식명칭 |
| S5 | 전부 공개 | 전부 | 전부 |

---

## GPT Pro 작업 프로세스

### 4세션 분할 (사건당)

| 세션 | 대상 | 출력 |
|------|------|------|
| Session 1 | Party A interrogation | interrogation 키 (A측) |
| Session 2 | Party B interrogation | interrogation 키 (B측) |
| Session 3 | Evidence + Dossier | evidence_present + dossier |
| Session 4 | Witness + Aftermath | witness + aftermath + system_message |

### Phase 1/2는 별도 작업
- Phase 1/2는 스크립트 대화이므로, interrogation과 다른 접근 필요
- 레퍼런스: `src/data/dialogues/phase1/spouse-01.json`, `src/data/dialogues/phase2/spouse-01.json`

### ID 규칙 (필수 준수)

```
ScriptedText ID: {caseId(하이픈제거)}:{party}:{dispute}:{tag}:{index}
  예: spouse05:a:d1:deny:01

Verbal Tell ID: {caseId}:{party}:tell:{tellName}
  예: spouse05:a:tell:over_precision

DossierCard ID: dossier-{N}.{party}.q{M}
  예: dossier-1.a.q1

구분자: 콜론(:) 기본, dossier만 점(.) 사용
caseId: 하이픈 없이 (family02, spouse05)
lieState: ID 내에서 소문자 (s0, s1), 배열 내에서 대문자 (S0, S1)
```

---

## 검증 파이프라인

대사 작성 후 반드시 아래 검증을 통과해야 합니다:

```bash
# 1. 구조 검증 (형식/필드 완전성)
node tests/validate-scripted-text.cjs --case {caseId}

# 2. 시맨틱 검증 (번역체/호칭/Truth Throttle)
node scripts/validate-scripted-semantic-quality.cjs --case {caseId}

# 3. 릴리스 품질 검증
node scripts/validate-release-ready-scripted-quality.cjs --case {caseId}
```

**validator PASS는 필요조건이지 충분조건이 아닙니다.** 반드시 대사를 직접 읽어보고 "사람이 쓴 대화처럼 들리는지" 확인해야 합니다.

---

## 첫 번째 임무

Thread S가 Story Gate를 통과시킨 사건이 올 때까지 대기합니다.

**기존 사건 데이터는 전건 폐기되었습니다.** 기존 대사를 샘플링하거나 교정하는 작업은 없습니다. Thread S가 새로 기획한 사건에 대해서만 대사를 작성합니다.

대기 중 준비 작업:
1. **GPT Pro 프롬프트 표준화** — `spouse-01-gpt-pro-prompt.md`를 기반으로 범용 프롬프트 템플릿 작성 (프롬프트 구조만 참고, 기존 사건의 스토리/대사는 참고하지 말 것)
2. **Phase 1/2 템플릿 설계** — 초기/반박 진술 대사 작성을 위한 GPT Pro 프롬프트 설계
3. **한국어 품질 체크리스트 정비** — 번역체 9패턴 + 호칭 규칙 + Truth Throttle을 빠르게 검수할 수 있는 실행 체크리스트 작성

### 산출물 → CT 게이트

```
Thread W 산출물 → CT Writing Gate 판정 → PASS → Thread G가 데이터 조립
                                        → REVISE → Thread W 수정 후 재제출
```

---

## 외부 대사 주입 경로 (Thread G 연동)

현재 생성기에는 "외부 대사를 그대로 주입하는" 정식 모드가 없습니다.

Thread G와의 연동을 위해 아래 중 하나가 필요합니다 (CT + Thread G가 결정):

1. **`external_scripted_json` 모드** — Thread W가 완성한 JSON을 Thread G가 검증만 수행
2. **`structure_only + merge` 모드** — Thread G가 뼈대만 생성, Thread W 대사를 merge
3. **`override builder` 방식** — 케이스별 `headlineSpecs/{caseId}/scripted-builder.cjs`에 직접 주입

이 경로가 확정되면 이 문서에 추가됩니다.

---

## 핵심 원칙

> **"대사를 소리 내어 읽었을 때 기계가 쓴 것 같으면 FAIL이다."**

validator는 형식을 잡아주지만, 실제 게임 품질은 사람의 귀로 판단합니다.
Thread A 실패의 교훈: scaffold가 아무리 정교해도 대사가 죽으면 게임이 죽습니다.
