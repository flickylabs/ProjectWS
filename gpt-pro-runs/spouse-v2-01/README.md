# GPT Pro 실행 가이드: spouse-v2-01 "새벽 통화기록"

## 실행 순서

이번 validator 재실행은 Session 1~4를 병렬로 돌린다.
각 세션에는 동일한 첨부 묶음과 각 `message.md`를 그대로 넣고, 세션 간 내용을 섞지 않는다.

## 각 Session 폴더 구성

```
session-N/
├── message.md          ← 이 내용을 GPT Pro에 붙여넣기
├── attachments/        ← 이 파일들을 GPT Pro에 함께 첨부
│   └── (필요한 파일 복사본 또는 경로 안내)
```

## 공통 첨부 파일 (모든 Session에 첨부)

1. `src/data/cases/generated/spouse-v2-01.json`
2. `docs/ref/리뉴얼참고/thread-s-v2-case-design-spouse.md`
3. `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
4. `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

## validator 재실행 체크

- `interrogation`, `evidence_present`, `dossier`의 모든 variant는 `재판장님,`으로 시작
- judge-facing 문장은 끝까지 합니다체 유지
- sentence count는 세션 메시지의 `Validator Stage3 하드 규칙`을 그대로 준수
- `evidence_present`는 증거 키워드를 첫 문장에 직접 포함
- `d-2`, `d-3`, `d-4`의 `S5`는 각각 `3,000만 원`, `2,000만 원`, `5,000만 원` 직접 포함
- `d-1` 계열 문장에는 금전어 금지

## 출력 처리

각 Session의 GPT Pro 응답(JSON)을 `output/` 아래 아래 파일명으로 저장한다.

- `session-1-interrogation-a.json`
- `session-2-interrogation-b.json`
- `session-3-evidence-dossier.json`
- `session-4-witness-aftermath-system.json`

4개 Session 완료 후 Thread G 전달 또는 병합 스크립트 입력 시 위 파일명을 그대로 사용한다.
