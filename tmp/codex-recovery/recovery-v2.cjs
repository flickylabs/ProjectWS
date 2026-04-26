#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../..')
const OUT_DIR = path.join(ROOT, 'tmp', 'codex-recovery')
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01']
const EXPECTED_COUNTS = {
  'spouse-01': 4677,
  'family-01': 5172,
  'friend-01': 5082,
}
const TOTAL_EXPECTED = 14931
const MAX_ROUNDS = 5

const SPECIALISTS = {
  A_TruthLeak: 'A-proposals.json',
  B_JudgeTone: 'B-proposals.json',
  C_FactCheck: 'C-proposals.json',
  D_KoreanQ: 'D-proposals.json',
  E_UserPattern: 'E-proposals.json',
}

const JUDGE_CHANNELS = new Set([
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'evidence_discovery',
])

const NPC_CHANNELS = new Set([
  'interrogation',
  'evidence_present',
  'dossier',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'trust_action',
  'rapport_milestone',
  'contradict_milestone',
  'mediation',
])

const TRUTH_REPLACEMENTS = {
  'spouse-01': [
    [/형의\s*문자\s*내용/g, '발신자 미상 문자 내용'],
    [/형\s*문자\s*스레드/g, '발신자 미상 문자'],
    [/형의\s*문자/g, '발신자 미상 문자'],
    [/형\s*문자/g, '발신자 미상 문자'],
    [/형에게\s*간\s*돈/g, '그쪽으로 간 돈'],
    [/형에게/g, '그쪽에'],
    [/형한테/g, '그쪽에'],
    [/형의\s*개인회생\s*사정/g, '그쪽 개인 사정'],
    [/형의\s*생활\s*사정/g, '그쪽 생활 사정'],
    [/형의\s*체면/g, '그쪽 체면'],
    [/형의\s*사정/g, '그쪽 사정'],
    [/형\s*사정/g, '그쪽 사정'],
    [/형\s*얘기/g, '그쪽 이야기'],
    [/형\s*이야기/g, '그쪽 이야기'],
    [/형을\s*도운/g, '그쪽을 도운'],
    [/형을/g, '그쪽을'],
    [/형이/g, '그쪽이'],
    [/형은/g, '그쪽은'],
    [/친형/g, '가족'],
    [/형네/g, '그 가족 쪽'],
    [/형·그 가족/g, '그 가족'],
    [/형과\s*조카/g, '그 가족'],
    [/형\s*쪽/g, '그 가족 쪽'],
    [/조카\s*학교\s*알림/g, '발신자 미상 문자'],
    [/조카\s*관련\s*문자/g, '발신자 미상 문자'],
    [/조카\s*사정/g, '그 가족 사정'],
    [/조카/g, '그 가족'],
    [/시댁\s*갈등/g, '가족 안의 갈등'],
    [/시댁\s*불화/g, '가족 안의 불화'],
    [/시댁\s*이야기/g, '가족 안의 이야기'],
    [/시댁\s*문제/g, '가족 안의 문제'],
    [/시댁\s*싸움/g, '가족 안의 큰 싸움'],
    [/시댁\s*일/g, '가족 안의 일'],
    [/시댁/g, '가족 안'],
    [/위임장\s*조작/g, '해지 서류 절차 문제'],
    [/위조된\s*위임장/g, '문제가 된 해지 서류'],
    [/위임장/g, '해지 서류'],
    [/투자\s*사기\s*경위/g, '투자 손실 경위'],
    [/투자\s*사기/g, '투자 손실'],
    [/형\s*빚/g, '그쪽 채무'],
    [/형의\s*빚/g, '그쪽 채무'],
    [/3,000\s*만\s*원/g, '큰돈'],
    [/3,000만원/g, '큰돈'],
    [/2,000\s*만\s*원/g, '다른 큰돈'],
    [/2,000만원/g, '다른 큰돈'],
    [/5,000\s*만\s*원/g, '두 큰돈'],
    [/5,000만원/g, '두 큰돈'],
    [/그 가족을\s*돌본\s*것/g, '그 가족 일을 챙긴 것'],
    [/그 가족을\s*돌본\s*일/g, '그 가족 일을 챙긴 사정'],
    [/그 가족을\s*돌본\s*사실/g, '그 가족 일을 챙긴 사정'],
    [/그 가족을\s*돌본/g, '그 가족 일을 챙긴'],
    [/그 가족을\s*도운\s*것/g, '그 가족 쪽으로 기운 것'],
    [/그 가족을\s*도운\s*배경/g, '그 가족 쪽으로 기운 배경'],
    [/그 가족을\s*도운\s*흐름/g, '그 가족 쪽으로 간 흐름'],
    [/그 가족을\s*도운\s*일/g, '그 가족 쪽 일을 챙긴 것'],
    [/그 가족을\s*도운/g, '그 가족 쪽으로 기운'],
    [/가족을\s*돌본\s*것/g, '그곳에 갔다는 설명'],
    [/가족을\s*돌본\s*일/g, '숨긴 방문 사정'],
    [/가족을\s*돌본/g, '그곳에 갔다는'],
    [/가족을\s*도운\s*것/g, '숨긴 사정'],
    [/가족을\s*도운\s*배경/g, '숨긴 배경'],
    [/가족을\s*도운\s*흐름/g, '숨긴 돈 흐름'],
    [/가족을\s*도운\s*일/g, '숨긴 일'],
    [/가족을\s*도운/g, '숨긴'],
    [/숨긴\s*돌봄/g, '숨긴 사정'],
    [/돌봄\s*해석/g, '방문 해석'],
    [/돌봄/g, '방문 이유'],
  ],
  'family-01': [
    [/출생\s*비밀/g, '민감한 가족 사정'],
    [/배다른\s*자식/g, '민감한 가족 사정'],
    [/배다른/g, '가족관계가 다른'],
    [/혈연이\s*다른/g, '가족관계가 다른'],
    [/혈연\s*다른/g, '가족관계가 다른'],
    [/혈연/g, '가족관계'],
    [/20년\s*동안/g, '오랜 기간'],
    [/20년/g, '오랜 기간'],
    [/정후\s*돈/g, '한쪽 돈'],
    [/동생\s*돈/g, '한쪽 돈'],
    [/형\s*공장\s*자금/g, '공장 자금'],
    [/90\s*대\s*10/g, '원본 비율'],
    [/90:10/g, '원본 비율'],
    [/60\s*대\s*40/g, '변경된 비율'],
    [/60:40/g, '변경된 비율'],
    [/90을\s*40으로/g, '원본 비율을 다른 비율로'],
    [/어머니의\s*뜻/g, '남겨진 뜻'],
  ],
  'friend-01': [
    [/아버지의\s*사기/g, '과거 돈 문제'],
    [/아버지\s*사기/g, '과거 돈 문제'],
    [/아버지의\s*돈\s*문제/g, '송금 흐름의 출처'],
    [/아버지\s*돈/g, '그 돈'],
    [/돈\s*갈취/g, '돈 문제'],
    [/돈을\s*가져간/g, '돈 흐름을 만든'],
    [/돈을\s*떼/g, '돈 문제를 만든'],
    [/사기\s*피해/g, '과거 피해'],
    [/예비\s*신랑이\s*먼저\s*선을\s*넘/g, '대화의 선후가 뒤집히'],
    [/예비\s*신랑이\s*먼저/g, '대화의 선후가 먼저'],
    [/선\s*넘은\s*메시지/g, '문제가 된 메시지'],
    [/같은\s*패턴이?\s*반복/g, '비슷한 구조가 반복'],
    [/같은\s*패턴/g, '비슷한 구조'],
    [/반복된\s*패턴/g, '반복된 구조'],
    [/9일/g, '여러 날'],
    [/6번/g, '여러 번'],
    [/11번/g, '여러 번'],
  ],
}

