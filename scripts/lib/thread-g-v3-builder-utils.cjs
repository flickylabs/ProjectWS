const fs = require('fs')
const path = require('path')

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function pascal(value) {
  return String(value)
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function writeTs(filePath, constName, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `export const ${constName} = ${JSON.stringify(value, null, 2)} as const\n`, 'utf8')
}

function stage(stageIndex, revealKey, text, attackVector) {
  return { stage: stageIndex, revealKey, question: { text, attackVector } }
}

function atom(id, unlockedAtState, factText, tags, stanceHints = ['partial', 'emotional', 'confess']) {
  return { id, factText, tags, unlockedAtState, slots: { summary: { default: factText } }, stanceHints }
}

function dossierQuestion({ id, text, attackVector, requiredLieState, revealAtom, lockedHint, scriptedResponse }) {
  return {
    id,
    text,
    lockedHint,
    attackVector,
    requiredLieState,
    onSuccess: { blockVector: attackVector, revealAtom, lieAdvance: true },
    scriptedResponse,
  }
}

function evidenceNode(id, label, linkedDisputeIds, linkedEvidenceIds = [id]) {
  return { id, type: 'evidence', label, sourceRef: id, linkedDisputeIds, linkedEvidenceIds, visibility: 'base' }
}

function statementNode(id, label, linkedDisputeIds) {
  return { id, type: 'statement', label, sourceRef: id, linkedDisputeIds, visibility: 'base' }
}

function witnessAngleNode(id, label, linkedDisputeIds) {
  return { id, type: 'witness_angle', label, sourceRef: id, linkedDisputeIds, visibility: 'base' }
}

function derivedNode(id, label, linkedDisputeIds, linkedEvidenceIds) {
  return { id, type: 'derived_note', label, linkedDisputeIds, linkedEvidenceIds, visibility: 'derived' }
}

function depthStage(id, label, summary) {
  return { id, label, summary }
}

function trustState(id, label, summary) {
  return { id, label, summary }
}

function interpretationChoice(id, text, implication) {
  return { id, text, implication }
}

module.exports = {
  atom,
  derivedNode,
  depthStage,
  dossierQuestion,
  ensureParentDir,
  evidenceNode,
  interpretationChoice,
  pascal,
  stage,
  statementNode,
  trustState,
  witnessAngleNode,
  writeJson,
  writeTs,
}
