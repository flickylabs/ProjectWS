# Batch 3 — friend-01 w-1 (김세라) emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

friend-01 Line A 종결부의 **증인 1 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 증인 | `w-1` | 김세라 (32세, 미용실 직원 / 단톡방 동조자) | dc-1 (단톡방 글의 근거) fired 후 호출 가능 |

**w-1 = pro_a (A 편향) + strategic distortion**. 송다은 단톡방 발언에 동조한 공통 친구. hiddenAgenda: 자신도 최수민 비난에 가담한 것이 부끄럽다.

## 업로드 파일 (총 12개)

Batch 1과 동일 12 파일.

## GPT Pro 사용 절차

1. 12개 파일 업로드
2. prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 friend-01 Batch 3 (w-1 = 김세라 단톡방 동조 증인) emergence narrative 13개 KO entry 작성.

   준수 정책: Batch 1과 동일
   - w-1은 증인 emergence — judge_witness_summon channel과 유사 톤
   - cascade priorCard:dc-1 (새 label "단톡방 글의 근거" 사용)
   - 증인 호출 동사 다양화 ("호출" / "증인으로 모시겠습니다" / "확인해 보겠습니다" 등 trigger별 다름)

   출력 형식: JSON 배열
   - 응답 파일명: output-cycle7-batch3.json
   ```

## 산출 처리 (메인 세션)

1. JSON 정합성
2. `src/data/scriptedText/friend-01.json` emergence_narrative 채널에 13 entry
3. `src/data/coreCases/friend-01.case.ts`:
   - `witnesses[id='w-1'].narrativeTriggers` 부착 (4 후보)
4. tsc + build + qa:fast PASS