const TRUTH_DETECTORS = {
  'spouse-01': [
    ['evidence_truth_name', /형\s*문자|형의\s*문자|조카\s*학교\s*알림|조카\s*관련\s*문자|친형\s*문자/u],
    ['family_secret', /친형|형네|형과\s*조카|조카|형에게|형한테|형의\s*(사정|개인회생\s*사정|생활\s*사정|체면)|형\s*(사정|얘기|이야기|쪽)|형을\s*도운|형을|형이|형은|시댁\s*(갈등|불화|이야기|문제|싸움|일)|형\s*빚|형의\s*빚/u],
    ['money_secret', /위임장\s*조작|위임장|투자\s*사기|3,000\s*만\s*원|3,000만원|2,000\s*만\s*원|2,000만원|5,000\s*만\s*원|5,000만원/u],
    ['care_truth', /가족을\s*(돌본|도운)|숨긴\s*돌봄|돌봄\s*해석/u],
  ],
  'family-01': [
    ['birth_secret', /출생\s*비밀|배다른|혈연/u],
    ['ratio_secret', /90\s*대\s*10|90:10|60\s*대\s*40|60:40|90을\s*40으로/u],
    ['support_secret', /20년|정후\s*돈|동생\s*돈|형\s*공장\s*자금/u],
  ],
  'friend-01': [
    ['father_scam', /아버지의\s*사기|아버지\s*사기|돈\s*갈취|돈을\s*가져간|돈을\s*떼|사기\s*피해/u],
    ['fiance_first', /예비\s*신랑이\s*먼저|선\s*넘은\s*메시지/u],
    ['pattern_repeat', /같은\s*패턴|반복된\s*패턴|9일|6번|11번/u],
  ],
}

const MACHINE_TONE_REPLACEMENTS = [
  [/태도에\s*변화가\s*감지됩니다/g, '진술이 달라지기 시작합니다'],
  [/변화가\s*감지됩니다/g, '말이 달라지고 있습니다'],
  [/내용이\s*확인됩니다/g, '내용을 다시 짚겠습니다'],
  [/흐름이\s*확인됩니다/g, '흐름을 다시 짚겠습니다'],
  [/확인됩니다/g, '확인하겠습니다'],
  [/패턴이\s*검출되었습니다/g, '말이 맞지 않습니다'],
  [/검출되었습니다/g, '드러났습니다'],
  [/변화가\s*관찰됩니다/g, '말이 달라지고 있습니다'],
  [/관찰됩니다/g, '보입니다'],
  [/변동이\s*추적됩니다/g, '흐름이 달라졌습니다'],
  [/추적됩니다/g, '따라가 보겠습니다'],
  [/패턴이\s*나타납니다/g, '말이 반복됩니다'],
  [/나타납니다/g, '보입니다'],
  [/흐름이\s*보입니다/g, '흐름이 이어집니다'],
]

