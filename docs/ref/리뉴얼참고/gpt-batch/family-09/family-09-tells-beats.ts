export const family09TellsBeats = {
  "caseId": "family-09",
  "executableTells": {
    "a": [
      {
        "id": "family09:a:tell:care_rollcall",
        "appliesWhen": [
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "병원",
          "약값",
          "장보기",
          "공과금"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "차액 공모 질문이 나오면 재활병원 동행, 식사 준비, 공과금 대납을 한 호흡에 열거해 재산 논쟁을 돌봄 경쟁으로 바꾼다."
      },
      {
        "id": "family09:a:tell:betrayed_sigh",
        "appliesWhen": [
          "emotional",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "결국",
          "또",
          "뒤늦게",
          "제가요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "결정적 반박 직전에 한숨을 길게 쉬며 '결국 또 내가 뒤늦게 알았잖아'를 반복해 자신의 과장과 누락을 배신감의 부산물처럼 보이게 만든다."
      },
      {
        "id": "family09:a:tell:partial_scope",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "self_protection"
        ],
        "lexicalHooks": [
          "그날은",
          "정도였어",
          "그 범위",
          "바로 팔자는 건"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 위임장 질문에는 '그날은 가격 알아보는 정도였어'라며 당시 행동의 범위를 좁혀 실제 선서명 유도를 축소한다."
      }
    ],
    "b": [
      {
        "id": "family09:b:tell:urgency_buffer",
        "appliesWhen": [
          "avoiding",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "매수인",
          "시세",
          "명도",
          "공실"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "돈 얘기가 나오면 '매수인이 빠지기 직전이었다'며 긴급한 시세와 명도 상황을 먼저 길게 늘어놓는다."
      },
      {
        "id": "family09:b:tell:soft_minimizing",
        "appliesWhen": [
          "lying",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "자리만",
          "잠깐",
          "묶어둔",
          "실무상"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "계약 외 보전금과 선수령은 '자리만 잡아둔 돈', '잠깐 묶어둔 거'처럼 실제 의미보다 작게 말한다."
      },
      {
        "id": "family09:b:tell:fieldwork_shield",
        "appliesWhen": [
          "cornered",
          "defensive",
          "face_saving"
        ],
        "lexicalHooks": [
          "몇 번이나",
          "구청",
          "중개사무소",
          "현장"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "궁지에 몰리면 자신이 몇 번이나 매수인과 구청, 중개사무소를 오갔는지 반복해 공모와 개인 사용 책임을 현장 노고로 덮으려 한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "family09:beat:a:d-1:deny",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "전 그 돈을 설계한 사람이 아니에요. 결국 또 도윤이 밖에서 굴린 얘기를 제가 뒤늦게 본 거죠.",
      "behaviorHint": "말 첫머리에 재활비와 병원 동행을 길게 열거하며 시선을 서류에서 떼려 한다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:a:d-1:hedge",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "보전금 얘기가 스치긴 했어도 전 명도비나 수리 정산쯤으로 들었어요. 부모 치료비도 급했으니까요.",
      "behaviorHint": "손가락으로 휴대폰 메모장을 넘기며 말을 길게 늘인다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:a:d-1:partial",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "중개사가 계약서 밖 금액을 꺼냈을 때 제가 세게 끊지 못한 건 맞아요. 하지만 그 판을 더 밀어붙인 건 도윤 쪽이었어요.",
      "behaviorHint": "고개를 한 번 끄덕이며 일부 인정 후 바로 상대를 본다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family09:beat:a:d-1:blame",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "저만 욕먹을 일은 아니죠. 이체 순서도, 부모 앞 설명 문구도 도윤이 중개사랑 더 촘촘히 맞춘 건 사실이잖아요.",
      "behaviorHint": "목소리가 올라가며 손으로 상대를 가리킨다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family09:beat:a:d-1:confession",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "저도 제 몫을 기대했고 부모님께 숨긴 채 갔어요. 돌봄을 한 것과 이건 별개예요.",
      "behaviorHint": "한숨 후 목이 잠기며 마지막 문장을 짧게 끊는다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:a:d-1:evidence_hit",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "…원본 메시지랑 통화까지 있으면 부정할 수 없네요. 네, 3,300만원 얘기까지 들었습니다.",
      "behaviorHint": "입술을 깨물고 시선을 아래로 떨군다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "family09:beat:a:d-2:deny",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그날은 시세만 물어보러 간 거였어요. 정식 위임을 받아 두려던 것처럼 말하면 너무 앞서간 해석입니다.",
      "behaviorHint": "대답 앞에 '그날은'을 반복하며 범위를 좁힌다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:a:d-2:hedge",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "초안을 본 건 맞지만 급한 상황 대비용으로 확인한 정도였어요. 어머니도 대강은 아신다고 생각했고요.",
      "behaviorHint": "말끝을 흐리며 서류 명칭을 정확히 부르지 않는다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:a:d-2:partial",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 '시세만 보는 서류'처럼 좁혀 말한 건 맞습니다. 다만 바로 팔겠다는 최종 동의로 쓰려던 건 아니었어요.",
      "behaviorHint": "짧게 인정한 뒤 손바닥을 펴 보이며 수습하려 한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family09:beat:a:d-2:blame",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "도윤이 또 실무를 독점할까 봐 제가 먼저 움직인 면은 있어요. 그렇다고 부모를 완전히 속이려 한 것까지는 아니었습니다.",
      "behaviorHint": "상대의 과거 채무를 꺼낼 듯 말다 멈춘다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family09:beat:a:d-2:confession",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "결국 제가 설명을 줄여 어머니 서명을 먼저 받아 둔 건 맞아요. 보호자 행세와 통제 욕심이 섞였습니다.",
      "behaviorHint": "어깨가 내려가고 말속도가 눈에 띄게 느려진다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:a:d-2:evidence_hit",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "CCTV 시각과 초안 문구까지 맞으면 더는 돌리기 어렵네요. 네, 가격 문의만 하는 서류는 아니었습니다.",
      "behaviorHint": "물컵을 만지작거리다 내려놓는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "family09:beat:a:d-5:deny",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "세금이랑 명도비 얘기는 실제로 들어갈 수 있는 비용을 설명한 거예요. 일부러 남는 돈을 줄여 보이려던 건 아니었습니다.",
      "behaviorHint": "돌봄 비용 영수증이 있는 듯 손가방을 더듬는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:a:d-5:hedge",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "남는 돈이 적어 보인다고 조금 보수적으로 말한 건 있을 수 있어요. 부모님을 놀라게 하지 않으려던 거죠.",
      "behaviorHint": "목소리를 낮추고 '안심시키려 했다'는 말을 덧붙인다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:a:d-5:partial",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "부모님 앞에서 순매매가 기준으로 먼저 말하자고 저도 동의했습니다. 다만 영영 숨길 생각으로만 간 건 아니었어요.",
      "behaviorHint": "손끝으로 탁자를 두드리며 말을 끊어간다.",
      "applicableStates": [
        "S2",
        "S4"
      ]
    },
    {
      "id": "family09:beat:a:d-5:blame",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "설명 톤을 맞춘 건 둘 다예요. 저는 돌봄 비용을 걱정했고, 도윤은 거래를 빨리 닫으려 했죠.",
      "behaviorHint": "상대 쪽을 잠깐 보고 다시 재판관 쪽으로 시선을 돌린다.",
      "applicableStates": [
        "S3",
        "S4"
      ]
    },
    {
      "id": "family09:beat:a:d-5:confession",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 병원비와 돌봄 얘기를 방패처럼 앞세우며 실제 돈 구조를 흐렸습니다. 그건 공동 축소 설명이 맞아요.",
      "behaviorHint": "한숨을 길게 쉬고 끝 문장에서 목이 잠긴다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:a:d-5:evidence_hit",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "설명 녹취까지 있으면 부모님이 들은 범위가 분명하네요. 네, 세금과 명도비만 강조하면서 보전금은 숨겼습니다.",
      "behaviorHint": "손으로 이마를 짚으며 말을 짧게 인정한다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "family09:beat:b:d-1:deny",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 공모라기보다 명도 조정금 성격이었어요. 숫자부터 굳은 돈처럼 몰아가면 현장 사정을 다 빼버리는 겁니다.",
      "behaviorHint": "시세, 공실, 매수인 일정부터 길게 늘어놓는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:b:d-1:hedge",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "별도 조정금 얘기가 오간 건 맞지만 매수인이 빠질 판이라 현장 대응으로 들은 겁니다. 누나도 그 흐름은 알고 있었고요.",
      "behaviorHint": "손가락으로 날짜를 세며 외부 변수부터 말한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:b:d-1:partial",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "부모 앞에서 순매매가 위주로 말하자는 공감대는 있었습니다. 다만 거래를 안 깨려다 보니 중개사 제안을 받아 적은 겁니다.",
      "behaviorHint": "앞 문장은 인정하고 뒷문장은 빠르게 변명한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family09:beat:b:d-1:blame",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "저만 설계자처럼 들리면 안 됩니다. 누나도 자기 몫을 묻는 메시지를 보냈고, 둘 다 그 돈을 형제 몫으로 봤어요.",
      "behaviorHint": "상대의 캡처 제출을 떠올리듯 짧게 웃는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family09:beat:b:d-1:confession",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "결국 저도 6,600만원을 계약서 밖으로 빼고 3,300만원씩 나누는 데 동의했습니다. 현장 처리라는 말로 제 책임을 줄였습니다.",
      "behaviorHint": "말끝에서 숨을 들이키고 어깨가 처진다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:b:d-1:evidence_hit",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "중개사 원본 스레드랑 이체 지시 메모까지 나오면 버틸 수 없네요. 네, 형제 분배 전제로 움직였습니다.",
      "behaviorHint": "턱을 쓸어내리며 숫자를 더 이상 반복하지 않는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "family09:beat:b:d-3:deny",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "2,400만원은 제 몫을 잠깐 묶어 둔 거였어요. 개인적으로 써버렸다고 단정하면 당시 현장 자금 흐름을 다 무시하는 겁니다.",
      "behaviorHint": "숫자를 먼저 말한 뒤 곧바로 명도 일정과 매수인 압박을 붙인다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:b:d-3:hedge",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제 계좌로 먼저 들어온 건 맞습니다. 카드랑 장비 쪽 결제가 겹친 것도 사실이지만 다시 맞출 생각이었어요.",
      "behaviorHint": "두 손을 모아 '잠깐'이라는 말을 반복한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:b:d-3:partial",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "2,400만원이 제 계좌로 들어왔고 일부를 돌려막은 건 맞아요. 다만 아예 떼먹으려던 건 아니었습니다.",
      "behaviorHint": "짧게 인정한 뒤 즉시 수습 문장을 붙인다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family09:beat:b:d-3:blame",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "누나도 전체 분배 구조는 알았어요. 저만 단독 횡령범처럼 잘린 캡처를 들이민 건 너무 편한 그림 아닙니까.",
      "behaviorHint": "재판관보다 누나 쪽을 먼저 보며 반박한다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family09:beat:b:d-3:confession",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "네, 1,300만원을 제 장비리스 연체와 카드대금에 썼습니다. 빚 많은 아들로 또 찍힐까 봐 더 숨겼습니다.",
      "behaviorHint": "마지막 문장에서 목소리가 작아지고 손이 멈춘다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:b:d-3:evidence_hit",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "계좌 입금내역이랑 리스 상환서가 같은 날로 맞으면 부정할 수 없죠. 제가 개인 채무를 먼저 막은 게 맞습니다.",
      "behaviorHint": "고개를 숙인 채 문장을 짧게 끊는다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "family09:beat:b:d-5:deny",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "수수료랑 명도비 얘기는 거래상 필수 설명이었습니다. 축소라기보다 보수 추정이었어요.",
      "behaviorHint": "명도 일정과 공실 위험을 숫자처럼 읊는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family09:beat:b:d-5:hedge",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "숫자를 세게 잡아 말한 건 맞지만 매수인을 안 놓치려면 불확실성을 크게 볼 수밖에 없었습니다.",
      "behaviorHint": "말을 길게 끌어 핵심 인정 시점을 뒤로 민다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family09:beat:b:d-5:partial",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "부모 앞에서 순매매가 중심으로만 말한 건 사실입니다. 추가 보전금은 뒤에서 정리하면 된다고 가볍게 본 거죠.",
      "behaviorHint": "첫 문장 후 바로 손으로 허공에 도표를 그리듯 설명한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family09:beat:b:d-5:blame",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "설명 톤을 맞춘 건 저 혼자가 아니에요. 누나도 같은 문구로 부모님을 안심시키려 했습니다.",
      "behaviorHint": "말끝을 올리며 반문하듯 끝낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family09:beat:b:d-5:confession",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "현장 처리라고 줄여 말했지만 결국 부모 판단을 흐린 겁니다. 실무 노고를 방패로 삼았습니다.",
      "behaviorHint": "양손을 내려놓고 숨을 한번 깊게 쉰다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family09:beat:b:d-5:evidence_hit",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "공식 브리핑 확인서까지 나오면 부모님이 들은 게 순매매가뿐이었다는 게 분명하네요. 네, 비용 항목으로 보전금을 가렸습니다.",
      "behaviorHint": "잠시 침묵한 뒤 짧게 인정한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6"
    }
  ]
}
