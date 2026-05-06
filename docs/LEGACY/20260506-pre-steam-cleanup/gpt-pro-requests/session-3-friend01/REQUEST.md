# Session 3: friend-01 DossierCards + Structure V2 + Aftermath

## 배경

friend-01의 기준 데이터는 **송다은(A, 29세 웨딩플래너)/최수민(B, 29세 프리랜서 디자이너)** — 손절한 절친과 예비신랑 연락 사건입니다.

기존 보조 데이터(도윤/하린 여행 정산 분쟁)는 전량 아카이빙 완료했고, 등록 방식을 v3 fallback으로 전환했습니다. 현재 DossierCards가 빈 상태이므로 이 세션에서 송다은/최수민 기준으로 생성합니다.

**산출물 적용 방법**: Claude가 `friend-01.ts`에서 v3GameLoopData를 import하도록 교체합니다.

## 산출물 3개

### 1. `friend-01-dossier-cards.json` — DossierCards

**ID 규칙**: `dc-N` 형식 필수. 질문 ID는 `dc-N.{party}.qN` 형식.

5장 생성해주세요. 첨부 `spouse-01-dossier-example.json` 구조를 따르세요.

스키마:
```json
{
  "caseId": "friend-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "카드 이름 (10자 이내)",
      "description": "이 카드의 역할 (1문장)",
      "evidenceIds": ["e-N"],
      "relatedDisputes": ["d-N"],
      "subjectParty": "a|b|both",
      "leadId": "L-1",
      "successConditionSummary": ["조건"],
      "successEffects": ["효과"],
      "challenges": [
        {
          "targetParty": "a|b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "재판관 질문 (합니다체)",
              "lockedHint": "잠김 힌트",
              "attackVector": "authenticity|context|timeline|contradiction",
              "requiredLieState": "S0~S3",
              "onSuccess": {
                "blockVector": "벡터",
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

### 2. `friend-01-structure-v2.json` — Structure V2 확장

현재 최소 골격에 depthLayers, linkEdges, timing 추가.

### 3. `friend-01-aftermath-extra.json` — Aftermath 2종 추가

현재 3종(shared_fault, a_primary_fault, b_primary_fault)만 있습니다.
`protective_resolution`과 `procedural_caution` 2종을 추가해주세요.

```json
{
  "protective_resolution": {
    "variants": [{ "text": "승패보다 회복을 먼저 말하는 결말 (200~300자)" }]
  },
  "procedural_caution": {
    "variants": [{ "text": "법적 위험 경고 + 관계 회복 가능성 결말 (200~300자)" }]
  }
}
```

## 사건 구조

### 등장인물
- **partyA 송다은** (29세, 웨딩플래너, archetype: confrontational) — callTerms: toPartner="수민아", toJudge="그 애"
- **partyB 최수민** (29세, 프리랜서 디자이너, archetype: affect_flattening) — callTerms: toPartner="다은아", toJudge="다은이"

### 쟁점 5개
| ID | 이름 | 핵심 |
|----|------|------|
| d-1 | 최수민의 연락은 집착인가, 경고인가 | 9일간 예비신랑 연락의 진짜 의도 |
| d-2 | 예비신랑이 먼저 최수민에게 접근한 사실 | 예비신랑이 먼저 선넘는 메시지, 최수민은 거절 |
| d-3 | 송다은 아버지의 돈 접근 패턴 | 아버지가 예비신랑에게 돈 접근 |
| d-4 | 과거 손절의 진짜 원인: 변심인가 사기인가 | 아버지가 최수민에게 투자 명목 사기 |
| d-5 | 최수민의 명예를 먼저 무너뜨린 건 누구인가 | 확인 없이 단톡방 매도 vs 침묵의 반복 |

### 해금 체인
d-1(초기) → d-2(B d-1 S2) → d-3(d-2 S3) → d-4(d-3 S2) → d-5(d-3 S3 AND d-4 S3)

### 증거 7개
| ID | 이름 | 타입 | 핵심 |
|----|------|------|------|
| e-1 | 최수민→예비신랑 연락 기록 | log | 9일간 전화 6번, 문자 11건 |
| e-2 | 공통 친구 단톡방 캡처 | chat | A가 확인 없이 B를 매도한 기록 |
| e-3 | 과거 손절 직전 카톡 | chat | B의 침묵 동기 배경 |
| e-4 | 예비신랑의 선넘는 메시지와 B의 거절 답장 | chat | 예비신랑이 먼저 접근한 증거 |
| e-5 | 송다은 아버지와 예비신랑의 문자 | chat | 아버지의 돈 접근 기록 |
| e-6 | 과거 송금 영수증 + 문자 | bank | 과거 사기 금액 증거 |
| e-7 | 과거/현재 대조표 | log | 패턴 반복 증명 |

### 사건의 핵심 반전 구조
1. **표면**: B가 예비신랑에게 집착하며 반복 연락한 것처럼 보임
2. **1차 반전**: 예비신랑이 먼저 B에게 선을 넘었고, B는 거절한 쪽
3. **2차 반전**: B의 연락 목적은 A 아버지가 예비신랑에게 돈을 뜯어내려 접근하는 것을 경고하기 위함
4. **3차 반전**: 과거 손절도 B의 변심이 아니라 A 아버지가 B에게 투자 명목으로 사기를 친 것이 원인. B는 A에게 말하면 아버지가 사기꾼이라는 뜻이 되므로 차마 말하지 못하고 악역을 자처
5. **최종**: 두 사람 모두 확인 전에 단정했고, B는 또다시 악역이 되는 구조가 반복됨

## 규칙
- dispute/evidence ID는 case JSON과 정확히 일치
- DossierCard ID는 `dc-N` 형식 필수 (`dossier-N` 금지)
- 한국어 자연어, 번역체 금지
- 재판관 → 당사자: 합니다체
- "사전 상의/협의"는 S0~S2에서 금지

## 첨부 파일
- `friend-01.json` — 현재 런타임 케이스 데이터
- `friend-01-structure-v2-CURRENT.json` — 현재 최소 골격
- `spouse-01-dossier-example.json` — DossierCards 형식 참고
- `spouse-01-structure-v2-LEGACY.json` — structure-v2 형식 참고
- `spouse-01-aftermath-example.json` — aftermath 텍스트 예시
