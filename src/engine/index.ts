export { attemptLieTransition, initializeLieStates } from './lieStateMachine'
export { updateEmotion, createInitialEmotionalState, getBehaviorHint, getEmotionalPhase } from './emotionEngine'
export { createInitialTrustState, updateTrust, canVoluntaryConfess, canAcceptConfidential } from './trustEngine'
export {
  createInitialEvidenceStates,
  checkUnlocks,
  checkCombinations,
  presentEvidence,
  investigateEvidence,
  getUnlockedQuestions,
  getLockedQuestions,
  type EvidenceRuntimeState,
} from './evidenceEngine'
export { resolveDialogue, resolveEvidenceReaction } from './dialogueResolver'
export { detectContradictions, detectStatementChange } from './contradictionEngine'
export { calculateVerdict } from './verdictEngine'
