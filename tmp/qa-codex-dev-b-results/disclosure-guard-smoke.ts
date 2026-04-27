import { blockHiddenTruthLexemes } from '../../src/engine/disclosureGuard'
import { ensureDisclosurePolicyLoaded } from '../../src/engine/disclosurePolicyLoader'
import type { GuardContext } from '../../src/types/disclosure'

type WarnCall = unknown[]

const warnCalls: WarnCall[] = []
const originalWarn = console.warn
console.warn = (...args: unknown[]) => {
  warnCalls.push(args)
  originalWarn(...args)
}

function setGuardQuery(mode: string): void {
  ;(globalThis as any).window = {
    location: { search: `?guard=${mode}` },
    localStorage: { getItem: () => null },
  }
}

const familyJudgeContext: GuardContext = {
  caseId: 'family-01',
  channel: 'judge_question',
  lieState: 'S0',
  party: 'b',
  disputeId: 'd-2',
  variant: 'smoke-family-judge-p1',
}

const friendDiscoveryContext: GuardContext = {
  caseId: 'friend-01',
  channel: 'evidence_discovery',
  variant: 'smoke-friend-evidence-discovery',
}

setGuardQuery('off')
const offResult = blockHiddenTruthLexemes('유서를 손댄 정황을 바로 단정할 수 있습니까?', familyJudgeContext)

await ensureDisclosurePolicyLoaded('family-01')
await ensureDisclosurePolicyLoaded('friend-01')

setGuardQuery('log')
const familyLogResult = blockHiddenTruthLexemes('유서를 손댄 정황과 자기 몫을 줄인 이유를 설명해 보십시오.', familyJudgeContext)
const friendLogResult = blockHiddenTruthLexemes('선을 넘는 메시지를 보고도 왜 바로 말하지 않았습니까?', friendDiscoveryContext)

console.log(JSON.stringify({
  offResult,
  familyLogResult,
  friendLogResult,
  warnSamples: warnCalls.map(([label, payload]) => ({ label, payload })),
}, null, 2))
