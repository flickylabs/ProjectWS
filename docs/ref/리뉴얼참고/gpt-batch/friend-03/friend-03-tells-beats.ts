export const friend03TellsBeats = {
  "caseId": "friend-03",
  "executableTells": {
    "a": [
      {
        "id": "friend03:a:tell:format_split",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "캡처 기준",
          "원본 기준",
          "형식상",
          "기록상"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 질문이 나오면 '그건 캡처 기준이고 원본 기준은 달라'라며 자료 종류를 나눠 책임 판단을 미룬다."
      },
      {
        "id": "friend03:a:tell:quote_lock",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "그 표현",
          "그 단어",
          "정확히는",
          "문장 그대로"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 한 표현의 일부만 짚어 다시 읽어 주며 전체 맥락보다 특정 단어 하나를 확대한다."
      },
      {
        "id": "friend03:a:tell:flat_breath",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "됐어요",
          "그건 아니에요",
          "정리할게요",
          "그건 제 책임입니다"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "분노가 올라오면 말수가 줄고 숨을 고른 뒤 낮은 톤으로 한 문장씩 끊어 말한다."
      }
    ],
    "b": [
      {
        "id": "friend03:b:tell:wounded_preface",
        "appliesWhen": [
          "lying",
          "hurt",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "난 원래",
          "억울한 게",
          "솔직히",
          "그렇게까지 하려던 건"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "본론 전에 '난 원래 공개저격 안 좋아하는 사람인데'라고 먼저 말해 피해자 위치를 선점한다."
      },
      {
        "id": "friend03:b:tell:motive_cover",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "relationship_maintenance"
        ],
        "lexicalHooks": [
          "경고였어",
          "의도는",
          "좋게 말하면",
          "수위만 보면"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "문제 댓글을 지적받으면 '비방이 아니라 경고였어'라며 행위보다 의도를 앞세운다."
      },
      {
        "id": "friend03:b:tell:audience_scan",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "조회수",
          "댓글 반응",
          "사람들이",
          "다들"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "감정이 오르면 상대 반응보다 조회수와 다른 사람 댓글부터 확인하며 말 흐름을 바꾼다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "friend03:beat:a:d-2:deny",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "없는 걸 새로 만든 건 아니에요. 흩어진 화면을 한 장으로 정리했을 뿐입니다.",
      "behaviorHint": "시선은 자료 쪽에 두고 손가락으로 화면 모서리를 짚는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:a:d-2:hedge",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "잘린 부분은 있어도 요지는 같아요. 캡처 기준과 원본 기준을 같은 말로 묶을 수는 없죠.",
      "behaviorHint": "짧게 숨을 고른 뒤 '기준'이라는 단어에 힘을 준다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:a:d-2:evidence_hit",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "전달 시각 얘기까지 나오면 부정만 하긴 어렵네요. 다만 그때는 확인 요청으로 보이게 급히 보낸 겁니다.",
      "behaviorHint": "입술을 눌러 다문 뒤 문장을 두 개로 끊어 말한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "friend03:beat:a:d-2:partial",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "이어 붙인 건 맞습니다. 그래도 제가 완전히 없는 사건을 꾸민 건 아니라고 그땐 믿었어요.",
      "behaviorHint": "목소리는 낮지만 끝 단어를 더 짧게 끊는다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:a:d-2:blame",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "먼저 공개 댓글로 저를 깎아내린 사람이 있었잖아요. 그 압박이 없었다면 그렇게까지 안 갔습니다.",
      "behaviorHint": "눈을 한 번 감았다 뜨고 상대 쪽을 보지 않는다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:a:d-2:confession",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "프로젝트 파일까지 남아 있으면 더 숨길 말은 없네요. 제가 만들고, 제가 다시 퍼뜨렸습니다.",
      "behaviorHint": "어깨 힘을 빼고 한 문장씩 평평하게 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "friend03:beat:a:d-3:deny",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "원본 한 장이냐보다 실제 취지가 더 중요하다고 봤어요. 제가 들은 모욕까지 없던 일은 아니니까요.",
      "behaviorHint": "정면을 보되 감정어 대신 '취지'를 반복한다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:a:d-3:hedge",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "시간 표시나 배열이 조금 달라도 핵심은 같다고 여겼습니다. 원본 여부만 붙들면 본질이 빠져요.",
      "behaviorHint": "한 손으로 허공에 선을 긋듯 '핵심'을 분리해 말한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:a:d-3:evidence_hit",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "그 이미지 한 장만으론 방어가 약하다는 건 압니다. 그래도 그때는 그게 제 억울함을 가장 빨리 설명하는 방법 같았어요.",
      "behaviorHint": "답변 전 짧게 멈췄다가 마지막 문장만 더 낮게 말한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "friend03:beat:a:d-3:partial",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "단일 원본 캡처 한 장은 아니었습니다. 다만 지후 씨가 실제로 던진 불쾌한 조각들을 모았다고 생각했어요.",
      "behaviorHint": "시선이 흔들리지만 끝까지 용어를 차갑게 유지한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:a:d-3:blame",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "서로 다른 날짜 조각이 섞인 건 인정해요. 그런데 제가 그런 조합까지 하게 된 건 먼저 신뢰가 무너졌기 때문이었습니다.",
      "behaviorHint": "책상 끝을 손톱으로 한 번 두드리고 말을 멈춘다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:a:d-3:confession",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "원본 export와 레이어가 다 나오면 부인할 수 없죠. 그 캡처는 원문이 아니라 제가 합성한 이미지입니다.",
      "behaviorHint": "호흡을 한번 깊게 삼킨 뒤 마지막 문장만 또렷하게 낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "friend03:beat:a:d-5:deny",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속을 깬 출발점은 제 쪽이 아닙니다. 공개 댓글이 먼저였어요.",
      "behaviorHint": "단호하게 첫 문장만 말하고 짧게 침묵한다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:a:d-5:hedge",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "운영자와 친구에게 보낸 건 유포라기보다 확인 요청이었어요. 저는 그걸 공개 폭로랑 같은 선으로 보지 않았습니다.",
      "behaviorHint": "자료의 종류를 나누듯 손가락으로 두 칸을 가른다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:a:d-5:evidence_hit",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "댓글과 스토리가 먼저였다는 기록이 나오면 제 방어 논리도 좁아지네요. 그래도 그때 제 머릿속엔 '먼저 맞았다'는 생각만 컸습니다.",
      "behaviorHint": "말끝을 눌러 삼키며 두 번째 문장을 더 짧게 자른다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend03:beat:a:d-5:partial",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저도 비공개 원칙을 온전히 지키진 못했습니다. 운영자 신고와 전달로 이미 선을 넘은 거니까요.",
      "behaviorHint": "눈을 내리깔고 '지키진 못했습니다'에서 속도를 늦춘다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:a:d-5:blame",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "먼저 망신을 준 쪽이 있었고, 그래서 더 강한 증거가 필요하다고 스스로 몰아갔어요. 그 안에 되갚고 싶은 마음도 있었습니다.",
      "behaviorHint": "차갑게 말하지만 마지막 단어에서 미세하게 흔들린다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:a:d-5:confession",
      "caseId": "friend-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "결국 복수심이 섞여 있었습니다. 위조 자료까지 써서 제가 더 크게 약속을 깼어요.",
      "behaviorHint": "어깨를 굳힌 채 두 문장을 거의 같은 톤으로 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "friend03:beat:b:d-1:deny",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "난 원래 공개저격 안 좋아하는 사람인데, 그건 특정 저격이 아니라 상황 얘기였어요. 실명도 안 썼잖아요.",
      "behaviorHint": "말머리를 길게 끌다가 마지막 문장에 되묻는 억양을 붙인다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:b:d-1:hedge",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "표현이 세긴 했어도 비방 아니고 경고였어요. 그 정도 말도 못 합니까.",
      "behaviorHint": "손바닥을 펴 보이며 억울하다는 표정을 만든다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:b:d-1:evidence_hit",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "삭제 로그까지 있으면 그냥 지나간 한마디라고만 하긴 어렵네요. 그래도 당시엔 문의가 너무 몰려서 정신이 없었습니다.",
      "behaviorHint": "시선이 한 번 옆으로 새고, 두 번째 문장에서 속도가 빨라진다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend03:beat:b:d-1:partial",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "같은 게시물에 그런 표현을 남긴 건 경솔했어요. 그래서 나래 씨가 자기 얘기로 읽은 건 이해합니다.",
      "behaviorHint": "고개를 끄덕이지만 곧바로 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:b:d-1:blame",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "근데 그 전에 배송 문의와 반납 문제로 내가 받은 압박도 컸어요. 억울함이 쌓이니까 수위를 못 재더라고요.",
      "behaviorHint": "손을 접었다 폈다 하며 억울한 쪽 서사를 길게 늘인다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:b:d-1:confession",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "물류 로그가 반납 완료를 보여 주면 제 의혹은 남을 수 없죠. 제가 공개 비방을 먼저 시작했습니다.",
      "behaviorHint": "긴 숨을 내쉰 뒤 마지막 문장을 낮게 깔아 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "friend03:beat:b:d-4:deny",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "유용이라고 단정한 적은 없어요. 재고가 이상해 보여서 의문을 던진 거예요.",
      "behaviorHint": "손을 펼쳐 '그냥 의문'이라는 식으로 거리를 둔다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:b:d-4:hedge",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "장사하는 입장에선 그런 상황이면 경고라도 해야죠. 확정적으로 몰아간 건 아니었습니다.",
      "behaviorHint": "말이 길어지며 본인 사정 설명부터 앞세운다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:b:d-4:evidence_hit",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "댓글 보관본이 남아 있으면 표현 수위를 빼긴 어렵네요. 그래도 그때 화면상으론 진짜 누락처럼 보여서 그랬어요.",
      "behaviorHint": "어깨를 들썩이며 두 번째 문장에서 더 빠르게 변명한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend03:beat:b:d-4:partial",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "확인 전에 말을 꺼낸 건 제 실수예요. 반납 등록 지연이라는 사정을 몰랐습니다.",
      "behaviorHint": "억울한 표정이 남아 있지만 단어 선택은 조금 느려진다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:b:d-4:blame",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "배송 지연 설명이 없으니 저는 누락으로 볼 수밖에 없었습니다. 팔로워 반응도 그쪽으로 몰렸고요.",
      "behaviorHint": "고개를 자주 돌리며 타인 반응을 끌어들인다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:b:d-4:confession",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "백오피스 로그가 다 말하네요. 유용은 없었고, 제가 근거 약한 의혹을 키웠습니다.",
      "behaviorHint": "말끝이 잠기고 마지막 단어에서 시선을 떨군다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "friend03:beat:b:d-5:deny",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "공개 한마디와 위조 캡처 유포를 같은 무게로 보긴 어렵잖아요. 그래서 저는 약속을 크게 깬 쪽이 아니라고 생각했어요.",
      "behaviorHint": "처음부터 비교구도를 세우며 본인 책임을 상대적으로 줄인다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend03:beat:b:d-5:hedge",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "좋게 끝내고 싶어서 경고 수준으로만 말했어요. 공개 폭로까지 간 건 아니었다고 본 겁니다.",
      "behaviorHint": "말머리를 길게 끌고 마지막을 올려 되묻는다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend03:beat:b:d-5:evidence_hit",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "댓글과 스토리 기록이 먼저라는 건 부정 못 하겠네요. 그래도 그때는 상처를 조금이라도 티 내고 싶었던 정도였어요.",
      "behaviorHint": "시선이 관객 쪽으로 한번 돌아갔다가 다시 내려온다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend03:beat:b:d-5:partial",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 먼저 공개 댓글과 스토리로 암시한 건 저예요. 다만 관계를 완전히 끊고 싶진 않았습니다.",
      "behaviorHint": "고개를 끄덕인 뒤 바로 완충 문장을 덧붙인다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend03:beat:b:d-5:blame",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "그래도 나래 씨가 더 크게 퍼뜨린 사실 뒤에 자꾸 제 시선이 끌렸어요. 그래서 제 시작 책임을 계속 작게 말했습니다.",
      "behaviorHint": "손을 모았다 풀며 상대 쪽 서사로 다시 옮겨 간다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend03:beat:b:d-5:confession",
      "caseId": "friend-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "관계를 남기고 싶다는 핑계로 제 책임을 절반만 말했습니다. 공개로 문을 연 건 저예요.",
      "behaviorHint": "목이 잠긴 채 마지막 문장만 짧고 낮게 떨어뜨린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": "e-2"
    }
  ]
}
