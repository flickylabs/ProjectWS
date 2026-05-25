# Batch 3 — family-01 dc-2 + w-2 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

절차/판단 line의 **마무리 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 단서 | `dc-2` | **수정된 유언장** (라벨 변경: '줄인 유서' → '수정된 유언장') | d-2 surface 후 절차 단서 정리 |
| 2 | 증인 | `w-2` | 공증인 메모 담당 김영수 | dc-2 unlock 후 직접 청취 가능 |

dc-2 → w-2 cascade — Batch 2 결과(d-2 쟁점) 분기 후 단서 합성. 단서 등록 직후 그 단서의 직접 담당자(공증인 메모 담당) 호출.

## ⚠️ dc-2 라벨 변경 영역 (Cycle 5 신규)

**원본**: `family-01.case.ts` 의 `dc-2` `label: ko('줄인 유서')`
**변경**: `label: ko('수정된 유언장')`

본 batch GPT Pro 작성 시 entry text의 단서 reference는 모두 **"수정된 유언장"** 사용. case.ts label 변경 + ScriptedText label reference 일괄 변경은 메인 Claude 세션 6단계(로직 체크)에서 적용.

## 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-2 (4 trigger) + w-2 (3 trigger) 명세 |
| 2 | [family01-tone-samples.md](family01-tone-samples.md) | family-01 톤 reference |
| 3~12 | (Batch 1과 동일 권위 메모리 10종) | |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 family-01 Cycle 5 Batch 3 (dc-2 + w-2)
   emergence narrative KO entry 작성.

   - family01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - dc-2 단서 라벨 = "수정된 유언장" (기존 '줄인 유서' 라벨 변경, 의뢰서 §1 참조)
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - design_narrative_cascade_from_card spec 준수 (dc-2 cascade priorCard:d-2, w-2 cascade priorCard:dc-2)
   - design_family01_truth_disclosure_policy 그룹 1~5 surface 금지
   - feedback_dossier_card_renamed_to_clue: '단서' 명칭 사용
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 응답 파일명: output-cycle5-batch3.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션에 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 추가
3. (6단계) dc-2 (DossierCard) + w-2 (Witness) narrativeTriggers 부착 + **dc-2 label rename** (`줄인 유서` → `수정된 유언장`) — case.ts + ScriptedText `dossier` channel 영역 일괄 grep 변경
4. tsc + build + qa:fast PASS
5. Codex 다국어 sync 의뢰서 (Batch 3 entry × 3 lang + dc-2 label 변경 안내)
6. commit + push

## 폴더 정책

self-contained — 외부 참조 X.
