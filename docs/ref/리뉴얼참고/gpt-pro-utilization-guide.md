# GPT Pro 5.4 활용 가이드 — LLM 품질 고도화

> 솔로몬 게임 NPC 대화 품질 고도화를 위한 GPT Pro 5.4 활용 전략.
> GPT Pro는 **논리 구조**(프롬프트 설계, 데이터 구조, 검증 규칙)에 뛰어나고, **말맛**(자연스러운 대사 톤)은 약하다.

---

## 1. GPT Pro가 잘하는 것 (적극 활용)

| 영역 | 설명 |
|------|------|
| 프롬프트 구조 설계/최적화 | 지시 우선순위 배치, 토큰 효율화, 중복 제거 |
| atom 데이터 구조 검증 | factText와 slots 정합성 전수 검증 |
| Truth Throttle 규칙 검증 자동화 | truthLevel별 공개 범위가 규칙을 준수하는지 기계적 검증 |
| investigationStages 질문 설계 | stage0(표면) -> stage1(중간) -> stage2(핵심) 논리적 단계 구성 |
| 83건 확장 배치 프롬프트 작성 | 파일럿 기반으로 대량 생성 프롬프트 체계화 |
| 검증 스크립트/체크리스트 생성 | JSON 스키마 검증, 필수 필드 누락 탐지, 교차 참조 체크 |
| 사건별 금지어 목록 자동 추출 | anchorTruth/slots에서 직접 노출 금지 단어 자동 도출 |
| fallbackPublicClaim과 slots 동기화 검증 | fallbackPublicClaim이 slots 추상화 수준을 따르는지 확인 |
| V3 BeatScript applicableStates와 truthLevel 매칭 검증 | 스크립트 분기가 truthLevel 조건과 정확히 대응하는지 확인 |
| DossierCard 질문 단계 설계 | q1(hint) -> q2(partial) -> q3(full) 논리적 점진 구성 |

---

## 2. GPT Pro가 약한 것 (Claude Code/수동 검토 필요)

| 영역 | 설명 |
|------|------|
| 자연스러운 한국어 대사 톤 | 번역체, 딱딱한 표현이 빈출 |
| 캐릭터별 말투 차별화 | 피의자/증인/피해자 간 톤 구분이 미흡 |
| 감정 표현의 미세 뉘앙스 | 분노/슬픔/방어 등의 감정 그라데이션이 부족 |
| "이 대사가 어색한지" 판단 | 문법적으로 맞지만 실제로 사람이 안 쓰는 표현 감지 불가 |
| 해요체/합니다체 경계의 자연스러움 | 존댓말 수위 조절이 기계적 |

---

## 3. 즉시 활용 가능한 GPT Pro 세션 (권장)

### 세션 A: 83건 v2-atoms fallbackPublicClaim 검증

- **입력**: 각 사건의 v2-atoms JSON
- **작업**: fallbackPublicClaim이 slots 추상화 수준을 따르는지 전수 검증
- **맥락**: Thread B에서 spouse-01은 교정 완료. 나머지 6건 + 77건은 미검증 상태
- **기대 산출물**: 사건별 위반 목록 + 교정안

### 세션 B: 83건 investigationStages 질문 설계

- **입력**: 각 사건의 case JSON (disputes, evidence)
- **작업**: 증거별 3단계 질문 설계 (stage0=표면, stage1=중간, stage2=핵심)
- **맥락**: Thread A에서 7건은 완료, 77건은 미완
- **기대 산출물**: 사건당 investigationStages 배열

### 세션 C: 프롬프트 구조 최적화

- **입력**: 현재 `blueprintPromptBuilderV2.ts`의 프롬프트 텍스트
- **작업**: 토큰 효율화, 지시 우선순위 재배치, 중복 제거
- **핵심 질문**: "이 프롬프트의 어떤 부분이 LLM에 의해 무시될 가능성이 높은지" 분석
- **기대 산출물**: 최적화된 프롬프트 + 변경 사유 설명

### 세션 D: V3 스크립트 83건 배치

- **입력**: V3 스키마 + spouse-01 파일럿 + 검증 규칙
- **작업**: 사건당 6세션 프롬프트로 BeatScriptV3 생성
- **참고**: Thread C의 `v3-batch-prompt-template.md` 활용
- **기대 산출물**: 83건 BeatScriptV3 JSON

### 세션 E: DossierCard 질문 83건 설계

- **입력**: 각 사건의 disputes + evidence + anchorTruth
- **작업**: 카드당 3단계 질문 설계
  - q1 = hint (방향만 제시)
  - q2 = partial (핵심 일부 노출)
  - q3 = full (결정적 질문)
- **기대 산출물**: 카드당 q1/q2/q3 + scriptedResponse

---

## 4. GPT Pro 세션 실행 시 주의사항

1. **한 세션에 7건 이하**: 너무 많은 사건을 넣으면 후반부 품질이 급락한다.
2. **검증 규칙 첨부 필수**: `stage3-verification-spec.md`를 반드시 컨텍스트로 제공하라.
3. **톤 검수 별도 수행**: 출력 후 반드시 Claude Code(또는 수동)로 톤/자연스러움 검수.
4. **JSON 유효성은 신뢰 가능**: GPT Pro는 JSON 구조를 잘 지킨다. 다만 한국어 톤은 별도 검수가 필수.
5. **출력 형식 명시**: 프롬프트에 JSON 스키마 예시를 넣으면 구조 준수율이 높아진다.

---

## 5. 작업 분담 원칙

```
논리/구조/검증       → GPT Pro
톤/말투/자연스러움   → Claude Code (또는 수동)
코드 수정            → Claude Code
데이터 대량 생성     → GPT Pro + Claude Code 검수
```

### 실무 워크플로우

```
[1] GPT Pro: 구조 설계 + 대량 생성
        ↓
[2] Claude Code: 톤 검수 + 어색한 표현 교정
        ↓
[3] Claude Code: 코드 반영 + 빌드 검증
        ↓
[4] 플레이테스트: 실제 게임 내 확인
```
