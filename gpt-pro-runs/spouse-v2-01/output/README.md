# spouse-v2-01 GPT Pro 출력 처리 가이드

## 파일 구성

```
output/
├── session-1.json          ← Session 1 GPT Pro 출력 (그대로 저장)
├── session-2-raw.json      ← Session 2 GPT Pro 출력 (id 없는 원본)
├── session-2-fixed.json    ← Session 2 id 보강본 (스크립트 실행 후 생성)
├── session-3.json          ← Session 3 GPT Pro 출력 (그대로 저장)
├── session-4.json          ← Session 4 GPT Pro 출력 (그대로 저장)
├── fix-session2-ids.cjs    ← Session 2 id 보강 스크립트
└── README.md               ← 이 파일
```

## 처리 순서

1. GPT Pro 출력 4개를 각각 위 파일명으로 저장
2. Session 2 id 보강:
   ```bash
   cd gpt-pro-runs/spouse-v2-01/output
   node fix-session2-ids.cjs
   ```
3. Thread G에 전달할 때:
   - session-1.json
   - session-2-fixed.json (raw 아님)
   - session-3.json
   - session-4.json

## Thread G 전달 메시지

아래 메시지와 함께 4개 파일을 Thread G에 전달:

```
CT: spouse-v2-01 ScriptedText GPT Pro 출력 4개 세션 전달.

파일:
- session-1.json (Party A interrogation)
- session-2-fixed.json (Party B interrogation, id 보강 완료)
- session-3.json (Evidence + Dossier)
- session-4.json (Witness + Aftermath + System)

이 4개를 합쳐서 spouse-v2-01 ScriptedText bundle로 조립한 뒤,
external_scripted_json 모드로 파이프라인에 주입해라.

실행 명령:
node scripts/generic-case-run-pipeline.cjs --case spouse-v2-01 --mode external_scripted_json --external-input src/data/scriptedText/external/spouse-v2-01.json

stage2b~stage3 검증까지 돌리고 결과를 CT에 보고.
```
