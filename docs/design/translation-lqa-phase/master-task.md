# 마스터 의뢰서: 번역 LQA Phase (Linguistic Quality Assurance)

작성일: 2026-05-18
선행: 본 번역 19,203행 + batch_21 27행 = 19,230행 (Phase 2) + Phase 3 적용 완료 시점
사용자 결정: **품질 최우선 (A+B+C+D+E 전체)** + **별도 Phase로 진입**

---

## §0. 진입 조건

이 Phase는 다음 모두 완료 후 시작:

| 항목 | 조건 |
|---|---|
| Phase 2 본 번역 | 라운드 1~5 + batch_21 모두 GPT_Result 도착 |
| 라운드별 verify | placeholder / 빈칸 / CJK / glossary 위배 0 |
| Phase 3 적용 | Codex 의뢰 완료 — source 파일에 4언어 반영 |
| 사용자 PC QA (한국어) | 튜토리얼 + 임팩트 시각 확인 완료 |

진입 시 working tree clean.

## §1. 배경 / 목표

### 1.1. 배경
- 19,203행 × 4언어 = 약 77k 셀 본 번역
- GPT Pro Project + glossary 전략으로 일관성 자동 보장 (verify로 검증됨)
- 그러나 대용량 처리 시 후반부 attention 분산 → 일부 mechanical 패턴 발생 가능
- 사용자 직감: "기계적으로 진행" 우려
- 출시 품질 보장을 위해 LQA 별도 Phase 필요

### 1.2. 목표
4언어 모두 출시 가능 품질로 보장:
- **자연성**: 모국어 화자가 어색하다고 느끼지 않음
- **의미 정확성**: ko 원문 의미 정확 보존
- **톤 일관**: 시스템 / 재판관 / 카피 톤 통일
- **문화 컨텍스트**: 한국식 표현이 각국 문화에 맞게 현지화
- **진실 누설 재검증**: 영어/일본어/중국어 빌드에서도 진실 노출 0

### 1.3. 비-목표
- 캐릭터 대화 스크립트 LQA (이미 GPT Pro로 처리됨, 별도 검수 영역)
- 새 콘텐츠 추가
- 게임플레이 변경

## §2. 5단계 LQA Phase

### Step A — 자동 검출 강화 (verify-translations.cjs 확장)
**산출:** 강화된 verify 스크립트 + LQA 자동 리포트

검출 패턴 추가:
1. **직역 의심 영어:** "the X figure" / "X authority" / "X Bracket / Track / Bar" 류 부자연 명사 직역
2. **일관성 위배:** 같은 ko 행이 여러 batch에서 다른 번역으로 분기된 경우
3. **일본어 조사 어색:** 「が / は / を」 패턴 검출 (간단한 휴리스틱)
4. **중국어 어순:** 한국어 문법 영향 어순 (예: "X的Y是" 패턴)
5. **고유명사 표기 불일치:** glossary에 없는 인명/지명이 batch마다 다르게 번역된 경우
6. **시스템 톤 깨짐:** 해요체 / 합쇼체 잔류 (한국어 외 언어에서 일관 ko 톤 위배)

**작업 자원:** Codex 별도 스레드 (스크립트 확장)
**예상 시간:** 1일

### Step B — Claude LQA pass (별도 ClaudeCode 세션)
**산출:** 카테고리별 자연성 검수 리포트 + 정정 후보 안

작업 방식:
- 별도 ClaudeCode 세션 N개 (카테고리별 또는 batch별 분담)
- 메모리 컨텍스트 활용 (해요체 / 진실 누설 / 자연 한국어 정책)
- 정성 평가 차원:
  - 자연성 (모국어 화자 입장)
  - 의미 보존 (ko vs target 의미 비교)
  - 톤 일관 (배치 내 / 카테고리 내)
  - 문화 컨텍스트 (지역화 적절성)
- 부자연 행 리스트 + 정정 후보 안 (3안 정도)

**작업 자원:** ClaudeCode 별도 스레드 (메인 세션 컨텍스트 보호)
**예상 시간:** 카테고리별 1~2일 × 6 카테고리 = 약 6~12일 (병렬 가능)

### Step C — GPT Pro LQA pass (자기 출력 재검수)
**산출:** GPT Pro 자체 정정 결과

