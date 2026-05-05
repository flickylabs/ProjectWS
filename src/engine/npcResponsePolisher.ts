import type { CaseData, PartyId } from '../types'
import { normalizeCaseKey } from '../utils/caseHelpers'

const COMMON_REPLACEMENTS: Array<[string, string]> = [
  ['결국 이 부분이 핵심입니다. ', ''],
  ['가장 먼저 인정할 수 있는 것은 제가 그 행동을 했다는 부분입니다.', '그 점은 먼저 인정하겠습니다.'],
  ['기억만으로 한꺼번에 답하진 않겠습니다.', '기억만으로 한 번에 정리하긴 어렵습니다.'],
  ['기억만으로 결론을 말하진 않겠습니다.', '지금 기억만으로 단정하진 않겠습니다.'],
  ['자료를 보면서 하나씩 짚겠습니다.', '자료에 남은 부분부터 차례로 말씀드리겠습니다.'],
  ['그래도 결론은 단계별로 확인해 주십시오.', '다만 그 결론까지 한 번에 단정하긴 어렵습니다.'],
  ['단계별로 확인해 주십시오.', '그 결론까지 한 번에 단정하긴 어렵습니다.'],
  ['세부 흐름은 기록으로 확인해 주십시오.', '세부 흐름은 남은 기록에 맞춰 설명하겠습니다.'],
  ['원문 순서가 먼저입니다.', '원문 순서를 먼저 봐야 합니다.'],
  ['말이 먼저 붙었습니다.', '먼저 말을 꺼냈습니다.'],
  ['말이 먼저 보였습니다.', '그 말이 먼저 눈에 들어왔습니다.'],
  ['흐름이 남아 있습니다.', '정황이 남아 있습니다.'],
  ['흐름이 남아있습니다.', '정황이 남아 있습니다.'],
  ['기록 밖으로는 단정하지 않겠습니다.', '기록에 남은 범위까지만 말씀드리겠습니다.'],
  ['양쪽 진술을 함께 대조해야 합니다.', '양쪽 말을 함께 놓고 봐야 합니다.'],
]

