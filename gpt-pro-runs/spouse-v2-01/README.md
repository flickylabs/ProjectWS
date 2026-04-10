# GPT Pro 실행 가이드: spouse-v2-01 "새벽 통화기록"

## 실행 순서

Session 1 → Session 2 → Session 3 → Session 4 (순서대로)

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

## 출력 처리

각 Session의 GPT Pro 응답(JSON)을 같은 폴더에 `output.json`으로 저장.
4개 Session 완료 후 Thread G에 전달하여 external_scripted_json으로 주입.
