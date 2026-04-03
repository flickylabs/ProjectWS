export const tenant04TellsBeats = {
  "caseId": "tenant-04",
  "executableTells": {
    "a": [
      {
        "id": "tenant04:a:tell:memory_softener",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "아마",
          "거의",
          "느낌상"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "정확한 표현을 묻는 질문에는 '아마', '거의', '느낌상' 같은 말로 기억의 책임을 흐린다."
      },
      {
        "id": "tenant04:a:tell:stacked_messages",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "그때 카톡 보시면",
          "처음엔",
          "그다음엔"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "직접 답을 피한 채 과거 메시지 여러 개를 연달아 보여주며 상대가 먼저 틀렸다는 분위기를 만든다."
      },
      {
        "id": "tenant04:a:tell:quiet_break",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "저는 그냥",
          "계속 참았어요",
          "그때 진짜"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "목소리가 작아진 뒤 갑자기 길게 말문이 터져 그동안 참은 서운함을 한꺼번에 쏟아낸다."
      }
    ],
    "b": [
      {
        "id": "tenant04:b:tell:document_gate",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "문서로 남았습니까",
          "초안일 뿐입니다",
          "서명됐습니까"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리해지면 '그건 초안일 뿐' '문서가 없잖아요'라고 서류 단계만 반복해 자신의 말의 무게를 줄인다."
      },
      {
        "id": "tenant04:b:tell:condition_backfill",
        "appliesWhen": [
          "cornered",
          "lying",
          "self_protection"
        ],
        "lexicalHooks": [
          "전제가 하나 더 있습니다",
          "그 전에",
          "조건이 붙습니다"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "처음엔 말하지 않았던 전제조건을 나중에 하나씩 붙여 원래부터 조건부였던 것처럼 설명한다."
      },
      {
        "id": "tenant04:b:tell:numeric_reset",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "2천만원",
          "그다음 날",
          "서명 여부"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "감정이 올라오면 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant04:beat:a:d-1:deny",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 그때 전세로 가는 걸 거의 확정처럼 들었습니다. 적어도 제 입장에선 되돌아가는 얘긴 아니었어요.",
      "behaviorHint": "시선을 피한 채 손가락으로 무릎을 문지른다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-1:hedge",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "계약서까지 끝났다는 뜻은 아닐 수 있어요. 그래도 그 분위기가 거의 정리된 쪽처럼 느껴졌습니다.",
      "behaviorHint": "문장 끝을 낮추며 재판관의 반응을 살핀다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-1:partial",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "지금 보면 서류는 덜 끝난 게 맞습니다. 그런데 저는 이미 전환 쪽으로 굳었다고 믿고 움직였어요.",
      "behaviorHint": "짧게 고개를 끄덕였다가 바로 설명을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-1:blame",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 성급했던 건 맞지만, 핵심 조건을 다 말 안 하셨으니까 더 확정처럼 받아들인 거예요.",
      "behaviorHint": "말이 빨라지며 '조건' 대목에서 손을 모은다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-1:confession",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "확정된 계약은 아니었습니다. 제가 '거의 됐다'는 말을 확정으로 붙잡고 먼저 움직였습니다. 제 잘못이었습니다.",
      "behaviorHint": "한숨을 쉬고 시선을 내린 뒤 담담하게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-1:evidence_hit",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "녹취 전체를 들으니까 그 뒤에 붙은 단서까지는 제가 편하게 지워버렸던 것 같아요.",
      "behaviorHint": "입술을 깨물고 잠시 말을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "tenant04:beat:a:d-3:deny",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 월세를 끊었다기보다 전환금으로 넘어가는 줄 알고 보류한 거였습니다.",
      "behaviorHint": "손바닥을 작게 펼쳐 표현을 완곡하게 바꾼다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-3:hedge",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 먼저 물어본 건 맞고요, 답이 애매해서 그렇게 이해한 거예요.",
      "behaviorHint": "말끝을 흐리며 '그렇게'를 한 번 더 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-3:partial",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "한 달치를 안 낸 건 맞습니다. 다만 2천만원이 이미 들어갔으니까 전환이 이어지는 줄 알았어요.",
      "behaviorHint": "고개를 숙였다가 송금 대목에서 목소리를 조금 높인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-3:blame",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 혼자 멈춘 건 맞아도, 계속 내라고 분명히 선을 그은 적도 없잖아요.",
      "behaviorHint": "억울한 표정으로 재판관보다 상대를 잠깐 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-3:confession",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "네, 저는 한 달치 월세를 실제로 내지 않았습니다. 그 판단이 성급했고, 번복하기가 창피했습니다. 제 잘못이었습니다.",
      "behaviorHint": "작게 고개를 끄덕이며 마지막 문장을 천천히 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-3:evidence_hit",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "전체 카톡을 보니 제가 듣고 싶은 문장만 붙잡았네요. '최종 정하자'는 말은 있었어요.",
      "behaviorHint": "휴대폰 화면을 내려놓고 시선을 떼지 못한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant04:beat:a:d-5:deny",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2천만원은 전세로 바꾸려고 넣은 돈이니까, 거의 그대로 돌아와야 한다고 생각했습니다.",
      "behaviorHint": "금액부터 말하고 손가락으로 책상을 두 번 두드린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-5:hedge",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "적어도 위약금처럼 묶어둘 돈은 아니라고 봤어요. 전환 준비금이라고만 적혀 있었으니까요.",
      "behaviorHint": "메모 문구를 조심스럽게 인용하며 말을 고른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-5:partial",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "확정 전세금이라고 단정하긴 어렵습니다. 그래도 전액을 깎일 돈은 아니라고 생각해요.",
      "behaviorHint": "작게 양보하는 듯 말하지만 마지막 문장에서 힘을 준다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-5:blame",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "정산 기준을 처음부터 적어줬다면 저도 이렇게까지 확신하지 않았을 겁니다.",
      "behaviorHint": "서류가 비어 있었다는 듯 허공에 선을 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-5:confession",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "2천만원을 확정 전세금이라고만 볼 수는 없습니다. 미납 월세를 반영하고 나머지를 다시 정산하는 게 맞습니다. 제 잘못이었습니다.",
      "behaviorHint": "체념 섞인 표정으로 문장을 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:a:d-5:evidence_hit",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "메모를 다시 보니까 기준이 비어 있네요. 제가 너무 한 방향으로만 읽었습니다.",
      "behaviorHint": "영수 메모 쪽을 손끝으로 짚으며 목소리가 작아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant04:beat:b:d-2:deny",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공동명의 서명과 대출 비용은 원래 검토사항입니다. 숨긴 조건으로 보실 일은 아닙니다.",
      "behaviorHint": "턱을 들고 또박또박 항목처럼 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-2:hedge",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "처음부터 전부 길게 설명하진 않았습니다만, 서류 단계에서 정리될 문제라고는 말씀드렸습니다.",
      "behaviorHint": "손바닥을 아래로 누르며 말을 정리하듯 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-2:partial",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "등기와 상환예상서를 보시면 아시겠지만, 제가 그 조건을 먼저 선명하게 말하지 않은 건 맞습니다.",
      "behaviorHint": "문서 제목을 먼저 말한 뒤 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-2:blame",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "전세대출을 알아보셨다면 추가 서류와 비용이 더 붙는다는 점도 어느 정도는 짐작하셨을 겁니다.",
      "behaviorHint": "어깨를 굳힌 채 상대를 보지 않고 말한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-2:confession",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "네, 공동명의 서명과 중도상환수수료는 핵심 조건이었고, 그걸 제가 초기에 충분히 공개하지 않았습니다. 제 잘못이었습니다.",
      "behaviorHint": "입술을 굳게 다문 뒤 한 항목씩 인정하듯 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-2:evidence_hit",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "상환예상서 날짜가 먼저라면, 제가 그 비용을 모르고 있었다고 하긴 어렵겠군요.",
      "behaviorHint": "종이 한 장을 넘기듯 손을 움직이며 목소리가 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant04:beat:b:d-4:deny",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "협의가 사실상 틀어진 상황에서 다른 임차인 일정을 잡는 건 이상한 일이 아닙니다.",
      "behaviorHint": "의자 등받이에 기대고 말을 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-4:hedge",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "굳이 결렬이라고 적진 않았어도, 월세가 멈춘 상황이면 종료로 받아들일 만했습니다.",
      "behaviorHint": "문장 끝을 단정적으로 올려 묻는 투를 만든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-4:partial",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "직접 끝났다고 쓴 문장은 없습니다. 그 부분은 인정합니다. 다만 월세가 멈춘 상황에서 공실을 방치할 수도 없었습니다.",
      "behaviorHint": "시선을 고정한 채 불필요한 말을 덜어내듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-4:blame",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "월세를 멈춘 상태에서 제가 공실을 그냥 둘 순 없었습니다. 다은 씨가 먼저 월세를 끊은 게 이 상황을 만든 거예요.",
      "behaviorHint": "'공실'에서 짧게 힘을 주고 손을 접어 쥔다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-4:confession",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "네, 다은 씨에게 협의 결렬을 분명히 통지하기 전에 다른 예비 임차인에게 집을 보여줬습니다. 제 잘못이었습니다.",
      "behaviorHint": "고개를 한 번 끄덕이고 더 변명하지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-4:evidence_hit",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "예약문자 시각이 그쪽이라면 순서는 제가 잘못 잡은 겁니다.",
      "behaviorHint": "문자 시각을 확인하고 짧게 숨을 내쉰다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "tenant04:beat:b:d-5:deny",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2천만원을 협의 실패 뒤에 바로 돌려줄 돈으로 볼 수는 없습니다.",
      "behaviorHint": "금액을 먼저 말한 뒤 단호하게 선을 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-5:hedge",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "적어도 일부는 미납과 손해를 메우는 돈으로 봐야지, 전액 반환을 전제로 볼 순 없습니다.",
      "behaviorHint": "손가락으로 항목을 세듯 계산하는 제스처를 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-5:partial",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "메모상 확정 전세금도 아니고 위약금이라고 적힌 것도 아닙니다. 그 점은 인정합니다.",
      "behaviorHint": "영수 메모를 집어 들어 문구를 읽듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-5:blame",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "월세를 먼저 멈추고 확정처럼 움직인 부분은 정산에서 반영될 수밖에 없습니다.",
      "behaviorHint": "시선을 아래로 두고 계산 결과를 통보하듯 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-5:confession",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "2천만원을 전액 몰취할 수는 없습니다. 미납 월세와 실제 손해만 반영하고 나머지는 반환해야 합니다. 제 잘못이었습니다.",
      "behaviorHint": "말을 고르다 마지막 문장에서 짧게 결론낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant04:beat:b:d-5:evidence_hit",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "초안과 메모를 같이 보면 제가 위약금처럼 몰아가긴 어렵네요.",
      "behaviorHint": "문서를 나란히 놓고 입꼬리를 굳힌다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