작업 방식:
- 이미 끝낸 batch 결과를 GPT Pro Project에 다시 보내기
- 프롬프트: "이 결과를 모국어 검수자 입장에서 자연성 평가하고 부자연 행만 정정. 동일 CSV 구조 유지"
- 첫 패스보다 attention 집중 — 같은 모델로 자기 출력 점검

**작업 자원:** 사용자 + GPT Pro Project (사용자가 한 batch씩 발송)
**예상 시간:** 19 batch × 30분~1시간 = 약 10~20시간 (병렬 시 3~5시간으로 압축)

### Step D — 인간 모국어 검수자
**산출:** 영어 / 일본어 / 중국어 모국어 검수 정정본

작업 방식:
- 인디 게임 번역 검수 freelancer contact (Fiverr / Upwork / 한국 번역 에이전시)
- 영어 / 일본어 / 중국어 각 1명씩
- 우선순위 카테고리 (UI / 증거명 / 임팩트 카피) 우선 → 시간 허락 시 전체

**작업 자원:** 외부 인간 검수자
**예상 시간:** 1~2주 (검수자 일정 의존)
**비용:** $300~$1,500 (행수·언어별)

### Step E — 정정 통합 + 재검증
**산출:** 최종 LQA 통과 4언어 빌드 + Phase 3 재적용 + 출시 후 핫픽스 채널

작업 방식:
1. Step A/B/C/D의 정정 결과 통합
2. 충돌 영역 해결 (예: Claude 안 vs 인간 검수자 안 → 인간 검수자 우선)
3. 정정 결과를 batch CSV에 다시 적용 (또는 source 파일 직접 수정)
4. verify-translations.cjs 강화판 일괄 재실행
5. npm run check:all + 4언어 PC QA
6. 출시 후 사용자 피드백 → 핫픽스 채널 활성화

**작업 자원:** Codex 메인 스레드 (Phase 3 패턴 동일)
**예상 시간:** 2~3일

## §3. 카테고리별 우선순위

같은 강도 LQA는 비효율. 카테고리별 차별 적용:

| 카테고리 | 행수 | 노출 빈도 | A | B | C | D |
|---|---|---|---|---|---|---|
| `ui_i18n_message` | 979 | 매우 높음 | ✓ | ✓ 전수 | ✓ | ✓ |
| `case_surface_content` | 4,594 | 높음 | ✓ | ✓ 전수 | ✓ | ✓ (우선순위) |
| `non_party_scripted_text` (재판관/시스템/증인) | 5,875 | 중간~높음 | ✓ | ✓ 표본 + 진실 누설 전수 | ✓ | ✓ (시간 허락 시) |
| `judge_question_script` | 4,080 | 중간 | ✓ | ✓ 표본 | ✓ | △ |
| `hardcoded_source_literal` | 3,422 | 다양 | ✓ | ✓ 표본 | ✓ | △ |
| 기타 (`witness/mediation/phase_dialogue/question_angle`) | 253 | 낮음 | ✓ | △ | ✓ | △ |

🔴 우선: `ui_i18n_message` (모든 화면 노출 + 짧은 UI 카피 = 부자연 즉시 인지)
🟠 다음: `case_surface_content` (증거명 / 쟁점명 = 반복 노출)
🟡 중간: 나머지 (긴 텍스트는 일부 자연성 손실 허용 가능)

### Beat 5 (h-d3) / 진실 누설 영역 특별 처리
- 모든 언어에서 "위임장 / 조작 / 공동 / 적금 / 권한 / 동의 / 비자금 / 투자" 영역
- Step B에서 진실 누설 검사 어휘 매트릭스 4언어 전수 검증
- glossary에 영어/일본어/중국어 매핑 누락 시 (예: 한자권 "委任状" / "委托书") 진실 누설 우려 더 큼

## §4. 자원 분담

| Step | 자원 | 비용 | 시간 |
|---|---|---|---|
| A. 자동 검출 확장 | Codex 별도 스레드 | $0 | 1일 |
| B. Claude LQA pass | ClaudeCode 별도 스레드 × N | $0 | 6~12일 (병렬) |
| C. GPT Pro 자기 재검수 | 사용자 + GPT Pro Project | GPT Pro 구독료 | 3~5시간 (병렬) |
| D. 인간 모국어 검수자 | 외부 freelancer × 3 | $300~$1,500 | 1~2주 |
| E. 정정 통합 + 재검증 | Codex 메인 스레드 | $0 | 2~3일 |

