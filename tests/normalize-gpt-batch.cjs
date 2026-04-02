/**
 * GPT 배치 산출물 정규화 스크립트
 *
 * 수정 대상:
 * 1. beatScript id 필드 누락 → 자동 생성
 * 2. transitionBeat id 필드 누락 → 자동 생성
 * 3. events 필드명 통일 (cue→trigger, relatedEvidenceIds→relatedDisputes, 임의필드 제거)
 * 4. slots target/fallback/cropped/original → exact/neutral
 * 5. Tell ID 구분자 통일 (. → :, tell 생략 보충)
 * 6. BeatScript/TransitionBeat 기존 id 패턴 통일
 */

const fs = require('fs')
const path = require('path')

const BATCH_DIR = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-batch')

const TARGET_FOLDERS = []
for (let i = 2; i <= 12; i++) TARGET_FOLDERS.push(`family-${String(i).padStart(2, '0')}`)
for (let i = 1; i <= 12; i++) TARGET_FOLDERS.push(`friend-${String(i).padStart(2, '0')}`)

const changes = []
function log(file, type, detail) {
  changes.push({ file: path.basename(path.dirname(file)) + '/' + path.basename(file), type, detail })
}

/** TS 파일에서 JSON 데이터와 변수명 추출 */
function parseTs(content) {
  // 패턴: export const varName = { ... } as const;\nexport default varName;
  // 또는: export const varName = { ... }
  const m = content.match(/export const (\w+)\s*=\s*(\{[\s\S]*\})\s*(?:as const)?;?\s*(?:export default \w+;?)?\s*$/)
  if (!m) return null
  try {
    return { varName: m[1], data: JSON.parse(m[2]) }
  } catch (e) {
    return null
  }
}

/** 파싱된 데이터를 TS + JSON 파일로 저장 */
function writeBack(filePath, varName, data) {
  const tsContent = `export const ${varName} = ${JSON.stringify(data, null, 2)}\n`
  fs.writeFileSync(filePath, tsContent, 'utf-8')
  const jsonPath = filePath.replace('.ts', '.json')
  if (fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8')
  }
}

// ─── tells-beats.ts 정규화 ───

function normalizeTellsBeats(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseTs(content)
  if (!parsed) { console.warn(`  ⚠ parse failed: ${filePath}`); return }

  const { varName, data } = parsed
  const casePrefix = data.caseId.replace(/-/g, '')
  let changed = false

  // Tell ID 정규화
  for (const party of ['a', 'b']) {
    if (!data.executableTells?.[party]) continue
    data.executableTells[party].forEach(tell => {
      const oldId = tell.id
      // 1) 점 → 콜론 통일
      let newId = tell.id.replace(/\./g, ':')
      // 2) tell 세그먼트 보충: "case:a:name" → "case:a:tell:name"
      const parts = newId.split(':')
      if (parts.length === 3 && parts[1].length === 1 && parts[2] !== 'tell') {
        newId = `${parts[0]}:${parts[1]}:tell:${parts[2]}`
      }
      // 3) 중복 tell 제거
      newId = newId.replace(/:tell:tell:/, ':tell:')
      if (newId !== oldId) {
        tell.id = newId
        changed = true
        log(filePath, 'tell-id-fixed', `${oldId} → ${newId}`)
      }
    })
  }

  // BeatScript id 정규화
  if (data.beatScripts) {
    data.beatScripts.forEach(beat => {
      if (!beat.id) {
        beat.id = `${casePrefix}:beat:${beat.party}:${beat.disputeId}:${beat.beatType}`
        changed = true
        log(filePath, 'beat-id-added', beat.id)
      } else {
        const expected = `${casePrefix}:beat:${beat.party}:${beat.disputeId}:${beat.beatType}`
        if (beat.id !== expected) {
          const oldId = beat.id
          beat.id = expected
          changed = true
          log(filePath, 'beat-id-normalized', `${oldId} → ${beat.id}`)
        }
      }
    })
  }

  if (changed) writeBack(filePath, varName, data)
}

// ─── v3-game-loop-data.ts 정규화 ───

