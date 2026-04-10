# spouse-v2-01 GPT Pro 출력 처리 가이드

## 파일 구성

```
output/
├── session-1-interrogation-a.json          ← Session 1 GPT Pro 출력
├── session-2-interrogation-b.json          ← Session 2 GPT Pro 출력
├── session-3-evidence-dossier.json         ← Session 3 GPT Pro 출력
├── session-4-witness-aftermath-system.json ← Session 4 GPT Pro 출력
└── README.md               ← 이 파일
```

## 처리 순서

1. GPT Pro 출력 4개를 각각 위 파일명으로 저장
2. 병합 또는 Thread G 전달 시 아래 4개 파일을 그대로 사용:
   - `session-1-interrogation-a.json`
   - `session-2-interrogation-b.json`
   - `session-3-evidence-dossier.json`
   - `session-4-witness-aftermath-system.json`

## Thread G 전달 메시지

아래 메시지와 함께 4개 파일을 Thread G에 전달:

```
CT: spouse-v2-01 ScriptedText GPT Pro 출력 4개 세션 전달.

파일:
- session-1-interrogation-a.json (Party A interrogation)
- session-2-interrogation-b.json (Party B interrogation)
- session-3-evidence-dossier.json (Evidence + Dossier)
- session-4-witness-aftermath-system.json (Witness + Aftermath + System)

이 4개를 합쳐서 spouse-v2-01 ScriptedText bundle로 조립한 뒤,
external_scripted_json 모드로 파이프라인에 주입해라.

실행 명령:
node scripts/generic-case-run-pipeline.cjs --case spouse-v2-01 --mode external_scripted_json --external-input src/data/scriptedText/external/spouse-v2-01.json

stage2b~stage3 검증까지 돌리고 결과를 CT에 보고.
```