const KOREAN_REPLACEMENTS = [
  [/것는/g, '것은'],
  [/것를/g, '것을'],
  [/것와/g, '것과'],
  [/것였/g, '것이었'],
  [/것로(?!써)/g, '것으로'],
  [/그 가족를/g, '그 가족을'],
  [/그 가족가/g, '그 가족이'],
  [/그 가족였다/g, '그 가족이었다'],
  [/된\s*것으로\s*생각됩니다/g, '됐다고 봅니다'],
  [/인\s*측면이\s*있었습니다/g, '부분이 있었습니다'],
  [/부득이하게/g, '어쩔 수 없이'],
  [/사전\s*상의/g, '미리 상의'],
  [/사전\s*협의/g, '미리 협의'],
  [/미리\s*말씀드리지\s*못한/g, '말하지 못한'],
  [/을\s*통하여/g, '으로'],
  [/를\s*통하여/g, '로'],
  [/에\s*대해서/g, '에 관해'],
  [/만을/g, '만'],
  [/이제도/g, '지금도'],
  [/정확한\s*진술\s*부탁드립니다/g, '정확하게 진술해 주십시오'],
  [/분명한\s*해명이\s*필요합니다/g, '분명히 해명해 주셔야 합니다'],
  [/가족\s*돌봄/g, '가족 일을 챙긴 것'],
  [/가족\s*지원/g, '가족 쪽을 챙긴 것'],
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/')
}

function scriptedPath(caseId) {
  return path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)
}

function runtimePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
}

function dossierPath(caseId) {
  if (caseId === 'spouse-01') {
    return path.join(ROOT, 'src', 'data', 'claimPolicies', 'spouse-01-v3-game-loop-data.json')
  }
  return path.join(ROOT, 'src', 'data', 'claimPolicies', `${caseId}-dossier-cards.json`)
}

function collectDossierCards(caseId) {
  const filePath = dossierPath(caseId)
  if (!fs.existsSync(filePath)) return []
  const data = readJson(filePath)
  return Array.isArray(data.dossierCards) ? data.dossierCards : []
}

function buildFactMatrix() {
  const matrix = {}
  for (const caseId of CASE_IDS) {
    const runtimeCase = readJson(runtimePath(caseId))
    const parties = {
      a: runtimeCase.duo?.partyA || {},
      b: runtimeCase.duo?.partyB || {},
    }
    const dossierCards = collectDossierCards(caseId).map((card) => ({
      id: card.id,
      name: card.name,
      description: card.description,
      evidenceIds: card.evidenceIds || [],
      relatedDisputes: card.relatedDisputes || [],
      questions: (card.challenges || []).flatMap((challenge) =>
        (challenge.questions || []).map((q) => ({
          targetParty: challenge.targetParty,
          id: q.id,
          text: q.text,
          requiredLieState: q.requiredLieState,
        })),
      ),
    }))
    matrix[caseId] = {
      caseId,
      title: runtimeCase.meta?.title,
      anchorTruth: runtimeCase.meta?.anchorTruth,
      resolutionDilemma: runtimeCase.meta?.resolutionDilemma,
      relationshipType: runtimeCase.meta?.relationshipType || runtimeCase.duo?.relationshipType,
      parties: {
        a: {
          name: parties.a.name,
          archetype: parties.a.archetype,
          callTerms: parties.a.callTerms || {},
          verbalTells: parties.a.verbalTells || [],
        },
        b: {
          name: parties.b.name,
          archetype: parties.b.archetype,
          callTerms: parties.b.callTerms || {},
          verbalTells: parties.b.verbalTells || [],
        },
      },
      evidence: (runtimeCase.evidence || []).map((item) => ({
        id: item.id,
        surfaceName: item.surfaceName || item.title || '',
        name: item.name || '',
      })),
      disputes: (runtimeCase.disputes || []).map((item) => ({
        id: item.id,
        name: item.name,
        truthDescription: item.truthDescription,
        judgmentStatement: item.judgmentStatement,
      })),
      dossierCards,
    }
  }
  writeJson(path.join(OUT_DIR, 'fact-matrix.json'), matrix)
  return matrix
}

function readBundles() {
  const bundles = {}
  for (const caseId of CASE_IDS) {
    bundles[caseId] = readJson(scriptedPath(caseId))
  }
  return bundles
}

function writeBundles(bundles) {
  for (const caseId of CASE_IDS) {
    writeJson(scriptedPath(caseId), bundles[caseId])
  }
}

function hasTag(variant, value) {
  return Array.isArray(variant.tags) && variant.tags.includes(value)
}

function findTag(variant, prefix) {
  return Array.isArray(variant.tags)
    ? variant.tags.find((tag) => String(tag).startsWith(prefix))
    : undefined
}

function channelIsJudge(channel, variant) {
  return JUDGE_CHANNELS.has(channel) || hasTag(variant, 'speaker:judge') || channel === 'system_message'
}

function channelIsNpc(channel, variant) {
  return NPC_CHANNELS.has(channel) && !channelIsJudge(channel, variant)
}

function isEarlyDisclosure(entry, variant, channel) {
  if (channel === 'system_message' || channel === 'mediation') return true
  if (entry.lieState && ['S0', 'S1', 'S2'].includes(entry.lieState)) return true
  if (entry.lieState) return false
  if (entry.lieBand && ['early', 'mid'].includes(entry.lieBand)) return true
  if (entry.lieBand) return false
  if (['none', 'hint', 'partial'].includes(entry.truthLevel)) return true
  const revealTag = findTag(variant, 'reveal:')
  if (revealTag && ['reveal:none', 'reveal:hint', 'reveal:partial'].includes(revealTag)) return true
  return false
}

