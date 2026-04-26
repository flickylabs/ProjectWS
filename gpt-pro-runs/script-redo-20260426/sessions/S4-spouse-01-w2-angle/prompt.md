# S4 — spouse-01 combinationLab.nodes에 w-2-angle (은행 직원) 추가

## 작업 목표
**spouse-01 case data의 `combinationLab.nodes`에 `w-2-angle` (은행 직원 증언 축) 추가**.

Codex Thread-QW-Cross 검증: 현재 `w-1-angle` (오피스텔 경비) + `w-3-angle` (박미라) 있음. **`w-2-angle` (은행 직원) 누락**.

## 입력 source
- `01-case-spouse-01.json` — case data (모든 정보)
- `04-story-v2-3cases.md` — spouse 사건 핵심 (참고용)

## w-2 (은행 직원) 정보 (case data 확인)
- name: "은행 직원"
- relationTo: "neutral"
- knowledgeScope: "위임장으로 적금 해지한 건이 있었다. 절차상 이상한 점이 있었지만 처리됐다."
- 관련 disputes: **d-2 + h-d4**
  - d-2: 이준호 비밀 송금 (외도성 vs 가족성) — 적금 해지가 부부 자금 흐름 일부
  - h-d4: 박지연 위임장 조작 5,000만 원 순서 — w-2가 핵심 증인

## 현재 구조 (참조)

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

### 1. `w-2-angle` node 추가 (`w-3-angle` 이전 위치 — sequence 순서 유지)

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

### 2. (선택) `combinationLab.recipes` / `outputs` 보강
- 기존 dossierCard 중 w-2 증언과 결합 가능한 것:
  - dc-3 (3,000만 원의 권한): h-d3 → w-2 결합 가능?
  - dc-5 (5,000만 원의 순서): h-d4 → w-2 결합 가능
- 필요시 새 recipe 신설

## 출력 포맷

`output/spouse-01-w2-angle-patch.json`:

```json
{
  "caseId": "spouse-01",
  "session": "S4-w2-angle",
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
    "recipes": [],
    "outputs": []
  },
  "rationale": "..."
}
```

## 검증 체크리스트
- [ ] `w-2-angle` id 정확
- [ ] `sourceRef`: "w-2" (case data witnesses 배열의 id 일치)
- [ ] `linkedDisputeIds`: ["d-2", "h-d4"]
- [ ] `visibility`: "base"
- [ ] `label`: 한국어 자연체
- [ ] 다른 nodes 변경 X (w-1-angle / w-3-angle 건드리지 않음)
