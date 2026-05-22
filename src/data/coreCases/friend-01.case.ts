/**
 * friend-01 — Core Case Authority
 *
 * 권위 단일 출처. 본 파일이 변경되면 `scripts/build-core-case.mjs`가 4 derived layer
 * (cases/generated, claimPolicies/{caseId}-v3-game-loop-data, disclosurePolicy, truth-leak-matrix)를 자동 sync.
 *
 * 본 파일은 KO 권위만 채운다. EN/JA/ZH-CN은 translate pass (Codex/GPT Pro) 이후 채워짐.
 * truthStages.forbiddenKeywords + truthLeakOverride는 이미 truth-leak-matrix에 4언어 등록되어 있으므로 4언어 모두 채움.
 *
 * 사건 핵심 (2026-05-23 사용자 확정):
 *   - dispute: d-1, d-2, d-3, d-4, d-5 (5 chain). h-d* hidden dispute 없음.
 *   - dossier: dc-1 ~ dc-5 (dc-1='a' / dc-2='b' / dc-3='b' / dc-4='b' / dc-5='a')
 *     · dc-1='a' + b 측 challenge 1건 보존 (낙인 시작 frame은 a 중심)
 *     · dc-5='a' + b 측 challenge 1건 보존 (낙인의 순서 = a 매도 책임 중심)
 *   - dc-2 linkedDisputes=['d-1','d-2'] (dossier file 권위 채택; combinationLab nodes mismatch 정정)
 *   - baseEvidenceIds: ['e-1', 'e-2', 'e-3'] — 연락 기록 + 단톡방 캡처 + 과거 손절 직전 카톡 (surface band)
 *   - monetaryDisputeIds: ['d-3', 'd-4'] (아버지 돈 접근 패턴 + 과거 차용금 미상환)
 *   - evidence requiredLieState: e-5='S2', e-6='S2', e-7='S3' (sensitive sealing)
 *
 * Schema: [src/types/coreCase.ts](../../types/coreCase.ts)
 */

import {
  type CoreCaseAuthority,
  type LocalizedString,
  type LocalizedKeywordSet,
} from '../../types/coreCase'

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

