# Batch 3 — family-01 e-5 + dc-5 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

비밀+최종 line의 **종결 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 증거 | `e-5` | 자필 메모 사본 (lockedName=어머니 자필 유언장 연습본) | dc-4 → e-5 cascade. **S5 봉인 자료** — 자필 자체 surface OK, 정확 수치 X |
| 2 | 단서 | `dc-5` | 어머니의 뜻 | d-5 → dc-5 cascade. **최종 단서** — 양측 책임축 종합 |

dc-4 → e-5 cascade: 침묵 동기 정리 후 자필 자료 (어머니의 직접 마음) 등재 자연 연속.
d-5 → dc-5 cascade: 양측 책임축 영역 진입 후 종합 단서 등록 자연 연속.

## 본 batch 핵심 surface 영역 + **핵심 봉인 정책**

**surface OK (본 batch 영역)**:
- e-5 자료 surface 자체 (단 *모호 표현*만 — "자필 자료" / "자필 본의 분배 흔적")
- dc-5 종합 영역 = 양측 책임축 종합 (장남 당연시 + 보호 명분 + 어머니 뜻 두 번 비틀음)

**surface 절대 X (본 batch 모든 entry — 가장 엄격)**:
- **그룹 3 정확 수치 (90:10 / 60:40)** — 본 cycle 모든 batch 절대 X. **본 batch 가장 엄격 정책** (e-5 surface 자체가 S5 hook 영역).
- 친부 실명 / 구체적 출생 경위 — 영구 봉인

## 본 batch 특수 영역 — e-5 S5 봉인

e-5는 case.ts requiredLieState='S5' (d-5 S5 도달 후만 surface). 본 cycle entry는 **자료 surface 자체는 표현 OK** (자료 등재 narrative 자연 작동) — 단 *정확 수치 노출은 본 batch entry 영역 절대 X*. 정확 수치 노출은 d-5 truthStages S5 영역의 별도 mechanism 영역 (본 cycle narrative wrapper 영역 X).

본 batch entry text 표현:
- ✓ "어머니의 자필 메모 사본" / "어머니가 직접 남기신 자료" / "자필 본의 분배 흔적"
- ✗ "90:10" / "60:40" / "정후 90" / "태성 10" (정확 수치 절대 X)
- ✗ "비율을 줄였다" 같은 수치 방향 단정 표현 X (단 "다른 방향으로 다듬은" 같은 모호 표현 OK)

## 업로드 파일 (총 17개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — e-5 (4 trigger) + dc-5 (4 trigger) 명세 |
| 2 | [family01-tone-samples.md](family01-tone-samples.md) | family-01 톤 reference |
| 3 | [sample/output-cycle6-family01-line-b.json](sample/output-cycle6-family01-line-b.json) | **Cycle 6 산출 sample** |
| 4~15 | [reference/](reference/) — 권위 메모리 12종 | |

## GPT Pro 사용 절차

1. 위 17개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 family-01 Cycle 7 Batch 3 (e-5 + dc-5)
   emergence narrative KO entry 작성.

   - family01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - sample/output-cycle6-family01-line-b.json의 entry/tag 형식 reference
   - feedback_new_dispute_evidence_narrative_justification 정책 준수 (multi-trigger + First-Fired-Wins)
   - design_narrative_cascade_from_card spec 준수 (e-5 cascade priorCard:dc-4 / dc-5 cascade priorCard:d-5)
   - design_family01_truth_disclosure_policy 그룹 3 정확 수치 **절대 X** (본 batch 가장 엄격 정책), 친부 실명 영구 봉인
   - feedback_dossier_card_renamed_to_clue: '단서' 명칭 사용 (예: "단서 [어머니의 뜻]")
   - feedback_judge_dispassionate_action_focused 정책 준수
   - 의뢰서 §3 미스터리 dynamics 정책 엄수
   - 의뢰서 §4 시스템 용어 절대 금지
   - 출력 형식: JSON 배열
   - 응답 파일명: output-cycle7-batch3-e5-dc5.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션에 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증 + **정확 수치 (90:10 / 60:40) 등장 X 정밀 검증** (P0 위험 영역)
2. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 추가 (18 entry append)
3. (6단계) e-5 (Evidence) + dc-5 (DossierCard) `narrativeTriggers` 부착
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` PASS — **truth-leak gate 정밀 확인** (그룹 3 봉인 영역)
5. Codex 다국어 sync 의뢰서
6. commit + push

## 폴더 정책

self-contained — 외부 참조 X.
