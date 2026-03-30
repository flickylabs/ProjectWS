/**
 * 사건 보강 데이터 (7종)
 * 자동 생성 — 84개 사건
 *
 * 포함 데이터:
 *   personalityTags, contentTags, truthCategory,
 *   actionAffinity, optimalPath, narrativeExpansion, witnessSpeechSample
 *
 * 사용법:
 *   import { CASE_ENRICHMENT_DATA } from './caseEnrichmentData'
 *   import { registerAllEnrichments } from './caseEnrichment'
 *   registerAllEnrichments(CASE_ENRICHMENT_DATA)
 */

import type { CaseEnrichment } from './caseEnrichment'

export const CASE_ENRICHMENT_DATA: Record<string, CaseEnrichment> = {
  "family-01": {
    "personalityTags": {
      "a": [
        "martyr_complex",
        "victim_identity",
        "counter_attack",
        "shame_sensitive"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "fairness_obsessed",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "sequence_sensitive",
        "secret_keeping",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "family_care",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-3": [
        "financial",
        "misleading_soft_evidence",
        "family_care",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "family_care",
        "third_party_risk",
        "hard_evidence_available"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "family_care"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "서아에게 장녀로서 해온 돌봄이 통째로 탐욕으로 뒤집힐까 두렵냐는 결을 먼저 건드리면, 병원 접수와 목욕 보조 목록 뒤에 숨겨 둔 1,800만원 선이체 시점이 흔들리기 시작한다.",
        "worstActionReaction": "거래내역 금액만 바로 찌르면 서아는 병원 접수, 장보기, 목욕 도움을 한숨에 읊고 울먹이며 '간병비 선집행' 프레임으로 쟁점을 다시 덮는다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "도현에게 왜 입금을 12일 미루면서도 약값은 직접 끊어 냈는지 묻게 되면, '안 낸 동생' 낙인을 피하려는 계산과 누나 희생 서사에 대한 반감이 같이 올라와 지연의 고의성이 드러난다.",
        "worstActionReaction": "60만원과 12일 지연만 들이대면 도현은 날짜와 금액을 더 빨리 읊으며 약값 결제와 교대 한 번을 방패로 세워 전체 지연을 부분 실수처럼 깎아낸다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1.15,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "누구 해석이 맞는지보다 왜 둘 다 '집 일은 서아가 맡아' 한 줄에 상속 의미를 얹고 싶은지 캐묻는 편이 좋다. 카페 폐업 지원금과 장녀 권한 불안이 드러나면 수첩 사진의 과장 해석이 약해진다.",
        "worstActionReaction": "크롭된 수첩 문장 자체만 따지면 둘 다 '집 일' 뜻풀이 싸움으로 도망가고, 세금·병원 서류를 맡기던 2021년 맥락은 더 멀어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "조혜진의 경감 신청 기록과 단기돌봄 연계표를 같이 내보이면, 첫 달 210만원을 당장 형제 사비로 막아야 했다는 전제가 무너져 서아의 선이체 명분도 도현의 방관 변명도 같이 약해진다.",
        "worstActionReaction": "간병이 얼마나 막막했는지만 공감해 버리면 두 사람 다 그 공포를 면죄부처럼 쓰고, 이미 안내된 98만원 수준의 복지 절차는 대화 밖으로 밀려난다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "motive_search",
        "actionScores": {
          "fact_pursuit": 1.03,
          "motive_search": 0.95,
          "empathy_approach": 1.02,
          "evidence_present": 1.1,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "e-1 거래내역과 e-3 공유표 업데이트 시각을 나란히 붙이면, 서아의 1,800만원 숨김과 도현의 약값·야간보호사 뒤늦은 입력이 한 화면에서 보여서 '나만 억울했다'는 말이 버티기 어렵다.",
        "worstActionReaction": "왜 숨겼냐부터 캐면 서아는 장녀 희생을, 도현은 불효자 낙인 공포를 앞세우며 감정싸움으로 번지고 공유표를 누가 언제 비웠는지는 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_old_business_loss",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "confidential_protection": "nonjudgmental_question_about_old_business_loss"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "missed_payment_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "delay_reason_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_note_question",
          "investigate_only:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "full_notebook_or_lawyer_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "subsidy_question",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "social_worker_reference"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_rule_reminder",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented",
          "confidential_protection": "confidential_prompt",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "서아는 간병 달이 시작되면 곧바로 자신의 연체와 보험 문제가 드러나 '장녀가 부모 돈까지 기대 산다'는 낙인이 찍힐까 두려워, 돌봄 명분 속에 선이체를 먼저 숨겼다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "아버지 폐렴 퇴원 후 간병이 시작됐는데, 서아가 '다 떠안았다'며 우는 뒤편에는 부모 관리계좌에서 큰 금액을 빼서 자기 카드대금과 보험료를 먼저 막은 사실이 있었어요.",
        "도현도 첫 주 야간 보호사 비용 자기 몫을 12일이나 늦게 냈고, 교대도 한 번 출장 핑계로 비웠습니다. 간병비 문제보다 오래 묵은 상속 불안과 서운함이 같이 끓는 집이었어요."
      ],
      "tp-2": [
        "교대표를 보면 간병 전에 부모 계좌에서 큰 돈을 빼서 '간병비 선집행'이라고 포장한 게 첫 번째 문제입니다. 실제로는 카드대금과 보험료를 먼저 막은 거였어요.",
        "도현도 교대 비용 입금을 12일 늦추고 야간 교대를 빠졌으니 깨끗하지 않습니다. 이 집은 간병 부담보다 오래전 '집 일은 서아가 맡아'라는 수첩 메모가 상속 지정처럼 쓰이는 게 핵심이에요."
      ],
      "tp-3": [
        "저는 2021년 수첩에 적힌 '집 일은 서아가 맡아'라는 문구를 확인했는데, 상속 지정이 아니라 당시 세금과 병원 서류를 임시로 맡기겠다는 맥락이었습니다.",
        "이 건은 누가 덜 사랑해서가 아니라, 부모 계좌에서 큰 돈을 빼간 쪽과 교대 비용을 늦게 낸 쪽이 서로 상대를 먼저 공격하면서 커진 겁니다. 양쪽 다 약속을 어겼어요."
      ]
    }
  },
  "family-02": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "retaliation_sensitive",
        "blame_shifting"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "denial_heavy",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "third_party_risk",
        "promise_violation",
        "reputation_risk",
        "secret_keeping"
      ],
      "d-2": [
        "third_party_risk",
        "reputation_risk",
        "career",
        "trust_breach"
      ],
      "d-3": [
        "third_party_risk",
        "privacy",
        "reputation_risk",
        "secret_keeping"
      ],
      "d-4": [
        "third_party_risk",
        "financial",
        "privacy",
        "career"
      ],
      "d-5": [
        "third_party_risk",
        "reputation_risk",
        "promise_violation",
        "financial"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "core_fact",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 0.95,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "명절 음성 클립과 창고 등기·부채표를 '가족 밖 금지 자료'로 먼저 묶어 버리면, 선우는 '민지한테 그냥 보여준 것'이라는 말로 배우자 예외를 만들기 어려워지고 링크 전송 자체가 핵심 위반으로 고정된다.",
        "worstActionReaction": "파일 몇 개를 언제 보냈는지 숫자만 따지면 선우는 '정리만 해달라 한 거지'라며 공유와 외부유출을 잘게 쪼개고, 가족 밖 비공유 원칙 파기는 흐려진다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 0.95,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "거래처와 중개업소로 번진 PDF를 누가 먼저 열었는지보다, 가족 자료가 어디서 집 밖으로 새었는지 경계를 봉인하면 민지 보조 이메일과 사촌 중개사 통화로 이어지는 실제 유출선이 훨씬 또렷해진다.",
        "worstActionReaction": "소문을 처음 누구 입에서 들었냐만 좇으면 거래처마다 말이 갈려 선우 탓 공방만 커지고, 메일 헤더와 통화기록이 가리키는 실제 유출 경로는 놓치기 쉽다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "태블릿 잠금 해제 시각과 친척 단톡 발송 6분 차이를 같이 보여주면, 미옥의 '걱정돼서 확인만 했다'는 말이 곧바로 공개 비난으로 이어졌다는 연쇄가 살아나 방어가 약해진다.",
        "worstActionReaction": "가업이 흔들린 불안을 먼저 달래면 미옥은 '집 지키려다 그랬다'는 보호자 프레임으로 돌아가고, 무단 열람과 친척방 확산은 훈계처럼 둔갑한다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "미옥에게 왜 42초 음성만 붙들고 선우 단독 승계로 읽고 싶은지 묻게 되면, 남편 건강 악화와 며느리 경영 관여에 대한 불안이 튀어나와 클립 해석이 감정 섞인 확장임이 드러난다.",
        "worstActionReaction": "잘린 음성 한 구절만 반복 재생하면 둘 다 '맡아'의 뜻싸움에 갇히고, 전체 녹취에 남은 임시 운영 맥락은 또 묻힌다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.07,
          "empathy_approach": 1.05,
          "evidence_present": 0.97,
          "separation": 1.1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "건강기록과 공장 재산표를 어디까지가 집 안 정보인지 선부터 다시 세우면, 선우의 배우자 공유와 미옥의 친척·거래처 의심 흘리기가 같은 원칙 파기였다는 점을 한꺼번에 붙잡을 수 있다.",
        "worstActionReaction": "누가 먼저 더 크게 퍼뜨렸는지만 따지면 선우는 '배우자일 뿐'을, 미옥은 '상담하려고 보낸 것'을 내세워 각자 자기 유출만 예외로 만든다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "use_confidential_channel",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_marriage",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "use_confidential_channel": "nonjudgmental_question_about_marriage",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "use_confidential_channel",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "rumor_source_question",
          "evidence_present:e-4": "e-4_presented",
          "investigate_only:e-5": "e-5_presented",
          "use_confidential_channel": "confidential_channel_prompt",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "tablet_access_question",
          "investigate_only:e-3": "e-3_presented",
          "motive_search": "relative_chat_followup"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_audio_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "full_transcript_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_factory_fear",
          "evidence_present:e-2": "e-2_presented",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_factory_fear",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "선우는 가족 밖 비공유 원칙을 알면서도, 승계와 건강 문제를 혼자 떠안는 대신 배우자에게라도 설명해 두고 싶었다. 그 결핍이 '배우자만은 예외'라는 위험한 예외처리로 번졌다.",
        "unlockHint": "motive_search 또는 use_confidential_channel + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "추석 가족 모임에서 아버지 건강, 창고 매각, 공장 승계 얘기가 한꺼번에 나왔어요. 그런데 48시간도 안 돼서 거래처와 중개업소가 같은 내용을 입에 올리기 시작했습니다.",
        "오래 살면서 집안 이야기가 밖으로 새는 걸 몇 번 봤지만, 이번은 너무 빨랐어요. 식탁에서 나온 말이 시장 소문이 되기까지 이틀도 안 걸린 거예요."
      ],
      "tp-2": [
        "선우는 명절 식탁 음성 클립과 창고 등기·부채표를 며느리 민지에게 넘기며 가족 외 비공유 원칙을 먼저 깼습니다. 민지가 그걸 사촌 중개사에게 돌리면서 시장까지 번진 거예요.",
        "거래처에서 주문 전화가 아니라 '무슨 일 있냐'부터 물을 때, 저는 이미 늦었다고 느꼈습니다. 누가 시작했는지보다 같은 질문이 여러 곳에서 동시에 오는 순간이 더 위험합니다."
      ],
      "tp-3": [
        "저는 미옥이 주방에 놓인 며느리 태블릿을 열어 동기화 화면을 확인한 뒤, 친척 단톡에 '선우가 밖에 흘렸다'고 올린 걸 확인했습니다. 무단 기기 확인과 공개 비난이 동시에 터진 거예요.",
        "이 건의 직접적인 외부 유출 배후는 선우 본인보다 며느리가 사촌 중개사에게 정보를 돌린 흐름에 더 가깝습니다. 식탁에서 나온 애매한 말이 외부를 거치면서 확정처럼 굳어졌어요."
      ]
    }
  },
  "family-03": {
    "personalityTags": {
      "a": [
        "martyr_complex",
        "victim_identity",
        "face_sensitive",
        "passive_aggressive"
      ],
      "b": [
        "avoidant",
        "conflict_avoidant",
        "timeline_padding",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "financial",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-2": [
        "financial",
        "promise_violation",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-3": [
        "financial",
        "reputation_risk",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-4": [
        "reputation_risk",
        "third_party_risk",
        "financial",
        "privacy"
      ],
      "d-5": [
        "promise_violation",
        "reputation_risk",
        "financial",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.23,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "잘린 카카오톡 캡처 앞뒤의 '6개월만' 문장과 자동이체 등록·해지 로그를 같이 제시하면, 정우가 말뿐 아니라 스스로 기간과 금액을 설정했다는 점이 고정돼 약속 여부 공방이 빨리 끝난다.",
        "worstActionReaction": "수입이 들쭉날쭉했다는 사정부터 공감해 주면 정우는 이번 달만의 예외처럼 축소하고, 처음부터 6개월 약속이었다는 핵심은 뒤로 숨긴다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "정우에게 왜 자동이체를 끊고도 미리 말하지 않았는지 묻게 되면, 장남 압박을 피하면서도 약속은 놓치기 싫었던 심리가 드러나 '조금 밀린 거지'라는 축소 표현이 무너진다.",
        "worstActionReaction": "35만원, 40만원 같은 수치만 연달아 들이밀면 정우는 현장 수입 변동과 급여일 이야기로 시간을 늘여 지연의 고의성을 희석시킨다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "복자에게 왜 정우 돈을 수빈 학원비에 돌리면서도 끝까지 약값이라고만 말했는지 묻게 되면, 장남 돈으로 딸까지 챙긴다는 비난을 피하려는 체면이 먼저 드러나 사용처 은닉이 선명해진다.",
        "worstActionReaction": "계좌이체 20만원과 25만원만 들이대면 복자는 월세·전기료·약값을 한꺼번에 나열하며 생활고 전체로 판을 키워 학원비 전용을 흐린다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "정우 약속 캡처를 친척방과 교회방으로 넘긴 순간을 '가족 밖 공개 압박'으로 묶어 버리면, 복자는 상의였다는 말로 빠져나가기 어렵고 체면을 무기로 쓴 행위가 또렷해진다.",
        "worstActionReaction": "캡처에 적힌 문장만 따지면 복자는 '장남이 생활비를 끊었다'는 감정 호소로 되받아치고, 왜 먼저 제3자에게 돌렸는지는 뒤로 밀린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 0.97,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "현금 대신 전기료·관리비 직접 납부와 영수증 공유라는 경계선을 다시 세우면, 정우의 일회성 납부와 복자의 현금 회귀가 같은 합의 붕괴의 양쪽 끝이었다는 게 분명해진다.",
        "worstActionReaction": "누가 먼저 어겼는지만 재면 정우는 한 번 낸 걸, 복자는 고지서 보낸 걸 내세워 서로 절반의 이행만 확대하고 전체 구조 실패는 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "promise_duration_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "full_chat_context_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "missed_transfer_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "auto_transfer_cancel_reason",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "allowance_use_question",
          "present_if_lawful:e-3": "e-3_presented",
          "motive_search": "sister_support_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-4"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "family_group_chat_question",
          "investigate_only:e-4": "e-4_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_bill_fear",
          "investigate_only:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_bill_fear",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "복자는 장남 돈을 딸 지원에 섞어 썼다는 사실보다, 그 말을 꺼내는 순간 '아들 돈은 당연하고 딸은 늘 숨겨서 돕는다'는 오래된 죄책감이 들킬까 더 두려워했다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "정우는 독립하면서 어머니 생활비와 약값이 안정될 때까지 6개월간 월 60만원을 보내겠다고 약속했어요. 3개월까지는 잘 보냈는데 그 뒤로 금액과 날짜가 흔들리기 시작했습니다.",
        "복자 어머니도 체면 때문에 힘들어했어요. 친척 단톡에 정우 약속 캡처를 올려 '장남이 생활비를 끊었다'고 공개 압박한 건, 아들보다 주변 눈치를 먼저 본 거예요."
      ],
      "tp-2": [
        "저는 정우가 3개월째부터 자동이체를 해지하고 사전 통보 없이 두 차례 금액을 줄여 늦게 보낸 건 확인했습니다. 약속 위반은 맞아요.",
        "다만 복자 어머니도 정우가 보낸 용돈 일부를 딸 수빈의 자격증 학원비와 교통카드 충전에 돌려 쓰고도 '전부 약값과 공과금에 썼다'고 말했습니다. 양쪽 다 투명하지 않았어요."
      ],
      "tp-3": [
        "저는 이 건에서 현금 용돈 대신 전기료와 관리비를 정우가 직접 내자는 합의가 있었다고 확인했습니다. 그런데 정우는 한 번만 납부했고, 복자는 다시 현금 요구로 돌아가며 영수증 공유도 멈췄어요.",
        "이 건의 핵심은 효도 여부가 아니라 약속 이행입니다. 정우는 월 60만원을 3개월만 지키고 흔들었고, 복자는 용돈 전용을 숨기면서 친척한테 공개 압박을 했습니다. 둘 다 합의를 어겼어요."
      ]
    }
  },
  "family-04": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "detail_obsessed",
        "selective_quote",
        "fairness_obsessed"
      ],
      "b": [
        "martyr_complex",
        "victim_identity",
        "counter_attack",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "promise_violation",
        "privacy",
        "sequence_sensitive"
      ],
      "d-3": [
        "financial",
        "privacy",
        "promise_violation",
        "sequence_sensitive"
      ],
      "d-4": [
        "promise_violation",
        "financial",
        "privacy",
        "sequence_sensitive"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "third_party_risk",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "은행 원본 거래내역과 향토장학재단 기부영수증을 바로 붙이면, 3,200만원 출금 상대가 형제 개인이 아니라 재단이라는 점이 고정돼 누가 훔쳤느냐는 오해가 한 번에 꺼진다.",
        "worstActionReaction": "상속 불안과 민규 차용금 기억을 먼저 달래면 둘 다 '그래서 의심할 만했다'는 쪽으로 기울고, 정작 기부 원본 문서는 뒤로 밀린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "하린에게 왜 원본을 보고도 메모란이 잘린 잔액 캡처만 보냈는지 묻게 되면, 민규의 과거 빚과 문서 통제 욕구가 함께 드러나 단순 실수가 아니라 의심 유도였다는 점이 선명해진다.",
        "worstActionReaction": "캡처 한 장의 픽셀만 붙잡고 늘어지면 하린은 '그 시점만 본 것'이라며 범위를 좁히고, 왜 굳이 잘린 화면을 보냈는지는 놓치게 된다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "도어락 출입기록과 작업실 금고 사진을 나란히 제시하면, 민규가 인감과 등기 원본을 실제로 반출해 사흘간 숨겼다는 흐름이 남아 '보관이었을 뿐'이라는 말이 힘을 잃는다.",
        "worstActionReaction": "가까이 사는 사람이 억울했을 거라 먼저 받아주면 민규는 보일러 수리와 우편 심부름을 줄줄이 꺼내 원본 반출 자체를 희생담 속에 섞어 버린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.12,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "잘린 잔액 캡처와 '정리본-2'로 바뀐 클라우드 파일명 변경 이력을 함께 보여주면, 하린의 부분 공개와 민규의 모호한 파일명이 같은 공동 폴더 위반이었다는 점이 한 화면에서 고정된다.",
        "worstActionReaction": "형제 사이 불신부터 공감하면 둘 다 '상황이 그래서 그랬다'로 물러나고, 원본 스캔·명확한 파일명이라는 합의 자체가 흐릿해진다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.07,
          "empathy_approach": 1.05,
          "evidence_present": 0.97,
          "separation": 1.1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "세무 지인 문의와 부동산 중개 지인 문의를 '부모 확인 전 외부 의심 확산'으로 묶어 다루면, 하린과 민규 모두 부모 앞보다 바깥 문의를 먼저 택했다는 공통 위반이 드러난다.",
        "worstActionReaction": "누가 먼저 전화를 걸었는지만 따지면 둘 다 상대 쪽 외부 문의만 키워 말하고, 부모 재산 문제를 집 밖으로 꺼낸 구조적 잘못은 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "direct_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "motive_followup"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "partial_screenshot_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "original_statement_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "seal_document_question",
          "present_if_lawful:e-3": "e-3_presented",
          "motive_search": "workshop_safe_followup"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_folder_rule_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "crop_reason_followup",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_old_loan_fear",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_old_loan_fear",
          "separation": "responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "emotion",
        "deeperReveal": "상속 준비가 시작되자 두 사람 모두 예전 차용금과 문서 통제 기억을 이미 들고 있었다. 그래서 모호한 파일명과 잘린 잔액 캡처가 나오자 기부 사실보다 '또 먼저 손댔다'는 오래된 의심이 먼저 작동했다.",
        "unlockHint": "empathy_approach 또는 separation + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "부모님이 유언 정리를 시작하면서 예금과 등기를 공동 폴더에 모으고 있었는데, 저축계좌에서 3,200만원이 빠져나간 걸 보고 형제 사이가 한순간에 얼어붙었어요.",
        "나중에 알고 보니 부모님이 장학재단에 기부한 돈이었는데, 잘린 잔액 캡처와 모호한 파일명 때문에 형제 사이에서 서로 '빼돌렸다'는 의심이 먼저 커진 거예요."
      ],
      "tp-2": [
        "하린은 원본 거래내역을 보고도 이체 메모 상단이 잘린 잔액 캡처만 민규에게 보내며 의심을 키웠습니다. 전체를 보여줬으면 장학재단 기부라는 걸 바로 알 수 있었을 거예요.",
        "민규도 누나가 먼저 움직일까 봐 부모 집 인감과 부동산 등기 원본을 사흘간 자기 작업실 금고에 옮겨 두고 안 알렸습니다. 둘 다 확인보다 의심을 먼저 키운 거예요."
      ],
      "tp-3": [
        "저는 3,200만원 인출이 형제 횡령이 아니라 부모가 결정한 향토장학재단 기부라는 걸 확인했습니다. 형제는 공유폴더의 잘린 자료와 모호한 파일명 때문에 서로를 의심한 거예요.",
        "형제는 원본 스캔과 명확한 파일명을 함께 올리기로 했는데, 하린은 잘린 캡처를 올렸고 민규는 파일명을 '정리본'처럼 모호하게 바꾸며 설명을 비워 뒀습니다. 공유 원칙을 둘 다 안 지킨 겁니다."
      ]
    }
  },
  "family-05": {
    "personalityTags": {
      "a": [
        "confrontational",
        "manipulative",
        "shame_sensitive",
        "retaliation_sensitive"
      ],
      "b": [
        "avoidant",
        "authority_challenging",
        "selective_quote",
        "privacy_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "secret_keeping",
        "financial",
        "third_party_risk"
      ],
      "d-2": [
        "secret_keeping",
        "financial",
        "privacy",
        "third_party_risk"
      ],
      "d-3": [
        "privacy",
        "misleading_soft_evidence",
        "financial",
        "third_party_risk"
      ],
      "d-4": [
        "promise_violation",
        "financial",
        "privacy",
        "third_party_risk"
      ],
      "d-5": [
        "privacy",
        "financial",
        "third_party_risk",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "현관 도어락 기록과 임대인 취소 문자를 바로 붙이면, 은주의 방 출입과 계약 중단 압박이 같은 날 연속으로 이어졌다는 점이 살아나 '엄마가 확인만 했다'는 해명이 버티기 어려워진다.",
        "worstActionReaction": "전세사기 직전 트라우마를 먼저 달래면 은주는 '막았으니 사고가 안 난 것'이라며 침범을 보호로 바꾸고, 실제 방 출입과 취소 연락은 가벼워진다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "소현에게 왜 부모 앞에서는 단독 원룸이라 하면서 실제로는 룸메이트 계약금부터 넣었는지 묻게 되면, 애 취급받기 싫어 정보를 잘라 말한 심리가 드러나 축소 설명의 고의가 선명해진다.",
        "worstActionReaction": "룸메이트 조항만 들이밀면 소현은 월수입, 마감 일정, 방 크기 얘기로 주변을 길게 풀어 핵심 왜곡을 또 늦춘다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "31초 클립을 내용보다 '편집 앱 폴더에서 나온 사적 음성 조각'으로 먼저 봉인하면, 은주가 세 통화를 잘라 붙여 임대인에게까지 넘긴 절차 위반이 정면에 선다.",
        "worstActionReaction": "클립 문장 자체의 진실성만 따지면 은주는 '무서워서 그랬다'며 내용 일부가 맞는지로 논점을 틀고, 위조 제작과 전달 책임을 흐린다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 0.97,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "청년주거상담 전까지는 서로 선을 넘지 않기로 한 약속을 기준선으로 세우면, 소현의 선계약과 은주의 선개입이 같은 합의 파기로 연결돼 한쪽만 피해자로 서기 어려워진다.",
        "worstActionReaction": "누가 먼저 잘못 시작했는지만 재면 소현은 계약금을, 은주는 방 출입을 번갈아 들고 나와 순서 싸움만 길어지고 사전 상담 원칙은 사라진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "임대인 최연우에게 왜 최종적으로 손을 뗐는지 이유를 캐묻는 방식으로 접근하면, 소현 수입보다 은주의 취소 연락과 편집 녹취 전달이 더 큰 분쟁 신호였다는 실제 판단이 드러난다.",
        "worstActionReaction": "수입 안정성이나 보증금 숫자만 두드리면 가족 갈등 리스크라는 본심은 숨고, 거절 사유가 경제 문제였다는 오해만 굳어진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "room_entry_question",
          "present_if_lawful:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "landlord_contact_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "lease_type_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "roommate_clause_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "edited_audio_question",
          "investigate_only:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_old_scam_fear",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_old_scam_fear",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "lease_rejection_reason_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "full_landlord_email_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "은주는 딸이 또 위험한 계약에 들어갈 수 있다는 공포를 통제로 바꾸는 버릇이 있었다. 이번 위조 녹취는 사실 확인보다 '막아야 한다'는 공포가 앞서며 경계를 완전히 넘어선 순간이었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "은주는 과거 전세사기 직전 사건 때문에 딸이 계약을 하겠다고 하면 직접 확인하지 않고는 못 견디는 분이에요. 소현이 없을 때 방에 들어가 서류를 확인하고, 임대인에게 직접 전화까지 한 거예요.",
        "반대로 소현은 부모에게 단독 원룸이라고 했지만, 실제로는 룸메이트가 있는 공유주거 계약 초안에 계약금을 먼저 넣고 있었습니다. 둘 다 상대에게 정확히 말하지 않았어요."
      ],
      "tp-2": [
        "저는 임대인으로서 한 집에서 두 목소리가 따로 오는 게 제일 부담이었습니다. 딸은 계약을 밀고, 어머니는 취소하라고 연락하고. 분쟁 위험이 크게 보여서 최종 계약을 거절한 거예요.",
        "은주의 취소 연락과 편집된 녹취 전달이 제 결정에 영향을 줬습니다. 소현의 수입 불안정보다 가족 분쟁이 계약 후에도 이어질 것 같다는 판단이 더 컸어요."
      ],
      "tp-3": [
        "저는 은주가 제시한 31초 녹취를 확인했는데, 소현의 실제 자백이 아니라 세 통화를 잘라 붙이고 오래된 음성조각을 끼워 넣은 위조본이었습니다.",
        "두 사람은 청년주거상담 뒤에 계약 여부를 정하기로 했지만, 소현은 계약금을 먼저 걸었고 은주는 상담 전에 방 출입과 임대인 연락을 했습니다. 약속을 둘 다 깼어요."
      ]
    }
  },
  "family-06": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "retaliation_sensitive",
        "counter_attack"
      ],
      "b": [
        "victim_identity",
        "selective_quote",
        "authority_challenging",
        "trust_broken"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "third_party_risk",
        "financial",
        "career"
      ],
      "d-2": [
        "reputation_risk",
        "third_party_risk",
        "privacy",
        "misleading_soft_evidence"
      ],
      "d-3": [
        "reputation_risk",
        "third_party_risk",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ],
      "d-4": [
        "reputation_risk",
        "third_party_risk",
        "trust_breach",
        "promise_violation"
      ],
      "d-5": [
        "reputation_risk",
        "career",
        "third_party_risk",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "hidden_motive",
      "t-4": "emotional_context",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "하준에게 왜 굳이 영정사진 일부와 동네 체육관 태그까지 묶어 올렸는지 묻게 되면, 지워지는 가족사에 대한 분노와 공감 욕구가 함께 드러나 실명 없이도 특정 가능하게 만든 의도가 보인다.",
        "worstActionReaction": "게시물 몇 줄만 읽어주면 하준은 '은유였어'를 반복하며 조회수와 응원 DM로 옆길로 새고, 식별 가능성의 핵심은 흐려진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "선영의 협찬사 DM 시각과 친척·교회방 메시지를 같은 타임라인에 놓으면, 하준 게시물을 말리려 한 수준이 아니라 아들의 신뢰도 자체를 깎아 내린 연쇄 연락이 또렷해진다.",
        "worstActionReaction": "지역사회 망신이 두려웠겠다고 받아주면 선영은 곧 '수습하려고 한 일'이라며 경고 DM과 친척방 비난을 훈계처럼 포장한다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 1.05,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "2014년 쉼터·채무조정 서류를 누가 보관했고 어떤 계정으로 밖에 나갔는지부터 정보 경계를 잠그면, 하준과 선영 탓 공방보다 외삼촌 병철의 백업·게스트계정 유출선이 먼저 드러난다.",
        "worstActionReaction": "맘카페에 누가 처음 올렸는지 말만 좇으면 익명글 캡처마다 진술이 갈려 하준 저격과 선영 반격만 커지고, 정작 백업 문서 반출 경로는 놓친다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 0.97,
          "separation": 1.1,
          "confidential_protection": 1.28
        },
        "bestActionHint": "2014년 서류와 예전 문제행동을 '새 갈등에 다시 꺼내지 않기로 한 금지 구역'으로 먼저 정리하면, 하준의 암시 게시물과 선영의 협찬처·친척방 비난이 같은 약속 파기로 묶인다.",
        "worstActionReaction": "누가 더 먼저 과거를 들췄는지만 재면 둘 다 상대가 먼저였다고 버티고, 비무기화 약속 자체를 함께 깼다는 본질은 흐려진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "협찬 매니저에게 어떤 순간 브랜드가 '이건 분쟁 리스크'라고 판단했는지 묻게 되면, 하준의 첫 게시물만이 아니라 선영의 경고 연락과 익명 PDF 도착이 겹친 실제 중단 이유가 드러난다.",
        "worstActionReaction": "게시물 조회수나 PDF 개수만 세면 어느 하나가 결정타였는지 흐려지고, 브랜드가 본 건 겹쳐 들어온 가족 분쟁 신호였다는 판단은 놓치게 된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "sns_identifiability_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "local_acquaintance_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "sponsor_contact_question",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "group_size_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "use_confidential_channel",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "document_leak_source_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-5_presented",
          "use_confidential_channel": "confidential_channel_prompt",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_family_shame",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "confidential_protection": "nonjudgmental_question_about_family_shame",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "sponsorship_pause_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "timeline_reconstruction",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "하준은 공개 발화를 통해 처음으로 자기 서사를 되찾고 싶었고, 선영은 그 서사가 지역사회에 번지기 전에 덮고 싶었다. 그 반대 방향의 조급함이 제3가족이 끼어들 틈을 만들었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "하준은 실명을 쓰지 않았지만 영정사진 일부, 동네 체육관 태그, 가족이 알아볼 문장을 묶어서 선영과 집안을 충분히 특정할 수 있는 게시물을 올렸습니다.",
        "선영도 하준의 게시물 캡처를 협찬사와 친척·교회 소모임에 보내며 '아들이 과거 일을 팔아 관심을 끈다'고 비난했어요. 둘 다 2014년 기록을 안 쓰기로 한 약속을 깬 거예요."
      ],
      "tp-2": [
        "저는 협찬 중단의 원인이 하준의 첫 게시물만은 아니라고 봅니다. 선영의 경고 연락과 곧이어 도착한 익명 PDF 제보가 겹쳐서 브랜드가 분쟁 리스크를 크게 본 거예요.",
        "같은 주제로 SNS, 맘카페, 협찬처가 동시에 흔들리면 브랜드는 내용을 따지기 전에 연결을 끊습니다. 누가 먼저 공격당했느냐보다 여러 채널이 한꺼번에 터진 점이 더 컸어요."
      ],
      "tp-3": [
        "저는 맘카페와 협찬처에 돌던 2014년 서류의 유출 경로를 추적했는데, 하준이나 선영이 직접 올린 게 아니었습니다. 옛 스캔 백업을 갖고 있던 외삼촌 오병철의 게스트계정 사용 흔적이 남아 있어요.",
        "이번 일은 모자 갈등과 문서 유출을 분리해서 봐야 합니다. 하준의 SNS 저격과 선영의 협찬처 비난이 양쪽에서 불을 붙였지만, 과거 서류를 실제로 유포한 배후는 제3자였습니다."
      ]
    }
  },
  "family-07": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "denial_heavy"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "detail_obsessed",
        "trust_broken"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "privacy"
      ],
      "d-2": [
        "career",
        "reputation_risk",
        "third_party_risk",
        "privacy"
      ],
      "d-3": [
        "career",
        "reputation_risk",
        "third_party_risk",
        "hard_evidence_available"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "privacy"
      ],
      "d-5": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "종문에게 왜 지원사업 최종본과 지역 기사에서 지수 이름을 좁히고 대표 성과를 넓혔는지, '창업주인데 딸 덕에 버틴 사람처럼 보이기 싫었는지'를 묻게 되면 체면 동기가 먼저 튀어나온다. 그 순간 e-1의 문장 삭제가 단순 교정이 아니라 공로 회수였다는 점이 선명해진다.",
        "worstActionReaction": "초안과 최종본 문구 차이만 들이밀면 종문은 곧 '대표 명의는 원래 그렇다'며 형식 문제로 숨어 버린다. 그러면 지수 기여를 왜 의도적으로 좁혔는지 핵심 동기는 끝까지 남는다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "지수에게 왜 인터뷰마다 '제가 공방 체질을 바꿨다'는 말을 넣었는지, 승계 얘기만 나오면 자기 이름이 다시 창업주 서사에 묻힐까 두려웠는지 건드려야 한다. 인정 결핍을 말하게 만들면 e-2의 과장이 단순 자부심이 아니라 자리 확보용이었다는 맥락이 열린다.",
        "worstActionReaction": "영상 자막과 홍보 글 표현만 줄줄 따지면 지수는 '그건 온라인 부분만 말한 거였다'며 범위를 잘게 쪼갠다. 그렇게 되면 아버지 기사에 대한 서운함이 어떻게 단독 구원자 서사로 번졌는지는 더 멀어진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.23,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "온라인몰 전환율 대시보드와 생산 불량률·납기 로그, 그리고 문서윤의 역할 진단표를 한 화면에 붙이면 어느 한쪽의 단독 구원자 서사가 버티기 어렵다. e-3과 e-6이 함께 놓여야 '누가 더 했나'가 아니라 양축 기여가 동시에 보인다.",
        "worstActionReaction": "서운했던 마음부터 달래면 종문은 '누가 대출 도장 찍었는데'로, 지수는 '제 이름은 없잖아요'로 다시 돌아간다. 감정은 커지지만 공동 반등이라는 구조 검증은 뒤로 밀린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "지역상 신청 규정, 박람회 대표자 등록 기준, 상패 제작 주문서를 같이 보여 주면 '대표 이름이 적혔다=후계 확정'이라는 비약이 끊긴다. e-4가 행정상 명의와 승계 신호를 분리해 주기 때문에 해석 싸움보다 증거 대면이 빠르다.",
        "worstActionReaction": "승계 불안만 공감해 주면 종문은 창업주 권위 쪽으로, 지수는 인정 갈증 쪽으로 더 세게 붙는다. 그러면 상패와 대표자 표기의 실제 기준 검증이 감정 싸움에 묻혀 버린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.73,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "월별 KPI 비교표와 클라우드 수정 이력을 공개 망신용이 아니라 비공개 정리용으로 다루겠다고 선을 그어 주면, 종문도 지수도 자기에게 불리한 달을 뺀 흔적을 덜 숨긴다. 둘 다 실적 프레임을 체면 문제로 붙잡고 있어 confidentiality가 먼저 먹힌다.",
        "worstActionReaction": "최저점과 고점 월만 딱 찍어 계산문제처럼 몰아붙이면 두 사람은 각자 다른 기준월을 들고 와 숫자 전투만 키운다. 왜 특정 기간만 골랐는지 숨은 계산은 더 깊이 숨어 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "credit_omission_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "final_copy_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "solo_savior_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "whole_business_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_recognition_need",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "nonjudgmental_question_about_recognition_need",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "succession_signal_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "consultant_note_followup"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "comparison_period_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "종문은 책임을 진 사람이 공로를 더 가져야 한다고 느끼고, 지수는 변화를 만든 사람이 이름을 더 가져야 한다고 느낀다. 인정의 기준 자체가 달라서 같은 매출 반등도 서로의 공로를 지우는 장면으로 읽힌다.",
        "unlockHint": "motive_search 또는 empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "이 공방에서 아버지는 손에서 기름 냄새가 안 빠질 정도로 생산에 매달렸고, 딸은 온라인몰과 패키지를 처음부터 다시 짰어요. 둘 다 쉬는 날 없이 했습니다.",
        "그런데 지원사업 기사와 수상 장면에서 아버지 이름만 대표로 나가면, 딸 표정이 잠깐 굳는 걸 여러 번 봤어요. 실제로 온라인을 살린 건 딸인데 밖에선 아버지 공방으로만 불리니까요."
      ],
      "tp-2": [
        "종문은 지원사업 신청서와 기사 인터뷰에서 지수의 온라인·브랜드 기여를 축소했고, 지수는 자기가 공방을 완전히 살린 것처럼 말해 종문의 생산 안정화와 거래처 유지 기여를 가렸습니다.",
        "최근 반등은 종문의 생산 표준화·불량률 관리와 지수의 온라인몰·패키지·행사 기획이 합작한 결과예요. 한 사람 공으로만 말하면 절반이 빠집니다."
      ],
      "tp-3": [
        "지역상 상패와 박람회 대표자 표기는 법적 대표와 신청서 명의 기준일 뿐, 공식 승계 확정이나 단독 후계자 지정이 아닙니다. 상징적 자리가 실질 기여와 혼동되면서 감정이 커진 거예요.",
        "종문은 온라인 개편 전의 최저점만, 지수는 생산이 안정된 뒤의 고점만 골라 각자 유리한 기간으로 성과를 비교했습니다. 비교 기간을 맞추면 양쪽 기여가 거의 같은 무게입니다."
      ]
    }
  },
  "family-08": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "grudge_holding",
        "trust_broken",
        "counter_attack"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "blame_shifting",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "promise_violation",
        "family_care",
        "secret_keeping",
        "financial"
      ],
      "d-2": [
        "reputation_risk",
        "family_care",
        "secret_keeping",
        "third_party_risk"
      ],
      "d-3": [
        "family_care",
        "financial",
        "promise_violation",
        "secret_keeping"
      ],
      "d-4": [
        "family_care",
        "promise_violation",
        "secret_keeping",
        "financial"
      ],
      "d-5": [
        "promise_violation",
        "family_care",
        "secret_keeping",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "준호에게 150만원 송금 자체보다 왜 같은 날 가족 단톡에 못 올렸는지, 또 불효자로 몰릴까 겁나 시간을 끌었는지 묻는 편이 먹힌다. 그러면 그는 '일단 안전부터였다' 뒤에 숨기던 미통보 책임을 더 오래 버티지 못한다.",
        "worstActionReaction": "입금 시각과 부재중 통화 횟수만 재면 준호는 배회, 넘어짐, 가스 경보 이야기를 길게 늘어놓으며 현장 고생으로 질문을 덮는다. 사실 확인은 남지만 왜 숨겼는지는 끝까지 비어 버린다."
      },
      "d-2": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.3,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "세라에게 이번 폭발 뒤에 2021년 ICU 연락 지연 기억이 겹쳤다는 점을 먼저 받아주면, 친척방 공개 비난이 현재 계약 확인보다 과거 배신감에서 먼저 튀어나온 반응이었다는 말이 나온다. 상처를 분리해 줘야 e-3의 과잉 전파 책임도 스스로 보인다.",
        "worstActionReaction": "친척 단톡 캡처와 통화 횟수만 들이밀면 세라는 곧 '결국 또 숨겼잖아'를 반복한다. 그러면 자기 공개 비난은 경고 행동처럼 포장되고, 확인 전에 퍼뜨린 책임은 흐려진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "은솔요양원 신청서의 평가입소 항목과 환불 규정 메일, 150만원 영수증을 같이 붙이면 '영구입소 계약금' 프레임이 한 번에 무너진다. e-1과 e-4는 금액의 성격을 감정이 아니라 문서로 잘라 준다.",
        "worstActionReaction": "시설 죄책감만 달래면 세라는 '엄마를 버리는 일'로, 준호는 '안전 조치였다'로 각자 서사를 키운다. 그러는 사이 150만원이 정확히 무엇이었는지 핵심 검증은 또 늦어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 0.95,
          "empathy_approach": 1.05,
          "evidence_present": 1.12,
          "separation": 1,
          "confidential_protection": 1.12
        },
        "bestActionHint": "작년 가족회의 노트 사진만이 아니라 치매안심센터 돌봄계획서까지 같이 대면시키면, 배회 재발 시 평가입소 진행과 같은 날 공유 원칙이 동시에 고정된다. e-5의 잘린 기억이 e-6의 서명 문구와 붙을 때만 합의 범위가 선명해진다.",
        "worstActionReaction": "합의했느냐 안 했느냐만 정면으로 따지면 두 사람은 곧 '대기냐 입소냐' 같은 शब्द 해석 싸움으로 빠진다. 그러면 실제 문구와 통보 의무라는 본체는 다시 흐릿해진다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.95,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "세라의 오래된 ICU 상처와 준호의 밤돌봄 피로를 둘 다 인정해 주면, 이번 사건이 단순 악의가 아니라 누적된 배신 기억과 미통보 습관이 겹쳐 폭발했다는 말이 나온다. 공동 책임 구조는 감정의 층을 분리해 줄 때 가장 빨리 열린다.",
        "worstActionReaction": "누가 먼저 잘못했는지 순번만 세우면 준호는 '현장 고생'으로, 세라는 '또 숨김'으로 되받아친다. 그 결과 현재 배신 프레임을 키운 쌍방 책임은 서로의 방패 뒤에 숨어 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_notice_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "same_day_rule_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "relative_chat_question",
          "investigate_only:e-3": "e-3_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "contract_meaning_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "refund_clause_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "prior_agreement_question",
          "investigate_only:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "full_plan_followup"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_not_being_last_again",
          "evidence_present:e-2": "e-2_presented",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_not_being_last_again",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "emotion",
        "deeperReveal": "세라에게는 이번 미통보가 단순 누락이 아니라 2021년 ICU 지연 연락의 재연처럼 느껴졌다. 준호는 그 상처를 알면서도 사전 합의를 '먼저 움직여도 된다'는 허가로만 읽어 통보 의무를 가볍게 여겼다.",
        "unlockHint": "empathy_approach + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "준호가 요양원에 150만원을 보낸 건 저를 몰래 시설에 넣으려는 게 아니라, 작년에 배회가 재발하면 평가입소를 진행하자고 함께 정한 거였어요. 다만 세라한테 먼저 알려야 했는데 그걸 안 한 게 문제였습니다.",
        "세라도 화가 난 건 이해하지만, 계약 내용을 확인하기 전에 친척 단톡에 '오빠가 엄마를 몰래 시설에 넣었다'고 올린 건 너무 빨랐어요. 150만원은 영구입소가 아니라 환불 가능한 대기금이었거든요."
      ],
      "tp-2": [
        "저는 준호가 은솔요양원에 150만원을 보낸 건 확인했는데, 이건 영구입소 확정이 아니라 2주 평가입소용 침상 홀드와 대기등록 비용이었습니다. 환불 가능 금액이에요.",
        "작년 가을 가족회의 기록에 배회 재발 시 은솔요양원 대기를 진행할 수 있다는 사전 합의가 남아 있었습니다. 다만 준호는 통보를 안 했고 세라는 합의 존재 자체를 축소하며 양쪽 다 사실을 다르게 말하고 있어요."
      ],
      "tp-3": [
        "이 건의 핵심은 입소 결정 자체가 아니라, 작년 합의를 실행하면서 '같은 날 공유' 원칙을 준호가 안 지킨 것, 그리고 세라가 과거 ICU 지연 연락 기억을 현재에 덧씌워 배신 서사를 먼저 퍼뜨린 것이에요.",
        "준호는 이번에도 중요한 정보를 늦게 알렸고, 세라는 과거 응급 상황의 트라우마를 사실 확인보다 앞세워 친척들에게 먼저 배신 프레임을 확산시켰습니다. 둘 다 약속을 깬 겁니다."
      ]
    }
  },
  "family-09": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "martyr_complex",
        "selective_quote",
        "grudge_holding"
      ],
      "b": [
        "avoidant",
        "timeline_padding",
        "blame_shifting",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "privacy"
      ],
      "d-2": [
        "secret_keeping",
        "financial",
        "promise_violation",
        "third_party_risk"
      ],
      "d-3": [
        "secret_keeping",
        "financial",
        "promise_violation",
        "privacy"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "hidden_motive",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.07,
          "empathy_approach": 1.07,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.23
        },
        "bestActionHint": "부모 앞 망신이나 형사 판단부터 꺼내지 말고, 먼저 공식계약 밖 6,600만원 구조를 비공개로 정리하겠다고 선을 그어야 한다. 그래야 민아도 도윤도 중개사 수기 메모와 별도 이체 흐름을 덜 숨기고 '처음부터 둘이 맞췄다'는 말을 꺼낸다.",
        "worstActionReaction": "처음부터 '누가 횡령했냐'로 몰아붙이면 남매는 각자 2,400만원 선수령과 위임장 선서명만 상대 탓으로 세운다. 그렇게 되면 e-2와 e-5가 가리키는 공모 구조는 마지막까지 묻힌다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "어머니에게 '시세만 보는 서류'라고 말한 날의 상담예약표, 부분 위임장 초안, 대기실 CCTV 확인서를 묶어 제시하면 민아의 범위 축소가 버틸 틈이 없다. e-3은 선서명 유도가 일회성 오해가 아니라 준비된 선행 행동이었음을 보여 준다.",
        "worstActionReaction": "돌봄 부담과 효녀 서사만 받아주면 민아는 재활병원 동행과 공과금 대납을 길게 읊으며 흐름을 바꾼다. 그러면 위임장 선서명 유도는 희생의 부산물처럼 흐려진다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도윤에게 1,300만원 상환 자체보다 왜 그 돈을 '내 몫'으로 먼저 굳혀야 했는지, 또 빚 많은 아들로 찍혀 부동산 실무권을 잃을까 두려웠는지 묻는 편이 먹힌다. 그 질문이 들어가야 e-4의 채무 상환이 단순 현장 처리라는 변명에서 빠져나온다.",
        "worstActionReaction": "리스 연체 영수증과 카드대금만 흔들면 도윤은 곧 '매수인이 빠지기 직전이었다'며 시세와 명도 상황 이야기로 도망간다. 그러면 선수령의 개인 사용 동기보다 현장 발품만 남는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "공식 매매계약서와 부모 설명 녹취 확인서를 같이 놓으면, 부모가 들은 건 6억4천만원과 통상 비용뿐이고 6,600만원 분배 구조는 빠져 있었다는 점이 바로 드러난다. e-6이야말로 '들었다'와 '못 들었다'를 가르는 결정 자료다.",
        "worstActionReaction": "부모 치료비 걱정부터 공감하면 남매는 곧 '다 부모 위해서였다'로 손을 잡는다. 그 순간 공식 계약 밖 보전금 구조를 부모에게 숨긴 핵심은 정서 뒤로 물러난다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 0.97,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "세금·명도비 핑계를 얼마나 부풀렸는지 묻기 전에, 먼저 부모에게 돌려줄 돈과 외부 노출 범위를 따로 정리하겠다고 약속해 줘야 한다. 그래야 둘 다 '남는 돈이 별로 없다'는 축소 설명을 공동 방어가 아니라 숨김 전략으로 인정하기 시작한다.",
        "worstActionReaction": "세목과 수수료 숫자만 캐묻으면 남매는 각자 계산표를 흔들며 '생각보다 안 남는다'는 말싸움으로 빠진다. 그러면 부모에게 구조 자체를 숨긴 고의는 다시 계산 뒤로 숨어 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-2",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "off_contract_money_question",
          "present_if_lawful:e-2": "e-2_presented",
          "investigate_only:e-5": "e-5_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "power_of_attorney_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "mother_consent_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "side_transfer_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "debt_payment_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "direct_question",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "motive_followup"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "present_if_lawful:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_rehab_cost_pressure",
          "present_if_lawful:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_rehab_cost_pressure",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "두 사람 모두 계약 외 보전금을 '부모를 돌본 몫' 혹은 '현장 발품 몫'으로 속으로 먼저 정당화했다. 그 자기정당화가 부모 동의의 빈칸과 중개사 공모를 너무 빨리 정상처럼 느끼게 만들었다.",
        "unlockHint": "motive_search 또는 separation + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저는 아이들이 집 매각을 서두르는 건 알았지만, 공식 매매가 밖으로 따로 빼 둔 보전금을 나눠 갖기로 한 줄은 몰랐어요. '세금이랑 수수료 때문에 남는 돈이 적다'고만 들었거든요.",
        "민아가 제 인감 사용 동의를 받으러 올 때도 '시세만 물어보는 서류'라고 했습니다. 뒤에 그렇게 복잡한 셈이 붙어 있는 줄은 몰랐어요."
      ],
      "tp-2": [
        "민아와 도윤은 공식 매매가를 정하고, 별도 보전금을 중개사와 미리 맞춰 나눠 갖기로 합의해 놓고 있었습니다. 부모님 앞에서는 효도 이야기지만 둘만 남으면 계산이 차가웠어요.",
        "도윤은 먼저 받은 자기 몫 중 상당 부분을 개인 장비리스 연체와 카드대금에 써 버렸습니다. 민아는 어머니 인감을 '시세 확인용'이라며 미리 받아 뒀고요. 둘 다 부모에게 보전금 구조 자체를 숨겼어요."
      ],
      "tp-3": [
        "저는 부모님이 공식 매매가와 통상 비용만 들었을 뿐, 별도 보전금이 형제 분배 대상으로 빠져 있다는 구조는 듣지 못했다고 확인했습니다.",
        "이 건에서 민아가 '도윤이 혼자 숨겼다'고 몰아붙인 그 돈은 한쪽 단독 은닉이 아니라, 남매가 중개사와 함께 공식 매매가 밖으로 빼 돌려 나눠 갖기로 먼저 합의한 공모의 산물이었습니다."
      ]
    }
  },
  "family-10": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "martyr_complex",
        "fairness_obsessed",
        "emotionally_volatile"
      ],
      "b": [
        "avoidant",
        "conflict_avoidant",
        "shame_sensitive",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "misleading_soft_evidence",
        "trust_breach",
        "promise_violation"
      ],
      "d-2": [
        "financial",
        "sequence_sensitive",
        "trust_breach",
        "promise_violation"
      ],
      "d-3": [
        "promise_violation",
        "financial",
        "trust_breach",
        "secret_keeping"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-5": [
        "promise_violation",
        "financial",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "subjective_claim",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "양가 부모 앞 체면 문제로 이미 번진 사건이라, 먼저 누구 집을 더 무시했는지 공개 판정하지 않겠다고 선을 그어야 민재도 잘린 단톡 원문 전체를 꺼낸다. 비공개 안전선이 생겨야 '되면 금요일 밤'이라는 조건부 문장이 살아난다.",
        "worstActionReaction": "잘린 캡처 한 줄만 들이대면 다은은 '금요일 밤에 갈게'만 붙잡고, 민재는 '점심쯤' 같은 뭉툭한 말로 버틴다. 표현 전체를 확인하기보다 각자 자기 해석만 더 굳힌다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "민재에게 왜 오후 늦게 이미 못 간다는 걸 알고도 밤까지 미뤘는지, 무책임한 동생 소리 들을까 무서워 말을 끌었는지 묻는 게 좋다. 그 질문이 들어가야 교통 핑계 뒤에 숨은 회피가 드러난다.",
        "worstActionReaction": "하이패스 기록과 업무표만 계산하면 민재는 거래처 미팅, 차 막힘, 과일상자 예약을 끝없이 늘어놓는다. 늦게 말한 이유라는 핵심은 바쁜 일정 더미 속에 파묻힌다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "다은에게 반찬가게 영수증보다 왜 메뉴를 늘리면서도 민재와 다시 비용 얘기를 안 했는지, '어차피 내가 또 다 할 것'이라는 확신이 있었는지 묻게 되면 숨은 전제가 나온다. 그때 장보기 확대가 단순 정성이 아니라 조율 포기였다는 점이 보인다.",
        "worstActionReaction": "정육점 수량과 전값만 따지면 다은은 곧 전, 나물, 과일, 설거지를 한꺼번에 읊으며 고생 총량으로 판을 바꾼다. 메뉴 확대 미공유라는 쟁점은 노동 경쟁에 밀려 버린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "20만원 이체 내역과 어머니의 '용돈 잘 받았다' 답장을 같이 보여 주면 돈의 명목이 재료비가 아니라 부모 용돈이었다는 점이 단단해진다. e-4 하나로 다은의 당연한 정산 가정이 크게 흔들린다.",
        "worstActionReaction": "다은이 얼마나 지쳤는지만 받아주면 20만원은 다시 '당연히 내 장보기 정산'처럼 뭉개진다. 감정은 커져도 돈의 성격을 가르는 검증은 뒤로 미뤄진다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "둘 다 '또 내가 손해 봤다'는 감정이 강하니, 누가 더 힘들었는지보다 작년 역할표를 왜 문장으로 남기라 했는지 먼저 짚어 주는 게 좋다. 그 순간 이번 명절 실패가 한쪽 배신이 아니라 규칙 미이행의 공동 문제로 옮겨 간다.",
        "worstActionReaction": "누가 몇 시에 도착했고 얼마를 썼는지만 재면 남매는 각자 자기 억울함 증거만 들고 나온다. 그러면 명절 분담 원칙을 둘 다 놓친 구조는 다시 계산표 밖으로 밀려난다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "empathy_approach",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "arrival_promise_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "empathy_approach": "nonjudgmental_question",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "late_notice_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "afternoon_schedule_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "shopping_scale_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "menu_change_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "transfer_meaning_question",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "mother_reply_followup"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_feeling_left_alone",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_feeling_left_alone",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "이번 명절의 폭발은 하루 일정 하나보다 '또 내가 더 했다'와 '또 나는 성의 없는 동생이 됐다'는 누적 감정이 먼저 쌓인 결과였다. 그래서 애매한 한 줄 메시지도 곧바로 인격 판정처럼 읽혔다.",
        "unlockHint": "empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-3"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "다은은 금요일까지 과일, 고기, 전 종류를 늘리고 반찬가게 주문까지 추가했는데, 민재와 비용 항목을 다시 합의하지 않았어요. 본인이 알아서 준비한 거예요.",
        "민재는 금요일 저녁 출발이 어렵다는 걸 오후에 이미 알았는데, 다은에게는 밤이 다 돼서야 '아침에 가겠다'고 알렸습니다. 늦은 통보와 확대된 준비가 겹쳐서 서운함이 폭발한 거예요."
      ],
      "tp-2": [
        "민재의 원래 메시지는 '되면 금요일 밤, 안 되면 토요일 아침'이었습니다. 무조건 금요일에 온다는 확정 약속은 아니었어요. 다만 다은은 '금요일 밤'만 기억하고 준비를 확대한 거예요.",
        "또 문제가 된 20만원은 민재가 어머니 용돈으로 보낸 돈이지, 다은과 합의한 재료비 분담금이 아니었습니다. 같은 송금을 서로 다른 의미로 이해하면서 돈 문제까지 겹쳤어요."
      ],
      "tp-3": [
        "남매는 작년에 도착 시간, 메뉴 확정, 비용 항목을 미리 적기로 약속했지만, 민재는 통보를 늦췄고 다은은 규모 변경을 공유하지 않았습니다. 작년 규칙을 둘 다 안 지킨 거예요.",
        "이 건은 누가 더 서운한지보다, 같은 메시지를 서로 다르게 읽고 확인 한 통화를 끝까지 미룬 구조가 반복되는 게 핵심입니다."
      ]
    }
  },
  "family-11": {
    "personalityTags": {
      "a": [
        "martyr_complex",
        "victim_identity",
        "manipulative",
        "authority_challenging"
      ],
      "b": [
        "cold_logical",
        "privacy_sensitive",
        "detail_obsessed",
        "authority_challenging"
      ]
    },
    "contentTags": {
      "d-1": [
        "family_care",
        "secret_keeping",
        "privacy",
        "third_party_risk"
      ],
      "d-2": [
        "family_care",
        "privacy",
        "secret_keeping",
        "third_party_risk"
      ],
      "d-3": [
        "family_care",
        "third_party_risk",
        "misleading_soft_evidence",
        "reputation_risk"
      ],
      "d-4": [
        "family_care",
        "privacy",
        "third_party_risk",
        "reputation_risk"
      ],
      "d-5": [
        "family_care",
        "third_party_risk",
        "reputation_risk",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "subjective_claim",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "하원 변경 로그, 조기 하원 시각, 사설 클리닉 신청서의 보호자 기재란을 한 묶음으로 제시하면 연숙의 행동이 '도와준 것'이 아니라 부모 동의 밖 결정이었다는 점이 분명해진다. e-2는 선의 주장보다 절차 침범을 먼저 고정해 준다.",
        "worstActionReaction": "손주 걱정을 먼저 달래면 연숙은 곧 '내가 안 봤으면 더 큰일'로 올라탄다. 그러면 무단 하원과 보호자 허위 기재는 보호자 희생담 뒤로 숨어 버린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "하린에게 엄마 개입이 싫었다면 왜 야근 주간마다 태블릿 식사와 긴급 픽업을 다시 맡겼는지, 도움을 끊지 못한 미안함과 필요를 함께 말하게 해야 한다. 그 질문이 들어가야 일관된 양육 원칙이 왜 실제론 흔들렸는지가 열린다.",
        "worstActionReaction": "업무캘린더와 태블릿 로그만 들이대면 하린은 '야근 주간만 그랬다'며 범위를 줄이고 버틴다. 그러면 조모 의존을 재조율하지 않은 책임은 끝까지 주변화된다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.94,
          "motive_search": 1.07,
          "empathy_approach": 0.88,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "잘린 담임 메시지 앞뒤 문장과 상담일지를 함께 붙이면, '검사부터 하라'가 아니라 수면·등원 리듬과 보호자 소통을 정리하라는 실제 권고가 살아난다. e-1의 잘린 공포를 e-6의 원문이 바로잡아 주는 구조다.",
        "worstActionReaction": "아이 발달 불안만 공감해 버리면 연숙은 학습 걱정을, 하린은 경계 침범 분노를 더 키운다. 정작 교사와 상담사의 실제 권고 원문은 감정 싸움 뒤로 밀려난다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.3,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "예전 응급실 밤을 곧바로 처벌 프레임으로 몰지 말고, 모두가 겁에 질려 기록도 정리 못 한 밤이었다는 분위기부터 받아줘야 약봉투 사진과 투약 간격 문제가 입 밖으로 나온다. 수치심이 큰 기억이라 공감이 먼저 문을 연다.",
        "worstActionReaction": "약 이름과 시각만 캐묻으면 연숙은 '급한 밤이라 헷갈렸다'로 버티고, 하린도 흐릿한 기억을 끌어오느라 단순 고열 프레임만 더 굳힌다. 핵심은 숫자보다 숨긴 불안이다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.95,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "이미 픽업권 차단과 교사 메시지 친척 전달까지 외부 노출이 생긴 사건이니, 더 퍼뜨리지 않고 부모·조모 권한선만 다시 그리겠다고 약속해 주면 두 사람 다 자기 위반을 조금씩 인정한다. 비밀 보장이 있어야 '나도 선을 넘었다'는 말이 나온다.",
        "worstActionReaction": "동의서 문장만 들이대면 연숙은 손주 안전을, 하린은 엄마 침범을 더 크게 세우며 서로 자기 예외만 주장한다. 규칙을 둘 다 다른 방식으로 깼다는 구조는 법조문 싸움 속에 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "pickup_change_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "guardian_signature_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "routine_consistency_question",
          "present_if_lawful:e-3": "e-3_presented",
          "motive_search": "tablet_time_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "teacher_recommendation_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "full_message_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "old_er_night_question",
          "evidence_present:e-4": "e-4_presented",
          "investigate_only:e-5": "e-5_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "present_if_lawful:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_not_feeling_overridden",
          "present_if_lawful:e-3": "e-3_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_not_feeling_overridden",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "emotion",
        "deeperReveal": "예전 응급실 밤은 기록으로 다시 맞춰 본 적이 없어서, 연숙은 '내가 살렸다'는 기억만, 하린은 '뭔가 이상했지만 못 캐물었다'는 불안을 각각 들고 있었다. 현재의 학교·병원 개입은 그 미정리된 밤의 불안을 다시 건드렸다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-3"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "연숙 할머니는 부모 동의 없이 유치원 하원 시간을 바꾸고, 준서를 사설 언어·집중 상담 클리닉에 데려가면서 자신을 보호자로 기재했어요. 걱정에서 출발한 건 맞지만 선을 넘었습니다.",
        "하린도 할머니 개입에 화가 난 건 이해하지만, 야근 주간에 태블릿 식사와 할머니 긴급 픽업에 의존하면서도 다시 조율을 안 한 건 문제였어요. 과거 중복 투약 사건 이후 두려움이 깊어서 더 격하게 반응한 거예요."
      ],
      "tp-2": [
        "담임교사의 실제 권고는 추가 검사나 학습이 아니라 수면·등원 리듬과 부모-교사 소통을 먼저 맞추라는 거였습니다. 할머니는 그걸 다른 조치로 해석해서 사설 상담까지 데려간 거예요.",
        "준서의 응급실 방문도 단순 고열만이 아니라, 할머니가 성인용 감기시럽과 해열제를 짧은 간격으로 중복 투약한 흐름이 겹쳐 있었습니다. 걱정에서 시작됐지만 결과는 위험했어요."
      ],
      "tp-3": [
        "의료·교육 결정은 부모 동의 후에 하기로 약속했는데, 연숙은 직접 클리닉을 잡고 보호자를 자기로 기재했고 하린은 즉시 픽업권을 끊고 교사 메시지를 친척에게 돌리며 규칙을 같이 무너뜨렸습니다.",
        "이 건은 누가 아이를 아끼느냐가 아니라, 아이 돌봄의 결정 권한을 누가 갖느냐에서 선이 흐려진 겁니다. 양쪽 다 다른 명분으로 같은 약속을 어겼어요."
      ]
    }
  },
  "family-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "manipulative",
        "retaliation_sensitive",
        "face_sensitive"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "shame_sensitive",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "privacy",
        "reputation_risk",
        "third_party_risk"
      ],
      "d-2": [
        "financial",
        "privacy",
        "third_party_risk",
        "reputation_risk"
      ],
      "d-3": [
        "financial",
        "privacy",
        "third_party_risk",
        "reputation_risk"
      ],
      "d-4": [
        "financial",
        "privacy",
        "third_party_risk",
        "reputation_risk"
      ],
      "d-5": [
        "promise_violation",
        "financial",
        "reputation_risk",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "emotional_context",
      "t-2": "subjective_claim",
      "t-3": "core_fact",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "가족방, 고모방, 제사준비방 전달 로그를 순서대로 붙이면 지연이 한 번 감정적으로 올린 게 아니라 여러 방에 같은 낙인을 반복 확산시켰다는 점이 드러난다. e-5의 순서가 공개 비난의 무게를 가장 정확히 보여 준다.",
        "worstActionReaction": "장녀로서 얼마나 힘들었는지만 먼저 받아주면 지연은 곧 '어머니 보호' 프레임으로 숨어 버린다. 그러면 현우를 여러 방에서 공개 망신 준 책임은 보호 서사에 가려진다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "현우에게 숫자 자체보다 왜 장례 중에도 사촌에게 중복 식대와 화환을 먼저 물었는지, 정산이 숨겨질까 불안했는지 묻게 되면 차가운 표현 뒤의 불신이 드러난다. 그때 비로소 무심한 말이 어디서 왔는지 보인다.",
        "worstActionReaction": "식대 합계와 화환 수량만 다시 계산하면 현우는 곧 회계 검증 모드로 올라탄다. 상중에 그 말을 흘린 무심함은 숫자 더미 뒤로 숨어 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "문제 캡처와 현우-사촌 원본 채팅을 같은 문장 단위로 대조하면, 정산 질문은 있어도 '엄마 통장부터 보자' 같은 모욕 문장은 원본에 없다는 점이 바로 드러난다. e-1과 e-2를 붙여야 오해가 아닌 위조 문구 삽입이 보인다.",
        "worstActionReaction": "현우가 억울해하는 마음만 달래면 지연은 다시 '애도 중에 그런 말을 한 것 자체가 문제'로 돌아간다. 그 순간 문제 문장이 원본이었는지 여부는 또 뒤로 밀린다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "위조 여부는 이미 친척 평판과 얽혀 있으니, 재판관이 추가 전파를 막고 포렌식 감정서와 나와의 채팅 임시문장을 비공개로 보겠다고 해야 한다. 그래야 지연도 편집 흔적을 덜 숨기고 e-3, e-4 대면이 가능해진다.",
        "worstActionReaction": "캡처 한 장만 들고 '합성이냐 아니냐'를 몰아붙이면 지연은 곧 현우의 차가운 태도 비난으로 튄다. 그러면 합성 과정 로그와 자동저장 파일이라는 결정 자료가 또 감정 뒤로 밀린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 0.95,
          "separation": 1.05,
          "confidential_protection": 1.25
        },
        "bestActionHint": "장례 후 정산은 원래 조용히 하기로 했던 만큼, 먼저 친척방 밖에서 문제를 수습하겠다는 안전선을 줘야 현우의 사이드채팅과 지연의 공개망신이 둘 다 규칙 위반이었다는 말이 나온다. 체면 보호가 선행돼야 공동 파기가 인정된다.",
        "worstActionReaction": "누가 먼저 규칙을 깼는지만 따지면 현우는 사적 질문을, 지연은 가족방 보호를 내세워 서로의 파기를 정당화한다. 그러면 공유 원칙이 두 사람 손에서 함께 무너졌다는 본질은 다시 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "family_room_forward_question",
          "investigate_only:e-1": "e-1_presented",
          "investigate_only:e-5": "e-5_presented",
          "motive_search": "direct_confirmation_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "private_complaint_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "timing_during_mourning_followup",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "money_first_frame_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "original_chat_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-3",
          "investigate_only:e-4"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "edited_capture_question",
          "evidence_present:e-3": "e-3_and_e-4_presented",
          "investigate_only:e-4": "e-3_and_e-4_presented",
          "empathy_approach": "nonjudgmental_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_being_doubted_as_treasurer",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_being_doubted_as_treasurer",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "지연은 장례 정산을 맡은 사람으로서 의심받는 순간 모든 절차 통제권이 무너질까 두려웠다. 그래서 현우의 무심한 비용 불만을 '장례를 돈으로만 보는 사람'이라는 단일 이미지로 굳혀 버리며 스스로를 지키려 했다.",
        "unlockHint": "motive_search 또는 empathy_approach + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "지연이 가족방에 캡처를 올리자 '현우가 상갓집도 정산이라며 엄마 통장부터 보자고 했다'는 말이 순식간에 퍼졌어요. 슬픔이 가시기도 전에 현우를 악역으로 정해 버린 분위기였습니다.",
        "현우가 사촌에게 화환과 식대 중복을 차갑게 따진 건 사실이에요. 다만 가족방에 돈 캡처처럼 아버지 장례와 어머니 통장을 한 문장으로 비하한 건 현우의 원문이 아니었어요."
      ],
      "tp-2": [
        "지연은 캡처를 가족방, 고모방, 제사준비방에 차례로 올렸습니다. 내용을 따지기 전에 '저런 마음으로 장례를 치렀냐'는 반응이 먼저 터지면 이미 캡처의 진위를 물을 분위기가 아니에요.",
        "현우가 비용 불만을 사촌에게 차갑게 말한 건 사실이지만, 가족방 캡처처럼 장례와 통장을 한 문장으로 비하한 표현은 보내지 않았습니다. 비용 질문은 스프레드시트로 하기로 한 약속을 현우도 어긴 건 맞지만요."
      ],
      "tp-3": [
        "저는 가족방에 올라간 캡처를 보면, 현우의 원문이 아니라 서로 다른 대화의 말풍선과 지연이 따로 적어 둔 문장을 이어 붙인 위조 이미지라는 걸 확인했습니다.",
        "현우는 정산 질문과 중복 비용 문제를 제기한 적은 있지만, 캡처처럼 장례와 통장을 비하하는 표현을 보내지 않았습니다. 비용 질문은 1:1 통화로만 하기로 했지만 현우는 사이드채팅으로, 지연은 공개 캡처로 약속을 함께 깼어요."
      ]
    }
  },
  "friend-01": {
    "personalityTags": {
      "a": [
        "avoidant",
        "shame_sensitive",
        "timeline_padding",
        "relationship_preserving"
      ],
      "b": [
        "confrontational",
        "fairness_obsessed",
        "counter_attack",
        "retaliation_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "secret_keeping",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "third_party_risk",
        "reputation_risk",
        "trust_breach"
      ],
      "d-3": [
        "financial",
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-5": [
        "promise_violation",
        "third_party_risk",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "emotional_context",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "도윤에게 왜 숙소 환급금을 바로 말하지 않고 택시값과 스스로 상계하려 했는지 캐묻는 편이 좋다. 친구들 사이에서 계산 흐린 사람으로 보이기 싫었던 계산이 입으로 새기 시작한다.",
        "worstActionReaction": "환급 입금 시각만 들이대면 도윤은 곧 \"여행 전체로 보면\"이라는 큰 틀로 도망친다. 정산표 반영 지연보다 전체 맥락 논쟁으로 쟁점을 바꿔 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.08,
          "confidential_protection": 1.1
        },
        "bestActionHint": "하린의 스토리 보관본과 김수아 대화창을 같이 붙이면, 단순 분노 표출이 아니라 제3자 확산 선택이었다는 점을 피하기 어렵다. 캡처 한 장이 누구에게 어떻게 나갔는지가 핵심이다.",
        "worstActionReaction": "하린의 억울함만 먼저 받아주면 그는 18만4천 화면만 다시 꺼내 들며 피해 서사로 올라탄다. 공통 친구 공유와 SNS 저격 문제는 뒤로 밀려난다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "motive_search",
        "actionScores": {
          "fact_pursuit": 1,
          "motive_search": 0.95,
          "empathy_approach": 0.97,
          "evidence_present": 1.23,
          "separation": 1.03,
          "confidential_protection": 1.18
        },
        "bestActionHint": "정산 앱 원본 CSV에 숙소 환급 반영 시점과 택시 결제 취소 대기를 나란히 대면하면, 둘이 붙잡은 중간 숫자가 임시 화면이었다는 점이 즉시 드러난다.",
        "worstActionReaction": "누가 더 얄밉게 굴었는지부터 따지면 실제 차액 계산은 감정 싸움에 묻힌다. 중간 캡처가 왜 부풀려 보였는지 검증할 기회가 사라진다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "도윤에게 갚기 싫었느냐고 몰기보다 왜 혼자 환급금과 택시비를 맞춰도 된다고 여겼는지 비난 없이 묻는 쪽이 유효하다. 체면 때문에 미뤘던 차용금 얘기가 그때 나온다.",
        "worstActionReaction": "영수증 금액만 세게 밀어붙이면 도윤은 택시비, 보증금, 전체 여행비를 한 덩어리로 뭉개 버린다. 별도 차용 문제를 끝까지 흐리게 만든다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "부산 때 정한 \"원본 보기 전엔 밖에 말하지 말자\" 규칙을 두 사람이 왜 각자 어겼는지 동기부터 가르면, 도윤의 은닉과 하린의 공개 확산이 같은 불신에서 나왔다는 구조가 드러난다.",
        "worstActionReaction": "누가 먼저 잘못했는지만 순번으로 재면 둘 다 자기에게 유리한 장면 하나만 붙든다. 쌍방 규칙 위반이라는 결론은 끝까지 뒤로 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_refund_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "why_not_share_immediately_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "present_if_lawful:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "third_party_share_question",
          "evidence_present:e-5": "e-5_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "story_post_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "middle_screen_amount_question",
          "evidence_present:e-2": "e-2_or_e-6_presented",
          "evidence_present:e-6": "e-2_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_offset_intent",
          "fact_pursuit": "taxi_loan_question",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "nonjudgmental_question_about_offset_intent"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "둘 다 숫자 자체보다 \"친구들 사이에서 계산 흐린 사람\" 혹은 \"과하게 공개 저격한 사람\"으로 남을까 두려워, 실제 차액보다 상대 의도를 먼저 단정해 버렸다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "여행 직후 정산 앱에 18만4천원 차이가 찍혀 있었는데, 나중에 보니 숙소 보증금 환급과 공항 택시 취소 대기가 반영 안 돼서 부풀려진 숫자였어요. 실제 차액은 2만2천원 수준이었습니다.",
        "도윤이 보증금 환급 9만2천원을 바로 알리지 않은 건 문제였고, 하린이 정산이 확정되기 전에 SNS 저격과 공통 친구에 캡처를 먼저 보낸 것도 문제였어요. 액수보다 태도에서 서운함이 터진 겁니다."
      ],
      "tp-2": [
        "정산 앱 중간 화면의 큰 차이는 보증금 환급과 택시 카드 취소 대기가 반영되기 전의 착시였습니다. 최종 정산하면 택시 차용분 포함 실제 차액은 2만2천원 수준이에요.",
        "도윤은 공항 택시비 자기 몫 7만원을 하린이 대신 낸 뒤, 보증금과 상계하면 된다고 혼자 판단했어요. 둘 다 '원본 영수증으로만 정산하고 제3자에게 먼저 말 안 하기' 약속을 깼습니다."
      ],
      "tp-3": [
        "저는 숙소 보증금 9만2천원을 도윤 계좌로 환급한 기록이 남아 있습니다. 그런데 두 분이 따로따로 연락해 오셔서, 정산이 아직 맞춰지지 않았다는 걸 바로 알았어요.",
        "같은 환급금인데 도윤은 '상계할 돈'으로, 하린은 '숨긴 돈'으로 이해하고 있었습니다. 금액보다 설명이 공유되지 않은 게 오해를 키웠어요."
      ]
    }
  },
  "friend-02": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "privacy_sensitive",
        "selective_quote",
        "trust_broken"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "relationship_preserving",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "secret_keeping",
        "third_party_risk",
        "trust_breach"
      ],
      "d-2": [
        "privacy",
        "reputation_risk",
        "trust_breach",
        "misleading_soft_evidence"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "reputation_risk",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "misleading_soft_evidence",
        "third_party_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "promise_violation",
        "secret_keeping",
        "third_party_risk",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "emotional_context",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.08,
          "confidential_protection": 1.3
        },
        "bestActionHint": "민재에게 배신자 낙인을 벗겨 줄 안전선부터 깔아 주고, 박서후에게 어디까지 털어놨는지를 분리해 묻는 편이 좋다. 비밀을 넘긴 범위를 수치심 없이 말하게 만들어야 한다.",
        "worstActionReaction": "전달한 파일 양과 문장 수부터 세게 들이치면 민재는 곧 \"중간에서 막으려던 거였다\"는 선의 포장으로 숨는다. 제3자 전달 사실보다 의도 해명만 길어진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.08,
          "confidential_protection": 1.1
        },
        "bestActionHint": "태블릿 자동로그인 기록과 친한친구 스토리 보관본을 같이 놓고 보면, 가은이 우연히 본 척하거나 그냥 답답해서 올렸다고만 버티기 어려워진다.",
        "worstActionReaction": "배신감부터 크게 공감해 주면 가은은 저격 스토리를 정당한 분노처럼 설명한다. 태블릿 알림 무단 확인과 공개 암시가 한꺼번에 가려진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.22,
          "motive_search": 0.93,
          "empathy_approach": 0.7,
          "evidence_present": 1.28,
          "separation": 1.08,
          "confidential_protection": 1.02
        },
        "bestActionHint": "보조계정 접속기기, 게시 시각, 삭제 전 보존 로그를 정면으로 붙이면 \"표현이 민재 말투였다\"는 추정이 깨진다. 직접 작성자와 의심 대상이 갈라지는 순간이다.",
        "worstActionReaction": "민재의 억울함만 달래면 그는 상처받은 중간자 역할에 머문다. 박서후 계정 흔적을 짚어야 할 타이밍이 감정 해명으로 흘러간다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 1.05,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "박서후 이름을 보호 장치 없이 들이미는 대신, 민재가 누구를 살리려다 더 꼬이게 했는지 비밀 보호 맥락에서 접근해야 한다. 그래야 편집 음성파일과 전달 순서가 입 밖으로 나온다.",
        "worstActionReaction": "박서후를 공범이라고 초반부터 단정하면 민재는 결탁자로 보일까 봐 바로 닫힌다. 그 뒤로는 \"난 직접 올린 적 없다\"만 반복하게 된다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.08,
          "confidential_protection": 1.15
        },
        "bestActionHint": "가은이 왜 스토리로 쏘았고 민재가 왜 박서후를 택했는지 동기를 따로 떼어 물으면, 둘 다 사적인 비밀을 동호회 평판 싸움에 끌어온 선택이 선명해진다.",
        "worstActionReaction": "전달 시각과 게시 순서만 줄 세우면 둘 다 상대의 큰 잘못만 고른다. 자기 쪽 외부화는 예외였다는 식으로 빠져나갈 구멍이 생긴다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "fact_pursuit",
          "present_if_lawful:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "trust_breach_question",
          "fact_pursuit": "third_party_forward_question",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "trust_breach_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "investigate_only:e-4",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "tablet_access_question",
          "evidence_present:e-3": "e-3_presented",
          "investigate_only:e-4": "e-4_presented",
          "motive_search": "wifi_or_preview_log_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "anonymous_post_question",
          "evidence_present:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "park_seohoo_question",
          "evidence_present:e-5": "e-5_or_emotion_threshold",
          "evidence_present:e-6": "e-6_presented",
          "separation": "nonjudgmental_question_about_why_he_protected_friend"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "present_if_lawful:e-1"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-3": "e-3_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "박서후와의 어색한 과거가 남아 있었는데도 둘 다 그 긴장을 정리하지 못한 채 비밀을 돌려 말하다 보니, 민재는 조언 구하기와 배신 사이 선을 흐렸고 가은은 민재를 단독 범인으로 굳혀 버렸다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-4 현재 S4 이상",
        "impactDisputes": [
          "d-1",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "처음엔 가은씨와 민재 사이의 사적인 고민인 줄 알았어요. 그런데 며칠 뒤 온라인 커뮤니티에 가은의 비밀 연애와 동호회 역할 문제가 익명으로 올라왔고, 제 이름도 주변에 묶이기 시작했습니다.",
        "더 당황스러웠던 건 그 익명 글이 민재가 올린 게 아니라는 점이에요. 나중에 알고 보니 민재가 넘긴 자료를 편집해서 익명계정으로 뿌린 건 공통 친구 서후 쪽이었습니다."
      ],
      "tp-2": [
        "민재는 가은이 보낸 비밀 음성메모와 대화 요약을 공통 친구 서후에게 넘기며 조언을 구했습니다. 그것 자체가 가은의 신뢰를 깬 거예요.",
        "가은도 카페에 남겨진 민재 태블릿 알림을 무단으로 확인하고, 곧바로 민재를 겨냥한 인스타 스토리를 올렸습니다. 둘 다 '사적 비밀을 평판 싸움에 안 쓰기' 약속을 깼어요."
      ],
      "tp-3": [
        "저는 익명 글과 댓글의 작성자가 민재가 아니라는 걸 확인했습니다. 서후의 보조 계정에서 올라간 것이었고, 가은의 음성메모도 서후가 잘라 편집해서 뿌린 거예요.",
        "민재는 비밀을 서후에게 넘긴 책임이 있고, 가은은 확인 안 된 상태에서 저격 스토리를 올린 책임이 있습니다. 하지만 자료를 실제로 편집하고 확산시킨 건 제3자인 서후였어요."
      ]
    }
  },
  "friend-03": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "detail_obsessed",
        "manipulative",
        "shame_sensitive"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "retaliation_sensitive",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "trust_breach",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "misleading_soft_evidence",
        "reputation_risk",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "privacy"
      ],
      "d-4": [
        "reputation_risk",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "reputation_risk",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "emotional_context",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "협업 게시물 댓글 보관본과 지운 스토리 로그를 함께 들이밀면, 지후가 실명은 안 적었어도 나래를 겨눈 선공이었다는 점이 살아난다. 공개 암시가 먼저였는지 확인하는 쟁점이다.",
        "worstActionReaction": "지후의 장사 스트레스부터 받아주면 그는 문제 댓글을 소비자 경고처럼 포장한다. 협업 게시물 아래 남긴 명예훼손성 표현은 뒤로 숨어 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.08,
          "confidential_protection": 1.1
        },
        "bestActionHint": "나래 편집앱 프로젝트 파일과 원본 DM 해시 대조표를 나란히 놓아야 한다. 받은 화면을 옮긴 게 아니라 만들었다는 점이 거기서 갈린다.",
        "worstActionReaction": "나래의 억울함을 먼저 껴안으면 그는 캡처를 \"정리한 자료\" 정도로 낮춘다. 합성 책임이 자료 형식 논쟁으로 바뀌어 버린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1.03,
          "confidential_protection": 1.2
        },
        "bestActionHint": "나래에게 왜 굳이 \"조회수용 피해자\"라는 문장을 한 장짜리 증거처럼 완성해야 했는지 묻는 편이 좋다. 평판을 되찾고 싶었던 조작 동기가 드러나야 원문 여부가 풀린다.",
        "worstActionReaction": "상처받은 협업자라는 자리부터 주면 그는 위조를 자기보호적 재구성처럼 부른다. 원문 export와 합성 이미지 대조가 계속 미뤄진다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "지후가 왜 배송 지연을 곧바로 \"나래가 돌렸다\"로 읽었는지 파고들면, 장사 평판 불안이 물류 지연을 도덕 문제로 키운 과정을 끌어낼 수 있다.",
        "worstActionReaction": "고객 항의가 힘들었다는 말만 받아주면 지후는 물류 확인서보다 자기 불안만 반복한다. 반납 등록 지연이라는 실무 원인이 뒷전이 된다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.97,
          "motive_search": 0.93,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.12
        },
        "bestActionHint": "둘 다 팔로워와 운영자 앞 체면에 묶여 있으니, 협업 채널 밖 공개행동을 일단 분리해 안전하게 다뤄야 한다. 그래야 댓글 선공과 위조 재게시가 차례로 인정된다.",
        "worstActionReaction": "누가 더 상처받았는지만 다독이면 두 사람 모두 자기 공개행동을 맞대응으로만 줄인다. 비공개 약속을 둘 다 깼다는 핵심이 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "evidence_present:e-2",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "public_comment_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "same_post_target_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "evidence_present:e-5",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "story_repost_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "file_creation_time_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "screenshot_authenticity_question",
          "evidence_present:e-3": "e-6_or_e-3_presented",
          "evidence_present:e-6": "e-6_or_e-3_presented",
          "motive_search": "layer_backup_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "sponsor_goods_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "return_log_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "old_rule_reminder",
          "confidential_protection": "nonjudgmental_question_about_why_she_needed_stronger_proof"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-2": {
        "category": "emotion",
        "deeperReveal": "나래는 이미 공개 댓글로 먼저 깎인 상태에서 \"말로는 못 이긴다\"는 공포가 커져, 캡처 형식이면 진짜처럼 믿게 만들 수 있다고 스스로를 정당화했다.",
        "unlockHint": "empathy_approach + d-2 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "지후가 같은 협업 게시물 아래 '협찬 물건도 자기 서사로 바꿔 판다'는 식으로 나래를 특정할 수 있는 댓글과 스토리를 먼저 올렸어요. 실명은 안 썼지만 알아볼 수 있었습니다.",
        "나래도 기존 대화 조각을 붙여서 지후가 자기를 조롱한 것처럼 보이는 캡처를 만들고, 운영자와 공통 친구에게 돌렸어요. 그 캡처가 지후의 실제 원문이 아니라는 게 나중에 밝혀졌습니다."
      ],
      "tp-2": [
        "지후의 공개 댓글이 먼저 나갔고, 나래의 위조 캡처가 뒤따랐습니다. 둘 다 '협업 갈등을 공개 게시물로 안 끌고 간다' 약속을 깼어요.",
        "나래가 협찬품을 유용했다는 의혹도 있었는데, 실제로는 협업사의 일괄 반납 등록 지연 때문이었습니다. 개인 판매나 보관에 돌린 사실은 확인되지 않았어요."
      ],
      "tp-3": [
        "저는 문제의 DM 캡처를 확인했는데, 지후가 보낸 단일 원문이 아니라 서로 다른 시기의 대화 버블과 프로필 레이어를 합쳐 만든 위조 이미지였습니다.",
        "지후의 공개 저격도 문제지만, 나래가 위조 캡처를 근거로 운영자에게 신고하고 친구들에게 퍼뜨린 것도 같은 무게입니다. 둘 다 '협업 갈등 비공개' 원칙을 어겼어요."
      ]
    }
  },
  "friend-04": {
    "personalityTags": {
      "a": [
        "confrontational",
        "fairness_obsessed",
        "emotionally_volatile",
        "detail_obsessed"
      ],
      "b": [
        "avoidant",
        "conflict_avoidant",
        "timeline_padding",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "promise_violation",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-4": [
        "financial",
        "sequence_sensitive",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "financial",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "다혜에게 왜 판매자의 재촉을 듣자마자 \"일단 묶자\"로 달렸는지 묻게 되면, 거래를 놓치고 싶지 않았던 조급함이 드러난다. 예약금 선지급은 감정보다 그 초조함에서 나왔다.",
        "worstActionReaction": "송금 시각만 세게 따지면 다혜는 곧 \"그때 바로 답했어야지\"로 방향을 튼다. 자기 선지급보다 현우의 늦은 반응이 전면에 선다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "현우가 판매자에게 보낸 \"사진대로면 갈게요\" 메시지와 픽업 직후 철회 문장을 나란히 보여 주면, 검토였을 뿐이라는 후퇴가 흔들린다.",
        "worstActionReaction": "하자 물건 떠안을까 무서웠다는 말만 받으면 현우는 자기 문장을 \"가능성 열어둔 답\" 정도로 축소한다. 확정처럼 들린 표현 책임이 사라진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.07,
          "motive_search": 1.07,
          "empathy_approach": 0.79,
          "evidence_present": 1.23,
          "separation": 1.03,
          "confidential_protection": 1.1
        },
        "bestActionHint": "픽업 사진, 냄새 메모, 누락 부속품 고지를 한 번에 놓고 \"괜찮다\"에 각자 무엇을 넣었는지 분리해 묻는 게 정답이다. 찢김 기준과 냄새 기준이 달랐다는 점이 핵심이다.",
        "worstActionReaction": "둘 다 캠핑 가고 싶었다는 분위기만 다독이면 찢김, 냄새, 방수, 구성품이 한데 섞인다. 결국 무엇을 합의했는지 다시 흐려진다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "누가 거래를 놓칠까 더 초조했는지부터 캐면, 다혜의 반반 발언과 현우의 애매한 확답이 왜 판매자에게는 같은 신호로 읽혔는지 풀린다.",
        "worstActionReaction": "누구 메시지가 먼저였는지만 줄 세우면 두 사람 모두 상대 한 문장만 문제 삼는다. 자기가 보낸 확정 신호는 말투 차이로 축소해 버린다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "작년 예약금 싸움이 남긴 불신을 먼저 인정해 주면, 다혜도 현우도 왜 이번에 확인보다 자기식 해석으로 달렸는지 방어가 풀린다. 예전 규칙을 왜 어겼는지가 그다음에 나온다.",
        "worstActionReaction": "이번 예약금 3만원 책임만 숫자로 재면 둘 다 현재 거래 하나로 몰아간다. 오래된 \"확정 문구\" 문제는 또 살아남는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "refund_notice_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "evidence_present:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "withdrawal_question",
          "evidence_present:e-6": "e-6_presented",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "resale_loss_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "condition_meaning_question",
          "evidence_present:e-5": "e-2_or_e-5_presented",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "seller_message_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-3": "e-3_or_responsibility_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "둘 다 예전 공동구매 실패 기억 때문에 상대가 또 답을 흐리거나 또 성급하게 확정할 거라고 미리 예상했고, 그래서 같은 문장을 서로 다른 기준으로 고정해 버렸다.",
        "unlockHint": "motive_search + d-3 현재 S2 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "현우가 '일단 잡아줘'라고 했을 때 다혜는 구매 허락으로 알아듣고 판매자에게 비환불 예약금 3만원을 바로 보냈어요. 현우는 조건부 보류였는데 다혜는 확정으로 받아들인 거예요.",
        "픽업 후에 현우가 냄새랑 방수 상태를 보고 반반 부담을 철회하자 다혜는 배신이라고 느꼈어요. 그런데 '상태 괜찮음'의 기준을 처음부터 합의한 적이 없었습니다."
      ],
      "tp-2": [
        "다혜는 찢김과 폴대 파손이 없으면 괜찮다고 봤고, 현우는 냄새·구성품·방수까지 포함해서 판단했습니다. '괜찮음'의 기준이 처음부터 달랐어요.",
        "또 둘 다 판매자에게 각자 다른 확정 신호를 따로 보냈어요. 다혜는 '반반으로 가져간다', 현우도 '사진대로면 갈게요'라고 해서, 판매자는 사실상 확정 거래로 이해한 거예요."
      ],
      "tp-3": [
        "저는 판매자로서 두 분이 따로 확정 메시지를 보내서 거래가 성사된 줄 알았습니다. 한쪽이 나중에 번복해도 예약금은 비환불이라 제 입장에선 난감했어요.",
        "작년에 '비환불 예약금은 명시적 확정 뒤에만 넣기'로 한 규칙이 있었는데, 다혜는 모호한 답으로 송금했고 현우는 사실상 구매 신호를 보내놓고 해석 여지를 남겼습니다. 둘 다 약속을 안 지킨 거예요."
      ]
    }
  },
  "friend-05": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "fairness_obsessed",
        "counter_attack",
        "face_sensitive"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "timeline_padding",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "reputation_risk",
        "secret_keeping",
        "trust_breach"
      ],
      "d-3": [
        "financial",
        "sequence_sensitive",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "sequence_sensitive",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "circumstantial",
      "t-4": "subjective_claim",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.05
        },
        "bestActionHint": "48만원 이체내역과 상환 약속 메시지를 바로 붙이면, 태오가 오래된 보증금 얘기를 길게 꺼내도 현재 돈을 별도로 안 갚은 사실은 피하기 어렵다.",
        "worstActionReaction": "태오의 난처함만 받아주면 그는 곧 2년 전 작업실 보증금 이야기로 넘어간다. 지금 갚지 않은 돈이 과거 맥락에 녹아 버린다."
      },
      "d-2": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.1,
          "separation": 1.08,
          "confidential_protection": 1
        },
        "bestActionHint": "서윤에게 독촉 캡처를 누구에게 어디까지 보냈는지, 그리고 왜 예전 보증금 맥락을 뺐는지 순서대로 고정해 묻는 게 좋다. 피해자 프레임의 편집 흔적이 선명해진다.",
        "worstActionReaction": "야간 병원비의 절박함만 공감해 주면 서윤은 현재 억울함만 키운다. 자기 쪽에 남아 있던 더 큰 채무 맥락은 다시 뒤로 숨는다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.22,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "작업실 보증금 잔액은 오래된 체면 문제라, 태오에게 옹졸하다는 낙인부터 걷어내야 열린다. 그래야 끝난 줄 알았던 돈이 실제로는 남아 있었다는 말을 꺼낸다.",
        "worstActionReaction": "남은 액수만 숫자로 몰아붙이면 둘 다 꽃장식 값, 영상 편집, 옛 호의까지 끌어와 본채무 계산을 다시 진흙탕으로 만든다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "태오에게 왜 굳이 말없이 계산으로만 맞추려 했는지 비난 없이 건드리면, 관계를 덜 깨뜨리려 숨긴 무단 상계 심리가 나온다. 이 쟁점은 창피함을 먼저 내려야 풀린다.",
        "worstActionReaction": "현재 48만원만 따로 세게 압박하면 태오는 즉시 \"원래 남는 돈이 있었잖아\"로 건너뛴다. 명시적 동의 없이 상계한 핵심이 사라진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "서윤은 왜 피해 서사를 키웠고 태오는 왜 조용히 상계하려 했는지 동기를 갈라 묻는 순간, 두 사람이 같은 기록·합의 규칙을 각자 다른 방식으로 무너뜨렸다는 구조가 보인다.",
        "worstActionReaction": "누가 더 큰 채무자냐만 겨루게 하면 현재 미상환과 과거 은닉이 서로의 면책 카드가 된다. 규칙 위반 자체는 뒤로 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "present_if_lawful:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "current_loan_question",
          "evidence_present:e-2": "e-2_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "public_spread_question",
          "evidence_present:e-6": "e-6_or_e-3_presented",
          "motive_search": "old_debt_omission_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_deposit_loan_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-5_presented",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_old_hurt",
          "fact_pursuit": "offset_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "nonjudgmental_question_about_old_hurt"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "둘 다 과거 큰돈을 정식으로 다시 꺼내는 순간 친구 관계가 숫자표로만 남을까 두려워, 보증금 잔액 문제를 애매하게 덮어 둔 채 현재 48만원만 따로 떼어 보았다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "한쪽이 반려견 야간 병원비를 빌려줬는데 약속한 날까지 안 돌아와서 화가 난 거예요. 그 캡처를 공통 친구와 스토리에 올리면서 '돈을 안 갚는 사람'으로 만들었습니다.",
        "그런데 서윤이 숨긴 게 있어요. 예전에 상대가 작업실 보증금을 대신 내 줬는데, 그 잔액을 아직 안 갚은 거예요. 현재 빌려준 돈만 보면 서윤이 피해자지만 전체 채무 관계는 다릅니다."
      ],
      "tp-2": [
        "태오는 현재 빌린 돈을 별도로 안 갚고, 예전 보증금 잔액에서 빼면 된다고 혼자 판단해서 임의 상계를 시도했습니다. 합의 없는 상계예요.",
        "서윤은 과거 빚을 뺀 현재 피해만 공통 친구에게 퍼뜨렸고, 태오는 현재 빚을 과거 채권과 조용히 상계하려 했어요. 둘 다 '큰돈은 시트에 기록하고 상계는 합의 뒤에만' 약속을 깼습니다."
      ],
      "tp-3": [
        "저는 이 건의 핵심이 지금 돈이냐 예전 돈이냐가 아니라, 둘 다 자기에게 불리한 채무를 숨긴 채 상대만 공격했다는 점이라고 봅니다.",
        "서윤이 현재 피해만 올린 건 과거 빚을 뺀 프레임이고, 태오가 조용히 상계한 건 합의 없는 독단이에요. 어느 쪽이 먼저 숨겼느냐보다, 공유 장부를 둘 다 비워 둔 게 불신의 시작입니다."
      ]
    }
  },
  "friend-06": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "detail_obsessed",
        "authority_challenging",
        "privacy_sensitive"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "relationship_preserving",
        "manipulative"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "reputation_risk",
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-3": [
        "privacy",
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "career",
        "privacy",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-5": [
        "promise_violation",
        "career",
        "trust_breach",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "emotional_context",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "블로그 revision, 유튜브 변경 로그, 핀댓글 삭제 시각을 한 화면에 붙이면 다솔의 \"급한 수습\"이 실제 수정 범위를 감추기 어렵다. 손댄 폭이 말보다 크다는 게 드러난다.",
        "worstActionReaction": "밤새 살리려 했다는 고생만 받아주면 다솔은 제목과 썸네일까지 건드린 일을 선의의 보정처럼 말한다. 직접 수정의 범위는 흐려진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.08,
          "confidential_protection": 1.05
        },
        "bestActionHint": "업계 단톡 비교 캡처와 접근권 회수 로그를 나란히 보여 주면, 해온이 권한 확인보다 공개 비난과 차단을 먼저 눌렀다는 순서를 부정하기 어렵다.",
        "worstActionReaction": "통제권을 뺏긴 공포만 먼저 인정하면 해온은 단톡 비난을 창작자 자기방어라고 부른다. 공개 망신을 준 부분은 뒷전이 된다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1.03,
          "confidential_protection": 1.2
        },
        "bestActionHint": "해온과 다솔 각각에게 \"수정권\"과 \"발행권\"을 어디서 다르게 상상했는지 캐묻는 쪽이 효과적이다. 무단 침입 프레임이 실제 권한 오해에서 출발했다는 점이 드러난다.",
        "worstActionReaction": "둘 다 억울했다는 말만 주고받으면 실제 초대메일과 브랜드계정 역할 화면을 확인할 동력이 사라진다. 권한 범위 오해가 감정 싸움으로 묻힌다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "다솔에게 왜 광고 표기 정정만 받고도 제목, 썸네일, 핀댓글까지 손댔는지 묻게 되면, 클릭률과 클라이언트 압박을 동시에 해결하려 한 계산이 튀어나온다.",
        "worstActionReaction": "브랜드 DM 문구만 기계적으로 읽으면 다솔은 곧 표현 해석 싸움으로 빠진다. 실제 수정 폭이 요청 범위를 넘었다는 사실이 흐려진다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "둘 다 업계방 체면과 협찬 신뢰를 잃기 싫어하니, 공개 망신 문제와 권한 문제를 분리해 안전하게 다뤄야 한다. 그래야 직접 수정과 즉시 차단이 차례로 인정된다.",
        "worstActionReaction": "누가 먼저 선을 넘었는지만 재촉하면 해온은 비난을, 다솔은 편집을 각각 응급조치라고 부른다. 최종 확인 규칙을 둘 다 깼다는 본질이 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "evidence_present:e-4",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "direct_edit_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_or_boundary_question",
          "motive_search": "pin_comment_delete_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "present_if_lawful:e-2",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "public_callout_question",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "access_revocation_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "permission_scope_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "sponsor_thread_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "sponsor_scope_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_workflow_reminder",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_deadline_pressure"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "해온은 창작 통제권을, 다솔은 광고 취소와 협찬 손실을 더 무섭게 느껴서, 권한 범위를 확인하기보다 각자 가장 두려운 결과를 막는 쪽으로 먼저 움직였다.",
        "unlockHint": "motive_search + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "다솔이 해온 블로그 본문과 유튜브 설명란을 직접 고치고 핀댓글까지 삭제한 건 사실이에요. 브랜드 쪽 수정 요청이 있었는데, 해온한테 같은 날 추가 확인을 안 했어요.",
        "해온도 권한 범위를 확인하기 전에 창작자 단톡에 비교 캡처를 올려 다솔을 공개 비난하고 바로 접근권을 끊었습니다. 설명보다 반응이 먼저 나간 거예요."
      ],
      "tp-2": [
        "브랜드 측은 광고 표기와 가격 문구 정정만 요청했는데, 다솔은 그 범위를 넘어 제목, 썸네일 문구, 핀댓글까지 바꿨어요. 수정 요청 범위를 넘긴 건 사실입니다.",
        "다만 다솔에게는 해온이 이전에 수락한 블로그 편집자와 유튜브 브랜드계정 매니저 권한이 실제로 부여되어 있었어요. 무단 침입이 아니라 권한 범위를 둘 다 정확히 이해하지 못한 거예요."
      ],
      "tp-3": [
        "둘은 '최종 공개 전 상호 확인'과 '협찬 수정 요청은 공동 스레드에서 공유' 약속이 있었는데, 다솔은 직접 수정했고 해온은 단톡 공개 비난과 즉시 차단으로 대응했습니다. 둘 다 절차를 깼어요.",
        "권한 설정은 기술 문제처럼 보여도 실제로는 신뢰 문제입니다. 불신이 생긴 뒤 바로 차단하면, 상대는 실수보다 배제로 받아들여요. 해온이 먼저 확인했으면 달랐을 겁니다."
      ]
    }
  },
  "friend-07": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "selective_quote",
        "detail_obsessed",
        "trust_broken"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "shame_sensitive",
        "relationship_preserving"
      ]
    },
    "contentTags": {
      "d-1": [
        "secret_keeping",
        "intimacy_suspicion",
        "trust_breach",
        "third_party_risk"
      ],
      "d-2": [
        "misleading_soft_evidence",
        "reputation_risk",
        "third_party_risk",
        "trust_breach"
      ],
      "d-3": [
        "intimacy_suspicion",
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "secret_keeping",
        "third_party_risk",
        "trust_breach"
      ],
      "d-5": [
        "secret_keeping",
        "career",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "성호에게 원본 메신저 export와 연습 스케줄 변경표를 같이 들이대면, \"소품 정리 중이라고 좀 말해 달라\"는 부탁이 단순 일정 조율이었는지 숨김용 알리바이였는지 바로 갈린다. 이 쟁점은 감정보다 부탁 문장이 남아 있는 로그가 더 세다.",
        "worstActionReaction": "성호의 압박감만 받아주면 그는 곧 \"그때 다들 예민했다\"는 동호회 분위기부터 길게 깐다. 비밀 연애를 숨기고 진아를 앞세운 선택은 배경 설명 속으로 숨어 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.08,
          "confidential_protection": 1.05
        },
        "bestActionHint": "진아의 한 장짜리 캡처와 원본 export, 동문 단톡 전달 기록을 차례로 맞대면 \"전달\"과 \"편집\"을 분리해서 말하기 어려워진다. 여러 시점 문장을 이어 붙였다는 구조가 보이면 확산 책임이 선명해진다.",
        "worstActionReaction": "배신감부터 크게 공감해 주면 진아는 곧 \"내가 폭로한 게 아니라 알려준 거야\"라는 단어 싸움으로 들어간다. 편집본을 어디까지 뿌렸는지보다 감정 정당화가 앞선다."
      },
      "d-3": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.2,
          "separation": 1.03,
          "confidential_protection": 1
        },
        "bestActionHint": "리더 선발 점수표와 이해충돌 제외 로그를 기준으로 \"누가 실제 채점에서 빠졌는지\"를 짧게 확인하는 편이 좋다. 연애 특혜 의혹은 해석이 아니라 배정·제외 기록부터 풀어야 한다.",
        "worstActionReaction": "성호의 억울함만 다독이면 그는 \"망치려던 게 아니었다\"는 의도 설명에 숨는다. 선발 절차를 확인해야 할 타이밍이 상처 호소로 바뀌어 버린다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.23
        },
        "bestActionHint": "작년 소문 사태와 2년 전 서로 비밀을 막아줬던 기억을 먼저 인정해 주면, 둘 다 왜 그 합의를 믿고도 각자 선을 넘었는지 훨씬 빨리 입을 연다. 이 쟁점은 규칙 문구보다 수치심을 먼저 낮춰야 열린다.",
        "worstActionReaction": "합의 노션 문장만 들이밀면 진아는 \"전달과 폭로는 다르다\"고 버티고, 성호는 \"타이밍을 못 잡았다\"고 빠져나간다. 신뢰 붕괴보다 단어 정의만 남는다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 0.95
        },
        "bestActionHint": "이도현 운영진이 가진 신고 경로 기록과 작년 합의 노션을 붙여 놓고 보면, 성호의 \"이미 제한 고지했다\"는 말이 실제 접수 흔적과 맞는지 바로 검증된다. 이 쟁점은 마음이 아니라 신고 시각 공백이 핵심이다.",
        "worstActionReaction": "성호의 불안만 달래면 그는 \"말하려고는 했다\"는 의도만 붙든다. 실제로 지정 운영진 통로를 쓴 적이 없었다는 빈칸은 끝까지 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "evidence_present:e-6",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "alibi_request_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "schedule_swap_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "present_if_lawful:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "screenshot_origin_question",
          "evidence_present:e-5": "e-2_or_e-5_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "export_comparison_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "present_if_lawful:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "selection_favoritism_question",
          "evidence_present:e-4": "e-4_presented",
          "present_if_lawful:e-1": "e-1_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_agreement_reminder",
          "evidence_present:e-2": "e-2_or_emotion_threshold",
          "evidence_present:e-3": "e-3_presented",
          "separation": "old_rule_reminder"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "pre_disclosure_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "emotion",
        "deeperReveal": "작년 소문 사태를 함께 겪으며 만든 제한 공개 규칙이 있었기 때문에, 이번 위반은 단순 연애 은닉이 아니라 \"예전에 서로 지켜 준 비밀까지 가볍게 본 것\"처럼 받아들여졌다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "성호가 부회장과 비밀 연애를 하면서 저한테 '소품 정리 중이라고 말해 달라'고 부탁했을 때, 전 그냥 가까운 사람 부탁으로 알았어요. 알리바이 요청인 줄은 나중에 알았습니다.",
        "진아가 성호의 여러 시점 메시지를 이어 붙여 의도가 더 나빠 보이게 편집한 건 봤어요. 공통 친구, 동문 단톡, 운영진에 연달아 보냈는데, '운영진에게만 알리자'는 약속을 진아도 안 지킨 거예요."
      ],
      "tp-2": [
        "성호는 리더 선발 전에 이미 운영진에게 관계를 알렸다고 주장했지만, 이해충돌 신고 기록과 DM 시각은 진아의 캡처 확산 뒤에야 남아 있었습니다. 순서가 안 맞아요.",
        "둘은 작년에 '이해충돌이 생기는 비밀 연애는 지정 운영진 한 명에게만 함께 알린다'고 합의했는데, 성호는 먼저 숨기고 알리바이를 요청했고 진아는 편집 캡처를 여러 채널로 확산시켰습니다."
      ],
      "tp-3": [
        "저는 실제 리더 선발에서 부회장이 채점에서 제외돼 있었다는 걸 확인했습니다. 성호의 선발 자체가 연애 특혜라고 확정되지는 않아요.",
        "다만 성호가 관계를 숨긴 채 선발에 참여하고, 진아가 편집 캡처로 여론을 만든 결과 공정성 의심이 커진 건 사실입니다. 의심을 막아 줄 투명한 신고가 미리 없었던 게 핵심이에요."
      ]
    }
  },
  "friend-08": {
    "personalityTags": {
      "a": [
        "martyr_complex",
        "face_sensitive",
        "blame_shifting",
        "victim_identity"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "detail_obsessed",
        "counter_attack"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "reputation_risk",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "career",
        "role_failure",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-3": [
        "career",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "career",
        "promise_violation",
        "role_failure",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "role_failure",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.08,
          "confidential_protection": 1
        },
        "bestActionHint": "시상 직후 카드뉴스, 포트폴리오 캡션, 몇 시간 뒤 edit history를 한 줄로 놓으면 은비가 \"내 프로젝트\" 인상을 실제로 만들었다는 점을 숨기기 어렵다. 이 쟁점은 문구 선택과 수정 시점이 곧 증거다.",
        "worstActionReaction": "은비의 밤샘 수습 고생만 받아주면 그는 자신이 고친 화면 이야기만 길게 쌓는다. 단독 성과처럼 보이게 만든 공개 문구 책임은 뒤로 밀린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "깃 저장소 로그와 리허설 출석표를 함께 대면하면, 준혁의 실제 기여와 별개로 마감 직전 비운 자리가 있었다는 점이 분리된다. \"많이 했다\"는 주장과 \"제시간에 안 왔다\"는 기록을 동시에 봐야 풀린다.",
        "worstActionReaction": "준혁이 인정 못 받았다는 서운함만 받아주면 그는 로그 더미를 한꺼번에 들이민다. 리허설 불참과 업로드 지연이라는 현재 쟁점은 기술 공로 설명 속에 묻힌다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.22,
          "evidence_present": 1.1,
          "separation": 1.03,
          "confidential_protection": 1.3
        },
        "bestActionHint": "공모전 제출 form, 팀원 입력란, 심사위원 회신 메일을 조용히 확인해 준다고 보장해야 준혁도 바깥 인식이 팀 프로젝트였다는 불편한 사실을 받아들이기 쉽다. 공개 망신 걱정이 낮아져야 서류가 열린다.",
        "worstActionReaction": "처음부터 \"개인작 아니었잖아\" 하고 몰아붙이면 은비는 곧 \"대표자 필드 하나였어\"라며 캡션 파급력을 축소한다. 외부 인식 검증이 표현 변명으로 새 버린다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.07,
          "empathy_approach": 1.05,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "교수, 동아리, 심사위원 앞 체면을 잠시 내려놓을 수 있게 비공개 보호를 깔아 주면 둘 다 회의록 빈칸과 기여도 문구 방치를 인정하기 쉬워진다. 누가 먼저 잘못했느냐보다 왜 아무도 마지막 문서를 안 닫았는지가 열쇠다.",
        "worstActionReaction": "기여 비율을 바로 숫자로 재기 시작하면 둘 다 상대의 마감 실수만 꺼낸다. 대표자 표기와 역할 문구를 비워 둔 공동 책임은 금세 사라진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "은비에게 왜 굳이 \"내 프로젝트\"라는 표현이 필요했는지, 준혁에게 왜 기록이 지워졌다고 느꼈는지 동기를 갈라 묻게 되면 공로 다툼의 진짜 상처가 보인다. 인정 욕구와 소외감이 풀려야 아이디어 이상으로 남은 기여도 다시 드러난다.",
        "worstActionReaction": "준혁의 억울함만 감싸면 은비는 \"그날 누가 남아 있었는데\"라며 밤샘 구조자 프레임으로 올라탄다. 설문 구조와 프로토타입 흐름에 남은 준혁의 몫은 다시 그림자 취급된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "present_if_lawful:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "solo_credit_post_question",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "caption_history_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "evidence_present:e-4",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "rehearsal_absence_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "upload_delay_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "solo_recognition_question",
          "evidence_present:e-2": "e-5_or_e-2_presented",
          "evidence_present:e-5": "e-5_or_e-2_presented",
          "confidential_protection": "confidential_prompt"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "role_log_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "juneok_contribution_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "judge_comment_question"
        },
        "pathBonus": 10
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "발표자 중심 구조와 마감 직전 수습 기억이 섞이면서 둘 다 \"내 공이 지워질 것\"부터 걱정했고, 그래서 대표자 표기와 팀 크레딧을 끝까지 문장으로 못 박지 못했다.",
        "unlockHint": "motive_search + d-4 현재 S2 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "은비가 시상 직후 카드뉴스와 포트폴리오에서 '내 프로젝트'처럼 올린 건 봤어요. 준혁 이름이 한동안 빠져 있었습니다. 실제로는 둘이 같이 만든 팀 프로젝트인데요.",
        "다만 준혁도 최종 리허설에 안 나오고 자료 업로드를 제때 못 해서, 은비가 발표 전날 결과물을 다시 정리해야 했어요. 밤새 버틴 쪽의 지침과 마지막에 빠진 쪽의 책임이 겹친 거예요."
      ],
      "tp-2": [
        "공모전 원본 제출과 심사 메일, 상장 표기는 팀 프로젝트로 되어 있었습니다. SNS와 포트폴리오에서 단독 성과처럼 보인 건 은비의 공개 문구 때문이에요.",
        "준혁의 기여가 아이디어 한 줄뿐이라는 주장도 있었지만, 설문 구조, 프로토타입 흐름, 부록 기술 설명에 실제로 반영돼 있었습니다. 과소평가는 사실이 아니에요."
      ],
      "tp-3": [
        "둘은 대표자 표기와 역할 문구를 사전에 합의하기로 했지만, 공동 기여 로그를 비워 둔 채 마감 직전까지 역할을 흐리게 두었습니다. 양쪽 다 방치한 거예요.",
        "저는 이 건이 은비의 단독 독식만이 아니라 준혁의 마감 불이행, 그리고 둘 다 크레딧 시트를 끝내 안 만든 공동 책임이라고 봅니다."
      ]
    }
  },
  "friend-09": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "selective_quote",
        "grudge_holding",
        "manipulative"
      ],
      "b": [
        "victim_identity",
        "timeline_padding",
        "blame_shifting",
        "avoidant"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "misleading_soft_evidence",
        "third_party_risk",
        "hard_evidence_available"
      ],
      "d-2": [
        "reputation_risk",
        "misleading_soft_evidence",
        "third_party_risk",
        "hard_evidence_available"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-4": [
        "reputation_risk",
        "third_party_risk",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-5": [
        "trust_breach",
        "secret_keeping",
        "sequence_sensitive",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "익명계정 가입·로그인·삭제 로그와 첫 댓글 시각을 정면으로 붙이면, 도건이 \"계정만 판 거야\"라고 책임을 잘라 말하기 어려워진다. 이 쟁점은 계정 생성과 최종 업로드가 한 손에 이어졌는지가 핵심이다.",
        "worstActionReaction": "도건이 끌려 들어갔다는 억울함만 받아주면 그는 금세 \"공구방 분위기가 이상했다\"는 배경으로 숨는다. 직접 만든 계정과 첫 댓글 책임이 희미해진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.08,
          "confidential_protection": 1.05
        },
        "bestActionHint": "유리 휴대폰 갤러리 백업과 편집앱 프로젝트 파일을 보여 주면, 후기 조각을 그냥 저장한 게 아니라 배치와 문구를 계산해 만든 콜라주였다는 점이 나온다. \"정리\"와 \"편집\"의 경계가 여기서 무너진다.",
        "worstActionReaction": "유리의 분노와 피해의식만 먼저 받아주면 그는 곧 \"공유한 거지 조작한 건 아니야\"라고 말 수위를 낮춘다. 후기 콜라주 제작 흔적은 감정 정당화 뒤로 숨어 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.05
        },
        "bestActionHint": "유리-도건 원본 메신저, 익명계정 로그, 콜라주 편집 파일을 한 화면에 놓아야 한다. 계정은 도건, 이미지 편집은 유리라는 역할 분담이 같이 보여야 단독 범행 프레임이 깨진다.",
        "worstActionReaction": "둘 중 누가 더 상처받았는지만 다독이면 둘 다 조가람 탓, 커뮤니티 탓 이야기로 빠진다. 공모 구조를 봐야 할 자리가 피해 서사 경쟁으로 바뀐다."
      },
      "d-4": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.15,
          "separation": 1.05,
          "confidential_protection": 0.95
        },
        "bestActionHint": "8개월 전 공개 지적 글, 후속 DM, 이번 폭로 시점을 시간순으로 짧게 따져 묻는 편이 좋다. 가을 시즌마켓 직전에 왜 옛 앙금이 다시 호출됐는지 드러나야 현재 행동이 단순 충동이 아니게 보인다.",
        "worstActionReaction": "조가람에게 당한 억울함부터 받아주면 유리와 도건은 둘 다 자신을 반응자처럼 포장한다. 먼저 판을 설계한 쪽이 누구였는지는 오래된 서운함 속에 묻힌다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.07,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.18
        },
        "bestActionHint": "과거 가람 분쟁과 공동 준비 대화가 다시 밖으로 새지 않도록 비공개를 약속해야, 둘이 왜 들통난 뒤 서로를 단독 주범처럼 밀어냈는지 말하기 시작한다. 체면 걱정이 낮아져야 사후 책임전가 구조가 열린다.",
        "worstActionReaction": "도건이냐 유리냐 한 사람만 찍어 사실 질문을 세게 던지면 둘은 \"조언\"과 \"공유\" 같은 말 차이에 매달린다. 과거 분쟁을 숨긴 공동 은폐는 끝까지 안 나온다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "evidence_present:e-4",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "anonymous_account_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "deletion_log_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "present_if_lawful:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "collage_origin_question",
          "evidence_present:e-5": "e-5_presented",
          "present_if_lawful:e-1": "e-1_presented",
          "motive_search": "project_file_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "sole_actor_question",
          "evidence_present:e-2": "e-2_or_e-5_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "joint_plot_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-3": "e-3_or_e-5_presented",
          "separation": "old_grudge_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_conflict_reminder",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "nonjudgmental_question_about_why_he_helped_blame_shift"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "8개월 전 공개 망신의 앙금이 아직 남아 있어 둘 다 이번 시즌마켓을 단순 경쟁이 아니라 되갚음의 기회처럼 읽었고, 그 감정이 익명 계정과 후기 편집을 정당화하는 연료가 됐다.",
        "unlockHint": "empathy_approach 또는 motive_search + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저는 시즌마켓 심사 직전에 익명 커뮤니티에 제 가게를 겨냥한 폭로글이 뜨고, 후기를 잘라 편집한 비교 이미지까지 돌았어요. 상습 문제 셀러처럼 만들어진 판이었습니다.",
        "나중에 알고 보니 이게 한 사람의 홧김이 아니라, 유리와 도건이 역할을 나눠서 설계한 공모였어요. 도건이 계정과 업로드를, 유리가 후기 편집과 확산을 맡았습니다."
      ],
      "tp-2": [
        "도건은 보조 메일과 기기로 익명 계정을 만들고 폭로글과 첫 댓글을 직접 올렸습니다. 유리는 구매자 후기와 DM 일부를 잘라 문제 셀러처럼 보이게 편집한 비교 이미지를 만들어 오픈채팅으로 퍼뜨렸어요.",
        "폭로가 들통난 뒤 둘은 8개월 전 경쟁 셀러 조가람과의 갈등과 공동 준비 사실을 숨긴 채, 공통 친구와 운영자에게 각각 '상대가 나를 끌어들였다'고 서로 다른 이야기를 했습니다."
      ],
      "tp-3": [
        "시즌마켓 부스 심사 직전에 이런 글이 터지면 품질 시비가 아니라 평판 공격입니다. 경쟁자 매장 신뢰를 떨어뜨리려 익명 폭로와 후기 편집을 역할 분담한 건 계획적이에요.",
        "이 건의 핵심은 8개월 전 조가람과의 갈등을 품은 유리와 도건이 심사 타이밍에 맞춰 함께 설계했다는 점입니다. 도건의 단독 폭주가 아니라 공모였어요."
      ]
    }
  },
  "friend-10": {
    "personalityTags": {
      "a": [
        "confrontational",
        "emotionally_volatile",
        "fairness_obsessed",
        "authority_challenging"
      ],
      "b": [
        "conflict_avoidant",
        "avoidant",
        "relationship_preserving",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "promise_violation",
        "role_failure",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "promise_violation",
        "role_failure",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-4": [
        "promise_violation",
        "role_failure",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "role_failure",
        "hard_evidence_available",
        "sequence_sensitive",
        "promise_violation"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "다정에게 왜 가족 단톡과 플래너에게 서아 이름을 먼저 돌릴 만큼 급했는지 묻는 편이 좋다. 결혼식 체면이 흔들릴까 두려운 마음이 열려야 \"검토 중\"을 \"확정\"으로 밀어 쓴 이유가 보인다.",
        "worstActionReaction": "문자 한 줄을 붙들고 \"그래서 예스냐 노냐\"만 재촉하면 다정은 다시 체크리스트와 일정표를 읽으며 이미 합의된 일처럼 밀어붙인다. 이름 선사용의 조급함은 숨는다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.05,
          "separation": 1.03,
          "confidential_protection": 1.25
        },
        "bestActionHint": "서아가 축가를 못 박지 못한 사정을 공개 창피 없이 말할 수 있게 비공개 보호를 걸어 줘야 한다. 목 상태와 행사 스케줄을 들키는 불안이 줄어야 애매한 답장을 왜 늦게 정리했는지 털어놓는다.",
        "worstActionReaction": "확정 문장을 바로 요구하면 서아는 곧 \"나는 축가 말고 들러리 얘기였어\"라며 역할 범위를 더 잘게 좁힌다. 늦은 정정 책임보다 표현 해석 싸움만 남는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.05
        },
        "bestActionHint": "공유 체크리스트 상태 범례, 반주자 DM, 음성메모를 나란히 놓으면 들러리와 축가가 같은 칸에 있어도 같은 확정은 아니었다는 점이 풀린다. 이 쟁점은 잘린 캡처보다 원본 상태값이 더 중요하다.",
        "worstActionReaction": "서아의 미안함이나 다정의 서운함만 달래면 둘 다 \"도와주려던 거였다\"는 말로 흘러간다. 명시적 확정이 있었는지 확인해야 할 핵심은 감정 공감 속에 지워진다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.23
        },
        "bestActionHint": "예전 결혼식에서 역할 이름이 엉켜 불편했던 기억을 먼저 꺼내 공감해 주면, 둘 다 왜 이번에도 \"확정 후 공지\" 규칙을 무너뜨렸는지 인정하기 쉬워진다. 친구 사이 기대와 호의가 얽힌 수치심부터 낮춰야 한다.",
        "worstActionReaction": "규칙 캡처를 들고 누가 먼저 어겼는지만 추궁하면 다정은 공지부터, 서아는 답장부터 따로 떼어 말한다. 같은 규칙을 각자 다르게 깨뜨린 구조는 안 보인다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "서아에게 왜 싸움이 붙자마자 들러리 쪽까지 전부 미확정이었다고 좁혀 말했는지 동기를 캐야 한다. 축가 책임을 벗고 싶었던 후퇴 심리가 보여야 치수 제출과 동선 확인이 가진 무게도 다시 보인다.",
        "worstActionReaction": "서아가 힘들었겠다고만 다독이면 그는 음성메모 길이와 컨디션 얘기만 늘어놓는다. 들러리 참여는 어느 정도 굳어져 있었다는 현실이 다시 흐릿해진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "lineup_announcement_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "explicit_confirm_message_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "confidential_prompt",
          "fact_pursuit": "ambiguous_reply_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "voice_note_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "both_roles_confirmation_question",
          "evidence_present:e-2": "e-2_or_e-3_presented",
          "evidence_present:e-3": "e-2_or_e-3_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "bridesmaid_acceptance_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "dress_size_form_question"
        },
        "pathBonus": 10
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "결혼식 준비 압박 속에서 다정은 호의를 확정으로 붙잡고 싶었고, 서아는 거절이 미안해 검토 단계를 길게 끌었다. 둘 다 \"상처 주기 싫다\"는 마음이 오히려 애매한 수락을 만들었다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "다정이 웨딩플래너와 가족 단톡에 서아를 들러리 겸 축가로 먼저 기재한 건 사실이에요. 서아의 명시적 '확정' 메시지가 없었는데 이름을 먼저 올린 거예요.",
        "서아도 '그 주 비워볼게', 드레스 치수 제출까지 하면서 기대를 키운 뒤, 최종 불가를 드레스 피팅 이후에야 말했습니다. 애매한 수락 신호를 보내놓고 정정이 너무 늦었어요."
      ],
      "tp-2": [
        "공유 체크리스트를 보면, 들러리는 '진행중'이고 축가는 '후보'로 분리돼 있었습니다. 서아가 두 역할을 한 번에 확정한 메시지는 없어요.",
        "다만 서아가 드레스 치수를 제출하고 입장 동선까지 확인한 건 사실이라, 들러리 역할은 사실상 수락 단계에 가까웠어요. 축가만 끝까지 후보였고요."
      ],
      "tp-3": [
        "둘은 예전부터 웨딩 역할은 한 채팅방에서 명시적 '확정'을 받은 뒤에만 알리기로 했습니다. 다정은 먼저 이름을 써 버렸고 서아는 오해가 커지는 동안 바로 정정하지 않았어요.",
        "서아의 '그 주 비워볼게'와 키 확인 메시지를 다정은 수락으로, 서아는 검토 단계로 기억합니다. 같은 대화를 서로 다르게 굳힌 거예요."
      ]
    }
  },
  "friend-11": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "manipulative",
        "counter_attack",
        "privacy_sensitive"
      ],
      "b": [
        "cold_logical",
        "privacy_sensitive",
        "detail_obsessed",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "secret_keeping",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-3": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.1
        },
        "bestActionHint": "계정 복구 신청서와 기기 접근 차단 로그를 같이 확인하면, 준석이 아무 설명 없이 독점한 건지 보안 사고 뒤 정리한 건지 갈린다. 이 쟁점은 \"느낌상 빼앗겼다\"보다 복구 이후 어떤 조치가 찍혔는지가 중요하다.",
        "worstActionReaction": "민우가 잃은 저장파일 이야기에만 공감하면 준석은 보안 경고 알림을 끝없이 늘어놓는다. 일방 차단과 프로필 정리가 준 충격 자체는 설명되지 않는다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.1
        },
        "bestActionHint": "민우 휴대폰에 남아 있던 청구지 캡처와 재인증 입력 흔적을 바로 대면해야 한다. \"계정을 살리려 했다\"는 말보다 예전 본인확인 정보를 지우지 않고 다시 썼다는 사실이 먼저 잡혀야 한다.",
        "worstActionReaction": "민우의 허탈감만 받아주면 그는 레벨과 시즌패스 손실만 반복한다. 관리자 메일을 자기 쪽으로 바꾼 출발 행동은 피해 서사 뒤로 숨어 버린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1.03,
          "confidential_protection": 1.2
        },
        "bestActionHint": "민우에게 왜 오래된 본인확인 정보를 아직 들고 있었는지, 준석에게 왜 그걸 단순 편법이 아니라 침범으로 느꼈는지 각각 묻게 되면 출발점이 보인다. 이 쟁점은 선공·후공보다 경계 인식의 어긋남을 열어야 풀린다.",
        "worstActionReaction": "둘 다 당황했겠다고만 다독이면 민우는 튕긴 화면을, 준석은 보안 공포를 반복할 뿐이다. 누가 먼저 관리자 권한을 바꿨는지 확인하는 축이 흐려진다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.23,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.28
        },
        "bestActionHint": "성인등급 게임 구매 때 세웠던 삭제 약속을 비난 없이 다시 꺼내고, 같은 채팅방 공유 원칙을 조용히 확인해 줘야 한다. 창피함이 낮아져야 둘 다 \"그때 그냥 지운 줄 알았다\"는 말 대신 실제 파기 여부를 말한다.",
        "worstActionReaction": "규칙 위반을 곧바로 범죄처럼 몰아붙이면 민우는 \"살리려던 거야\"로, 준석은 시각 낭송으로 버틴다. 정보 보관과 관리자 변경 공유를 둘 다 어겼다는 공통점이 사라진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.3,
          "separation": 1.03,
          "confidential_protection": 1.1
        },
        "bestActionHint": "아이템 이전·환불 내역과 프로필 복원 보고서를 같이 보여 주면, 민우가 도난으로 본 손실 중 무엇이 시스템 재귀속인지 바로 정리된다. 없어진 것과 옮겨진 것을 구분해야 준석 비난도 정확해진다.",
        "worstActionReaction": "민우의 분실감에만 기대면 그는 \"준석이 먹었어\"라는 첫 인상을 못 놓는다. 서비스 복원 과정에서 자동 정리된 항목은 끝내 검토되지 않는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "evidence_present:e-6",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "lockout_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "why_delete_profile_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "evidence_present:e-3",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "identity_verification_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "identity_verification_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "present_if_lawful:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_changed_admin_question",
          "evidence_present:e-3": "e-3_or_e-4_presented",
          "present_if_lawful:e-4": "e-3_or_e-4_presented",
          "motive_search": "security_alert_timeline_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_rule_reminder",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_or_responsibility_question",
          "confidential_protection": "nonjudgmental_question_about_why_he_kept_the_info"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6",
          "present_if_lawful:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "missing_items_question",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-1": "e-1_presented"
        },
        "pathBonus": 10
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "민우는 프로필 손실 공포를, 준석은 개인정보가 남의 기기에 남아 있다는 공포를 먼저 느껴서, 각각 저장파일과 보안이라는 자기 공포만 크게 보며 출발점을 서로 바꿔 읽었다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "민우가 공유 구독 계정 접근이 잠겼다고 했을 때, 전 준석이 먼저 빼앗은 줄 알았어요. 나중에 알고 보니 민우가 예전에 일회성으로 받은 준석의 본인확인 정보를 무단으로 다시 써서 관리자 메일을 자기 것으로 바꾼 거였습니다.",
        "준석도 그걸 발견하고 민우 접근을 끊고 프로필을 초기화했는데, 사전 설명 없이 바로 잠가 버렸어요. 이전엔 져도 웃던 사이였는데 그날부터 음성방에서 이름도 안 부르더라고요."
      ],
      "tp-2": [
        "시스템 기록을 보면, 민우가 예전에 일회성으로 받은 본인확인 정보와 청구지 캡처를 삭제하지 않고 보관했다가 가족요금제 재인증에 다시 사용해 관리자 메일을 바꿨습니다.",
        "민우가 사라졌다고 여긴 시즌패스와 저장 파일 일부는 준석이 가져간 게 아니라, 프로필 복원과 아이템 재귀속 과정에서 원계정으로 이동하거나 자동 환불된 거예요."
      ],
      "tp-3": [
        "둘은 본인확인 정보를 일회성으로만 쓰고 삭제하기로 약속했는데, 민우가 보관·재사용한 게 출발점입니다. 준석도 보안 문제를 감정적으로 처리하며 같은 채팅방 공유 원칙을 안 지켰고요.",
        "이 건은 계정 탈취 싸움처럼 보이지만, 핵심은 일회성 개인정보를 지우기로 한 약속을 민우가 먼저 깨고, 준석이 설명 없이 잠금으로 대응한 쌍방 위반이에요."
      ]
    }
  },
  "friend-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "trust_broken"
      ],
      "b": [
        "calculated_calm",
        "cold_logical",
        "fairness_obsessed",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "career",
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "career",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "promise_violation",
        "career",
        "role_failure",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 0.95
        },
        "bestActionHint": "수빈이 올린 단독형 캡션과 그 뒤 edit history를 붙여 보면, 순간 감정이 아니라 의도된 자기 브랜딩이었다는 점이 살아난다. 이 쟁점은 \"내 신곡\"이 몇 분 만에 어떻게 고쳐졌는지가 중요하다.",
        "worstActionReaction": "수빈이 인정받고 싶었던 마음만 받아주면 그는 곧 \"캡션 한 줄이었어\"라며 파급력을 줄인다. 공동 작업물을 개인 성과처럼 밀어 낸 문제는 작아져 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "재윤의 릴 썸네일, 포트폴리오 메일, 크롭된 포스터를 한꺼번에 대면하면 수빈 이름이 어떻게 후순위로 밀렸는지 변명하기 어렵다. 화면을 고른 방식 자체가 크레딧 축소의 증거가 된다.",
        "worstActionReaction": "재윤의 수고를 먼저 충분히 인정해 버리면 그는 편집과 편곡 노동 설명만 길게 늘어놓는다. 공개 자료에서 수빈을 지운 선택은 \"표시 형식\" 문제로 축소된다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.87,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "수빈에게 작품의 정체성을 왜 보컬과 가사에 묶는지, 재윤에게 왜 편곡과 연출을 중심이라고 느끼는지 묻게 되면 둘의 기준이 갈린다. 누가 더 만들었는지보다 무엇을 작품의 핵심으로 보느냐를 열어야 단독작 주장도 풀린다.",
        "worstActionReaction": "둘 다 상처받았겠다고만 공감하면 각자 자기 파트의 고생만 더 두껍게 말한다. 공동 창작물이라는 사실은 감정 경쟁 속에서 다시 흐릿해진다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "지난겨울 쇼케이스 트레일러 때도 대표 표기를 함께 확인하기로 했던 합의를 먼저 상기시켜 주면, 둘 다 왜 이번엔 최종 크레딧 시트를 끝내 못 닫았는지 인정하기 쉬워진다. 이 쟁점은 게으름보다 미뤄 둔 불편함을 먼저 낮춰야 한다.",
        "worstActionReaction": "누가 먼저 메인이라고 썼는지만 캐묻기 시작하면 수빈은 보컬 탭을, 재윤은 영상 탭을 따로 떼어 말한다. 최종 문서를 비워 둔 공동 책임은 또 빠져나간다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 0.95
        },
        "bestActionHint": "공동 메타데이터 export와 재윤이 골라 쓴 one-name 화면을 같이 보여 주면, 그는 단순 플랫폼 표시가 아니라 유리한 캡처만 재사용했다는 점을 피하기 어렵다. 어떤 화면을 골랐는지가 곧 의도다.",
        "worstActionReaction": "재윤이 억울할 거라고만 다독이면 그는 \"표시와 소유는 다르다\"는 말만 반복한다. 포스터를 어디까지 잘라 자기 이름만 살렸는지는 검증되지 않는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "evidence_present:e-1",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "solo_caption_question",
          "evidence_present:e-6": "e-6_presented",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "caption_history_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "evidence_present:e-6",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "portfolio_reel_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "thumbnail_omission_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "sole_creator_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-3": "e-3_or_e-4_presented",
          "motive_search": "edit_project_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "credit_sheet_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "one_name_screen_question",
          "evidence_present:e-5": "e-5_or_e-6_presented",
          "evidence_present:e-6": "e-5_or_e-6_presented",
          "separation": "metadata_view_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "같은 작품이 플랫폼마다 다른 이름을 먼저 드러내자 둘 다 \"내 몫이 사라진다\"는 감정에 매달렸고, 최종 크레딧 시트를 미룬 채 자기 화면에서 보이는 라벨만 진짜로 믿게 됐다.",
        "unlockHint": "empathy_approach 또는 motive_search + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "수빈은 공개 직후 '내 신곡', '내 프로젝트'라는 표현을 써서 단독 성과처럼 보이게 했고, 재윤은 포트폴리오 릴에서 수빈을 'voice' 수준으로만 적거나 썸네일에서 아예 빼버렸어요.",
        "실제로는 가사·보컬·멜로디와 비트·편곡·촬영·편집이 반복 수정으로 얽혀 있어서 어느 한 사람 단독 창작물이 아닙니다. 그런데 둘 다 자기 기여를 부각하고 상대를 배경으로 밀어내려 했어요."
      ],
      "tp-2": [
        "공유 노션에서 'song main: 수빈', 'video main: 재윤' 표시는 각 파트 책임 구분이었을 뿐 전체 소유권 표기가 아니었습니다. 최종 크레딧 시트를 끝내 안 만든 게 문제의 시작이에요.",
        "재윤은 전체 메타데이터에서 공동 크레딧을 알면서도, 자기 이름이 먼저 보이는 포스터와 카드 화면만 잘라 포트폴리오에 반복 사용했어요. 의도적으로 단독 창작자처럼 보이게 한 거예요."
      ],
      "tp-3": [
        "둘은 예전부터 제출 전 역할표와 크레딧 문구를 정하자고 했지만, '나중에 정리하자'는 말만 반복한 채 최종 공개 전까지 확정 시트를 안 만들었습니다. 양쪽 다 방치한 거예요.",
        "수빈이 '내 프로젝트'로 홍보하고 재윤이 수빈을 누락한 포트폴리오를 돌린 건 양쪽 다 문제지만, 크레딧을 미리 확정하지 않은 공동 책임이 이 다툼의 뿌리입니다."
      ]
    }
  },
  "neighbor-01": {
    "personalityTags": {
      "a": [
        "confrontational",
        "fairness_obsessed",
        "counter_attack",
        "emotionally_volatile"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "shame_sensitive",
        "timeline_padding"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "secret_keeping",
        "trust_breach",
        "role_failure"
      ],
      "d-2": [
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-3": [
        "promise_violation",
        "sequence_sensitive",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-4": [
        "privacy",
        "sequence_sensitive",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.11
        },
        "bestActionHint": "한결의 휴대폰이 0시 48분과 1시 15분에 504호 현관 정면을 잡았다는 촬영본과 복도 기록을 맞대면, \"증거 확보\" 명분이 사생활 침해라는 사실 앞에서 바로 무너진다.",
        "worstActionReaction": "딸이 놀랐다는 사정만 먼저 받아 주면 한결은 현관 촬영을 \"아빠가 할 수밖에 없던 대응\"으로 정당화하며 선을 더 넘는다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "주연에게 왜 첫 민원 뒤 31시간이나 문자를 미뤘는지, \"504호 또 민폐\"라는 평판 두려움부터 묻게 해야 제습기·물받이 통 48시간 방치의 축소 말버릇이 깨진다.",
        "worstActionReaction": "몇 시간, 몇 개를 바로 캐묻기만 하면 주연은 \"잠깐\" \"조금\" 같은 말로 수량과 시간을 더 흐리며 식물 이야기로 화제를 돌린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "최선미의 누수 점검 보고서와 우수관 낙엽 사진, 504호 배수 비연결 경로를 한 자리에서 보여주면 \"윗집이 숨겼다\"는 오해가 기록 앞에서 버티기 어렵다.",
        "worstActionReaction": "그냥 \"윗집 때문 맞죠, 아니죠?\" 식으로 몰아붙이면 한결은 본 장면만 쌓아 올리고 주연은 모른다며 버텨서 원인 규명이 더 늦어진다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 0.95,
          "empathy_approach": 1.28,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "야간 기사 출입이 알려져도 504호 생활패턴이 또 단체방에 번질 걱정을 먼저 눌러 줘야, 주연이 제습기 진동과 점검 소음 이야기를 숨기지 않는다.",
        "worstActionReaction": "소리 정체를 예·아니오로만 추궁하면 두 사람 다 쿵 소리 인상만 되풀이하고, 23시 58분 출입 기록 같은 핵심은 뒤로 밀린다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "관리사무소 접수 시각, 주연의 지연 문자, 한결의 단체방 글 순서를 함께 대면시키면 누구 한쪽의 억울함이 아니라 약속의 쌍방 파기가 선명해진다.",
        "worstActionReaction": "둘 다 힘들었다는 공감만 먼저 주면 한결은 딸 수면을, 주연은 공개망신 공포를 붙잡고 약속 위반 자체를 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present"
        ],
        "triggerMapping": {
          "fact_pursuit": "corridor_filming_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "corridor_filming_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "corridor_items_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "corridor_items_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "leak_source_question",
          "evidence_present:e-2": "e-2_or_e-4_presented",
          "evidence_present:e-4": "e-2_or_e-4_presented",
          "motive_search": "shared_pipe_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_repair_anxiety",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_or_responsibility_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "prior_promise_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "한결은 아이 수면과 집 안전을 지키지 못한 아버지로 보일까 봐, 주연은 또 민폐 세대로 찍힐까 봐 서로의 가장 나쁜 의도부터 먼저 확신했다. 원인보다 체면과 과거 감정이 앞서면서 건물 하자 문제도 한동안 사람 탓으로 굳어졌다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저는 그 밤에 윗층 복도에서 문 여닫는 소리와 급한 발걸음이 이어지는 걸 들었습니다. 나중에 알고 보니 경비실이 허가한 점검 기사가 올라간 거였는데, 그때는 다들 윗집에서 사고가 난 줄 알았어요.",
        "다음 날 아침엔 천장 누수 원인을 따지기도 전에 '윗집이 뭘 했느냐'는 쪽으로 감정이 먼저 올라와 있었습니다. 복도에 이틀째 놓인 제습기와 물받이 통이 아래층 입장에선 무시당한 기분이었을 거예요."
      ],
      "tp-2": [
        "저희는 이런 민원이 들어오면 출입 기록과 CCTV부터 확보합니다. 이 건은 경비실에 점검 기사 출입 허가가 남아 있었는데, 아래층에 상황이 알려진 건 한참 뒤였어요.",
        "현장에선 원인보다 감정이 먼저 뜨거워집니다. 한쪽은 단체방에 불만을 먼저 올렸고, 다른 쪽은 상황 공유를 하루 넘게 미뤘어요. 선통보 약속을 둘 다 안 지킨 겁니다."
      ],
      "tp-3": [
        "현장을 볼 때 한 집 배관 문제인지 건물 공용 구조 문제인지를 먼저 구분합니다. 이 건은 윗집 실내 배수보다 공용 배수 쪽 흔적이 더 뚜렷해서, 한 세대 책임으로 보기 어렵습니다.",
        "같은 라인 전체에 습기 민원이 몰린 시기라는 점도 중요합니다. 새벽 소음도 고의가 아니라 허가된 점검과 장비 진동이 겹친 거였어요. 건물 구조 쪽을 먼저 봐야 합니다."
      ]
    }
  },
  "neighbor-02": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "face_sensitive",
        "counter_attack",
        "retaliation_sensitive"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "fairness_obsessed",
        "calculated_calm"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "promise_violation",
        "secret_keeping",
        "trust_breach"
      ],
      "d-2": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "privacy",
        "reputation_risk",
        "secret_keeping",
        "sequence_sensitive"
      ],
      "d-4": [
        "privacy",
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "subjective_claim",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1.05,
          "confidential_protection": 1.21
        },
        "bestActionHint": "유나에게 \"개 키우는 집\" 낙인이 더 퍼지지 않게 하겠다고 선을 그어 주면, 택배실 정지화면을 직접 돌린 경위와 문구를 숨길 이유가 줄어든다.",
        "worstActionReaction": "받는 사람 수부터 따지며 몰아붙이면 유나는 곧바로 \"왜 저만 표적이냐\"는 피해 서사로 옮겨 타고 캡처 유포 본론을 뒤로 민다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1.24
        },
        "bestActionHint": "민규가 \"택배 뒤지는 집\" 누명에서 벗어나는 절차와, 유나의 반려견 평판 문제를 분리해 주겠다고 해야 악취 소문을 확인 없이 되풀이한 대목을 인정시킬 수 있다.",
        "worstActionReaction": "도둑 취급당한 억울함만 공감해 주면 민규는 자신이 먼저 당했다는 말만 길어지고, 14시간 동안 소문을 반복한 사실은 작게 만든다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.08
        },
        "bestActionHint": "전단 PDF와 공용프린터 스풀 로그, 수정된 회의록을 한 번에 들이대야 민규·유나 싸움 뒤에 숨어 있던 최병규의 짜깁기 배후가 드러난다.",
        "worstActionReaction": "\"반상회 끝나고 다들 예민했다\"는 공감으로 가면 두 사람은 서로한테 당한 이야기만 반복하고, 전단 원본 출처는 계속 안개 속에 남는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.16
        },
        "bestActionHint": "경비실 오배송 요청 메모와 원본 6분 CCTV를 같이 보여 주면, 민규의 선반 이동이 절도가 아니라는 점이 한 컷 의심보다 훨씬 설득력 있게 박힌다.",
        "worstActionReaction": "택배를 잃을까 불안했다거나 도둑 취급이 억울했다는 감정만 받으면, 두 사람은 각자 인상 장면에 매달려 절도 오해를 접지 않는다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.07,
          "empathy_approach": 1.05,
          "evidence_present": 1.13,
          "separation": 1.1,
          "confidential_protection": 1.23
        },
        "bestActionHint": "유나의 반려견 낙인과 민규의 절도 누명을 더 키우지 않겠다는 안전판을 깔아 줘야, 두 사람 모두 관리사무소 선확인 약속을 먼저 깬 사실을 말한다.",
        "worstActionReaction": "누가 몇 분 먼저 보냈는지만 다투게 하면 유나는 CCTV 캡처 숫자로, 민규는 전달 횟수 방어로 빠져 쌍방 파기라는 핵심이 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "cctv_share_question",
          "investigate_only:e-1": "e-1_presented",
          "motive_search": "neighbor_count_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_meeting_humiliation",
          "present_if_lawful:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "anonymous_flyer_origin_question",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "parcel_theft_basis_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "confidential_protection": "parcel_theft_basis_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "use_confidential_channel",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "why_not_verify_question",
          "investigate_only:e-1": "e-1_presented",
          "present_if_lawful:e-3": "e-3_presented",
          "use_confidential_channel": "old_management_first_reminder",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "유나와 민규 모두 이미 자신이 표적이라는 감각이 강해, 마지막 퍼즐 한 조각이 나온 순간에도 서로보다 더 큰 배후를 상상하지 못했다. 동대표와 반상회 갈등의 잔여 감정이 익명 전단의 방향을 더 교묘하게 가렸다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "반상회에서 두 분 사이 갈등이 워낙 크게 터져서, 주변 주민들도 한쪽 편을 들기 쉬운 분위기였습니다. 동대표로서 수습하고 싶었지만 감정이 이미 넘친 뒤였어요.",
        "다음 날 익명 전단이 붙었을 때 저도 당황했습니다. 회의에서 오간 말이 워낙 거칠었으니 누군가 참지 못한 것 같은데, 정확히 누가 했는지는 저도 모릅니다."
      ],
      "tp-2": [
        "저는 CCTV 원본 6분을 확인했는데, 해당 주민은 박스를 열지 않고 선반 위치만 옮긴 뒤 나갔습니다. 경비원 무전 요청과 시각이 일치해서 오배송 정리에 따른 행동으로 보여요.",
        "밤사이 익명 전단이 순찰 빈틈에 붙었는데, 공용 프린터 스풀 로그에 출력 27분 전 기록이 남아 있습니다. 그 계정이 두 당사자 어느 쪽도 아니라면 제3자가 개입한 겁니다."
      ],
      "tp-3": [
        "전단 문구를 분석해 보면, 관리사무소 민원 문구와 반상회 발언이 짜깁기돼 있었습니다. 한 사람이 처음부터 쓴 글이 아니라 여러 출처에서 긁어 모은 구조예요.",
        "저는 공용 프린터 로그와 문체를 대조해 보면, 두 당사자 어느 쪽 문체와도 다릅니다. 동대표 쪽에서 민원과 발언을 조합해 PDF를 만든 흔적이 있어요."
      ]
    }
  },
  "neighbor-03": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "detail_obsessed",
        "privacy_sensitive",
        "calculated_calm"
      ],
      "b": [
        "victim_identity",
        "emotionally_volatile",
        "counter_attack",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "promise_violation",
        "secret_keeping",
        "trust_breach"
      ],
      "d-2": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-3": [
        "privacy",
        "secret_keeping",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-4": [
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "privacy",
        "reputation_risk",
        "promise_violation",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.03
        },
        "bestActionHint": "오세훈의 임시 PIN 발급 기록과 21시 47분 출입 로그를 붙여 놓으면, 현우가 \"비상 상황이었다\"고 해도 직원용 코드 사용 사실은 숨기기 어렵다.",
        "worstActionReaction": "비에 젖은 개를 씻겨야 했다는 사정만 받아 주면 현우는 곧바로 \"다들 그렇게 한다\"는 관행 논리로 무단 출입을 희석한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.83,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.08
        },
        "bestActionHint": "세척실 예약 부재 캡처와 사고 직후 사진에서 늘어진 자동줄 위치를 짚어 주면, 서아의 \"문만 살짝 열었다\"는 축소가 오래 버티지 못한다.",
        "worstActionReaction": "다친 작은 개가 안쓰럽다는 공감만 앞세우면 서아는 비명과 피 이야기로 장면을 고정하고, 자기 입실 방식과 줄 관리 문제는 끝까지 미룬다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.11
        },
        "bestActionHint": "원본 4분 영상, 해시 비교표, 바뀐 타임스탬프 글꼴을 차례로 대면시키면 19초 클립이 \"요약\"이 아니라 위조라는 점이 현우 방어보다 빨리 선다.",
        "worstActionReaction": "둘 다 놀랐다는 공감으로 풀면 현우는 편집을 \"맥락 정리\"로 낮추고, 서아는 충격 장면만 반복해 원본 확인이 늦어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "백민지 수의사의 초진 차트와 패드 열상 모양을 보여주면, 피 묻은 귀 장면보다 마찰 손상이라는 의학적 설명이 훨씬 강하게 먹힌다.",
        "worstActionReaction": "그냥 \"물었어요, 안 물었어요?\"만 반복하면 서아는 충격 장면을 재생하고 현우는 숫자만 읊어서 상처 형태 자체를 못 보게 된다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.07,
          "evidence_present": 1.12,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "다친 반려견 공감과 단체방 망신 문제를 분리해 다루겠다고 해야, 현우의 PIN 사용과 서아의 원본 전 추궁이 같은 절차 위반 선상에 놓인다.",
        "worstActionReaction": "누가 먼저 잘못했는지 한 칸씩 따지기만 하면 둘 다 \"그쪽이 먼저\"를 되풀이하며 예약·원본 확인 규칙 전체를 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "staff_pin_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "leash_length_question",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "cctv_original_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "bite_claim_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "confidential_protection": "bite_claim_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-2",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "reservation_rule_reminder",
          "evidence_present:e-2": "e-2_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "현우는 위험한 대형견 주인으로 낙인찍힐까 두려워 기록을 손봤고, 서아는 다친 반려견을 제대로 지키지 못한 보호자로 보일까 봐 가장 자극적인 장면에 매달렸다. 상처의 실제 원인보다 먼저 공포 프레임이 굳어지면서 위조 영상의 힘이 커졌다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "사고가 나자 두 보호자 다 자기 잘못 아니라는 말부터 꺼냈습니다. 장대비에 바닥이 젖은 세척실에서 거의 동시에 들어간 건데, 다친 강아지보다 먼저 책임 세우기부터 하더라고요.",
        "저는 평소 두 분 다 강아지 데리고 다닐 때 문제를 본 적이 없습니다. 이번 사고는 누가 공격한 게 아니라, 젖은 바닥에서 자동줄이 배수구 철망에 감기면서 벌어진 거라고 봐요."
      ],
      "tp-2": [
        "제가 내려갔을 때 바닥이 빗물로 미끄러웠고, 자동줄이 배수구 철망까지 길게 늘어져 있었습니다. 한쪽은 예약 없이 들어왔고, 다른 쪽은 직원용 PIN으로 마감 시간에 문을 열었어요.",
        "저는 잘못을 단정하진 않습니다. 다만 마감 시간에 젖은 바닥의 세척실은 반려견에게 안전한 환경이 아니었고, 예약 절차를 지킨 쪽이 없었다는 점은 기록에 남아 있습니다."
      ],
      "tp-3": [
        "초진에서 본 앞발 패드 열상은 물림 특유의 관통이나 쌍공 흔적이 아닙니다. 금속면에 마찰로 긁힌 모양이어서, 배수구 철망 같은 곳에 줄이 감기면서 생긴 손상에 가까워요.",
        "귀 찰과상도 부딪힘으로 설명 가능합니다. 상처 모양만 놓고 보면 다른 개가 물어서 생긴 것으로 단정하기 어렵고, 환경 요인이 더 크게 작용한 사고로 봅니다."
      ]
    }
  },
  "neighbor-04": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "martyr_complex",
        "counter_attack",
        "face_sensitive"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "grudge_holding",
        "calculated_calm"
      ]
    },
    "contentTags": {
      "d-1": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-2": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "privacy",
        "sequence_sensitive",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "sequence_sensitive"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "번호인식 로그와 가을 합의 문자에서 \"7시 20분 전 반환\"이 반복 확인된 대목을 맞대면, 서림의 반복 점유가 돌봄 사정 뒤에 숨기 어렵다.",
        "worstActionReaction": "아버지 지팡이와 재활 사정에만 공감하면 서림은 종료 후 11차례 위반 대신 가족 고생 서사를 길게 깔아 버린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도윤에게 왜 관리사무소보다 개인 콘과 쪽지를 먼저 꺼냈는지 묻게 해야, \"11번이다\"라는 누적 분노와 공정성 집착이 자력 제재로 이어진 이유가 드러난다.",
        "worstActionReaction": "콘을 몇 시 몇 분에 세웠는지만 따지면 도윤은 규약 조항과 위반 횟수 나열에 숨어 자기 대응 수위를 계속 축소한다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "일주일 전 블랙박스 접촉 영상과 보험 접수번호를 같이 꺼내면, 서림이 내민 범퍼 사진이 그날 보복 흔적이라는 주장은 힘을 잃는다.",
        "worstActionReaction": "서림이 약자 취급받았다는 감정만 받아 주면, 새 흠집이 아니라는 기록보다 \"괴롭힘당했다\"는 인상이 먼저 굳어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.1,
          "confidential_protection": 1.08
        },
        "bestActionHint": "지난가을 합의 메시지와 2월 말 종료 확인 문자를 한 화면에 올리면, 도윤의 기억이 아니라 문서 자체가 배려 종료 시점을 말해 준다.",
        "worstActionReaction": "예전 재활 배려를 칭찬하는 쪽으로 가면, 지금 쟁점인 종료 후 약속 복원은 또다시 과거 선의 뒤에 가려진다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 0.95,
          "empathy_approach": 1.08,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1.29
        },
        "bestActionHint": "단체방 망신이나 \"냉혈한\" 낙인부터 통제해 주면, 서림의 선제 피해 글과 도윤의 콘·쪽지 모두 약속 파기였다는 말을 끌어내기 쉽다.",
        "worstActionReaction": "9분, 18분 순서만 파고들면 서림은 피해 글을, 도윤은 자력 제재를 각자 정당화하며 서로의 첫 행동만 탓하게 된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "present_if_lawful:e-3"
        ],
        "triggerMapping": {
          "fact_pursuit": "parking_return_time_question",
          "evidence_present:e-2": "e-2_presented",
          "present_if_lawful:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "cone_or_note_question",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "cone_or_note_question",
          "confidential_protection": "cone_or_note_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scratch_basis_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "evidence_present",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_agreement_question",
          "present_if_lawful:e-3": "e-3_presented",
          "evidence_present": "old_agreement_question",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_father_care",
          "evidence_present:e-4": "e-4_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "서림은 아버지 재활을 빌미로 배려를 더 붙잡고 싶었던 마음과, 배려가 끝났다는 사실을 인정하면 곧바로 얌체 세대로 읽힐 수 있다는 수치를 함께 숨겼다. 그래서 11차례의 약속 위반도 현재의 주차 괴롭힘 이야기 속에 섞어 버렸다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "처음엔 사정이 있으니 가까운 칸을 쓰겠다는 부탁을 다들 이해했습니다. 그런데 사정이 끝난 뒤에도 같은 칸에 차가 계속 서 있으니, 임시 배려가 당연한 자리처럼 굳어 가는 느낌이었어요.",
        "반환 약속을 넘긴 날이 반복되니까 기다리는 쪽 표정이 점점 굳어졌습니다. 말로는 참아도 속에서 오래 쌓이면 결국 터지더라고요."
      ],
      "tp-2": [
        "순찰하는 입장에서 보면, 관리실 민원이 접수되기 전에 이미 개인 콘이 놓이고 와이퍼에 쪽지가 꽂혀 있었습니다. 공식 절차보다 자력 제재가 먼저 나간 거예요.",
        "갑자기 터진 게 아니라 번호인식 로그상 같은 칸이 오래 반복 점유된 패턴이 있었습니다. 누적된 불만 위에 콘과 쪽지가 더해지면서 자존심 싸움으로 불붙은 거예요."
      ],
      "tp-3": [
        "합의문을 보면 재활 종료 시 원상복구와 아침 반환 시각이 명시돼 있습니다. 종료 시점이 지났는데 예전 습관대로 쓴 건 합의 위반입니다.",
        "범퍼 흠집도 확인했는데, 블랙박스와 보험 기록상 이번 건이 아니라 이전에 이미 있던 손상입니다. 이번 충돌과 직접 연결되지 않습니다."
      ]
    }
  },
  "neighbor-05": {
    "personalityTags": {
      "a": [
        "confrontational",
        "detail_obsessed",
        "selective_quote",
        "privacy_sensitive"
      ],
      "b": [
        "shame_sensitive",
        "counter_attack",
        "relationship_preserving",
        "calculated_calm"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "reputation_risk",
        "trust_breach",
        "misleading_soft_evidence"
      ],
      "d-2": [
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive",
        "misleading_soft_evidence"
      ],
      "d-3": [
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "privacy",
        "promise_violation",
        "sequence_sensitive",
        "misleading_soft_evidence"
      ],
      "d-5": [
        "privacy",
        "reputation_risk",
        "promise_violation",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "subjective_claim",
      "t-2": "subjective_claim",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.16
        },
        "bestActionHint": "서윤이 보낸 CCTV 캡처와 \"제 상자 아닐까요\" 문구를 그대로 보여 주면, 막연한 불안이 아니라 공개 절도 암시였다는 점이 분명해진다.",
        "worstActionReaction": "업무 자재를 잃을까 무서웠다는 공감만 앞세우면 서윤은 불안을 근거 삼아 \"그 정도면 누가 봐도\"라는 단정을 더 세게 붙잡는다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1.05,
          "confidential_protection": 1.26
        },
        "bestActionHint": "재현에게 \"택배 도둑\" 이미지를 더 퍼뜨리지 않겠다는 안전장치를 줘야, 그가 3개 채널에 역소문을 돌린 과잉 대응을 인정한다.",
        "worstActionReaction": "몇 명한테 보냈는지부터 추궁하면 재현은 곧바로 \"몇 사람뿐\"이라고 범위를 깎아 말하며 모욕받은 얘기만 늘어놓는다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.17,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "둘이 왜 배송사 확인보다 먼저 서로를 의심했는지, 예전 젖은 박스 갈등과 공동선반 불신을 짚어야 \"절도 장면\"이라는 확신이 흔들리기 시작한다.",
        "worstActionReaction": "누가 실제로 가져갔는지만 재촉하면 두 사람은 같은 흰 상자 한 컷에 매달린 채 배송 사고 가능성을 끝까지 안 본다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "류다은 배송사진의 파란 스티커와 문제 장면 속 상자 모서리를 대조시키면, \"내 택배\"라는 착각이 한 번에 풀린다.",
        "worstActionReaction": "사라진 물건 때문에 속상했다는 공감만 주면, 두 사람은 상자가 누구 것인지보다 자기 상실감에 계속 매달린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 0.95,
          "empathy_approach": 1.08,
          "evidence_present": 1.28,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "이웃 평판을 더 망치지 않겠다고 선을 그어 줘야, 서윤의 캡처 유포와 재현의 역소문이 모두 \"배송사 확인이 먼저\"라는 약속 위반으로 묶인다.",
        "worstActionReaction": "누가 선빵이었는지만 가르면 서윤은 캡처를, 재현은 역소문을 각각 방어하면서 기존 공동수령 규칙은 다시 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "cctv_share_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "cctv_share_question",
          "confidential_protection": "privacy_concern_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "rumor_forward_question",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "neighbor_name_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "theft_basis_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "theft_basis_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "box_identity_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-2",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_work_material_stress",
          "present_if_lawful:e-2": "e-2_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "서윤은 고가 자재를 잃는 불안을, 재현은 절도 누명과 야간근무자라는 편견을 더 먼저 방어했다. 같은 흰 상자와 젖은 송장이라는 반복 오배송 경험이 있었기에, 둘 다 확인보다 확신이 빠를 수밖에 없었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "행사 직후 택배실에는 같은 규격 흰 박스가 수북이 쌓여 있었고, 비에 젖어 송장이 잘 안 보이는 상태였습니다. 화면만 보고 누구 물건인지 단정하기 어려운 환경이었어요.",
        "저는 CCTV에 찍힌 흰 상자를 두 분 다 자기 것이라 확신했지만, 나중에 확인해 보니 그건 다른 세대의 정기배송 박스였습니다. 물건이 사라졌다고 느끼는 순간 상대를 바로 찍어 버린 거예요."
      ],
      "tp-2": [
        "제가 영상을 봐도 한쪽이 상대 박스를 열거나 챙기는 장면은 없었습니다. 화면에 손이 닿았다고 곧바로 절도는 아니에요. 행사 직후라 기사 드나듦도 많고 선반도 꽉 차 있었거든요.",
        "저는 누가 가져갔느냐보다, 비에 젖은 송장 때문에 두 택배가 선스캔 완료 처리되고 대리점 보류함에 남은 배송 사고 가능성을 먼저 봐야 한다고 생각했습니다."
      ],
      "tp-3": [
        "저는 배송 기록을 대조해 보면, 두 택배 모두 젖은 송장 예외코드가 찍혀 대리점 보류함에 남아 있었습니다. 아무도 훔치지 않은 배송 사고예요.",
        "CCTV에서 두 분이 자기 것이라 확신한 흰 상자는 모서리 파란 스티커와 배송 사진을 대조하면 다른 세대 물건이었습니다. 사람을 의심하기 전에 배송 경로부터 확인했어야 합니다."
      ]
    }
  },
  "neighbor-06": {
    "personalityTags": {
      "a": [
        "detail_obsessed",
        "manipulative",
        "shame_sensitive",
        "calculated_calm"
      ],
      "b": [
        "fairness_obsessed",
        "denial_heavy",
        "detail_obsessed",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "secret_keeping",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "trust_breach",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-3": [
        "sequence_sensitive",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "세영이 보낸 9만원 요청 문자와 보전금 반영 뒤 12만원 최종 계산서를 나란히 놓으면, 과다 청구가 수고비가 아니라 숫자 문제였다는 게 드러난다.",
        "worstActionReaction": "기사를 부르고 입회한 수고만 인정해 주면 세영은 금액 질문을 전부 \"제가 다 했잖아요\"라는 공로 방패로 밀어낸다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "3층 복도 CCTV와 박영수 기사 보고서의 반복 문받침 흔적을 함께 보여 주면, 인호의 카트 사용도 공동 과실이라는 점을 부정하기 어렵다.",
        "worstActionReaction": "부풀린 청구를 당해 억울했다는 감정만 받으면 인호는 끝까지 \"왜 제가 더 냅니까\"만 반복하며 자기 문받침 책임을 닫아 버린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.17,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "세영의 꽃 손수레 동선과 인호의 배송 카트 습관처럼, 둘 다 왜 문을 자꾸 받쳐 뒀는지 편의의 이유를 묻게 해야 단독 가해자 프레임이 깨진다.",
        "worstActionReaction": "몇 번이 더 많았는지만 따지면 둘 다 횟수 싸움으로 빠져 반복 사용이 고장을 키운 공동 구조를 놓친다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "최종 계산서와 보전금 전표를 같이 보여 주면 18만원 견적, 12만원 주민 부담, 각 6만원 분담이 한 번에 정리돼 말장난이 줄어든다.",
        "worstActionReaction": "돈 부담이 크다는 말만 받아 주면 세영은 둥글게 반씩이라 하고, 인호는 최종 금액만 되묻는 식으로 숫자를 다시 흐린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 0.95,
          "empathy_approach": 1.08,
          "evidence_present": 1.2,
          "separation": 1.1,
          "confidential_protection": 1.29
        },
        "bestActionHint": "\"과하게 뜯는 집\"이나 \"뻔뻔하게 안 내는 집\"으로 더 박제하지 않겠다고 해야, 세영의 선송금 압박과 인호의 선전액 거부가 모두 절차 위반이었다는 말이 나온다.",
        "worstActionReaction": "문자와 통화 순서를 조각내 캐묻기만 하면 둘 다 먼저 화낸 장면만 붙잡고, 원래의 \"최종 계산서 확인 후 정산\" 원칙은 또 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present"
        ],
        "triggerMapping": {
          "fact_pursuit": "payment_request_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "payment_request_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "door_wedging_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "sole_cause_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "cart_frequency_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "direct_question",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_urgent_repair_stress",
          "investigate_only:e-1": "e-1_presented",
          "present_if_lawful:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "세영은 직접 업체를 부르고 수리를 굴린 수고가 정산 부풀리기를 덮어 줄 것이라 믿었고, 인호는 과다 청구를 보는 순간 자기 문받침 책임까지 같이 인정할까 봐 버텼다. 그래서 실제 부담액 6만원씩이라는 단순한 결론도 오래 돌아갔다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "그 층은 다들 짐 옮길 때 방화문을 카트나 손수레로 받쳐 두는 게 일상이었어요. 양쪽 다 여러 번 반복했으니 어느 한쪽만의 잘못이 아닙니다.",
        "처음엔 쾅 닫히는 소리가 나도 서로 대수롭지 않게 여겼어요. 그 무심함이 도어클로저가 완전히 망가질 때까지 쌓인 거예요."
      ],
      "tp-2": [
        "도어클로저를 보면 한 번 세게 부딪힌 게 아니라 오래 반복해서 버티다 지친 모양이었습니다. 양쪽 세대가 번갈아 받쳐 쓴 누적 손상에 가까워요.",
        "실제 주민 부담은 보전금 반영 후 나눠 보면 생각보다 크지 않습니다. 문제는 처음 들은 견적과 실제 분담액이 달라서, 그 차이를 부풀렸다고 느낀 거예요."
      ],
      "tp-3": [
        "관리실 기록을 보면 보전금이 이미 처리돼서, 실제 세대별 부담은 처음 들은 금액보다 작습니다. 견적과 최종 분담 사이의 차이가 오해를 키운 겁니다.",
        "최종 계산서가 나오기 전에 한쪽은 송금을 압박하고 다른 쪽은 전액 거부로 맞선 게 문제였습니다. 숫자를 확인하기 전에 감정이 먼저 달린 거예요."
      ]
    }
  },
  "neighbor-07": {
    "personalityTags": {
      "a": [
        "avoidant",
        "relationship_preserving",
        "face_sensitive",
        "timeline_padding"
      ],
      "b": [
        "confrontational",
        "fairness_obsessed",
        "grudge_holding",
        "counter_attack"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "reputation_risk",
        "promise_violation",
        "trust_breach"
      ],
      "d-3": [
        "privacy",
        "sequence_sensitive",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-4": [
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.11
        },
        "bestActionHint": "윤가영이 남긴 열쇠 봉투, 잠금함 안쪽 '803' 메모, 이사 첫날 계단실 동선을 같이 들이대면 나리가 '전 세입자도 괜찮다 했다'는 말로 열쇠 사용 책임을 돌리기 어렵다.",
        "worstActionReaction": "유모차와 아이 짐이 급했다는 사정만 먼저 받아 주면 나리는 비 오던 이사날 얘기와 '집주인도 그랬다'는 빌린 권위 뒤로 숨어 잠금함 개봉 자체를 흐린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "성호에게 왜 관리실 회신도 오기 전에 새 자물쇠와 손글씨 경고문까지 갔는지 묻게 해야, 윤가영 때 공용공간을 못 막았다는 열패감과 과잉 대응 동기가 스스로 드러난다.",
        "worstActionReaction": "몇 시에 잠갔는지, 글을 몇 분 뒤에 올렸는지만 몰아붙이면 성호는 '피난 통로, 공용물품, 무단 열쇠' 같은 규정 단어만 던지며 과거 악연을 현재 정당화로 바꿔 버틴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "임시사용 승인대장, 퇴거 반납 공지, 윤가영 음성메시지를 한 자리에서 대면시키면 8층 잠금함이 803호 전용이었다는 오래된 인상이 기록 앞에서 바로 무너진다.",
        "worstActionReaction": "서로 오해였다고 두루뭉술하게 공감만 하면 나리는 '원래 803이 쓰던 곳'을 허가로, 성호는 같은 말을 경고로 우기며 전용 여부 핵심을 더 흐린다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.17,
          "separation": 1.05,
          "confidential_protection": 1.18
        },
        "bestActionHint": "나리에게 왜 승인 주체와 기간도 없는 '803' 스티커를 공식 허가로 읽었는지부터 캐물어야, 새집 적응 불안과 보관공간 욕심이 메모 해석을 밀어 올렸다는 점이 풀린다.",
        "worstActionReaction": "스티커가 허가냐 아니냐만 예·아니오로 재촉하면 나리는 비, 택배, 아이 짐 얘기로 늘어지고 성호는 '난 경고였다'고 단어 해석 싸움만 키운다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.13,
          "evidence_present": 1.1,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "층 전체에 민폐 낙인이 더 번지지 않는다는 안전감을 먼저 줘야, 나리는 먼저 열어 쓴 순서를, 성호는 먼저 잠그고 공개 글을 올린 순서를 차례대로 인정하기 시작한다.",
        "worstActionReaction": "누가 먼저 약속을 깼는지 바로 재단하려 들면 둘 다 '먼저 열었다'와 '먼저 막았다'의 초 단위 순서싸움으로 도망가서 관리실 우선 원칙 자체가 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_key_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "old_key_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "padlock_question",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "public_naming_followup",
          "confidential_protection": "padlock_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "ownership_question",
          "evidence_present:e-3": "e-3_presented",
          "present_if_lawful:e-6": "e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "official_permission_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "temporary_permit_followup",
          "confidential_protection": "official_permission_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_move_in_stress",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "나리는 이사 직후 규칙 모르는 사람으로 찍히지 않으려 타인의 말을 허가처럼 붙잡았고, 성호는 전 세입자와의 악연이 되살아나는 순간 새 이웃을 곧바로 같은 범주로 묶어 버렸다. 애매한 인수인계 흔적 하나가 공용공간 사유화의 기억과 겹치며 갈등이 과열됐다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "이사 직후엔 잠금함에 '803'이라고 적힌 메모가 남아 있으니 원래 그 집 전용인 것처럼 보이기 쉽습니다. 저도 처음엔 새 입주자가 쓸 수 있는 칸인 줄 알았어요.",
        "그런데 나중에 알고 보니 그 메모는 전 세입자의 사적 표시였고, 잠금함은 누수 공사 기간에 한시 허용된 공용 비상물품함이었습니다. 퇴거와 함께 허가가 이미 끝나 있었어요."
      ],
      "tp-2": [
        "제가 본 건 관리실 회신이 오기도 전에 한쪽이 자기 자물쇠를 걸고 단지앱에 '새 803호 공용공간 점유'라는 경고 글을 올린 게 먼저였다는 점입니다.",
        "다른 한쪽도 관리실 확인 없이 전 세입자 열쇠로 잠금함을 열고 유모차와 박스를 넣었어요. 둘 다 '관리실 확인이 먼저'라는 첫날 약속을 안 지킨 겁니다."
      ],
      "tp-3": [
        "8층 잠금함은 세대 전용이 아니라 공용 비상물품함이었습니다. 전 세입자에게 누수 공사 기간 한시 허용됐고, 퇴거일 하루 전에 허가가 종료됐어요.",
        "저는 안쪽의 '803' 메모와 스티커도 확인했는데 승인 주체나 기간이 없습니다. 공식 허가가 아니라 전 세입자의 사적 인수인계 흔적이에요. 새 입주자가 자동으로 권한을 물려받는 구조가 아닙니다."
      ]
    }
  },
  "neighbor-08": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "detail_obsessed",
        "calculated_calm",
        "denial_heavy"
      ],
      "b": [
        "victim_identity",
        "retaliation_sensitive",
        "emotionally_volatile",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "reputation_risk",
        "promise_violation",
        "secret_keeping"
      ],
      "d-3": [
        "privacy",
        "secret_keeping",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-4": [
        "privacy",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.03
        },
        "bestActionHint": "설치 직후 각도 사진, 관리사무소 미통보 기록, SD카드 첫 이틀 영상에서 하린 도어매트가 잡힌 장면을 함께 보여 주면 민석의 '규격품 설치' 방어가 가장 빨리 흔들린다.",
        "worstActionReaction": "택배 분실이 걱정됐다는 마음만 다독이면 민석은 160도 고정렌즈, 15fps, 로컬 저장 같은 사양 읊기로 들어가 통보 누락과 과한 촬영각을 기술 문제로 축소한다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.98,
          "evidence_present": 1.08,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "하린에게 필라테스 수강생과 주민방 평판이 더 무너지지 않는다는 확신을 줘야, '스토킹' 표현과 위조 27초 클립을 왜 관리실보다 먼저 돌렸는지 수치심 섞인 동기가 풀린다.",
        "worstActionReaction": "처음부터 '합성했죠?'만 들이밀면 하린은 빨간 불, 따라오는 화면, 안쪽 불빛 공포를 되감으며 '다른 주민도 불편했다'는 군중 방패 뒤로 숨는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.11
        },
        "bestActionHint": "27초 줌 클립과 SD카드 원본, 포렌식 비교보고서를 나란히 대면시키면 프리뷰 6초에 다른 시점 복도 영상을 이어 붙였다는 편집 흔적이 말보다 빨리 드러난다.",
        "worstActionReaction": "무서웠겠다고만 받아 주면 하린은 '화면이 따라왔다'는 체감에 매달리고, 민석도 그 감정만 반박하느라 위조 파일 진위 검증이 한참 늦어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "기기 사양서의 고정렌즈 문구와 2분 원본 저장 영상을 같이 보여 주면, 하린 집 내부를 추적했다는 그림이 도어매트 일부 촬영 문제와 구분되면서 과장된 핵심이 정리된다.",
        "worstActionReaction": "집 안이 보였냐 안 보였냐를 감정적으로 따지기만 하면 하린은 체감 공포를, 민석은 기술 설명을 붙잡고 실제 저장 범위와 추적 불가능성은 뒤로 밀어 버린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.72,
          "motive_search": 1.07,
          "empathy_approach": 1.16,
          "evidence_present": 1.21,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "주민방 공개망신이 더 커지지 않는다고 선을 그어 줘야, 하린은 공개 낙인 글을, 민석은 귀가 시간표 역공 게시를 각자 먼저 꺼내며 절차 붕괴를 인정한다.",
        "worstActionReaction": "누가 먼저 게시했는지부터 승패처럼 따지면 하린은 스토킹 프레임을 더 세게 붙이고 민석은 사생활 맞대응을 정당방위처럼 포장해 쌍방 파기가 안 보인다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "installation_notice_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "present_if_lawful:e-5"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_past_camera_anxiety",
          "investigate_only:e-1": "e-1_presented",
          "motive_search": "nonjudgmental_question_about_past_camera_anxiety",
          "present_if_lawful:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "clip_origin_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "interior_capture_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "interior_capture_question"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_stalker_label",
          "present_if_lawful:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "하린은 과거의 현관 카메라 소문 경험 때문에 불안의 빈칸을 편집 영상으로 메웠고, 민석은 기술 설명만으로 상대 불안을 압도하려다 초반 촬영각 문제를 사소화했다. 실제 사생활 불안과 허위 낙인이 서로를 먹이며 클립 위조가 더 설득력 있게 보였다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "그 카메라는 팬·틸트 없는 고정렌즈 모델이라 원격으로 방향을 돌리거나 사람을 따라가는 기능이 없습니다. 다만 처음 이틀간 각도가 넓어서 맞은편 도어매트까지 찍힌 건 사실이에요.",
        "저는 주민방에 돈 짧은 영상과 실제 저장 영상이 다르다는 걸 나중에 알았습니다. 프리뷰 화면과 저장 영상의 차이를 모르면 집 안까지 훔쳐봤다고 오해하기 쉬운 구조였어요."
      ],
      "tp-2": [
        "한쪽이 주민방에 '현관을 노리는 사람'이라고 올리자 바로 편이 갈렸습니다. 반대쪽도 상대 귀가 시간표를 공개하며 맞받아쳤고요. 관리실 확인보다 공개 글이 먼저 나간 거예요.",
        "저는 두 분 다 관리실 판단을 기다리기보다 공개 낙인과 역공 글을 먼저 택했다는 점이 문제였다고 봅니다. 사실 확인 전에 여론전이 시작된 겁니다."
      ],
      "tp-3": [
        "원본과 유포된 클립을 대조하면, 클립은 프리뷰와 다른 시점 영상을 이어붙인 뒤 줌과 반전, 타임스탬프까지 바꾼 위조본이었습니다.",
        "초기에 촬영각이 맞은편까지 넓었던 건 사실입니다. 하지만 주민방에 돈 영상은 원본이 아니었고, 기기 자체가 실내를 추적할 수 있는 모델이 아닙니다."
      ]
    }
  },
  "neighbor-09": {
    "personalityTags": {
      "a": [
        "detail_obsessed",
        "fairness_obsessed",
        "selective_quote",
        "calculated_calm"
      ],
      "b": [
        "fairness_obsessed",
        "blame_shifting",
        "denial_heavy",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "financial",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-3": [
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "reputation_risk",
        "promise_violation",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "관리사무소 합의서 서명본, 음성 확인 파일, 시공 뒤 30만 원만 보낸 송금 내역을 맞대면 지훈의 '검토 취지였지 확정은 아니었다'는 후퇴가 버티기 어렵다.",
        "worstActionReaction": "아이 발소리 줄이려 매트 깔았다는 노력부터 공감하면 지훈은 생활배려와 비용 합의를 섞어 말하며 92만 원 약속 번복을 '30만 원은 이미 보냈다'로 덮는다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "연우에게 왜 2차 측정 직후 굳이 침실 천장 패치 한 줄을 더 넣어야 했는지 묻게 해야, 석 달치 녹음 방해와 '돈 더 뜯는다'는 낙인 공포가 18만 원 추가 결정과 연결된다.",
        "worstActionReaction": "추가비용이 맞냐 틀리냐만 캐면 연우는 그 항목을 '마감 보완' '미세 조정'으로 더 줄여 부르며 관리실 다닌 수고 얘기로 계산 검증을 피해 간다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "시공 전후 충격음 측정표와 천장·바닥 현장 사진을 함께 보여 주면, 윗집 발소리만도 아랫집 천장만도 아닌 공동 구조 문제라는 점이 수치와 그림으로 동시에 잡힌다.",
        "worstActionReaction": "누구 집이 더 시끄러웠는지 감정선만 받아 주면 연우는 재택 녹음 피해를, 지훈은 아이 낙인을 붙잡고 둘 다 단독 가해자 프레임으로 되돌아간다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "왜 지훈은 184만 원에서 자기 몫을 30만 원으로 잘라 읽고, 왜 연우는 18만 원 증액을 사소하게 밀었는지 각 숫자에 매달린 이유를 말하게 해야 92만 원 계산의 숨은 전제가 드러난다.",
        "worstActionReaction": "보전금 전표만 흔들며 계산식만 외우면 지훈은 '내 바닥 구간만'을, 연우는 '천장은 보강일 뿐'을 되풀이해 숫자 뒤에 숨은 선택을 끝내 말하지 않는다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 0.95,
          "empathy_approach": 1.05,
          "evidence_present": 1.18,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "주민앱과 단지 라인에 더 번지지 않게 비공개 정리를 약속해야, 연우는 공지 14분 전 공개글을, 지훈은 30만 원 선송금 거부를 서로의 체면보다 먼저 사실대로 말한다.",
        "worstActionReaction": "누가 먼저 글을 올리고 돈을 보냈는지 초 단위 순서부터 잡으면 둘 다 타임라인에만 매달려 '관리실 공지 후 정산'이라는 공통 약속이 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "half_share_promise_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "extra_patch_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "added_cost_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "sole_upstairs_fault_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "final_amount_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "cap_amount_followup"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-4",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_recording_deadline_stress",
          "investigate_only:e-4": "e-4_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "management_notice_order_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "지훈은 반반 합의서에 서명한 뒤에도 예상보다 커진 돈을 받아들이지 못했고, 연우는 공사비를 조금이라도 정당화하려 천장 보강을 마감 보완처럼 부르며 축소했다. 각자 자기 계산표만 붙든 채 약속과 추가비용이 같은 판 위에 올라온 순간 갈등이 터졌다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "중재 자리에서 두 분은 위아래 공사를 묶어서 비용을 반반 나누자고 합의했습니다. 관리사무소에서 서명까지 한 걸로 기억해요.",
        "공사가 끝나고 나서 한쪽이 자기 구간만 따로 계산해서 금액을 확 줄인 건 놀랐습니다. 서명까지 한 합의를 시공 후에 번복한 거잖아요."
      ],
      "tp-2": [
        "현장에서 보면 윗집 바닥만 손봐서 끝날 구조가 아니었습니다. 아랫집 천장 공진도 소음을 키우고 있어서 패키지로 묶인 건데, 추가 패치 비용이 설명 없이 올랐어요.",
        "합의는 반반이었는데 중간에 항목이 늘어난 사정이 상대에게 전달이 안 됐습니다. 설명 없이 금액이 바뀌면 번복처럼 느껴질 수밖에 없거든요."
      ],
      "tp-3": [
        "관리실 공지가 나오기 전에 이미 주민앱에 불만 글이 올라갔고, 일부 금액만 송금된 상태였습니다. 공식 절차보다 양쪽 행동이 먼저 나간 겁니다.",
        "보전금 반영 후 잔여 공사비를 반반 적용하면 세대별 부담이 나옵니다. 합의를 뒤집은 순서와 공지 전 공개 압박이 이번 다툼의 핵심입니다."
      ]
    }
  },
  "neighbor-10": {
    "personalityTags": {
      "a": [
        "confrontational",
        "emotionally_volatile",
        "authority_challenging",
        "selective_quote"
      ],
      "b": [
        "calculated_calm",
        "face_sensitive",
        "relationship_preserving",
        "blame_shifting"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "trust_breach",
        "misleading_soft_evidence",
        "third_party_risk"
      ],
      "d-2": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "privacy",
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-4": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "reputation_risk",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "subjective_claim",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.83,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.24
        },
        "bestActionHint": "소연이 올린 부모방·입주민방 캡처와 정훈에게 직접 연락하기까지 비어 있던 8분을 맞대면, 하윤의 울음만으로 민우 실명과 한정판 이름을 공개한 판단이 숨기기 어렵다.",
        "worstActionReaction": "하윤이 얼마나 울었는지만 먼저 받아 주면 소연은 비어 보이던 홀로그램 칸과 눈물 장면을 번갈아 꺼내며 공개 지목 자체를 보호 본능으로 포장한다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1.05,
          "confidential_protection": 1.26
        },
        "bestActionHint": "민우가 '도둑'으로 굳지 않게 범위를 좁혀 준 뒤에야 정훈은 46초 음성메시지로 하윤을 '원래 규칙 바꾸는 아이'라 돌린 역소문을 평판 방어가 아니라 선택으로 말하게 된다.",
        "worstActionReaction": "처음부터 몇 명에게 퍼뜨렸는지만 캐면 정훈은 '몇 분한테만'이라고 범위를 더 줄이고, 민우 누명 얘기만 방패로 세워 하윤 흠집내기 자체를 숨긴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "공동학습실 5분 CCTV와 하윤 앨범 투명포켓 발견 사진을 같이 보여 주면, 절도 의심이 아니라 스티커가 원래 하윤 쪽에 있었단 사실이 가장 깔끔하게 굳는다.",
        "worstActionReaction": "누가 가져갔는지를 아이들 말로만 다시 캐묻기 시작하면 부모 둘 다 또 범인을 고르는 구도로 되돌아가, 이미 나온 영상과 발견 사진의 힘이 약해진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.83,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.13
        },
        "bestActionHint": "담임교사 상담 메모와 두 아이가 그린 교환 규칙 그림을 대면시키면, '먼저 보기'를 하윤과 민우가 다르게 이해했다는 오해 구조가 눈에 보여 절도 프레임이 벗겨진다.",
        "worstActionReaction": "아이들이 놀랐겠다고만 공감하면 소연은 울음 장면을, 정훈은 억울한 누명을 붙잡고 규칙 오해보다 성인들의 감정 대리전으로 다시 흐른다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 0.95,
          "empathy_approach": 1.05,
          "evidence_present": 1.26,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "두 집 아이 이름이 더 이상 채팅방에 오르지 않는다는 안전장을 깔아 줘야, 소연은 공개 글을, 정훈은 역소문 음성을 먼저 택한 순간을 서로 체면 덜 상하게 인정한다.",
        "worstActionReaction": "누가 먼저 약속을 깼는지만 가리려 들면 소연은 8분 차이를, 정훈은 20분 뒤 음성을 붙들고 버텨 '아이 일은 부모끼리 먼저'라는 약속 자체가 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "public_accusation_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "public_accusation_question",
          "confidential_protection": "nonjudgmental_question_about_child_crying"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "rumor_question",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "share_scope_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "theft_basis_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "theft_basis_question",
          "confidential_protection": "theft_basis_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "misunderstanding_question",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_pickup_trust",
          "investigate_only:e-1": "e-1_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "아이의 눈물과 한정판 스티커라는 상징성이 부모의 판단을 너무 빨리 완성해 버렸다. 소연은 보호자로서 즉시 움직여야 한다는 압박을, 정훈은 아들 평판을 지키려는 불안을 앞세우며 확인보다 공개 반응을 먼저 택했다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 울음 직후에 본 건, 한 아이는 '먼저 보면 교환 확정'이고 다른 아이는 '먼저 보기는 고르기 전 탐색'이라고 생각하고 있었다는 점입니다. 규칙을 다르게 이해한 오해였어요.",
        "어른들끼리 말이 커지기 전까지 아이들 다툼은 오래 갈 일이 아니었습니다. 그런데 한쪽 부모가 바로 부모방에 아이 실명과 물건 이름을 적어 절도 의심 글을 올리면서 완전히 달라졌어요."
      ],
      "tp-2": [
        "제가 CCTV 영상을 봐도 한 아이가 상대 앨범을 만지거나 챙기는 장면은 없었습니다. 둘 다 같은 앨범 페이지를 동시에 잡아당기다 다투는 모습이 더 눈에 띄었어요.",
        "아이들이 급하면 자기 손에 있던 것만 꼭 쥐고 나가는 경우가 많습니다. 영상만으로 누가 남의 걸 가졌다고 단정하기 어렵고, 놀이 규칙 오해에서 시작된 다툼으로 보입니다."
      ],
      "tp-3": [
        "다음 날 아이들을 따로 앉혀 보니 둘 다 거짓말 표정이 아니라 '내가 맞는 줄 알았다'는 얼굴이었습니다. 한정판 스티커도 결국 앨범 뒷표지 안쪽 투명포켓에 밀착돼 있었어요. 처음부터 거기 있었던 겁니다.",
        "저는 이 사건에서 가장 중요한 건 아이들이 아니라 어른들 반응이었다고 봅니다. 한쪽은 공개 절도 지목을 먼저 올렸고 다른 쪽은 역소문을 퍼뜨렸어요. '아이 문제는 먼저 직접 확인' 약속을 둘 다 안 지켰습니다."
      ]
    }
  },
  "neighbor-11": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "manipulative",
        "calculated_calm",
        "blame_shifting"
      ],
      "b": [
        "victim_identity",
        "martyr_complex",
        "manipulative",
        "retaliation_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-3": [
        "secret_keeping",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "secret_keeping",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "privacy",
        "reputation_risk",
        "promise_violation",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "hidden_motive",
      "t-4": "circumstantial",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.03
        },
        "bestActionHint": "서비스도어 출입로그, 성재 휴대폰 NFC 복제앱 기록, 박주현의 목격을 한꺼번에 대면시키면 '그냥 확인하려 들어갔다'는 말이 복제 태그 사용 앞에서 오래 못 버틴다.",
        "worstActionReaction": "덕트 누수와 냉방 장애로 얼마나 답답했는지만 먼저 받아 주면 성재는 실제 하자와 복제 침입을 한 문장으로 섞어 연출을 정당한 압박처럼 밀어붙인다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1.11
        },
        "bestActionHint": "31초 침입 클립 원본, 재고손실 사진, 직원 진술 초안을 나란히 깔아야 라은이 성재가 건드리지 않은 상자까지 흐트러뜨려 피해를 부풀린 흔적이 드러난다.",
        "worstActionReaction": "손님 세 팀 취소와 젖은 박스 사정만 공감하면 라은은 피해 항목을 더 쌓아 올리며 편집과 재배열을 '무시당한 사람의 기록'처럼 덮는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.1,
          "confidential_protection": 1.11
        },
        "bestActionHint": "두 보상요구서가 같은 노트북·같은 템플릿에서 14분 차이로 만들어진 메타데이터와 비밀 메신저를 맞대면, 위층·아래층 분쟁처럼 짜인 외피가 가장 빨리 벗겨진다.",
        "worstActionReaction": "건물주에게 오래 당했다는 공동 피해만 받아 주면 성재와 라은은 서로의 공모를 '같이 버틴 이웃 연대'로 바꿔 말하며 분쟁 연출의 핵심을 숨긴다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "사건 전날 올라온 건물주 측 보수·임대료 감면안 초안 이메일을 먼저 들이밀면, '연출하지 않으면 아무도 안 움직였다'는 두 사람의 명분이 한 번에 약해진다.",
        "worstActionReaction": "누수 민원이 얼마나 오래 묵었는지만 따라가면 둘 다 '세게 보여줘야 했다'는 도덕 점프에 기대어 이미 오고 있던 보상안 사실을 가려 버린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.72,
          "motive_search": 1.07,
          "empathy_approach": 1.16,
          "evidence_present": 1.16,
          "separation": 1.1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "임차인 단톡방으로 더 확산되지 않게 막아 주겠다는 신뢰를 줘야, 둘 다 관리대행사 원본 확인보다 편집 영상과 부풀린 손실표를 먼저 돌린 순서를 인정하기 쉬워진다.",
        "worstActionReaction": "누가 먼저 영상을 돌렸는지부터 추궁하면 성재와 라은은 몇 분 차이 공방으로 흩어져, 여론을 만들어 보상 압박부터 걸었다는 공동 전략이 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "service_tag_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present"
        ],
        "triggerMapping": {
          "fact_pursuit": "edited_clip_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "edited_clip_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "collusion_question",
          "present_if_lawful:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "collusion_question"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "direct_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 10
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-5",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_long_term_hvac_loss",
          "present_if_lawful:e-5": "e-5_presented",
          "investigate_only:e-1": "e-1_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "실제 하자와 냉방 장애가 있었기에 둘은 연출과 조작의 선도 스스로 합리화할 수 있다고 믿었다. 하지만 보상을 빨리 끌어내려는 조급함이 서로를 피해자이자 공모자로 동시에 만든 채, 뒤늦게는 각자 더 덜 나쁜 사람처럼 보이려 연출 분량만 따지게 됐다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "그날 밤 장면은 우연히 마주친 다툼치고 너무 준비된 느낌이었습니다. 한쪽은 4층 서비스도어 앞에서 태그를 여러 번 대 봤고, 다른 쪽은 평소와 달리 창고 안을 밝게 켜 놓고 있더라고요.",
        "저는 침입이라고 항의하면서도 둘 다 놀라는 기색이 없었다는 점이 이상했습니다. 화가 난 사람들이 아니라 뭔가를 기다리는 사람들처럼 보였어요."
      ],
      "tp-2": [
        "비상계단에서 들은 대화는 놀라서 나온 목소리가 아니라 덕트 보수비와 임대료 감면을 얼마나 받아낼 수 있느냐를 계산하는 톤이었습니다.",
        "저는 정확한 말까지는 못 적어도, 둘 다 건물주한테 보여 줄 자료를 어떻게 만들지를 맞추고 있었다는 느낌은 분명했습니다. 즉석 분노가 아니라 준비된 구도였어요."
      ],
      "tp-3": [
        "NFC 태그가 복제된 흔적을 확인했고, 두 세대의 보상요구서가 같은 장비에서 짧은 간격으로 만들어졌다는 것도 확인했습니다. 단순 침입이 아니라 연출 가능성이 높습니다.",
        "건물주 측이 사건 전날 이미 보수와 감면 초안을 검토 중이었다는 기록도 있습니다. 공모 정황 때문에 그 제안이 보류됐어요. 보상을 받아내려다 오히려 기회를 날린 구조입니다."
      ]
    }
  },
  "neighbor-12": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "manipulative",
        "shame_sensitive",
        "timeline_padding"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "fairness_obsessed",
        "relationship_preserving"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "reputation_risk",
        "secret_keeping",
        "trust_breach"
      ],
      "d-2": [
        "secret_keeping",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-3": [
        "financial",
        "secret_keeping",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-4": [
        "financial",
        "secret_keeping",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "secret_keeping",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "hidden_motive",
      "t-4": "circumstantial",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.98,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "입주민방에서 지연을 바로 사기꾼으로 몰지 않겠다는 안전판을 깔아야, '94만 원이 빈다'는 글을 도윤에게 원본 정산서도 받기 전에 왜 올렸는지 체면 대신 사실로 말하게 된다.",
        "worstActionReaction": "처음부터 '62만 원 숨겼죠?'라고 찍어 누르면 지연은 32만 원 환급과 작년 빈칸을 한 덩어리로 흐리며 참가자 12명의 압박을 방패로 세운다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.18
        },
        "bestActionHint": "도윤에게 왜 32만 원 카드취소 알림을 사흘이나 붙들고 있었는지, 배송료 재계산을 기다린 이유와 누명 공포를 먼저 말하게 해야 '이틀 정도였다'는 축소가 깨진다.",
        "worstActionReaction": "날짜와 시각만 들이밀면 도윤은 정산표 A열부터 F열까지 읽어 내려가며, 늦은 고지가 왜 의심을 키웠는지 책임 부분을 수식 속에 숨긴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "작년 캐시백 41만 원·반품차액 21만 원 내역, 이번 참가금 계좌흐름, 최병우가 들은 '지난번 빈칸부터' 발언을 함께 보여 주면 숨겨진 출발점이 지연 쪽 62만 원이라는 점이 선명해진다.",
        "worstActionReaction": "참가자 독촉 때문에 정신없었겠다고만 감싸면 지연은 '그때그때 섞였다'는 말로 작년 빈칸과 이번 환급을 계속 한 통장 안 안개처럼 섞어 둔다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.08
        },
        "bestActionHint": "수입사 최종 정산서와 국제배송료 재계산표, 작년 62만 원 지급내역을 나눠 펼쳐야 '사라진 94만'이 이번 32만과 작년 62만이 겹친 숫자라는 구조가 한 번에 풀린다.",
        "worstActionReaction": "헷갈릴 만했다는 공감만 먼저 주면 지연과 도윤 모두 94만 원을 하나의 실종금처럼 뭉개 두고, 어떤 라운드의 돈인지 분리 설명을 계속 미룬다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 0.95,
          "empathy_approach": 1.08,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1.29
        },
        "bestActionHint": "입주민방에 더 번지지 않게 선을 긋고 나면, 지연은 같은 개인계좌를 다시 쓴 선택을, 도윤은 작년 라운드 서면 마감을 끝까지 강제하지 않은 책임을 각각 털어놓기 쉬워진다.",
        "worstActionReaction": "누가 작년 정산을 먼저 잊었는지부터 재단하면 둘 다 옛 채팅 문장 해석에만 매달려, 왜 같은 계좌 구조를 반복해 다시 문제를 키웠는지 구조 책임을 놓친다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_participant_pressure",
          "investigate_only:e-1": "e-1_presented",
          "motive_search": "nonjudgmental_question_about_participant_pressure"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "late_notice_question",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "why_wait_for_freight_recalc",
          "confidential_protection": "late_notice_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "old_cashback_question",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "evidence_present"
        ],
        "triggerMapping": {
          "fact_pursuit": "what_is_940k_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present": "what_is_940k_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4",
          "present_if_lawful:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_running_too_many_group_buys",
          "evidence_present:e-4": "e-4_presented",
          "present_if_lawful:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "지연은 작년 미정산을 이번 환불 문제와 섞어도 참가자 압박 속에서는 자신이 먼저 몰릴 수 있다는 불안을 피하고 싶었고, 도윤은 숫자를 바로 설명하지 않으면 또 장부 장난으로 읽힐까 두려워 오히려 더 늦게 말했다. 작년 62만 원과 이번 32만 원을 분리해 닫지 못한 습관이 94만 원 은닉 서사를 만들었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "'돈을 숨겼다'는 글이 입주민방에 먼저 올라오자 해명이 뒤따라와도 이미 분위기가 한쪽으로 기울어 있었습니다. 정산서를 요구하기도 전에 공개 글이 먼저 나간 거예요.",
        "그날 모두가 숫자를 따지기보다 누가 빼돌린 사람인지 먼저 정하려는 분위기로 변하는 걸 봤습니다. 확인 전에 낙인이 먼저 찍힌 겁니다."
      ],
      "tp-2": [
        "이번 환급분과 작년에 닫지 못한 미정산 금액이 같은 계좌에서 뒤섞여 있었습니다. '큰돈이 사라졌다'는 말은 두 라운드 금액을 한 덩어리로 본 거예요.",
        "돈이 같은 통장에서 돌면 밖에서 보기엔 한 번에 빠진 것처럼 보입니다. 작년 정산을 안 닫은 채 같은 계좌를 다시 쓴 게 혼란의 시작이에요."
      ],
      "tp-3": [
        "정산 기록을 보면 이번 환급분과 작년 미정산분이 분리됩니다. 한 사람이 통째로 빼돌린 게 아니라 두 라운드 돈이 같은 통장에 남아 있었던 겁니다.",
        "이번 건의 핵심은 횡령이 아니라 정산 미마감입니다. 작년 돈을 개인계좌에 묶어 둔 채 이번 참가금으로 메우려 한 쪽이 먼저 문제였고, 확인 전 공개 지목이 터지면서 다툼이 폭발했습니다."
      ]
    }
  },
  "partnership-01": {
    "personalityTags": {
      "a": [
        "blame_shifting",
        "calculated_calm",
        "detail_obsessed",
        "shame_sensitive"
      ],
      "b": [
        "confrontational",
        "blame_shifting",
        "counter_attack",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "financial",
        "misleading_soft_evidence",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-3": [
        "promise_violation",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-4": [
        "financial",
        "secret_keeping",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "서준에게 왜 최종 서면 대신 먼저 정민우 신탁계좌로 1,800만원을 보냈는지 묻는 편이 먹힌다; 투자자를 놓치면 회사가 끝난다는 생존 계산을 말하게 되면 '횡령이 아니라 불가피한 선집행' 논리가 어디서 시작됐는지 스스로 드러난다.",
        "worstActionReaction": "송금 시각과 승인 여부만 몰아붙이면 서준은 e-1 계좌 흐름과 계약 단계만 길게 읊으며, 의도 질문을 절차 싸움으로 바꿔 숨는다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.92,
          "motive_search": 0.93,
          "empathy_approach": 0.93,
          "evidence_present": 1.22,
          "separation": 1.04,
          "confidential_protection": 1.15
        },
        "bestActionHint": "e-2 브리지 투자 예치계약 초안과 신탁원장, e-6 투자자 측 담당 확인 메일을 한꺼번에 대면하면 '개인 빚' 프레임이 무너진다; 계좌 이름보다 예치 목적과 비환급 조항이 먼저 보이기 때문이다.",
        "worstActionReaction": "서준에게 '빚이냐 아니냐'만 반복하면 그는 채무와 예치금의 단어 정의로 빠져서, 브리지 투자 검토와 법률비 구조라는 핵심을 계속 늦춘다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "해나 쪽은 e-4 원본 단톡과 음성메모를 들이대는 게 가장 빠르다; 직원들 앞에서 '승인한 적 없다'고 버틴 말이 2주년 회식 직후 구두 동의 흔적과 바로 충돌하기 때문이다.",
        "worstActionReaction": "해나의 불안만 받아 주면 그는 '직원들 동요 막으려던 것'이라며 승인 번복을 위기관리처럼 포장하고, 실제 동의 문장은 끝내 흐린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-5 세무사 회계분개 지시 메일에서 '컨설팅비로 잡자'는 제안 주체를 찍어 주면, 해나가 서준 단독 판단으로 몰던 프레임이 바로 흔들린다.",
        "worstActionReaction": "공감으로 접근하면 해나는 '직원들 앞 체면'과 매출 하락기 공포를 길게 말하며, 자기 회계분류 지시를 보호적 판단처럼 축소한다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.23,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "이 쟁점은 e-2 계약 초안의 320만원 비환급 조항을 먼저 확인시켜야 한다; 두 사람이 '전액 돌아온다'고 말한 낙관이 숫자 하나로 무너진다.",
        "worstActionReaction": "둘의 선의나 위기감만 받아 주면 1,800만원 전체만 이야기하고, 자동 전환되는 법률검토비 320만원은 계속 배경으로 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "escrow_transfer_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "escrow_transfer_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_investor_confidentiality",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-6": "e-2_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "prior_approval_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_or_staff_meeting_reference"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "tax_coding_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "refund_clause_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_or_shared_responsibility_question",
          "separation": "e-5_or_shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "두 사람 모두 돈 자체보다 \"누가 실패한 투자 유치의 책임자로 보이느냐\"를 더 두려워해, 있던 구두 합의도 기록으로 남기지 못한 채 나중에 서로에게서 지워 버렸다.",
        "unlockHint": "confidential_protection 또는 empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "법인계좌에서 큰 금액이 빠져 있는 걸 알았을 때 상대 쪽이 먼저 놀란 건 당연합니다. 최종 서면 승인 없이 움직인 거니까요. 저도 그 자리에서 들었지만 구두로 논의한 것과 서면 승인은 다르잖아요.",
        "다만 양쪽 다 직원들에게 돈의 실제 성격을 감춘 건 같은 문제입니다. 세무사에게 임시 분개를 먼저 제안한 것도 한쪽만은 아니었어요. 절차를 건너뛴 건 둘 다예요."
      ],
      "tp-2": [
        "기록을 보면 두 대표가 직원들한테 그 송금을 뭐라고 설명할지 맞추고 있었습니다. 실제로는 투자 예치금인데, 밖에는 '캠페인 컨설팅비'로 말하자고 한 거예요.",
        "저는 세무사한테 임시 분개를 먼저 제안한 것도 한쪽만이 아니었다고 봅니다. 직원 불안을 막자는 명분 아래 둘 다 실제 목적을 감춘 건 같은 거였어요."
      ],
      "tp-3": [
        "저는 단톡과 음성메모를 확인했는데, 송금 전에 한쪽이 준비금 한도 내 예치에 동의한 기록이 남아 있습니다. 나중에 그런 승인 자체가 없었다고 한 말과 맞지 않아요.",
        "계약 초안을 봤는데 예치금 전액이 돌아오는 구조가 아니었습니다. 일부는 비환급 법률검토비로 자동 전환되게 돼 있었는데, 이 부분을 두 분 다 직원들에게 알리지 않았습니다."
      ]
    }
  },
  "partnership-02": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "martyr_complex",
        "selective_quote",
        "retaliation_sensitive"
      ],
      "b": [
        "trust_broken",
        "fairness_obsessed",
        "calculated_calm",
        "authority_challenging"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "career",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-4": [
        "promise_violation",
        "career",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "third_party_risk",
        "hard_evidence_available",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "hidden_motive",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "준오 건은 e-4 원본 이메일 스레드와 시훈데이터랩 사업자등록증 첨부본을 붙여 보여 주는 순간 방향이 잡힌다; '탐색만 했다'는 말이 별도 유지보수 파일럿 타진 흔적과 바로 부딪히기 때문이다.",
        "worstActionReaction": "준오의 서운함에만 공감하면 그는 세한리테일을 따오기까지의 밤샘과 이동거리만 쌓아 올리며, 사촌 회사 제안 사실을 계속 피해자 서사 뒤로 숨긴다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "민경에게는 e-1 CRM 리드 이력과 초기 제안서, e-2 성과급 승인안, e-6 최종 보고서 편집 이력을 나란히 보여 주는 게 좋다; 준오의 원천 영업 기여가 어떤 단계에서 삭제됐는지가 버전으로 남아 있다.",
        "worstActionReaction": "민경의 '최종 제출 책임' 논리만 받아 주면 그는 공로 문제를 제출자 범위로 좁혀, 준오의 원천 영업 기여 축소를 실무 정리처럼 눌러 버린다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 1.2,
          "empathy_approach": 0.93,
          "evidence_present": 1.16,
          "separation": 1.02,
          "confidential_protection": 1.2
        },
        "bestActionHint": "준오가 완전한 피해자인지 묻는 쟁점은 공개 압박보다 보안 약속이 효과적이다; 별도 거래 시도까지 드러나면 영업 평판이 끝난다는 공포가 커서, 보호 장치가 있어야 숨긴 유지보수 문의를 인정한다.",
        "worstActionReaction": "사실만 정면으로 따지면 준오는 '그래도 내 이름은 왜 뺐는데'만 되풀이하며, 자기 유지보수 제안을 공로 박탈 서사 속에 다시 묻어 버린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.12,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.28,
          "separation": 1.07,
          "confidential_protection": 1.05
        },
        "bestActionHint": "RACI 시트, e-6 보고서 편집 이력, e-4 우회 메일을 함께 꺼내면 둘 다 공식 공로 규칙을 어느 지점에서 깨뜨렸는지 한눈에 드러난다.",
        "worstActionReaction": "민경이나 준오 어느 한쪽의 억울함만 달래 주면, 각자 상대 위반만 길게 말하고 자신이 공식 라인을 우회한 대목은 규정 예외처럼 밀어낸다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "이 쟁점은 e-5 세한리테일 컴플라이언스 검토 메모가 결정적이다; 고객사가 민경을 단독 창구로 세운 이유가 로비가 아니라 준오의 별도 제안과 사업자등록증 첨부였다는 연결고리가 문장으로 남아 있다.",
        "worstActionReaction": "막연히 '누가 고객 마음을 샀느냐'만 묻으면 민경은 대외 커뮤니케이션 역량을, 준오는 공로 박탈을 말하며 실제 단일 창구 지정 사유를 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "maintenance_side_contract_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "maintenance_side_contract_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "final_credit_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_side_maintenance_spinout",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_or_e-5_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "raci_rule_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "official_contact_reason_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "준오는 공로를 빼앗겼다는 감정에 매달렸고, 민경은 컴플라이언스 경고가 밖으로 드러날까 두려워해 둘 다 \"완전한 피해자\" 서사를 먼저 세웠다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "수주 축하 분위기인데도 준오씨가 자꾸 밖으로 빠져 통화하는 장면이 눈에 띄었습니다. 나중에 알고 보니 본계약 옆에 사촌 회사 명의로 별도 유지보수를 타진하고 있었던 거예요.",
        "제가 이상하다고 느낀 건 성과급과 보도자료 단계에서 한쪽 이름이 원천 영업 기여 항목에서 갑자기 빠져 있었다는 점입니다. 부속문서와 성과급 승인안에서 공로가 한 명에게로 몰렸더라고요."
      ],
      "tp-2": [
        "서류 흐름을 보면 초반 자료에 있던 원천 영업 기여자의 이름이 최종 부속문서에서 빠져 있었습니다. 내용이 아니라 이름 배열과 공로 표기만 급히 바뀐 편집이 분명했어요.",
        "저는 또 한쪽이 RACI 시트 바깥에서 별도 유지보수 거래를 타진한 기록을 봤습니다. 사촌 회사 사업자등록증까지 첨부된 제안이었어요. 공로를 빼앗긴 쪽도 깨끗하지 않았던 겁니다."
      ],
      "tp-3": [
        "저는 고객사가 창구를 한 명으로 좁힌 건 한쪽의 로비 때문이 아니라고 봅니다. 다른 대표가 사촌 회사 명의의 별도 유지보수 제안을 보내면서 컴플라이언스 우려가 생긴 게 직접적인 이유였어요.",
        "저는 메일 흐름을 보면, 고객사의 단일 창구 요청 시점이 별도 거래 타진 발각 직후라는 걸 확인했습니다. 두 대표 모두 서명한 RACI 공로규칙과 외부 커뮤니케이션 원칙을 각자 다른 방식으로 어겼어요."
      ]
    }
  },
  "partnership-03": {
    "personalityTags": {
      "a": [
        "selective_quote",
        "timeline_padding",
        "calculated_calm",
        "relationship_preserving"
      ],
      "b": [
        "confrontational",
        "emotionally_volatile",
        "selective_quote",
        "authority_challenging"
      ]
    },
    "contentTags": {
      "d-1": [
        "promise_violation",
        "sequence_sensitive",
        "career",
        "hard_evidence_available"
      ],
      "d-2": [
        "promise_violation",
        "sequence_sensitive",
        "career",
        "hard_evidence_available"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "sequence_sensitive",
        "career",
        "trust_breach"
      ],
      "d-4": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "career",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.88,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도윤에게 왜 새벽 0시 47분에 아젠다를 건드렸는지 묻는 편이 맞다; 투자자 흐름 최적화라는 말을 꺼내는 순간, 약속 파기보다 '효율'을 앞세운 판단 습관이 그대로 드러난다.",
        "worstActionReaction": "수정 시각만 몰아붙이면 도윤은 캘린더·메일·리허설 순서를 다시 짜며, 오프닝을 선점하려 한 동기를 시간표 뒤로 숨긴다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.23,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "서린 건은 e-2 디자인 툴 덱 출력 요청 로그와 인쇄본 발주 시점을 들이대면 정리가 빠르다; 상대 확인 전에 자기 오프닝판을 먼저 굳힌 흔적이 문서로 남아 있다.",
        "worstActionReaction": "서린의 배제감만 받아 주면 그는 '내 이름 빠진 덱' 얘기만 반복하며, 단독 발표용 인쇄를 먼저 돌린 사실을 정당한 자기방어처럼 포장한다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.07,
          "empathy_approach": 1.08,
          "evidence_present": 1.16,
          "separation": 1.02,
          "confidential_protection": 1.22
        },
        "bestActionHint": "이 쟁점은 비밀보호를 약속하고 e-4 IR 컨설턴트 음성메모 전체 문맥을 보게 하는 게 핵심이다; 둘 다 '상대가 일부러 뺏었다'는 체면을 내려놔야 같은 지시를 다르게 읽은 공유 오해를 인정한다.",
        "worstActionReaction": "처음부터 누가 더 악의적이었는지 재촉하면 도윤은 캘린더 수정을, 서린은 단독 덱 출력을 붙들고 버텨서 오해 구조 자체가 보이지 않게 된다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.16,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.28,
          "separation": 1.07,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-1 공유 캘린더 아젠다 최종본과 e-5 리허설 체크리스트를 맞대면, 두 사람이 '밤 10시까지 문서화' 약속을 동시에 비워 둔 채 각자 리허설을 돌린 사실이 선명해진다.",
        "worstActionReaction": "서로 급했던 사정만 공감하면 '그날은 다들 급했다'는 말로 정리돼 버리고, 왜 마지막 확인을 안 했는지에 대한 책임선이 사라진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.13,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "e-6 투자사 어소시에이트 확인 메일을 직접 읽히면 끝난다; 투자자 측이 요구한 건 전체 단독 발표가 아니라 첫 4분 오프닝과 시간관리뿐이었다는 범위가 명확하기 때문이다.",
        "worstActionReaction": "감각적으로 '투자자가 한 명 발표 원했다잖아'라고 몰면 둘 다 전체 주도권 싸움으로 확대해, 실제 요청 범위라는 좁은 쟁점을 놓친다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "opening_order_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_or_responsibility_question",
          "motive_search": "opening_order_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "solo_deck_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_ir_note_interpretation",
          "evidence_present:e-4": "e-4_or_e-6_presented",
          "evidence_present:e-6": "e-4_or_e-6_presented",
          "separation": "nonjudgmental_question_about_shared_confusion"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "documentation_rule_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "둘 다 투자자 앞에서 공동대표가 아니라 보조 설명자로 밀려날까 두려워, 같은 음성메모를 자기 쪽 오프닝 보장으로 듣고 굳혀 버렸다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 본 한쪽은 IR 미팅 전날 밤부터 오프닝 발표를 자기가 맡는 줄 알고 스크립트까지 다듬고 있었습니다. 그런데 아침에 보니 상대도 따로 단독 발표용 덱을 뽑아 놓은 거예요.",
        "솔직히 두 사람 다 자기가 오프닝을 맡을 줄 알고 있었습니다. 같은 IR 지시를 한쪽은 '전체 발표 맡으라는 뜻'으로, 다른 쪽은 '시간관리만 잡으라는 뜻'으로 이해한 거예요."
      ],
      "tp-2": [
        "기록을 보면 새벽 0시 47분에 한쪽이 공유 캘린더 아젠다를 수정해서 자기를 오프닝 발표자로 올렸고, 다른 쪽은 디자이너에게 단독 발표용 인쇄본을 먼저 뽑아 달라고 지시했습니다.",
        "전날 밤 10시까지 역할을 문서로 확정하자는 약속이 있었는데, 둘 다 안 지켰습니다. 각자 다른 버전으로 리허설까지 진행하면서도 서로 확인을 안 한 게 이 혼선의 핵심이에요."
      ],
      "tp-3": [
        "저는 투자자 쪽이 회의 전체를 한 사람에게 맡기라고 한 적은 없다고 확인했습니다. 원래 요청은 첫 4분 오프닝과 시간관리만 한 사람이 잡아 달라는 정도였어요.",
        "저는 캘린더 아젠다 수정 이력을 보면, 같은 모호한 지시를 각자 다르게 해석하고 밀어붙인 공유 오해입니다. 상대가 악의적으로 발표권을 빼앗았다는 믿음은 양쪽 다 사실이 아닙니다."
      ]
    }
  },
  "partnership-04": {
    "personalityTags": {
      "a": [
        "denial_heavy",
        "detail_obsessed",
        "fairness_obsessed",
        "avoidant"
      ],
      "b": [
        "victim_identity",
        "grudge_holding",
        "martyr_complex",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "misleading_soft_evidence",
        "financial",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-2": [
        "financial",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "financial",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive",
        "promise_violation"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "라희가 낸 거래내역은 e-4 편집 원본 스프레드시트와 위조 직인 파일을 함께 대면해야 무너진다; 협상 테이블에서 원본처럼 밀어붙인 PDF가 어디서 만들어졌는지 바로 드러나기 때문이다.",
        "worstActionReaction": "라희의 불신에 먼저 공감하면 그는 2년 전 리베이트 사건부터 줄줄이 꺼내며, 이번 편집 PDF 제출을 '또 안 속으려던 방어'로 포장한다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "민재 쟁점은 숫자보다 동기를 파고드는 편이 먹힌다; 왜 친구 회사 overflow QA를 숨겼는지 묻는 순간, 지금 거래내역을 못 믿게 만든 자기 과거의 배신 계산을 피하기 어려워진다.",
        "worstActionReaction": "리베이트 액수와 계약서만 따지면 민재는 '이미 정리된 건'이라고 눌러 버리고, 라희의 현재 불신을 만든 핵심 배경은 끝까지 축소한다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.93,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.02
        },
        "bestActionHint": "e-1 원본 은행 거래내역과 e-6 마이그레이션 설명서를 같이 보면, 주말 세 줄 이체가 횡령 3건이 아니라 보증금·충당금 이동의 분리 표기였다는 해석 싸움이 정리된다.",
        "worstActionReaction": "정황만 쌓아 '주말 심야 이체니까 수상하다'고 몰면, 둘 다 외부유출 인상만 붙들고 실제 계좌 귀속과 정산 목적은 끝내 확인하지 않는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.98,
          "motive_search": 1.07,
          "empathy_approach": 0.8,
          "evidence_present": 1.15,
          "separation": 1.06,
          "confidential_protection": 1.1
        },
        "bestActionHint": "이 쟁점은 e-2 과거 리베이트 정산 메모와 e-5 조정인 메일을 한 테이블에 올려야 한다; 이미 일부 정리된 과거 배신을 누가 현재 해지 협상 압박 카드로 다시 꺼냈는지가 드러난다.",
        "worstActionReaction": "누가 더 먼저 상처받았는지만 따라가면 라희는 피해자 자리로, 민재는 억울한 재소환 프레임으로 숨으면서 협상용 소환 자체를 인정하지 않으려 든다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.13,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "e-6 은행 시스템 마이그레이션 공지와 원본 거래내역을 같이 대조하면, 수취인 별칭과 원금·부가세·수수료 분리 표시 때문에 손실이 1,240만원 커 보인 착시가 숫자로 정리된다.",
        "worstActionReaction": "편집본 PDF만 기준으로 이야기하면 라희도 민재도 크게 보이는 총액만 붙들고, 표시 방식 변화가 만든 과장분은 아예 계산 밖으로 밀려난다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "bank_pdf_origin_question",
          "evidence_present:e-4": "e-4_or_e-5_presented",
          "evidence_present:e-5": "e-4_or_e-5_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "past_rebate_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_or_responsibility_question",
          "motive_search": "past_rebate_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "weekend_transfer_question",
          "evidence_present:e-1": "e-1_or_e-6_presented",
          "evidence_present:e-6": "e-1_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "past_incident_reuse_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "emotion",
        "deeperReveal": "라희의 편집 PDF가 설득력을 얻은 이유는 현재 증거가 강해서가 아니라, 민재가 과거 리베이트 사건 때 남긴 실제 상처가 아직 협상 테이블에서 살아 있었기 때문이다.",
        "unlockHint": "empathy_approach + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-3"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 본 라희씨는 2년 전 리베이트 건 이후로 숫자를 볼 때마다 '또 속는 거 아니냐'는 감정이 먼저 올라오는 사람이었습니다. 이번 주말 이체 내역도 곧바로 횡령으로 받아들인 거예요.",
        "솔직히 그 협상장 공기는 현재 정산보다 과거 배신 감정이 더 지배하고 있었습니다. 종이를 넘길 때마다 2년 전 일이 다시 소환되면서, 정상적인 해지 정산도 배신의 증거처럼 읽히고 있었어요."
      ],
      "tp-2": [
        "기록상 첫 대면부터 한쪽이 들고 나온 거래내역 PDF가 분위기를 지배했습니다. 그게 은행 원본인지 편집본인지 따지기 전에 이미 상대를 압박하는 도구로 쓰이고 있었어요.",
        "저는 'PDF가 은행 직출력본이 맞느냐'는 질문이 너무 늦게 나왔다고 봅니다. 은행 시스템 변경으로 수취인 별칭이 바뀌면서 겉보기 손실이 실제보다 훨씬 크게 보인 건데, 편집된 자료가 협상을 끌고 간 거예요."
      ],
      "tp-3": [
        "저는 원본 계좌 기록을 확인했는데, 주말에 나뉘어 찍힌 세 건은 고객 환급보증금과 퇴직충당금이 분리 표기된 정상 해지 정산 이동이었습니다. 한 사람이 빼돌린 구조가 아니에요.",
        "저는 또 협상에 제시된 거래내역 PDF가 은행 직출력본과 다르다는 걸 확인했습니다. 일부 행이 편집돼 있어서, 실제 자금 이동과 보여 준 자료를 반드시 분리해서 봐야 합니다."
      ]
    }
  },
  "partnership-05": {
    "personalityTags": {
      "a": [
        "manipulative",
        "calculated_calm",
        "privacy_sensitive",
        "blame_shifting"
      ],
      "b": [
        "victim_identity",
        "retaliation_sensitive",
        "shame_sensitive",
        "manipulative"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "misleading_soft_evidence",
        "financial",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-3": [
        "financial",
        "third_party_risk",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "financial",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "third_party_risk",
        "hard_evidence_available",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "core_fact",
      "t-4": "emotional_context",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "현우 건은 e-1 이체확인서와 e-2 박태성 세무사 제안 메일을 같이 내미는 게 좋다; 승인 누락은 분명하지만 돈이 어디로 왜 먼저 갔는지까지 한 번에 보여 줘야 '개인 비자금'과 분리된다.",
        "worstActionReaction": "현우를 곧바로 횡령자처럼 몰아붙이면 그는 계정명과 전표번호만 길게 읊으며, 공동 승인 누락이라는 진짜 약점을 숫자 장벽 뒤로 숨긴다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.12,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.19,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "소라에게는 e-4 공동 수신 메일과 회신 초안을 들이대는 순간 방어가 약해진다; 본인도 조사대응 선급금 제안을 읽었으면서 해지 협상에선 개인 유용 프레임만 밀어붙였다는 점이 문서로 남아 있기 때문이다.",
        "worstActionReaction": "소라의 불안감만 받아 주면 그는 동문 법인등기 캡처와 심야 이체 인상만 반복하면서, 자신이 받은 동일 메일과 회신 초안을 끝까지 배경으로 밀어낸다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.03,
          "motive_search": 1.07,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1.04,
          "confidential_protection": 1.15
        },
        "bestActionHint": "누가 설계했는지 다툴 땐 e-2 조사대응 체크리스트와 박태성 제안 메일이 핵심이다; 계정명과 선급 구조 문구가 세무사 쪽에서 먼저 나왔다는 흔적이 선명해서 상호 탓하기가 어려워진다.",
        "worstActionReaction": "현우냐 소라냐 둘 중 한 명 배후만 찾으려 들면, 둘은 서로의 장부 성향만 탓하며 박태성의 구체 제안 문장은 계속 빠져 나간다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.07,
          "empathy_approach": 1.05,
          "evidence_present": 1.08,
          "separation": 1.07,
          "confidential_protection": 1.17
        },
        "bestActionHint": "이 쟁점은 비밀보장을 걸고 노지훈 회의 메모와 팀 공지 초안을 확인시키는 편이 낫다; 둘 다 '서버 이전·관리비 선급' 같은 표현 뒤에 조사대응 목적을 숨긴 이유를 체면 없이 말하게 해야 한다.",
        "worstActionReaction": "사실 확인만 세게 들어가면 현우는 세목 구조로, 소라는 피해자 서사로 도망가서 조사대응 비용 성격을 축소해 설명한 공모 부분이 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "e-6 제휴 자문사 소개수수료 약정서가 열리면 끝난다; 박태성이 추천 자문사와 따로 이해관계를 맺고도 두 공동대표에게 중립 자문처럼 보이게 했다는 점이 한 번에 보인다.",
        "worstActionReaction": "세무조사 공포만 이야기하면 둘 다 '전문가가 시켜서 따랐다'는 명분 뒤로 숨고, 자문사 추천의 이해충돌 자체는 핵심 쟁점에서 빠진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "audit_retainer_transfer_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "personal_slush_fund_claim_question",
          "evidence_present:e-4": "e-4_or_e-5_presented",
          "evidence_present:e-5": "e-4_or_e-5_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_tax_accountant_advice",
          "evidence_present:e-2": "e-2_or_e-6_presented",
          "evidence_present:e-6": "e-2_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "internal_notice_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "현우는 세무조사 앞에서 약한 대표처럼 보일까 두려워 세무사 말을 구조로 포장했고, 소라는 다시 속는 재무 책임자로 보일까 두려워 가장 자극적인 비자금 프레임에 매달렸다.",
        "unlockHint": "confidential_protection 또는 empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "세무조사 통지가 온 뒤 상대 쪽은 큰 금액 이체를 보고 곧바로 '개인 비자금'이라고 단정했습니다. 자기도 세무사한테 같은 선급금 제안 메일을 받았으면서 그건 숨기고요.",
        "제가 인상 깊게 본 건, 해지 협상과 임원 회의에서 이걸 현우의 개인 비자금 의혹처럼 몰아간 방식이었습니다. 돈 성격을 모른 게 아니라 일부러 프레임을 씌운 거라고 느꼈어요."
      ],
      "tp-2": [
        "제가 확인한 건, 두 대표 다 직원들에게 그 돈을 '서버 이전비'나 '관리비 선급' 정도로만 설명했다는 점입니다. 실제 목적이 세무조사 대응 자문이라는 걸 팀에 감춘 건 한쪽만이 아니었어요.",
        "기록상 세무사 박태성이 선급금 구조를 처음 제안했고, 초반에는 두 대표 다 같은 방향으로 받아들였습니다. 투자 상황이 나빠진 뒤에야 서로 책임을 떠넘기기 시작한 거예요."
      ],
      "tp-3": [
        "저는 선급금 구조를 처음 제안한 게 두 대표가 아니라 세무사 박태성이었다고 확인했습니다. 그리고 그 세무사가 추천 자문사와 별도 소개수수료 약정을 맺고 있었는데 이를 두 대표에게 고지하지 않았어요.",
        "이 건의 핵심은 그 돈의 성격이라고 봅니다. 현우의 개인 유용이 아니라 세무사가 제안한 조사대응 선급금과 예납세액이었어요. 누가 비자금을 만들었느냐보다, 조언자의 이해충돌을 먼저 따져야 합니다."
      ]
    }
  },
  "partnership-06": {
    "personalityTags": {
      "a": [
        "confrontational",
        "fairness_obsessed",
        "emotionally_volatile",
        "grudge_holding"
      ],
      "b": [
        "shame_sensitive",
        "detail_obsessed",
        "calculated_calm",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "promise_violation",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-2": [
        "role_failure",
        "promise_violation",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "promise_violation",
        "trust_breach",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "misleading_soft_evidence",
        "role_failure",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-5": [
        "role_failure",
        "third_party_risk",
        "hard_evidence_available",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.88,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "가람에게 왜 보라 최종 확인 전 집기와 조명을 갈아 탔는지 묻는 편이 맞다; 납기와 예산 압박을 꺼내는 순간, 현장 우선 판단이 어디서 공동 승인선을 넘었는지 스스로 드러난다.",
        "worstActionReaction": "발주서만 들이밀며 따지면 가람은 '그날 오픈 안 밀리게 하려던 임시 선택'이라고 버티며, 자기 월권을 긴급 대응 언어로 계속 희석한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.08,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "보라 쪽은 e-2 수정 평면도와 e-6 시공 PM 현장일지를 같이 보여 줘야 한다; 카운터 위치 변경이 단순 브랜딩 코멘트가 아니라 철거 순서까지 건드린 실지시였다는 게 현장 기록으로 남아 있다.",
        "worstActionReaction": "보라의 브랜드 완성도 고민만 받아 주면 그는 '위치만 말했을 뿐'이라고 범위를 좁혀, 철거 일정까지 손댄 책임을 디자인 언어 속에 숨긴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.13,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "e-4 변경승인 시트와 양쪽 지시 로그를 맞대면, 300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인이라는 원칙을 둘 다 깼다는 사실이 깔끔하게 정리된다.",
        "worstActionReaction": "누가 먼저 선을 넘었는지 순위 매기기부터 시작하면 가람은 발주만, 보라는 동선만 붙들고 버텨서 '공동 승인 원칙 파기'가 사라진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.18,
          "motive_search": 0.95,
          "empathy_approach": 0.78,
          "evidence_present": 1.3,
          "separation": 1.1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "지연 책임을 한 사람에게 몰지 말고 e-1 대체 발주서와 e-6 추가견적서를 한 쌍으로 읽게 하면, 가람의 대체 발주와 보라의 재지시가 맞물려 리뉴얼이 밀렸다는 공동 구조가 보인다.",
        "worstActionReaction": "가람 또는 보라 한쪽 편만 들어 주면 둘 다 상대 월권만 확대하면서, 자기 변경이 일정 지연과 어떻게 교차했는지는 끝내 인정하지 않는다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.18,
          "motive_search": 0.95,
          "empathy_approach": 0.78,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "이 쟁점은 e-5 출입 게이트 기록과 e-6 현장일지, 직원용 일정표를 함께 보는 게 효과적이다; 서로 다른 최종안이 어느 시점부터 시공팀과 매장 직원에게 동시에 전달됐는지가 한 번에 드러난다.",
        "worstActionReaction": "혼선의 불편함만 공감하면 두 사람 다 '상대가 먼저 잘못 전달했다'고 버티며, 자기 수정안을 최종안처럼 돌린 순간은 뒤로 빼 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "fixture_reorder_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_or_responsibility_question",
          "motive_search": "fixture_reorder_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "counter_relocation_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_context_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "delay_cause_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "conflicting_final_plan_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_or_e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "둘 다 매장을 빨리 다시 열어야 한다는 압박 속에서 자기 영역만 먼저 지키면 된다고 생각했고, 그래서 \"월권\"을 따지면서도 막상 본인 변경은 긴급 조치로 축소했다.",
        "unlockHint": "motive_search + d-4 현재 S2 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 본 보라씨는 재오픈 이틀 전에 상대 확인 없이 카운터 위치를 다시 옮기고 철거 순서까지 바꾸라고 시공팀에 직접 지시했습니다. 동선이 가게 인상을 바꾼다고 확신하는 사람이었어요.",
        "그런데 다른 쪽도 예산과 납기를 이유로 상대 확인 없이 진열 집기와 조명을 대체 발주했습니다. 둘 다 '지금 안 바꾸면 늦는다'는 마음으로 각자 움직인 거예요."
      ],
      "tp-2": [
        "현장 기록을 보면 한쪽이 집기를 대체 발주하면 다른 쪽이 카운터 동선을 다시 바꾸는 식으로 수정이 겹쳤습니다. 시공팀이 서로 다른 지시를 동시에 받으면서 공정이 꼬였어요.",
        "300만원 이상 변경은 공동 승인하기로 해 놓고 둘 다 안 지켰습니다. 각자 자기 수정안을 최종안처럼 전달해서 직원과 업체가 다른 일정표와 평면도를 동시에 참고하게 된 거예요."
      ],
      "tp-3": [
        "저는 시공팀으로 들어온 요청이 하루에 방향이 몇 번씩 바뀐 걸 확인했습니다. 같은 매장인데 두 대표가 각자 다른 최종안을 가져오니, 현장이 어느 쪽을 따라야 할지 모르는 상황이었어요.",
        "저는 리뉴얼 지연이 한쪽의 단독 월권이 아니라 양쪽 변경이 겹친 공동 결과라고 봅니다. 서로 다른 수정안이 동시에 내려가면서 현장이 혼선을 감당할 시간이 없었던 게 직접 원인입니다."
      ]
    }
  },
  "partnership-07": {
    "personalityTags": {
      "a": [
        "trust_broken",
        "detail_obsessed",
        "calculated_calm",
        "privacy_sensitive"
      ],
      "b": [
        "confrontational",
        "counter_attack",
        "shame_sensitive",
        "fairness_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "career",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "career",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "third_party_risk",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "third_party_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "third_party_risk",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.15,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "e-2 바이어 메시지와 e-6 운영사 감사로그를 나란히 들이밀면, 유나가 박수민 AE 사과 메일이 나오기 전부터 태경을 '누설자'로 말하고 다녔다는 순서가 드러난다.",
        "worstActionReaction": "유나의 체면 손상만 먼저 달래면 그는 '거래처를 지키려던 대응'이었다고 버티면서, 사무국과 바이어에게 태경 이름을 먼저 꺼낸 장면을 계속 흐린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "태경 쪽은 e-1 프로젝터 점검 요청 메일과 e-5 행사 보안 가이드를 바로 맞대는 게 효과적이다. 전체 덱 첨부가 '잠깐 편의'가 아니라 합의된 축약본 원칙을 깬 행동임이 한 번에 보인다.",
        "worstActionReaction": "행사 준비 압박을 이해한다고만 하면 태경은 '점검용 백업'이라는 말로 범위를 줄이며, 단가표와 팝업 일정이 다 들어간 파일을 왜 그대로 보냈는지 끝까지 절차 문제로만 돌린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 0.95,
          "empathy_approach": 1,
          "evidence_present": 1.29,
          "separation": 1.04,
          "confidential_protection": 1.18
        },
        "bestActionHint": "e-4 원본 단톡과 e-6 오발송 감사로그를 함께 제시하면, '자료 넘겼어'가 경쟁사 전달이 아니라 운영사 점검 파일을 뜻했다는 점과 실제 유입 경로가 AE 메일이었다는 점이 동시에 풀린다.",
        "worstActionReaction": "누가 고의로 팔았는지만 예·아니오로 몰아붙이면 두 사람 모두 전 직장 인맥, 크롭 캡처, 경쟁사 타이밍만 되풀이하며 내부 배신 프레임에서 못 빠져나온다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 1.07,
          "empathy_approach": 0.8,
          "evidence_present": 1.18,
          "separation": 1.06,
          "confidential_protection": 1.1
        },
        "bestActionHint": "이 쟁점은 e-1 전체 덱 첨부와 e-5 QR 폴더 수정 이력을 같은 규칙 위반 묶음으로 보여 주는 편이 낫다. 태경의 첨부 발송과 유나의 최신 전체파일 링크 교체가 한 규칙 위에서 만난다.",
        "worstActionReaction": "둘의 억울함을 번갈아 받아 주면 태경은 운영사 탓만, 유나는 경쟁사 탓만 말하면서 각자 자기 위반 장면을 '그때는 급했다'는 핑계 뒤로 숨긴다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.13,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "실제 유출 경로는 e-6 하나가 제일 세다. 박수민 AE 사과 메일, 동일 첨부 해시, 경쟁사 바이어 수신 기록을 한 번에 확인시키면 내부 고의 유출 서사가 바로 힘을 잃는다.",
        "worstActionReaction": "태경이나 유나의 상처만 만져 주면 둘 다 다시 '우리 안에서 누가 팔았는가'로 돌아가고, 후속메일 첨부 실수라는 가장 단순한 경로 확인을 계속 미루게 된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "who_did_you_name_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_or_apology_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "full_deck_attachment_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_event_backup_file",
          "evidence_present:e-4": "e-4_or_e-6_presented",
          "evidence_present:e-6": "e-4_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "event_security_rule_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_breach_followup"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "유나는 업계에서 체면을 잃는 공포 때문에 누설자를 먼저 상상했고, 태경은 부주의와 배신이 다르다는 확신에 갇혀 유나의 명예 손상을 충분히 체감하지 못했다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "업계 모임 직후 유나씨는 경쟁사가 자기네 도매단가와 팝업 일정을 알고 있다는 걸 듣자마자, 상대 대표가 흘렸을 거라고 단정했습니다. 바이어와 협회에 '그쪽이 흘린 것 같다'고 반복 말한 거예요.",
        "제가 본 건 화낸 사람이라기보다 체면이 무너진 사람이었습니다. 경쟁사가 안쪽 사정까지 아는 것 같다는 불안이, 확인보다 내부 배신 의심을 먼저 키운 거였어요."
      ],
      "tp-2": [
        "저는 태경씨가 프로젝터 점검 요청에 전체 도매단가와 팝업 일정이 포함된 덱을 첨부로 보낸 걸 확인했습니다. 비식별 축약본을 써야 했는데 전체 파일을 그대로 보낸 거예요.",
        "다른 쪽도 추적 링크가 아닌 전체 파일을 QR 후속자료 폴더에 올렸습니다. 둘 다 외부 행사 자료는 축약본만 쓰기로 한 원칙을 어긴 거예요. 밖에 나갈 수 있는 환경을 만든 건 양쪽 다 책임이 있습니다."
      ],
      "tp-3": [
        "저는 경쟁사에 자료가 도달한 경로를 확인했는데, 동업자 중 누가 고의로 넘긴 게 아닙니다. 운영사 AE가 후속메일에 스피커용 백업 폴더를 잘못 첨부하면서 경쟁사 바이어에게까지 같은 파일이 간 거예요.",
        "저는 이 건에서 내부 배신보다 자료 관리 체계 부재가 더 큰 문제라고 봅니다. 동업자 어느 쪽도 경쟁사에 직접 보내지 않았지만, 전체 파일이 밖에 나갈 수 있는 환경을 둘 다 만들어 놓았습니다."
      ]
    }
  },
  "partnership-08": {
    "personalityTags": {
      "a": [
        "relationship_preserving",
        "calculated_calm",
        "conflict_avoidant",
        "shame_sensitive"
      ],
      "b": [
        "victim_identity",
        "martyr_complex",
        "selective_quote",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "secret_keeping",
        "career",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "promise_violation",
        "trust_breach",
        "career"
      ],
      "d-4": [
        "promise_violation",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "career",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "subjective_claim",
      "t-4": "subjective_claim",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-1 홀드 포기 문자와 e-5·e-6 현금보유 보고서를 묶어 보여 주면, 시원이 기분 따라 도망친 게 아니라 실제로 가계약을 멈춘 시점과 그때 재무 조건이 어땠는지가 분리돼 드러난다.",
        "worstActionReaction": "시원의 두려움을 먼저 공감하면 그는 곧 '또 적자 내면 끝이었다'는 숫자 이야기만 길게 늘어놓고, 지아와 마지막 조율 없이 홀드를 풀어버린 장면은 희미하게 만든다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "지아에게는 e-3 크롭 DM보다 e-4 별도 법인 초안과 강사 합류 시트를 정면으로 대면시키는 게 빠르다. '백업 플랜'이라는 말이 실제 준비물 앞에서 버티기 어렵다.",
        "worstActionReaction": "지아의 상처를 먼저 받아 주면 그는 다시 '살 길을 찾은 것뿐'이라는 피해 서사로 돌아가고, 김나리와 새 공간을 구체적으로 굴린 흔적은 계속 배경으로 밀린다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.93,
          "evidence_present": 1.16,
          "separation": 1.02,
          "confidential_protection": 1.2
        },
        "bestActionHint": "이 쟁점은 confidential_protection이 잘 먹힌다. 김나리와 주고받은 DM이나 미완성 법인 초안이 곧바로 강사들 사이로 퍼지지 않게 해 주면, 지아도 '순수 피해자' 이미지 뒤에 숨긴 별도 준비를 더 빨리 인정한다.",
        "worstActionReaction": "누가 먼저 배신했는지만 사실 확인식으로 따지면 지아는 '시원이 약속을 깼다'는 한 문장에 매달리고, 별도 스튜디오 구상이 어디까지 갔는지는 용어 싸움으로 흩어진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-5 부속메모와 e-1·e-4를 같이 놓으면 좋다. 시원의 단독 보류와 지아의 비밀 준비가 서로 다른 방식이지만 같은 '서면 확장 프레임' 이탈이라는 점이 선명해진다.",
        "worstActionReaction": "둘 다 억울하다는 감정만 받아 주면 시원은 재무 탓, 지아는 성장 기여 탓으로 흩어져서 2024년 이후 합의한 공동 승인 구조 자체가 잘 안 보이게 된다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.08,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "오혜린 회계사의 e-6 체크리스트와 e-5 월말 현금보유 보고서를 먼저 고정하면, 5주년 분위기와 별개로 8천만원 2개월 유지 조건이 실제로는 아직 안 찼다는 점이 숫자로 박힌다.",
        "worstActionReaction": "확장 약속이 얼마나 설렜는지만 따라가면 둘 다 기념식 발언과 기대감만 말하고, 자동 발동이 아닌 조건부 조항이라는 핵심은 계속 감정 뒤로 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "deposit_hold_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "side_studio_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "side_studio_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_backup_plan",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "written_expansion_framework_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "cash_reserve_clause_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_or_shared_responsibility_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "둘 다 2024년 팝업 손실 이후 \"먼저 버려질 수 있다\"는 불안을 갖고 있어, 시원은 숫자 조건 뒤에 숨고 지아는 백업 플랜을 준비하면서도 상대의 움직임만 배신으로 읽었다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "시원씨는 과거 팝업 손실 경험 때문에 확장 얘기만 나오면 '현금이 되느냐'부터 따지는 사람이었습니다. 2호점 열기보다 지금 버틸 돈이 먼저라는 입장이었어요.",
        "솔직히 그분은 확장에 무조건 반대한 게 아니라, 부속합의에 적힌 현금 8천만원 유지 조건이 아직 안 됐는데 가계약을 서두르는 게 불안했던 거예요."
      ],
      "tp-2": [
        "저한테 온 문의는 전 헤드강사와 함께 별도 스튜디오를 차릴 수 있는지 실제로 떠보는 내용이었습니다. 공간 탐색과 강사 합류 가능성까지 구체적으로 물었어요.",
        "특히 '기존 파트너한테 당장 알리지 말아 달라'는 부탁까지 있었기 때문에, 2호점 약속 파기의 피해자라는 말과 동시에 따로 사업을 준비하고 있었다는 뜻이라고 봤습니다."
      ],
      "tp-3": [
        "저는 부속메모에 적힌 현금성 자산 8천만원 2개월 유지 조건이 아직 충족되지 않았다고 확인했습니다. 리스료와 세금을 반영하면 월말 보유액이 기준에 미달해요.",
        "저는 한쪽은 단독으로 가계약을 보류했고, 다른 쪽은 단독으로 별도 스튜디오 준비를 진행했다는 점이 핵심입니다. 둘 다 같은 부속합의 틀을 각자 다른 방식으로 무너뜨린 겁니다."
      ]
    }
  },
  "partnership-09": {
    "personalityTags": {
      "a": [
        "confrontational",
        "authority_challenging",
        "counter_attack",
        "blame_shifting"
      ],
      "b": [
        "victim_identity",
        "manipulative",
        "retaliation_sensitive",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "misleading_soft_evidence",
        "career",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-3": [
        "career",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-4": [
        "career",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "hard_evidence_available",
        "reputation_risk",
        "third_party_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "다예가 자기 이름을 전면에 세운 흔적은 e-1 보도자료 초안만으로도 강하지만, e-6 브리핑 수정 요청 메일까지 붙이면 '외부 얼굴' 수준이 아니라 공로 배치까지 손댄 흐름이 보인다.",
        "worstActionReaction": "다예가 환수와 망신을 두려워한 마음만 받아 주면 그는 '내가 기관 대응을 다 했다'는 고생 이야기로 넘어가고, 인호 기여를 줄여 잡은 문장들은 뒷전으로 숨는다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "인호 쟁점은 e-3 캡처와 e-4 원본 평가 메일을 정면 대조시키는 게 가장 빠르다. '기술성 최고' 뒤에 잘린 시장검증·기관협업 문장이 살아나면 편집 의도가 바로 드러난다.",
        "worstActionReaction": "인호가 기술을 만들었다는 자존심부터 달래면 그는 계속 '결국 기술이었지'라는 헤드라인만 반복하고, 왜 다예 쪽 문장을 잘라냈는지는 설명하지 않는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.78,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "e-2 버전 로그, e-5 원본 전력로그·허위 확인서 초안, e-6 기관 메모를 한 묶음으로 보면 지원금이 누구 한 사람의 깨끗한 성과가 아니라 부풀린 실적 위에 섰다는 구조가 드러난다.",
        "worstActionReaction": "둘의 서운함을 공감만 해 주면 싸움은 다시 '누가 더 많이 뛰었나'로 돌아간다. 그러면 허위 실적과 추천확인서라는 진짜 기반 문제는 계속 가려진다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 1.07,
          "empathy_approach": 1.1,
          "evidence_present": 1.07,
          "separation": 1.09,
          "confidential_protection": 1.25
        },
        "bestActionHint": "허위 실적 공모는 confidential_protection으로 접근해야 풀린다. 환수나 형사 리스크를 바로 들이대지 않고 정하늘 실무 로그와 문구 승인선을 비공개로 확인해 주면, 두 사람 다 '마감 직전 같이 부풀렸다'는 사실을 더 빨리 말한다.",
        "worstActionReaction": "누가 먼저 거짓말했는지 사실 추궁부터 들어가면 둘 다 날짜와 표현 하나씩만 잘라 들고 나오며, 공동 승인으로 허위 수치를 올린 구조 자체를 끝까지 분산시킨다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.28,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "이소진이 보관한 e-6 사후점검 후보 메모와 e-4 이미지 메타데이터 보고를 연결하면, 기관이 이미 이상 신호를 잡고 있었다는 사실이 '설마' 수준이 아니라 실제 진행 단계였음이 드러난다.",
        "worstActionReaction": "불공정하게 의심받았다는 감정부터 받아 주면 둘 다 사후점검을 먼 미래 일처럼 취급하고, 현재 파일 이상 징후와 브리핑 수정 흔적을 계속 축소한다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "public_credit_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "grant_feedback_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "grant_feedback_question"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_caused_grant_success_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_deadline_pressure",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "post_award_audit_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "둘은 지원금의 성과 스토리가 무너지면 회사도 무너질 수 있다는 공포 속에서, 허위 실적을 잠깐 빌리는 문제를 각자 상대가 더 감당해야 할 윤리 비용으로 떠넘겼다.",
        "unlockHint": "confidential_protection 또는 motive_search + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "지원금이 교부되자마자 다예씨는 보도자료와 브리핑 발표문에서 상대 기여를 줄이고 자기를 단독 주공로자로 올리는 데 집중했습니다.",
        "제가 본 그분은 들뜬 사람이라기보다 '이 성과의 얼굴로 누가 남느냐'에 매달리는 쪽이었습니다. 사후점검이 올 수 있는 상황인데 공로 선점에만 에너지를 쓰고 있었어요."
      ],
      "tp-2": [
        "실무 로그를 보면 실증 매장 수와 월 절감률이 제출할 때마다 조금씩 올라갔습니다. 두 분 다 '이 정도면 통과하겠다'는 식으로 넘겼어요.",
        "저는 한쪽만 부풀린 게 아니라고 봅니다. 거래처 확인서 일부도 실제보다 크게 만들어졌고, 그 과정에 두 사람 다 관여하고 있었습니다. 허위 실적 공모에 가까워요."
      ],
      "tp-3": [
        "저는 교부 직후에도 설명자료를 다시 손보려는 움직임이 있었다고 확인했습니다. 파일 메타데이터에 중복 문구와 이상 징후가 남아 있어서, 이미 사후점검 후보에 올려 둔 상태입니다.",
        "저는 공로 다툼과 별개로, 지원서에 적힌 실증 수치와 확인서 자체를 다시 봐야 한다고 생각합니다. 누가 더 기여했느냐를 따지기 전에, 그 기여의 근거가 된 숫자가 맞는지가 먼저입니다."
      ]
    }
  },
  "partnership-10": {
    "personalityTags": {
      "a": [
        "timeline_padding",
        "detail_obsessed",
        "conflict_avoidant",
        "relationship_preserving"
      ],
      "b": [
        "confrontational",
        "fairness_obsessed",
        "emotionally_volatile",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "promise_violation",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "promise_violation",
        "sequence_sensitive",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "trust_breach",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-5": [
        "misleading_soft_evidence",
        "sequence_sensitive",
        "hard_evidence_available",
        "career"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "준서 문제는 e-1 오퍼 메일과 e-5 공동 채용 체크리스트를 같이 보는 게 핵심이다. 급여 시트와 final message가 비어 있는데도 계좌정보 요청까지 나간 순간이 너무 선명하다.",
        "worstActionReaction": "인력 공백 사정을 먼저 이해해 주면 준서는 '체험근무 기준'이었다는 말로 오퍼 메일과 온보딩 서류의 무게를 깎아 버리고, 최종 승인 누락은 부차화한다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "혜린 쪽은 왜 굳이 기존 트레이너들에게 '아직 채용 확정 아님'을 먼저 돌렸는지 동기를 묻게 되면 풀린다. 프로그램 기준을 자기 승인 없이 넘겼다는 공포가 나오면, 보류 통보를 퍼뜨린 이유가 드러난다.",
        "worstActionReaction": "혜린에게 e-2 메시지 문구만 들이대면 그는 곧바로 '결국 내 승인 없이 뽑으려 한 거잖아'를 반복한다. 그러면 왜 후보자와 내부 직원에게 먼저 알렸는지는 계속 가려진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "motive_search",
        "actionScores": {
          "fact_pursuit": 0.98,
          "motive_search": 0.95,
          "empathy_approach": 1,
          "evidence_present": 1.29,
          "separation": 1.04,
          "confidential_protection": 1.18
        },
        "bestActionHint": "e-3 잘린 단톡과 e-4 원본, e-6 자동 캘린더 로그를 세 개 같이 붙이면 좋다. '이번 주부터 같이 돌아보자'가 trial 맥락이었다는 점과 시스템 초대가 최종 승인처럼 읽힌 이유가 동시에 풀린다.",
        "worstActionReaction": "이 쟁점에서 동기만 파고들면 준서는 '오해였다'고, 혜린은 '배신이었다'고 각자 마음 이야기만 반복한다. 그러면 실제로 어긋난 건 문구와 자동화였다는 구조가 잘 안 보인다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "e-5 체크리스트를 중심에 두고 e-1 오퍼, e-2 별도 보류 공지를 양옆에 놓으면, 한쪽은 먼저 채용하고 다른 쪽은 먼저 취소한 식으로 같은 단일 커뮤니케이션 원칙을 둘 다 깬 그림이 선명하다.",
        "worstActionReaction": "준서의 급한 운영 사정이나 혜린의 부적합 채용 트라우마만 받아 주면 두 사람 다 자기 우회 행동을 '어쩔 수 없었다'고 미화하고, 공동 절차 붕괴는 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.27,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "정우림 노무사가 남긴 e-6 자동 발송 조건을 먼저 확인시키면, 'Day 1 Orientation' 초대가 사람 의도가 아니라 툴 단계 이동만으로도 나갈 수 있었다는 기술적 원인이 분명해진다.",
        "worstActionReaction": "민서가 얼마나 혼란스러웠는지에만 머무르면 두 대표는 그 초대를 각자 자기 주장의 증거로만 소비한다. 자동 규칙이라는 핵심은 다시 뒷전이 된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "offer_mail_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "why_tell_staff_hold_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "why_tell_staff_hold_question"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_trial_approval",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_rule_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "준서는 인력 공백 때문에 후보를 놓칠까 두려웠고, 혜린은 부적합 채용이 다시 센터 철학을 흔들까 두려워 \"trial\"과 \"final\"의 선을 서로 다르게 붙잡았다.",
        "unlockHint": "empathy_approach + d-3 현재 S2 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "그 대표님은 예전에 기준 미달 인력을 뽑아 프로그램 신뢰가 흔들린 경험이 있어서, 출산휴가 공백이 급해도 채용 기준은 못 낮추겠다는 입장이었습니다.",
        "솔직히 그분이 '이번 주부터 한번 같이 돌아보자'라고 한 건 체험 3일 의미였는데, 상대가 정식 채용 승인으로 알아듣고 오퍼 메일까지 보낸 거예요. 같은 말을 다르게 이해한 거였습니다."
      ],
      "tp-2": [
        "저한테 온 메시지는 완전히 다른 이야기였습니다. 한쪽에서는 오퍼 메일과 계좌 정보 요청이 왔고, 다른 쪽에서는 '채용은 없던 일'이라는 보류 통보가 왔어요.",
        "저는 누가 말을 바꿨는지보다, 두 대표가 같은 후보자 건을 전혀 다르게 이해하고 있었다는 게 문제라고 봅니다. HR 툴 자동 캘린더 초대가 최종 채용 확정처럼 보이게 만든 것도 혼선을 키웠어요."
      ],
      "tp-3": [
        "저는 HR 툴 구조를 확인했는데, 후보자를 온보딩 단계에 넣는 순간 'Day 1 Orientation' 캘린더 초대가 자동으로 나갑니다. 내부 합의가 안 끝났어도 밖에서 보기엔 채용 확정처럼 보여요.",
        "저는 체험평가표, 급여 시트, 공동 최종 메시지를 거치기로 한 체크리스트가 아직 완료되지 않은 상태에서 자동 안내가 나간 게 이 오해의 핵심이라고 봅니다. 둘 다 채용 절차를 어겼어요."
      ]
    }
  },
  "partnership-11": {
    "personalityTags": {
      "a": [
        "denial_heavy",
        "calculated_calm",
        "timeline_padding",
        "avoidant"
      ],
      "b": [
        "victim_identity",
        "grudge_holding",
        "martyr_complex",
        "manipulative"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "promise_violation",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "career",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "subjective_claim",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "재원에게는 왜 아린 동의보다 성수 매장 hold 마감이 더 급했는지 동기를 캐묻는 편이 먹힌다. '기회를 놓치면 끝'이라는 계산을 말하게 되면 독단 계약을 운영 판단으로 포장해 온 논리가 열린다.",
        "worstActionReaction": "임대차계약 조항과 보증금 시각만 따지면 재원은 브로커 독촉, 공실 일정, 보증금 마감 같은 시간표 뒤에 숨어서 '왜 혼자 결정했는가'라는 질문을 피해 간다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "아린 쪽은 e-3 크롭 DM보다 e-4 등기부와 거래처 전환 제안 메일을 정면으로 붙이는 게 빠르다. 새 법인 명의 견적서가 나오면 '그냥 대비'라는 말이 힘을 잃는다.",
        "worstActionReaction": "아린이 느낀 배신감만 받아 주면 그는 다시 '브랜드를 빼앗겼다'는 피해 서사로 돌아가고, 핵심 도매처를 새 법인으로 옮기려 한 선행 움직임은 계속 희미해진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.97,
          "motive_search": 1.07,
          "empathy_approach": 0.85,
          "evidence_present": 1.29,
          "separation": 1.04,
          "confidential_protection": 1.15
        },
        "bestActionHint": "e-1 지점 계약서와 e-4 아린셀렉트F&B 자료를 동시에 대면시키면, 한쪽만 독단을 저질렀다는 구도가 깨진다. 지점 선점과 거래처 분리 준비가 시간차로 맞물린다는 점이 중요하다.",
        "worstActionReaction": "누가 더 상처받았는지부터 따라가면 아린은 피해자 위치를, 재원은 기회 확보 논리를 더 세게 붙든다. 그러면 '둘 다 공동 기회를 사유화했다'는 반전이 잘 안 열린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-2 공동기회 부속합의서와 e-5 거래처 이전 우선순위 시트, 재원 운영 메모를 나란히 보면 가장 명확하다. 지점과 별도 법인을 모두 공동 자산으로 보자는 약속이 양쪽에서 동시에 깨졌다.",
        "worstActionReaction": "브랜드를 지키려 한 마음이나 공실을 잡아야 한다는 조급함만 공감하면 두 사람 모두 자기 위반을 '생존형 예외'로 부른다. 공동 승인 구조를 깬 사실은 자꾸 작아진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.08,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.28,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "핵심은 e-6 법률의견서다. 독점공급계약과 상표사용 제한 조항을 먼저 확인시키면, 아린의 거래처 전환도 재원의 단독 위성매장도 그대로는 실행이 막힌 구조였다는 점이 숫자와 조항으로 고정된다.",
        "worstActionReaction": "확장 욕심이나 브랜드 애착을 먼저 받아 주면 둘 다 '원래 내 몫'이라는 도덕 프레임으로만 싸우고, 실제 계약상 불가능하다는 냉정한 제약은 계속 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "branch_lease_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_or_responsibility_question",
          "motive_search": "branch_lease_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "side_corporation_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "side_corporation_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_why_you_rushed",
          "evidence_present:e-1": "e-1_or_shared_responsibility_question",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "joint_opportunity_clause_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_or_responsibility_question",
          "separation": "e-5_or_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "contract_constraint_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "재원과 아린은 둘 다 먼저 공동 기회에서 밀려날 것을 두려워해 각자 지점과 별도 법인이라는 탈출구를 준비했고, 그래서 상대만 선을 넘었다는 피해 서사에 더 집착하게 됐다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "아린씨는 오래전부터 '내가 직접 관리하는 도매 채널이 필요하다'고 말해 왔습니다. 별도 법인 '아린셀렉트F&B'를 세우고 핵심 거래처를 그쪽으로 옮길 준비를 한 게 갑자기 나온 건 아니었어요.",
        "제가 본 건 매장보다 도매 쪽에 시선이 먼저 가 있는 사람이었습니다. 기존 구조에서 자기 도매 기여가 인정되지 않는다고 느꼈고, 상대가 단독으로 위성매장을 연 게 방아쇠가 된 거예요."
      ],
      "tp-2": [
        "저한테 온 건 아이디어가 아니라 별도 법인 이름과 실제 공급 전환 견적이었습니다. 두 핵심 도매처에 미팅 제안까지 보낸 상태라, 이미 구체적으로 움직이고 있었던 거예요.",
        "저는 기존 브랜드 이름은 유지하면서 거래 주체만 바꾸겠다는 설명을 들었는데, 주요 도매 계약 구조상 기존 법인 동의 없이 전환하면 위약이 걸리는 건 알고 있었을 텐데요."
      ],
      "tp-3": [
        "저는 기록을 보면 성수 위성매장 계약과 별도 법인 설립이 시간적으로 거의 겹칩니다. 한쪽만 뒤늦게 배신한 구조가 아니라, 둘 다 비슷한 시점에 따로 움직이고 있었어요.",
        "저는 핵심 문제가 두 사람의 단독 확장이 모두 기존 계약과 충돌한다는 점이라고 봅니다. 상표 사용 구조와 도매 약정상 어느 쪽이든 기존 법인 동의 없이는 위약과 상표 분쟁이 동시에 발생합니다."
      ]
    }
  },
  "partnership-12": {
    "personalityTags": {
      "a": [
        "passive_aggressive",
        "detail_obsessed",
        "relationship_preserving",
        "privacy_sensitive"
      ],
      "b": [
        "confrontational",
        "blame_shifting",
        "emotionally_volatile",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "third_party_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "reputation_risk",
        "third_party_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "third_party_risk",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-5": [
        "third_party_risk",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1.02,
          "confidential_protection": 1.15
        },
        "bestActionHint": "선우에게 왜 debrief가 아니라 홍세진한테 먼저 털어놨는지를 묻는 게 잘 먹힌다. 납기 불안이 바이어 평판으로 번질까 두려웠다는 속내가 나오면 '그냥 하소연'이 어디서 외부 유출이 됐는지 보인다.",
        "worstActionReaction": "선우에게 누가 언제 무슨 문장을 말했는지만 따지면 그는 가마 일정, 샘플 수량, 승인 시각을 길게 읊으며 정작 왜 외부 프리랜서를 배출구로 삼았는지는 끝내 말하지 않는다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.28,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "수진 쟁점은 e-2 원본 대화와 e-5 외부 인력 앞 상호 비방 금지 문서를 같이 들이대는 편이 빠르다. '곤란했다'는 말이 개인 하소연이 아니라 규칙 위반 전언이었음이 선명해진다.",
        "worstActionReaction": "수진이 바이어 앞에서 얼마나 창피했는지만 받아 주면 그는 '필요한 설명이었을 뿐'이라고 맞불 불만을 정당화하고, 외부 스태프에게 선우 얘기를 흘린 사실은 축소한다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.08,
          "evidence_present": 1.19,
          "separation": 1.02,
          "confidential_protection": 1.22
        },
        "bestActionHint": "이 쟁점은 confidential_protection이 중요하다. 홍세진의 buyer recap 경로를 곧바로 공개 망신용으로 쓰지 않겠다는 안전판이 있어야, 선우와 수진 둘 다 자기 불만을 외부 인력에게 말한 사실과 와전의 시작점을 더 솔직하게 꺼낸다.",
        "worstActionReaction": "처음부터 '결국 누가 바이어 앞에서 욕했느냐'만 따지면 둘 다 직접 험담 프레임에 갇힌다. 그러면 크롭 음성전사와 제3자 재전달 구조는 계속 안 보인다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.12,
          "motive_search": 0.95,
          "empathy_approach": 0.72,
          "evidence_present": 1.28,
          "separation": 1.07,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-1 선우 카톡, e-2 수진 대화, e-5 debrief 규칙 문서를 한 묶음으로 놓으면 좋다. 서로 다른 불만이지만 둘 다 같은 행사 금지선을 넘어섰다는 점이 명확해진다.",
        "worstActionReaction": "행사 스트레스와 납기 압박만 공감하면 두 사람 모두 자기 말을 '잠깐 털어놓은 정도'로 낮춘다. 외부 인력 앞 상호 평가 금지 원칙을 깼다는 본론은 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.13,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "e-4 홍세진 follow-up 메시지 원본과 e-6 buyer complaint memo를 먼저 고정하면, 문제 문장이 바이어 앞 즉석 험담이 아니라 행사 뒤 recap에서 처음 등장했다는 점이 시간순으로 잡힌다.",
        "worstActionReaction": "평판이 얼마나 망가졌는지부터만 따라가면 둘은 다시 크롭 음성전사 한 줄을 붙들고 싸운다. 소문이 어느 메시지에서 시작됐는지라는 기원 확인은 뒤로 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "outside_venting_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_or_responsibility_question",
          "motive_search": "outside_venting_question"
        },
        "pathBonus": 6
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "outside_complaint_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_or_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "confidential_protection",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_event_stress",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "non_disparagement_rule_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-6": "e-6_or_responsibility_question",
          "separation": "shared_blame_followup"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "scope_or_cause_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "둘 다 행사장 밖에서까지 무너진 동업자처럼 보일까 두려워 직접 바이어에게는 말하지 않았지만, 외부 인력에게 흘린 불만만으로도 이미 와전의 재료는 충분했다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "리빙페어 직후라 바이어들 사이에서 '저 팀은 둘이 안 맞는다'는 인상이 퍼질까 봐 두 대표 다 예민해져 있었습니다. 다음 시즌 발주에 영향을 줄 수 있는 시점이니까요.",
        "제가 본 건 화를 크게 내는 사람이 아니라, 프리랜서한테 돌아온 소문에 점점 말이 없어지는 사람이었습니다. 상대가 바이어에게 직접 험담한 거라고 믿었는데, 실제로는 다른 경로였거든요."
      ],
      "tp-2": [
        "저는 행사 중에 두 대표가 각자 저한테 상대 불만을 따로 털어놓은 걸 기억합니다. 한쪽은 '납기 약속을 너무 쉽게 한다', 다른 쪽은 '승인과 출고를 자꾸 막는다'였어요.",
        "저는 이번 일에서 제 책임이 크다고 생각합니다. 두 분의 별도 불만을 정리해서 바이어 후속 메시지에 섞어 보내면서 '서로 못 믿는다'는 말로 와전시킨 건 제 잘못이에요."
      ],
      "tp-3": [
        "저는 바이어들 사이에 돈 문제의 소문이 프리랜서 홍세진의 행사 후 follow-up 메시지에서 처음 등장했다는 걸 확인했습니다. 두 대표 중 누가 바이어에게 직접 한 말이 아니라, 제3자가 섞어서 와전한 거예요.",
        "저는 두 대표 모두 행사 중 외부 인력 앞에서 서로를 평가하지 않기로 한 원칙을 어겼다는 점을 확인했습니다. 한쪽만 불만을 흘린 게 아니라 양쪽 다 같은 프리랜서에게 상대 불만을 말했어요."
      ]
    }
  },
  "spouse-01": {
    "personalityTags": {
      "a": [
        "avoidant",
        "shame_sensitive",
        "timeline_padding",
        "relationship_preserving"
      ],
      "b": [
        "confrontational",
        "selective_quote",
        "retaliation_sensitive",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "family_care",
        "secret_keeping",
        "promise_violation"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "intimacy_suspicion",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "financial",
        "third_party_risk",
        "secret_keeping",
        "promise_violation"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.86,
          "motive_search": 1.2,
          "empathy_approach": 1.05,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "한지석에게 280만원 자체보다 왜 굳이 '최민정' 이름과 돌봄센터 예약금을 숨겼는지 묻게 하면, 처가 돌봄 부담을 드러내기 싫었던 체면 계산이 튀어나와 외도 프레임이 약해진다.",
        "worstActionReaction": "송금 시각 14시 03분과 금액만 몰아붙이면 지석은 숫자와 동선을 더 촘촘히 늘어놓으며 버티고, 왜 아내에게 말을 못 했는지는 끝내 감춘다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "세린이 언니에게 보낸 메신저 캡처 e-3를 먼저 들이밀면 '그냥 확인만 했다'는 말이 무너진다. 새벽 열람이 제3자 공유까지 갔다는 점이 바로 드러난다.",
        "worstActionReaction": "세린의 불안만 먼저 달래면 그는 외도 의심의 공포를 길게 말하며 새벽 2시 폰 잠금 해제와 캡처 전송 문제를 감정 뒤로 숨긴다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.21,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "최민정 실명을 공개 망신용으로 쓰지 않겠다고 선을 그어 주면, 지석도 모텔 골목처럼 보인 동선을 덜 숨긴다. 그 틈에 후문 상담 일정과 카페 영수증 e-4 맥락이 붙는다.",
        "worstActionReaction": "몇 시에 골목에 있었는지, 카페에서 얼마 썼는지만 캐물으면 둘 다 외도 프레임에 갇혀 버려 돌봄센터 후문 상담이라는 핵심 설명이 더 늦게 나온다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.81,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 0.9,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "세린의 동생 월세 문제를 법정 구경거리로 만들지 않겠다는 전제를 깔면, 정우성 계좌를 거친 150만원과 '추석 지나고 말할게' 메시지 e-5·e-6를 숨기기 어려워진다.",
        "worstActionReaction": "계좌번호와 송금액만 추궁하면 세린은 곧바로 동생 보호 쪽으로 몸을 숨기고, 왜 우회 전달까지 택했는지에 대한 설명은 더 닫힌다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.26,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "공동계좌 거래내역 e-1과 정우성 쪽 입금확인 e-6를 나란히 놓으면 280만원과 150만원이 모두 '100만원 이상 사전 상의' 선을 넘었다는 사실이 한 번에 보인다.",
        "worstActionReaction": "누구 사정이 더 급했는지부터 위로해 버리면 지석은 처가 간병을, 세린은 동생 월세를 앞세우며 각자 예외만 말하고 공동 약속 위반 구조는 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "bank_transfer_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "purpose_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "phone_access_question",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "phone_access_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_mother_in_law",
          "investigate_only:e-3": "cropped_chat_presented",
          "evidence_present:e-4": "e-4_or_emotion_threshold"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "missing_money_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "beneficiary_question",
          "confidential_protection": "missing_money_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "agreement_reminder",
          "evidence_present:e-1": "e-6_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "지석은 외도 오해를 풀 수 있는 설명이 있다는 걸 알면서도, 처가 돌봄을 몰래 챙긴 사실이 드러나면 생활력과 재정 능력까지 한꺼번에 무너져 보일까 봐 말을 미뤘다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 보기엔 추석 한 주 전부터 그 집은 차례비, 병원비, 처가 방문 일정이 한꺼번에 몰려서 누구 하나 여유 있는 얼굴이 없었어요.",
        "특히 연휴 동안 어머니 간병을 맡아줄 사람이 비는 구간이 생겼는데, 둘 다 그걸 먼저 꺼내지 못하고 눈치만 보다가 결국 각자 몰래 움직인 거예요."
      ],
      "tp-2": [
        "평소엔 흐트러짐이 적은 사람인데 그 무렵엔 자꾸 시계를 보고 자리를 비웠습니다. 연휴 간병 공백을 메울 방법을 혼자 찾고 있었던 거예요. 들뜬 사람이 아니라 걱정에 눌린 사람이었습니다.",
        "저는 그때 그 사람이 뭔가를 즐기며 숨긴다고는 전혀 못 느꼈어요. 추석 연휴에 차례와 간병이 동시에 겹쳐서, 혼자 감당해 보려다 표정부터 거칠어지는 쪽이었습니다."
      ],
      "tp-3": [
        "저는 재가돌봄센터 상담팀장입니다. 그분은 추석 연휴 간병 일정이 비는 구간을 급히 메우려고 오셨어요. 모텔 골목에서 만난 것처럼 보인 장면은, 같은 블록에 붙은 센터 후문 상담실에서 간병 일정을 잡은 거였습니다.",
        "그분은 상담 내내 자기 사정보다 집에 남은 어머니 일정부터 챙기려는 태도였어요. 사적인 설렘으로 오는 사람과 표정이 확연히 다릅니다."
      ],
      "tp-4": [
        "저한테 부탁하던 목소리가 매끈하지 않았어요. 동생 밀린 월세 3개월치를 막아야 하는데 직접 말하기 창피해서 제 계좌를 경유해 달라는 거였거든요.",
        "저는 그 부탁에서 욕심보다 다급함을 더 크게 봤습니다. 150만원을 우회 송금하면서 '추석 지나고 말할게'라고 했는데, 남편한테 말할 용기가 없어서 빙 돌아가는 사람이었어요."
      ]
    }
  },
  "spouse-02": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "privacy_sensitive",
        "shame_sensitive",
        "detail_obsessed"
      ],
      "b": [
        "martyr_complex",
        "victim_identity",
        "blame_shifting",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "career",
        "reputation_risk",
        "trust_breach"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-3": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-4": [
        "privacy",
        "promise_violation",
        "trust_breach"
      ],
      "d-5": [
        "career",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.17
        },
        "bestActionHint": "학교 메일 헤더 e-4와 복합기 스캔·가족클라우드 이력 e-5를 맞대면, 도윤 보조 메일에서 시작된 종결서 유출 경로가 한 줄로 이어져 '아이 보호 차원' 변명이 버티기 어렵다.",
        "worstActionReaction": "도윤이 얼마나 입학 문제로 불안했는지부터 받아주면 그는 곧 '아이 지키려 한 아빠' 위치로 숨으면서, 아내 상담 기록을 학교에 흘린 행위는 정당화해 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "공유 프린터 초안 e-1과 접근 로그 e-2를 함께 보면, 희주의 메일은 실제 발송이 아니라 초안 단계였다는 점과 무단 열람 시각이 동시에 고정된다.",
        "worstActionReaction": "희주의 공포를 먼저 인정해 버리면 그는 '당황해서 본 것'이라는 말로 밤 11시 52분 메일 접근과 연락망 배제 초안 작성을 공황 반응 속에 묻어 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.12,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.12
        },
        "bestActionHint": "익명 글 캡처 e-3에 붙은 이미지 해시를 학교 회신 e-4, 가정용 복합기 스캔 e-5와 연결하면, 외부 오해처럼 꾸민 익명 경고글이 사실상 도윤 쪽 자료였다는 점이 드러난다.",
        "worstActionReaction": "과거 상담이 묵살됐다는 상처부터 받아주면 희주와 도윤 모두 피해 서사로 돌아가고, 이번 익명 글의 편집·업로드 경로를 검증하는 질문은 뒤로 밀린다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "두 사람이 왜 '과거 기록은 무기로 쓰지 말자'고 약속했는지부터 파고들면, 도윤의 학교 유출과 희주의 별거 위기 문구 초안이 모두 상처 재사용이었다는 동기가 한 번에 보인다.",
        "worstActionReaction": "메일 문장 하나, 초안 표현 하나만 따지면 둘 다 '그 표현은 발송 안 됐다'거나 '취지는 보호였다'며 단어 싸움으로 빠져 약속 파기의 본질을 흐린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.27
        },
        "bestActionHint": "아이 입학 파일 문제를 평판전으로 키우지 않겠다고 약속받으면, 정해린 기록에서 보류 시각이 익명 메일보다 앞섰다는 점과 관리사무소 정정서 e-6가 훨씬 쉽게 받아들여진다.",
        "worstActionReaction": "파일이 몇 시 몇 분에 멈췄는지만 윽박지르면 양쪽 모두 다시 '누가 먼저 학교를 움직였나'라는 의심 싸움으로 돌아가 행정 오류라는 답이 묻힌다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "use_confidential_channel"
        ],
        "triggerMapping": {
          "confidential_protection": "child_safety_nonjudgment_question",
          "evidence_present:e-4": "e-4_presented",
          "use_confidential_channel": "child_safety_nonjudgment_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "printer_draft_question",
          "investigate_only:e-1": "e-1_presented",
          "confidential_protection": "printer_draft_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "anonymous_post_question",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "anonymous_post_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_promise_reminder",
          "evidence_present:e-2": "shared_responsibility_question",
          "evidence_present:e-4": "shared_responsibility_question",
          "confidential_protection": "old_promise_reminder",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "school_hold_reason_question",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "도윤은 희주의 기록을 학교에 넘기면 자신이 아이를 더 안전하게 챙기는 보호자로 보일 거라 착각했다. 실제 보호보다 부모 자격 경쟁에서 밀리지 않으려는 마음이 더 컸다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-3",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "희주씨는 아이 입학 시기에 학부모 시선이 쏠리는 게 특히 불안했어요. 3년 전 상담 기록이 학교 쪽에 알려질까 봐 말투부터 달라지더라고요.",
        "예전 상담 이야기가 가족 사이에서 조심스럽게 오간 적은 있어도, 저는 그게 학교까지 흘러나가는 장면을 본 적은 없습니다. 이번에 학부모방에 익명 글이 뜬 건 누군가 일부러 넘긴 거예요."
      ],
      "tp-2": [
        "그날 희주는 익명 글을 발견하고 37분 만에 공유 노트북에서 도윤 메일에 접속하고 프린터 기록까지 뒤졌어요. 차분하게 움직인 게 아니라, 자기 발밑이 무너지는 공포에 반응한 거였습니다.",
        "저는 희주가 연락망 배제 초안까지 작성한 건 봤지만, 실제로 발송하진 않았어요. 아이 일과 자기 체면이 한꺼번에 흔들린다고 느끼면 사람은 평소답지 않게 굴기도 합니다."
      ],
      "tp-3": [
        "저는 입학 파일 보류 원인을 확인했는데, 익명 메일 때문이 아니라 전입 확인서에 구 동호수가 남아 있는 행정 오류였습니다. 보류 시각이 익명 메일 도착보다 앞서요.",
        "저는 또 학부모방 익명 글에 첨부된 이미지 해시값이 도윤의 보조 이메일과 가정용 복합기 스캔 기록으로 이어진다는 걸 확인했습니다. 두 사람 다 '과거 기록을 무기로 안 쓰겠다'는 약속을 어긴 거예요."
      ]
    }
  },
  "spouse-03": {
    "personalityTags": {
      "a": [
        "detail_obsessed",
        "calculated_calm",
        "shame_sensitive",
        "conflict_avoidant"
      ],
      "b": [
        "passive_aggressive",
        "counter_attack",
        "blame_shifting",
        "fairness_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "career",
        "secret_keeping",
        "promise_violation"
      ],
      "d-2": [
        "financial",
        "role_failure",
        "secret_keeping",
        "promise_violation"
      ],
      "d-3": [
        "career",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "career",
        "sequence_sensitive",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "hidden_motive",
      "t-4": "subjective_claim",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.91,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.12
        },
        "bestActionHint": "유진에게 160만원 사용처 목록보다 새 회사 첫 달에 왜 그렇게 서둘렀는지 묻게 되면, 수습 복장과 교통비를 혼자 막아야 한다는 불안이 드러나 '철없는 쇼핑' 프레임이 약해진다.",
        "worstActionReaction": "유진의 커리어 불안을 위로만 해 주면 그는 '다음 급여 들어오면 채울 생각이었다'는 미래 계획으로 빠져, 비상금 비밀 인출 자체를 계속 축소한다."
      },
      "d-2": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.26,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "적금 변경기록과 건조기 할부 계약서 e-5를 시간순으로 고정해 묻는 게 좋다. 인호가 두 달 자동이체를 멈추고 그 사실을 숨긴 순서가 숫자 앞에서 도망가기 어렵다.",
        "worstActionReaction": "집이 얼마나 빠듯했는지 공감부터 건네면 인호는 건조기를 '생활 필수품' 농담으로 돌리며, 적금을 끊고도 말하지 않은 핵심을 끝까지 흐린다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.08,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "유진의 옷값을 사치 낙인으로 몰지 않겠다고 선을 그어 주면, 온보딩 복장 가이드 e-4와 교통비 정산 구조가 살아나 백화점 결제가 수습 적응비였다는 설명을 끌어내기 쉽다.",
        "worstActionReaction": "백화점 승인 알림 세 건만 붙잡고 추궁하면 인호도 유진도 '사치냐 아니냐' 감정 싸움에 매달려, 필수 복장과 익월 보전 구조라는 맥락이 묻힌다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.76,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.9,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "둘 다 각자 이유가 있었다는 점을 먼저 인정하면, 유진은 비상금 160만원을, 인호는 적금 중단과 건조기 할부를 방어 없이 꺼내며 '50만원 사전 상의' 약속이 쌍방 위반이었다는 결론까지 빨리 간다.",
        "worstActionReaction": "누가 얼마를 더 크게 어겼는지 숫자만 세기 시작하면 160만원 대 84만원 비교싸움으로 흐르고, 왜 둘 다 숨겼는지에 대한 인정은 더 어려워진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.93,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.12
        },
        "bestActionHint": "유진의 수습 불안과 인호의 현금흐름 공포를 각각 말하게 만들면, 가계 구멍이 한 사람 낭비가 아니라 두 번의 은폐가 같은 주에 겹친 결과라는 구조가 드러난다.",
        "worstActionReaction": "각자 고생만 위로하면 유진은 이직 스트레스를, 인호는 생활비 압박을 앞세우며 누가 더 불쌍한지 경쟁하게 되고 공동 책임 판단이 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "withdrawal_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "purpose_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "auto_transfer_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "cashflow_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_work_adaptation",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_emotion_threshold"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "empathy_approach",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "appliance_question",
          "evidence_present:e-1": "e-6_presented",
          "evidence_present:e-5": "e-6_presented",
          "empathy_approach": "small_admission_about_convenience",
          "separation": "e-6_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_caused_shortage_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_budget_question"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "유진은 새 직장에서 초라해 보일까 두려웠고, 인호는 집안이 흔들리는 걸 자기 선에서 막아야 한다는 압박이 컸다. 둘 다 상대를 덜 불안하게 하려다 오히려 말문을 닫아 버렸다.",
        "unlockHint": "empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "인호는 생활이 빠듯해지자 적금을 몰래 멈추고 건조기 할부를 질렀어요. 사치가 아니라 둘 다 지치지 않게 가전을 바꾸려는 마음이었는데, 유진한테 한마디도 안 한 게 문제였습니다.",
        "그 무렵엔 유진이 이직하면서 첫 급여일이 3주 밀려 있었어요. 새 출발을 축하하기보다 이번 달을 어떻게 버틸지부터 계산하는 분위기였습니다."
      ],
      "tp-2": [
        "유진이 수습 기간에 정장, 구두, 3개월 정기권을 한꺼번에 산 건 사치가 아니라 출근 준비였어요. 수습 첫 달엔 인상부터 평가받는 압박이 있으니까요.",
        "그래서 저는 백화점 결제 내역만 보고 허영이라고 단정하긴 어렵습니다. 일부는 익월 복지비로 보전될 항목이었고, 공동 비상금에서 160만원을 뺀 것도 말하지 못한 게 문제였지 쓴 내용 자체가 문제는 아니었어요."
      ],
      "tp-3": [
        "저는 이 건의 핵심이 누가 더 과하게 썼느냐가 아니라, 둘 다 50만원 이상 사전 상의 규칙을 어겼다는 점이라고 봅니다. 유진은 160만원을 몰래 뺐고, 인호는 적금을 멈추고 84만원 할부를 혼자 질렀어요.",
        "가계 구멍은 한쪽 탓이 아닙니다. 유진의 인출, 인호의 적금 중단과 건조기 할부가 같은 주에 겹쳤고, 급여일 3주 지연이 구멍을 더 키웠습니다. 두 사람의 침묵이 만든 결과예요."
      ]
    }
  },
  "spouse-04": {
    "personalityTags": {
      "a": [
        "relationship_preserving",
        "conflict_avoidant",
        "shame_sensitive",
        "blame_shifting"
      ],
      "b": [
        "confrontational",
        "detail_obsessed",
        "fairness_obsessed",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "secret_keeping",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "third_party_risk",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-4": [
        "promise_violation",
        "third_party_risk",
        "trust_breach"
      ],
      "d-5": [
        "third_party_risk",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.93,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "하준에게 '왜 클라이언트 급호출' 거짓말을 택했는지, 어머니 집 경유 사실을 왜 말 못 했는지 묻게 하면 엄마와 아내 사이에서 좋은 사람으로 남고 싶었던 동기가 드러난다.",
        "worstActionReaction": "하준의 난처함을 먼저 감싸주면 그는 곧 '30분만 이해했으면 됐잖아' 식으로 잘못의 크기를 줄이며, 거짓 긴급업무 문자를 보낸 사실을 희미하게 만든다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "태블릿 예약변경 알림 캡처 e-3와 친구 단톡 전송 시각을 같이 제시하면, 다은이 대면 전에 외부 공유부터 했다는 점이 선명해져 '상처받아서 그랬다'는 말이 약해진다.",
        "worstActionReaction": "첫 결혼기념일이 깨진 상처부터 달래면 다은은 상징성 이야기만 길게 반복하고, 동기화된 태블릿 무단 열람과 친구 선공유 문제는 뒤로 숨긴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "레스토랑 예약센터 통화기록 e-4와 픽업 변경대장을 붙이면, 알림은 하준 기기에 떴어도 실제 발신 번호가 다른 사람이라는 점이 드러나 '남편이 직접 취소' 프레임이 깨진다.",
        "worstActionReaction": "태블릿에 뜬 '예약 변경 완료' 문구 뜻만 따지면 알림 해석 싸움에 갇혀 버리고, 제3자가 코드를 알고 움직였다는 진짜 흐름을 놓치게 된다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.9,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "가족 끼우기 문제를 시어머니·친구 앞 망신으로 번지지 않게 하겠다고 선을 그으면, 하준의 시계 케이스 보관과 다은의 브로치 대여·예약코드 공유가 모두 더 솔직하게 나온다.",
        "worstActionReaction": "누가 먼저 가족에게 말했는지 분 단위로만 따지면 둘 다 상대의 선행 위반만 붙들고, 기념일 경계 자체를 함께 흔들었다는 본질은 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "예약센터 통화기록 e-4, 강정희 음성메모 e-5, 가족단톡 e-6를 한 번에 붙이면 강정희가 시간과 픽업지를 의도적으로 꼬았다는 선이 또렷해져 배후 개입을 부정하기 어렵다.",
        "worstActionReaction": "강정희의 외로움이나 하준의 효심을 먼저 공감하면, 어머니 개입이 '그럴 수도 있는 가족 일'처럼 희석돼 레스토랑 코드 사용이라는 결정적 행동이 묻힌다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "emergency_text_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "tablet_access_question",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "tablet_access_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "cancellation_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "caller_identity_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_surprise_gift",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_or_emotion_threshold",
          "confidential_protection": "nonjudgmental_question_about_surprise_gift",
          "separation": "e-6_or_emotion_threshold"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "mother_influence_question",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "mother_influence_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "motive",
        "deeperReveal": "강정희의 개입은 단순한 심술이라기보다, 결혼 후 아들이 자기 일정에서 점점 빠져나간다는 상실감을 기념일이라는 상징적 날에 뒤틀리게 표출한 것이었다.",
        "unlockHint": "motive_search 또는 use_confidential_channel + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 보기엔 하준이 기념일을 일부러 펑크 낸 건 아닙니다. 시계 케이스를 어머니 집에 맡겨 둔 게 문제였어요. '클라이언트 긴급 호출'이라고 문자를 보냈지만, 작업실 퇴실 시각과 어머니 아파트 입차 시각이 14분밖에 안 차이 나요.",
        "하준은 뭔가 챙길 게 겹치면 허둥대는 사람이에요. 그래서 거짓말은 했어도 처음부터 기념일을 버리려 한 건 아니라고 봅니다. 케이스 찾으러 잠깐 들렀다가 동선이 꼬인 거예요."
      ],
      "tp-2": [
        "다은은 하준 태블릿에서 '예약 변경 완료' 알림을 보자마자 직접 취소한 거라고 확신했어요. 대면하기 26분 전에 이미 친구 단톡에 캡처를 보냈습니다. 기기 무단 확인과 제3자 선공유가 동시에 터진 거예요.",
        "첫 결혼기념일이라 기대가 컸으니 작은 신호도 '버림'으로 읽히기 쉬웠습니다. 그런데 태블릿 알림만으로는 누가 예약을 바꿨는지 알 수 없어요. 예약센터 통화 기록의 발신 번호가 하준 것이 아니거든요."
      ],
      "tp-3": [
        "저는 예약센터 통화 기록을 확인했는데, 예약 변경 전화의 발신 번호가 하준 것이 아닙니다. 예약 코드를 알고 있던 제3자가 레스토랑 시간을 옮기고 픽업지를 자기 집 근처로 바꾼 거예요.",
        "하준은 시계 케이스를 어머니에게 맡겼고, 다은은 브로치를 빌리면서 예약 캡처와 코드를 시어머니에게 보냈습니다. 둘 다 '가족 안 끼우기' 약속을 어겼지만, 다은이 예약 정보 자체를 넘긴 차이가 결정적이었어요."
      ]
    }
  },
  "spouse-05": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "privacy_sensitive",
        "manipulative",
        "detail_obsessed"
      ],
      "b": [
        "fairness_obsessed",
        "authority_challenging",
        "confrontational",
        "trust_broken"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "role_failure",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "privacy",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "privacy",
        "hard_evidence_available",
        "reputation_risk",
        "trust_breach"
      ],
      "d-5": [
        "role_failure",
        "sequence_sensitive",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.22,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "스마트락 출입기록 e-1과 14시 화상 일정표 e-6를 나란히 두면, 소담이 구 관리자 코드로 서재에 들어간 시간이 민재 예약 블록과 정확히 겹친다는 점이 분명해진다.",
        "worstActionReaction": "소담의 허리 통증과 거실 소음만 먼저 받아주면 그는 '살려고 그랬다'는 설명으로 들어가 무단 출입 그 자체는 계속 작게 만든다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "민재에게 왜 3시간 블록을 10시간으로 늘리고 소담 앱을 읽기 전용으로 낮췄는지 묻게 하면, 보안 명분 뒤에 숨어 있던 공간 독점 욕구가 드러난다.",
        "worstActionReaction": "권한 변경 시각과 프로토콜만 캐물으면 민재는 곧 'NDA상 어쩔 수 없었다'는 규정 언어로 숨고, 왜 그렇게까지 봉쇄했는지는 끝내 말하지 않는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "문제 녹취 e-3와 파형 대조 보고 e-4를 정면으로 붙이면 '회의 망쳐버릴까'와 다른 날짜 발언이 이어 붙여졌다는 게 보여, 업무방해 프레임이 한 번에 무너진다.",
        "worstActionReaction": "민재의 회의 압박을 먼저 이해해 주면 그는 편집본을 '설명용 정리'라고 다시 부르며, 녹취가 실제로 무엇을 입증하는지 검증을 미룬다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.17
        },
        "bestActionHint": "오한결 편집 지시 메시지 e-5와 렌더 내역까지 함께 대면시키면, 민재가 서로 다른 날짜 음성을 하나로 묶어 원본처럼 내밀었다는 의도성이 선명해진다.",
        "worstActionReaction": "클라이언트 보안 압박을 먼저 공감하면 민재는 위조를 '보안 설명용 요약' 정도로 축소하며, 원본 사칭의 무게를 끝까지 깎아낸다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "스마트락 로그, 공유캘린더 변경, 회선 장애 접수 e-1·e-2·e-6를 한 줄로 이어 놓으면 이번 파국이 소담 한 사람의 침범도, 민재 한 사람의 통제도 아닌 복합 충돌임이 드러난다.",
        "worstActionReaction": "누구 마음이 더 상했는지부터 어루만지면 둘 다 '한쪽이 먼저 망쳤다'는 서사로 되돌아가고, 권한 봉쇄와 일정 충돌을 함께 보려는 시도는 무너진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "study_entry_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "purpose_followup",
          "confidential_protection": "study_entry_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "study_access_question",
          "evidence_present:e-2": "e-2_presented",
          "confidential_protection": "confidentiality_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "recording_authenticity_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "waveform_question",
          "motive_search": "nonjudgmental_question_about_client_panic"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_client_panic",
          "investigate_only:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_client_panic"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "home_office_collision_question",
          "evidence_present:e-1": "e-6_presented",
          "evidence_present:e-2": "e-2_or_shared_responsibility_question",
          "separation": "e-2_or_shared_responsibility_question"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "민재는 실제 하자 비용보다, 집 안에서 자기 일이 덜 중요한 일처럼 밀려난다는 감각을 더 크게 두려워했다. 녹취를 손본 건 보안 명분보다 서재 통제권을 되찾고 싶다는 조급함에 가까웠다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "광고 촬영 시즌과 특허 번역 마감이 7월에 겹치면서 서재 하나를 둘 다 필요로 했어요. 민재씨가 NDA를 이유로 잠금권한을 혼자 바꿔 10시간 전용 블록을 잡으니, 다른 쪽은 사실상 쫓겨난 거나 마찬가지였습니다.",
        "그리고 거실 인터넷이 끊긴 날 소담이 구 관리자 코드로 서재에 들어간 건 사실이에요. 해외 화상심사가 급했으니까요. 하지만 사전 고지가 없었던 건 문제입니다."
      ],
      "tp-2": [
        "저는 민재가 보낸 녹취를 들었을 때, 처음부터 한 호흡으로 이어진 대화 같지 않다고 느꼈습니다. 공간감도 다르고 숨 쉬는 결도 달라서, 편집본이라는 느낌이 강했어요.",
        "나중에 확인해 보니 '회의 망쳐버릴까'는 7월 8일 책상 배치 푸념이었고, '파일 좀 보내면 끝나'는 7월 11일 백업 불만이었어요. 다른 날 발언을 이어 붙여서 맥락이 사라진 겁니다."
      ],
      "tp-3": [
        "저는 녹취 파일의 메타데이터를 확인했는데, 민재가 오한결에게 원본 두 개를 보내 하나로 정리하라고 지시한 기록이 있습니다. 완성본을 부부상담과 임대인 면담에서 원본이라며 재생한 건 의도적 행위예요.",
        "저는 소담의 무단 출입, 민재의 권한 봉쇄, 거실 인터넷 장애, 양쪽 화상 일정 충돌 — 이 네 가지가 겹쳐 터진 거라고 봅니다. 녹취 위조까지 더해지면 한쪽 탓만으로 설명되지 않습니다."
      ]
    }
  },
  "spouse-06": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "privacy_sensitive",
        "relationship_preserving",
        "calculated_calm"
      ],
      "b": [
        "cold_logical",
        "face_sensitive",
        "counter_attack",
        "retaliation_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "misleading_soft_evidence",
        "privacy",
        "sequence_sensitive"
      ],
      "d-2": [
        "privacy",
        "reputation_risk",
        "third_party_risk",
        "trust_breach"
      ],
      "d-3": [
        "reputation_risk",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "third_party_risk"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "reputation_risk",
        "sequence_sensitive",
        "trust_breach",
        "third_party_risk"
      ]
    },
    "truthCategory": {
      "t-1": "circumstantial",
      "t-2": "core_fact",
      "t-3": "hidden_motive",
      "t-4": "core_fact",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.03,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "서희의 글쓰기 계정과 우람의 직장 평판을 공개 재판으로 만들지 않겠다고 선을 그어 주면, 서희도 배지·주차권 같은 식별 소품을 왜 그대로 썼는지 훨씬 솔직하게 말한다.",
        "worstActionReaction": "이름과 회사명이 없었는지만 따지면 서희는 곧 '직접 지목한 적 없다'는 문구 방어로 숨어, 실제 소품이 왜 오해를 키웠는지는 빠져나간다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.22
        },
        "bestActionHint": "친한 친구 목록 관리 실패를 창작 전체 공격으로 몰지 않겠다고 해야, 서희가 직장 인맥 3명을 남긴 채 23명 목록을 방치했다는 사실을 덜 방어적으로 인정한다.",
        "worstActionReaction": "조회자 수와 플랫폼 기능만 따지면 서희는 '북클럽용 목록이었다'는 기술적 설명으로 빠지고, 누굴 남겨 둔 채 올렸는지의 책임은 희미해진다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.18,
          "separation": 1.05,
          "confidential_protection": 1.22
        },
        "bestActionHint": "김태훈을 곧바로 악성 유포자로 몰지 않고 확인 메시지와 캡처 전송의 경계만 따져 묻는 편이 낫다. 그래야 그도 질문하듯 보냈지만 스크린샷이 이미 유통 효과를 냈다는 점을 인정하기 쉽다.",
        "worstActionReaction": "몇 명에게 보냈는지 숫자만 따지면 김태훈은 '선임 한 명에게 확인한 것뿐'이라며 범위를 줄이고, 캡처를 붙인 순간 소문이 시작됐다는 핵심을 피한다."
      },
      "d-4": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.02
        },
        "bestActionHint": "우람이 서희에게 보낸 확인 문자 시각과 팀채널·HR 접수 시각 e-5를 분 단위로 고정하면, '선조치'라는 말이 실제로는 소문 범위를 32명으로 넓힌 행동이었다는 점이 선명해진다.",
        "worstActionReaction": "매니저로서 얼마나 당황했는지 공감부터 해 주면 우람은 곧 '팀장이라 어쩔 수 없었다'는 직책 방패 뒤로 숨고, 배우자보다 조직에 먼저 알린 순서 문제는 흐려진다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.9,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "이 사건은 악의적 저격보다 연쇄 오해가 커진 구조라, 누구 하나를 도둑맞듯 몰지 않고 서희의 스토리·김태훈 캡처·우람 해명문을 각각 비공개로 분리해 다루는 접근이 가장 효과적이다.",
        "worstActionReaction": "누가 먼저 더 잘못했는지 순위만 매기면 셋 다 자기에게 불리한 한 장면을 빼고 이야기해 버려, 공유 오해가 어떻게 명예훼손으로 커졌는지 전체 고리가 끊긴다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_writing_intent",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-2": "e-6_or_e-2_presented",
          "confidential_protection": "nonjudgmental_question_about_writing_intent"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "audience_question",
          "evidence_present:e-2": "e-3_presented",
          "confidential_protection": "audience_question"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "coworker_motive_question",
          "evidence_present:e-3": "e-4_presented",
          "motive_search": "coworker_motive_question",
          "confidential_protection": "coworker_motive_question"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "team_channel_question",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "empathy_approach",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "overall_cause_question",
          "investigate_only:e-1": "responsibility_question",
          "evidence_present:e-2": "responsibility_question",
          "empathy_approach": "small_admission_about_promotion_anxiety",
          "confidential_protection": "overall_cause_question"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "서희는 글을 오해받을까 두려우면서도 창작의 일부를 배우자 평판 때문에 포기하면 자기 정체성이 지워진다고 느꼈다. 우람은 그 불안을 이해하기보다 먼저 직장 체면이 무너지는 장면부터 떠올렸다.",
        "unlockHint": "empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "서희는 원래 일상에서 건진 감정을 글감으로 만드는 사람이에요. 그 스토리 문장도 북클럽 연재 3회 차 픽션 초안이었습니다. 이름이나 회사명은 없었어요.",
        "다만 배경에 우람의 컨퍼런스 배지와 주차권이 보였고, 친한 친구 목록에 직장 동료 3명이 남아 있었습니다. 그래서 북클럽 글이 남편 비리 폭로처럼 읽힌 거예요."
      ],
      "tp-2": [
        "저는 김태훈입니다. 그 스토리를 보고 '혹시 우람 팀장 건 얘기예요?'라고 확인 질문을 한 건 맞아요. 다만 캡처를 첨부한 시점에서 이미 소문 효과가 시작됐다는 건 인정합니다.",
        "제 마음은 확인 쪽이었지만, 캡처를 붙이는 순간 사람들 머릿속에 방향이 잡혀 버렸어요. 우람이 2명만 알던 내용을 팀 32명에게 해명문을 올리면서 범위가 더 커졌고요."
      ],
      "tp-3": [
        "저는 우람이 서희에게 확인 문자를 보내기 6분 전에 이미 팀채널 32명과 HR에 해명문을 올린 걸 확인했습니다. 김태훈과 선임만 알던 내용을 팀 전체가 알게 된 건 우람의 선제 대응 때문이에요.",
        "이번 건은 악의적 폭로가 아니라 공유 오해가 도미노로 커진 사건입니다. 서희의 모호한 픽션, 김태훈의 캡처 확인, 우람의 32명 대상 선제 해명이 연쇄로 이어졌어요. 가장 큰 범위 확대는 마지막 단계에서 생겼습니다."
      ]
    }
  },
  "spouse-07": {
    "personalityTags": {
      "a": [
        "detail_obsessed",
        "fairness_obsessed",
        "shame_sensitive",
        "relationship_preserving"
      ],
      "b": [
        "face_sensitive",
        "victim_identity",
        "martyr_complex",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "family_care",
        "reputation_risk",
        "trust_breach",
        "misleading_soft_evidence"
      ],
      "d-2": [
        "family_care",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-3": [
        "family_care",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "family_care",
        "reputation_risk",
        "trust_breach"
      ],
      "d-5": [
        "family_care",
        "role_failure",
        "sequence_sensitive",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "circumstantial",
      "t-2": "hidden_motive",
      "t-3": "core_fact",
      "t-4": "emotional_context",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.08,
          "separation": 1,
          "confidential_protection": 1.12
        },
        "bestActionHint": "다혜에게 왜 상담 자리와 단톡에서 굳이 '거의 다 제가 해요'라고 말했는지 묻게 되면, 아침 전쟁을 아무도 고생으로 인정해 주지 않는다는 결핍이 드러난다. 그 인정 욕구가 보이면 공로 독점 발언도 단순 실수로 숨기기 어려워진다.",
        "worstActionReaction": "등원 18일, 긴급연락 2건 같은 숫자부터 들이대면 다혜는 곧바로 '아침 40분이 얼마나 전쟁인지 아냐'는 장면 묘사로 물러나며, 공개 자리에서 태준 몫을 지운 문제는 끝까지 건드리지 않는다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "태준에게 왜 단톡 발언 22분 뒤 밤·주말 항목만 따로 PDF로 뽑았는지 동기를 캐물으면, '아무도 밤 노동을 안 본다'는 억울함이 먼저 튀어나온다. 그 순간 선택 편집이 증거정리가 아니라 인정 쟁탈전이었다는 점이 선명해진다.",
        "worstActionReaction": "태준의 서운함부터 오래 받아주면 그는 '나는 늘 안 보이는 사람'이라는 피해 위치에 머물고, 아침 루틴 18건을 빼고 내보낸 편집 행위는 감정 뒤로 숨겨 버린다."
      },
      "d-3": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "다혜의 아침 부담을 먼저 인정해 주면, 그녀는 '내가 더 힘들었다'는 방어를 잠시 내려놓고 태준의 소아과 예약·세탁·밤 준비가 실제로 있었음을 받아들일 여지가 생긴다. 이 쟁점은 비교표보다 체감 난도에 대한 존중이 먼저다.",
        "worstActionReaction": "곧바로 소아과 8건, 세탁 12건, 등원 18건을 줄세우면 두 사람은 서로 다른 종류의 노동을 한 표에 억지로 올리기 시작하고, 보이는 노동과 보이지 않는 노동을 같은 점수판으로 더 세게 싸운다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.9,
          "separation": 1,
          "confidential_protection": 1.27
        },
        "bestActionHint": "가족 단톡 캡처와 냉장고 메모를 더 퍼뜨리지 않겠다는 안전장치가 있어야, 둘 다 '아이 앞에서 점수판을 꺼냈다'는 수치심을 말할 수 있다. 공개 노출 불안을 낮춰야 점수 경쟁 자체를 인정한다.",
        "worstActionReaction": "누가 먼저 숫자를 꺼냈는지부터 캐면 다혜는 '오늘만 4번 뛰었다'를, 태준은 '17건 중 9건'을 다시 들고 나와 법정에서도 똑같은 점수판 싸움을 재연한다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "도우미 종료 문자와 야근 캘린더, 태준 명의 병원·세탁 기록을 한 번에 붙여 보여 주면 갈등의 시작점이 개인 태만이 아니라 돌봄 총량 폭증이었다는 흐름이 드러난다. 이 쟁점은 구조를 보게 하는 원본 타임라인이 가장 강하다.",
        "worstActionReaction": "그냥 '두 분 다 힘드셨겠네요' 수준의 위로만 건네면, 다혜는 인정 부족을 탓하고 태준은 억울함만 더 말하면서 도우미 종료와 야근 겹침이라는 핵심 원인은 끝내 선명해지지 않는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "public_credit_question",
          "evidence_present:e-1": "e-1_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "checklist_export_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_morning_burden",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "scorekeeping_question",
          "investigate_only:e-3": "e-5_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_does_more_question",
          "evidence_present:e-4": "e-4_or_emotion_threshold",
          "evidence_present:e-6": "scorekeeping_question",
          "empathy_approach": "nonjudgmental_question_about_morning_burden"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "다혜가 과장된 표현을 쓴 건 인정받고 싶어서였고, 태준이 숫자 자료를 내민 건 보이지 않는 노동이 완전히 지워질까 무서워서였다. 둘 다 공로를 빼앗긴 불안이 먼저 반응했다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "다혜가 상담에서 '거의 다 제가 해요'라고 한 뒤 같은 날 저녁 단톡에도 비슷한 표현을 올렸어요. 아침 등원은 맞지만 태준이 밤마다 옷 준비하고 소아과 8번, 세탁 12번 한 건 빠져 있었습니다.",
        "눈에 보이는 아침 장면만 보면 한쪽이 다 하는 것 같지만, 밤과 주말에 조용히 쌓이는 돌봄은 사진이나 칭찬에 잘 안 남더라고요. 총 항목을 세면 둘이 거의 같았어요."
      ],
      "tp-2": [
        "태준은 쉬는 시간에도 소아과 예약이나 약국 픽업을 처리하고 돌아오는 사람이었어요. 한 달 기록을 보면 소아과 8건, 약국 5건, 반찬 4건이 다 점심이나 밤에 분산돼 있었습니다.",
        "그래서 저는 태준이 손 놓은 배우자라는 인상은 전혀 없었어요. 다만 다혜 발언 22분 뒤 가사앱에서 밤·주말 항목만 골라 PDF를 뽑은 건 상대 기여를 편집한 셈이라 그것도 문제입니다."
      ],
      "tp-3": [
        "야간 도우미 종료, 야근 겹침, 소아과 일정 급증 — 돌봄 총량이 확 늘었는데 분담 구조가 재조정되지 않은 게 이 갈등의 배경입니다. 한 사람의 태만이 아니라 구조적 과부하예요.",
        "다혜는 단톡에 '오늘만 4번 뛰었다', 태준은 냉장고에 '17건 중 9건 내가 함' 메모를 붙였습니다. 둘 다 감정 대신 점수판을 꺼냈고, 아이 앞에서 벌어졌다는 점이 문제의 본질이에요."
      ]
    }
  },
  "spouse-08": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "privacy_sensitive",
        "detail_obsessed",
        "shame_sensitive"
      ],
      "b": [
        "face_sensitive",
        "avoidant",
        "blame_shifting",
        "counter_attack"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "secret_keeping",
        "misleading_soft_evidence",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "privacy",
        "secret_keeping",
        "promise_violation"
      ],
      "d-3": [
        "third_party_risk",
        "secret_keeping",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-4": [
        "promise_violation",
        "third_party_risk",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "sequence_sensitive",
        "third_party_risk",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "subjective_claim",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.12,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "카페 음성메모의 '상담까지만', 잘린 업로드 알림, 법무사 CRM의 무접수 기록을 나란히 대면시키면 쟁점이 '서류를 보냈느냐'가 아니라 '합의 범위 안이었느냐'로 정리된다. 현석의 독단 프레임은 원본 순서 앞에서 급격히 약해진다.",
        "worstActionReaction": "서진의 불안부터 달래기 시작하면 현석은 곧 '나는 집도 잃고 버려질 뻔했다'는 감정으로 이동해, 접수 번호도 없이 문의 단계였다는 핵심 기록을 감정 소음 속에 묻어 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.21,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "계약서 업로드 뒤 47분 후 추가된 대출 정리서 로그를 상담요약과 바로 붙이면, 서진이 합의된 상담 범위에 과거 부채 자료를 끼워 넣은 지점이 선명해진다. 막연한 불안 호소보다 버전 이력 한 줄이 훨씬 강하게 범위 이탈을 고정한다.",
        "worstActionReaction": "주거 불안을 먼저 공감하면 서진은 그 문서를 '혹시 모를 대비자료'로 다시 포장하면서, 이미 덮은 2022년 사건을 왜 굳이 상담 폴더에 다시 올렸는지에 답하지 않는다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "현석에게 알림을 본 직후 왜 누나와 임대인부터 찾았는지 묻는 순간, 법무사보다 '버려지는 사람처럼 보일까' 하는 체면 공포가 먼저 튀어나온다. 그 두려움이 보이면 카페 합의를 없던 말로 줄인 이유도 함께 드러난다.",
        "worstActionReaction": "12분 뒤 누나, 31분 뒤 임대인 같은 시간표만 몰아붙이면 현석은 금세 '그건 그냥 달래기용 말이었지'라며 카페 합의의 효력 자체를 단어 싸움으로 축소시킨다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 0.9,
          "separation": 1.25,
          "confidential_protection": 1.3
        },
        "bestActionHint": "가족과 임대인, 법무사 문서 노출을 최소 범위로 다루겠다고 해 두면 서진도 대출 문서 추가를, 현석도 외부 선통보를 한 단계씩 인정하기 쉬워진다. 이 쟁점은 누가 더 나빴는지보다 경계선이 어디서 깨졌는지를 안전하게 말하게 해야 풀린다.",
        "worstActionReaction": "바로 책임 비율부터 재면 서진은 '나는 상담 범위 안이었다'고 버티고, 현석은 '나는 집을 지키려 했다'고 맞서면서 서로 다른 위반을 같은 저울에 억지로 올리느라 본질을 더 흐린다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.78,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.95,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "임대인 확답 시한, 은행 일정표, 현석의 선제 통화 순서를 비공개 맥락 속에서 정리하면 전세 위기가 상담 하나 때문에 난 게 아니라는 점을 차분히 말할 수 있다. 주거 불안을 방어 무기로 쓰지 못하게 만드는 데 보호 장치가 잘 먹힌다.",
        "worstActionReaction": "누가 전세를 망쳤는지부터 추궁하면 현석은 상담 탓으로, 서진은 임대인 통화 탓으로 곧장 갈라서며 '시한 임박+답변 지연+선제 전화'라는 구조는 각자 유리한 한 장면 뒤로 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "use_confidential_channel"
        ],
        "triggerMapping": {
          "fact_pursuit": "prior_agreement_question",
          "investigate_only:e-2": "loan_document_question",
          "evidence_present:e-4": "e-1_presented",
          "use_confidential_channel": "no_disclosure_agreement_question"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "loan_document_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "scope_of_consultation_followup",
          "confidential_protection": "loan_document_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_fear_of_separation",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "nonjudgmental_question_about_fear_of_separation",
          "confidential_protection": "nonjudgmental_question_about_fear_of_separation"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "family_involvement_question",
          "evidence_present:e-3": "e-5_presented",
          "evidence_present:e-5": "e-5_presented",
          "confidential_protection": "no_disclosure_agreement_question",
          "separation": "no_disclosure_agreement_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection",
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "housing_crisis_question",
          "evidence_present:e-4": "e-6_presented",
          "evidence_present:e-5": "e-6_presented",
          "confidential_protection": "housing_crisis_question",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "현석은 법무사 상담 자체보다, 별거가 공식 절차의 언어로 옮겨지는 순간 자신이 버려진 사람처럼 굳어질까 두려웠다. 그래서 합의를 알면서도 먼저 외부에 독단 프레임을 심어 방어막을 만들었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "현석은 법무사 서류 알림을 보자마자 서진이 몰래 이혼을 준비하고 있다고 믿어 버렸어요. 12분 뒤 누나에게, 31분 뒤 임대인에게 '서진 독단'이라고 알렸습니다.",
        "하지만 저는 한 달 전 카페에서 '상담까지만 해 보자'고 합의한 자리에 현석도 있었다는 걸 나중에 알았어요. 합의를 알면서 없었던 것처럼 프레임을 짠 거예요."
      ],
      "tp-2": [
        "서진은 법무사에 서류를 넘긴 게 맞지만, 접수 번호도 사건 번호도 없었어요. CRM 기록상 상담 단계에 머물렀습니다. 카페 합의 범위 안이었어요.",
        "다만 서진이 계약서 47분 뒤에 과거 대출 정리서를 상담 폴더에 추가한 건 합의 범위를 넘었습니다. 상담 방어와 과거 무기화의 경계를 넘은 거예요."
      ],
      "tp-3": [
        "저는 법무사 기록을 보면 이 건이 이혼 소송 착수가 아니라 가능성만 물은 상담 단계라고 확인했습니다. 접수 번호도 사건 번호도 생성되지 않았어요.",
        "핵심은 서진이 합의에 없던 대출 문서를 추가해 범위를 넘겼고, 현석은 합의를 알면서 재논의 없이 바깥에 '독단'이라고 퍼뜨렸다는 점입니다. 갱신 확답 시한 3일 전에 둘 다 합의를 어긴 겁니다."
      ]
    }
  },
  "spouse-09": {
    "personalityTags": {
      "a": [
        "privacy_sensitive",
        "trust_broken",
        "cold_logical",
        "grudge_holding"
      ],
      "b": [
        "relationship_preserving",
        "counter_attack",
        "blame_shifting",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "family_care",
        "secret_keeping",
        "promise_violation"
      ],
      "d-2": [
        "financial",
        "family_care",
        "secret_keeping",
        "third_party_risk"
      ],
      "d-3": [
        "intimacy_suspicion",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-4": [
        "financial",
        "promise_violation",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "family_care",
        "sequence_sensitive",
        "trust_breach"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "subjective_claim",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.86,
          "motive_search": 1.2,
          "empathy_approach": 1.05,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도현에게 2022년 채무 사건 이후 왜 이번에도 먼저 송금하고 나중에 설명하려 했는지 묻는 순간, 외도보다 '또 가장 역할을 못 했다는 평가를 들을까' 하는 공포가 튀어나온다. 그 공포가 드러나야 390만원 비밀 송금도 급한 선의로만 숨기기 어렵다.",
        "worstActionReaction": "이체 시각과 병원 주차 18분 차이만 밀어붙이면 도현은 병원 들른 동선과 원무과 절차를 길게 나열하며, 같은 날 공유 원칙을 깬 핵심은 바쁜 일정 이야기 속에 묻어 버린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.83,
          "motive_search": 1.2,
          "empathy_approach": 1.05,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "선아에게 보험금 입금 43분 만에 왜 오빠 계좌로 옮겼는지 묻게 되면, '도현 돈 문제에 또 끌려다니고 싶지 않았다'는 통제 욕구가 먼저 나온다. 그 동기가 드러나야 '보관이었을 뿐'이라는 말이 은닉의 성격을 완전히 지우지 못한다.",
        "worstActionReaction": "처음부터 930만원 대 390만원 액수 비교로 밀어붙이면 선아는 곧 '쓴 게 아니라 맡겨 둔 거야'라는 정의 싸움으로 빠져, 왜 남편에게조차 비공개를 요청했는지 답하지 않는다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1.16,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "잘린 메신저를 더 퍼뜨리지 않겠다고 선을 그어 주면, 도현은 최서정과의 늦은 밤 연락이 퇴원 가능일과 대기 설명 때문이었다는 맥락을 내놓기 쉬워진다. 이 쟁점은 부정행위 의심을 낮춰 줘야 업무 기록이 힘을 얻는다.",
        "worstActionReaction": "문자 속 '밤 10시 전에 다시 봐요' 한 줄만 파고들면 선아는 사적 뉘앙스를, 도현은 말투 해명을 반복하며 병동 예약번호와 원무주임 직책이라는 기관 맥락까지 도달하지 못한다."
      },
      "d-4": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.26,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "2022년 공개원칙 메모의 '100만원 이상 같은 날 공유' 한 문장을 기준으로 yes/no를 좁혀 묻는 게 가장 효과적이다. 규칙 문장 앞에서는 선아의 과거 상처 호소도 930만원 비공개를 면책 논리로 끝까지 밀기 어렵다.",
        "worstActionReaction": "선아의 상처를 먼저 길게 받아주면 그녀는 곧 2022년의 배신 전체를 현재의 허가증처럼 쓰기 시작하고, 이번 930만원 이전이 규칙 위반이었다는 현재형 사실은 희미해진다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.88,
          "motive_search": 0.95,
          "empathy_approach": 1.2,
          "evidence_present": 0.9,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "퇴원 일정이 당겨질 수 있다는 공포와 계좌 유동성 불안을 둘 다 인정해 주면, 선아도 도현도 '상대를 막기 위해 돈을 먼저 쥐었다'는 쌍방 패턴을 말할 가능성이 커진다. 병원비 공황은 비난보다 두려움을 다루는 쪽이 진실에 가깝다.",
        "worstActionReaction": "누가 현금 부족을 만들었는지만 따지면 선아는 390만원, 도현은 930만원을 들고 상대 금액만 키우며, 두 비밀이 동시에 유동성을 말려 버렸다는 구조는 서로의 액수 공격 뒤에 숨는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "reservation_transfer_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "insurance_payment_question",
          "evidence_present:e-4": "e-4_presented",
          "confidential_protection": "insurance_payment_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_discharge_panic",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "message_context_followup"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "past_debt_reference",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "empathy_approach",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "cash_crisis_question",
          "evidence_present:e-1": "shared_budget_question",
          "evidence_present:e-4": "shared_budget_question",
          "empathy_approach": "small_admission_about_fear",
          "motive_search": "small_admission_about_fear"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "motive",
        "deeperReveal": "선아의 보험금 은닉과 도현의 선수금 송금은 서로 다른 방향 같지만, 둘 다 “상대가 또 돈을 숨길 수 있다”는 오래된 공포에서 나온 선점 행동이었다. 신뢰 복구보다 먼저 자금 통제권을 쥐려는 심리가 겹쳤다.",
        "unlockHint": "motive_search + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "도현은 밤에 공동계좌에서 큰 금액을 빼서 낯선 여자 이름으로 보냈어요. 나중에 알고 보니 병동 원무주임한테 간병 선수금을 보낸 거였는데, 아내한테 한마디도 안 한 게 문제였습니다.",
        "저는 그 행동에서 외도보다 타이밍을 놓친 두려움을 봤어요. 어머니 퇴원이 앞당겨질 수 있다는 연락에 급했는데, 먼저 말하지 못하고 혼자 움직인 거예요."
      ],
      "tp-2": [
        "상대쪽은 보험금이 입금되자마자 전액을 다른 계좌로 옮기고 침묵했습니다. 2022년 오빠 빚 대납 전력 때문에 또 가져갈까 봐 먼저 숨긴 거예요.",
        "시간순으로는 보험금 은닉이 먼저이고 금액도 더 큽니다. 사전 공유 약속을 먼저 깬 건 그쪽이에요. 둘 다 약속을 어겼지만 규모와 순서가 다릅니다."
      ],
      "tp-3": [
        "저는 병동 원무주임 최서정입니다. 밤 9시에 간병 선수금을 받은 건 맞고 영수증이 있어요. 외도 상대가 아니라 병원 직원입니다. 병원 전산으로 직책이 확인됩니다.",
        "이 건의 핵심은 외도 여부가 아니라, 간병비를 혼자 결정한 것과 보험금을 먼저 숨긴 것이 같은 주에 겹쳤다는 점입니다. 퇴원 일정과 대기 순번까지 동시에 바뀌며 터진 거예요."
      ]
    }
  },
  "spouse-10": {
    "personalityTags": {
      "a": [
        "detail_obsessed",
        "cold_logical",
        "fairness_obsessed",
        "conflict_avoidant"
      ],
      "b": [
        "face_sensitive",
        "timeline_padding",
        "avoidant",
        "relationship_preserving"
      ]
    },
    "contentTags": {
      "d-1": [
        "family_care",
        "promise_violation",
        "trust_breach"
      ],
      "d-2": [
        "family_care",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-3": [
        "family_care",
        "misleading_soft_evidence",
        "sequence_sensitive"
      ],
      "d-4": [
        "family_care",
        "promise_violation",
        "trust_breach",
        "sequence_sensitive"
      ],
      "d-5": [
        "family_care",
        "sequence_sensitive",
        "trust_breach",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.88,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "기현에게 왜 배우자보다 어머니에게 먼저 '먼저 갈게요'를 보냈는지 묻게 되면, 시댁 점심상을 비우는 아들이 될까 봐 서둘러 확정해 버린 체면 계산이 드러난다. 그 동기가 보여야 일방 약속이 단순 착오가 아니라는 점이 선명해진다.",
        "worstActionReaction": "전날 메시지 문구만 잘게 뜯으면 기현은 곧 '점심쯤이지 12시 확정은 아니었다'는 시간 흐리기로 빠져, 왜 수아 확인도 없이 어머니 기대를 먼저 만들었는지까지는 못 간다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "수아에게 왜 '본가'와 '가까운 쪽 먼저'가 당연히 같은 뜻으로 읽힐 거라 생각했는지 묻게 되면, 친정 표현이 남편에게도 자동 번역될 거라는 무의식이 드러난다. 그 지점을 건드려야 캘린더 문구의 모호함을 자기 책임으로 보게 된다.",
        "worstActionReaction": "수아의 서운함만 먼저 달래면 그녀는 금세 '본가라고 썼지 네 집이라고 안 썼잖아'라는 단어 사전으로 숨어 버리고, 확인하지 않은 책임은 인정하지 않으려 든다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.17,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.23,
          "separation": 1,
          "confidential_protection": 0.95
        },
        "bestActionHint": "기현의 오후 장인댁 메모와 반대 방향 하이패스 기록을 같이 제시하면, 처가를 일부러 무시한 의도는 아니라는 점이 물리적 동선으로 드러난다. 남는 과실만 또렷하게 남기기에 이 쟁점은 원본 기록이 가장 빠르다.",
        "worstActionReaction": "친정 이모의 섭섭함부터 길게 공감하면 수아는 그 감정 메시지를 곧바로 '고의 배제의 증거'로 붙들고, 기현 메모에 남은 오후 방문 계획은 눈에서 멀어진다."
      },
      "d-4": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.28,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "수아 캘린더 생성 시각, 기현의 전날 단톡, 출발 7분 전 통화를 시간순으로 못 박아 질문하면 두 사람 모두 부모에게는 먼저 말하고 배우자에게는 나중에 확인한 구조를 피하기 어렵다. 이 쟁점은 감정보다 순서 고정이 핵심이다.",
        "worstActionReaction": "양가 어른들 서운함부터 달래기 시작하면 이야기가 누구 부모 체면이 더 깎였는지로 새어 버리고, 정작 부부가 서로를 마지막으로 확인한 통신 우선순위 문제는 흐려진다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 0.9,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "명절 서열 시비로 몰아붙이지 않고, 각자 부모 앞에서 예의 없는 사위·며느리로 보일까 두려웠다는 점을 받아주면 본가·먼저·점심쯤이 왜 이렇게 위험한 단어였는지 스스로 설명하게 된다. 구조적 실수는 비난을 낮춰야 말로 나온다.",
        "worstActionReaction": "한 사람을 주범으로 찍어 버리면 수아는 '본가'를, 기현은 '점심쯤'을 각각 방패로 들고 나와 사전적 의미만 싸우고 50분 이동 불가능성이라는 현실 계산은 사라진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "did_you_confirm_lunch_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 6
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "calendar_wording_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "intentional_snub_question",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "did_you_confirm_lunch_question",
          "evidence_present:e-1": "did_you_tell_your_spouse_followup",
          "evidence_present:e-2": "calendar_wording_question",
          "motive_search": "what_did_you_mean_by_bonga"
        },
        "pathBonus": 7
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "small_admission_about_rushing",
          "evidence_present:e-4": "e-5_or_e-6_presented",
          "evidence_present:e-5": "e-5_or_e-6_presented",
          "motive_search": "travel_time_followup",
          "separation": "e-5_or_e-6_presented"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "두 사람 모두 명절 일정 자체보다, 어느 집을 먼저 가느냐가 부모 앞 서열처럼 읽힐까 두려워했다. 그래서 표현은 더 모호해졌고, 확인은 오히려 늦어졌다.",
        "unlockHint": "empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "기현은 전날 밤 어머니에게 '점심 먼저 가겠다'고 문자를 보내고 과일상자 픽업까지 예약했어요. 어머니 입장에선 확정된 약속이었습니다.",
        "수아는 캘린더에 '토 11시 본가'라고만 적었는데, '본가'가 친정이라는 걸 기현에게 한 번도 말한 적이 없어요. 부부 사이에서 미정이던 단어가 양가 어른한테는 이미 확정으로 전달된 거죠."
      ],
      "tp-2": [
        "수아는 이틀 전 이미 친정에 방문 의사를 전했고, 기현은 전날 밤 어머니에게 확정 문자를 보냈습니다. 그런데 부부 간 최종 통화는 출발 7분 전이었어요. 양가보다 배우자가 나중에 안 구조 자체가 소통 문제입니다.",
        "기현 메모에 오후 장인댁 방문 계획이 남아 있으니 의도적 배제는 아니었어요. 하지만 '본가', '먼저', '점심쯤' — 이 세 단어 모두 해석이 둘로 갈렸고, 확인 한 통화면 막을 수 있었습니다."
      ],
      "tp-3": [
        "저는 주문서를 보면 수아는 한과세트를, 기현은 과일상자를 각자 준비했습니다. 같은 날을 준비하면서 마음속 방향이 완전히 달랐어요. 양가 사이 이동 50분도 감안하지 않은 상태였습니다.",
        "이 건은 누가 거짓말을 한 게 아니라 처음부터 각자 다른 그림을 들고 출발한 구조적 실수입니다. 문 앞에서 마주쳐서야 전혀 다른 방향이었다는 걸 알게 된 거예요."
      ]
    }
  },
  "spouse-11": {
    "personalityTags": {
      "a": [
        "manipulative",
        "privacy_sensitive",
        "calculated_calm",
        "shame_sensitive"
      ],
      "b": [
        "avoidant",
        "counter_attack",
        "blame_shifting",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-2": [
        "role_failure",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "financial",
        "secret_keeping",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "유림 태블릿 지문이 찍힌 포털 세션에서 공사중지 요청과 CCTV 반출이 연달아 실행된 감사로그를 바로 보여 주면, '난 캡처만 했을 뿐'이라는 선 긋기가 버티기 어렵다. 이 쟁점은 로그 한 줄이 심리 추정 열 문장보다 세다.",
        "worstActionReaction": "리모델링이 망가질까 두려웠다는 사정부터 받아주면 유림은 곧 무단 접속을 '집을 살리려 한 기록 보존'으로 다시 부르고, 권한 침범 자체는 선의 뒤에 숨긴다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.25,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "제습기 OFF 6시간 12분, 건조업체 취소, 도어락 권한 재설정이 같은 흐름이라는 원본 로그를 맞대면 승호의 '급해서 그랬다'는 말은 설 자리가 크게 줄어든다. 급한 대응이라면 왜 가장 기본인 건조를 끊었는지가 즉시 드러난다.",
        "worstActionReaction": "예산 압박과 가장 역할부터 공감해 버리면 승호는 자신의 선택을 '가장이 내린 거친 판단'으로 포장하면서, OFF 로그와 취소 기록이라는 객관 장면을 끝까지 뒤로 미룬다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "잘린 11초 CCTV 캡처를 수분센서 CSV와 긴급건조 권고 시점에 붙여 보면, 초기 하자는 시공사 쪽이지만 큰 손상은 건조 지연 뒤에 커졌다는 선이 분명해진다. 이 쟁점은 잘린 영상과 전체 타임라인의 충돌을 보여 주는 것이 핵심이다.",
        "worstActionReaction": "홍대성에 대한 불신을 먼저 받아 주면 두 사람은 곧 '현장소장이 수상했다'는 의심 서사만 키우고, 제습 OFF 이후 계단형으로 오른 센서 수치에는 손을 대지 않으려 한다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.21,
          "motive_search": 0.95,
          "empathy_approach": 0.8,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "삭제 복원 메신저의 '손상 넓으면 천장도'와 '잔금이랑 카드대금 나누자'를 예산 메모와 함께 제시하면, 보험금 계산이 한쪽의 충동이 아니라 번갈아 구체화된 공동 기획으로 보인다. 서로의 역할을 분리해 숨길 틈이 줄어든다.",
        "worstActionReaction": "입주 지연 스트레스만 공감하고 넘어가면 두 사람은 보험 얘기를 단순한 푸념처럼 눌러 버리고, 손상 확대와 예산 구멍을 계산해 연결한 문장들은 '그때 감정적으로 한 말'로 축소한다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.28,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.02
        },
        "bestActionHint": "보험사 조사유예 결정일을 홍대성 분쟁 제기보다 앞에 두고, 제습 로그·센서 이상·사진 순서 불일치 사유를 함께 꺼내면 '시공사 보복' 서사는 시간표에서 무너진다. 이 쟁점은 날짜와 기관 사유서를 붙여 보는 것이 가장 빠르다.",
        "worstActionReaction": "보험사가 너무했다는 정서부터 받아주면 부부는 곧 외부 탓으로 뭉치면서, 정작 자기들이 남긴 데이터 이상징후와 복구 지연은 방어적 침묵으로 덮어 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "portal_access_question",
          "evidence_present:e-1": "e-1_presented",
          "confidential_protection": "portal_access_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "drying_delay_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "contractor_fault_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "e-5_presented"
        },
        "pathBonus": 9
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_move_in_pressure",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_or_shared_responsibility_question",
          "motive_search": "insurance_motive_question",
          "separation": "e-5_or_shared_responsibility_question"
        },
        "pathBonus": 9
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_caused_major_damage_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-6": "shared_fault_question",
          "motive_search": "did_you_follow_emergency_repair_advice"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-4": {
        "category": "motive",
        "deeperReveal": "보험금 계산은 단순한 탐욕이라기보다 이미 무너진 입주 예산을 누가 책임질지 말하지 못한 침묵이 비틀린 결과였다. 서로 “우리 돈이 모자라”를 먼저 말하면 지는 것처럼 느낀 채 우회로를 택했다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-4 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "리모델링 중 욕실 배관에서 누수가 터졌는데, 초기 보수비가 수납장·바닥까지 합치면서 몇 배로 불어나고 있었어요. 보험으로 메우려는 마음이 둘 다 급했습니다.",
        "유림은 승호 아이디로 포털에 접속해 CCTV를 빼냈고, 승호는 제습기를 6시간 끈 채 건조를 취소했어요. 한쪽 배신이 아니라 보험금을 더 받으려는 양쪽 움직임이었습니다."
      ],
      "tp-2": [
        "저는 제습기가 여러 시간 꺼진 동안 수분센서가 계단형으로 급상승한 기록을 확인했습니다. 초기 누수는 시공 하자 수준이었지만, 제습 중단과 건조 취소가 손상을 확대한 직접 원인이에요.",
        "삭제 복원 메신저에 유림은 '손상 넓으면 천장도 간다', 승호는 '잔금이랑 카드대금 나누자'고 답한 기록이 있습니다. 한쪽이 주도한 게 아니라 양쪽이 번갈아 보험금 계산을 구체화한 공동 기획이에요."
      ],
      "tp-3": [
        "저는 보험사 지급 보류가 시공사 분쟁 제기보다 이틀 앞서 결정됐다는 걸 확인했습니다. 사유서에 제습 중단 로그, 수분센서 이상 곡선, 사진 순서 불일치가 명시돼 있어요. 시공사 보복이 아니라 보험사 내부 탐지입니다.",
        "저는 유림의 포털 접속 감사로그도 확인했는데, 캡처만 했다는 주장과 다르게 공사중지 요청과 CCTV 반출이 한 세션에서 처리돼 있습니다. 합의 위반이에요."
      ]
    }
  },
  "spouse-12": {
    "personalityTags": {
      "a": [
        "face_sensitive",
        "privacy_sensitive",
        "selective_quote",
        "shame_sensitive"
      ],
      "b": [
        "face_sensitive",
        "conflict_avoidant",
        "timeline_padding",
        "counter_attack"
      ]
    },
    "contentTags": {
      "d-1": [
        "reputation_risk",
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "reputation_risk",
        "secret_keeping",
        "trust_breach"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "reputation_risk",
        "hard_evidence_available",
        "third_party_risk"
      ],
      "d-4": [
        "reputation_risk",
        "hard_evidence_available",
        "sequence_sensitive",
        "trust_breach"
      ],
      "d-5": [
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "subjective_claim",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.03,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.12
        },
        "bestActionHint": "재우 휴대폰의 전달 로그와 운영진·가족·직장 세 채널 원문을 나란히 놓으면, 세아에게 묻기 9분 전부터 이미 '아마 세아가 맞다'는 프레임을 퍼뜨린 사실이 고정된다. 직업적 선조치라는 말은 이 시차 앞에서 힘이 약해진다.",
        "worstActionReaction": "재우의 승진 불안부터 먼저 달래면 그는 곧 '내 자리에선 먼저 선을 그어야 했다'는 공무원 역할 뒤로 숨고, 확인 전 전파라는 개인적 책임은 제도 언어 속에 녹여 버린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.82,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.17
        },
        "bestActionHint": "세아에게 왜 하필 게시물 확산 두 시간 뒤 모진 2006년 메시지 한 건만 따로 빼냈는지 묻게 되면, 익명 루머와 별개로 가장 차가운 과거만 재우 앞에 노출될까 두려웠다는 심리가 드러난다. 그 두려움이 보여야 '단순 정리' 주장이 약해진다.",
        "worstActionReaction": "파일 생성 시각과 폴더 개수만 세밀하게 따지면 세아는 곧 '그 문장은 소문이랑 다른 층위'라고 사실을 분할하며, 왜 재우 공유 묶음에서만 빼냈는지에 대한 선택 책임은 흐린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.07
        },
        "bestActionHint": "익명 게시물 캡처의 해상도 불일치와 계정 복구 메일·행사장 와이파이 로그를 같이 들이밀면, 한유진을 향한 막연한 의심보다 박하린 쪽 실행 흔적이 훨씬 구체적이라는 점이 선다. 오해의 대상이 누구였는지 바로잡는 데는 포렌식 교차가 제일 빠르다.",
        "worstActionReaction": "20년 전 상처를 먼저 다독이면 재우와 세아 모두 다시 '한유진이라면 그럴 이유가 있다'는 감정적 범인론으로 돌아가고, 실제 버너계정 경로를 보여 주는 기술 기록은 뒷전이 된다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.88,
          "motive_search": 1.2,
          "empathy_approach": 0.95,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.22
        },
        "bestActionHint": "정정 범위를 넓히지 않고 필요한 채널만 바로잡겠다고 약속하면, 재우도 위조 판정을 방패로 보지 않고 인정할 가능성이 커진다. 이 쟁점은 포렌식이 맞느냐보다 '또 퍼질까' 하는 공포를 낮춰 줘야 고백이 나온다.",
        "worstActionReaction": "레이어 해시와 스킨 연도만 차갑게 추궁하면 재우는 기술적 반박 하나하나에 매달리며 시간을 끌고, 위조임을 알게 된 뒤에도 왜 계속 퍼뜨렸는지는 끝까지 말하지 않으려 한다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.3,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "세아에게 2006년의 모진 메시지 책임과 2026년 위조 낙인을 분리해서 다루겠다고 해 주면, 그녀는 둘을 한 번에 자백하는 공포 없이 과거 잘못의 범위를 말할 수 있다. 이 쟁점은 죄책감과 허위 낙인을 분리해 주는 공감이 핵심이다.",
        "worstActionReaction": "2006년 일을 검사식으로 캐묻기 시작하면 세아는 문장 하나하나를 잘게 쪼개며 방어하고, '상처 준 사실'과 '익명 소문 작성은 아님'이라는 중요한 경계가 다시 한 덩어리로 뭉개진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "did_you_forward_it_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_before_asking_spouse",
          "confidential_protection": "did_you_forward_it_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_archive_question",
          "evidence_present:e-2": "e-2_presented",
          "confidential_protection": "old_archive_question"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "who_did_you_think_ran_the_account",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-5": "e-5_presented",
          "confidential_protection": "who_did_you_think_ran_the_account"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_public_fear",
          "investigate_only:e-3": "e-4_presented",
          "motive_search": "nonjudgmental_question_about_public_fear"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "empathy_approach",
          "evidence_present:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search",
          "separation"
        ],
        "triggerMapping": {
          "empathy_approach": "nonjudgmental_question_about_guilt",
          "evidence_present:e-2": "e-6_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "nonjudgmental_question_about_guilt",
          "separation": "shared_past_question"
        },
        "pathBonus": 9
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "세아가 오래된 메시지를 숨긴 건 현재 허위 유포와는 별개로, 재우가 과거의 가장 차가운 순간만 보고 지금의 자신까지 판단할까 두려웠기 때문이다. 반대로 재우는 아내를 지키기보다 자기 공적 평판부터 무너질 장면을 먼저 떠올렸다.",
        "unlockHint": "empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "20주년 동창 모임 다음 날 새벽에 익명 계정이 2006년 장학금 소문을 꺼냈어요. 재우는 세아한테 확인하기 9분 전에 이미 세 채널로 캡처를 돌리며 '아마 세아가 맞다'고 반복했습니다.",
        "세아는 백업 복원 후 한유진에게 보낸 모진 메시지 1건을 별도 폴더로 옮겨서 재우 공유 파일에서 뺐어요. 원문 조작은 아니지만 노출 범위를 조정한 건 사실상 증거 은닉입니다."
      ],
      "tp-2": [
        "저도 처음엔 세아와 한유진 사이 옛 갈등을 떠올렸지만, 시간이 갈수록 익명 게시가 너무 인위적이라는 느낌이 강해졌어요. 묵은 이야기가 저절로 떠오른다기보다 누가 타이밍을 잡고 올린 것 같았습니다.",
        "계정 복구 메일은 박하린 예비 주소로 되어 있고, 게시 직전 와이파이에도 박하린 기기가 접속해 있었어요. 세아와 재우 모두 한유진을 의심했지만, 동기와 실행자가 다를 수 있습니다."
      ],
      "tp-3": [
        "저는 포렌식 결과를 확인했는데, 문제의 방명록 배경은 2008년 스킨이고 문자 말풍선은 2024년 복원앱 템플릿입니다. 시간대와 출처가 다른 두 소스를 2026년에 합성한 위조본이에요.",
        "이 증거로는 세아를 장학금 소문 유포자로 단정할 근거가 없습니다. 세아가 한유진에게 모진 메시지를 보낸 건 사실이지만, 그것과 익명 소문 유포는 별개의 층위입니다. 둘 다 2023년 합의를 어긴 건 맞아요."
      ]
    }
  },
  "tenant-01": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "shame_sensitive",
        "relationship_preserving",
        "timeline_padding"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "detail_obsessed",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-2": [
        "role_failure",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ],
      "d-3": [
        "role_failure",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "role_failure",
        "promise_violation",
        "hard_evidence_available"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "role_failure",
        "promise_violation"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "circumstantial",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "하림에게 왜 마지막 월세를 딱 5일 미뤘는지, 새 집 계약금과 보증금 의존부터 말하게 해야 e-2 입금내역 앞에서 '그 며칠만 버티면 됐다'는 숨긴 사정이 나온다.",
        "worstActionReaction": "입금 날짜만 몰아세우면 하림은 곧바로 사진첩과 가계부를 꺼내 들며 월세 지연보다 벽 손상 범위 이야기로 프레임을 바꿔 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "입주·퇴거 비교 사진과 부분보수·전면도배 견적서를 한 장씩 붙여 보면, 반려묘 긁힘이 거실 한 면 보수인지 전면 교체인지 과장이 바로 갈린다.",
        "worstActionReaction": "하림의 이사 사정만 먼저 공감하면 상우는 '원칙상 전면도배'를 더 세게 반복하고, 하림도 손상 범위를 말로만 줄여서 자료 대면이 늦어진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "관리비 고지서 메모와 수전 민원 접수기록, 배성훈 기사 설명을 함께 맞대야 욕실 누수가 세입자 사용 탓이 아니라 노후 부품 문제였다는 선이 선명해진다.",
        "worstActionReaction": "불편했겠다고만 받아 주면 상우는 '고양이도 키우던 세입자' 프레임으로 밀어붙이고, 하림은 '집이 원래 낡았다'는 감정 섞인 반박만 남긴다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.12,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "공인중개사 포함 카톡과 통화 녹취, 임대차 특약을 같이 보여주면 상우가 보증금을 이사 당일 보내겠다고 한 말이 '가능하면'이었는지 실제 약속이었는지 빠르게 드러난다.",
        "worstActionReaction": "하림의 급한 이사 일정만 먼저 다독이면 상우는 표현 해석으로 숨고, 하림도 '그때 그렇게 들었다'는 기억 주장만 반복하게 된다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "상우에게 왜 부분보수 수준 벽지와 노후 수전까지 전면 공제표에 넣었는지, 반려동물 손상 선례를 남기기 싫었던 계산부터 묻게 해야 과한 공제 통보의 동기가 드러난다.",
        "worstActionReaction": "항목별 금액만 추궁하면 상우는 계약 조항을 외워 읽고, 하림은 '딱 그 부분만'이라며 범위만 줄여 말해 공제 의도 자체는 끝까지 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "auto_transfer_limit_question",
          "evidence_present:e-2": "e-2_presented"
        },
        "pathBonus": 6
      },
      "d-2": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "wallpaper_scope_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-1": "e-1_presented",
          "confidential_protection": "nonjudgmental_question_about_cat_damage",
          "motive_search": "nonjudgmental_question_about_cat_damage"
        },
        "pathBonus": 10
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "faucet_repair_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "previous_tenant_reference"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_timing_question",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-3": "e-3_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "broker_reference"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "contract_clause_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-2": {
        "category": "motive",
        "deeperReveal": "하림은 반려묘 긁힘 한 면을 인정하는 순간 곧바로 “집을 망가뜨린 세입자”처럼 보일까 두려워 손상 범위를 더 좁게 말했고, 상우는 그 틈을 전면 공제로 넓히는 명분으로 썼다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-2 현재 S3 이상",
        "impactDisputes": [
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 옆에서 본 하림은 새 전셋집 계약금을 보증금 반환으로 맞춰야 해서, 반환이 하루만 밀려도 다음 계약까지 흔들린다고 걱정하는 사람이었어요.",
        "그래서 원상복구 범위가 넓어진다는 얘기만 나와도 표정이 바로 굳었습니다. 수리 문제가 아니라 보증금이 깎이면 이사 일정 자체가 무너지는 거니까요."
      ],
      "tp-2": [
        "저는 중개사 포함 통화에서 들은 건, 미납 월세와 실제 복구비만 정산하면 나머지 보증금을 이사 당일 보내겠다는 말이었습니다. 그때까지는 전면 도배 얘기가 안 나왔어요.",
        "그런데 나중에 전면 도배와 수전 교체까지 공제 항목에 올라왔다는 이야기를 들었을 때, 처음 통화에서 정리한 범위와 많이 달라졌다는 느낌이었습니다."
      ],
      "tp-3": [
        "저는 욕실 수전을 보면 노후 부품에서 오는 누수 흔적이었습니다. 세입자가 거칠게 써서 망가뜨린 게 아니라 입주 전부터 이어진 마모에 가까워요.",
        "거실 벽지도 입주 사진과 비교하면 변색과 들뜸 대부분은 기존 상태였고, 세입자 책임은 반려묘가 긁은 한 면의 부분 보수 수준입니다. 전면 도배 공제는 실제 범위를 넘어섭니다."
      ]
    }
  },
  "tenant-02": {
    "personalityTags": {
      "a": [
        "confrontational",
        "privacy_sensitive",
        "counter_attack",
        "emotionally_volatile"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "martyr_complex",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "privacy",
        "promise_violation",
        "sequence_sensitive",
        "misleading_soft_evidence"
      ],
      "d-2": [
        "hard_evidence_available",
        "role_failure",
        "promise_violation"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "privacy",
        "promise_violation",
        "career"
      ],
      "d-4": [
        "privacy",
        "promise_violation",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-5": [
        "privacy",
        "role_failure",
        "promise_violation",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "emotional_context",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "세입자·집주인·수리기사 단톡 시각과 규철 제출 사진 원본을 나란히 놓으면, 민석 동의 전 출입이었는지 '급해서 잠깐'이었는지 변명이 시간표 앞에서 무너진다.",
        "worstActionReaction": "규철의 누수 부담을 먼저 이해해 주면 그는 무단 출입을 건물 지키려 한 희생처럼 포장하고, 촬영 시점 문제는 계속 뒤로 민다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "관리비 기록의 공용배관 메모와 수리업체 1차 진단서를 함께 대면시켜야, 곰팡이와 젖은 천장의 출발점이 민석 생활습관이 아니라 연결부 누수였다는 점이 정리된다.",
        "worstActionReaction": "장비가 걱정됐다는 말이나 건물주 고생만 공감하면, 둘 다 서로의 태도 탓으로 돌릴 뿐 배관 원인 자체는 끝없이 흐려진다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "규철이 낸 타임스탬프 캡처와 원본 파일 메타정보, 재방문 수수료가 찍힌 날짜를 맞대면 '나중에 보기 좋게 정리했을 뿐'이라는 변명이 버티기 어렵다.",
        "worstActionReaction": "억울했다는 감정부터 받아 주면 규철은 캡처 편집을 사소한 표시 문제로 낮추고, 사진이 언제 찍혔는지 본론을 계속 흐린다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "민석에게 왜 이틀 동안 기사 방문을 전면 막았는지, 무단 출입 뒤 편집 장비와 원본 파일이 더 무서웠다는 동기를 말하게 해야 협조 지연의 이유가 숨지 않는다.",
        "worstActionReaction": "취소된 방문 횟수와 비용만 들이대면 민석은 '제가 안 된다고 했잖아요'를 반복하며 장비 불안과 신뢰 붕괴를 끝까지 말하지 않는다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.12,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "출입 특약본, 날짜 앞당긴 단톡, 조작된 사진 표시를 한 묶음으로 제시해야 긴급출입 조항이 누수 점검까진 몰라도 무단 촬영과 시각 위장까지 덮지 못한다는 선이 선다.",
        "worstActionReaction": "민석 불안이나 규철 부담 중 한쪽 사정부터 감싸면 둘 다 피해자 프레임으로 숨고, 조항이 실제로 어디까지 허용하는지 검토가 늦어진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-4",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "unauthorized_entry_question",
          "investigate_only:e-4": "e-4_presented",
          "present_if_lawful:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_leak_spread_fear",
          "motive_search": "nonjudgmental_question_about_leak_spread_fear"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "leak_cause_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "confidential_protection": "nonjudgmental_question_about_equipment_protection",
          "motive_search": "nonjudgmental_question_about_equipment_protection"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "photo_timestamp_question",
          "investigate_only:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "work_schedule_followup",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "investigate_only:e-4"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "emergency_clause_question",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-4": "e-4_presented",
          "separation": "responsibility_question",
          "motive_search": "shared_responsibility_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "규철은 누수 확산 책임을 뒤집어쓸까 두려워 “급해서 들어갔다”는 선의 프레임에 매달렸고, 민석은 장비와 사생활 침범 공포 때문에 이후 정상 점검 요청까지 전부 통제 시도로 받아들였다.",
        "unlockHint": "fact_pursuit + investigate_only:e-4 이후 motive_search",
        "impactDisputes": [
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "민석 방에는 영상 편집 장비가 가지런히 놓여 있어서, 누가 허락 없이 들어왔다는 의심이 드니까 며칠을 제대로 못 비울 수밖에 없었습니다.",
        "민석이 수리가 필요 없다고 한 게 아니라, 합의한 점검일보다 이틀 먼저 마스터키로 들어와 사진을 찍었다는 사실 자체가 무서웠던 거예요."
      ],
      "tp-2": [
        "저는 두 분 온도가 처음부터 달랐다고 기억합니다. 집주인은 하자가 급하니 바로 들어가 확인할 수 있다고 여겼고, 세입자는 사전 고지와 동의가 먼저라고 생각했어요.",
        "저는 그 차이를 처음에 더 분명히 정리해 줬어야 했습니다. 긴급 점검이 곧 자유 출입은 아니라는 선을 확인했으면, 무단 입실과 기사 방문 거부가 동시에 터지는 일은 없었을 거예요."
      ],
      "tp-3": [
        "저는 제출된 사진의 타임스탬프를 확인했는데, 합의된 점검일이 아니라 이틀 전 촬영으로 보이는 메타데이터가 남아 있었습니다. 표시 시각이 나중에 바뀐 흔적도 있어요.",
        "곰팡이 원인도 확인했는데, 1차 원인은 세입자 환기 부족이 아니라 공용배관 공사 뒤 느슨해진 연결부 누수였습니다. 다만 무단 출입과 기사 방문 거부가 수리 지연을 키운 건 양쪽 다 책임이 있어요."
      ]
    }
  },
  "tenant-03": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "detail_obsessed",
        "authority_challenging",
        "shame_sensitive"
      ],
      "b": [
        "victim_identity",
        "relationship_preserving",
        "blame_shifting",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-2": [
        "misleading_soft_evidence",
        "role_failure",
        "promise_violation",
        "sequence_sensitive"
      ],
      "d-3": [
        "financial",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-4": [
        "promise_violation",
        "hard_evidence_available",
        "sequence_sensitive",
        "privacy"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "third_party_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "circumstantial",
      "t-3": "core_fact",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "등기부등본과 브리지대출 상환예정 확인서를 잔금일 시점으로 다시 맞춰 보여주면, 태수가 추가 채무와 최신 잔액을 직접 설명하지 않았다는 공백이 숫자로 남는다.",
        "worstActionReaction": "태수도 당한 사람일 수 있다는 위로부터 주면 그는 곧바로 '중개사가 다 맡았다'는 말 뒤에 숨고 선순위 채무 설명 누락을 흐린다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "서윤을 곧바로 '사기 피해자'로 몰아세우지 않겠다는 안전판을 깔아야, 보증보험 확답 비슷한 말을 처음 세게 던진 사람이 태수인지 한별인지 출처를 차분히 짚어 낼 수 있다.",
        "worstActionReaction": "누가 '된다'고 먼저 말했는지만 캐묻기 시작하면 서윤도 태수도 한별 이름 뒤로 숨으면서 표현 강도와 맥락을 더 섞어 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "180만원 송금 내역과 중개보수 세금계산서, 사무실 정산표를 한 번에 꺼내면 그 돈이 태수에게 간 것인지 한별 개인 수납이었는지 바로 갈린다.",
        "worstActionReaction": "서윤의 공포만 달래면 180만원 흐름보다 '전세사기 같았다'는 감정이 앞서서, 실제 수령자가 누구인지 확인이 뒤로 밀린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "단톡 캡처와 분할 송금된 잔금 계좌기록을 같이 보면, 서윤이 의심 뒤 이틀 동안 잔금을 보류해 전입 일정까지 늦춘 사실을 감정과 분리해 볼 수 있다.",
        "worstActionReaction": "사기당할 뻔한 불안만 먼저 받아 주면 서윤은 잔금 보류를 전부 정당방위처럼 말하고, 지연 시각과 범위는 계속 희미해진다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.07,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.23
        },
        "bestActionHint": "둘 다 곧바로 '사기꾼'이나 '무지한 세입자'로 규정하지 않겠다는 선을 먼저 그어야, 잔금일 최신 확인을 왜 직접 안 하고 한별 설명에 기대었는지 쌍방의 느슨함이 나온다.",
        "worstActionReaction": "누가 먼저 확인을 안 했는지 순서만 몰아붙이면 태수는 중개사를, 서윤은 불안감을 방패로 세워 당일 확인 원칙 자체를 끝까지 놓치게 된다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "bridge_loan_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "latest_balance_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "insurance_assurance_question",
          "present_if_lawful:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "who_spoke_first_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "safety_fee_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_cashflow_gap",
          "motive_search": "nonjudgmental_question_about_cashflow_gap"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "balance_hold_question",
          "evidence_present:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_family_loan_pressure",
          "motive_search": "nonjudgmental_question_about_family_loan_pressure"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "same_day_check_question",
          "confidential_protection": "same_day_rule_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "why_not_wait_for_latest_registry_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-2": {
        "category": "motive",
        "deeperReveal": "서윤은 보증보험 문구 하나라도 확실히 붙잡아야 가족 돈을 지켰다고 설명할 수 있었고, 태수는 중개사 뒤에 숨으면 전세사기 집주인 낙인을 조금이나마 미룰 수 있다고 여겼다.",
        "unlockHint": "confidential_protection 또는 motive_search + d-2 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 아는 서윤은 보증금에 가족 도움까지 얹혀 있어서, 계약서 사본에 없던 추가 담보 기록을 발견하자 곧바로 전세사기를 의심했습니다. 가족 돈이 걸려 있으니 예민할 수밖에 없었어요.",
        "그런데 실제로 전세사기인지, 중개사가 말소 예정과 보증보험 설명을 과장한 건지는 다른 문제였습니다. 서윤은 그 구분을 확인하기 전에 감정이 먼저 앞서간 거예요."
      ],
      "tp-2": [
        "저는 보증보험이 가능하다고 확정처럼 말한 책임이 있다고 인정합니다. 두 분 다 안심이 필요한 상태였고, 저는 그 불안을 달래려다 말소 예정과 보증보험 설명을 과장했어요.",
        "'말소대행·안전확인비' 명목으로 받은 돈도 집주인한테 전달되지 않고 제 쪽에 남았습니다. 그 돈의 성격이 모호했던 게 두 분 사이 불신을 키운 거예요."
      ],
      "tp-3": [
        "저는 기록을 보면 '집주인 단독 전세사기'라는 구도 자체가 정확하지 않다고 봅니다. 추가 담보와 말소 설명을 과장한 핵심 고리는 집주인보다 중개사 쪽에 더 가까워요.",
        "저는 누가 갑자기 판을 뒤집었다기보다, 애초에 확정되지 않은 상태를 중개사가 너무 빨리 안심으로 포장한 게 출발점이라고 봅니다. 두 분 다 그 설명에 기대서 확인을 미룬 책임은 있습니다."
      ]
    }
  },
  "tenant-04": {
    "personalityTags": {
      "a": [
        "avoidant",
        "relationship_preserving",
        "trust_broken",
        "shame_sensitive"
      ],
      "b": [
        "calculated_calm",
        "selective_quote",
        "fairness_obsessed",
        "timeline_padding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "promise_violation",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ],
      "d-2": [
        "financial",
        "hard_evidence_available",
        "privacy",
        "sequence_sensitive"
      ],
      "d-3": [
        "financial",
        "hard_evidence_available",
        "privacy",
        "misleading_soft_evidence"
      ],
      "d-4": [
        "promise_violation",
        "hard_evidence_available",
        "third_party_risk",
        "privacy"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "role_failure",
        "promise_violation"
      ]
    },
    "truthCategory": {
      "t-1": "subjective_claim",
      "t-2": "core_fact",
      "t-3": "emotional_context",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "전환 논의 음성메모와 계약 초안, 대출 상담 접수기록을 한 자리에서 대면시키면 '가자는 방향'이 다은에게는 확정, 성호에게는 검토였다는 공유 오해가 보여 진다.",
        "worstActionReaction": "서운했다는 마음만 먼저 받아 주면 다은은 '이미 끝난 얘기였다'고, 성호는 '아직 초안이었다'고 더 세게 굳어져 같은 문장을 각자 다르게 붙든다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "공동명의 등기부와 담보대출 상환예상서, 비어 있는 전환 계약 초안을 함께 보여주면 성호가 공동명의 서명과 대출 비용 조건을 늦게 꺼냈다는 점을 피하기 어렵다.",
        "worstActionReaction": "결혼 준비가 급했다는 사정만 들어 주면 성호는 나중에 붙인 조건들을 '원래부터 있던 전제'처럼 더 많이 덧붙인다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "다은에게 왜 2천만원을 보내자마자 월세가 멈춘다고 믿었는지, 결혼 일정과 대출 상담이 이미 묶여 있었다는 기대를 말하게 해야 미납 한 달의 배경이 드러난다.",
        "worstActionReaction": "월세 한 달치부터 따져 묻기만 하면 다은은 '그때 느낌상 다 끝난 줄 알았다'는 완곡한 표현 뒤에 숨고, 믿게 된 근거는 끝까지 안 나온다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "성호를 곧바로 배신한 집주인으로 낙인찍지 않겠다고 선을 그어야, 협의 결렬 통보 전 다른 예비 임차인에게 보여주기 예약문자를 보낸 이유와 시점을 인정받기 쉽다.",
        "worstActionReaction": "몇 시에 누구에게 보여줬는지만 세게 추궁하면 성호는 '문서가 없잖아요'를 반복하며 뒤늦은 조건 붙이기로 다시 대화를 비틀어 버린다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.95,
          "motive_search": 0.95,
          "empathy_approach": 1,
          "evidence_present": 1.18,
          "separation": 1.05,
          "confidential_protection": 1.12
        },
        "bestActionHint": "2천만원 송금 내역의 '전환 준비금' 메모와 미완성 계약 초안, 은행 심사 중단 기록을 같이 봐야 이 돈이 전세 확정금도 위약벌도 아니라는 정산 기준이 선다.",
        "worstActionReaction": "처음부터 '그럼 계약됐냐 안 됐냐'만 몰아가면 다은과 성호 모두 예·아니오 싸움으로 들어가 2천만원의 중간 성격을 끝내 못 본다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "oral_conversion_question",
          "present_if_lawful:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_wedding_schedule",
          "motive_search": "nonjudgmental_question_about_wedding_schedule"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "co_owner_condition_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_bank_penalty_burden",
          "motive_search": "nonjudgmental_question_about_bank_penalty_burden"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "transfer_memo_question",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "new_tenant_showing_question",
          "evidence_present:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "prior_notice_specific_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_settlement_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "draft_completion_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "emotion",
        "deeperReveal": "다은은 결혼 일정 때문에 “확정”을 듣고 싶어 했고, 성호는 공동명의와 대출비가 정리되기 전엔 언제든 물러날 수 있다고 생각해 같은 말에 서로 다른 확정도를 실었다.",
        "unlockHint": "empathy_approach + e-1 또는 e-6 제시 후",
        "impactDisputes": [
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저희는 전세 전환이 거의 된 줄 알고 결혼 일정과 돈 계획을 그 위에 얹어 두고 있었어요. 다은이 2천만원을 보낼 때도 '이미 확정'이라는 표정이었습니다.",
        "그래서 그 돈을 단순 송금으로 보지 않았어요. 둘이 함께 마련한 돈이었는데, 공동명의 서명과 중도상환수수료 문제가 아직 안 풀린 상태였다는 걸 다은이 정확히 알고 있었는지는 모르겠어요."
      ],
      "tp-2": [
        "제가 두 분 통화를 들을 때마다 '거의 맞춰졌다'는 말이 반복됐습니다. 문제는 다은에겐 합의 직전, 성호에겐 아직 조율 중이라는 뜻이었다는 거예요. 같은 말을 정반대로 이해하고 있었습니다.",
        "초안 계약서가 오가긴 했지만 최종 금액, 시작일, 공동명의 서명이 빠져 있어서 완성된 전세 전환으로 보기 어려웠습니다. 핵심 조건이 열려 있는 상태에서 돈이 먼저 움직인 거예요."
      ],
      "tp-3": [
        "서류가 닫히지 않으면 들어온 돈의 성격도 확정되지 않습니다. 2천만원이 확정된 전세금 일부인지, 협의금인지가 종이 위에서 정리되지 않았어요.",
        "성호는 협의 결렬을 분명히 말하기 전에 다른 임차인에게 집을 보여줬고, 다은은 전환 확정으로 믿고 월세를 안 냈습니다. 양쪽 다 확인보다 자기 쪽 해석을 먼저 밀고 나간 겁니다."
      ]
    }
  },
  "tenant-05": {
    "personalityTags": {
      "a": [
        "confrontational",
        "trust_broken",
        "counter_attack",
        "privacy_sensitive"
      ],
      "b": [
        "victim_identity",
        "manipulative",
        "selective_quote",
        "retaliation_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "role_failure",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-2": [
        "hard_evidence_available",
        "privacy",
        "misleading_soft_evidence",
        "role_failure"
      ],
      "d-3": [
        "financial",
        "hard_evidence_available",
        "privacy",
        "role_failure"
      ],
      "d-4": [
        "hard_evidence_available",
        "secret_keeping",
        "privacy",
        "misleading_soft_evidence"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "privacy",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "선우를 곧바로 '문제 세입자'로 부르지 않겠다는 안전판을 먼저 깔아야, 민재가 입주 예정자와 건물 대화방에서 어디까지 말을 퍼뜨렸는지 체면 방어 없이 끌어낼 수 있다.",
        "worstActionReaction": "민재가 한 비방 표현만 정면으로 읽어 주면 그는 곧바로 2년 전 옥상 민원을 길게 끌어와 지금 소문을 정당한 경고처럼 포장한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "복도 CCTV와 도어락 출입기록, 조카 문자, 사다리 대여 영수증을 한 줄로 맞추면 장롱문과 걸레받이 손상이 선우 퇴거 뒤에 생겼다는 시간이 명확해진다.",
        "worstActionReaction": "새 세입자 보여주느라 바빴다는 사정만 받아 주면 민재는 퇴거 전 손상과 퇴거 후 작업 흠집을 계속 한 덩어리로 섞어 버린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "선우에게 왜 출입카드 1장과 소액 처리비를 바로 말하지 못했는지, 보증금에서 더 깎일까 봐 미뤘던 계산을 꺼내게 해야 작은 누락의 맥락이 보인다.",
        "worstActionReaction": "카드 값과 음식물 처리비 액수만 따지면 선우는 '나중에 낼 생각이었다'를 되풀이하며 왜 숨겼는지는 끝까지 안 밝힌다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.3,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "과거 옥상 민원을 현재 비방과 분리해 다룬다고 약속해야, 1회 경고 후 종결 메모가 이번 '반복 문제 세입자' 프레임과 다른 사건이라는 점을 차분히 확인할 수 있다.",
        "worstActionReaction": "예전에 옥상에서 무슨 일이 있었는지부터 캐묻기만 하면 두 사람 모두 오래된 불쾌감에 빨려 들어가 지금 소문 퍼뜨린 행위는 희미해진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.18,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "퇴거 점검표, 출입카드 재발급 영수증, 선우 퇴거 뒤 사다리 작업 CCTV를 한 번에 보여줘야 실제 공제 가능한 항목과 민재가 덧씌운 금액이 분리된다.",
        "worstActionReaction": "둘의 억울함만 먼저 받아 주면 민재는 새 세입자 계약 불안을, 선우는 모욕감만 붙잡고 보증금 공제 범위 계산을 계속 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "evidence_present:e-6",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "rumor_origin_question",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "old_complaint_scope_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "damage_timing_question",
          "evidence_present:e-4": "e-4_presented",
          "present_if_lawful:e-5": "e-5_presented",
          "confidential_protection": "nonjudgmental_question_about_fast_turnover_pressure",
          "motive_search": "nonjudgmental_question_about_fast_turnover_pressure"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "shared_responsibility_question",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-6",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "separation",
          "empathy_approach"
        ],
        "triggerMapping": {
          "fact_pursuit": "past_smoking_question",
          "confidential_protection": "nonjudgmental_question_about_guest_visit",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "separation": "shared_responsibility_question",
          "empathy_approach": "nonjudgmental_question_about_guest_visit"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "deposit_full_return_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "deduction_item_followup"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "민재는 새 세입자 계약이 흔들릴까 두려워 먼저 선우를 문제 세입자처럼 말해 방어막을 만들었고, 선우는 그 소문을 지우려는 마음이 커질수록 자신의 소액 누락은 더 작게 취급했다.",
        "unlockHint": "motive_search + present_if_lawful:e-2 이후",
        "impactDisputes": [
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저는 이사 마지막까지 같이 있었는데, 장롱문이나 걸레받이가 눈에 띄게 망가진 상태가 아니었습니다. 나중에 '집을 망가뜨리고 갔다'는 말을 들었을 때 의아했어요.",
        "선우가 출입카드 하나를 분실하고 소액 처리비를 미리 알리지 못한 건 사실이에요. 다만 그 정도가 건물 대화방에서 문제 세입자처럼 소문날 일은 아니었습니다."
      ],
      "tp-2": [
        "저는 새 입주 예정자 앞에서 '전 세입자가 실내 흡연도 하고 장롱을 깨뜨렸다'는 말이 나오는 걸 들었는데, 과거 옥상 민원 한 건을 상습 문제처럼 부풀리고 퇴거 후 손상을 전 세입자 탓으로 돌린 느낌이었어요.",
        "집주인이 공실을 빨리 메우고 싶은 마음은 이해합니다. 그래도 확인 절차가 안 끝났는데 이미 '문제 세입자'라는 인상이 건물 안에 퍼지고 있었어요. 과장된 말은 평판 문제로 번집니다."
      ],
      "tp-3": [
        "관리 기록을 보면 선우 퇴거 뒤 민재 측이 사다리와 가구를 옮기며 집 보여주기를 준비한 시간대가 있습니다. 장롱문과 걸레받이 손상이 그때 생겼을 가능성이 높아요.",
        "과거 옥상 흡연 민원은 한 번으로 경고 후 종결됐고 이후 재발 기록이 없습니다. 보증금 공제 항목도 장롱문 전면 교체와 탈취 비용까지 포함돼 있는데, 실제 정산 가능 범위를 넘어섭니다."
      ]
    }
  },
  "tenant-06": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "detail_obsessed",
        "relationship_preserving",
        "privacy_sensitive"
      ],
      "b": [
        "cold_logical",
        "calculated_calm",
        "fairness_obsessed",
        "blame_shifting"
      ]
    },
    "contentTags": {
      "d-1": [
        "hard_evidence_available",
        "role_failure",
        "misleading_soft_evidence",
        "sequence_sensitive"
      ],
      "d-2": [
        "hard_evidence_available",
        "privacy",
        "misleading_soft_evidence",
        "role_failure"
      ],
      "d-3": [
        "privacy",
        "role_failure",
        "promise_violation",
        "hard_evidence_available"
      ],
      "d-4": [
        "hard_evidence_available",
        "secret_keeping",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "misleading_soft_evidence",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "subjective_claim",
      "t-2": "core_fact",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "circumstantial"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.92,
          "evidence_present": 1.2,
          "separation": 1.05,
          "confidential_protection": 1.2
        },
        "bestActionHint": "공용공간 특약 메모, 초기 '편하게 쓰세요' 메시지, 주민센터 상담 확인서를 나란히 두면 옥상·지하 허용이 전용권도 전면 금지도 아닌 제한적 편의였다는 해석이 선다.",
        "worstActionReaction": "둘 다 서운했다는 감정만 먼저 만져 주면 유진은 '전용처럼 허락받았다'고, 기성은 '그냥 호의였다'고 더 극단으로 가 버린다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "유진에게 왜 화분대와 박스를 몇 주씩 안 치웠는지, 결혼 시즌 작업 자재와 보관 압박을 말하게 해야 옥상 상시 적치가 단순 무시인지 사정 섞인 편의인지 드러난다.",
        "worstActionReaction": "통로 폭 몇 센티였는지만 몰아세우면 유진은 '잠깐 둔 거였다'며 사진 여러 장만 넘기고 오래 적치한 이유는 끝내 숨긴다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "비밀번호 변경 문자와 지하 복도 CCTV, 물건 이동 시간표를 같이 대면해야 기성이 안전 명분으로 먼저 잠금을 바꾸고 박스를 옮긴 흐름을 끊기지 않게 볼 수 있다.",
        "worstActionReaction": "기성의 안전 걱정만 먼저 공감하면 그는 무단 잠금 교체를 단순 안내처럼 축소하고, 먼저 손댄 순서는 계속 흐려진다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "소방점검 사진과 관리실 순찰기록, 주민센터 상담 메모를 함께 보면 비상통로와 배수 위험이 즉시 폐쇄 수준이 아니라 일부 정리가 필요한 정도였다는 현실선이 잡힌다.",
        "worstActionReaction": "위험하냐 아니냐만 예·아니오로 몰면 기성은 재난 직전처럼 부풀리고 유진은 전혀 문제 없었다고 줄여서, 실제 위험도가 더 안 보인다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.02,
          "motive_search": 1.07,
          "empathy_approach": 0.82,
          "evidence_present": 1.18,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "비밀번호 변경 뒤 나온 박스 사진, 이동 CCTV, 젖은 포장 상태를 같이 봐야 무단 이동 손상과 유진의 포장 미흡이 어떻게 섞였는지 정산 기준을 세울 수 있다.",
        "worstActionReaction": "속상했다는 마음만 먼저 받아 주면 유진은 '다 망가졌다'고, 기성은 '원래 젖어 있던 짐'이라고 버티며 혼합 책임을 계속 부정한다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "use_scope_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_wedding_season_pressure",
          "motive_search": "nonjudgmental_question_about_wedding_season_pressure"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "duration_followup",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "lock_change_question",
          "evidence_present:e-5": "e-5_presented",
          "evidence_present:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_fire_inspection_fear",
          "motive_search": "nonjudgmental_question_about_fire_inspection_fear"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "responsibility_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "damaged_item_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "covering_condition_followup"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "유진은 “편하게 쓰라”는 말을 작업 시즌을 버티게 해 준 배려로 기억했고, 기성은 그 말을 잠깐 호의였다고 줄여야 공용공간 통제권을 되찾을 수 있다고 느꼈다.",
        "unlockHint": "empathy_approach 또는 separation + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "유진은 꽃자재와 캠핑 장비를 옥상과 지하에 나눠 두고 살았는데, 처음엔 잠깐 쓰는 정도였다가 화분대와 박스가 몇 주씩 남겨지면서 사실상 전용처럼 굳어 간 거예요.",
        "어느 날 옥상 비밀번호가 갑자기 바뀌고 지하 박스가 복도에 나와 있었는데, 유진한테 사전 통보가 없었어요. 자기 물건이 쫓겨난 것처럼 느낄 수밖에 없었습니다."
      ],
      "tp-2": [
        "처음 입주 때 설명한 건 '편하게 써도 된다'가 아니라 공용공간을 잠깐 나눠 쓰되 지하 왼쪽 선반 한 칸만 계절 물품에 쓰자는 취지였습니다. 전용 사용권을 준 적은 없어요.",
        "집주인이 비밀번호를 바꾸고 박스를 옮긴 건 사전 합의 없이 너무 급했습니다. 그렇다고 통로를 좁히고 배수구를 가릴 정도로 물건을 쌓아 둔 것도 처음 약속을 넘은 거예요."
      ],
      "tp-3": [
        "점검 사진을 보면 통로 폭이 줄고 배수구 주변이 일부 가려진 건 맞지만 즉시 위험이라고 할 정도는 아니었습니다. 정리와 합의가 필요한 경고 단계에 가까웠어요.",
        "유진이 말한 '전혀 문제없는 사용'도, 기성이 말한 '즉시 전면 금지 수준의 위반'도 양쪽 다 과장이라고 봅니다. 실제 상태는 일부 정리가 필요한 중간 수준이었습니다."
      ]
    }
  },
  "tenant-07": {
    "personalityTags": {
      "a": [
        "relationship_preserving",
        "detail_obsessed",
        "fairness_obsessed",
        "privacy_sensitive"
      ],
      "b": [
        "victim_identity",
        "blame_shifting",
        "martyr_complex",
        "face_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "promise_violation",
        "hard_evidence_available",
        "sequence_sensitive",
        "third_party_risk"
      ],
      "d-2": [
        "promise_violation",
        "hard_evidence_available",
        "misleading_soft_evidence",
        "privacy"
      ],
      "d-3": [
        "hard_evidence_available",
        "promise_violation",
        "sequence_sensitive",
        "third_party_risk"
      ],
      "d-4": [
        "hard_evidence_available",
        "secret_keeping",
        "role_failure"
      ],
      "d-5": [
        "hard_evidence_available",
        "role_failure",
        "promise_violation",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "circumstantial",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.05
        },
        "bestActionHint": "남서희가 있는 3자 카톡과 e-5 상담 일정표를 같이 붙이면, 도형·하나가 이미 '4%·2년' 문구까지 정리해 둔 뒤였다는 순서가 드러나서 '그냥 가능성만 타진했다'는 말이 설 자리가 줄어든다.",
        "worstActionReaction": "도형의 세금 부담부터 달래 주면 그는 곧 '시세가 너무 뛰었다'는 시장 서사로 숨어 버리고, 중개사 앞에서 먼저 끝내 둔 4% 합의 자체를 흐린다."
      },
      "d-2": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 1,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "진우 이름과 새 문의 내용을 공개 망신용으로 쓰지 않겠다는 안전감을 먼저 주어야, 도형도 그 문의가 예약금 없는 탐색 수준이었다는 점을 가족 체면 덜 다친 채 말할 수 있다.",
        "worstActionReaction": "'그래서 확정 계약이었냐 아니냐'만 몰아붙이면 도형은 '요즘 시장이 다 그렇다'며 단어 싸움으로 버티고, 진우가 부풀린 기대치 문제는 더 숨긴다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "하나에게 사흘 지연 자체보다 왜 서명을 늦췄는지 묻게 되면, 보증인 상담과 자동이체 날짜 조정 때문에 미뤘다는 현실 사정이 나와서 악의적 버티기 프레임이 약해진다.",
        "worstActionReaction": "메일 발송 시각만 캐묻기 시작하면 하나는 캡처 시간표만 끝없이 늘어놓고, 도형도 그 사흘을 핑계로 12% 인상 번복을 정당화한다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.72,
          "motive_search": 1.07,
          "empathy_approach": 1.18,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "자전거·분리배출 경고를 이번 재계약의 낙인 자료로 쓰지 않겠다고 선을 그어야, 하나도 한 번 있었던 경고를 숨기지 않고 도형도 '반복 문제'라는 과장을 조금 거둘 수 있다.",
        "worstActionReaction": "2년 전 관리기록 문장만 들이대면 하나는 '전혀 없었다'로 버티고 도형은 '원래 그런 세입자'로 부풀려, 현재 효력 판단보다 옛 민원 싸움만 커진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "갱신 초안, 3자 카톡, 12% 인상 문자와 주차비·도배 선납 요구를 한 줄로 놓으면 도형이 기존 4% 흐름 뒤에 새 조건을 얹었다는 일방 변경 구조가 눈에 보인다.",
        "worstActionReaction": "도형이 봐준 것 많다는 하소연을 먼저 받아 주면 그는 과거 경고와 시세 상승을 한데 묶어 버리고, 추가 조건이 합의 이후에 튀어나왔다는 핵심 순서를 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "prior_agreement_question",
          "present_if_lawful:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "signature_status_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-6",
          "present_if_lawful:e-4"
        ],
        "bonusActions": [
          "motive_search",
          "empathy_approach"
        ],
        "triggerMapping": {
          "fact_pursuit": "market_offer_question",
          "confidential_protection": "nonjudgmental_question_about_son_pressure",
          "evidence_present:e-6": "e-6_presented",
          "present_if_lawful:e-4": "e-4_presented",
          "motive_search": "nonjudgmental_question_about_son_pressure",
          "empathy_approach": "nonjudgmental_question_about_son_pressure"
        },
        "pathBonus": 10
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-1"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "guarantor_consult_followup",
          "evidence_present:e-1": "e-1_presented"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_complaint_question",
          "confidential_protection": "nonjudgmental_question_about_embarrassment",
          "evidence_present:e-3": "e-3_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "nonjudgmental_question_about_embarrassment"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-5",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "rent_increase_question",
          "present_if_lawful:e-5": "e-5_presented",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "additional_condition_followup"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "motive",
        "deeperReveal": "도형은 4% 합의를 뒤집는 순간 시세를 못 읽는 집주인처럼 보일까 두려워 과거 경고와 새 문의를 한 덩어리 명분으로 묶었고, 하나는 쫓겨날까 봐 서류 지연 책임을 끝까지 축소했다.",
        "unlockHint": "motive_search + present_if_lawful:e-2 이후",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "저는 진우가 전한 새 임차인 문의가 예약금도 확정 의사도 없는 탐색 수준이었다고 알고 있습니다. 그런데 그 문의가 중개사 입회까지 한 4% 합의를 뒤집을 만큼 확실한 대안이었는지는 의문이에요.",
        "특히 이미 4% 인상으로 정리된 뒤에 12%로 조건이 뛰는 순간, 주변에서도 '이건 시세 판단이 아니라 마음이 바뀐 것'이라는 말이 나왔습니다."
      ],
      "tp-2": [
        "중개사 사무실에서 본 건, 4% 인상과 2년 재계약까지 정리됐고 서명과 자동이체 날짜만 남은 수준이었다는 점입니다. 뒤집힐 여지가 이렇게 남아 있다고는 생각 못 했어요.",
        "그런데 나중에 12% 인상, 주차비 별도, 부분 도배 선납 조건이 붙어서 돌아왔습니다. 처음 합의와 결이 완전히 달라졌어요. 새 문의가 들어온 뒤 갑자기 조건을 올린 거예요."
      ],
      "tp-3": [
        "이 건이 단순 시세 다툼이 아니라, 중개사 입회 아래 방향까지 정리된 합의가 뒤집힌 사안이라고 봅니다. 서명만 남은 단계에서 조건이 세 배로 뛴 거예요.",
        "또 2년 전 복도 자전거와 분리배출 경고를 다시 꺼낸 시점이 번복 직후라는 점도 중요합니다. 한 번 있었지만 반복 문제는 아니었거든요. 과거 문제가 아니라 현재 협상 압박용으로 소환된 겁니다."
      ]
    }
  },
  "tenant-08": {
    "personalityTags": {
      "a": [
        "confrontational",
        "counter_attack",
        "authority_challenging",
        "selective_quote"
      ],
      "b": [
        "selective_quote",
        "detail_obsessed",
        "manipulative",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "misleading_soft_evidence",
        "privacy",
        "financial",
        "role_failure"
      ],
      "d-2": [
        "hard_evidence_available",
        "career",
        "third_party_risk",
        "role_failure"
      ],
      "d-3": [
        "financial",
        "hard_evidence_available",
        "role_failure",
        "career"
      ],
      "d-4": [
        "financial",
        "role_failure",
        "promise_violation",
        "career"
      ],
      "d-5": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "secret_keeping"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "circumstantial",
      "t-3": "core_fact",
      "t-4": "core_fact",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "한미라의 원본 고지 양식과 호준이 보낸 캡처 PDF를 파일 메타데이터까지 맞대면, '실무상 다시 만든 것'이 아니라 합계와 항목 순서를 손댄 재작성본이라는 점이 바로 드러난다.",
        "worstActionReaction": "공실 손실과 회계 고생을 먼저 이해해 주면 호준은 '양식만 정리했다'는 말로 뒤로 빠지고, 원본 부재와 편집 흔적이라는 핵심 검증이 늦어진다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "지현에게 왜 인정분도 따로 안 내고 전액을 막았는지부터 묻는 게 좋다. 재택 장비 사용이 드러나면 '진상 세입자'로 찍힐까 두려웠다는 계산이 나오면서 자기 사용분 은폐가 함께 보인다.",
        "worstActionReaction": "킬로와트 수치만 세게 추궁하면 지현은 곧 조작된 관리비표 모순만 들이밀고, 자기 PC·제습기 사용이 늘었다는 불편한 부분은 끝까지 뒤로 미룬다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.9,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 1.18,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "'횡령 집주인' 낙인이 아니라 배분 기준만 보겠다고 못 박아야, 호준도 빈 1층 상가 전기료와 옥상 누수 출장비를 공용비에 섞어 세대별로 돌렸던 과정을 체면 덜 상한 채 인정할 여지가 생긴다.",
        "worstActionReaction": "숫자 한 칸씩만 따지면 호준은 건물 전체 유지비 논리로 넓혀 버리고, 공실 상가 비용이 왜 지현 세대 고지서 안으로 들어왔는지 배분 원리는 더 숨는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "자동이체 내역, 독촉 문자, 원본 요구 메시지를 함께 놓으면 지현이 억울하다고 느낀 이유와 별개로 두 달치 전액을 막았다는 사실이 또렷해져서 최소 인정분 미납을 피하기 어렵다.",
        "worstActionReaction": "지현이 속을 만했다고 먼저 감싸 주면 그는 곧 '원본도 안 주는데 왜 내냐'로만 밀어붙이고, 두 달 전액 보류라는 자기 선택은 정당한 항의처럼만 남는다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "도장 합성과 파일 생성기록 문제를 곧바로 범죄 딱지로 덮지 않고 설명 기회를 주면, 호준도 공식 관리실 고지처럼 보이게 꾸미려 했다는 지점을 '양식 편집' 뒤에만 숨기기 어려워진다.",
        "worstActionReaction": "도장 이미지가 맞냐 아니냐만 몰아치면 호준은 '예전 파일을 붙여 넣은 것뿐'이라며 템플릿 이야기로 빠지고, 왜 굳이 공식 문서처럼 꾸몄는지는 끝내 안 나온다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "original_statement_question",
          "evidence_present:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "motive_search": "source_file_question"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-3"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "overnight_render_followup",
          "evidence_present:e-3": "e-3_presented"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "present_if_lawful:e-6",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "common_charge_question",
          "confidential_protection": "nonjudgmental_question_about_work_equipment",
          "present_if_lawful:e-6": "e-6_presented",
          "evidence_present:e-3": "e-3_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "nonjudgmental_question_about_work_equipment"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "full_withhold_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "undisputed_portion_followup"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-6",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "confidential_protection": "office_stamp_question",
          "present_if_lawful:e-6": "e-6_presented",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "accountant_reference"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "motive",
        "deeperReveal": "호준은 공실 손실과 누수 비용을 세대별로 깔끔하게 나누지 못한 허점을 감추려 “실무상 다시 만든 표”라는 표현에 매달렸고, 지현은 조작을 눈치챈 뒤 자기 실사용 증가분까지 한꺼번에 방어하기 시작했다.",
        "unlockHint": "fact_pursuit + e-5 제시 후 motive_search",
        "impactDisputes": [
          "d-3",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "지현 방에는 그래픽 작업용 PC와 듀얼 모니터, 제습기가 돌아가고 있었으니 전기사용이 늘어난 건 사실입니다. 다만 그것만으로 갑자기 뛴 청구 전체를 설명하긴 어려워 보였어요.",
        "게다가 관리대행 원본을 보여 달라는데 자꾸 집주인이 직접 만든 캡처와 편집 PDF만 오니, 지현이 숫자보다 방식에 먼저 화가 난 건 이해됩니다."
      ],
      "tp-2": [
        "저는 관리대행 원본 양식과 집주인이 보낸 캡처를 비교했는데, 최소 두 항목 금액과 합계 순서가 편집돼 있었습니다. 예전 관리실 PDF에서 도장 이미지를 떼어 붙인 흔적도 있었어요.",
        "또 빈 1층 상가 전기료와 옥상 누수 점검비가 공용비에 묶여서 지현 세대 관리비에 배분돼 있었습니다. 전기 사용 문제가 아니라 회계 구조 자체가 뒤섞인 겁니다."
      ],
      "tp-3": [
        "계량 기록만 보면 지현 세대 전기사용이 여름에 오른 구간은 맞습니다. 다만 같은 시기 공용부도 함께 뛰었고 빈 상가 기본 전기료까지 섞여 있어서, 세대 책임만으로 합계가 안 맞아요.",
        "이번 건은 전기 사용량 자체보다 그 숫자를 어떻게 묶어서 보여 줬는지가 더 중요합니다. 관리대행 원본과 집주인이 만든 설명표가 같은 숫자를 말하고 있지 않았어요."
      ]
    }
  },
  "tenant-09": {
    "personalityTags": {
      "a": [
        "denial_heavy",
        "timeline_padding",
        "detail_obsessed",
        "shame_sensitive"
      ],
      "b": [
        "victim_identity",
        "martyr_complex",
        "fairness_obsessed",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "financial",
        "hard_evidence_available",
        "role_failure"
      ],
      "d-2": [
        "financial",
        "hard_evidence_available",
        "secret_keeping",
        "trust_breach"
      ],
      "d-3": [
        "financial",
        "role_failure",
        "promise_violation",
        "hard_evidence_available"
      ],
      "d-4": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "sequence_sensitive",
        "privacy"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "hidden_motive",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "계약서 변경본, 분할 송금 내역, 우석 측 수령증을 한 줄로 대면시키면 8천만원 표기와 실제 태윤 수령액 6천만원 사이의 빈칸이 숫자로 드러나서 감정 호소보다 훨씬 빨리 구조가 무너진다.",
        "worstActionReaction": "폐업 사정이나 공실 걱정만 먼저 받아 주면 세라는 '돌려받을 돈'만, 태윤은 '나도 속은 사람'만 반복해서 결국 2천만원이 어디에 머물렀는지 흐려진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "세라-우석 카톡, 허위 정리비 전표, 우석 측 세금계산서를 붙여 보면 2천만원이 단순 착오가 아니라 큰 보증금 숫자를 유지하려는 공모 구조였다는 점이 한꺼번에 드러난다.",
        "worstActionReaction": "가족 투자금이 걸렸다는 세라의 사정만 먼저 듣고 가면 그는 순수 피해자 자리로 숨어 버리고, 우석과 같이 8천만원 표기를 유지한 동기는 끝까지 안 열린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "태윤에게 왜 다투지 않는 6천만원도 바로 안 돌려줬는지 묻게 되면, 공실 손실과 체면 손해를 한꺼번에 만회하려 공제표를 넓힌 계산이 보여서 단순 착오 지연 변명이 약해진다.",
        "worstActionReaction": "에어컨 세척비, 공실손실 항목 숫자만 따지기 시작하면 태윤은 비용 항목을 끝없이 흩뿌리고, '왜 전체를 붙잡았는가'라는 지연 동기는 끝까지 빠져나간다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 1,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "세라에게 9일 늦은 월세와 간판 철거비를 왜 끝까지 미뤘는지 먼저 묻게 되면, 폐업 자금 압박과 전액 반환 프레임을 지키려던 계산이 드러나서 사소한 누락으로만 축소하기 어렵다.",
        "worstActionReaction": "며칠 늦었는지, 얼마였는지만 따지면 세라는 송금 메모와 파일명으로 버티면서 자기 미정산을 '별것 아닌 말단 비용'처럼 눙치고 넘어간다."
      },
      "d-5": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.3,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.3
        },
        "bestActionHint": "'허술한 건물주'로 몰기 위한 질문이 아니라 확인 절차를 보겠다고 해야, 태윤도 최종 출력본과 실제 입금 내역을 직접 맞춰 보지 않고 우석 말만 믿고 서명 넘긴 실수를 비교적 빨리 인정한다.",
        "worstActionReaction": "도장 찍은 시점과 서명 순서만 캐묻기 시작하면 태윤은 또 '중개사가 날 속였다'는 피해 서사로 되돌아가고, 자기 확인 소홀은 그림자처럼 뒤로 숨는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "actual_deposit_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "separation": "responsibility_question",
          "motive_search": "why_broker_account_followup"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "collusion_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "policy_fund_motive_followup"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "motive_search",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "refund_delay_question",
          "motive_search": "uncontested_amount_followup",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection",
          "empathy_approach"
        ],
        "triggerMapping": {
          "motive_search": "nonjudgmental_question_about_store_closing_pressure",
          "evidence_present:e-6": "e-6_presented",
          "confidential_protection": "nonjudgmental_question_about_store_closing_pressure",
          "empathy_approach": "nonjudgmental_question_about_store_closing_pressure"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "confidential_protection",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "confidential_protection": "nonjudgmental_question_about_busy_signing_day",
          "present_if_lawful:e-5": "e-5_presented",
          "empathy_approach": "nonjudgmental_question_about_busy_signing_day"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-2": {
        "category": "motive",
        "deeperReveal": "세라는 정책자금과 폐업 정산을 버티려면 계약서상 큰 보증금이 필요했고, 태윤은 서명 직전 실제 입금과 계약금이 어긋나도 중개사가 정리해 줄 거라는 안일함에 기대어 멈춰 세우지 않았다.",
        "unlockHint": "evidence_present:e-2 + motive_search",
        "impactDisputes": [
          "d-1",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "세라는 정책자금 상담을 받고 온 뒤부터 계약서에 적힌 보증금 숫자를 유난히 중요하게 여겼습니다. 실제 낸 돈과 서류에 적힌 돈이 다르다는 걸 처음부터 알고 있는 느낌이었어요.",
        "다만 저는 세라가 일부러 사기를 쳤다기보다, 가게를 무리하게라도 시작하려는 마음이 커서 판단이 흐려진 쪽에 가깝다고 봅니다. 8천만원 계약서가 유리했던 시기가 분명 있었거든요."
      ],
      "tp-2": [
        "계약서에 8천만원으로 적었지만 실제 태윤에게 간 돈은 6천만원이었습니다. 나머지 2천만원은 '정리비·컨설팅비' 명목으로 저 쪽 계좌에 남았어요.",
        "그 구조를 만든 책임이 건물주 한쪽에만 있다고 할 수 없습니다. 세라와 제가 실제보다 큰 보증금이 서류에 남도록 유지한 건, 서로에게 이익이 되는 부분이 있었기 때문입니다."
      ],
      "tp-3": [
        "계약서 금액과 실제 이체 내역이 맞지 않으면 심사가 바로 멈춥니다. 8천만원 계약서에 6천만원만 입금된 이 건은 처음부터 구조가 매끄럽지 않았어요.",
        "또 태윤이 다투지 않는 6천만원 부분도 5주 넘게 반환하지 않고 공실손실과 에어컨 세척비를 크게 잡아 공제를 늘린 점도 문제입니다. 양쪽 다 정산에서 자기 유리한 방향으로 움직였습니다."
      ]
    }
  },
  "tenant-10": {
    "personalityTags": {
      "a": [
        "avoidant",
        "relationship_preserving",
        "privacy_sensitive",
        "shame_sensitive"
      ],
      "b": [
        "avoidant",
        "selective_quote",
        "face_sensitive",
        "fairness_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "sequence_sensitive",
        "promise_violation",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ],
      "d-2": [
        "promise_violation",
        "sequence_sensitive",
        "third_party_risk",
        "privacy"
      ],
      "d-3": [
        "financial",
        "hard_evidence_available",
        "role_failure",
        "promise_violation"
      ],
      "d-4": [
        "hard_evidence_available",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "hard_evidence_available",
        "third_party_risk",
        "role_failure"
      ]
    },
    "truthCategory": {
      "t-1": "emotional_context",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "circumstantial",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.77,
          "motive_search": 1.07,
          "empathy_approach": 1.18,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "민주를 '문제 세입자', 상훈을 '반려동물 혐오 집주인'으로 고정하지 않겠다는 전제를 먼저 깔아야 둘 다 특약 문구가 자동 금지도 자동 승인도 아니었다는 애매한 중간지대를 말할 수 있다.",
        "worstActionReaction": "조항 문구만 칼같이 읽어 버리면 민주는 브로커 말을 허락처럼 붙잡고, 상훈은 '원칙상 안 된다'만 반복해서 실제로 남겨 둔 조정 여지가 사라진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "브로커 단톡, 강아지 사진 전송 기록, 상훈의 문자 회신을 한 화면에서 보면 민주가 사전 고지는 했지만 명확한 승인 전 입주했다는 반쪽 사실이 동시에 드러난다.",
        "worstActionReaction": "민주의 애견 사정만 먼저 받아 주면 그는 사진을 보냈다는 부분만 강조하고, '명확한 예스 없이 들어왔다'는 가장 아픈 구멍은 끝까지 미룬다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "계약 특약, 상훈의 24시간 반출 문자, 50만원 특별청소 예치금 요구, 현관 상태 사진을 같이 놓아야 즉시 반출과 선예치금이 실제 확인된 하자보다 훨씬 앞서 나간 조치였다는 점이 보인다.",
        "worstActionReaction": "다른 세입자 알레르기나 건물 규칙 걱정부터 공감해 버리면 상훈은 예치금을 예방조치처럼 포장하고, 계약을 넘어선 요구였다는 쟁점이 희미해진다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.1
        },
        "bestActionHint": "몇 번 짖었는지보다 왜 그 짧은 짖음이 이렇게 큰 싸움으로 번졌는지 묻게 되면, 민주의 '진상 세입자' 공포와 상훈의 '한 번 봐주면 끝' 불안이 동시에 드러나 과장된 민원 프레임이 흔들린다.",
        "worstActionReaction": "초인종 때 두 번인지 세 번인지 숫자만 세기 시작하면 둘 다 각자 유리한 장면만 꺼내고, 반복 민원급이 아니었다는 전체 맥락은 사라진다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "상훈에게 왜 현관매트 오염 정도에서 곧바로 전문 탈취 청소와 바닥보수 선공제를 떠올렸는지 묻게 되면, 실제 손상보다 '반려견 선례를 남기기 싫다'는 계산이 앞섰다는 점이 드러난다.",
        "worstActionReaction": "견적서 숫자와 오염 사진만 맞대면 상훈은 '원칙상 선공제'를 반복하고 민주는 '냄새도 없다'는 말싸움으로 버텨서, 왜 과잉 조치가 나왔는지는 끝내 안 보인다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-1",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "motive_search",
          "empathy_approach"
        ],
        "triggerMapping": {
          "fact_pursuit": "clause_meaning_question",
          "confidential_protection": "nonjudgmental_question_about_previous_pet_complaint",
          "evidence_present:e-1": "e-1_presented",
          "present_if_lawful:e-5": "e-5_presented",
          "motive_search": "message_interpretation_followup",
          "empathy_approach": "nonjudgmental_question_about_previous_pet_complaint"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "explicit_approval_question",
          "present_if_lawful:e-5": "e-5_presented",
          "confidential_protection": "nonjudgmental_question_about_move_in_pressure",
          "motive_search": "nonjudgmental_question_about_move_in_pressure"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "removal_order_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "special_cleaning_fee_followup"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "motive_search",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "barking_question",
          "motive_search": "delivery_time_followup",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "motive_search",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "damage_scope_question",
          "motive_search": "odor_repair_followup",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "emotion",
        "deeperReveal": "민주는 반려견 때문에 또 집을 못 구할까 봐 애매한 답을 사실상 허락으로 붙잡았고, 상훈은 한 번 예외를 인정한 집주인으로 보일까 걱정해 나중에 금지 쪽 의미만 키웠다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "민주는 입주 전 브로커한테 3.2kg 말티즈 사진까지 보내면서 '정말 괜찮냐'고 확인했습니다. 몰래 들인 게 아니라, '사진 봤다'는 애매한 답을 허락으로 받아들이고 들어간 쪽이에요.",
        "그래서 저는 이 갈등이 처음부터 속이려 한 사람 때문에 생긴 건 아니라고 봅니다. 집주인이 확실히 '관리만 잘 해라'라고 했는지, '아직 보류'라고 했는지가 명확하지 않았던 게 문제였어요."
      ],
      "tp-2": [
        "저는 민주가 사진을 보낸 건 확인했습니다. 문제는 돌아온 답이 반려동물 제한 특약을 덮을 만큼 명확한 승인이 아니었다는 거예요. 브로커가 '소형견이면 괜찮을 거다'라고 느슨하게 전달한 측면도 있고요.",
        "그 모호함이 이번 다툼의 씨앗입니다. 민주는 '관리만 잘하면 된다'로 들었고, 상훈은 '아직 허락한 적 없다'는 마음이었으니까요. 불편한 말을 미뤄서 양쪽 다 다른 걸 믿게 된 거예요."
      ],
      "tp-3": [
        "관리실 기록을 보면 강아지 소음은 택배와 초인종에 짧게 짖은 두세 번 수준이었고, 반복 민원이나 공용부 오염이 누적된 기록은 없었습니다.",
        "현 시점 사진과 관리실 확인으로 보면, 전문 탈취 청소나 바닥보수를 선공제할 정도의 손상은 없었습니다. 즉시 반출이나 특별청소 예치금 요구는 확인된 피해 범위를 넘어섭니다."
      ]
    }
  },
  "tenant-11": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "selective_quote",
        "martyr_complex",
        "timeline_padding"
      ],
      "b": [
        "manipulative",
        "blame_shifting",
        "detail_obsessed",
        "fairness_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "hard_evidence_available",
        "sequence_sensitive",
        "privacy"
      ],
      "d-2": [
        "privacy",
        "role_failure",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-3": [
        "privacy",
        "financial",
        "hard_evidence_available",
        "misleading_soft_evidence"
      ],
      "d-4": [
        "privacy",
        "misleading_soft_evidence",
        "role_failure"
      ],
      "d-5": [
        "financial",
        "privacy",
        "role_failure",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.72,
          "motive_search": 1.07,
          "empathy_approach": 1.18,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.3
        },
        "bestActionHint": "나래를 '무단 개조 세입자', 성필을 '공짜 리뉴얼만 챙긴 집주인'으로 몰지 않겠다고 전제해야, 처음 허락이 페인트·조명 같은 되돌릴 수 있는 수준이었다는 선이 비교적 솔직하게 나온다.",
        "worstActionReaction": "'손봐도 된다'는 한 문장만 붙잡고 늘어지면 나래는 분위기 개선을 허락으로 넓히고, 성필은 모든 변경을 금지였던 것처럼 줄여 말해서 허용 범위가 더 흐려진다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "입주·퇴거 사진, 시공업체 톡, 앵커와 배선 흔적을 같이 보면 붙박이장 문과 상부장 철거가 단순 꾸미기를 넘은 구조 변경이었다는 점이 말보다 먼저 선명해진다.",
        "worstActionReaction": "나래가 쓴 돈과 수고만 먼저 받아 주면 그는 계속 '집을 살렸다'는 결과를 말하고, 실제로 무엇을 뜯고 배선을 건드렸는지는 뒤로 숨긴다."
      },
      "d-3": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.2
        },
        "bestActionHint": "430만원 전체를 두고 바로 부풀리기라고 몰지 말고 고정 개선비와 개인 소품비를 나눠 보겠다고 해야, 나래도 이동식 거울장·지인 인건비가 섞였다는 지점을 방어 덜 한 채 꺼낼 수 있다.",
        "worstActionReaction": "총액만 깎아치면 나래는 영수증 더미를 빠르게 쌓아 인상액으로 승부하고, 어떤 비용이 실제 임대공간 가치 상승인지 분리가 더 어려워진다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "성필에게 왜 나래가 만든 조명·페인트 사진을 '집주인 감성 리뉴얼'로 내보냈는지 묻게 되면, 공실을 빨리 메우려 세입자 기여를 자기 개선처럼 포장한 계산이 튀어나온다.",
        "worstActionReaction": "모집글 문구 몇 단어만 파고들면 성필은 곧 원상복구 규칙으로 도망가고, 개선 성과를 광고엔 쓰면서 정산에선 0으로 친 이중 태도는 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1
        },
        "bestActionHint": "전면복구 480만원 견적과 부분복구 견적, 퇴거 사진을 한 번에 대조해야 붙박이장 문 복구 수준인지 전체 재도장·타일까지 갈 문제인지 과잉 청구 여부가 분명해진다.",
        "worstActionReaction": "성필의 안전 우려와 새 임차인 일정부터 받아 주면 그는 모든 흔적을 전면 철거 사유로 넓혀 버리고, 실제 필요한 부분복구 범위 검증은 뒤로 밀린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-1",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "approval_scope_question",
          "confidential_protection": "nonjudgmental_question_about_old_leak_condition",
          "evidence_present:e-1": "e-1_presented",
          "present_if_lawful:e-5": "e-5_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "contract_clause_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "structure_change_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-2": "e-2_presented",
          "confidential_protection": "nonjudgmental_question_about_leak_repair_stress",
          "motive_search": "nonjudgmental_question_about_leak_repair_stress"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-3",
          "present_if_lawful:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "improvement_cost_question",
          "confidential_protection": "improvement_cost_question",
          "evidence_present:e-3": "e-3_presented",
          "present_if_lawful:e-4": "e-4_presented",
          "motive_search": "movable_furniture_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "broker_caption_followup",
          "present_if_lawful:e-5": "e-5_presented"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "full_restoration_question",
          "evidence_present:e-6": "e-6_presented",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "kept_items_followup"
        },
        "pathBonus": 10
      }
    },
    "narrativeExpansion": {
      "d-2": {
        "category": "motive",
        "deeperReveal": "나래는 낡은 집을 손본 공을 인정받고 싶을수록 “꾸민 것”과 “구조를 바꾼 것”의 선을 자기에게 유리하게 다시 그었고, 성필은 그 결과물을 새 임차인 모집에 쓰면서도 공로 문제는 끝까지 계약 문구 뒤로 숨겼다.",
        "unlockHint": "motive_search + e-2 또는 e-5 제시 후",
        "impactDisputes": [
          "d-3",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "처음엔 누수 자국을 덮는 페인트와 조명 교체 정도였어요. 그런데 어느 순간부터 붙박이장 문을 떼고 화장대 상부장까지 바꾸기 시작해서, '이건 집주인이 허용한 선을 넘는다'고 느꼈습니다.",
        "세입자가 제시한 개선비에는 이동식 거울장, 촬영용 소품, 지인 인건비까지 섞여 있었거든요. 전부를 집 가치를 올린 비용이라고 주장하기엔 무리가 있어요."
      ],
      "tp-2": [
        "집주인이 허용한 건 도배·페인트, 탈착 가능한 조명, 이동식 수납 설치 정도였습니다. 붙박이장 문 두 짝과 상부장 철거까지 포함된다고 보기 어렵다고 생각해요.",
        "다만 퇴거 뒤 집주인이 새 임차인 모집글에서 나래가 설치한 조명과 페인트 사진을 '감성 리뉴얼 완료'라고 홍보한 것도 봤습니다. 기여를 가져다 쓰면서 원상복구비를 청구하는 건 일관되지 않아요."
      ],
      "tp-3": [
        "현장을 보면 페인트·조명 교체와는 다른 수준의 작업이 들어갔습니다. 붙박이장 문을 떼고 고정 선반 앵커와 전동 조명 배선을 추가한 건 구조 변경에 해당해요.",
        "전면 원상복구 청구 금액은 과도하다고 봅니다. 실제 정산 가능 범위는 붙박이장 문 복구, 상부장 패널 복원, 일부 앵커 자국 보수 수준입니다. 전면 철거와 전체 재도장까지 요구하는 건 범위를 넘어요."
      ]
    }
  },
  "tenant-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "counter_attack",
        "grudge_holding",
        "privacy_sensitive"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "blame_shifting",
        "shame_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "misleading_soft_evidence",
        "privacy",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-2": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "reputation_risk",
        "sequence_sensitive"
      ],
      "d-3": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-4": [
        "hard_evidence_available",
        "privacy",
        "secret_keeping",
        "trust_breach"
      ],
      "d-5": [
        "privacy",
        "misleading_soft_evidence",
        "hard_evidence_available",
        "promise_violation"
      ]
    },
    "truthCategory": {
      "t-1": "circumstantial",
      "t-2": "emotional_context",
      "t-3": "core_fact",
      "t-4": "circumstantial",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.85,
          "evidence_present": 1.3,
          "separation": 1.05,
          "confidential_protection": 1.15
        },
        "bestActionHint": "미령 음성메모, 이웃 사이드챗, 루머 전파 시간표를 같이 펼치면 '경수가 직접 문제 세입자라고 퍼뜨렸다'는 직선 서사가 끊기고, 애매한 발언이 재전달되며 굳어진 과정이 보인다.",
        "worstActionReaction": "소담이 느낀 수치심만 먼저 달래면 그는 곧 '집주인이 날 찍었다'는 결론으로 되돌아가고, 실제 발화 경로와 중간 전달자들이 전부 그림자처럼 사라진다."
      },
      "d-2": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.25,
          "empathy_approach": 1,
          "evidence_present": 1,
          "separation": 1.05,
          "confidential_protection": 1.25
        },
        "bestActionHint": "미령에게 왜 하필 '조용히 보고 있다'는 표현을 썼는지 묻게 되면, 민원을 잠재우려다 애매한 말을 던진 의도와 그 말이 낙인처럼 들린 이유가 함께 드러난다.",
        "worstActionReaction": "그 문장이 정확히 몇 글자였는지만 몰아붙이면 미령은 표현 수습에만 매달리고, 왜 그런 말이 나왔고 어디서 오해가 커졌는지는 끝내 안 열린다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "소담에게 왜 출처 확인 전에 건물 단톡방 공개 반박으로 갔는지 묻게 되면, 이웃 사이에서 문제 인물로 굳을까 두려워 먼저 판을 뒤집으려 한 심리가 나와 공개 역비난의 이유가 선명해진다.",
        "worstActionReaction": "캡처 업로드 시각과 댓글 개수만 세면 소담은 더 많은 캡처를 터뜨리며 '그때는 그럴 수밖에 없었다'고만 버텨서, 공개 대응을 선택한 동기는 흐려진다."
      },
      "d-4": {
        "bestAction": "confidential_protection",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.72,
          "motive_search": 1.07,
          "empathy_approach": 1.18,
          "evidence_present": 1.05,
          "separation": 1.05,
          "confidential_protection": 1.28
        },
        "bestActionHint": "소담을 상습 민원 유발자로 박제하지 않겠다고 약속해야, 택배·방문객으로 복도 대화가 길었던 몇 차례와 분리배출 안내 재고지 정도는 있었지만 만성 문제는 아니었다는 기록이 차분하게 나온다.",
        "worstActionReaction": "소음이 몇 번 있었는지 숫자만 캐묻기 시작하면 이웃들 기억이 과장되고, 한두 차례 생활 불편과 '문제 세입자' 낙인 사이의 거리감이 사라진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "미령 업무일지, 경수-미령 문자, 정정문 부재가 남은 시간표를 같이 보여 주면 경수가 소문을 직접 만들지 않았더라도 정정을 늦춰 인상을 굳혔다는 책임을 피하기 어렵다.",
        "worstActionReaction": "경수의 관리인 의존과 건물 평판 걱정부터 이해해 주면 그는 '미령이 알아서 한 말'이라는 뒤로 빠진 설명만 반복하고, 정정 지연이라는 자기 몫은 끝까지 희미해진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-5",
          "present_if_lawful:e-2"
        ],
        "bonusActions": [
          "confidential_protection",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "rumor_source_question",
          "present_if_lawful:e-5": "e-5_presented",
          "present_if_lawful:e-2": "e-2_presented",
          "confidential_protection": "nonjudgmental_question_about_neighbor_stares",
          "motive_search": "nonjudgmental_question_about_neighbor_stares"
        },
        "pathBonus": 10
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "present_if_lawful:e-3"
        ],
        "bonusActions": [
          "confidential_protection",
          "empathy_approach"
        ],
        "triggerMapping": {
          "motive_search": "nonjudgmental_question_about_neighbor_pressure",
          "present_if_lawful:e-3": "e-3_presented",
          "confidential_protection": "nonjudgmental_question_about_neighbor_pressure",
          "empathy_approach": "nonjudgmental_question_about_neighbor_pressure"
        },
        "pathBonus": 6
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "motive_search",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "motive_search": "fact_check_followup",
          "present_if_lawful:e-5": "e-5_presented"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "confidential_protection",
          "evidence_present:e-1",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation",
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "actual_inconvenience_question",
          "confidential_protection": "nonjudgmental_question_about_late_visitors",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question",
          "motive_search": "nonjudgmental_question_about_late_visitors"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "present_if_lawful:e-3",
          "present_if_lawful:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "correction_delay_question",
          "present_if_lawful:e-3": "e-3_presented",
          "present_if_lawful:e-5": "e-5_presented",
          "motive_search": "why_no_notice_followup"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-1": {
        "category": "emotion",
        "deeperReveal": "소담은 한 번 문제 세입자로 찍히면 일상과 재계약이 모두 흔들린다고 느껴 출처 확인보다 공개 반박을 먼저 택했고, 경수는 관리인 말실수를 빨리 바로잡으면 오히려 일이 커질까 봐 정정을 미뤘다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-1 현재 S3 이상",
        "impactDisputes": [
          "d-2",
          "d-3",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "제가 처음 들은 건 '관리실이 4층을 지켜보고 있다' 정도의 막연한 말이었는데, 이웃 사이를 거치면서 '4층 세입자가 문제라서 관리실이 찍어 뒀다'로 바뀌었어요. 낙인이 붙는 속도가 너무 빨랐습니다.",
        "소담이 단톡방에 공개 반박을 올린 것도 가만히 있으면 이름이 먼저 망가지겠다는 공포가 컸기 때문이라고 봅니다. 출처를 다 확인하기 전에 감정이 먼저 터진 거예요."
      ],
      "tp-2": [
        "저는 그때 '4층 분 건은 제가 조용히 보고 있어요'라고만 말한 겁니다. 문제 세입자라고 낙인찍으려던 게 아니라 민원을 달래려고 한 말이었어요.",
        "돌이켜 보면 그 표현이 너무 모호했다는 책임이 있습니다. '조용히 보고 있다'는 말이 이웃들 사이에서 '관리실이 찍어 뒀다'로 바뀌어 돌았으니까요."
      ],
      "tp-3": [
        "민원 기록을 보면 택배 관련 대화가 한두 번 길어지고 분리배출 안내를 다시 받은 적은 있지만, 반복 소음이나 무단투숙 같은 상습 문제는 확인되지 않았습니다.",
        "이번 사건의 핵심이 실제 민원이 아니라 말의 전파 과정이라고 봅니다. 관리인의 모호한 한마디가 이웃 재전달을 거치며 낙인이 됐고, 소담은 출처 확인 전 공개 반박을 올렸고, 경수는 정정을 늦춰서 인상이 굳어졌습니다."
      ]
    }
  },
  "workplace-01": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "blame_shifting",
        "manipulative",
        "face_sensitive"
      ],
      "b": [
        "confrontational",
        "authority_challenging",
        "fairness_obsessed",
        "detail_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "e-1 메일 체인과 주간회의록을 들이대면 '실무 오너=서윤'이 문서로 박혀 있어서, 태성이 말하는 팀장 명의 관행 방패가 바로 얇아진다.",
        "worstActionReaction": "태성에게 공감부터 주면 그는 승진 심사 압박과 '프로세스상' 이야기를 길게 늘어놓으며, 이름을 뺀 결정을 절차 문제로 희석한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "새벽 1시 평가 화면 크롭 캡처와 DM 전송 시각을 먼저 제시하면, 서윤의 '억울해서 확인만 했다'는 말이 열람·공유 행위 자체 앞에서 버티기 어려워진다.",
        "worstActionReaction": "서윤의 억울함만 받아주면 대화가 곧바로 '점수를 누가 깎았느냐'로 새 버리고, 무단 열람과 유포라는 자기 행동은 뒤로 숨는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "조작 의심 PDF를 서버 원본 감사 로그와 해시 비교표로 맞붙이면, 23:48 서윤 명의라는 표면 해석이 공용 PC 토큰 기록 앞에서 바로 무너진다.",
        "worstActionReaction": "감정 위로로 접근하면 둘 다 다시 '그 밤에 누가 나를 몰아붙였나'만 반복하고, 관리자 토큰과 메타 덮어쓰기라는 핵심 기술 사실은 끝내 못 건드린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "HR 버전기록에서 '보고서 오너'가 '보조 분석'으로 줄어든 지점과 태성의 비공개 메모 시각을 함께 보여주면, 그의 개입은 해석이 아니라 입력 흔적으로 남는다.",
        "worstActionReaction": "태성의 관리 부담을 먼저 이해해 주면 그는 '리스크 공유 차원의 캘리브레이션'이었다며, 평가 개입을 보호적 코멘트처럼 다시 포장한다."
      },
      "d-5": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.1,
          "separation": 1.1,
          "confidential_protection": 1
        },
        "bestActionHint": "병기 합의가 언제 있었고 태성의 명의 삭제와 서윤의 새벽 캡처 유포가 각각 어느 순서로 벌어졌는지 좁혀 묻는 게, 쌍방 위반을 감정이 아니라 규칙 위반 두 건으로 분리해 드러낸다.",
        "worstActionReaction": "두 사람의 상처를 나란히 공감하면 한쪽은 '성과를 뺏겼다', 다른 한쪽은 '명예가 훼손됐다'만 세게 말하고, 서로가 깬 약속의 형태는 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "credit_label_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "e-4_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "evaluation_access_question",
          "investigate_only:e-5": "e-5_presented",
          "motive_search": "coworker_share_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "empathy_approach"
        ],
        "triggerMapping": {
          "fact_pursuit": "final_editor_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-3": "e-3_or_e-6_presented",
          "empathy_approach": "nonjudgmental_question_about_shared_pc"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "hr_comment_question",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "responsibility_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "rumor_spread_question",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "태성은 외도나 사생활 문제가 아니라 승진 심사 직전에 \"후배 공로를 지운 관리자\"로 보일까 두려워, 로그 조작 의심까지 불러오는 자료를 내고도 끝까지 절차 언어 뒤에 숨었다.",
        "unlockHint": "empathy_approach 또는 confidential_protection + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "보고서 마감 주간에 팀 전체가 늦은 밤까지 돌아가고 있었습니다. 최종 제출이 한 사람 이름으로 나간 것 자체는 임원 보고 관행상 특이한 일은 아니었어요. 다만 초안을 짠 쪽에서 그걸 어떻게 받아들였을지는 충분히 이해가 갑니다.",
        "승진 심사 직전이라 양쪽 다 예민했던 건 맞습니다. 한쪽만 잘못이라고 보기엔, 명의 문제를 미리 정리할 기회가 여러 번 있었는데 다들 그냥 넘어간 부분이 있어요."
      ],
      "tp-2": [
        "평가 기록을 보면, 처음 버전과 다음 버전 사이에 기여 항목이 눈에 띄게 달라져 있었습니다. 중간에 비공개 코멘트가 하나 들어온 시점이 그 변화와 겹치더라고요.",
        "이의 제기보다 비공개 코멘트가 먼저 시스템에 들어온 순서가 눈에 걸렸습니다. 한쪽이 절차를 밟기도 전에 평가 구조가 이미 움직인 셈이에요."
      ],
      "tp-3": [
        "서버 원본과 제출된 이력을 대조하면, 같은 시간대 수정 기록의 접근 경로가 다릅니다. 일반 편집 패턴과 결이 달라서, 표면 정보만으로 최종 작성자를 단정하기 어렵습니다.",
        "어느 쪽이 더 억울한지는 제 판단 범위가 아닙니다. 다만 제출된 기록 하나만으로 한쪽 책임을 확정하기엔, 이면에 검증할 경로가 더 남아 있습니다."
      ]
    }
  },
  "workplace-02": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "timeline_padding",
        "relationship_preserving",
        "shame_sensitive"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "privacy_sensitive",
        "retaliation_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "financial",
        "career",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-5": [
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "민아 권한이 HR 사건번호보다 52분 먼저 끊긴 이유를 묻고 감사 대응 평판 계산을 파고들면, 규원이 증거보다 '누군가를 먼저 찍어야 했다'는 속내를 숨기기 어려워진다.",
        "worstActionReaction": "접근권 회수 시각만 숫자로 몰아붙이면 규원은 곧장 '감사 직전엔 보안 우선'이라는 공식 문장으로 숨어 버려, 선제 낙인의 의도가 잘 안 잡힌다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "개인 드라이브 업로드 이력과 전 직장 동료 DM을 한 번에 대면시키면, 민아가 말하는 '방어용 보관'이 실제 외부 반출 문장 전송까지 갔다는 점이 선명해진다.",
        "worstActionReaction": "민아의 불안에만 맞춰 주면 그는 '제보자도 아니고 유출자도 아니게 살려고 그랬다'는 자기방어 서사를 키우며, 무단 복사 범위를 계속 기술 용어로 잘라낸다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.1,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.2,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "노지원 노트북 IP의 공유링크 열람 로그, 임시다운로드 토큰, 번역업체 팀즈 메시지를 연쇄로 제시해야 민아보다 두 시간 앞선 진짜 반출 경로가 한 줄로 이어진다.",
        "worstActionReaction": "억울함을 먼저 달래면 민아도 규원도 '누가 나를 희생양 삼았나'에 매달리면서, 정작 선행 시각이 찍힌 노지원 세션 비교는 뒤로 밀린다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "HR 접수 메모의 '보안상 위험 인물' 문구와 '비용 건은 감사 후' 타임스탬프를 보여주면, 규원의 입막음은 뉘앙스가 아니라 기록상 순서 문제로 고정된다.",
        "worstActionReaction": "규원에게 조직 안정을 걱정한 사정부터 묻기 시작하면 그는 지시를 '그런 취지의 조언'으로 낮추며, 선행 낙인 메모의 무게를 흐리려 든다."
      },
      "d-5": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1.1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "공식 조사 전에 왜 팀에는 '민아가 외부랑 붙었다'가 돌았고 단톡에는 왜 '나는 희생양'이 올라왔는지, 각자 무엇을 지키려 했는지 캐묻는 편이 소문전의 계산을 가장 빨리 드러낸다.",
        "worstActionReaction": "누가 먼저 어떤 말을 했는지만 따지면 둘 다 '경고였지 유포는 아니었다', '하소연이었지 선동은 아니었다' 같은 단어 싸움으로 빠져 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "access_suspension_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_only_mina_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "personal_drive_question",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "outside_contact_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "link_timeline_question",
          "evidence_present:e-3": "e-3_or_e-6_presented",
          "evidence_present:e-4": "e-4_presented"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "whistleblower_channel_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "nonpunitive_question_about_audit_pressure"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "rumor_spread_question",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "민아는 자신이 진짜 유출자가 아니라는 억울함보다도, 제보까지 했는데 먼저 잘려 나갈 수 있다는 공포가 더 커져서 외부 상담과 복사를 스스로 정당화했다. 규원 역시 감사 리스크를 덜기 위해 사람을 먼저 지목했다.",
        "unlockHint": "confidential_protection 또는 motive_search + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "감사 착수 직전이라 팀 전체가 보안에 예민한 시기였습니다. 그 상황에서 빠르게 접근을 차단한 건, 당시 분위기를 생각하면 이해가 가는 판단이었어요.",
        "다만 팀 앞에서 징계를 암시하는 발언까지 나온 건 좀 과했다고 느꼈습니다. 성급하긴 했지만, 처음부터 누군가를 밀어내려는 의도였는지는 저도 확신이 없어요."
      ],
      "tp-2": [
        "인사 접수 기록의 순서를 보면, 공식 절차가 열리기도 전에 접근권 회수와 내부 메모가 먼저 처리돼 있었습니다. 순서가 뒤집힌 거예요.",
        "한쪽은 낙인이 두려워 공식 제보를 못 하고, 다른 쪽은 보안 관리 명분으로 그 상황을 덮는 구조가 됐습니다. 둘 다 정상 절차 바깥에서 움직인 거예요."
      ],
      "tp-3": [
        "접속 로그를 추적하면 원본이 외부로 나간 경로가 처음 의심받은 쪽만은 아닙니다. 시간순으로 다른 경로가 먼저 확인됩니다.",
        "소문만으로는 한 사람이 빼돌린 것처럼 보이지만, 로그를 따라가면 경로가 한 갈래가 아닙니다. 생각보다 복잡한 구조입니다."
      ]
    }
  },
  "workplace-03": {
    "personalityTags": {
      "a": [
        "victim_identity",
        "passive_aggressive",
        "relationship_preserving",
        "shame_sensitive"
      ],
      "b": [
        "cold_logical",
        "trust_broken",
        "counter_attack",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available",
        "reputation_risk"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "19초 자동 클립만이 아니라 앞 8초가 잘린 원본 맥락과 CCTV 좌석 정보를 같이 들이밀어야, 도윤의 취중 발언이 얼마나 위험했는지와 동시에 얼마나 모호했는지가 함께 잡힌다.",
        "worstActionReaction": "도윤의 상처를 먼저 달래면 그는 금세 '다들 취해 있었잖아요'라는 집단 면책으로 이동해, 자기 발언의 위험성보다 분위기 탓만 키운다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "07:42부터 08:00까지 이어진 멘토방·동료 DM 순서를 보여주면, 희주의 말이 단순 확인 질문에서 '내 얘기 맞다'는 단정으로 바뀌는 순간이 그대로 드러난다.",
        "worstActionReaction": "희주의 모욕감에만 기대면 그는 '퍼뜨린 게 아니라 확인한 것'이라는 정의 싸움으로 후퇴하면서, 실제 수신 범위와 표현 강도는 끝까지 줄여 말한다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.25,
          "empathy_approach": 0.9,
          "evidence_present": 1.15,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "희주가 왜 HJ를 곧바로 자기 이름으로 받아들였는지, 도윤은 왜 한재균을 말하면서도 애매한 약어를 썼는지 동기부터 파고들면, 잘린 클립만으로 굳어진 오해가 스스로 벌어지기 시작한다.",
        "worstActionReaction": "문장 뜻만 캐묻는 식으로 밀어붙이면 둘 다 'HJ가 누구냐'는 약어 싸움에 매달려 버려, 라인 의심 공포와 취중 허세라는 배경은 끝내 안 나온다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도윤이 왜 면담도 하기 전에 HR에 '평판 리스크'를 남기고 리허설에서 희주를 뺐는지 묻는 편이, 그의 판단이 사실확인보다 관리자 이미지 방어에 가까웠다는 점을 드러낸다.",
        "worstActionReaction": "타임라인만 딱딱하게 던지면 도윤은 '리더로서 선제 대응한 것'이라고 버티며, 발표 배제가 사실상 불이익이었다는 핵심을 옆으로 밀어낸다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "희주의 '라인 타고 왔다'는 낙인 공포와 도윤의 팀장 체면 손상 공포를 먼저 짚어 주면, 둘 다 소문을 방패처럼 썼다는 고백이 숫자 계산보다 빨리 나온다.",
        "worstActionReaction": "DM 몇 명에게 갔는지, 회의에서 정확히 무슨 단어를 썼는지만 추궁하면 서로 '그 정도는 소문이 아니다'라고 버티며 심리적 압박의 실체를 숨긴다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "dinner_comment_question",
          "investigate_only:e-1": "e-1_presented",
          "motive_search": "e-4_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "dm_forward_question",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "recipient_count_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "empathy_approach": "targeted_me_claim",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "motive_followup"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "hr_note_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "rehearsal_exclusion_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "rumor_management_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "team_meeting_phrase_followup"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "희주는 이미 전배 과정에서 \"라인 타고 왔다\"는 시선을 의식하고 있었기 때문에, 잘린 19초 클립의 모호한 HJ를 곧바로 자기 이야기로 굳혀 버렸다. 그 불안이 확인보다 전파를 먼저 부르게 했다.",
        "unlockHint": "empathy_approach + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "2차 술자리에서 인사 배치 얘기가 나오기 전에 이미 테이블 분위기가 과열돼 있었습니다. 그 발언 하나만 떼어 놓으면 맥락이 완전히 사라져요.",
        "다음 날 앞뒤가 잘린 영상만 돌면서 실제보다 훨씬 나쁘게 읽혔다고 봅니다. 현장에 있던 사람과 화면으로만 본 사람의 느낌이 많이 달랐어요."
      ],
      "tp-2": [
        "기록을 보면, 발언이 사실인지 확인하는 절차보다 당사자를 발표에서 빼는 조치가 더 빨랐습니다. 면담도 안 했는데 배정에서 이름이 먼저 빠졌어요.",
        "누가 먼저 화를 냈느냐보다, 확인도 안 된 상태에서 낙인이 먼저 굳은 게 더 문제라고 봅니다. 절차가 감정을 따라가 버린 거예요."
      ],
      "tp-3": [
        "원본 영상을 전체 길이로 보면, 문제가 된 발언 앞에 다른 맥락이 먼저 나옵니다. 자동으로 잘린 짧은 클립만 봐서는 발언 대상이 누구였는지 확정할 수 없습니다.",
        "술자리 분위기까지 판단하진 않습니다. 다만 인력배치 메모에 적힌 약어와 영상에 들린 이니셜을 대조해 보면, 사람들이 처음 믿은 대상과 실제 지칭이 다를 가능성이 있습니다."
      ]
    }
  },
  "workplace-04": {
    "personalityTags": {
      "a": [
        "avoidant",
        "blame_shifting",
        "timeline_padding",
        "face_sensitive"
      ],
      "b": [
        "confrontational",
        "selective_quote",
        "emotionally_volatile",
        "fairness_obsessed"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "core_fact",
      "t-5": "core_fact"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.25,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "민석이 왜 16:12에 '18시까지 승인 체크'를 적어 놓고도 17:22 리마인드 이후 20:07 회신까지 침묵했는지 동기를 묻는 편이, 약속 자체보다 체면 방어가 먼저였다는 균열을 만든다.",
        "worstActionReaction": "승인 메일 시각만 몰아붙이면 민석은 '그때 다들 급했다'며 전체 일정 이야기로 번져 나가고, 자기 약속 불이행은 일정 혼란 속에 섞어 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "QA 도구 원본 로그에서 스모크만 끝난 채 초록 체크가 켜진 시점을 보여주면, 지우가 말하는 '거의 끝났다'는 표현 축소가 자동 기록 앞에서 설 자리가 좁아진다.",
        "worstActionReaction": "지우의 과로와 억울함을 먼저 받아 주면 그는 막판 scope 변경과 압박을 길게 말하며, 정작 초록불을 너무 일찍 켠 책임은 뒤로 미룬다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.15,
          "separation": 1.1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "민석은 왜 승인 확인을 낙관적으로 약속했고 지우는 왜 회귀 테스트 전인데도 초록으로 바꿨는지, 각자의 낙관 보고 동기를 찌르는 질문이 연쇄 실패 구조를 가장 빨리 보여 준다.",
        "worstActionReaction": "누가 먼저 잘못했는지만 캐면 두 사람 모두 한 분 한 분의 타임라인 공방으로 몰려가서, 승인 지연·QA 과장·미보고가 서로 물린 구조를 끝내 인정하지 않는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "21:06 메신저 캡처만 보지 말고 19:48 board 버전 이력까지 붙여 보여주면, 민석이 freeze를 풀고 카피를 넣으면서도 공식 assignee를 바꾸지 않은 점이 명확해진다.",
        "worstActionReaction": "마감 압박에 공감부터 하면 민석은 '유연하게 살리려던 조치였다'는 미담형 설명으로 미끄러져, 범위 추가와 책임 미갱신을 같은 선상에 놓지 않는다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "20:31 알림을 봤을 때 둘 다 '내가 병목으로 보일까' 겁났다는 감정을 먼저 인정해 주면, 왜 바로 에스컬레이션하지 않았는지가 방어 대신 고백으로 나온다.",
        "worstActionReaction": "누가 알림을 몇 분 먼저 읽었는지만 따지면 두 사람 다 상대가 처리할 줄 알았다는 말로 버티면서, 미보고 자체의 공동 책임은 더 멀어진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "signoff_promise_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "qa_complete_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "responsibility_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_responsibility_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "scope_change_question",
          "investigate_only:e-3": "e-3_presented",
          "motive_search": "nonjudgmental_question_about_deadline_pressure"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "escalation_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "why_no_report_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "둘 다 마감 직전 \"늦는 사람\"으로 찍힐까 두려워 경고를 늦췄다. 민석은 승인 약속을, 지우는 QA 상태를 과하게 낙관적으로 말하며 각자 체면을 지키려다 공동 실패를 만들었다.",
        "unlockHint": "empathy_approach 또는 separation + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "데모 전날 오후부터 다들 승인 메일만 기다리고 있었습니다. 한쪽이 보드에 확인 시각을 적자 나머지는 그 말을 믿고 자기 작업에만 집중했어요.",
        "누가 더 바빴느냐보다, 승인이 늦어지는 동안 서로 상황을 확인한 사람이 아무도 없었다는 점이 더 문제였습니다. 한쪽 실수로만 보기엔 빈 자리가 양쪽에 있어요."
      ],
      "tp-2": [
        "제가 보드 기록을 보면, QA 완료로 표시된 뒤에 카피 수정이 추가됐습니다. 그런데 범위가 늘었는데도 담당자 재배정은 안 됐고, 새로 들어온 작업을 누가 검증해야 하는지가 비어 버렸어요.",
        "한 사람 실수로 정리하면 편하겠지만, 회귀 테스트가 안 끝난 상태에서 체크리스트를 초록으로 바꾼 쪽도 있었고, 그 초록불을 확인 없이 믿고 넘어간 쪽도 있었습니다."
      ],
      "tp-3": [
        "기록을 보면 저녁에 누락 파일 경고와 테스트 미완료 알림이 거의 동시에 떴습니다. 양쪽 다 그 알림을 열어 봤는데, 서로 상대가 처리할 거라 넘긴 흔적이 있습니다.",
        "이 건은 단순 실수가 아니라, 승인 지연과 QA 과장 보고와 범위 변경 미공유가 차례로 쌓인 연쇄 사고에 가깝습니다. 어느 한 고리만 끊었어도 결과가 달랐을 겁니다."
      ]
    }
  },
  "workplace-05": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "manipulative",
        "blame_shifting",
        "relationship_preserving"
      ],
      "b": [
        "victim_identity",
        "martyr_complex",
        "grudge_holding",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "hard_evidence_available",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1
        },
        "bestActionHint": "가은 초안의 구조·사례 배열이 살아 있는 슬라이드 버전 이력과, 상혁 계정에서 공동기획자 표기만 사라진 지점을 같이 보여 주면 공로 삭제가 문장 하나가 아니라 편집 선택임이 드러난다.",
        "worstActionReaction": "상혁의 승진 부담을 먼저 헤아려 주면 그는 '기획과 발표는 다른 층위'라는 분리 논리로 도망가며, 현재 기여 삭제를 조직 언어로 희석한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "권한 회수 14분 전 일괄 다운로드 로그와 직후 멘토방 전송 DLP 기록을 함께 제시해야, 가은의 행동이 단순 열람이 아니라 자료 확보와 확산까지 갔다는 점이 선명해진다.",
        "worstActionReaction": "가은의 피해감만 받아 주면 '또 지워질까 봐 그랬다'는 정서가 앞서면서, 승진위 폴더를 사적 채널로 옮긴 행위는 자기방어라는 이름 아래 숨어 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "손글씨 노트 사진만 놓고 싸우지 말고, 2년 전 배수진 보류본과 과거 출처 누락 이메일까지 대면시켜야 고객회복 랩의 뼈대가 어디서 이어졌는지 문서 족보가 완성된다.",
        "worstActionReaction": "양쪽 억울함에 공감만 얹으면 상혁은 '팀 자산'을, 가은은 '또 빼앗겼다'를 반복해 버려 출처 계보 추적이 감정 서사에 묻힌다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "상혁이 왜 해명도 듣기 전에 'source citation risk'를 남기고 발표 순서를 뒤로 밀었는지 캐묻는 게, 승진위 앞에서 자신의 리스크를 먼저 절단하려 한 계산을 드러내는 가장 빠른 길이다.",
        "worstActionReaction": "문구 입력 시각만 들이밀면 상혁은 '심사 운영상 필요한 리스크 표시'였다고 재정의하면서, 선제 불이익의 의도는 끝내 부정한다."
      },
      "d-5": {
        "bestAction": "separation",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.75,
          "motive_search": 0.95,
          "empathy_approach": 1.1,
          "evidence_present": 1,
          "separation": 1.3,
          "confidential_protection": 1.3
        },
        "bestActionHint": "이번 승진 브리핑의 공동표기 삭제, 2년 전 배수진 이름 누락, 가은의 현재 피해 주장까지 층위를 분리해서 묻는 방식이 과거 은폐와 현재 분노를 한 덩어리로 뭉개는 방어를 끊어 낸다.",
        "worstActionReaction": "사실 하나만 콕 집어 '누가 더 훔쳤나' 식으로 가면 두 사람 모두 더 오래된 상처나 더 큰 부당함만 경쟁하듯 꺼내며 반복 구조 자체는 끝까지 안 본다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "credit_label_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_no_coauthor_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "folder_access_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "mentor_chat_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "originality_claim_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "e-6_or_responsibility_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "promotion_note_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "nonjudgmental_question_about_committee_pressure"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_incident_question",
          "evidence_present:e-4": "e-4_presented",
          "evidence_present:e-6": "e-6_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "contractor_name_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "원출처 이야기가 열리는 순간 상혁의 공로 가로채기뿐 아니라 가은의 \"순수 창작\" 서사도 함께 흔들린다. 그래서 둘 다 출처 질문을 현재 승진 억울함과 과거 보호 논리 사이로 밀어 넣어 버렸다.",
        "unlockHint": "motive_search 또는 confidential_protection + d-3 현재 S4 이상",
        "impactDisputes": [
          "d-1",
          "d-4",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "브리핑 마감까지 최종 정리를 직접 한 사람이 명의를 가져가는 관행이 있었습니다. 그래서 대표 성과로 올린 것 자체는 팀 기준에서 특이한 일만은 아니었어요.",
        "다만 초안 구조를 상당 부분 그대로 쓴 건 팀에서 다 알고 있었습니다. 명의 문제가 나왔을 때 조심스러운 공기가 돈 건, 그 인정이 빠졌기 때문이라고 봅니다."
      ],
      "tp-2": [
        "예전 보류 파일을 정리하다가 이번 프로젝트와 실험명이 겹치는 자료를 발견했습니다. 지금 나온 기획이 완전히 새로운 창작이라기보다, 그때 묻힌 구조 위에 살을 붙인 쪽에 가까워 보였어요.",
        "이 건을 순수한 아이디어 도용이라고만 할 수도, 온전한 독창적 기획이라고만 할 수도 없습니다. 예전에 보류된 밑그림 위에 이번 작업이 덧붙여진 형태였어요."
      ],
      "tp-3": [
        "기록을 보면, 해명이 오가기도 전에 인사 담당자한테 '출처 위험'이라는 메모가 먼저 들어가 있었고, 발표 순서도 뒤로 밀려 있었습니다. 사실 확인 전에 불이익이 먼저 만들어진 셈입니다.",
        "누가 더 기여했는지는 제가 판단할 문제가 아닙니다. 다만 기록을 보면 양쪽 다 진실을 밝히기보다 먼저 자기 입장을 굳히려고 움직인 흔적이 있습니다."
      ]
    }
  },
  "workplace-06": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "blame_shifting",
        "relationship_preserving",
        "timeline_padding"
      ],
      "b": [
        "authority_challenging",
        "confrontational",
        "fairness_obsessed",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "준호가 왜 인수인계 전 계정을 일괄 돌리고 헬스 점수 임계값까지 손댔는지, 매출 방어와 통제력 과시 중 무엇을 지키려 했는지 묻는 편이 그의 독단을 설명보다 자백으로 바꾸기 쉽다.",
        "worstActionReaction": "재배정 시각만 들이대면 준호는 곧바로 '시스템이 흔들렸고 누군가는 움직여야 했다'는 혼란 서사로 올라타, 월권의 선택성을 감춘다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "레거시 관리자 그룹 잔존 기록과 새벽 라우팅·벤더 태그 변경 로그를 붙여 보여 주면, 서린의 '복구였지 수정은 아니다'라는 명칭 바꾸기가 원본 기록 앞에서 버티기 어렵다.",
        "worstActionReaction": "서린이 배제된 감정부터 받아 주면 그는 '제 영역을 지키려 했다'는 얘기를 앞세워, 타팀 큐를 건드린 실제 범위와 승인 누락을 계속 작게 만든다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.15,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "둘 다 왜 잘린 공지의 'temporary stabilization'만 보고 단독 권한처럼 읽었는지 심리를 캐면, 공동승인 규칙을 무시한 이유가 문장 이해보다 통제 불안에 있었다는 점이 먼저 드러난다.",
        "worstActionReaction": "공지 문구만 글자 단위로 따지면 서린은 하이라이트 캡처를, 준호는 구두 지시를 들이밀며 서로 다른 해석을 끝없이 되풀이한다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "역할 경계가 정리되기 전날 밤 들어간 'boundary-blind' 캘리브레이션 초안과 수정 이력을 보여 주면, 준호의 평판 낙인이 운영 평가보다 먼저 움직였다는 점이 선행 입력으로 박힌다.",
        "worstActionReaction": "통합 스트레스에 공감부터 하면 준호는 그 메모를 '나중에 다듬을 초안' 정도로 낮추며, 실제 선입견 효과를 계속 축소한다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "고객 지연 경고를 본 뒤 둘 다 단독 핫픽스로 달려간 배경에 서로 끊길까 두려운 통합 초기 불안을 먼저 짚어 주면, 왜 PM 핑을 미뤘는지 방어보다 인정이 빨라진다.",
        "worstActionReaction": "누가 먼저 규칙을 바꿨는지만 캐면 준호와 서린 모두 다시 '네가 내 영역을 먼저 건드렸다'는 영토 싸움으로 돌아가 공동운영 복구가 멀어진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "account_owner_question",
          "investigate_only:e-1": "e-1_presented",
          "motive_search": "e-3_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "routing_rule_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "responsibility_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-1",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "co_sign_rule_question",
          "investigate_only:e-1": "e-1_presented",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "exclusive_authority_claim"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "calibration_note_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "nonjudgmental_question_about_merge_pressure"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "escalation_delay_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-4": "e-4_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "why_no_pm_ping_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "통합 첫 주의 혼란 속에서 준호는 통제력 없는 팀장으로, 서린은 영역을 지키지 못한 선임으로 보일까 두려웠다. 그 불안이 공동승인 규칙을 \"내 쪽이 먼저 움직여도 된다\"는 식으로 각자 다르게 읽게 만들었다.",
        "unlockHint": "motive_search + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "통합 직후에 양쪽 팀 다 담당 계정을 빼앗길까 봐 예민해져 있었습니다. 한쪽이 인수인계 전 계정을 먼저 재배정하자, 상대 쪽도 바로 맞대응하더라고요.",
        "통합 공지 취지는 공동 승인으로 맞춰 가라는 거였는데, 한쪽이 서둘렀다고 해서 다른 쪽이 남아 있던 레거시 권한으로 새벽에 따로 움직여도 되는 건 아닙니다. 같은 문제예요."
      ],
      "tp-2": [
        "제가 RACI 문서를 보면, 계정 변경이나 자동화 규칙 수정은 반드시 공동 승인을 거치게 돼 있었습니다. 그런데 고객 지연이 터지자 둘 다 승인 절차를 건너뛰고 각자 손을 대기 시작했어요.",
        "공지 내용이 모호했던 점은 인정합니다. 그래도 변경할 때마다 PM 기록을 남기게 돼 있었는데 둘 다 안 남겼어요. 나중에 서로 '그쪽이 먼저 월권했다'고 할 빌미를 만들어 준 셈입니다."
      ],
      "tp-3": [
        "시스템 로그를 보면, 삭제됐어야 할 레거시 관리자 권한과 새로운 통합 배정이 같은 시간대에 뒤섞여 있었습니다. 이건 한 사람이 버튼을 잘못 누른 게 아니라, 정리 안 된 권한과 성급한 조치가 동시에 터진 문제입니다.",
        "양쪽 말이 다르지만 시스템 기록은 분명합니다. 두 사람 모두 공동 승인 없이 상대 영역에 손을 댔고, PM 에스컬레이션도 각자 늦췄습니다."
      ]
    }
  },
  "workplace-07": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "blame_shifting",
        "retaliation_sensitive",
        "shame_sensitive"
      ],
      "b": [
        "victim_identity",
        "selective_quote",
        "counter_attack",
        "grudge_holding"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "trust_breach",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "secret_keeping"
      ],
      "d-5": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "익명 게시글 보존본과 리뷰 미팅 배제 로그를 같이 들이밀면, 태욱이 포렌식 전부터 세린을 찍고 움직였다는 순서가 드러나 '우연한 관리 판단' 변명이 약해진다.",
        "worstActionReaction": "태욱의 억울함을 먼저 달래면 그는 곧 '익명 캡처 한 장에 당한 관리자' 위치로 숨으면서, 세린 색출과 평가 코멘트 입력 문제를 피해 간다."
      },
      "d-2": {
        "bestAction": "fact_pursuit",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.15,
          "motive_search": 0.9,
          "empathy_approach": 0.7,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "세린에게 게시글 업로드 시각, 캡처 저장 경로, 멘토·동료 7명 전송 순서를 하나씩 고정해 묻는 게 좋다. '맥락을 붙였다'는 말이 퍼뜨린 범위와 타이밍 앞에서 버티기 어려워진다.",
        "worstActionReaction": "과거 묵살의 상처부터 받아주면 세린은 다시 '2년 전에도 묻혔다'는 피해 서사로 돌아가고, 이번 편집·유포 행위는 배경 속으로 숨는다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "72dpi 본문과 96dpi 헤더 차이, 메시지 ID가 갈라지는 e-3 비교표를 캡처와 정면으로 붙이면, '지워' 문장이 현재 프로젝트 삭제 지시였다는 프레임이 한 번에 깨진다.",
        "worstActionReaction": "세린이 느낀 공포를 먼저 인정해 버리면 그는 편집을 '복원'이나 '문맥 설명'으로 다시 부르며, 레이어 합성과 작업PC 로그 대조를 끝까지 미룬다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "태욱에게 왜 늘 '2년 전 건'과 '지금 건'을 칼같이 자르는지 묻게 되면, 품질총괄 라인에서 살아남으려는 계산과 세린 평가란 개입 동기가 함께 떠오른다.",
        "worstActionReaction": "2년 전 회의록 문장만 파고들면 태욱은 '등급 표현 조정'이냐 '은폐'냐 같은 단어 싸움으로 빠져, 현재 보복 패턴을 과거 용어 논쟁 뒤에 숨긴다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "과거 축소가 남긴 상처와 이번 허위 캡처가 만든 낙인을 둘 다 인정해 주면, 태욱도 세린도 미종결 사건을 무기로 재활용했다는 사실을 방어 없이 꺼낼 여지가 생긴다.",
        "worstActionReaction": "누가 먼저 더 심했는지만 따지면 둘 다 각자 유리한 한 장면만 끌어와서 싸우고, '과거 진실+현재 허위'를 분리해 보아야 한다는 핵심은 흐려진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "author_identification_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_remove_from_review_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [],
        "triggerMapping": {
          "fact_pursuit": "anonymous_post_question",
          "investigate_only:e-2": "e-2_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "screenshot_authenticity_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "why_current_header_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "past_downgrade_question",
          "evidence_present:e-4": "e-4_presented",
          "motive_search": "nonjudgmental_question_about_customer_panic"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "old_case_weaponization_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-4": "e-4_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "why_call_it_overreaction_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "motive",
        "deeperReveal": "세린에게는 2년 전 실제 축소 경험이 아직 끝나지 않은 사건이었고, 태욱에게는 과거 일을 현재에서 떼어내야만 자신의 관리자 평판이 유지됐다. 그 미종결성이 현재의 익명 폭로와 색출 프레임을 서로 정당화하는 연료가 됐다.",
        "unlockHint": "confidential_protection 또는 empathy_approach + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "익명 글이 올라오고 나서 본부 분위기가 급하게 변했습니다. 내용이 맞는지보다 누가 올렸는지부터 찾자는 쪽으로 쏠렸고, 한 사람을 향한 의심이 빠르게 굳어 갔어요.",
        "위쪽에서 신경 쓴 건 캡처가 사실인지보다, 이 글이 밖으로 퍼지면 어떻게 되느냐였습니다. 그 상황에서 빠르게 수습하려는 판단 자체는 이해가 가요."
      ],
      "tp-2": [
        "제가 조사 과정에서 본 건, 폭로글이 뜨기도 전에 이미 해당 직원의 리뷰 미팅 참석이 막혀 있었다는 점입니다. 포렌식 결과가 나오기 전에 배제 조치가 먼저 들어간 거예요.",
        "겉으로는 글이 뜬 뒤에 대응한 것처럼 보이지만, 평가란에 '협업 부적합' 코멘트가 들어간 시점은 포렌식 의뢰보다 빨랐습니다. 이미 결론을 정해 두고 움직인 셈이에요."
      ],
      "tp-3": [
        "원본과 대조하면, 문제가 된 캡처의 본문과 상단 채널명이 서로 다른 시기의 것입니다. 별개의 대화를 하나로 합친 흔적이 보입니다.",
        "동기를 추측하진 않습니다. 다만 편집된 캡처가 사실처럼 자리 잡은 시점이 공식 접수보다 앞섰습니다. 인상이 먼저 굳은 뒤 절차가 시작된 구조입니다."
      ]
    }
  },
  "workplace-08": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "blame_shifting",
        "timeline_padding",
        "face_sensitive"
      ],
      "b": [
        "confrontational",
        "detail_obsessed",
        "fairness_obsessed",
        "authority_challenging"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "financial",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-4": [
        "financial",
        "career",
        "reputation_risk",
        "hard_evidence_available"
      ],
      "d-5": [
        "financial",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "월말 클로징 메일의 '개인분 메우고 닫자' 회신과 감사 뒤 평가 코멘트를 같은 줄에 놓으면, 정훈이 합의를 숨기고 나래 단독 은닉으로 돌린 흐름이 눈앞에서 이어진다.",
        "worstActionReaction": "정훈의 감사 압박을 먼저 이해해 주면 그는 곧 '운영 쪽 정산 실수'였다는 식으로 말을 낮추며, 합의 번복 자체를 관리상 해프닝으로 축소한다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 1,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "점장에게 보낸 '주류 빼고 다시 끊어 달라' 문자와 재발급 영수증 원본을 나란히 제시하면, 나래의 '임시 정리' 주장은 감사 직후 새벽 타이밍 앞에서 힘을 잃는다.",
        "worstActionReaction": "나래가 상사 지시를 따랐다는 억울함만 받아주면, 그는 품목 삭제와 재발급 요청이라는 자기 선택을 '분류 보정'쯤으로 줄여 말하게 된다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.15,
          "separation": 1.1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "정훈에게 왜 상환 메모 열이 잘린 PDF만 제출했는지, 나래에게 왜 자동백업 상계표를 급히 부정했는지 묻는 편이 효과적이다. 둘 다 누가 단독 범인으로 보이길 원했는지가 먼저 드러난다.",
        "worstActionReaction": "셀 변경 시각과 파일 버전 숫자만 매달리면 대화가 스프레드시트 기술 문제로 쪼개지고, 감사 전에 이미 상환 계획이 있었다는 큰 맥락은 오히려 멀어진다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "정훈이 면담도 하기 전에 '비용 통제 취약'을 적어 넣은 이유를 캐면, 승진 심사와 책임 분리 욕구가 같이 튀어나와 선행 낙인의 성격이 선명해진다.",
        "worstActionReaction": "감사 초안 문장 하나하나만 읽으면 정훈은 '초안 메모였을 뿐'이라고 버티며, 왜 그렇게 서둘러 나래 쪽에 책임표를 붙였는지는 끝내 말하지 않는다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "정식 절차 밖 상계에 둘 다 기대고 있었다는 불편함을 인정해 주면, 정훈도 나래도 '그 방식이 관행처럼 굳었다'는 공동 책임을 비교적 빨리 시인한다.",
        "worstActionReaction": "처음 누가 택시비부터 그렇게 처리했는지만 따지면 둘 다 지난 사례를 자기 유리하게 다시 쓰고, 이번 오프북 상계 구조 자체는 흐릿해진다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "prior_approval_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_hold_in_temp_tab_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "receipt_reissue_question",
          "evidence_present:e-2": "e-2_presented",
          "motive_search": "item_name_change_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "fabricated_sheet_claim_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-6_presented",
          "motive_search": "e-6_or_responsibility_question"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "audit_note_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "why_before_interview_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "offbook_practice_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "small_admission_about_pressure"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "정훈은 승진 심사 앞에서 감사 리스크가 자신에게 붙는 것을, 나래는 상사 지시를 따르다 혼자 유용자로 남는 것을 더 두려워했다. 둘 다 오프북 상계를 임시 처리로 믿고 싶어 했고 그 믿음이 공개 기록을 피하게 만들었다.",
        "unlockHint": "empathy_approach 또는 separation + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "감사가 시작될 때 느낀 건, 다들 법인카드 내역보다 이게 밖으로 터지면 어쩌나를 더 걱정했다는 점입니다. 처음엔 감사 전에 개인분만 조용히 메우면 넘어갈 수 있지 않겠냐는 말이 돌았어요.",
        "저는 이게 한 사람 잘못이라기보다, 사적 결제를 나중에 메우기로 하는 방식을 둘 다 암묵적으로 해 왔던 게 감사 앞에서 한꺼번에 터진 거라고 봤습니다."
      ],
      "tp-2": [
        "제가 정산 폴더에서 찾은 상계표는 감사 뒤에 급히 만든 게 아니었습니다. 클로징 시점에 자동 백업된 문서에 이미 상환 계획과 이니셜이 적혀 있었어요. 구두 합의가 기록으로 남아 있었던 겁니다.",
        "저는 이걸 한쪽이 혼자 꾸민 이야기라고 보지 않습니다. 개인 결제분을 공식 절차 밖에서 나중에 메우자는 방식을 둘 다 써 왔는데, 감사에서 한꺼번에 드러난 겁니다."
      ],
      "tp-3": [
        "제가 영수증 원본과 재발급본을 대조해 보면, 주류와 개인 물품 항목이 빠진 상태로 재발급돼 있었습니다. 감사 공지 다음 날 새벽에 재발급을 요청한 기록이 남아 있어요.",
        "누가 더 먼저 겁먹었는진 모릅니다. 다만 기록을 보면, 한쪽은 합의 자체를 부인하면서 상대를 단독 책임자로 몰았고, 다른 쪽은 영수증을 손보면서 흔적을 줄이려 했습니다."
      ]
    }
  },
  "workplace-09": {
    "personalityTags": {
      "a": [
        "avoidant",
        "relationship_preserving",
        "face_sensitive",
        "blame_shifting"
      ],
      "b": [
        "cold_logical",
        "detail_obsessed",
        "trust_broken",
        "selective_quote"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "trust_breach",
        "hard_evidence_available",
        "reputation_risk"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "준석에게 연 12억 계정을 잃을까 두려워 은채를 참조에서 먼저 뺐는지 물으면, '임시 정리'라는 말 뒤에 숨은 성급한 누설자 프레임이 드러난다.",
        "worstActionReaction": "후속 메일 시각과 회의 문구만 딱딱하게 캐면 준석은 '잠깐 뺀 것' '공유본을 잘못 본 것' 같은 표현으로 버티며, 왜 확인보다 배제가 먼저였는지는 감춘다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "강소라에게 보낸 DM과 내부 슬랙 캡처를 그대로 제시하면, 은채의 행동이 결백 확인을 넘어 외부 파트너에게 내부 공방을 노출한 일이라는 점이 바로 선다.",
        "worstActionReaction": "은채가 참조에서 잘린 모욕감만 받아주면, 그는 AE 접촉을 그저 확인 요청으로 낮추고 외부에 내부비난을 실어 보낸 사실을 뒷순위로 미룬다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.15,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "'공유본_팔콘'이라는 제목만 믿고 왜 문서 ID를 끝까지 확인하지 않았는지 묻는 게 핵심이다. 준석의 계정 공포와 은채의 억울함이 어떻게 같은 오해를 키웠는지가 거기서 나온다.",
        "worstActionReaction": "잘린 PDF 한 장만 놓고 어느 공유본인지 따지면 둘 다 제목과 시각만 잡고 늘어지고, 중복 문서명과 AE 요약 메일이 겹친 구조적 오해는 끝내 보이지 않는다."
      },
      "d-4": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "CRM 역할 변경 로그와 '외부 커뮤니케이션 리스크' 메모 시각을 붙여 보여주면, 준석이 보안 확인보다 역할 축소를 먼저 했다는 순서가 부정하기 어려워진다.",
        "worstActionReaction": "준석의 거래처 불안에 먼저 공감하면 그는 '계정 보호 차원'이라고만 반복하면서, 은채를 원인 제공자로 찍어 둔 행동을 정상적 리스크 관리처럼 포장한다."
      },
      "d-5": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1.1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "거래처 신뢰를 잃을까 두려웠던 준석과 누설자로 찍힐까 두려웠던 은채의 공포를 동시에 짚어 주면, 둘 다 제3자를 써서 추측전을 벌였다는 점을 더 쉽게 인정한다.",
        "worstActionReaction": "문장 하나하나의 표현 차이만 파고들면 준석은 '자료관리 이슈'라 하고 은채는 '확인 요청'이라 하면서, 외부를 매개로 책임을 떠본 공통 패턴을 흐린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "leak_source_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_remove_from_account_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "agency_dm_question",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "internal_screenshot_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "actual_leak_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-5_presented",
          "separation": "raw_doc_shared_claim"
        },
        "pathBonus": 8
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "risk_note_question",
          "evidence_present:e-6": "e-6_presented",
          "motive_search": "why_before_factcheck_question"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "separation",
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "third_party_rumor_question",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "separation": "shared_responsibility_question",
          "confidential_protection": "small_admission_about_being_cut_out"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "emotion",
        "deeperReveal": "준석과 은채 모두 거래처가 흔들리는 순간 가장 먼저 \"범인\"을 찾으려 했다. 제목이 같은 두 공유본과 AE 메일의 혼선을 차분히 해석하기보다, 이미 쌓인 불신 위에 상대를 누설자로 먼저 고정해 버린 것이다.",
        "unlockHint": "empathy_approach 또는 evidence_present:e-4 + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "거래처 미팅 직후 빠르게 움직인 건, 핵심 계정을 지켜야 한다는 압박이 컸기 때문입니다. 고객이 내부 정보를 아는 듯한 발언을 한 순간 유출 가능성이 급팽창했으니까요.",
        "후속 메일에서 한 사람을 뺀 건 좀 성급했을 수 있습니다. 그래도 같은 제목의 문서가 여러 곳을 오간 상황이었으니, 일단 경로를 좁히려는 판단 자체가 틀렸다고 보긴 어렵습니다."
      ],
      "tp-2": [
        "저한테 들어온 건 정리된 설명이 아니라, '그쪽이 보낸 거 아니냐', '나는 다른 문서를 말한 거다' 같은 엇갈린 말들이었습니다. 같은 제목 '공유본'이 여러 개 돌고 있어서 서로 다른 문서를 가리키고 있었는데, 바깥에선 그 구분이 안 보이더라고요.",
        "같은 제목의 '공유본'이 내부용, 클라이언트용, AE 요약용으로 세 개가 있었습니다. 이 구분을 모르면 거래처가 본 것만으로 내부 자료가 샌 것처럼 보일 수 있어요. 그 혼선이 의심을 키운 겁니다."
      ],
      "tp-3": [
        "접속 로그를 보면, 거래처 도메인에서 열린 건 클라이언트용 공유본과 AE 요약 메일뿐이었습니다. 내부 준비자료가 거래처 쪽으로 나간 기록은 없어요. 이름만 같은 다른 문서였습니다.",
        "문서 제목이 아니라 실제 접속 경로를 봐야 합니다. 그걸 보면 처음 유출자로 의심한 근거가 성립하지 않고, 누가 어떤 버전의 문서를 봤는지를 분리해서 따져야 합니다."
      ]
    }
  },
  "workplace-10": {
    "personalityTags": {
      "a": [
        "conflict_avoidant",
        "timeline_padding",
        "manipulative",
        "relationship_preserving"
      ],
      "b": [
        "victim_identity",
        "detail_obsessed",
        "fairness_obsessed",
        "privacy_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "career",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "promise_violation",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "subjective_claim",
      "t-4": "hidden_motive",
      "t-5": "emotional_context"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "1:1 메모의 '전환안 올릴게' 문장 세 번과 계약연장·잔류 요청 메일을 이어 놓으면, 도현이 기대만 준 게 아니라 그 기대로 핵심 업무를 붙들어 둔 흐름이 뚜렷해진다.",
        "worstActionReaction": "도현의 헤드카운트 부담을 먼저 이해해 주면 그는 곧 '기대하게 했을 순 있지만 약속은 아니었다'로 물러서며, 반복 약속 자체를 희미하게 만든다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "타사 계약서 날짜와 VPN 겹침 로그를 나란히 보여주면, 혜린의 '보험이었을 뿐'이라는 말이 실제 고정 근무 중복 앞에서 버티기 어려워진다.",
        "worstActionReaction": "혜린의 생계 불안만 받아주면 그는 겹치는 근무계약 체결과 숨긴 가용시간 문제를 전부 피해자 서사 안으로 흡수해 버린다."
      },
      "d-3": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 1,
          "empathy_approach": 1.25,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "혜린이 정말 전환 약속을 믿고 버텼다는 감정부터 인정해 주면, 그 다음에야 '그래도 타사 계약을 숨긴 건 맞다'는 자기 불리한 부분까지 꺼낼 공간이 생긴다.",
        "worstActionReaction": "계약서와 VPN 로그만 바로 들이대면 혜린은 달력과 약속 캡처를 연달아 꺼내며 '순수 피해자' 프레임으로 더 강하게 버틴다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "도현이 왜 슬롯이 완전히 닫히기도 전에 commitment concern을 적었는지 캐묻는 게 중요하다. 팀 유지와 책임 회피 중 무엇이 더 컸는지가 거기서 드러난다.",
        "worstActionReaction": "헤드카운트 캡처의 보류/불가 문구만 읽으면 도현은 예산 용어 해석으로 빠져들고, 자기 메모가 전환 결론을 얼마나 밀어버렸는지는 흐려진다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "전환 약속 스레드와 타사 계약·겹침 로그를 함께 제시하면, 도현의 미문서화 약속과 혜린의 은폐가 같은 관계 위에서 동시에 작동했다는 점이 한눈에 보인다.",
        "worstActionReaction": "두 사람의 불안을 나란히 위로만 하면 한쪽은 생계, 다른 한쪽은 예산만 말하게 되고, 서로에게 숨긴 정보가 무엇이었는지는 끝내 선명해지지 않는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "conversion_promise_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_keep_through_launch_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "evidence_present:e-6"
        ],
        "triggerMapping": {
          "fact_pursuit": "other_company_contract_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_or_disclosure_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "empathy_approach",
          "investigate_only:e-2",
          "evidence_present:e-6"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "empathy_approach": "pure_victim_claim_question",
          "investigate_only:e-2": "e-2_presented",
          "evidence_present:e-6": "e-6_or_responsibility_question",
          "confidential_protection": "confidential_protection"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "headcount_freeze_question",
          "evidence_present:e-3": "e-3_presented",
          "motive_search": "nonjudgmental_question_about_retention_pressure"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "oral_promise_practice_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-5": "e-5_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-3": {
        "category": "motive",
        "deeperReveal": "혜린은 순수 피해자 자리에서 내려오는 순간 몇 달간 버틴 시간이 전부 무의미해질까 두려웠고, 도현은 약속처럼 들리게 말했던 과거 문장들이 전부 착취로 읽힐까 두려웠다. 그래서 둘 다 상대보다 먼저 자기 서사를 고정하려 했다.",
        "unlockHint": "empathy_approach 또는 motive_search + d-3 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "전환 약속을 한 건 실제로 그렇게 하려는 마음이 있었기 때문이라고 봅니다. 다만 인사 사정이 중간에 바뀌면서 약속을 지키기 어려워진 거예요. 일부러 속인 건 아닙니다.",
        "상황을 좀 더 빨리 공유했으면 좋았겠지만, 상대 쪽도 그 사이에 타사와 겹치는 근무 계약을 따로 맺고 있었어요. 한쪽만 약속을 깬 구조가 아닙니다."
      ],
      "tp-2": [
        "제가 인사 트래커를 보면, 전환 슬롯이 완전히 닫힌 게 아니라 보류·재요청 가능한 상태였습니다. 그런데도 '헤드카운트가 없다'고 말하면서, 한편으로는 핵심 업무를 계속 맡긴 셈이에요.",
        "저는 이 건을 단순 오해라고만 보지 않습니다. 한쪽은 전환을 미루면서 업무는 계속 맡겼고, 다른 쪽은 그 사이에 타사와 겹치는 근무 계약을 따로 맺고 있었으니까요."
      ],
      "tp-3": [
        "VPN 로그를 보면, 평일 일부 시간대에 양쪽 업무를 병행한 흔적이 분명합니다. 다만 그 사실만 떼어 보면, 왜 이중 계약을 맺을 수밖에 없었는지는 절반밖에 설명되지 않습니다.",
        "누가 먼저 약속을 깼는지 단정하진 않겠습니다. 기록을 보면, 한쪽은 전환을 반복해서 미루면서 약속을 지키지 않았고, 다른 쪽은 기다리다 결국 이중 계약이라는 안전판을 만들었습니다."
      ]
    }
  },
  "workplace-11": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "manipulative",
        "blame_shifting",
        "face_sensitive"
      ],
      "b": [
        "victim_identity",
        "martyr_complex",
        "selective_quote",
        "counter_attack"
      ]
    },
    "contentTags": {
      "d-1": [
        "career",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "trust_breach",
        "third_party_risk"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "role_failure"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "hard_evidence_available",
        "trust_breach"
      ],
      "d-5": [
        "third_party_risk",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "hidden_motive",
      "t-5": "hidden_motive"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 1,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "서린의 청구항 초안이 들어간 기여표와 태준 최종 슬라이드 버전 이력을 겹치면, 이름만 지워지고 내용은 살아남은 삭제 패턴이 그대로 보인다.",
        "worstActionReaction": "태준의 연구소 정치 스트레스를 먼저 이해해 주면 그는 '대표 발명자 정리' '회사 자산화' 같은 말로, 서린 이름 삭제를 절차 문제로 흩어 버린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "개인메일 전달본, 텔레그램 수수료 대화, ZIP 해시를 함께 보여주면 서린의 '아이디어 설명용이었다'는 축소가 더 이상 설 자리가 없다.",
        "worstActionReaction": "먼저 뺏긴 피해 감정을 받아주면 서린은 외부 브로커 전달을 보복의 연장선처럼 정당화하고, 승인 없는 전송 사실은 희미하게 만든다."
      },
      "d-3": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.8,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.1,
          "separation": 1,
          "confidential_protection": 1.1
        },
        "bestActionHint": "왜 둘 다 '브로커 1건' 정도로 범위를 작게 말했는지 묻는 편이 좋다. 링크 재전송과 파라리걸 자동 전달이 커질수록 공모의 부담도 커지기 때문이다.",
        "worstActionReaction": "DLP 경보 행 번호와 링크 세션만 기계적으로 대조하면 둘 다 기술 용어 뒤에 숨으면서, 유출 범위를 축소해 말하려는 의도는 놓치게 된다."
      },
      "d-4": {
        "bestAction": "motive_search",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.85,
          "motive_search": 1.2,
          "empathy_approach": 0.9,
          "evidence_present": 1.05,
          "separation": 1,
          "confidential_protection": 1.15
        },
        "bestActionHint": "태준이 포렌식 결과도 나오기 전에 왜 서린을 '기밀취급 위험'으로 적었는지 캐면, 발표권을 먼저 거두려는 선행 낙인 동기가 드러난다.",
        "worstActionReaction": "HR 메모 문장만 좁게 따지면 태준은 '예방적 코멘트였다'고 버티면서, 발명자 다툼에서 주도권을 잡으려 한 계산은 끝내 숨긴다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 1,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1.1,
          "confidential_protection": 1
        },
        "bestActionHint": "발명자 버전 이력, 브로커 대화, 가상자산 입금 추적을 한 번에 맞붙이면, 두 사람이 서로를 고발한 장면이 사실은 공모를 가리는 연출이었다는 구조가 선명해진다.",
        "worstActionReaction": "둘 중 누가 더 먼저 상처받았는지 공감 대결로 들어가면, 태준도 서린도 '빼앗겼다'는 감정만 키우고 브로커와 대가를 나눈 설계는 뒤로 밀어 버린다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "inventor_credit_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "why_remove_name_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "private_broker_contact_question",
          "investigate_only:e-2": "e-2_presented",
          "motive_search": "zip_attachment_scope_question"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "prove_false",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-3",
          "evidence_present:e-4"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "limited_share_claim_question",
          "investigate_only:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_e-6_presented",
          "motive_search": "nonjudgmental_question_about_what_she_expected_broker_to_do"
        },
        "pathBonus": 10
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-5"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "risk_note_question",
          "evidence_present:e-5": "e-5_presented",
          "motive_search": "nonjudgmental_question_about_board_pressure"
        },
        "pathBonus": 8
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "investigate_only:e-2"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "collusion_denial_question",
          "evidence_present:e-1": "e-1_presented",
          "investigate_only:e-2": "e-2_presented",
          "separation": "e-6_or_shared_intent_question"
        },
        "pathBonus": 8
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "motive",
        "deeperReveal": "발명자 다툼은 둘 다에게 안전한 가면이었다. 공로 싸움으로 보이면 조직 안 분쟁이지만, 브로커 공모가 드러나는 순간 연구실·법무·승진 라인이 동시에 무너진다. 그래서 서로 고발하면서도 진짜 공모 구조는 끝까지 접었다.",
        "unlockHint": "use_confidential_channel 또는 confidential_protection + d-5 현재 S4 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-3",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "투자사 데모 자리에서 한 명이 대표 성과로 올린 건, 출원 마감이 겹치면서 브리핑을 한 사람이 정리해야 하는 상황이었기 때문입니다. 상대 기여를 일부러 지운 건 아니라고 봅니다.",
        "다만 핵심 청구항과 실험표를 설계한 사람이 따로 있다는 건 연구소에서 다 알고 있었습니다. 기여표에서 그 이름이 빠진 건 사실이라, 결과적으로 공로가 한쪽으로 쏠린 건 인정해야 합니다."
      ],
      "tp-2": [
        "브로커 쪽으로 나간 파일을 봤을 때, 아이디어 메모 수준이 아니라 청구항 정리본과 실험 요약이 ZIP으로 묶여 있었습니다. '아직 형태도 없었다'는 주장은 믿기 어려웠어요.",
        "저는 발명자 표기 싸움이 한창일 때, 동시에 외부 브로커와 수수료를 논의한 메일이 오간 걸 확인했습니다. 단순한 공로 다툼이 아니라, 다툼 자체가 바깥 거래를 가리기 위한 장치였을 수 있습니다."
      ],
      "tp-3": [
        "제가 전달 경로를 추적해 보면, 브로커 한 곳으로만 나간 게 아닙니다. 작업 링크 재공유와 자동 전달로 패키지 일부가 경쟁사 자문 변리사 폴더까지 퍼져 있었어요.",
        "누구 마음속 계산까지 말하진 않습니다. 다만 기록을 보면, 겉으로 벌어진 발명자 다툼과 밖으로 나간 자료·수수료 논의가 시간적으로 겹칩니다. 우연으로 보기 어려운 구조입니다."
      ]
    }
  },
  "workplace-12": {
    "personalityTags": {
      "a": [
        "calculated_calm",
        "denial_heavy",
        "privacy_sensitive",
        "blame_shifting"
      ],
      "b": [
        "confrontational",
        "emotionally_volatile",
        "selective_quote",
        "privacy_sensitive"
      ]
    },
    "contentTags": {
      "d-1": [
        "role_failure",
        "trust_breach",
        "hard_evidence_available"
      ],
      "d-2": [
        "privacy",
        "trust_breach",
        "hard_evidence_available",
        "sequence_sensitive"
      ],
      "d-3": [
        "misleading_soft_evidence",
        "hard_evidence_available",
        "sequence_sensitive",
        "reputation_risk"
      ],
      "d-4": [
        "career",
        "reputation_risk",
        "secret_keeping"
      ],
      "d-5": [
        "privacy",
        "promise_violation",
        "trust_breach",
        "hard_evidence_available"
      ]
    },
    "truthCategory": {
      "t-1": "core_fact",
      "t-2": "core_fact",
      "t-3": "circumstantial",
      "t-4": "core_fact",
      "t-5": "subjective_claim"
    },
    "actionAffinity": {
      "d-1": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.05,
          "motive_search": 0.95,
          "empathy_approach": 0.7,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "재택 운영지침과 지훈의 웹캠 공지, 그리고 캡처 5분 주기 설정 로그를 나란히 놓으면, 그의 조치가 단순 출석 확인이 아니라 정책 밖 감시였다는 점이 분명해진다.",
        "worstActionReaction": "지훈의 SLA 압박을 먼저 달래면 그는 웹캠 호출과 집 안 배경 점검을 전부 '관리상 예외'로 낮추며, 사생활 침범의 선을 흐린다."
      },
      "d-2": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.3,
          "separation": 1,
          "confidential_protection": 1
        },
        "bestActionHint": "유휴 로그, 반복 미세 이동 패턴, VPN 유지 세션을 함께 제시하면 수민의 '알림을 늦게 본 것뿐'이라는 말이 실제 자리 비움 앞에서 버티기 힘들다.",
        "worstActionReaction": "수민의 재택 스트레스만 받아주면 그는 지글러와 장시간 공백 문제를 죄다 감시 피해의 반사작용으로 돌려 버린다."
      },
      "d-3": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1,
          "confidential_protection": 1.05
        },
        "bestActionHint": "지훈이 낸 HR PDF와 raw export를 직접 비교해 정상 응답 구간, 웹캠 지시 문맥이 잘린 부분을 보여주면 '요약본일 뿐'이라는 변명이 바로 막힌다.",
        "worstActionReaction": "지훈이 느낀 팀 불만을 먼저 공감하면 그는 선택 편집을 단순 보고 편의처럼 말하고, 태만 프레임을 어떻게 키웠는지는 감춘다."
      },
      "d-4": {
        "bestAction": "empathy_approach",
        "worstAction": "fact_pursuit",
        "actionScores": {
          "fact_pursuit": 0.7,
          "motive_search": 0.95,
          "empathy_approach": 1.25,
          "evidence_present": 1,
          "separation": 1,
          "confidential_protection": 1.25
        },
        "bestActionHint": "집 안까지 통제받는다고 느낀 불쾌감을 인정해 주고 나서 상태창 편집과 '10분만 커버' DM을 꺼내면, 수민도 방어를 조금 내려놓고 은폐를 분리해서 말하기 쉬워진다.",
        "worstActionReaction": "편집 캡처와 동료 DM만 곧장 들이대면 수민은 즉시 '거실까지 찍으라고 했잖아요'로 되받아치며, 실제 공백 시간과 조작 행위 논의는 밀어낸다."
      },
      "d-5": {
        "bestAction": "evidence_present",
        "worstAction": "empathy_approach",
        "actionScores": {
          "fact_pursuit": 1.2,
          "motive_search": 0.95,
          "empathy_approach": 0.75,
          "evidence_present": 1.25,
          "separation": 1.1,
          "confidential_protection": 1
        },
        "bestActionHint": "정책 문서, 지글러 로그, HR 코칭 메모를 한 테이블에 올리면 지훈의 사적 감시와 수민의 편법 은폐가 서로를 키운 악순환이 구조로 보인다.",
        "worstActionReaction": "양쪽 사정을 두루 이해해 주는 선에서 멈추면 둘 다 '어쩔 수 없었다'만 반복하고, 재택 규칙을 누가 어떻게 함께 무너뜨렸는지는 끝내 추상적으로 남는다."
      }
    },
    "optimalPath": {
      "d-1": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1"
        ],
        "bonusActions": [
          "motive_search"
        ],
        "triggerMapping": {
          "fact_pursuit": "monitoring_scope_question",
          "evidence_present:e-1": "e-1_presented",
          "motive_search": "e-4_or_responsibility_question"
        },
        "pathBonus": 8
      },
      "d-2": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "evidence_present:e-5"
        ],
        "triggerMapping": {
          "fact_pursuit": "idle_log_question",
          "evidence_present:e-2": "e-2_presented",
          "evidence_present:e-5": "e-5_presented"
        },
        "pathBonus": 8
      },
      "d-3": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-3"
        ],
        "bonusActions": [
          "evidence_present:e-4"
        ],
        "triggerMapping": {
          "fact_pursuit": "hr_pdf_question",
          "evidence_present:e-3": "e-3_presented",
          "evidence_present:e-4": "e-4_or_crop_question"
        },
        "pathBonus": 6
      },
      "d-4": {
        "pathGoal": "collapse_lie",
        "requiredActions": [
          "fact_pursuit",
          "investigate_only:e-5"
        ],
        "bonusActions": [
          "confidential_protection"
        ],
        "triggerMapping": {
          "fact_pursuit": "status_screenshot_question",
          "investigate_only:e-5": "e-5_presented",
          "confidential_protection": "small_admission_about_home_disruption"
        },
        "pathBonus": 6
      },
      "d-5": {
        "pathGoal": "reveal_mutual_breach",
        "requiredActions": [
          "fact_pursuit",
          "evidence_present:e-1",
          "evidence_present:e-2"
        ],
        "bonusActions": [
          "separation"
        ],
        "triggerMapping": {
          "fact_pursuit": "shared_responsibility_question",
          "evidence_present:e-1": "e-1_presented",
          "evidence_present:e-2": "e-2_presented",
          "separation": "shared_responsibility_question"
        },
        "pathBonus": 6
      }
    },
    "narrativeExpansion": {
      "d-5": {
        "category": "emotion",
        "deeperReveal": "지훈은 운영 통제 실패 팀장으로, 수민은 재택에서 농땡이치는 사람으로 남을까 두려웠다. 개선 코칭과 공식 절차를 거치기보다 각자 몰래 감시와 편법을 고른 이유는 서로를 믿지 못해서이기도 하지만, 자기 낙인을 더 먼저 피하고 싶었기 때문이다.",
        "unlockHint": "empathy_approach 또는 separation + d-5 현재 S3 이상",
        "impactDisputes": [
          "d-1",
          "d-2",
          "d-3",
          "d-4"
        ]
      }
    },
    "witnessSpeechSample": {
      "tp-1": [
        "SLA 수치가 떨어지면서 초조해진 건 이해됩니다. 응답 지연이 계속되면 팀 전체 성과에 영향이 가니까요. 다만 웹캠과 화면 캡처까지 간 건 좀 과했다는 목소리가 팀 안에도 있었어요.",
        "상대가 자리를 비우는 시간이 늘어나니 확인이 필요했던 거겠지만, 코칭이나 정식 경고 대신 바로 감시로 간 게 순서가 아니었다고 느꼈습니다. 그래도 처음부터 악의적이었다고는 안 봅니다."
      ],
      "tp-2": [
        "제가 상담에서 느낀 건 두 문제가 한꺼번에 엉켰다는 점입니다. 한쪽은 회사 정책을 넘어 웹캠과 화면 캡처로 감시를 강화했고, 다른 쪽은 지글러와 상태창 편집으로 자리를 지킨 것처럼 꾸몄어요.",
        "저는 누가 먼저 잘못했는지만으로는 정리가 안 됩니다. 지나친 감시가 은폐를 낳았고, 은폐가 다시 감시를 정당화하는 악순환이었어요. 정식 경고나 업무 조정 같은 정상 절차는 양쪽 다 건너뛰었습니다."
      ],
      "tp-3": [
        "엔드포인트 로그를 보면, 비정상적인 커서 패턴이 반복되는 구간이 분명 있습니다. 자리를 비운 걸 의심할 근거는 있습니다. 다만 HR에 제출된 요약본은 그중 불리한 구간만 골라 편집돼 있었고, 정상 응답 시간대는 빠져 있었습니다.",
        "저는 사람을 평가하지 않습니다. 다만 기록을 보면, 감시 쪽은 불리한 장면만 추려서 더 심각하게 보이도록 만들었고, 은폐 쪽은 상태 편집으로 문제가 없는 것처럼 꾸몄습니다."
      ]
    }
  }
}
