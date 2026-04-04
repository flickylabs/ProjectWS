# 77건 확장 작업 패키지 — 스레드별 배분

> 작성: 2026-04-05 (CT 세션)
> 상태: Stage-1 7건 PASS → 77건 확장 배치 시작
> 기준: stage1-master-guide-for-expansion.md Part 2

---

## 전체 작업 맵

| # | 작업 | 담당 | 도구 | 규모 | 우선순위 |
|---|------|------|------|------|---------|
| W1 | v2-atoms S0-S2 neutral화 | Thread B + GPT Pro | batch-prompts/v2-atoms-neutral-correction-prompt.md | 82건 | ★★★ |
| W2 | investigationStages 생성 | Thread A + GPT Pro | batch-prompts/investigation-stages-generation-prompt.md | 77건 | ★★★ |
| W3 | Phase 1/2 스크립트 교정 | Thread D | batch-prompts/phase12-script-correction-prompt.md | 154파일 | ★★☆ |
| W4 | evidence surfaceName/Description 교정 | Thread B + GPT Pro | batch-prompts/evidence-safety-check-prompt.md | 77건 | ★★☆ |
| W5 | DossierCard 질문 검증/교정 | GPT Pro 세션 E | gpt-pro-utilization-guide.md 세션 E | 77건 | ★★☆ |
| W6 | structure-v2 red_herring/misconception 검증 | GPT Pro | 마스터 가이드 2-2(8) | 77건 | ★☆☆ |
| W7 | v2-atoms → claimPolicies 등록 (코드/파일 이동) | CT (Claude Code) | - | 82건 | W1 완료 후 |

---

## Thread A: 증거 데이터

### 미션: investigationStages 77건 생성 (W2)

**입력**:
- `src/data/cases/generated/{case}.json`의 evidence + disputes

**산출물**:
- 77건 case JSON에 investigationStages 배열 삽입

**작업 흐름**:
1. GPT Pro 세션 B에 case JSON 전달 (4건씩)
2. GPT Pro가 각 증거에 3단계 질문 생성
3. Claude Code가 톤 검수 + case JSON에 삽입
4. 검증: stage 0 압박 포함, "특정 X" 0건, revealKey 순서

**배치 순서** (카테고리별):
- 1차: family-02~05 (4건)
- 2차: family-06~09 (4건)
- 3차: family-10~12, friend-02~03 (4건)
- ... (총 ~20 배치)

**참조 기준본**: family-01.json, spouse-01.json의 investigationStages

---

## Thread B: NPC 품질 + GPT Pro

### 미션 1: v2-atoms S0-S2 neutral화 (W1)

**입력**:
- `docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v2-atoms.json` (82건)

**산출물**:
- 교정된 v2-atoms JSON 82건

**작업 흐름**:
1. GPT Pro에 v2-atoms JSON + 교정 프롬프트 전달 (7건씩)
2. GPT Pro가 S0-S2 slots neutral화 + fallbackPublicClaim 동기화
3. Claude Code가 톤 검수 (번역체, "특정 X", 자연스러움)
4. 교정 완료본을 `src/data/claimPolicies/{case}-v2-atoms.json`으로 등록

**배치 순서**:
- 1차: spouse-02~08 (7건) — spouse 카테고리 우선 (기준본 spouse-01과 동일 구조)
- 2차: spouse-09~12, family-02~05 (7건)
- 3차: family-06~12 (7건)
- ... (총 ~12 배치)

**검증**: 마스터 가이드 2-4 체크리스트 전항목

### 미션 2: evidence 안전성 교정 (W4)

**입력**:
- 77건 case JSON의 evidence 배열
- 각 사건의 anchorTruth 키워드

**산출물**:
- 교정된 evidence 필드 (surfaceName, surfaceDescription, name, description)

**참조**: Stage-1에서 27% 교정률 → 77건에서 약 20건+ 교정 예상

---

## Thread D: Phase 1/2 교정

### 미션: Phase 1/2 스크립트 교정 77건 (W3)

**입력**:
- `src/data/dialogues/phase1/{case}.json` (77건)
- `src/data/dialogues/phase2/{case}.json` (77건)
- 각 사건의 case JSON (disputes, anchorTruth, parties)

**산출물**:
- 교정된 Phase 1/2 JSON 154파일

**작업 흐름**:
1. 사건별 anchorTruth에서 금지 키워드 추출
2. Phase 1/2 스크립트에서 금지 키워드 grep
3. 위반 발견 시 교정 (추상적 표현으로 교체)
4. 톤 검수: 합니다체(재판관), 반말(당사자), 해요체 잔존 제거
5. 번역체 9패턴 검수

**배치 순서**:
- 카테고리별 7건씩 (Phase 1+2 세트)
- 1차: spouse-02~08
- 2차: spouse-09~12, family-02~05
- ...

**참조 기준본**: 7건 -01 교정 완료본

---

## CT(컨트롤 타워) 직접 수행 작업

### W7: v2-atoms → claimPolicies 등록

W1(neutral화) 완료 후:
1. 교정된 v2-atoms JSON을 `src/data/claimPolicies/{case}-v2-atoms.json`으로 복사
2. v2DataLoader에서 로딩되는지 확인
3. 빌드 검증

### freeQuestionV2 archetype 연결 → ✅ 완료

---

## 의존 관계

```
W1 (v2-atoms neutral화) ← 독립, 바로 시작 가능
W2 (investigationStages) ← 독립, 바로 시작 가능
W3 (Phase 1/2 교정)     ← 독립, 바로 시작 가능
W4 (evidence 교정)      ← 독립, 바로 시작 가능
W5 (DossierCard)         ← W1 이후 권장 (v2-atoms 참조)
W6 (structure-v2 검증)   ← 독립
W7 (등록)                ← W1 완료 필수
```

**W1~W4는 모두 독립적이므로 Thread A/B/D 동시 착수 가능.**

---

## 품질 게이트

### 1차 게이트: 카테고리 1개 완료 시 (예: spouse 12건)
- 자동 검증 스크립트 실행 (번역체, 금지어, 금액 패턴)
- spouse-02~12 중 2건 랜덤 샘플 수동 검수
- PASS 시 다음 카테고리 진행

### 2차 게이트: 전체 77건 완료 시
- Thread E 재가동: 심층 검증 3회 (7건 샘플)
- 전 채널 검증 (심문/증거/카드/재판관질문/증인/시스템메시지/후일담)

---

## GPT Pro 세션 계획

| 세션 | 작업 | 예상 배치 수 | 소요 시간 |
|------|------|-------------|----------|
| A | v2-atoms fallbackPublicClaim 검증 | ~12회 | 세션 A |
| B | investigationStages 생성 | ~20회 | 세션 B |
| C | (보류) 프롬프트 최적화 | 1회 | - |
| D | (보류) V3 스크립트 | - | Stage-2 이후 |
| E | DossierCard 질문 설계 | ~12회 | 세션 E |

---

## 다음 액션 (즉시)

1. **Thread A 가동**: family-02~05 investigationStages 생성 착수
2. **Thread B 가동**: spouse-02~08 v2-atoms neutral화 착수
3. **Thread D 가동**: spouse-02~08 Phase 1/2 교정 착수
4. **CT**: 빌드 확인 + 1차 배치 결과물 검수 체계 준비
