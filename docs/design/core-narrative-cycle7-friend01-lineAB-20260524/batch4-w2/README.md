# Batch 4 — friend-01 w-2 (박준혁) emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

friend-01 Line B 종결부의 **증인 1 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 증인 | `w-2` | 박준혁 (34세, 회사원 / 예비신랑 회사 후배) | dc-2 (먼저 넘은 선) fired 후 호출 가능 |

**w-2 = neutral + accurate distortion**. 예비신랑 김태윤의 회사 후배. 예비신랑이 최수민에게 먼저 접근한 사실을 알고 있다. hiddenAgenda: 예비신랑과의 직장 관계가 불편해질까 봐 조심한다.

## 업로드 파일 (총 12개)

Batch 1과 동일 12 파일.

## GPT Pro 사용 절차

1. 12개 파일 업로드
2. prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 friend-01 Batch 4 (w-2 = 박준혁 예비신랑 회사 후배 증인) emergence narrative 13개 KO entry 작성.

   준수 정책: Batch 1, 3과 동일
   - w-2는 neutral 증인 — 평평한 톤 / 보수적 / accurate
   - cascade priorCard:dc-2 (먼저 넘은 선)
   - 증인 호출 동사 trigger별 다양화

   출력 형식: JSON 배열
   - 응답 파일명: output-cycle7-batch4.json
   ```

## 산출 처리 (메인 세션)

1. JSON 정합성
2. `friend-01.json` emergence_narrative 채널에 13 entry
3. `friend-01.case.ts`: `witnesses[id='w-2'].narrativeTriggers` 부착
4. tsc + build + qa:fast PASS
