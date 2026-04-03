export const workplace04TellsBeats = {
  "caseId": "workplace-04",
  "executableTells": {
    "a": [
      {
        "id": "workplace-04:a:tell:deadline_shield",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "18시",
          "다들 급했습니다"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "개별 약속을 묻는 질문에도 '그 시간엔 다들 급했다'며 전체 마감 상황을 방패로 쓴다."
      },
      {
        "id": "workplace-04:a:tell:soft_promise_reframe",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "제가 보겠다고는 했지만",
          "확정 승인"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "'내가 볼게'라는 말을 확정 약속이 아니라 협업 의사처럼 재정의한다."
      },
      {
        "id": "workplace-04:a:tell:sequence_blur",
        "appliesWhen": [
          "avoiding",
          "lying",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "승인 메일",
          "보드 업데이트"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "누가 먼저 놓쳤는지 대신 여러 이슈를 한꺼번에 나열해 순서를 흐린다."
      }
    ],
    "b": [
      {
        "id": "workplace-04:b:tell:quote_back",
        "appliesWhen": [
          "lying",
          "defensive",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "그 문장 그대로",
          "정확히"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대의 한 문장을 그대로 읽어주며 자신의 과장을 잠시 가린다."
      },
      {
        "id": "workplace-04:b:tell:term_shrink",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "거의 끝났다",
          "표현 문제"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "'끝났다'를 '거의 끝났다'로 바꾸는 식으로 표현 범위를 뒤늦게 줄인다."
      },
      {
        "id": "workplace-04:b:tell:speed_spike",
        "appliesWhen": [
          "emotional",
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "지금도",
          "짧게 말씀드리면"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "억울함이 커지면 말속도가 빨라지고 문장 끝이 짧아져 공격적으로 들린다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-04:beat:a:d-1:deny",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "18시 안에 제가 확정 승인을 끝내겠다고 한 적은 없어요. 다들 급했습니다, 승인 메일이랑 보드 업데이트가 한꺼번에 움직였어요.",
      "behaviorHint": "시선을 잠깐 내리고 일정표부터 읊으며 답을 넓힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-1:hedge",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 보겠다고는 했지만 그 말을 확정 승인으로만 들으시면 곤란해요. 18시 무렵엔 다들 급했습니다, 승인 메일과 보드 업데이트를 같이 정리하는 상황이었어요.",
      "behaviorHint": "손끝으로 허공에 순서를 짚으며 말을 길게 잇는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-1:partial",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "18시 전에 제가 보겠다고는 했지만, 다만 확정 승인까지 끝낸다고 못 박은 건 아니에요. 승인 메일이 늦었고 보드 업데이트도 겹쳤어요.",
      "behaviorHint": "한숨을 삼키고 일부 사실만 조심스럽게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-1:blame",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "18시 약속을 제가 가볍게 말한 책임은 있어요. 그래도 배지우 씨 쪽도 승인 메일만 기다린 게 아니라 QA 상태와 보드 업데이트를 같이 올려줬어야 했어요.",
      "behaviorHint": "고개를 끄덕였다가 곧바로 상대 쪽 책임을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-1:evidence_hit",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "클라이언트 승인 이메일 체인 같은 기록까지 나오면 18시 약속을 부정할 수는 없어요. 제가 보겠다고는 했지만이라는 말로 넘기기엔, 승인 메일과 보드 업데이트가 비어 있었던 게 그대로 보이네요.",
      "behaviorHint": "제시된 기록을 보자 목소리가 낮아지고 말끝이 느려진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-04:beat:a:d-1:confession",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 18시까지 보겠다고 말해 놓고 확정 승인을 끝내지 못한 건 제 잘못이에요. 승인 메일이 늦어도 제가 먼저 보드 업데이트와 중간 공유를 했어야 했고, 그 책임은 제 책임이에요.",
      "behaviorHint": "어깨를 내리고 재판관 쪽을 보며 책임을 또렷이 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-3:deny",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 18시 지연이 전부라는 말은 사실이 아니라고 봐요. 다들 급했습니다, 승인 메일과 보드 업데이트 말고도 QA 흐름이 같이 흔들렸어요.",
      "behaviorHint": "시선을 잠깐 내리고 일정표부터 읊으며 답을 넓힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-3:hedge",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 보겠다고는 했지만 그게 전체 실패 원인 전부라는 식은 아니에요. 18시 전후로 승인 메일, 보드 업데이트, 테스트 확인이 겹쳤어요.",
      "behaviorHint": "손끝으로 허공에 순서를 짚으며 말을 길게 잇는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-3:partial",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "저는 제 판단이 늦어져 일정이 흔들린 건 맞다고 봐요. 다만 18시 이후엔 승인 메일만이 아니라 보드 업데이트와 QA 확인도 같이 밀렸어요.",
      "behaviorHint": "한숨을 삼키고 일부 사실만 조심스럽게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-3:blame",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "저는 18시 약속을 무겁게 못 다룬 건 제 책임이라고 봐요. 그래도 배지우 씨 쪽도 승인 메일만 보지 말고 QA 진행과 보드 업데이트 누락을 바로 보고했어야 했어요.",
      "behaviorHint": "고개를 끄덕였다가 곧바로 상대 쪽 책임을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-3:evidence_hit",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "저는 파이프라인 로그와 회의록까지 같이 나오면 이번 실패를 18시 승인 문제 하나로만 볼 수는 없어요. 다들 급했습니다라는 말로 넘길 일이 아니라, 승인 메일과 보드 업데이트 누락이 QA 문제랑 겹쳤다는 게 보이네요.",
      "behaviorHint": "제시된 기록을 보자 목소리가 낮아지고 말끝이 느려진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-04:beat:a:d-3:confession",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 승인 메일 지연과 보드 업데이트 누락을 동시에 방치해서 마감 실패를 키운 건 제 잘못이에요. 원인을 한 줄로 덮지 않고, 제가 18시 약속을 흐린 부분까지 제 책임으로 인정하겠습니다.",
      "behaviorHint": "어깨를 내리고 재판관 쪽을 보며 책임을 또렷이 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-4:deny",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 마감 직전에 새 범위를 공식으로 추가한 적은 없어요. 다들 급했습니다, 승인 메일 확인이랑 보드 업데이트만 맞추려던 거예요.",
      "behaviorHint": "시선을 잠깐 내리고 일정표부터 읊으며 답을 넓힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-4:hedge",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "제가 보겠다고는 했지만 그건 카피 수정까지 묶어 확인하자는 취지였어요. 확정 승인 전에 다들 급했습니다, 보드 업데이트가 잠깐 늦은 정도예요.",
      "behaviorHint": "손끝으로 허공에 순서를 짚으며 말을 길게 잇는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-4:partial",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "카피 수정을 막판에 붙인 건 맞아요. 다만 제가 보겠다고는 했지만 확정 승인 전에 보드 업데이트를 바로 못 한 거지, 범위를 숨기려던 건 아니에요.",
      "behaviorHint": "한숨을 삼키고 일부 사실만 조심스럽게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-4:blame",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "저는 보드 업데이트를 놓친 건 제 책임이라고 봐요. 그래도 배지우 씨 쪽도 다들 급했습니다라는 상황에서 카피 수정이 붙은 뒤 승인 메일만 기다리지 말고 QA 영향 범위를 바로 적어줬어야 했어요.",
      "behaviorHint": "고개를 끄덕였다가 곧바로 상대 쪽 책임을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:a:d-4:evidence_hit",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "task board 버전 이력 같은 기록까지 나오면 제가 범위를 안 늘렸다고는 못 하겠어요. 다들 급했습니다라고 해도, 확정 승인 전에 보드 업데이트 없이 카피 수정을 넣은 건 그대로 보이네요.",
      "behaviorHint": "제시된 기록을 보자 목소리가 낮아지고 말끝이 느려진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-04:beat:a:d-4:confession",
      "caseId": "workplace-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 보겠다고는 했지만 카피 수정을 추가해 놓고 보드 업데이트와 담당 재배정을 안 한 건 제 잘못이에요. 확정 승인 전에 정리했어야 했는데, 그 책임은 제 책임이에요.",
      "behaviorHint": "어깨를 내리고 재판관 쪽을 보며 책임을 또렷이 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-2:deny",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 QA를 끝나지 않았는데 끝났다고 적은 적 없습니다. 그 문장 그대로 보셔도 정확히 배포 가능 여부만 본 거고, 지금도 표현 문제는 아니라고 생각해요.",
      "behaviorHint": "상체를 앞으로 기울이고 짧게 끊어 말하며 맞받아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-2:hedge",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "짧게 말씀드리면, 저는 거의 끝났다 쪽에 가깝게 적은 거예요. 그 문장 그대로만 보면 세 보일 수 있지만 정확히는 표현 문제였어요.",
      "behaviorHint": "손으로 문장을 자르듯 허공을 긋고 표현 차이라고 밀어붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-2:partial",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 완료처럼 보이게 적은 건 맞잖아요. 다만 짧게 말씀드리면, 정확히는 회귀 전체가 아니라 배포 가능 여부만 본 거고 거의 끝났다를 거칠게 쓴 표현 문제였어요.",
      "behaviorHint": "입술을 깨물었다가 곧바로 문구 범위를 줄여 설명한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-2:blame",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 문구를 세게 쓴 책임은 있어요. 그래도 서민석 씨 쪽도 지금도 그 문장 그대로 보고 안심만 하지 말고, 정확히 무엇이 끝났는지 다시 물었어야 하잖아요.",
      "behaviorHint": "고개를 세게 젓고 상대 이름을 찍듯 발음하며 책임을 되돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-2:evidence_hit",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "QA 체크리스트 내역과 테스트 실행 로그 원본까지 나오면 제가 정확히 끝난 척했다는 건 부정 못 하잖아요. 그 문장 그대로 남아 있고, 지금도 그걸 거의 끝났다 수준으로 돌리기엔 표현 문제가 너무 컸네요.",
      "behaviorHint": "증거를 본 뒤 속도가 잠깐 줄지만 곧 다시 날카롭게 말을 잇는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-04:beat:b:d-2:confession",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 QA가 다 끝난 것처럼 적은 건 제 잘못이잖아요. 짧게 말씀드리면, 거의 끝났다 수준을 완료처럼 보이게 만든 표현 문제였고 그 책임은 제 책임이에요.",
      "behaviorHint": "호흡을 길게 내쉬고 눈을 피하지 않은 채 자기 책임을 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-3:deny",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "이번 실패가 공동 책임이라는 말은 저는 동의 못 하잖아요. 그 문장 그대로 보면 정확히 서민석 씨 승인 약속이 먼저였고, 지금도 시작점은 거기라고 봐요.",
      "behaviorHint": "상체를 앞으로 기울이고 짧게 끊어 말하며 맞받아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-3:hedge",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "짧게 말씀드리면, 그 문장 그대로 시작점은 서민석 씨 쪽이 맞지만 제가 적은 표현도 세게 보일 수는 있잖아요. 그래도 정확히 따지면 먼저 깨진 약속은 그쪽이었어요.",
      "behaviorHint": "손으로 문장을 자르듯 허공을 긋고 표현 차이라고 밀어붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-3:partial",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "저는 서민석 씨 약속이 먼저 흔들린 건 맞다고 봐요. 다만 지금도 정확히 따지면 제 QA 보고도 공동 책임 한 축이었고, 그 문장 그대로만 밀어붙이긴 어려워요.",
      "behaviorHint": "입술을 깨물었다가 곧바로 문구 범위를 줄여 설명한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-3:blame",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 제 쪽 문제를 작게 말한 책임은 있어요. 그래도 서민석 씨 쪽도 지금도 그 문장 그대로 약속을 남겨 놓고 정확히 중간 공유를 안 했으니, 저한테만 돌릴 수는 없잖아요.",
      "behaviorHint": "고개를 세게 젓고 상대 이름을 찍듯 발음하며 책임을 되돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-3:evidence_hit",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "저는 배포 파이프라인 실패 로그까지 붙으면 지금도 이걸 한 사람 문제로만 말하긴 어렵잖아요. 정확히 보면 그 문장 그대로 약속 파기, QA 과장, 미보고가 같이 남아 있네요.",
      "behaviorHint": "증거를 본 뒤 속도가 잠깐 줄지만 곧 다시 날카롭게 말을 잇는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-04:beat:b:d-3:confession",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 공동 책임이라는 점을 끝까지 세게 인정하지 않은 건 제 잘못이잖아요. 짧게 말씀드리면, 그 문장 그대로 민석 씨 약속만 붙잡은 사이 제 QA 표현 문제 책임도 같이 커졌고 그건 제 책임이에요.",
      "behaviorHint": "호흡을 길게 내쉬고 눈을 피하지 않은 채 자기 책임을 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-5:deny",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 문제 신호를 보고도 일부러 숨긴 적 없잖아요. 그 문장 그대로 기록을 봐도 정확히 저는 기다린 거고, 지금도 미보고라고 단정할 일은 아니에요.",
      "behaviorHint": "상체를 앞으로 기울이고 짧게 끊어 말하며 맞받아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-5:hedge",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "짧게 말씀드리면 저는 거의 끝났다 쪽으로 생각해서 바로 올리지 않은 거예요. 정확히 말하면 표현 문제와 판단 미스가 섞인 거지, 일부러 숨긴 건 아니잖아요.",
      "behaviorHint": "손으로 문장을 자르듯 허공을 긋고 표현 차이라고 밀어붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-5:partial",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 20시대 신호를 보고도 바로 말 안 한 건 맞잖아요. 다만 지금도 그때는 그 문장 그대로 서민석 씨가 최종 정리를 할 줄 알았고, 정확히는 기다린 쪽에 가까웠어요.",
      "behaviorHint": "입술을 깨물었다가 곧바로 문구 범위를 줄여 설명한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-5:blame",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 먼저 에스컬레이션 안 한 책임은 있어요. 그래도 서민석 씨 쪽도 지금도 그 문장 그대로 '내가 최종 확인할게'를 잡고 있었으면, 정확히 승인과 QA가 안 끝났다는 걸 같이 올렸어야 하잖아요.",
      "behaviorHint": "고개를 세게 젓고 상대 이름을 찍듯 발음하며 책임을 되돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-04:beat:b:d-5:evidence_hit",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "배포 파이프라인 실패 로그 열람 기록까지 나오면 지금도 제가 몰랐다고는 못 하잖아요. 그 문장 그대로 신호를 봤고, 정확히는 거의 끝났다 식으로 넘기다 보고를 늦춘 게 맞네요.",
      "behaviorHint": "증거를 본 뒤 속도가 잠깐 줄지만 곧 다시 날카롭게 말을 잇는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-04:beat:b:d-5:confession",
      "caseId": "workplace-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 문제 신호를 보고도 바로 보고하지 않은 건 제 잘못이잖아요. 짧게 말씀드리면, 거의 끝났다 쪽으로 넘겨버린 제 표현 문제와 판단 미스고 그 책임은 제 책임이에요.",
      "behaviorHint": "호흡을 길게 내쉬고 눈을 피하지 않은 채 자기 책임을 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    }
  ]
}

