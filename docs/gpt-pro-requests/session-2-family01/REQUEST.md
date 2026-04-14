# Session 2: family-01 DossierCards + Structure V2 + Aftermath

## 배경

family-01의 기준 데이터는 **윤태성(A, 55세 장남)/윤정후(B, 48세 차남)** — 말년의 어머니 유서 분쟁입니다.

기존 보조 데이터(서아/도현 간병비 분쟁)는 전량 아카이빙 완료했고, 등록 방식을 v3 fallback으로 전환했습니다. 현재 DossierCards가 빈 상태이므로 이 세션에서 윤태성/윤정후 기준으로 생성합니다.

**산출물 적용 방법**: Claude가 `family-01.ts`에서 v3GameLoopData를 import하도록 교체합니다.

## 산출물 3개

### 1. `family-01-dossier-cards.json` — DossierCards

플레이어가 증거를 묶어 당사자에게 던지는 조사 질문 카드입니다.

**ID 규칙**: `dc-N` 형식 (예: dc-1, dc-2, dc-3...). `dossier-N` 형식 사용 금지.
**질문 ID 규칙**: `dc-N.{party}.qN` 형식 (예: dc-1.b.q1)

5장 생성해주세요. 첨부된 `spouse-01-dossier-example.json`의 구조를 정확히 따르세요.

```json
{
  "caseId": "family-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "카드 이름 (10자 이내)",
      "description": "이 카드의 역할 설명 (1문장)",
      "evidenceIds": ["e-1", "e-2"],
      "relatedDisputes": ["d-1"],
      "subjectParty": "a|b|both",
      "leadId": "L-1",
      "successConditionSummary": ["조건 설명"],
      "successEffects": ["효과 설명"],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "재판관이 당사자에게 던지는 질문 (자연어, 합니다체)",
              "lockedHint": "잠겨 있을 때 힌트",
              "attackVector": "authenticity|context|timeline|contradiction",
              "requiredLieState": "S0|S1|S2|S3",
              "onSuccess": {
                "blockVector": "해당 벡터",
                "revealAtom": "",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### 2. `family-01-structure-v2.json` — Structure V2 확장

현재 최소 골격만 있는 파일을 full로 확장합니다.
첨부된 `family-01-structure-v2-CURRENT.json`에 depthLayers, linkEdges, timing 등을 추가해주세요.
스키마는 첨부 `spouse-01-structure-v2-LEGACY.json`의 형식을 참고하세요.

### 3. `family-01-aftermath-extra.json` — Aftermath 2종 추가

현재 `shared_fault`, `a_primary_fault`, `b_primary_fault` 3종만 있습니다.
아래 2종을 추가해주세요:

```json
{
  "protective_resolution": {
    "variants": [
      { "text": "승패보다 회복을 먼저 말하는 결말 (200~300자)" }
    ]
  },
  "procedural_caution": {
    "variants": [
      { "text": "법적 위험을 경고하면서도 관계 회복 가능성을 남기는 결말 (200~300자)" }
    ]
  }
}
```

## 사건 구조

### 등장인물
- **partyA 윤태성** (55세, 장남, archetype: confrontational) — callTerms: toPartner="정후야", toJudge="제 동생"
- **partyB 윤정후** (48세, 차남, archetype: affect_flattening) — callTerms: toPartner="형", toJudge="제 형"

### 쟁점 5개
| ID | 이름 | 핵심 내용 |
|----|------|----------|
| d-1 | 말년의 어머니는 유서를 제대로 판단할 수 있었는가 | 어머니 판단능력과 유서 유효성 |
| d-2 | 60:40 유서 조작 — 늘린 건가 줄인 건가 | 원본 90:10에서 윤정후가 자기 몫을 60으로 줄임 |
| d-3 | 윤정후가 20년간 보낸 생활비와 윤태성 사업 실패 때 들어간 돈의 성격 | 어머니 돈인 줄 알았던 것이 실은 윤정후 돈 |
| d-4 | 윤태성의 출생 비밀을 윤정후는 왜 숨겼는가 | 아버지의 친자가 아닌 비밀을 동생만 알고 있었음 |
| d-5 | 누가 정말 어머니를 이용했는가 | 양쪽 모두의 책임 재조명 |

### 해금 체인
d-1(초기) → d-2(B d-1 S2) → d-3(d-2 S3) → d-4(d-3 S2) → d-5(d-3 S3 AND d-4 S2)

### 증거 7개
| ID | 이름 | 타입 | 핵심 |
|----|------|------|------|
| e-1 | 60:40 유서 사본 | contract | 공증 도장, B 60% A 40% |
| e-2 | 요양원 방문기록 | log | B 말년 방문 급증 기록 |
| e-3 | 전 요양보호사 음성증언 | testimony | B가 어머니에게 종이 읽어드리는 목격 |
| e-4 | 공증사무실 스캔 보관본 | log | 이중 스캔 — 원본과 조작본 동시 존재 |
| e-5 | 원본 유서 (서랍) | contract | 90:10 비율, 어머니 원래 뜻 |
| e-6 | 20년 송금 내역 묶음 | bank | B→어머니 통장 + A 부도 때 큰돈 |
| e-7 | 어머니 일기장 사진 | device | 출생 비밀 + 정후에게 미안한 마음 |

### 사건의 핵심 반전 구조
1. **표면**: B가 치매 어머니를 이용해 유서를 자기 쪽으로 조작한 것처럼 보임
2. **1차 반전**: 원본이 90:10이었고, B는 자기 몫을 **줄인** 것 (60으로)
3. **2차 반전**: 어머니 돈으로 알았던 생활비/부도 지원금이 실은 B의 돈
4. **3차 반전**: B가 이 모든 것을 한 이유는 A의 출생 비밀(아버지 친자 아님)을 지키기 위함
5. **최종**: 둘 다 어머니를 있는 그대로 두지 못했다. A는 유산을 당연시, B는 뜻을 고쳐 형을 보호

## 규칙
- dispute/evidence ID는 case JSON과 정확히 일치
- DossierCard ID는 `dc-N` 형식 필수
- 한국어 자연어, 번역체 금지
- 재판관 → 당사자: 합니다체 ("~입니까", "~하셨습니까")
- "사전 상의/협의"는 S0~S2에서 금지 (S3+ 허용)

## 첨부 파일
- `family-01.json` — 현재 런타임 케이스 데이터
- `family-01-structure-v2-CURRENT.json` — 현재 최소 골격 (확장 대상)
- `spouse-01-dossier-example.json` — spouse-01 DossierCards (형식 참고)
- `spouse-01-structure-v2-LEGACY.json` — structure-v2 형식 참고 (내용은 다른 사건)
- `spouse-01-aftermath-example.json` — aftermath 5종 텍스트 예시
