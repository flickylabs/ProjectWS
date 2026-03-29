/**
 * 사건별 진실 공개 정책 (truthPolicy)
 * v4: GPT Pro 작성, caseId x party x disputeId x lieState 단위
 * 현재 3개 사건 샘플. 나머지 81개는 일반 규칙으로 폴백.
 */

export interface TruthPolicyEntry {
  allowed: string[]
  forbidden: string[]
}

export type LieStateKey = "S0" | "S1" | "S2" | "S3" | "S4" | "S5"

/** caseId → party → disputeId → lieState → { allowed, forbidden } */
export const TRUTH_POLICIES: Record<string, Record<string, Record<string, Record<LieStateKey, TruthPolicyEntry>>>> = {
  "spouse-01": {
    "a": {
      "d-1": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-3": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-3"
          ],
          "forbidden": [
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-5": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    },
    "b": {
      "d-2": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-4": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S4": {
          "allowed": [
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-5": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    }
  },
  "workplace-01": {
    "a": {
      "d-1": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-3": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-4": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    },
    "b": {
      "d-1": {
        "S0": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-2": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-2"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-5": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    }
  },
  "friend-01": {
    "a": {
      "d-1": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-1"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-3": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-4": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    },
    "b": {
      "d-2": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-2"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-3": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      },
      "d-5": {
        "S0": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S1": {
          "allowed": [],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S2": {
          "allowed": [
            "t-2"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S3": {
          "allowed": [
            "t-2"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4"
          ]
        },
        "S5": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": []
        }
      }
    }
  }
}

/**
 * 정책이 없는 사건/쟁점에 대한 폴백 규칙:
 * - S0~S1: 모두 forbidden
 * - S2~S3: anchorTruth만 forbidden, 나머지 allowed
 * - S4: anchorTruth만 forbidden
 * - S5: 모두 allowed
 */
export function getFallbackPolicy(
  allTruthIds: string[],
  anchorTruthIds: string[],
  lieState: LieStateKey,
): TruthPolicyEntry {
  const stateNum = parseInt(lieState.slice(1))
  if (stateNum <= 1) return { allowed: [], forbidden: [...allTruthIds] }
  if (stateNum <= 3) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }
  if (stateNum === 4) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }
  return { allowed: [...allTruthIds], forbidden: [] }
}
