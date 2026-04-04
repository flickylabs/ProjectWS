# 컨트롤 타워 인수인계 문서

> 작성: 2026-04-05
> 발신: 이전 CT 세션
> 수신: 다음 CT 세션
> 상태: 7건 Stage-1 전체 PASS, 83건 확장 배치 직전

---

## 1. 프로젝트 현황 한줄 요약

솔로몬 법정 게임의 **LLM 대화 품질 고도화가 완료**되었고, **7건 Stage-1 사건이 심층 검증(433턴 × 3회)을 통과**했다. 83건 확장 배치를 시작할 수 있는 상태.

---

## 2. 핵심 원칙 (절대 잊지 말 것)

> **"진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."**

이 원칙이 모든 시스템(증거, NPC 대사, 카드, 증인, 시스템 메시지, Phase 1/2)에 적용됨.

---

## 3. 이번 세션에서 완료한 것 (전체)

### 3-1. 스포일러 방지 시스템 (이전 세션에서 완료, 이번 세션에서 검증)
- Progressive Truth Throttle (S0~S5 단계별 진실 제한)
- Evidence Staged Reveal (surfaceName → 조사 → 진실)
- DossierCard 게이팅 (q1=hint, q2=partial, q3=full)
- Witness Testimony Gating (vague/partial/full)
- 시스템 메시지 중립화
- Phase 1/2 스크립트 교정 (14파일)
- v2-atoms S0-S2 neutral화 (7건 320건+)

### 3-2. LLM 대화 품질 고도화 (이번 세션 핵심)

| 변경 | 파일 | 내용 |
|------|------|------|
| 모델 분리 | llmClient.ts | gpt-4o (대사) / gpt-4o-mini (분석) |
| 파라미터 | promptManager.ts 외 10곳 | temperature 1.0, maxTokens 400 |
| 프롬프트 전면 개편 | blueprintPromptBuilderV2.ts | ARCHETYPE 6종, TELL 6종, FOCUS 4종, few-shot 5쌍, 번역체 금지 9패턴, 사과 클리셰 차단, 금전 무관 동적 가드 |
| S5 slot 승격 | atomSelectionEngine.ts | confess 시 neutral→concrete (280만원, 최민정 등) |
| 금액/시각 분리 | 프롬프트 | 금액 숨김 유지, 시각 허용 (tell용) |
| tell 빈도 | 프롬프트 | "3-4턴에 1회" 제한 |
| 금액 형식 | 테스트+엔진 | rounded("280만원") 우선, exact("2,800,000원") 미사용 |

### 3-3. Thread B Phase 2 (8개 미션)

| 미션 | 산출물 |
|------|--------|
| M1 재판관 질문 | 13종→84종+, lieState soft/hard 톤 분화 |
| M2 모순 추궁 | LLM→템플릿 15종 즉시 생성 |
| M3 자유 질문 톤 | 6 archetype × 5 angleTag = 180패턴 |
| M4 증인 few-shot | 4유형 × 3depth = 36예시 + hiddenAgenda 20패턴 |
| M5 증거 텍스트 | 168건 검수 → 46건 교정 |
| M6 끼어들기 | archetype 톤 9건 교정 |
| M7 시스템 메시지 | 42건 전수 스캔 ALL PASS |
| M8 DossierCard | 126건 검수 → 24건 교정 |

### 3-4. Thread E 심층 검증

- 7건 × 3회 = 433턴 LLM 시뮬레이션
- Truth Throttle 위반 0건, hallucination 0건
- FAIL 2건 발견 → 즉시 수정 완료
  - DossierCardPanel factText 노출 → 중립 메시지로 교체
  - family-01 e-2 stage 2 "특정인" → 날짜 기반 추궁으로 교체
- 7/7 PASS 판정

### 3-5. 추가 수정 (이번 세션 마지막)

| 수정 | 파일 |
|------|------|
| 후일담 번역체 금지 | Aftermath.tsx + phase6ResultPromptV2.ts |
| 후일담 aReaction/bReaction 활용 | phase6ResultPromptV2.ts |
| enforceHonorifics "같아서" 패턴 | llmDialogueResolver.ts |

---

## 4. 스레드 현황

| 스레드 | 역할 | 상태 | 다음 작업 |
|--------|------|------|----------|
| **Thread A** | 증거 데이터 | 대기 | 77건 investigationStages 확장 (배치 시) |
| **Thread B** | NPC 품질 + GPT Pro | Phase 2 완료 | WARN 잔여 3-4건은 배치 GPT 프롬프트로 반영 |
| **Thread C** | V3 스크립트 | **보류 안내 필요** | V3 엔진 연결은 LLM 고도화 완료 후 별도 지시 |
| **Thread D** | Phase 1/2 교정 | 대기 | 77건 교정 (배치 시) |
| **Thread E** | 통합 테스트 | 심층 검증 완료 | 다음 라운드 테스트 시 재가동 |

