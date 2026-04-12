#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'headline-01'
const SCRIPTED_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)
const CASE_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)

const bundle = JSON.parse(fs.readFileSync(SCRIPTED_PATH, 'utf8'))
const caseData = JSON.parse(fs.readFileSync(CASE_PATH, 'utf8'))

const evidenceById = new Map((caseData.evidence || []).map((item) => [item.id, item]))
const witnessById = new Map((caseData.duo?.socialGraph || []).map((item) => [item.id, item]))

const suspiciousSentenceMap = new Map([
  ['주방 CCTV와 체크 사진에 남은 위생 장면.', '주방 CCTV와 체크 사진에 위생 장면이 남아 있습니다.'],
  ['삭제 복구된 단체방 캡처와 커뮤니티 확산 흔적.', '삭제 복구된 단체방 캡처와 커뮤니티 확산 흔적이 남아 있습니다.'],
  ['즉시 영업정지 사안까지 단정한 것은 아니었습니다이라는 점은 압니다.', '즉시 영업정지 사안까지 단정한 것은 아니었다는 점도 알고 있습니다.'],
  ['저희 쪽 잘못을 줄이려는 말은 아닙니다.', '저희 쪽 잘못을 줄이려는 뜻은 아닙니다.'],
])

const s5Closers = {
  'd-1': [
    '원본 촬영본과 업로드본의 차이는 제 선택으로 남습니다.',
    '그 편집 선택까지 공익으로 포장할 수는 없습니다.',
    '그래도 실제 장면의 무게와 연출의 무게는 갈라서 봐 주십시오.',
    '제가 키운 위기감은 제 책임으로 남겠습니다.',
    '조회수 계산이 섞인 판단이었다는 점도 부인하지 않겠습니다.',
  ],
  'd-2': [
    '위생 문제의 정도와 영상 표현의 강도는 분리해서 보셔야 합니다.',
    '운영 실패를 줄여 말한 책임은 제가 지겠습니다.',
    '기준을 놓친 사실까지 없던 일로 돌릴 생각은 없습니다.',
    '다만 누적 실패와 즉시 영업정지 사안은 같은 말이 아닙니다.',
    '제가 감춘 운영 부담이 판단을 흐렸다는 점은 인정합니다.',
  ],
  'd-3': [
    '협조라는 표현 뒤에 있던 압박성은 제 몫으로 남습니다.',
    '영향력을 거래 카드처럼 쥔 태도는 변명하지 않겠습니다.',
    '거절하기 어려운 구조를 알면서도 밀어붙인 책임이 있습니다.',
    '상품 제안과 공익 경고를 섞은 방식은 잘못이었습니다.',
    '상대가 느꼈을 압박까지 이제는 부인하지 않겠습니다.',
  ],
  'd-4': [
    '반격 과정에서 선을 넘은 대응은 따로 책임지겠습니다.',
    '생계 위기와 신상 유포를 같은 말로 덮을 수는 없습니다.',
    '감정이 격했다는 이유로 정보 확산 책임이 사라지지는 않습니다.',
    '차량 번호와 동선이 돈 단위의 분노보다 더 큰 상처를 남겼습니다.',
    '제가 허용한 확산이 사적 보복으로 읽힌다는 점을 인정합니다.',
  ],
}

function splitSentences(text) {
  const matches = String(text || '').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  return (matches || []).map((part) => part.trim()).filter(Boolean)
}