function getParty(entry, variant) {
  if (entry.party === 'a' || entry.party === 'b') return entry.party
  const speaker = findTag(variant, 'speaker:')
  if (speaker === 'speaker:a') return 'a'
  if (speaker === 'speaker:b') return 'b'
  return null
}

function variantKey(caseId, channel, entry, variant) {
  return [
    caseId,
    channel,
    entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry',
    variant.id || 'variant',
  ].join('::')
}

function walkVariants(bundles, callback) {
  for (const caseId of CASE_IDS) {
    const bundle = bundles[caseId]
    for (const [channel, payload] of Object.entries(bundle.channels || {})) {
      for (const entry of payload.entries || []) {
        for (const variant of entry.variants || []) {
          callback({ caseId, bundle, channel, entry, variant })
        }
      }
    }
  }
}

function makeMetadataSnapshot(bundles) {
  const snapshot = {}
  walkVariants(bundles, ({ caseId, channel, entry, variant }) => {
    const key = variantKey(caseId, channel, entry, variant)
    snapshot[key] = {
      caseId,
      channel,
      entryKey: entry.key || null,
      entryStatus: entry.status || null,
      variantId: variant.id || null,
      variantStatus: variant.status || null,
      text: variant.text || '',
      behaviorHint: variant.behaviorHint || null,
      tags: variant.tags || null,
      sourceRefs: variant.sourceRefs || null,
    }
  })
  writeJson(path.join(OUT_DIR, 'baseline-metadata.json'), snapshot)
  return snapshot
}

function shouldSkipPatch(entry, variant) {
  return entry.status === 'skipped' || variant.status === 'skipped'
}

function applyReplacementList(text, replacements) {
  let next = text
  for (const [pattern, replacement] of replacements) {
    next = next.replace(pattern, replacement)
  }
  return next
}

function truthPolicyActive(caseId, channel, entry, variant) {
  if (channel === 'aftermath') return false
  if (channelIsJudge(channel, variant)) return true
  if (channel === 'system_message' || channel === 'mediation') return true
  if (channelIsNpc(channel, variant)) return isEarlyDisclosure(entry, variant, channel)
  return false
}

function truthHits(caseId, text, channel, entry, variant) {
  if (!truthPolicyActive(caseId, channel, entry, variant)) return []
  const hits = []
  for (const [code, pattern] of TRUTH_DETECTORS[caseId] || []) {
    if (pattern.test(text)) hits.push(code)
  }
  return hits
}

function applyTruthFixes(text, ctx) {
  if (!truthPolicyActive(ctx.caseId, ctx.channel, ctx.entry, ctx.variant)) return text
  return applyReplacementList(text, TRUTH_REPLACEMENTS[ctx.caseId] || [])
}

function applyJudgeToneFixes(text, ctx) {
  if (!channelIsJudge(ctx.channel, ctx.variant) && ctx.channel !== 'system_message') return text
  let next = applyReplacementList(text, MACHINE_TONE_REPLACEMENTS)
  next = next
    .replace(/[“"']([^“”"']{20,})[”"']라고\s+하셨/g, '앞서 $1 취지로 말씀하셨')
    .replace(/[“"']([^“”"']{20,})[”"']라고\s+답하셨/g, '앞서 $1 취지로 답하셨')
    .replace(/[“"']([^“”"']{20,})[”"']라고\s+말씀하셨/g, '앞서 $1 취지로 말씀하셨')
    .replace(/어느\s*쪽이\s*사실입니까/g, '어느 진술이 사실입니까')
    .replace(/어느\s*쪽이\s*맞습니까/g, '어느 입장이 맞습니까')
    .replace(/중\s*어느\s*쪽이\s*더\s*컸습니까/g, '중 무엇이 더 컸습니까')
    .replace(/중\s*어느\s*쪽이\s*더\s*큽니까/g, '중 무엇이 더 큽니까')
    .replace(/중\s*어느\s*쪽입니까/g, '중 무엇입니까')
    .replace(/어느\s*쪽이\s*더\s*컸습니까/g, '무엇이 더 컸습니까')
    .replace(/어느\s*쪽이\s*더\s*무겁게\s*남습니까/g, '무엇이 더 무겁게 남습니까')
    .replace(/어느\s*쪽이\s*먼저였습니까/g, '무엇이 먼저였습니까')
    .replace(/어느\s*쪽\s*책임/g, '어느 책임')
    .replace(/그쪽\s*입장/g, '그 입장')
    .replace(/그쪽/g, '그 입장')
    .replace(/쪽이었는데/g, '주장이었는데')
    .replace(/쪽입니다/g, '주장입니다')
    .replace(/쪽으로/g, '방향으로')
    .replace(/쪽에서/g, '입장에서')
    .replace(/쪽은/g, '입장은')
    .replace(/쪽을/g, '입장을')
    .replace(/부인하셨/g, '부정하셨')
    .replace(/부인하지/g, '부정하지')
    .replace(/부인하십/g, '부정하십')
    .replace(/부인/g, '부정')
    .replace(/입장을\s*옮기셨습니다/g, '말씀이 달라졌습니다')
    .replace(/입장을\s*옮겼습니다/g, '말이 달라졌습니다')
    .replace(/정확한\s*진술\s*부탁드립니다/g, '정확하게 진술해 주십시오')
    .replace(/분명한\s*해명이\s*필요합니다/g, '분명히 해명해 주셔야 합니다')
    .replace(/말하십시오/g, '말씀해 주십시오')
  return next
}

