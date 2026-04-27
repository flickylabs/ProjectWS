import { resolveFreeInterrogationNpcProfile } from './fallback'
import type {
  FreeInterrogationGuardContext,
  FreeInterrogationGuardIssue,
  FreeInterrogationIntent,
} from '../../types/freeInterrogationGuard'

const FACT_MARKERS = /사실|기록|확인|당시|그날|부분|맞|아닙|했습니다|없습니다|있습니다/
const MOTIVE_MARKERS = /왜|이유|때문|겁|불안|지키|피하|숨기|하려|생각했/
const EMPATHY_MARKERS = /힘들|상처|두려|불안|미안|죄송|괴로|감정|마음/
const EVIDENCE_MARKERS = /증거|자료|기록|문자|서류|카톡|영수증|통화|계좌|그건|확인/
const RELATION_MARKERS = /관계|사이|상대|가족|친구|배우자|남편|아내|형|동생|아버지|어머니/

export function detectFreeInterrogationHeuristics(
  text: string,
  context: FreeInterrogationGuardContext,
): FreeInterrogationGuardIssue[] {
  const issues: FreeInterrogationGuardIssue[] = []

  const emptyIssue = detectEmptyResponse(text)
  if (emptyIssue) issues.push(emptyIssue)

  const intentIssue = detectIntentMismatch(text, context.intent)
  if (intentIssue) issues.push(intentIssue)

  const characterIssue = detectCharacterMismatch(text, context)
  if (characterIssue) issues.push(characterIssue)

  return issues
}

export function detectEmptyResponse(text: string): FreeInterrogationGuardIssue | null {
  const trimmed = text.trim()
  const meaningful = trimmed.replace(/[\s.…·\-_,!?'"“”‘’()[\]{}~]/g, '')
  if (trimmed.length < 5 || meaningful.length === 0) {
    return {
      dimension: 'empty_response',
      reason: 'text trim length < 5 or punctuation-only response',
    }
  }
  return null
}

function detectIntentMismatch(
  text: string,
  intent?: FreeInterrogationIntent,
): FreeInterrogationGuardIssue | null {
  if (!intent) return null
  const compact = text.replace(/\s+/g, ' ').trim()

  if (intent === 'unmapped') {
    return {
      dimension: 'unmapped_intent',
      reason: 'free interrogation intent is unmapped',
    }
  }

  if (intent === 'fact_pursuit' && MOTIVE_MARKERS.test(compact) && !FACT_MARKERS.test(compact)) {
    return {
      dimension: 'intent_mismatch',
      reason: 'fact_pursuit response is motive-only without factual anchor',
    }
  }

  if (intent === 'motive_search' && !MOTIVE_MARKERS.test(compact)) {
    return {
      dimension: 'intent_mismatch',
      reason: 'motive_search response lacks reason or motive markers',
    }
  }

  if (intent === 'empathy_approach' && !EMPATHY_MARKERS.test(compact) && /아닙니다|모릅니다|관계없습니다/.test(compact)) {
    return {
      dimension: 'intent_mismatch',
      reason: 'empathy_approach response rejects the emotional frame too mechanically',
    }
  }

  if (intent === 'evidence_query' && !EVIDENCE_MARKERS.test(compact)) {
    return {
      dimension: 'intent_mismatch',
      reason: 'evidence_query response does not address evidence or records',
    }
  }

  if (intent === 'relation_query' && !RELATION_MARKERS.test(compact)) {
    return {
      dimension: 'intent_mismatch',
      reason: 'relation_query response does not address relationship or person context',
    }
  }

  return null
}

function detectCharacterMismatch(
  text: string,
  context: FreeInterrogationGuardContext,
): FreeInterrogationGuardIssue | null {
  const profile = resolveFreeInterrogationNpcProfile(context)
  const archetype = context.archetype ?? profile.archetype
  const compact = text.replace(/\s+/g, ' ').trim()

  if (archetype === 'avoidant' && /확실합니다|분명합니다|틀림없습니다|제가 전부 책임지겠습니다/.test(compact)) {
    return {
      dimension: 'character_mismatch',
      reason: 'avoidant response is too direct or conclusive',
      matched: [archetype],
    }
  }

  if (archetype === 'victim_cosplay' && /객관적으로|절차상|자료상|논리적으로만/.test(compact)) {
    return {
      dimension: 'character_mismatch',
      reason: 'victim_cosplay response is overly clinical',
      matched: [archetype],
    }
  }

  if (archetype === 'confrontational' && /제가 다 잘못했습니다|시키는 대로|무조건 따르겠습니다/.test(compact)) {
    return {
      dimension: 'character_mismatch',
      reason: 'confrontational response collapses too submissively',
      matched: [archetype],
    }
  }

  if (archetype === 'affect_flattening' && (/!{2,}/.test(compact) || /미치겠|억울해서 못 살|제발 좀/.test(compact))) {
    return {
      dimension: 'character_mismatch',
      reason: 'affect_flattening response is too emotionally amplified',
      matched: [archetype],
    }
  }

  if (archetype === 'premature_summary' && compact.length > 260 && !/정리하면|결론은|그러니까/.test(compact)) {
    return {
      dimension: 'character_mismatch',
      reason: 'premature_summary response is too long without summary framing',
      matched: [archetype],
    }
  }

  return null
}
