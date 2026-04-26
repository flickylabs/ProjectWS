# S8 — 잘못 패턴 #6 보정 (family-01)

## 작업 목표
**family-01 통합본에서 잘못 패턴 #6 차원 보정**.

(S7 spouse-01 prompt 참조 — 동일 절차. 사건 정보만 family-01로 변경)

## 입력 source
- `01-case-family-01.json`
- `03-scriptedText-family-01-full.json` — **현재 통합본** (5,172v / 18ch)
- `04-story-v2-3cases.md`
- `05-user-pattern-correction.md` ★ / `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ family-01 사건 핵심 (절대 충돌 금지)

### 인물
- A 윤태성 confrontational
- B 윤정후 affect_flattening

### 유서 비율 (★★★)
- **A 40 / B 60** (B가 자기 몫 90→60 줄임). 절대 반대 X.

### 사건 사실
- 출생 비밀 / 20년 지원 / 어머니 일기장 / 공장 부도 / 1억 막음

## 검출 결과 (참고)
이전 메인 검출 결과:
- noun_action: 120건
- weak_쪽: 55건
- 합계: 175건

## 9차원 검토 가이드

(S7 동일)

특히:
- **A 윤태성 confrontational**: 강하고 단정적, 감정 표출
- **B 윤정후 affect_flattening**: 침착, 평면, 감정 안 드러냄

## 사용자 모범 4 patch (필수 일관)

| Patch | 잘못 → 보정 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" |
| 3 | "흐리면" → "밝히지 않으면" |
| 4 | "{X} 돌봄/지원" → "{X}을 돌본/도운 것" |

## 작업 절차 (S7 동일)

## 출력 포맷

`output/correction-pattern6-family-01.json` — S7 동일 구조

## 검증 체크리스트 (제출 전)

- [ ] **모든 before 본문이 03-scriptedText-family-01-full.json의 실제 text와 정확히 일치**
- [ ] **유서 비율 A 40 / B 60 일관** (반대 패턴 0건)
- [ ] noun_action 보정 모두 동사형 자연체
- [ ] weak_쪽 NPC voice 보존 항목 skipped 분류 + 이유 명시
- [ ] 사용자 모범 4 patch 적용
- [ ] archetype 차별화 (윤태성 강한 단정 / 윤정후 침착 평면)
- [ ] 사건 설정 (출생 비밀 / 20년 지원 / 일기장) 정확
- [ ] Truth Throttle (S0~S2에서 "60", "40", "90", "출생 비밀" 노출 X)
- [ ] 글자수 ±5 편차 내
