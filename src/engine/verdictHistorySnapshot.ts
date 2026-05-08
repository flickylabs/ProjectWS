import type { CaseData, VerdictInput, VerdictResultSnapshot } from '../types'
import type { VerdictSummary } from './verdictSummaryEngine'
import { pp과와, pp은는 } from './koreanPostposition'
import { resolveScriptedAftermath } from './aftermathResolver'
import { getCurrentLocale, type LocaleCode } from '../i18n'
import { hasUnexpectedHangulForLocale } from '../i18n/llmLocale'

export type VerdictScoreLike = {
  total: number
  insight: number
  authority: number
  wisdom: number
}

export function getVerdictRatingLabel(score: number, locale: LocaleCode = getCurrentLocale()): string {
  const labels = {
    ko: { legendary: '전설', excellent: '우수', good: '양호', fair: '보통', poor: '미흡' },
    en: { legendary: 'Legendary', excellent: 'Excellent', good: 'Good', fair: 'Fair', poor: 'Poor' },
    ja: { legendary: '伝説', excellent: '優秀', good: '良好', fair: '標準', poor: '未熟' },
    'zh-CN': { legendary: '传奇', excellent: '优秀', good: '良好', fair: '普通', poor: '不足' },
  } as const
  const copy = labels[locale]
  if (score >= 90) return copy.legendary
  if (score >= 75) return copy.excellent
  if (score >= 60) return copy.good
  if (score >= 40) return copy.fair
  return copy.poor
}

export function getRelationshipLabelForSnapshot(caseData: CaseData, locale: LocaleCode = getCurrentLocale()): string {
  const relType = caseData.meta?.relationshipType ?? caseData.duo.relationshipType
  const labels: Record<LocaleCode, Record<string, string>> = {
    ko: {
      spouse: '부부',
      friend: '친구',
      neighbor: '이웃',
      partnership: '동업',
      boss_employee: '직장',
      workplace: '직장',
      tenant_landlord: '세입자',
      tenant: '세입자',
      family: '가족',
      headline: '헤드라인',
      online: '온라인',
      professional: '의료·전문직',
      civic: '공공·시민',
      public_system: '공공·시민',
      medical_education: '의료·교육',
    },
    en: {
      spouse: 'Spouse',
      friend: 'Friend',
      neighbor: 'Neighbor',
      partnership: 'Partnership',
      boss_employee: 'Workplace',
      workplace: 'Workplace',
      tenant_landlord: 'Tenant',
      tenant: 'Tenant',
      family: 'Family',
      headline: 'Headline',
      online: 'Online',
      professional: 'Medical / Professional',
      civic: 'Public / Civic',
      public_system: 'Public / Civic',
      medical_education: 'Medical / Education',
    },
    ja: {
      spouse: '夫婦',
      friend: '友人',
      neighbor: '隣人',
      partnership: '共同事業',
      boss_employee: '職場',
      workplace: '職場',
      tenant_landlord: '賃借人',
      tenant: '賃借人',
      family: '家族',
      headline: 'ヘッドライン',
      online: 'オンライン',
      professional: '医療・専門職',
      civic: '公共・市民',
      public_system: '公共・市民',
      medical_education: '医療・教育',
    },
    'zh-CN': {
      spouse: '夫妻',
      friend: '朋友',
      neighbor: '邻里',
      partnership: '合伙',
      boss_employee: '职场',
      workplace: '职场',
      tenant_landlord: '租赁',
      tenant: '租赁',
      family: '家庭',
      headline: '热点',
      online: '线上',
      professional: '医疗 / 专业',
      civic: '公共 / 市民',
      public_system: '公共 / 市民',
      medical_education: '医疗 / 教育',
    },
  }
  return labels[locale][relType] ?? (locale === 'ko' ? '당사자' : relType)
}

