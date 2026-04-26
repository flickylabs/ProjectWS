# GPT Pro 의뢰 패키지 — 사용 가이드 (family-01 ScriptedText 보완)

> **작성**: 2026-04-26 (메인 Claude Opus 4.7)
> **목적**: family-01 ScriptedText (현재 1,253 entries) → 보완 후 ≈ 4,503 entries
> **사용자**: GPT Pro 사용자가 직접 사용

---

## 디렉토리 구조

```
gpt-pro-package/
├── README-사용가이드.md             # 이 파일
├── source/                            # ★ Knowledge 업로드 (모든 세션 공통)
│   ├── 00-common-instructions.md      # 공통 작성 기준 (필수 학습)
│   ├── 01-character-info.md           # 윤태성/윤정후 + 증인 3종
│   ├── 02-tone-guide.md               # 보정 톤 8원칙
│   ├── 03-phase1-2-dialogue.md        # base voice 톤 참고
│   ├── 04-case-family-01.json         # 사건 정의 (evidences/dossier 포함)
│   ├── 05-structure-v2.json           # depthLayers/linkEdges
│   ├── 06-atoms-current.json          # claimPolicies (S0~S5 atom)
│   ├── 07-v3-game-loop-data.json      # DossierCard 5장 정의
│   ├── 08-game-events.json            # 일반 게임 이벤트 (transitionBeats 20건)
│   ├── 09-game-events-v2.json         # V2 의견 충돌 (contradictions 16건)
│   └── 10-scripted-text-current.json  # 기존 1,253 entries (참조용)
└── sessions/                          # ★ 8 세션 (병렬 실행 가능)
    ├── S1-interrogation-variants/
    │   ├── prompt.md                  # GPT에 보낼 메시지
    │   └── (그 세션이 사용할 source 파일 사본 6~7개 — 방식 B용)
    ├── S2-evidence-stage-d1-d2/
    ├── S3-evidence-stage-hd3-hd4/
    ├── S4-dossier-witness/
    ├── S5-h-d3-h-d4-channels/
    ├── S6-judge-channels/
    ├── S7-trust-mediation-system-milestone/
    └── S8-aftermath-correction/
```

**각 세션 폴더에 그 세션이 사용할 source 파일들도 함께 cp** — 한 폴더 통째로 GPT에 첨부 가능.

세션별 사용 파일 매핑:

| 세션 | 사용 파일 (source 11개 중) |
|---|---|
| S1 | 00, 01, 02, 03, 06, 10 |
| S2 | 00, 01, 02, 04, 05, 10 |
| S3 | 00, 01, 02, 04, 05, 10 |
| S4 | 00, 01, 02, 04, 07, 10 |
| S5 | 00, 01, 02, 06, 08, 09, 10 |
| S6 | 00, 01, 02, 04, 05, 07, 10 |
| S7 | 00, 01, 02, 04, 08, 10 |
| S8 | 00, 01, 02, 04, 10 |

(00 / 01 / 02 / 10은 모든 세션 공통. 그 외는 세션별)

---

## GPT Pro 사용 절차

두 가지 사용 방식 중 선택:

### 방식 A — Knowledge 통합 (권장, 효율적)

**1단계: 프로젝트 셋업 (1회만)**
1. GPT Pro에서 **새 프로젝트 생성** (예: "Solomon Court — family-01 ScriptedText 보완")
2. 프로젝트 **Knowledge에 `source/` 안의 11개 파일 모두 업로드**
3. 프로젝트 시스템 프롬프트 (선택): "당신은 한국어 게임 시나리오 작가다. 모든 작업은 Knowledge에 업로드된 11개 source 파일을 참조하여 진행한다. 특히 `00-common-instructions.md`의 톤 8원칙과 9차원 맥락 매핑을 절대 준수한다."

**2단계: 세션 실행 (S1~S8 — 병렬 가능)**
1. 새 대화 시작 (같은 프로젝트 안)
2. 해당 세션의 `prompt.md` 파일을 첨부
3. 메시지: **"`prompt.md` 파일을 읽고 작업을 진행해줘."**
4. GPT가 Knowledge의 source 파일들을 참조하여 산출물 생성

### 방식 B — 세션별 첨부 (Knowledge 사용 안 할 때)

**프로젝트 셋업 불필요**. 세션마다 다음 순서:

1. 새 대화 시작
2. **`sessions/SX/` 폴더 안의 모든 파일을 한 번에 첨부** (prompt.md + 사용할 source 파일 6~7개)
3. 메시지: **"`prompt.md` 파일을 읽고 작업을 진행해줘."**
4. GPT가 함께 첨부된 source 파일들을 참조하여 산출물 생성

→ 두 방식 결과 동일. 방식 A는 한 번 셋업 후 효율적. 방식 B는 매 세션 자기완결.

### 3단계: 산출물 회수 + 적용

