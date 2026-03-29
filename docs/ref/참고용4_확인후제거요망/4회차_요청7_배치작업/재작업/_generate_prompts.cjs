const fs = require('fs')
const path = require('path')

const REWORK = path.join(__dirname)
const TEMPLATE = fs.readFileSync(path.join(REWORK, '_prompt_template_heavy.md'), 'utf-8')

const sessions = [
  { id: 1, label: 'workplace_01to06', type: 'workplace', desc: '직장(workplace) 01~06' },
  { id: 2, label: 'workplace_07to12', type: 'workplace', desc: '직장(workplace) 07~12' },
  { id: 3, label: 'neighbor_01to06', type: 'neighbor', desc: '이웃(neighbor) 01~06' },
  { id: 4, label: 'neighbor_07to12', type: 'neighbor', desc: '이웃(neighbor) 07~12' },
  { id: 5, label: 'partnership_01to06', type: 'partnership', desc: '동업(partnership) 01~06' },
  { id: 6, label: 'partnership_07to12', type: 'partnership', desc: '동업(partnership) 07~12' },
  { id: 7, label: 'tenant_01to06', type: 'tenant', desc: '세입자(tenant) 01~06' },
  { id: 8, label: 'tenant_07to12', type: 'tenant', desc: '세입자(tenant) 07~12' },
]

for (const s of sessions) {
  let content = TEMPLATE
    .replace(/\{\{SESSION_LABEL\}\}/g, s.desc)
    .replace(/\{\{FILE_LABEL\}\}/g, s.label)
    .replace(/\{\{TYPE\}\}/g, s.type)

  const dir = path.join(REWORK, `${s.id}회차_${s.label}`)
  fs.writeFileSync(path.join(dir, '재작업_프롬프트.md'), content, 'utf-8')
  console.log(`✓ ${s.id}회차 프롬프트 생성`)
}

// ── 9회차는 수동 관리 (스크립트에서 생성하지 않음) ──
/*
const lightPrompt = `# 솔로몬 사건 데이터 경량 재작업 — S1~S3 truthCategory + S1 truthPolicy 누락

> 이 프롬프트는 self-contained입니다. 이전 세션을 참고하지 마세요.

---

## 작업 A: truthCategory 재분류 (S1~S3, 36건)

### 배경
기존 결과에서 truthCategory가 "fact"와 "motive" 두 종류만 사용되었고,
특히 일부 세션에서는 12건 모두 동일한 패턴으로 출력되었습니다.

### 스펙
각 사건의 5개 truth(t-1~t-5)를 아래 5종 카테고리로 재분류해주세요:

- \`core_fact\` — 객관적으로 검증 가능한 사실 (계약서, 금액, 날짜, 장소)
- \`subjective_claim\` — 당사자의 주관적 주장/해석
- \`emotional_context\` — 감정적 배경/심리 상태
- \`hidden_motive\` — 숨겨진 동기 (체면, 보복, 경제적 이득)
- \`circumstantial\` — 정황/간접 증거

### 출력 형식
\`\`\`json
{
  "truthCategory": {
    "spouse-01": { "t-1": "core_fact", "t-2": "emotional_context", "t-3": "hidden_motive", "t-4": "subjective_claim", "t-5": "circumstantial" },
    "spouse-02": { ... },
    ...
  }
}
\`\`\`

### 검증 기준
- 36건(180개 truth)에서 한 카테고리가 40% 이상 차지하면 FAIL
- 최소 4종 이상 사용

### 첨부 파일
- \`현재결과_spouse_truthCategory.json\` — 현재 spouse 12건의 truthCategory
- \`현재결과_family_truthCategory.json\` — 현재 family 12건의 truthCategory
- \`현재결과_friend_truthCategory.json\` — 현재 friend 12건의 truthCategory

각 사건의 truth 내용은 첨부된 현재결과에서 caseId로 확인 가능합니다.
원본 사건 JSON이 필요하면 요청해주세요.

---

## 작업 B: S1 truthPolicy 누락 쟁점 보충 (5건)

### 배경
spouse 배치에서 5건의 truthPolicy에 쟁점이 하나씩 누락되어 있습니다:

| 사건 | 누락 쟁점 |
|------|-----------|
| spouse-05 | d-3 |
| spouse-07 | d-5 |
| spouse-08 | d-1 |
| spouse-10 | d-4 |
| spouse-11 | d-5 |

### 스펙
누락된 쟁점에 대해 기존과 동일한 구조로 truthPolicy를 생성해주세요:
- party a 또는 b (해당 쟁점의 주체)
- S0~S5 각 상태별 allowedTruthIds, forbiddenTruthIds

### 출력 형식
기존 \`현재결과_spouse_truthPolicy_누락.json\`과 동일한 구조에 누락 쟁점만 추가.

### 첨부 파일
- \`spouse-05.json\`, \`spouse-07.json\`, \`spouse-08.json\`, \`spouse-10.json\`, \`spouse-11.json\` — 원본 사건
- \`현재결과_spouse_truthPolicy_누락.json\` — 현재 5건의 truthPolicy (누락 쟁점 확인용)

---

## 최종 체크리스트

- [ ] truthCategory: 5종 카테고리 중 최소 4종 사용
- [ ] truthCategory: 한 카테고리가 40% 이상 차지하지 않음
- [ ] truthPolicy: 누락 5건 모두 S0~S5 complete
- [ ] truthPolicy: S0의 allowed는 빈 배열, S5의 forbidden은 빈 배열
`

const dir9 = path.join(REWORK, '9회차_S1toS3_truthCategory_및_S1누락')
fs.writeFileSync(path.join(dir9, '재작업_프롬프트.md'), lightPrompt, 'utf-8')
console.log('✓ 9회차 프롬프트 생성')
*/

console.log('\n1~8회차 프롬프트 생성 완료! (9회차는 수동 관리)')