export function polishNpcResponseCopy(
  text: string,
  caseData?: CaseData | null,
  speaker?: PartyId,
): string {
  let result = text.trim()
  for (const [from, to] of COMMON_REPLACEMENTS) {
    result = result.split(from).join(to)
  }

  const caseId = caseData ? normalizeCaseKey(caseData) : ''
  if (caseId === 'friend-01') {
    result = polishFriendReferences(result, speaker)
  } else if (caseId === 'family-01') {
    result = polishFamilyReferences(result, speaker)
  }

  return result
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function buildReleaseDialogueStyleGuide(caseData: CaseData, speaker: PartyId): string {
  const caseId = normalizeCaseKey(caseData)
  const caseSpecific = caseId === 'friend-01'
    ? friendStyleGuide(speaker)
    : caseId === 'family-01'
      ? familyStyleGuide(speaker)
      : spouseStyleGuide()

  return `

## 출시용 응답 품질 규칙
- 재판관 질문의 핵심에 바로 답하되, "핵심입니다", "기록과 함께 판단", "단계별로 확인" 같은 보고서식 문장을 쓰지 않는다.
- 답변자는 자기 자신을 제3자처럼 부르지 않는다. "송다은이라는 점이 확인됩니다" 같은 문장은 금지하고 "처음 글을 올린 건 저였습니다"처럼 말한다.
- 증거 질문은 조사 단계와 현재 진실 단계를 함께 따른다. 증거가 3단계라도 현재 진실 단계가 낮으면 밝혀진 범위만 인정하고 숨은 동기나 최종 진실을 먼저 말하지 않는다.
- 낮은 진실 단계(S0-S1)는 전면 부인 또는 방어적 해석, 중간 단계(S2-S3)는 일부 인정과 망설임, 높은 단계(S4-S5)는 책임과 감정의 결을 자연스럽게 드러낸다.
- 1~3문장으로 말하고, 사람의 말처럼 쓴다. 법률 메모, 요약문, 번역체, 시스템 설명문처럼 쓰지 않는다.
${caseSpecific}`.trim()
}

function polishFriendReferences(text: string, speaker?: PartyId): string {
  let result = text
  if (speaker === 'a') {
    result = result
      .replace(/단톡방에 처음 글을 올린 사람이 송다은이라는 점이 확인됩니다/g, '단톡방에 처음 글을 올린 건 저였습니다')
      .replace(/송다은이라는 점/g, '저였다는 점')
      .replace(/송다은 씨가/g, '제가')
      .replace(/송다은 씨는/g, '저는')
      .replace(/송다은 씨/g, '저')
      .replace(/송다은이/g, '제가')
      .replace(/송다은은/g, '저는')
      .replace(/최수민 씨/g, '수민이')
      .replace(/최수민을/g, '수민이를')
      .replace(/최수민이/g, '수민이가')
      .replace(/최수민은/g, '수민이는')
      .replace(/최수민에게/g, '수민이에게')
      .replace(/최수민/g, '수민이')
      .replace(/김태윤 씨/g, '태윤이')
      .replace(/김태윤을/g, '태윤이를')
      .replace(/김태윤이/g, '태윤이가')
      .replace(/김태윤은/g, '태윤이는')
      .replace(/김태윤/g, '태윤이')
  } else if (speaker === 'b') {
    result = result
      .replace(/최수민이라는 점/g, '저였다는 점')
      .replace(/최수민 씨가/g, '제가')
      .replace(/최수민 씨는/g, '저는')
      .replace(/최수민 씨/g, '저')
      .replace(/최수민을/g, '저를')
      .replace(/최수민이/g, '제가')
      .replace(/최수민은/g, '저는')
      .replace(/송다은 씨/g, '다은이')
      .replace(/송다은을/g, '다은이를')
      .replace(/송다은이/g, '다은이가')
      .replace(/송다은은/g, '다은이는')
      .replace(/송다은에게/g, '다은이에게')
      .replace(/송다은/g, '다은이')
      .replace(/김태윤 씨/g, '태윤이')
      .replace(/김태윤을/g, '태윤이를')
      .replace(/김태윤이/g, '태윤이가')
      .replace(/김태윤은/g, '태윤이는')
      .replace(/김태윤/g, '태윤이')
  }
  return result
    .replace(/수민이를 비난한 정황/g, '수민이를 몰아세운 말들')
    .replace(/수민이를 비난한/g, '수민이를 몰아세운')
    .replace(/비난한 흐름/g, '몰아세운 말들')
}

function polishFamilyReferences(text: string, speaker?: PartyId): string {
  let result = text
    .replace(/어머상대방이/g, '어머님께서')
    .replace(/어머니께서/g, '어머님께서')
    .replace(/어머니가/g, '어머님께서')
    .replace(/어머니는/g, '어머님은')
  if (speaker === 'a') {
    result = result
      .replace(/윤정후 씨/g, '정후')
      .replace(/윤정후를/g, '정후를')
      .replace(/윤정후가/g, '정후가')
      .replace(/윤정후는/g, '정후는')
      .replace(/윤정후에게/g, '정후에게')
      .replace(/윤정후/g, '정후')
  } else if (speaker === 'b') {
    result = result
      .replace(/윤태성 씨/g, '형')
      .replace(/윤태성을/g, '형을')
      .replace(/윤태성이/g, '형이')
      .replace(/윤태성은/g, '형은')
      .replace(/윤태성에게/g, '형에게')
      .replace(/윤태성/g, '형')
  }
  return result
}

function friendStyleGuide(speaker: PartyId): string {
  return speaker === 'a'
    ? '- 송다은은 최수민을 "수민이", 김태윤을 "태윤이"라고 부른다. 본인을 "송다은"이라고 말하지 않는다.'
    : '- 최수민은 송다은을 "다은이", 김태윤을 "태윤이"라고 부른다. 본인을 "최수민"이라고 말하지 않는다.'
}

function familyStyleGuide(speaker: PartyId): string {
  return speaker === 'a'
    ? '- 윤태성은 윤정후를 "정후" 또는 "동생", 어머니를 "어머님"이라고 부른다.'
    : '- 윤정후는 윤태성을 "형", 어머니를 "어머님"이라고 부른다.'
}

function spouseStyleGuide(): string {
  return '- Spouse-01은 배우자 관계의 긴장감을 유지하되, 상대를 코드명이나 설명문으로 부르지 않는다.'
}
