export const workplace05TellsBeats = {
  "caseId": "workplace-05",
  "executableTells": {
    "a": [
      {
        "id": "workplace-05:a:tell:asset_reframe",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "팀 자산화된 안건",
          "소유권보다 실행"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "개인 아이디어 출처 질문이 들어오면 안건을 먼저 팀 자산으로 재정의해 소유권 논의를 흐린다."
      },
      {
        "id": "workplace-05:a:tell:source_ladder",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "기획-정리-발표는 다릅니다",
          "책임 층위가 다릅니다"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "기획, 정리, 발표를 서로 다른 층위로 잘게 나눠 자신이 져야 할 책임 범위를 축소한다."
      },
      {
        "id": "workplace-05:a:tell:pronoun_smoothing",
        "appliesWhen": [
          "avoiding",
          "lying",
          "cornered"
        ],
        "lexicalHooks": [
          "우리가 정리한 문구",
          "그쪽에서 가져온 표현"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "every_turn",
        "originalPattern": "주어를 흐리는 복수 표현을 반복해 직접 지시와 인지 시점을 희미하게 만든다."
      }
    ],
    "b": [
      {
        "id": "workplace-05:b:tell:hurt_claim_loop",
        "appliesWhen": [
          "lying",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "저는 이미 두 번 뺏겼어요",
          "또 지워진 거예요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "사실 질문 앞에 피해 경험을 반복해 검증 순서를 늦추고 감정의 무게를 먼저 올린다."
      },
      {
        "id": "workplace-05:b:tell:ownership_shrink",
        "appliesWhen": [
          "cornered",
          "lying",
          "avoiding"
        ],
        "lexicalHooks": [
          "참고한 거예요",
          "가져온 건 아니에요"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "참고와 가져오기를 엄격히 갈라 말하며 원출처 활용 범위를 최소화한다."
      },
      {
        "id": "workplace-05:b:tell:ally_name_drop",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "배수진 씨도",
          "정민호 씨도"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "멘토와 운영 담당 이름을 연달아 꺼내 자신이 혼자가 아니라는 분위기를 만든다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-05:beat:a:d-1:deny",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "첫째, 그건 팀 자산화된 안건이고 소유권보다 실행이 우선이었습니다. 기획-정리-발표는 다릅니다. 제가 문가은 씨 공동기획 표기를 지운 적은 없습니다.",
      "behaviorHint": "서류를 한 장 넘기며 시선을 재판관에게만 고정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-1:hedge",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "저는 그걸 팀 자산화된 안건이긴 합니다만, '책임 층위가 다릅니다'라는 쪽으로 봅니다. 우리가 정리한 문구와 최종 발표 문구를 같은 소유권으로 보긴 어렵습니다.",
      "behaviorHint": "손끝으로 책상 모서리를 두드리며 문장을 짧게 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-1:partial",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "문가은 씨 초안이 일부 들어간 건 맞습니다. 다만 저는 '기획-정리-발표는 다릅니다'라고 봤고, 소유권보다 실행을 보며 우리가 정리한 문구라고 판단했습니다.",
      "behaviorHint": "짧게 고개를 끄덕인 뒤 곧바로 기준 설명으로 넘어간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-1:blame",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 공동기획 표기를 뺀 건 맞습니다. 다만 책임 층위가 다르고, 문가은 씨 쪽도 그쪽에서 가져온 표현을 순수 창작처럼 밀었으며 저는 팀 자산화된 안건, 기획-정리-발표는 다릅니다라는 기준으로 정리한 겁니다.",
      "behaviorHint": "입술을 한 번 굳게 다문 뒤 상대를 보지 않고 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-1:confession",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 공동기획 표기를 삭제했습니다. 팀 자산화된 안건, 기획-정리-발표는 다릅니다, 우리가 정리한 문구라는 말로 버틴 건 제 잘못입니다. 문가은 씨 기여를 가린 제 책임입니다.",
      "behaviorHint": "안경을 벗어 내려놓고 한 박자 늦게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-1:evidence_hit",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "혁신브리핑 킥오프 회의록과 초안 슬라이드 버전 이력까지 나오면 부정할 수 없습니다. 제가 팀 자산화된 안건이라고 말해도, 우리가 정리한 문구라는 설명만으로는 기획-정리-발표는 다릅니다라는 제 선을 지킬 수 없습니다.",
      "behaviorHint": "버전 로그를 보는 순간 말끝이 잠시 멈춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-05:beat:a:d-4:deny",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "첫째, 그 메모는 팀 자산화된 안건의 리스크를 본 것이고 소유권보다 실행 문제였습니다. 기획-정리-발표는 다릅니다. 제가 문가은 씨 평판을 훼손한 적은 없습니다.",
      "behaviorHint": "메모의 표현만 짚으며 목소리를 더 낮춘다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-4:hedge",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "제가 출처 리스크를 적긴 했습니다만, 책임 층위가 다릅니다. 우리가 정리한 문구에 붙은 리스크를 본 것이고, 기획-정리-발표는 다릅니다.",
      "behaviorHint": "문장 끝마다 숨을 짧게 끊어 방어선을 세운다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-4:partial",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "비공개 메모를 제가 넣은 건 맞습니다. 다만 소유권보다 실행 리스크를 보려 했고, 기획-정리-발표는 다릅니다라는 전제에서 우리가 정리한 문구의 출처 문제를 적은 겁니다.",
      "behaviorHint": "메모 입력 시점을 인정하면서도 목적 설명을 빠르게 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-4:blame",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 먼저 적어 넣은 건 맞습니다. 다만 문가은 씨 쪽도 그쪽에서 가져온 표현을 순수 창작처럼 밀었고, 저는 '기획-정리-발표는 다릅니다', '책임 층위가 다릅니다'라는 식으로 나눠 본 겁니다.",
      "behaviorHint": "자책하는 표정을 잠깐 보이다가 곧 상대 책임을 덧댄다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-4:confession",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 HR 메모를 먼저 넣고 발표 순서 판단에 영향을 줬습니다. 팀 자산화된 안건이라고 버티고, 소유권보다 실행이라며 우리가 정리한 문구로 축소한 건 제 잘못입니다. 문가은 씨 평판에 개입한 제 책임입니다.",
      "behaviorHint": "어깨를 낮추고 메모 입력 사실을 또렷하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-4:evidence_hit",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "HR 승진심사 메모와 발표 순서 변경 기록까지 나오면 부정할 수 없습니다. 제가 기획-정리-발표는 다릅니다, 우리가 정리한 문구의 리스크였다고 해도, 팀 자산화된 안건 관리라는 말만으로는 설명이 안 됩니다.",
      "behaviorHint": "HR 로그를 확인한 뒤 턱을 만지며 시선을 피한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-05:beat:a:d-5:deny",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "첫째, 그때도 팀 자산화된 안건 정리였고 소유권보다 실행을 본 겁니다. 기획-정리-발표는 다릅니다. 제가 배수진 씨 이름을 덮은 적은 없습니다.",
      "behaviorHint": "과거 메일의 표현을 추상화해 현재와 분리하려 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-5:hedge",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "외부 이름을 바로 넣지 않은 건 맞지만, 저는 팀 자산화된 안건 차원에서 '책임 층위가 다릅니다'라고 봤습니다. 우리가 정리한 문구를 내부 공유로 돌린 수준이지 은폐라고 볼 일은 아닙니다.",
      "behaviorHint": "‘은폐’라는 단어에서만 미세하게 발음을 세게 준다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-5:partial",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 '내부 공유만'이라고 답한 건 맞습니다. 다만 팀 자산화된 안건으로 보고, 기획-정리-발표는 다릅니다라는 선에서 소유권보다 실행을 택했습니다.",
      "behaviorHint": "이메일 문구를 인정하되 판단 프레임을 즉시 덧씌운다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-5:blame",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "공식 기록에서 배수진 씨 이름이 흐려진 건 맞습니다. 다만 문가은 씨 쪽도 그쪽에서 가져온 표현을 알고 있었고, 저는 '책임 층위가 다릅니다'라고 봤습니다. 그래서 우리가 정리한 문구로 같이 넘긴 부분이 있습니다.",
      "behaviorHint": "손바닥을 펴 보이며 책임을 넓게 분산시키려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-5:confession",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 배수진 씨 이름을 공식 기록 밖으로 밀었습니다. 팀 자산화된 안건, 책임 층위가 다릅니다, 우리가 정리한 문구라는 말로 넘긴 건 제 잘못입니다. 이번 반복을 만든 제 책임입니다.",
      "behaviorHint": "오래된 메일 제목을 읊조리듯 읽고 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:a:d-5:evidence_hit",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "과거 출처 누락 정리 이메일 체인까지 나오면 부정할 수 없습니다. 제가 우리가 정리한 문구라는 표현과 팀 자산화된 안건이라는 설명을 남겼고, 책임 층위가 다릅니다라는 제 선도 무너집니다.",
      "behaviorHint": "과거 스레드 제목을 보는 순간 손이 멈춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-05:beat:b:d-2:deny",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 이미 두 번 뺏겼어요, 또 지워진 거예요. 그래서 겁이 컸던 거지 퍼간 적은 없어요. 정민호 씨도 제가 그 폴더를 돌렸다고 단정하긴 어려울 거예요.",
      "behaviorHint": "입술을 깨물고 재판관을 보다가 마지막 문장에서 시선을 올린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-2:hedge",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "저는 이미 두 번 뺏겼어요. 확인만 한 거예요, 가져온 건 아니에요, 또 지워진 거예요. 오상혁 씨가 먼저 몰아붙이니까 그렇게 본 거예요.",
      "behaviorHint": "손으로 목을 한번 쓸어내리며 억울함을 앞세운다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-2:partial",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "폴더를 내려받은 건 맞아요. 다만 저는 이미 두 번 뺏겼고 또 지워진 거예요라고 느껴서 확인하려 한 거예요, 가져온 건 아니에요, 정민호 씨도 정식 창구가 늦었다는 건 아실 거예요.",
      "behaviorHint": "인정 직후 곧바로 사정 설명으로 이어 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-2:blame",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "멘토방에 링크를 보낸 것도 맞아요. 다만 오상혁 씨 쪽도 저를 또 지워진 거예요라는 자리로 몰았고, 저는 이미 두 번 뺏겼어요라서 버틴 거예요; 정민호 씨도 그 압박은 아실 거예요.",
      "behaviorHint": "눈가가 붉어지지만 끝내 울지 않으려 고개를 든다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-2:confession",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 폴더를 내려받고 사적 채널에 퍼뜨렸어요. 저는 이미 두 번 뺏겼어요, 또 지워진 거예요라고 버티며 정민호 씨도 알아줄 거라고 기대한 건 제 잘못이에요. 제 책임이에요.",
      "behaviorHint": "양손을 모은 채 빠르게 인정하고 숨을 고른다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-2:evidence_hit",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "승진위원회 준비 폴더 다운로드 로그와 DLP 전송 기록까지 나오면 부정할 수 없어요. 저는 이미 두 번 뺏겼어요, 또 지워진 거예요라고 해도, 정민호 씨도 볼 수 있는 다운로드 시간과 전송 기록 앞에서는 버틸 수 없어요.",
      "behaviorHint": "로그 시각을 보는 순간 목소리가 한 톤 낮아진다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "workplace-05:beat:b:d-3:deny",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 이미 두 번 뺏겼어요, 또 지워진 거예요. 고객회복 랩은 제가 만든 거고, 참고한 거예요 같은 말로 줄일 일이 아니에요. 제가 남의 걸 가져온 건 아니에요.",
      "behaviorHint": "가슴 앞에 손을 모으고 말끝을 단단히 닫는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-3:hedge",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "저는 이미 두 번 뺏겼어요. 참고한 거예요, 가져온 건 아니에요, 또 지워진 거예요라는 마음으로 지금 안을 만든 거예요.",
      "behaviorHint": "고개를 작게 흔들며 ‘아니에요’를 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-3:partial",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "예전 자료를 본 건 맞아요. 다만 저는 참고한 거예요, 가져온 건 아니에요라고 믿었고, 배수진 씨도 당시 문장을 그대로 쓰진 않았다는 건 아실 거예요.",
      "behaviorHint": "자료 이용은 인정하지만 손바닥을 펴 경계를 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-3:blame",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "핵심 구조가 예전 안에서 온 건 맞아요. 다만 오상혁 씨 쪽도 그걸 알면서 썼고, 저는 참고한 거예요와 가져온 건 아니에요 사이를 저만의 거짓으로 몰 순 없어요; 배수진 씨도 그 경계는 아실 거예요.",
      "behaviorHint": "숨을 들이킨 뒤 상대를 한 번 보고 다시 재판관 쪽으로 돌아선다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-3:confession",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 순수 창작이라고 밀었어요. 참고한 거예요, 가져온 건 아니에요라고 버티고 배수진 씨도 제 현재 기여는 봐줄 거라고 기대한 건 제 잘못이에요. 원출처를 지운 제 책임이에요.",
      "behaviorHint": "어깨가 내려가며 말 끝에 힘이 빠진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-3:evidence_hit",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "2년 전 파일럿 제안서 보류본까지 나오면 더는 부정할 수 없어요. 참고한 거예요, 가져온 건 아니에요라고 말해도, 배수진 씨도 확인할 수 있는 문구 겹침 앞에서는 제가 또 지워진 거예요만으로 못 버텨요.",
      "behaviorHint": "보류안의 문장을 읽다 중간에 숨을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-05:beat:b:d-5:deny",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 이미 두 번 뺏겼어요, 또 지워진 거예요. 2년 전 일과 이번 일을 같은 반복이라고 보는 건 아니에요; 배수진 씨도 그렇게 단순하게 보진 않을 거예요. 저는 같은 방식을 되풀이한 사람은 아니에요.",
      "behaviorHint": "단호하게 부인하다가 마지막에 목이 살짝 잠긴다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-5:hedge",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "그때 조용히 있었던 건 맞지만, 참고한 거예요 수준이지 가져온 건 아니에요. 저는 이미 두 번 뺏겼어요라서 숨은 거예요.",
      "behaviorHint": "양손을 꼭 쥐며 스스로를 변명하듯 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-5:partial",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그때 배수진 씨 이름을 끝까지 못 올린 건 맞아요. 다만 저는 이미 두 번 뺏겼어요라는 공포가 있었고, 또 지워진 거예요가 될까 봐 조용히 있었어요; 배수진 씨도 그 침묵을 보셨을 거예요.",
      "behaviorHint": "시선을 떨군 채 인정 문장을 힘겹게 꺼낸다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-5:blame",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "이번에도 원출처를 먼저 안 꺼낸 건 맞아요. 다만 오상혁 씨 쪽도 같은 방식을 알고 있었고, 저는 이미 두 번 뺏겼어요라서 버틴 거예요; 배수진 씨도 또 지워진 거예요가 혼자 만든 침묵은 아니라는 걸 아실 거예요.",
      "behaviorHint": "한숨을 내쉰 뒤 억울함을 눌러 담듯 속도를 늦춘다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-5:confession",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 과거에 덮인 방식에 기대 다시 원출처를 숨겼어요. 저는 이미 두 번 뺏겼어요, 또 지워진 거예요라고 스스로를 설득하고 배수진 씨도 넘어가실 거라 본 건 제 잘못이에요. 반복의 제 책임이에요.",
      "behaviorHint": "손등으로 눈가를 눌렀다가 그대로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-05:beat:b:d-5:evidence_hit",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "과거 출처 누락 정리 이메일 체인까지 나오면 부정할 수 없어요. 배수진 씨도 보낸 흐름이 남아 있고, 저는 이미 두 번 뺏겼어요와 또 지워진 거예요라는 말만으로는 이번 반복을 숨길 수 없어요.",
      "behaviorHint": "이메일 발신 순서를 보며 입술을 깨문다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

