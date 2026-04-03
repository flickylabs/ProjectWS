export const neighbor02TellsBeats = {
  "caseId": "neighbor-02",
  "executableTells": {
    "a": [
      {
        "id": "neighbor-02:a:tell:sympathy_stack",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive",
          "lying"
        ],
        "lexicalHooks": [
          "제가 얼마나 참았는데요",
          "한두 번이 아니에요",
          "저만 계속 참았어요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "억울함이 올라오면 자신이 참고 넘긴 장면을 연달아 열거해 먼저 동정을 얻으려 한다."
      },
      {
        "id": "neighbor-02:a:tell:selective_victimhood",
        "appliesWhen": [
          "lying",
          "cornered",
          "shame",
          "avoiding"
        ],
        "lexicalHooks": [
          "저만 표적이 됐죠",
          "왜 저만 문제예요",
          "다들 그건 빼고 말하잖아요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 행동은 빼고 '나만 표적이 됐다'는 피해 서사만 남겨 말한다."
      },
      {
        "id": "neighbor-02:a:tell:accusation_echo",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt",
          "avoiding"
        ],
        "lexicalHooks": [
          "그 말 그대로 돌려드릴게요",
          "남의 박스 앞에 선 건 누군데요",
          "문제 삼는다는 말부터요"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "질문을 받으면 상대가 자신에게 했던 말을 되풀이해 맞받아치며 본론을 늦춘다."
      }
    ],
    "b": [
      {
        "id": "neighbor-02:b:tell:clause_recital",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "관리규약상",
          "문언 그대로",
          "절차상으로는"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "책임을 줄일 때는 관리규약 문장을 길게 인용해 행동 자체보다 규정 해석으로 논점을 옮긴다."
      },
      {
        "id": "neighbor-02:b:tell:timestamp_wall",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "08시 14분",
          "그다음 2분 뒤",
          "동선상"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "시각과 동선을 촘촘히 나열해 질문자가 감정 문제를 제기할 틈을 줄인다."
      },
      {
        "id": "neighbor-02:b:tell:affect_flattening",
        "appliesWhen": [
          "avoiding",
          "hurt",
          "emotional",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 과장입니다",
          "굳이 감정적으로 말하진 않겠습니다",
          "사실관계만 보시죠"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "평판 피해를 말해도 표정을 거의 바꾸지 않고 건조한 어조로만 답해 공감 요구를 차단한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "neighbor-02:beat:a:d-1:deny",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저만 표적이 됐죠, 제가 무슨 여론전을 한 사람처럼 들리는데요. 그냥 그 장면이 너무 이상해서 가까운 사람한테 물어본 정도였어요.",
      "behaviorHint": "손끝으로 횟수를 세다가 시선을 옆으로 피한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-1:hedge",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "유포라고까지는 말 못 해요. 반상회 바로 다음 날이라 마음이 뒤숭숭해서 '이거 어떻게 보이세요' 하고 보낸 거죠.",
      "behaviorHint": "목이 잠긴 채 문장 끝을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-1:partial",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "보낸 건 맞아요. 다만 제가 절도라고 단정한 건 아니고, 이상하다고 느껴서 조심하라고 한 거예요.",
      "behaviorHint": "휴대폰을 꼭 쥔 채 변명과 인정을 섞는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-1:blame",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 얼마나 참았는데요, 그때 이미 오배송이니 문 앞 박스니 쌓인 게 있었어요. 저만 예민한 사람처럼 몰렸으니까 그 장면이 더 크게 보였던 거예요.",
      "behaviorHint": "억울한 장면을 길게 늘어놓으며 상대 쪽을 손바닥으로 가리킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-1:confession",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 제가 캡처 한 장으로 민규 씨를 수상한 사람처럼 보이게 했어요. 확인보다 제 불안과 인상을 먼저 믿었습니다, 그건 제 책임입니다.",
      "behaviorHint": "고개를 떨구고 마지막 문장을 짧게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-1:evidence_hit",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 캡처랑 제 보낸 문구가 여기까지 남아 있네요. 제가 생각한 것보다 훨씬 직접적으로 보였겠어요.",
      "behaviorHint": "입술을 깨물고 숨을 들이쉰 뒤 말수를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "neighbor-02:beat:a:d-4:deny",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "왜 저만 문제예요, 그 장면은 누가 봐도 남의 박스 앞에서 한참 서 있던 거였어요. 제가 절도라고 확정한 게 아니라 의심스럽다고 한 거예요.",
      "behaviorHint": "턱을 치켜들고 정지 화면의 인상만 되풀이한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-4:hedge",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "오배송 정리였다는 설명은 나중에 들었고, 그 전엔 그 화면밖에 없었어요. 제가 의심할 사정은 있었죠.",
      "behaviorHint": "한숨을 내쉬며 '그때는 몰랐다'는 말에 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-4:partial",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "원본을 보니 박스를 열진 않았네요. 그렇지만 그 전까진 저도 몰랐고, 그래서 걱정이 앞섰던 거예요.",
      "behaviorHint": "어깨를 움츠리며 인정 범위를 최소화한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-4:blame",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "경비원 요청이 있었다면 제가 먼저 확인했어야 했죠. 그래도 여름부터 쌓인 그 불안이 그 장면을 더 나쁘게 보이게 한 건 사실이에요.",
      "behaviorHint": "자기 말 중간에 멈칫하며 예전 일을 끌어온다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-4:confession",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "민규 씨 택배 절도 의심은 사실이 아니었습니다. 오배송 박스 이동을 제가 절도처럼 퍼뜨렸어요, 그건 제 책임입니다.",
      "behaviorHint": "손을 내려다보며 사과하듯 낮은 톤으로 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-4:evidence_hit",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "6분 원본하고 처리대장까지 같이 보니까, 제가 본 한 컷이 전부가 아니었다는 건 인정해야겠네요.",
      "behaviorHint": "눈썹을 찌푸린 채 화면에서 시선을 떼지 못한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "neighbor-02:beat:a:d-5:deny",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "한두 번이 아니에요, 예전 약속은 공개 글 올리지 말자는 거였지 제가 공개적으로 호수를 박제한 건 아니잖아요.",
      "behaviorHint": "약속 문구를 좁게 해석하며 손바닥을 펼쳐 보인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-5:hedge",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "관리사무소 확인을 먼저 하자는 건 알았어요. 그런데 그날은 너무 불안해서 사적인 상담처럼 보낸 거예요.",
      "behaviorHint": "'상담'이라는 단어에만 힘을 주며 목소리를 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-5:partial",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "절차를 지키지 못한 건 맞아요. 그래도 제가 바로 공개 글을 올린 건 아니고, 다시 크게 퍼뜨린 건 민규 씨였죠.",
      "behaviorHint": "자기 잘못을 인정하면서도 곧바로 상대 몫을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-5:blame",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "그 말 그대로 돌려드릴게요. 저도 약속을 완전히 지킨 건 아니지만, 한 컷 캡처를 사적으로 보낸 것과 여러 대화방에 냄새 소문을 돌린 건 무게가 다르다고 봐요.",
      "behaviorHint": "손가락으로 두 사안을 나눠 세며 비교한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-5:confession",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 CCTV 캡처를 돌린 순간 이미 그 약속을 깼어요. 결국 저도 절차보다 '내가 당했다'는 말을 먼저 택했습니다, 그건 제 책임입니다.",
      "behaviorHint": "숨을 길게 내쉬고 자기 가슴 쪽으로 손을 가져간다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:a:d-5:evidence_hit",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "단체방 전달 시점까지 이어서 보니까, 제가 '사적으로만' 보냈다는 말도 결국 절반만 맞는 셈이네요.",
      "behaviorHint": "입꼬리를 굳힌 채 인정과 반박 사이에서 잠깐 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "neighbor-02:beat:b:d-2:deny",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "관리규약상 악취 민원 표현은 제가 만든 게 아닙니다. 이미 존재하던 문구를 전달한 수준이지, 사실관계만 보시죠.",
      "behaviorHint": "표정 변화 없이 규정 설명하듯 또박또박 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-2:hedge",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "반상회 직후 주민들이 냄새 원인을 묻길래 기존 민원 문구를 인용한 겁니다. 확인 전 단정은 피하려고 했습니다.",
      "behaviorHint": "문장 앞에 시간과 맥락을 먼저 깔며 속도를 늦춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-2:partial",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "같은 표현을 여러 대화방에 보낸 건 맞습니다. 다만 관리사무소 민원에 기초한 말이라 완전히 허위라고만 볼 수는 없습니다.",
      "behaviorHint": "손끝으로 책상 표면을 두드리며 책임 범위를 줄인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-2:blame",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그날 저는 공개적으로 도둑 취급을 받은 직후였습니다. 감정이 섞인 전달이었던 건 인정하지만, 그 배경까지 빼고 볼 수는 없습니다.",
      "behaviorHint": "턱을 약간 굳힌 채 '직후'라는 단어를 짧게 끊어 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-2:confession",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "확인 없이 유나 씨 반려견과 악취 민원을 엮어 퍼뜨린 건 제 잘못입니다. 민원 문구를 사실처럼 재인용했습니다.",
      "behaviorHint": "건조한 톤을 유지하지만 마지막 문장에서 한 박자 쉬어간다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-2:evidence_hit",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "사고보고서까지 같이 나오면, 제가 붙잡고 있던 '기존 민원 문구' 방어는 더 이상 버티기 어렵습니다.",
      "behaviorHint": "서류를 한 장 넘기고 짧게 입을 다문다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "neighbor-02:beat:b:d-3:deny",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "익명 전단과 첫 문구의 출처는 유나 씨 쪽일 가능성이 높다고 봤습니다. 동선상 반상회 직후 08시 14분부터 움직임이 그쪽이 더 빨랐습니다.",
      "behaviorHint": "속도와 방향을 도표처럼 설명하며 추정을 사실처럼 배치한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-3:hedge",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "시차가 너무 짧았습니다. 당시엔 유나 씨나 그 지인 쪽에서 문구를 정리한 줄 알았던 겁니다.",
      "behaviorHint": "의심을 추정으로 낮추지만 결론은 유지한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-3:partial",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "녹음 일부를 보면 회의 중 표현이 먼저 있었고, 전단이 그걸 베낀 흔적이 있습니다. 출처를 단정하긴 어렵습니다.",
      "behaviorHint": "문장을 짧게 끊으며 한 단계 물러선다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-3:blame",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "회의록 수정본까지 보면 누군가 회의 표현을 가공해 외부로 뺀 정황이 보입니다. 제가 유나 씨를 배후처럼 몬 건 과했지만, 그렇게 보이게 만든 판도 있었습니다.",
      "behaviorHint": "손으로 공중에 선을 그으며 '판'과 '배후'를 분리한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-3:confession",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "익명 전단과 첫 단체방 문구의 실질적 출발점은 최병규였습니다. 저는 그걸 제 분노에 맞게 다시 퍼뜨렸습니다, 그건 제 책임입니다.",
      "behaviorHint": "잠시 시선을 내린 뒤 이름을 또렷하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-3:evidence_hit",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "공용프린터 로그와 임시 PDF가 같은 방향을 가리키면, 이제 출발점을 유나 씨에게 둘 근거는 없습니다.",
      "behaviorHint": "서류 모서리를 가지런히 맞추며 체념한 듯 고개를 끄덕인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "neighbor-02:beat:b:d-5:deny",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속은 공개 게시 자제를 뜻했지, 기존 민원 표현까지 사실확인 차원에서 전달하지 말자는 취지는 아니었습니다.",
      "behaviorHint": "'공개'라는 단어만 또렷하게 강조한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-5:hedge",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "절차상으로는 관리사무소 민원에 있는 문구를 인용한 겁니다. 성급했을 수는 있어도 약속 자체를 파기한 건 과장입니다. 굳이 감정적으로 말하진 않겠습니다.",
      "behaviorHint": "손바닥을 아래로 눌러 사안의 무게를 낮추려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-5:partial",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "확인 절차를 끝내기 전에 말한 건 맞습니다. 다만 먼저 캡처가 사적으로 돌고 있었고, 저는 대응 차원이라는 인식이 있었습니다.",
      "behaviorHint": "책임을 인정하면서도 곧바로 대응 논리를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-5:blame",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "결국 저도 약속 취지를 지키지 못했습니다. 하지만 도둑 취급을 받은 직후였다는 점까지 지워 버리면 판단의 배경이 사라집니다.",
      "behaviorHint": "건조한 어조를 유지한 채 마지막 문장만 조금 세게 내뱉는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-5:confession",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저도 관리사무소 확인 전 유나 씨를 특정하는 말을 퍼뜨려 약속을 깼습니다. 서로 절차보다 평판 싸움을 먼저 택했습니다, 그건 제 책임입니다.",
      "behaviorHint": "고개를 거의 움직이지 않은 채 인정 문장만 짧게 남긴다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor-02:beat:b:d-5:evidence_hit",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "민원 원문과 사고보고를 같이 놓고 보면, 제가 '인용만 했다'는 말도 결국 책임 회피에 가깝습니다.",
      "behaviorHint": "입술을 얇게 다문 채 다음 말을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    }
  ]
};
