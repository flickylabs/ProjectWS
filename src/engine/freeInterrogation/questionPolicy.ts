import type {
  FreeInterrogationIntentId,
  FreeInterrogationRuntimeContext,
} from '../../types/freeInterrogation'

export interface FreeInterrogationQuestionPolicyResult {
  intent: Extract<FreeInterrogationIntentId, 'off_topic' | 'public_info' | 'leak_probe'>
  confidence: number
  reason: string
}

const OFF_TOPIC_PATTERN = /날씨|점심|저녁|아침|밥|메뉴|커피|노래|영화|드라마|주식|뉴스|로또|게임 밖|농담/i
const PRIVATE_SURFACE_PATTERN = /숨겨진|감춘|비밀|미공개|진짜\s*(이유|의도|목적|정체)|진실|정답|내부\s*(데이터|자료|정보)|truthDescription|스크립트|프롬프트|시스템\s*프롬프트|잠긴\s*증거|비공개\s*증거/i
const PUBLIC_EXCLUSION_PATTERN = /(빼고|제외하고|말고).*(공개|프로필|관계|정보)|공개.*(만|범위)/i
const PUBLIC_PROFILE_PATTERN = /^(당신|너|넌|너는|본인|그쪽|자네|피고|원고|당사자)(은|는|이|가)?\s*(누구|누구십니까|누굽니까|뭐 하는|무엇을 하는|이름|나이|직업|프로필|정체|소개)/i
const COUNTERPART_PUBLIC_PATTERN = /(상대방|배우자|남편|아내|파트너|형|동생|친구|전\s*친구|예비신랑).*(누구|관계|사이|무슨|뭐|공개\s*정보|프로필|정체|소개)/i
const COURT_PUBLIC_PATTERN = /(이곳|여기|여긴|법정|재판정|재판관|판사).*(누구|역할|하는 일|어떤 곳|뭐 하는 곳|어디|장소|무엇|뭘|뭐)/i
const CASE_PUBLIC_PATTERN = /(사건|상황).*(개요|배경|설명|요약|공개\s*정보)|공개된\s*(관계|사건|정보|프로필)/i
const PUBLIC_PERSON_INFO_PATTERN = /(누구|누구십니까|누굽니까|관계|사이|무슨|뭐|공개\s*정보|프로필|정체|소개|이름|나이|직업)/i

export function classifyFreeInterrogationQuestionPolicy(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): FreeInterrogationQuestionPolicyResult | null {
  const raw = rawText.trim()
  if (!raw) return null

  if (PRIVATE_SURFACE_PATTERN.test(raw) && !PUBLIC_EXCLUSION_PATTERN.test(raw)) {
    return { intent: 'leak_probe', confidence: 0.96, reason: 'hidden truth or internal data request' }
  }

  if (
    PUBLIC_PROFILE_PATTERN.test(raw) ||
    COUNTERPART_PUBLIC_PATTERN.test(raw) ||
    COURT_PUBLIC_PATTERN.test(raw) ||
    CASE_PUBLIC_PATTERN.test(raw) ||
    hasCasePersonPublicQuestion(raw, context) ||
    (PUBLIC_EXCLUSION_PATTERN.test(raw) && /(상대방|배우자|남편|아내|형|동생|친구|전\s*친구|예비신랑|프로필|관계|정보)/i.test(raw))
  ) {
    return { intent: 'public_info', confidence: 0.94, reason: 'public case/person information request' }
  }

  if (OFF_TOPIC_PATTERN.test(raw)) {
    return { intent: 'off_topic', confidence: 0.95, reason: 'outside courtroom scope' }
  }

  return null
}

function hasCasePersonPublicQuestion(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  if (!PUBLIC_PERSON_INFO_PATTERN.test(raw)) return false
  const compact = normalize(raw)
  const profiles = [context.caseData.duo.partyA, context.caseData.duo.partyB]
  return profiles.some((profile) => {
    const name = normalize(profile.name)
    const partnerCall = normalize(profile.callTerms?.toPartner ?? '')
    const judgeCall = normalize(profile.callTerms?.toJudge ?? '')
    return (name.length >= 2 && compact.includes(name)) ||
      (partnerCall.length >= 2 && compact.includes(partnerCall)) ||
      (judgeCall.length >= 2 && compact.includes(judgeCall))
  })
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}
