# GPT Pro 의뢰 — 사용자 제출 가이드

> 사용자가 GPT Pro에 바로 보낼 수 있는 메시지 형식 + 첨부 파일 + 검수 절차

## 의뢰 절차 (사건당 1회씩 3건)

### 1. 의뢰 순서
1. **spouse-01** (테스트 1차 — 산출물 검증 후 패턴 확정)
2. **family-01** (패턴 적용)
3. **friend-01** (패턴 적용)

### 2. GPT Pro에 보낼 메시지 (복사용)

```
[솔로몬 법정 게임 — 모순 시스템 V2 데이터 생성]

대상 사건: spouse-01 (이준호 × 박지연, 외도 의심)

목적: 기존 ContradictionEvent (양측 주장 사전 작성)을 V2로 재설계.
- ContradictionEventV2: 같은 캐릭터 진술 변화만이 모순 (단일 화자)
- ConflictEventV2: 양측 주장 충돌 = '의견 충돌' (별도 카테고리, 극단 한정)

산출물 형식: JSON
- contradictions: ContradictionEventV2[] 24개 (4 dispute × 2 party × 3 spoilerLevel)
- conflicts: ConflictEventV2[] 6~8개 (가시 쟁점만)

핵심 제약:
1. ContradictionEventV2의 previousStatement/currentStatement는 같은 화자
2. spoilerLevel='safe'(S0~S2)에서는 banned_lexemes_safe 단어 절대 금지
3. truths_to_protect 목록의 진실은 'safe'에서 절대 노출 X
4. judgePursuitLine은 ${defenderParty.name} 호명 또는 callTerms.toJudge 사용

타입 정의 (첨부 파일 1):
[01-types.md 내용 붙여넣기]

상세 명세 + truth 보호 목록 + 톤 가이드 (첨부 파일 2):
[02-spec-spouse-01.yaml 내용 붙여넣기]

검증 규칙 (첨부 파일 3):
[05-lint-rules.md 내용 붙여넣기]

산출물:
- 단일 JSON 파일 (24 contradictions + 6 conflicts)
- 모든 lint 규칙(R1~R7) 통과
- 한국어 톤: 합니다체(재판관), 캐릭터별 archetype 부합
```

### 3. 첨부할 파일

| 첨부 # | 파일 | 용도 |
|---|---|---|
| 1 | `01-types.md` | TypeScript 타입 정의 |
| 2 | `02-spec-spouse-01.yaml` (또는 family/friend) | 사건별 spec + truth 보호 |
| 3 | `05-lint-rules.md` | 검증 규칙 |

### 4. 산출물 받은 후 검수 절차

1. **lint 규칙 R1~R7 수동 체크**:
   - R1 (spoilerLevel ↔ lieState 정합)
   - R2 (truth keyword 미포함, safe만)
   - R3 (단일 화자 모순)
   - R4 (글자수)
   - R5 (호명 일관성)
   - R6 (ConflictEventV2 dispute 유효)
   - R7 (effect 범위)
2. **한국어 보정** (Claude로 검토):
   - 어색 표현 다듬기
   - 호칭 일관성 (callTerms 정확)
   - archetype 부합 (avoidant=얼버무림, victim_cosplay=감정형, confrontational=공격형 등)
3. **저장**: `src/data/claimPolicies/{caseId}-game-events-v2.json`
4. **마이그레이션** (M1~M7): `gpt-pro-runs/contradiction-events-v2/README.md` 단계 따라

### 5. 사용자가 Claude에게 보낼 메시지 (산출물 받은 후)

```
GPT Pro에서 spouse-01 V2 데이터 받았어. lint 검증 + 한국어 보정 + JSON 적용 부탁.

[산출물 JSON 붙여넣기]
```

→ Claude가 R1~R7 검증 + 호칭/톤 보정 + 파일 저장.

## 의뢰 시 자주 발생하는 문제 + 대응

| 문제 | 대응 |
|---|---|
| GPT가 양측 화자 섞어서 contradiction 생성 | "같은 캐릭터의 두 발화여야 합니다. 다시 작성해주세요." |
| safe에 truth 단어 등장 | "spoilerLevel=safe인데 [단어] 등장. 변경해주세요." |
| 호명 누락 | "judgePursuitLine에 ${name} 호명 누락. 모든 항목 확인해주세요." |
| 글자수 초과/부족 | "[항목] 30~60자 초과/부족. 다듬어주세요." |
| 한국어 어색 | Claude로 보정 후 적용 |

## 다음 단계 (산출물 적용 후)

1. **M1**: `src/types/renewal.ts`에 V2 타입 추가
2. **M2**: `v3GameLoopLoader.ts`에 V2 로더 추가
3. **M3**: `gameEventTriggerEngine.ts`에 V2 풀 우선 분기
4. **M4**: `checkConflict()` 신설 (Path A 비활성화 코드 본문 재활용)
5. **M5**: 모달 UI 통합 (PCInteractionPanel 큰 글씨 버전)
6. **M6**: 데이터 적용 (활성 3건)
7. **M7**: V1 삭제 (검증 완료 후)
