export const workplace09TellsBeats = {
  "caseId": "workplace-09",
  "executableTells": {
    "a": [
      {
        "id": "workplace-09:a:tell:client_risk_shield",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그 계정",
          "매출 리스크",
          "한 번만 삐끗해도 끝납니다"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "누가 무엇을 보냈는지 묻는 질문에도 '그 계정은 지금 한 번만 삐끗해도 끝난다'며 거래처 리스크를 먼저 꺼내 책임 판단을 뒤로 민다."
      },
      {
        "id": "workplace-09:a:tell:temporary_freeze",
        "appliesWhen": [
          "cornered",
          "lying",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "잠깐 뺀 겁니다",
          "임시로 정리한 겁니다"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "'잠깐 뺀 거다', '임시로 정리한 거다'라며 사실상 배제 조치를 잠정 대응처럼 축소한다."
      },
      {
        "id": "workplace-09:a:tell:shared_word_blur",
        "appliesWhen": [
          "avoiding",
          "lying",
          "cornered",
          "hurt"
        ],
        "lexicalHooks": [
          "공유본",
          "그쪽에서 연 문서",
          "정확히 그 파일은 아니고"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "'공유본을 보낸 줄 알았다', '그쪽에서 연 문서인 줄 알았다'처럼 '공유본'이 무엇인지 끝내 특정하지 않는다."
      }
    ],
    "b": [
      {
        "id": "workplace-09:b:tell:title_timestamp_stack",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "문서 제목",
          "발신 시각",
          "수신 순서"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "핵심 인정 대신 문서 제목과 분 단위 발신 시각을 길게 읊어 질문의 초점을 분산시킨다."
      },
      {
        "id": "workplace-09:b:tell:definition_trim",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "외부 공유가 아니라",
          "확인 요청",
          "표현을 줄여서 말하면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "'외부 공유'가 아니라 '확인 요청'이었다고 표현을 바꿔 자신이 파트너에게 보낸 내부 화면의 성격을 축소한다."
      },
      {
        "id": "workplace-09:b:tell:flat_blame_line",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "저를 먼저 잘라 놓고 시작했잖아요",
          "희생양",
          "그 순서부터 보셔야 합니다"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "감정이 올라올수록 오히려 낮은 목소리로 '저를 먼저 잘라 놓고 시작했잖아요'를 반복해 단정적으로 밀어붙인다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-09:beat:a:d-1:deny",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "제가 유은채 씨를 누설자로 단정한 적은 없어요. 그 계정은 매출 리스크가 커서 한 번만 삐끗해도 끝납니다, 그래서 잠깐 뺀 겁니다.",
      "behaviorHint": "시선을 잠시 아래로 내리며 손가락으로 책상 모서리를 두드린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-1:hedge",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "유은채 씨를 임시로 정리한 겁니다, 그 계정이 한 번만 삐끗해도 끝나는 매출 리스크라서요. 제가 본 공유본 정황이 있어서 우선 순서를 그렇게 잡은 것 같아요.",
      "behaviorHint": "말 끝을 흐리며 어깨를 조금 움츠린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-1:partial",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 유은채 씨를 후속 메일에서 뺀 건 맞아요. 다만 그 계정은 매출 리스크가 컸고 한 번만 삐끗해도 끝납니다 싶어서, 잠깐 뺀 겁니다라고 여겼어요.",
      "behaviorHint": "입술을 깨물고 고개를 천천히 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-1:blame",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 성급했던 건 맞아요. 그래도 유은채 씨 쪽도 공유본 설명과 그쪽에서 연 문서 정리를 바로 못 해줘서, 그 계정 매출 리스크를 제가 혼자 막아야 한다고 느꼈어요.",
      "behaviorHint": "손을 펴 보이며 상대 쪽을 짧게 바라본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-1:confession",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 유은채 씨를 사실확인 전에 배제했어요. 그 계정 매출 리스크와 한 번만 삐끗해도 끝납니다라는 생각에 잠깐 뺀 겁니다라고 포장했지만, 제 잘못이고 제 책임이에요.",
      "behaviorHint": "한숨을 길게 내쉰 뒤 시선을 피하지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-1:evidence_hit",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "거래처 후속 이메일 체인과 계정 회의록까지 나오면 제가 유은채 씨를 잠깐 뺀 겁니다, 임시로 정리한 겁니다라고 말한 흐름은 부정하기 어려워요. 그 계정 매출 리스크를 앞세운 건 맞지만 기록 순서는 남아 있네요.",
      "behaviorHint": "목울대를 한 번 삼키고 말속도가 느려진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-09:beat:a:d-3:deny",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 실제 유출 정황이 있었다고 봤어요. 공유본 로그에 그쪽에서 연 문서가 찍혔고, 그 계정은 매출 리스크가 커서 한 번만 삐끗해도 끝납니다라고 느꼈어요.",
      "behaviorHint": "양손을 모아 쥔 채 논리적으로 설명하려 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-3:hedge",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 본 건 공유본 제목과 그쪽에서 연 문서 흐름이었어요. 문서 ID를 바로 못 본 건 맞지만, 그 계정 매출 리스크 때문에 실제 유출처럼 받아들인 것 같아요.",
      "behaviorHint": "문장 사이를 길게 끊으며 시선을 흔든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-3:partial",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 로그 PDF만으로 어떤 공유본인지 특정되지 않은 건 맞아요. 다만 그 계정은 한 번만 삐끗해도 끝나는 매출 리스크라서, 저는 그쪽에서 연 문서를 내부본으로 먼저 의심했어요.",
      "behaviorHint": "자료를 보는 척하며 말끝을 낮춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-3:blame",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 공유본이라는 말을 흐리게 쓴 건 맞아요. 그래도 유은채 씨 쪽도 같은 제목 문서를 그대로 두고 그쪽에서 연 문서 설명을 못 맞춰서, 그 계정 매출 리스크를 저만 붙잡은 건 아니에요.",
      "behaviorHint": "손바닥을 펴서 양쪽 책임을 가르는 제스처를 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-3:confession",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 절삭된 공유본 로그와 그쪽에서 연 문서라는 말에 기대어 실제 유출처럼 몰아갔어요. 그 계정 매출 리스크에 겁먹어 붙잡은 해석이었고, 실제 유출이 아니었다는 점까지 포함해 제 잘못이고 제 책임이에요.",
      "behaviorHint": "눈을 감았다 뜨며 단어를 또렷하게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-3:evidence_hit",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "협업드라이브 링크 맵과 에이전시 AE 후속 메일까지 나오면 저는 같은 제목의 공유본과 그쪽에서 연 문서가 다른 파일이었다는 걸 부정하기 어려워요. 그 계정 매출 리스크와 한 번만 삐끗해도 끝납니다라는 마음으로 실제 유출이라고 붙잡았던 해석이 흔들립니다.",
      "behaviorHint": "어깨가 내려가고 서류를 천천히 내려놓는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-09:beat:a:d-4:deny",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 유은채 씨를 평가하려고 기록을 남긴 건 아니에요. 그 계정은 매출 리스크가 커서 한 번만 삐끗해도 끝납니다, 그래서 잠깐 뺀 겁니다 수준의 관리 표시였어요.",
      "behaviorHint": "펜을 돌리며 표정을 최대한 무덤덤하게 유지한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-4:hedge",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "저는 리스크 메모를 임시로 정리한 겁니다에 가깝게 생각했어요. 그 계정 매출 리스크가 커서 공유본 혼선이 정리될 때까지 보수적으로 본 것 같아요.",
      "behaviorHint": "의자에 등을 기대며 말끝을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-4:partial",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 CRM에서 유은채 씨 역할을 줄이고 메모를 넣은 건 맞아요. 다만 그 계정은 매출 리스크가 컸고 한 번만 삐끗해도 끝납니다 싶어서, 잠깐 뺀 겁니다라고 생각했어요.",
      "behaviorHint": "메모 내용이 떠오른 듯 미간을 좁힌다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-4:blame",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 너무 빨랐던 건 맞아요. 그래도 유은채 씨 쪽도 공유본 정리와 그쪽에서 연 문서 설명을 바로 맞추지 못해서, 그 계정 매출 리스크를 관리자인 제가 먼저 막아야 한다고 느꼈어요.",
      "behaviorHint": "양손을 앞으로 내밀며 변명하듯 설명한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-4:confession",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 사실확인 전에 유은채 씨를 리스크 인원으로 기록하고 역할을 줄였어요. 그 계정 매출 리스크와 한 번만 삐끗해도 끝납니다라는 생각으로 임시로 정리한 겁니다라고 포장했지만, 제 잘못이고 제 책임이에요.",
      "behaviorHint": "등을 바로 세우고 짧게 고개 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:a:d-4:evidence_hit",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "CRM 역할 변경 로그와 준석의 리스크 메모가 나오면 제가 잠깐 뺀 겁니다, 임시로 정리한 겁니다라고 말해도 기록 시점은 남아요. 그 계정 매출 리스크를 앞세웠지만 유은채 씨 역할을 먼저 줄인 건 부정하기 어려워요.",
      "behaviorHint": "입술을 다문 채 서류 모서리를 눌러 고정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-09:beat:b:d-2:deny",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 외부에 내부 비난을 퍼뜨린 적 없습니다. 문서 제목, 발신 시각, 수신 순서만 확인한 것이고 외부 공유가 아니라 확인 요청이었습니다.",
      "behaviorHint": "턱을 들고 또박또박 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-2:hedge",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "저는 강소라 씨에게 보낸 메시지를 외부 공유가 아니라 확인 요청으로 봤습니다. 문서 제목과 발신 시각, 수신 순서를 맞춰 보려던 것이지 내부 책임 공방을 돌리려던 것은 아닙니다.",
      "behaviorHint": "손가락으로 허공에 순서를 세듯 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-2:partial",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 내부 화면 일부를 보낸 건 맞습니다. 다만 문서 제목, 발신 시각, 수신 순서를 확인하려던 확인 요청이었고, 외부 공유가 아니라는 식으로 줄여 말한 것입니다.",
      "behaviorHint": "입술을 굳게 다문 채 고개를 한 번 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-2:blame",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 밖에 물은 건 경솔했습니다. 그래도 송준석 씨 쪽도 저를 먼저 잘라 놓고 시작했잖아요, 그래서 문서 제목과 발신 시각, 수신 순서를 외부에서라도 맞춰 보고 싶었습니다.",
      "behaviorHint": "낮은 톤으로 상대를 정면으로 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-2:confession",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 강소라 씨에게 내부 화면과 책임 추정 메시지를 보냈습니다. 문서 제목, 발신 시각, 수신 순서를 근거로 확인 요청이라고 불렀지만 외부 공유가 아니라는 말로 줄인 제 잘못이고 제 책임입니다.",
      "behaviorHint": "어깨를 곧게 세운 채 시선을 고정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-2:evidence_hit",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "은채의 에이전시 AE DM과 내부 화면 캡처가 나오면 문서 제목, 발신 시각, 수신 순서와 함께 제가 보낸 화면까지 확인됩니다. 외부 공유가 아니라 확인 요청이라고 말해도, 그 범위가 밖으로 나간 건 부정하기 어렵습니다.",
      "behaviorHint": "서류를 넘기다 멈추고 입술을 한 번 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-09:beat:b:d-3:deny",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "문서 제목, 발신 시각, 수신 순서를 보면 실제 유출처럼 읽힌 정황이 있었습니다. 저는 그 정황을 말한 것이고, 외부 공유가 아니라 확인 요청 차원의 문제 제기였습니다.",
      "behaviorHint": "종이 위 타임라인을 손끝으로 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-3:hedge",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "준석 씨가 낸 자료를 보면 문서 제목과 발신 시각, 수신 순서가 raw 문서 공유처럼 이어졌습니다. 다만 외부 공유가 아니라 확인 요청 차원의 문제 제기라고 생각하며 제가 그 정황을 실제 유출로 너무 빨리 연결한 면은 있습니다.",
      "behaviorHint": "문장 사이마다 짧게 호흡을 넣는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-3:partial",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "준석이 제출한 공유본 열람 로그만으로 실제 유출을 단정할 수 없다는 건 압니다. 다만 문서 제목, 발신 시각, 수신 순서가 그렇게 보이게 했고 저는 외부 공유가 아니라 확인 요청 수준의 정황이라고 여기며 그대로 받아들였습니다.",
      "behaviorHint": "눈썹을 찌푸리며 단어를 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-3:blame",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "중복 제목 구조가 핵심이라는 건 인정합니다. 그래도 송준석 씨 쪽도 '공유본' 설명을 흐리게 했고, 저를 먼저 잘라 놓고 시작했잖아요, 그래서 저는 문서 제목과 발신 시각, 수신 순서를 더 세게 붙잡았습니다.",
      "behaviorHint": "말끝만 낮게 내리며 냉정한 표정을 유지한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-3:confession",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "실제 내부 준비자료 유출은 없었습니다. 그런데도 제가 문서 제목, 발신 시각, 수신 순서를 근거로 실제 유출이라고 밀어붙였고 외부 공유가 아니라 확인 요청 수준의 정황이라고 스스로 합리화한 건 제 잘못이고 제 책임입니다.",
      "behaviorHint": "손에 쥔 펜을 내려놓고 짧게 숨을 고른다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-3:evidence_hit",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "협업드라이브 링크 맵이 나오면 문서 제목은 같아도 문서 ID와 발신 시각, 수신 순서가 다른 파일이라는 게 드러납니다. 그 정도면 제가 외부 공유가 아니라 확인 요청 정황이라고 눙치며 실제 유출이라 단정한 건 더는 유지하기 어렵습니다.",
      "behaviorHint": "차트의 한 지점을 멈춰 보다가 천천히 고개를 젓는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-09:beat:b:d-5:deny",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 제3자를 통해 소문을 돌린 적 없습니다. 문서 제목, 발신 시각, 수신 순서만 확인한 것이고 외부 공유가 아니라 사실관계 확인 요청이었습니다.",
      "behaviorHint": "정면을 본 채 짧고 단단하게 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-5:hedge",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저는 강소라 씨에게 보낸 것을 외부 공유가 아니라 확인 요청으로 생각했습니다. 저를 먼저 잘라 놓고 시작했잖아요, 그래서 문서 제목과 발신 시각, 수신 순서를 밖에서라도 확인하려 했습니다.",
      "behaviorHint": "차분한 톤을 유지하지만 손끝이 굳어 있다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-5:partial",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 강소라 씨에게 책임 소재를 암시한 건 맞습니다. 다만 문서 제목, 발신 시각, 수신 순서를 붙들고 제가 희생양인지 확인받으려는 확인 요청이었다고 여겼습니다.",
      "behaviorHint": "시선이 잠시 흔들리다 다시 곧아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-5:blame",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 내부보다 밖에 먼저 물은 건 잘못입니다. 그래도 송준석 씨 쪽도 자료관리 이슈를 풍겨 놓고 저를 먼저 잘라 놓고 시작했잖아요, 그래서 저는 문서 제목, 발신 시각, 수신 순서를 붙들고 추측전이 한쪽만의 책임이 아니라고 판단했습니다.",
      "behaviorHint": "낮은 목소리로 한 단어씩 눌러 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-5:confession",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 강소라 씨에게 확인 요청이라는 이름으로 책임 소재를 물었습니다. 문서 제목, 발신 시각, 수신 순서를 붙들었지만 외부 공유가 아니라고 줄여 말한 제 잘못이고 제 책임입니다.",
      "behaviorHint": "어깨에서 힘이 빠지며 시선을 천천히 내린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-09:beat:b:d-5:evidence_hit",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "은채의 에이전시 AE DM과 거래처 후속 이메일 체인 흐름까지 나오면 제가 문서 제목, 발신 시각, 수신 순서를 핑계로 외부 확인을 넓힌 건 부정하기 어렵습니다. 외부 공유가 아니라 확인 요청이라고 해도 제3자를 통한 추측전이었다는 건 남습니다.",
      "behaviorHint": "메모를 넘기다 멈추고 입술을 얇게 다문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    }
  ]
}

