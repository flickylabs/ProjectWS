# Cycle 7 — family-01 Line C (비밀+최종) emergence narrative (GPT Pro Upload, 3 Batch 병렬)

작성일: 2026-05-25
worktree: ws-family-01-cycle / branch: family-01-cycle
주체: Claude(Cycle 7) → GPT Pro(KO 시안) → Claude(apply/검증/Codex 의뢰)

---

## Cycle 7 개요

family-01 사건의 **Line C "비밀+최종" 6 emergence**에 narrative wrapper 부착. 본 사건의 *마지막 line* — 출생 비밀(그룹 1) + 친자 양보(그룹 4) + 보호 명분(그룹 5) surface 진입. 자필 정확 수치(그룹 3)는 봉인 유지.

### 대상 emergence 6개 (Line C: 가족 기록 + 최종 책임축)

| # | 영역 | id | 자연 명칭 (player visible) | Batch |
|---|---|---|---|---|
| 1 | 쟁점 | `d-4` | 가족 기록과 침묵의 이유 | **Batch 1** |
| 2 | 증거 | `e-7` | 오래된 노트 사본 (lockedName=어머니 일기장) | **Batch 1** |
| 3 | 단서 | `dc-4` | 감춘 이유 | **Batch 2** |
| 4 | 쟁점 | `d-5` | 어머니의 숨겨진 마음 | **Batch 2** |
| 5 | 증거 | `e-5` | 자필 메모 사본 (lockedName=어머니 자필 유언장 연습본) | **Batch 3** |
| 6 | 단서 | `dc-5` | 어머니의 뜻 | **Batch 3** |

### 비밀+최종 line 인과 chain

```
[Cycle 6 마지막 단서] dc-3 (20년의 돈)
       ↓
   d-4 (가족 기록과 침묵의 이유) + e-7 (오래된 노트 사본)   ← Batch 1
       ↓
   dc-4 (감춘 이유)                                       ← Batch 2
       ↓
   d-5 (어머니의 숨겨진 마음)                              ← Batch 2
       ↓
   e-5 (자필 메모 사본) — S5 봉인 영역                     ← Batch 3
       ↓
   dc-5 (어머니의 뜻) — 양측 책임축 종합 (최종 단서)         ← Batch 3
```

---

## 본 cycle의 진정한 narrative 핵심 — *fact + 동기 영역 미스터리 동시*

Cycle 6 (Line B)는 fact 영역 미스터리 약함 / 동기 영역 강함. **본 cycle은 fact 영역도 강함** (출생 비밀, 자필 vs 공증). 동기 영역도 강함 (보호 명분, 양보 동기, A frame 붕괴).

### 본 cycle의 미스터리 dynamics 3 축

| 축 | 표면 | 진짜 | player 추리 |
|---|---|---|---|
| **B "어머니 뜻 + 보호 명분" frame** | "어머니가 그렇게 하라 하셨다" (Cycle 6 frame) → "본인이 어머니 뜻을 다듬었다" (본 cycle d-5 S2~S3) | 자기 양보 + 형 자존심 보호 | *진정 형 자존심인가, B의 죄책감인가?* |
| **A "장남 당연시 frame 첫 흔들림"** | "내가 모셨으니 당연" → "동생을 더 보셨을 수도" (d-5 S1) | 두 번 왜곡 책임 인식 (S4) | *A는 어디서부터 다시 봐야 하나?* |
| **재판관 "가족 영역 분리"** | "가족 사정 영역" (d-4) vs "책임 구조 영역" (d-5) 분리 명시 | (Cycle 6의 "동기 별도 영역" 정책 계승) | (재판관 정책 — 미스터리 유지 장치) |

### 본 cycle에서 surface 시작 영역 (그룹 1/4/5)

- **그룹 1 출생 비밀** — d-4 S3 surface 시작 OK. 단 친부 실명 영구 봉인.
- **그룹 4 친자 양보 / 공장 양보** — d-4 S3+ surface OK
- **그룹 5 보호 명분 / 두 번 왜곡** — d-5 S3+ surface OK

### 본 cycle에서 surface 금지 영역

