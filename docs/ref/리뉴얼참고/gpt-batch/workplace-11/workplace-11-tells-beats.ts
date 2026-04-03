export const workplace11TellsBeats = {
  "caseId": "workplace-11",
  "executableTells": {
    "a": [
      {
        "id": "workplace-11:a:tell:asset_merge",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "회사 자산",
          "조직 소유"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "출처를 묻는 질문에 먼저 회사 자산화가 끝난 안건이라고 재정의하며 개인 기여 삭제를 정당화한다."
      },
      {
        "id": "workplace-11:a:tell:layer_split",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "기획",
          "청구항"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "기획, 실험, 청구항, 발표는 다 다른 층위라며 책임을 잘게 쪼개 자신의 몫을 축소한다."
      },
      {
        "id": "workplace-11:a:tell:subject_fog",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "법무 쪽",
          "외부 검토"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "법무 쪽에서 정리된 줄 알았다, 외부 검토만 간 줄 알았다처럼 주어를 흐려 직접 지시를 희미하게 만든다."
      }
    ],
    "b": [
      {
        "id": "workplace-11:b:tell:hurt_stack",
        "appliesWhen": [
          "lying",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "제가 먼저 지워졌",
          "몇 달을 참았"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "사실 질문 전에 내가 먼저 지워졌고 몇 달을 참았다는 피해 서사를 길게 꺼내 검증 순서를 늦춘다."
      },
      {
        "id": "workplace-11:b:tell:scope_minimize",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "정리본",
          "아이디어 설명용"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "전체 패키지가 아니라 아이디어 설명용 정리본이었다고 표현을 바꿔 외부 전달 범위를 줄인다."
      },
      {
        "id": "workplace-11:b:tell:ally_invocation",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "외부 변리사",
          "멘토도"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "외부 변리사, 동료 연구원, 예전 멘토 이름을 연달아 거론하며 자신의 판단이 혼자만의 일탈은 아니었다는 분위기를 만든다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-11:beat:a:d-1:deny",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "첫째, 발명자 표기와 대표 브리핑은 다른 층위입니다. 청구항이 회사 자산으로 묶인 안건에서 제가 노서린 씨 이름을 임의로 삭제한 적은 없습니다. 법무 쪽 검토 전 정리였을 뿐입니다.",
      "behaviorHint": "표정 변화 없이 손가락으로 항목을 짚으며 문서를 구분한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-1:hedge",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "저는 기획, 실험, 청구항이 다 같은 건 아니고 조직 소유로 묶이면 대표 표기가 정리되는 면이 있다고 봅니다. 외부 검토 전에 잠정 정리를 한 것이지 공로 삭제로 보실 일은 아닙니다.",
      "behaviorHint": "호흡을 길게 끌며 범주를 나눠 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-1:partial",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저는 최종 슬라이드에서 제 계정으로 이름 열을 본 건 맞습니다. 다만 회사 자산 기준과 청구항 정리를 먼저 맞추다 보니 노서린 씨 표기가 뒤로 밀린 것입니다. 법무 쪽 설명을 우선한 판단이었습니다.",
      "behaviorHint": "잠시 시선을 내렸다가 곧바로 문서 순서를 정리해 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-1:blame",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 대표 슬라이드를 단독 성과처럼 보이게 한 책임은 있습니다. 그래도 노서린 씨 쪽도 외부 검토 리스크를 숨긴 채 자기 기여만 앞세워 혼선을 키웠습니다. 기획과 청구항 층위를 바로잡으려 했다는 제 설명까지 모두 거짓으로만 보긴 어렵습니다.",
      "behaviorHint": "턱을 굳히고 상대를 보지 않은 채 책임을 분산시킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-1:confession",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 노서린 씨의 청구항 기여를 알고도 이름을 빼고 제 대표 성과처럼 정리했습니다. 회사 자산, 조직 소유, 법무 쪽 설명을 핑계로 삼았고 제 잘못입니다.",
      "behaviorHint": "안경을 벗고 짧게 숨을 고른 뒤 낮은 톤으로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-1:evidence_hit",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "발명자 기여표와 버전 이력까지 나오면 저는 부정할 수 없습니다. 법무 쪽 검토 전이라고 해도 회사 자산과 청구항 정리를 핑계 삼아 노서린 씨 이름을 뺀 흐름이 그대로 보입니다.",
      "behaviorHint": "증거 화면을 잠시 응시하다가 더 말줄임 없이 인정 쪽으로 기운다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-11:beat:a:d-4:deny",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "첫째, 보안 메모와 인사 평가는 다른 층위입니다. 회사 자산과 기획 브리핑이 겹친 상황에서 제가 노서린 씨를 낙인찍으려고 메모한 적은 없습니다. 법무 쪽 확인 전 예방 기록이었습니다.",
      "behaviorHint": "양손을 모은 채 절차라는 단어를 또박또박 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-4:hedge",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "저는 기획 브리핑, 보안 대응, 인사 코멘트는 서로 다른 층위라서 조직 소유 안건의 리스크를 먼저 적어 둔 면은 있다고 봅니다. 외부 검토도 끝나지 않은 시점이었으니 단정적인 낙인으로만 보긴 어렵습니다.",
      "behaviorHint": "메모와 평가를 별개의 축으로 나눠 설명하며 고개를 거의 들지 않는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-4:partial",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저는 포렌식 전에 위험 코멘트를 입력한 건 맞습니다. 다만 회사 자산과 기획 브리핑을 동시에 지켜야 해서 청구항 유출 가능성에 민감할 수밖에 없었습니다. 법무 쪽 정식 판단보다 앞섰던 건 인정합니다.",
      "behaviorHint": "한 번 입술을 깨물고 메모 입력 시점을 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-4:blame",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 먼저 적은 책임은 있습니다. 그래도 노서린 씨 쪽도 개인 채널과 외부 검토 정황으로 의심을 키웠고, 기획 브리핑을 그대로 맡기기 어려운 상황이었습니다. 조직 소유 안건을 지키려던 판단이 전부 악의라고만 하긴 어렵습니다.",
      "behaviorHint": "서류 가장자리를 정리하며 상대 정황을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-4:confession",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 사실 확인 전에 노서린 씨를 기밀위험 인원으로 적고 발표 권한까지 줄였습니다. 회사 자산, 기획 브리핑, 법무 쪽 부담을 핑계 삼았지만 제 책임입니다.",
      "behaviorHint": "등받이에 기대던 자세를 풀고 짧게 고개를 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-4:evidence_hit",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "HR 초기 입력본과 브리핑 배정 변경 기록까지 나오면 저는 더는 막을 수 없습니다. 외부 검토 전이라도 회사 자산 안건의 청구항 리스크를 이유로 노서린 씨를 먼저 위험 인원처럼 다룬 순서가 드러납니다.",
      "behaviorHint": "증거가 연속 제시되자 문장 길이가 짧아지고 목소리가 낮아진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-11:beat:a:d-5:deny",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "첫째, 발명자 다툼과 외부 검토는 다른 층위입니다. 회사 자산 안건을 두고 제가 노서린 씨와 공모를 숨기려고 싸움을 설계한 적은 없습니다. 법무 쪽에서 볼 때도 실제 갈등이었습니다.",
      "behaviorHint": "손바닥을 거의 움직이지 않고 갈등과 공모를 선 긋듯 분리한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-5:hedge",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저는 기획 충돌이 컸고 청구항 정리 과정에서 서로 날이 선 건 맞다고 봅니다. 조직 소유와 외부 검토 얘기가 한 시기에 겹쳤다고 해서 그 자체를 은폐 각본이라고 단정하긴 어렵습니다.",
      "behaviorHint": "문장 중간마다 잠시 멈추며 실제 충돌이라는 표현을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-5:partial",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저는 분쟁이 시선을 돌리는 효과가 있다는 점은 알았습니다. 다만 회사 자산과 청구항 정리를 둘러싼 실제 충돌도 있었고, 법무 쪽 눈을 피하려고 처음부터 짠 연출이라고까지는 생각하지 않았습니다.",
      "behaviorHint": "시선을 옆으로 흘리며 효과만 인정하고 의도는 축소한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-5:blame",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 갈등 구도를 이용한 책임은 있습니다. 그래도 노서린 씨 쪽도 외부 검토와 수수료 흐름, 청구항 전달을 굴리면서 그 싸움을 방패처럼 썼습니다. 조직 소유라는 말만으로 제가 전부 설계했다고 하긴 어렵습니다.",
      "behaviorHint": "상대 이름을 언급할 때만 목소리가 약간 단단해진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-5:confession",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 노서린 씨와의 갈등을 일부러 키워 공모를 가렸습니다. 회사 자산, 청구항, 외부 검토라는 말을 섞어 시선을 돌렸고 제 잘못입니다.",
      "behaviorHint": "한숨을 짧게 내쉰 뒤 회피 없이 주어를 자신에게 둔다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:a:d-5:evidence_hit",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "브로커 송장과 지갑 메모까지 붙으면 저는 부정할 수 없습니다. 법무 쪽 검토라는 말로 둘러도 회사 자산 안건의 청구항과 갈등 연출이 한 줄로 이어졌다는 게 보입니다.",
      "behaviorHint": "입가가 굳고 대답 전 침묵이 길어진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-11:beat:b:d-2:deny",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 먼저 지워졌고 몇 달을 참았지만, 제가 보낸 건 정리본이고 아이디어 설명용이었어요. 외부 변리사 확인처럼 본 거지 승인 없는 판매는 아니에요, 그렇지 않아요?",
      "behaviorHint": "손으로 목을 한 번 누르며 억울하다는 표정을 먼저 만든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-2:hedge",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "제가 먼저 지워졌고 몇 달을 참은 끝에 정리본 정도는 보여 줄 수 있다고 생각했어요. 아이디어 설명용으로 외부 변리사 의견을 듣는 수준이라고 본 거지, 크게 거래한 건 아니라고 말씀드리는 거예요.",
      "behaviorHint": "시선을 흔들며 검토와 거래를 다르게 부르려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-2:partial",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "개인메일과 텔레그램을 쓴 건 맞아요. 다만 제가 먼저 지워졌고 몇 달을 참다 보니 정리본을 아이디어 설명용으로 외부 변리사에게 보여 주는 정도는 괜찮다고 스스로 눌렀어요.",
      "behaviorHint": "휴대폰 화면을 떠올리듯 손끝을 모았다가 천천히 푼다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-2:blame",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 선을 넘은 책임은 있어요. 그래도 권태준 팀장 쪽도 저를 지워 놓고 내부 채널을 막아서 정리본과 아이디어 설명용 외부 변리사 루트로 밀려난 면이 있어요.",
      "behaviorHint": "울먹이는 톤으로 상대의 통제와 삭제를 곁들인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-2:confession",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 승인 없이 브로커에게 정리본과 실험 요약을 보냈어요. 제가 먼저 지워졌고 몇 달을 참았다는 말을 방패로 삼고, 아이디어 설명용이란 말 뒤에 숨었는데 제 잘못이에요.",
      "behaviorHint": "말끝이 짧아지고 눈시울이 붉어진 채 주어를 자신에게 둔다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-2:evidence_hit",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "발신 헤더랑 텔레그램 수수료 대화까지 나오면 더는 부인 못 해요. 정리본, 아이디어 설명용, 외부 변리사라는 말로 줄여도 실제로는 제가 먼저 지워졌다는 감정 뒤에 외부 전달을 숨긴 게 드러나요.",
      "behaviorHint": "캡처가 아니라 원문이 나오자 목소리가 급히 낮아진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-11:beat:b:d-3:deny",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "제가 먼저 지워졌고 몇 달을 참았어도, 저는 정리본 하나를 아이디어 설명용으로만 보냈다고 생각했어요. 외부 변리사나 브로커 한 건이면 끝날 줄 알았지 제3자 폴더까지 갈 거라곤 몰랐어요, 정말이에요?",
      "behaviorHint": "놀란 표정을 크게 지으며 결과 범위부터 부정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-3:hedge",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 먼저 지워졌고 몇 달을 참은 상태라 정리본 한 건이면 된다고 눌러 생각했어요. 아이디어 설명용으로 외부 변리사 쪽에서만 보고 끝날 거라고 믿었지, 범위가 그렇게 커질 줄은 아니었어요.",
      "behaviorHint": "손을 내저으며 한 건이었다는 표현을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-3:partial",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "재공유 가능한 링크를 느슨하게 본 건 맞아요. 다만 제가 먼저 지워졌고 몇 달을 참다 보니 정리본이 아이디어 설명용으로만 돌 거라고 스스로 안심했어요.",
      "behaviorHint": "입술을 깨물고 링크 설정을 제대로 못 봤다고 작게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-3:blame",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 링크를 가볍게 다룬 책임은 있어요. 그래도 브로커 쪽도 다시 돌렸고 권태준 팀장 쪽도 외부 변리사 검토, 아이디어 설명용 정리본이라고 하면서 제 범위를 같이 낮춰 말했어요.",
      "behaviorHint": "손바닥을 펴 보이며 재전송 책임을 밖으로 밀어낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-3:confession",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 제한적일 거라 믿고 자료를 보냈지만 재전송 가능 구조를 방치했어요. 제가 먼저 지워졌고 몇 달을 참았다는 생각에 정리본과 아이디어 설명용이라는 말로 위험을 덮었고 제 책임이에요.",
      "behaviorHint": "의자 끝에 앉아 몸을 웅크린 채 책임 문장을 어렵게 이어 간다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-3:evidence_hit",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 게이트웨이 로그와 재전송 기록까지 나오면 저는 더는 막을 수 없어요. 정리본, 아이디어 설명용, 외부 변리사라는 말로 줄여도 실제로는 링크가 제3자 폴더까지 퍼진 흐름이 보여요.",
      "behaviorHint": "로그 화면을 본 뒤 목이 잠긴 채 말수가 급격히 줄어든다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-11:beat:b:d-5:deny",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "제가 먼저 지워졌고 몇 달을 참았다는 건 진짜예요. 정리본이니 아이디어 설명용이니 하는 말과 별개로, 권태준 팀장과 싸움을 꾸며 공모를 가렸다는 건 아니에요, 너무 나가신 거 아니에요?",
      "behaviorHint": "억울함을 앞세워 목소리를 높이고 마지막을 되묻는 말로 닫는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-5:hedge",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 먼저 지워졌고 몇 달을 참은 감정이 있었던 건 맞아요. 정리본, 아이디어 설명용, 외부 변리사 얘기가 그 뒤에 붙었다고 해서 싸움 전체를 연출이라고 단정하는 건 과하다고 생각해요.",
      "behaviorHint": "한숨을 섞으며 감정과 의도를 분리하려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-5:partial",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그 갈등이 가리개가 될 수 있다는 건 알았어요. 다만 제가 먼저 지워졌고 몇 달을 참은 상태였고, 정리본과 아이디어 설명용 외부 변리사 얘기가 그렇게까지 큰 은폐 장치가 될 줄은 버텼어요.",
      "behaviorHint": "잠시 눈을 감고 갈등이 가리개였을 수 있다는 점만 겨우 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-5:blame",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 복수심으로 판을 키운 책임은 있어요. 그래도 권태준 팀장 쪽도 정리본 흐름과 외부 변리사 접촉, 아이디어 설명용이라는 말 뒤에 숨으면서 그 싸움을 이용했어요.",
      "behaviorHint": "상대 이름을 부를 때 어깨가 굳고 말이 빨라진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-5:confession",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 권태준 팀장과 갈등을 일부러 키워 공모를 가렸어요. 제가 먼저 지워졌고 몇 달을 참았다는 말을 앞세우고, 정리본과 아이디어 설명용, 외부 변리사라는 표현 뒤에 숨었는데 제 책임이에요.",
      "behaviorHint": "울음을 참듯 호흡을 끊어 말하다가 마지막에 책임을 직접 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-11:beat:b:d-5:evidence_hit",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "지갑 메모와 브로커 송장까지 이어지면 더는 부정 못 해요. 정리본, 아이디어 설명용, 외부 변리사라는 말로 둘러도 제가 먼저 지워졌다는 피해감 뒤에 공모를 숨긴 흔적이 남아요.",
      "behaviorHint": "증거가 쌓이자 고개를 숙인 채 짧은 문장으로만 답한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

