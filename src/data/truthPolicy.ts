/**
 * 사건별 진실 공개 정책 (truthPolicy)
 * 자동 생성 — 84개 사건
 */

export interface TruthPolicyEntry {
  allowed: string[]
  forbidden: string[]
}

export type LieStateKey = "S0" | "S1" | "S2" | "S3" | "S4" | "S5"

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
  "spouse-02": {
    "a": {
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
      }
    },
    "b": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "spouse-03": {
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
  "spouse-04": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-2",
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
    }
  },
  "spouse-05": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-3",
            "t-5"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
    },
    "b": {
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
            "t-1",
            "t-2",
            "t-5"
          ],
          "forbidden": [
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
  "spouse-06": {
    "a": {
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
      }
    }
  },
  "spouse-07": {
    "a": {
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
            "t-2",
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-3",
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
  "spouse-08": {
    "a": {
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
            "t-1",
            "t-3",
            "t-5"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
  "spouse-09": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
  },
  "spouse-10": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-3",
            "t-4"
          ]
        },
        "S4": {
          "allowed": [
            "t-2",
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
    },
    "b": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
      }
    }
  },
  "spouse-11": {
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
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-2",
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-1",
            "t-3"
          ],
          "forbidden": [
            "t-2",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-2",
            "t-3",
            "t-5"
          ],
          "forbidden": [
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
  "spouse-12": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
    },
    "b": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "family-01": {
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
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
            "t-5",
            "t-4"
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
  },
  "family-02": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
      }
    },
    "b": {
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
  "family-03": {
    "a": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
      }
    }
  },
  "family-04": {
    "a": {
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
    },
    "b": {
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
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
      }
    }
  },
  "family-05": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
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
      }
    }
  },
  "family-06": {
    "a": {
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
            "t-2",
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
      }
    },
    "b": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
  "family-07": {
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
      }
    }
  },
  "family-08": {
    "a": {
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
            "t-5",
            "t-4"
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
    },
    "b": {
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
            "t-5",
            "t-3"
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
  "family-09": {
    "a": {
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
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
    },
    "b": {
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
      },
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
      }
    }
  },
  "family-10": {
    "a": {
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
            "t-5",
            "t-4"
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  },
  "family-11": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-1"
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
            "t-3",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
            "t-4",
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
  },
  "family-12": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-1"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
  },
  "friend-02": {
    "a": {
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
      }
    },
    "b": {
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
  "friend-03": {
    "a": {
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
    },
    "b": {
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
      }
    }
  },
  "friend-04": {
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
  "friend-05": {
    "a": {
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
    },
    "b": {
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
      }
    }
  },
  "friend-06": {
    "a": {
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
    },
    "b": {
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
      }
    }
  },
  "friend-07": {
    "a": {
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
    },
    "b": {
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
  "friend-08": {
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
  "friend-09": {
    "a": {
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
    },
    "b": {
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
      }
    }
  },
  "friend-10": {
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
  "friend-11": {
    "a": {
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
    },
    "b": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
            "t-2",
            "t-3",
            "t-4"
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
  "friend-12": {
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
            "t-2",
            "t-5"
          ],
          "forbidden": [
            "t-1",
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
  "workplace-02": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-03": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-04": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-05": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-06": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-07": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
            "t-5",
            "t-2"
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
  "workplace-08": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-09": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-10": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-11": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
  "workplace-12": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
    }
  },
  "neighbor-01": {
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
  },
  "neighbor-02": {
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
  },
  "neighbor-03": {
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
  },
  "neighbor-04": {
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
            "t-1"
          ],
          "forbidden": [
            "t-2",
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
  },
  "neighbor-05": {
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
  },
  "neighbor-06": {
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
  },
  "neighbor-07": {
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
  },
  "neighbor-08": {
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
  },
  "neighbor-09": {
    "a": {
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
      }
    },
    "b": {
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
            "t-1"
          ],
          "forbidden": [
            "t-2",
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
  },
  "neighbor-10": {
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
  },
  "neighbor-11": {
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
  },
  "neighbor-12": {
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
            "t-1"
          ],
          "forbidden": [
            "t-2",
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
  },
  "partnership-01": {
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
            "t-1",
            "t-5"
          ],
          "forbidden": [
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
            "t-2"
          ],
          "forbidden": [
            "t-1",
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
    },
    "b": {
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
            "t-2"
          ],
          "forbidden": [
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
      }
    }
  },
  "partnership-02": {
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
            "t-1"
          ],
          "forbidden": [
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
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-5",
            "t-2"
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-03": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-1"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-04": {
    "a": {
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
            "t-2"
          ],
          "forbidden": [
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
            "t-5",
            "t-3"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-1"
          ],
          "forbidden": [
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
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
    }
  },
  "partnership-05": {
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
            "t-1"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-06": {
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
            "t-1"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-2"
          ],
          "forbidden": [
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
            "t-1",
            "t-2"
          ],
          "forbidden": [
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-2",
            "t-5"
          ],
          "forbidden": [
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
  "partnership-07": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-2"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-5",
            "t-4"
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
    },
    "b": {
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
            "t-1"
          ],
          "forbidden": [
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
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
    }
  },
  "partnership-08": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-1"
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-09": {
    "a": {
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
            "t-1"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-10": {
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
            "t-1"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-2"
          ],
          "forbidden": [
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
      }
    }
  },
  "partnership-11": {
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
            "t-1"
          ],
          "forbidden": [
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
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-1",
            "t-2"
          ],
          "forbidden": [
            "t-3",
            "t-4",
            "t-5"
          ]
        },
        "S4": {
          "allowed": [
            "t-1",
            "t-2",
            "t-5"
          ],
          "forbidden": [
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "partnership-12": {
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
            "t-1"
          ],
          "forbidden": [
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
            "t-5",
            "t-3"
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
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-2"
          ],
          "forbidden": [
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
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "tenant-01": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
    },
    "b": {
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
            "t-5",
            "t-4"
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
  "tenant-02": {
    "a": {
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
            "t-5",
            "t-3"
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
      }
    },
    "b": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-3",
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5",
            "t-4"
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
  "tenant-03": {
    "a": {
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
            "t-4",
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-2"
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
    },
    "b": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-3",
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5",
            "t-2"
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
  },
  "tenant-04": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-5",
            "t-3"
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-4",
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5",
            "t-3"
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
      }
    }
  },
  "tenant-05": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-4",
            "t-1"
          ],
          "forbidden": [
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
            "t-5",
            "t-2"
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
    },
    "b": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-5",
            "t-2"
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
  },
  "tenant-06": {
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-2",
            "t-4"
          ],
          "forbidden": [
            "t-1",
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
            "t-5",
            "t-4"
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
    },
    "b": {
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
            "t-1",
            "t-2"
          ],
          "forbidden": [
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
            "t-5",
            "t-4"
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
  "tenant-07": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-3",
            "t-2"
          ],
          "forbidden": [
            "t-1",
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
            "t-2",
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
            "t-5",
            "t-1"
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
    }
  },
  "tenant-08": {
    "a": {
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
            "t-2",
            "t-3"
          ],
          "forbidden": [
            "t-1",
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
      }
    },
    "b": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-3",
            "t-2"
          ],
          "forbidden": [
            "t-1",
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
            "t-5",
            "t-1"
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
  "tenant-09": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-2",
            "t-1"
          ],
          "forbidden": [
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
            "t-4",
            "t-3"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-5",
            "t-1"
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
            "t-3",
            "t-4"
          ],
          "forbidden": [
            "t-1",
            "t-2",
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
            "t-1",
            "t-2"
          ],
          "forbidden": [
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
      }
    }
  },
  "tenant-10": {
    "a": {
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
            "t-2",
            "t-1"
          ],
          "forbidden": [
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
      },
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
      }
    },
    "b": {
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
            "t-3",
            "t-1"
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
            "t-5",
            "t-4"
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
  "tenant-11": {
    "a": {
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
            "t-5"
          ],
          "forbidden": [
            "t-1",
            "t-2",
            "t-3",
            "t-4"
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
            "t-3",
            "t-2"
          ],
          "forbidden": [
            "t-1",
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
            "t-4",
            "t-1"
          ],
          "forbidden": [
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
            "t-5",
            "t-2"
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
      },
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
            "t-1",
            "t-4"
          ],
          "forbidden": [
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
    }
  },
  "tenant-12": {
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
            "t-1",
            "t-2"
          ],
          "forbidden": [
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
            "t-2",
            "t-1"
          ],
          "forbidden": [
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
            "t-5",
            "t-3"
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
    }
  }
}

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
