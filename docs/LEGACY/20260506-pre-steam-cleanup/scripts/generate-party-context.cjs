/**
 * subjectParty: "both"인 증거에 partyContext를 자동 생성.
 *
 * 생성 로직:
 * - 증거가 proves하는 쟁점별로 각 파티의 lieConfig를 확인
 * - A의 lieConfig에 해당 쟁점이 있으면 → A는 "행위 당사자" 또는 "해명 필요"
 * - B의 lieConfig에 해당 쟁점이 있으면 → B도 동일
 * - 양쪽 다 있으면 → 각자의 쟁점 이름 기반으로 다른 질문 각도
 */
const fs = require('fs')
const path = require('path')

const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')

const MOTIVE_LABELS = {
  self_protection: '자기 보호',
  face_saving: '체면 유지',
  shame_avoidance: '수치심 회피',
  relationship_maintenance: '관계 유지',
  revenge: '복수심',
  third_party_protection: '제3자 보호',
  career_preservation: '직장/평판 보호',
}

let totalGenerated = 0

const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort()

for (const file of files) {
  const filePath = path.join(CASES_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)

  const partyAName = data.duo.partyA.name
  const partyBName = data.duo.partyB.name

  // lieConfig를 disputeId로 인덱싱
  const aConfigs = {}
  for (const lc of data.lieConfigA || []) { aConfigs[lc.disputeId] = lc }
  const bConfigs = {}
  for (const lc of data.lieConfigB || []) { bConfigs[lc.disputeId] = lc }

  let modified = false

  for (const ev of data.evidence || []) {
    const sp = ev.subjectParty || 'both'

    // both가 아니거나 이미 partyContext가 있으면 스킵
    if (sp !== 'both') continue
    if (ev.partyContext) continue

    // 이 증거가 proves하는 쟁점들
    const provedDisputes = (ev.proves || []).map(dId =>
      data.disputes.find(d => d.id === dId)
    ).filter(Boolean)

    if (provedDisputes.length === 0) continue

    // A 관점
    const aDisputes = provedDisputes.filter(d => aConfigs[d.id])
    const bDisputes = provedDisputes.filter(d => bConfigs[d.id])

    const ctx = {}

    if (aDisputes.length > 0) {
      const primary = aDisputes[0]
      const lc = aConfigs[primary.id]
      const motive = MOTIVE_LABELS[lc?.lieMotive] || ''
      ctx.a = {
        questionAngle: `${partyAName}에게: "${primary.name}" 관련 해명 요구${motive ? ` (방어 동기: ${motive})` : ''}`,
        implication: `이 증거는 ${partyAName}의 "${primary.name}" 쟁점과 관련된다. ${partyAName}은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다.`,
      }
    } else {
      // A의 lieConfig에 없지만 both이므로 관찰자 시점
      const primary = provedDisputes[0]
      ctx.a = {
        questionAngle: `${partyAName}에게: "${primary.name}" 관련 자신이 아는 바를 진술`,
        implication: `이 증거는 ${partyAName}이 직접적 당사자가 아닌 쟁점이다. ${partyAName}이 이 상황에 대해 알고 있는 바를 확인한다.`,
      }
    }

    if (bDisputes.length > 0) {
      const primary = bDisputes[0]
      const lc = bConfigs[primary.id]
      const motive = MOTIVE_LABELS[lc?.lieMotive] || ''
      ctx.b = {
        questionAngle: `${partyBName}에게: "${primary.name}" 관련 해명 요구${motive ? ` (방어 동기: ${motive})` : ''}`,
        implication: `이 증거는 ${partyBName}의 "${primary.name}" 쟁점과 관련된다. ${partyBName}은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다.`,
      }
    } else {
      const primary = provedDisputes[0]
      ctx.b = {
        questionAngle: `${partyBName}에게: "${primary.name}" 관련 자신이 아는 바를 진술`,
        implication: `이 증거는 ${partyBName}이 직접적 당사자가 아닌 쟁점이다. ${partyBName}이 이 상황에 대해 알고 있는 바를 확인한다.`,
      }
    }

    ev.partyContext = ctx
    modified = true
    totalGenerated++
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  }
}

console.log(`partyContext 생성 완료: ${totalGenerated}건`)