- **그룹 3 자필 90:10 / 공증 60:40 정확 수치** — 본 cycle 모든 emergence entry 절대 X (d-5 S5 봉인 영역). e-5 surface 자체는 OK 단 수치 표현 X
- **친부 실명** — 영구 봉인 정책 (design_family01_truth_disclosure_policy 그룹 1 §6)

---

## 신규 정책 — 재판관 어법 사실/행위 중심 (Cycle 5 계승)

`feedback_judge_dispassionate_action_focused.md` 정책. 본 cycle 의뢰서 전체 적용.

핵심:
- 재판관 발화에 감정·가치 어휘 회피 ("선을 넘다", "흐름", "낙인" X)
- 사실·행위·선후관계 중심 ("정황", "선후관계", "관련 자료")
- 증인 호출 동사 다양화 (단일 "호출하겠습니다" 반복 X)

## 신규 정책 — 시스템 용어 절대 금지 (Cycle 6 사고 3 학습 계승)

재판관 발화(judge_summon / judge_decree / judge_react)에서 다음 시스템 용어 절대 X:
- S0~S5 / lieState / truthStage / depthStage → "어느 정도 정리된 후" / "충분히 확인된" 자연어
- trigger / emergence / cascade / unlock / fired → "별도 쟁점으로 분리" / "단서 등재" / "본 법정에 등재"

## `cascade_from_card` trigger (Cycle 2 도입, 본 cycle 핵심 활용)

본 cycle은 cascade chain이 핵심 — dc-3 → d-4 / d-4 → e-7 / d-4 → dc-4 / dc-4 → d-5 / e-7 → d-5 / dc-4 → e-5 / d-5 → dc-5 모두 cascade 후보. 각 batch `gpt-pro-brief.md` §2 priorCard 명시.

---

## Batch 분할 사유

총 61 KO entry 규모. GPT Pro 한 thread 부담 분산 + 자연 인과 짝 단위로 **3 batch 분할**:

| Batch | 폴더 | 처리 emergence | 인과 짝 | entry 수 |
|---|---|---|---|---|
| 1 | [batch1-d4-e7/](batch1-d4-e7/) | d-4 + e-7 | 가족 기록 쟁점 → 어머니 일기장 자료 | 22 |
| 2 | [batch2-dc4-d5/](batch2-dc4-d5/) | dc-4 + d-5 | 감춘 이유 단서 → 어머니의 숨겨진 마음 책임축 | 21 |
| 3 | [batch3-e5-dc5/](batch3-e5-dc5/) | e-5 + dc-5 | 자필 자료 (S5 봉인) → 어머니의 뜻 최종 단서 | 18 |

각 batch 폴더는 self-contained — 메모리/톤 sample 모두 복사돼 있어 외부 참조 X. **GPT Pro 3 thread 병렬 진행 권장**.

---

## GPT Pro 사용 절차

1. 각 batch 폴더를 GPT Pro Project에 업로드 (또는 채팅 첨부)
2. batch 폴더의 `README.md` 절차대로 진행
3. 모든 batch GPT 응답 도착 후 메인 Claude 세션에 일괄 전달

## 산출 처리 흐름 (메인 Claude 세션)

8단계 절차 ([[design_core_narrative_cycle_procedure]]) 기준:

- ✅ 0~2단계 완료 (정찰 / 1단계 기획 / 사용자 승인)
- 🟢 **3단계 (본 폴더)** — GPT 의뢰서 준비
- ⬜ 4단계 — 사용자 GPT Pro 진행
- ⬜ 5단계 — Claude 검토 + 수정 시안 제안 + 사용자 승인
- ⬜ 6단계 — family-01.case.ts d-4 / e-7 / dc-4 / d-5 / e-5 / dc-5 narrativeTriggers 부착 + family-01.narrative.ts에 신규 export 추가 + tsc/build/qa:fast PASS
- ⬜ 7단계 — Codex 다국어 sync 의뢰서 (KO entry × 3 lang, 183 외국어 variant)
- ⬜ 8단계 — 사후 통합

## 폴더 정책

본 폴더 + 모든 batch 하위 폴더는 self-contained. 외부 link X.
권위: [[feedback-external-brief-self-contained-folder]] / [[feedback-external-brief-path-explicit]]
