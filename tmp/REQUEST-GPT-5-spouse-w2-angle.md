# GPT Pro 의뢰 — spouse-01 w-2-angle 추가 (combinationLab.nodes)

## 작업 목표
**spouse-01 case data의 `combinationLab.nodes`에 `w-2-angle` (은행 직원 증언 축) 추가**.

Codex Thread-QW-Cross 검증 결과: 현재 `w-1-angle` (오피스텔 경비) + `w-3-angle` (박미라) 있음. `w-2-angle` (은행 직원) 누락.

## 사건 설정 (절대 충돌 금지)

### spouse-01 — "새벽 통화기록"
- A 박지연 (학원 데스크) — victim_cosplay
- B 이준호 (가전매장) — avoidant
- 5,000만 원 증발 (3,000 적금 해지 + 2,000 사기 손실)

### w-2 (은행 직원) 정보
- name: "은행 직원"
- relationTo: "neutral" (양측 어디에도 속하지 않음)
- knowledgeScope: "위임장으로 적금 해지한 건이 있었다. 절차상 이상한 점이 있었지만 처리됐다."
- witnessedDirectly: true
- 관련 disputes: **d-2 (이준호 비밀 송금 — 외도성 vs 가족성 쟁점)** + **h-d4 (위임장 조작 5,000만 원 순서)**
  - d-2 측면: 이준호가 형에게 현금 송금했다는 부분과 별개로, 적금 해지 자체는 박지연이 위임장으로 한 것 (부부 자금 흐름의 일부)
  - h-d4 측면: 박지연이 남편 위임장 조작으로 공동 적금 3,000만 원 해지 → 이게 위법 행위
  - 은행 직원 = 위임장 절차의 핵심 증인

## 현재 데이터 위치
- 파일: `src/data/cases/generated/spouse-01.json`
- 위치: `combinationLab.nodes` 배열

### 현재 witness_angle 구조 (참조)
```json
{
  "id": "w-1-angle",
  "type": "witness_angle",
  "label": "w-1 오피스텔 경비 증언 축",
  "sourceRef": "w-1",
  "linkedDisputeIds": ["d-1", "d-2"],
  "visibility": "base"
},
{
  "id": "w-3-angle",
  "type": "witness_angle",
  "label": "w-3 박미라 증언 축",
  "sourceRef": "w-3",
  "linkedDisputeIds": ["h-d3"],
  "visibility": "base"
}
```

## 작업 내용

### 1. `w-2-angle` node 추가
`w-3-angle` 이전 위치 (sequence 순서 유지)에 다음 entry 삽입:

```json
{
  "id": "w-2-angle",
  "type": "witness_angle",
  "label": "w-2 은행 직원 증언 축",
  "sourceRef": "w-2",
  "linkedDisputeIds": ["d-2", "h-d4"],
  "visibility": "base"
}
```

### 2. dispute 매핑 검증

**d-2** (이준호 측 비밀 송금 — 외도 vs 가족 회피):
- 은행 직원 증언으로 적금 해지 절차 확인 → 이준호 비밀 송금 자금원 일부 명확화
- linkedDisputeIds 포함 정당

**h-d4** (위임장 조작 + 5,000만 원 순서):
- 핵심 증인. 박지연 위임장 조작 직접 처리한 사람.
- linkedDisputeIds 포함 필수

### 3. 추가 검토 사항
- `combinationLab.recipes` 또는 `combinationLab.outputs`에 `w-2-angle` 활용 조합 추가 필요 여부 검증
- 기존 dossier 카드 (dc-1~dc-5) 중 w-2 증언과 연결되어야 하는 것:
  - dc-3 (3,000만 원의 권한): h-d4 관련 → w-2 결합 가능
  - dc-5 (5,000만 원의 순서): h-d4 관련 → w-2 결합 가능
- 필요시 `outputs` / `recipes` 보강

## 출력 포맷

### 산출물: `spouse-01-w2-angle-patch.json`

```json
{
  "caseId": "spouse-01",
  "operation": "add_witness_angle",
  "target": "src/data/cases/generated/spouse-01.json",
  "patch": {
    "path": "combinationLab.nodes",
    "operation": "insert",
    "insertBefore": "w-3-angle",
    "newNode": {
      "id": "w-2-angle",
      "type": "witness_angle",
      "label": "w-2 은행 직원 증언 축",
      "sourceRef": "w-2",
      "linkedDisputeIds": ["d-2", "h-d4"],
      "visibility": "base"
    }
  },
  "additionalChanges": {
    "recipes": [/* 필요시 w-2-angle + dossier 조합 신설 */],
    "outputs": [/* 필요시 */]
  },
  "rationale": "..."
}
```

## 검증 체크리스트

- [ ] `w-2-angle` id 일관 ("w-2-angle" 형식)
- [ ] `sourceRef`: "w-2" (case data witnesses 배열의 id와 일치)
- [ ] `linkedDisputeIds`: 정확히 ["d-2", "h-d4"]
- [ ] `visibility`: "base"
- [ ] `label`: 한국어 자연체 ("w-2 은행 직원 증언 축")
- [ ] 사건 설정 (3,000만 적금 해지 / 위임장 조작) 정확
- [ ] 다른 nodes 변경 X (w-1-angle / w-3-angle 건드리지 않음)

## 참조
- `src/data/cases/generated/spouse-01.json` — 전체 case data
- 위 file의 `duo.socialGraph[1]` — w-2 (은행 직원) 정의
- 위 file의 `disputes` — d-2, h-d4 정의
- 위 file의 `combinationLab.nodes` — 기존 nodes 일람
