/**
 * family-01 — Core Case Authority
 *
 * 권위 단일 출처. 본 파일이 변경되면 `scripts/build-core-case.mjs`가 4 derived layer
 * (cases/generated, claimPolicies/{caseId}-v3-game-loop-data, disclosurePolicy, truth-leak-matrix)를 자동 sync.
 *
 * 본 파일은 KO 권위만 채운다. EN/JA/ZH-CN은 translate pass (Codex/GPT Pro) 이후 채워짐.
 * truthStages.forbiddenKeywords + truthLeakOverride는 이미 truth-leak-matrix에 4언어 등록되어 있으므로 4언어 모두 채움.
 *
 * 사건 핵심 (2026-05-22 사용자 확정):
 *   - dispute: d-1, d-2, d-3, d-4, d-5 (5 chain). h-d* hidden dispute 없음.
 *   - dossier: dc-1 ~ dc-5 (모두 single-party link, dc-5는 linkedParty='b' + a 측 challenge 1건 포함)
 *   - e-5 (자필 연습본 90:10) = d-5 evidence로 재배치 (직전 세션 결과 — d-2 narrative는 절차만)
 *   - baseEvidenceIds: ['e-1', 'e-2', 'e-4'] — 공증본 + 방문기록 + 공증인 메모 (surface band)
 *   - monetaryDisputeIds: ['d-2', 'd-3', 'd-5']
 *
 * Schema: [src/types/coreCase.ts](../../types/coreCase.ts)
 */

import {
  type CoreCaseAuthority,
  type LocalizedString,
  type LocalizedKeywordSet,
} from '../../types/coreCase'
import {
  dc1NarrativeTriggers,
  w1NarrativeTriggers,
  d2NarrativeTriggers,
  dc2NarrativeTriggers,
  w2NarrativeTriggers,
  d3NarrativeTriggers,
  w3NarrativeTriggers,
  d4NarrativeTriggers,
  e7NarrativeTriggers,
  dc4NarrativeTriggers,
  d5NarrativeTriggers,
  e5NarrativeTriggers,
  dc5NarrativeTriggers,
} from './family-01.narrative'

/* ============================================================================
 * Helpers
 * ========================================================================== */

const ko = (text: string): LocalizedString => ({ ko: text, en: null, ja: null, 'zh-CN': null })

const _i18n = (
  koText: string,
  enText: string,
  jaText: string,
  zhCNText: string,
): LocalizedString => ({ ko: koText, en: enText, ja: jaText, 'zh-CN': zhCNText })

const koKeywords = (...kos: string[]): LocalizedKeywordSet => ({
  ko: kos,
  en: null,
  ja: null,
  'zh-CN': null,
})

const keywords = (
  koArr: string[],
  enArr: string[],
  jaArr: string[],
  zhCNArr: string[],
): LocalizedKeywordSet => ({ ko: koArr, en: enArr, ja: jaArr, 'zh-CN': zhCNArr })

/* ============================================================================
 * Authority
 * ========================================================================== */