function applyFactFixes(text, ctx) {
  let next = text
  if (ctx.caseId === 'family-01') {
    next = next
      .replace(/형\s*60\s*[,·와과 ]{0,8}저\s*40/g, '형 몫을 앞세운 비율')
      .replace(/제가\s*60\s*[,·와과 ]{0,8}동생\s*40/g, '제가 더 받는 비율')
      .replace(/90을\s*40으로/g, '원본 비율을 다른 비율로')
  }
  if (ctx.caseId === 'spouse-01') {
    next = next
      .replace(/공동\s*적금\s*2,000\s*만\s*원/g, '공동 적금')
      .replace(/공동\s*적금\s*2,000만원/g, '공동 적금')
  }
  return next
}

function applyKoreanFixes(text) {
  return applyReplacementList(text, KOREAN_REPLACEMENTS)
}

function applyUserPatternFixes(text, ctx) {
  let next = text
  if (channelIsJudge(ctx.channel, ctx.variant)) {
    next = next
      .replace(/무엇을\s*알고\s*있었습니까/g, '왜 그렇게 판단하셨습니까')
      .replace(/무엇을\s*알고\s*있었는지/g, '왜 그렇게 판단했는지')
      .replace(/무엇을\s*했습니까/g, '왜 그렇게 행동했습니까')
      .replace(/무엇을\s*했는지/g, '왜 그렇게 행동했는지')
      .replace(/흐리면/g, '밝히지 않으면')
      .replace(/흐리지\s*마십시오/g, '밝혀 주십시오')
      .replace(/가족\s*돌봄/g, '가족 일을 챙긴 것')
      .replace(/가족\s*지원/g, '가족 쪽을 챙긴 것')
  }
  return next
}

function detectJudgeToneIssues(text, ctx) {
  if (!channelIsJudge(ctx.channel, ctx.variant) && ctx.channel !== 'system_message') return []
  const issues = []
  const checks = [
    ['machine_tone', /감지됩니다|확인됩니다|검출되었습니다|관찰됩니다|추적됩니다|패턴이\s*나타납니다/u],
    ['direct_quote', /[“"'][^“”"']{20,}[”"']라고\s+(하셨|답하셨|말씀하셨)/u],
    ['ambiguous_side', /어느\s*쪽|그쪽|쪽이었는데|쪽입니다|쪽으로|쪽에서|쪽은|쪽을/u],
    ['judge_denial_word', /부인/u],
    ['awkward_nominal', /가족\s*돌봄|가족\s*지원|분명한\s*해명|정확한\s*진술\s*부탁드립니다|입장을\s*옮기/u],
  ]
  for (const [code, pattern] of checks) {
    if (pattern.test(text)) issues.push(code)
  }
  return issues
}

function detectKoreanIssues(text) {
  const issues = []
  const checks = [
    ['broken_particle', /것는|것를|것와|것였|것로(?!써)|그 가족를|그 가족가|그 가족였다/u],
    ['translationese', /된\s*것으로\s*생각됩니다|인\s*측면이\s*있었습니다|부득이하게|사전\s*(상의|협의)|미리\s*말씀드리지\s*못한|을\s*통하여|를\s*통하여|에\s*대해서|만을/u],
  ]
  for (const [code, pattern] of checks) {
    if (pattern.test(text)) issues.push(code)
  }
  return issues
}

function detectFactIssues(text, ctx) {
  const issues = []
  if (ctx.caseId === 'family-01' && /형\s*60\s*[,·와과 ]{0,8}저\s*40|제가\s*60\s*[,·와과 ]{0,8}동생\s*40|90을\s*40으로/u.test(text)) {
    issues.push('family_ratio_conflict')
  }
  if (ctx.caseId === 'spouse-01' && /공동\s*적금\s*2,000\s*만\s*원|공동\s*적금\s*2,000만원/u.test(text)) {
    issues.push('spouse_amount_conflict')
  }
  return issues
}

function detectUserPatternIssues(text, ctx) {
  const issues = []
  if (!channelIsJudge(ctx.channel, ctx.variant)) return issues
  const checks = [
    ['patch1_weaken_side', /쪽이었는데|쪽입니다/u],
    ['patch2_motive', /무엇을\s*(알고|했)/u],
    ['patch3_direct', /흐리면|흐리지/u],
    ['patch4_verb', /가족\s*(돌봄|지원)/u],
  ]
  for (const [code, pattern] of checks) {
    if (pattern.test(text)) issues.push(code)
  }
  return issues
}

function proposalFor(ctx, specialist, before, suggested, reasonCodes) {
  return {
    variantKey: variantKey(ctx.caseId, ctx.channel, ctx.entry, ctx.variant),
    caseId: ctx.caseId,
    channel: ctx.channel,
    entryKey: ctx.entry.key || null,
    variantId: ctx.variant.id,
    before,
    suggested,
    reason: reasonCodes.join(', '),
    archetypeGuard: getParty(ctx.entry, ctx.variant)
      ? ctx.matrix[ctx.caseId].parties[getParty(ctx.entry, ctx.variant)]?.archetype || null
      : null,
    skipped: shouldSkipPatch(ctx.entry, ctx.variant),
    specialist,
  }
}