1. 각 세션 산출물 → 메인 (Claude Opus)에 전달
2. 메인이 한국어 보정 (잘못 패턴 #6 모범 일관 적용)
3. `src/data/scriptedText/family-01.json` patch 적용
4. `npm run build` + `npx tsc -b --force` 검증
5. dev 서버 시각 검증 (사용자)

---

## 세션 일람 + 분량

| 세션 | 작업 | 추가 entries | 의존성 |
|---|---|---|---|
| **S1** | interrogation v 확장 (5→10) | +720 | 독립 |
| **S2** | evidence_present stage (d-1, d-2) | +500 | 독립 |
| **S3** | evidence_present stage (h-d3, h-d4) | +360 | 독립 |
| **S4** | dossier 옵션 B + witness v 확장 | +279 | 독립 |
| **S5** | h-d3/h-d4 추가 채널 (3개) | +480 | 독립 |
| **S6** | judge 채널 보강 + 신규 (2개) | +399 | 독립 |
| **S7** | trust_action + mediation + system + milestone | +319 | 독립 |
| **S8** | aftermath + 기존 entries 톤 보정 patch | +15 + patch | S1~S7 완료 후 (선택) |

**총 분량**: 약 +3,250 entries (보완 후 ≈ 4,503)

⚠️ **병렬 실행 권장**: S1~S7 모두 독립 작업 — 동시에 7개 세션 띄울 수 있음. S8은 기존 entries 검토 작업이라 독립이지만 S1~S7 산출물 본 후 진행하면 보정 패턴 일관성 유리.

---

## 주의사항 (모든 세션 공통)

- **활성 3건만**: family-01 / family-01 / friend-01 — `_LEGACY_*` 절대 참조 X
- **임의 이름/정보 작성 X**: 형/조카는 호칭만 ("형", "조카"), 박미라는 h-d3/h-d4 친구 (오피스텔 무관)
- **이모지 X**
- **글자수 가이드**: 재판관 30~70자 / NPC 40~80자 / system 20~50자 (±5자 편차 허용 — 의미 정확성 우선)
- **호칭**: 재판관 → 당사자 "OOO 씨" / "부인" 단어 절대 금지 / "아내분"/"남편분" OK
- **번역체 9패턴 금지** (00-common-instructions.md §3 참조)
- **직접 인용 결합 금지** — 간접 인용만 ("아까는 ~쪽으로 말씀하셨는데, 지금은 ~")

---

## 메인 작업 완료 사항 (2026-04-26)

다음 영역은 메인이 직접 자율 보정 완료 — GPT Pro 의뢰 X:

| 채널 | 검토 | patch | 보정율 |
|---|---|---|---|
| judge_contradiction | 18 | 7 | 39% |
| system_message | 12 | 3 | 25% |
| judge_question | 48 | 2 | 4% |
| interrogation S3+ + interjection + emotional_overload | 392 | 1 | 0.3% |
| **합계** | **470** | **13** | **2.8%** |

→ 이 13 patch는 이미 `src/data/scriptedText/family-01.json`에 적용됨 (`10-scripted-text-current.json`에 반영). GPT Pro는 이 보정본을 base로 신규 작성.

---

## 산출물 형식 가이드

각 세션은 다음 형식 JSON 출력:

```json
{
  "session": "S1",
  "channel": "interrogation",
  "operation": "add_variants",
  "entries": [
    {
      "key": "a|d-1|S0|fact_pursuit",
      "addedVariants": [
        {
          "id": "a-d-1-S0-fact-pursuit-v6",
          "text": "...",
          "behaviorHint": "...",
          "tags": [...],
          "sourceRefs": [...]
        },
        ...
      ]
    },
    ...
  ]
}
```

또는 신규 채널 (judge_evidence_combo / rapport_milestone 등)인 경우:

```json
{
  "session": "S6",
  "channel": "judge_evidence_combo",
  "operation": "create_channel",
  "channelDefinition": {
    "variantsPerKey": 5,
    "structure": "..."
  },
  "entries": [
    {
      "key": "dc-1.b.q1|soft",
      "dossierCardId": "dc-1",
      "questionId": "dc-1.b.q1",
      "tone": "soft",
      "stanceHint": "...",
      "truthLevel": "...",
      "variants": [...]
    },
    ...
  ]
}
```

자세한 출력 스키마는 `00-common-instructions.md` §7 참조.

---

## 상위 명세

전체 보완 명세는 [`../completion-spec-v2.md`](../completion-spec-v2.md) 참조 (v 정책 / 9차원 매핑 / 채널별 키 패턴 / 분량 합계 / 절대 준수 규칙 등).

---

## 후속 단계 (family-01 완료 후)

1. 8 세션 모두 완료 → family-01 ScriptedText 보완 종결
2. **family-01 / friend-01 동일 절차 반복** (각각 별도 GPT Pro 프로젝트 생성)
   - 단 세션 패턴은 family-01과 동일 → prompt.md 템플릿 재사용 가능
3. 3건 모두 완료 → 메모리 업데이트 + 사용자 시각 검증