function getSafeSolutionText(verdictInput: VerdictInput, locale: LocaleCode): string {
  const solutions = verdictInput.selectedSolutions
    .map((entry) => entry.includes('::') ? entry.slice(entry.indexOf('::') + 2) : entry)
    .map((entry) => entry.trim().replace(/[.。]+$/g, ''))
    .filter((entry) => entry && !hasUnexpectedHangulForLocale(entry, locale))
  const fallback = {
    ko: '판결문에 적힌 조치',
    en: 'the measures recorded in the verdict',
    ja: '判決文に記された措置',
    'zh-CN': '判决书中记录的措施',
  } as const
  return solutions.slice(0, 2).join(locale === 'en' ? '. ' : '。') || fallback[locale]
}

export function buildDefaultAftermath(caseData: CaseData, score: VerdictScoreLike, verdictInput: VerdictInput, locale: LocaleCode = getCurrentLocale()): string {
  const scripted = locale === 'ko' ? resolveScriptedAftermath(caseData, verdictInput) : null
  if (scripted?.text) return scripted.text

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const solutionText = getSafeSolutionText(verdictInput, locale)

  if (locale === 'en') {
    const high = score.total >= 75
    const mid = score.total >= 50
    const lesson = high ? 'Responsibility must be written down before a relationship can be read again.' : mid ? 'The first procedure for stopping misunderstanding is verification.' : 'Words without verification can become verdicts outside the courtroom as well.'
    return [
      `${nameA} and ${nameB} did not leave the courtroom with easy expressions. The verdict had ended the argument on paper, but it also made clear which responsibilities could no longer be hidden behind feeling.`,
      `In the days that followed, they returned to ${solutionText}. Their messages were shorter than before, yet they were less careless with certainty. The decision became a line they had to notice before the same dispute widened again.`,
      high
        ? 'After several weeks, the verdict stopped feeling like a cold record and became a practical boundary. The relationship was not fully repaired, but the next action was chosen with less evasion.'
        : 'Time did not turn the decision into reconciliation. It remained a warning line, marking where the next wound would begin if they treated suspicion as proof again.',
      `"${lesson}"`,
    ].join('\n\n')
  }

  if (locale === 'ja') {
    const high = score.total >= 75
    const mid = score.total >= 50
    const lesson = high ? '責任を書き残してこそ、関係はもう一度読み直せる。' : mid ? '誤解を止める最初の手続きは、確認である。' : '確認のない言葉は、法廷の外でも判決になる。'
    return [
      `${nameA}と${nameB}は、法廷を出るときも簡単には表情を緩めませんでした。判決は紙の上で争いを終わらせましたが、感情の陰に隠せない責任も同時に明らかにしました。`,
      `数日後、二人は${solutionText}を基準にもう一度向き合いました。やり取りは以前より短く、それでも確信だけで相手を押し切ることは少なくなりました。判決は、同じ争いが広がる前に気づくべき線になりました。`,
      high
        ? '数週間が過ぎると、判決は冷たい記録ではなく実際の境界として残りました。関係が完全に戻ったわけではありませんが、次の行動は以前よりも責任から逃げずに選ばれました。'
        : '時間が経っても、判決はすぐに和解へ変わったわけではありません。それでも、疑いを証拠のように扱えば次の傷がどこから始まるのかを示す警告線として残りました。',
      `「${lesson}」`,
    ].join('\n\n')
  }

  if (locale === 'zh-CN') {
    const high = score.total >= 75
    const mid = score.total >= 50
    const lesson = high ? '责任被写清之后，关系才有机会重新被读懂。' : mid ? '停止误解的第一道程序，是确认。' : '未经确认的话语，在法庭之外也会成为判决。'
    return [
      `${nameA}和${nameB}走出法庭时，表情仍然没有轻松下来。判决在纸面上结束了争执，也让那些不能再藏在情绪背后的责任变得清楚。`,
      `几天后，两人重新回到${solutionText}。他们的消息比从前更短，却也更少用未经确认的确信压向对方。判决成了一条线，提醒他们在同样的争执再次扩大前停下来。`,
      high
        ? '几周后，判决不再只是冷冰冰的记录，而成了现实中的边界。关系并未完全修复，但下一步行动至少不再绕开责任。'
        : '时间过去后，判决并没有立刻变成和解。它更像一条警戒线，标出如果再次把怀疑当成证据，下一道伤口会从哪里开始。',
      `“${lesson}”`,
    ].join('\n\n')
  }

  const pA = pp과와(nameA)
  const pB = pp은는(nameB)

  if (score.total >= 75) {
    return `${nameA}${pA} ${nameB}${pB} 판결 직후에도 쉽게 웃지는 못했지만, 두 사람은 적어도 무엇을 바로잡아야 하는지 같은 문장으로 받아들였다. 법정 밖으로 나서는 동안 남은 침묵은 패배감보다 정리해야 할 말의 무게에 가까웠다.\n\n며칠 뒤 두 사람은 ${solutionText}을 기준으로 다시 연락했다. 감정은 여전히 조심스러웠지만, 이전처럼 확인하지 않은 말로 상대를 밀어붙이는 일은 줄었다.\n\n한 달이 지나자 판결은 두 사람 사이에서 차가운 기록이 아니라 다시 같은 실수를 반복하지 않기 위한 기준선이 되었다. 관계가 완전히 회복된 것은 아니었으나, 적어도 책임을 덮지 않고 다음 행동을 고르는 쪽으로 움직였다.\n\n\"책임을 적어야 관계도 다시 읽힌다.\"`
  }

  if (score.total >= 50) {
    return `${nameA}${pA} ${nameB}${pB} 판결을 받아들였지만, 누구도 완전히 만족한 얼굴은 아니었다. 그래도 법정의 결론은 억울함을 더 키우기 전에 멈춰 세운 최소한의 기준이 되었다.\n\n이후 두 사람은 ${solutionText}을 두고 필요한 말만 주고받았다. 불만은 남았지만, 같은 오해가 어디에서 반복되는지는 서로 알고 있었다.\n\n시간이 지나도 정리가 곧 화해가 되지는 않았다. 다만 이번에는 감정이 앞서기 전에 기록과 절차를 확인해야 한다는 사실만큼은 남았다.\n\n\"오해를 멈추는 첫 절차는 확인이다.\"`
  }

  return `${nameA}${pA} ${nameB}${pB} 판결 뒤에도 쉽게 자리를 뜨지 못했다. 결론은 나왔지만, 사건의 감정까지 설득하기에는 아직 남은 말이 많았다.\n\n선택된 조치는 ${solutionText}이었으나, 두 사람은 그것이 충분한지 끝내 같은 표정을 짓지 못했다. 그래도 이번 판결은 더 큰 오해로 번지기 전에 멈춰 서야 할 지점을 표시했다.\n\n며칠 뒤의 일상은 이전과 비슷했지만, 두 사람은 같은 방식으로 돌아가지는 못했다. 감정이 앞서기 전에 확인해야 한다는 사실만큼은 법정 밖에도 남았다.\n\n\"확인 없는 말은 법정 밖에서도 판결이 된다.\"`
}

export function buildVerdictResultSnapshot(args: {
  caseData: CaseData
  verdictInput: VerdictInput
  score: VerdictScoreLike
  verdictSummary?: VerdictSummary
  aftermath?: string
  locale?: LocaleCode
}): VerdictResultSnapshot {
  const { caseData, verdictInput, score, verdictSummary, aftermath } = args
  const locale = args.locale ?? getCurrentLocale()
  return {
    version: 1,
    capturedAt: new Date().toISOString(),
    caseTitle: caseData.meta?.title ?? `${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`,
    relationshipLabel: getRelationshipLabelForSnapshot(caseData, locale),
    score: {
      total: score.total,
      insight: score.insight,
      authority: score.authority,
      wisdom: score.wisdom,
      rating: getVerdictRatingLabel(score.total, locale),
    },
    factFindings: caseData.disputes.map((dispute) => ({
      id: dispute.id,
      name: dispute.name,
      finding: verdictInput.factFindings[dispute.id] ?? 'pending',
      truth: dispute.truth,
    })),
    selectedSolutions: [...verdictInput.selectedSolutions],
    verdictSummary,
    aftermath,
  }
}
