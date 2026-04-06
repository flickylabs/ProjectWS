import type { PartyId } from '../types'

let skipNextJudgeQuestion = false
let dossierQuestionOverride: string | null = null
let nextConfidential = false
let nextEvasionTarget: { target: PartyId; disputeId: string } | null = null

export function setSkipNextJudgeQuestion(skip: boolean) {
  skipNextJudgeQuestion = skip
}

export function shouldSkipJudgeQuestion(): boolean {
  const value = skipNextJudgeQuestion
  skipNextJudgeQuestion = false
  return value
}

export function setDossierQuestionOverride(text: string | null) {
  dossierQuestionOverride = text
}

export function consumeDossierQuestionOverride(): string | null {
  const value = dossierQuestionOverride
  dossierQuestionOverride = null
  return value
}

export function setNextConfidential(on: boolean) {
  nextConfidential = on
}

export function getNextConfidential(): boolean {
  return nextConfidential
}

export function clearNextConfidential() {
  nextConfidential = false
}

export function setNextEvasionReading(target: PartyId, disputeId: string) {
  nextEvasionTarget = { target, disputeId }
}

export function getNextEvasionReading() {
  return nextEvasionTarget
}

export function clearNextEvasionReading() {
  nextEvasionTarget = null
}