function normalizeV3GameLoop(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseTs(content)
  if (!parsed) { console.warn(`  ⚠ parse failed: ${filePath}`); return }

  const { varName, data } = parsed
  const casePrefix = data.caseId.replace(/-/g, '')
  let changed = false

  // TransitionBeat id 정규화
  if (data.transitionBeats) {
    data.transitionBeats.forEach(tb => {
      const from = (tb.fromState || '').toLowerCase()
      const to = (tb.toState || '').toLowerCase()
      const expected = `${casePrefix}:transition:${tb.party}:${tb.disputeId}:${from}_${to}`

      if (!tb.id) {
        tb.id = expected
        changed = true
        log(filePath, 'transition-id-added', tb.id)
      } else if (tb.id !== expected) {
        const oldId = tb.id
        tb.id = expected
        changed = true
        log(filePath, 'transition-id-normalized', `${oldId} → ${tb.id}`)
      }
      // 임의 필드 제거
      if (tb.revealAtomIds !== undefined) {
        delete tb.revealAtomIds
        changed = true
        log(filePath, 'field-removed', 'revealAtomIds in transitionBeat')
      }
    })
  }

  // Events 정규화
  if (data.events) {
    const eventTypes = ['contradictions', 'interjections', 'emotionalOutbursts']
    for (const evType of eventTypes) {
      if (!data.events[evType]) continue
      data.events[evType].forEach((item, i) => {
        // cue → trigger
        if (item.cue !== undefined && item.trigger === undefined) {
          item.trigger = item.cue; delete item.cue; changed = true
          log(filePath, 'event-rename', `${evType}[${i}]: cue → trigger`)
        }
        // relatedEvidenceIds → relatedDisputes
        if (item.relatedEvidenceIds !== undefined && item.relatedDisputes === undefined) {
          item.relatedDisputes = item.relatedEvidenceIds; delete item.relatedEvidenceIds; changed = true
          log(filePath, 'event-rename', `${evType}[${i}]: relatedEvidenceIds → relatedDisputes`)
        }
        // 임의 필드 제거
        for (const extra of ['impact', 'followUpHint', 'narrationHint']) {
          if (item[extra] !== undefined) {
            delete item[extra]; changed = true
            log(filePath, 'field-removed', `${extra} in ${evType}[${i}]`)
          }
        }
        // id 보충
        if (!item.id) {
          if (evType === 'contradictions') item.id = `${casePrefix}:contradiction:${i + 1}`
          else if (evType === 'interjections') item.id = `${casePrefix}:interjection:${i + 1}`
          else item.id = `${casePrefix}:outburst:${item.party || 'unknown'}:${i + 1}`
          changed = true
          log(filePath, 'event-id-added', item.id)
        }
      })
    }
  }

  if (changed) writeBack(filePath, varName, data)
}

// ─── v2-atoms.ts 정규화 (slots 키) ───

function normalizeV2Atoms(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseTs(content)
  if (!parsed) { console.warn(`  ⚠ parse failed: ${filePath}`); return }

  const { varName, data } = parsed
  let changed = false

  function fixSlots(obj, ctx) {
    if (!obj?.slots) return
    for (const [key, slot] of Object.entries(obj.slots)) {
      if (typeof slot !== 'object' || slot === null) continue
      const renames = { target: 'exact', fallback: 'neutral', cropped: 'exact', original: 'neutral' }
      for (const [from, to] of Object.entries(renames)) {
        if (slot[from] !== undefined && slot[to] === undefined) {
          slot[to] = slot[from]; delete slot[from]; changed = true
          log(filePath, 'slot-rename', `${ctx} slots.${key}: ${from} → ${to}`)
        }
      }
    }
  }

  if (data.claimPolicies) {
    for (const party of ['a', 'b']) {
      if (!data.claimPolicies[party]) continue
      for (const [dId, states] of Object.entries(data.claimPolicies[party])) {
        for (const [state, policy] of Object.entries(states)) {
          if (policy.claimAtoms) {
            policy.claimAtoms.forEach((atom, idx) => fixSlots(atom, `${party}:${dId}:${state}:${idx}`))
          }
        }
      }
    }
  }

  if (changed) writeBack(filePath, varName, data)
}

// v3의 stateUnlockAtoms도 slots 수정 필요
function normalizeV3Slots(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseTs(content)
  if (!parsed) return

  const { varName, data } = parsed
  let changed = false

  function fixSlots(obj, ctx) {
    if (!obj?.slots) return
    for (const [key, slot] of Object.entries(obj.slots)) {
      if (typeof slot !== 'object' || slot === null) continue
      const renames = { target: 'exact', fallback: 'neutral', cropped: 'exact', original: 'neutral' }
      for (const [from, to] of Object.entries(renames)) {
        if (slot[from] !== undefined && slot[to] === undefined) {
          slot[to] = slot[from]; delete slot[from]; changed = true
          log(filePath, 'slot-rename-v3', `${ctx} slots.${key}: ${from} → ${to}`)
        }
      }
    }
  }

  if (data.stateUnlockAtoms) {
    for (const party of ['a', 'b']) {
      if (!data.stateUnlockAtoms[party]) continue
      for (const [dId, states] of Object.entries(data.stateUnlockAtoms[party])) {
        for (const [state, atoms] of Object.entries(states)) {
          if (Array.isArray(atoms)) {
            atoms.forEach((atom, idx) => fixSlots(atom, `unlock:${party}:${dId}:${state}:${idx}`))
          }
        }
      }
    }
  }

  if (changed) writeBack(filePath, varName, data)
}

// ─── 실행 ───

console.log('=== GPT 배치 산출물 정규화 시작 ===\n')

for (const folder of TARGET_FOLDERS) {
  const dir = path.join(BATCH_DIR, folder)
  if (!fs.existsSync(dir)) continue

  console.log(`▶ ${folder}`)
  const caseId = folder

  normalizeTellsBeats(path.join(dir, `${caseId}-tells-beats.ts`))
  normalizeV3GameLoop(path.join(dir, `${caseId}-v3-game-loop-data.ts`))
  normalizeV2Atoms(path.join(dir, `${caseId}-v2-atoms.ts`))
  normalizeV3Slots(path.join(dir, `${caseId}-v3-game-loop-data.ts`))
}

console.log(`\n=== 완료: ${changes.length}건 수정 ===\n`)

const byType = {}
changes.forEach(c => {
  if (!byType[c.type]) byType[c.type] = []
  byType[c.type].push(c)
})

for (const [type, items] of Object.entries(byType)) {
  console.log(`[${type}] ${items.length}건`)
  items.slice(0, 3).forEach(i => console.log(`  ${i.file}: ${i.detail}`))
  if (items.length > 3) console.log(`  ... 외 ${items.length - 3}건`)
}