function finishSentence(text) {
  const trimmed = String(text || '').trim()
  if (!trimmed) return ''
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function normalizeSentence(sentence) {
  let next = String(sentence || '').trim().replace(/\s+/g, ' ')
  next = suspiciousSentenceMap.get(next) || next
  next = next.replace('없습니다 그래도', '없습니다. 그래도')
  next = next.replace('아닙니다 그래도', '아닙니다. 그래도')
  return finishSentence(next)
}

function joinSentences(sentences) {
  return sentences.map(normalizeSentence).filter(Boolean).join(' ')
}

function ensureS5ThirdSentence(entry, variantIndex) {
  const sentences = splitSentences(entry.text).map(normalizeSentence)
  if (sentences.length >= 3) return joinSentences(sentences)
  const options = s5Closers[entry.disputeId] || ['그 점은 제 책임으로 남습니다.']
  sentences.push(options[variantIndex % options.length])
  return joinSentences(sentences)
}

function formalizeKnowledgeScope(scope) {
  let next = String(scope || '').trim().replace(/\s+/g, ' ')
  next = next.replace(/알고 있다\.?$/, '알고 있습니다')
  next = next.replace(/설명할 수 있다\.?$/, '설명할 수 있습니다')
  next = next.replace(/할 수 있다\.?$/, '할 수 있습니다')
  next = next.replace(/있다\.?$/, '있습니다')
  next = next.replace(/남아 있다\.?$/, '남아 있습니다')
  return finishSentence(next)
}

function rewriteWitnessVariant(entry) {
  const witness = witnessById.get(entry.witnessId)
  if (!witness) return
  const variant = entry.variants?.[0]
  if (!variant) return

  const scopeSentence = formalizeKnowledgeScope(witness.knowledgeScope)
  if (entry.depth === 'partial') {
    variant.text = joinSentences([
      `${witness.name} 증인은 ${scopeSentence.replace(/\.$/, '')}`,
      '다만 자기 위치에서 본 구간만 확실하다고 선을 긋습니다.',
    ])
  } else if (entry.depth === 'full') {
    variant.text = joinSentences([
      `${witness.name} 증인은 ${scopeSentence.replace(/\.$/, '')}`,
      '직접 본 구간과 뒤늦게 알게 된 구간을 나눠 설명합니다.',
    ])
  }
}

function rewriteWitnessVariant(entry) {
  const witness = witnessById.get(entry.witnessId)
  if (!witness) return

  const scopeSentence = formalizeKnowledgeScope(witness.knowledgeScope)
  for (const [index, variant] of (entry.variants || []).entries()) {
    if (entry.depth === 'partial') {
      const tails = [
        '?ㅻ쭔 ?먭린 ?꾩튂?먯꽌 蹂?援ш컙留??뺤떎?섎떎怨??좎쓣 湲뗭뒿?덈떎.',
        '?쇰? 留λ씫? ?좎쓽?섏?留?異붿젙? 愿李?怨쇱? 遺꾨━?댁빞 ?쒕떎怨?留먰빀?덈떎.',
        '?뺤떎???λ㈃怨?洹몃윴 ?붾뒷?댄뀛寃?援щ텇??吏꾩닠?⑸땲??',
      ]
      variant.text = joinSentences([
        `${witness.name} 利앹씤? ${scopeSentence.replace(/\.$/, '')}`,
        tails[index] || tails[0],
      ])
    } else if (entry.depth === 'full') {
      const tails = [
        [
          '吏곸젒 蹂?援ш컙怨??ㅻ뒭寃??뚭쾶 ??援ш컙???섎닠 ?ㅻ챸?⑸땲??',
          '?덈뒗 臾댁뾿??癒쇱? ?됱쑝?ㅻ뒗吏源뚯? ?쒖꽌?濡??뺣━?⑸땲??',
        ],
        [
          '珥덇린 ?λ㈃怨??댄썑 ?뺣━???뚮젮???????ㅻ뒭寃??뚭쾶 ???붿슫 遺遺꾩? ?ㅻⅨ 寃곗?濡? ?곕줈 ?ㅻ뱾怨? ?④퉩?덈떎.',
          '?ㅻⅨ ?먯씠 ???먯씤???⑥쎌? ?섎닠 留먰빀?덈떎.',
        ],
        [
          '?붾㈃?쇰줈 ?뺤씤?섎뒗 ?ъ떎怨? ?⑥옣?먯꽌留??쎄? 遺遺꾩쓣 ?섎닠 ?묎퀎?⑸땲??',
          '洹몃옒??대뒗 留씪???ㅼ뼱吏?????먯? 鍮꾧탳?곸쑝濡?遺꾨챸?섍쾶 ?쒕윭?쒕떎怨?吏꾩닠?⑸땲??',
        ],
      ]
      const chosen = tails[index] || tails[0]
      variant.text = joinSentences([
        `${witness.name} 利앹씤? ${scopeSentence.replace(/\.$/, '')}`,
        chosen[0],
        chosen[1],
      ])
    }
  }
}

function ensureEvidenceKeyword(evidenceId, text) {
  const evidence = evidenceById.get(evidenceId)
  if (!evidence) return text
  if (text.includes(evidence.name) || (evidence.surfaceName && text.includes(evidence.surfaceName))) return text

  const sentences = splitSentences(text).map(normalizeSentence)
  const lead = `증거 ${evidence.name} 기준으로도 같은 흐름이 확인됩니다.`
  if (sentences.length === 0) {
    return lead
  }
  sentences[0] = lead
  return joinSentences(sentences)
}

for (const entry of bundle.channels.interrogation.entries || []) {
  for (let i = 0; i < (entry.variants || []).length; i += 1) {
    const variant = entry.variants[i]
    variant.text = joinSentences(splitSentences(variant.text))
    if (entry.lieState === 'S5') {
      variant.text = ensureS5ThirdSentence({ disputeId: entry.disputeId, text: variant.text }, i)
    }
  }
}

for (const entry of bundle.channels.evidence_present.entries || []) {
  for (const variant of entry.variants || []) {
    variant.text = joinSentences(splitSentences(variant.text))
    variant.text = ensureEvidenceKeyword(entry.evidenceId, variant.text)
    variant.text = joinSentences(splitSentences(variant.text))
  }
}

for (const entry of bundle.channels.witness.entries || []) {
  if (entry.depth === 'partial' || entry.depth === 'full') {
    rewriteWitnessVariant(entry)
  }
  for (const variant of entry.variants || []) {
    variant.text = joinSentences(splitSentences(variant.text))
  }
}

function rewriteWitnessEntriesSafely() {
  for (const entry of bundle.channels.witness.entries || []) {
    const witness = witnessById.get(entry.witnessId)
    if (!witness) continue

    const scope = formalizeKnowledgeScope(witness.knowledgeScope).replace(/\.$/, '')
    const lead = `${witness.name} 증인은 ${scope}`
    const variants = entry.variants || []

    if (entry.depth === 'vague') {
      const tails = [
        '확실한 범위만 먼저 말씀드린다고 진술합니다.',
        '직접 본 장면만 한정해 설명하겠다고 진술합니다.',
        '추정은 빼고 기억나는 사실만 말하겠다고 진술합니다.',
      ]
      for (const [index, variant] of variants.entries()) {
        variant.text = joinSentences([`${lead} ${tails[index] || tails[0]}`])
      }
      continue
    }

    if (entry.depth === 'partial') {
      const tails = [
        '다만 직접 본 장면과 전해 들은 정황은 구분해야 한다고 말합니다.',
        '자기 위치에서 확인한 사실까지만 확실하다고 선을 긋습니다.',
        '해석보다 관찰한 장면부터 정리해야 한다고 진술합니다.',
      ]
      for (const [index, variant] of variants.entries()) {
        variant.text = joinSentences([
          lead,
          tails[index] || tails[0],
        ])
      }
      continue
    }

    if (entry.depth === 'full') {
      const tails = [
        [
          '직접 본 장면과 사후에 확인한 정황을 나눠 설명합니다.',
          '어느 시점부터 대응이 거칠어졌는지도 순서대로 진술합니다.',
        ],
        [
          '초기 장면과 공개 이후 대응을 서로 다른 구간으로 구분해 말합니다.',
          '자기에게 불리한 대목도 기록과 맞춰 설명하겠다고 진술합니다.',
        ],
        [
          '현장에서 본 사실과 뒤늦게 확인한 자료를 따로 묶어 설명합니다.',
          '그래서 누가 어떤 대응을 먼저 바꿨는지까지 비교해 말합니다.',
        ],
      ]
      for (const [index, variant] of variants.entries()) {
        const chosen = tails[index] || tails[0]
        variant.text = joinSentences([
          lead,
          chosen[0],
          chosen[1],
        ])
      }
    }
  }
}

rewriteWitnessEntriesSafely()

fs.writeFileSync(SCRIPTED_PATH, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
console.log(`[headline-01] refined ${path.relative(ROOT, SCRIPTED_PATH)}`)