export const family01CaseAuthority: CoreCaseAuthority = {
  /* ----- meta ----- */
  meta: {
    caseId: 'family-01',
    caseNumber: 'TE-FamilyV401',
    caseName: ko('치매 어머니의 유서'),
    schemaVersion: 'core-case-v1',
    title: ko('치매 어머니의 유서'),
    relationshipType: 'family',
    familyRelation: 'siblings',
    contextType: 'inheritance_will_reframe',
    difficulty: 'hard',
    anchorTruth: ko(
      '공증본 60:40은 어머니 자필 연습본의 90:10을 윤정후가 절차 안에서 줄인 결과다. 윤정후는 형이 아버지의 친자가 아니라는 비밀을 알고도 가업 공장을 양보했고, 그 뒤 20년 동안 어머니 통장을 거쳐 형 쪽으로 월 정기금과 공장 위기 3억원을 보내왔다. 형은 그 돈이 어머니 돈인 줄 알았다.',
    ),
    emotionalBait: ko(
      '동생을 평생 못마땅해하던 윤태성은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다.',
    ),
    resolutionDilemma: ko(
      '유언장에 손댄 책임, 어머니의 판단 능력, 형제 사이에 숨겨진 오래된 부담을 함께 판단해야 한다. 자기 몫을 줄이는 방향으로 절차에 개입한 동생과, 평생 돌봄을 보상으로 여겨 온 형 중 누가 어떤 무게를 진다.',
    ),
    conflictSeed: ko('TE-FamilyV401'),
    variableModules: ['VM-family-v4-a', 'VM-family-v4-b'],
    twistModule: 'TW-family-v4-1',
    sensitivityTags: ['inheritance_dispute', 'dementia_capacity', 'birth_secret', 'document_forgery'],
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
      '치매 어머니가 남긴 유서에서 동생 60%, 형 40%로 적혀 있다. 평생 어머니를 모시고 살았다고 자부하는 윤태성은 분노하고, 동생은 끝까지 담담하다.',
    ),
    emotionalPressure: 9,
    affects: 'both',
    triggerAmplifier: ko(
      '초반에는 유서 비율과 요양원 방문 기록이 윤정후의 개입처럼 보인다. 그러나 공증인 메모와 자필 연습본, 오래된 계좌 흐름, 어머니 일기장이 차례로 열리면 사건의 중심은 단순한 유산 다툼을 넘어선다.',
    ),
  },

  /* ----- parties ----- */
  parties: {
    a: {
      id: 'a',
      name: ko('윤태성'),
      age: 48,
      occupation: ko('주방가구 공장 대표'),
      incomeBracket: 'mid',
      archetype: 'confrontational',
      speechStyle: ko(
        '목소리를 높여 상대를 누르고, 형이라는 위치를 먼저 내세운다. 불리해지면 동생의 인격을 깎아내리며 질문 자체를 무력화하려 든다.',
      ),
      pride: 8,
      fear: ko('평생 장남이라 믿었던 자기 정체성이 무너지는 것을 가장 두려워한다.'),
      riskAppetite: 7,
      digitalHabit: 'minimal',
      dailyRoutine: ko(
        '공장에서 주문을 처리하고 저녁엔 어머니 집에 들러 자신이 돌봤다는 생활을 유지해왔다.',
      ),
      sensitivePoints: [
        ko('장남이라는 자기 위치'),
        ko('공장 위기 당시 어디서 돈이 들어왔는지'),
        ko('자기 정체성에 관한 오래된 가족 사정'),
      ],
      verbalTells: [
        {
          type: 'rank_pull',
          trigger: 'cornered',
          pattern: ko('불리해지면 "형인 내가 모시고 살았다"며 서열을 내세워 논점을 돌린다.'),
        },
        {
          type: 'character_attack',
          trigger: 'lying',
          pattern: ko('동생의 성격이나 과거를 꺼내며 상대 신뢰도를 먼저 깎으려 한다.'),
        },
        {
          type: 'volume_escalation',
          trigger: 'emotional',
          pattern: ko('감정이 올라오면 목소리부터 커지며 상대가 말을 잇지 못하게 만든다.'),
        },
      ],
      callTerms: {
        toPartner: ko('정후야'),
        toJudge: ko('제 동생'),
        angry: ko('윤정후!'),
      },
      pcFaceType: 'male_middle',
    },
    b: {
      id: 'b',
      name: ko('윤정후'),
      age: 44,
      occupation: ko('자동차부품 가게 운영'),
      incomeBracket: 'mid',
      archetype: 'affect_flattening',
      speechStyle: ko(
        '감정을 최대한 억누르며 사실만 짧게 말한다. 담담해 보이지만 그 담담함이 오히려 의심을 산다. 진짜 감정은 마지막까지 드러내지 않으려 한다.',
      ),
      pride: 5,
      fear: ko('형이 오래된 가족 기록의 의미를 감당하지 못하는 것을 가장 두려워한다.'),
      riskAppetite: 3,
      digitalHabit: 'minimal',
      dailyRoutine: ko(
        '본래 부모님이 자신에게 물려주려던 가업 공장을 형에게 양보하고 본인은 작은 자동차부품 가게로 시작했으며, 그 가게를 운영하며 틈틈이 어머니에게 송금하고 형 몰래 정기 지원금과 병원비를 대 왔다.',
      ),
      sensitivePoints: [
        ko('자필 연습본의 비율을 줄인 책임'),
        ko('형 몰래 20년간 이어간 비밀 지원'),
        ko('형에게 말하지 못한 가족 기록'),
      ],
      verbalTells: [
        {
          type: 'flat_deflection',
          trigger: 'cornered',
          pattern: ko('핵심 질문을 받으면 답변 범위를 좁히며 감정을 드러내지 않고 방어한다.'),
        },
        {
          type: 'silence_shield',
          trigger: 'lying',
          pattern: ko('거짓보다는 침묵을 택하며, 말하지 않는 것으로 진실을 숨긴다.'),
        },
        {
          type: 'delayed_crack',
          trigger: 'emotional',
          pattern: ko('상대가 무너질까 봐 그랬다는 말이 먼저 새어 나온다.'),
        },
      ],
      callTerms: {
        toPartner: ko('형'),
        toJudge: ko('저희 형'),
        angry: ko('윤태성!'),
      },
      pcFaceType: 'male_young',
    },
  },

  /* ----- timeline (6 stage 권위) ----- */
  timeline: [
    {
      stage: 0,
      whenLabel: ko('20여 년 전'),
      actor: 'b',
      action: ko(
        '윤정후는 어머니에게서 아버지가 윤태성의 친부가 아니라는 사실을 듣고, 본인이 물려받을 예정이던 가업 공장을 형에게 양보한다. 본인은 자동차부품 가게로 시작한다.',
      ),
      aPerception: ko('공장을 형이 운영하는 것을 당연히 여긴다.'),
      bPerception: ko('전부 인지. 형이 무너지지 않게 하기 위한 결정.'),
      exposureGate: {
        minLieState: 'S4',
        allowedChannels: ['aftermath', 'dossier'],
      },
      sourceFacts: ['ledger-3', 'diary-birth-secret'],
    },
    {
      stage: 1,
      whenLabel: ko('약 20년간'),
      actor: 'b',
      action: ko(
        '윤정후는 어머니 통장을 거쳐 매달 일정액의 정기 지원금을 보낸다. 형은 그 돈이 어머니 돈인 줄 안다. 공장 위기 시점에는 3억원도 같은 경로로 형에게 흘러간다.',
      ),
      aPerception: ko('어머니가 자신에게 보낸 돈이라고 믿는다.'),
      bPerception: ko('전부 인지.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['ledger-2', 'e-6_flow'],
    },
    {
      stage: 2,
      whenLabel: ko('말년 (2025.09~10)'),
      actor: 'b',
      action: ko(
        '어머니가 요양 단계에 들어선 후 윤정후의 요양원 방문이 공증 3주 전부터 급증한다. 어머니에게 종이를 읽어드리는 모습이 전 요양보호사에게 목격된다.',
      ),
      aPerception: ko('동생이 어머니를 자주 본다는 정도만 인지.'),
      bPerception: ko('어머니의 자필 연습본을 함께 보고 비율을 정리하려 했다.'),
      exposureGate: {
        minLieState: 'S1',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-2_visits', 'w-1_caregiver_observation'],
    },
    {
      stage: 3,
      whenLabel: ko('공증 직전 (2025.10.14)'),
      actor: 'system',
      action: ko(
        '담당 요양보호사가 교체된다. 최복순은 그만두고 박○○으로 바뀐다. 공증 절차 직전 단계.',
      ),
      aPerception: ko('교체 사실 자체만 인지.'),
      bPerception: ko('교체 시점을 정확히 인지.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-2_handover'],
    },
    {
      stage: 4,
      whenLabel: ko('공증 당일 (2025.11.05)'),
      actor: 'b',
      action: ko(
        '오전 1차 접수에서는 분배 비율이 비어 있다. 오후 수정 접수에서 윤정후의 진행 압박 아래 60:40으로 확정된다. 어머니 상태가 불안정한 가운데 절차가 마무리된다.',
      ),
      aPerception: ko('공증본만 보며 결과만 안다.'),
      bPerception: ko('자필 90:10을 공증 60:40으로 줄이는 방향으로 자기 손으로 마무리.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-1_notary', 'e-4_notary_memo'],
    },
    {
      stage: 5,
      whenLabel: ko('어머니 사망 직후 ~ 조사 시점'),
      actor: 'system',
      action: ko(
        '어머니 자필 연습본 (정후 90, 태성 10)이 유품에서 발견된다. 어머니 일기장에서 출생 비밀과 두 아들에 대한 어머니의 마음, 윤정후의 사전 인지가 드러난다.',
      ),
      aPerception: ko('연습본 존재만 알게 됨. 정확한 비율은 사건 조사 후반 단계에 인지.'),
      bPerception: ko('전부 인지.'),
      exposureGate: {
        minLieState: 'S5',
        allowedChannels: ['aftermath', 'dossier'],
      },
      sourceFacts: ['e-5_handwriting', 'e-7_diary'],
    },
  ],

  /* ----- truthTable ----- */
  truthTable: [
    {
      id: 't-1',
      fact: ko('어머니는 말년에 판단 능력이 완전히 상실되지는 않았으나, 윤정후의 개입이 유서 작성에 영향을 미쳤다.'),
      isTrue: true,
      weight: 9,
      quadrant: 'both_know',
    },
    {
      id: 't-2',
      fact: ko('공증본은 60:40이었고, 별도 자필 유언장 연습본은 90:10이다. 윤정후는 절차에 손댔지만 더 받으려 한 조작은 아니라 자기 몫을 줄이는 방향이었다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-3',
      fact: ko('윤정후 돈이 어머니 통장을 거쳐 월 단위로 들어갔고, 공장 위기 때 3억원도 같은 경로로 전달됐다. 윤태성은 그 돈이 어머니 돈인 줄 안다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-4',
      fact: ko('어머니 일기장은 윤태성이 아버지의 친자가 아니라는 사실과 어머니 입장에서는 두 아들 모두 똑같은 자식이라는 뉘앙스, 그리고 친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보했다는 사실을 함께 남긴다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-5',
      fact: ko('둘 다 어머니 뜻을 있는 그대로 두지 못했다. 윤태성은 유산을 당연시했고, 윤정후는 형을 보호하려 유언장에 손댔다.'),
      isTrue: true,
      weight: 8,
      quadrant: 'both_know',
    },
  ],

  /* ----- disputes (5개: d-1 ~ d-5) ----- */
  disputes: [
    /* ============================================================
     * dispute d-1 — 유서 작성과 판단 능력
     *
     * A는 어머니 판단능력 전면 무효 + 동생 개입 단정. B는 어머니 뜻 인정하되 개입 정도는 흐림.
     * 핵심 = 도움과 개입의 경계. dossier dc-1 ("말년의 종이")와 link.
     * ============================================================ */
    {
      id: 'd-1',
      name: ko('유서 작성과 판단 능력'),
      truth: true,
      truthDescription: ko(
        '윤정후는 어머니 말년에 자주 방문하며 유서 내용을 논의했다. 요양보호사 교체와 공증 시점이 겹치지만, 어머니 의사를 완전히 무시한 것은 아니었다.',
      ),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: true,
      hidden: false,
      v3Visibility: 'initial',
      correctResponsibility: { a: 30, b: 70 },
      /* schema ambiguity 'medium' 미지원 — legacy case JSON의 d-1 ambiguity='medium' → 'low'로 조정. evidence 분명. */
      mediationLink: '말년 유서 작성 과정의 적법성',
      requiredEvidence: ['e-2'],
      judgmentStatement: ko('어머니의 판단 능력은 완전히 상실되지 않았으나, 윤정후의 개입은 적법성 문제를 남긴다.'),
      verdictOptions: {
        wrong: ko('어머니는 동생의 압박으로 유서를 작성했고, 제대로 판단할 수 없는 상태였다.'),
        partial: ko('어머니의 인지 능력에 의문이 있지만, 완전히 무효라고 단정하긴 어렵다.'),
        truth: ko('윤정후는 말년에 자주 방문하며 유서를 논의했지만, 어머니 의사를 완전히 무시한 건 아니었다.'),
        defer: ko('어머니의 판단 능력 여부를 확인할 수 없다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-3',
          lieIntensity: 'L2',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
        b: {
          lieType: 'LT-6',
          lieIntensity: 'L3',
          lieMotive: 'third_party_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('60:40 공증 유서가 동생의 압박으로 작성된 건 분명하다. 어머니는 자기 판단을 할 수 없는 상태였다.'),
            allowedKeywords: koKeywords('공증 유서', '말년 상태', '방문기록', '단정'),
            forbiddenKeywords: keywords(
              ['정후 개입', '형 오기 전', '대신 결정'],
              ["Jung-hoo's involvement", 'before the older brother arrived', 'made the decision in her place'],
              ['正厚の関与', '兄が来る前', '代わりに決定'],
              ['正厚的干预', '哥哥来之前', '代替决定'],
            ),
            answerFrame: ko('A는 전면 무효 frame을 강하게 유지. 자기 돌봄을 먼저 내세우며 동생 개입을 단정.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('어머니가 말년에 자주 뵌 것은 맞지만, 어머니 의사대로 유서가 작성됐다.'),
            allowedKeywords: koKeywords('자주 뵈었다', '어머니 뜻'),
            forbiddenKeywords: keywords(
              ['형 오기 전 마무리', '대신 결정', '자필 연습본 90:10', '출생 비밀'],
              ['finished before older brother arrived', 'made the decision in her place', 'handwritten 90:10', 'birth secret'],
              ['兄が来る前に終わらせ', '代わりに決定', '自筆90:10', '出生の秘密'],
              ['哥哥来之前结束', '代替决定', '亲笔90:10', '出生秘密'],
            ),
            answerFrame: ko('B는 방문 빈도만 인정. 개입 정도/자필 연습본/출생 비밀 모두 회피.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('어머니가 판단 능력을 거의 잃었을 가능성이 높다. 다만 결정적 입증은 부족할 수 있다.'),
            allowedKeywords: koKeywords('판단 능력 의심', '결정적이지 않은', '동생 개입 의심'),
            forbiddenKeywords: keywords(
              ['정후 개입 확정', '대신 결정'],
              ["confirmed Jung-hoo's intervention", 'made the decision in her place'],
              ['正厚の関与確定', '代わりに決定'],
              ['正厚的干预确认', '代替决定'],
            ),
            answerFrame: ko('A는 단정에서 한 발 물러나 정황 의심으로 frame 완화.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "어머니가 제대로 판단했다고 보기 어렵다"고 말한다.'),
              behaviorHint: ko('주먹이 잠깐 풀렸다 다시 쥐어진다.'),
            },
          },
          b: {
            admittedFact: ko('말년에 어머니를 자주 뵈었고 유서 내용에 대해서도 이야기를 나눈 적이 있다.'),
            allowedKeywords: koKeywords('방문 빈도', '공증 전 시점', '유서 논의'),
            forbiddenKeywords: keywords(
              ['형 오기 전 마무리', '대신 결정', '자필 연습본', '출생 비밀'],
              ['finished before older brother arrived', 'made the decision in her place', 'handwritten draft', 'birth secret'],
              ['兄が来る前に終わらせ', '代わりに決定', '自筆下書き', '出生の秘密'],
              ['哥哥来之前结束', '代替决定', '亲笔草稿', '出生秘密'],
            ),
            answerFrame: ko('B는 유서 논의 사실 정도까지 인정. 강요 부정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "어머니가 직접 말씀하셨다"는 말을 짧게 덧붙인다.'),
              behaviorHint: ko('호흡이 한 박자 늦어진다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('방문 급증·담당자 교체·공증인 동행이 한 기간에 모였다. 동생이 무언가를 정리하려 했다고 본다.'),
            allowedKeywords: koKeywords('방문 급증', '담당자 교체', '공증인 동행', '정리하려 함'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '친자가 아니다'],
              ['birth secret', 'not his biological child'],
              ['出生の秘密', '実子ではない'],
              ['出生秘密', '不是亲生子'],
            ),
            answerFrame: ko('A는 시간 패턴으로 동생 개입 단정을 강화. 다만 출생 비밀 영역은 모름.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤태성은 "그 시점이 그렇게 겹치는 게 우연일 리 없다"고 말한다.'),
              behaviorHint: ko('서류 한 장을 손가락으로 톡톡 친다.'),
            },
          },
          b: {
            admittedFact: ko('어머니를 여러 번 뵈며 유서 내용을 함께 정리했다. 종이를 읽어드린 것도 그 흐름 안이다.'),
            allowedKeywords: koKeywords('종이를 읽어드림', '함께 정리', '어머니 뜻 확인'),
            forbiddenKeywords: keywords(
              ['형 오기 전 마무리', '대신 결정', '자필 연습본 90:10', '출생 비밀'],
              ['finished before older brother arrived', 'made the decision in her place', 'handwritten 90:10', 'birth secret'],
              ['兄が来る前に終わらせ', '代わりに決定', '自筆90:10', '出生の秘密'],
              ['哥哥来之前结束', '代替决定', '亲笔90:10', '出生秘密'],
            ),
            answerFrame: ko('B는 종이를 읽어드린 사실까지 인정. 개입 책임은 도움 frame으로 유지.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "어머니가 직접 비율을 말씀하셨다"고 말한다.'),
              behaviorHint: ko('답이 짧고 정확해진다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('동생이 형이 오기 전에 절차를 끝내려 한 정황이 보인다. 의도가 있었다.'),
            allowedKeywords: koKeywords('형 오기 전', '의도', '서두름'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '친자가 아니다'],
              ['birth secret', 'not his biological child'],
              ['出生の秘密', '実子ではない'],
              ['出生秘密', '不是亲生子'],
            ),
            answerFrame: ko('A는 동생의 서두름·회피를 직접 거론. 출생 비밀 영역은 아직 모름.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 "왜 나를 빼고 끝냈는지부터 답해라"고 말한다.'),
              behaviorHint: ko('목소리가 한 톤 낮아진다.'),
            },
          },
          b: {
            admittedFact: ko('형이 함께 있으면 충돌이 커질 거라 판단해 절차를 먼저 진행했다. 어머니 뜻을 옮긴 것이지 강요하지 않았다.'),
            allowedKeywords: koKeywords('형이 오기 전', '충돌 회피', '어머니 뜻 옮김'),
            forbiddenKeywords: keywords(
              ['자필 연습본 90:10', '구체적 출생 경위', '친부 실명'],
              ['handwritten 90:10', "specific birth circumstances", "biological father's name"],
              ['自筆90:10', '具体的な出生経緯', '実父の実名'],
              ['亲笔90:10', '具体出生情况', '生父实名'],
            ),
            answerFrame: ko('B는 충돌 회피 동기 인정. 그러나 자필 연습본·출생 영역은 회피.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤정후는 "형이 같이 있으면 어머니가 더 흐트러질 것 같았다"고 말한다.'),
              behaviorHint: ko('처음으로 시선이 형 쪽을 향한다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('어머니 판단 능력의 흐림과 동생 개입 정도는 별개로 봐야 한다는 점을 받아들인다. 다만 절차 안에서 동생이 자기 위치를 썼다는 사실은 남는다.'),
            allowedKeywords: koKeywords('판단 능력과 개입 별개', '동생 위치 사용', '절차 책임'),
            forbiddenKeywords: keywords(
              ['친부 실명'],
              ["biological father's name"],
              ['実父の実名'],
              ['生父实名'],
            ),
            answerFrame: ko('A는 단정에서 분리 판단으로 frame 이동. 책임의 무게는 절차 쪽으로.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "판단 능력 이야기와 동생 개입은 따로 봐야겠다"고 말한다.'),
              behaviorHint: ko('어깨가 처음으로 살짝 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('형이 오기 전에 절차를 끝내려 한 건 충돌을 피하기 위함이었다. 그러나 그 안에서 자기 판단을 어머니 뜻 위에 얹었다는 사실은 인정한다.'),
            allowedKeywords: koKeywords('충돌 회피', '자기 판단을 얹음', '개입 책임'),
            forbiddenKeywords: keywords(
              ['친부 실명'],
              ["biological father's name"],
              ['実父の実名'],
              ['生父实名'],
            ),
            answerFrame: ko('B는 자기 판단을 얹은 사실 인정. 출생 영역은 d-4에서 다룸.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "어머니 뜻 위에 내 판단이 얹혔다"고 말한다.'),
              behaviorHint: ko('말이 처음으로 끝까지 이어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('어머니 상태를 끝까지 본 사람이라는 자부심 때문에 다른 가능성을 밀어냈다. 단정의 책임이 내게 있다.'),
            allowedKeywords: koKeywords('자부심', '다른 가능성 밀어냄', '단정 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 단정 책임 직접 인정. 자기 frame 한계 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 마지막 단정을 내려놓는다.'),
              behaviorHint: ko('손이 책상 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('어머니가 완전히 판단했다기보다 그 빈틈을 내가 붙잡았다. 도움과 대신 결정의 경계를 넘었음을 인정한다.'),
            allowedKeywords: koKeywords('빈틈을 붙잡음', '경계를 넘음', '개입 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 도움-대신 결정 경계 위반 명시. 진실 완전 인정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 처음으로 말끝을 흐리지 않는다.'),
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
          surfaceClaim: ko('전면 무효 frame / 어머니 뜻 주장'),
          hiddenTruth: ko('부분 판단능력 + 동생 개입'),
          validActions: ['fact_pursuit', 'empathy_approach'],
          requiredEvidence: ['e-1'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('판단 능력 의심 / 유서 논의 인정'),
          hiddenTruth: ko('방문 패턴 의미'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-2'],
          requiredWitness: [],
          successUnlocks: ['w-1'],
        },
        S2: {
          surfaceClaim: ko('시점 겹침 / 종이를 읽어드림'),
          hiddenTruth: ko('도움과 개입의 경계'),
          validActions: ['evidence_query', 'witness_summon'],
          requiredEvidence: ['e-2'],
          requiredWitness: ['w-1'],
          successUnlocks: ['dc-1'],
        },
        S3: {
          surfaceClaim: ko('형 오기 전 / 충돌 회피'),
          hiddenTruth: ko('자기 판단을 얹음'),
          validActions: ['contradiction_pursuit', 'empathy_approach'],
          requiredEvidence: ['e-2'],
          requiredWitness: ['w-1'],
          successUnlocks: ['d-2'],
        },
        S4: {
          surfaceClaim: ko('판단과 개입 분리'),
          hiddenTruth: ko('개입 책임 확정'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('단정 책임 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
    },
    /* ============================================================
     * dispute d-2 — 공증 절차의 개입 (e-5 재배치 후 절차 narrative만)
     *
     * 오전 1차 공란 → 오후 수정 60:40 확정. 자필 비율 수치는 d-5로 이동.
     * dossier dc-2 ("수정된 유언장")와 link.
     * ============================================================ */
    {
      id: 'd-2',
      name: ko('공증 절차의 개입'),
      truth: true,
      truthDescription: ko(
        '공증본 60:40은 오전 1차 접수에서 비율이 비어 있다가 오후 수정 접수에서 정후의 진행 압박 아래 확정됐다. 어머니 상태가 불안정한 가운데 정후가 공증 절차에 깊이 개입한 책임이 남는다. 다만 그 개입이 더 받으려 한 조작인지 다른 동기인지는 본 쟁점에서 결론짓지 않는다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: true,
      hidden: false,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 15, b: 85 },
      mediationLink: '공증 절차와 어머니 상태의 균열',
      requiredEvidence: ['e-4'],
      judgmentStatement: ko('공증본 60:40에 도달한 절차에서 정후가 어머니 상태와 진행 속도에 어떻게 작용했는지를 분리해서 본다.'),
      unlockCondition: {
        requireDispute: { id: 'd-1', minState: 'S3' },
        runtimeRule: ko('d-1에서 공증 절차와 어머니 상태의 균열이 드러나면 해금'),
        authoredRule: ko('공증인 메모로 절차 개입 정도를 확인하게 한다.'),
      },
      verdictOptions: {
        wrong: ko('동생이 자기 몫을 늘리기 위해 공증 절차에서 비율을 조작했다.'),
        partial: ko('공증 절차에 정후가 깊이 개입한 정황은 있으나, 책임 정도와 동기까지는 명확하지 않다.'),
        truth: ko('공증본 60:40은 정후가 진행 압박 아래 오후 수정 단계에서 마무리됐다. 절차에 손댄 책임은 남지만 조작 동기는 본 쟁점에서 결론짓지 않는다.'),
        defer: ko('공증 절차의 개입 정도와 그 동기를 판단하기 어렵다. 유보한다.'),
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
          lieType: 'LT-2',
          lieIntensity: 'L1',
          lieMotive: 'self_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('공증 절차에서 동생이 자기 몫을 늘리는 방향으로 조작했다고 본다.'),
            allowedKeywords: koKeywords('공증 절차', '조작 의심', '자기 몫'),
            forbiddenKeywords: keywords(
              ['오전 1차 비율 공란', '오후 수정 60:40', '정후 진행 압박', '어머니 상태 불안정', '자기 몫 축소'],
              ['morning first submission ratio blank', 'afternoon revision 60:40', "Jung-hoo's procedural pressure", 'mother in unstable condition', "reducing his own share"],
              ['午前1次の比率空欄', '午後の修正60:40', '正厚の進行圧迫', '母の不安定な状態', '自分の取り分の縮小'],
              ['上午初次比例空白', '下午修订60:40', '正厚的程序施压', '母亲状态不稳', '减少自己份额'],
            ),
            answerFrame: ko('A는 동생이 자기 몫을 늘리려 조작했다는 frame 유지. 절차 세부는 모름.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('공증 절차는 정상적으로 진행됐고 어머니 뜻이 그대로 반영됐다.'),
            allowedKeywords: koKeywords('정상 진행', '어머니 뜻 반영'),
            forbiddenKeywords: keywords(
              ['오전 1차 비율 공란', '오후 수정 60:40', '정후 진행 압박', '절차 개입 책임'],
              ['morning first submission ratio blank', 'afternoon revision 60:40', "Jung-hoo's procedural pressure", 'responsibility for procedural intervention'],
              ['午前1次の比率空欄', '午後の修正60:40', '正厚の進行圧迫', '手続き介入の責任'],
              ['上午初次比例空白', '下午修订60:40', '正厚的程序施压', '程序介入责任'],
            ),
            answerFrame: ko('B는 절차 정상 진행 strict 부정. 오전/오후 분리·진행 압박 모두 회피.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('공증 절차 안에서 무언가가 매끄럽지 않았을 가능성이 있다.'),
            allowedKeywords: koKeywords('절차 매끄럽지 않음', '무언가 있다'),
            forbiddenKeywords: keywords(
              ['오전 1차 비율 공란', '오후 수정 60:40'],
              ['morning first submission ratio blank', 'afternoon revision 60:40'],
              ['午前1次の比率空欄', '午後の修正60:40'],
              ['上午初次比例空白', '下午修订60:40'],
            ),
            answerFrame: ko('A는 절차 의심을 일반적 수준에서 거론.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "그 과정에서 뭔가 정상적이지 않았을 거다"라고 말한다.'),
              behaviorHint: ko('손이 한 번 책상을 친다.'),
            },
          },
          b: {
            admittedFact: ko('공증 당일에 약간의 수정이 있었지만 어머니 뜻 안에서였다.'),
            allowedKeywords: koKeywords('약간의 수정', '어머니 뜻 안'),
            forbiddenKeywords: keywords(
              ['오전 1차 비율 공란', '오후 수정 60:40', '정후 진행 압박'],
              ['morning first submission ratio blank', 'afternoon revision 60:40', "Jung-hoo's procedural pressure"],
              ['午前1次の比率空欄', '午後の修正60:40', '正厚の進行圧迫'],
              ['上午初次比例空白', '下午修订60:40', '正厚的程序施压'],
            ),
            answerFrame: ko('B는 수정 가능성 일반 인정. 오전 공란·오후 60:40 분리 노출 X.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "수정은 있었지만 어머니 뜻 안에서였다"고 말한다.'),
              behaviorHint: ko('답이 평소보다 한 박자 늦다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('공증인 메모에 오전 1차와 오후 수정본이 모두 남아 있다고 들었다. 동생이 그 사이에서 무언가를 했다.'),
            allowedKeywords: koKeywords('오전 1차', '오후 수정', '메모 흔적'),
            forbiddenKeywords: keywords(
              ['정후 진행 압박', '자기 몫 축소'],
              ["Jung-hoo's procedural pressure", "reducing his own share"],
              ['正厚の進行圧迫', '自分の取り分の縮小'],
              ['正厚的程序施压', '减少自己份额'],
            ),
            answerFrame: ko('A는 오전/오후 분리 인지. 동기는 여전히 탐욕 frame.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤태성은 "그 메모가 다 남아 있다면 두 문서가 따로 있다는 뜻"이라고 말한다.'),
              behaviorHint: ko('메모를 향해 시선이 길어진다.'),
            },
          },
          b: {
            admittedFact: ko('공증인 메모에 오전 1차 비율 공란과 오후 수정본이 함께 남아 있다.'),
            allowedKeywords: koKeywords('오전 1차 공란', '오후 수정본', '메모 기록'),
            forbiddenKeywords: keywords(
              ['정후 진행 압박', '자기 몫 축소', '절차 개입 책임'],
              ["Jung-hoo's procedural pressure", "reducing his own share", 'responsibility for procedural intervention'],
              ['正厚の進行圧迫', '自分の取り分の縮小', '手続き介入の責任'],
              ['正厚的程序施压', '减少自己份额', '程序介入责任'],
            ),
            answerFrame: ko('B는 오전 공란·오후 수정 사실 인정. 진행 압박·자기 몫 축소는 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "오전엔 비율이 비어 있었다"고 말한다.'),
              behaviorHint: ko('처음으로 시선이 메모를 향한다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('동생이 오후 수정 단계에서 60:40으로 마무리를 압박한 정황이 있다. 어머니 상태가 그 사이에 어땠는지가 문제다.'),
            allowedKeywords: koKeywords('오후 수정', '60:40 마무리', '어머니 상태'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 절차 압박 인정. 어머니 상태 영역까지 확장.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('윤태성은 "그 시간에 어머니가 어떤 상태였는지 알고 싶다"고 말한다.'),
              behaviorHint: ko('목소리가 처음으로 낮아진다.'),
            },
          },
          b: {
            admittedFact: ko('오후 수정 단계에서 절차를 마무리하려고 진행을 밀어붙인 것은 사실이다. 어머니 상태가 좋지 않았다.'),
            allowedKeywords: koKeywords('진행을 밀어붙임', '어머니 상태 불안정'),
            forbiddenKeywords: keywords(
              ['자기 몫 축소', '자필 90:10', '형을 지키려'],
              ["reducing his own share", 'handwritten 90:10', 'to protect his older brother'],
              ['自分の取り分の縮小', '自筆90:10', '兄を守るため'],
              ['减少自己份额', '亲笔90:10', '保护哥哥'],
            ),
            answerFrame: ko('B는 진행 압박 + 어머니 상태 인정. 그러나 동기·자필 영역은 회피 (d-5에서 다룸).'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('윤정후는 "그날 어머니가 많이 흐트러져 있었다"고 말한다.'),
              behaviorHint: ko('숨이 길어진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('동생이 절차에 깊이 개입한 책임은 분명히 남는다. 다만 동기를 본 쟁점에서 단정할 수는 없다.'),
            allowedKeywords: koKeywords('절차 개입 책임', '동기 미정'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 절차 책임 frame에서 동기 분리.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "절차 안에서 동생이 한 일은 분명히 남는다"고 말한다.'),
              behaviorHint: ko('어깨가 한 번 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('절차에 손댄 책임은 남는다. 그 동기가 더 받으려는 것은 아니었지만, 본 쟁점에서는 책임만 다룬다.'),
            allowedKeywords: koKeywords('절차 개입 책임', '더 받으려는 것 아님'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 책임 인정. 동기는 d-5에서.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "절차에 손댄 책임은 진다"고 말한다.'),
              behaviorHint: ko('말이 처음으로 끝까지 이어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('동생이 절차에 개입한 사실은 인정하되, 그 동기를 본 쟁점에서 단정하지 않고 다음 쟁점으로 넘긴다.'),
            allowedKeywords: koKeywords('절차 개입 인정', '동기 분리'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 절차 책임만 확정. 동기는 d-3/d-5로 넘김.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "동기는 다음 쟁점에서 보자"고 말한다.'),
              behaviorHint: ko('손이 책상 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('공증 절차에 개입했고, 그 책임을 진다. 동기는 다음 쟁점에서 직접 답한다.'),
            allowedKeywords: koKeywords('절차 개입 책임', '동기 다음 쟁점'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 절차 책임 명시 + 동기는 d-5에 위임.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "동기는 다음에 답하겠다"고 말한다.'),
              behaviorHint: ko('시선이 재판관을 향한다.'),
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
          surfaceClaim: ko('절차 조작 의심 / 정상 진행 주장'),
          hiddenTruth: ko('오전 공란 → 오후 60:40 확정'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-4'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('매끄럽지 않은 절차 / 약간의 수정'),
          hiddenTruth: ko('오전/오후 분리'),
          validActions: ['evidence_query'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-2'],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('오전 1차 / 오후 수정본'),
          hiddenTruth: ko('진행 압박 + 어머니 상태'),
          validActions: ['evidence_query', 'witness_summon', 'contradiction_pursuit'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-2'],
          successUnlocks: ['dc-2'],
        },
        S3: {
          surfaceClaim: ko('오후 수정 마무리 / 어머니 상태 불안정'),
          hiddenTruth: ko('절차 개입 책임 (동기는 d-5)'),
          validActions: ['motive_search', 'empathy_approach'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-2'],
          successUnlocks: ['d-3'],
        },
        S4: {
          surfaceClaim: ko('절차 개입 책임 / 동기 분리'),
          hiddenTruth: ko('동기는 다음 쟁점'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('절차 책임 확정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
      narrativeTriggers: d2NarrativeTriggers,
    },
    /* ============================================================
     * dispute d-3 — 오래된 지원의 출처 (e-6 계좌 흐름)
     *
     * 어머니 통장 경유 월 정기금 + 공장 위기 3억원. A는 어머니 돈인 줄 안다.
     * 동생 자존심·공장 양보 동기는 d-4로 넘김. dossier dc-3 ("20년의 돈")와 link.
     * ============================================================ */
    {
      id: 'd-3',
      name: ko('오래된 지원의 출처'),
      truth: true,
      truthDescription: ko(
        '윤정후는 본인이 양보한 가업 공장이 형의 손에서 위기에 빠지자 3억원을 어머니 통장을 거쳐 전달했고, 그 이전부터 월 단위 정기 지원금도 같은 방식으로 보내 왔다. 윤태성은 그 돈이 어머니 돈이라고 믿고 있었다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 60, b: 40 },
      /* schema ambiguity 'medium' 미지원 — legacy d-3 ambiguity='medium' → 'low' (계좌 자료 분명). */
      mediationLink: '어머니 통장을 거친 지원의 출처와 전달 순서',
      requiredEvidence: ['e-6'],
      judgmentStatement: ko('어머니 돈으로 알았던 지원 중 핵심 흐름은 윤정후 돈이 어머니 통장을 거쳐 전달된 것이었다.'),
      unlockCondition: {
        requireDispute: { id: 'd-2', minState: 'S3' },
        runtimeRule: ko('d-2에서 절차 개입이 드러나면 해금'),
        authoredRule: ko('유서 비율의 배경을 오래된 계좌 흐름으로 확인하게 한다.'),
      },
      verdictOptions: {
        wrong: ko('동생이 정기 지원금을 빌미로 어머니를 통제했다.'),
        partial: ko('입금 흐름은 보이지만, 출처와 전달 목적은 일부만 확인됐다.'),
        truth: ko('윤정후 돈이 어머니 통장을 거쳐 윤태성 쪽으로 전달된 흐름이 확인된다.'),
        defer: ko('계좌 흐름의 출처와 성격을 판단하기 어렵다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-1',
          lieIntensity: 'L2',
          lieMotive: 'face_saving',
          initialState: 'S0',
          collapseViaTrust: true,
        },
        b: {
          lieType: 'LT-6',
          lieIntensity: 'L2',
          lieMotive: 'third_party_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('어머니가 평생 도와주신 돈이 있었다. 그건 우리 가족 일이지 동생이 끼어들 일이 아니다.'),
            allowedKeywords: koKeywords('어머니 도움', '가족 일'),
            forbiddenKeywords: keywords(
              ['정기 지원금', '윤정후 돈', '3억원 전달', '어머니 통장 경유', '20년 비밀 지원'],
              ['regular support payments', "Yoon Jung-hoo's money", '300 million won transfer', "routed through the mother's account", '20 years of hidden support'],
              ['定期支援金', '尹正厚の金', '3億ウォン送金', '母の通帳経由', '20年の秘密支援'],
              ['定期支援金', '尹正厚的钱', '3亿韩元转账', '经由母亲账户', '20年的秘密支援'],
            ),
            answerFrame: ko('A는 어머니 돈 frame strict. 동생 돈 가능성 일체 부인.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('형 가게나 공장 일은 본인이 알지 못한다.'),
            allowedKeywords: koKeywords('모른다', '본인 일 아니다'),
            forbiddenKeywords: keywords(
              ['정기 지원금', '윤정후 돈', '3억원 전달', '어머니 통장 경유'],
              ['regular support payments', "Yoon Jung-hoo's money", '300 million won transfer', "routed through the mother's account"],
              ['定期支援金', '尹正厚の金', '3億ウォン送金', '母の通帳経由'],
              ['定期支援金', '尹正厚的钱', '3亿韩元转账', '经由母亲账户'],
            ),
            answerFrame: ko('B는 송금 사실 자체를 모름 strict.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('공장 위기 때 어머니가 도와주신 큰돈이 있었다. 자세한 출처까지는 묻지 않았다.'),
            allowedKeywords: koKeywords('공장 위기', '어머니 큰돈', '출처 미확인'),
            forbiddenKeywords: keywords(
              ['윤정후 돈', '3억원 전달', '어머니 통장 경유'],
              ["Yoon Jung-hoo's money", '300 million won transfer', "routed through the mother's account"],
              ['尹正厚の金', '3億ウォン送金', '母の通帳経由'],
              ['尹正厚的钱', '3亿韩元转账', '经由母亲账户'],
            ),
            answerFrame: ko('A는 큰돈 인정. 그러나 출처 = 어머니로 유지.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "공장 일 때 어머니가 큰돈을 보내주셨다"고 말한다.'),
              behaviorHint: ko('자부심이 묻어난다.'),
            },
          },
          b: {
            admittedFact: ko('어머니 통장에서 형 쪽으로 일정 흐름이 있었다는 점은 안다. 자세한 출처는 본인 일이 아니다.'),
            allowedKeywords: koKeywords('어머니 통장 흐름', '본인 일 아니다'),
            forbiddenKeywords: keywords(
              ['윤정후 돈', '3억원 전달'],
              ["Yoon Jung-hoo's money", '300 million won transfer'],
              ['尹正厚の金', '3億ウォン送金'],
              ['尹正厚的钱', '3亿韩元转账'],
            ),
            answerFrame: ko('B는 흐름 인지 정도까지. 본인 돈 출처는 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "어머니 통장에서 무언가 움직였다는 건 안다"고 말한다.'),
              behaviorHint: ko('짧고 정확한 답이 이어진다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('계좌 자료를 보니 어머니 통장에서 큰돈이 같은 시점에 들어왔다. 다만 그게 동생 돈이라는 건 인정하기 어렵다.'),
            allowedKeywords: koKeywords('계좌 자료', '같은 시점', '인정 어려움'),
            forbiddenKeywords: keywords(
              ['윤정후 돈', '20년 비밀 지원'],
              ["Yoon Jung-hoo's money", '20 years of hidden support'],
              ['尹正厚の金', '20年の秘密支援'],
              ['尹正厚的钱', '20年的秘密支援'],
            ),
            answerFrame: ko('A는 계좌 자료 객관성 인정. 자존심상 동생 돈 frame은 거부.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤태성은 "이걸 어떻게 받아들이라는 말이냐"고 말한다.'),
              behaviorHint: ko('자료를 두 번 다시 본다.'),
            },
          },
          b: {
            admittedFact: ko('형 쪽으로 흘러간 돈 중 상당수가 본인이 어머니 통장을 거쳐 보낸 것이다.'),
            allowedKeywords: koKeywords('형 쪽으로 흐름', '본인이 보냄', '통장 경유'),
            forbiddenKeywords: keywords(
              ['3억원 전달', '공장 양보', '형 자존심'],
              ['300 million won transfer', 'gave up the family business', "brother's pride"],
              ['3億ウォン送金', '工場を譲った', '兄の自尊心'],
              ['3亿韩元转账', '让出工厂', '哥哥的自尊心'],
            ),
            answerFrame: ko('B는 송금 사실 인정. 그러나 공장 양보·자존심 동기는 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "그 흐름 중 상당수가 내 돈"이라고 말한다.'),
              behaviorHint: ko('처음으로 형 쪽을 보지 않는다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('공장 위기 때 받은 큰돈도 어머니가 아니라 동생 돈이 어머니 통장을 거쳐 온 것 같다. 그게 사실이라면 평생 잘못 알고 살았다는 뜻이다.'),
            allowedKeywords: koKeywords('공장 위기 큰돈', '동생 돈', '잘못 알고 산 평생'),
            forbiddenKeywords: keywords(
              ['공장 양보', '형 자존심', '20년 비밀 지원'],
              ['gave up the family business', "brother's pride", '20 years of hidden support'],
              ['工場を譲った', '兄の自尊心', '20年の秘密支援'],
              ['让出工厂', '哥哥的自尊心', '20年的秘密支援'],
            ),
            answerFrame: ko('A는 출처 진실 부분 인정. 자존심 무너짐 흐름.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 한참 침묵 후 "정말 내가 모르고 살았다는 말이냐"고 말한다.'),
              behaviorHint: ko('처음으로 어깨가 굽는다.'),
            },
          },
          b: {
            admittedFact: ko('월 정기금과 공장 위기 때 보낸 돈 모두 본인이 어머니 통장을 거쳐 전달한 돈이다. 형이 모르게 한 것은 본인의 결정이다.'),
            allowedKeywords: koKeywords('월 정기금', '공장 위기 돈', '형 모르게 한 결정'),
            forbiddenKeywords: keywords(
              ['공장 양보', '형 자존심', '출생 비밀'],
              ['gave up the family business', "brother's pride", 'birth secret'],
              ['工場を譲った', '兄の自尊心', '出生の秘密'],
              ['让出工厂', '哥哥的自尊心', '出生秘密'],
            ),
            answerFrame: ko('B는 출처·결정 모두 인정. 동기(공장 양보·자존심·출생 비밀)는 d-4로 넘김.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('윤정후는 "형이 모르게 한 것은 내가 결정한 일"이라고 말한다.'),
              behaviorHint: ko('말끝이 처음으로 단단해진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('어머니 돈인 줄 알고 살았던 자존심이 무너진다. 그러나 동생이 왜 그렇게까지 했는지는 아직 모르겠다.'),
            allowedKeywords: koKeywords('자존심 무너짐', '동생 동기 모름'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '친자가 아니다'],
              ['birth secret', 'not his biological child'],
              ['出生の秘密', '実子ではない'],
              ['出生秘密', '不是亲生子'],
            ),
            answerFrame: ko('A는 출처 진실 완전 수용. 동기 영역은 d-4 대기.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 "내가 평생 어머니 돈인 줄 알고 받았다"고 말한다.'),
              behaviorHint: ko('숨이 길게 흘러나온다.'),
            },
          },
          b: {
            admittedFact: ko('형 자존심을 먼저 지키려는 것이었다. 그래서 어머니 통장을 거쳤다.'),
            allowedKeywords: koKeywords('형 자존심', '먼저 지키려', '통장 경유'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '공장 양보', '친자가 아니다'],
              ['birth secret', 'gave up the family business', 'not his biological child'],
              ['出生の秘密', '工場を譲った', '実子ではない'],
              ['出生秘密', '让出工厂', '不是亲生子'],
            ),
            answerFrame: ko('B는 형 자존심 동기까지 인정. 출생 비밀·공장 양보는 d-4 대기.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤정후는 "형 자존심을 먼저 지키려 했다"고 말한다.'),
              behaviorHint: ko('호흡이 한 번 깊어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('동생이 20년 동안 어머니 통장을 거쳐 내게 정기 지원금과 공장 위기 3억원을 보내왔다는 사실을 인정한다. 어머니 돈인 줄 알았던 것이 부끄럽다.'),
            allowedKeywords: koKeywords('20년 정기 지원', '3억원', '어머니 돈으로 알았던 부끄러움'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 출처 진실 + 자기 frame 한계 완전 인정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성이 처음으로 동생 이름을 부드럽게 부른다.'),
              behaviorHint: ko('손이 한 번 길게 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('20년간 어머니 통장을 거쳐 월 정기 지원금과 공장 위기 3억원을 형에게 전달했다. 형이 모르게 한 것은 본인이 선택한 일이다.'),
            allowedKeywords: koKeywords('20년 통장 경유', '월 정기금', '공장 위기 3억', '형 모르게'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 전 과정 + 본인 결정 완전 진술. 동기는 d-4.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "20년"이라고 말끝에 짧게 덧붙인다.'),
              behaviorHint: ko('시선이 처음으로 형을 마주한다.'),
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
          surfaceClaim: ko('어머니 돈 frame / 본인 일 아니다'),
          hiddenTruth: ko('윤정후 돈 + 어머니 통장 경유'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-6'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('공장 위기 큰돈 / 어머니 통장 흐름'),
          hiddenTruth: ko('윤정후 돈 직접 송금'),
          validActions: ['evidence_query', 'motive_search'],
          requiredEvidence: ['e-6'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('계좌 자료 / 형 쪽으로 흘러간 본인 돈'),
          hiddenTruth: ko('20년 송금 패턴'),
          validActions: ['evidence_query', 'contradiction_pursuit'],
          requiredEvidence: ['e-6'],
          requiredWitness: ['w-3'],
          successUnlocks: ['dc-3'],
        },
        S3: {
          surfaceClaim: ko('동생 돈 + 형 모르게'),
          hiddenTruth: ko('형 자존심 동기 (d-4 미해금)'),
          validActions: ['empathy_approach', 'motive_search'],
          requiredEvidence: ['e-6'],
          requiredWitness: ['w-3'],
          successUnlocks: ['d-4'],
        },
        S4: {
          surfaceClaim: ko('자존심 무너짐 / 형 자존심 동기'),
          hiddenTruth: ko('공장 양보·출생 비밀 (d-4 대기)'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('20년 진실 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
      narrativeTriggers: d3NarrativeTriggers,
    },
    /* ============================================================
     * dispute d-4 — 가족 기록과 침묵의 이유 (e-7 일기장)
     *
     * 어머니 일기장 → A 출생 비밀 + 두 아들 동등 + B의 사전 인지 + 공장 양보.
     * 진실 노출 정책 가장 엄격. dossier dc-4 ("감춘 이유")와 link.
     * ============================================================ */
    {
      id: 'd-4',
      name: ko('가족 기록과 침묵의 이유'),
      truth: true,
      truthDescription: ko(
        '어머니 일기장에는 윤태성이 아버지의 친자가 아니라는 사실, 어머니 입장에서는 두 아들 모두 똑같은 자식이라는 기록, 그리고 친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보했다는 사실이 남아 있다. 윤정후는 이 비밀이 자존심 강한 형을 무너뜨릴까 봐 끝까지 침묵했다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 25, b: 75 },
      mediationLink: '어머니 일기장과 형제의 침묵',
      requiredEvidence: ['e-7'],
      judgmentStatement: ko('윤정후의 침묵에는 가족 기록 속 민감한 사정을 형에게 곧장 드러내지 않으려는 이유가 있었다.'),
      unlockCondition: {
        requireDispute: { id: 'd-3', minState: 'S3' },
        runtimeRule: ko('오래된 지원의 출처가 확인되면 해금'),
        authoredRule: ko('돈의 출처를 숨긴 이유가 어머니 일기장 쪽으로 이어진다.'),
      },
      verdictOptions: {
        wrong: ko('동생이 가족 사정을 이용해 형을 유산에서 배제하려 했다.'),
        partial: ko('민감한 가족 사정은 보이지만 유서 변경과의 관계는 더 확인해야 한다.'),
        truth: ko('어머니 일기장 속 가족 사정 때문에 윤정후는 형에게 곧장 말하지 못했고, 침묵이 유서 변경의 동기와 연결됐다.'),
        defer: ko('가족 기록과 침묵의 관계를 판단하기 어렵다. 유보한다.'),
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
          lieIntensity: 'L3',
          lieMotive: 'third_party_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('가족 사정이라는 게 무슨 말인지 모르겠다. 우리 집에는 그런 게 없다.'),
            allowedKeywords: koKeywords('모르겠다', '그런 거 없다'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다', '아버지 피는 아니다', '형의 정체성'],
              ['birth secret', 'half-brother', 'not his biological child', "not his father's blood", "brother's identity"],
              ['出生の秘密', '異父', '実子ではない', '父の血ではない', '兄のアイデンティティ'],
              ['出生秘密', '同母异父', '不是亲生子', '不是父亲的血脉', '哥哥的身份'],
            ),
            answerFrame: ko('A는 가족 사정 존재 자체 부정. 출생 영역 단어 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('어머니 일기장에 가족 일이 적혀 있을 수는 있다. 자세히는 말하기 어렵다.'),
            allowedKeywords: koKeywords('가족 일', '말하기 어렵다'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다', '공장 양보', '형의 정체성'],
              ['birth secret', 'half-brother', 'not his biological child', 'gave up the family business', "brother's identity"],
              ['出生の秘密', '異父', '実子ではない', '工場を譲った', '兄のアイデンティティ'],
              ['出生秘密', '同母异父', '不是亲生子', '让出工厂', '哥哥的身份'],
            ),
            answerFrame: ko('B는 가족 일이라는 모호한 표현만 사용. 구체 명사 모두 회피.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('어머니가 우리 둘을 똑같이 아끼셨다는 건 알고 있다. 다른 사정이 있다면 처음 듣는다.'),
            allowedKeywords: koKeywords('어머니가 똑같이 아끼심', '처음 듣는다'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다'],
              ['birth secret', 'half-brother', 'not his biological child'],
              ['出生の秘密', '異父', '実子ではない'],
              ['出生秘密', '同母异父', '不是亲生子'],
            ),
            answerFrame: ko('A는 어머니의 평등 마음만 인지. 출생 비밀 영역 진입 X.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('윤태성은 "어머니가 우리를 똑같이 보셨다는 건 안다"고 말한다.'),
              behaviorHint: ko('말이 처음으로 조심스러워진다.'),
            },
          },
          b: {
            admittedFact: ko('어머니 일기장에 가족 사정 한 줄이 있는 것은 사실이다. 그것 때문에 본인이 형에게 말하지 못한 부분이 있다.'),
            allowedKeywords: koKeywords('가족 사정 한 줄', '말하지 못한 부분'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다', '공장 양보'],
              ['birth secret', 'half-brother', 'not his biological child', 'gave up the family business'],
              ['出生の秘密', '異父', '実子ではない', '工場を譲った'],
              ['出生秘密', '同母异父', '不是亲生子', '让出工厂'],
            ),
            answerFrame: ko('B는 침묵의 존재 인정. 구체 명사는 여전히 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "그 한 줄 때문에 형에게 말하지 못한 게 있다"고 말한다.'),
              behaviorHint: ko('말끝이 짧아진다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('어머니 일기장에 우리 집안의 오랜 사정이 적혀 있는 것 같다. 다만 내가 받아들이기 어려운 영역이다.'),
            allowedKeywords: koKeywords('오랜 가족 사정', '받아들이기 어려움'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다', '아버지 피는 아니다'],
              ['birth secret', 'half-brother', 'not his biological child', "not his father's blood"],
              ['出生の秘密', '異父', '実子ではない', '父の血ではない'],
              ['出生秘密', '同母异父', '不是亲生子', '不是父亲的血脉'],
            ),
            answerFrame: ko('A는 일기장에 큰 사정 존재 인정. 정체성 단어 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤태성은 일기장 영역에서 처음으로 말끝을 흐린다.'),
              behaviorHint: ko('호흡이 짧아진다.'),
            },
          },
          b: {
            admittedFact: ko('일기장에 어머니가 우리 둘에 대해 남긴 글이 있다. 한쪽이 무너지면 형제가 멀어질 거라는 우려가 적혀 있다.'),
            allowedKeywords: koKeywords('어머니의 우려', '한쪽이 무너짐', '형제 멀어짐'),
            forbiddenKeywords: keywords(
              ['출생 비밀', '배다른', '친자가 아니다', '공장 양보'],
              ['birth secret', 'half-brother', 'not his biological child', 'gave up the family business'],
              ['出生の秘密', '異父', '実子ではない', '工場を譲った'],
              ['出生秘密', '同母异父', '不是亲生子', '让出工厂'],
            ),
            answerFrame: ko('B는 어머니 글의 우려 영역 인정. 정체성 단어 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "어머니가 그걸 가장 걱정하셨다"고 말한다.'),
              behaviorHint: ko('시선이 책상 위 일기 사진을 향한다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('어머니가 두 아들 모두 똑같은 자식이라고 적은 의미가 무엇인지, 두려워서 묻지 못해왔다.'),
            allowedKeywords: koKeywords('똑같은 자식', '두려워 묻지 못함'),
            forbiddenKeywords: keywords(
              ['친자가 아니다', '친부 실명', '구체적 출생 경위'],
              ['not his biological child', "biological father's name", 'specific birth circumstances'],
              ['実子ではない', '実父の実名', '具体的な出生経緯'],
              ['不是亲生子', '生父实名', '具体出生情况'],
            ),
            answerFrame: ko('A는 어머니의 평등 글 의미에 접근. 정체성 단어 아직 X.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 "왜 그렇게 적으셨는지 듣고 싶다"고 말한다.'),
              behaviorHint: ko('손이 일기 사진 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('형이 아버지의 친자가 아니라는 사실을 본인은 알고 있다. 어머니가 그 사실을 두 아들 모두에게 숨기길 원하셨고, 본인도 그 결정에 따랐다.'),
            allowedKeywords: koKeywords('친자가 아님', '어머니가 숨기길 원함', '그 결정에 따름'),
            forbiddenKeywords: keywords(
              ['친부 실명', '구체적 출생 경위', '공장 양보'],
              ["biological father's name", 'specific birth circumstances', 'gave up the family business'],
              ['実父の実名', '具体的な出生経緯', '工場を譲った'],
              ['生父实名', '具体出生情况', '让出工厂'],
            ),
            answerFrame: ko('B는 출생 비밀 사실 + 어머니 결정 인정. 친부 실명·공장 양보·구체 경위는 여전히 봉인.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "어머니가 두 아들 모두에게 모르게 하길 원하셨다"고 말한다.'),
              behaviorHint: ko('처음으로 말끝이 정확해진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('내가 아버지의 친자가 아니라는 점을 어머니가 알고 있었고, 동생도 알고 있었다는 사실을 받아들이려 한다. 그 무게를 동생 혼자 진 시간이 길었다.'),
            allowedKeywords: koKeywords('친자가 아님 수용', '동생 혼자 진 시간'),
            forbiddenKeywords: keywords(
              ['친부 실명'],
              ["biological father's name"],
              ['実父の実名'],
              ['生父实名'],
            ),
            answerFrame: ko('A는 출생 비밀 진실 수용. 친부 실명만 봉인.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 한참 말이 없다가 "동생이 혼자 그걸 안고 있었구나"라고 말한다.'),
              behaviorHint: ko('어깨가 처음으로 깊이 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('본인이 가업 공장의 친자였지만 그 사실을 알고도 형에게 양보했다. 형이 흔들리지 않게 하기 위함이었다.'),
            allowedKeywords: koKeywords('친자 양보', '공장 양보', '형이 흔들리지 않게'),
            forbiddenKeywords: keywords(
              ['친부 실명'],
              ["biological father's name"],
              ['実父の実名'],
              ['生父实名'],
            ),
            answerFrame: ko('B는 공장 양보 동기 명시. 친부 실명만 봉인.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤정후는 "형이 무너지지 않게 하려고 그랬다"고 말한다.'),
              behaviorHint: ko('말의 속도가 처음으로 평소대로 돌아온다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('어머니 일기장 속 사실을 인정한다. 동생이 그 비밀을 알고도 평생 형이라 부르며 지원해 왔다는 점, 그 무게를 이제는 함께 진다.'),
            allowedKeywords: koKeywords('일기장 사실 인정', '동생의 평생 지원', '함께 진다'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 정체성 사실 + 동생 평생의 무게 완전 인정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성이 처음으로 동생의 손등을 짧게 만진다.'),
              behaviorHint: ko('호흡이 깊고 길어진다.'),
            },
          },
          b: {
            admittedFact: ko('형의 출생 비밀을 알게 된 시점부터 본인이 친자인 가업 공장을 양보하고 어머니 통장을 거쳐 지원해 온 것은 그 비밀이 형을 무너뜨릴까 봐 한 결정이었다.'),
            allowedKeywords: koKeywords('출생 비밀 인지 시점', '친자 공장 양보', '비밀이 무너뜨릴까 봐'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 출생 비밀 + 공장 양보 + 침묵 동기 전부 명시.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "이 비밀이 형을 무너뜨릴까 봐 그랬다"고 말한다.'),
              behaviorHint: ko('시선이 어머니 일기로 향한다.'),
            },
          },
        },
      },
      channelExposure: {
        judge_question: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_contradiction: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_evidence_combo: { minLieState: 'S3', isSurfaceOnly: true, isDossierSurface: false },
        judge_witness_summon: { minLieState: 'S2', isSurfaceOnly: true, isDossierSurface: false },
        dossier: { minLieState: 'S3', isSurfaceOnly: false, isDossierSurface: true },
        interrogation: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        contradiction_pursuit: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        evidence_present: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        mediation: { minLieState: 'S4', isSurfaceOnly: false, isDossierSurface: false },
        aftermath: { minLieState: 'S5', isSurfaceOnly: false, isDossierSurface: false },
        free_interrogation: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
      },
      progressionStages: {
        S0: {
          surfaceClaim: ko('가족 사정 부정 / 가족 일 모호'),
          hiddenTruth: ko('출생 비밀'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-7'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('어머니의 평등 마음 / 말하지 못한 부분'),
          hiddenTruth: ko('일기 한 줄'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-7'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('오랜 가족 사정 / 어머니의 우려'),
          hiddenTruth: ko('한쪽이 무너짐 / 형제 멀어짐'),
          validActions: ['evidence_query', 'witness_summon'],
          requiredEvidence: ['e-7'],
          requiredWitness: ['w-3'],
          successUnlocks: ['dc-4'],
        },
        S3: {
          surfaceClaim: ko('두 아들 똑같다 / 친자 아님 + 어머니 결정'),
          hiddenTruth: ko('공장 양보 동기'),
          validActions: ['empathy_approach', 'contradiction_pursuit'],
          requiredEvidence: ['e-7'],
          requiredWitness: ['w-3'],
          successUnlocks: ['d-5'],
        },
        S4: {
          surfaceClaim: ko('동생 혼자 진 시간 / 친자 양보'),
          hiddenTruth: ko('친부 실명 (봉인 유지)'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('함께 진다'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
      narrativeTriggers: d4NarrativeTriggers,
    },
    /* ============================================================
     * dispute d-5 — 어머니의 숨겨진 마음 (최종 책임축, e-5 자필 비율 노출)
     *
     * 자필 90:10 → 공증 60:40 축소. 양측 책임축 (A 유산 당연시 + B 보호 명분).
     * e-5 (자필 연습본 비율) 노출은 S5에서만. dossier dc-5와 link.
     * ============================================================ */
    {
      id: 'd-5',
      name: ko('어머니의 숨겨진 마음'),
      truth: true,
      truthDescription: ko(
        '윤태성은 유산을 돌봄의 보상처럼 당연시했고, 윤정후는 형을 보호한다는 이유로 어머니 뜻과 문서를 대신 정리하려 했다. 어머니가 자필 연습본에 남긴 90:10을 정후가 공증 60:40으로 줄인 것이 그 대표 흔적이다. 두 사람 모두 어머니 뜻을 있는 그대로 두지 못했다.',
      ),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 50, b: 50 },
      mediationLink: '어머니 뜻과 두 아들의 책임',
      requiredEvidence: ['e-5', 'e-6', 'e-7'],
      judgmentStatement: ko('두 형제는 서로 다른 방식으로 어머니 뜻을 자기 기준에 맞춰 움직였다.'),
      unlockCondition: {
        requireDispute: [
          { id: 'd-3', minState: 'S3' },
          { id: 'd-4', minState: 'S3' },
        ],
        runtimeRule: ko('d-3과 d-4가 모두 충분히 드러나면 해금'),
        authoredRule: ko('오래된 지원과 가족 기록이 모두 드러난 뒤 최종 책임 구조가 열린다.'),
      },
      verdictOptions: {
        wrong: ko('동생이 어머니를 이용해 유산을 독점하려 했다.'),
        partial: ko('양쪽 모두 어머니와의 관계에서 문제가 있었다.'),
        truth: ko('윤태성은 유산을 당연시했고, 윤정후는 형을 보호한다며 어머니 뜻을 고쳐 썼다. 자필 연습본 90:10이 공증본 60:40으로 바뀐 흐름이 그 대표 사례다. 둘 다 어머니 뜻을 있는 그대로 두지 못했다.'),
        defer: ko('어머니의 숨겨진 마음과 두 형제의 동기를 판단하기 어렵다. 유보한다.'),
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
          lieIntensity: 'L2',
          lieMotive: 'third_party_protection',
          initialState: 'S0',
          collapseViaTrust: false,
        },
      },
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('내가 평생 어머니를 모셨으니 더 받는 것은 당연하다.'),
            allowedKeywords: koKeywords('평생 모심', '더 받는 것 당연'),
            forbiddenKeywords: keywords(
              ['유산 당연시', '자필 90:10', '공증 60:40으로 축소', '두 번 왜곡'],
              ['taking inheritance for granted', 'handwritten 90:10', 'reduced to notarized 60:40', 'distorted twice'],
              ['遺産を当然視', '自筆90:10', '公証60:40に縮小', '二度の歪曲'],
              ['将遗产视为理所当然', '亲笔90:10', '缩减为公证60:40', '两次扭曲'],
            ),
            answerFrame: ko('A는 장남 당연시 frame strict.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('어머니 뜻을 그대로 정리한 것뿐이다.'),
            allowedKeywords: koKeywords('어머니 뜻 정리'),
            forbiddenKeywords: keywords(
              ['보호 명분', '자필 90:10', '공증 60:40으로 축소', '자기 몫 양보', '두 번 왜곡'],
              ['protective excuse', 'handwritten 90:10', 'reduced to notarized 60:40', 'gave up his share', 'distorted twice'],
              ['保護の名分', '自筆90:10', '公証60:40に縮小', '自分の取り分を譲歩', '二度の歪曲'],
              ['保护的名义', '亲笔90:10', '缩减为公证60:40', '让出自己份额', '两次扭曲'],
            ),
            answerFrame: ko('B는 어머니 뜻 정리 frame strict.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('어머니가 동생을 더 마음에 두셨을 수도 있다는 점은 들었다. 그러나 평생의 돌봄 비중이 그것과 무관할 수는 없다.'),
            allowedKeywords: koKeywords('동생을 더 마음에', '돌봄 비중', '무관 X'),
            forbiddenKeywords: keywords(
              ['유산 당연시', '두 번 왜곡'],
              ['taking inheritance for granted', 'distorted twice'],
              ['遺産を当然視', '二度の歪曲'],
              ['将遗产视为理所当然', '两次扭曲'],
            ),
            answerFrame: ko('A는 동생의 비중 가능성 거론 + 돌봄 frame 유지.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 "어머니가 동생을 더 보셨다 해도, 모신 건 내 쪽"이라고 말한다.'),
              behaviorHint: ko('어조에 자부심이 묻어난다.'),
            },
          },
          b: {
            admittedFact: ko('어머니가 자필로 남긴 글에 본인 비중이 더 컸던 것은 사실이다. 그러나 그것을 그대로 둘 수는 없는 이유가 있었다.'),
            allowedKeywords: koKeywords('자필 본인 비중', '그대로 둘 수 없는 이유'),
            forbiddenKeywords: keywords(
              ['자필 90:10', '공증 60:40으로 축소', '자기 몫 양보', '보호 명분'],
              ['handwritten 90:10', 'reduced to notarized 60:40', 'gave up his share', 'protective excuse'],
              ['自筆90:10', '公証60:40に縮小', '自分の取り分を譲歩', '保護の名分'],
              ['亲笔90:10', '缩减为公证60:40', '让出自己份额', '保护的名义'],
            ),
            answerFrame: ko('B는 자필 비중 차이 존재 인정. 정확 수치·축소·동기는 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "어머니가 남긴 비중과 공증본이 같지는 않았다"고 말한다.'),
              behaviorHint: ko('답이 짧게 끊긴다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('자필로 남긴 비중과 공증본이 같지 않았다는 점이 확인되면, 내가 받아온 돌봄의 의미를 다시 봐야 할지도 모른다.'),
            allowedKeywords: koKeywords('자필과 공증본 차이', '돌봄 의미 재해석'),
            forbiddenKeywords: keywords(
              ['유산 당연시', '자필 90:10'],
              ['taking inheritance for granted', 'handwritten 90:10'],
              ['遺産を当然視', '自筆90:10'],
              ['将遗产视为理所当然', '亲笔90:10'],
            ),
            answerFrame: ko('A는 비중 차이 의미 진입. 정확 수치 아직 X.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤태성은 "그 차이가 어디서 왔는지 답해라"고 말한다.'),
              behaviorHint: ko('숨이 짧아진다.'),
            },
          },
          b: {
            admittedFact: ko('어머니의 자필 연습본에 적힌 비중을 본인이 절차 안에서 다른 방향으로 다듬었다.'),
            allowedKeywords: koKeywords('자필 연습본', '다른 방향으로 다듬음'),
            forbiddenKeywords: keywords(
              ['자필 90:10', '공증 60:40으로 축소', '자기 몫 양보'],
              ['handwritten 90:10', 'reduced to notarized 60:40', 'gave up his share'],
              ['自筆90:10', '公証60:40に縮小', '自分の取り分を譲歩'],
              ['亲笔90:10', '缩减为公证60:40', '让出自己份额'],
            ),
            answerFrame: ko('B는 방향 변경 사실 인정. 정확 수치는 봉인 (S5까지).'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('윤정후는 "내가 다른 방향으로 다듬었다"고 말한다.'),
              behaviorHint: ko('말끝에 처음으로 무게가 실린다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('어머니가 남긴 비율을 동생이 본인 쪽으로 줄이는 방향으로 다듬었다는 점이 분명해진다. 그렇다면 동생은 무엇을 위해 그런 행동을 한 것인가.'),
            allowedKeywords: koKeywords('본인 쪽으로 줄임', '무엇을 위해'),
            forbiddenKeywords: keywords(
              ['자필 90:10'],
              ['handwritten 90:10'],
              ['自筆90:10'],
              ['亲笔90:10'],
            ),
            answerFrame: ko('A는 축소 방향 인지. 동기 질문.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('윤태성은 "동생이 자기 몫을 줄이는 방향으로 다듬었다는 게 사실이냐"고 말한다.'),
              behaviorHint: ko('표정이 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('어머니가 남긴 비율을 본인 쪽으로 줄이는 방향으로 다듬은 것은 사실이다. 형을 보호한다는 명분이 본인의 명분이었다.'),
            allowedKeywords: koKeywords('자기 쪽으로 줄임', '보호 명분'),
            forbiddenKeywords: keywords(
              ['자필 90:10'],
              ['handwritten 90:10'],
              ['自筆90:10'],
              ['亲笔90:10'],
            ),
            answerFrame: ko('B는 축소 + 보호 명분 직접 명시. 정확 수치는 아직 봉인.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤정후는 "형을 보호한다는 명분이 내 명분이었다"고 말한다.'),
              behaviorHint: ko('처음으로 말끝이 길게 이어진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('동생이 자기 몫을 줄였고, 나는 평생의 돌봄을 보상으로 여겨 그것이 당연하다고 받아왔다. 어머니 뜻이 두 번 왜곡되는 동안 나는 그 사실을 보지 못했다.'),
            allowedKeywords: koKeywords('당연시', '두 번 왜곡', '보지 못한 시간'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 당연시 frame + 두 번 왜곡 인정.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤태성은 한숨과 함께 "두 번 왜곡됐다는 말이 맞다"고 말한다.'),
              behaviorHint: ko('손이 무릎 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('보호 명분이라는 이유로 본인이 어머니 뜻을 고쳐 쓴 책임을 진다. 형의 무게를 줄이려 한 것이 결국 어머니의 마음을 줄이는 결정이 됐다.'),
            allowedKeywords: koKeywords('보호 명분 책임', '어머니 마음을 줄임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 보호 명분 책임 직접 진술.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('윤정후는 "내가 결국 어머니의 마음을 줄였다"고 말한다.'),
              behaviorHint: ko('호흡이 깊어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('어머니가 자필로 남긴 비율은 정후 90, 태성 10이었다. 동생이 그 비중을 공증본의 60:40으로 줄인 것을 인정한다. 내가 받아온 무게는 어머니가 처음 정한 것이 아니라 동생이 다시 정리한 결과였다.'),
            allowedKeywords: koKeywords('자필 90:10', '60:40으로 줄임', '동생이 다시 정리'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 정확 수치 + 줄임 사실 + 자기 frame 한계 완전 인정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤태성은 처음으로 자필 사진을 끝까지 들여다본다.'),
              behaviorHint: ko('어깨가 한참 내려간다.'),
            },
          },
          b: {
            admittedFact: ko('어머니가 자필 연습본에 정후 90, 태성 10으로 남기신 것을 본인이 공증 60:40으로 줄였다. 그 결정의 동기는 형이 흔들리지 않게 하기 위함이었지만, 그 안에서 어머니 뜻을 있는 그대로 두지 못한 책임은 내게 있다.'),
            allowedKeywords: koKeywords('자필 90:10', '공증 60:40으로 축소', '있는 그대로 두지 못함'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 정확 수치 + 축소 + 동기 + 책임 전부 명시.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('윤정후는 "어머니 뜻을 있는 그대로 두지 못한 것은 내가 한 일"이라고 말한다.'),
              behaviorHint: ko('시선이 형을 향한다.'),
            },
          },
        },
      },
      channelExposure: {
        judge_question: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_contradiction: { minLieState: 'S0', isSurfaceOnly: true, isDossierSurface: false },
        judge_evidence_combo: { minLieState: 'S4', isSurfaceOnly: true, isDossierSurface: false },
        judge_witness_summon: { minLieState: 'S2', isSurfaceOnly: true, isDossierSurface: false },
        dossier: { minLieState: 'S3', isSurfaceOnly: false, isDossierSurface: true },
        interrogation: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        contradiction_pursuit: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
        evidence_present: { minLieState: 'S3', isSurfaceOnly: false, isDossierSurface: false },
        mediation: { minLieState: 'S4', isSurfaceOnly: false, isDossierSurface: false },
        aftermath: { minLieState: 'S5', isSurfaceOnly: false, isDossierSurface: false },
        free_interrogation: { minLieState: 'S2', isSurfaceOnly: false, isDossierSurface: false },
      },
      progressionStages: {
        S0: {
          surfaceClaim: ko('장남 당연시 / 어머니 뜻 정리'),
          hiddenTruth: ko('양측 책임 구조'),
          validActions: ['fact_pursuit'],
          requiredEvidence: ['e-1'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('동생 비중 가능성 / 자필 본인 비중'),
          hiddenTruth: ko('비율 차이 존재'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: ['e-1', 'e-7'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('비중 차이 의미 / 방향 변경'),
          hiddenTruth: ko('자필 → 공증 축소'),
          validActions: ['evidence_query', 'contradiction_pursuit'],
          requiredEvidence: ['e-1', 'e-7'],
          requiredWitness: ['w-3'],
          successUnlocks: ['dc-5'],
        },
        S3: {
          surfaceClaim: ko('자기 쪽으로 줄임 / 보호 명분'),
          hiddenTruth: ko('자필 수치 (S4까지 봉인)'),
          validActions: ['motive_search', 'empathy_approach'],
          requiredEvidence: ['e-5'],
          requiredWitness: ['w-3'],
          successUnlocks: [],
        },
        S4: {
          surfaceClaim: ko('두 번 왜곡 / 보호 명분 책임'),
          hiddenTruth: ko('자필 90:10 수치 노출 준비'),
          validActions: ['empathy_approach'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('자필 90:10 + 공증 60:40 축소 인정'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: ['e-5', 'e-6', 'e-7'],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
      narrativeTriggers: d5NarrativeTriggers,
    },
  ],

  /* ----- evidence (7개: e-1 ~ e-7) ----- */
  evidence: [
    {
      id: 'e-1',
      name: ko('60:40 유서 사본'),
      surfaceName: ko('분배 비율이 적힌 서류 사본'),
      description: ko('어머니 사망 두 달 전 작성된 유서 사본. 윤정후 60%, 윤태성 40%로 적혀 있고 공증 도장이 찍혀 있다.'),
      surfaceDescription: ko('어머니의 유서 사본이 존재한다.'),
      type: 'contract',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'both',
      proves: ['d-1', 'd-2'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('이 유서를 처음 봤을 때 무엇이 가장 억울했는지'),
          implication: ko('윤태성은 장남인 자신이 40%라는 사실을 윤정후의 개입 흔적으로 본다.'),
        },
        b: {
          questionAngle: ko('이 유서의 비율과 작성 절차를 어떻게 이해하고 있었는지'),
          implication: ko('윤정후가 유서 작성 과정에 가까이 있었는지 따져야 한다.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('유서 사본의 존재와 공증 도장만 보인다.') },
        { id: 'excerpt', summary: ko('정해진 비율과 두 상속인 역할이 보인다.') },
        { id: 'original', summary: ko('작성일, 공증인, 재산 항목, 문구 전문을 확인한다.') },
        { id: 'context', summary: ko('요양 시점과 공증 절차를 맞춰 보며 의심의 방향을 좁힌다.') },
        { id: 'established', summary: ko('공증 사본의 효력과 다른 문서 존재 여부를 분리해 판단한다.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('윤태성이 공증 유서 사본을 제출했다.') },
        { id: 'verifying', summary: ko('공증 번호와 작성일을 기관 기록과 대조한다.') },
        { id: 'authenticated', summary: ko('공증 도장과 접수 기록이 서로 맞다.') },
        { id: 'challenged', summary: ko('윤정후 측은 이전 문서 존재 가능성을 두고 의미를 다툰다.') },
        { id: 'misread', summary: ko('사본 자체는 진짜지만 최종 의사 해석은 추가 자료가 필요하다.') },
      ],
    },
    {
      id: 'e-2',
      name: ko('요양원 방문기록'),
      surfaceName: ko('시설 방문 기록'),
      description: ko('말년 방문 빈도와 담당자 교체 시점을 보여주는 기관 기록. 공증 전 윤정후의 방문이 급증한다.'),
      surfaceDescription: ko('말년 방문 빈도와 담당자 교체 시점을 보여주는 기관 기록.'),
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
          questionAngle: ko('공증 직전 방문 급증을 어떻게 해석하는지'),
          implication: ko('동생의 사전 준비 정황으로 본다.'),
        },
        b: {
          questionAngle: ko('어머니의 일상 변화를 가까이서 본 시점'),
          implication: ko('방문 빈도와 유서 논의가 연결된다.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('방문 기록 존재만 보인다.') },
        { id: 'excerpt', summary: ko('공증 전 3주간 방문 횟수 증가가 보인다.') },
        { id: 'original', summary: ko('일자별 방문자 + 체류 시간 + 담당자 변경 기록 확인.') },
        { id: 'context', summary: ko('담당자 교체와 공증 시점이 같은 기간에 모인다.') },
        { id: 'established', summary: ko('방문 패턴과 절차 전환이 한 흐름으로 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('요양원 측 방문기록 사본 제출.') },
        { id: 'verifying', summary: ko('방문자 서명과 일지 대조.') },
        { id: 'authenticated', summary: ko('기록이 기관 일지와 일치 확인.') },
        { id: 'challenged', summary: ko('방문 자체가 개입 의도를 뜻하지는 않는다는 이의.') },
        { id: 'misread', summary: ko('방문 사실은 인증되나 의도 해석은 별도 자료 필요.') },
      ],
    },
    /* e-3 (전 요양보호사 음성증언) 폐기 — 2026-05-26 폴리싱 결정.
     * 음성증언과 w-1 (전 요양보호사 최복순) 증인이 동일 인물 영역이라 두 채널 중복.
     * 동일 사실 영역은 w-1 testimony.byDispute['d-1']로 단일화 (이미 본문 포함).
     * dc-1 leadLine.firstInputs: ['e-2'] / d-1 progressionStages requiredEvidence: ['e-2'] +
     * requiredWitness: ['w-1']로 재배치. combine-11 (e-2+e-3 → dc-2) 영역도 함께 폐기. */
    {
      id: 'e-4',
      name: ko('공증인 메모 기록'),
      surfaceName: ko('인증 절차 메모'),
      description: ko('공증 당일 절차를 남긴 인증 절차 메모. 오전 1차 접수에서 비율이 비어 있다가 오후 수정 접수에서 60:40으로 확정된 흐름이 남아 있다.'),
      surfaceDescription: ko('공증 당일 절차를 남긴 인증 절차 메모.'),
      type: 'institutional_note',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-2'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('오전 1차와 오후 수정 사이에 무엇이 바뀌었는지'),
          implication: ko('동생의 절차 개입 시점을 본다.'),
        },
        b: {
          questionAngle: ko('수정 단계에서 본인이 한 행동의 의미'),
          implication: ko('진행 압박과 어머니 상태가 절차에 어떻게 작용했는지.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('공증 메모 1건 존재만 보인다.') },
        { id: 'excerpt', summary: ko('오전 1차 접수의 비율 공란이 보인다.') },
        { id: 'original', summary: ko('오전 공란 + 오후 수정 60:40 확정 + 어머니 상태 메모 확인.') },
        { id: 'context', summary: ko('정후의 진행 압박과 어머니 상태 흐름이 메모로 복원.') },
        { id: 'established', summary: ko('공증 절차 안에서의 개입 흐름이 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('공증사무소 측 메모 사본 제출.') },
        { id: 'verifying', summary: ko('공증 일지와 메모 대조.') },
        { id: 'authenticated', summary: ko('메모와 공증 일지가 일치 확인.') },
        { id: 'challenged', summary: ko('수정 자체가 절차 개입이라 단정할 수 없다는 이의.') },
        { id: 'misread', summary: ko('메모는 인증되나 동기 판단은 별도 영역.') },
      ],
    },
    {
      id: 'e-5',
      name: ko('어머니 자필 유언장 연습본'),
      surfaceName: ko('자필 메모 사본'),
      /* description은 surface-safe — 구체 비율 수치는 depthStages established 단계에서만 노출. */
      description: ko('어머니가 남긴 자필 유언장 연습본. 공증본과 별개로 분배 방향이 적힌 흔적이 있다.'),
      surfaceDescription: ko('어머니가 남긴 자필 유언장 연습본. 구체 비율은 단계 조사로 확인된다.'),
      type: 'document',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'both',
      proves: ['d-5'],
      isTrap: false,
      requires: ['e-7'],
      requiredLieState: 'S5',
      partyContext: {
        a: {
          questionAngle: ko('자필 연습본의 의미를 어떻게 받아들이는지'),
          implication: ko('어머니의 처음 마음과 공증본 사이의 거리.'),
        },
        b: {
          questionAngle: ko('자필 연습본을 본인이 본 시점과 절차 단계에서의 결정'),
          implication: ko('자기 몫 축소 방향의 결정 책임.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('자필 연습본 존재만 보인다.') },
        { id: 'excerpt', summary: ko('연습본과 공증본의 차이만 추상적으로 보인다.') },
        { id: 'original', summary: ko('자필 본의 분배 흔적과 작성 시점 일부가 보인다.') },
        { id: 'context', summary: ko('자필 본과 공증 메모, 어머니 일기장이 함께 정리된다.') },
        { id: 'established', summary: ko('자필 90:10 비율이 공증 60:40으로 줄어든 흐름이 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('윤정후 측에서 유품 자료로 제출.') },
        { id: 'verifying', summary: ko('필적 감정 + 작성 시점 대조.') },
        { id: 'authenticated', summary: ko('어머니 필적과 일치 확인.') },
        { id: 'challenged', summary: ko('연습본의 효력 범위를 두고 의미를 다툰다.') },
        { id: 'misread', summary: ko('자필은 인증되나 공증본과의 관계 해석은 d-5 단계로.') },
      ],
      sensitiveSealTargets: {
        labels: [ko('자필 비율 정확 수치 (90:10)'), ko('자기 몫 축소 방향')],
        recommendedTiming: [
          ko('d-5 S5 도달 후만 노출'),
          ko('d-4 진실 노출 이후 dc-5 직전'),
        ],
        risks: [
          ko('너무 이르면 d-3 / d-4 추리 의미 무력화'),
          ko('S5 이전 노출 시 자기 몫 축소 동기 leak'),
        ],
      },
      narrativeTriggers: e5NarrativeTriggers,
    },
    {
      id: 'e-6',
      name: ko('오래된 계좌 흐름'),
      surfaceName: ko('오래된 송금 내역 묶음'),
      /* description은 surface-safe — 구체 출처/금액은 depthStages context/established 단계에서만 노출. */
      description: ko('장기간 반복된 송금과 특정 시점의 큰 자금 이동을 보여주는 은행 자료.'),
      surfaceDescription: ko('장기간 반복된 송금과 특정 시점의 큰 자금 이동을 보여주는 은행 자료.'),
      type: 'financial_record',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-3'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('어머니가 보내주신 돈이라고 알고 있던 흐름의 출처'),
          implication: ko('자존심 frame이 객관 자료에 부딪힌다.'),
        },
        b: {
          questionAngle: ko('20년간 송금 흐름을 어머니 통장을 거치게 한 결정'),
          implication: ko('형 자존심을 지키기 위한 통로 선택.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('어머니 통장과 형 쪽 입금 1건 존재만 보인다.') },
        { id: 'excerpt', summary: ko('월 단위 정기 지원금 흐름이 보인다.') },
        { id: 'original', summary: ko('20년간 송금 패턴 + 공장 위기 3억원 큰 자금 이동 확인.') },
        { id: 'context', summary: ko('어머니 통장에 정후 이름으로 입금된 송금 흐름과 어머니 통장에서 형 쪽으로 빠진 입금 흐름이 같은 통장 한 곳에 모두 기록된 것이 복원된다.') },
        { id: 'established', summary: ko('20년간 지원의 실제 출처가 윤정후 돈이라고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('어머니 통장 거래 내역을 상속인 자격으로 발급받아 제출.') },
        { id: 'verifying', summary: ko('계좌 간 송금 흐름과 시점 대조.') },
        { id: 'authenticated', summary: ko('각 단계 송금 시각과 금액이 모두 일치.') },
        { id: 'challenged', summary: ko('어머니 자금과 동생 자금의 구분이 흐릿하다는 이의.') },
        { id: 'misread', summary: ko('흐름은 인증되나 동기 영역은 d-4 단계로 분리.') },
      ],
    },
    {
      id: 'e-7',
      name: ko('어머니 일기장'),
      surfaceName: ko('오래된 노트 사본'),
      description: ko('어머니의 흰색 자필 공책. 윤태성이 아버지의 친자가 아니라는 사실, 두 아들 모두 똑같은 자식이라는 기록, 윤정후의 사전 인지가 함께 적혀 있다.'),
      surfaceDescription: ko('어머니의 흰색 자필 공책 사진이 존재한다.'),
      type: 'document',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'privacy_concern',
      subjectParty: 'b',
      proves: ['d-4', 'd-5'],
      isTrap: false,
      requires: [],
      requiredLieState: 'S2',
      partyContext: {
        a: {
          questionAngle: ko('어머니가 남긴 글을 어디까지 받아들일 수 있는지'),
          implication: ko('정체성 충격 영역.'),
        },
        b: {
          questionAngle: ko('일기장의 사실을 알고도 어떻게 침묵했는지'),
          implication: ko('보호 명분과 침묵의 무게.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('일기장 존재만 보인다.') },
        { id: 'excerpt', summary: ko('두 아들에 대한 어머니의 짤막한 글이 보인다.') },
        { id: 'original', summary: ko('정후에 대한 미안함과 두 아들 동등 언급이 확인된다.') },
        { id: 'context', summary: ko('출생 비밀 영역의 핵심 문장과 침묵 동기가 복원된다.') },
        { id: 'established', summary: ko('어머니 일기장의 사실이 공식기록 채택 (민감 정보 봉인 정책 별도).') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('윤정후 측에서 유품으로 제출.') },
        { id: 'verifying', summary: ko('어머니 필적 감정 + 작성 시점 대조.') },
        { id: 'authenticated', summary: ko('필적·시점 모두 일치.') },
        { id: 'challenged', summary: ko('일기장 일부 문장만으로 출생 사실 단정은 어렵다는 이의.') },
        { id: 'misread', summary: ko('문장은 인증되나 친부 실명은 봉인 정책 유지.') },
      ],
      sensitiveSealTargets: {
        labels: [ko('친부 실명'), ko('구체적 출생 경위'), ko('아버지 피는 아니다 직접 표현')],
        recommendedTiming: [
          ko('d-4 S4 이후 조건부 노출'),
          ko('출생 비밀 영역 처음 진입 시점'),
        ],
        risks: [
          ko('너무 이르면 윤태성 정체성 충격이 절차적 회복 불가'),
          ko('아버지 실명까지 공개되면 인도성 점수 하락'),
        ],
      },
      narrativeTriggers: e7NarrativeTriggers,
    },
  ],

  /* ----- witnesses (3명: w-1, w-2, w-3) ----- */
  witnesses: [
    {
      id: 'w-1',
      name: ko('최복순'),
      age: 61,
      gender: 'f',
      occupation: ko('전 요양보호사'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko('요양보호사로 일하며 윤정후가 어머니에게 종이를 읽어드리고, 형 오기 전에 끝내자고 조심스러워하던 모습을 직접 봤다. 어머니의 오랜 이웃 박순애와 동네에서 오래 알고 지낸 사이라, 어머니가 평소 두 아들에 대해 박순애에게 한 말도 일부 전해 들었다.'),
      address: {
        fromA: ko('큰아들분'),
        fromB: ko('작은아들분'),
      },
      hiddenAgenda: ko('요양보호사 교체 과정에서 자기 책임이 불거질까 봐 조심한다.'),
      relatedDisputes: ['d-1'],
      unlockedByDossier: ['dc-1'],
      testimony: {
        byDispute: {
          'd-1': {
            canProve: [
              ko('윤정후가 어머니에게 종이를 읽어드린 장면.'),
              ko('형이 오기 전에 끝내자는 발화를 직접 들음.'),
              ko('박순애로부터 전해 들은 어머니 평소 마음 영역 일부 (자기 관찰 영역 외 보강).'),
            ],
            cannotDisprove: [
              ko('정확한 강요 여부까지는 본인이 판단할 영역이 아니다.'),
              ko('교체 이후 일은 신임 담당자 영역.'),
            ],
          },
        },
      },
      narrativeTriggers: w1NarrativeTriggers,
    },
    {
      id: 'w-2',
      name: ko('김영수'),
      age: 57,
      gender: 'm',
      occupation: ko('공증인 메모 담당'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko('공증인 메모에 오전 1차 접수와 오후 수정 접수, 수정 절차 중 어머니 상태와 윤정후의 진행 태도가 남은 사실을 안다.'),
      address: {
        fromA: ko('큰아들분'),
        fromB: ko('서류 제출자분'),
      },
      hiddenAgenda: ko('공증 절차상 확인이 부족했던 점이 불거질까 봐 선을 긋는다.'),
      relatedDisputes: ['d-2'],
      unlockedByDossier: ['dc-2'],
      testimony: {
        byDispute: {
          'd-2': {
            canProve: [
              ko('오전 1차 접수에서 비율이 비어 있던 사실.'),
              ko('오후 수정 접수에서 60:40으로 확정된 절차.'),
              ko('어머니 상태가 흔들렸다는 메모 기록.'),
            ],
            cannotDisprove: [
              ko('정후의 진행 압박이 강요인지 정상 절차인지 단정 X.'),
              ko('어머니 의사 형성 과정의 의식 명료도까지는 모름.'),
            ],
          },
        },
      },
      narrativeTriggers: w2NarrativeTriggers,
    },
    {
      id: 'w-3',
      name: ko('박순애'),
      age: 69,
      gender: 'f',
      occupation: ko('어머니의 오랜 지인'),
      bias: 'pro_a',
      distortionRisk: 'biased',
      knowledgeScope: ko('어머니의 오랜 지인. 동네에서 전 요양보호사 최복순과도 오래 알고 지낸 사이라, 어머니의 마음 영역과 평소 생활 영역을 두 채널로 안다. 어머니로부터 두 아들에 대한 속마음을 자주 들었고, 정후가 매달 돈을 보낸다는 말과 태성이 공장 도움이 어디서 왔는지에 대해 어머니의 발화를 기억한다.'),
      address: {
        fromA: ko('태성이'),
        fromB: ko('정후'),
      },
      hiddenAgenda: ko('윤태성에 대한 동정심이 강해 일부 정보를 자기 해석으로 포장한다.'),
      relatedDisputes: ['d-3', 'd-5'],
      unlockedByDossier: ['dc-3', 'dc-5'],
      testimony: {
        byDispute: {
          'd-3': {
            canProve: [
              ko('어머니가 "정후가 매달 돈을 보낸다"고 본인에게 말한 사실.'),
              ko('어머니가 태성을 위해 정후의 돈을 통장에서 보냈다는 흐름의 일부.'),
            ],
            cannotDisprove: [
              ko('어머니의 출생 비밀 인지 영역까지는 직접 발화로 들은 적이 없다.'),
              ko('통장 흐름의 정확한 금액·시점은 본인 scope 밖.'),
            ],
          },
          'd-5': {
            canProve: [
              ko('어머니가 두 아들에 대해 "정후가 더 짊어졌다"고 말한 적이 있다는 사실.'),
              ko('태성에 대한 어머니의 안쓰러움 발화.'),
            ],
            cannotDisprove: [
              ko('자필 연습본의 정확한 비율을 본인이 본 적은 없다.'),
              ko('어머니의 최종 의사 단계에서의 결정은 본인 영역 밖.'),
            ],
          },
        },
      },
      narrativeTriggers: w3NarrativeTriggers,
    },
  ],

  /* ----- dossierCards (5개: dc-1 ~ dc-5) ----- */
  dossierCards: [
    {
      id: 'dc-1',
      label: ko('말년의 종이'),
      description: ko('말년의 방문 패턴과 읽어주던 종이가 치매 이용인지, 불안한 보호인지 가르는 첫 카드.'),
      type: 'derived_evidence',
      linkedDisputes: ['d-1'],
      linkedParty: 'b',
      linkedEvidence: ['e-1', 'e-2'],
      leadLine: {
        id: 'L-1',
        name: ko('Timeline Lead'),
        leadType: 'Timeline',
        firstInputs: ['e-2'],
        secondInputs: ['L-1', 'e-1'],
        interpretationChoices: [
          { id: 'L-1-A', text: ko('치매 이용이다'), implication: ko('전면 무효 frame으로 밀어붙인다.') },
          { id: 'L-1-B', text: ko('어머니 뜻을 옮긴 도움이다'), implication: ko('도움 frame을 유지한다.') },
          { id: 'L-1-C', text: ko('도움과 개입의 경계 영역'), implication: ko('두 동기를 분리해 본다.') },
        ],
      },
      noteText: ko('방문 급증 + 종이를 읽어드린 정황 + 형 오기 전 발화가 한 흐름으로 모여 도움과 개입의 경계가 드러난다.'),
      successConditionSummary: [
        ko('e-2가 Original 이상이고 w-1 증인 출석 완료'),
        ko('윤정후가 d-1에서 S2 이상으로 진입'),
      ],
      successEffects: [
        ko('d-1 핵심 사실 "부분 판단능력 + B 개입" 잠정 인정'),
        ko('형을 피하려 서둘렀다는 동기 frame 노출'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-1' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-1', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('전 요양보호사(w-1)를 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-1.b.q1',
              text: ko('윤정후 씨, 공증 직전 방문이 급증했고 어머니에게 종이를 읽어드린 정황까지 있는데, 왜 형이 오기 전에 끝내려 하셨습니까?'),
              lockedHint: ko('요양원 방문기록과 전 요양보호사 증언이 원본 수준으로 열려야 질문이 보입니다.'),
              attackVector: 'timeline',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'timeline',
                revealAtom: 'family-01:b:d-1:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-1.b.q2',
              text: ko('어머니 판단이 완전히 없었다고까지는 보기 어렵다면, 어디까지는 돕고 어디서부터는 대신 결정한 것입니까?'),
              lockedHint: ko('B가 개입 자체를 더는 부인하지 못해야 마지막 질문이 열립니다.'),
              attackVector: 'contradiction',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'contradiction',
                revealAtom: 'family-01:b:d-1:S4:0',
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
      label: ko('수정된 유언장'),
      description: ko('공증 오후 수정의 존재를 넘어서, 절차 안에서 어떤 흐름이 만들어졌는지를 묻는 카드.'),
      type: 'derived_evidence',
      linkedDisputes: ['d-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-4'],
      leadLine: {
        id: 'L-2',
        name: ko('Procedural Lead'),
        leadType: 'Procedural',
        firstInputs: ['e-4'],
        secondInputs: ['L-2', 'w-2'],
        interpretationChoices: [
          { id: 'L-2-A', text: ko('탐욕 조작이다'), implication: ko('자기 몫 늘림 frame.') },
          { id: 'L-2-B', text: ko('다른 동기의 절차 개입이다'), implication: ko('동기는 d-5에서.') },
          { id: 'L-2-C', text: ko('정상 절차 안의 수정이다'), implication: ko('정상 진행 frame 유지.') },
        ],
      },
      noteText: ko('오전 1차 접수에서 비율이 비어 있다가 오후 수정 접수에서 60:40으로 확정된 흐름이 공증인 메모로 남아 있다. 절차에 손댄 책임이 드러나는 카드.'),
      successConditionSummary: [
        ko('e-4가 Original 이상'),
        ko('d-1이 S3 이상이어서 d-2가 열린 상태'),
      ],
      successEffects: [
        ko('d-2 핵심 사실 "오전 1차 비율 공란 → 오후 수정 60:40 확정" 잠정 인정'),
        ko('절차 개입의 동기 축이 d-5로 이동 준비'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-2' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-2', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('공증인 메모 담당(w-2)을 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-2.b.q1',
              text: ko('윤정후 씨, 같은 날 오전 1차 비율 공란과 오후 수정본 60:40이 공증 절차 안에 모두 남아 있는데, 왜 흐름을 새로 정리한 서류를 다시 제출하셨습니까?'),
              lockedHint: ko('공증인 메모 기록과 오전 1차 비율 공란이 함께 확보돼야 보입니다.'),
              attackVector: 'contradiction',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'contradiction',
                revealAtom: 'family-01:b:d-2:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-2.b.q2',
              text: ko('절차 개입이라는 책임을 감수하면서까지 오후 수정에서 60:40으로 확정한 이유가 본 쟁점에서 결론짓지 않더라도, 다음 쟁점에서 답하실 준비는 되어 있습니까?'),
              lockedHint: ko('공증 절차 개입을 이미 인정한 뒤에야 마지막 질문이 열립니다.'),
              attackVector: 'context',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'family-01:b:d-2:S4:0',
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
      label: ko('20년의 돈'),
      description: ko('어머니 돈처럼 보였던 흐름을 윤정후 개인의 희생으로 뒤집는 지원 실체 카드.'),
      type: 'derived_evidence',
      linkedDisputes: ['d-3'],
      linkedParty: 'b',
      linkedEvidence: ['e-6'],
      leadLine: {
        id: 'L-3',
        name: ko('Beneficiary Lead'),
        leadType: 'Beneficiary',
        firstInputs: ['e-6'],
        secondInputs: ['L-3', 'w-3'],
        interpretationChoices: [
          { id: 'L-3-A', text: ko('어머니 통제 수단이었다'), implication: ko('A 측 해석.') },
          { id: 'L-3-B', text: ko('형을 살리려 한 희생이다'), implication: ko('B 측 해석.') },
          { id: 'L-3-C', text: ko('형 자존심을 지키려는 통로'), implication: ko('보호 명분 영역.') },
        ],
      },
      noteText: ko('윤정후 계좌 → 어머니 통장 → 윤태성 쪽으로 20년간 흘러간 월 정기 지원금과 공장 위기 3억원의 실체. 형이 모르게 한 결정의 동기가 d-4로 이어진다.'),
      successConditionSummary: [
        ko('e-6이 Original 이상'),
        ko('d-2가 S3 이상으로 진전되어 d-3이 열린 상태'),
      ],
      successEffects: [
        ko('d-3 핵심 사실 "20년간 윤정후 돈 + 통장 경유" 잠정 인정'),
        ko('형 자존심 동기 + d-4 출생 비밀 영역 unlock 준비'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-3' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-3', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('어머니의 오랜 지인(w-3)을 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-3.b.q1',
              text: ko('윤정후 씨, 장기간 정기 지원금과 형 공장 자금 상당수가 실제로는 당신 돈이었다는 점, 이제도 부인하십니까?'),
              lockedHint: ko('오래된 계좌 흐름이 원본 수준으로 확보돼야 질문이 보입니다.'),
              attackVector: 'authenticity',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'authenticity',
                revealAtom: 'family-01:b:d-3:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-3.b.q2',
              text: ko('형이 평생 어머니가 도와준 줄 믿게 둔 이유가, 결국 형 자존심을 먼저 지키려는 것이었습니까?'),
              lockedHint: ko('돈의 출처를 더는 숨길 수 없게 된 뒤에야 두 번째 질문이 열립니다.'),
              attackVector: 'context',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'family-01:b:d-3:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-4',
      label: ko('감춘 이유'),
      description: ko('유서 조작과 20년 지원의 끝에 있던 출생 비밀의 이유를 직접 묻는 심층 카드.'),
      type: 'note',
      linkedDisputes: ['d-4'],
      linkedParty: 'b',
      linkedEvidence: ['e-7'],
      leadLine: {
        id: 'L-4',
        name: ko('Context Lead'),
        leadType: 'Context',
        firstInputs: ['e-7'],
        secondInputs: ['L-4', 'e-6'],
        interpretationChoices: [
          { id: 'L-4-A', text: ko('단순 폭로 소재다'), implication: ko('표면적 해석.') },
          { id: 'L-4-B', text: ko('유서 조작 동기의 핵심이다'), implication: ko('보호 명분 영역.') },
        ],
      },
      noteText: ko('어머니 일기장의 출생 비밀 + 두 아들 동등 기록 + 윤정후의 사전 인지 + 친자 양보 영역. 침묵의 동기가 형의 정체성 보호로 정리된다.'),
      successConditionSummary: [
        ko('e-7이 Context 이상'),
        ko('d-3이 S3 이상으로 진전되어 d-4가 열린 상태'),
      ],
      successEffects: [
        ko('d-4 핵심 사실 "출생 비밀 + 정후 사전 인지 + 친자 양보" 잠정 인정'),
        ko('침묵의 동기가 보호 명분으로 정리'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-4' },
        { kind: 'unlock_dispute', unlockNodeId: 'd-5' },
      ],
      judgeHint: ko('민감 정보 봉인 정책 영역 — 친부 실명 노출은 별도 절차.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-4.b.q1',
              text: ko('윤정후 씨, 형의 오랜 가족 사정을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까?'),
              lockedHint: ko('어머니 일기장 핵심 문장과 20년 지원 맥락이 함께 붙어야 질문이 보입니다.'),
              attackVector: 'timeline',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'timeline',
                revealAtom: 'family-01:b:d-4:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-4.b.q2',
              text: ko('형이 그 사실을 알면 삶의 기반이 무너질까 두려워, 결국 법정까지 가지 않게 하려 했다는 말입니까?'),
              lockedHint: ko('B가 가족 사정의 존재를 더는 부인하지 못해야 마지막 질문이 열립니다.'),
              attackVector: 'context',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'family-01:b:d-4:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc4NarrativeTriggers,
    },
    {
      id: 'dc-5',
      label: ko('어머니의 뜻'),
      description: ko('장남 당연시와 보호 명분을 한 자리에 올려, 누가 어떤 방식으로 어머니 뜻을 바꿨는지 정리하는 최종 카드.'),
      type: 'derived_evidence',
      /** dc-5 = 최종 책임축 — 사용자 결정으로 linkedParty='b' (B의 비율 축소가 메인). A 측 challenge는 challenges.a로 별도 보존 (유산 당연시 reframe). */
      linkedDisputes: ['d-5'],
      linkedParty: 'b',
      linkedEvidence: ['e-1', 'e-6', 'e-7'],
      leadLine: {
        id: 'L-5',
        name: ko('Closure Lead'),
        leadType: 'Closure',
        firstInputs: ['e-1', 'e-6'],
        secondInputs: ['L-5', 'e-7'],
        interpretationChoices: [
          { id: 'L-5-A', text: ko('한쪽의 책임이 더 크다'), implication: ko('단일 책임 frame.') },
          { id: 'L-5-B', text: ko('어머니 뜻을 두 번 비틀었다'), implication: ko('양측 책임 명시.') },
        ],
      },
      noteText: ko('자필 연습본 90:10이 공증 60:40으로 줄어든 흐름과 20년 지원 + 출생 비밀이 함께 정리되며 양측의 책임축이 동시에 드러난다.'),
      successConditionSummary: [
        ko('d-3이 S3 이상이고 d-4가 S3 이상'),
        ko('e-6과 e-7이 모두 Context 이상'),
      ],
      successEffects: [
        ko('d-5 unlock 후 윤태성의 유산 당연시와 윤정후의 보호 명분이 함께 기록'),
        ko('최종 평의에서 "누가 어떤 방식으로 어머니 뜻을 바꿨나" frame 이동'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-5' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-5', weight: 'high', ambiguity: 'high' },
        },
      ],
      judgeHint: ko('양측 책임축 정리 카드. 자필 비율 노출은 d-5 S5에서.'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-5.a.q1',
              text: ko('윤태성 씨, 동생 돈이었다는 사실을 몰랐다 해도 장남이니 더 받아야 한다고 여긴 마음까지는 부인하지 않으십니까?'),
              lockedHint: ko('20년 지원 축이 열린 뒤에야 A 대상 질문이 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'family-01:a:d-5:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
        b: {
          questions: [
            {
              id: 'dc-5.b.q1',
              text: ko('윤정후 씨, 형을 지키려 했다는 이유가 있더라도 어머니가 남긴 비율을 당신이 고쳐 쓴 책임까지 없어지는 건 아니지 않습니까?'),
              lockedHint: ko('출생 비밀 축이 열린 뒤에야 B 대상 질문이 보입니다.'),
              attackVector: 'contradiction',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'contradiction',
                revealAtom: 'family-01:b:d-5:S3:0',
                lieAdvance: true,
              },
            },
            {
              id: 'dc-5.b.q2',
              text: ko('결국 두 형제 모두 어머니를 있는 그대로 두지 못했다는 말, 이제는 인정하십니까?'),
              lockedHint: ko('윤태성과 윤정후의 책임축이 모두 한 번씩 열린 뒤에야 마지막 질문이 열립니다.'),
              attackVector: 'context',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'family-01:b:d-5:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
      narrativeTriggers: dc5NarrativeTriggers,
    },
  ],

  /* ----- combinationRecipes (5개, evidence + statement combine) -----
   * legacy 12 recipe 중 stmt-* 입력 recipe (combine-5,6,9,10,12)는 schema validator의
   * statement 영역(자유 작성)으로 보존. Authority에는 evidence-evidence 결합 recipe만 직접 정의.
   * ============================================================================ */
  combinationRecipes: [
    {
      id: 'combine-1',
      inputs: ['e-1', 'e-2'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('공증본 비율과 방문 시점이 같은 기간으로 겹친다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'excerpt', 'e-2': 'excerpt' },
        requiredTruthStage: { 'd-1': 1 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('유서 비율과 방문 시점이 겹친다.'),
    },
    {
      id: 'combine-2',
      inputs: ['e-4', 'e-5'],
      cost: 3,
      outputId: 'dc-5',
      discoveryText: ko('공증인 메모의 절차 흐름과 자필 연습본의 분배 흔적이 한 줄로 정리된다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'original', 'e-5': 'original' },
        requiredTruthStage: { 'd-5': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('두 유서의 비율이 서로 다르다.'),
    },
    {
      id: 'combine-3',
      inputs: ['e-5', 'e-6'],
      cost: 2,
      outputId: 'dc-3',
      discoveryText: ko('자필 분배 흔적과 오래된 송금 흐름이 같은 출처로 묶인다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-5': 'context', 'e-6': 'original' },
        requiredTruthStage: { 'd-3': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('유품 문서의 비율과 오래된 자금 흐름이 연결된다.'),
    },
    {
      id: 'combine-4',
      inputs: ['e-6', 'e-7'],
      cost: 2,
      outputId: 'dc-4',
      discoveryText: ko('오래된 송금 내역 묶음과 오래된 노트 사본의 핵심 문장이 침묵의 동기로 모인다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-6': 'context', 'e-7': 'context' },
        requiredTruthStage: { 'd-4': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('오래된 자금 흐름과 일기장 기록 사이에 숨은 이유가 보인다.'),
    },
    {
      id: 'combine-5',
      inputs: ['stmt-b-silence', 'e-4'],
      cost: 1,
      outputId: 'dc-2',
      discoveryText: ko('윤정후의 차단 발언과 인증 절차 메모가 맞물린다. 유언장에 손댄 경위를 따져야 한다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'context' },
        requiredTruthStage: { 'd-2': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('윤정후가 말을 피한 이유와 공증 기록이 맞물린다.'),
    },
    {
      id: 'combine-6',
      inputs: ['stmt-b-mother', 'e-6'],
      cost: 1,
      outputId: 'dc-3',
      discoveryText: ko('어머니 뜻이라는 말 뒤에 오래된 지원 흐름이 있다. 어머니 통장을 거친 돈의 출처를 짚어야 한다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-6': 'original' },
        requiredTruthStage: { 'd-3': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('어머니의 뜻이라는 말 뒤에 오래된 자금 흐름이 있다.'),
    },
    {
      id: 'combine-7',
      inputs: ['e-5', 'e-7'],
      cost: 2,
      outputId: 'dc-4',
      discoveryText: ko('자필 연습본과 오래된 노트 사본의 시점이 한 흐름으로 묶인다. 비율을 낮춰 가면서까지 막으려 한 것이 무엇인지 물어야 한다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-5': 'original', 'e-7': 'context' },
        requiredTruthStage: { 'd-4': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('유품 문서와 어머니 기록을 함께 보면 변경 과정의 위험이 보인다.'),
    },
    {
      id: 'combine-8',
      inputs: ['e-1', 'e-7'],
      cost: 2,
      outputId: 'dc-5',
      discoveryText: ko('유서 비율과 오래된 노트 사본의 기록이 겹친다. 장남 당연시와 보호 명분이 같은 구조 위에 서 있다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'context', 'e-7': 'context' },
        requiredTruthStage: { 'd-5': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('유서 비율과 어머니 기록을 함께 보면 두 사람의 해석이 갈린다.'),
    },
    {
      id: 'combine-9',
      inputs: ['stmt-a-heir', 'e-7'],
      cost: 1,
      outputId: 'dc-5',
      discoveryText: ko("형의 '모시고 산 건 나인데'라는 말과 오래된 노트 사본의 기록이 충돌한다. 두 사람이 각자 어머니 뜻을 어떻게 받아 적었는지 짚어야 한다."),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-7': 'context' },
        requiredTruthStage: { 'd-5': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('윤태성의 상속 감정과 어머니 기록이 부딪힌다.'),
    },
    {
      id: 'combine-10',
      inputs: ['stmt-a-heir', 'e-6'],
      cost: 1,
      outputId: 'dc-3',
      discoveryText: ko("형의 '모시고 산 건 나인데'라는 말과 오래된 송금 내역 묶음을 합치면, 돈과 침묵을 함께 떠안은 동생의 동기가 보인다."),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-6': 'context' },
        requiredTruthStage: { 'd-3': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('상속 감정과 오래된 자금 흐름을 함께 볼 필요가 있다.'),
    },
    /* combine-11 (e-2+e-3 → dc-2) 폐기 — e-3 폐기 cascade. dc-2는 combine-5 (stmt-b-silence+e-4)와 dc2NarrativeTriggers (cascade/outburst/judge-auto)로 충분히 unlock 가능. */
    {
      id: 'combine-12',
      inputs: ['stmt-a-heir', 'stmt-b-silence'],
      cost: 1,
      outputId: 'dc-2',
      discoveryText: ko("'모시고 산 건 나인데 왜 40이냐'와 윤정후의 차단 발언을 맞대면, 비율 뒤에 숨은 사정이 있다는 흐름이 보인다."),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredTruthStage: { 'd-2': 1 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('상속 감정과 침묵 사이에 설명되지 않은 간격이 있다.'),
    },
  ],

  /* ----- authorityPlacements — 재판관 추천 모먼트 ----- */
  authorityPlacements: [
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-1 초반 e-1/e-2 Excerpt 시점'),
      purpose: ko('감정이 아니라 패턴으로 의심을 고정.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('증인 출석 요청'),
      recommendedMoment: ko('d-1 S2 도달 직후 w-1 축'),
      purpose: ko('전 요양보호사 최복순(w-1)이 직접 본 종이 읽는 장면과 "형 오기 전에" 발화를 본 법정에서 직접 청취.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-2 등장 직후 e-4 축'),
      purpose: ko('공증인 메모의 오전/오후 분리 흐름을 확정.'),
      contextDispute: 'd-2',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-3 등장 후 e-6 축'),
      purpose: ko('20년 송금 흐름과 공장 위기 3억원 전달 경로를 확정.'),
      contextDispute: 'd-3',
    },
    {
      action: ko('정확히 답변하십시오'),
      recommendedMoment: ko('B가 "가족 사정"이라는 모호어를 반복할 때'),
      purpose: ko('일기장 영역으로 들어가는 단어 강제.'),
      contextDispute: 'd-4',
    },
    {
      action: ko('분리심문'),
      recommendedMoment: ko('w-1 증언 인증 직후 B'),
      purpose: ko('affect_flattening인 B를 도움/개입 경계에서 흔든다.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('분리심문'),
      recommendedMoment: ko('e-6 Excerpt 직후 A'),
      purpose: ko('A의 자존심 frame을 줄이고 출처 진실에 접근.'),
      contextDispute: 'd-3',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('w-1 증언 인증 후'),
      purpose: ko('윤정후의 유서 절차 개입 사실을 부분 기록.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-4 인증 후'),
      purpose: ko('오전 공란 → 오후 60:40 흐름 기록.'),
      contextDispute: 'd-2',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-6 인증 후'),
      purpose: ko('20년 정기 지원금의 실제 출처를 기록.'),
      contextDispute: 'd-3',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('e-7 Established 후'),
      purpose: ko('어머니 일기장 영역의 사실 부분 기록 (친부 실명은 봉인 유지).'),
      contextDispute: 'd-4',
    },
    {
      action: ko('선처 창구'),
      recommendedMoment: ko('dc-3 또는 dc-4 직후'),
      purpose: ko('A는 자존심 회복 방향, B는 침묵의 무게를 함께 진다.'),
    },
    {
      action: ko('발언 제지 / 기록 제외'),
      recommendedMoment: ko('A가 인격 공격으로 동생 신뢰도를 깎으려 할 때'),
      purpose: ko('프레임 싸움을 줄이고 공식기록과 가설을 분리.'),
    },
    {
      action: ko('민감정보 봉인 해제'),
      recommendedMoment: ko('d-4 S4 이후 핵심 영역만 조건부 노출'),
      purpose: ko('출생 비밀을 정합 영역까지만 열되 친부 실명은 봉인 유지.'),
      contextDispute: 'd-4',
    },
  ],

  /* ----- officialRecordRecommendations ----- */
  officialRecordRecommendations: [
    ko('어머니의 판단 능력은 완전히 상실되지 않았으나, 윤정후의 개입이 유서 작성에 영향을 미쳤다.'),
    ko('공증본 60:40은 오전 1차 공란 → 오후 수정 단계에서 윤정후의 진행 압박 아래 확정됐다.'),
    ko('윤정후 돈이 어머니 통장을 거쳐 20년간 월 정기 지원금으로 보내졌고, 공장 위기 시에는 3억원이 같은 경로로 전달됐다.'),
    ko('어머니 일기장은 윤태성이 아버지의 친자가 아니라는 사실, 두 아들 모두 동등한 자식이라는 어머니의 마음, 그리고 친자인 윤정후의 사전 인지와 가업 공장 양보를 함께 기록한다.'),
    ko('어머니가 자필 연습본에 남긴 90:10을 윤정후가 공증 60:40으로 줄였다. 두 형제 모두 어머니 뜻을 있는 그대로 두지 못한 책임이 있다.'),
  ],

  /* ----- solutions ----- */
  solutions: {
    분배책임분리: [
      ko('자필 연습본 90:10과 공증본 60:40 사이의 거리를 별도 책임으로 분리하고, 형의 돌봄 비중과 동생의 양보 비중을 함께 기록한다.'),
      ko('20년 정기 지원금과 공장 위기 3억원 전달 흐름을 어머니 자금과 분리해 정리한다.'),
    ],
    가족기록봉인경계: [
      ko('출생 비밀 영역은 형의 정체성 회복 단계까지 봉인하되, 정후의 침묵 동기는 사건 안에서 인정한다.'),
      ko('친부 실명·구체적 출생 경위는 민감 정보 봉인 정책을 유지한다.'),
    ],
    형제관계회복절차: [
      ko('자존심·돌봄의 과거 frame과 양보·침묵의 과거 frame을 함께 펼쳐, 양측 책임축을 동시에 기록한다.'),
      ko('어머니 뜻이 두 번 비틀린 흐름을 인정하고, 향후 가족 결정의 사전 합의 절차를 다시 세운다.'),
    ],
  },

  /* ----- relationshipLedger (4개 entry — case JSON과 정합) ----- */
  relationshipLedger: [
    {
      id: 'ledger-1',
      category: 'distorted',
      description: ko('어머니가 생전에 누구를 더 아꼈는지, 두 형제의 기억이 정반대다.'),
      isReal: true,
      whoRemembersAccurately: 'neither',
      whoDistorts: 'both',
      distortionDirection: ko('윤태성은 자신이 모셨으니 당연히 더 받아야 한다고 기억하고, 윤정후는 어머니가 원래 자기에게 90을 남기려 했다는 사실을 알면서 말하지 않는다.'),
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-2',
      category: 'silenced',
      description: ko('윤태성이 어머니에게서 도움을 받아 왔다고 기억하지만, 실제 출처와 전달 순서는 윤정후가 어머니 통장을 거쳐 보낸 돈이었다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-3',
      category: 'silenced',
      description: ko('어머니가 남긴 오래된 가족 기록(출생 비밀 영역)을 윤정후만 알고 있다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-4',
      category: 'distorted',
      description: ko('유서가 60:40으로 손대어진 사실 자체는 양측 다 안다. 하지만 별도 자필 연습본의 정확한 비율은 윤태성이 아직 모른다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'a',
      distortionDirection: ko('윤태성은 60:40이 윤정후가 자기 몫을 늘린 결과라고 단정한다.'),
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
  ],

  /* ----- flags ----- */
  baseEvidenceIds: ['e-1', 'e-2', 'e-4'],
  monetaryDisputeIds: ['d-2', 'd-3', 'd-5'],
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],

  /* ----- uiExposure ----- */
  uiExposure: {
    fieldPolicy: {
      'partyA.fear': {
        gate: 'after_dispute_truth',
        hintLocked: ko('가족 사정이 드러나기 전에는 보이지 않습니다.'),
        requireDisputeTruth: 'd-4',
      },
      'partyB.fear': {
        gate: 'after_dispute_truth',
        hintLocked: ko('가족 사정이 드러나기 전에는 보이지 않습니다.'),
        requireDisputeTruth: 'd-4',
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

  /* ----- freeInterrogation ----- */
  freeInterrogation: {
    paraphraseRules: [
      { label: '오래된 가족 사정', dimension: 'paraphrase' },
      { label: '말하기 어려운 집안 사정', dimension: 'paraphrase' },
      { label: '정체성에 관한 민감한 사정', dimension: 'paraphrase' },
      { label: '오래 이어진 정기 지원', dimension: 'paraphrase' },
      { label: '다른 출처의 돈', dimension: 'paraphrase' },
      { label: '공증본과 다른 비율', dimension: 'paraphrase' },
      { label: '변경 방향', dimension: 'paraphrase' },
      { label: '비율을 바꾼 이유', dimension: 'paraphrase' },
      { label: '상대에게 알려지길 피하려', dimension: 'paraphrase' },
      { label: '과거 자금 지원', dimension: 'paraphrase' },
      { label: '도와드린 흐름', dimension: 'paraphrase' },
      { label: '말 못한 사정이 있어', dimension: 'paraphrase' },
      { label: '집안 어른의 사정', dimension: 'paraphrase' },
      { label: '오랜 결심', dimension: 'paraphrase' },
      { label: '형 모르게 마련한 돈', dimension: 'paraphrase' },
    ],
  },

  /* ----- truthLeakOverride -----
   * baseline truth-leak-matrix.family-01 hidden 영역이 정밀 큐레이션됨 ([[design_truth_leak_keyword_nature]]
   * 정책: 행위/사실만 등록, 동기/태도/해석은 false positive 영역). Authority truthStages.forbiddenKeywords는
   * LLM 자유 심문 frame inject용 광역 키워드 (동기·심리 포함)이고, matrix hidden은 surface detector용
   * 정밀 phrase. 두 영역 분리 운영. derive가 truthLeakOverride만 baseline 매트릭스에 union하므로
   * 본 Authority의 override는 비움 (= baseline 매트릭스 보존). 추가 phrase 필요 시 design 정책 따라 별도 검토.
   * ============================================================================ */
  truthLeakOverride: {
    perDispute: {},
    /* truth-leak-matrix validator는 key:value 형식 강제. band/archetype/channel prefix로 통일. */
    designIntentTags: ['band:late', 'archetype:confess', 'reveal:full', 'channel:aftermath'],
  },
}