function detectAll(bundles, matrix) {
  const proposals = Object.fromEntries(Object.keys(SPECIALISTS).map((name) => [name, []]))
  walkVariants(bundles, ({ caseId, channel, entry, variant }) => {
    const before = String(variant.text || '')
    const ctx = { caseId, channel, entry, variant, matrix }
    if (shouldSkipPatch(entry, variant)) return

    const truthCodes = truthHits(caseId, before, channel, entry, variant)
    if (truthCodes.length) {
      const suggested = applyTruthFixes(before, ctx)
      proposals.A_TruthLeak.push(proposalFor(ctx, 'A_TruthLeak', before, suggested, truthCodes))
    }

    const toneCodes = detectJudgeToneIssues(before, ctx)
    if (toneCodes.length) {
      const suggested = applyJudgeToneFixes(before, ctx)
      proposals.B_JudgeTone.push(proposalFor(ctx, 'B_JudgeTone', before, suggested, toneCodes))
    }

    const factCodes = detectFactIssues(before, ctx)
    if (factCodes.length) {
      const suggested = applyFactFixes(before, ctx)
      proposals.C_FactCheck.push(proposalFor(ctx, 'C_FactCheck', before, suggested, factCodes))
    }

    const koreanCodes = detectKoreanIssues(before)
    if (koreanCodes.length) {
      const suggested = applyKoreanFixes(before)
      proposals.D_KoreanQ.push(proposalFor(ctx, 'D_KoreanQ', before, suggested, koreanCodes))
    }

    const userCodes = detectUserPatternIssues(before, ctx)
    if (userCodes.length) {
      const suggested = applyUserPatternFixes(before, ctx)
      proposals.E_UserPattern.push(proposalFor(ctx, 'E_UserPattern', before, suggested, userCodes))
    }
  })
  return proposals
}

function applyCoordinatorFixes(text, ctx) {
  let next = text
  next = applyTruthFixes(next, ctx)
  next = applyFactFixes(next, ctx)
  next = applyJudgeToneFixes(next, ctx)
  next = applyKoreanFixes(next)
  next = applyUserPatternFixes(next, ctx)
  return next
}

function applyBehaviorHintFixes(text, ctx) {
  if (!text) return text
  let next = text
  if (truthPolicyActive(ctx.caseId, ctx.channel, ctx.entry, ctx.variant)) {
    next = applyTruthFixes(next, ctx)
  }
  if (channelIsJudge(ctx.channel, ctx.variant) || ctx.channel === 'system_message') {
    next = applyJudgeToneFixes(next, ctx)
  }
  next = applyKoreanFixes(next)
  return next
}

function applyRound(bundles, matrix) {
  const patches = []
  walkVariants(bundles, ({ caseId, channel, entry, variant }) => {
    if (shouldSkipPatch(entry, variant)) return
    const before = String(variant.text || '')
    const ctx = { caseId, channel, entry, variant, matrix }
    const after = applyCoordinatorFixes(before, ctx)
    const beforeHint = typeof variant.behaviorHint === 'string' ? variant.behaviorHint : null
    const afterHint = beforeHint === null ? null : applyBehaviorHintFixes(beforeHint, ctx)
    if (after !== before || afterHint !== beforeHint) {
      variant.text = after
      if (afterHint !== beforeHint) variant.behaviorHint = afterHint
      patches.push({
        variantKey: variantKey(caseId, channel, entry, variant),
        caseId,
        channel,
        entryKey: entry.key || null,
        variantId: variant.id,
        before,
        after,
        behaviorHintBefore: beforeHint,
        behaviorHintAfter: afterHint,
        archetypeGuard: getParty(entry, variant)
          ? matrix[caseId].parties[getParty(entry, variant)]?.archetype || null
          : null,
      })
    }
  })
  return patches
}

function summarizeProposals(proposals) {
  return Object.fromEntries(Object.entries(proposals).map(([name, list]) => [name, list.length]))
}

function countVariants(bundles) {
  const counts = {}
  let total = 0
  for (const caseId of CASE_IDS) {
    let count = 0
    const byChannel = {}
    for (const [channel, payload] of Object.entries(bundles[caseId].channels || {})) {
      const channelCount = (payload.entries || []).reduce((sum, entry) => sum + (entry.variants || []).length, 0)
      byChannel[channel] = channelCount
      count += channelCount
    }
    counts[caseId] = { total: count, byChannel }
    total += count
  }
  counts.total = total
  return counts
}

function writeRoundOutputs(round, proposals, patches, residual, crossValidation) {
  const dir = path.join(OUT_DIR, `round-${round}`)
  ensureDir(dir)
  for (const [name, file] of Object.entries(SPECIALISTS)) {
    writeJson(path.join(dir, file), proposals[name])
  }
  writeJson(path.join(dir, 'coordinated-patches.json'), patches)
  writeJson(path.join(dir, 'cross-validation.json'), crossValidation)
  writeJson(path.join(dir, 'residual-issues.json'), residual)
}

function residualSummary(proposals) {
  const detections = summarizeProposals(proposals)
  const total = Object.values(detections).reduce((sum, count) => sum + count, 0)
  return { detections, total }
}

