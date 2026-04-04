# 스레드 전체 현황 (2026-04-04 최종)

> 컨트롤 타워 정리

---

## 스레드 A — 증거 데이터 ✅ 완료 + 대기

### 완료된 작업
- 84건 증거 surfaceName/surfaceDescription 추가 (504개)
- 84건 requiredLieState 설정 (317 free, 23 S2, 164 S3)
- Stage-1 7건 investigationStages 완성 (42개 증거 × 3단계 = 126개 질문)
- Thread A 보고 108개 질문 전수 검증 통과

### 잔여 작업
| 작업 | 선행 조건 | 비고 |
|------|----------|------|
| 나머지 77건 investigationStages | Thread E 테스트 통과 + 템플릿 확정 | GPT 배치 |

### Thread B와의 교차 영향
- B가 교정한 v2-atoms의 S0-S2 slots 변경 → `blueprintPromptBuilder`에서 slot 선택 로직이 neutral/exact를 구분하는지 확인 필요
- **판단**: 현재 엔진은 lieState별로 atoms를 필터하여 프롬프트에 주입. slots 자체를 직접 읽는 건 LLM이므로, neutral 값이 들어있으면 LLM도 neutral하게 응답. **추가 코드 수정 불필요**, Thread E에서 시뮬레이션으로 검증.

---

## 스레드 B — NPC 품질 ✅ 완료

### 완료된 작업
- v2-atoms 7건 Truth Throttle 교정 (320건+ 개별 위반 수정, 2차 교정 완료)
- judgeQuestionEngine.ts — extractDisputeSubject() 강화 (15패턴 + 금액/날짜/시간)
- useActionDispatch.ts — 시스템 메시지 6건 중립화
- 빌드 통과

### 잔여 작업
| 작업 | 선행 조건 | 비고 |
|------|----------|------|
| 없음 | — | Thread E에서 통합 검증 |

### 다른 스레드에 전달된 영향
- **→ Thread A/엔진**: v2-atoms slots 변경. 위에서 판단 완료 — 추가 코드 수정 불필요.
- **→ Thread E**: 시스템 메시지 "증거 게시판을 확인하십시오" 유도 → 증거 게시판 UI에서 해당 진실 표시 흐름 정상 동작 확인 필요.
- **→ Thread D**: atoms/질문/메시지 모두 변경됨. spouse-01 플레이스루 재검증 필요.

---

## 스레드 C — V3 재설계 ✅ 파일럿 완료 + 엔진 연결 대기

### 완료된 작업
- 타입 확장 5건 (TruthLevel, BeatScriptV3, scriptedResponse, scriptedNpcResponses, scriptedTestimonies)
- spouse-01 V3 파일럿 6세션 (~85개 스크립트 항목)
- 검증 규칙 5개 (stage3-verification-spec.md)
- 83건 확장용 GPT 세션 프롬프트 준비 완료

### 잔여 작업
| 작업 | 선행 조건 | 비고 |
|------|----------|------|
| **V3 BeatScript 금액 패치** | 결정5 확정 (완료) | spouse-01 파일럿에서 구체적 금액 → 모호 표현으로 교체 |
| **엔진 연결** | 패치 완료 | v3GameLoopLoader에 BeatScriptV3 로더, scriptedResponse 반환, 증인 scriptedTestimonies 연결 |
| spouse-01 V3 데이터 코드 통합 | 엔진 연결 | docs → src로 이동 + 로더에서 참조 |
| 83건 V3 GPT 배치 | Thread E 통과 + 템플릿 확정 | 사건당 6세션 |

### 새 설계 아이디어 (향후 구현)
- DossierCard q3 극적 효과 (시스템 메시지, 이벤트 씬)
- 증인 심문 메커닉 (단계별 질문 선택지)
- 기관 증인 소환 게이팅 (관련 진실 발견 시점에 소환 가능)

---

## 스레드 D — Phase 1/2 교정 ✅ Stage-1 완료 + 77건 대기

### 완료된 작업
- 14개 파일 교정 (스포일러 ~46건 + 해요체 ~52건)
- 치명적 발견 3건 수정 (anchorTruth 노출, 금지 인물명)
- 반말 유지 확정 (재판관에게만 합니다체)

### 잔여 작업
| 작업 | 선행 조건 | 비고 |
|------|----------|------|
| 77건(-02~-12) Phase 1/2 교정 | Thread E 통과 + 템플릿 확정 | 동일 패턴 존재 가능성 높음 |

---

## 스레드 E — 통합 품질 테스트 🆕 신규

### 미션
7개 Stage-1 사건의 모든 품질 기준 통과를 증명.

### 작업 구조
```
Stage 1: 정적 검증 (데이터만 검사)
  1-1: Phase 1/2 스크립트 전수 스캔 (7건)
  1-2: v2-atoms Truth Throttle 전수 검증 (7건)
  1-3: V3 BeatScriptV3 검증 (spouse-01, 6세션)
  1-4: 증거 데이터 정적 검증 (7건)
  1-5: 코드 엔진 로직 정적 검증 (6파일)

Stage 2: LLM 시뮬레이션 (API 호출)
  2-1: 20턴 심문 시뮬레이션 (7건)
  2-2: 재판관 질문 자연스러움 검증

Stage 3: 크로스 체크 (시스템 간 일관성)
  3-1: 진실 공개 타임라인 일관성 (7건)
  3-2: V3 vs LLM 일관성 (spouse-01)

특별 체크:
  A: S2 대사 다양성 (결정2)
  B: 금액 숨김 자연스러움 (결정5)
  C: DossierCard q3 극적 효과 가능성 (결정3)
```

### 통과 기준
- CRITICAL 0건, HIGH 0건 → 83건 확장 배치 시작 가능

---

## 전체 진행 순서

```
현재 → [C: V3 금액 패치] → [E: Stage 1 정적 검증]
                              ↓ PASS
                         [E: Stage 2 LLM 시뮬레이션]
                              ↓ PASS
                         [E: Stage 3 크로스 체크]
                              ↓ PASS
                         [템플릿 확정]
                              ↓
                    [83건 확장 배치 시작]
                    A: investigationStages 77건
                    C: V3 스크립트 83건 (GPT 6세션 × 83)
                    D: Phase 1/2 교정 77건
```
