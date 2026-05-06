#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { readJson, ensureDir, cleanSentence, paragraph } = require('./scripted-korean-utils.cjs')

function writeJson(filePath, value) {
  ensureDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function makeEntry(speaker, text, relatedDisputes = [], behaviorHint = null) {
  return { speaker, text, relatedDisputes, behaviorHint }
}

function uniqueById(items) {
  const seen = new Set()
  const result = []
  for (const item of items) {
    if (!item || seen.has(item.id)) continue
    seen.add(item.id)
    result.push(item)
  }
  return result
}

function chooseBalancedDispute(disputes) {
  if (!Array.isArray(disputes) || disputes.length === 0) return null
  return [...disputes]
    .sort((left, right) => {
      const leftGap = Math.abs((left.correctResponsibility?.a ?? 50) - (left.correctResponsibility?.b ?? 50))
      const rightGap = Math.abs((right.correctResponsibility?.a ?? 50) - (right.correctResponsibility?.b ?? 50))
      return leftGap - rightGap
    })[0]
}

function chooseProtectiveDispute(disputes) {
  if (!Array.isArray(disputes) || disputes.length === 0) return null
  const protective = disputes.find((item) => /보호|비공개|공개범위|개인정보|접근금지/u.test(item.mediationLink || item.name || ''))
  return protective || disputes[0]
}

function getSolutionCategories(caseData) {
  return Object.keys(caseData.solutions || {})
}

function categoryAt(categories, index, fallback) {
  return cleanSentence(categories[index] || fallback)
}

function buildMediationPaths(caseData) {
  const disputes = caseData.disputes || []
  const categories = getSolutionCategories(caseData)
  const aName = cleanSentence(caseData.duo?.partyA?.name || 'A')
  const bName = cleanSentence(caseData.duo?.partyB?.name || 'B')

  const primary = disputes[0] || null
  const secondary = disputes[1] || primary
  const balanced = chooseBalancedDispute(disputes) || primary
  const protective = chooseProtectiveDispute(disputes) || secondary

  const primaryLink = cleanSentence(primary?.mediationLink || categoryAt(categories, 0, '핵심정리'))
  const secondaryLink = cleanSentence(secondary?.mediationLink || categoryAt(categories, 1, primaryLink))
  const protectiveLink = cleanSentence(protective?.mediationLink || categoryAt(categories, 2, secondaryLink))

  return {
    immediate: {
      judge: '정리된 쟁점을 기준으로 즉시 판단하겠습니다. 판결 단계로 넘어가겠습니다.',
      dialogues: [],
    },
    conditional: {
      judge: paragraph([
        `핵심 책임을 분리한 조건부 조정을 먼저 제시하겠습니다`,
        `${primaryLink}와 ${secondaryLink}를 같은 묶음으로 처리하지는 않겠습니다`,
      ]),
      dialogues: [
        makeEntry(
          'a',
          paragraph([
            `${aName} 쪽은 조건부 조정이라면 받을 수 있습니다`,
            `다만 ${primaryLink}가 먼저 문서화되어야 같은 혼선이 반복되지 않습니다`,
          ]),
          uniqueById([primary, balanced]).map((item) => item.id),
          '조건은 받되 먼저 고정할 선을 분명히 요구한다.',
        ),
        makeEntry(
          'b',
          paragraph([
            `${bName} 쪽도 조건 자체는 들을 수 있습니다`,
            `다만 ${secondaryLink}까지 함께 정리하지 않으면 한쪽 책임만 먼저 굳어질 수 있습니다`,
          ]),
          uniqueById([secondary, protective]).map((item) => item.id),
          '조건부 수용 태도이지만 책임 분리를 강하게 요구한다.',
        ),
      ],
    },
    postpone: {
      judge: paragraph([
        `확정 가능한 사실만 먼저 고정하고 나머지는 보류하겠습니다`,
        `${cleanSentence(balanced?.name || primary?.name || '핵심 쟁점')}은 오늘 단정하지 않겠습니다`,
      ]),
      dialogues: [
        makeEntry(
          'a',
          paragraph([
            `${aName} 쪽은 보류 자체는 받아들일 수 있습니다`,
            `다만 ${cleanSentence(primary?.name || '주된 쟁점')}만큼은 오늘 선을 그어야 추가 혼선이 줄어듭니다`,
          ]),
          uniqueById([primary]).map((item) => item.id),
          '보류는 허용하지만 최소한의 확정선은 오늘 정해 달라고 압박한다.',
        ),
        makeEntry(
          'b',
          paragraph([
            `${bName} 쪽도 섣부른 단정보다 경위를 더 살펴야 한다고 봅니다`,
            `보류가 면책은 아니라는 점만 분명히 해 주십시오`,
          ]),
          uniqueById([balanced, secondary]).map((item) => item.id),
          '유보를 원하지만 보류가 곧 무죄처럼 보이지 않기를 경계한다.',
        ),
      ],
    },
    fact_first: {
      judge: paragraph([
        `해결책보다 사실관계부터 정리하겠습니다`,
        `${cleanSentence(primary?.name || '핵심 쟁점')}과 ${cleanSentence(protective?.name || secondary?.name || '보조 쟁점')}의 경위부터 고정하겠습니다`,
      ]),
      dialogues: [
        makeEntry(
          'a',
          paragraph([
            `${aName} 쪽은 사실부터 정리하는 방식에 동의합니다`,
            `적어도 ${cleanSentence(primary?.name || '핵심 쟁점')}은 기록 기준으로 먼저 고정되어야 합니다`,
          ]),
          uniqueById([primary]).map((item) => item.id),
          '해결책 논의보다 사실 고정을 먼저 요구한다.',
        ),
        makeEntry(
          'b',
          paragraph([
            `${bName} 쪽도 해결책보다 사실 정리가 먼저라면 받아들일 수 있습니다`,
            `다만 ${cleanSentence(protective?.name || secondary?.name || '다른 쟁점')}은 감정과 분리해 봐야 합니다`,
          ]),
          uniqueById([protective, secondary]).map((item) => item.id),
          '사실 우선 정리에는 동의하지만 해석과 낙인을 분리해 달라고 요구한다.',
        ),
      ],
    },
  }
}

function compileMediationDialogues(root, caseKey) {
  const casePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseKey}.json`)
  if (!fs.existsSync(casePath)) {
    throw new Error(`missing generated case: ${path.relative(root, casePath).replace(/\\/g, '/')}`)
  }

  const caseData = readJson(casePath)
  const outPath = path.join(root, 'src', 'data', 'dialogues', 'mediation', `${caseKey}.json`)
  const bundle = {
    caseId: caseData.caseId,
    paths: buildMediationPaths(caseData),
  }

  writeJson(outPath, bundle)
  return { outPath, caseId: caseData.caseId }
}

module.exports = {
  compileMediationDialogues,
}