### ★ Thread C에 즉시 전달 필요

Thread C가 V3 엔진 연결을 착수하려 했으나 보류 지시가 필요함.
메시지:
```
V3 엔진 연결은 보류해줘.
현재 방향: LLM 고도화를 먼저 완성 → 이후 V3로 점진 전환.
코드 분석은 유지하되 수정은 하지 마. 착수 시점에 다시 안내할게.
```

---

## 5. 확정된 설계 결정

| 결정 | 내용 |
|------|------|
| Truth Throttle 매핑 | S0/S1→none, S2→hint, S3→partial, S4/S5→full |
| S2 partial 불가 | hedge(hint)까지만. 테스트 후 재논의 가능 |
| DossierCard q3 = full | 고정 |
| 기관 증인 partial 예외 | 자기 업무 범위 사실 공개 허용 |
| V3 금액 숨김 | none/hint에서 구체 금액 금지 |
| 해요체 정책 | 기본 합니다체, emotional/confession만 해요체 예외 |
| 모델 | gpt-4o (대사) / gpt-4o-mini (분석) |
| 금액 표기 | "280만원" 자연어 형식 (exact "2,800,000원" 미사용) |
| tell 빈도 | 3-4턴에 1회 |

---

## 6. 다음에 해야 할 것

### 즉시
1. **Thread C에 V3 보류 안내 전달**
2. **빌드 확인** (tsc --noEmit) — 이번 세션 마지막에 PASS였지만 재확인

### 83건 확장 배치 준비
3. **GPT Pro 세션 구성** — 가이드: `docs/ref/리뉴얼참고/gpt-pro-utilization-guide.md`
4. **83건 배치 GPT 프롬프트에 추가 규칙 7건 반영**:
   - 규칙 1: fallbackPublicClaim ↔ slots 동기화
   - 규칙 2: 증거 질문 revealKey 순서 준수
   - 규칙 3: surfaceDescription 안전성
   - 규칙 4: name/description 필드 안전성
   - 규칙 5: "특정 X" 패턴 금지
   - 규칙 6: Stage 0 질문에 경미한 압박 포함
   - 규칙 7: 후일담 번역체 금지 명시
5. **77건 데이터 생성 계획**:
   - Thread A: investigationStages 77건
   - Thread D: Phase 1/2 교정 77건
   - v2-atoms fallbackPublicClaim 77건 검증
6. **freeQuestionV2 호출부에서 archetype 전달** — 현재 fallback 동작 중, 연결하면 180패턴 활성화

### V3 전환 (보류 — LLM 고도화 완료 후)
7. Thread C: BeatScriptV3 로더 + scriptedResponse + scriptedTestimonies 엔진 연결
8. Thread C: spouse-01 LLM 0건 플레이스루 검증
9. 83건 V3 스크립트 GPT 배치 (사건당 6세션)

---

## 7. 핵심 문서 위치

| 문서 | 경로 |
|------|------|
| LLM 품질 고도화 가이드 | `docs/ref/리뉴얼참고/llm-quality-tuning-guide.md` |
| GPT Pro 활용 가이드 | `docs/ref/리뉴얼참고/gpt-pro-utilization-guide.md` |
| Thread B Phase 2 보고 | `thread-packages/thread-B/report-phase2-final.md` |
| Thread E 심층 검증 | `thread-packages/thread-E/reports/deep-review-handoff-to-control-tower.md` |
| Thread E 최종 판정 | `thread-packages/thread-E/reports/final-verdict.md` |
| 스레드 전체 현황 | `thread-packages/thread-status-summary.md` |
| V3 배치 프롬프트 | `thread-packages/thread-C/v3-batch-prompt-template.md` |
| V3 검증 규칙 | `thread-packages/thread-C/stage3-verification-spec.md` |
| 테스트 러너 | `tests/run-playthrough.cjs` + `tests/scenarios/*.cjs` (7건) |

---

## 8. 검증된 품질 수준 (before/after)

```
Before (gpt-4o-mini 원본):
  S1: "사전 상의가 일부 누락된 부분은 있었던 것으로 생각됩니다"
  S5: "그 약속을 위반한 사실을 인정합니다. 상당한 금액을 송금했습니다"

After (gpt-4o + 고도화):
  S1: "네, 그 송금은 맞습니다. 하지만 그 돈이 어디로 간 건 순서가 있습니다."
  S5: "280만원 송금은 제가 했습니다. 재가돌봄센터 상담팀장 최민정에게 보낸 것이고,
       추석 연휴 간병 예약금을 위한 것이었습니다."
```

---

## 9. 빌드 상태

```
tsc --noEmit → PASS (2026-04-05 최종)
```
