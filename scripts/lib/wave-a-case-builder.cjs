const fs = require('fs')
const path = require('path')
const { pickJudgeReference } = require('./judge-reference-utils.cjs')

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function normalizeWaveAJudgeReferences(runtimeCase) {
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'headline'
  const partyA = runtimeCase?.duo?.partyA
  const partyB = runtimeCase?.duo?.partyB
  if (!partyA || !partyB) return runtimeCase
  partyA.callTerms = {
    ...(partyA.callTerms || {}),
    toJudge: pickJudgeReference(partyA.callTerms?.toJudge, {
      otherRole: partyB.occupation || partyB.role || '',
      relationshipType,
      party: 'a',
    }),
  }
  partyB.callTerms = {
    ...(partyB.callTerms || {}),
    toJudge: pickJudgeReference(partyB.callTerms?.toJudge, {
      otherRole: partyA.occupation || partyA.role || '',
      relationshipType,
      party: 'b',
    }),
  }
  return runtimeCase
}

function buildEmptyStateUnlockAtoms(runtimeCase) {
  const disputes = runtimeCase.disputes || []
  const empty = {}
  for (const dispute of disputes) {
    empty[dispute.id] = {}
  }
  return { a: { ...empty }, b: { ...empty } }
}

function synthesizeStateUnlockAtoms(caseId, runtimeCase, dossierCards, existingMap) {
  const atoms = existingMap || buildEmptyStateUnlockAtoms(runtimeCase)

  for (const card of dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        const revealAtomId = question?.onSuccess?.revealAtom
        if (!revealAtomId) continue

        const parts = String(revealAtomId).split(':')
        if (parts.length < 5) continue
        const [, party, disputeId, lieState] = parts
        if (!atoms[party]) atoms[party] = {}
        if (!atoms[party][disputeId]) atoms[party][disputeId] = {}
        if (!atoms[party][disputeId][lieState]) atoms[party][disputeId][lieState] = []

        if (atoms[party][disputeId][lieState].some((item) => item.id === revealAtomId)) continue

        atoms[party][disputeId][lieState].push({
          id: revealAtomId,
          factText: `${card.name} 카드에서 ${party.toUpperCase()}측 숨김 단서가 더 드러납니다.`,
          tags: ['wave-a', caseId, disputeId, card.id],
          unlockedAtState: lieState,
          slots: {
            summary: {
              default: `${card.name} 카드에서 드러난 단서입니다.`,
            },
          },
          stanceHints: ['partial', 'blame', 'confess'],
        })
      }
    }
  }

  return atoms
}

function buildWaveACase(root, caseId) {
  const specPath = path.join(root, 'scripts', 'specs', 'wave-a', `${caseId}.cjs`)
  if (!fs.existsSync(specPath)) {
    throw new Error(`missing Wave A spec: ${path.relative(root, specPath).replace(/\\/g, '/')}`)
  }

  const spec = require(specPath)
  const runtimeCase = normalizeWaveAJudgeReferences(JSON.parse(JSON.stringify(spec.runtimeCase)))
  const v3GameLoopData = JSON.parse(JSON.stringify(spec.v3GameLoopData))

  v3GameLoopData.caseId = caseId
  v3GameLoopData.stateUnlockAtoms = synthesizeStateUnlockAtoms(
    caseId,
    runtimeCase,
    v3GameLoopData.dossierCards || [],
    v3GameLoopData.stateUnlockAtoms,
  )

  const runtimeOutPath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const v3OutPath = path.join(root, 'docs', 'ref', '리뉴얼참고', `${caseId}-v3-game-loop-data.json`)

  writeJson(runtimeOutPath, runtimeCase)
  writeJson(v3OutPath, v3GameLoopData)

  return {
    caseId,
    runtimeOutPath,
    v3OutPath,
  }
}

module.exports = {
  buildWaveACase,
}
