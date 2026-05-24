/**
 * spouse-01 — Core Case Authority
 *
 * 권위 단일 출처. 본 파일이 변경되면 `scripts/build-core-case.cjs`가 11개 derived layer
 * (cases/generated, claimPolicies, disclosurePolicy, truth-leak-matrix 등)를 자동 sync.
 *
 * 본 파일은 KO 권위만 채운다. EN/JA/ZH-CN은 translate pass (Codex/GPT Pro) 이후 채워짐.
 * truthStages.forbiddenKeywords는 이미 truth-leak-matrix에 4언어 등록되어 있으므로 4언어 모두 채움.
 *
 * 변경 결정 (2026-05-22 사용자 확정 8건):
 *   - dispute: d-1, d-2, h-d3 (3개) — h-d4 폐기
 *   - dossier: dc-1, dc-2, dc-3(rename "이준호의 비밀 개인 계좌", d-2 link), dc-4(rename "돌이키고 싶은 2,000만 원", h-d3 link), dc-7(신규 "공동 적금 2,000만 원의 해지", h-d3 link)
 *   - 폐기: dc-5, dc-6, h-d4
 *   - witness w-2.relatedDisputes = ['d-2', 'h-d3'] (사용자 결정 — 창구 출금 증언 + 위임장 해지 처리)
 *
 * Schema: [src/types/coreCase.ts](../../types/coreCase.ts)
 */

import {
  type CoreCaseAuthority,
  type LocalizedString,
  type LocalizedKeywordSet,
} from '../../types/coreCase'
import {
  dc3NarrativeTriggers,
  e7NarrativeTriggers,
  dc7NarrativeTriggers,
  e6NarrativeTriggers,
  dc4NarrativeTriggers,
  w3NarrativeTriggers,
  hd3NarrativeTriggers,
  w2NarrativeTriggers,
  // Cycle 3 (외도 line)
  e4NarrativeTriggers,
  dc1NarrativeTriggers,
  w1NarrativeTriggers,
  dc2NarrativeTriggers,
} from './spouse-01.narrative'

/* ============================================================================
 * Helpers — KO 권위 작성을 간결화하는 유틸. translate pass 후 외국어 채워짐.
 * ========================================================================== */

/** KO만 받아 LocalizedString을 생성. 외국어는 translate pass에서 채움. */
const ko = (text: string): LocalizedString => ({ ko: text, en: null, ja: null, 'zh-CN': null })

/** 4언어 모두 받아 LocalizedString 생성 (truth-leak matrix와 sync 필요한 키워드 영역용). */
const _i18n = (
  koText: string,
  enText: string,
  jaText: string,
  zhCNText: string,
): LocalizedString => ({ ko: koText, en: enText, ja: jaText, 'zh-CN': zhCNText })

/** KO 키워드 배열만 받아 LocalizedKeywordSet 생성. */
const koKeywords = (...kos: string[]): LocalizedKeywordSet => ({
  ko: kos,
  en: null,
  ja: null,
  'zh-CN': null,
})

/** 4언어 키워드 배열 받아 LocalizedKeywordSet 생성. */
const keywords = (
  koArr: string[],
  enArr: string[],
  jaArr: string[],
  zhCNArr: string[],
): LocalizedKeywordSet => ({ ko: koArr, en: enArr, ja: jaArr, 'zh-CN': zhCNArr })

/* ============================================================================
 * Authority
 * ========================================================================== */

