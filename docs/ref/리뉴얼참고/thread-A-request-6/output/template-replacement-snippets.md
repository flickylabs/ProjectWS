# V2 추가 배치 템플릿 교체용 스니펫 — Request 5

## 1) `### Interjection beats (필수)` 교체 텍스트

아래 블록으로 기존 interjection 섹션을 **통째로 교체**하세요.

```md
### Interjection beats (필수)
사건당 **12개**를 기본으로 생성합니다. 최소 10개, 최대 14개.  
이 beat들은 일반 question lane과 경쟁시키지 않는 **event_lane 전용**이며, `actionFamily`는 반드시 `"interjection"`입니다.

**필수 분포**
- `emotional_only`: 4개
  - allow 2개 / block 2개
  - 순수 감정 표출, 억울함, 긴장, 보호 본능 중심
- `detail_rebuttal`: 4개
  - allow 2개 / block 2개
  - 금액 / 시간 / 장소 / 관계 / 규칙 등 구체 디테일 반박 중심
- `misbelief_escalation`: 2~4개
  - red_herring 또는 shared_misconception 쟁점이 있을 때만
  - allow + block 조합
  - `beliefMode` 필수 (`knows` / `suspects` / `misbelief` / `weaponizes`)
- `trap_signal`: 0~2개
  - red_herring 쟁점이 있을 때만
  - allow만 또는 allow+block
  - 잘린 캡처 / 모호한 위치 / 재촬영 자료 등 “가짜 단서” 경고용

**필수 필드**
- `actionFamily: "interjection"`
- `tags: ["interjection", "allow"|"block", "event_lane", INFOLEVEL_TAG]`
- red_herring / shared_misconception 관련 beat에는 `beliefMode` 추가
- `conditions.interjectionStates`: `["allow_last_turn"]` 또는 `["block_last_turn"]`
- red_herring / shared_misconception 관련 beat에는 필요 시 아래도 함께 사용
  - `conditions.misconceptionStates`
  - `conditions.trapStates`

**ID 패턴**
```text
{{CASE}}:beat_v2:{{PARTY}}:{{DISPUTE}}:surface:mid:interjection:{{CHOICE}}:{{INDEX}}
```
- 예: `family02:beat_v2:b:d-3:surface:mid:interjection:allow:01`

**antiRepeatGroup**
```text
interjection.{{CHOICE}}.{{PARTY}}
```
- 예: `interjection.allow.b`

**coverageKey 패턴**
```text
{{PARTY}}:{{DISPUTE}}:surface:mid:interjection:{{INFOLEVEL}}:{{CHOICE}}
```
- 예: `b:d-3:surface:mid:interjection:misbelief_escalation:allow`
- 예: `a:d-1:surface:mid:interjection:emotional_only:block`

**tags 규칙**
- 기본: `["interjection", "allow"|"block", "event_lane", INFOLEVEL_TAG]`
- `INFOLEVEL_TAG`: `emotional_only` / `detail_rebuttal` / `misbelief_escalation` / `trap_signal`
- red_herring / shared_misconception 관련이면 `"red_herring"` 추가
```

## 2) 체크리스트 교체 줄

기존 줄:
```md
- [ ] beats 총 40~60개 + fatigue 3종/dispute + interjection allow2+block2
```

교체 줄:
```md
- [ ] beats 총 50~74개 + fatigue 3종/dispute + interjection 12개(infoLevel 4종)
```

## 3) Free Question 키워드용 템플릿 추가 규칙 (1~2줄)

아래 두 줄을 `### Dispute 확장` 또는 `### Free question hooks` 근처에 추가하세요.

```md
- 각 dispute에 `disputeAliases` 4~8개를 반드시 작성합니다. 사건별 고유 키워드(이름/금액/장소/증거 약칭/구어 표현)는 hook가 아니라 dispute 단위에서만 관리합니다.
- `intentTag`는 기존 범용 INTENT_LEXICON을 재사용합니다. per-hook `triggerKeywords`는 V2 추가 배치 기본 템플릿에서 작성하지 않습니다.
```