function createPolishCandidates(bundles) {
  const candidates = []
  const abstractPattern = /그\s*(부분|흐름|점|말|쪽)|자료가\s*흐름을\s*보여|답해\s*주십시오$/u
  walkVariants(bundles, ({ caseId, channel, entry, variant }) => {
    const text = String(variant.text || '')
    if (!text) return
    if (candidates.length >= 250) return
    if (abstractPattern.test(text) || text.length > 110) {
      candidates.push({
        variantKey: variantKey(caseId, channel, entry, variant),
        caseId,
        channel,
        entryKey: entry.key || null,
        variantId: variant.id,
        text,
        reason: abstractPattern.test(text) ? 'abstract_or_boilerplate_candidate' : 'long_line_candidate',
      })
    }
  })
  writeJson(path.join(OUT_DIR, 'claude-polish-candidates.json'), candidates)
  return candidates
}

function inspectMetadataPreservation(currentBundles, baseline) {
  const issues = []
  const current = {}
  walkVariants(currentBundles, ({ caseId, channel, entry, variant }) => {
    current[variantKey(caseId, channel, entry, variant)] = {
      caseId,
      channel,
      entryKey: entry.key || null,
      entryStatus: entry.status || null,
      variantId: variant.id || null,
      variantStatus: variant.status || null,
      text: variant.text || '',
      behaviorHint: variant.behaviorHint || null,
      tags: variant.tags || null,
      sourceRefs: variant.sourceRefs || null,
    }
  })
  for (const [key, before] of Object.entries(baseline)) {
    const after = current[key]
    if (!after) {
      issues.push({ severity: 'FAIL', type: 'missing_variant', key })
      continue
    }
    for (const field of ['caseId', 'channel', 'entryKey', 'entryStatus', 'variantId', 'variantStatus']) {
      if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
        issues.push({ severity: 'FAIL', type: 'metadata_changed', key, field, before: before[field], after: after[field] })
      }
    }
    for (const field of ['tags', 'sourceRefs']) {
      if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
        issues.push({ severity: 'FAIL', type: 'metadata_changed', key, field })
      }
    }
    if ((before.entryStatus === 'skipped' || before.variantStatus === 'skipped') && before.text !== after.text) {
      issues.push({ severity: 'FAIL', type: 'skipped_text_changed', key, before: before.text, after: after.text })
    }
  }
  for (const key of Object.keys(current)) {
    if (!baseline[key]) issues.push({ severity: 'FAIL', type: 'new_variant', key })
  }
  return issues
}

function runPrecheck(options = {}) {
  const bundles = readBundles()
  const matrix = fs.existsSync(path.join(OUT_DIR, 'fact-matrix.json'))
    ? readJson(path.join(OUT_DIR, 'fact-matrix.json'))
    : buildFactMatrix()
  const counts = countVariants(bundles)
  const proposals = detectAll(bundles, matrix)
  const residual = residualSummary(proposals)
  const issues = []

  for (const caseId of CASE_IDS) {
    if (counts[caseId].total !== EXPECTED_COUNTS[caseId]) {
      issues.push({ severity: 'FAIL', type: 'variant_count', caseId, expected: EXPECTED_COUNTS[caseId], actual: counts[caseId].total })
    }
  }
  if (counts.total !== TOTAL_EXPECTED) {
    issues.push({ severity: 'FAIL', type: 'total_variant_count', expected: TOTAL_EXPECTED, actual: counts.total })
  }

  for (const [specialist, list] of Object.entries(proposals)) {
    for (const item of list) {
      issues.push({
        severity: item.specialist === 'A_TruthLeak' || item.specialist === 'C_FactCheck' ? 'FAIL' : 'WARN',
        type: specialist,
        variantKey: item.variantKey,
        reason: item.reason,
        text: item.before,
      })
    }
  }

  const baselinePath = path.join(OUT_DIR, 'baseline-metadata.json')
  let metadataIssues = []
  if (fs.existsSync(baselinePath)) {
    metadataIssues = inspectMetadataPreservation(bundles, readJson(baselinePath))
    issues.push(...metadataIssues)
  }

  const knownIssues = [
    {
      type: 'scope_excluded_d5_generation',
      severity: 'KNOWN',
      cases: ['family-01', 'friend-01'],
      note: 'family/friend d-5 신규 cell 생성은 본 복구 범위에서 제외한다.',
    },
  ]

  const failed = issues.some((issue) => issue.severity === 'FAIL')
  const report = {
    passed: !failed,
    counts,
    residual,
    issues,
    metadataIssues,
    knownIssues,
  }
  if (options.write !== false) {
    writeJson(path.join(OUT_DIR, 'precheck-after.json'), report)
  }
  return report
}

function writePrecheckScript() {
  const body = `#!/usr/bin/env node
'use strict'

const { runPrecheck } = require('./recovery-v2.cjs')

const report = runPrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  totalVariants: report.counts.total,
  residualTotal: report.residual.total,
  failCount: report.issues.filter((issue) => issue.severity === 'FAIL').length,
  warnCount: report.issues.filter((issue) => issue.severity === 'WARN').length,
  knownIssues: report.knownIssues.length,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`
  fs.writeFileSync(path.join(OUT_DIR, 'precheck-comprehensive.cjs'), body, 'utf8')
}

