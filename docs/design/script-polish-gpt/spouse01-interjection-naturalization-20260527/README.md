# spouse-01 interjection 채널 자연화 35 entries — 2026-05-27

## 배경

spouse-01 다른 channel 정찰 결과:
- **interjection 채널**: 160 var / 어색 35 hits (21.9%) — 가장 높은 어색 밀도
- Top patterns: 그렇게=23, 그_부분=12

35 entries 모두 unique text (동형 X). 1:1 polish 영역.

## 영역 특이성

- NPC 격앙 외침 발화 (재판 중 말 끊기 / 반박 / 자기 변호)
- minor (차분) + major (격앙) 혼합
- 분포: A (송다은/박지연) 22 + B (이준호) 13

## 폴더 구조

```
spouse01-interjection-naturalization-20260527/
├── README.md (본 file)
└── gpt-upload-interjection/
    ├── INSTRUCTIONS.md          # 작업 지시서
    ├── policy-01-natural-korean.md
    ├── policy-02-truth-disclosure.md
    └── batch-interjection.md    # 35 entries 표
```

## 처리 방향 (★ 격앙 톤 특이성)

- **격앙 발화 (major v...)**: "그렇게" / "끝까지" 같은 강조 부사는 자연 영역 보존 OK
- **차분 발화 (minor v...)**: 강조 부사 일부 제거 + 추상명사 ("그 부분") 명확화
- 1인칭 자기 발화 — "본인/자신" X (NPC 자기 발화에서 매우 어색)
- 상대방 호명 ("이준호!", "박지연!", "재판관님") 보존

## GPT Pro 의뢰 방식

1. `gpt-upload-interjection/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 적용 방식

apply stub: `scripts/tmp/apply-interjection-stub.mjs` (Claude가 결과 도착 시 생성)

35 entries 직접 매핑 (동형 X).