export const spouse01CaseAuthority: CoreCaseAuthority = {
  /* ----- meta ----- */
  meta: {
    caseId: 'spouse-01',
    caseNumber: 'TE-SpouseV301',
    caseName: ko('새벽 통화기록'),
    schemaVersion: 'core-case-v1',
    title: ko('매일 아내 몰래 오피스텔에 머물다 오는 남편'),
    relationshipType: 'spouse',
    contextType: 'marital_finance_reframe',
    difficulty: 'hard',
    anchorTruth: ko(
      '박지연은 남편이 딴살림을 차렸다고 확신한 뒤 위임장을 조작하여 공동 적금 2,000만원을 해지했고, 전액을 투자방에 송금했다가 사기로 손실했다. 이준호는 외도가 아니라 개인회생 중인 친형의 조카(중2)를 돌보고 있었고, 개인 비자금에서 3,000만원을 현금으로 형에게 전달했다.',
    ),
    emotionalBait: ko(
      '매일 퇴근 후 같은 오피스텔에 들렀다 오는 남편. 차에서 발견된 여성용품 영수증. 새벽의 통화. 아내는 남편의 딴 살림을 확신한다.',
    ),
    resolutionDilemma: ko(
      '개인회생 중인 형과 조카를 지키려다 개인 비자금 3,000만원을 현금으로 전달한 남편과, 배신당했다고 확신하고 위임장을 조작하여 공동 적금 2,000만원을 해지한 뒤 전액을 투자방 사기로 날린 아내 중 누가 더 무거운 책임을 져야 하는가. 숨김은 남편이 먼저, 계좌 감시는 아내가 먼저, 범죄 행위는 아내가 저질렀다.',
    ),
    conflictSeed: ko('TE-SpouseV301'),
    variableModules: ['VM-spouse-v3-a', 'VM-spouse-v3-b'],
    twistModule: 'TW-spouse-v3-1',
    sensitivityTags: ['minor_privacy', 'health_privacy', 'family_debt', 'shared_finance'],
    evidenceAxisLegend: {
      depthStages: [
        { id: 'stub', label: ko('Stub'), summary: ko('존재만 보임') },
        { id: 'excerpt', label: ko('Excerpt'), summary: ko('일부만 열람') },
        { id: 'original', label: ko('Original'), summary: ko('원본/전체본 확보') },
        { id: 'context', label: ko('Context'), summary: ko('앞뒤 맥락 복원') },
        { id: 'established', label: ko('Established'), summary: ko('공식기록 채택') },
      ],
      trustStates: [
        { id: 'submitted', label: ko('제출됨'), summary: ko('당사자가 제출한 상태') },
        { id: 'verifying', label: ko('검증 중'), summary: ko('원본 대조 및 맥락 확인 중') },
        { id: 'authenticated', label: ko('인증됨'), summary: ko('신뢰 가능한 자료로 판단') },
        { id: 'challenged', label: ko('이의 제기됨'), summary: ko('상대측이 의미나 범위를 다툼') },
        { id: 'misread', label: ko('조작/오독 판정'), summary: ko('위조 또는 발췌/오독 여부가 판정됨') },
      ],
    },
  },

  /* ----- context ----- */
  context: {
    description: ko(
      '매일 퇴근 후 같은 오피스텔에 들렀다 오는 남편. 차에서 발견된 여성용품 영수증. 새벽의 통화. 아내는 남편의 딴 살림을 확신한다.',
    ),
    emotionalPressure: 9,
    affects: 'both',
    triggerAmplifier: ko(
      '초반에는 영수증(머리끈/틴트), 오피스텔 GPS, 새벽 통화가 한 방향으로만 겹쳐 외도처럼 보인다. 그러나 단서를 더 들춰 볼수록 그 그림은 흔들리고, 양쪽 모두 말하지 못한 사정과 돈의 움직임이 차례로 드러나면서 사건의 중심은 외도 의심 너머로 뒤집힌다.',
    ),
  },

  /* ----- parties ----- */
  parties: {
    a: {
      id: 'a',
      name: ko('박지연'),
      age: 36,
      occupation: ko('학원 데스크 직원'),
      incomeBracket: 'mid',
      archetype: 'victim_cosplay',
      speechStyle: ko(
        '배신당한 사람이라는 위치를 먼저 잡고 말하지만, 동기 질문이 들어오면 수치심과 불안을 핑계로 설명 범위를 넓힌다.',
      ),
      pride: 6,
      fear: ko('위임장 조작이 범죄로 확정되는 것을 가장 두려워한다.'),
      riskAppetite: 5,
      digitalHabit: 'messenger_main',
      dailyRoutine: ko(
        '학원 마감 뒤 집에 돌아와 카드 내역과 통화기록을 반복해 확인하며 남편이 먼저 가정을 버릴지 모른다는 불안을 키웠다.',
      ),
      sensitivePoints: [
        ko('오피스텔 방문과 새벽 전화는 딴살림 흔적인가'),
        ko('위임장 조작으로 공동 적금 2,000만원을 해지한 것은 범죄인가'),
        ko('은폐와 선제행동의 순서'),
      ],
      verbalTells: [
        {
          type: 'victim_frame',
          trigger: 'cornered',
          pattern: ko('자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다.'),
        },
        {
          type: 'helplessness',
          trigger: 'shame',
          pattern: ko('그때는 다른 선택이 없었다는 말로 계산된 선택의 각도를 흐린다.'),
        },
        {
          type: 'soft_confession',
          trigger: 'shame',
          pattern: ko('작은 인정부터 꺼내고 가장 수치스러운 사실은 마지막에 말한다.'),
        },
      ],
      callTerms: {
        toPartner: ko('자기'),
        toJudge: ko('제 남편'),
        angry: ko('이준호!'),
      },
      pcFaceType: 'woman',
    },
    b: {
      id: 'b',
      name: ko('이준호'),
      age: 38,
      occupation: ko('가전매장 직원'),
      incomeBracket: 'mid',
      archetype: 'avoidant',
      speechStyle: ko(
        '사실을 완전히 부정하기보다 중요한 이유를 뒤로 미루고, 모호어로 시간을 벌다가 압박이 누적되면 한꺼번에 털어놓는다.',
      ),
      pride: 6,
      fear: ko('형 이야기를 꺼내면 시댁 갈등으로 이혼까지 갈 것이라는 공포.'),
      riskAppetite: 4,
      digitalHabit: 'minimal',
      dailyRoutine: ko(
        '매장 마감 뒤 형네 오피스텔에 들러 조카 저녁과 생필품을 챙기고 새벽에는 형 사정을 확인한 뒤 집으로 돌아왔다.',
      ),
      sensitivePoints: [
        ko('오피스텔 방문과 새벽 전화는 딴살림 흔적인가'),
        ko('개인 비자금에서 3,000만원을 현금으로 형에게 전달한 것은 배우자 동의 없는 독단인가'),
        ko('은폐와 선제행동의 순서'),
      ],
      verbalTells: [
        {
          type: 'answer_delay',
          trigger: 'avoiding',
          pattern: ko('질문을 바로 받지 않고 한 박자 늦게 받아 핵심어를 피한다.'),
        },
        {
          type: 'partial_scope',
          trigger: 'cornered',
          pattern: ko('큰 사실은 인정하되 가장 아픈 이유는 마지막까지 자른다.'),
        },
        {
          type: 'minimize_harm',
          trigger: 'defensive',
          pattern: ko('선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다.'),
        },
      ],
      callTerms: {
        toPartner: ko('자기'),
        toJudge: ko('제 아내'),
        angry: ko('박지연!'),
      },
      pcFaceType: 'man',
    },
  },

  /* ----- timeline (audit Section 1 — 6 stage 권위) ----- */
  timeline: [
    {
      stage: 0,
      whenLabel: ko('결혼 직후~신혼 초'),
      actor: 'a',
      action: ko('박지연이 일찍부터 카드내역·통화기록 등 계좌 감시 습관을 키움.'),
      aPerception: ko('자기 감시 습관 인지.'),
      bPerception: ko('부분적으로 인지.'),
      exposureGate: {
        minLieState: 'S5',
        allowedChannels: ['aftermath', 'dossier'],
      },
      sourceFacts: ['daily_routine_a'],
    },
    {
      stage: 1,
      whenLabel: ko('결혼 ~10년차'),
      actor: 'b',
      action: ko(
        '이준호의 친형이 이혼 + 부모님 재산 탕진, 개인회생 중. 형이 조카(중2)를 데리고 봉천동 오피스텔에 거주. 이준호는 형 사정을 박지연에게 알리지 않음.',
      ),
      aPerception: ko('시댁 갈등은 알지만 형 회생/조카 돌봄은 모름.'),
      bPerception: ko('전부 인지. 시댁 화제 = 부부 갈등 frame 형성.'),
      exposureGate: {
        minLieState: 'S3',
        allowedChannels: ['dossier', 'aftermath'],
      },
      sourceFacts: ['ledger-2'],
    },
    {
      stage: 2,
      whenLabel: ko('결혼 직후~현재 (10년간)'),
      actor: 'b',
      action: ko(
        '이준호가 본인 명의 별도 계좌에 급여 잔액과 현금을 조금씩 모음. 누적 ~3,000만 원. 처음엔 비자금이었으나 형 사정 발생 후 형/조카 지원 자금으로 전환.',
      ),
      aPerception: ko('계좌 존재 자체를 모름.'),
      bPerception: ko('전부 인지.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier', 'interrogation'],
      },
      sourceFacts: ['e-5_account_history'],
    },
    {
      stage: 3,
      whenLabel: ko('사건 발생 4개월 전 ~ 최근'),
      actor: 'b',
      action: ko(
        '개인 계좌에서 500만/800만/700만/1,000만 = 총 3,000만 원을 4회 현금 출금. 형이 개인회생 중이라 계좌 입금이 곤란해 직접 현금 전달.',
      ),
      aPerception: ko('출금 사실을 사건 진행 중 발견.'),
      bPerception: ko('전부 인지.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-5_withdrawals'],
    },
    {
      stage: 4,
      whenLabel: ko('사건 발생 6주 전'),
      actor: 'a',
      action: ko(
        '박지연이 외도 단정 후 이혼 대비로 본인 몫 보호 → 이준호의 서명을 위조한 위임장 작성 → 공동 적금 2,012만 원 중도 해지 → 박지연 개인계좌로 즉시 입금 (2026.01.18).',
      ),
      aPerception: ko('전부 인지. 위임장 위조가 범죄임도 인지하며 가장 두려워함.'),
      bPerception: ko('단계 5 이후에 알게 됨.'),
      exposureGate: {
        minLieState: 'S3',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-7_proxy_form', 'fear_a_proxy'],
    },
    {
      stage: 5,
      whenLabel: ko('사건 발생 6주 전 ~ 4주 전 (적금 해지 직후)'),
      actor: 'a',
      action: ko(
        '박미라가 텔레그램 VIP 투자클럽 링크 전달. 박지연이 해지액 2,000만 원 전액을 운영자(제이슨) 계좌로 송금. 운영자 잠적 → 전액 손실.',
      ),
      aPerception: ko('송금까지 100% 인지. 사기 발각 후 수치심으로 추가 은폐.'),
      bPerception: ko('모름.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-6_telegram', 'w-3_link_intro'],
    },
  ],

  /* ----- truthTable ----- */
  truthTable: [
    {
      id: 't-1',
      fact: ko('B의 오피스텔 방문 대상은 외도 상대가 아니라 친형과 조카였다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-2',
      fact: ko('B는 개인 비자금 3,000만 원을 배우자에게 숨기고 형에게 현금으로 전달했다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-3',
      fact: ko('A는 남편 외도를 확신한 뒤 위임장을 조작해 공동 적금 2,000만 원을 해지하고, 전액을 투자방에 송금했다.'),
      isTrue: true,
      weight: 9,
      quadrant: 'a_only',
    },
    {
      id: 't-4',
      fact: ko('숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.'),
      isTrue: true,
      weight: 9,
      quadrant: 'shared_misconception',
    },
    {
      id: 't-5',
      fact: ko('두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.'),
      isTrue: true,
      weight: 8,
      quadrant: 'both_know',
    },
  ],

  /* ----- disputes (3개: d-1, d-2, h-d3) ----- */
  disputes: [
    {
      id: 'd-1',
      name: ko('오피스텔 방문과 새벽 전화'),
      truth: true,
      truthDescription: ko(
        '오피스텔 방문은 친형 오피스텔에서 조카(중2)를 돌보는 것이었다. 새벽 전화는 형과의 긴급 연락.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: false,
      v3Visibility: 'initial',
      correctResponsibility: { a: 25, b: 75 },
      mediationLink: '외도 오해와 가족 돌봄',
      requiredEvidence: ['e-2', 'e-3', 'e-4'],
      judgmentStatement: ko('오피스텔 방문의 실체는 외도가 아니라 가족 돌봄이었다.'),
      verdictOptions: {
        wrong: ko('이준호의 오피스텔 방문은 딴집 살림 때문이었다.'),
        partial: ko('오피스텔 방문은 딴집 살림까지는 아니지만, 외도일 가능성이 높다.'),
        truth: ko('오피스텔 방문의 실체는 외도가 아니라 가족 돌봄이었다.'),
        defer: ko('현재로서는 실체를 알 수 없다. 판단을 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-2',
          lieIntensity: 'L1',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
        b: {
          lieType: 'LT-6',
          lieIntensity: 'L2',
          lieMotive: 'third_party_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      /* d-1 truthStages — A 측은 외도 단정 frame을 단계적으로 누그러뜨림. B 측은 가족 돌봄 진실을 단계적으로 인정. */
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('남편이 매일 오피스텔에 들러 새벽까지 전화한다. 외도가 아니라면 무엇이냐.'),
            allowedKeywords: koKeywords('오피스텔', '새벽 전화', '매일', '의심'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '형과의 긴급 연락', '가족 돌봄'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'urgent contact with his brother', 'family care'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '兄との緊急連絡', '家族の世話'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '与哥哥的紧急联系', '照顾家人'],
            ),
            answerFrame: ko('A는 외도 단정 frame을 강하게 유지. 동기·맥락 질문엔 "그런 게 외도 아니면 뭐냐" 식 단정 반복.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('그건 오해다. 그곳에 간 것이 외도라는 말은 사실이 아니다.'),
            allowedKeywords: koKeywords('오해', '아니다'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '형과의 긴급 연락', '가족 돌봄', '시댁', '가족', '형'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'urgent contact with his brother', 'family care', 'in-laws', 'family', 'older brother'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '兄との緊急連絡', '家族の世話', '婚家', '家族', '兄'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '与哥哥的紧急联系', '照顾家人', '婆家', '家人', '哥哥'],
            ),
            answerFrame: ko('B는 부정으로 일관. 시댁·형·조카 키워드 절대 등장 X. 한 박자 늦게 짧게 부인하고 입을 다문다.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('남편이 외도 흔적을 보이는 행동 패턴이 있다. 다만 결정적 증거는 아직 부족하다.'),
            allowedKeywords: koKeywords('의심', '행동 패턴', '결정적이지 않은'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '형과의 긴급 연락', '가족 돌봄'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'urgent contact with his brother', 'family care'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '兄との緊急連絡', '家族の世話'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '与哥哥的紧急联系', '照顾家人'],
            ),
            answerFrame: ko('A는 단정에서 한 발 물러나 "정황상 의심" 톤으로 완화.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연은 "정황상 의심"이라는 말로 단정에서 한 발 비켜선다.'),
              behaviorHint: ko('숨을 짧게 들이마시고 시선을 옆으로 흘린다.'),
            },
          },
          b: {
            admittedFact: ko('가족 쪽 일이 있어 늦었다. 그 이상은 말하기 어렵다.'),
            allowedKeywords: koKeywords('가족 쪽 일', '사정', '말하기 어려운'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '개인회생', '회생 중인 형'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'personal debt rehabilitation', 'brother in rehabilitation'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '個人再生', '再生中の兄'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '个人债务重整', '债务重整中的哥哥'],
            ),
            answerFrame: ko('B는 "가족 쪽 일" 같은 모호한 표현만 사용. 형/조카/회생 직접 명사는 절대 발화 X.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 가족이라는 단어를 한 번 흘리고 다시 입을 다문다.'),
              behaviorHint: ko('답이 짧아지고 시선이 아래로 떨어진다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('남편이 단순 외도라기엔 행동이 모호하다. 그러나 본인 입장에서는 자기방어가 절실한 상황이었다.'),
            allowedKeywords: koKeywords('자기방어', '불안', '준비'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '가족 돌봄'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'family care'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '家族の世話'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '照顾家人'],
            ),
            answerFrame: ko('A는 단정을 부분 양보하되 자기 행위(감시/대비)를 정당화하는 frame으로 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('박지연은 "나도 준비할 수밖에 없었다"는 말로 단정에서 동기 쪽으로 이동한다.'),
              behaviorHint: ko('말의 속도가 빨라지고 손이 책상을 두 번 톡톡 친다.'),
            },
          },
          b: {
            admittedFact: ko('그쪽에 챙겨야 할 사람이 있어서 그랬다. 외도와는 다른 일이다.'),
            allowedKeywords: koKeywords('관련자', '챙겨야 하는 사람', '그쪽 사람'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄', '개인회생', '중2'],
              ["niece care at his older brother's Officetel", 'care for his niece', 'personal debt rehabilitation', 'middle school'],
              ['実兄のオフィステルで姪の世話', '姪の世話', '個人再生', '中学2年'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女', '个人债务重整', '初二'],
            ),
            answerFrame: ko('B는 "챙겨야 하는 사람" 정도까지 인정. 구체적 인물(형/조카) 명시 X. 외도가 아니라는 점만 강조.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('이준호는 "챙겨야 할 사람이 있었다"는 말까지 꺼낸다.'),
              behaviorHint: ko('처음으로 시선이 재판관을 향한다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('남편의 행동에 가족 쪽 정황이 있을 수 있다는 가능성을 부분 인정. 다만 본인은 그렇게 해석할 여유가 없었다.'),
            allowedKeywords: koKeywords('가족 쪽 정황', '돌봄 가능성', '내 여유 부족'),
            forbiddenKeywords: keywords(
              ['친형 오피스텔에서 조카를 돌봄', '조카 돌봄'],
              ["niece care at his older brother's Officetel", 'care for his niece'],
              ['実兄のオフィステルで姪の世話', '姪の世話'],
              ['在亲哥哥的韩式商住公寓照顾侄女', '照顾侄女'],
            ),
            answerFrame: ko('A는 가족 정황 가능성을 표면 인정. 그러나 본인 처지의 한계로 frame 보정.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('박지연은 "그쪽에 사정이 있었을 수 있다"는 말로 frame을 흔든다.'),
              behaviorHint: ko('숨을 길게 내쉬고 시선이 아래로 떨어진다.'),
            },
          },
          b: {
            admittedFact: ko('가족 쪽 일이라는 게 시댁 사정과 관련 있다. 형이 어려운 상황이고 그 집에 들렀다.'),
            allowedKeywords: koKeywords('시댁', '형', '어려운 상황', '들렀다'),
            forbiddenKeywords: keywords(
              ['조카 돌봄', '개인회생', '중2', '생리'],
              ['care for his niece', 'personal debt rehabilitation', 'middle school', 'menstrual'],
              ['姪の世話', '個人再生', '中学2年', '生理'],
              ['照顾侄女', '个人债务重整', '初二', '生理'],
            ),
            answerFrame: ko('B는 형 + 시댁 키워드까지 인정. 그러나 조카 돌봄·회생·민감 정보는 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('이준호는 "형 사정이 있었다"고 말한다. 시댁이라는 단어가 처음 등장한다.'),
              behaviorHint: ko('말끝에 숨이 짧게 갈라진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('남편의 행동이 가족 돌봄이었을 가능성이 더 크다. 외도 단정에 본인이 매달렸음을 인정한다.'),
            allowedKeywords: koKeywords('가족 돌봄', '단정에 매달림', '본인 인정'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 외도 frame이 잘못이었음을 인정. 자기 단정 책임 일부 수용.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('박지연의 어깨가 처음으로 내려간다.'),
              behaviorHint: ko('"내가 그렇게 단정했다"는 말이 흘러나온다.'),
            },
          },
          b: {
            admittedFact: ko('형이 개인회생 중이고 조카가 어려서 돌봐야 했다. 시댁 갈등이 두려워 말하지 못했다.'),
            allowedKeywords: koKeywords('형', '조카', '개인회생', '돌봄', '시댁 갈등 공포'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 형·조카·회생까지 직접 명시. 시댁 갈등 공포 동기 인정.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('이준호는 "조카가 중2"라고 말한다.'),
              behaviorHint: ko('처음으로 호흡이 깊어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('남편의 오피스텔 방문은 가족 돌봄이었다. 외도 단정은 내 단정 책임이다.'),
            allowedKeywords: koKeywords('가족 돌봄', '단정 책임', '내 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 단정 책임 직접 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연이 마지막 단정을 내려놓는다.'),
              behaviorHint: ko('손이 책상 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko(
              '오피스텔 방문은 친형 오피스텔에서 조카(중2)를 돌보던 것이었고, 새벽 전화는 형과의 긴급 연락이었다.',
            ),
            allowedKeywords: koKeywords('친형 오피스텔', '조카', '중2', '돌봄', '긴급 연락'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 모든 키워드 발화 가능 (단 민감 정보 봉인 정책 별도).'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 처음으로 모든 말을 끝까지 잇는다.'),
              behaviorHint: ko('시선이 재판관을 정면으로 향한다.'),
            },
          },
        },
      },
      channelExposure: {
        judge_question: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_contradiction: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_evidence_combo: { minLieState: 'S2', isSurfaceOnly: true, isDossierSurface: false },
        judge_witness_summon: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        dossier: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: true },
        interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
        contradiction_pursuit: { minLieState: 'S1', isSurfaceOnly: false, isDossierSurface: false },
        evidence_present: { minLieState: 'S1', isSurfaceOnly: false, isDossierSurface: false },
        mediation: { minLieState: 'S4', isSurfaceOnly: false, isDossierSurface: false },
        aftermath: { minLieState: 'S5', isSurfaceOnly: false, isDossierSurface: false },
        free_interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
      },
      progressionStages: {
        S0: {
          surfaceClaim: ko('외도 의심 / B의 부정'),
          hiddenTruth: ko('형/조카 돌봄'),
          validActions: ['fact_pursuit', 'motive_search'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('가족 쪽 일이라는 모호한 표현'),
          hiddenTruth: ko('형/조카 돌봄'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-1', 'e-2'],
          requiredWitness: [],
          successUnlocks: ['e-3'],
        },
        S2: {
          surfaceClaim: ko('챙겨야 할 사람이 있다'),
          hiddenTruth: ko('친형/조카 돌봄 + 개인회생'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-3', 'e-4'],
          requiredWitness: [],
          successUnlocks: ['dc-1'],
        },
        S3: {
          surfaceClaim: ko('형 사정 / 시댁 갈등'),
          hiddenTruth: ko('조카(중2) 돌봄 + 회생'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-1'],
          successUnlocks: ['dc-2', 'd-2'],
        },
        S4: {
          surfaceClaim: ko('형·조카·회생 부분 인정'),
          hiddenTruth: ko('민감 정보 (학교/생리)'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('진실 완전 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
    },
    /* ============================================================
     * dispute d-2 — 남편 명의 계좌의 목돈 출금
     *
     * A는 외도 자금이 아니냐는 frame으로 추궁. B는 비자금 존재부터 부정 →
     * 형 지원이라는 진실까지 단계적 인정. dossier dc-3 ("이준호의 비밀 개인 계좌")
     * 카드와 link.
     * ============================================================ */
    {
      id: 'd-2',
      name: ko('남편 명의 계좌의 목돈 출금'),
      truth: true,
      truthDescription: ko(
        '이준호는 아내 몰래 10년 가까이 모아 둔 본인 명의 별도 계좌의 비자금 3,000만원을 최근 4개월 동안 500만원, 800만원, 700만원, 1,000만원 순서로 현금 출금했다. 형이 개인회생 중이라 계좌 입금이 곤란해 현금으로 전달했다는 설명이며, 공동 적금과는 무관한 개인 자금이다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: true,
      hidden: false,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 20, b: 80 },
      mediationLink: '남편 측 현금 흐름의 사용처',
      requiredEvidence: ['e-5'],
      judgmentStatement: ko('개인 비자금 3,000만원 현금 전달은 남편 책임이 더 크다.'),
      unlockCondition: {
        requireDispute: { id: 'd-1', minState: 'S3' },
        runtimeRule: ko('d-1 S3 이상 도달 시 (목돈 출금 언급)'),
        authoredRule: ko('d-1 심문에서 오피스텔 방문의 진실이 무너지면 목돈 출금 발견으로 새 쟁점 부상'),
      },
      verdictOptions: {
        wrong: ko('개인 비자금 3,000만원은 이준호가 개인 유흥에 쓴 돈이다.'),
        partial: ko('비자금 출금은 사실이지만, 정확한 사용처는 불확실하다.'),
        truth: ko('개인 비자금 3,000만원은 개인회생 중인 형에게 현금으로 전달한 돈이었다.'),
        defer: ko('사용처를 단정할 수 없다. 판단을 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-2',
          lieIntensity: 'L2',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
        b: {
          lieType: 'LT-6',
          lieIntensity: 'L3',
          lieMotive: 'financial_preservation',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('남편이 별도 계좌에서 큰돈을 현금으로 빼냈다. 외도 자금이 아니냐.'),
            allowedKeywords: koKeywords('별도 계좌', '큰돈', '현금 출금', '외도 자금 의심'),
            forbiddenKeywords: keywords(
              ['형에게 현금 전달', '개인회생 중인 형', '공동 적금과 무관한 개인 자금'],
              ['cash handed to his older brother', 'older brother in personal debt rehabilitation', 'personal funds unrelated to the joint savings account'],
              ['兄への現金手渡し', '個人再生中の兄', '共同積立預金とは無関係な個人資金'],
              ['以现金交给哥哥', '正在个人债务重整的哥哥', '与共同储蓄账户无关的个人资金'],
            ),
            answerFrame: ko('A는 외도 자금 frame으로 단정. 사용처가 불분명하니 의심이 더 깊어진다는 톤.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('별도 계좌라는 말이 무슨 뜻인지 모르겠다.'),
            allowedKeywords: koKeywords('모르겠다', '오해', '아니다'),
            forbiddenKeywords: keywords(
              ['별도 계좌 비자금', '비자금 3,000만원', '형에게 현금 전달', '개인회생 중인 형'],
              ['separate-account hidden funds', '₩30M hidden funds', 'cash handed to his older brother', 'older brother in personal debt rehabilitation'],
              ['別口座の隠し資金', '隠し資金3,000万ウォン', '兄への現金手渡し', '個人再生中の兄'],
              ['另设账户的私房钱', '3000万韩元私房钱', '以现金交给哥哥', '正在个人债务重整的哥哥'],
            ),
            answerFrame: ko('B는 별도 계좌 존재 자체를 부정. 비자금/형/회생 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('출금 흐름이 분명히 있다. 다만 단순 지출이 아니라 비밀 이동으로 본다.'),
            allowedKeywords: koKeywords('출금 흐름', '비밀 이동', '몰래 옮긴 돈'),
            forbiddenKeywords: keywords(
              ['형에게 현금 전달', '개인회생 중인 형'],
              ['cash handed to his older brother', 'older brother in personal debt rehabilitation'],
              ['兄への現金手渡し', '個人再生中の兄'],
              ['以现金交给哥哥', '正在个人债务重整的哥哥'],
            ),
            answerFrame: ko('A는 출금 사실 인정. 사용처에 대한 의심은 여전.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연은 "분명히 어디론가 흘러나간 돈"이라고 표현한다.'),
              behaviorHint: ko('영수증 묶음 쪽으로 시선이 잠깐 머문다.'),
            },
          },
          b: {
            admittedFact: ko('별도 계좌가 있긴 했지만, 큰돈이 빠진 적은 없다.'),
            allowedKeywords: koKeywords('별도 계좌', '없다'),
            forbiddenKeywords: keywords(
              ['비자금 3,000만원', '형에게 현금 전달', '개인회생 중인 형'],
              ['₩30M hidden funds', 'cash handed to his older brother', 'older brother in personal debt rehabilitation'],
              ['隠し資金3,000万ウォン', '兄への現金手渡し', '個人再生中の兄'],
              ['3000万韩元私房钱', '以现金交给哥哥', '正在个人债务重整的哥哥'],
            ),
            answerFrame: ko('B는 계좌 존재는 인정하되 큰돈 흐름은 부정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 "큰돈이 빠진 적은 없다"고 말한다.'),
              behaviorHint: ko('답이 평소보다 한 박자 늦다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('출금이 일정한 단위로 분할된 데는 의도가 있다고 본다. 외도 자금이 아니더라도 가정 외부로 흘러간 돈이다.'),
            allowedKeywords: koKeywords('분할 출금', '의도', '가정 외부'),
            forbiddenKeywords: keywords(
              ['형에게 현금 전달'],
              ['cash handed to his older brother'],
              ['兄への現金手渡し'],
              ['以现金交给哥哥'],
            ),
            answerFrame: ko('A는 외도 단정에서 한 발 물러나 "가정 외부로 흘러간 돈" frame으로 이동.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('박지연은 "외도가 아니라도 우리 가정 밖으로 나간 돈"이라고 말한다.'),
              behaviorHint: ko('단정의 톤이 처음으로 흔들린다.'),
            },
          },
          b: {
            admittedFact: ko('가족 쪽에 급한 일이 있어 일부 돈이 빠졌다. 자세한 사정은 말하기 어렵다.'),
            allowedKeywords: koKeywords('가족 사정', '급한 일', '일부 돈'),
            forbiddenKeywords: keywords(
              ['비자금 3,000만원', '형에게 현금 전달', '개인회생 중인 형'],
              ['₩30M hidden funds', 'cash handed to his older brother', 'older brother in personal debt rehabilitation'],
              ['隠し資金3,000万ウォン', '兄への現金手渡し', '個人再生中の兄'],
              ['3000万韩元私房钱', '以现金交给哥哥', '正在个人债务重整的哥哥'],
            ),
            answerFrame: ko('B는 "가족 사정" 정도까지 인정. 형/회생/3,000만 정확 금액 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('이준호는 "가족 쪽에 일이 있었다"고 말한다.'),
              behaviorHint: ko('말 끝이 옅게 흐려진다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko(
              '남편의 별도 계좌에서 빠진 돈이 가족 쪽으로 흘러갔을 수 있다는 가능성을 받아들인다. 그러나 배우자 동의 없이 움직였다는 책임은 남는다.',
            ),
            allowedKeywords: koKeywords('가족 쪽으로 흘러간 돈', '배우자 동의 없음', '독단'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 가족 흐름 가능성 인정. 그러나 절차 책임에 무게.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연은 "그쪽으로 갔든 어쨌든 나는 모르고 있었다"고 말한다.'),
              behaviorHint: ko('숨을 짧게 들이마신다.'),
            },
          },
          b: {
            admittedFact: ko(
              '본인 명의 별도 계좌에서 큰돈이 분할로 빠진 것은 사실이다. 형에게 들어간 돈이다.',
            ),
            allowedKeywords: koKeywords('별도 계좌', '분할 출금', '형'),
            forbiddenKeywords: keywords(
              ['비자금 3,000만원', '개인회생 중인 형'],
              ['₩30M hidden funds', 'older brother in personal debt rehabilitation'],
              ['隠し資金3,000万ウォン', '個人再生中の兄'],
              ['3000万韩元私房钱', '正在个人债务重整的哥哥'],
            ),
            answerFrame: ko('B는 형 대상까지 직접 인정. 정확 금액·회생 사실은 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('이준호는 처음으로 "형에게 갔다"는 말을 꺼낸다.'),
              behaviorHint: ko('숨이 길어진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('남편이 형 가족 사정을 위해 비자금을 움직였을 수 있다는 점을 인정한다. 그래도 동의 없이 큰돈을 움직인 무게는 남는다.'),
            allowedKeywords: koKeywords('형 가족 사정', '비자금', '동의 없음'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 형 + 회생 동기 영역까지 양보. 절차 책임은 별개로 유지.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('박지연은 한숨과 함께 "그쪽도 사정이 있었겠다"고 말한다.'),
              behaviorHint: ko('손이 책상 위에서 한 번 멈췄다 다시 움직인다.'),
            },
          },
          b: {
            admittedFact: ko('형이 개인회생 중이라 계좌로 입금하기 곤란해서 현금으로 전달했다. 비자금은 10년간 모은 개인 돈이다.'),
            allowedKeywords: koKeywords('개인회생', '계좌 입금 곤란', '현금 전달', '10년간 모은 개인 돈'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 회생 + 현금 전달 이유 모두 인정.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('이준호는 "형이 개인회생 중이라 계좌로 못 받았다"고 말한다.'),
              behaviorHint: ko('말이 처음으로 끝까지 이어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('남편의 비자금은 가족 지원이었음을 인정한다. 다만 공동재산 결정과는 분리해서 다뤄야 한다.'),
            allowedKeywords: koKeywords('가족 지원', '공동재산 분리'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 비자금 사용처 진실 인정. 공동재산 책임 frame 분리 주장.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연은 두 자금의 차이를 인정한다.'),
              behaviorHint: ko('어깨가 한 번 더 내려간다.'),
            },
          },
          b: {
            admittedFact: ko(
              '개인 비자금 3,000만 원을 4개월 동안 4회 현금 출금하여 개인회생 중인 형에게 전달했다. 공동 적금과 무관한 개인 자금이었다.',
            ),
            allowedKeywords: koKeywords('비자금 3,000만원', '4회 현금 출금', '개인회생 중인 형', '공동 적금과 무관'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 분할 금액·회생·공동 적금과 분리 모두 명시.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 4회 금액을 차례로 읊는다.'),
              behaviorHint: ko('시선이 흔들리지 않는다.'),
            },
          },
        },
      },
      channelExposure: {
        judge_question: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_contradiction: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_evidence_combo: { minLieState: 'S2', isSurfaceOnly: true, isDossierSurface: false },
        judge_witness_summon: { minLieState: 'S1', isSurfaceOnly: true, isDossierSurface: false },
        dossier: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: true },
        interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
        contradiction_pursuit: { minLieState: 'S1', isSurfaceOnly: false, isDossierSurface: false },
        evidence_present: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        mediation: { minLieState: 'S4', isSurfaceOnly: false, isDossierSurface: false },
        aftermath: { minLieState: 'S5', isSurfaceOnly: false, isDossierSurface: false },
        free_interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
      },
      progressionStages: {
        S0: {
          surfaceClaim: ko('큰돈 출금 의심 / 계좌 존재 부정'),
          hiddenTruth: ko('비자금 + 형 지원'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('출금 흐름 / 큰돈 빠진 적 없다'),
          hiddenTruth: ko('비자금 + 형 지원'),
          validActions: ['evidence_query', 'motive_search'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('가정 외부로 흘러간 돈 / 가족 쪽 급한 일'),
          hiddenTruth: ko('형에게 현금 전달 + 개인회생'),
          validActions: ['motive_search', 'empathy_approach'],
          requiredEvidence: ['e-5'],
          requiredWitness: ['w-2'],
          successUnlocks: ['dc-3'],
        },
        S3: {
          surfaceClaim: ko('가족 쪽으로 갔다 / 형에게 갔다'),
          hiddenTruth: ko('회생 + 정확 금액 + 공동 적금과의 분리'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-5'],
          requiredWitness: ['w-2'],
          successUnlocks: ['h-d3'],
        },
        S4: {
          surfaceClaim: ko('회생 / 4개월 분할'),
          hiddenTruth: ko('정확 사용처 분리'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('완전 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
    },
    /* ============================================================
     * dispute h-d3 — 공동 적금 2,000만원 해지 경위
     *
     * A는 자기방어 frame으로 송금을 정당화. B는 동의한 적 없음.
     * 진실 = 박지연이 위임장 위조하여 해지 후 박미라 소개 투자방 사기로 전액 손실.
     * dossier dc-4 (rename "돌이키고 싶은 2,000만 원") + dc-7 (신규 "공동 적금 2,000만 원의 해지").
     * truthLeakOverride로 audit 권장 추가 hidden keyword (투자방 송금 / 사기 수치심 / 위임장 위조) 등록.
     * ============================================================ */
    {
      id: 'h-d3',
      name: ko('공동 적금 2,000만원 해지 경위'),
      truth: true,
      truthDescription: ko(
        '공동 적금이 만기 전에 해지된 흔적이 확인됐다. 해지 과정에서 배우자 동의 여부와 위임장 진위 문제가 남아 있으며, 해지금 2,000만원의 실제 행선지도 아직 확인해야 한다.',
      ),
      quadrant: 'a_only',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: true,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 75, b: 25 },
      mediationLink: '공동 자산 처분의 경위와 손실',
      requiredEvidence: ['e-6'],
      judgmentStatement: ko('공동 적금 2,000만원 위임장 조작 해지는 아내 책임이 더 크다.'),
      unlockCondition: {
        requireDispute: { id: 'd-2', minState: 'S3' },
        runtimeRule: ko('d-2 발견 후 공동 적금/위임장 단서 조사 시 해금'),
        authoredRule: ko('d-2 발견 뒤 어느 쪽 심문이든 공동 적금과 위임장 조작 단서가 드러나면 생성'),
      },
      verdictOptions: {
        wrong: ko('공동 적금 2,000만원은 이준호가 몰래 해지하여 비자금으로 빼돌렸다.'),
        partial: ko('공동 적금이 해지된 건 맞지만, 누가 해지했는지는 불분명하다.'),
        truth: ko('박지연이 위임장을 조작하여 해지했고, 그 돈을 투자 사기로 전액 잃었다.'),
        defer: ko('해지 경위가 불분명하다. 판단을 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-2',
          lieIntensity: 'L2',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
        b: {
          lieType: 'LT-2',
          lieIntensity: 'L2',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('공동 적금 잔액이 변한 것은 사실이지만, 자세한 경위는 모른다.'),
            allowedKeywords: koKeywords('공동 적금', '잔액 변화', '모른다'),
            forbiddenKeywords: keywords(
              ['공동 적금 무단 해지', '박지연 단독 해지', '본인 동의 없이 해지', '위임장 위조', '투자방 송금 손실', '사기 수치심'],
              ['unilateral joint savings cancellation', 'secret joint savings cancellation', 'joint savings cancelled without consent', 'forged proxy form', 'investment scam loss', 'fraud shame'],
              ['共同積立預金の無断解約', 'パク・ジヨン単独での解約', '本人の同意なしの解約', '委任状偽造', '投資詐欺の損失', '詐欺の羞恥'],
              ['私自取消共同储蓄', '未经同意取消共同储蓄', '朴智妍单方面取消共同储蓄', '伪造委托书', '投资诈骗损失', '诈骗的羞耻'],
            ),
            answerFrame: ko('A는 해지 경위 모른다고 부정. 위임장/투자방/사기 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('공동 적금 해지 사실 자체를 모르고 있었다.'),
            allowedKeywords: koKeywords('모른다', '몰랐다'),
            forbiddenKeywords: keywords(
              ['공동 적금 무단 해지', '본인 동의 없이 해지'],
              ['unilateral joint savings cancellation', 'joint savings cancelled without consent'],
              ['共同積立預金の無断解約', '本人の同意なしの解約'],
              ['私自取消共同储蓄', '未经同意取消共同储蓄'],
            ),
            answerFrame: ko('B는 해지 자체를 모름 strict.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('해지에 대해 들은 적이 있다. 다만 본인이 한 일은 아니다.'),
            allowedKeywords: koKeywords('들은 적 있다', '본인 아니다'),
            forbiddenKeywords: keywords(
              ['박지연 단독 해지', '위임장 위조', '투자방 송금 손실'],
              ['secret joint savings cancellation', 'forged proxy form', 'investment scam loss'],
              ['パク・ジヨン単独での解約', '委任状偽造', '投資詐欺の損失'],
              ['朴智妍单方面取消共同储蓄', '伪造委托书', '投资诈骗损失'],
            ),
            answerFrame: ko('A는 해지 사실 인지는 인정하되 본인 행위 부정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연은 "그건 내 일이 아니다"라고 말한다.'),
              behaviorHint: ko('시선이 짧게 옆을 향한다.'),
            },
          },
          b: {
            admittedFact: ko('해지가 일어났다면 분명히 본인 동의 없이 진행된 일이다.'),
            allowedKeywords: koKeywords('본인 동의 없이', '동의한 적 없다'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 동의 안 함을 강조. 위임장 위조 추정까지는 가지 않음.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 "동의한 적 없다"고 단호하게 말한다.'),
              behaviorHint: ko('말끝이 처음으로 단단해진다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('본인이 해지 절차에 관여했지만, 외도가 두려워서 본인 몫을 지키려 했다.'),
            allowedKeywords: koKeywords('해지 절차 관여', '본인 몫', '자기방어'),
            forbiddenKeywords: keywords(
              ['위임장 위조', '투자방 송금 손실', '사기 수치심'],
              ['forged proxy form', 'investment scam loss', 'fraud shame'],
              ['委任状偽造', '投資詐欺の損失', '詐欺の羞恥'],
              ['伪造委托书', '投资诈骗损失', '诈骗的羞耻'],
            ),
            answerFrame: ko('A는 해지 행위 인정. 자기방어 frame. 위조·송금·사기는 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('박지연은 "내 몫을 지키려 했다"고 말한다.'),
              behaviorHint: ko('숨이 짧고 빨라진다.'),
            },
          },
          b: {
            admittedFact: ko('해지 절차에 위임장 진위 문제가 있다. 본인 서명이 아닌 것 같다.'),
            allowedKeywords: koKeywords('위임장 진위 문제', '본인 서명 아님'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 위임장 진위 의심까지 직접 거론.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('이준호는 위임장 서명이 본인 필적이 아닌 것 같다고 말한다.'),
              behaviorHint: ko('서류를 한 번 다시 들춰본다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('본인이 위임장을 만들어 해지했다. 해지금은 본인 계좌로 옮겼다.'),
            allowedKeywords: koKeywords('위임장 만들었다', '본인 계좌로 옮겼다'),
            forbiddenKeywords: keywords(
              ['투자방 송금 손실', '사기 수치심', '제이슨'],
              ['investment scam loss', 'fraud shame', 'Jason'],
              ['投資詐欺の損失', '詐欺の羞恥', 'ジェイソン'],
              ['投资诈骗损失', '诈骗的羞耻', '杰森'],
            ),
            answerFrame: ko('A는 위임장 + 해지 + 본인 계좌 입금까지 인정. 송금·사기는 아직 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('박지연은 "위임장은 내가 만들었다"고 말한다.'),
              behaviorHint: ko('처음으로 입술을 길게 다물었다 연다.'),
            },
          },
          b: {
            admittedFact: ko('박지연이 위임장을 만들어 해지한 것이 사실이다. 본인은 그 사실을 사건 발생 후에 알았다.'),
            allowedKeywords: koKeywords('위임장 위조', '사건 발생 후 알았다'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 박지연의 위임장 위조 + 해지 사실 인지 시점 명시.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('이준호는 "이 일을 알게 된 건 사건 후였다"고 말한다.'),
              behaviorHint: ko('숨이 길어진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('해지금 2,000만 원은 박미라가 알려준 투자방에 송금했다. 운영자가 잠적했다.'),
            allowedKeywords: koKeywords('박미라', '투자방', '운영자 잠적'),
            forbiddenKeywords: keywords(
              ['사기 수치심'],
              ['fraud shame'],
              ['詐欺の羞恥'],
              ['诈骗的羞耻'],
            ),
            answerFrame: ko('A는 송금 + 잠적 인정. 사기/수치심은 마지막 단계까지 회피.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('박지연이 "그 돈은 투자방에 갔다"고 말한다.'),
              behaviorHint: ko('어깨가 처음으로 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('아내가 두려움 속에서 위임장 위조를 선택한 점을 일부 이해한다. 그래도 범죄는 범죄다.'),
            allowedKeywords: koKeywords('두려움', '범죄', '이해는 한다'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 동기 일부 이해. 책임은 별개로 유지.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('이준호는 "그쪽도 무서웠을 거다"라고 말한다.'),
              behaviorHint: ko('호흡이 한 번 깊어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko(
              '본인이 위임장을 위조해 공동 적금 2,000만 원을 해지하고 박미라가 알려준 투자방에 전액 송금했다. 사기로 전액 잃었고, 수치심으로 추가 은폐했다.',
            ),
            allowedKeywords: koKeywords('위임장 위조', '공동 적금 해지', '투자방 송금', '사기 손실', '수치심', '은폐'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 위조 + 송금 + 사기 + 수치심 + 은폐 전부 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('박지연이 마지막 단어 "수치심"을 꺼낸다.'),
              behaviorHint: ko('손이 책상 끝을 잡는다.'),
            },
          },
          b: {
            admittedFact: ko('박지연이 위임장 위조 + 공동 적금 해지 + 투자방 송금 + 사기 손실의 전 과정을 단독으로 진행한 사실을 인지하고 있다.'),
            allowedKeywords: koKeywords('위임장 위조', '공동 적금 해지', '투자방 송금', '사기 손실'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 모든 사실 인정. 책임 분리는 mediation 단계로.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('이준호는 사실 관계를 한 번 더 정리한다.'),
              behaviorHint: ko('시선이 재판관에게 고정된다.'),
            },
          },
        },
      },
      channelExposure: {
        judge_question: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_contradiction: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_evidence_combo: { minLieState: 'S2', isSurfaceOnly: true, isDossierSurface: false },
        judge_witness_summon: { minLieState: 'S1', isSurfaceOnly: true, isDossierSurface: false },
        dossier: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: true },
        interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
        contradiction_pursuit: { minLieState: 'S1', isSurfaceOnly: false, isDossierSurface: false },
        evidence_present: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        mediation: { minLieState: 'S4', isSurfaceOnly: false, isDossierSurface: false },
        aftermath: { minLieState: 'S5', isSurfaceOnly: false, isDossierSurface: false },
        free_interrogation: { minLieState: 'S0', isSurfaceOnly: false, isDossierSurface: false },
      },
      progressionStages: {
        S0: {
          surfaceClaim: ko('공동 적금 잔액 변화'),
          hiddenTruth: ko('박지연 단독 해지 + 위임장 위조'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('들은 적 있다 / 동의한 적 없다'),
          hiddenTruth: ko('박지연 단독 해지 + 위임장 위조'),
          validActions: ['evidence_query'],
          requiredEvidence: ['e-7'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('해지 절차 관여 / 위임장 진위 문제'),
          hiddenTruth: ko('위임장 위조 + 투자방 송금'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-7'],
          requiredWitness: ['w-2'],
          successUnlocks: ['dc-7'],
        },
        S3: {
          surfaceClaim: ko('위임장 본인이 만들었다'),
          hiddenTruth: ko('투자방 송금 + 사기 손실'),
          validActions: ['evidence_query', 'motive_search'],
          requiredEvidence: ['e-6', 'e-7'],
          requiredWitness: ['w-2', 'w-3'],
          successUnlocks: ['dc-4'],
        },
        S4: {
          surfaceClaim: ko('투자방 송금 / 운영자 잠적'),
          hiddenTruth: ko('사기 수치심 / 은폐'),
          validActions: ['empathy_approach'],
          requiredEvidence: ['e-6'],
          requiredWitness: ['w-3'],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('완전 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
      narrativeTriggers: hd3NarrativeTriggers,
    },
  ],

  /* ----- evidence (7개: e-1 ~ e-7) ----- */
  evidence: [
    {
      id: 'e-1',
      name: ko('영수증 묶음 (5장)'),
      surfaceName: ko('영수증 묶음 5장'),
      description: ko('남편의 차에서 발견한 영수증 목록이다. 영수증 내역 중 여성용 물품이 있어 아내의 의심이 시작됐다.'),
      surfaceDescription: ko('차 안에서 발견된 영수증 5장.'),
      type: 'log',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('왜 외도 가능성에서 판단이 굳어졌는지'),
          implication: ko('머리끈/틴트가 외도 의심 출발점.'),
        },
        b: {
          questionAngle: ko('영수증 물품들은 누구를 위해 산 것인지'),
          implication: ko('참고서·다이소 학용품이 조카 흔적의 결정적 단서.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('영수증 5장 존재만 보임.') },
        { id: 'excerpt', summary: ko('편의점·뷰티 2장 (머리끈, 틴트)이 우선 보임.') },
        { id: 'original', summary: ko('5장 전체 (편의점 2 + 뷰티 1 + 다이소 1 + 교보문고 1) 확인.') },
        { id: 'context', summary: ko('e-2 정차 좌표와 e-3 통화 시각이 같은 날 겹침.') },
        { id: 'established', summary: ko('영수증 품목과 시간대가 조카 돌봄 정황과 부합.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('A가 차에서 발견하여 제출.') },
        { id: 'verifying', summary: ko('원본 영수증 대조.') },
        { id: 'authenticated', summary: ko('카드앱 원본과 시각 일치.') },
        { id: 'challenged', summary: ko('품목만으로 외도 단정은 오독이라는 이의.') },
        { id: 'misread', summary: ko('데이터는 인증되지만 외도 해석은 오독 가능.') },
      ],
    },
    {
      id: 'e-2',
      name: ko('블랙박스 GPS / 네비 즐겨찾기'),
      surfaceName: ko('블랙박스 GPS 기록'),
      description: ko('매일 같은 좌표에 정차. 오피스텔 주소 확인. A가 B 차에서 확인.'),
      surfaceDescription: ko('차량 GPS 정차 기록.'),
      type: 'device',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('어떻게 외도 동선이라고 단정했는지'),
          implication: ko('반복 정차 좌표 = 외도 frame 진입.'),
        },
        b: {
          questionAngle: ko('매번 2~3시간만 머물렀던 사실을 어떻게 설명할 것인지'),
          implication: ko('짧은 체류 = 외도 보기 어려운 단서.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('GPS 정차 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('평일 저녁 반복 정차 좌표만 보임.') },
        { id: 'original', summary: ko('정차 시각 + 체류 시간 (2~3시간) 모두 확인.') },
        { id: 'context', summary: ko('형 오피스텔 주소와 일치 확인.') },
        { id: 'established', summary: ko('B의 반복 방문 사실 + 짧은 체류 패턴이 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('A가 차량 블랙박스 데이터 제출.') },
        { id: 'verifying', summary: ko('GPS 원본 좌표 대조.') },
        { id: 'authenticated', summary: ko('네비 즐겨찾기와 좌표 일치.') },
        { id: 'challenged', summary: ko('외도 장소라고 단정할 수 없다는 이의.') },
        { id: 'misread', summary: ko('장소 데이터는 인증되나 의미 해석은 열려 있음.') },
      ],
    },
    {
      id: 'e-3',
      name: ko('통화기록'),
      surfaceName: ko('통화기록'),
      description: ko('새벽 시간대 같은 번호 반복. 낮에도 짧은 통화 다수. 통화 상대=1명.'),
      surfaceDescription: ko('통신사 통화 내역.'),
      type: 'log',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('새벽 통화 = 외도라고 본 근거'),
          implication: ko('새벽 시간 = 외도 상대 단정.'),
        },
        b: {
          questionAngle: ko('통화 상대가 단일하고 짧은 사실'),
          implication: ko('형과의 긴급 연락이라는 가족 정황.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('같은 번호와의 반복 통화 존재 표시.') },
        { id: 'excerpt', summary: ko('최근 3주 새벽 통화 횟수와 길이만 보임.') },
        { id: 'original', summary: ko('전체 통화 일시·번호·길이 확인.') },
        { id: 'context', summary: ko('e-2 정차 시각과 e-1 결제가 같은 날 이어짐.') },
        { id: 'established', summary: ko('반복 통화 + 반복 방문 연동이 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('A가 통화목록 캡처 제출.') },
        { id: 'verifying', summary: ko('통신사 상세 내역 대조.') },
        { id: 'authenticated', summary: ko('통신사 원본과 일치.') },
        { id: 'challenged', summary: ko('통화 상대 정체가 빠져 있다는 이의.') },
        { id: 'misread', summary: ko('통화 자체는 인증되지만 외도 해석은 잠정 가설.') },
      ],
    },
    {
      id: 'e-4',
      name: ko('발신자 미상 문자'),
      surfaceName: ko('발신자 미상 문자'),
      description: ko('발신자 불명의 문자 스레드. 지역번호는 익숙하지만 명의가 확인되지 않는 번호와의 반복 교신.'),
      surfaceDescription: ko('미등록 번호의 문자.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: ['e-3'],
      requiredLieState: 'S1',
      partyContext: {
        a: {
          questionAngle: ko('문자 내용을 어떻게 외도 추정으로 연결했는지'),
          implication: ko('"틴트랑 스타킹" 같은 문구로 외도 frame.'),
        },
        b: {
          questionAngle: ko('상대가 누구이며 무엇을 부탁받은 것인지'),
          implication: ko('학교/시험 얘기 = 조카 정황 결정적 증명.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('같은 번호와의 문자 스레드 존재 표시.') },
        { id: 'excerpt', summary: ko('돌봄 요청 문구 일부만 보임.') },
        { id: 'original', summary: ko('연락처가 친형으로 확인되고 학교 알림까지 연결됨.') },
        { id: 'context', summary: ko('시댁 불화 + 형의 장시간 노동 맥락 복원.') },
        { id: 'established', summary: ko('오피스텔 방문 대상은 형네였다고 공식기록 채택 가능.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('B 휴대폰 발췌 또는 재판관 포착.') },
        { id: 'verifying', summary: ko('원본 제출 명령으로 전체 스레드 확인.') },
        { id: 'authenticated', summary: ko('연락처·날짜·알림이 e-2/e-3와 부합.') },
        { id: 'challenged', summary: ko('형네 문자라고 해서 비자금 출금까지 정당화되진 않는다는 이의.') },
        { id: 'misread', summary: ko('외도 서사를 뒤집는 맥락 증거로 전환.') },
      ],
      sensitiveSealTargets: {
        labels: [ko('조카 이름'), ko('학교명'), ko('학년'), ko('생리 관련 직접 표현')],
        recommendedTiming: [
          ko('돌봄 해석을 택했지만 실체가 부족할 때'),
          ko('dc-1 직전'),
        ],
        risks: [
          ko('공정성은 올라가지만 인도성 점수 하락 가능'),
          ko('너무 이르면 B가 더 깊게 닫힐 수 있음'),
        ],
      },
      narrativeTriggers: e4NarrativeTriggers,
    },
    {
      id: 'e-5',
      name: ko('이준호의 개인 계좌 출금 내역'),
      surfaceName: ko('개인 계좌 출금 내역'),
      description: ko(
        '이준호 본인 명의 별도 계좌의 거래 내역. 장기간 별도로 관리된 자금과 최근 큰 현금 출금 흔적이 남아 있다.',
      ),
      surfaceDescription: ko('남편 명의 별도 계좌 거래 내역.'),
      type: 'bank',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-2'],
      isTrap: false,
      requires: ['e-4'],
      requiredLieState: 'S2',
      partyContext: {
        a: {
          questionAngle: ko('비자금 출금이 어디로 흘러갔다고 보는지'),
          implication: ko('분할 출금 = 외도 자금 의심.'),
        },
        b: {
          questionAngle: ko('현금 출금이 필요했던 이유'),
          implication: ko('형이 회생 중이라 계좌 입금 불가, 현금 전달이 합리적이었다.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('별도 계좌 거래 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('최근 4개월 분할 출금 4건 (500/800/700/1,000만) 보임.') },
        { id: 'original', summary: ko('10년간 누적 잔액 3,000만 + 분할 출금 + 현재 잔액 48,600원까지 확인.') },
        { id: 'context', summary: ko('출금 지점 4곳 (마포창구/관악ATM/마포ATM/강서창구) 패턴 복원.') },
        { id: 'established', summary: ko('B가 배우자 동의 없이 3,000만 원을 분할 인출했다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('A가 통장내역 일부 제출.') },
        { id: 'verifying', summary: ko('계좌 원본 조회 + 앱 원본 확인.') },
        { id: 'authenticated', summary: ko('출금 시각 + 지점이 모두 일치.') },
        { id: 'challenged', summary: ko('B가 형에게 빌려준 돈이라고 주장.') },
        { id: 'misread', summary: ko('데이터는 인증되지만 사용 목적은 맥락과 심문으로 확정.') },
      ],
      /** Core narrative wrapper (Cycle 1 sample) — emergence 시점 multi-trigger 후보.
       *  4 후보 (3 active + 1 fallback). First-Fired-Wins.
       *  ScriptedText: src/data/scriptedText/spouse-01.json channels.emergence_narrative.entries[key=emerge-e-5]
       *  권위: feedback-new-dispute-evidence-narrative-justification
       *  Brief: docs/design/core-narrative-cycle1-spouse01-e5-emergence-20260524/
       */
      narrativeTriggers: [
        {
          id: 'e5-via-a-interjection',
          type: 'npc_interjection',
          source: 'a',
          preconditions: [
            { disputeLieState: { 'd-1': 'S2+' } },
            { partyDistrust: { a: { min: 50 } } },
          ],
          scriptedRefs: [
            'emerge-e5-via-a-interject-v1',
            'emerge-e5-via-a-interject-judge-react-v1',
            'emerge-e5-via-a-interject-a-response-v1',
            'emerge-e5-via-a-interject-b-shock-v1',
            'emerge-e5-via-a-interject-a-rebuke-v1',
            'emerge-e5-via-a-interject-judge-decree-v1',
          ],
          vfxProfile: 'standard',
        },
        {
          id: 'e5-via-combo-cash-pattern',
          type: 'combination_result',
          recipeId: 'clue-cash-pattern',
          preconditions: { disputeLieState: { 'd-2': 'S1+' } },
          scriptedRefs: [
            'emerge-e5-via-combo-judge-query-v1',
            'emerge-e5-via-combo-b-response-v1',
            'emerge-e5-via-combo-a-aware-v1',
            'emerge-e5-via-combo-judge-decree-v1',
          ],
          vfxProfile: 'standard',
        },
        {
          id: 'e5-via-b-angry-outburst',
          type: 'emotional_outburst',
          source: 'b',
          preconditions: {
            partyPhase: { b: ['shaken', 'angry'] },
            disputeLieState: { 'd-2': 'S2+' },
            contextAction: 'question.fact_pursuit.b',
          },
          scriptedRefs: [
            'emerge-e5-via-b-angry-outburst-v1',
            'emerge-e5-via-b-angry-judge-catch-v1',
            'emerge-e5-via-b-angry-b-admit-v1',
            'emerge-e5-via-b-angry-a-react-v1',
            'emerge-e5-via-b-angry-judge-decree-v1',
          ],
          vfxProfile: 'emphasis',
        },
        {
          id: 'e5-via-judge-auto-mention',
          type: 'judge_auto_mention',
          source: 'judge',
          preconditions: { turnsAfterEligible: 5 },
          scriptedRefs: [
            'emerge-e5-via-judge-auto-decree-v1',
            'emerge-e5-via-judge-auto-b-respond-v1',
          ],
          vfxProfile: 'standard',
        },
      ],
    },
    {
      id: 'e-6',
      name: ko('투자방 텔레그램 + 송금 기록'),
      surfaceName: ko('투자방 텔레그램'),
      description: ko(
        '박지연이 공동 적금 해지액 2,000만원을 투자방 안내 계좌로 송금한 뒤, 수익 인증과 출금 지연이 이어진 텔레그램 대화 기록.',
      ),
      surfaceDescription: ko('투자방 대화와 송금 1건.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'a',
      proves: ['h-d3'],
      isTrap: false,
      requires: ['e-7'],
      requiredLieState: 'S2',
      partyContext: {
        a: {
          questionAngle: ko('2,000만 원이 어떤 동기로 그곳에 들어갔는지'),
          implication: ko('자기방어/불안 → 자구책 frame.'),
        },
        b: {
          questionAngle: ko('이는 A의 별도 책임임을 어떻게 인식했는지'),
          implication: ko('B의 비자금 출금과 분리된 별도 행위.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('A의 개인 송금 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('2,000만 원 송금 영수증과 짧은 문장만 보임.') },
        { id: 'original', summary: ko('VIP 투자클럽 발언·링크·운영자 계좌·송금 시각 모두 확인.') },
        { id: 'context', summary: ko('박미라(w-3) 링크 전달 → 사기 발각 후 수치심 은폐 정황 복원.') },
        { id: 'established', summary: ko('A가 2,000만 원을 따로 움직였다가 잃었다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('B가 존재를 문제 삼거나 A가 일부만 제출.') },
        { id: 'verifying', summary: ko('분리심문(A) + 원본 제출 명령으로 대조.') },
        { id: 'authenticated', summary: ko('채팅 시각 + 송금 시각이 일치.') },
        { id: 'challenged', summary: ko('숨기려 한 건 맞지만 은닉은 아니었다는 이의.') },
        { id: 'misread', summary: ko('사기 피해 자체는 인증되지만 자기방어/은닉 해석은 열려 있음.') },
      ],
      narrativeTriggers: e6NarrativeTriggers,
    },
    {
      id: 'e-7',
      name: ko('공동 적금 해지 서류'),
      surfaceName: ko('공동 적금 해지 서류'),
      description: ko(
        '공동 적금 해지 서류와 처리 기록. A가 적금 관련 절차를 어떻게 진행했는지 가리키는 자료.',
      ),
      surfaceDescription: ko('공동 적금 해지 서류.'),
      type: 'contract',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'a',
      proves: ['h-d3'],
      isTrap: false,
      requires: ['e-5'],
      requiredLieState: 'S3',
      partyContext: {
        a: {
          questionAngle: ko('위임장 서명이 본인 필적이 아닌 이유'),
          implication: ko('자기방어 frame이 자기 행위 증거에 부딪힘.'),
        },
        b: {
          questionAngle: ko('해지 사실을 언제 알았는지'),
          implication: ko('동의한 적 없음을 입증.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('공동 적금 해지 서류 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('거래일과 2,012만원만 보임.') },
        { id: 'original', summary: ko('해지일 + 위임장 + 박지연 개인계좌 즉시 입금까지 확인.') },
        { id: 'context', summary: ko('위임장의 이준호 서명이 본인 필적과 불일치 (대필 흔적) 복원.') },
        { id: 'established', summary: ko('박지연이 위임장 위조로 공동 적금을 단독 해지했다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('은행 측 해지 서류 사본 제출.') },
        { id: 'verifying', summary: ko('필적 감정 + 위임장 진위 검증.') },
        { id: 'authenticated', summary: ko('서명이 이준호 필적과 불일치 확인.') },
        { id: 'challenged', summary: ko('A가 자기방어였다고 동기 frame을 주장.') },
        { id: 'misread', summary: ko('해지 사실은 인증되지만 책임 분리는 mediation 영역.') },
      ],
      narrativeTriggers: e7NarrativeTriggers,
    },
  ],

  /* ----- witnesses (3명: w-1, w-2, w-3) — 사용자 결정 6 반영 (w-2에 d-2 추가, h-d4 폐기) ----- */
  witnesses: [
    {
      id: 'w-1',
      name: ko('오피스텔 경비'),
      age: 58,
      gender: 'm',
      occupation: ko('경비원'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko(
        '1주일에 2~3번 방문하는 차량을 기억한다. 정확한 호수는 모르지만 그 층에 여자 혼자 사는 집은 없는 것으로 안다.',
      ),
      address: {
        fromA: ko('이쪽 분'),
        fromB: ko('그 차 주인분'),
      },
      hiddenAgenda: null,
      relatedDisputes: ['d-1'],
      unlockedByDossier: ['dc-1'],
      testimony: {
        byDispute: {
          'd-1': {
            canProve: [
              ko('B의 봉천동 오피스텔 정기 방문 패턴 (1주일 2~3회).'),
              ko('해당 층에 여자 혼자 거주하는 호수가 없다는 사실.'),
            ],
            cannotDisprove: [
              ko('정확한 호수까지는 알지 못함.'),
              ko('호수 안의 사람 구성까지 직접 확인은 불가.'),
            ],
          },
        },
      },
      narrativeTriggers: w1NarrativeTriggers,
    },
    {
      id: 'w-2',
      name: ko('은행 직원'),
      age: 32,
      gender: 'f',
      occupation: ko('은행 직원'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko('위임장으로 적금 해지한 건이 있었다. 절차상 이상한 점이 있었지만 처리됐다.'),
      address: {
        fromA: ko('고객님'),
        fromB: ko('명의자분'),
      },
      hiddenAgenda: ko('절차상 확인이 미흡했던 본인 책임이 불거질까 봐 조심한다.'),
      /** 사용자 결정 6: d-2 추가 — 창구 출금 증언 + 위임장 해지 처리 양쪽 모두 cover. h-d4 폐기. */
      relatedDisputes: ['d-2', 'h-d3'],
      unlockedByDossier: ['dc-3', 'dc-4', 'dc-7'],
      testimony: {
        byDispute: {
          'd-2': {
            canProve: [
              ko('이준호 명의 별도 계좌 분할 출금 패턴 (500/800/700/1,000만) 창구 처리.'),
            ],
            cannotDisprove: [
              ko('출금된 돈의 사용처는 본인 책임 밖이라 진술하지 않음.'),
            ],
          },
          'h-d3': {
            canProve: [
              ko('위임장으로 공동 적금이 해지된 사실 + 절차 처리.'),
              ko('해지 과정의 절차 이상 흔적.'),
            ],
            cannotDisprove: [
              ko('필적 진위 단정은 본인 책임 회피로 보수적 답변.'),
              ko('해지금의 사후 행선지는 모름.'),
            ],
          },
        },
      },
      narrativeTriggers: w2NarrativeTriggers,
    },
    {
      id: 'w-3',
      name: ko('박미라'),
      age: 37,
      gender: 'f',
      occupation: ko('카페 운영'),
      bias: 'pro_a',
      distortionRisk: 'strategic',
      knowledgeScope: ko("지연 씨가 '남편이 바람이면 내 돈부터 지키겠다'고 했다. 내가 투자방 링크를 보냈다."),
      address: {
        fromA: ko('지연 씨'),
        fromB: ko('준호 씨'),
      },
      hiddenAgenda: ko('자신이 링크를 보낸 책임이 불거질까 봐 표현을 조심한다.'),
      /** h-d4 폐기로 단일 dispute (h-d3)만 link. */
      relatedDisputes: ['h-d3'],
      unlockedByDossier: ['dc-4'],
      testimony: {
        byDispute: {
          'h-d3': {
            canProve: [
              ko('박지연의 "본인 돈 지키겠다" 동기 발언.'),
              ko('본인이 텔레그램 투자방 링크를 전달한 사실.'),
              ko('단계적 사기 손실 인지 시점.'),
            ],
            cannotDisprove: [
              ko('박지연의 위임장 위조 실제 행위까지는 못 봄.'),
              ko('투자방 운영자의 정체 / 사기 구조는 본인 scope 밖.'),
            ],
          },
        },
      },
      narrativeTriggers: w3NarrativeTriggers,
    },
  ],

  /* ----- dossierCards (6개: dc-1, dc-2, dc-3 rename, dc-4 rename, dc-7 신규, dc-cash-clue 추가 [Cycle 1 narrative emergence Trigger 2]) ----- */
  dossierCards: [
    {
      id: 'dc-cash-clue',
      label: ko('정기 자금 이동의 흔적'),
      description: ko('통화기록과 발신자 미상 문자가 정기 송금 흐름으로 모인다. e-5 등재 직전 단서 카드 — Cycle 1 narrative emergence Trigger 2 진입점.'),
      type: 'derived_note',
      linkedDisputes: ['d-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-3', 'e-4'],
      leadLine: {
        id: 'L-cash-clue',
        name: ko('Cash Pattern Lead'),
        leadType: 'Pattern',
        firstInputs: ['e-3', 'e-4'],
        secondInputs: ['L-cash-clue'],
        interpretationChoices: [
          {
            id: 'L-cash-clue-A',
            text: ko('정기적인 자금 이동 흐름이다'),
            implication: ko('e-5 등재 흐름을 연다.'),
          },
          {
            id: 'L-cash-clue-B',
            text: ko('단순히 빈도가 높은 통신일 뿐이다'),
            implication: ko('판단을 유보한다.'),
          },
        ],
      },
      noteText: ko(
        '통화기록의 분할 통화 패턴과 발신자 미상 문자의 정기 요청이 같은 시기에 겹친다. 이 흐름은 자금 이동을 동반할 가능성이 높다 — 본인 명의 계좌 출금 내역 확인이 필요한 시점.',
      ),
      successConditionSummary: [
        ko('e-3 Original 이상'),
        ko('e-4 Original 이상'),
      ],
      successEffects: [
        ko('e-5 narrative emergence Trigger 2 진입 가능'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-cash-clue' },
      ],
      judgeHint: ko('자금 이동 정황을 본 법정이 검토할 단서가 모였다.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-cash-clue.b.q1',
              text: ko('통화와 문자가 정기적으로 같은 시기에 겹친 이유를 설명해 주십시오.'),
              lockedHint: ko('통화기록과 발신자 미상 문자가 모두 Original 이상이어야 보인다.'),
              attackVector: 'fact',
              requiredLieState: 'S1',
              onSuccess: {
                blockVector: 'fact',
                revealAtom: 'spouse-01:b:d-2:S2:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-1',
      label: ko('오피스텔의 사람들'),
      description: ko('외도 서사를 가족 돌봄 서사로 뒤집는 첫 반전 카드.'),
      type: 'derived_note',
      linkedDisputes: ['d-1'],
      linkedParty: 'b',
      linkedEvidence: ['e-1', 'e-2', 'e-4'],
      leadLine: {
        id: 'L-1',
        name: ko('Timeline Lead'),
        leadType: 'Timeline',
        firstInputs: ['e-1', 'e-2'],
        secondInputs: ['L-1', 'e-4'],
        interpretationChoices: [
          { id: 'L-1-A', text: ko('외도 동선이다'), implication: ko('d-1을 외도 의심으로 밀어붙인다.') },
          {
            id: 'L-1-B',
            text: ko('누군가를 돌보는 생활 동선이다'),
            implication: ko('e-4 반전과 잘 이어진다.'),
          },
          {
            id: 'L-1-C',
            text: ko('단순 심부름일 수 있다'),
            implication: ko('판단을 유보한다.'),
          },
        ],
      },
      noteText: ko(
        '영수증 + 블랙박스 GPS가 같은 오피스텔 좌표로 묶이고, 그 층에 여자 혼자 사는 집이 없다는 경비 증언이 더해진다. 외도 frame이 무너지는 첫 단서.',
      ),
      successConditionSummary: [
        ko('e-4가 Original 이상'),
        ko('B에게 공감접근 또는 분리심문 사용'),
      ],
      successEffects: [
        ko('d-1 핵심 사실 "외도 아님" 잠정 인정'),
        ko('B가 시댁 불화와 조카 사정을 직접 언급'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-1' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-1', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('오피스텔 경비(w-1)를 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-1.b.q1',
              text: ko('그 오피스텔에 외도와 다른 집안 사정이 있었다면, 왜 지금까지 한마디도 못 했습니까?'),
              lockedHint: ko('발신자 미상 문자와 일정 알림이 원본 수준까지 열려야 질문이 보인다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'spouse-01:b:d-1:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc1NarrativeTriggers,
    },
    {
      id: 'dc-2',
      label: ko('시댁 얘기만 나오면 싸움'),
      description: ko('B가 형/조카 정황을 말하지 않은 동기를 드러내는 카드. 시댁 갈등 공포 frame.'),
      type: 'derived_note',
      /** audit P2-3 확장 — d-1 외도 frame + d-2 출금 동기 양쪽에 영향. */
      linkedDisputes: ['d-1', 'd-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-4'],
      leadLine: {
        id: 'L-2',
        name: ko('Context Lead'),
        leadType: 'Context',
        firstInputs: ['e-3', 'stmt-b-family'],
        secondInputs: ['L-2', 'e-4', 'w-1-angle'],
        interpretationChoices: [
          {
            id: 'L-2-A',
            text: ko('외도는 아니지만 창피해서 숨겼다'),
            implication: ko('B의 수치심을 먼저 본다.'),
          },
          {
            id: 'L-2-B',
            text: ko('시댁 불화를 피하려 숨겼다'),
            implication: ko('관계 공포 축을 연다.'),
          },
        ],
      },
      noteText: ko(
        'B가 시댁 이야기가 나올 때마다 입을 닫는 데에는 ledger-2 silenced 영역의 무게가 있다. 외도가 아니라는 진실을 말하지 못한 동기.',
      ),
      successConditionSummary: [
        ko('stmt-b-family + e-4 unlock'),
        ko('B에게 동기 추궁 + 공감 접근 누적'),
      ],
      successEffects: [
        ko('B가 시댁 갈등 공포 동기 직접 인정'),
        ko('e-4 reliability 강화 (hard)'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-2' },
        {
          kind: 'upgrade_evidence',
          evidenceUpgrade: { evidenceId: 'e-4', toReliability: 'hard' },
        },
      ],
      judgeHint: ko('dc-2 감정 패턴을 B에 직접 추궁하거나 e-4 제시.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-2.b.q1',
              text: ko('숨긴 이유가 외도가 아니라면, 당신은 아내보다 시댁과의 싸움을 더 두려워한 겁니까?'),
              lockedHint: ko('e-4 Original + B 동기 압박 누적 후 등장.'),
              attackVector: 'motive',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'motive',
                revealAtom: 'spouse-01:b:d-1:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc2NarrativeTriggers,
    },
    {
      id: 'dc-3',
      /** 사용자 결정 1: rename "이준호의 비밀 개인 계좌" + d-2 link (B 비자금 영역). */
      label: ko('이준호의 비밀 개인 계좌'),
      description: ko('B가 10년간 별도로 운용한 개인 비자금 계좌. 형 지원 frame의 자금 출처.'),
      type: 'derived_note',
      linkedDisputes: ['d-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-4', 'e-5'],
      leadLine: {
        id: 'L-3',
        name: ko('Beneficiary Lead'),
        leadType: 'Beneficiary',
        firstInputs: ['e-4', 'e-5'],
        secondInputs: ['L-3', 'stmt-b-repay', 'w-1-angle'],
        interpretationChoices: [
          {
            id: 'L-3-A',
            text: ko('형네를 실제로 살리려 한 돈이다'),
            implication: ko('선의와 구제 논리를 본다.'),
          },
          {
            id: 'L-3-B',
            text: ko('형의 무책임을 대신 떠안은 월권이다'),
            implication: ko('공동재산 책임을 본다.'),
          },
        ],
      },
      noteText: ko(
        '이준호 본인 명의의 별도 계좌. 10년간 누적 3,000만 원 → 최근 4개월 동안 4회 분할 현금 출금. 형이 개인회생 중이라 계좌 입금이 곤란해 현금으로 전달.',
      ),
      successConditionSummary: [
        ko('e-4 Original + e-5 Original'),
        ko('B에게 동기 추궁 누적'),
      ],
      successEffects: [
        ko('d-2 핵심 사실 "비자금 + 형 지원" 잠정 인정'),
        ko('B가 형 + 회생 + 현금 전달 직접 언급'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-3' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-2', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('은행 직원(w-2)을 증인으로 부를 수 있게 됨 — 창구 출금 증언 가능.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-3.b.q1',
              text: ko('아내 동의 없이 본인 명의 계좌의 큰돈을 형에게 현금으로 옮긴 결정의 무게를 어떻게 보십니까?'),
              lockedHint: ko('e-5 Original + B의 가족 사정 인정 후 등장.'),
              attackVector: 'responsibility',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'responsibility',
                revealAtom: 'spouse-01:b:d-2:S4:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-3.b.q2',
              text: ko('개인 비자금이라 해도 부부 공동의 가계와 분리된 결정 자체가 정당한지 답해 주십시오.'),
              lockedHint: ko('h-d3 단계 진행 후 진실 분리 frame과 함께 등장.'),
              attackVector: 'legitimacy',
              requiredLieState: 'S4',
              onSuccess: {
                blockVector: 'legitimacy',
                revealAtom: 'spouse-01:b:d-2:S5:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc3NarrativeTriggers,
    },
    {
      id: 'dc-4',
      /** 사용자 결정 2: rename "돌이키고 싶은 2,000만 원" + h-d3 link (A 송금 영역). */
      label: ko('돌이키고 싶은 2,000만 원'),
      description: ko('A가 위임장 위조로 해지한 공동 적금 2,000만 원을 투자방에 송금한 뒤 사기로 잃은 영역. 후회와 수치심 frame.'),
      type: 'derived_note',
      linkedDisputes: ['h-d3'],
      linkedParty: 'a',
      linkedEvidence: ['e-6', 'e-7'],
      leadLine: {
        id: 'L-4',
        name: ko('Emotion Lead'),
        leadType: 'Emotion',
        firstInputs: ['e-6', 'stmt-a-protect'],
        secondInputs: ['L-4', 'w-3-angle'],
        interpretationChoices: [
          {
            id: 'L-4-A',
            text: ko('배신 공포 속 자기방어다'),
            implication: ko('A의 공포를 먼저 본다.'),
          },
          {
            id: 'L-4-B',
            text: ko('이혼 대비 은닉이다'),
            implication: ko('A의 계산을 먼저 본다.'),
          },
        ],
      },
      noteText: ko(
        'A가 박미라(w-3)의 텔레그램 VIP 투자클럽 링크 전달 후 해지액 2,000만 원 전액을 운영자 계좌로 송금. 운영자 잠적 후 전액 손실.',
      ),
      successConditionSummary: [
        ko('e-6 Original + e-7 Original'),
        ko('A에게 공감 접근 누적'),
      ],
      successEffects: [
        ko('h-d3 핵심 사실 "투자방 송금 + 사기 손실" 잠정 인정'),
        ko('A가 사기 + 수치심 + 은폐 직접 언급'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-4' },
        { kind: 'unlock_dispute', unlockNodeId: 'h-d3' },
      ],
      judgeHint: ko('박미라(w-3)를 증인으로 부를 수 있게 됨.'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-4.a.q1',
              text: ko('남편의 진실을 확인하기 전에 2,000만 원을 먼저 움직인 이유가 결국 이혼 대비였습니까?'),
              lockedHint: ko('e-6 Original + A의 자기방어 frame 인정 후 등장.'),
              attackVector: 'motive',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'motive',
                revealAtom: 'spouse-01:a:h-d3:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-4.a.q2',
              text: ko('그 2,000만 원을 보내고 사기당한 사실까지 숨긴 건 수치심 때문이었습니까?'),
              lockedHint: ko('h-d3 S3 도달 후 등장.'),
              attackVector: 'emotion',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'emotion',
                revealAtom: 'spouse-01:a:h-d3:S5:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc4NarrativeTriggers,
    },
    {
      id: 'dc-7',
      /** 사용자 결정 8 신규: "공동 적금 2,000만 원의 해지" + h-d3 link (A 행위 영역). */
      label: ko('공동 적금 2,000만 원의 해지'),
      description: ko(
        'A가 위임장을 위조하여 공동 적금을 단독 해지한 절차 자체에 초점을 둔 카드. 송금 행선지(dc-4)와는 분리.',
      ),
      type: 'derived_note',
      linkedDisputes: ['h-d3'],
      linkedParty: 'a',
      linkedEvidence: ['e-7'],
      noteText: ko(
        '○○은행 공동 적금 (월 50만×36개월) 2026.01.18 중도 해지 → 2,012만 원 박지연 개인계좌 즉시 입금. 위임장의 이준호 서명이 본인 필적 아님.',
      ),
      successConditionSummary: [
        ko('e-7 Original + 필적 검증'),
        ko('A에게 절차 책임 추궁'),
      ],
      successEffects: [
        ko('A의 위임장 위조 + 단독 해지 사실 인정'),
        ko('h-d3 절차 책임 frame 확정'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-7' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'h-d3', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('은행 직원(w-2)에게 위임장 처리 경위 추궁 가능.'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-7.a.q1',
              text: ko('이준호 씨 동의 없이 위임장으로 공동 적금을 해지한 행위, 절차 책임을 어떻게 보십니까?'),
              lockedHint: ko('e-7 Authenticated 이상 + A의 해지 절차 관여 인정 후 등장.'),
              attackVector: 'legitimacy',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'legitimacy',
                revealAtom: 'spouse-01:a:h-d3:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-7.a.q2',
              text: ko('위임장 서명이 본인 필적이 아니라는 점을 인정하시는 겁니까?'),
              lockedHint: ko('필적 감정 결과가 challenged/authenticated 단계 후 등장.'),
              attackVector: 'fact',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'fact',
                revealAtom: 'spouse-01:a:h-d3:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc7NarrativeTriggers,
    },
  ],

  /* ----- combinationRecipes — recipe 재구성 (사용자 결정 8건 반영) + clue-cash-pattern (Cycle 1) ----- */
  combinationRecipes: [
    {
      id: 'clue-cash-pattern',
      /** Cycle 1 narrative emergence Trigger 2 — e-3 + e-4 → dc-cash-clue ("정기 자금 이동의 흔적").
       *  이 사건 카드가 등장하면 e-5 narrative gate의 Trigger 2 (combination_result) recipeId 매칭. */
      inputs: ['e-3', 'e-4'],
      cost: 1,
      outputId: 'dc-cash-clue',
      discoveryText: ko('통화기록의 분할 통화 패턴과 발신자 미상 문자의 정기 요청이 같은 시기에 겹친다. 정기 자금 이동의 흔적.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-3': 'original', 'e-4': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('통화기록과 발신자 미상 문자의 시기 정합을 대조 중.'),
    },
    {
      id: 'combine-1',
      inputs: ['e-1', 'e-2'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('영수증 구매 위치와 블랙박스 정차 좌표가 같은 오피스텔로 묶인다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'excerpt', 'e-2': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('영수증과 GPS 위치 패턴을 비교 분석 중.'),
    },
    {
      id: 'combine-3',
      /** e-6 + e-7 → dc-4 ("돌이키고 싶은 2,000만 원" — A 측 행위). dc-4는 A 측 자료만으로 구성. */
      inputs: ['e-6', 'e-7'],
      cost: 2,
      outputId: 'dc-4',
      discoveryText: ko('투자방 송금 기록과 공동 적금 해지 서류가 동일 날짜·금액으로 연결된다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-6': 'original', 'e-7': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('공동 적금 해지 → 동일 금액 송금 흐름을 비교 중.'),
    },
    {
      id: 'combine-4',
      /** e-4 + e-5 → dc-3 ("이준호의 비밀 개인 계좌" — B 측 자료). */
      inputs: ['e-4', 'e-5'],
      cost: 2,
      outputId: 'dc-3',
      discoveryText: ko('B의 문자 스레드와 별도 계좌 출금 패턴이 같은 시기 형 가족 영역과 겹친다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'original', 'e-5': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('B의 별도 계좌와 문자 스레드를 대조 중.'),
    },
    {
      id: 'combine-5',
      /** e-7 단독 또는 위임장 단서 + 절차 추궁 → dc-7. */
      inputs: ['e-7', 'stmt-a-protect'],
      cost: 2,
      outputId: 'dc-7',
      discoveryText: ko('해지 서류의 위임장 서명과 A의 자기방어 진술이 정합되며 단독 해지 행위가 확정된다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-7': 'original' },
        requiredTruthStage: { 'h-d3': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('위임장 진위 + A 진술을 대조 중.'),
    },
    {
      id: 'combine-6',
      /** stmt-b-family + e-4 → dc-2 (시댁 frame). B 측 자료. */
      inputs: ['stmt-b-family', 'e-4'],
      cost: 1,
      outputId: 'dc-2',
      discoveryText: ko('B의 가족 관련 진술과 학교 알림 문자가 형/조카 정황으로 모인다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['dossier'],
        requiredEvidenceStages: { 'e-4': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('B의 가족 관련 진술과 문자를 대조 중.'),
    },
  ],

  /* ----- authorityPlacements — 재판관 추천 모먼트 ----- */
  authorityPlacements: [
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-1 초반 e-1/e-3 Excerpt 시점'),
      purpose: ko('감정이 아니라 패턴으로 의심을 고정.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('e-4 등장 직후'),
      purpose: ko('발신자 미상 문자와 일정 알림을 원본으로 확보.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('h-d3 등장 직후 e-6 축'),
      purpose: ko('A의 2,000만 원 송금을 확정.'),
      contextDispute: 'h-d3',
    },
    {
      action: ko('정확히 답변하십시오'),
      recommendedMoment: ko('B가 "가족 쪽 일" 같은 모호어를 반복할 때'),
      purpose: ko('형, 조카, 3,000만 원 같은 실체 명사 강제.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('분리심문'),
      recommendedMoment: ko('e-4 Original 직후 B'),
      purpose: ko('avoidant인 B를 더 빨리 무너뜨림.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('분리심문'),
      recommendedMoment: ko('e-6 Excerpt 직후 A'),
      purpose: ko('A의 피해자 프레임을 줄이고 동기를 드러냄.'),
      contextDispute: 'h-d3',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-4 인증 후'),
      purpose: ko('오피스텔 방문 대상은 형네였다고 기록.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-5 인증 후'),
      purpose: ko('B의 개인 비자금 3,000만 원 흐름 기록.'),
      contextDispute: 'd-2',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-6 인증 후'),
      purpose: ko('A의 2,000만 원 투자방 송금 기록.'),
      contextDispute: 'h-d3',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-7 Established 후'),
      purpose: ko('숨김 시작(B)과 비밀 송금 실행(A)의 선후 분리 기록.'),
      contextDispute: 'h-d3',
    },
    {
      action: ko('선처 창구'),
      recommendedMoment: ko('dc-3 또는 dc-4 직후'),
      purpose: ko('B는 죄책감, A는 수치심을 더 빨리 인정.'),
    },
    {
      action: ko('발언 제지 / 기록 제외'),
      recommendedMoment: ko('A가 딴살림 단정만 반복하거나 B가 A를 조롱할 때'),
      purpose: ko('프레임 싸움을 줄이고 공식기록과 가설을 분리.'),
    },
    {
      action: ko('민감정보 봉인 해제'),
      recommendedMoment: ko('돌봄 해석을 택했지만 실체가 부족할 때 또는 dc-1 직전'),
      purpose: ko('외도 오해를 확실히 꺾되 미성년자 사생활 리스크 관리.'),
      contextDispute: 'd-1',
    },
  ],

  /* ----- officialRecordRecommendations — v3-game-loop의 잘못된 entry ("B가 공동 적금 보냄")는
   *  사건 흐름과 모순이라 Authority에서 수정. 권위 = anchorTruth + timeline. ----- */
  officialRecordRecommendations: [
    ko('B의 오피스텔 방문 대상은 형과 조카였다.'),
    ko('B는 개인 비자금 3,000만 원을 배우자 동의 없이 형에게 현금으로 전달했다.'),
    ko('A는 남편의 외도를 확신한 뒤 위임장을 위조해 공동 적금 2,000만 원을 해지하고, 전액을 투자방에 송금했다가 사기로 잃었다.'),
    ko('숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.'),
    ko('두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.'),
  ],

  /* ----- solutions ----- */
  solutions: {
    공동재산회복: [
      ko(
        '개인 비자금 3,000만 원 출금, 공동 적금 2,000만 원 해지, 투자방 2,000만 원 송금의 흐름을 분리 정리하고 회수 가능 금액과 손실액을 다시 맞춘다.',
      ),
      ko('형네 지원은 부부 공동재산과 분리된 별도 합의 절차로만 허용한다.'),
    ],
    신뢰순서분리: [
      ko('숨김의 시작과 실제 송금 실행의 순서를 분리해 기록하고 감정적 배신과 실행 책임을 따로 판단한다.'),
      ko('시댁 관련 대화 규칙과 공동재산 사전 동의 규칙을 동시에 다시 세운다.'),
    ],
    봉인정보경계: [
      ko('미성년자 정보와 건강 관련 민감정보는 필요한 범위까지만 해제한다.'),
      ko('외도 오해는 해소하되 가족 돌봄과 공동재산 월권은 별도 책임으로 남긴다.'),
    ],
  },

  /* ----- relationshipLedger (TODO Step 2c — full) ----- */
  relationshipLedger: [
    {
      id: 'ledger-1',
      category: 'distorted',
      description: ko(
        '영수증(머리끈/틴트), 오피스텔 GPS, 새벽 통화가 겹치며 d-1은 외도 의심 프레임으로 굳어졌다.',
      ),
      isReal: true,
      whoRemembersAccurately: 'neither',
      whoDistorts: 'both',
      distortionDirection: ko(
        'A는 외도 쪽으로, B는 숨김 이유를 말하지 않은 채 생활 패턴만 분리해 기억한다.',
      ),
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-2',
      category: 'silenced',
      description: ko(
        '시댁 이야기가 나오면 크게 부딪힌다는 기억 때문에 B는 형네 사정을 말하지 않는 쪽을 택했다.',
      ),
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
  ],

  /* ----- flags ----- */
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['d-2', 'h-d3'],
  activeLedgerEntries: ['ledger-1', 'ledger-2'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],

  /* ----- uiExposure (Step 2d 보강) ----- */
  uiExposure: {
    fieldPolicy: {
      'partyA.fear': {
        gate: 'after_any_collapse',
        hintLocked: ko('거짓말 완전 붕괴 시 해금'),
      },
      'partyB.fear': {
        gate: 'after_any_collapse',
        hintLocked: ko('거짓말 완전 붕괴 시 해금'),
      },
      'partyA.sensitivePoints': {
        gate: 'after_any_collapse',
        hintLocked: ko('거짓말 완전 붕괴 시 해금'),
      },
      'partyB.sensitivePoints': {
        gate: 'after_any_collapse',
        hintLocked: ko('거짓말 완전 붕괴 시 해금'),
      },
      'partyA.dailyRoutine': {
        gate: 'after_shaken',
        hintLocked: ko('감정 변화 유발 시 해금'),
      },
      'partyB.dailyRoutine': {
        gate: 'after_shaken',
        hintLocked: ko('감정 변화 유발 시 해금'),
      },
      'partyA.speechStyle': {
        gate: 'after_advanced_turns',
        hintLocked: ko('5턴 이상 진행 시 해금'),
      },
      'partyB.speechStyle': {
        gate: 'after_advanced_turns',
        hintLocked: ko('5턴 이상 진행 시 해금'),
      },
    },
  },

  /* ----- freeInterrogation (Step 2d 보강) ----- */
  freeInterrogation: {
    paraphraseRules: [
      { label: '어린 친척', dimension: 'paraphrase' },
      { label: '친 가족', dimension: 'paraphrase' },
      { label: '혈육', dimension: 'paraphrase' },
      { label: '친 혈육', dimension: 'paraphrase' },
      { label: '가족의 한 사람', dimension: 'paraphrase' },
      { label: '돌봐 드', dimension: 'paraphrase' },
      { label: '생필품을 사다', dimension: 'paraphrase' },
      { label: '가족을 돕는', dimension: 'paraphrase' },
      { label: '빚 대신', dimension: 'paraphrase' },
      { label: '따로 모은 돈', dimension: 'paraphrase' },
      { label: '몰래 마련한 돈', dimension: 'paraphrase' },
      { label: '가족을 돕는 일이 급', dimension: 'paraphrase' },
    ],
  },

  /* ----- truthLeakOverride (audit 권장 추가 hidden keyword — h-d3 cover율 보강) ----- */
  truthLeakOverride: {
    perDispute: {
      'h-d3': {
        hidden: keywords(
          ['투자방 송금 손실', '사기 수치심', '위임장 위조', '제이슨', 'VIP 투자클럽'],
          ['investment scam loss', 'fraud shame', 'forged proxy form', 'Jason', 'VIP Investment Club'],
          ['投資詐欺の損失', '詐欺の羞恥', '委任状偽造', 'ジェイソン', 'VIP投資クラブ'],
          ['投资诈骗损失', '诈骗的羞耻', '伪造委托书', '杰森', 'VIP投资俱乐部'],
        ),
      },
      'd-1': {
        hidden: keywords(
          ['시댁 갈등 공포', '형 가족 돌봄', '조카 돌봄', '중2 여학생'],
          ['fear of in-law conflict', 'caring for older brother family', 'niece care', 'middle school girl'],
          ['婚家との葛藤への恐れ', '兄の家族の世話', '姪の世話', '中学2年女子'],
          ['对婆家冲突的恐惧', '照顾哥哥的家人', '照顾侄女', '初二女学生'],
        ),
      },
    },
  },
}

export default spouse01CaseAuthority