**총 예상 시간:** 약 3~4주 (병렬 진행)
**총 예상 비용:** $300~$1,500 (Step D만)

## §5. 검증 절차

### 5.1. Step별 게이트
- 각 Step 완료 시 verify-translations.cjs 강화판 통과 필수
- Step B 통과 = 카테고리별 정정 리포트 + 사용자 검토
- Step D 통과 = 검수자별 정정본 + 검수 노트
- Step E 통과 = check:all + 4언어 PC QA

### 5.2. 출시 게이트
- LQA Phase 완료 = Steam 출시 §2 콘텐츠 / §3 다국어 / §7 QA 통과 조건
- Steam 출시 체크리스트의 §2.1 (사건 완주 12 시나리오) 자동 진입 가능

### 5.3. 출시 후 (Step E 연장)
- 핫픽스 채널 활성
- Steam 리뷰 4언어 모니터링
- 사용자 발견 부자연 행 → 패치 사이클

## §6. 의뢰서 발송 시점

본 LQA Phase 의뢰서는 다음 모두 완료 후 단계별 발송:

```
완료:
  Phase 2 라운드 1 (spouse-01) ✓
  
진행 중:
  Phase 2 라운드 2 (family-01)
  Codex 퍼널 telemetry
  
대기:
  Phase 2 라운드 3~5 (friend-01 / global)
  Phase 3 Codex 반영
  사용자 PC QA (한국어)
  
LQA Phase 진입:
  Step A (Codex 의뢰) ← 가장 먼저, 자동 검출 확장
  Step C (사용자 GPT Pro 재의뢰) ← 병렬 시작 가능
  Step B (ClaudeCode 별도 스레드 N개) ← Step A 완료 후
  Step D (인간 검수자 contact) ← 같이 진행 (외부 일정)
  Step E (Codex 통합) ← 모두 완료 후
  
출시 게이트:
  Steam 출시 체크리스트 §2 / §3 / §7 통과
```

## §7. 추가 결정 사항 (사용자)

LQA Phase 진입 시점 사용자가 결정:

- [ ] **인간 검수자 채용 채널:** Fiverr / Upwork / 한국 번역 에이전시 / 개인 contact
- [ ] **검수자 비용 예산:** $300 (UI만) / $800 (UI + case surface) / $1,500 (전체)
- [ ] **LQA 일정:** 출시 일정과 trade-off — 본 Phase 3~4주 추가될 가능성
- [ ] **부분 출시 vs 완전 LQA 후 출시:** 일부 카테고리만 인간 검수 + 나머지 출시 후 핫픽스 vs 전체 LQA 후 출시
- [ ] **Step C (GPT Pro 자기 재검수) 진행 여부:** Step B + D만으로 충분할 수도 있음

이 결정은 LQA Phase 진입 시점에 사용자 회신.

---

## §8. 핵심 메모리 / 정책 참조

LQA 작업 시 다음 메모리 항목 반드시 reflect:
- [feedback_natural_korean_vs_translationese](memory/feedback_natural_korean_vs_translationese.md) — 자연 한국어 vs 번역체 원칙 (모든 언어 동일 적용)
- [feedback_truth_leak_prohibition](memory/feedback_truth_leak_prohibition.md) — 진실 누설 금지 (4언어 모두 재검증)
- [feedback_revision_meaning_over_form](memory/feedback_revision_meaning_over_form.md) — 보정 = 의미 정확성 우선
- [feedback_judge_question_quality](memory/feedback_judge_question_quality.md) — 재판관 톤
- [haeyo_policy_decision](memory/haeyo_policy_decision.md) — 해요체 정책 (한국어 영역 외 다른 언어에서 톤 매핑 일관)
- [design_color_tokens_pc](memory/design_color_tokens_pc.md) — UI overflow 점검 시 시각 기준

## §9. 본 의뢰서 본격 작성 시점

본 의뢰서는 1차 골격. **Step A 의뢰 발송 시점**에 메인 세션이 다음을 보강:
- Codex Step A 의뢰서 본문 (구체 패턴 detection 알고리즘 명세)
- Step B별 ClaudeCode 스레드 의뢰서 (카테고리별)
- Step C GPT Pro 재의뢰 메시지 템플릿
- Step D 인간 검수자 contact 가이드 (RFP / 견적 / 계약 / 인수 절차)

지금은 골격 + 사용자 결정 박스. 본격 작업은 진입 시점.
