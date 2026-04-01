# 세션 1 작업 메모

## 생성 파일
- `spouse-01-v3-supplement.json`
- `spouse-01-v3-supplement.ts`
- `family-01-tells-beats.json`
- `family-01-tells-beats.ts`

## spouse-01 보충 데이터
- `transitionBeats` 16개 추가
  - a/d-3 4개
  - b/d-4 4개
  - a/d-5 4개
  - b/d-5 4개
- `events` 추가
  - contradictions 4개 (`contradiction-4` ~ `contradiction-7`)
  - interjections 2개 (`interjection-4` ~ `interjection-5`)
  - emotionalOutbursts 2개 (`outburst-a-3`, `outburst-b-3`)

### 적용 의도
- 이 파일은 **additive supplement**입니다.
- 기존 `01-spouse01-v3-1차결과.json`에 이어 붙이는 용도로 작성했습니다.
- 엔진 통합 시:
  - `transitionBeats = [...base.transitionBeats, ...supplement.transitionBeats]`
  - `events.contradictions = [...base.events.contradictions, ...supplement.events.contradictions]`
  - 같은 방식으로 interjections / emotionalOutbursts 병합

## family-01 Tell / Beat
- `executableTells` 6개
  - a: `sacrifice_rollcall`, `tear_brake`, `echo_blame`
  - b: `receipt_stack`, `clipped_denial`, `dry_sarcasm`
- `beatScripts` 36개
  - a/d-1, a/d-3, a/d-5
  - b/d-2, b/d-4, b/d-5
  - 각 dispute-party 조합당 6 beat (`deny`, `hedge`, `partial`, `blame`, `evidence_hit`, `confession`)

### 선택 이유
- 요청서의 `30~40개` 범위에 맞추기 위해 spouse-01 Session 2와 같은 방식으로
  **주요 6개 dispute-party 조합 × 6 beat = 36개**를 채택했습니다.
- d-5는 양측 핵심 공유 쟁점이므로 a/b 모두 작성했습니다.
- evidence_hit의 `afterEvidence`는 각 dispute가 실제로 가장 먼저 균열나는 대표 증거로 매핑했습니다.
  - a/d-1 → `e-1`
  - a/d-3 → `e-4`
  - a/d-5 → `e-1`
  - b/d-2 → `e-3`
  - b/d-4 → `e-6`
  - b/d-5 → `e-3`

## 톤 가이드 반영
- 서아(a): victim_cosplay
  - 희생 나열, 억울함 선점, "왜 저만" 프레임, 감정 직전의 흔들림
- 도현(b): cold_logic
  - 기준/시점/금액 중심, 짧은 축소 부정, 절차 언어, 감정은 끝문장에만 제한적으로 노출

## 간단 검수 체크
- family tells: 6개
- family beats: 36개
- spouse supplement beats: 16개
- spouse supplement events: 8개
