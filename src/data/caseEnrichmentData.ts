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
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "수치심과 배신감이 강한 쟁점이라 먼저 감정을 눌러야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "동기를 먼저 캐면 억측으로 받아들여 사실 확인 전부터 방어적으로 굳어진다."
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
        "제가 기억하기로는 서아가 병원 동행을 더 자주 한다는 점과 도현이 현금 대신 직접 약값을 내기도 했다는 점을 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 실제 간병 투입 시간, 누가 교대했는지, 첫 주에 비어 있던 야간 구간을 원본 스케줄표 기준으로 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 장기요양 본인부담 경감 가능 여부와 퇴원 전 안내 시각, 단기돌봄 연계 절차를 기록 기준으로 설명할 수 있다."
      ]
    }
  },
  "family-02": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "retaliation_sensitive",
        "selective_quote"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "third_party_protective",
        "face_sensitive"
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
      "t-1": "fact",
      "t-2": "motive",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 직접 본 범위 안의 사실만 제한적으로 말할 수 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 명절 직후 공급처들 사이에 공장 매각 소문이 돌기 시작한 시점과, 창고 등기 PDF가 돌았다는 정황을 안다."
      ],
      "tp-3": [
        "기록상 음성 메모 전체 맥락과 정식 승계 문서 부재, 그리고 중개업소 문의 첨부파일의 원본 출처를 확인할 수 있다."
      ]
    }
  },
  "family-03": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "relationship_preserving",
        "selective_quote"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "timeline_padding"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 어머니가 생활비 일부를 자신에게 보내준 사실과, 정우의 월 지원 약속이 집안에서 부담으로 작동했다는 점을 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 복자와 정우가 한때 현금 대신 전기료·관리비를 직접 납부하는 방식으로 바꾸려 했다는 통화와 납부 시점을 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 모자 공동 상담에서 생활비 지원 방식을 현금이 아닌 직접 납부로 바꾸자고 권고한 기록과 예산표를 갖고 있다."
      ]
    }
  },
  "family-04": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "fact"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 보기에는 직접 본 범위 안의 사실만 제한적으로 말할 수 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 기부 신청서, 입금 시각, 영수증 발급 기록을 통해 돈이 형제가 아닌 장학재단으로 갔음을 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 부모의 상속 준비 메모, 기부 의사 확인 기록, 문서 보관 원칙을 원본 기준으로 설명할 수 있다."
      ]
    }
  },
  "family-05": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "privacy_sensitive",
        "counter_attack"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "privacy_sensitive",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 전세사기 직전 사건과 은주가 아직도 현관 비밀번호와 예비열쇠를 쥐고 있다는 점을 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 소현의 계약금 송금, 은주의 취소 연락, 최종 계약 거절 사유를 문자와 통화기록 기준으로 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 두 사람이 사전 상담 후 계약하기로 했던 합의와, 임대인이 가족 갈등 때문에 계약을 부담스러워했다고 말한 중재 기록을 갖고 있다."
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
        "victimizing",
        "face_sensitive",
        "selective_quote",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "motive",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 2014년 쉼터와 채무조정 서류를 한때 대신 스캔해 보관했고, 최근 하준의 게시물을 본 뒤 가족 평판 문제에 강하게 개입했다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 하준 게시물 이후 협찬사에 도착한 경고 DM, 선영의 전화, 익명 PDF 묶음의 도착 순서를 원본 기준으로 안다."
      ],
      "tp-3": [
        "기록상 익명 메일 헤더, 게스트계정 접속 로그, 옛 서류 백업 파일의 유출 경로를 기술적으로 확인할 수 있다."
      ]
    }
  },
  "family-07": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "retaliation_sensitive"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "shame_sensitive"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "motive",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 보기에는 종문이 새벽 생산을 지키는 모습과 지수가 밤마다 온라인몰을 고치는 모습을 모두 봤다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 지수의 패키지·온라인 기획 이후 입점 문의가 늘어난 점과, 종문이 납품 불량률과 출고 시간을 안정시켜 거래가 유지된 점을 모두 안다."
      ],
      "tp-3": [
        "기록상 지원사업 초안 작성, 지역상 신청 양식, 승계 컨설팅 기록을 통해 두 사람의 실제 역할 분담과 외부 표기 문제를 설명할 수 있다."
      ]
    }
  },
  "family-08": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "counter_attack"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "timeline_padding"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "emotion"
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "수치심과 배신감이 강한 쟁점이라 먼저 감정을 눌러야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "수치심과 배신감이 강한 쟁점이라 먼저 감정을 눌러야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 보기에는 작년 가을 가족회의에서 배회가 더 심해지면 잠깐 시설 평가입소를 해보자는 말이 오간 것은 어렴풋이 기억한다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 150만원의 성격이 영구입소 계약금인지, 평가입소용 대기금인지와 준호가 어떤 표현으로 상담했는지 원본 기록으로 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 가족회의 메모, 위험 신호 기준, 사전 합의 문구와 최근 상담 기록을 통해 당시 합의의 범위와 통보 원칙을 설명할 수 있다."
      ]
    }
  },
  "family-09": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "timeline_padding"
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
      "t-1": "motive",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 보기에는 상가주택을 팔아 아버지 재활비와 노후자금을 마련하자는 큰 방향은 알고 있었다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 공식 계약 밖 6,600만원 명도·수리 보전금, 형제의 분배 요구, 별도 이체 순서를 직접 알고 있다."
      ],
      "tp-3": [
        "기록상 공식 매매계약서의 가격, 부모 위임장 작성 경위, 부모가 실제로 들은 설명 범위를 원본 서류 기준으로 확인할 수 있다."
      ]
    }
  },
  "family-10": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "relationship_preserving",
        "fairness_obsessed"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "timeline_padding"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "수치심과 배신감이 강한 쟁점이라 먼저 감정을 눌러야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 보기에는 금요일 밤이냐 토요일 아침이냐는 헷갈렸지만, 다은이 메뉴를 조금 늘렸고 민재가 부모 용돈 20만원을 따로 보낸 사실은 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 다은이 처음 잡아둔 고기 주문량과 전날 밤 갑자기 늘어난 추가 주문 시각을 확인할 수 있다."
      ],
      "tp-3": [
        "기록상 작년 짧게 받았던 가족상담에서 명절 역할표와 비용 항목을 문장으로 정확히 적으라고 권고한 기록을 갖고 있다."
      ]
    }
  },
  "family-11": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "third_party_protective",
        "counter_attack"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "privacy_sensitive",
        "face_sensitive"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "수치심과 배신감이 강한 쟁점이라 먼저 감정을 눌러야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 현재의 무단 하원과 클리닉 예약, 그리고 하린이 픽업권을 끊은 이유를 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 연숙이 별도 상담과 조기 하원을 요구한 사실, 그리고 원래 권고가 생활리듬 정리에 가까웠다는 점을 알고 있다."
      ],
      "tp-3": [
        "기록상 부모 동의서 원칙과 조부모의 직접 연락 금지 합의, 실제 상담 권고 내용을 기록으로 설명할 수 있다."
      ]
    }
  },
  "family-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "retaliation_sensitive"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "shame_sensitive"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 자기정당화의 이유를 말하게 만들면, 감춰 둔 핵심이 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사와 명분 포장만 길어지고 핵심 확인이 늦어진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "bestActionHint": "가족 체면과 제3자 노출 불안을 낮춰야 진술 폭이 넓어지고 핵심이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석에 숨어 방어가 더 단단해진다."
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
        "제가 기억하기로는 두 자녀가 장례 후 정산은 조용히 하자고 약속한 사실과, 지연이 캡처를 보여준 뒤 친척들이 현우를 비난하기 시작했다는 점을 안다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 현우가 보낸 원래 비용 문의 메시지와 지연이 나중에 돌린 캡처 문장이 서로 다르다는 점을 직접 비교할 수 있다."
      ],
      "tp-3": [
        "기록상 문제의 이미지가 여러 메시지를 이어 붙인 합성본인지, PC 카카오톡 캐시와 클라우드 동기화 기록으로 확인할 수 있다."
      ]
    }
  },
  "friend-01": {
    "personalityTags": {
      "a": [
        "avoidant",
        "face_sensitive",
        "timeline_padding",
        "relationship_preserving"
      ],
      "b": [
        "confrontational",
        "selective_quote",
        "face_sensitive",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "동기를 먼저 단정하면 억측으로 받아들여 사실 확인 전부터 닫힌다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "제가 아는 범위에서는 하린이 정산 캡처를 먼저 보냈고, 도윤이 보증금 환급을 택시비와 상계하려 했다는 말을 뒤늦게 전해 들었다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 두 사람이 사용한 정산 앱의 분배 설정과 여행 공용 비용 업로드 시점을 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 숙소 보증금 반환 시각, 환급 계좌, 체크아웃 당일 안내 메시지 원본을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-02": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "privacy_sensitive",
        "selective_quote"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "민재가 저한테 가은 관련 자료 일부를 보낸 건 맞습니다. 다만 그 뒤에 그 자료가 어디까지 돌고 어떻게 편집됐는지는 운영 기록까지 같이 봐야 합니다."
      ],
      "tp-2": [
        "기록상 익명 제보가 들어온 시각, 운영진에게 전달된 음성파일 경로, 모임 배정 변경 요청의 흐름을 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 익명 게시글과 댓글의 작성 계정, 접속 기기 정보, 삭제 전 보존 로그를 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-03": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "제가 아는 범위에서는 나래에게서 문제 캡처를 먼저 받았고, 지후가 올렸다 지운 스토리 문구도 직접 봤다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 신고 접수 시각, 숨김 처리된 댓글, 나래가 첨부한 캡처 파일과 지후 삭제 요청 여부를 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 협찬품 물류 로그, 반납 등록 지연 사유, DM export 대조 리포트 작성 과정을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-04": {
    "personalityTags": {
      "a": [
        "confrontational",
        "fairness_obsessed",
        "face_sensitive",
        "counter_attack"
      ],
      "b": [
        "avoidant",
        "shame_sensitive",
        "relationship_preserving",
        "timeline_padding"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "motive",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "제가 아는 범위에서는 픽업에 동행해 판매자 설명, 다혜와 현우의 통화 내용, 실제 텐트 상태를 직접 봤다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 판매글 수정 이력, 거래 완료 시각, 재판매 완료 로그를 플랫폼 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 비환불 예약금 고지 시점, 현우와 다혜가 각각 보낸 메시지, 누락 부속품 고지 여부를 원본 대화로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-05": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "fairness_obsessed"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "motive"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "의미 싸움보다 시간·순서·기록 확인이 먼저 풀리는 쟁점이라 직접 질문이 가장 빠르다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "제가 아는 범위에서는 서윤에게서 현재 48만원 독촉 캡처를 먼저 받았고, 태오에게서 예전 보증금 얘기를 뒤늦게 따로 들었다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 두 사람이 함께 쓰던 정산 시트의 입력 시각, 차용 메모, 상계 금지 문구의 원본을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 보증금 부족이 발생한 날짜, 태오의 대납 시각, 이후 서윤이 남은 금액을 분할로 갚겠다고 말한 정황을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-06": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "privacy_sensitive",
        "face_sensitive"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "제가 아는 범위에서는 다솔이 브랜드 코디네이터에게서 직접 수정 요청을 받은 사실과, 해온이 그날 밤 접근권을 끊는 과정을 둘 다 봤다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 광고 문구 수정 요청의 정확한 범위, 누구에게 먼저 연락했는지, 어떤 표현까지 바꾸라고 했는지 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 블로그 초대 권한, 유튜브 브랜드계정 역할, 접근권 회수 시각과 변경 로그를 플랫폼 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-07": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "selective_quote",
        "face_sensitive"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "의미 싸움보다 시간·순서·기록 확인이 먼저 풀리는 쟁점이라 직접 질문이 가장 빠르다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "기록상 진아에게서 편집 캡처를 먼저 받았고, 성호에게서 비밀 연애와 제한 공개 합의 얘기를 뒤늦게 들었다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-2": [
        "기록상 작년 합의 노션 원본과 이해충돌 신고 경로, 성호의 실제 사전 고지 여부를 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 리더 선발 점수표, 심사 배정 로그, 부회장의 채점 제외 여부를 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-08": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "제가 아는 범위에서는 준혁의 리허설 불참과 은비의 밤샘 수정, 그리고 시상 직후 문제된 게시물 업로드를 모두 직접 봤다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 제출 시스템의 대표자 필드, 팀원 입력란, 심사위원 회신과 상장 표기 원본을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 역할 분담 회의록, 부스 패널 최종 출력 파일, SNS 게시 전 확인 절차를 원본 기준으로 알고 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-09": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "selective_quote",
        "face_sensitive",
        "counter_attack"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "motive"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "의미 싸움보다 시간·순서·기록 확인이 먼저 풀리는 쟁점이라 직접 질문이 가장 빠르다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "저는 직접 피해자라 그 전후 자료를 갖고 있습니다. 다만 누가 어느 단계에서 뭘 만들고 올렸는지는 운영자 로그를 같이 봐야 분명해집니다."
      ],
      "tp-2": [
        "기록상 익명 계정 가입·로그인·삭제 기록, 신고 첨부 파일, 소명 DM을 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 부스 심사 일정, 조가람 부스 평가 흐름, 루머 확산이 마켓 운영에 끼친 영향을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-10": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "fairness_obsessed",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "motive",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "제가 아는 범위에서는 공유 체크리스트와 드레스 피팅 일정, 서아가 '도와줄 수 있는 선'을 말한 장면을 직접 들었다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 공유 시트 버전 기록, 라인업 전달 시점, 리허설표 수정 이력을 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 축가 곡과 키 조정이 어디까지 가예약이었는지, 실제 계약금과 최종 확정 여부를 알고 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-11": {
    "personalityTags": {
      "a": [
        "victimizing",
        "privacy_sensitive",
        "face_sensitive",
        "counter_attack"
      ],
      "b": [
        "cold_logical",
        "privacy_sensitive",
        "fairness_obsessed",
        "face_sensitive"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "비공개 보호를 보장해야 새 확산 걱정 없이 핵심 정보를 말할 수 있다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "제가 아는 범위에서는 민우가 잠금 화면 캡처를 먼저 보내며 준석이 계정을 먹었다고 말한 사실과, 준석이 뒤늦게 오래된 본인확인 정보 재사용 얘기를 털어놓은 장면을 모두 들었다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 관리자 메일 변경 시각, 가족요금제 재인증 경로, 기기 차단과 아이템 이전 로그를 원본 기준으로 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 재인증 과정에서 어떤 이름·생년월일·청구지 정보가 쓰였는지, 과거 일회성 인증 자료가 재사용되었는지 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ]
    }
  },
  "friend-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "fairness_obsessed"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "fact"
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "체면이나 자기정당화의 이유를 말하게 해야 숨긴 경계가 스스로 드러난다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "bestActionHint": "수치심과 관계 손상 두려움이 강해 먼저 압박을 낮춰야 사실 고백이 따라온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 시간 해석 뒤로 숨으며 방어가 더 굳어진다."
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
        "bestActionHint": "원본 로그와 보존 기록이 남아 있어 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "공감만 건네면 피해 서사만 길어지고 핵심 검증이 늦어진다."
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
        "제가 아는 범위에서는 수빈의 가사·가이드 녹음과 재윤의 편곡·촬영·편집 과정을 모두 봤고, 공개 직후 서로의 게시물을 둘 다 확인했다. 다만 그걸 가지고 둘이 왜 그렇게까지 갔는지는 제가 단정하긴 어렵습니다."
      ],
      "tp-2": [
        "기록상 제출 폼의 공동 크레딧, 보도자료 초안, 쇼케이스 포스터 템플릿 구조를 원본 기준으로 알고 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
      ],
      "tp-3": [
        "기록상 스트리밍 카드에 어떤 이름이 먼저 보이는지, 숨겨진 기여자 메타데이터와 수정 이력을 확인할 수 있다. 다만 개인적 의도나 사적인 합의까지는 제 확인 범위를 벗어납니다."
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
        "재판관님, 밤에 공구 가방 든 사람이 504호 쪽으로 올라가는 건 제가 현관에서 바로 봤어요.",
        "복도에 제습기랑 물받이 통이 놓여 있던 건 맞고, 다음 날엔 한결씨 목소리가 복도 끝까지 들렸습니다."
      ],
      "tp-2": [
        "기사는 23시 58분 승인으로 들어갔고, 그 기록은 경비실 대장에 남아 있습니다.",
        "복도 원본 CCTV는 확보 절차만 제가 안내했지, 누수 원인 자체는 시설주임이 확인할 사안이었습니다."
      ],
      "tp-3": [
        "점검 보고서상 물은 윗집 욕실 배수에서 내려온 게 아니라 옥상 우수관 역류 쪽으로 보는 게 맞았습니다.",
        "낙엽 막힌 사진이랑 외벽 실리콘 틈 상태를 같이 보면, 504호 실내 배수와 직접 연결된 흔적은 없었습니다."
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
        "반상회 때 CCTV 예산이랑 반려동물 냄새 얘기가 한꺼번에 나와서, 두 분이 서로 예민해진 건 기억합니다.",
        "전단 문구를 보니 민원 원문하고 회의 때 나온 표현이 섞여 있는 느낌은 받았습니다만, 그 이상은 기록으로 확인해야 합니다."
      ],
      "tp-2": [
        "재판관님, 원본 6분 영상을 보면 민규씨가 박스를 뜯는 장면은 없고 선반 위치만 손보고 나갑니다.",
        "전단은 새벽 순찰 시간대 사이에 붙은 게 맞지만, 누가 만들었는지는 공용프린터 기록을 봐야 합니다."
      ],
      "tp-3": [
        "민원 원문과 전단 PDF를 대조해 보면 문장 조합이 자연스럽지 않고, 회의 때 나온 표현이 섞여 있습니다.",
        "공용프린터 스풀 로그는 남아 있어서, 적어도 전단이 어디서 출력됐는지는 원본으로 확인 가능합니다."
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
        "사고 직후 서아씨가 제일 먼저 한 말이 \"문이 갑자기 닫히면서 줄이 걸렸다\"는 취지였어요.",
        "평소 산책 모임에서 봐 온 바로는, 현우씨 개가 다른 개를 덮쳐 물던 타입이라고 느낀 적은 없습니다."
      ],
      "tp-2": [
        "제 기록으로는 세척실 문이 21시 47분대에 열렸고, 그때 사용된 건 주민 예약코드가 아니라 임시 PIN이었습니다.",
        "사진 찍으러 갔을 때 바닥은 젖어 있었고, 줄이 배수구 쪽으로 길게 놓여 있었던 건 확인했습니다."
      ],
      "tp-3": [
        "초진 차트 기준으로는 패드 상처가 찢긴 모양이 아니라 마찰로 벗겨진 형태에 가깝습니다.",
        "물림이면 보통 관통 흔적이나 쌍공 자국이 남는데, 그날 제가 본 상처 분포는 그쪽과 달랐습니다."
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
        "가을에 주차칸 바꿔 쓰자는 얘기할 때 \"2월 말까지만\"이라는 문구가 분명히 있었던 걸로 기억합니다.",
        "서림씨가 단체방에서 아버지 재활 얘기를 여러 번 한 건 맞지만, 그 이후 원상복구 이야기도 같이 나왔어요."
      ],
      "tp-2": [
        "개인 콘은 관리사무소 공용 비품이 아니라, 도윤씨가 따로 가져다 세운 걸 순찰 때 확인했습니다.",
        "쪽지가 꽂힌 직후에 큰 실랑이가 난 건 아니었고, 새벽엔 차 위치가 그대로였던 것도 원본 CCTV에 남아 있습니다."
      ],
      "tp-3": [
        "규정상 재활 배려는 종료일 이후 자동으로 이어지는 게 아니라, 합의된 날짜가 지나면 원상복구가 원칙입니다.",
        "출입기록을 보면 평일 7시 20분 이후까지 B-7이 비워지지 않은 날이 반복적으로 찍혀 있습니다."
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
        "그 흰 상자 모서리 파란 스티커는 제 정기배송 표시라서, 화면 보고 바로 제 물건인 걸 알았습니다.",
        "배송완료 사진 배경도 제 현관 앞하고 맞아떨어져서, 적어도 CCTV 속 상자가 서윤씨 물건은 아니에요."
      ],
      "tp-2": [
        "원본 CCTV로는 누가 흰 상자를 들었는지는 보여도, 그게 누구 택배인지는 화면만으로는 바로 안 나옵니다.",
        "제가 본 건 기사 출입 시각과 선반 상태까지고, 배송 사고 여부는 대리점 기록을 같이 봐야 맞습니다."
      ],
      "tp-3": [
        "저희 쪽 처리 내역을 보면 그 두 상자는 누가 가져간 물건이 아니라 분류 단계에서 보류칸으로 빠진 건입니다.",
        "최종 회수 사진이랑 스캔 로그를 대조하면, 두 분 물건이 누군가 가져간 게 아니라 중간에 멈춘 걸 알 수 있습니다."
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
        "문이 쾅 닫히던 시기엔 세영씨 손수레도, 인호씨 카트도 번갈아 문에 기대둔 걸 같은 층에서 몇 번 봤어요.",
        "소리가 심하다고 말이 나온 뒤에도 며칠은 계속 그렇게 받쳐 두는 장면이 있었습니다."
      ],
      "tp-2": [
        "암이 휘고 오일이 샌 모양을 보면, 한 번 세게 친 손상보다 반복적으로 문을 받쳐 둔 흔적에 가깝습니다.",
        "처음 드린 18만원은 수리 견적이고, 실제 주민 부담액은 보전금 처리 뒤 계산서를 봐야 정확합니다."
      ],
      "tp-3": [
        "관리사무소 기준으로는 보전금 6만원이 먼저 빠졌고, 남은 주민 부담액이 12만원이라 두 세대 6만원씩이 맞습니다.",
        "민원 접수와 통화 순서를 보면, 최종 계산서 확인 전에 송금 요구와 지급 거부가 먼저 오간 건 사실입니다."
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
        "재판관님, 제가 나갈 때 싱크대 서랍에 열쇠 봉투를 둔 건 누수 공사 기간에만 쓰던 물건이어서였어요.",
        "'803'이라고 적힌 쪽지는 제 짐 찾으라고 남긴 표시였지, 새 세입자에게 공식 허가를 넘긴다는 뜻은 아니었습니다."
      ],
      "tp-2": [
        "제 순찰 기록으로는 권성호씨가 관리실 회신보다 먼저 새 자물쇠를 거는 장면이 시간대별로 잡혀 있습니다.",
        "계단실 원본 영상 보면 유모차 들고 오간 동선하고 첫 신고 순서가 겹쳐서, 누가 무슨 말을 했는지보다 행동 시각이 먼저 보입니다."
      ],
      "tp-3": [
        "그 잠금함은 시설 목록상 세대 전용 칸이 아니라 비상물품함으로 관리돼 왔습니다.",
        "윤가영씨 퇴거 직전에 반납 공지도 나가서, 새 803호 입주와 함께 사용 권한이 자동으로 이어진 상태는 아니었어요."
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
        "설치 당일에도 말씀드렸지만 그 모델은 160도 고정렌즈라 화면이 사람을 따라 도는 방식이 아닙니다.",
        "프리뷰에 잠깐 보이는 범위와 SD카드에 저장되는 실제 영상 범위가 달라서, 두 화면을 섞어 보면 느낌이 완전히 달라집니다."
      ],
      "tp-2": [
        "하린씨 첫 글엔 '스토킹'이라는 단어가 있었고, 그 뒤에 민석씨가 귀가 시간표 비슷한 글로 바로 맞받아친 걸 제가 봤어요.",
        "그날 라인 주민들 분위기는 관리실 판단을 기다리는 쪽이 아니라, 누가 더 선을 넘었는지 감정적으로 갈라지는 쪽이었습니다."
      ],
      "tp-3": [
        "저희 기록엔 설치 미통보 접수와 주민방 게시 시각, SD카드 확보 순서가 전부 남아 있습니다.",
        "포렌식 의뢰 결과가 나오고 나서야 27초 파일이 원본 저장 영상이 아니라 편집본이라는 점이 공식적으로 정리됐어요."
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
        "중재석 바로 옆에서 들었는데, 두 분 다 보전금 빼고 남는 공사비는 반반으로 가자는 말에 분명히 동의했습니다.",
        "충격음 테스트 끝난 뒤에도 남지훈씨가 '일단 반씩 보는 걸로 알겠다'는 취지로 말한 건 제가 기억하고 있어요."
      ],
      "tp-2": [
        "침실 천장 패치 한 줄은 연우씨 요청으로 뒤에 추가된 항목이라, 그 18만 원이 왜 붙었는지는 체크리스트에 따로 남겨 놨습니다.",
        "현장에선 윗집 바닥만 손봐선 끝이 안 나고 아랫집 천장 공진까지 같이 잡아야 해서 두 공정을 묶은 겁니다."
      ],
      "tp-3": [
        "합의서 서명 시각이랑 추가 보전금 전표 두 건은 관리실 전산에 같이 남아 있습니다.",
        "정산 공지는 예약해 둔 상태였는데, 글이 먼저 올라오고 부분 송금이 먼저 찍힌 순서도 로그로 확인됩니다."
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
        "울음이 막 터진 직후 두 아이 다 '가져가려던 게 아니라 바꾸는 줄 알았다'는 취지로 말해서, 처음부터 절도 다툼처럼 들리진 않았어요.",
        "제 느낌엔 민우가 뭔가를 숨겼다기보다, 같은 페이지를 두고 서로 다르게 이해해서 당황한 쪽에 더 가까웠습니다."
      ],
      "tp-2": [
        "복도 영상으로 보면 아이들 손에 남아 있는 건 각자 들고 온 자기 앨범 하나뿐이고, 다른 색 앨범이 추가로 따라간 컷은 없습니다.",
        "민우가 하윤 앨범을 통째로 챙기거나 몰래 숨기는 장면은 그 시간대 영상 어디에도 없었습니다."
      ],
      "tp-3": [
        "상담하면서 보니 하윤이는 '먼저 보면 바꾸는 것'으로, 민우는 아직 고르기 전 단계로 이해하고 있었어요.",
        "스티커도 상담 도중 하윤 앨범 투명포켓에서 다시 나와서, 저는 절도 문제로 보지 않고 규칙 오해로 정리했습니다."
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
        "그날 밤 성재씨가 복도문 앞에서 서비스 태그를 몇 번 시험하듯 대는 장면을 제가 청소하다 봤습니다.",
        "라은씨도 평소와 다르게 창고 불을 켜 둔 채로 두고 있어서, 우연한 실랑이보다 준비된 상황처럼 보였어요."
      ],
      "tp-2": [
        "비상계단에서 들은 건 두 분이 손해 금액을 어느 정도로 적을지 맞춰 보는 대화였지, 즉석에서 화내는 분위기는 아니었습니다.",
        "정확한 문장까진 못 옮기지만 '이 정도는 받아야 한다'는 식으로 숫자를 맞추는 느낌이 분명히 있었어요."
      ],
      "tp-3": [
        "출입통제 서버를 보면 그 문은 정상 발급 태그가 아니라 복제된 식별값으로 열린 흔적이 남아 있습니다.",
        "건물주 측 감면안도 사건 전날 검토 메일까지 올라왔는데, 공모 정황이 보이자 바로 보류로 바뀌었습니다."
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
        "지연씨가 '94만 원이 빈다'는 글을 올린 뒤에야 도윤씨 해명 캡처가 따라온 순서는 제가 채팅방에서 바로 봤습니다.",
        "그 글 하나로 참가자들 사이에선 이미 도윤씨가 돈을 숨긴 사람처럼 분위기가 기울었던 것도 사실입니다."
      ],
      "tp-2": [
        "돈 옮기던 순간 지연씨 말의 요지는 작년 공구에서 남은 구멍부터 이번 입금으로 메우자는 쪽이었지, 이번 라운드만 따로 닫자는 분위기는 아니었어요.",
        "적어도 그때는 작년 금액과 이번 라운드 돈을 분리해서 보지 않고 한 통장 안에서 같이 맞추려는 인상이 강했어요."
      ],
      "tp-3": [
        "수입사 기준으로 이번 환급 32만 원은 국제배송료를 다시 계산한 뒤 확정된 금액이고, 그 내역서가 따로 있습니다.",
        "작년 캐시백 41만 원과 반품차액 21만 원도 지급 흔적이 남아서, 누군가 94만 원을 한 번에 빼돌린 구조는 아닙니다."
      ]
    }
  },
  "partnership-01": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "해나가 그 송금 얘기 나오던 날 저한테 전화해서 '이게 내 승인으로 찍히면 투자도 날아가고 직원들 앞에서도 끝난다'고 거의 울먹이듯 말했습니다.",
        "제 느낌엔 돈의 목적보다도 해나가 공동 책임자로 보이는 걸 훨씬 무서워했습니다. 그래서 서준씨한테 동의 흔적 남는 걸 유난히 꺼렸어요."
      ],
      "tp-2": [
        "2주년 회식 끝나고 택시 기다릴 때 두 분이 '직원들한텐 투자금 말고 컨설팅비처럼만 얘기하자'고 낮게 상의하는 걸 들었습니다.",
        "제가 옆에서 본 건 서준씨가 '괜히 사무실 불안해진다'고 말하고, 해나씨가 그 말에 굳이 반대하지 않던 분위기였어요."
      ],
      "tp-3": [
        "제 쪽 원장에는 1,800만원이 개인 계좌가 아니라 브리지 투자 검토용 신탁 예치로 잡혀 있습니다. 반환 조항이랑 비환급 검토비 문구도 같이 붙어 있었고요.",
        "두 분 모두 처음 상담 때는 같은 방향으로 말씀하셨습니다. 나중에 직원들 앞 설명이 달라졌을 뿐, 계약 초안 자체는 그 전부터 하나였습니다."
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
        "cold_logical",
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
        "준오 형이 '본계약 붙기 전에 유지보수 파일럿만 우리 회사로 따로 돌릴 수 있냐'고 저한테 먼저 물은 건 사실입니다.",
        "사업자등록증도 제가 보낸 건 맞아요. 세한리테일 본계약 파일에까지 들어갈 줄은 몰랐지만, 별도 파일럿 얘기가 오간 건 분명했습니다."
      ],
      "tp-2": [
        "처음 받은 제안서 표지는 분명 박준오, 서민경 두 이름이 같이 있었어요. 마지막 인쇄 직전 파일만 민경씨 단독 표기로 바뀌었습니다.",
        "제가 이상했던 건 디자인 수정이 아니라 이름 빠지는 순서였어요. 본문은 거의 안 변했는데 표지랑 공로 페이지만 급하게 손봤거든요."
      ],
      "tp-3": [
        "저희가 창구를 민경씨 한 명으로 정리한 건 로비 때문이 아닙니다. 준오씨 쪽에서 별도 유지보수 법인 자료가 붙으면서 컴플라이언스 검토가 걸렸어요.",
        "메일 스레드 보시면 '시훈데이터랩 사업자등록증' 첨부 직후에 내부 경고가 뜹니다. 그 이후부터는 공식 창구를 단일화해 달라고 저희가 먼저 요청했어요."
      ]
    }
  },
  "partnership-03": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "도윤이가 전날 밤 리허설하면서 '처음 4분은 내가 끊는 걸로 정리됐다'고 해서 저도 오프닝 연습만 따로 잡아 줬습니다.",
        "제가 들은 음성메모 문장이 애매하긴 했어요. 그래도 도윤이는 그걸 자기 오프닝 확정으로 받아들인 상태였습니다."
      ],
      "tp-2": [
        "제가 '처음은 한 명이 끊고 넘기자'고 말한 건 사실인데, 그걸 전체 진행권까지 한 사람에게 주라는 뜻으로 받아들일 수 있다는 건 나중에야 알았습니다.",
        "아젠다 코멘트도 제가 남겼습니다. 표현이 모호해서 두 분이 각자 자기에게 유리한 쪽으로 이해한 것 같아요."
      ],
      "tp-3": [
        "투자사 입장에서 원한 건 발표 전체 독점이 아니라 첫 4분 오프닝과 시간관리만 한 명이 맡는 구조였습니다.",
        "초대장 첨부파일 바뀐 기록은 남아 있지만, 저희가 '한 사람이 끝까지 다 하라'고 요구한 적은 없습니다. 그 부분은 분명히 선을 긋고 싶습니다."
      ]
    }
  },
  "partnership-04": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "2년 전 리베이트 일 뒤로 라희는 민재씨 숫자만 봐도 먼저 의심부터 했어요. 이번 주말 이체도 딱 그때 기억으로 받아들인 것 같았습니다.",
        "제가 통화에서 들은 건 '또 같은 식이면 이번엔 진짜 끝내야 한다'는 말이었어요. 금액보다 반복 배신이라는 느낌에 훨씬 크게 반응했습니다."
      ],
      "tp-2": [
        "협상 첫 판엔 은행 도장 비슷한 PDF가 먼저 올라왔고, 원본 여부 질문은 그보다 한참 뒤에야 나왔습니다. 그 순서는 제가 분명히 기억합니다.",
        "라희씨 쪽은 그 파일을 계속 기준처럼 들고 왔고, 민재씨 쪽은 마이그레이션 표시 방식부터 설명하려 했습니다. 테이블 공기가 완전히 달랐어요."
      ],
      "tp-3": [
        "원본 전산으로 보면 그 주말 세 줄은 서로 다른 외부 유출이 아니라 고객 환급보증금하고 퇴직충당금 이동이 분리 찍힌 겁니다.",
        "문제 된 PDF는 은행에서 발급되는 정식 양식과 글꼴, 도장 레이어가 다릅니다. 또 마이그레이션 이후엔 원금, 부가세, 수수료가 따로 보이도록 바뀌었습니다."
      ]
    }
  },
  "partnership-05": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "소라가 등기부 캡처 본 날엔 거의 결론을 내려 버린 상태였어요. '저건 조사대응이 아니라 현우 개인 돈줄일 거다'라고 단정해서 말했습니다.",
        "제가 느끼기엔 세무조사 자체보다도 또 속았다는 감정이 훨씬 컸습니다. 그래서 같은 메일을 받고도 현우 쪽 의심만 점점 키웠어요."
      ],
      "tp-2": [
        "제가 보정 요청을 받았을 때는 같은 2,400만원인데 설명 문구만 계속 순해졌습니다. 처음엔 조사 대응 쪽으로 올리더니, 나중엔 그냥 일반 관리비처럼 눌러 적자는 흐름이었어요.",
        "제가 기억하는 건 금액보다 명목 바뀐 흐름이에요. 같은 2,400만원인데 설명하는 말만 계속 덜 자극적인 쪽으로 이동했습니다."
      ],
      "tp-3": [
        "선급 구조와 계정명은 제가 먼저 제안했습니다. 그 시점엔 두 대표 모두 조사 대응이 급하다고 보고 제 설명을 따르는 분위기였어요.",
        "제휴 자문사를 붙인 것도 사실이고, 그 관계를 충분히 또렷하게 설명했느냐고 물으면 지금 기준에선 부족했습니다. 당시엔 실무 속도를 더 앞세웠습니다."
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
        "cold_logical",
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
        "보라 언니는 카운터 위치랑 사인물 톤이 바뀌면 아예 다른 가게가 된다고 봤어요. 막판까지도 그 부분만큼은 절대 못 넘긴다고 했습니다.",
        "제가 옆에서 도운 날에도 보라 언니가 조명보다 카운터 동선부터 계속 다시 봤습니다. 예산보다 브랜드 얼굴을 지키는 쪽에 훨씬 예민했어요."
      ],
      "tp-2": [
        "현장일지 기준으로는 가람씨가 집기와 조명 대체 발주를 먼저 넣었고, 그 다음에 보라씨 쪽 카운터 재지시가 들어오면서 일정이 한 번 더 꼬였습니다.",
        "둘 중 한 사람 지시만으로 생긴 지연은 아니었습니다. 변경이 서로 겹치면서 철거 순서, 반입 시간, 추가견적이 연쇄로 밀렸어요."
      ],
      "tp-3": [
        "허가 문의가 같은 날 두 번 방향을 바꿔 들어와서 관리실도 바로 기억합니다. 처음엔 집기 반입 쪽으로 접수됐다가, 몇 시간 뒤엔 카운터 동선이 바뀐 공정으로 다시 올라왔어요.",
        "저희 입장에선 두 대표가 각각 다른 최종안처럼 설명해서 현장 쪽도 많이 혼란스러웠습니다. 허가 문의가 같은 날 두 번 방향을 바꿔 들어왔거든요."
      ]
    }
  },
  "partnership-07": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "유나가 그날 밤 저한테 전화해서 '경쟁사가 우리 백화점 주간까지 알고 있대, 이건 내부 아니고 뭐냐'고 거의 확신하듯 말했어요. 동생이 그때 체면이 무너졌다고 느낀 건 분명합니다.",
        "제가 옆에서 본 유나는 먼저 상처를 받아 세게 반응한 쪽이었습니다. 다만 제가 직접 본 건 유나의 불안이지, 태경씨가 일부러 경쟁사에 넘겼다는 원본 증거는 아니에요."
      ],
      "tp-2": [
        "프로젝터 체크용으로 받은 파일이 따로 있었는데, follow-up 메일 보낼 때 제가 스피커 백업 폴더를 잘못 붙였습니다. 경쟁사 바이어도 같은 첨부를 받은 건 그 뒤 감사로그로 확인했고요.",
        "태경씨가 저한테 보낸 건 점검용 자료 회신이었지 '저쪽에 돌려 달라'는 취지의 요청은 전혀 아니었습니다. 실수 지점은 제가 첨부를 선택한 단계였습니다."
      ],
      "tp-3": [
        "사무국 보관본으로 보면 동일한 첨부 해시가 경쟁사 바이어 수신 메일에도 남아 있습니다. 그래서 저희는 먼저 내부 고의 유출보다 follow-up 첨부 경로를 확인했습니다.",
        "유나씨 문의는 오발송 확인보다 앞서 들어왔습니다. 표현도 대략 '태경씨 쪽에서 샌 것 같다'는 취지였고, 확인 절차보다 의심 전달이 먼저였다는 점은 기록으로 남아 있습니다."
      ]
    }
  },
  "partnership-08": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "시원은 2호점 얘기만 나오면 '지난 팝업처럼 보증금 먼저 묶였다가 또 무너지면 이번엔 진짜 못 버틴다'고 했어요. 제 앞에서는 늘 현금성 자산 기준부터 꺼냈습니다.",
        "제가 들은 시원 말은 '무조건 올해 간다'보다 '돈이 버텨야 간다'에 가까웠습니다. 그렇다고 지아씨가 상처받지 않았다는 뜻은 아니고요."
      ],
      "tp-2": [
        "지아 대표가 저한테 '기존 데스크에는 아직 말하지 말고, 새 공간 컨셉부터 조용히 보자'고 한 적 있습니다. 저는 그 말을 그냥 푸념 수준으로 듣진 않았어요.",
        "무드보드만 돌린 게 아니라 수업 운영이 가능할지, 강사 몇 명이 움직일 수 있을지까지 물었습니다. 그래서 저는 별도 스튜디오 준비가 실제라고 받아들였어요."
      ],
      "tp-3": [
        "제가 계산한 월말 잔액에는 리스료와 부가세 예정액이 이미 반영돼 있습니다. 그 기준으로는 부속메모에 적힌 8천만원 2개월 유지 조건에 못 미쳤습니다.",
        "대출 사전심사에서도 숫자만이 아니라 공동대표 전념 구조가 흔들리는 점이 변수로 잡혔습니다. 그래서 당시 상태를 자동 진행 단계라고 보긴 어려웠습니다."
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
        "다예가 발표 직후에는 '내 이름이 전면에 안 보이면 다들 또 기술팀만 기억한다'는 식으로 말했습니다. 겉으로는 침착했지만 환수 얘기만 나오면 예민해졌고요.",
        "아버지라 편을 들 수는 있어도, 공적을 먼저 선점하려는 마음까지 없었다고는 못 하겠습니다. 다예가 그 부분에 집착한 건 제가 여러 번 봤어요."
      ],
      "tp-2": [
        "마감 직전 KPI 표가 두 번 크게 바뀌었습니다. 매장 수가 늘고 절감률 문장이 올라갈 때마다 인호 대표와 다예 대표 둘 다 '이 정도면 간다'는 식으로 확인을 했어요.",
        "추천확인서 문구도 이상하게 비슷했습니다. 현장 실증에서 바로 나온 말이라기보다 제출용 문장을 맞춰 넣는 느낌이 강했어요."
      ],
      "tp-3": [
        "기관 보관본에는 제출 파일 버전과 브리핑 수정 요청 메일이 모두 남아 있습니다. 교부 직후 다예 대표 이름을 앞세운 문안 요청이 실제로 들어왔어요.",
        "또 한 가지는 중복 문구와 파일 메타데이터 이상 때문에 이미 사후점검 후보 검토가 올라가 있었다는 점입니다. 그래서 저희는 이 과제를 '완전히 종료된 건'으로 보지 않았습니다."
      ]
    }
  },
  "partnership-10": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "혜린이는 지난번 부적합 알바생 들어왔을 때 프로그램 평판이 흔들린 걸 아직도 크게 겁냅니다. 그래서 이번에도 '시범수업도 안 보고 바로 넣는 건 못 견딘다'고 했어요.",
        "다만 제가 본 혜린의 초조함이 곧바로 준서씨를 속이려 했다는 뜻은 아닙니다. 사람을 들일 기준을 놓치면 안 된다는 쪽이 더 강했습니다."
      ],
      "tp-2": [
        "준서 대표님 쪽에서는 오퍼 메일이 와서 계좌정보랑 첫 주 가이드까지 받았습니다. 그래서 저는 거의 확정이라고 이해했어요.",
        "그런데 바로 뒤에 혜린 대표님이 '아직 같이 일하는 건 멈춰 달라'고 보내셔서, 두 분이 저한테 같은 상황 설명을 하고 있지 않다는 걸 그때 알았습니다."
      ],
      "tp-3": [
        "이 툴은 후보자 이메일을 온보딩 단계로 넘기면 'Day 1 Orientation' 일정이 자동 발송됩니다. 담당자가 최종 합격 문구를 따로 쓰지 않아도 그렇게 보일 수 있습니다.",
        "로그상으로는 오퍼 템플릿 생성, 캘린더 초대 발송, 급여 시트 미완성 상태가 순서대로 남아 있습니다. 절차가 중간에서 멈춘 건 분명합니다."
      ]
    }
  },
  "partnership-11": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "아린은 제 앞에서 성수 매장 얘기보다 '도매처를 내가 책임지고 붙잡을 통로가 필요하다'는 말을 더 자주 했어요. 그래서 기존 법인과는 다른 이름으로 운영 구조를 짜볼까 고민을 털어놓았습니다.",
        "동생 편이긴 하지만, 새 법인 얘기가 성수 계약 뒤에 갑자기 나온 건 아닙니다. 이미 이름과 방향을 따로 정리해 두고 있었어요."
      ],
      "tp-2": [
        "아린 대표 쪽에서 먼저 새 법인 명의 견적서를 보냈고, 결제 구조도 기존 법인과 다르게 설명했습니다. 그래서 저는 별도 거래선 전환을 실제 옵션으로 받아들였어요.",
        "그 미팅 제안은 단순 아이디어 수준으로 느껴지진 않았습니다. 기존 브랜드는 유지하되 계약 주체만 바꾸는 식의 얘기까지 나왔거든요."
      ],
      "tp-3": [
        "등기 시점으로 보면 아린셀렉트F&B는 성수 위성매장 계약 분쟁보다 먼저 준비가 시작돼 있었습니다. 반대로 성수 임대차계약도 본법인 명의로 실제 체결됐고요.",
        "문제는 어느 쪽이 더 빨랐느냐보다, 기존 공급계약과 상표사용 구조상 두 방향 모두 단독 실행이 쉽지 않았다는 점입니다. 위약과 상표 분쟁이 동시에 걸립니다."
      ]
    }
  },
  "partnership-12": {
    "personalityTags": {
      "a": [
        "cold_logical",
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
        "수진은 음성전사 캡처를 보고 나서 '바이어들이 우리를 내부 불화 있는 팀으로 보면 끝난다'고 했어요. 그때는 선우씨를 거의 범인처럼 생각하는 눈치였습니다.",
        "제가 보기엔 수진이 가장 무서워한 건 욕을 먹었다는 자체보다, 셀렉트숍 바이어들이 두 대표를 불안한 팀으로 보는 상황이었습니다."
      ],
      "tp-2": [
        "행사 중엔 선우 대표가 '수진 대표는 약속을 너무 쉽게 잡는다'고 했고, 조금 뒤엔 수진 대표가 '선우 대표 때문에 승인과 출고가 자꾸 막힌다'고 했습니다. 둘 다 제게 따로 털어놓았어요.",
        "문제는 제가 follow-up에서 그 불만을 정리해 바이어들한테 전달하면서 표현을 섞어 버린 겁니다. 그래서 '두 분이 서로 못 믿는다'는 문장이 생겼어요."
      ],
      "tp-3": [
        "운영사 보관본으로 보면 buyer complaint memo에 문제 문장이 처음 잡힌 시점이 홍세진 씨 follow-up 직후입니다. 현장 발언이 곧바로 접수된 형태는 아니었습니다.",
        "라운지 출입기록과 staff briefing notes를 같이 보면, 선우 대표와 수진 대표가 각각 홍세진 씨와 접촉한 시간대가 나뉘어 있습니다. 그래서 두 사람 모두 외부 인력에게 불만을 전달한 흔적은 확인됩니다."
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
        "face_sensitive",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "금액·시각·흐름이 남는 쟁점이라 기록을 맞대면 변명보다 숫자가 먼저 무너진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "제가 옆에서 본 바로는, 추석 연휴에 본인 돌봄 공백이 생겨 가족이 간병 인력을 알아보던 분위기가 있었다.",
        "제가 옆에서 본 바로는, 세린이 동생 돈 문제를 남편에게 바로 말하지 못해 마음이 급해 보였다는 점은 느꼈다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 지석이 추석 직전에 재가돌봄센터 견적과 예약 가능 여부를 여러 차례 문의했다.",
        "제가 아는 범위에서는 업무 중에도 가족 돌봄 문제 때문에 급히 통화하거나 일정을 조정하는 모습이 있었다."
      ],
      "tp-3": [
        "기록상 지석이 280만원을 추석 연휴 간병 예약금으로 납부했고 대상자가 오미숙이었다.",
        "기록상 문제의 만남은 센터 후문 상담 일정이었고 사적 밀회가 아니었다."
      ],
      "tp-4": [
        "제가 아는 범위에서는 세린이 자신에게 150만원을 세린 동생 쪽으로 넘겨 달라고 요청했다.",
        "제가 아는 범위에서는 세린이 '지석한테는 추석 지나고 말할게'라는 취지로 말하며 중간 전달을 부탁했다."
      ]
    }
  },
  "spouse-02": {
    "personalityTags": {
      "a": [
        "privacy_sensitive",
        "shame_sensitive",
        "cold_logical",
        "timeline_padding"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "relationship_preserving",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "제가 옆에서 본 바로는, 도윤이 아이 입학 문제에 유난히 예민해하며 학교 쪽 시선을 많이 의식했다.",
        "제가 옆에서 본 바로는, 희주의 과거 상담 사실 일부를 가족 대화에서 들은 적은 있지만, 학교 전달 경위까지 직접 본 것은 아니다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 희주가 익명 글을 본 직후 크게 흔들렸고, 범인을 확인하려고 도윤 메일을 열어봤다고 털어놓은 적이 있다.",
        "제가 아는 범위에서는 그 행동이 차분한 계획이라기보다 공포 반응에 가까웠다는 분위기는 알 수 있다."
      ],
      "tp-3": [
        "기록상 익명 제보 메일의 수신 시각, 보호자 연락처 관련 문의, 입학 파일 보류 시각은 학교 기록으로 확인할 수 있다.",
        "기록상 파일 보류는 행정 오류 시각이 익명 메일보다 앞섰다는 점이 기록상 분명하다."
      ]
    }
  },
  "spouse-03": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "shame_sensitive",
        "timeline_padding",
        "relationship_preserving"
      ],
      "b": [
        "counter_attack",
        "face_sensitive",
        "avoidant",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "시각·순서·누가 먼저였는지처럼 좁은 사실 질문이 말꼬리와 책임 회피를 막는 데 가장 잘 먹힌다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "수치심이나 관계 손실 두려움이 핵심이라, 비난을 낮추고 사정을 받아줘야 사실 고백이 빨라진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "제가 옆에서 본 바로는, 인호가 건조기를 사치품이라기보다 아침 빨래 동선을 줄일 생활가전으로 보며 서둘렀다는 건 안다.",
        "제가 옆에서 본 바로는, 인호가 유진 이직 직후 집안 현금 흐름을 많이 걱정하고 있었다는 분위기도 봤다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 수습 기간 외부 미팅에 정장과 구두가 사실상 필수였고, 교통비·업무복 일부가 익월 정산 구조였다는 점을 안다.",
        "제가 아는 범위에서는 유진이 출근 준비 비용을 갑자기 먼저 부담해야 해서 당황해했다는 말도 들었다."
      ],
      "tp-3": [
        "기록상 유진의 첫 급여일이 통상보다 늦춰졌고, 교통비·업무복 보전이 익월 정산이라는 점은 인사 기록으로 확인된다.",
        "기록상 온보딩 문서상 외부 미팅 복장 기준이 있었고, 유진이 그 규정을 적용받는 대상이었다."
      ]
    }
  },
  "spouse-04": {
    "personalityTags": {
      "a": [
        "avoidant",
        "relationship_preserving",
        "face_sensitive",
        "timeline_padding"
      ],
      "b": [
        "fairness_obsessed",
        "confrontational",
        "face_sensitive",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "하준이가 그날 선물 때문에 잠깐 들를 수 있다는 얘기는 했어요. 제가 세부 예약 기록까지 다 보고 있던 건 아닙니다.",
        "다은씨가 얼마나 상처받았는지는 알겠지만, 누가 언제 어디에 전화를 했는지까지 제가 단정해서 말하긴 어렵습니다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 다은이 하준과 대면하기 전에 태블릿 알림 캡처를 먼저 친구 단톡에 보낸 건 알고 있다.",
        "제가 아는 범위에서는 다은이 그 알림만 보고 하준이 직접 취소했다고 크게 상처받아 있었다는 분위기도 안다."
      ],
      "tp-3": [
        "기록상 예약 변경 요청 통화 시각과 발신 번호, 케이크 픽업지 수정 기록은 대장 원본으로 확인할 수 있다.",
        "기록상 하준 기기에는 변경 결과 알림만 갔고, 실제 요청 발신 번호는 하준 번호가 아니었다."
      ]
    }
  },
  "spouse-05": {
    "personalityTags": {
      "a": [
        "privacy_sensitive",
        "cold_logical",
        "face_sensitive",
        "counter_attack"
      ],
      "b": [
        "fairness_obsessed",
        "confrontational",
        "privacy_sensitive",
        "shame_sensitive"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "제가 옆에서 본 바로는, 소담이 거실에서 일하며 허리 통증과 소음 문제를 오래 참아 왔다는 건 안다.",
        "제가 옆에서 본 바로는, 민재가 문제의 녹취를 소담보다 먼저 자신에게 들려주며 큰일 난 것처럼 말한 적도 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 민재가 서로 다른 날짜의 음성 두 개를 보내며 하나로 정리해 달라고 요청한 사실은 직접 안다.",
        "제가 아는 범위에서는 결과물은 설명용 편집본처럼 이해했고, 원본이라고 쓰일 줄은 몰랐다."
      ],
      "tp-3": [
        "기록상 스마트락 출입기록, 권한 변경 이력, 회의메모 앱 원본 날짜 불일치는 로그 원본으로 확인할 수 있다.",
        "기록상 문제의 녹취는 단일 연속 파일이 아니라 서로 다른 날짜 원본과 메타데이터가 맞물려 있다."
      ]
    }
  },
  "spouse-06": {
    "personalityTags": {
      "a": [
        "relationship_preserving",
        "face_sensitive",
        "avoidant",
        "privacy_sensitive"
      ],
      "b": [
        "face_sensitive",
        "confrontational",
        "retaliation_sensitive",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "motive",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "시각·순서·누가 먼저였는지처럼 좁은 사실 질문이 말꼬리와 책임 회피를 막는 데 가장 잘 먹힌다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "제가 옆에서 본 바로는, 문제의 문장이 서희의 북클럽 연재 초안에서 나온 표현이라는 건 안다.",
        "제가 옆에서 본 바로는, 서희가 남편 직장을 직접 겨냥하려 했다기보다 글이 오해될까 당황해했다는 분위기를 봤다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 배지와 주차권, 문장을 보고 우람 팀장 관련 글인가 의심해 팀 선임에게 확인 메시지를 보낸 건 사실이다.",
        "제가 아는 범위에서는 자기가 악의적으로 퍼뜨린다기보다 확인하려는 마음이 먼저였다는 건 말할 수 있다."
      ],
      "tp-3": [
        "기록상 팀채널 해명문 게시 시각과 HR 문의 접수 시각, 그보다 앞선 캡처 전송 시각은 기록으로 확인할 수 있다.",
        "기록상 우람이 배우자에게 확인하기 전에 조직 채널과 HR에 먼저 대응했다는 시간 순서는 분명하다."
      ]
    }
  },
  "spouse-07": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "relationship_preserving",
        "shame_sensitive"
      ],
      "b": [
        "face_sensitive",
        "victimizing",
        "confrontational",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "emotion",
      "t-5": "motive"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "수치심이나 관계 손실 두려움이 핵심이라, 비난을 낮추고 사정을 받아줘야 사실 고백이 빨라진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "제가 옆에서 본 바로는, 가족 단톡에는 다혜의 등원 사진과 아침 분투가 자주 올라왔고, 그 장면은 분명히 많이 봤다.",
        "제가 옆에서 본 바로는, 반면 태준이 밤 준비나 세탁을 하는 장면은 가족 단톡에서 잘 보지 못했다는 정도는 말할 수 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 태준이 점심시간마다 소아과 예약 전화나 생활 행정 전화를 자주 하는 모습은 봤다.",
        "제가 아는 범위에서는 퇴근길에 세탁물이나 반찬 주문을 챙기는 습관도 알고 있어, 태준이 집안일을 아예 안 한다는 그림과는 다르다."
      ],
      "tp-3": [
        "기록상 등하원 서명 기록, 상담 메모, 긴급연락 대응 시 실제 도착 보호자는 기록으로 확인할 수 있다.",
        "기록상 다혜의 등원 비중은 높지만, 비정기 대응과 긴급연락에는 태준이 움직인 기록도 분명히 있다."
      ]
    }
  },
  "spouse-08": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "privacy_sensitive",
        "shame_sensitive",
        "timeline_padding"
      ],
      "b": [
        "avoidant",
        "relationship_preserving",
        "face_sensitive",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "금액·시각·흐름이 남는 쟁점이라 기록을 맞대면 변명보다 숫자가 먼저 무너진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "제3자·민감정보 노출 불안을 먼저 눌러야 입을 연다. 보호 장치를 약속할수록 진술 폭이 넓어진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "현석이가 다급하게 열쇠를 좀 맡아 달라고 하고, 서진씨가 혼자 법무사 쪽을 알아보는 것 같다고 말한 적은 있어요.",
        "다만 두 사람이 카페에서 어디까지 합의했는지는 그때 저는 전혀 몰랐습니다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 서진이 법무사 상담 예약만 잡고 실제 접수는 아니라고 여러 번 말한 건 안다.",
        "제가 아는 범위에서는 상담 폴더를 정리하는 과정에서 법무사 상담 범위를 스스로 구분하려 했다는 분위기도 봤다."
      ],
      "tp-3": [
        "기록상 상담 분류는 사전 정보 문의였고, 접수 번호나 사건 번호 없이 시나리오 설명 수준에서 끝났다.",
        "기록상 서진이 보낸 기본 문서와 나중에 추가된 대출 관련 문서는 시차를 두고 들어왔다."
      ]
    }
  },
  "spouse-09": {
    "personalityTags": {
      "a": [
        "privacy_sensitive",
        "third_party_protective",
        "cold_logical",
        "shame_sensitive"
      ],
      "b": [
        "face_sensitive",
        "relationship_preserving",
        "avoidant",
        "counter_attack"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "motive"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "시각·순서·누가 먼저였는지처럼 좁은 사실 질문이 말꼬리와 책임 회피를 막는 데 가장 잘 먹힌다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "수치심이나 관계 손실 두려움이 핵심이라, 비난을 낮추고 사정을 받아줘야 사실 고백이 빨라진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "선아가 병원비가 걱정돼서 돈을 잠깐 자기 쪽에 맡겨 두려는 거라고 말한 건 맞아요.",
        "그걸 도현씨한테 언제, 어떻게 말하려 했는지까지는 저도 자세히 듣지 못했습니다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 간병보험금 930만원의 지급일, 지급 사유, 지급결정 자체는 원본 서류로 확인할 수 있다.",
        "제가 아는 범위에서는 보험금이 선아 개인계좌로 먼저 들어온 사실까지는 알지만, 그 뒤 오빠 계좌 이전은 별도 자료가 있어야 안다."
      ],
      "tp-3": [
        "기록상 390만원은 통합간병 병동 대기 확보용 선수금으로 수납됐고, 본인 직책도 병원 전산으로 확인된다.",
        "기록상 도현과의 늦은 밤 연락은 퇴원 일정과 대기 설명 조율 차원의 업무 연락이었다."
      ]
    }
  },
  "spouse-10": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "timeline_padding"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "counter_attack",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "시각·순서·누가 먼저였는지처럼 좁은 사실 질문이 말꼬리와 책임 회피를 막는 데 가장 잘 먹힌다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "수치심이나 관계 손실 두려움이 핵심이라, 비난을 낮추고 사정을 받아줘야 사실 고백이 빨라진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "제가 옆에서 본 바로는, 기현이 전날 밤 가족 단톡에 먼저 점심쯤 오겠다고 보냈고, 그 말을 믿고 식사를 준비한 건 사실이다.",
        "제가 옆에서 본 바로는, 어머니 입장에서는 그 문구가 가능성보다 확정에 가깝게 들렸다는 정도는 말할 수 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 수아가 평소 자기 친정을 자연스럽게 본가라고 부르는 습관은 알고 있다.",
        "제가 아는 범위에서는 그 표현이 배우자에게는 다르게 들릴 수 있다고 수아에게 말한 적이 있다는 정도는 말할 수 있다."
      ],
      "tp-3": [
        "기록상 기현 명의 과일상자와 수아 명의 한과세트가 서로 다른 주소 기준으로 예약돼 있었고 시차도 있었다.",
        "기록상 주문 메모상 두 사람이 각자 다른 첫 방문지를 전제로 준비한 건 기록으로 확인된다."
      ]
    }
  },
  "spouse-11": {
    "personalityTags": {
      "a": [
        "privacy_sensitive",
        "face_sensitive",
        "cold_logical",
        "counter_attack"
      ],
      "b": [
        "face_sensitive",
        "avoidant",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "motive",
      "t-5": "fact"
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "금액·시각·흐름이 남는 쟁점이라 기록을 맞대면 변명보다 숫자가 먼저 무너진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "금액·시각·흐름이 남는 쟁점이라 기록을 맞대면 변명보다 숫자가 먼저 무너진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "제가 옆에서 본 바로는, 승호가 공사 예산 초과를 크게 걱정하며 보험금이 나오면 잔금이나 카드대금을 메울 수 있을지 물은 적은 있다.",
        "제가 옆에서 본 바로는, 돈 압박이 누수 대응 판단을 흐릴 정도로 컸다는 분위기는 알고 있다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 포털 감사로그, 공사중지 요청, 긴급건조 권고, 심야 재출입 도어락 기록은 현장 원본 타임라인으로 확인할 수 있다.",
        "제가 아는 범위에서는 초기 누수 자체는 시공 하자 범주였지만, 이후 건조 지연으로 손상 범위가 커졌다는 현장 흐름도 확인된다."
      ],
      "tp-3": [
        "기록상 보험청구 초안, 수분센서 CSV, 지급 보류 사유서는 원본으로 대조할 수 있다.",
        "기록상 보류 사유는 시공사와의 분쟁보다 먼저 포착된 제습 중단 로그, 이상 곡선, 사진 순서 불일치였다."
      ]
    }
  },
  "spouse-12": {
    "personalityTags": {
      "a": [
        "face_sensitive",
        "shame_sensitive",
        "privacy_sensitive",
        "relationship_preserving"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "retaliation_sensitive",
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "emotion"
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
        "bestActionHint": "기관 기록이나 원본 로그가 강한 쟁점이라 말싸움보다 증거 대면이 가장 빨리 방어선을 흔든다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "체면과 평판 계산을 말로 꺼내게 하면, 숨긴 이유가 스스로 드러나며 방어 논리가 약해진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "잘린 캡처나 추정이 섞인 쟁점이라 원본·로그를 대면시키는 순간 오해 프레임이 급격히 약해진다.",
        "worstActionReaction": "공감만 건네면 명분을 더 포장하거나 피해자 서사만 길어져 핵심 확인이 늦어진다."
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
        "bestActionHint": "공개 망신과 2차 확산을 막아 준다는 신호가 있어야 숨긴 맥락이 나온다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "bestActionHint": "수치심이나 관계 손실 두려움이 핵심이라, 비난을 낮추고 사정을 받아줘야 사실 고백이 빨라진다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정표 해석에 매달리며 본론을 더 늦춘다."
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
        "제가 옆에서 본 바로는, 세아가 옛 백업을 복원한 뒤, 모진 메시지 한 건을 별도 폴더로 빼고 재우에게는 덜 불리한 묶음부터 보여준 건 안다.",
        "제가 옆에서 본 바로는, 세아가 지금 억울한 건 맞지만, 과거 메시지 수위까지 전부 보여주진 않으려 했다는 분위기도 봤다."
      ],
      "tp-2": [
        "동창들 사이에서 예전 백업 자료 얘기가 다시 도는 분위기는 분명 있었어요. 다들 그쪽 이야기에 관심을 가진 건 사실입니다.",
        "누가 계정을 만들고 뭘 붙였는지까지 제가 처음부터 다 안다고 하긴 어렵습니다."
      ],
      "tp-3": [
        "기록상 익명 계정 로그인 기록, 복구 이메일 연결, 이미지 레이어 해시는 원본 기준으로 대조 가능하다.",
        "기록상 문제의 방명록과 문자 이미지는 2006년 원본이 아니라 2008년·2024년 소스를 2026년에 합성한 위조본이다."
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
        "하림이 이사 날짜 다가오니까 '보증금이 그날 안 들어오면 계약금이 비어요'라고 저한테 몇 번이나 말했어요.",
        "벽 얘기만 나오면 휴대폰에서 입주 첫날 사진을 바로 찾아 보여주면서, 고양이가 긁은 것도 거실 한쪽이라고 엄청 예민하게 구분했어요."
      ],
      "tp-2": [
        "퇴거 전에 셋이 통화할 때 상우씨가 미납분하고 실제 손본 비용만 빼고 나머지는 보내겠다는 취지로 말한 건 제가 들었습니다.",
        "특약 설명할 때도 전면 도배를 자동 공제한다기보다, 확인된 손상 범위만 정산하는 방향으로 안내했어요."
      ],
      "tp-3": [
        "수전은 열어 보니 안쪽 부품이 오래돼서 새는 상태였고, 세입자가 뭘 세게 해서 터진 모양은 아니었습니다.",
        "거실 벽은 고양이 긁힘이 한 면에 몰려 있어서 제가 보기엔 부분 보수 견적이면 충분한 수준이었어요."
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
        "민석 집엔 편집 장비랑 저장장치가 많아서, 누가 허락 없이 들어갔다는 얘기 듣고 며칠을 잠도 제대로 못 잤어요.",
        "그 뒤로는 수리기사가 온다 해도 집을 비우지 않겠다고 했고, 작업 일정이 밀리는데도 문 여는 걸 더 무서워했습니다."
      ],
      "tp-2": [
        "갱신 계약 설명할 때 제가 분명히 긴급 하자라도 먼저 연락하고, 들어갔으면 바로 알리라고 안내했어요.",
        "민석씨는 장비 때문에 출입 통지를 민감하게 봤고, 규철씨는 누수면 집주인이 빨리 볼 수 있다고 이해하더군요. 그 온도 차가 컸습니다."
      ],
      "tp-3": [
        "민석씨 쪽 무단 출입 상담은 사진 촬영 문제까지 포함해서 접수됐고, 접수 시각이 규철씨 주장보다 먼저 남아 있습니다.",
        "반대로 규철씨도 공용배관 누수라 빨리 수리해야 한다는 취지로 문의했지만, 행정 기록상 날짜 앞당긴 출입까지 승인된 건 아니었습니다."
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
        "서윤이 잔금일 앞두고 저희 가족 돈까지 들어간 전세라서, 하루만 밀려도 집안이 다 흔들린다고 울먹인 적이 있어요.",
        "보험이 될 거란 말을 믿고 들어간 건 맞는데, 그 말이 틀리면 친척 돈까지 묶인다고 해서 정말 겁을 많이 냈습니다."
      ],
      "tp-2": [
        "180만원은 집주인 계좌가 아니라 제 개인 수납으로 처리됐고, 정식 중개보수 세금계산서와는 별개였습니다.",
        "보증보험 얘기는 제가 '거의 된다'는 식으로 강하게 말한 편이고, 태수씨는 말소 예정 서류를 보여주며 맞장구친 정도였어요."
      ],
      "tp-3": [
        "상담 기록상 그 계약은 추가 담보와 확정일자 진행 시점 때문에 '조건부 검토'였지, 바로 가입 가능으로 확답된 건 아니었습니다.",
        "브리지대출 잔액이 최신 기준으로 정리되지 않으면 심사가 멈출 수 있다는 안내도 같이 나갔어요."
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
        "저희는 그 집이 전세로 바뀌는 걸 전제로 예식장 잔금하고 대출 상담 일정을 같이 묶어놨습니다.",
        "다은이가 2천만원 보낸 날에도 '이제 월세는 정리되는 거지?' 하고 안심하는 분위기였어요. 그래서 한 달치 월세를 따로 챙기지 않았습니다."
      ],
      "tp-2": [
        "두 분 통화에서 '가자는 방향' '거의 맞춰졌다' 같은 표현이 오갔는데, 저는 그걸 최종 서명 직전 단계로 이해했습니다.",
        "초안 계약서는 성호씨 요청으로 먼저 보냈지만, 공동명의 서명란이 비어 있어서 제가 완결본은 아니라고 따로 말씀드렸어요."
      ],
      "tp-3": [
        "다은씨 상담은 접수됐지만 공동명의 관련 서류와 최종 계약 초안이 안 들어와서 심사가 바로 멈췄습니다.",
        "은행 입장에선 2천만원이 이미 확정 전세금인지, 단순 협의금인지 서류가 없으면 판단을 못 합니다."
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
        "이사 마지막 날 제가 장롱문 닦아 보며 닫아봤는데 그때는 멀쩡했어요.",
        "선우가 출입카드 한 장이 안 보인다고 식은땀 흘리면서도, 보증금 깎일까 봐 바로 말 못 하겠다고 한 건 기억합니다."
      ],
      "tp-2": [
        "민재씨가 새로 들어올 분들 앞에서 '전 세입자 때문에 집 상태가 엉망이었다'는 말을 한 건 제가 바로 옆에서 들었습니다.",
        "퇴거 특약은 같이 점검해서 확인된 손상만 정산하자는 취지였지, 보여주기 전에 생긴 흠집까지 전 세입자 몫으로 돌리라는 내용은 아니었어요."
      ],
      "tp-3": [
        "CCTV상 선우씨 퇴거 이후에 민재씨 쪽에서 사다리 들고 다시 들어간 시간이 분명히 남아 있습니다.",
        "관리실에 남은 옥상 관련 건은 오래전에 한 번 경고하고 끝난 수준이었고, 카드 재발급도 분쟁을 뒤집을 만큼 큰 금액은 아니었습니다."
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
        "유진은 꽃 작업 자재랑 캠핑 물건을 집에 다 들이기 어려워서 옥상 건조 자리랑 지하 한 칸을 계속 번갈아 썼어요.",
        "비밀번호 바뀐 날엔 박스가 복도에 나와 있어서 저도 같이 다시 옮겼고, 유진이 그때 '내 물건을 왜 말도 없이 건드리냐'고 많이 상해했습니다."
      ],
      "tp-2": [
        "입주 설명할 때 저는 옥상은 잠깐 말리거나 건조하는 공용 공간, 지하는 왼쪽 선반 한 칸 정도만 미리 알리고 쓰는 걸로 말했습니다.",
        "나중에 기성씨가 보낸 사용범위 정리 문자도, 처음 호의가 너무 넓게 받아들여졌다는 취지였지 전면 금지를 처음부터 통보한 건 아니었어요."
      ],
      "tp-3": [
        "점검 사진으로 보면 통로가 완전히 막힌 정도는 아니고, 화분대와 박스 때문에 일부 폭이 좁아져 정리가 필요한 수준이었습니다.",
        "지하 쪽도 배수구 주변에 적치가 있긴 했지만 즉시 대피 불가 수준으로까지 기록하지는 않았어요."
      ]
    }
  },
  "tenant-07": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "privacy_sensitive",
        "selective_quote"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "제가 아는 범위에서는 주변 원룸 시세 문의와 새 임차인 탐색 메시지를 직접 돌렸고, 아버지의 인상률 번복 시점도 알고 있다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "4% 인상 합의가 어떤 표현으로 정리됐는지, 서명본 전달 지연과 추가 인상 통보가 언제 나왔는지 직접 확인할 수 있다."
      ],
      "tp-3": [
        "재계약 상담 접수 시점과, 이미 합의된 조건을 뒤집는 분쟁이 언제 어떻게 접수됐는지 행정 기록으로 설명드릴 수 있습니다."
      ]
    }
  },
  "tenant-08": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "selective_quote"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "잘린 캡처나 편집본, 원본 기록이 섞인 쟁점이라 원본·로그를 맞대면 방어 프레임이 가장 빨리 무너진다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "제가 아는 범위에서는 지현 집에 스마트플러그를 설치했고, 작업용 PC와 제습기 사용량이 어느 정도였는지 가까이서 알고 있다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "관리대행 원본 고지 양식, 실제 회계 장부, 그리고 호준이 어떤 형식으로 상세표를 다시 만들어 보냈는지 직접 설명드릴 수 있습니다."
      ],
      "tp-3": [
        "세대 계량기와 공용 계량기의 원시 로그, 검침일, 비정상 사용 구간을 기관 기록으로 확인할 수 있다."
      ]
    }
  },
  "tenant-09": {
    "personalityTags": {
      "a": [
        "cold_logical",
        "fairness_obsessed",
        "privacy_sensitive",
        "selective_quote"
      ],
      "b": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
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
      "t-1": "fact",
      "t-2": "motive",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "제가 아는 범위에서는 세라가 창업자금 일부를 가족에게서 빌렸고, 정책자금 상담에서 큰 보증금 숫자가 필요하다고 여러 번 말한 사실을 안다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "제가 아는 범위에서는 초안 변경, 분할 송금, 허위 정리비 수납, 최종 스캔 파일 생성 순서를 가장 정확히 안다."
      ],
      "tp-3": [
        "세라가 제출한 계약서 보증금 액수와 실제 이체 증빙이 맞지 않았다는 상담 기록을 기관 기준으로 확인할 수 있다."
      ]
    }
  },
  "tenant-10": {
    "personalityTags": {
      "a": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "timeline_padding"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "제가 아는 범위에서는 민주가 입주 전 강아지 사진을 보내고 답을 기다리다 결국 괜찮은 줄 알고 함께 이사했다는 과정을 안다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "사진 전달과 답변 문구가 어떤 표현으로 오갔는지, 상훈이 명확한 승인이나 거절을 하지 않았는지 직접 기억한다."
      ],
      "tp-3": [
        "복도 민원 횟수, 실제 소음 정도, 공용부 오염 여부, 현관매트 세척 기록을 관리실 기준으로 설명드릴 수 있습니다."
      ]
    }
  },
  "tenant-11": {
    "personalityTags": {
      "a": [
        "victimizing",
        "face_sensitive",
        "counter_attack",
        "relationship_preserving"
      ],
      "b": [
        "cold_logical",
        "fairness_obsessed",
        "face_sensitive",
        "selective_quote"
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
      "t-1": "fact",
      "t-2": "fact",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "fact"
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "제가 아는 범위에서는 입주 초 나래와 함께 곰팡이 자국을 보고 페인트 작업을 도왔고, 이후 붙박이장 문이 떼어진 시점도 현장에서 봤다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "성필이 어느 범위까지 손봐도 된다고 말했는지, 그리고 퇴거 뒤 새 임차인 모집글에 어떤 문구가 쓰였는지 직접 들은 범위까지는 말씀드릴 수 있습니다."
      ],
      "tp-3": [
        "실제 시공 범위가 페인트·조명 수준을 넘어 어떤 고정 구조 변경까지 포함됐는지, 그리고 430만원 내역 중 고정 시공비가 얼마였는지 설명할 수 있다."
      ]
    }
  },
  "tenant-12": {
    "personalityTags": {
      "a": [
        "confrontational",
        "face_sensitive",
        "counter_attack",
        "selective_quote"
      ],
      "b": [
        "avoidant",
        "face_sensitive",
        "relationship_preserving",
        "privacy_sensitive"
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
      "t-1": "fact",
      "t-2": "motive",
      "t-3": "fact",
      "t-4": "fact",
      "t-5": "motive"
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
        "bestActionHint": "정황 다툼보다 실제 자료를 먼저 맞대야 과장과 누락이 빨리 드러난다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "왜 그런 선택을 했는지 이유를 말하게 만들면, 스스로 숨긴 구간이나 뒤늦은 정당화가 드러나기 쉽다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "사생활·평판 우려가 큰 쟁점이라 비공개 보장이 먼저 주어져야 숨긴 사실의 문이 열린다.",
        "worstActionReaction": "사실만 몰아붙이면 단어 정의나 일정 해석으로 숨어 버려 방어가 더 단단해진다."
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
        "bestActionHint": "기록과 원본 문서가 남는 쟁점이라, 말싸움보다 증거 대면이 가장 빨리 방어를 흔든다.",
        "worstActionReaction": "감정적 위로부터 주면 기록으로 확인할 사실을 계속 미루며 방어가 길어진다."
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
        "제가 아는 범위에서는 이웃에게서 '관리인이 문제 세입자라고 했다'는 말을 처음 전해 들은 시점과, 소담이 단톡방에 공개 반박 글을 올리게 된 경위를 안다. 다만 가까운 사람 일이라 제가 본 장면보다 더 좋게 해석했을 수는 있습니다."
      ],
      "tp-2": [
        "자신이 어떤 표현으로 4층 세입자 문제를 언급했는지, 누구에게 어떤 취지로 말했는지 가장 정확히 알고 있다."
      ],
      "tp-3": [
        "실제 민원 횟수, 건물 공지 이력, 확인된 소음·분리배출 기록이 어느 수준이었는지 원본 민원대장으로 확인할 수 있다."
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
        "재판관님, 전날 회의에서 보고서 뼈대는 서윤씨가 만든 프레임이라는 말이 분명 나왔습니다. 다만 최종 발신 명의는 팀장 쪽으로 간다는 관행을 다들 너무 당연하게 여기고 있었죠.",
        "제가 본부에서 봐 온 방식은 팀장 명의로 내더라도 본문이나 말미에 실무자 이름을 남기는 겁니다. 이번 제출본은 그 선을 벗어났다는 느낌이 있었습니다."
      ],
      "tp-2": [
        "HR 화면 기준으로 보면 v1에는 서윤씨가 '보고서 오너'였고, 태성씨 비공개 메모가 들어간 뒤 v2에서 '보조 분석'으로 내려갑니다. 저는 그 순서를 중요하게 봅니다.",
        "서윤씨가 고충을 정식 제출하진 않았지만 초안은 남아 있었습니다. 그래서 단순한 호칭 조정이었다고 보기엔 이미 문제의식이 누적돼 있었다고 판단했습니다."
      ],
      "tp-3": [
        "포렌식 추출본상 서윤씨의 마지막 정상 편집은 20시 17분입니다. 23시 41분대 기록은 관리자 대리발급 토큰이 공용 PC 세션에서 메타를 덮은 흔적이고요.",
        "태성씨 제출 PDF는 공식 추출본과 해시가 다릅니다. 그 파일만 가지고 '23시 48분 최종 수정자는 서윤'이라고 결론 내리는 건 원본성 기준에 맞지 않습니다."
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
        "제가 보고 라인에서 들은 건 규원씨가 조사 착수도 되기 전에 '민아씨부터 막아야 한다'는 취지로 말한 부분입니다. 그리고 실제로 권한이 먼저 빠졌습니다.",
        "다만 보안 원본 로그까지 본 사람은 아닙니다. 제가 말할 수 있는 건 팀 분위기가 민아씨를 이미 유출자로 받아들이는 쪽으로 움직였다는 사실입니다."
      ],
      "tp-2": [
        "HR 접수 원문에는 민아씨 면담 전에 이미 '보안상 위험 인물' 표현이 들어가 있습니다. 이후에 '주의 대상'으로 완화된 흔적까지 남아 있고요.",
        "같은 기록 안에 '비용 건은 감사 후'라는 취지와 민아씨의 보복 우려 진술이 나란히 있습니다. 저는 그래서 이 사안을 보안 이슈 하나로만 보지 않았습니다."
      ],
      "tp-3": [
        "원본 로그를 대조하면 민아씨의 개인 드라이브 업로드보다 두 시간 먼저 노지원 세션에서 공유링크 열람과 임시 다운로드 토큰 발급이 이어집니다.",
        "회의실 CCTV와 좌석 로그까지 붙여 보면 노지원이 그 시각 프린터 존을 오간 동선이 확인됩니다. 선행 반출 경로는 민아씨가 아니라 노지원 쪽입니다."
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
        "그 자리에서 HJ 얘기를 먼저 꺼낸 건 저였습니다. 제 기억으로는 '한재균 라인' 이야기가 먼저였고, 그다음에 도윤씨가 문제의 표현을 덧붙였습니다.",
        "희주씨는 그 순간 바로 옆에서 들은 사람이 아니었습니다. 다음 날 잘린 클립을 보고 자기 이야기로 받아들였을 가능성이 더 커 보였습니다."
      ],
      "tp-2": [
        "조직문화 상담 기록상 도윤씨의 '평판 리스크' 메모가 희주씨 면담보다 먼저 들어와 있습니다. 그리고 다음 날 리허설 배정표에서 희주씨 발표가 빠졌고요.",
        "누가 더 상처받았는지를 제가 재단하진 않겠습니다. 다만 사실 확인보다 선행 조치가 먼저였다는 순서만은 분명합니다."
      ],
      "tp-3": [
        "공유앨범 생성 로그를 보면 웃음 피크 지점부터 자동 하이라이트가 잘립니다. 그래서 대상 설명이 붙어 있던 앞 7.8초가 통째로 빠졌습니다.",
        "식당 CCTV상 클립 시각 전후에 희주씨는 다른 테이블 동선입니다. 즉, 현장 청취가 아니라 잘린 영상 해석이 오해의 출발점이 됐다는 뜻입니다."
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
        "스탠드업에서 민석씨가 '18시 전에 승인 체크하고 다시 얘기하겠다'고 말한 건 저도 들었습니다. 팀이 그 약속을 마감 기준으로 잡은 것도 사실이고요.",
        "클라이언트 회신이 늦어진 사정은 있었습니다. 그래도 그 사이 상태가 바뀌었다면 팀에 중간 공유가 다시 들어왔어야 한다고 봅니다."
      ],
      "tp-2": [
        "보드 이력으로 보면 19시 48분에 scope freeze가 풀리고 카피 하위 작업이 추가됩니다. 그런데 담당자는 그대로라 QA 쪽에 공식 재배정이 안 됐습니다.",
        "또 지우씨가 체크리스트를 초록으로 바꾼 시점엔 회귀 테스트 로그가 아직 비어 있었어요. 저는 그래서 한 사람 실수로만 정리하긴 어렵다고 봅니다."
      ],
      "tp-3": [
        "파이프라인 raw log에 20시 31분 누락 파일 경고와 테스트 미완료 알림이 같은 배치로 찍혀 있습니다. 민석씨와 지우씨 둘 다 그 알림을 열람한 흔적도 남아 있고요.",
        "운영 관점에선 승인 지연, 파일 교체, 회귀 미완료가 한꺼번에 겹친 사고입니다. 한쪽 로그만 떼어 보면 원인 진단이 어긋납니다."
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
        "상혁씨가 브리핑 막판에 제게 '공동기획자 표기를 넣는 게 맞겠냐'고 한번 묻긴 했습니다. 그 질문 자체가 가은씨 기여를 알고 있었다는 뜻으로 들렸습니다.",
        "최종 발표자는 상혁씨였지만, 초안 구조를 누가 짰는지는 본부 안에서도 다들 어느 정도 알고 있었습니다. 그래서 이름이 빠진 최종본이 더 낯설었습니다."
      ],
      "tp-2": [
        "2년 전 보류본 주석을 열어 보면 지금 '고객회복 랩'에서 쓰는 실험명과 거의 같은 표현이 이미 들어 있습니다. 나중에 가은씨가 그 구조를 템플릿으로 옮길 때 저도 일부를 봤고요.",
        "그래서 저는 이번 안건을 어느 한 사람의 순수 창작이라고는 말하지 않습니다. 예전 파일의 뼈대가 현재 안건 안에 분명 이어져 있습니다."
      ],
      "tp-3": [
        "승진 운영 로그상 'source citation risk' 비공개 메모가 가은씨 해명 전에 먼저 입력됐고, 발표 순서 변경은 그 다음 배치에서 처리됐습니다.",
        "또 권한 회수 직전 승진위 폴더 일괄 다운로드가 있었고, DLP상 같은 파일 해시가 멘토방 쪽 전송 기록과 이어집니다. 두 흐름이 시간상 붙어 있습니다."
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
        "통합 첫 주에 준호씨가 수치 안정화 압박을 받은 건 맞습니다. 하지만 그 공지가 준호씨 혼자 계정과 기준을 바꾸라는 뜻은 아니었습니다.",
        "제 기억에 킥오프 설명은 '둘이 같이 보고 PM에게 남겨라'에 가까웠습니다. 어느 한쪽에 전권을 줬다는 식으로 들리진 않았습니다."
      ],
      "tp-2": [
        "임시 RACI에는 계정 재배정과 라우팅 수정 둘 다 'co-sign + PM log'가 붙어 있습니다. 실제론 두 분 모두 체크리스트만 열어보고 PM 핑은 늦었습니다.",
        "공지 문구가 완벽히 친절했던 건 아니지만, 에스컬레이션 통로 자체가 없던 건 아닙니다. 기록을 남기지 않은 채 각자 먼저 손댄 게 문제였습니다."
      ],
      "tp-3": [
        "권한관리 콘솔상 서린씨 계정엔 삭제됐어야 할 레거시 관리자 그룹이 남아 있었습니다. 같은 세션에서 새벽 라우팅 규칙과 벤더 태그 수정이 이어졌고요.",
        "CRM 감사 로그를 보면 준호씨는 대량 오너십 재배정 뒤에 헬스 점수 임계값까지 건드립니다. 두 조치 모두 원본 로그 기준으로 확인됩니다."
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
        "재판관님, 게시판 글이 뜬 직후 태욱씨가 '출하 지연보다 여론이 먼저 번지면 더 위험하다'고 보고한 건 기억합니다. 그때도 원본 채팅을 따로 보자고 했고요.",
        "제가 아는 건 공식 라인 안의 흐름입니다. 태욱씨가 세린씨를 좋게 보지 않은 건 맞지만, e-2 캡처의 진위까지 본부 차원에서 확인한 상태는 아니었습니다."
      ],
      "tp-2": [
        "조사실에서 확인한 건 단순히 글이 있었단 정도가 아닙니다. 게시판 보존 시각, 태욱씨가 먼저 의심을 굳힌 장면, 세린씨가 보복을 걱정한 진술이 시간순으로 맞물려 있었습니다.",
        "평가 기록은 표현이 바뀌어도 입력 순서는 남습니다. 그래서 저는 '협업 부적합' 코멘트가 조사보다 뒤늦게 생긴 게 아니라는 점을 중요하게 봤습니다."
      ],
      "tp-3": [
        "포렌식 기준으로 말씀드리면, 문제 캡처 본문은 2년 전 메시지 해시와 일치하고 상단 헤더만 현재 프로젝트 채널 값입니다. 한 장짜리 원본 캡처로 보기 어렵습니다.",
        "편집 PC 로그를 대조하면 세린씨 단말에서 레이어가 합쳐진 흔적이 남습니다. 이번 사건 삭제 지시 원문은 export 어디에도 없었습니다."
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
        "정훈씨가 감사 전에 제게 올린 보고는 '운영 쪽 정산 실수 하나가 있다'는 톤이었습니다. 처음부터 나래씨 단독 일탈로 보겠다는 말은 아니었습니다.",
        "승진 심사 직전이라 비용통제 얘기에 민감했던 건 사실입니다. 다만 주말 결제를 개인분으로 메우고 닫자는 분위기가 있었다는 정도까진 저도 감지했습니다."
      ],
      "tp-2": [
        "제가 클로징 폴더를 정리할 때 상계표에 상환 예정일이랑 정훈 이니셜이 이미 들어가 있었습니다. 감사 뒤에 급조된 문서는 아니라는 뜻입니다.",
        "나래씨가 보류 탭 묶는 방식은 봤지만, 그건 혼자 꾸민 표라기보다 둘이 구두로 미루던 건을 제가 시트로 옮긴 모양새에 가까웠어요."
      ],
      "tp-3": [
        "원본 영수증과 재발급본을 겹쳐 보면 빠진 품목이 선명합니다. 새벽 2시 POS 수정 요청은 단순 정리라기보다 감사 대응용 세탁으로 읽힙니다.",
        "반대로 정훈씨 PDF는 카드사 원본 열 구성이 아니었습니다. 상환 메모와 보류 코드가 잘린 채 문제 결제만 남아 있어, 그 파일만으로 나래씨 조작을 말하긴 어렵습니다."
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
        "미팅 끝나고 준석씨가 '은채씨는 당분간 후속선에서 빼자'고 한 건 들었습니다. 자료가 어디서 샜는지 확인도 되기 전이어서 저도 성급하다고 느꼈습니다.",
        "그 계정이 큰 건 맞습니다만, 계정 보호라는 말이 은채씨 역할 축소를 너무 빨리 정당화하는 데 쓰였다는 인상은 있었습니다."
      ],
      "tp-2": [
        "제가 받은 건 내부 슬랙 화면 캡처랑 '팀장이 잘못 보낸 거 아니냐'는 DM이었습니다. 확인 요청이라 해도 외부 파트너 입장에선 내부 책임공방이 바로 읽혔어요.",
        "그리고 거래처가 본 문서는 내부 준비본이 아니었습니다. 저희 쪽에선 클라이언트용 공유본과 회의요약 메일만 돌았고, 제목이 같아서 다들 헷갈린 겁니다."
      ],
      "tp-3": [
        "관리자 로그상 '공유본_팔콘'은 제목만 같고 문서 ID가 둘입니다. 외부 도메인이 연 건 클라이언트용 쪽이고, 내부 준비본은 외부 열람 0건으로 남습니다.",
        "준석씨 PDF는 제목만 보이게 잘려 있었습니다. 보안관리 쪽에선 그런 발췌본보다 링크 해시와 권한맵을 같이 봐야 누가 뭘 열었는지 단정할 수 있습니다."
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
        "도현씨가 팀을 붙잡아야 한다며 혜린씨 전환 얘기를 꺼낸 시점은 기억합니다. 하지만 본부 승인 자체가 완전히 닫혀 있었던 때는 아니었어요.",
        "런칭 직후에도 '이번 사이클만 넘기면 올린다'는 말이 반복됐다는 보고를 여러 번 받았습니다. 그래서 저도 기대를 만들었다는 점은 부정하기 어렵다고 봅니다."
      ],
      "tp-2": [
        "HR 트래커에는 슬롯이 보류이면서도 재요청 가능으로 남아 있었습니다. 그런데 도현씨의 commitment concern 메모가 그보다 먼저 들어간 건 분명합니다.",
        "연장 기록을 보면 혜린씨가 핵심 런칭과 교육 업무를 맡은 시기마다 전환 기대 문장이 같이 붙어 있습니다. 단순 격려라고만 보긴 어려워요."
      ],
      "tp-3": [
        "노무 쪽에선 타사 계약서 체결일, 출입 기록, VPN 세션을 같이 봅니다. 혜린씨는 전환 발표 전 이미 다른 고정 근무 계약과 시간이 일부 겹쳤습니다.",
        "다만 로그는 병행 사실을 보여줄 뿐, 그 선택이 왜 나왔는지까지 말해주진 않습니다. 약속 번복과 생계 불안이 같이 있었던 건 별도 맥락으로 봐야 합니다."
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
        "브리핑 자료를 보면 청구항 뼈대는 서린씨 초안에서 온 부분이 적지 않습니다. 그런데 발표 직전엔 대표 발명자 설명이 태준씨 쪽으로 너무 정리돼 있었어요.",
        "태준씨가 '대표성 문제'라고 설명한 건 들었지만, 그 말이 서린씨 이름을 빼도 된다는 뜻까진 아니었습니다."
      ],
      "tp-2": [
        "서린씨가 보낸 ZIP엔 아이디어 수준만 있는 게 아니라 청구항 문장과 실험 요약이 같이 들어 있었습니다. 태준씨 쪽에서도 추가 청구항 요구가 이어졌고요.",
        "처음엔 브로커 검토 1건처럼 시작했지만, 링크가 다른 사람 손을 타기 시작하면서 범위가 커졌습니다. 수수료 얘기까지 오간 건 사실입니다."
      ],
      "tp-3": [
        "DLP 경보만 보면 서린씨 단독 유출처럼 보일 수 있습니다. 하지만 원본 SMTP 로그와 외부 공유 링크를 붙이면 브로커 뒤 재전송 세션이 또 잡힙니다.",
        "가상자산 입금 추적까지 맞춰보면, 둘 사이 갈등이 단순한 발명자 다툼만은 아니었다는 정황이 나옵니다. 자료 전달과 대가 흐름이 같이 남아 있으니까요."
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
        "회사 재택지침은 상태창과 티켓 응답 관리가 기본이지, 거실 배경까지 보이는 웹캠 상시 점검을 허용하진 않습니다. 지훈씨 공지는 그 선을 넘었습니다.",
        "응답률이 떨어져 압박이 컸던 건 맞지만, 그래서 관리자 개인 규칙을 먼저 적용해도 된다는 뜻은 아니었습니다."
      ],
      "tp-2": [
        "수민씨 민원엔 집 안 배경까지 비추라는 요구가 반복됐다는 취지가 들어 있었습니다. 동시에 지훈씨 근태 메모에는 응답 공백과 캡처 제출 요구가 나란히 남아 있었고요.",
        "HR에서 보기엔 두 문제가 따로입니다. 사생활 침범 소지가 있는 관리 방식과, 수민씨가 상태를 편집해 보고한 건 각각 분리해서 봐야 했습니다."
      ],
      "tp-3": [
        "엔드포인트 로그를 보면 타이핑은 없는데 커서만 일정 간격으로 흔들립니다. 전형적인 지글러 패턴이라 장시간 자리 비움을 의심할 만합니다.",
        "또 raw export엔 정상 응답 구간이 꽤 남아 있는데, HR 제출 PDF엔 유휴 장면만 모여 있었습니다. 요약 방식 자체가 이미 한쪽으로 기울어 있었던 셈입니다."
      ]
    }
  }
}
