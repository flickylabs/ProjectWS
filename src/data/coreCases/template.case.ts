/**
 * template — Core Case Authority skeleton (Phase 4 신규 사건 시작점)
 *
 * 본 파일은 신규 사건 작성을 위한 보일러플레이트다. 새 사건 추가 시:
 *   1. 이 파일을 `src/data/coreCases/{새caseId}.case.ts`로 복사
 *   2. `templateCaseAuthority` → `{caseId}CaseAuthority`로 export 이름 변경
 *   3. `meta.caseId` 변경 (loader가 --case 인자와 매치)
 *   4. TODO 마커를 따라 KO 권위 채움
 *   5. [docs/design/core-case-authoring-guide.md](../../../docs/design/core-case-authoring-guide.md) 참조
 *
 * Schema: [src/types/coreCase.ts](../../types/coreCase.ts)
 *
 * # 사용자 결정 영역 (작성 시작 전 확정 권장 4건)
 *
 *   1. **monetaryDisputeIds**: 어떤 dispute가 금전 쟁점인가 (비금전 사건 금전 오염 방지)
 *   2. **dossier card linkedParty**: 각 dc-* 가 어느 측(a/b) 권위 카드인가
 *   3. **evidence requiredLieState**: 어떤 evidence가 어느 단계까지 봉인되는가 (sensitive sealing)
 *   4. **dossier card linkedDisputes**: 각 dc-* 가 1 dispute 단일 link 인가 2 dispute 동시 영향인가
 *
 * # 작성 순서 권장
 *
 *   meta → context → parties → timeline → truthTable → disputes (truthStages 핵심!)
 *   → evidence → witnesses → dossierCards → combinationRecipes
 *   → authorityPlacements → officialRecordRecommendations → solutions
 *   → relationshipLedger → flags → uiExposure → freeInterrogation → truthLeakOverride
 *
 * # 회피 영역 (Phase 3 학습)
 *
 *   - **PowerShell file swap 금지** ([feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md))
 *     → dispute array 순서는 처음부터 d-1 → d-N 정렬 작성. swap operation 회피
 *   - **evidence.description은 surface-safe** — stage 0(Stub) 노출 영역이라 truth lexeme 직접 포함 X.
 *     깊이 노출은 depthStages.original / context summary로 단계적 처리
 *   - **designIntentTags whitelist 보존** — baseline matrix._designIntentTags의 `continuity:*` prefix
 *     영역은 scriptedText variant tag와 sync 필요. 새 형식만 등록하면 회귀
 *   - **schema enum 직접 매치** — completeness ('original' | 'edited' | 'partial' | 'context_missing'),
 *     whoDistorts ('a' | 'b' | 'both' | 'none') 등 case JSON 영역 그대로 옮기지 말고 schema 확인
 *   - **truthLeakOverride.perDispute = {}** 기본값 권장. baseline matrix의 hidden은
 *     [design_truth_leak_keyword_nature](../../../memory/design_truth_leak_keyword_nature.md) 정책상
 *     행위/사실만 등록. 동기/태도/심리 keyword union은 false positive 회귀 영역
 */

import {
  type CoreCaseAuthority,
  type LocalizedString,
  type LocalizedKeywordSet,
} from '../../types/coreCase'

/* ============================================================================
 * Helpers — KO 권위 작성을 간결화하는 유틸. translate pass 후 외국어 채워짐.
 * ========================================================================== */

/** KO만 받아 LocalizedString을 생성. 외국어는 translate pass에서 채움. */
const ko = (text: string): LocalizedString => ({ ko: text, en: null, ja: null, 'zh-CN': null })

