/**
 * 82개 사건 배치 요청서 자동 생성
 * ─────────────────────────────────
 * 각 사건 폴더에 맞춤형 요청서(00-요청서.md)를 생성한다.
 * 템플릿에 사건 정보를 삽입.
 */

const fs = require('fs')
const path = require('path')

const batchDir = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-batch')
const templatePath = path.join(batchDir, '00-배치요청서-템플릿.md')
const template = fs.readFileSync(templatePath, 'utf-8')

// 완료된 사건 스킵
const DONE = new Set(['spouse-01', 'family-01'])

const caseDirs = fs.readdirSync(batchDir)
  .filter(d => !d.startsWith('00-') && fs.statSync(path.join(batchDir, d)).isDirectory())
  .filter(d => !DONE.has(d))
  .sort()

let generated = 0

for (const caseId of caseDirs) {
  const caseDir = path.join(batchDir, caseId)
  const caseFile = path.join(caseDir, '사건원본.json')
  if (!fs.existsSync(caseFile)) continue

  const data = JSON.parse(fs.readFileSync(caseFile, 'utf-8'))

  // 사건 정보 추출
  const partyA = data.duo?.partyA || {}
  const partyB = data.duo?.partyB || {}
  const disputes = data.disputes || []
  const evidence = data.evidence || []
  const lieA = data.lieConfigA || []
  const lieB = data.lieConfigB || []

  // 사건 요약 생성
  const caseSummary = buildCaseSummary(caseId, partyA, partyB, disputes, evidence, lieA, lieB)

  // 요청서 생성 (템플릿 기반)
  const requestDoc = template
    .replace(/\{\{CASE_ID\}\}/g, caseId)
    .replace(/\{\{CASE\}\}/g, caseId.replace('-', ''))
    .replace('{{CASE_LIST}}', caseSummary)

  fs.writeFileSync(path.join(caseDir, '00-요청서.md'), requestDoc)
  generated++
}

console.log(`${generated}개 사건 요청서 생성 완료`)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function buildCaseSummary(caseId, partyA, partyB, disputes, evidence, lieA, lieB) {
  let s = ''
  s += `### ${caseId}\n\n`
  s += `**당사자**:\n`
  s += `- a: **${partyA.name}** (${partyA.age}세, ${partyA.occupation}, archetype: ${partyA.archetype})\n`
  s += `- b: **${partyB.name}** (${partyB.age}세, ${partyB.occupation}, archetype: ${partyB.archetype})\n\n`

  s += `**쟁점 ${disputes.length}개**:\n`
  for (const d of disputes) {
    s += `- ${d.id}: ${d.name} (truth=${d.truth}, weight=${d.weight})\n`
  }
  s += '\n'

  s += `**증거 ${evidence.length}개**:\n`
  for (const e of evidence) {
    const trap = e.isTrap ? ' **함정**' : ''
    s += `- ${e.id}: ${e.name} [${e.reliability}]${trap} → ${e.proves.join(',')}\n`
  }
  s += '\n'

  s += `**lieConfig**:\n`
  s += `- a (${lieA.length}): `
  s += lieA.map(c => `${c.disputeId}(${c.lieType} ${c.lieIntensity} ${c.lieMotive})`).join(', ')
  s += '\n'
  s += `- b (${lieB.length}): `
  s += lieB.map(c => `${c.disputeId}(${c.lieType} ${c.lieIntensity} ${c.lieMotive})`).join(', ')
  s += '\n\n'

  // speechStyle
  s += `**화법 스타일** (Tell 설계 참고):\n`
  if (partyA.speechStyle) s += `- ${partyA.name}: ${partyA.speechStyle}\n`
  if (partyB.speechStyle) s += `- ${partyB.name}: ${partyB.speechStyle}\n`
  s += '\n'

  // Tell 가이드: archetype 기반 제안
  s += `**Tell 제안** (archetype 기반):\n`
  s += `- ${partyA.name}(${partyA.archetype}): ${suggestTells(partyA.archetype)}\n`
  s += `- ${partyB.name}(${partyB.archetype}): ${suggestTells(partyB.archetype)}\n\n`

  // verbalTells (사건 원본에 정의된 원초 말버릇)
  if (partyA.verbalTells || partyB.verbalTells) {
    s += `**원본 verbalTells**:\n`
    if (partyA.verbalTells) {
      s += `- ${partyA.name}:\n`
      for (const vt of partyA.verbalTells) {
        s += `  - ${vt.id || vt.type || '?'}: "${(vt.pattern || vt.description || '').slice(0, 100)}"\n`
      }
    }
    if (partyB.verbalTells) {
      s += `- ${partyB.name}:\n`
      for (const vt of partyB.verbalTells) {
        s += `  - ${vt.id || vt.type || '?'}: "${(vt.pattern || vt.description || '').slice(0, 100)}"\n`
      }
    }
    s += '\n'
  }

  // Dossier 제안
  s += `**DossierCard 권장 묶음**:\n`
  if (evidence.length >= 6) {
    s += `- 도시에 1: ${evidence[0].id} + ${evidence[1].id}\n`
    s += `- 도시에 2: ${evidence[2].id} + ${evidence[3].id}\n`
    s += `- 도시에 3: ${evidence[4].id} + ${evidence[5].id}\n`
  }
  s += `(더 나은 묶음이 있으면 자유롭게 조정)\n`

  return s
}

function suggestTells(archetype) {
  const map = {
    avoidant: '숫자 정밀화(number_first), 되묻기(question_end), 동선 나열(enumeration)',
    confrontational: '증거 흔들기(echo_repeat), 동기 단정(self_reference), 선택적 인용(echo_repeat)',
    victim_cosplay: '희생 나열(enumeration), 목 잠김(self_reference), 되물음(question_end)',
    cold_logic: '영수증 나열(number_first), 짧은 부정(echo_repeat), 건조한 비아냥(self_reference)',
    hyper_responsible: '의무 강조(enumeration), 규칙 인용(conditional), 자기 기준 제시(number_first)',
    martyr: '희생 호소(self_reference), 상처 언급(echo_repeat), 감정 호소(self_reference)',
    people_pleaser: '양보 표현(conditional), 눈치 보기(self_reference), 합리화(enumeration)',
    passive_aggressive: '우회 공격(question_end), 비꼬기(self_reference), 침묵 후 한마디(echo_repeat)',
    anxious_controller: '통제 시도(conditional), 확인 강박(question_end), 목록화(enumeration)',
    defensive_rationalizer: '논리 방어(conditional), 선례 인용(number_first), 반박(question_end)',
    guilt_avoider: '책임 전가(question_end), 맥락 강조(conditional), 최소화(echo_repeat)',
    emotional_suppressor: '감정 억제(self_reference), 짧은 응답(echo_repeat), 돌발 폭발(enumeration)',
    strategic_victim: '피해 나열(enumeration), 감정 연출(self_reference), 동정 호소(echo_repeat)',
    conflict_avoider: '회피(conditional), 모호한 답(echo_repeat), 주제 전환(question_end)',
    boundary_crosser: '선 넘기(question_end), 합리화(conditional), 역공격(echo_repeat)',
    enabler: '변명 대리(conditional), 감싸기(self_reference), 피해 축소(echo_repeat)',
  }
  return map[archetype] || '자유 설계 (archetype 참고)'
}
