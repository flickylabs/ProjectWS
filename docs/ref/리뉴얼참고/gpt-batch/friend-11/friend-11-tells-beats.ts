export const friend11TellsBeats = {
  "caseId": "friend-11",
  "executableTells": {
    "a": [
      {
        "id": "friend11:a:tell:loss_preload",
        "appliesWhen": [
          "lying",
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "레벨",
          "시즌패스",
          "저장파일"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 질문이 나오면 '내 레벨이랑 시즌패스가 먼저 날아갔어'라고 피해 결과를 먼저 깔아 행위 책임을 뒤로 미룬다."
      },
      {
        "id": "friend11:a:tell:motive_flip",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "살리려",
          "의도는",
          "그걸 쓴 게 아니라"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "개인정보 재사용을 묻으면 '그걸 쓴 게 아니라 계정을 살리려 한 거야'라고 의도로 수위를 바꾼다."
      },
      {
        "id": "friend11:a:tell:wounded_breath",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame"
        ],
        "lexicalHooks": [
          "하…",
          "내 프로필",
          "내 저장파일"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "억울해질수록 짧게 한숨을 내쉰 뒤 같은 손해 항목을 두세 번 반복한다."
      }
    ],
    "b": [
      {
        "id": "friend11:b:tell:log_recital",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "오전",
          "분",
          "로그"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "곤란한 질문이 나오면 '오전 9시 14분, 9시 19분'처럼 시각을 길게 읊어 감정적 책임을 뒤로 미룬다."
      },
      {
        "id": "friend11:b:tell:label_split",
        "appliesWhen": [
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "차단이 아니라",
          "접근 정리",
          "복구 후"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "'차단'이 아니라 '복구 후 접근 정리'였다고 말하며 같은 행동의 이름을 바꿔 수위를 낮춘다."
      },
      {
        "id": "friend11:b:tell:clipped_breath",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "그 정보",
          "동의 없이",
          "그건 별개예요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "민우의 무단 인증을 떠올릴 때 숨을 짧게 끊고 문장을 더 딱딱하게 자른다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그걸 훔쳐 쓴 게 아니라니까요. 예전 자료가 남아 있었고, 계정이 꼬여서 살리려다 보니 그렇게 된 거예요.",
      "behaviorHint": "시선을 잠깐 아래로 떨군 뒤 손실 이야기를 한 번 끼워 넣으려 한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:a:d-2:deny"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "지웠어야 했던 건 맞는데, 일부러 다시 쓰려고 붙잡아 둔 건 아니었어요. 그때는 계정부터 살려야 한다는 생각밖에 없었습니다.",
      "behaviorHint": "문장 앞에서는 작게 시작하다가 '살려야'에서 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:a:d-2:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 남아 있던 정보를 다시 입력한 건 맞아요. 그래도 그걸로 준석 걸 빼앗겠다는 뜻까지는 아니었습니다.",
      "behaviorHint": "한숨을 짧게 쉬고 인정 문장 다음에 바로 의도 설명을 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:a:d-2:partial"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "준석도 늘 바로 설명해 주는 쪽은 아니었잖아요. 제가 먼저 통로를 잡아야 얘기라도 될 거라고 본 겁니다.",
      "behaviorHint": "피해자처럼 굴지 않으려 애쓰지만 마지막 문장에서 억울함이 섞인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:a:d-2:blame"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 작년에 받은 청구지랑 생년월일 자료를 지우지 않고 다시 썼습니다. 그리고 관리자 메일까지 제 쪽으로 돌려 버렸어요.",
      "behaviorHint": "어깨가 내려앉고, 변명 없이 핵심 명사를 짧게 끊어 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:a:d-2:confession"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "…그 폴더가 아직 남아 있었네요. 그럼 제가 '자동으로 맞아들어갔다'고 한 말은 더 못 버팁니다.",
      "behaviorHint": "e-4를 본 뒤 입술을 깨물고 화면을 오래 보다가 인정한다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-4",
      "id": "friend11:beat:a:d-2:evidence_hit"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "제가 처음 본 건 잠긴 화면이었어요. 그걸 본 사람이 준석 선공이라고 느끼는 게 그렇게 이상한가요?",
      "behaviorHint": "질문 끝을 되묻는 식으로 올리며 친구방 캡처 쪽으로 손짓한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:a:d-3:deny"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "순서를 초 단위로 따진 건 아니지만, 적어도 체감상 먼저 당한 쪽은 저였습니다.",
      "behaviorHint": "말끝을 흐리면서도 '저'를 또렷하게 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:a:d-3:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 먼저 손댄 부분이 조금 있었어도, 화면상으론 준석이 문 닫은 쪽으로 보였어요. 그래서 그렇게 믿고 말했습니다.",
      "behaviorHint": "고개를 끄덕이며 일부 인정하되 바로 체감 표현으로 되돌린다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:a:d-3:partial"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "준석이 말 한마디만 먼저 했어도 제가 친구방에 그런 식으로 올리진 않았을 겁니다. 그 장면을 만든 건 준석이기도 해요.",
      "behaviorHint": "피해 서사를 회수하듯 빠르게 말하고 끝에서 숨이 가빠진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:a:d-3:blame"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "출발점은 제가 재인증으로 구조를 먼저 흔든 거였고, 준석 차단은 그 뒤였어요. 제가 순서를 뒤집어 말했습니다.",
      "behaviorHint": "손을 모은 채 시선을 들지 않고, 시간순 표현을 또박또박 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:a:d-3:confession"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "보안 로그가 그 시간대를 찍고 있네요. 그러면 친구방에 올린 캡처는 출발점이 아니라 결과 장면만 보여 준 거예요.",
      "behaviorHint": "e-3를 확인한 뒤 목소리가 한 톤 낮아진다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-3",
      "id": "friend11:beat:a:d-3:evidence_hit"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그때 지운다고 말한 건 맞는데, 그 파일이 정말 남아 있었는지까지는 신경 못 썼어요. 일부러 규칙을 깨려고 한 건 아닙니다.",
      "behaviorHint": "손가락으로 테이블 가장자리를 문지르며 실수였다는 뉘앙스를 만든다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:a:d-4:deny"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "정리가 안 된 흔적이 남아 있었던 거죠. 그걸 지금 와서 정면 위반이라고 부르면 너무 세지 않나요.",
      "behaviorHint": "문장 후반을 낮게 끌며 '세지 않나요'를 작게 밀어 넣는다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:a:d-4:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "삭제 약속을 못 지킨 건 맞아요. 적어도 자료를 계속 들고 있었던 건 제가 먼저 선을 넘은 겁니다.",
      "behaviorHint": "고개를 숙였다 들며 책임 문장은 짧고 분명하게 말한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:a:d-4:partial"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그래도 준석도 같은 방에서 바로 말하진 않았잖아요. 저만 규칙을 깬 사람처럼 남는 건 솔직히 좀 억울합니다.",
      "behaviorHint": "수치심이 올라와 웃음 비슷한 숨을 내쉬고 곧바로 굳는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:a:d-4:blame"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저는 '한 번만 쓰고 지운다'는 약속을 어겼습니다. 혹시 또 필요할까 봐 남겨 둔 것부터가 이미 잘못이었어요.",
      "behaviorHint": "규칙 문구를 천천히 따라 말하고 마지막엔 체념한 표정을 짓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:a:d-4:confession"
    },
    {
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "카톡 원본에 삭제 약속이 그대로 있네요. 그러면 제가 이걸 단순 정리 누락으로만 말할 수는 없습니다.",
      "behaviorHint": "e-2를 보며 숨을 들이켰다가 짧게 멈춘다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2",
      "id": "friend11:beat:a:d-4:evidence_hit"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "차단이 아니라 복구 후 접근 정리였습니다. 관리자 변경이 확인된 뒤라 그 순서가 맞았어요.",
      "behaviorHint": "로그 화면을 먼저 보이며 단어 선택을 정정하듯 또박또박 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:b:d-1:deny"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "직접 설명이 짧았던 건 맞습니다. 하지만 그때는 계정을 되찾는 절차가 먼저였어요.",
      "behaviorHint": "날짜와 시간 표현을 먼저 읊고, 감정 단어는 피한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:b:d-1:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "민우 기기 접근을 회수한 건 맞고, 프로필 정리까지 한 번에 들어간 건 과했습니다. 거기까지가 문제였죠.",
      "behaviorHint": "인정 대목에서는 화면을 내리고 시선을 잠깐 피해 버린다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:b:d-1:partial"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제 정보를 다시 써서 관리자 구조를 바꿔 놓은 뒤였어요. 제가 매끈하게 설명하지 못한 건 맞아도, 아무 이유 없이 잘라 낸 건 아닙니다.",
      "behaviorHint": "말은 차갑지만 마지막 문장에서 턱이 굳는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:b:d-1:blame"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "복구 명분은 있었지만 제가 설명 없이 기기를 끊고 공유 프로필을 밀어 버린 건 제 잘못입니다. 민우가 추방처럼 느꼈을 겁니다.",
      "behaviorHint": "고개를 젖히며 짧게 숨을 끊고, 인정 뒤에는 추가 변명을 붙이지 않는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:b:d-1:confession"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "회수 로그와 제가 오현철에게 보낸 경고 시각이 붙어 있네요. 그럼 적어도 '충분히 설명했다'는 말은 못 하겠습니다.",
      "behaviorHint": "e-5를 본 뒤 손가락으로 로그 시각을 짚다가 멈춘다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "afterEvidence": "e-5",
      "id": "friend11:beat:b:d-1:evidence_hit"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "삭제 규칙을 깬 건 기본적으로 민우 쪽입니다. 저는 그 뒤에 보안 대응을 한 거고요.",
      "behaviorHint": "문장을 짧게 자르며 책임 주체를 명확히 선 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:b:d-4:deny"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "같은 방에서 바로 설명하지 않은 건 사실이지만, 그걸 삭제 합의 파기와 같은 무게로 보긴 어렵습니다.",
      "behaviorHint": "표정 변화 없이 단어의 무게를 비교하듯 말한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:b:d-4:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "민우가 삭제 약속을 깨뜨린 건 맞고, 저도 같은 채팅방 원칙과 사전 설명을 지키지 못했습니다.",
      "behaviorHint": "대등한 구조로 문장을 배열하며 양쪽 책임을 동시에 적시한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:b:d-4:partial"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 먼저 거리를 둔 건, 그 상태에서 직접 말하면 더 크게 터질 것 같아서였습니다. 민우가 먼저 선을 넘지 않았다면 그렇게까진 안 갔을 겁니다.",
      "behaviorHint": "감정을 누르려 하면서도 '그렇게까진' 대목에서 목이 한 번 끊긴다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:b:d-4:blame"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저는 규칙을 지키는 사람처럼 말했지만 실제론 감정적으로 처리했습니다. 같은 방에서 바로 말하지 않은 건 제 책임입니다.",
      "behaviorHint": "시선을 정면으로 들고, 마지막 문장만 짧게 끊어 떨어뜨린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:b:d-4:confession"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "복구 신청 시각 뒤에 제3자 경고 메시지가 먼저 붙어 있네요. 그러면 제가 관계적 절차를 지켰다고 주장할 수는 없습니다.",
      "behaviorHint": "e-5를 본 뒤 입술 안쪽을 한 번 깨물고 문장을 정리한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "afterEvidence": "e-5",
      "id": "friend11:beat:b:d-4:evidence_hit"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "아이템을 제가 가져간 적은 없습니다. 그건 로그로 바로 반박되는 이야기예요.",
      "behaviorHint": "짧은 부정부터 내놓고 손으로 보고서의 숫자 부분을 가리킨다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend11:beat:b:d-5:deny"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "도난은 아니지만 복구 과정에서 슬롯과 귀속이 바뀔 수는 있습니다. 그 변화가 곧 제 사적 취득이라는 뜻은 아니죠.",
      "behaviorHint": "두 문장을 나눠 말하며 정의를 먼저 정리한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend11:beat:b:d-5:hedge"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 민우 화면에서는 손실처럼 보였을 겁니다. 하지만 실제로는 재귀속과 부분 환불이 같이 돈 겁니다.",
      "behaviorHint": "한 박자 멈춘 뒤 '하지만' 이후를 더 차갑게 정리한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend11:beat:b:d-5:partial"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "민우가 결과 장면만 먼저 퍼뜨린 탓에 제가 훔친 사람처럼 굳었습니다. 제가 설명이 늦은 건 맞아도, 절취 주장은 너무 나갔어요.",
      "behaviorHint": "억제된 짜증이 스치지만 끝까지 톤을 낮게 유지한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend11:beat:b:d-5:blame"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 직접 가져간 건 아니지만, 제 복구 신청 뒤에 벌어진 변화를 바로 설명하지 않아 민우가 도난으로 받아들이게 만들었습니다.",
      "behaviorHint": "어조는 건조하지만 마지막에 시선을 떨군다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend11:beat:b:d-5:confession"
    },
    {
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "복원 보고서와 환불 내역이 한 줄로 이어지네요. 그러면 '난 아무 영향도 없다'는 식으로는 더 못 말하겠습니다.",
      "behaviorHint": "e-6을 보고 잠깐 침묵한 뒤 숫자를 다시 확인한다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-6",
      "id": "friend11:beat:b:d-5:evidence_hit"
    }
  ]
}