function writeFinalReport({ roundLog, precheck, polishCandidates, validation }) {
  const totalApplied = roundLog.rounds.reduce((sum, round) => sum + round.applied, 0)
  const lines = [
    '# Codex Recovery v2 Final Report',
    '',
    '## 작업 요약',
    `- 전수 대상: ${TOTAL_EXPECTED.toLocaleString('ko-KR')} variants`,
    `- 적용 patch: ${totalApplied.toLocaleString('ko-KR')}건`,
    `- 종료 사유: ${roundLog.terminationReason}`,
    `- d-5 신규 cell: 범위 제외 known issue로 분리`,
    `- case data 직접 수정: 없음`,
    '',
    '## 라운드 진행 추적',
    '',
    '| Round | A | B | C | D | E | 적용 | 잔여 | 수렴 |',
    '|---:|---:|---:|---:|---:|---:|---:|---:|---|',
    ...roundLog.rounds.map((round) => `| ${round.round} | ${round.detections.A_TruthLeak} | ${round.detections.B_JudgeTone} | ${round.detections.C_FactCheck} | ${round.detections.D_KoreanQ} | ${round.detections.E_UserPattern} | ${round.applied} | ${round.residual} | ${round.convergence ? 'yes' : 'no'} |`),
    '',
    '## 자체 검증 결과',
    `- scope-aware precheck: ${precheck.passed ? 'PASS' : 'FAIL'}`,
    `- variant count: spouse ${precheck.counts['spouse-01'].total}, family ${precheck.counts['family-01'].total}, friend ${precheck.counts['friend-01'].total}, total ${precheck.counts.total}`,
    `- residual specialist issues: ${precheck.residual.total}`,
    `- metadata preservation issues: ${precheck.metadataIssues.length}`,
    `- build: ${validation.build}`,
    `- tsc: ${validation.tsc}`,
    '',
    '## ClaudeCode 인계 영역',
    `- 자연체 폴리싱 후보: ${polishCandidates.length}건`,
    '- 후보 목록: `tmp/codex-recovery/claude-polish-candidates.json`',
    '- family/friend d-5 신규 작성은 별도 S10/S11 흐름에서 처리',
    '',
    '## 미해결 / 결정 대기 항목',
    '- case data 자체 오류로 의심되는 항목은 직접 수정하지 않았다.',
    '- 기존 `tmp/precheck-matrix.cjs`의 d-5 누락 실패는 이번 scope-aware precheck에서 known issue로 분리했다.',
  ]
  fs.writeFileSync(path.join(OUT_DIR, 'FINAL-REPORT.md'), `${lines.join('\n')}\n`, 'utf8')
}

function runRecovery() {
  ensureDir(OUT_DIR)
  writePrecheckScript()

  const matrix = buildFactMatrix()
  const bundles = readBundles()
  makeMetadataSnapshot(bundles)

  const roundLog = {
    rounds: [],
    totalRounds: 0,
    totalApplied: 0,
    convergedAt: 0,
    terminationReason: '',
  }

  let terminationReason = 'max_rounds'
  for (let round = 1; round <= MAX_ROUNDS; round += 1) {
    const startedAt = new Date().toISOString()
    const proposals = detectAll(bundles, matrix)
    const detections = summarizeProposals(proposals)
    const patches = applyRound(bundles, matrix)
    const afterProposals = detectAll(bundles, matrix)
    const residual = residualSummary(afterProposals)
    const crossValidation = {
      round,
      checkedSpecialists: Object.keys(SPECIALISTS),
      newIssues: residual.total,
      residualBySpecialist: residual.detections,
      note: 'Coordinator patches were re-scanned by all specialist detectors.',
    }
    writeRoundOutputs(round, proposals, patches, residual, crossValidation)
    const endedAt = new Date().toISOString()
    const logRow = {
      round,
      startedAt,
      endedAt,
      durationSeconds: Math.max(0, Math.round((Date.parse(endedAt) - Date.parse(startedAt)) / 1000)),
      detections,
      coordinated: patches.length,
      applied: patches.length,
      crossValidationNewIssues: residual.total,
      residual: residual.total,
      convergence: residual.total === 0 || patches.length === 0,
    }
    roundLog.rounds.push(logRow)
    roundLog.totalApplied += patches.length

    if (residual.total === 0) {
      terminationReason = 'all_zero'
      roundLog.convergedAt = round
      break
    }
    if (patches.length === 0) {
      terminationReason = 'no_change'
      roundLog.convergedAt = round
      break
    }
  }

  roundLog.totalRounds = roundLog.rounds.length
  roundLog.terminationReason = terminationReason
  writeJson(path.join(OUT_DIR, 'round-log.json'), roundLog)

  writeBundles(bundles)

  const precheck = runPrecheck({ write: true })
  const polishCandidates = createPolishCandidates(bundles)
  const validation = {
    build: 'not_run',
    tsc: 'not_run',
    precheckPassed: precheck.passed,
    generatedAt: new Date().toISOString(),
  }
  writeJson(path.join(OUT_DIR, 'final-validation.json'), validation)
  writeFinalReport({ roundLog, precheck, polishCandidates, validation })

  console.log(JSON.stringify({
    terminationReason,
    rounds: roundLog.totalRounds,
    totalApplied: roundLog.totalApplied,
    precheckPassed: precheck.passed,
    residual: precheck.residual.total,
    outputs: rel(OUT_DIR),
  }, null, 2))
  process.exit(precheck.passed ? 0 : 2)
}

if (require.main === module) {
  runRecovery()
}

module.exports = {
  buildFactMatrix,
  applyRound,
  countVariants,
  createPolishCandidates,
  detectAll,
  readBundles,
  residualSummary,
  runPrecheck,
  summarizeProposals,
  writeBundles,
  writeRoundOutputs,
}