export const friend01CaseAuthority: CoreCaseAuthority = {
  /* ----- meta ----- */
  meta: {
    caseId: 'friend-01',
    caseNumber: 'TE-FriendV401',
    caseName: ko('손절한 절친'),
    schemaVersion: 'core-case-v1',
    title: ko('손절한 절친'),
    relationshipType: 'friend',
    contextType: 'friend_betrayal_reframe',
    difficulty: 'hard',
    anchorTruth: ko(
      '최수민의 9일간 연락은 집착이 아니라 송다은 아버지의 돈 접근 패턴을 결혼 직전 예비신랑에게 경고하려던 것이었다. 과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였고, 최수민은 송다은이 무너질까 봐 끝내 그 사실을 말하지 못한 채 악역을 자처했다. 송다은은 확인 없이 단톡방에서 최수민을 매도했고, 같은 구조가 반복됐다.',
    ),
    emotionalBait: ko(
      '손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다.',
    ),
    resolutionDilemma: ko(
      '최수민의 침묵이 매번 보호에서 비롯됐다 해도, 결과적으로 더 큰 오해와 낙인을 만들었다. 송다은의 성급한 단정은 잔인했지만 아버지의 진실을 모른 채 반응한 것이기도 하다. 두 사람 모두 확인 전에 단정한 책임이 남는다.',
    ),
    conflictSeed: ko('TE-FriendV401'),
    variableModules: ['VM-friend-v4-a', 'VM-friend-v4-b'],
    twistModule: 'TW-friend-v4-1',
    sensitivityTags: ['family_fraud', 'reputation_damage', 'emotional_manipulation'],
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
      '손절한 전 절친이 결혼 3주 전 내 예비신랑에게 9일간 반복 연락했다. 단톡방에는 "수민이가 또 내 남자한테 연락한다"는 글이 올라왔고, 친구들이 동조했다.',
    ),
    emotionalPressure: 8,
    affects: 'both',
    triggerAmplifier: ko(
      '초반에는 최수민의 9일간 연락 기록과 송다은의 단톡방 발언이 겹치며 최수민이 집착하는 사람으로 보인다. 그러나 예비신랑의 선 넘는 메시지와 송다은 아버지의 돈 접근 패턴이 드러나면서 사건의 중심은 집착이 아니라 반복되는 침묵과 낙인으로 뒤집힌다.',
    ),
  },

  /* ----- parties ----- */
  parties: {
    a: {
      id: 'a',
      name: ko('송다은'),
      age: 31,
      occupation: ko('온라인 쇼핑몰 CS 직원'),
      incomeBracket: 'mid',
      archetype: 'premature_summary',
      speechStyle: ko(
        '결론부터 말하고 그 안에 근거를 끼워 넣는다. 상대가 반박하면 이미 끝난 얘기를 다시 꺼내며 맥락을 자기 쪽으로 좁힌다.',
      ),
      pride: 7,
      fear: ko('아버지의 진짜 모습이 드러나는 것을 가장 두려워한다.'),
      riskAppetite: 5,
      digitalHabit: 'messenger_main',
      dailyRoutine: ko(
        '쇼핑몰 CS 업무를 마치면 예비신랑과 결혼 준비를 하고, 공통 친구 단톡방에 일상을 올리며 관계를 유지한다.',
      ),
      sensitivePoints: [
        ko('아버지의 돈 문제'),
        ko('과거 손절의 진짜 이유'),
        ko('확인 없이 단톡방에 올린 일'),
      ],
      verbalTells: [
        {
          type: 'premature_conclusion',
          trigger: 'cornered',
          pattern: ko("상대 말이 끝나기 전에 '그러니까 결국~'으로 결론을 먼저 내려버린다."),
        },
        {
          type: 'pattern_citation',
          trigger: 'defensive',
          pattern: ko("'예전에도 그랬잖아'라며 과거 사례를 현재 판단의 근거로 가져온다."),
        },
        {
          type: 'scope_narrowing',
          trigger: 'shame',
          pattern: ko("불리한 지점이 나오면 '그건 지금 얘기가 아니다'라며 범위를 좁힌다."),
        },
      ],
      callTerms: {
        toPartner: ko('수민아'),
        toJudge: ko('제 전 친구'),
        angry: ko('최수민!'),
      },
      pcFaceType: 'female_young',
    },
    b: {
      id: 'b',
      name: ko('최수민'),
      age: 31,
      occupation: ko('필라테스 강사'),
      incomeBracket: 'mid',
      archetype: 'affect_flattening',
      speechStyle: ko(
        '감정을 눌러 담고 사실만 나열한다. 정작 가장 아픈 이야기를 할 때 목소리가 더 평평해진다.',
      ),
      pride: 5,
      fear: ko('송다은에게 아버지의 진실을 말하면 친구가 아버지를 돈을 갚지 않은 사람으로 봐야 한다는 것을 알기에 끝까지 말하지 못한다.'),
      riskAppetite: 3,
      digitalHabit: 'minimal',
      dailyRoutine: ko(
        '필라테스 수업을 마치면 혼자 정리하고, 공통 친구들과의 연락은 점점 줄였다. 예비신랑에게 연락할 때도 카페에서 혼자 문자를 보냈다.',
      ),
      sensitivePoints: [
        ko('송다은 아버지의 차용금 미상환 피해'),
        ko('예비신랑이 먼저 선을 넘은 사실'),
        ko('또 악역이 된 현재 상황'),
      ],
      verbalTells: [
        {
          type: 'flat_delivery',
          trigger: 'emotional',
          pattern: ko('가장 아픈 이야기를 할 때 오히려 톤이 더 평평해지고 감정이 사라진다.'),
        },
        {
          type: 'self_blame_shield',
          trigger: 'cornered',
          pattern: ko("'제가 그냥 참았어야 했는데'라며 책임을 먼저 가져가 상대의 추궁을 무력화한다."),
        },
        {
          type: 'third_party_protection',
          trigger: 'avoiding',
          pattern: ko("핵심 인물의 행동을 직접 말하지 않고 '그쪽 상황이 있었다'로 에둘러 말한다."),
        },
      ],
      callTerms: {
        toPartner: ko('다은아'),
        toJudge: ko('다은이'),
        angry: ko('송다은!'),
      },
      pcFaceType: 'female_young',
    },
  },

  /* ----- timeline (6 stage 권위) ----- */
  timeline: [
    {
      stage: 0,
      whenLabel: ko('약 5년 전'),
      actor: 'a',
      action: ko(
        '송다은 아버지가 최수민에게 투자 명목으로 돈을 빌리고 일부만 갚은 뒤 차일피일 미루며 연락을 끊는다. 최수민이 피해를 입었지만 송다은에게는 말하지 못한다.',
      ),
      aPerception: ko('아버지가 친구에게 돈을 빌렸다는 사실 자체를 모른다.'),
      bPerception: ko('전부 인지. 그러나 송다은이 무너질까 봐 입을 닫는다.'),
      exposureGate: {
        minLieState: 'S3',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['ledger-2', 'e-6_transfer'],
    },
    {
      stage: 1,
      whenLabel: ko('약 4~5년 전'),
      actor: 'b',
      action: ko(
        "최수민이 송다은에게 '돈 문제는 내가 알아서 정리할게'라고만 남기고 설명을 피한다. 송다은은 이를 변심으로 받아들인다. 두 사람의 연락이 끊긴다.",
      ),
      aPerception: ko("'넌 돈만 엮이면 사람이 달라진다'고 답하며 변심으로 단정한다."),
      bPerception: ko('아버지 문제를 들춰야 해서 차마 말하지 못하고 악역을 자처한다.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['ledger-2', 'e-3_severance'],
    },
    {
      stage: 2,
      whenLabel: ko('약 2년간'),
      actor: 'system',
      action: ko(
        '두 사람은 연락을 끊고 각자의 삶을 산다. 송다은은 김태윤과 약혼한다. 최수민은 필라테스 강사로 자기 생활을 정리한다.',
      ),
      aPerception: ko('연락 두절 + 약혼 진행.'),
      bPerception: ko('연락 두절 + 자기 생활 정리.'),
      exposureGate: {
        minLieState: 'S0',
        allowedChannels: ['aftermath', 'dossier'],
      },
      sourceFacts: ['daily_routine_a', 'daily_routine_b'],
    },
    {
      stage: 3,
      whenLabel: ko('결혼 약 3주 전'),
      actor: 'a',
      action: ko(
        "송다은 아버지가 예비신랑 김태윤에게 '결혼 전에 잠깐만 도와주면 금방 돌려준다', '다은이한테는 아직 말하지 마'라는 문자로 돈 부탁을 시작한다. 같은 시기 최수민은 우연히 이 흐름을 알게 된다.",
      ),
      aPerception: ko('아버지의 돈 접근을 알지만 모르는 척한다.'),
      bPerception: ko('과거 본인이 당한 것과 같은 패턴이라는 사실을 알아본다.'),
      exposureGate: {
        minLieState: 'S2',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-5_father_msg', 'ledger-2'],
    },
    {
      stage: 4,
      whenLabel: ko('결혼 약 3주 전 ~ 9일간'),
      actor: 'b',
      action: ko(
        '최수민이 예비신랑에게 전화 6번, 문자 11건을 보낸다. "다은이 관련 이야기예요", "예전에 같은 일이 있었거든요" 같은 문구로 경고하려 하지만 송다은에게는 직접 말하지 못한다.',
      ),
      aPerception: ko('수민이 또 내 남자에게 연락한다는 단정으로 받아들인다.'),
      bPerception: ko('전부 인지. 송다은에게 직접 말할 길이 없어 우회로를 택한다.'),
      exposureGate: {
        minLieState: 'S0',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-1_contact_log', 'e-4_fiance_msg'],
    },
    {
      stage: 5,
      whenLabel: ko('단톡방 사건 ~ 현재'),
      actor: 'a',
      action: ko(
        '송다은이 공통 친구 단톡방에 "수민이가 또 내 남자한테 연락한다"는 글을 올린다. 공통 친구 김세라 등이 동조한다. 최수민은 침묵을 택한다. 사건이 재판으로 진행된다.',
      ),
      aPerception: ko('단톡방 매도 + 동조 분위기까지 인지. 직접 확인하지 않은 사실은 회피.'),
      bPerception: ko('침묵으로 또 악역이 된다는 사실을 인지하면서도 송다은이 무너질까 봐 입을 닫는다.'),
      exposureGate: {
        minLieState: 'S0',
        allowedChannels: ['evidence_present', 'dossier'],
      },
      sourceFacts: ['e-2_group_chat', 'ledger-4'],
    },
  ],

  /* ----- truthTable ----- */
  truthTable: [
    {
      id: 't-1',
      fact: ko('최수민의 연락은 집착이 아니라 송다은 아버지의 돈 접근을 경고하려는 것이었다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'both_know',
    },
    {
      id: 't-2',
      fact: ko('예비신랑이 먼저 최수민에게 선 넘는 메시지를 보냈고 최수민은 거절했다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-3',
      fact: ko('송다은 아버지는 과거 최수민에게도 돈을 빌린 뒤 일부만 갚았다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-4',
      fact: ko('과거 손절은 최수민의 변심이 아니라 송다은 아버지의 차용금 미상환 때문이었다.'),
      isTrue: true,
      weight: 10,
      quadrant: 'b_only',
    },
    {
      id: 't-5',
      fact: ko('송다은이 확인 없이 단톡방에서 최수민을 먼저 매도했다.'),
      isTrue: true,
      weight: 8,
      quadrant: 'both_know',
    },
  ],

  /* ----- disputes (5개: d-1, d-2, d-3, d-4, d-5) ----- */
  disputes: [
    /* ============================================================
     * dispute d-1 — 9일간의 연락 의도
     *
     * A는 집착 frame을 단계적으로 누그러뜨림. B는 경고 의도 진실을 단계적으로 인정.
     * 핵심 봉인 영역: 아버지의 사기 / 과거 손절 = 아버지 원인 → S5까지 직접 노출 X.
     * ============================================================ */
    {
      id: 'd-1',
      name: ko('9일간의 연락 의도'),
      truth: true,
      truthDescription: ko(
        '최수민은 예비신랑에게 9일간 연락했다. 집착이 아니라 송다은 아버지의 돈 접근 패턴을 경고하려 했지만, 직접 말할 길이 없었다.',
      ),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: false,
      v3Visibility: 'initial',
      correctResponsibility: { a: 40, b: 60 },
      mediationLink: '연락의 의도와 방식의 적절성',
      requiredEvidence: ['e-1', 'e-4'],
      judgmentStatement: ko('최수민의 연락은 집착이 아니라 경고였으나 방식의 적절성은 별도 판단이 필요하다.'),
      verdictOptions: {
        wrong: ko('최수민이 예비신랑에게 집착하며 반복적으로 연락한 것이다.'),
        partial: ko('최수민이 연락한 건 맞지만, 집착인지 다른 의도인지는 불분명하다.'),
        truth: ko('최수민은 송다은 아버지의 돈 접근 패턴을 경고하려 예비신랑에게 연락했다.'),
        defer: ko('연락의 실체를 판단할 근거가 부족하다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-3',
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
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('수민이가 결혼 3주 전 내 예비신랑에게 9일간 반복 연락했다. 집착이 아니면 무엇인가.'),
            allowedKeywords: koKeywords('9일간 연락', '예비신랑', '집착', '단정'),
            forbiddenKeywords: keywords(
              ['B 경고 의도', '꼬시려 한 게 아니라 경고', '아버지의 사기', '같은 패턴 반복'],
              ["B's warning intent", 'not seduction but warning', "father's fraud", 'same pattern again'],
              ['Bの警告意図', '誘惑ではなく警告', '父の詐欺', '同じパターン'],
              ['B的警告意图', '不是勾引而是警告', '父亲诈骗', '同样模式'],
            ),
            answerFrame: ko('A는 집착 frame을 강하게 유지. 동기·맥락 질문엔 "9일간 반복이 집착 아니면 뭐냐" 식 단정 반복.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('연락한 적은 있었다. 다만 가벼운 안부였다.'),
            allowedKeywords: koKeywords('연락', '안부', '가벼운'),
            forbiddenKeywords: keywords(
              ['B 경고 의도', '꼬시려 한 게 아니라 경고', '아버지의 사기', '같은 패턴 반복', '예비신랑이 먼저', '과거 손절 = A 아버지 원인'],
              ["B's warning intent", 'not seduction but warning', "father's fraud", 'same pattern again', 'fiance approached first', "old breakup caused by A's father"],
              ['Bの警告意図', '誘惑ではなく警告', '父の詐欺', '同じパターン', '婚約者が先に', '過去の絶交はAの父が原因'],
              ['B的警告意图', '不是勾引而是警告', '父亲诈骗', '同样模式', '准新郎先', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('B는 가벼운 안부였다는 모호한 부정으로 일관. 경고/아버지/예비신랑 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('연락 횟수만으로 단정하지 않으려 한다. 그러나 결혼 직전 시점에 대한 불안이 있었다.'),
            allowedKeywords: koKeywords('연락 횟수', '결혼 직전', '불안'),
            forbiddenKeywords: keywords(
              ['B 경고 의도', '꼬시려 한 게 아니라 경고', '아버지의 사기'],
              ["B's warning intent", 'not seduction but warning', "father's fraud"],
              ['Bの警告意図', '誘惑ではなく警告', '父の詐欺'],
              ['B的警告意图', '不是勾引而是警告', '父亲诈骗'],
            ),
            answerFrame: ko('A는 집착 단정에서 한 발 물러나 "결혼 직전 불안" frame으로 완화.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은은 "결혼 앞이라 더 흔들렸다"는 말로 단정에서 한 발 비켜선다.'),
              behaviorHint: ko('숨을 짧게 들이마시고 시선을 옆으로 흘린다.'),
            },
          },
          b: {
            admittedFact: ko('가벼운 안부는 아니었다. 다만 9일 동안 망설인 이유가 따로 있었다.'),
            allowedKeywords: koKeywords('가볍지 않은', '망설임', '이유가 있었다'),
            forbiddenKeywords: keywords(
              ['B 경고 의도', '꼬시려 한 게 아니라 경고', '아버지의 사기', '예비신랑이 먼저'],
              ["B's warning intent", 'not seduction but warning', "father's fraud", 'fiance approached first'],
              ['Bの警告意図', '誘惑ではなく警告', '父の詐欺', '婚約者が先に'],
              ['B的警告意图', '不是勾引而是警告', '父亲诈骗', '准新郎先'],
            ),
            answerFrame: ko('B는 안부 표현 부정. 망설인 이유가 있었다는 모호한 진술까지만.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "가벼운 안부는 아니었다"고 말한다.'),
              behaviorHint: ko('휴대폰 모서리를 손끝으로 천천히 문지른다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('연락 자체에 의도가 있었을 가능성은 인정한다. 그러나 단톡방에 글을 올린 건 사실 확인이 먼저였어야 했다는 점은 아직 받아들이기 어렵다.'),
            allowedKeywords: koKeywords('의도 가능성', '사실 확인', '단톡방 글'),
            forbiddenKeywords: keywords(
              ['B 경고 의도', '꼬시려 한 게 아니라 경고', '아버지의 사기'],
              ["B's warning intent", 'not seduction but warning', "father's fraud"],
              ['Bの警告意図', '誘惑ではなく警告', '父の詐欺'],
              ['B的警告意图', '不是勾引而是警告', '父亲诈骗'],
            ),
            answerFrame: ko('A는 집착 frame을 부분 양보. 단톡방 매도 책임은 자기방어 frame으로 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('송다은은 "그때는 멈추게 하는 게 먼저였다"고 말한다.'),
              behaviorHint: ko('말의 속도가 빨라지고 손이 책상을 두 번 톡톡 친다.'),
            },
          },
          b: {
            admittedFact: ko('경고할 일이 있어서 연락했다. 다만 그 일을 송다은에게 직접 말할 수 없는 사정이 있었다.'),
            allowedKeywords: koKeywords('경고할 일', '말할 수 없는 사정', '우회'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '예비신랑이 먼저'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'fiance approached first'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '婚約者が先に'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '准新郎先'],
            ),
            answerFrame: ko('B는 "경고할 일" + "말할 수 없는 사정"까지 인정. 아버지/예비신랑 직접 명사는 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('최수민은 "직접 말할 길이 없었다"고 말한다.'),
              behaviorHint: ko('짧게 끊어 말하던 리듬이 깨진다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('수민이의 연락에 다른 사정이 있었을 가능성을 받아들인다. 그래도 결혼 직전 시점은 본인을 너무 흔들었다.'),
            allowedKeywords: koKeywords('다른 사정 가능성', '결혼 직전', '흔들림'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '과거 손절 = A 아버지 원인'],
              ["father's fraud", "old breakup caused by A's father"],
              ['父の詐欺', '過去の絶交はAの父が原因'],
              ['父亲诈骗', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('A는 경고 가능성 표면 인정. 그러나 본인 처지의 한계로 frame 보정.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('송다은은 "다른 이유가 있었을 수도 있다"고 말한다.'),
              behaviorHint: ko('숨을 길게 내쉬고 시선이 아래로 떨어진다.'),
            },
          },
          b: {
            admittedFact: ko('예비신랑에게 결혼 직전 돈 얘기가 오가는 흐름이 보여 경고하려 했다. 송다은 아버지가 같은 흐름에 있다.'),
            allowedKeywords: koKeywords('예비신랑', '돈 얘기 흐름', '경고하려', '송다은 아버지'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '같은 패턴 반복', '과거 손절 = A 아버지 원인'],
              ["father's fraud", 'father extorted money', 'same pattern again', "old breakup caused by A's father"],
              ['父の詐欺', '父が金を奪った', '同じパターン', '過去の絶交はAの父が原因'],
              ['父亲诈骗', '父亲骗钱', '同样模式', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('B는 예비신랑 + 돈 얘기 흐름 + 송다은 아버지까지 직접 명시. 사기/과거 손절 원인은 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('최수민은 "송다은 아버지가 같은 흐름에 있다"고 말한다.'),
              behaviorHint: ko('손등 힘줄이 도드라질 만큼 주먹이 잠깐 조여진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('수민이의 연락이 경고였을 가능성이 더 크다. 본인이 단정해 단톡방에 올린 책임도 함께 본다.'),
            allowedKeywords: koKeywords('경고 가능성', '단톡방 책임', '단정'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 집착 frame이 잘못이었음을 인정. 자기 단정 책임 일부 수용.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('송다은의 어깨가 처음으로 내려간다.'),
              behaviorHint: ko('"내가 그렇게 단정했다"는 말이 흘러나온다.'),
            },
          },
          b: {
            admittedFact: ko('과거에 같은 일을 당했기에 결혼 직전 흐름을 막아야 한다고 봤다. 그러나 직접 말하지 못한 책임은 본인이 진다.'),
            allowedKeywords: koKeywords('과거에 같은 일', '결혼 직전 흐름', '말하지 못한 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 같은 흐름·반복 패턴 영역까지 인정. 침묵 책임 수용.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "예전에 같은 일이 있었다"고 말한다.'),
              behaviorHint: ko('손가락이 서로 맞물린 채 느리게 조여진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('수민이가 9일간 연락한 건 집착이 아니라 아버지의 돈 접근을 경고하려던 것이었다. 본인은 확인 없이 단정했다.'),
            allowedKeywords: koKeywords('아버지의 돈 접근', '경고', '확인 없이 단정'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 단정 책임 직접 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은이 마지막 단정을 내려놓는다.'),
              behaviorHint: ko('손이 책상 위에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko(
              '송다은 아버지가 결혼 앞두고 예비신랑에게 같은 수법을 또 쓰는 걸 보면서도, 그 말을 자기 입으로 꺼내면 친구 가족을 무너뜨리는 사람이 될까 봐 차라리 자신이 나쁜 사람으로 남으려 했다.',
            ),
            allowedKeywords: koKeywords('같은 수법', '결혼 자금', '경고 의도', '악역 자처'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 경고 의도 + 침묵 동기 모두 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 처음으로 모든 말을 끝까지 잇는다.'),
              behaviorHint: ko('끝까지 평정을 지키려다 마지막 문장에서 숨이 한 번 꺾인다.'),
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
          surfaceClaim: ko('집착 단정 / B의 가벼운 안부 부정'),
          hiddenTruth: ko('경고 의도'),
          validActions: ['fact_pursuit', 'motive_search'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('결혼 직전 불안 / 가볍지 않은 망설임'),
          hiddenTruth: ko('경고 의도'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-1'],
          requiredWitness: [],
          successUnlocks: ['e-4'],
        },
        S2: {
          surfaceClaim: ko('의도 가능성 / 말할 수 없는 사정'),
          hiddenTruth: ko('경고 의도 + 우회 경로'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-1', 'e-4'],
          requiredWitness: [],
          successUnlocks: ['dc-1'],
        },
        S3: {
          surfaceClaim: ko('예비신랑 + 돈 얘기 흐름 + 송다은 아버지'),
          hiddenTruth: ko('아버지 패턴 인식'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-4'],
          requiredWitness: [],
          successUnlocks: ['dc-2', 'd-2'],
        },
        S4: {
          surfaceClaim: ko('같은 흐름 / 침묵 책임'),
          hiddenTruth: ko('과거 손절 원인'),
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
     * dispute d-2 — 예비신랑의 선 넘는 접근
     *
     * A는 예비신랑이 선 넘는 메시지를 먼저 보냈다는 사실 자체를 모르고 시작.
     * B는 예비신랑 책임 frame을 처음엔 회피 (송다은 보호) → 단계적 노출.
     * 진실: 예비신랑이 먼저 → 최수민 거절. 이후 연락은 경고의 연장선.
     * ============================================================ */
    {
      id: 'd-2',
      name: ko('예비신랑의 선 넘는 접근'),
      truth: true,
      truthDescription: ko(
        '예비신랑이 먼저 최수민에게 선 넘는 메시지를 보냈고, 최수민은 거절했다. 최수민이 이후 연락한 건 이 상황의 연장선이었다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: false,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 20, b: 80 },
      mediationLink: '예비신랑의 접근과 최수민의 대응',
      requiredEvidence: ['e-4'],
      judgmentStatement: ko('예비신랑이 먼저 선을 넘었고 최수민은 거절한 쪽이었다.'),
      unlockCondition: {
        requireDispute: { id: 'd-1', minState: 'S3' },
        runtimeRule: ko('d-1 S3 이상 도달 시 (연락 의도 균열) 해금'),
        authoredRule: ko('d-1에서 연락 의도의 균열이 드러나면 예비신랑의 선 넘는 접근 영역이 부상'),
      },
      verdictOptions: {
        wrong: ko('최수민이 먼저 예비신랑에게 접근했고, 예비신랑은 피해자다.'),
        partial: ko('양쪽 다 연락이 있었지만, 누가 선을 넘었는지는 애매하다.'),
        truth: ko('예비신랑이 먼저 선 넘는 메시지를 보냈고, 최수민은 거절했다.'),
        defer: ko('선후 관계를 가리기 어렵다. 유보한다.'),
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
            admittedFact: ko('예비신랑이 수민이에게 먼저 연락했을 리 없다. 수민이가 먼저 접근한 것이다.'),
            allowedKeywords: koKeywords('수민이가 먼저', '예비신랑 피해자', '단정'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '예비신랑이 찝쩍', '예비신랑이 접근', '선 넘는 메시지', '최수민의 거절'],
              ['fiance approached first', 'fiance hit on her', 'fiance crossed the line', 'inappropriate messages', 'Choi Sumin refused'],
              ['婚約者が先に', '婚約者が言い寄った', '婚約者が近づいた', '一線を越えたメッセージ', 'チェ・スミンの拒絶'],
              ['准新郎先', '准新郎勾搭', '准新郎接近', '越界消息', '崔秀敏拒绝'],
            ),
            answerFrame: ko('A는 수민이 먼저 접근 frame strict. 예비신랑 선 넘기 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('예비신랑과는 별다른 일이 없었다.'),
            allowedKeywords: koKeywords('별다른 일 없음', '연락만'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '예비신랑이 찝쩍', '예비신랑이 접근', '선 넘는 메시지', '최수민의 거절', '친구 남자친구니까 이러지 마'],
              ['fiance approached first', 'fiance hit on her', 'fiance crossed the line', 'inappropriate messages', 'Choi Sumin refused', "you're my friend's fiance, stop this"],
              ['婚約者が先に', '婚約者が言い寄った', '婚約者が近づいた', '一線を越えたメッセージ', 'チェ・スミンの拒絶', '友達の彼氏だからやめて'],
              ['准新郎先', '准新郎勾搭', '准新郎接近', '越界消息', '崔秀敏拒绝', '朋友的男朋友别这样'],
            ),
            answerFrame: ko('B는 별다른 일 없었다는 부정. 송다은이 무너질까 봐 예비신랑 책임 회피.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('수민이가 먼저 접근했다는 결론은 유지한다. 다만 예비신랑이 그 연락에 어떻게 반응했는지까지 확인하지는 않았다.'),
            allowedKeywords: koKeywords('확인하지 않음', '예비신랑 반응'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '선 넘는 메시지', '최수민의 거절'],
              ['fiance approached first', 'inappropriate messages', 'Choi Sumin refused'],
              ['婚約者が先に', '一線を越えたメッセージ', 'チェ・スミンの拒絶'],
              ['准新郎先', '越界消息', '崔秀敏拒绝'],
            ),
            answerFrame: ko('A는 단정 유지하되 예비신랑 반응 확인 누락만 인정.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은은 "그 사람이 어떻게 답했는지는 따로 묻지 않았다"고 말한다.'),
              behaviorHint: ko('시선이 짧게 옆을 향한다.'),
            },
          },
          b: {
            admittedFact: ko('예비신랑과 따로 온 연락이 있긴 했다. 다만 사적인 일은 아니었다.'),
            allowedKeywords: koKeywords('따로 온 연락', '사적인 일 아님'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '선 넘는 메시지', '최수민의 거절'],
              ['fiance approached first', 'inappropriate messages', 'Choi Sumin refused'],
              ['婚約者が先に', '一線を越えたメッセージ', 'チェ・スミンの拒絶'],
              ['准新郎先', '越界消息', '崔秀敏拒绝'],
            ),
            answerFrame: ko('B는 따로 온 연락 인정. 선 넘기·거절 키워드 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "따로 온 연락이 있긴 했다"고 말한다.'),
              behaviorHint: ko('엄지로 손톱 끝을 천천히 누른다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('예비신랑이 수민이에게 메시지를 보낸 적이 있다는 사실 자체는 받아들인다. 그러나 그게 선을 넘었다는 평가는 아직 받아들이기 어렵다.'),
            allowedKeywords: koKeywords('메시지 보낸 사실', '선을 넘었는지', '평가'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '선 넘는 메시지', '최수민의 거절', '친구 남자친구니까 이러지 마'],
              ['fiance approached first', 'inappropriate messages', 'Choi Sumin refused', "you're my friend's fiance, stop this"],
              ['婚約者が先に', '一線を越えたメッセージ', 'チェ・スミンの拒絶', '友達の彼氏だからやめて'],
              ['准新郎先', '越界消息', '崔秀敏拒绝', '朋友的男朋友别这样'],
            ),
            answerFrame: ko('A는 메시지 사실 인정. 선 넘기 평가는 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('송다은은 "메시지가 오갔다는 건 인정하지만"이라고 말한다.'),
              behaviorHint: ko('단정의 톤이 처음으로 흔들린다.'),
            },
          },
          b: {
            admittedFact: ko('예비신랑이 사적인 말을 섞은 건 맞다. 본인은 그 자리를 만들려 한 적이 없다.'),
            allowedKeywords: koKeywords('사적인 말 섞임', '자리 만든 적 없음'),
            forbiddenKeywords: keywords(
              ['예비신랑이 먼저', '선 넘는 메시지', '최수민의 거절', '친구 남자친구니까 이러지 마'],
              ['fiance approached first', 'inappropriate messages', 'Choi Sumin refused', "you're my friend's fiance, stop this"],
              ['婚約者が先に', '一線を越えたメッセージ', 'チェ・スミンの拒絶', '友達の彼氏だからやめて'],
              ['准新郎先', '越界消息', '崔秀敏拒绝', '朋友的男朋友别这样'],
            ),
            answerFrame: ko('B는 사적 말 섞임 인정. 선 넘기·거절 직접 언급 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('최수민은 "제가 그 자리를 만들지는 않았다"고 말한다.'),
              behaviorHint: ko('말을 끊어 삼킨 뒤 입술을 다물고, 시선을 옆으로 비킨다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('예비신랑이 선을 넘는 메시지를 먼저 보냈을 가능성을 본다. 다만 본인은 그 사실을 단톡방 매도 시점에 몰랐다.'),
            allowedKeywords: koKeywords('먼저 보냈을 가능성', '단톡방 시점 몰랐다'),
            forbiddenKeywords: keywords(
              ['최수민의 거절', '친구 남자친구니까 이러지 마'],
              ['Choi Sumin refused', "you're my friend's fiance, stop this"],
              ['チェ・スミンの拒絶', '友達の彼氏だからやめて'],
              ['崔秀敏拒绝', '朋友的男朋友别这样'],
            ),
            answerFrame: ko('A는 선후관계 가능성 인정. 본인 단정 시점에는 몰랐다는 점으로 frame 보정.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('송다은은 "그 사람이 먼저 그랬다면 제가 모를 일이었다"고 말한다.'),
              behaviorHint: ko('숨을 짧게 들이마신다.'),
            },
          },
          b: {
            admittedFact: ko('예비신랑이 커피를 보자거나 이상형 운운하는 메시지를 먼저 보냈다. 본인은 거절했다.'),
            allowedKeywords: koKeywords('커피 보자', '이상형 운운', '예비신랑이 먼저', '거절'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 예비신랑이 먼저 선 넘는 메시지를 보냈다는 사실 + 거절을 직접 명시.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('최수민은 "예비신랑이 먼저 커피 보자 했다"고 담담하게 말한다.'),
              behaviorHint: ko('목소리는 낮게 유지되지만 손등 힘줄이 도드라질 만큼 주먹이 잠깐 조여진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('예비신랑이 먼저 선을 넘은 점은 사실로 받아들인다. 그 사실을 늦게 안 본인의 충격도 사실이다.'),
            allowedKeywords: koKeywords('예비신랑이 먼저', '늦게 안 충격'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 선후관계 진실 인정. 본인의 늦은 인지에 대한 충격을 함께 진술.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('송다은의 시선이 흔들린다.'),
              behaviorHint: ko('"이게 사실이라면 내가 더 무너진다"는 말이 흘러나온다.'),
            },
          },
          b: {
            admittedFact: ko('예비신랑의 농담 뒤에 송다은 아버지의 돈 요구가 붙는 흐름이 보여 더는 모른 척할 수 없었다.'),
            allowedKeywords: koKeywords('농담 뒤에 돈 요구', '같은 흐름', '모른 척 못함'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 예비신랑 농담 + 돈 요구 흐름 통합 진술. 우회 경로 확립 동기까지 노출.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "더는 모른 척할 수 없었다"고 말한다.'),
              behaviorHint: ko('입가가 굳고, 말끝을 내리기 전 목울대가 한 번 움직인다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('예비신랑이 먼저 최수민에게 선 넘는 메시지를 보냈고, 최수민은 거절했다. 본인은 그 사실을 모른 채 단정했다.'),
            allowedKeywords: koKeywords('예비신랑이 먼저', '선 넘는 메시지', '최수민의 거절', '모른 채 단정'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 단정 시점 무지 책임 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은이 사실 관계를 인정한다.'),
              behaviorHint: ko('손이 책상 끝에서 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko(
              '예비신랑이 먼저 선 넘는 메시지를 보냈고 본인은 친구 남자친구니까 이러지 말라고 거절했다. 이후 연락은 송다은 아버지의 돈 접근을 경고하기 위한 연장선이었다.',
            ),
            allowedKeywords: koKeywords('예비신랑이 먼저', '선 넘는 메시지', '친구 남자친구', '경고의 연장선'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 거절 문구 + 이후 연락 의미까지 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 거절 문구를 정확히 옮긴다.'),
              behaviorHint: ko('시선이 처음으로 송다은을 정면으로 향한다.'),
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
          surfaceClaim: ko('수민이가 먼저 접근 단정 / 별다른 일 없음'),
          hiddenTruth: ko('예비신랑이 먼저 선 넘기'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('예비신랑 반응 확인 누락 / 따로 온 연락 있음'),
          hiddenTruth: ko('예비신랑이 먼저 선 넘기'),
          validActions: ['evidence_query', 'motive_search'],
          requiredEvidence: ['e-4'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('메시지 사실 / 사적인 말 섞임'),
          hiddenTruth: ko('선 넘기 + 거절'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-2'],
          successUnlocks: ['dc-2'],
        },
        S3: {
          surfaceClaim: ko('먼저 보냈을 가능성 / 커피 보자 + 이상형'),
          hiddenTruth: ko('아버지 패턴 연결'),
          validActions: ['evidence_query', 'motive_search'],
          requiredEvidence: ['e-4'],
          requiredWitness: ['w-2'],
          successUnlocks: ['d-3'],
        },
        S4: {
          surfaceClaim: ko('예비신랑이 먼저 + 농담 뒤 돈 요구 흐름'),
          hiddenTruth: ko('우회 경로 동기'),
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
     * dispute d-3 — 아버지의 돈 접근 패턴 (hidden)
     *
     * A는 아버지의 돈 접근 자체를 부정. 그러나 일찍부터 알고 있었으면서 모른 척한 영역.
     * B는 같은 흐름을 본인이 과거에 겪었다는 사실 회피 → 단계적 인정.
     * d-3은 monetary dispute. d-2 S3 unlock 후 부상.
     * ============================================================ */
    {
      id: 'd-3',
      name: ko('아버지의 돈 접근 패턴'),
      truth: true,
      truthDescription: ko(
        '송다은 아버지가 예비신랑에게 돈 얘기를 꺼내고 있었고, 최수민은 과거에 같은 패턴을 당한 적이 있어 예비신랑에게 경고하려 했다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 65, b: 35 },
      mediationLink: '송다은 아버지의 돈 접근 패턴',
      requiredEvidence: ['e-5'],
      judgmentStatement: ko('송다은 아버지의 돈 접근 패턴은 과거와 현재가 같았다.'),
      unlockCondition: {
        requireDispute: { id: 'd-2', minState: 'S3' },
        runtimeRule: ko('d-2 S3 이상 도달 시 (예비신랑 접근 확인) 해금'),
        authoredRule: ko('d-2에서 예비신랑의 접근이 확인된 뒤 최수민이 경고 이유를 밝히면 송다은 아버지 패턴 부상'),
      },
      verdictOptions: {
        wrong: ko('송다은 아버지는 예비신랑에게 인사차 안부를 전했을 뿐이다.'),
        partial: ko('돈 이야기가 오간 것 같지만 구체적 내용은 확인이 안 된다.'),
        truth: ko('송다은 아버지가 예비신랑에게 돈을 빌려달라고 접근했고, 최수민은 과거 같은 패턴을 겪은 적이 있다.'),
        defer: ko('대화의 실체를 확인할 수 없다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-6',
          lieIntensity: 'L2',
          lieMotive: 'third_party_protection',
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
            admittedFact: ko('아버지가 예비신랑에게 돈 얘기를 꺼낸 적은 없다. 가족 이야기는 이 일과 상관없다.'),
            allowedKeywords: koKeywords('상관없음', '가족 이야기 무관'),
            forbiddenKeywords: keywords(
              ['아버지의 돈 접근', '같은 패턴 반복', '돈 부탁', '사위 될 사람'],
              ["father's money approach", 'same pattern again', 'asking for money', 'son-in-law-to-be'],
              ['父の金銭接近', '同じパターン', '金の頼み', '婿になる人'],
              ['父亲的金钱接近', '同样模式', '借钱', '准女婿'],
            ),
            answerFrame: ko('A는 아버지 돈 접근 자체 부정 strict. 가족 이야기는 사건과 무관 frame.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('아버지 쪽 이야기는 본인이 단정해 말할 영역이 아니다.'),
            allowedKeywords: koKeywords('단정 불가', '본인 영역 아님'),
            forbiddenKeywords: keywords(
              ['아버지의 돈 접근', '같은 패턴 반복', '돈 부탁', '과거 손절 = A 아버지 원인'],
              ["father's money approach", 'same pattern again', 'asking for money', "old breakup caused by A's father"],
              ['父の金銭接近', '同じパターン', '金の頼み', '過去の絶交はAの父が原因'],
              ['父亲的金钱接近', '同样模式', '借钱', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('B는 아버지 영역 자체 회피. 단정 불가로 말끝을 흐림.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('집안 어른의 부탁이 마음에 걸린 적은 있다. 다만 사건의 핵심이라는 뜻은 아니다.'),
            allowedKeywords: koKeywords('집안 어른 부탁', '마음에 걸림'),
            forbiddenKeywords: keywords(
              ['아버지의 돈 접근', '같은 패턴 반복', '돈 부탁'],
              ["father's money approach", 'same pattern again', 'asking for money'],
              ['父の金銭接近', '同じパターン', '金の頼み'],
              ['父亲的金钱接近', '同样模式', '借钱'],
            ),
            answerFrame: ko('A는 집안 어른 부탁 영역 부분 인정. 사건과 무관 frame은 유지.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('송다은은 "가족이라 완전히 잘라 말하기 어려웠다"고 말한다.'),
              behaviorHint: ko('말을 재빨리 덧붙이던 습관이 끊긴다.'),
            },
          },
          b: {
            admittedFact: ko('과거와 닮은 흐름이 보였다는 점은 인정한다. 다만 단정하지는 않는다.'),
            allowedKeywords: koKeywords('과거와 닮은 흐름', '단정 안 함'),
            forbiddenKeywords: keywords(
              ['아버지의 돈 접근', '같은 패턴 반복', '돈 부탁', '아버지의 사기'],
              ["father's money approach", 'same pattern again', 'asking for money', "father's fraud"],
              ['父の金銭接近', '同じパターン', '金の頼み', '父の詐欺'],
              ['父亲的金钱接近', '同样模式', '借钱', '父亲诈骗'],
            ),
            answerFrame: ko('B는 닮은 흐름 영역 부분 인정. 패턴 단정 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('최수민은 "과거와 닮은 순서를 봤다"고 말한다.'),
              behaviorHint: ko('손바닥을 무릎에 붙인 채 손가락만 작게 접었다 편다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('아버지가 예비신랑에게 투자 얘기를 꺼낸 것이 민감할 수 있다는 점은 안다. 다만 본인이 설계한 흐름은 아니다.'),
            allowedKeywords: koKeywords('투자 얘기 민감', '본인 설계 아님'),
            forbiddenKeywords: keywords(
              ['아버지의 돈 접근', '같은 패턴 반복', '돈 부탁'],
              ["father's money approach", 'same pattern again', 'asking for money'],
              ['父の金銭接近', '同じパターン', '金の頼み'],
              ['父亲的金钱接近', '同样模式', '借钱'],
            ),
            answerFrame: ko('A는 투자 얘기 영역 인정. 본인 책임 분리 frame 유지.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은은 "아버지가 부탁한 건 맞지만 제가 설계한 건 아니다"라고 말한다.'),
              behaviorHint: ko('턱을 들지만 시선은 옆으로 흐른다.'),
            },
          },
          b: {
            admittedFact: ko('결혼 직전 돈 얘기가 반복되는 게 걱정돼 예비신랑에게 확인하려 했다.'),
            allowedKeywords: koKeywords('결혼 직전 돈 얘기', '걱정', '확인하려'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '같은 패턴 반복', '과거 손절 = A 아버지 원인'],
              ["father's fraud", 'same pattern again', "old breakup caused by A's father"],
              ['父の詐欺', '同じパターン', '過去の絶交はAの父が原因'],
              ['父亲诈骗', '同样模式', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('B는 돈 얘기 반복 + 확인 동기 인정. 사기/패턴 반복은 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "예비신랑에게 확인하려 했다"고 밝힌다.'),
              behaviorHint: ko('말의 속도가 늦어진다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('아버지의 부탁이 단순 인사가 아니라 돈 접근이었다는 점을 받아들인다. 결혼 자금 명목으로 꺼낼 흐름을 알고 있었다.'),
            allowedKeywords: koKeywords('돈 접근', '결혼 자금 명목', '흐름 알고 있었음'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '같은 패턴 반복', '과거 손절 = A 아버지 원인'],
              ["father's fraud", 'same pattern again', "old breakup caused by A's father"],
              ['父の詐欺', '同じパターン', '過去の絶交はAの父が原因'],
              ['父亲诈骗', '同样模式', '过去绝交是A父亲造成的'],
            ),
            answerFrame: ko('A는 돈 접근 사실 인정. 사기/과거 패턴은 아직 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('송다은은 "결혼 자금 명목으로 돈을 꺼낼 흐름은 알고 있었다"고 말한다.'),
              behaviorHint: ko('손목이 떨리고, 숨을 들이쉴 때 어깨가 크게 들썩인다.'),
            },
          },
          b: {
            admittedFact: ko('과거에 본인이 같은 흐름을 겪었기에 이번 패턴을 알아봤다. 그래서 예비신랑에게 경고하려 했다.'),
            allowedKeywords: koKeywords('과거에 같은 흐름', '패턴 인식', '경고하려'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '투자 명목 사기'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'investment fraud'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '投資名目の詐欺'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '投资名义诈骗'],
            ),
            answerFrame: ko('B는 같은 흐름·경고 의도 인정. 과거 손절 원인·사기는 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('최수민은 "예전부터 같은 말을 들어 봤다"며 숨을 삼킨다.'),
              behaviorHint: ko('어깨가 살짝 움츠러들고, 문장 중간에서 목소리가 갈라진다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('아버지의 돈 접근 흐름을 알면서도 멈추게 할 용기가 없었다. 수민이가 알면 결혼이 끝날까 두려웠다.'),
            allowedKeywords: koKeywords('멈출 용기 없음', '수민이 알면 끝날 두려움'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 인지·방관 동기 진술. 두려움 영역 노출.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('송다은은 "수민이가 알면 끝날까 두려웠다"고 말한다.'),
              behaviorHint: ko('양손을 꽉 맞잡은 채 무릎 위에서 한 번 크게 비틀어 쥔다.'),
            },
          },
          b: {
            admittedFact: ko('송다은 아버지에게 돈을 잃었던 과거 경험이 있어 같은 수법을 알아봤다. 결혼 자금이 표적이 될 수 있다고 봤다.'),
            allowedKeywords: koKeywords('돈을 잃은 과거', '같은 수법', '결혼 자금 표적'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 과거 피해 + 같은 수법 인식 + 결혼 자금 표적 가능성 모두 노출.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "결혼 자금이 표적이 될 수 있다고 판단했다"고 말한다.'),
              behaviorHint: ko('고개가 천천히 내려가고, 양손이 무릎 위에서 힘없이 풀린다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('아버지가 예비신랑에게 결혼 자금 명목으로 돈을 꺼낼 흐름을 본인이 알고 있었다. 멈추지 못한 책임이 있다.'),
            allowedKeywords: koKeywords('돈 접근', '알고 있었음', '멈추지 못한 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 인지·방관 책임 직접 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은이 마지막 단어를 받아낸다.'),
              behaviorHint: ko('손이 무릎 위로 내려간다.'),
            },
          },
          b: {
            admittedFact: ko(
              '송다은 아버지가 예비신랑에게 결혼 자금 명목으로 돈을 빌려달라고 접근했고, 본인은 과거 같은 흐름을 겪었기에 패턴을 알아봤다. 그래서 예비신랑에게 경고하려 했다.',
            ),
            allowedKeywords: koKeywords('아버지의 돈 접근', '같은 패턴 반복', '경고 의도'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 아버지 돈 접근 + 패턴 + 경고 의도 모두 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 패턴을 정확히 옮긴다.'),
              behaviorHint: ko('시선이 한 점에 박힌다.'),
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
          surfaceClaim: ko('아버지 돈 접근 부정 / 단정 불가'),
          hiddenTruth: ko('돈 접근 사실 + 같은 패턴'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('집안 어른 부탁 / 닮은 흐름'),
          hiddenTruth: ko('돈 접근 + 패턴 인식'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('투자 얘기 민감 / 확인하려 함'),
          hiddenTruth: ko('돈 부탁 + 같은 패턴'),
          validActions: ['motive_search', 'empathy_approach'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: ['dc-3'],
        },
        S3: {
          surfaceClaim: ko('돈 접근 사실 + 결혼 자금 명목 / 과거에 같은 흐름'),
          hiddenTruth: ko('과거 사기 + 손절 원인'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-5'],
          requiredWitness: [],
          successUnlocks: ['d-4'],
        },
        S4: {
          surfaceClaim: ko('인지·방관 / 같은 수법 + 결혼 자금 표적'),
          hiddenTruth: ko('과거 손절 원인'),
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
     * dispute d-4 — 과거 손절과 아버지의 사기 (hidden, legitimacyIssue)
     *
     * A는 과거 손절을 단순 변심/다툼 frame으로 단정 → 본인이 알고 있었음 인정으로 무너짐.
     * B는 과거 손절의 진짜 원인(아버지 차용금 미상환)을 송다은이 무너질까 봐 끝까지 회피.
     * d-4는 monetary dispute + legitimacyIssue. d-3 S3 unlock 후 부상.
     * ============================================================ */
    {
      id: 'd-4',
      name: ko('과거 손절과 아버지의 사기'),
      truth: true,
      truthDescription: ko(
        '과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였다. 최수민은 송다은에게 말하면 아버지 문제를 들춰야 해서 차마 말하지 못하고 악역을 자처했다.',
      ),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: true,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 30, b: 70 },
      mediationLink: '과거 사기와 침묵의 대가',
      requiredEvidence: ['e-6'],
      judgmentStatement: ko('과거 손절의 원인은 송다은 아버지의 차용금 미상환과 최수민의 침묵이었다.'),
      unlockCondition: {
        requireDispute: { id: 'd-3', minState: 'S3' },
        runtimeRule: ko('d-3 S3 이상 도달 시 (현재 패턴 확정) 해금'),
        authoredRule: ko('송다은 아버지의 현재 패턴이 확인된 뒤 과거에도 같은 일이 있었다는 사실 부상'),
      },
      verdictOptions: {
        wrong: ko('과거 손절은 최수민이 변심해서 일방적으로 끊은 것이다.'),
        partial: ko('손절에 돈 문제가 얽혀 있었지만, 정확한 경위는 알 수 없다.'),
        truth: ko('송다은 아버지가 최수민에게 돈을 빌린 뒤 일부만 갚고 연락을 끊은 일이 원인이었다. 최수민은 차마 말 못하고 악역을 자처했다.'),
        defer: ko('손절의 진짜 원인을 가리기 어렵다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-3',
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
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('과거 손절은 성격 차이로 멀어진 일이다. 다른 이유는 없다.'),
            allowedKeywords: koKeywords('성격 차이', '다른 이유 없음'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '투자 명목 사기', '미상환'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'investment fraud', 'unpaid debt'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '投資名目の詐欺', '未返済'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '投资名义诈骗', '未偿还'],
            ),
            answerFrame: ko('A는 성격 차이 frame strict. 사기/아버지 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('과거 손절은 사적인 감정 때문이었다.'),
            allowedKeywords: koKeywords('사적인 감정', '말하기 어려운'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '투자 명목 사기', '미상환', 'B 차마 못 말함'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'investment fraud', 'unpaid debt', 'B could not say it'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '投資名目の詐欺', '未返済', 'Bは言えなかった'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '投资名义诈骗', '未偿还', 'B没能说出口'],
            ),
            answerFrame: ko('B는 사적 감정 frame strict. 사기/침묵 동기 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('손절 무렵 집안 사정으로 멀어진 부분이 있었다. 다만 그게 손절의 핵심은 아니다.'),
            allowedKeywords: koKeywords('집안 사정 멀어짐', '핵심 아님'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '미상환'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'unpaid debt'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '未返済'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '未偿还'],
            ),
            answerFrame: ko('A는 집안 사정 영역 부분 인정. 사기/원인은 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은은 "집안 일로 멀어진 부분은 있었다"고 말한다.'),
              behaviorHint: ko('펼친 손가락이 굳고, 문장 끝에서 숨을 짧게 삼킨다.'),
            },
          },
          b: {
            admittedFact: ko('서운해서 숨은 게 아니라, 말하면 더 커질 얘기가 있었다.'),
            allowedKeywords: koKeywords('말하면 더 커질 얘기', '서운함 아님'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', '미상환'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'unpaid debt'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', '未返済'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', '未偿还'],
            ),
            answerFrame: ko('B는 말하면 더 커질 얘기 영역까지만 인정. 사기/아버지 직접 명시 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "말하면 더 커질 얘기가 있었다"고 눌러 말한다.'),
              behaviorHint: ko('입술 안쪽을 깨문 뒤, 종이 모서리를 손끝으로 문지른다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('아버지 일로 친구와 멀어진 부분은 있었다. 그러나 본인은 자세한 내막을 모른다.'),
            allowedKeywords: koKeywords('아버지 일로 멀어짐', '내막 모름'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '미상환'],
              ["father's fraud", 'father extorted money', 'unpaid debt'],
              ['父の詐欺', '父が金を奪った', '未返済'],
              ['父亲诈骗', '父亲骗钱', '未偿还'],
            ),
            answerFrame: ko('A는 아버지 영역 부분 인정. 본인 무지 frame 유지.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('송다은은 "아버지 일이 끼어 있었다는 건 안다"고 말한다.'),
              behaviorHint: ko('손목이 떨리고, 시선이 영수증 묶음에 머문다.'),
            },
          },
          b: {
            admittedFact: ko('과거에 송다은 아버지와 돈 거래가 있었다. 본인은 갚지 못한 돈이 있었다.'),
            allowedKeywords: koKeywords('돈 거래 있음', '갚지 못한 돈'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '아버지 돈 갈취', '과거 손절 = A 아버지 원인', 'B 차마 못 말함'],
              ["father's fraud", 'father extorted money', "old breakup caused by A's father", 'B could not say it'],
              ['父の詐欺', '父が金を奪った', '過去の絶交はAの父が原因', 'Bは言えなかった'],
              ['父亲诈骗', '父亲骗钱', '过去绝交是A父亲造成的', 'B没能说出口'],
            ),
            answerFrame: ko('B는 돈 거래 사실 인정. 그러나 갚지 않은 쪽은 회피 (사기 vs 본인 책임 흐리기).'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('최수민은 "그때 갚지 못한 돈이 있었다"고 말한다.'),
              behaviorHint: ko('팔꿈치가 몸쪽으로 붙고, 대답 전 긴 침묵이 내려앉는다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('아버지가 친구에게 돈을 빌린 뒤 갚지 못한 일이 있었다는 점은 알고 있다. 그 일을 손절의 핵심으로 보지 않으려 했다.'),
            allowedKeywords: koKeywords('돈을 빌리고 갚지 못함', '핵심 회피'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '투자 명목 사기'],
              ["father's fraud", 'investment fraud'],
              ['父の詐欺', '投資名目の詐欺'],
              ['父亲诈骗', '投资名义诈骗'],
            ),
            answerFrame: ko('A는 아버지의 미상환 사실 인정. 사기 표현은 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('송다은은 "아버지가 갚지 못한 돈이 있었다는 건 알고 있다"고 말한다.'),
              behaviorHint: ko('양손을 꽉 맞잡은 채 무릎 위에서 한 번 크게 비틀어 쥔다.'),
            },
          },
          b: {
            admittedFact: ko('과거 손절은 단순한 친구 다툼이 아니었다. 송다은 아버지와의 돈 문제가 끼어 있었다.'),
            allowedKeywords: koKeywords('단순 다툼 아님', '돈 문제 끼임'),
            forbiddenKeywords: keywords(
              ['아버지의 사기', '투자 명목 사기', 'B 차마 못 말함'],
              ["father's fraud", 'investment fraud', 'B could not say it'],
              ['父の詐欺', '投資名目の詐欺', 'Bは言えなかった'],
              ['父亲诈骗', '投资名义诈骗', 'B没能说出口'],
            ),
            answerFrame: ko('B는 단순 다툼 부정 + 돈 문제 인정. 사기/침묵 동기는 아직 회피.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "다은이가 무너질 것 같아 참았다"고 말한다.'),
              behaviorHint: ko('가장 아픈 대목에서 오히려 표정 변화가 사라지고 시선이 한 점에 박힌다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('아버지가 친구 돈을 받아 일부만 갚고 연락을 끊은 일이 있었다는 사실을 알았다. 그걸 인정하면 본인 결혼까지 무너질까 봐 침묵했다.'),
            allowedKeywords: koKeywords('일부만 갚고 연락 끊음', '본인 침묵', '결혼 무너질 두려움'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 아버지의 미상환 인지 + 본인 침묵 동기 인정.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('송다은은 "끝까지 피해자인 척했다"고 말한다.'),
              behaviorHint: ko('눈가가 붉어지고, 손등을 누르는 손끝이 미세하게 떨린다.'),
            },
          },
          b: {
            admittedFact: ko('송다은 아버지가 투자라며 받아간 돈을 돌려받지 못한 피해자였다. 그래서 송다은 곁에서 조용히 사라졌다.'),
            allowedKeywords: koKeywords('투자라며 받아간 돈', '돌려받지 못함', '조용히 사라짐'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 사기 피해 + 침묵 선택 인정. 결혼 영역은 별개로.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "조용히 사라지는 쪽을 택했다"고 고백한다.'),
              behaviorHint: ko('등이 의자에 붙은 채 굳고, 끝 문장은 거의 속삭임처럼 나온다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('아버지가 친구 돈을 사기로 가져갔다는 사실까지 알고 있었다. 그걸 인정하면 본인 결혼까지 무너질까 봐 끝까지 피해자인 척했다. 친구의 손절을 변심으로 둔 책임이 있다.'),
            allowedKeywords: koKeywords('아버지의 사기', '결혼 무너질 두려움', '피해자인 척', '변심으로 둔 책임'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 사기 인지 + 본인 침묵 + 손절 책임 모두 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은이 마지막으로 "그걸 인정하면 결혼이 무너질까 봐"라고 말한다.'),
              behaviorHint: ko('손이 무릎 위로 내려간다.'),
            },
          },
          b: {
            admittedFact: ko(
              '과거 손절의 진짜 원인은 송다은 아버지가 본인에게 투자 명목으로 돈을 받아간 사기였다. 송다은에게 말하면 친구가 아버지를 사기꾼으로 봐야 한다는 사실을 알기에, 차마 말하지 못하고 악역을 자처했다.',
            ),
            allowedKeywords: koKeywords('아버지의 사기', '투자 명목 사기', '미상환', 'B 차마 못 말함', '악역 자처'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 사기 + 침묵 동기 + 악역 자처 모두 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 거의 평정한 목소리로 진실을 옮긴다.'),
              behaviorHint: ko('표정 변화가 사라지고 시선이 한 점에 박힌다.'),
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
          surfaceClaim: ko('성격 차이 / 사적인 감정'),
          hiddenTruth: ko('아버지 사기 + 침묵'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('집안 사정 멀어짐 / 말하면 더 커질 얘기'),
          hiddenTruth: ko('아버지 사기 + 침묵'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-3'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('아버지 일 영역 / 돈 거래 있었음'),
          hiddenTruth: ko('미상환 + 침묵 동기'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-3', 'e-6'],
          requiredWitness: ['w-3'],
          successUnlocks: ['dc-4'],
        },
        S3: {
          surfaceClaim: ko('미상환 인정 / 단순 다툼 아님 + 돈 문제 끼임'),
          hiddenTruth: ko('사기 사실 + 침묵 동기'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-6'],
          requiredWitness: ['w-3'],
          successUnlocks: ['d-5'],
        },
        S4: {
          surfaceClaim: ko('일부만 갚고 연락 끊음 + 본인 침묵 / 사기 피해 + 조용히 사라짐'),
          hiddenTruth: ko('완전 자백'),
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
     * dispute d-5 — 단톡방 매도와 명예훼손 (hidden)
     *
     * A는 단톡방 매도 행위를 사실 알림 frame으로 단정 → 단계적 인정 (collapseViaTrust=true).
     * B는 침묵이 매도를 인정하는 결과가 됐다는 사실 회피 → 반복 침묵 책임 진술.
     * d-5는 두 dispute (d-3 + d-4) S3 unlock 후 마지막에 부상하는 종합 dispute.
     * ============================================================ */
    {
      id: 'd-5',
      name: ko('단톡방 매도와 명예훼손'),
      truth: true,
      truthDescription: ko(
        '송다은이 확인 없이 단톡방에서 최수민을 매도했고, 최수민은 또 악역을 자처하는 구조가 반복됐다. 두 사람 모두 확인 전에 단정한 책임이 있다.',
      ),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 60, b: 40 },
      mediationLink: '성급한 단정과 명예훼손',
      requiredEvidence: ['e-2', 'e-7'],
      judgmentStatement: ko('먼저 단정하고 공개한 쪽의 책임이 더 크지만 침묵으로 반복을 허용한 쪽도 책임이 있다.'),
      unlockCondition: {
        requireDispute: [
          { id: 'd-3', minState: 'S3' },
          { id: 'd-4', minState: 'S3' },
        ],
        runtimeRule: ko('d-3 S3 + d-4 S3 모두 도달 시 (현재 + 과거 패턴 확정) 해금'),
        authoredRule: ko('송다은 아버지 패턴과 과거 차용금 미상환이 모두 드러난 뒤 현재 명예훼손 구조 부상'),
      },
      verdictOptions: {
        wrong: ko('최수민이 먼저 예비신랑에게 접근해서 스스로 명예를 무너뜨렸다.'),
        partial: ko('양쪽 모두 상대를 단정한 부분이 있다.'),
        truth: ko('송다은이 확인 없이 단톡방에서 최수민을 매도했고, 최수민은 또 악역이 되는 구조가 반복됐다.'),
        defer: ko('누가 먼저 명예를 훼손했는지 판단하기 어렵다. 유보한다.'),
      },
      lieConfig: {
        a: {
          lieType: 'LT-2',
          lieIntensity: 'L1',
          lieMotive: 'face_saving',
          initialState: 'S0',
          collapseViaTrust: true,
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
            admittedFact: ko('단톡방에 사실만 올렸다. 누구라도 그 기록을 봤다면 같은 결론을 냈을 것이다.'),
            allowedKeywords: koKeywords('사실 알림', '같은 결론'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', '먼저 낙인', 'B 또 악역', '확인 없이 단정'],
              ['defamation', 'public stigma', 'B played the villain again', 'judgment before verification'],
              ['名誉毀損', '先に烙印', 'Bがまた悪役', '確認なしに断定'],
              ['名誉毁损', '先打烙印', 'B又当恶人', '未经确认就断定'],
            ),
            answerFrame: ko('A는 사실 알림 frame strict. 매도/명예훼손 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('단톡방 글이 올라온 뒤 아무 말도 못 했다.'),
            allowedKeywords: koKeywords('아무 말 못함', '침묵'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역', '반복 침묵', 'B 차마 못 말함'],
              ['defamation', 'B played the villain again', 'repeated silence', 'B could not say it'],
              ['名誉毀損', 'Bがまた悪役', '繰り返しの沈黙', 'Bは言えなかった'],
              ['名誉毁损', 'B又当恶人', '反复沉默', 'B没能说出口'],
            ),
            answerFrame: ko('B는 침묵 영역만 인정. 매도/악역 키워드 절대 등장 X.'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('판단이 섞인 문장도 있었다. 다만 그때는 멈추게 하는 게 먼저였다.'),
            allowedKeywords: koKeywords('판단이 섞임', '멈추게 함이 먼저'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역'],
              ['defamation', 'B played the villain again'],
              ['名誉毀損', 'Bがまた悪役'],
              ['名誉毁损', 'B又当恶人'],
            ),
            answerFrame: ko('A는 판단 섞임 영역 부분 인정. 매도 평가는 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은은 "판단이 섞인 문장도 있었다"고 말한다.'),
              behaviorHint: ko('눈을 크게 뜬 채 화면을 내려다보고, 손가락이 멈춘다.'),
            },
          },
          b: {
            admittedFact: ko('침묵이 인정은 아니었다. 송다은이 무너질까 봐 입을 닫았다.'),
            allowedKeywords: koKeywords('침묵 ≠ 인정', '송다은이 무너질까 봐'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역', '반복 침묵'],
              ['defamation', 'B played the villain again', 'repeated silence'],
              ['名誉毀損', 'Bがまた悪役', '繰り返しの沈黙'],
              ['名誉毁损', 'B又当恶人', '反复沉默'],
            ),
            answerFrame: ko('B는 침묵 동기 부분 인정. 반복 침묵·매도 키워드 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('최수민은 "다은이가 무너질까 봐 입을 닫았다"고 작게 덧붙인다.'),
              behaviorHint: ko('눈을 마주치지 못한 채 목을 한 번 가다듬는다.'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('여러 사람이 볼 줄은 알았지만, 그때는 확인보다 멈추게 하는 게 먼저였다고 본다.'),
            allowedKeywords: koKeywords('여러 사람이 볼 줄 앎', '확인보다 멈춤'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역'],
              ['defamation', 'B played the villain again'],
              ['名誉毀損', 'Bがまた悪役'],
              ['名誉毁损', 'B又当恶人'],
            ),
            answerFrame: ko('A는 공개 인지 인정. 매도 평가는 회피.'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('송다은은 "확인보다 멈추게 하는 게 먼저였다"고 둘러댄다.'),
              behaviorHint: ko('말을 빠르게 붙이다가, 재판관 쪽 시선 앞에서 턱이 굳는다.'),
            },
          },
          b: {
            admittedFact: ko('단톡방 매도보다 결혼 직전 돈 얘기가 더 급해 보여, 자기 설명을 뒤로 밀었다.'),
            allowedKeywords: koKeywords('결혼 직전 돈 얘기 우선', '설명을 뒤로'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역'],
              ['defamation', 'B played the villain again'],
              ['名誉毀損', 'Bがまた悪役'],
              ['名誉毁损', 'B又当恶人'],
            ),
            answerFrame: ko('B는 우선순위 frame 인정. 매도 평가·악역 키워드 회피.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "자기 설명을 뒤로 밀었다"고 밝힌다.'),
              behaviorHint: ko('짧게 고개를 젓고, 말끝에서 손바닥을 무릎에 눌러 붙인다.'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('확인 없이 단톡방에 먼저 올린 것은 사실이다. 그래도 결혼 앞에서는 누구라도 흔들렸을 거다.'),
            allowedKeywords: koKeywords('확인 없이 단톡방에 먼저 올림', '결혼 앞 흔들림'),
            forbiddenKeywords: keywords(
              ['명예훼손', 'B 또 악역'],
              ['defamation', 'B played the villain again'],
              ['名誉毀損', 'Bがまた悪役'],
              ['名誉毁损', 'B又当恶人'],
            ),
            answerFrame: ko('A는 확인 없이 단정 행위 인정. 명예훼손 평가는 회피.'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('송다은은 "확인 없이 먼저 올린 건 맞다"고 인정한다.'),
              behaviorHint: ko('인정하는 문장을 꺼낸 직후 턱을 치켜들고 바로 자기 판단을 방어한다.'),
            },
          },
          b: {
            admittedFact: ko('침묵이 또 다른 낙인을 만들었다는 점은 본인이 안다. 송다은 아버지를 꺼내는 순간 본인이 친구 집안을 무너뜨리는 사람이 될까 봐 겁났다.'),
            allowedKeywords: koKeywords('침묵이 낙인 만듦', '집안 무너뜨릴 두려움'),
            forbiddenKeywords: keywords(
              ['확인 없이 매도', '명예훼손', 'B 또 악역'],
              ['defamation', 'B played the villain again'],
              ['名誉毀損', 'Bがまた悪役'],
              ['名誉毁损', 'B又当恶人'],
            ),
            answerFrame: ko('B는 침묵의 낙인 효과 인정. 동기 영역까지 노출. 매도·악역 키워드는 회피.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "집안을 무너뜨리는 사람이 될까 봐 겁났다"고 흔들린다.'),
              behaviorHint: ko('눈가가 붉어지고, 손등을 누르는 손끝이 미세하게 떨린다.'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('아버지 얘기까지 나오자 글을 올린 손이 먼저였다는 사실을 인정할 수밖에 없다. 본인은 분노를 멈추지 못했다.'),
            allowedKeywords: koKeywords('글이 먼저', '분노 멈추지 못함'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 매도 행위 + 동기 인정. 분노 영역까지 노출.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('송다은은 "글을 올린 손이 먼저였다"고 무너진다.'),
              behaviorHint: ko('손목이 떨리고, 숨을 들이쉴 때 어깨가 크게 들썩인다.'),
            },
          },
          b: {
            admittedFact: ko('본인이 또 혼자 막으려다 낙인이 반복됐다. 두 번 다 같은 구조가 됐다.'),
            allowedKeywords: koKeywords('혼자 막으려', '낙인 반복', '같은 구조'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 반복 구조 + 침묵 책임 인정. 매도/악역 영역까지 노출 가능.'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('최수민은 "두 번 다 같은 구조가 됐다"고 말한다.'),
              behaviorHint: ko('숨이 한 번 깊어진다.'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('확인하지 않은 채 단톡방에 먼저 올려 친구를 매도한 책임은 본인에게 있다. 성급한 단정으로 명예훼손이 일어났다.'),
            allowedKeywords: koKeywords('확인 없이 매도', '먼저 낙인', '성급한 단정', '명예훼손'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('A는 진실 완전 인정. 매도 + 명예훼손 책임 직접 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('송다은이 마지막 단어를 받아낸다.'),
              behaviorHint: ko('반박을 준비하듯 입을 열었다가 닫고, 손에 쥔 휴대폰 화면만 오래 내려다본다.'),
            },
          },
          b: {
            admittedFact: ko(
              '송다은이 단톡방에서 본인을 매도한 행위에 대해 본인은 또 침묵을 택했고, 두 번 다 악역이 되는 구조를 반복시킨 책임이 있다.',
            ),
            allowedKeywords: koKeywords('반복 침묵', 'B 또 악역', '구조 반복'),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('B는 진실 완전 인정. 반복 침묵 + 악역 자처 책임 모두 진술.'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('최수민은 "두 번 다 같은 구조를 만든 책임이 있다"고 인정한다.'),
              behaviorHint: ko('시선이 처음으로 송다은을 향한다.'),
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
          surfaceClaim: ko('사실 알림 / 아무 말 못함'),
          hiddenTruth: ko('확인 없이 매도 + 반복 침묵'),
          validActions: ['fact_pursuit', 'evidence_query'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('판단이 섞임 / 침묵 ≠ 인정'),
          hiddenTruth: ko('매도 + 침묵 동기'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-2'],
          requiredWitness: [],
          successUnlocks: [],
        },
        S2: {
          surfaceClaim: ko('공개 인지 + 확인보다 멈춤 / 자기 설명 뒤로'),
          hiddenTruth: ko('매도 + 우선순위'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-2'],
          requiredWitness: ['w-1'],
          successUnlocks: ['dc-1'],
        },
        S3: {
          surfaceClaim: ko('확인 없이 먼저 올림 / 침묵이 낙인 만듦'),
          hiddenTruth: ko('명예훼손 + 동기'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-2', 'e-7'],
          requiredWitness: ['w-1'],
          successUnlocks: ['dc-5'],
        },
        S4: {
          surfaceClaim: ko('글이 먼저 + 분노 / 반복 구조'),
          hiddenTruth: ko('완전 자백'),
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
  ],

  /* ----- evidence (7개: e-1 ~ e-7) ----- */
  evidence: [
    {
      id: 'e-1',
      name: ko('최수민→예비신랑 연락 기록'),
      surfaceName: ko('예비신랑 연락 기록'),
      description: ko('최근 9일 동안 최수민이 예비신랑 김태윤에게 전화와 문자를 반복한 기록.'),
      surfaceDescription: ko('최근 며칠 동안 이어진 전화와 문자 기록.'),
      type: 'log',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('이 연락 기록을 보고 어떤 생각이 들었는지'),
          implication: ko('집착으로 보이는 첫인상 확인.'),
        },
        b: {
          questionAngle: ko('왜 이렇게까지 반복 연락했는지'),
          implication: ko('경고 의도 우회 경로 설명.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('연락 기록 존재만 보임.') },
        { id: 'excerpt', summary: ko('발신 횟수와 부재중 중심으로 보임.') },
        { id: 'original', summary: ko('일부 문자 원문으로 사적 연락 오해를 낮춤.') },
        { id: 'context', summary: ko('다은 관련 사유와 과거 반복 암시가 확인됨.') },
        { id: 'established', summary: ko('연락 의도를 경고 가능성까지 놓고 판단할 수 있다.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('송다은이 캡처 제출.') },
        { id: 'verifying', summary: ko('원본 통화기록 대조 중.') },
        { id: 'authenticated', summary: ko('통신사 기록과 일치 확인.') },
        { id: 'challenged', summary: ko('최수민이 연락 의도에 대해 이의 제기.') },
        { id: 'misread', summary: ko('집착 해석은 원문 대조가 필요하다.') },
      ],
    },
    {
      id: 'e-2',
      name: ko('공통 친구 단톡방 캡처'),
      surfaceName: ko('공통 대화방 캡처'),
      description: ko('송다은이 "수민이가 또 내 남자한테 연락한다"고 올렸고, 몇몇 공통 친구가 이에 동조한 단체채팅 캡처.'),
      surfaceDescription: ko('송다은의 최초 발언과 친구들의 반응이 남은 단톡방 기록.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'partial',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'a',
      proves: ['d-5'],
      isTrap: false,
      requires: [],
      partyContext: {
        a: {
          questionAngle: ko('확인 전에 어떻게 결론을 냈는지'),
          implication: ko('확인 없는 단정 + 공개 매도 시작점.'),
        },
        b: {
          questionAngle: ko('단톡방 글을 본 뒤 왜 반박하지 않았는지'),
          implication: ko('침묵 동기 + 송다은 보호.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('단톡방 캡처 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('송다은의 최초 발언만 보임.') },
        { id: 'original', summary: ko('공통 친구 동조 메시지까지 모두 확인.') },
        { id: 'context', summary: ko('직접 확인 전 단톡방 공개 순서가 복원됨.') },
        { id: 'established', summary: ko('확인 없는 공개 매도 시작점이 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('최수민이 캡처 제출.') },
        { id: 'verifying', summary: ko('단톡방 원본 대조.') },
        { id: 'authenticated', summary: ko('메시지 시각과 작성자 모두 일치.') },
        { id: 'challenged', summary: ko('송다은이 사실 알림 frame을 주장.') },
        { id: 'misread', summary: ko('자료는 인증되지만 매도 해석은 mediation 영역.') },
      ],
    },
    {
      id: 'e-3',
      name: ko('과거 손절 직전 카톡'),
      surfaceName: ko('예전 관계가 끊기기 전 대화'),
      description: ko('예전 관계가 끊기기 직전, 최수민이 짧은 한 마디만 남기고 설명을 피했으며 송다은은 이를 변심으로 받아들인 대화 기록.'),
      surfaceDescription: ko('예전 관계가 끊어지기 직전 두 사람이 그 일을 두고 나눈 대화.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'both',
      proves: ['d-4'],
      isTrap: false,
      requires: [],
      requiredLieState: 'S1',
      partyContext: {
        a: {
          questionAngle: ko('당시 어떻게 변심으로 단정했는지'),
          implication: ko('확인하지 않은 단정 패턴.'),
        },
        b: {
          questionAngle: ko('왜 자세히 설명하지 못했는지'),
          implication: ko('아버지 문제를 들춰야 해서 차마 말 못함.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('과거 대화 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('"돈 문제는 내가 알아서 정리할게" 문구만 보임.') },
        { id: 'original', summary: ko('"넌 돈만 엮이면 사람이 달라진다" 답신까지 확인.') },
        { id: 'context', summary: ko('이 대화 직후 2년간 연락 두절 흐름이 복원됨.') },
        { id: 'established', summary: ko('최수민이 숨긴 돈 문제의 실체가 송다은 아버지의 사기였다는 사실은 봉인 단계 후 노출.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('최수민이 카톡 캡처 제출.') },
        { id: 'verifying', summary: ko('메신저 원본 대조.') },
        { id: 'authenticated', summary: ko('대화 시각과 작성자 일치.') },
        { id: 'challenged', summary: ko('송다은이 변심 해석을 주장.') },
        { id: 'misread', summary: ko('데이터는 인증되지만 손절 원인은 e-6 대조 후 확정.') },
      ],
    },
    {
      id: 'e-4',
      name: ko('예비신랑의 선 넘는 메시지와 최수민의 거절 답장'),
      surfaceName: ko('예비신랑 메시지와 답장'),
      description: ko('예비신랑 김태윤이 "다은이 몰래 커피 한 번 보자", "너 같은 스타일이 원래 내 이상형" 같은 말을 보냈고 최수민이 이를 거절한 원본 대화.'),
      surfaceDescription: ko('예비신랑과 최수민 사이의 메시지. 누가 먼저 선을 넘었는지 확인해야 한다.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-2'],
      isTrap: false,
      requires: ['e-1'],
      partyContext: {
        a: {
          questionAngle: ko('예비신랑의 행동을 어떻게 해석하는지'),
          implication: ko('예비신랑 책임 영역에 대한 인지.'),
        },
        b: {
          questionAngle: ko('이 메시지를 받고 어떻게 대응했는지'),
          implication: ko('거절 행위 + 이후 연락의 의미.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('예비신랑과 최수민 사이 메시지 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('"다은이 몰래 커피 한 번 보자" 일부만 보임.') },
        { id: 'original', summary: ko('"이상형" 메시지 + 최수민의 "친구 남자친구니까 이러지 마" 거절까지 확인.') },
        { id: 'context', summary: ko('이 시점이 최수민의 9일간 연락 시작 직전임이 복원됨.') },
        { id: 'established', summary: ko('예비신랑이 먼저 선을 넘었고 최수민은 거절한 쪽이었다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('최수민이 캡처 제출.') },
        { id: 'verifying', summary: ko('메신저 원본 대조.') },
        { id: 'authenticated', summary: ko('대화 시각과 발신자 일치.') },
        { id: 'challenged', summary: ko('송다은이 예비신랑 책임 영역에 이의.') },
        { id: 'misread', summary: ko('선후관계는 인증되지만 해석은 d-1 reframe과 함께 처리.') },
      ],
    },
    {
      id: 'e-5',
      name: ko('송다은 아버지와 예비신랑의 문자'),
      surfaceName: ko('아버지와 예비신랑의 문자'),
      description: ko('송다은 아버지가 예비신랑에게 "결혼 전에 잠깐만 도와주면 금방 돌려준다", "다은이한테는 아직 말하지 마"라고 보낸 문자 기록.'),
      surfaceDescription: ko('송다은 아버지가 예비신랑에게 돈 이야기를 꺼낸 문자.'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'both',
      proves: ['d-3'],
      isTrap: false,
      requires: ['e-1'],
      requiredLieState: 'S2',
      partyContext: {
        a: {
          questionAngle: ko('아버지의 이 문자를 알고 있었는지'),
          implication: ko('인지·방관 여부.'),
        },
        b: {
          questionAngle: ko('이 문자를 보고 무엇을 떠올렸는지'),
          implication: ko('과거 동일 패턴 인식.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('아버지가 예비신랑에게 보낸 문자 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('"결혼 전에 잠깐만 도와주면 금방 돌려준다" 발췌만 보임.') },
        { id: 'original', summary: ko('"사위 될 사람이면 이 정도는 믿어야지" 추가 + 발송 시각 모두 확인.') },
        { id: 'context', summary: ko('최수민의 9일간 연락 시기와 정확히 겹친다는 흐름 복원.') },
        { id: 'established', summary: ko('송다은 아버지가 결혼 자금 명목으로 돈을 꺼내려 했다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('최수민 또는 재판관 측 포착.') },
        { id: 'verifying', summary: ko('예비신랑 휴대폰 원본 확인.') },
        { id: 'authenticated', summary: ko('발신자 + 시각이 모두 일치.') },
        { id: 'challenged', summary: ko('송다은이 단순 인사 frame을 주장.') },
        { id: 'misread', summary: ko('자료는 인증되지만 사기 인지 영역은 봉인 단계.') },
      ],
    },
    {
      id: 'e-6',
      name: ko('과거 송금 영수증 + 문자'),
      surfaceName: ko('과거 송금 기록과 문자'),
      description: ko('과거 송금 내역과 차일피일 상환이 미뤄진 흐름이 남아 있는 은행·메신저 자료.'),
      surfaceDescription: ko('과거 송금 내역과 갚지 않은 문자 흐름이 남아 있는 자료.'),
      type: 'bank',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-4'],
      isTrap: false,
      requires: ['e-3'],
      requiredLieState: 'S2',
      partyContext: {
        a: {
          questionAngle: ko('아버지가 돈을 받고 갚지 않은 사실을 알고 있었는지'),
          implication: ko('손절 원인에 대한 인지.'),
        },
        b: {
          questionAngle: ko('과거 손절을 결심한 시점에 무엇이 결정적이었는지'),
          implication: ko('피해 사실 + 침묵 동기.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('과거 이체 내역 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('"급한 투자금이니 한 달만 쓰고 갚겠다" 문자 일부만 보임.') },
        { id: 'original', summary: ko('이체 금액 + 송다은 아버지의 미상환 + "조금만 더 기다려라" 흐름 확인.') },
        { id: 'context', summary: ko('"다은이한테는 말하지 마라"는 문자 흐름이 복원됨.') },
        { id: 'established', summary: ko('과거 손절의 진짜 원인이 송다은 아버지의 차용금 미상환이었다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('최수민이 통장 사본 + 문자 캡처 제출.') },
        { id: 'verifying', summary: ko('은행 원본 + 메신저 원본 대조.') },
        { id: 'authenticated', summary: ko('이체 시각 + 발신자 모두 일치.') },
        { id: 'challenged', summary: ko('송다은이 단순 부탁 frame을 주장.') },
        { id: 'misread', summary: ko('자료는 인증되지만 사기 평가는 mediation 영역.') },
      ],
      sensitiveSealTargets: {
        labels: [ko('구체적 송금 금액'), ko('송다은 아버지 실명'), ko('은행 계좌번호')],
        recommendedTiming: [
          ko('d-4 S2 이상 도달 시 핵심 영역만 조건부 노출'),
          ko('dc-4 직전'),
        ],
        risks: [
          ko('너무 이르면 송다은이 감정 폭발로 심문이 중단될 수 있음'),
          ko('구체적 금액 노출은 인도성 점수 하락 가능'),
        ],
      },
    },
    {
      id: 'e-7',
      name: ko('과거/현재 대조표'),
      surfaceName: ko('두 시점 대조표'),
      description: ko('과거 최수민에게 했던 돈 부탁 문구와 현재 예비신랑에게 보낸 문구, 그리고 그 사이마다 최수민이 혼자 끊고 사라졌던 시점을 한 줄 타임라인으로 정리한 대조표.'),
      surfaceDescription: ko('과거와 현재의 문구와 시점을 나란히 놓은 대조표.'),
      type: 'log',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'both',
      proves: ['d-5', 'd-1'],
      isTrap: false,
      requires: ['e-4', 'e-5', 'e-6'],
      requiredLieState: 'S3',
      partyContext: {
        a: {
          questionAngle: ko('두 시점이 같은 구조라는 사실을 받아들일지'),
          implication: ko('반복 패턴 + 본인의 반복 단정.'),
        },
        b: {
          questionAngle: ko('두 번 다 혼자 막으려 한 이유'),
          implication: ko('반복 침묵 + 악역 자처 구조.'),
        },
      },
      depthStages: [
        { id: 'stub', summary: ko('대조표 1건 존재 표시.') },
        { id: 'excerpt', summary: ko('과거 문구와 현재 문구 일부만 정렬.') },
        { id: 'original', summary: ko('두 시점의 송금 부탁 문구가 거의 동일함이 확인.') },
        { id: 'context', summary: ko('두 시점 사이 최수민이 혼자 끊고 사라진 타이밍 패턴이 복원됨.') },
        { id: 'established', summary: ko('송다은 아버지의 돈 접근 패턴이 반복되며 최수민이 이번에도 혼자 막으려 했다고 공식기록 채택.') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('재판관 측 정리 또는 최수민 제출.') },
        { id: 'verifying', summary: ko('과거·현재 문구 정렬 + 시간 흐름 검증.') },
        { id: 'authenticated', summary: ko('두 시점 문구 + 시점 모두 일치.') },
        { id: 'challenged', summary: ko('송다은이 우연한 유사 frame을 주장.') },
        { id: 'misread', summary: ko('패턴은 인증되지만 책임 분리는 mediation 영역.') },
      ],
    },
  ],

  /* ----- witnesses (3명: w-1, w-2, w-3) ----- */
  witnesses: [
    {
      id: 'w-1',
      name: ko('김세라'),
      age: 32,
      gender: 'f',
      occupation: ko('미용실 직원'),
      bias: 'pro_a',
      distortionRisk: 'strategic',
      knowledgeScope: ko(
        '단톡방에서 송다은의 글을 보고 최수민을 비난하는 데 동조했다. 나중에 찜찜한 마음이 들었다.',
      ),
      address: {
        fromA: ko('다은이'),
        fromB: ko('수민 씨'),
      },
      hiddenAgenda: ko('자신도 최수민을 비난하는 데 가담한 것이 부끄럽다.'),
      relatedDisputes: ['d-5'],
      unlockedByDossier: ['dc-1'],
      testimony: {
        byDispute: {
          'd-5': {
            canProve: [
              ko('송다은의 최초 단톡방 발언 경위 + 공통 친구들의 동조 흐름.'),
              ko('직접 확인 없이 분위기가 잡혀간 시점.'),
            ],
            cannotDisprove: [
              ko('두 사람 사이의 실제 사정은 모름.'),
              ko('자신도 동조한 책임이 있어 발언이 보수적.'),
            ],
          },
        },
      },
    },
    {
      id: 'w-2',
      name: ko('박준혁'),
      age: 34,
      gender: 'm',
      occupation: ko('회사원'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko(
        '예비신랑의 회사 후배로, 예비신랑이 최수민에게 먼저 접근한 사실을 알고 있다.',
      ),
      address: {
        fromA: ko('그분'),
        fromB: ko('최수민 씨'),
      },
      hiddenAgenda: ko('예비신랑과의 직장 관계가 불편해질까 봐 조심한다.'),
      relatedDisputes: ['d-2'],
      unlockedByDossier: ['dc-2'],
      testimony: {
        byDispute: {
          'd-2': {
            canProve: [
              ko('예비신랑이 사적 자리에서 최수민에게 먼저 접근하려 했다는 사실.'),
              ko('예비신랑이 메시지 송신 직후 자기 말을 어떻게 자랑했는지.'),
            ],
            cannotDisprove: [
              ko('두 사람 사이 모든 메시지를 직접 본 것은 아님.'),
              ko('최수민이 거절했는지는 본인 진술 기준.'),
            ],
          },
        },
      },
    },
    {
      id: 'w-3',
      name: ko('오미경'),
      age: 58,
      gender: 'f',
      occupation: ko('분식집 사장'),
      bias: 'pro_b',
      distortionRisk: 'accurate',
      knowledgeScope: ko(
        '동네 분식집 사장으로, 과거에 송다은 아버지가 최수민에게 돈을 빌리러 온 것을 봤다. 최수민이 울면서 가게에 온 적이 있다.',
      ),
      address: {
        fromA: ko('그 집 딸'),
        fromB: ko('수민이'),
      },
      hiddenAgenda: null,
      relatedDisputes: ['d-4'],
      unlockedByDossier: ['dc-4'],
      testimony: {
        byDispute: {
          'd-4': {
            canProve: [
              ko('과거 송다은 아버지가 가게 앞에서 최수민에게 돈을 빌리려 한 장면.'),
              ko('최수민이 가게에 울면서 들어왔던 일이 손절 시기와 가깝다는 점.'),
            ],
            cannotDisprove: [
              ko('실제 송금/미상환 금액은 본인이 본 영역 밖.'),
              ko('두 사람 사이 카톡 내용은 모름.'),
            ],
          },
        },
      },
    },
  ],

  /* ----- dossierCards (5개: dc-1 ~ dc-5) ----- */
  dossierCards: [
    {
      id: 'dc-1',
      label: ko('확인 없이 매도한 건 누구인가'),
      description: ko('단톡방에서의 단정과 공개 매도 책임을 송다은 측에서 직접 추궁하는 첫 카드.'),
      type: 'derived_note',
      linkedDisputes: ['d-5'],
      linkedParty: 'a',
      linkedEvidence: ['e-1', 'e-2'],
      leadLine: {
        id: 'L-1',
        name: ko('Timeline Lead'),
        leadType: 'Timeline',
        firstInputs: ['e-1', 'e-2'],
        secondInputs: ['L-1', 'e-7'],
        interpretationChoices: [
          {
            id: 'L-1-A',
            text: ko('최수민이 집착한 것이다'),
            implication: ko('d-1을 집착으로 밀어붙인다.'),
          },
          {
            id: 'L-1-B',
            text: ko('송다은이 먼저 프레이밍한 것이다'),
            implication: ko('d-5와 연결된다.'),
          },
          {
            id: 'L-1-C',
            text: ko('확인이 더 필요하다'),
            implication: ko('중립 유지.'),
          },
        ],
      },
      noteText: ko(
        '연락 기록과 단톡방 캡처를 대조하면, 최수민의 연락 사실이 직접 확인도 없이 "집착"으로 프레이밍된 과정이 보인다.',
      ),
      successConditionSummary: [
        ko('e-1이 Original 이상'),
        ko('e-2가 Excerpt 이상'),
        ko('A에게 시간 순서 추궁 누적'),
      ],
      successEffects: [
        ko('d-5 핵심 사실 "확인 없는 매도" 잠정 인정'),
        ko('A가 공개 매도 시점 인정'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-1' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-5', weight: 'high' },
        },
      ],
      judgeHint: ko('김세라(w-1)를 증인으로 부를 수 있게 됨.'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-1.a.q1',
              text: ko('수민 씨에게 직접 묻기도 전에 단톡방에 먼저 올린 이유가, 사실 확인보다 분노를 먼저 퍼뜨리고 싶어서였던 것 아닙니까?'),
              lockedHint: ko('연락 기록과 단톡방 발언이 함께 열려야 보입니다.'),
              attackVector: 'timeline',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'timeline',
                revealAtom: 'friend-01:a:d-5:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
        b: {
          questions: [
            {
              id: 'dc-1.b.q1',
              text: ko('이번에도 스스로 악역이 되면 또 같은 낙인이 반복된다는 걸 알면서, 왜 끝까지 침묵했습니까?'),
              lockedHint: ko('단톡방 캡처와 대조표가 함께 열려야 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'friend-01:b:d-5:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-2',
      label: ko('먼저 넘은 선'),
      description: ko('예비신랑이 먼저 경계를 넘었다는 반전을 열어 최수민의 연락 해석을 뒤집는 카드.'),
      type: 'derived_note',
      linkedDisputes: ['d-1', 'd-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-1', 'e-4'],
      leadLine: {
        id: 'L-2',
        name: ko('Context Lead'),
        leadType: 'Context',
        firstInputs: ['e-1', 'e-4'],
        secondInputs: ['L-2', 'e-5'],
        interpretationChoices: [
          {
            id: 'L-2-A',
            text: ko('예비신랑이 먼저 선을 넘었다'),
            implication: ko('d-2를 확정한다.'),
          },
          {
            id: 'L-2-B',
            text: ko('그래도 최수민이 연락을 이어간 건 문제다'),
            implication: ko('d-1의 방식 적절성을 묻는다.'),
          },
          {
            id: 'L-2-C',
            text: ko('예비신랑의 책임을 더 따져야 한다'),
            implication: ko('제3자 책임 부각.'),
          },
        ],
      },
      noteText: ko(
        '예비신랑이 먼저 선 넘는 메시지를 보냈고 최수민이 거절했다는 흐름이 확인된다. 이후 9일간 연락은 이 상황의 연장선이 된다.',
      ),
      successConditionSummary: [
        ko('e-4가 Original 이상'),
        ko('B에게 시간 순서 추궁 누적'),
      ],
      successEffects: [
        ko('d-2 선후관계 뒤집힘'),
        ko('d-3 해금에 필요한 설명 경로 열림'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-2' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-2', weight: 'high', ambiguity: 'low' },
        },
      ],
      judgeHint: ko('박준혁(w-2)을 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-2.b.q1',
              text: ko('예비신랑이 먼저 선을 넘었다면, 왜 다은이에게 바로 이 대화를 보여주지 않았습니까?'),
              lockedHint: ko('예비신랑 메시지 원본과 연락 기록을 함께 대조해야 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'friend-01:b:d-2:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-3',
      label: ko('같은 부탁'),
      description: ko('현재 문자와 과거 송금 흐름을 붙여 아버지의 반복 패턴을 확정하는 카드.'),
      type: 'derived_note',
      linkedDisputes: ['d-3'],
      linkedParty: 'b',
      linkedEvidence: ['e-5', 'e-6'],
      leadLine: {
        id: 'L-3',
        name: ko('Beneficiary Lead'),
        leadType: 'Beneficiary',
        firstInputs: ['e-5', 'e-6'],
        secondInputs: ['L-3', 'e-7'],
        interpretationChoices: [
          {
            id: 'L-3-A',
            text: ko('송다은 아버지의 돈 문제 패턴이 맞다'),
            implication: ko('d-3, d-4를 확정한다.'),
          },
          {
            id: 'L-3-B',
            text: ko('아버지 사정이 있었을 수도 있다'),
            implication: ko('송다은의 입장을 고려한다.'),
          },
          {
            id: 'L-3-C',
            text: ko('최수민이 직접 말했어야 한다'),
            implication: ko('침묵의 책임을 묻는다.'),
          },
        ],
      },
      noteText: ko(
        '송다은 아버지가 예비신랑에게 보낸 문자와 과거 최수민에게 보낸 송금 부탁이 거의 동일한 흐름이다.',
      ),
      successConditionSummary: [
        ko('e-5가 Original 이상'),
        ko('e-6이 Original 이상'),
        ko('d-2가 S3 이상'),
      ],
      successEffects: [
        ko('송다은 아버지의 현재 접근이 과거와 연결됨'),
        ko('d-4 해금에 필요한 반복 패턴 확정'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-3' },
        { kind: 'unlock_dispute', unlockNodeId: 'd-4' },
      ],
      judgeHint: ko('새 쟁점 "과거 손절의 이유"가 드러날 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-3.b.q1',
              text: ko('같은 돈 부탁을 다시 봤다면, 왜 이번에도 혼자 막는 쪽을 택했습니까?'),
              lockedHint: ko('현재 문자와 과거 송금 흐름이 함께 열려야 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'friend-01:b:d-3:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-4',
      label: ko('손절의 값'),
      description: ko('과거 손절이 변심이 아니라 사기 피해와 침묵의 결과였음을 드러내는 카드.'),
      type: 'derived_note',
      linkedDisputes: ['d-4'],
      linkedParty: 'b',
      linkedEvidence: ['e-3', 'e-6'],
      leadLine: {
        id: 'L-4',
        name: ko('Emotion Lead'),
        leadType: 'Emotion',
        firstInputs: ['e-3', 'e-6'],
        secondInputs: ['L-4', 'e-7'],
        interpretationChoices: [
          {
            id: 'L-4-A',
            text: ko('최수민의 연락은 경고였다'),
            implication: ko('사건 전체를 재해석한다.'),
          },
          {
            id: 'L-4-B',
            text: ko('경고였어도 방식이 잘못됐다'),
            implication: ko('최수민의 방식 책임을 남긴다.'),
          },
          {
            id: 'L-4-C',
            text: ko('두 사람 모두 확인 전에 단정했다'),
            implication: ko('공동 책임.'),
          },
        ],
      },
      noteText: ko(
        '과거 손절의 진짜 원인은 송다은 아버지의 차용금 미상환이었고, 최수민의 침묵은 송다은을 무너뜨리지 않으려는 보호에서 비롯됐다.',
      ),
      successConditionSummary: [
        ko('e-3이 Original 이상'),
        ko('e-6이 Original 이상'),
        ko('d-3이 S2 이상'),
      ],
      successEffects: [
        ko('과거 손절의 빈칸이 사기 피해 맥락으로 채워짐'),
        ko('최수민의 침묵 동기와 송다은의 성급한 결론이 함께 드러남'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-4' },
        { kind: 'unlock_dispute', unlockNodeId: 'd-5' },
      ],
      judgeHint: ko('오미경(w-3)을 증인으로 부를 수 있게 됨.'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-4.b.q1',
              text: ko('다은이 아버지가 당신 돈을 가져간 뒤에도, 왜 그 사실만은 다은이에게 끝내 말하지 못했습니까?'),
              lockedHint: ko('과거 카톡과 송금 기록이 함께 열려야 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'friend-01:b:d-4:S3:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
    {
      id: 'dc-5',
      label: ko('낙인의 순서'),
      description: ko('누가 먼저 공개적으로 최수민을 낙인찍었는지와 왜 같은 구조가 반복됐는지를 묻는 최종 카드. 송다은의 공개 매도 책임 중심.'),
      type: 'derived_note',
      linkedDisputes: ['d-1', 'd-5'],
      linkedParty: 'a',
      linkedEvidence: ['e-2', 'e-7'],
      noteText: ko(
        '두 시점에서 같은 구조가 반복된다. 송다은이 먼저 단정하고 공개 매도한 책임과 최수민이 또 혼자 막으려다 낙인을 허용한 책임이 어떻게 엇갈리는지를 정리한다.',
      ),
      successConditionSummary: [
        ko('e-7이 Original 이상'),
        ko('d-3과 d-4가 S3 이상'),
        ko('단톡방 발언의 시간 순서 확인'),
      ],
      successEffects: [
        ko('d-5가 최종 쟁점으로 정리됨'),
        ko('정정과 사과가 필요한 지점이 명확해짐'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-5' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: { disputeId: 'd-5', weight: 'high' },
        },
      ],
      judgeHint: ko('당사자 대질을 통해 양측 책임축을 동시에 정리.'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-5.a.q1',
              text: ko('아버지 얘기까지 나온 지금, 단톡방에 글을 올린 그 행위가 명예훼손이라는 점을 인정합니까?'),
              lockedHint: ko('단톡방 캡처와 대조표가 함께 열려야 보입니다.'),
              attackVector: 'legitimacy',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'legitimacy',
                revealAtom: 'friend-01:a:d-5:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
        b: {
          questions: [
            {
              id: 'dc-5.b.q1',
              text: ko('이번에도 스스로 악역이 되면 같은 낙인이 반복된다는 걸 알면서, 왜 끝까지 혼자 버텼습니까?'),
              lockedHint: ko('반복 패턴 대조표가 열려야 보입니다.'),
              attackVector: 'context',
              requiredLieState: 'S3',
              onSuccess: {
                blockVector: 'context',
                revealAtom: 'friend-01:b:d-5:S4:0',
                lieAdvance: true,
              },
            },
          ],
        },
      },
    },
  ],

  /* ----- combinationRecipes ----- */
  combinationRecipes: [
    {
      id: 'combine-1',
      inputs: ['e-1', 'e-2'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('연락 기록과 단톡방 캡처를 대조하면, 최수민의 연락 사실이 확인도 없이 "집착"으로 프레이밍된 과정이 보인다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'excerpt', 'e-2': 'excerpt' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('연락 기록과 단톡방 발언의 순서를 비교 중.'),
    },
    {
      id: 'combine-2',
      inputs: ['e-1', 'e-4'],
      cost: 1,
      outputId: 'dc-2',
      discoveryText: ko('연락 기록과 예비신랑의 선 넘는 메시지를 대조해본 결과, 선을 넘은 건 예비신랑이었던 것으로 보인다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'original', 'e-4': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('연락 기록과 예비신랑 메시지의 선후관계를 비교 중.'),
    },
    {
      id: 'combine-3',
      inputs: ['e-5', 'e-6'],
      cost: 1,
      outputId: 'dc-3',
      discoveryText: ko('송다은 아버지가 예비신랑에게 보낸 문자와 과거 최수민에게 보낸 송금 부탁 흐름이 거의 동일하다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-5': 'original', 'e-6': 'original' },
        requiredTruthStage: { 'd-2': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('과거와 현재 자금 부탁 흐름을 대조 중.'),
    },
    {
      id: 'combine-4',
      inputs: ['e-3', 'e-6'],
      cost: 1,
      outputId: 'dc-4',
      discoveryText: ko('과거 카톡의 "돈 문제" 언급과 과거 송금 기록을 대조하면, 손절의 진짜 원인이 변심이 아니라 차용금 미상환 문제였다는 사실이 드러난다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-3': 'original', 'e-6': 'original' },
        requiredTruthStage: { 'd-3': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('과거 손절 흐름과 송금 기록을 대조 중.'),
    },
    {
      id: 'combine-5',
      inputs: ['e-4', 'e-7'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('예비신랑의 접근과 대조표를 합치면, 최수민의 연락이 경고였다는 결론이 강화된다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'original', 'e-7': 'context' },
        requiredTruthStage: { 'd-2': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('예비신랑 접근과 대조표를 함께 보는 중.'),
    },
    {
      id: 'combine-6',
      inputs: ['e-3', 'e-7'],
      cost: 1,
      outputId: 'dc-5',
      discoveryText: ko('과거 카톡과 대조표를 합치면 두 시점 모두 말이 끊긴 순서가 반복된다. 누가 먼저 단정했고 누가 침묵했는지 정리된다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-3': 'context', 'e-7': 'context' },
        requiredTruthStage: { 'd-4': 3 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('두 시점의 말이 끊긴 순서를 비교 중.'),
    },
    {
      id: 'combine-7',
      inputs: ['e-2', 'e-7'],
      cost: 1,
      outputId: 'dc-5',
      discoveryText: ko('단톡방 캡처와 대조표를 합치면 송다은이 매번 확인보다 공개를 먼저 택했다는 패턴이 드러난다.'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-2': 'original', 'e-7': 'context' },
        requiredTruthStage: { 'd-5': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('단톡방 매도 패턴과 대조표를 함께 보는 중.'),
    },
    {
      id: 'combine-8',
      inputs: ['stmt-a-accusation', 'e-2'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('송다은의 "또 내 남자한테 연락한다"는 발언이 단톡방에서 어떻게 확산됐는지 경로가 확인된다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-2': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('A의 단정 발언과 단톡방 확산 경로를 보는 중.'),
    },
    {
      id: 'combine-9',
      inputs: ['stmt-b-silence', 'e-4'],
      cost: 1,
      outputId: 'dc-2',
      discoveryText: ko('수민이 "참았어야 했다"는 말과 예비신랑 메시지를 대조해본 결과, 선을 넘은 건 예비신랑이었다는 흐름이 보인다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('B의 자책 발언과 예비신랑 메시지를 대조 중.'),
    },
    {
      id: 'combine-10',
      inputs: ['stmt-b-silence', 'e-5'],
      cost: 1,
      outputId: 'dc-3',
      discoveryText: ko('수민이 참으려 했다는 말과 송다은 아버지의 문자를 합치면, 현재 연락이 단순한 사적 접촉만은 아닐 가능성이 보인다.'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-5': 'original' },
        requiredTruthStage: { 'd-3': 1 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('B의 자책 발언과 아버지 문자를 대조 중.'),
    },
  ],

  /* ----- authorityPlacements ----- */
  authorityPlacements: [
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-1 초반 e-1 Excerpt 시점'),
      purpose: ko('연락 기록의 실제 내용을 확인하여 집착 여부를 판단.'),
      contextDispute: 'd-1',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-2 해금 직후 e-4 축'),
      purpose: ko('예비신랑의 선 넘는 메시지 원본 확보.'),
      contextDispute: 'd-2',
    },
    {
      action: ko('증인 소환'),
      recommendedMoment: ko('d-2 S2 이후'),
      purpose: ko('박준혁(w-2)을 통해 예비신랑의 행동 패턴 확인.'),
      contextDispute: 'd-2',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-3 해금 직후 e-5 축'),
      purpose: ko('송다은 아버지의 문자 원본 확보.'),
      contextDispute: 'd-3',
    },
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('d-4 해금 직후 e-6 축'),
      purpose: ko('과거 송금 영수증 + 미상환 문자 원본 확보.'),
      contextDispute: 'd-4',
    },
    {
      action: ko('증인 소환'),
      recommendedMoment: ko('d-4 S1 이후'),
      purpose: ko('오미경(w-3)을 통해 과거 돈 거래 목격 사실 확인.'),
      contextDispute: 'd-4',
    },
    {
      action: ko('증인 소환'),
      recommendedMoment: ko('d-5 해금 시점'),
      purpose: ko('김세라(w-1)를 통해 단톡방 분위기와 송다은의 최초 발언 경위 확인.'),
      contextDispute: 'd-5',
    },
    {
      action: ko('대조 명령'),
      recommendedMoment: ko('e-7 해금 시점'),
      purpose: ko('과거·현재 패턴 대조표 작성.'),
    },
    {
      action: ko('정확히 답변하십시오'),
      recommendedMoment: ko('B가 "가족 사정"이라는 모호어를 반복할 때'),
      purpose: ko('아버지 + 사기 영역으로 들어가는 단어 강제.'),
      contextDispute: 'd-4',
    },
    {
      action: ko('당사자 대질'),
      recommendedMoment: ko('d-5 S2 이후'),
      purpose: ko('확인 없이 단정한 경위를 양측이 직접 마주하며 확인.'),
      contextDispute: 'd-5',
    },
    {
      action: ko('선처 창구'),
      recommendedMoment: ko('dc-4 또는 dc-5 직후'),
      purpose: ko('A는 분노/단정 책임, B는 침묵의 무게를 함께 진다.'),
    },
    {
      action: ko('발언 제지 / 기록 제외'),
      recommendedMoment: ko('A가 단톡방 매도를 사실 알림 frame으로만 반복할 때'),
      purpose: ko('프레임 싸움을 줄이고 공식기록과 가설을 분리.'),
    },
    {
      action: ko('민감정보 봉인 해제'),
      recommendedMoment: ko('d-4 S2 이후 핵심 영역만 조건부 노출'),
      purpose: ko('과거 사기 사실을 정합 영역까지만 열되 구체 금액·아버지 실명은 봉인 유지.'),
      contextDispute: 'd-4',
    },
  ],

  /* ----- officialRecordRecommendations ----- */
  officialRecordRecommendations: [
    ko('최수민의 9일간 연락은 집착이 아니라 송다은 아버지의 돈 접근을 결혼 직전 예비신랑에게 경고하려던 것이었다.'),
    ko('예비신랑이 먼저 최수민에게 선 넘는 접근을 했고, 최수민은 거절한 쪽이었다.'),
    ko('송다은 아버지의 돈 접근 패턴은 과거와 현재가 같았다.'),
    ko('과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였다.'),
    ko('송다은이 확인 없이 단톡방에서 최수민을 먼저 매도했고, 최수민은 또 악역을 자처하는 구조가 반복됐다.'),
  ],

  /* ----- solutions ----- */
  solutions: {
    연락의도확인: [
      ko('최수민의 연락이 집착이 아니라 경고였음을 양측이 인정하고, 방식의 적절성은 별도로 논의한다.'),
      ko('예비신랑의 선 넘는 접근은 송다은에게도 공유하여 결혼 전에 신뢰를 재확인하는 기회로 삼는다.'),
    ],
    과거청산: [
      ko('송다은 아버지의 과거 차용금 미상환과 현재 돈 접근 패턴을 사실로 확인하고, 최수민의 침묵이 보호에서 비롯됐음을 인정한다.'),
      ko('송다은은 아버지 문제를 직면하되, 최수민에게 과거 피해에 대한 사과의 기회를 마련한다.'),
    ],
    명예회복: [
      ko('단톡방에서의 일방적 매도에 대해 송다은이 공통 친구들에게 정정 메시지를 보낸다.'),
      ko('최수민도 혼자 막으려 하지 말고 신뢰할 수 있는 경로를 통해 소통하는 방식을 약속한다.'),
    ],
  },

  /* ----- relationshipLedger (4개 entry — case JSON과 정합) ----- */
  relationshipLedger: [
    {
      id: 'ledger-1',
      category: 'distorted',
      description: ko('최수민이 예비신랑에게 9일간 연락한 사실이 단톡방에서 "집착"으로 프레이밍됐다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'a',
      distortionDirection: ko('송다은은 연락의 의도를 확인하지 않고 과거 손절 때와 같은 패턴으로 단정했다.'),
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-2',
      category: 'silenced',
      description: ko('과거 손절의 진짜 원인은 송다은 아버지의 차용금 미상환이었으나, 최수민은 송다은에게 말하지 못하고 악역을 자처했다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'a',
      distortionDirection: ko('송다은은 최수민이 돈 때문에 변심한 것으로 기억하고 있다.'),
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-3',
      category: 'silenced',
      description: ko('예비신랑이 먼저 최수민에게 선 넘는 메시지를 보냈고 최수민은 거절했다. 이후 최수민의 연락은 이 상황의 연장선이었다.'),
      isReal: true,
      whoRemembersAccurately: 'b',
      whoDistorts: 'none',
      distortionDirection: ko('송다은은 이 사실 자체를 모른다.'),
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-4',
      category: 'distorted',
      description: ko('송다은이 확인 없이 단톡방에서 최수민을 매도했고 공통 친구들이 동조했다.'),
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'a',
      distortionDirection: ko('송다은은 "사실을 알린 것"이라 생각하지만 실제로는 확인 없는 단정이었다.'),
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
  ],

  /* ----- flags ----- */
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['d-3', 'd-4'],
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],

  /* ----- uiExposure ----- */
  uiExposure: {
    fieldPolicy: {
      'partyA.fear': {
        gate: 'after_dispute_truth',
        hintLocked: ko('아버지의 진짜 모습이 드러나기 전에는 보이지 않습니다.'),
        requireDisputeTruth: 'd-4',
      },
      'partyB.fear': {
        gate: 'after_dispute_truth',
        hintLocked: ko('아버지의 진짜 모습이 드러나기 전에는 보이지 않습니다.'),
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
      { label: '오래된 돈 문제', dimension: 'paraphrase' },
      { label: '말 못한 사정', dimension: 'paraphrase' },
      { label: '집안 어른의 사정', dimension: 'paraphrase' },
      { label: '과거와 닮은 흐름', dimension: 'paraphrase' },
      { label: '결혼 직전 자금 부탁', dimension: 'paraphrase' },
      { label: '선후관계', dimension: 'paraphrase' },
      { label: '상대의 부적절한 접근', dimension: 'paraphrase' },
      { label: '돌려받지 못한 돈', dimension: 'paraphrase' },
      { label: '오랫동안 갚지 못한 돈', dimension: 'paraphrase' },
      { label: '확인 없이 단정', dimension: 'paraphrase' },
      { label: '먼저 공개한 책임', dimension: 'paraphrase' },
      { label: '혼자 막으려 한 일', dimension: 'paraphrase' },
      { label: '반복된 침묵', dimension: 'paraphrase' },
      { label: '경고 목적의 연락', dimension: 'paraphrase' },
      { label: '감정이 아닌 전달', dimension: 'paraphrase' },
    ],
  },

  /* ----- truthLeakOverride -----
   * baseline truth-leak-matrix.friend-01 hidden 영역이 정밀 큐레이션됨 ([[design_truth_leak_keyword_nature]]
   * 정책: 행위/사실만 등록, 동기/태도/해석은 false positive 영역). Authority truthStages.forbiddenKeywords는
   * LLM 자유 심문 frame inject용 광역 키워드 (동기·심리 포함)이고, matrix hidden은 surface detector용
   * 정밀 phrase. 두 영역 분리 운영. derive가 truthLeakOverride만 baseline 매트릭스에 union하므로
   * 본 Authority의 override는 비움 (= baseline 매트릭스 보존). 추가 phrase 필요 시 design 정책 따라 별도 검토.
   * ============================================================================ */
  truthLeakOverride: {
    perDispute: {},
    /* truth-leak-matrix validator는 key:value 형식 강제. band/archetype/channel prefix 통일.
     * baseline에서 d-3 영역 evidence_combo channel variant (`continuity:evidence_combo` tag)는
     * surface-safe 자료 대조로 진실 추론 영역이라 designIntentTags whitelist 유지 — baseline 보존. */
    designIntentTags: ['band:late', 'archetype:confess', 'reveal:full', 'channel:aftermath', 'continuity:evidence_combo'],
  },
}

export default friend01CaseAuthority
