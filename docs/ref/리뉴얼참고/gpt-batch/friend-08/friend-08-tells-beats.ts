export const friend08TellsBeats = {
  "caseId": "friend-08",
  "executableTells": {
    "a": [
      {
        "id": "friend08:a:tell:rescue_stack",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "제가 밤새",
          "다시 뽑고",
          "발표 직전까지"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "질문을 받으면 본론보다 자신이 고친 화면, 다시 뽑은 출력물, 발표 직전 수습한 일을 길게 나열한다."
      },
      {
        "id": "friend08:a:tell:caption_minimizing",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame"
        ],
        "lexicalHooks": [
          "캡션 한 줄",
          "표현만",
          "그 정도까지는"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "문제가 된 문구를 지적받으면 '캡션 한 줄이었어'라고 표현의 파급력을 축소한다."
      },
      {
        "id": "friend08:a:tell:tired_laugh",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "하…",
          "그날 누가 남아 있었는지",
          "제가 버틴 건"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "억울할 때 짧게 웃은 뒤 '그날 누가 남아 있었는지 생각해 봐'라고 피로를 근거로 내세운다."
      }
    ],
    "b": [
      {
        "id": "friend08:b:tell:log_drop",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "커밋 시간",
          "리비전 로그",
          "버전 기록"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 지점이 나오면 로그 캡처를 한꺼번에 보여 주며 개별 질문을 기술 기록 더미 속에 묻는다."
      },
      {
        "id": "friend08:b:tell:binary_credit",
        "appliesWhen": [
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "내 거였어",
          "아니었어",
          "둘 중 하나죠"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "'내 거였어, 아니었어'처럼 공로를 이분법으로 나눠 중간 지대를 지우려 한다."
      },
      {
        "id": "friend08:b:tell:dry_pause",
        "appliesWhen": [
          "emotional",
          "shame",
          "avoiding"
        ],
        "lexicalHooks": [
          "...",
          "기록상",
          "사실만 말하면"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "감정이 올라오면 대답 전 짧게 침묵하고, 이후 더 딱딱한 톤으로 사실만 열거한다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "대표자 계정에서 올린 초안일 뿐이지, 프로젝트를 제 혼자 한 것처럼 꾸민 건 아니에요. 발표 직전까지 화면이랑 출력물을 다 제가 수습했으니까 제 이름으로 정리된 거예요.",
      "behaviorHint": "시선을 바로 두되 말이 길어지고, 자신이 수습한 일을 먼저 꺼낸다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:a:d-1:deny"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "문제가 된 건 캡션 한 줄과 카드뉴스 첫 장이었지, 전체 제출 맥락까지 개인 작품으로 바꾼 건 아니에요. 팀원 표기를 늦게 붙인 건 맞아도 그걸 고의적인 삭제처럼 말하는 건 과해요.",
      "behaviorHint": "입술을 깨물고 손가락으로 테이블 끝을 문지르며 표현 수위를 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:a:d-1:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "시상 직후 문구가 제 단독 성과처럼 읽힐 수 있었던 건 인정해요. 다만 공모전 제출 자체는 팀으로 들어갔고, 대표자 계정 관성 때문에 먼저 제 이름이 전면에 나온 거예요.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 대표자 역할과 마감 압박을 함께 언급한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:a:d-1:partial"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "준혁이 리허설이랑 일부 자료 정리를 비운 밤에 제가 발표물을 끝까지 붙잡고 있었던 건 사실이에요. 그 압박 때문에 포트폴리오 톤으로 먼저 올린 건데, 그게 면책 사유는 아니라도 배경은 돼요.",
      "behaviorHint": "짧게 웃고는 밤샘 수습 장면을 길게 나열하며 상대 공백을 끼워 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:a:d-1:blame"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 시상 직후 가장 노출이 큰 시간대에 제 이름과 '내 프로젝트' 같은 표현을 그대로 둔 건 잘못이었어요. 준혁 이름을 바로 넣지 않은 채 항의가 온 뒤에야 고친 건, 제 공을 더 크게 보이게 둔 선택이 맞습니다.",
      "behaviorHint": "목이 잠긴 채 시선을 떨구고, 인정 문장을 끊어 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:a:d-1:confession"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "수정 기록까지 뜨면 부정할 건 없네요. 제가 먼저 제 이름만 전면에 두고, 준혁 메시지 받은 뒤에야 팀 표기로 고쳤어요.",
      "behaviorHint": "스크린을 한번 피했다가 다시 보며 수정 시점과 표현을 되짚는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-6",
      "id": "friend08:beat:a:d-1:evidence_hit"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "준혁 기여가 아주 없었다는 건 아니지만, 거의 아이디어 한 줄 던지고 제가 실작업을 끌고 간 거예요. 눈에 보이는 결과물은 제가 거의 다 붙였습니다.",
      "behaviorHint": "시선을 바로 두되 말이 길어지고, 자신이 수습한 일을 먼저 꺼낸다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:a:d-5:deny"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "기술 표현 몇 개랑 의견은 냈죠. 그런데 최종본으로 굳힌 건 거의 제가 했어요.",
      "behaviorHint": "입술을 깨물고 손가락으로 테이블 끝을 문지르며 표현 수위를 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:a:d-5:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "설문 구조랑 프로토타입 흐름에 준혁 손이 들어간 건 맞아요. 다만 마감 직전에 빠진 부분 때문에 저는 그게 결과물로 잘 안 보였어요.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 대표자 역할과 마감 압박을 함께 언급한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:a:d-5:partial"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "발표랑 마감 수습이 전부 제 쪽으로 쏠리니까, 저는 눈앞에 보이는 작업만 공로로 세게 잡았어요. 그래서 준혁이 이전에 한 기술 작업을 스스로도 점점 작게 보게 됐어요.",
      "behaviorHint": "짧게 웃고는 밤샘 수습 장면을 길게 나열하며 상대 공백을 끼워 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:a:d-5:blame"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "준혁 기여를 아이디어 수준으로 줄여 말한 건 잘못이었어요. 설문 구조, 프로토타입 흐름, 제출 부록 설명까지 실제 반영된 게 맞습니다.",
      "behaviorHint": "목이 잠긴 채 시선을 떨구고, 인정 문장을 끊어 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:a:d-5:confession"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "심사 메일까지 그렇게 적혀 있으면 더 줄일 말은 없어요. 준혁 기여를 아이디어 수준으로 말한 건 제가 보이는 공만 붙잡았기 때문입니다.",
      "behaviorHint": "스크린을 한번 피했다가 다시 보며 수정 시점과 표현을 되짚는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-5",
      "id": "friend08:beat:a:d-5:evidence_hit"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "대표자 표기나 역할 문구는 시스템상 제가 먼저 적는 줄 알았어요. 그걸 둘이 합의 안 했다고까지 말하기는 어려워요.",
      "behaviorHint": "시선을 바로 두되 말이 길어지고, 자신이 수습한 일을 먼저 꺼낸다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:a:d-4:deny"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "마감이 몰리다 보니 역할 문구를 세세하게 못 적은 거지, 규칙을 방치하려던 건 아니었어요. 친구끼리 협업하면서 그 정도 빈칸은 나중에 정리할 수 있다고 본 거예요.",
      "behaviorHint": "입술을 깨물고 손가락으로 테이블 끝을 문지르며 표현 수위를 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:a:d-4:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 역할 서술란이 비어 있었고 저도 다시 확인 안 했어요. 그 부분은 둘 다 느슨했던 게 맞아요.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 대표자 역할과 마감 압박을 함께 언급한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:a:d-4:partial"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "준혁도 예전 약속을 다시 꺼내지 않았고, 저도 대표자 계정으로 제출하면서 그냥 흘려보냈어요. 누가 먼저 정확히 적자고 밀어붙이지 않은 채 둘 다 편한 쪽으로 간 거죠.",
      "behaviorHint": "짧게 웃고는 밤샘 수습 장면을 길게 나열하며 상대 공백을 끼워 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:a:d-4:blame"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "결국 저도, 준혁도 대표자 표기와 기여 로그를 제대로 안 남겼어요. 갈등 피하려고 미뤄 둔 게 공동 책임입니다.",
      "behaviorHint": "목이 잠긴 채 시선을 떨구고, 인정 문장을 끊어 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:a:d-4:confession"
    },
    {
      "caseId": "friend-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "제출 원본이 그렇게 비어 있으면 저도 빠져나갈 말은 없네요. 역할 문구를 다시 확인하지 않은 건 둘 다였습니다.",
      "behaviorHint": "스크린을 한번 피했다가 다시 보며 수정 시점과 표현을 되짚는다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2",
      "id": "friend08:beat:a:d-4:evidence_hit"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "리허설을 통째로 빠진 것도 아니고, 자료를 안 올린 것도 아니에요. 필요한 건 다 보냈습니다.",
      "behaviorHint": "짧게 숨을 멈춘 뒤 단정형으로 부정하고, 군더더기 없이 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:b:d-2:deny"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "늦어진 건 일부 동기화랑 병합 문제였지, 발표가 멈출 정도로 빈 건 아니에요. 제가 완전히 손을 놓은 것처럼 말하면 과장입니다.",
      "behaviorHint": "로그 캡처를 넘기며 기술적 표현으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:b:d-2:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "최종 리허설 일부를 놓친 건 맞습니다. 그래도 설문 구조랑 프로토타입 쪽 핵심 작업은 이미 끝내 둔 상태였어요.",
      "behaviorHint": "턱을 굳힌 채 일부만 인정하고 앞선 기여를 함께 병기한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:b:d-2:partial"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "한 사람을 업로드 단일 책임자로 정하지도 않았고, 발표 자료랑 기술 파일이 섞이면서 마지막 손넘김이 꼬였어요. 그 구조 문제를 전부 제 지각 하나로만 읽는 건 불공평합니다.",
      "behaviorHint": "날짜와 버전 번호를 세듯 말하면서 구조 문제를 앞세운다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:b:d-2:blame"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "네, 제가 최종 리허설 일부에 빠졌고 업로드도 지연됐습니다. 그 때문에 은비가 발표 직전 자료를 다시 정리한 게 맞아요.",
      "behaviorHint": "짧은 침묵 후 더 낮은 톤으로 사실을 정리하듯 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:b:d-2:confession"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "로그까지 맞춰 보면 제가 마지막 업로드를 늦춘 건 부인 못 합니다. 핵심 작업이 있었던 것과 별개로, 최종 손넘김은 제가 틀어지게 했어요.",
      "behaviorHint": "자료를 넘기던 손을 멈추고, 더 이상 수치를 방패로 삼지 못한다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-3",
      "id": "friend08:beat:b:d-2:evidence_hit"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "솔직히 밖에서 본 사람은 다 은비 개인 작품으로 알았을 겁니다. 무대도, 카드뉴스도 그렇게 보였어요.",
      "behaviorHint": "짧게 숨을 멈춘 뒤 단정형으로 부정하고, 군더더기 없이 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:b:d-3:deny"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "적어도 심사위원도 대표자 이름이랑 발표 화면을 먼저 봤을 거예요. 팀원 칸이 있었다 해도 체감은 개인전이었죠.",
      "behaviorHint": "로그 캡처를 넘기며 기술적 표현으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:b:d-3:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제출 원본에 제 이름이 들어간 건 압니다. 그래도 첫인상과 시상 직후 노출은 은비 단독 작품처럼 흘렀어요.",
      "behaviorHint": "턱을 굳힌 채 일부만 인정하고 앞선 기여를 함께 병기한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:b:d-3:partial"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "대표자 필드만 앞으로 튀고 역할 서술란도 비어 있었으니, 공식 구조 자체가 개인 성과처럼 읽히게 만들었습니다. 그래서 저는 오해가 아니라 거의 그렇게 받아들여졌다고 본 거예요.",
      "behaviorHint": "날짜와 버전 번호를 세듯 말하면서 구조 문제를 앞세운다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:b:d-3:blame"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "공식 제출과 심사 메일, 상장 기준으로 보면 팀 프로젝트로 인식된 게 맞습니다. 제가 '심사위원도 은비 개인 작품으로 봤다'고 단정한 건 감정이 섞인 과장이었어요.",
      "behaviorHint": "짧은 침묵 후 더 낮은 톤으로 사실을 정리하듯 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:b:d-3:confession"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "상장 원본과 회신 메일까지 팀 기준이면, '심사위원도 개인작으로 봤다'는 말은 접겠습니다. 제가 공개 노출의 분노를 공식 판단으로 키운 겁니다.",
      "behaviorHint": "자료를 넘기던 손을 멈추고, 더 이상 수치를 방패로 삼지 못한다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-5",
      "id": "friend08:beat:b:d-3:evidence_hit"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "대표자 표기랑 제출 문구는 보통 발표자 쪽에서 정리하잖아요. 제가 그걸 따로 다시 챙겨야 할 일은 아니었다고 봅니다.",
      "behaviorHint": "짧게 숨을 멈춘 뒤 단정형으로 부정하고, 군더더기 없이 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend08:beat:b:d-4:deny"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "역할 문구를 자세히 못 적은 건 맞아도, 그게 둘 다 규칙을 방치했다는 말까지 가는 건 과하죠. 기술 파일 마감이 우선이었을 뿐입니다.",
      "behaviorHint": "로그 캡처를 넘기며 기술적 표현으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend08:beat:b:d-4:hedge"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "예, 저도 역할 로그를 끝까지 안 채웠습니다. 기술 파일 쪽에 몰리면서 제출 문구를 뒤로 미뤘어요.",
      "behaviorHint": "턱을 굳힌 채 일부만 인정하고 앞선 기여를 함께 병기한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "friend08:beat:b:d-4:partial"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "이전 약속이 있었는데도 저는 '대표자 계정이 알아서 하겠지' 하고 넘겼고, 은비도 저한테 다시 확인을 안 했어요. 결국 둘 다 확인 절차를 다시 열지 않았습니다.",
      "behaviorHint": "날짜와 버전 번호를 세듯 말하면서 구조 문제를 앞세운다.",
      "applicableStates": [
        "S3"
      ],
      "id": "friend08:beat:b:d-4:blame"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "결국 제출 규칙과 기여 로그를 둘 다 흐린 채 넘긴 건 공동 책임이에요. 저도 그걸 대표자 일이라고만 밀어 둔 책임이 있습니다.",
      "behaviorHint": "짧은 침묵 후 더 낮은 톤으로 사실을 정리하듯 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "friend08:beat:b:d-4:confession"
    },
    {
      "caseId": "friend-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "회의록이 그렇게 남아 있으면 대표자 탓만 할 수는 없네요. 저도 역할 문구를 비운 채 넘겼습니다.",
      "behaviorHint": "자료를 넘기던 손을 멈추고, 더 이상 수치를 방패로 삼지 못한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-4",
      "id": "friend08:beat:b:d-4:evidence_hit"
    }
  ]
}
