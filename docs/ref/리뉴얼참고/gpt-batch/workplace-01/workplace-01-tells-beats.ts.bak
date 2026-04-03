export const workplace01TellsBeats = {
  "caseId": "workplace-01",
  "executableTells": {
    "a": [
      {
        "id": "workplace-01:a:tell:process_shield",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "프로세스상",
          "정리되다",
          "절차적으로"
        ],
        "sentenceShape": "self_reference",
        "cadence": "every_turn",
        "originalPattern": "자신의 선택을 묻는 질문에도 '프로세스상 그렇게 처리됐다'며 행위 주체를 흐린다."
      },
      {
        "id": "workplace-01:a:tell:premature_summary",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "핵심은",
          "정리하면",
          "그게 아니고"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "상대가 질문을 끝내기 전에 '핵심은 그게 아니고'라고 먼저 요약해 쟁점을 좁혀 버린다."
      },
      {
        "id": "workplace-01:a:tell:pronoun_blur",
        "appliesWhen": [
          "avoiding",
          "lying",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "우리가",
          "그쪽에서",
          "정리됐다"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "'우리가 정리했다', '그쪽에서 올렸다'처럼 주어를 흐려 자신의 직접 행동을 숨긴다."
      }
    ],
    "b": [
      {
        "id": "workplace-01:b:tell:timestamp_barrage",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "fear"
        ],
        "lexicalHooks": [
          "20시 17분",
          "그 다음",
          "새벽 1시대"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리한 장면이 나오면 분 단위 시간표를 쏟아내며 전체 의도를 시간 정보로 덮는다."
      },
      {
        "id": "workplace-01:b:tell:echo_challenge",
        "appliesWhen": [
          "cornered",
          "emotional",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "그 표현이요?",
          "오너요?",
          "리스크요?"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "every_turn",
        "originalPattern": "상대가 쓴 표현을 그대로 되묻고 비꼬듯 반복해 방어적 주도권을 잡으려 한다."
      },
      {
        "id": "workplace-01:b:tell:evidence_tap",
        "appliesWhen": [
          "emotional",
          "lying",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "여기 있잖아요",
          "캡처 보세요",
          "시간표 보세요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "테이블이나 화면을 여러 번 두드리며 '여기 있잖아요'라는 말로 감정과 사실을 한 번에 밀어붙인다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-01:beat:a:d-1:deny",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "결론부터 말씀드리면, 단독 기재라고 볼 사안은 아닙니다. 임원 제출본은 원래 팀장 명의로 정리됩니다.",
      "behaviorHint": "턱을 거의 움직이지 않고 서류 순서만 정리하듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-1:hedge",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "핵심은 공로 삭제가 아니라 표기 누락 여부입니다. 마감 직전엔 프로세스상 제출 완성이 먼저였습니다.",
      "behaviorHint": "질문이 끝나기 전에 '핵심은'을 먼저 꺼내며 손끝으로 선을 긋는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-1:partial",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "박서윤이 프레임과 KPI 표를 만든 건 맞습니다. 다만 최종 문안과 승인 책임까지 감안하면 팀 결과물로 봐야 합니다.",
      "behaviorHint": "짧게 인정한 뒤 바로 책임선을 둘로 나눈다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-1:blame",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "평가 시즌에 이름 한 줄이 바로 권한 싸움으로 번졌습니다. 저는 보고 라인 혼선을 막으려 한 겁니다. 서윤 씨 쪽도 캡처를 돌려서 상황을 키운 책임이 있습니다.",
      "behaviorHint": "감정 없이 '보고 라인'이라는 단어만 또렷하게 힘준다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-1:confession",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 메일과 표지에서 이름을 뺐습니다. 승진 심사 직전에 공을 제 명의로 묶어 두려는 계산이 있었고, 그건 제 책임입니다.",
      "behaviorHint": "잠깐 시선을 내렸다가 다시 들며 문장을 짧게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-1:evidence_hit",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "메일 체인과 회의록까지 나오면 '몰랐다'고 하긴 어렵습니다. 실무 오너 표기가 남아 있었던 건 부정하지 않겠습니다.",
      "behaviorHint": "서류 모서리를 한 번 정렬한 뒤 말을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-01:beat:a:d-3:deny",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "제가 확보한 자료엔 박서윤이 23시 48분 최종 수정자로 보였습니다. 그 이상 해석할 이유가 없었습니다.",
      "behaviorHint": "PDF 한 장을 손가락으로 눌러 보이며 짧게 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-3:hedge",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "저는 당시 확보된 출력본을 제출했을 뿐입니다. 추출 경로 전체까지 제가 확인한 건 아닙니다.",
      "behaviorHint": "주어를 흐리며 '제출됐다'는 식으로 말끝을 닫는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-3:partial",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 PDF가 완전한 감사 로그가 아니라는 점은 압니다. 다만 그 시점엔 가장 빠른 설명이 그 자료였습니다.",
      "behaviorHint": "짧게 인정한 뒤 바로 이유를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-3:blame",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "공용 PC와 관리자 측 개입이 있었다면 운영 관리도 같이 봐야 합니다. 서윤 씨 쪽도 새벽에 무단 접근해서 캡처를 뽑은 부분이 있고, 혼란스러운 심야 작업의 책임을 전부 제 판단으로만 돌리긴 어렵습니다.",
      "behaviorHint": "손바닥을 약간 펴 보이며 책임 범위를 넓히려 한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-3:confession",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "결국 저는 약한 PDF를 근거로 박서윤 책임을 굳히려 했습니다. 원본 로그보다 인상효과가 제게 유리하다고 계산한 건 제 잘못입니다.",
      "behaviorHint": "입술을 다물었다 열며 한 호흡 늦게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-3:evidence_hit",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "이 PDF가 잘린 출력본이라는 지적은 받아들입니다. 이걸로 최종 수정자를 확정하는 건 무리였죠.",
      "behaviorHint": "문서 가장자리를 접듯 손가락을 오므린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-01:beat:a:d-4:deny",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "평가 초안은 HR이 다루는 영역입니다. 제가 비공식으로 점수에 손댔다고 보진 않습니다.",
      "behaviorHint": "등받이에 기대지 않은 채 말만 건조하게 내놓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-4:hedge",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "남긴 건 일반적인 리스크 코멘트였습니다. 최종 반영 여부는 HR 판단이었죠.",
      "behaviorHint": "문장을 두 토막으로 나눠 책임선을 잘라 낸다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-4:partial",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "점수 보정 직전에 메모를 넣은 건 맞습니다. 다만 그 문장이 어떻게 읽힐지는 HR 몫이라고 봤습니다.",
      "behaviorHint": "인정 뒤에 바로 기관 명칭을 덧대며 거리를 둔다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-4:blame",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "이후 야간 수정과 캡처 소동까지 겹치면서 리스크 판단이 강화된 면도 있습니다. 서윤 씨 쪽도 무단 캡처를 돌려 팀 분위기를 흔들었고, 메모 하나만 떼어 제시하면 맥락이 빠집니다.",
      "behaviorHint": "손등으로 책상 가장자리를 살짝 쓸며 맥락이라는 말을 눌러 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-4:confession",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 점수 보정 직전에 비공개 메모를 넣어 방향에 영향을 줬습니다. 일반 피드백이라는 말은 책임을 줄이려는 표현이었습니다.",
      "behaviorHint": "숨을 길게 내쉰 뒤 단정적으로 끝낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:a:d-4:evidence_hit",
      "caseId": "workplace-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "버전기록에 제 계정 시각이 찍혀 있으면 부정할 수는 없습니다. 그 메모가 비공식 경로였다는 점도 인정합니다.",
      "behaviorHint": "시선이 잠깐 HR 기록 쪽에 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-01:beat:b:d-1:deny",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 보고서의 뼈대와 숫자는 제가 만든 거예요. 메일을 누가 보냈는지랑 공로를 누가 가져가느냐는 다르죠.",
      "behaviorHint": "상대가 쓴 단어를 되받아치듯 '공로요?' 하고 먼저 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-1:hedge",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "문장을 조금 다듬은 건 있을 수 있어요. 그래도 이름을 통째로 빼도 될 정도의 차이는 아니었어요.",
      "behaviorHint": "속도를 높였다가 마지막 문장에서 또박또박 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-1:partial",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "임원용 문안 정리와 승인 절차를 팀장이 맡은 건 맞아요. 그런데 제 이름을 지운 순간 선을 넘은 거예요.",
      "behaviorHint": "인정하는 문장과 공격하는 문장을 한 박자 차로 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-1:blame",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "문제는 팀장 자리로 제 이름을 지워도 된다고 본 태도예요. 저는 거기서부터 모욕당한 거예요.",
      "behaviorHint": "캡처 대신 빈 손으로 책상을 두드리며 강세를 준다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-1:confession",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 화가 나서 보고서를 거의 제 단독 성과처럼 말한 건 제 잘못이었어요. 그래도 이름 삭제 자체가 잘못이라는 핵심은 그대로예요.",
      "behaviorHint": "말 끝이 떨리지만 시선은 상대를 피하지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-1:evidence_hit",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "메일 원본과 회의록이 나오면 적어도 제가 실무 오너였다는 건 분명해지죠. 그다음부터는 왜 이름이 빠졌는지를 묻는 싸움이에요.",
      "behaviorHint": "자료를 앞으로 밀어 두고 고개를 짧게 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-01:beat:b:d-2:deny",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 그걸 퍼뜨리려고 본 게 아니에요. 남아 있던 권한으로 열린 화면을 보고 제 상황이 이상한지 확인한 거예요.",
      "behaviorHint": "말이 빨라지며 '유포요?'를 바로 되묻는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-2:hedge",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "불안해서 몇 장 캡처한 건 맞아요. 하지만 처음부터 소문을 만들 생각으로 움직인 건 아니었어요.",
      "behaviorHint": "손가락 끝으로 보이지 않는 화면을 넘기듯 움직인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-2:partial",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "동료 두 명에게 보낸 건 맞아요. 그때는 저 혼자 알고 있으면 바로 낙인찍힐 것 같았어요. 다만 퍼뜨리려던 게 아니라 확인을 구한 거였어요.",
      "behaviorHint": "캡처 묶음을 쥔 것처럼 손을 접었다 편다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-2:blame",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "권한을 닫아 두지 않은 쪽도 문제였고, 태성이 뒤에서 평가를 만지는 정황이 저를 더 몰았어요. 잘못이 없다는 말이 아니라 왜 무너졌는지 보라는 거예요.",
      "behaviorHint": "문장 속도를 확 끌어올렸다가 마지막에 세게 멈춘다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-2:confession",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "결국 저는 무단으로 열람했고 일부를 캡처해 돌렸어요. 억울했어도 그 방식은 잘못이었어요.",
      "behaviorHint": "입술을 깨물 듯 다문 뒤 짧게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-2:evidence_hit",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "캡처 파일 시간대와 전달 흔적이 다 맞으면 더는 부인할 수 없죠. 두 명에게 보낸 건 인정할게요.",
      "behaviorHint": "화면 가장자리를 톡톡 두드리듯 손끝이 움직인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-01:beat:b:d-5:deny",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "규칙을 먼저 깬 건 제 이름을 지운 쪽이에요. 제가 뒤늦게 반응한 걸 같은 위반으로 묶는 건 못 받겠어요.",
      "behaviorHint": "상대 문장을 그대로 받아 '같은 위반이요?' 하고 되묻는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-5:hedge",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "몇 사람에게 말은 했어요. 그런데 그게 이렇게까지 번질 줄은 처음엔 몰랐어요.",
      "behaviorHint": "속도를 늦추려다 다시 빨라지며 변명과 인정이 섞인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-5:partial",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 저는 화가 났고 사람들이 그냥 넘어가지 않길 바랐어요. 그래서 캡처를 들고 제 얘기를 먼저 했어요. 그래도 정식 채널로 가려던 의지는 있었어요.",
      "behaviorHint": "캡처를 쥔 손처럼 주먹을 반쯤 쥔다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-5:blame",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "정식 채널이 저를 지켜 줄 거란 믿음이 없었어요. 이름은 지워지고 평가는 흔들리는데 가만히 있으라면 그게 더 이상하죠. 태성 씨 쪽도 먼저 규칙을 깬 책임이 있어요.",
      "behaviorHint": "숨을 몰아쉬듯 빠르게 내뱉고 마지막 문장을 낮게 깐다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-5:confession",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저는 태성에게 되갚고 싶었어요. 캡처와 소문으로 압박하면 저도 선을 넘는다는 걸 알면서도 그렇게 한 건 제 잘못이에요.",
      "behaviorHint": "목소리가 잠깐 갈라졌다가 끝에서 아주 작게 낮아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-01:beat:b:d-5:evidence_hit",
      "caseId": "workplace-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "슬랙 캡처 흐름이 다 이어지면 '우발적이었다'는 말은 약해져요. 적어도 제가 판을 키운 건 인정해야겠네요.",
      "behaviorHint": "고개를 젖히지 못하고 화면을 정면으로 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-5"
    }
  ]
}

