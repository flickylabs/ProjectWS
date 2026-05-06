const fs = require('fs')
const path = require('path')

const REWORK = path.join(__dirname)
const TEMPLATE = fs.readFileSync(path.join(REWORK, '_prompt_template_heavy.md'), 'utf-8')

// ── S1 spouse용: forbidden/uncertain 제외 4종 프롬프트 ──
function makeSpousePrompt(template, desc, fileLabel, type) {
  let content = template
    .replace(/\{\{SESSION_LABEL\}\}/g, desc)
    .replace(/\{\{FILE_LABEL\}\}/g, fileLabel)
    .replace(/\{\{TYPE\}\}/g, type)

  // 헤더에 특이사항 추가
  content = content.replace(
    '> 첨부된 원본 JSON 6건과 현재결과를 기반으로 작업해주세요.',
    '> 첨부된 원본 JSON 6건과 현재결과를 기반으로 작업해주세요.\n> **S1 특이사항**: `witnessBudgets`의 forbidden/uncertain은 원본이 양호(전건 고유)하므로 **교체하지 마세요**.'
  )

  // 출력 형식에서 witnessBudgets 제외
  content = content.replace(
    '- `witnessBudgets` — forbidden, uncertain만 교체 (name, canState 유지)',
    '- ~~`witnessBudgets`~~ — **교체 불필요** (원본 유지)'
  )

  // 교체 대상 5종 → 4종
  content = content.replace(
    '위 5개 섹션만 교체',
    '위 4개 섹션만 교체 (witnessBudgets 제외)'
  )

  // witnessBudgets 보존 목록에 추가
  content = content.replace(
    '나머지 5종(truthPolicies, contentTags, optimalPath, narrativeExpansion, actionScores)은 **그대로 유지**.',
    '나머지 6종(truthPolicies, contentTags, optimalPath, narrativeExpansion, actionScores, **witnessBudgets 전체**)은 **그대로 유지**.'
  )

  // 체크리스트에서 forbidden 항목 제거
  content = content.replace(
    '- [ ] forbidden/uncertain에 사건 고유 인물명/문서명 포함\n',
    ''
  )

  return content
}

// ── S2/S3용: 기존 5종 프롬프트 ──
function makeStandardPrompt(template, desc, fileLabel, type) {
  return template
    .replace(/\{\{SESSION_LABEL\}\}/g, desc)
    .replace(/\{\{FILE_LABEL\}\}/g, fileLabel)
    .replace(/\{\{TYPE\}\}/g, type)
}

const sessions = [
  { id: 10, label: 'spouse_01to06', type: 'spouse', desc: '부부(spouse) 01~06', isSpouse: true },
  { id: 11, label: 'spouse_07to12', type: 'spouse', desc: '부부(spouse) 07~12', isSpouse: true },
  { id: 12, label: 'family_01to06', type: 'family', desc: '가족(family) 01~06', isSpouse: false },
  { id: 13, label: 'family_07to12', type: 'family', desc: '가족(family) 07~12', isSpouse: false },
  { id: 14, label: 'friend_01to06', type: 'friend', desc: '친구(friend) 01~06', isSpouse: false },
  { id: 15, label: 'friend_07to12', type: 'friend', desc: '친구(friend) 07~12', isSpouse: false },
]

for (const s of sessions) {
  const content = s.isSpouse
    ? makeSpousePrompt(TEMPLATE, s.desc, s.label, s.type)
    : makeStandardPrompt(TEMPLATE, s.desc, s.label, s.type)

  const dir = path.join(REWORK, `${s.id}회차_${s.label}`)
  fs.writeFileSync(path.join(dir, '재작업_프롬프트.md'), content, 'utf-8')
  console.log(`✓ ${s.id}회차 프롬프트 (${s.isSpouse ? '4종-spouse' : '5종-standard'})`)
}

// ── 16회차: truthPolicy 누락 경량 프롬프트 ──
const tp16 = `# 솔로몬 S1 truthPolicy 누락 쟁점 보충

> self-contained 프롬프트입니다. 이전 세션을 참고하지 마세요.
> 함께 첨부된 \`레퍼런스_spouse-01.json\`은 품질 기준입니다.

## 배경

spouse 배치에서 5건의 truthPolicy에 쟁점이 하나씩 누락되어 있습니다:

| 사건 | 누락 쟁점 |
|------|-----------|
| spouse-05 | d-3 |
| spouse-07 | d-5 |
| spouse-08 | d-1 |
| spouse-10 | d-4 |
| spouse-11 | d-5 |

## 스펙

누락된 쟁점에 대해 기존과 동일한 구조로 truthPolicy를 생성해주세요:
- party a 또는 b (해당 쟁점의 주체에 따라)
- S0~S5 각 상태별 allowedTruthIds, forbiddenTruthIds
- S0: allowed 빈 배열, forbidden 전체
- S5: allowed 전체, forbidden 빈 배열
- S2→S3에서 최소 1개 truth 추가 해금 (동일하면 안 됨)

## 출력 파일명: \`재작업결과_spouse_truthPolicy_누락.json\`

## 첨부 파일
- \`spouse-05.json\` ~ \`spouse-11.json\` (5건) — 원본 사건 데이터
- \`현재결과_spouse_truthPolicy_누락.json\` — 현재 5건의 truthPolicy
- \`레퍼런스_spouse-01.json\` — 품질 기준

## 체크리스트
- [ ] 5건 모두 S0~S5 complete
- [ ] S0 allowed = [], S5 forbidden = []
- [ ] S2 ≠ S3 (최소 1개 truth 차이)
- [ ] 레퍼런스와 동일한 구조 (states + states_full)
`

const dir16 = path.join(REWORK, '16회차_spouse_truthPolicy_누락')
fs.writeFileSync(path.join(dir16, '재작업_프롬프트.md'), tp16, 'utf-8')
console.log('✓ 16회차 프롬프트 (경량-truthPolicy)')

console.log('\n10~16회차 프롬프트 생성 완료!')