/** 4언어 모두 받아 LocalizedString 생성 (truth-leak matrix와 sync 필요한 키워드 영역용). */
const i18n = (
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

/** 4언어 키워드 배열 받아 LocalizedKeywordSet 생성 — forbiddenKeywords 같이 truth-leak-matrix와 sync 필수 영역. */
const keywords = (
  koArr: string[],
  enArr: string[],
  jaArr: string[],
  zhCNArr: string[],
): LocalizedKeywordSet => ({ ko: koArr, en: enArr, ja: jaArr, 'zh-CN': zhCNArr })

/* ============================================================================
 * Authority — 사건 권위 데이터
 * ========================================================================== */

export const templateCaseAuthority: CoreCaseAuthority = {
  /* ----- meta ----- */
  meta: {
    caseId: 'template',
    caseNumber: 'TE-TemplateV001',
    caseName: ko('[TODO: 사건 표시 이름 — 짧고 분위기 있는 부제]'),
    schemaVersion: 'core-case-v1',
    title: ko('[TODO: 사건 표면 제목 — 1줄 요약]'),
    relationshipType: '[TODO: spouse | family | friend | colleague | ...]',
    contextType: '[TODO: 사건 분류 — e.g. marital_finance_reframe]',
    difficulty: 'medium',
    /** ⚠ 평문 진실 — UI 노출 절대 금지. uiExposure 정책으로 광역 보호. */
    anchorTruth: ko(
      '[TODO: 사건의 핵심 진실 (3~5 문장) — 양측이 무엇을 했고 무엇을 숨겼는지 명시.\n' +
        '예: 박지연은 ~ 위임장을 조작하여 ~ 사기로 손실했다. 이준호는 ~ 형/조카를 돌보고 있었고 ~]',
    ),
    emotionalBait: ko(
      '[TODO: 사건 표면 frame (1~2 문장) — 의뢰인이 처음에 단정하는 가설.\n' +
        '예: 매일 같은 오피스텔. 새벽 통화. 아내는 남편의 딴 살림을 확신한다.]',
    ),
    resolutionDilemma: ko(
      '[TODO: 양측 책임 dilemma (2~3 문장) — 누가 더 무거운 책임인가, 숨김 순서와 행위 순서 분리]',
    ),
    conflictSeed: ko('TE-TemplateV001'),
    variableModules: [],
    twistModule: null,
    /** 민감도 태그 — e.g. minor_privacy, health_privacy, family_debt, shared_finance */
    sensitivityTags: [],
    /** 5 depth × 5 trust 단계 정의 (모든 사건 공통, 변경 권장 X) */
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
    description: ko('[TODO: 사건 표면 묘사 — emotionalBait와 유사 또는 동일 가능]'),
    emotionalPressure: 7,
    affects: 'both',
    triggerAmplifier: ko(
      '[TODO: 초반에 단서가 한 방향으로만 보이다가 ~ 어떻게 무너지는지 (2~3 문장)]',
    ),
  },

  /* ----- parties ----- */
  parties: {
    a: {
      id: 'a',
      name: ko('[TODO: A 측 이름]'),
      age: 35,
      occupation: ko('[TODO: A 측 직업]'),
      incomeBracket: 'mid',
      /** archetype: e.g. victim_cosplay | avoidant | confrontational | affect_flattening | premature_summary */
      archetype: '[TODO: archetype 분류]',
      speechStyle: ko('[TODO: A 측 발화 스타일 1~2 문장]'),
      pride: 6,
      /** ⚠ 평문 공포 — uiExposure 'partyA.fear' 정책으로 광역 보호 */
      fear: ko('[TODO: A 측 가장 두려워하는 영역 (1 문장)]'),
      riskAppetite: 5,
      digitalHabit: 'messenger_main',
      dailyRoutine: ko('[TODO: A 측 일상 패턴 (1~2 문장)]'),
      sensitivePoints: [
        ko('[TODO: A 측 민감 영역 1]'),
        ko('[TODO: A 측 민감 영역 2]'),
        ko('[TODO: A 측 민감 영역 3]'),
      ],
      verbalTells: [
        {
          type: 'frame_protect',
          trigger: 'cornered',
          pattern: ko('[TODO: A 측 발화 tell 1 — 어떤 상황에서 어떤 패턴]'),
        },
        {
          type: 'soft_admit',
          trigger: 'shame',
          pattern: ko('[TODO: A 측 발화 tell 2]'),
        },
      ],
      callTerms: {
        toPartner: ko('[TODO: 상대 부르는 말]'),
        toJudge: ko('[TODO: 재판관에게 상대 칭하는 말]'),
        angry: ko('[TODO: 화났을 때 부르는 말]'),
      },
      pcFaceType: 'woman',
    },
    b: {
      id: 'b',
      name: ko('[TODO: B 측 이름]'),
      age: 35,
      occupation: ko('[TODO: B 측 직업]'),
      incomeBracket: 'mid',
      archetype: '[TODO: archetype 분류]',
      speechStyle: ko('[TODO: B 측 발화 스타일 1~2 문장]'),
      pride: 6,
      fear: ko('[TODO: B 측 가장 두려워하는 영역 (1 문장)]'),
      riskAppetite: 4,
      digitalHabit: 'minimal',
      dailyRoutine: ko('[TODO: B 측 일상 패턴 (1~2 문장)]'),
      sensitivePoints: [
        ko('[TODO: B 측 민감 영역 1]'),
        ko('[TODO: B 측 민감 영역 2]'),
        ko('[TODO: B 측 민감 영역 3]'),
      ],
      verbalTells: [
        {
          type: 'answer_delay',
          trigger: 'avoiding',
          pattern: ko('[TODO: B 측 발화 tell 1]'),
        },
        {
          type: 'partial_scope',
          trigger: 'cornered',
          pattern: ko('[TODO: B 측 발화 tell 2]'),
        },
      ],
      callTerms: {
        toPartner: ko('[TODO: 상대 부르는 말]'),
        toJudge: ko('[TODO: 재판관에게 상대 칭하는 말]'),
        angry: ko('[TODO: 화났을 때 부르는 말]'),
      },
      pcFaceType: 'man',
    },
  },

  /* ----- timeline (6 stage 권장 — 사건 흐름 순서대로) ----- */
  timeline: [
    {
      stage: 0,
      whenLabel: ko('[TODO: stage 0 시점 라벨 — e.g. 결혼 직후~신혼 초]'),
      actor: 'a',
      action: ko('[TODO: stage 0 행위 — A 측 누적 패턴 / 배경]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S5', allowedChannels: ['aftermath', 'dossier'] },
      sourceFacts: [],
    },
    {
      stage: 1,
      whenLabel: ko('[TODO: stage 1 시점]'),
      actor: 'b',
      action: ko('[TODO: stage 1 행위 — B 측 배경 / 숨김 시작]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S3', allowedChannels: ['dossier', 'aftermath'] },
      sourceFacts: [],
    },
    {
      stage: 2,
      whenLabel: ko('[TODO: stage 2 시점]'),
      actor: 'b',
      action: ko('[TODO: stage 2 행위 — 사건 진전]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S2', allowedChannels: ['evidence_present', 'dossier', 'interrogation'] },
      sourceFacts: [],
    },
    {
      stage: 3,
      whenLabel: ko('[TODO: stage 3 시점]'),
      actor: 'b',
      action: ko('[TODO: stage 3 행위]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S2', allowedChannels: ['evidence_present', 'dossier'] },
      sourceFacts: [],
    },
    {
      stage: 4,
      whenLabel: ko('[TODO: stage 4 시점 — 사건 결정적 영역]'),
      actor: 'a',
      action: ko('[TODO: stage 4 행위 — A 측 결정적 행동 (위반/실행)]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S3', allowedChannels: ['evidence_present', 'dossier'] },
      sourceFacts: [],
    },
    {
      stage: 5,
      whenLabel: ko('[TODO: stage 5 시점 — 사건 직전/직후]'),
      actor: 'a',
      action: ko('[TODO: stage 5 행위 — 결과 / 손실 / 발각]'),
      aPerception: ko('[TODO: A 측 인식]'),
      bPerception: ko('[TODO: B 측 인식]'),
      exposureGate: { minLieState: 'S2', allowedChannels: ['evidence_present', 'dossier'] },
      sourceFacts: [],
    },
  ],

  /* ----- truthTable (5 fact 권장) ----- */
  truthTable: [
    {
      id: 't-1',
      fact: ko('[TODO: 진실 1 — e.g. A 측 행위 fact]'),
      isTrue: true,
      weight: 9,
      quadrant: 'a_only',
    },
    {
      id: 't-2',
      fact: ko('[TODO: 진실 2 — e.g. B 측 행위 fact]'),
      isTrue: true,
      weight: 9,
      quadrant: 'b_only',
    },
    {
      id: 't-3',
      fact: ko('[TODO: 진실 3 — 양측 인지 공통 사실]'),
      isTrue: true,
      weight: 8,
      quadrant: 'both_know',
    },
    {
      id: 't-4',
      fact: ko('[TODO: 진실 4 — 동기/배경]'),
      isTrue: true,
      weight: 7,
      quadrant: 'b_only',
    },
    {
      id: 't-5',
      fact: ko('[TODO: 진실 5 — 결과 / 손실]'),
      isTrue: true,
      weight: 8,
      quadrant: 'a_only',
    },
  ],

  /* ----- disputes (5 chain — d-1 entry → d-5 final, 의미 chain 순서대로 작성) ----- */
  disputes: [
    /* ============================================================
     * d-1 — 사건 표면 frame entry (양측 인지, 외도/배신/표면 의심)
     * ============================================================ */
    {
      id: 'd-1',
      name: ko('[TODO: d-1 이름 — 사건 표면 frame]'),
      truth: true,
      truthDescription: ko('[TODO: d-1 진실 (1~2 문장) — 표면 frame이 무엇으로 무너지는지]'),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: false,
      v3Visibility: 'initial',
      correctResponsibility: { a: 40, b: 60 },
      mediationLink: '[TODO: d-1 mediation link 키워드]',
      requiredEvidence: ['e-1', 'e-2', 'e-3'],
      judgmentStatement: ko('[TODO: d-1 판결 영역 한 문장]'),
      verdictOptions: {
        wrong: ko('[TODO: d-1 wrong 판결 — 표면 frame 그대로 채택 시]'),
        partial: ko('[TODO: d-1 partial 판결 — 부분 인정]'),
        truth: ko('[TODO: d-1 truth 판결 — 진실 채택]'),
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
      /* d-1 truthStages — S0~S5 단계별 양측 진술 정의. 60 entry 중 12개.
       * forbiddenKeywords는 truth-leak-matrix.hidden으로 자동 derive (truthLeakOverride 영역과 별개). */
      truthStages: {
        S0: {
          a: {
            admittedFact: ko('[TODO d-1 S0 A admittedFact — A 측 표면 단정 발화]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S0 A answerFrame — LLM 자유 심문 가이드]'),
            transitionTrigger: null,
            transitionBeat: null,
          },
          b: {
            admittedFact: ko('[TODO d-1 S0 B admittedFact — B 측 표면 부정 발화]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S0 B answerFrame]'),
            transitionTrigger: null,
            transitionBeat: null,
          },
        },
        S1: {
          a: {
            admittedFact: ko('[TODO d-1 S1 A admittedFact — A 단정에서 한 발 물러남]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S1 A answerFrame]'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('[TODO d-1 S1 A transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S1 A behaviorHint]'),
            },
          },
          b: {
            admittedFact: ko('[TODO d-1 S1 B admittedFact — B 모호어 표현]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S1 B answerFrame]'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('[TODO d-1 S1 B transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S1 B behaviorHint]'),
            },
          },
        },
        S2: {
          a: {
            admittedFact: ko('[TODO d-1 S2 A admittedFact — A 동기 frame으로 이동]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S2 A answerFrame]'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('[TODO d-1 S2 A transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S2 A behaviorHint]'),
            },
          },
          b: {
            admittedFact: ko('[TODO d-1 S2 B admittedFact — B 일부 인정]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S2 B answerFrame]'),
            transitionTrigger: 'motive',
            transitionBeat: {
              line: ko('[TODO d-1 S2 B transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S2 B behaviorHint]'),
            },
          },
        },
        S3: {
          a: {
            admittedFact: ko('[TODO d-1 S3 A admittedFact — A 핵심 frame 흔들림]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S3 A answerFrame]'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('[TODO d-1 S3 A transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S3 A behaviorHint]'),
            },
          },
          b: {
            admittedFact: ko('[TODO d-1 S3 B admittedFact — B 핵심 사실 시인]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S3 B answerFrame]'),
            transitionTrigger: 'hard_evidence',
            transitionBeat: {
              line: ko('[TODO d-1 S3 B transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S3 B behaviorHint]'),
            },
          },
        },
        S4: {
          a: {
            admittedFact: ko('[TODO d-1 S4 A admittedFact — A 동기/심리 인정]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S4 A answerFrame]'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('[TODO d-1 S4 A transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S4 A behaviorHint]'),
            },
          },
          b: {
            admittedFact: ko('[TODO d-1 S4 B admittedFact — B 동기/감정 인정]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S4 B answerFrame]'),
            transitionTrigger: 'empathy',
            transitionBeat: {
              line: ko('[TODO d-1 S4 B transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S4 B behaviorHint]'),
            },
          },
        },
        S5: {
          a: {
            admittedFact: ko('[TODO d-1 S5 A admittedFact — A 진실 완전 인정]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S5 A answerFrame]'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('[TODO d-1 S5 A transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S5 A behaviorHint]'),
            },
          },
          b: {
            admittedFact: ko('[TODO d-1 S5 B admittedFact — B 진실 완전 인정]'),
            allowedKeywords: koKeywords(),
            forbiddenKeywords: keywords([], [], [], []),
            answerFrame: ko('[TODO d-1 S5 B answerFrame]'),
            transitionTrigger: 'direct',
            transitionBeat: {
              line: ko('[TODO d-1 S5 B transitionBeat.line]'),
              behaviorHint: ko('[TODO d-1 S5 B behaviorHint]'),
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
          surfaceClaim: ko('[TODO d-1 S0 surfaceClaim]'),
          hiddenTruth: ko('[TODO d-1 S0 hiddenTruth — 양측 인지 frame]'),
          validActions: ['fact_pursuit', 'motive_search'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S1: {
          surfaceClaim: ko('[TODO d-1 S1 surfaceClaim]'),
          hiddenTruth: ko('[TODO d-1 S1 hiddenTruth]'),
          validActions: ['motive_search', 'evidence_query'],
          requiredEvidence: ['e-1'],
          requiredWitness: [],
          successUnlocks: ['e-2'],
        },
        S2: {
          surfaceClaim: ko('[TODO d-1 S2 surfaceClaim]'),
          hiddenTruth: ko('[TODO d-1 S2 hiddenTruth]'),
          validActions: ['evidence_query', 'empathy_approach'],
          requiredEvidence: ['e-2', 'e-3'],
          requiredWitness: [],
          successUnlocks: ['dc-1'],
        },
        S3: {
          surfaceClaim: ko('[TODO d-1 S3 surfaceClaim]'),
          hiddenTruth: ko('[TODO d-1 S3 hiddenTruth]'),
          validActions: ['empathy_approach', 'evidence_query'],
          requiredEvidence: ['e-3'],
          requiredWitness: ['w-1'],
          successUnlocks: ['dc-2', 'd-2'],
        },
        S4: {
          surfaceClaim: ko('[TODO d-1 S4 surfaceClaim]'),
          hiddenTruth: ko('[TODO d-1 S4 hiddenTruth]'),
          validActions: ['empathy_approach'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
        S5: {
          surfaceClaim: ko('[TODO d-1 S5 surfaceClaim — 진실 완전 인정]'),
          hiddenTruth: ko('—'),
          validActions: ['fact_pursuit'],
          requiredEvidence: [],
          requiredWitness: [],
          successUnlocks: [],
        },
      },
    },

    /* ============================================================
     * d-2 — d-1 진실 확인 후 부상하는 동기 영역 (b_only frame)
     * ============================================================ */
    {
      id: 'd-2',
      name: ko('[TODO: d-2 이름 — 동기 / 깊은 영역]'),
      truth: true,
      truthDescription: ko('[TODO: d-2 진실]'),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: false,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 30, b: 70 },
      mediationLink: '[TODO: d-2 mediation link]',
      requiredEvidence: ['e-4'],
      judgmentStatement: ko('[TODO: d-2 판결 한 문장]'),
      unlockCondition: {
        requireDispute: { id: 'd-1', minState: 'S3' },
        runtimeRule: ko('d-1 S3 이상 도달 시 d-2 등장'),
        authoredRule: ko('[TODO: d-2 등장 룰 — d-1 표면이 무너지면 어떤 단서로 새 쟁점 부상]'),
      },
      verdictOptions: {
        wrong: ko('[TODO: d-2 wrong]'),
        partial: ko('[TODO: d-2 partial]'),
        truth: ko('[TODO: d-2 truth]'),
        defer: ko('판단을 유보한다.'),
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
      truthStages: {
        S0: {
          a: { admittedFact: ko('[TODO d-2 S0 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S0 A frame]'), transitionTrigger: null, transitionBeat: null },
          b: { admittedFact: ko('[TODO d-2 S0 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S0 B frame]'), transitionTrigger: null, transitionBeat: null },
        },
        S1: {
          a: { admittedFact: ko('[TODO d-2 S1 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S1 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-2 S1 A line]'), behaviorHint: ko('[TODO d-2 S1 A hint]') } },
          b: { admittedFact: ko('[TODO d-2 S1 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S1 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-2 S1 B line]'), behaviorHint: ko('[TODO d-2 S1 B hint]') } },
        },
        S2: {
          a: { admittedFact: ko('[TODO d-2 S2 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S2 A frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-2 S2 A line]'), behaviorHint: ko('[TODO d-2 S2 A hint]') } },
          b: { admittedFact: ko('[TODO d-2 S2 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S2 B frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-2 S2 B line]'), behaviorHint: ko('[TODO d-2 S2 B hint]') } },
        },
        S3: {
          a: { admittedFact: ko('[TODO d-2 S3 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S3 A frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-2 S3 A line]'), behaviorHint: ko('[TODO d-2 S3 A hint]') } },
          b: { admittedFact: ko('[TODO d-2 S3 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S3 B frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-2 S3 B line]'), behaviorHint: ko('[TODO d-2 S3 B hint]') } },
        },
        S4: {
          a: { admittedFact: ko('[TODO d-2 S4 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S4 A frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-2 S4 A line]'), behaviorHint: ko('[TODO d-2 S4 A hint]') } },
          b: { admittedFact: ko('[TODO d-2 S4 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S4 B frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-2 S4 B line]'), behaviorHint: ko('[TODO d-2 S4 B hint]') } },
        },
        S5: {
          a: { admittedFact: ko('[TODO d-2 S5 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S5 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-2 S5 A line]'), behaviorHint: ko('[TODO d-2 S5 A hint]') } },
          b: { admittedFact: ko('[TODO d-2 S5 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-2 S5 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-2 S5 B line]'), behaviorHint: ko('[TODO d-2 S5 B hint]') } },
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
        S0: { surfaceClaim: ko('[TODO d-2 S0 surface]'), hiddenTruth: ko('[TODO d-2 S0 hidden]'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S1: { surfaceClaim: ko('[TODO d-2 S1 surface]'), hiddenTruth: ko('[TODO d-2 S1 hidden]'), validActions: ['evidence_query'], requiredEvidence: ['e-4'], requiredWitness: [], successUnlocks: [] },
        S2: { surfaceClaim: ko('[TODO d-2 S2 surface]'), hiddenTruth: ko('[TODO d-2 S2 hidden]'), validActions: ['motive_search', 'evidence_query'], requiredEvidence: ['e-4'], requiredWitness: [], successUnlocks: ['dc-3'] },
        S3: { surfaceClaim: ko('[TODO d-2 S3 surface]'), hiddenTruth: ko('[TODO d-2 S3 hidden]'), validActions: ['motive_search'], requiredEvidence: [], requiredWitness: ['w-2'], successUnlocks: ['d-3'] },
        S4: { surfaceClaim: ko('[TODO d-2 S4 surface]'), hiddenTruth: ko('[TODO d-2 S4 hidden]'), validActions: ['empathy_approach'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S5: { surfaceClaim: ko('진실 완전 인정'), hiddenTruth: ko('—'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
      },
    },

    /* ============================================================
     * d-3 — 금전 영역 (hidden, monetary, b_only). dc-3과 link.
     * ============================================================ */
    {
      id: 'd-3',
      name: ko('[TODO: d-3 이름 — 금전 흐름 / 사건 진전 영역]'),
      truth: true,
      truthDescription: ko('[TODO: d-3 진실 — 누가 / 얼마 / 어디로 / 동기]'),
      quadrant: 'b_only',
      weight: 'high',
      ambiguity: 'low',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 40, b: 60 },
      mediationLink: '[TODO: d-3 mediation link]',
      requiredEvidence: ['e-5', 'e-6'],
      judgmentStatement: ko('[TODO: d-3 판결 한 문장]'),
      unlockCondition: {
        requireDispute: { id: 'd-2', minState: 'S3' },
        runtimeRule: ko('d-2 S3 이상 도달 시 d-3 등장'),
        authoredRule: ko('[TODO: d-3 등장 룰]'),
      },
      verdictOptions: {
        wrong: ko('[TODO: d-3 wrong]'),
        partial: ko('[TODO: d-3 partial]'),
        truth: ko('[TODO: d-3 truth]'),
        defer: ko('판단을 유보한다.'),
      },
      lieConfig: {
        a: { lieType: 'LT-2', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false },
        b: { lieType: 'LT-6', lieIntensity: 'L3', lieMotive: 'financial_preservation', initialState: 'S0', collapseViaTrust: false },
      },
      truthStages: {
        S0: {
          a: { admittedFact: ko('[TODO d-3 S0 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S0 A frame]'), transitionTrigger: null, transitionBeat: null },
          b: { admittedFact: ko('[TODO d-3 S0 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S0 B frame]'), transitionTrigger: null, transitionBeat: null },
        },
        S1: {
          a: { admittedFact: ko('[TODO d-3 S1 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S1 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-3 S1 A line]'), behaviorHint: ko('[TODO d-3 S1 A hint]') } },
          b: { admittedFact: ko('[TODO d-3 S1 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S1 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-3 S1 B line]'), behaviorHint: ko('[TODO d-3 S1 B hint]') } },
        },
        S2: {
          a: { admittedFact: ko('[TODO d-3 S2 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S2 A frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-3 S2 A line]'), behaviorHint: ko('[TODO d-3 S2 A hint]') } },
          b: { admittedFact: ko('[TODO d-3 S2 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S2 B frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-3 S2 B line]'), behaviorHint: ko('[TODO d-3 S2 B hint]') } },
        },
        S3: {
          a: { admittedFact: ko('[TODO d-3 S3 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S3 A frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-3 S3 A line]'), behaviorHint: ko('[TODO d-3 S3 A hint]') } },
          b: { admittedFact: ko('[TODO d-3 S3 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S3 B frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-3 S3 B line]'), behaviorHint: ko('[TODO d-3 S3 B hint]') } },
        },
        S4: {
          a: { admittedFact: ko('[TODO d-3 S4 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S4 A frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-3 S4 A line]'), behaviorHint: ko('[TODO d-3 S4 A hint]') } },
          b: { admittedFact: ko('[TODO d-3 S4 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S4 B frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-3 S4 B line]'), behaviorHint: ko('[TODO d-3 S4 B hint]') } },
        },
        S5: {
          a: { admittedFact: ko('[TODO d-3 S5 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S5 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-3 S5 A line]'), behaviorHint: ko('[TODO d-3 S5 A hint]') } },
          b: { admittedFact: ko('[TODO d-3 S5 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-3 S5 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-3 S5 B line]'), behaviorHint: ko('[TODO d-3 S5 B hint]') } },
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
        S0: { surfaceClaim: ko('[TODO d-3 S0 surface]'), hiddenTruth: ko('[TODO d-3 S0 hidden]'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S1: { surfaceClaim: ko('[TODO d-3 S1 surface]'), hiddenTruth: ko('[TODO d-3 S1 hidden]'), validActions: ['evidence_query'], requiredEvidence: ['e-5'], requiredWitness: [], successUnlocks: [] },
        S2: { surfaceClaim: ko('[TODO d-3 S2 surface]'), hiddenTruth: ko('[TODO d-3 S2 hidden]'), validActions: ['motive_search', 'evidence_query'], requiredEvidence: ['e-5', 'e-6'], requiredWitness: ['w-2'], successUnlocks: ['dc-3'] },
        S3: { surfaceClaim: ko('[TODO d-3 S3 surface]'), hiddenTruth: ko('[TODO d-3 S3 hidden]'), validActions: ['motive_search'], requiredEvidence: ['e-6'], requiredWitness: [], successUnlocks: ['d-4'] },
        S4: { surfaceClaim: ko('[TODO d-3 S4 surface]'), hiddenTruth: ko('[TODO d-3 S4 hidden]'), validActions: ['empathy_approach'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S5: { surfaceClaim: ko('진실 완전 인정'), hiddenTruth: ko('—'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
      },
    },

    /* ============================================================
     * d-4 — 절차/적법성 위반 영역 (hidden, monetary, a_only).
     * ============================================================ */
    {
      id: 'd-4',
      name: ko('[TODO: d-4 이름 — 절차 / 적법성 위반]'),
      truth: true,
      truthDescription: ko('[TODO: d-4 진실 — A 측 위반 행위 명시]'),
      quadrant: 'a_only',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: true,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 70, b: 30 },
      mediationLink: '[TODO: d-4 mediation link]',
      requiredEvidence: ['e-6'],
      judgmentStatement: ko('[TODO: d-4 판결]'),
      unlockCondition: {
        requireDispute: { id: 'd-3', minState: 'S3' },
        runtimeRule: ko('d-3 S3 이상 도달 시 d-4 등장'),
        authoredRule: ko('[TODO: d-4 등장 룰]'),
      },
      verdictOptions: {
        wrong: ko('[TODO: d-4 wrong]'),
        partial: ko('[TODO: d-4 partial]'),
        truth: ko('[TODO: d-4 truth]'),
        defer: ko('판단을 유보한다.'),
      },
      lieConfig: {
        a: { lieType: 'LT-2', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false },
        b: { lieType: 'LT-2', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false },
      },
      truthStages: {
        S0: {
          a: { admittedFact: ko('[TODO d-4 S0 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S0 A frame]'), transitionTrigger: null, transitionBeat: null },
          b: { admittedFact: ko('[TODO d-4 S0 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S0 B frame]'), transitionTrigger: null, transitionBeat: null },
        },
        S1: {
          a: { admittedFact: ko('[TODO d-4 S1 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S1 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-4 S1 A line]'), behaviorHint: ko('[TODO d-4 S1 A hint]') } },
          b: { admittedFact: ko('[TODO d-4 S1 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S1 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-4 S1 B line]'), behaviorHint: ko('[TODO d-4 S1 B hint]') } },
        },
        S2: {
          a: { admittedFact: ko('[TODO d-4 S2 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S2 A frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-4 S2 A line]'), behaviorHint: ko('[TODO d-4 S2 A hint]') } },
          b: { admittedFact: ko('[TODO d-4 S2 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S2 B frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-4 S2 B line]'), behaviorHint: ko('[TODO d-4 S2 B hint]') } },
        },
        S3: {
          a: { admittedFact: ko('[TODO d-4 S3 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S3 A frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-4 S3 A line]'), behaviorHint: ko('[TODO d-4 S3 A hint]') } },
          b: { admittedFact: ko('[TODO d-4 S3 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S3 B frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-4 S3 B line]'), behaviorHint: ko('[TODO d-4 S3 B hint]') } },
        },
        S4: {
          a: { admittedFact: ko('[TODO d-4 S4 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S4 A frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-4 S4 A line]'), behaviorHint: ko('[TODO d-4 S4 A hint]') } },
          b: { admittedFact: ko('[TODO d-4 S4 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S4 B frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-4 S4 B line]'), behaviorHint: ko('[TODO d-4 S4 B hint]') } },
        },
        S5: {
          a: { admittedFact: ko('[TODO d-4 S5 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S5 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-4 S5 A line]'), behaviorHint: ko('[TODO d-4 S5 A hint]') } },
          b: { admittedFact: ko('[TODO d-4 S5 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-4 S5 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-4 S5 B line]'), behaviorHint: ko('[TODO d-4 S5 B hint]') } },
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
        S0: { surfaceClaim: ko('[TODO d-4 S0 surface]'), hiddenTruth: ko('[TODO d-4 S0 hidden]'), validActions: ['fact_pursuit', 'evidence_query'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S1: { surfaceClaim: ko('[TODO d-4 S1 surface]'), hiddenTruth: ko('[TODO d-4 S1 hidden]'), validActions: ['evidence_query'], requiredEvidence: ['e-6'], requiredWitness: [], successUnlocks: [] },
        S2: { surfaceClaim: ko('[TODO d-4 S2 surface]'), hiddenTruth: ko('[TODO d-4 S2 hidden]'), validActions: ['motive_search', 'evidence_query'], requiredEvidence: ['e-6'], requiredWitness: ['w-2'], successUnlocks: ['dc-4'] },
        S3: { surfaceClaim: ko('[TODO d-4 S3 surface]'), hiddenTruth: ko('[TODO d-4 S3 hidden]'), validActions: ['evidence_query'], requiredEvidence: ['e-6'], requiredWitness: [], successUnlocks: ['d-5'] },
        S4: { surfaceClaim: ko('[TODO d-4 S4 surface]'), hiddenTruth: ko('[TODO d-4 S4 hidden]'), validActions: ['empathy_approach'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S5: { surfaceClaim: ko('완전 인정'), hiddenTruth: ko('—'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
      },
    },

    /* ============================================================
     * d-5 — 결과 / 책임 분리 (both_know, d-3+d-4 unlock 필요).
     * ============================================================ */
    {
      id: 'd-5',
      name: ko('[TODO: d-5 이름 — 책임 분리 / 결과 영역]'),
      truth: true,
      truthDescription: ko('[TODO: d-5 진실 — 양측 책임 비중]'),
      quadrant: 'both_know',
      weight: 'high',
      ambiguity: 'high',
      legitimacyIssue: false,
      hidden: true,
      v3Visibility: 'hidden',
      correctResponsibility: { a: 50, b: 50 },
      mediationLink: '[TODO: d-5 mediation link]',
      requiredEvidence: ['e-7'],
      judgmentStatement: ko('[TODO: d-5 판결]'),
      unlockCondition: {
        requireDispute: [
          { id: 'd-3', minState: 'S3' },
          { id: 'd-4', minState: 'S3' },
        ],
        runtimeRule: ko('d-3 S3 + d-4 S3 양측 도달 시 d-5 등장'),
        authoredRule: ko('[TODO: d-5 등장 룰 — 양 dispute 진실 확정 후 책임 분리 영역 부상]'),
      },
      verdictOptions: {
        wrong: ko('[TODO: d-5 wrong]'),
        partial: ko('[TODO: d-5 partial]'),
        truth: ko('[TODO: d-5 truth]'),
        defer: ko('판단을 유보한다.'),
      },
      lieConfig: {
        a: { lieType: 'LT-2', lieIntensity: 'L1', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: true },
        b: { lieType: 'LT-2', lieIntensity: 'L1', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false },
      },
      truthStages: {
        S0: {
          a: { admittedFact: ko('[TODO d-5 S0 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S0 A frame]'), transitionTrigger: null, transitionBeat: null },
          b: { admittedFact: ko('[TODO d-5 S0 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S0 B frame]'), transitionTrigger: null, transitionBeat: null },
        },
        S1: {
          a: { admittedFact: ko('[TODO d-5 S1 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S1 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-5 S1 A line]'), behaviorHint: ko('[TODO d-5 S1 A hint]') } },
          b: { admittedFact: ko('[TODO d-5 S1 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S1 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-5 S1 B line]'), behaviorHint: ko('[TODO d-5 S1 B hint]') } },
        },
        S2: {
          a: { admittedFact: ko('[TODO d-5 S2 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S2 A frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-5 S2 A line]'), behaviorHint: ko('[TODO d-5 S2 A hint]') } },
          b: { admittedFact: ko('[TODO d-5 S2 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S2 B frame]'), transitionTrigger: 'motive', transitionBeat: { line: ko('[TODO d-5 S2 B line]'), behaviorHint: ko('[TODO d-5 S2 B hint]') } },
        },
        S3: {
          a: { admittedFact: ko('[TODO d-5 S3 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S3 A frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-5 S3 A line]'), behaviorHint: ko('[TODO d-5 S3 A hint]') } },
          b: { admittedFact: ko('[TODO d-5 S3 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S3 B frame]'), transitionTrigger: 'hard_evidence', transitionBeat: { line: ko('[TODO d-5 S3 B line]'), behaviorHint: ko('[TODO d-5 S3 B hint]') } },
        },
        S4: {
          a: { admittedFact: ko('[TODO d-5 S4 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S4 A frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-5 S4 A line]'), behaviorHint: ko('[TODO d-5 S4 A hint]') } },
          b: { admittedFact: ko('[TODO d-5 S4 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S4 B frame]'), transitionTrigger: 'empathy', transitionBeat: { line: ko('[TODO d-5 S4 B line]'), behaviorHint: ko('[TODO d-5 S4 B hint]') } },
        },
        S5: {
          a: { admittedFact: ko('[TODO d-5 S5 A]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S5 A frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-5 S5 A line]'), behaviorHint: ko('[TODO d-5 S5 A hint]') } },
          b: { admittedFact: ko('[TODO d-5 S5 B]'), allowedKeywords: koKeywords(), forbiddenKeywords: keywords([], [], [], []), answerFrame: ko('[TODO d-5 S5 B frame]'), transitionTrigger: 'direct', transitionBeat: { line: ko('[TODO d-5 S5 B line]'), behaviorHint: ko('[TODO d-5 S5 B hint]') } },
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
        S0: { surfaceClaim: ko('[TODO d-5 S0 surface]'), hiddenTruth: ko('[TODO d-5 S0 hidden]'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S1: { surfaceClaim: ko('[TODO d-5 S1 surface]'), hiddenTruth: ko('[TODO d-5 S1 hidden]'), validActions: ['evidence_query'], requiredEvidence: ['e-7'], requiredWitness: [], successUnlocks: [] },
        S2: { surfaceClaim: ko('[TODO d-5 S2 surface]'), hiddenTruth: ko('[TODO d-5 S2 hidden]'), validActions: ['motive_search', 'evidence_query'], requiredEvidence: ['e-7'], requiredWitness: ['w-3'], successUnlocks: ['dc-5'] },
        S3: { surfaceClaim: ko('[TODO d-5 S3 surface]'), hiddenTruth: ko('[TODO d-5 S3 hidden]'), validActions: ['evidence_query', 'motive_search'], requiredEvidence: ['e-7'], requiredWitness: [], successUnlocks: [] },
        S4: { surfaceClaim: ko('[TODO d-5 S4 surface]'), hiddenTruth: ko('[TODO d-5 S4 hidden]'), validActions: ['empathy_approach'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
        S5: { surfaceClaim: ko('완전 인정'), hiddenTruth: ko('—'), validActions: ['fact_pursuit'], requiredEvidence: [], requiredWitness: [], successUnlocks: [] },
      },
    },
  ],

  /* ----- evidence (7개: e-1 ~ e-7) -----
   *
   * ⚠ description은 surface-safe 유지 — stage 0(Stub) 노출 영역이라 truth lexeme 직접 포함 X.
   * 깊이 노출은 depthStages.original/context로 단계적 처리.
   * surfaceName ≠ name 분리 권장 (surfaceName = UI 안전 라벨, name = 내부 권위 이름). */
  evidence: [
    {
      id: 'e-1',
      name: ko('[TODO: e-1 이름 — 사건 표면 단서 1]'),
      surfaceName: ko('[TODO: e-1 surface 라벨]'),
      description: ko('[TODO: e-1 surface 묘사 — truth lexeme 직접 포함 X]'),
      surfaceDescription: ko('[TODO: e-1 surface 짧은 묘사]'),
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
        a: { questionAngle: ko('[TODO: e-1 A 측 질문 각도]'), implication: ko('[TODO: e-1 A 측 함의]') },
        b: { questionAngle: ko('[TODO: e-1 B 측 질문 각도]'), implication: ko('[TODO: e-1 B 측 함의]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-1 stub — 존재만 보임]') },
        { id: 'excerpt', summary: ko('[TODO: e-1 excerpt — 일부 발췌]') },
        { id: 'original', summary: ko('[TODO: e-1 original — 원본 / 전체본]') },
        { id: 'context', summary: ko('[TODO: e-1 context — 앞뒤 맥락 / 다른 evidence와 연결]') },
        { id: 'established', summary: ko('[TODO: e-1 established — 공식기록 채택 요약]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-1 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-1 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-1 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-1 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-1 misread]') },
      ],
    },
    {
      id: 'e-2',
      name: ko('[TODO: e-2 이름]'),
      surfaceName: ko('[TODO: e-2 surface 라벨]'),
      description: ko('[TODO: e-2 surface 묘사]'),
      surfaceDescription: ko('[TODO: e-2 surface 짧은 묘사]'),
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
        a: { questionAngle: ko('[TODO: e-2 A]'), implication: ko('[TODO: e-2 A]') },
        b: { questionAngle: ko('[TODO: e-2 B]'), implication: ko('[TODO: e-2 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-2 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-2 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-2 original]') },
        { id: 'context', summary: ko('[TODO: e-2 context]') },
        { id: 'established', summary: ko('[TODO: e-2 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-2 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-2 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-2 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-2 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-2 misread]') },
      ],
    },
    {
      id: 'e-3',
      name: ko('[TODO: e-3 이름]'),
      surfaceName: ko('[TODO: e-3 surface 라벨]'),
      description: ko('[TODO: e-3 surface 묘사 — surface-safe 유지]'),
      surfaceDescription: ko('[TODO: e-3 surface 짧은 묘사]'),
      type: 'log',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-1'],
      isTrap: false,
      requires: ['e-2'],
      partyContext: {
        a: { questionAngle: ko('[TODO: e-3 A]'), implication: ko('[TODO: e-3 A]') },
        b: { questionAngle: ko('[TODO: e-3 B]'), implication: ko('[TODO: e-3 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-3 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-3 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-3 original]') },
        { id: 'context', summary: ko('[TODO: e-3 context]') },
        { id: 'established', summary: ko('[TODO: e-3 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-3 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-3 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-3 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-3 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-3 misread]') },
      ],
    },
    {
      id: 'e-4',
      name: ko('[TODO: e-4 이름 — 깊이 영역, S1 봉인]'),
      surfaceName: ko('[TODO: e-4 surface 라벨]'),
      description: ko('[TODO: e-4 surface 묘사]'),
      surfaceDescription: ko('[TODO: e-4 surface 짧은 묘사]'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-2'],
      isTrap: false,
      requires: ['e-1'],
      /** ⚠ requiredLieState — d-1 unlock 흐름의 핵심 sealing. */
      requiredLieState: 'S1',
      partyContext: {
        a: { questionAngle: ko('[TODO: e-4 A]'), implication: ko('[TODO: e-4 A]') },
        b: { questionAngle: ko('[TODO: e-4 B]'), implication: ko('[TODO: e-4 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-4 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-4 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-4 original]') },
        { id: 'context', summary: ko('[TODO: e-4 context]') },
        { id: 'established', summary: ko('[TODO: e-4 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-4 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-4 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-4 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-4 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-4 misread]') },
      ],
      sensitiveSealTargets: {
        labels: [ko('[TODO: 봉인 대상 라벨 1]'), ko('[TODO: 봉인 대상 라벨 2]')],
        recommendedTiming: [ko('[TODO: 봉인 해제 권장 시점]')],
        risks: [ko('[TODO: 봉인 해제 시 리스크]')],
      },
    },
    {
      id: 'e-5',
      name: ko('[TODO: e-5 이름 — 금전 흐름 evidence, S2 봉인]'),
      surfaceName: ko('[TODO: e-5 surface 라벨]'),
      description: ko('[TODO: e-5 surface 묘사]'),
      surfaceDescription: ko('[TODO: e-5 surface 짧은 묘사]'),
      type: 'bank',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'b',
      proves: ['d-3'],
      isTrap: false,
      requires: ['e-4'],
      requiredLieState: 'S2',
      partyContext: {
        a: { questionAngle: ko('[TODO: e-5 A]'), implication: ko('[TODO: e-5 A]') },
        b: { questionAngle: ko('[TODO: e-5 B]'), implication: ko('[TODO: e-5 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-5 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-5 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-5 original]') },
        { id: 'context', summary: ko('[TODO: e-5 context]') },
        { id: 'established', summary: ko('[TODO: e-5 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-5 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-5 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-5 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-5 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-5 misread]') },
      ],
    },
    {
      id: 'e-6',
      name: ko('[TODO: e-6 이름 — 금전 + 절차 evidence, S2 봉인]'),
      surfaceName: ko('[TODO: e-6 surface 라벨]'),
      description: ko('[TODO: e-6 surface 묘사]'),
      surfaceDescription: ko('[TODO: e-6 surface 짧은 묘사]'),
      type: 'chat',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'self_possessed',
      legitimacy: 'lawful',
      subjectParty: 'a',
      proves: ['d-3', 'd-4'],
      isTrap: false,
      requires: ['e-4', 'e-5'],
      requiredLieState: 'S2',
      partyContext: {
        a: { questionAngle: ko('[TODO: e-6 A]'), implication: ko('[TODO: e-6 A]') },
        b: { questionAngle: ko('[TODO: e-6 B]'), implication: ko('[TODO: e-6 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-6 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-6 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-6 original]') },
        { id: 'context', summary: ko('[TODO: e-6 context]') },
        { id: 'established', summary: ko('[TODO: e-6 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-6 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-6 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-6 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-6 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-6 misread]') },
      ],
    },
    {
      id: 'e-7',
      name: ko('[TODO: e-7 이름 — 결정적 적법성 evidence, S3 봉인]'),
      surfaceName: ko('[TODO: e-7 surface 라벨]'),
      description: ko('[TODO: e-7 surface 묘사]'),
      surfaceDescription: ko('[TODO: e-7 surface 짧은 묘사]'),
      type: 'contract',
      reliability: 'hard',
      completeness: 'original',
      provenance: 'institutional',
      legitimacy: 'lawful',
      subjectParty: 'a',
      proves: ['d-5'],
      isTrap: false,
      requires: ['e-6'],
      requiredLieState: 'S3',
      partyContext: {
        a: { questionAngle: ko('[TODO: e-7 A]'), implication: ko('[TODO: e-7 A]') },
        b: { questionAngle: ko('[TODO: e-7 B]'), implication: ko('[TODO: e-7 B]') },
      },
      depthStages: [
        { id: 'stub', summary: ko('[TODO: e-7 stub]') },
        { id: 'excerpt', summary: ko('[TODO: e-7 excerpt]') },
        { id: 'original', summary: ko('[TODO: e-7 original]') },
        { id: 'context', summary: ko('[TODO: e-7 context]') },
        { id: 'established', summary: ko('[TODO: e-7 established]') },
      ],
      trustStates: [
        { id: 'submitted', summary: ko('[TODO: e-7 submitted]') },
        { id: 'verifying', summary: ko('[TODO: e-7 verifying]') },
        { id: 'authenticated', summary: ko('[TODO: e-7 authenticated]') },
        { id: 'challenged', summary: ko('[TODO: e-7 challenged]') },
        { id: 'misread', summary: ko('[TODO: e-7 misread]') },
      ],
    },
  ],

  /* ----- witnesses (3명) ----- */
  witnesses: [
    {
      id: 'w-1',
      name: ko('[TODO: w-1 이름]'),
      age: 50,
      gender: 'm',
      occupation: ko('[TODO: w-1 직업]'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko('[TODO: w-1 증언 scope — 무엇을 알고 모르는지]'),
      address: { fromA: ko('[TODO: A가 부르는 호칭]'), fromB: ko('[TODO: B가 부르는 호칭]') },
      hiddenAgenda: null,
      relatedDisputes: ['d-1'],
      unlockedByDossier: ['dc-1'],
      testimony: {
        byDispute: {
          'd-1': {
            canProve: [ko('[TODO: w-1 d-1 입증 가능 1]'), ko('[TODO: w-1 d-1 입증 가능 2]')],
            cannotDisprove: [ko('[TODO: w-1 d-1 부정 불가 1]'), ko('[TODO: w-1 d-1 부정 불가 2]')],
          },
        },
      },
    },
    {
      id: 'w-2',
      name: ko('[TODO: w-2 이름]'),
      age: 35,
      gender: 'f',
      occupation: ko('[TODO: w-2 직업]'),
      bias: 'neutral',
      distortionRisk: 'accurate',
      knowledgeScope: ko('[TODO: w-2 증언 scope]'),
      address: { fromA: ko('[TODO: A가 부르는 호칭]'), fromB: ko('[TODO: B가 부르는 호칭]') },
      hiddenAgenda: ko('[TODO: w-2 hidden agenda — 본인 책임 회피 등]'),
      relatedDisputes: ['d-3', 'd-4'],
      unlockedByDossier: ['dc-2', 'dc-3'],
      testimony: {
        byDispute: {
          'd-3': {
            canProve: [ko('[TODO: w-2 d-3 입증]')],
            cannotDisprove: [ko('[TODO: w-2 d-3 부정 불가]')],
          },
          'd-4': {
            canProve: [ko('[TODO: w-2 d-4 입증]')],
            cannotDisprove: [ko('[TODO: w-2 d-4 부정 불가]')],
          },
        },
      },
    },
    {
      id: 'w-3',
      name: ko('[TODO: w-3 이름]'),
      age: 35,
      gender: 'f',
      occupation: ko('[TODO: w-3 직업]'),
      bias: 'pro_a',
      distortionRisk: 'strategic',
      knowledgeScope: ko('[TODO: w-3 증언 scope]'),
      address: { fromA: ko('[TODO: A가 부르는 호칭]'), fromB: ko('[TODO: B가 부르는 호칭]') },
      hiddenAgenda: ko('[TODO: w-3 hidden agenda]'),
      relatedDisputes: ['d-5'],
      unlockedByDossier: ['dc-5'],
      testimony: {
        byDispute: {
          'd-5': {
            canProve: [ko('[TODO: w-3 d-5 입증]')],
            cannotDisprove: [ko('[TODO: w-3 d-5 부정 불가]')],
          },
        },
      },
    },
  ],

  /* ----- dossierCards (5개: dc-1 ~ dc-5) -----
   *
   * ⚠ 사용자 결정 영역:
   *   - linkedDisputes: 1 dispute 단일 link (strict) 또는 2 dispute 동시 영향 (max 2)
   *   - linkedParty: 단일 a/b strict (양측 자료 혼동 차단)
   *   - challenges: a/b 양측 또는 단일 측만 보유 가능 (양측 책임축 표현 시 양측 모두) */
  dossierCards: [
    {
      id: 'dc-1',
      label: ko('[TODO: dc-1 라벨 — 사건 표면 반전 카드]'),
      description: ko('[TODO: dc-1 묘사]'),
      type: 'derived_note',
      linkedDisputes: ['d-1'],
      linkedParty: 'b',
      linkedEvidence: ['e-1', 'e-2'],
      leadLine: {
        id: 'L-1',
        name: ko('Timeline Lead'),
        leadType: 'Timeline',
        firstInputs: ['e-1', 'e-2'],
        secondInputs: ['L-1', 'e-3'],
        interpretationChoices: [
          { id: 'L-1-A', text: ko('[TODO: dc-1 해석 A]'), implication: ko('[TODO: dc-1 해석 A 함의]') },
          { id: 'L-1-B', text: ko('[TODO: dc-1 해석 B]'), implication: ko('[TODO: dc-1 해석 B 함의]') },
          { id: 'L-1-C', text: ko('[TODO: dc-1 해석 C]'), implication: ko('[TODO: dc-1 해석 C 함의]') },
        ],
      },
      noteText: ko('[TODO: dc-1 노트 본문 — 카드 발동 후 표시될 진실 일부 (surface-safe 단계)]'),
      successConditionSummary: [
        ko('[TODO: dc-1 발동 조건 1]'),
        ko('[TODO: dc-1 발동 조건 2]'),
      ],
      successEffects: [
        ko('[TODO: dc-1 발동 효과 1]'),
        ko('[TODO: dc-1 발동 효과 2]'),
      ],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-1' },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-1', weight: 'high', ambiguity: 'low' } },
      ],
      judgeHint: ko('[TODO: dc-1 재판관 힌트 — 다음 단계 가이드]'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-1.b.q1',
              text: ko('[TODO: dc-1 B 측 challenge 질문 1]'),
              lockedHint: ko('[TODO: dc-1 b q1 잠금 힌트]'),
              attackVector: 'context',
              requiredLieState: 'S2',
              onSuccess: { blockVector: 'context', revealAtom: 'template:b:d-1:S3:0', lieAdvance: true },
            },
          ],
        },
      },
    },
    {
      id: 'dc-2',
      label: ko('[TODO: dc-2 라벨 — 동기 영역 카드]'),
      description: ko('[TODO: dc-2 묘사]'),
      type: 'derived_note',
      /** 사용자 결정 영역: dc-2는 d-1 + d-2 양측 영향 (max 2 link 활용 사례). */
      linkedDisputes: ['d-1', 'd-2'],
      linkedParty: 'b',
      linkedEvidence: ['e-3', 'e-4'],
      leadLine: {
        id: 'L-2',
        name: ko('Context Lead'),
        leadType: 'Context',
        firstInputs: ['e-3', 'stmt-b-motive'],
        secondInputs: ['L-2', 'e-4'],
        interpretationChoices: [
          { id: 'L-2-A', text: ko('[TODO: dc-2 해석 A]'), implication: ko('[TODO: dc-2 해석 A 함의]') },
          { id: 'L-2-B', text: ko('[TODO: dc-2 해석 B]'), implication: ko('[TODO: dc-2 해석 B 함의]') },
        ],
      },
      noteText: ko('[TODO: dc-2 노트 본문]'),
      successConditionSummary: [ko('[TODO: dc-2 발동 조건 1]'), ko('[TODO: dc-2 발동 조건 2]')],
      successEffects: [ko('[TODO: dc-2 발동 효과 1]'), ko('[TODO: dc-2 발동 효과 2]')],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-2' },
        { kind: 'upgrade_evidence', evidenceUpgrade: { evidenceId: 'e-4', toReliability: 'hard' } },
      ],
      judgeHint: ko('[TODO: dc-2 재판관 힌트]'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-2.b.q1',
              text: ko('[TODO: dc-2 B challenge 질문]'),
              lockedHint: ko('[TODO: dc-2 b q1 잠금 힌트]'),
              attackVector: 'motive',
              requiredLieState: 'S3',
              onSuccess: { blockVector: 'motive', revealAtom: 'template:b:d-1:S4:0', lieAdvance: true },
            },
          ],
        },
      },
    },
    {
      id: 'dc-3',
      label: ko('[TODO: dc-3 라벨 — 금전 흐름 카드]'),
      description: ko('[TODO: dc-3 묘사]'),
      type: 'derived_note',
      linkedDisputes: ['d-3'],
      linkedParty: 'b',
      linkedEvidence: ['e-4', 'e-5'],
      leadLine: {
        id: 'L-3',
        name: ko('Beneficiary Lead'),
        leadType: 'Beneficiary',
        firstInputs: ['e-4', 'e-5'],
        secondInputs: ['L-3', 'stmt-b-motive'],
        interpretationChoices: [
          { id: 'L-3-A', text: ko('[TODO: dc-3 해석 A]'), implication: ko('[TODO: dc-3 해석 A 함의]') },
          { id: 'L-3-B', text: ko('[TODO: dc-3 해석 B]'), implication: ko('[TODO: dc-3 해석 B 함의]') },
        ],
      },
      noteText: ko('[TODO: dc-3 노트 본문]'),
      successConditionSummary: [ko('[TODO: dc-3 발동 조건 1]'), ko('[TODO: dc-3 발동 조건 2]')],
      successEffects: [ko('[TODO: dc-3 발동 효과 1]'), ko('[TODO: dc-3 발동 효과 2]')],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-3' },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-3', weight: 'high', ambiguity: 'low' } },
      ],
      judgeHint: ko('[TODO: dc-3 재판관 힌트]'),
      challenges: {
        b: {
          questions: [
            {
              id: 'dc-3.b.q1',
              text: ko('[TODO: dc-3 B challenge 질문]'),
              lockedHint: ko('[TODO: dc-3 b q1 잠금 힌트]'),
              attackVector: 'responsibility',
              requiredLieState: 'S3',
              onSuccess: { blockVector: 'responsibility', revealAtom: 'template:b:d-3:S4:0', lieAdvance: true },
            },
          ],
        },
      },
    },
    {
      id: 'dc-4',
      label: ko('[TODO: dc-4 라벨 — 절차 위반 카드]'),
      description: ko('[TODO: dc-4 묘사]'),
      type: 'derived_note',
      linkedDisputes: ['d-4'],
      linkedParty: 'a',
      linkedEvidence: ['e-6'],
      leadLine: {
        id: 'L-4',
        name: ko('Procedure Lead'),
        leadType: 'Procedure',
        firstInputs: ['e-6', 'stmt-a-protect'],
        secondInputs: ['L-4'],
        interpretationChoices: [
          { id: 'L-4-A', text: ko('[TODO: dc-4 해석 A]'), implication: ko('[TODO: dc-4 해석 A 함의]') },
          { id: 'L-4-B', text: ko('[TODO: dc-4 해석 B]'), implication: ko('[TODO: dc-4 해석 B 함의]') },
        ],
      },
      noteText: ko('[TODO: dc-4 노트 본문]'),
      successConditionSummary: [ko('[TODO: dc-4 발동 조건 1]'), ko('[TODO: dc-4 발동 조건 2]')],
      successEffects: [ko('[TODO: dc-4 발동 효과 1]'), ko('[TODO: dc-4 발동 효과 2]')],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-4' },
        { kind: 'unlock_dispute', unlockNodeId: 'd-4' },
      ],
      judgeHint: ko('[TODO: dc-4 재판관 힌트]'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-4.a.q1',
              text: ko('[TODO: dc-4 A challenge 질문]'),
              lockedHint: ko('[TODO: dc-4 a q1 잠금 힌트]'),
              attackVector: 'legitimacy',
              requiredLieState: 'S2',
              onSuccess: { blockVector: 'legitimacy', revealAtom: 'template:a:d-4:S3:0', lieAdvance: true },
            },
          ],
        },
      },
    },
    {
      id: 'dc-5',
      label: ko('[TODO: dc-5 라벨 — 책임 분리 / 결과 카드]'),
      description: ko('[TODO: dc-5 묘사]'),
      type: 'derived_note',
      linkedDisputes: ['d-5'],
      linkedParty: 'a',
      linkedEvidence: ['e-7'],
      noteText: ko('[TODO: dc-5 노트 본문]'),
      successConditionSummary: [ko('[TODO: dc-5 발동 조건 1]'), ko('[TODO: dc-5 발동 조건 2]')],
      successEffects: [ko('[TODO: dc-5 발동 효과 1]'), ko('[TODO: dc-5 발동 효과 2]')],
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'dc-5' },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-5', weight: 'high', ambiguity: 'low' } },
      ],
      judgeHint: ko('[TODO: dc-5 재판관 힌트]'),
      challenges: {
        a: {
          questions: [
            {
              id: 'dc-5.a.q1',
              text: ko('[TODO: dc-5 A challenge 질문]'),
              lockedHint: ko('[TODO: dc-5 a q1 잠금 힌트]'),
              attackVector: 'fact',
              requiredLieState: 'S3',
              onSuccess: { blockVector: 'fact', revealAtom: 'template:a:d-5:S4:0', lieAdvance: true },
            },
          ],
        },
      },
    },
  ],

  /* ----- combinationRecipes —
   *  outputs는 dossier 또는 evidence id 참조. statement_combine은 stmt-* / L-* inputs 가능.
   *  cost: 1~3 (UI 사용 비용). gate.requiredEvidenceStages / requiredTruthStage로 노출 조건. */
  combinationRecipes: [
    {
      id: 'combine-1',
      inputs: ['e-1', 'e-2'],
      cost: 1,
      outputId: 'dc-1',
      discoveryText: ko('[TODO: combine-1 발견 텍스트 — 두 evidence가 어떻게 연결되는지]'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-1': 'excerpt', 'e-2': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('[TODO: combine-1 fallback — gate 미달성 시 안전 텍스트]'),
    },
    {
      id: 'combine-2',
      inputs: ['e-3', 'e-4'],
      cost: 2,
      outputId: 'dc-2',
      discoveryText: ko('[TODO: combine-2 발견 텍스트]'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-3': 'original', 'e-4': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('[TODO: combine-2 fallback]'),
    },
    {
      id: 'combine-3',
      inputs: ['e-4', 'e-5'],
      cost: 2,
      outputId: 'dc-3',
      discoveryText: ko('[TODO: combine-3 발견 텍스트]'),
      route: 'evidence_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-4': 'original', 'e-5': 'original' },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('[TODO: combine-3 fallback]'),
    },
    {
      id: 'combine-4',
      inputs: ['e-6', 'stmt-a-protect'],
      cost: 2,
      outputId: 'dc-4',
      discoveryText: ko('[TODO: combine-4 발견 텍스트]'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-6': 'original' },
        requiredTruthStage: { 'd-4': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('[TODO: combine-4 fallback]'),
    },
    {
      id: 'combine-5',
      inputs: ['e-7', 'stmt-a-procedure'],
      cost: 2,
      outputId: 'dc-5',
      discoveryText: ko('[TODO: combine-5 발견 텍스트]'),
      route: 'statement_combine',
      gate: {
        allowedChannels: ['evidence_present', 'dossier'],
        requiredEvidenceStages: { 'e-7': 'original' },
        requiredTruthStage: { 'd-5': 2 },
        autoSurfaceAllowed: false,
      },
      surfaceFallback: ko('[TODO: combine-5 fallback]'),
    },
  ],

  /* ----- authorityPlacements — 재판관 추천 모먼트 ----- */
  authorityPlacements: [
    {
      action: ko('원본 제출 명령'),
      recommendedMoment: ko('[TODO: d-1 초반 e-1/e-2 Excerpt 시점]'),
      purpose: ko('[TODO: 추천 목적]'),
      contextDispute: 'd-1',
    },
    {
      action: ko('정확히 답변하십시오'),
      recommendedMoment: ko('[TODO: B 모호어 반복 시점]'),
      purpose: ko('[TODO: 추천 목적]'),
      contextDispute: 'd-1',
    },
    {
      action: ko('분리심문'),
      recommendedMoment: ko('[TODO: e-4 Original 직후]'),
      purpose: ko('[TODO: 추천 목적]'),
      contextDispute: 'd-2',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('[TODO: e-5 인증 후]'),
      purpose: ko('[TODO: 추천 목적]'),
      contextDispute: 'd-3',
    },
    {
      action: ko('잠정 인정'),
      recommendedMoment: ko('[TODO: e-6 인증 후]'),
      purpose: ko('[TODO: 추천 목적]'),
      contextDispute: 'd-4',
    },
    {
      action: ko('선처 창구'),
      recommendedMoment: ko('[TODO: dc-3 또는 dc-4 직후]'),
      purpose: ko('[TODO: 추천 목적]'),
    },
    {
      action: ko('발언 제지 / 기록 제외'),
      recommendedMoment: ko('[TODO: frame 싸움 반복 시점]'),
      purpose: ko('[TODO: 추천 목적]'),
    },
  ],

  /* ----- officialRecordRecommendations — 사건 종결 후 권고 기록 ----- */
  officialRecordRecommendations: [
    ko('[TODO: 권고 기록 1 — A 측 행위 사실]'),
    ko('[TODO: 권고 기록 2 — B 측 행위 사실]'),
    ko('[TODO: 권고 기록 3 — 양측 책임 분리]'),
    ko('[TODO: 권고 기록 4 — 결과 / 손실]'),
    ko('[TODO: 권고 기록 5 — 후속 절차 권고]'),
  ],

  /* ----- solutions — mediation/판결 카테고리별 ----- */
  solutions: {
    카테고리1: [
      ko('[TODO: 카테고리 1 해결안 1]'),
      ko('[TODO: 카테고리 1 해결안 2]'),
    ],
    카테고리2: [
      ko('[TODO: 카테고리 2 해결안 1]'),
      ko('[TODO: 카테고리 2 해결안 2]'),
    ],
    카테고리3: [
      ko('[TODO: 카테고리 3 해결안 1]'),
      ko('[TODO: 카테고리 3 해결안 2]'),
    ],
  },

  /* ----- relationshipLedger (4 entry 권장) ----- */
  relationshipLedger: [
    {
      id: 'ledger-1',
      category: 'distorted',
      description: ko('[TODO: ledger-1 묘사 — 표면 frame 왜곡]'),
      isReal: true,
      whoRemembersAccurately: 'neither',
      whoDistorts: 'both',
      distortionDirection: ko('[TODO: 왜곡 방향]'),
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-2',
      category: 'silenced',
      description: ko('[TODO: ledger-2 묘사 — B 측 침묵 동기]'),
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-3',
      category: 'pressured',
      description: ko('[TODO: ledger-3 묘사 — A 측 압박/공포]'),
      isReal: true,
      whoRemembersAccurately: 'a',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'medium',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-4',
      category: 'distant',
      description: ko('[TODO: ledger-4 묘사 — 양측 거리감]'),
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'none',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'medium',
      connectionToCurrent: 'indirect',
    },
  ],

  /* ----- flags ----- */
  /** PC 증거 표면화 기본 3장. 사용자 결정 영역 — 표면 entry 단서 3개. */
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  /** 금전 쟁점 — 사용자 결정 영역 (비금전 사건의 경우 빈 배열). */
  monetaryDisputeIds: ['d-3', 'd-4'],
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],

  /* ----- uiExposure — UI 필드별 노출 게이트 (η) -----
   *
   * 모든 사건 공통 8 필드 게이트. 사건별 추가 필드 필요 시 더 채움.
   * gate enum: always | after_advanced_turns | after_shaken | after_any_collapse |
   *            after_all_collapse | after_dispute_truth | after_verdict | never */
  uiExposure: {
    fieldPolicy: {
      'partyA.fear': { gate: 'after_any_collapse', hintLocked: ko('거짓말 완전 붕괴 시 해금') },
      'partyB.fear': { gate: 'after_any_collapse', hintLocked: ko('거짓말 완전 붕괴 시 해금') },
      'partyA.sensitivePoints': { gate: 'after_any_collapse', hintLocked: ko('거짓말 완전 붕괴 시 해금') },
      'partyB.sensitivePoints': { gate: 'after_any_collapse', hintLocked: ko('거짓말 완전 붕괴 시 해금') },
      'partyA.dailyRoutine': { gate: 'after_shaken', hintLocked: ko('감정 변화 유발 시 해금') },
      'partyB.dailyRoutine': { gate: 'after_shaken', hintLocked: ko('감정 변화 유발 시 해금') },
      'partyA.speechStyle': { gate: 'after_advanced_turns', hintLocked: ko('5턴 이상 진행 시 해금') },
      'partyB.speechStyle': { gate: 'after_advanced_turns', hintLocked: ko('5턴 이상 진행 시 해금') },
    },
  },

  /* ----- freeInterrogation (θ) — 자유 심문 paraphrase 가드 -----
   *
   * 캐릭터/사건 keyword를 우회하는 표현 패턴 등록. 일반적 5~15 rule. */
  freeInterrogation: {
    paraphraseRules: [
      { label: '[TODO: paraphrase 패턴 1]', dimension: 'paraphrase' },
      { label: '[TODO: paraphrase 패턴 2]', dimension: 'paraphrase' },
      { label: '[TODO: paraphrase 패턴 3]', dimension: 'paraphrase' },
      { label: '[TODO: paraphrase 패턴 4]', dimension: 'paraphrase' },
      { label: '[TODO: paraphrase 패턴 5]', dimension: 'paraphrase' },
    ],
  },

  /* ----- truthLeakOverride — matrix에 case별 specific keyword 추가 -----
   *
   * ⚠ 기본값 = {} 권장.
   * baseline matrix의 hidden은 [design_truth_leak_keyword_nature](../../../memory/design_truth_leak_keyword_nature.md)
   * 정책상 행위/사실만 등록. 동기/태도/심리 keyword union은 false positive 회귀 영역.
   *
   * Authority truthStages.forbiddenKeywords는 LLM frame inject용 광역. matrix hidden은 surface detector용 정밀.
   *  두 영역 분리 운영.
   *
   * designIntentTags whitelist 영역: scriptedText variant tag와 sync 필요.
   *   - 새 형식: ['band:late', 'archetype:confess', 'reveal:full', 'channel:aftermath']
   *   - baseline 보존 영역: ['continuity:evidence_combo', 'continuity:partial_slip'] 등 prefix matching */
  truthLeakOverride: {
    perDispute: {},
    designIntentTags: ['band:late', 'archetype:confess', 'reveal:full', 'channel:aftermath'],
  },
}

export default templateCaseAuthority
