export const family02TellsBeats = {
  "caseId": "family-02",
  "executableTells": {
    "a": [
      {
        "id": "family02:a:tell:hierarchy_strike",
        "appliesWhen": [
          "cornered",
          "defensive",
          "lying"
        ],
        "lexicalHooks": [
          "내가 이 집을",
          "몇 년을 지켰는데",
          "대표가"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "밀리기 시작하면 '내가 이 집과 공장을 몇 년 지켰는데'라는 식으로 연차와 희생을 앞세워 발언권을 장악한다."
      },
      {
        "id": "family02:a:tell:accusation_loop",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "누가 우리 집을",
          "밖에 팔아먹었냐",
          "같은 말 또 하네"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "의심이 생기면 같은 문장을 어조만 바꿔 세 번쯤 반복해 상대의 말실수를 유도한다."
      },
      {
        "id": "family02:a:tell:public_threat",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame"
        ],
        "lexicalHooks": [
          "친척들 다 있는 데서",
          "다 같이 확인하자",
          "공개적으로"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "감정이 올라오면 '이건 친척들 다 있는 데서 말하자'며 공개 검증을 압박 카드로 꺼낸다."
      }
    ],
    "b": [
      {
        "id": "family02:b:tell:delay_buffer",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 내가 정리해서",
          "맥락부터",
          "순서대로 말할게"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "답을 바로 하지 않고 '그 얘기는 맥락부터 봐야 해'라며 순서를 늦춘다."
      },
      {
        "id": "family02:b:tell:soft_minimizing",
        "appliesWhen": [
          "lying",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "그냥 보여준 거지",
          "정리만",
          "크게 한 건 아니고"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "불리한 공유 행위는 '그냥 보여준 거지'처럼 크기를 줄여 표현한다."
      },
      {
        "id": "family02:b:tell:marriage_shield",
        "appliesWhen": [
          "cornered",
          "hurt",
          "shame",
          "emotional"
        ],
        "lexicalHooks": [
          "가족끼리 그런 말까지",
          "아내 얘기까지",
          "그걸 여기서"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "아내 관련 질문이 나오면 '가족끼리 그런 말까지 해야 해?'라고 관계 자체를 방패로 쓴다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "내가 남의 태블릿까지 뒤질 사람으로 보여요? 누가 우리 집을 밖에 팔아먹었는지 따지는 거지, 내가 그런 짓을 왜 합니까.",
      "behaviorHint": "턱을 치켜들고 먼저 상대의 문제를 크게 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:a:d-3:deny"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "주방 화면에 뭐가 잠깐 떠 있었을 순 있죠. 그런데 그걸 갖고 내가 잠금을 풀고 본 것처럼 몰아가면 말이 달라지잖아요.",
      "behaviorHint": "손바닥을 내보이며 '과장 말라'는 식으로 자른다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:a:d-3:hedge"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "화면은 봤어요, 그건 맞아요. 그런데 그때는 이미 선우가 뭘 넘긴 정황이 보여서 어른으로서 확인한 거예요.",
      "behaviorHint": "시선을 피하지는 않지만 문장 뒤에 정당화를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:a:d-3:partial"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "내가 단톡에 올린 건 집안을 세우려고 한 거지 며느릴 망신주려던 게 아니에요. 판을 이렇게 만든 건 애초에 선우가 자료를 건넨 데서 시작된 거잖아요.",
      "behaviorHint": "검지로 책상을 두드리며 책임의 축을 다시 선우 쪽으로 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:a:d-3:blame"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "그래요, 내가 선을 넘었어요. 불안하다고 남의 기기를 본 것도 잘못이고, 확인 안 된 의심을 친척들 앞에 올린 것도 내 책임입니다.",
      "behaviorHint": "목소리가 잠깐 낮아지며 끝 문장에서 숨이 길게 빠진다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:a:d-3:confession"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "접속 시각이랑 단톡 시간이 그렇게 붙어 있으면 부인만 할 수는 없죠. 그 화면 하나로 집안이 무너지는 것 같아서 내가 먼저 반응한 겁니다.",
      "behaviorHint": "기록을 보는 순간 턱이 굳고, 곧바로 동기를 해명하려 든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3",
      "id": "family02:beat:a:d-3:evidence_hit"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 42초면 충분해요. 아버지가 '공장은 선우가 맡아'라고 했으면 그건 그냥 흘려들을 말이 아니죠.",
      "behaviorHint": "짧은 음성 문구를 손으로 끊어 말하며 확신을 세운다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:a:d-4:deny"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "전체 맥락을 들먹여도 그 한 문장이 사라지진 않잖아요. 대표 자리에 있는 사람이면 그 신호를 가볍게 못 듣습니다.",
      "behaviorHint": "상체를 앞으로 숙이며 '신호'라는 단어에 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:a:d-4:hedge"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "좋아요, 42초 클립만으로 모든 걸 확정할 수는 없죠. 그래도 그 파일만 들으면 단독 승계처럼 들린다는 내 해석이 허공은 아니었어요.",
      "behaviorHint": "양보하는 듯하다가 곧바로 해석의 정당성을 끼워 넣는다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:a:d-4:partial"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "전체 녹취에 다른 말이 붙어 있다 해도, 선우 쪽이 그걸 승계 신호처럼 받아들일 만한 분위기를 만든 건 사실이죠. 내가 과하게 반응한 데는 저쪽 움직임도 있었습니다.",
      "behaviorHint": "입술을 굳게 다문 채 선우를 곁눈질한다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:a:d-4:blame"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "결국 내가 잘린 클립을 너무 크게 붙잡은 건 맞아요. 남편 건강이 흔들리는 와중에 권한이 조용히 넘어가는 것 같아 겁이 났고, 그 공포가 말을 키웠습니다.",
      "behaviorHint": "목이 잠기듯 느려지다가 마지막 문장에서 시선을 내린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:a:d-4:confession"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "전체 녹취에 '지분이랑 상속은 나중'이 박혀 있으면 단독 승계라고 끝까지 밀 수는 없죠. 그래도 왜 내가 그걸 그렇게 받아들였는지는 이해해 주셔야 합니다.",
      "behaviorHint": "자료를 한 번 더 보려다 손을 멈추고 체면을 지키려 문장을 고른다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-6",
      "id": "family02:beat:a:d-4:evidence_hit"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "나는 집안을 수습하려고 물은 거예요. 밖에 비밀을 먼저 깬 건 선우인데, 그걸 나랑 같은 줄로 세우는 건 억지죠.",
      "behaviorHint": "선우를 향해 몸을 틀고 '먼저'라는 말에 힘을 준다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:a:d-5:deny"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "친척들한테 확인 차원으로 말한 걸 외부 유출이랑 똑같이 보면 안 되죠. 그건 집안 어른들 붙잡고 사태를 막아보려던 거였어요.",
      "behaviorHint": "손을 가볍게 젓고 범위를 좁혀 말한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:a:d-5:hedge"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "내 말이 넓어진 건 인정해요. 그래도 시작은 선우가 배우자에게 자료를 준 데서 비롯됐다는 순서는 바뀌지 않습니다.",
      "behaviorHint": "짧게 인정한 뒤 곧장 책임의 순서를 정리한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:a:d-5:partial"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "원칙을 문자 그대로 지켰다고는 못 하겠어요. 하지만 원자료를 넘긴 행위와 의심을 확인하려고 돌린 말은 방식도 무게도 다르다고 봅니다.",
      "behaviorHint": "말끝을 낮추면서도 손가락으로 두 행위를 구분하듯 선을 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:a:d-5:blame"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "결국 우리 둘 다 비밀경계를 무너뜨린 거죠. 나는 지키려는 마음이라고 스스로 포장했지만, 친척 단톡으로 선을 넘은 건 분명합니다.",
      "behaviorHint": "한숨을 길게 내쉰 뒤 처음으로 '우리 둘 다'라는 표현을 쓴다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:a:d-5:confession"
    },
    {
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "단톡 기록이 그대로 남아 있으면 내가 '집안 안에서만'이라고 버티기 어렵죠. 그래도 그날은 공장이 팔리는 줄 알고 겁이 나서 확인부터 하려 했던 겁니다.",
      "behaviorHint": "증거를 본 뒤 고개를 한번 젖히고 감정 이유를 꺼낸다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-3",
      "id": "family02:beat:a:d-5:evidence_hit"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "자료를 밖으로 뿌린 적은 없어요. 민지한테 정식으로 넘긴 것도 아니고, 그냥 상황을 같이 보려던 수준이었습니다.",
      "behaviorHint": "시선을 아래로 떨구고 첫 문장을 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:b:d-1:deny"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그건 파일 전달이라기보다 정리 차원에 가까웠어요. 제가 순서를 좀 늦춘 건 맞는데, 밖에 말하라고 준 건 아니었습니다.",
      "behaviorHint": "말을 시작했다가 '정리 차원'이라는 표현으로 크기를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:b:d-1:hedge"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "42초 클립은 보냈어요. 그런데 맥락 보라고 보낸 거지, 그걸로 외부 유출까지 제가 의도한 건 아닙니다.",
      "behaviorHint": "증거를 확인하고 나서야 사실 한 조각을 내놓는다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:b:d-1:partial"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "클립하고 링크를 민지에게 보낸 건 맞습니다. 그렇다고 제가 밖으로 퍼뜨리라고 한 건 아니고, 어머니 쪽 확산이 더 판을 크게 만들기도 했어요.",
      "behaviorHint": "양손을 모았다 펴며 책임의 일부를 어머니 쪽으로 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:b:d-1:blame"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "배우자라도 예외라고 본 게 제 착각이었습니다. 처음 비공유 원칙을 깬 건 저고, 아내를 지키려다 사실을 더 쪼개 말했습니다.",
      "behaviorHint": "어깨가 내려가고 문장 사이 침묵이 길어진다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:b:d-1:confession"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "클라우드 로그까지 뜨면 그냥 '보여줬다'고만은 못 하죠. 제가 보낸 건 맞지만, 그 순간엔 집안 밖 유출까지 갈 줄은 정말 몰랐습니다.",
      "behaviorHint": "로그 시각을 확인한 뒤 입술을 한번 깨물고 말한다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-2",
      "id": "family02:beat:b:d-1:evidence_hit"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "거래처나 중개업소에 제가 말한 적은 없습니다. 밖에 퍼진 건 저도 뒤늦게 알아서, 누가 그렇게 만든 건지부터 정리해야 해요.",
      "behaviorHint": "답을 시작하며 먼저 '직접 한 적 없다'는 선부터 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:b:d-2:deny"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "소문이 돈 경로는 정확히 모르겠어요. 적어도 제가 직접 보내거나 시킨 건 아니고, 누가 중간에서 과장했을 가능성이 큽니다.",
      "behaviorHint": "문장 앞부분은 단정하고 뒷부분은 흐려 시간을 번다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:b:d-2:hedge"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문의메일 계정은 제 것이 아니에요. 그래서 저는 계속 '직접 보낸 건 아니다'라고 말해 온 겁니다.",
      "behaviorHint": "핵심을 메일 계정 명의 문제로 좁혀 버틴다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:b:d-2:partial"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "민지가 시세를 알아보려고 누구랑 통화한 건 뒤늦게 알았습니다. 하지만 그 단계까지 갈 줄 몰랐고, 저는 그걸 지시한 적도 없습니다.",
      "behaviorHint": "아내 이름을 어렵게 꺼낸 뒤 곧바로 거리 두기를 한다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:b:d-2:blame"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "직접 외부에 닿은 손이 민지 쪽이었다는 건 인정합니다. 그 재료를 넘겨준 출발점이 저였고, 그걸 숨긴 건 두려움 때문이었습니다.",
      "behaviorHint": "말 마지막에서 시선을 들지 못하고 손가락 끝을 만지작거린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:b:d-2:confession"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "노트 초안과 통화기록이 같이 나오면 더는 배우자 쪽 경로를 뺄 수 없겠죠. 제가 처음부터 그 이름을 말 못 한 건 결혼이 같이 깨질까 봐서였습니다.",
      "behaviorHint": "기록을 보고 숨을 삼킨 뒤 한 박자 늦게 배우자 얘기를 꺼낸다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-5",
      "id": "family02:beat:b:d-2:evidence_hit"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "배우자에게 말한 걸 외부 유출이라고 볼 수는 없어요. 가족 문제를 가족끼리 상의한 수준인데, 어머니는 그걸 바로 바깥으로 키우셨잖아요.",
      "behaviorHint": "질문 끝부분을 되받아치듯 말하며 비교 구도를 만든다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family02:beat:b:d-5:deny"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "민지한테는 정리만 부탁한 겁니다. 그래서 저는 아직도 그걸 예외적 상의 정도로 생각하고 있고, 밖으로 퍼뜨릴 의도는 없었습니다.",
      "behaviorHint": "목소리를 낮추며 행위 강도를 계속 축소한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family02:beat:b:d-5:hedge"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공유 폴더 링크를 준 건 맞아요. 그래도 배우자는 예외라고 생각했고, 실제 확산은 친척 단톡이 더 빨랐다고 느꼈습니다.",
      "behaviorHint": "인정과 반박을 같은 호흡으로 섞어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family02:beat:b:d-5:partial"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "결과적으로 제가 예외를 만들었고 어머니는 의심을 확산시켰죠. 둘 다 선을 흐렸지만, 저는 아직도 방식과 파급이 같다고는 못 보겠습니다.",
      "behaviorHint": "어머니 쪽을 잠깐 본 뒤 다시 시선을 거둔다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family02:beat:b:d-5:blame"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "배우자를 예외 취급한 판단은 틀렸습니다. 결혼을 지키려는 쪽으로 규칙을 바꿔 읽었고, 그게 결국 더 큰 불신을 만들었습니다.",
      "behaviorHint": "긴장하던 어깨가 풀리며 목소리의 힘이 조금 빠진다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "id": "family02:beat:b:d-5:confession"
    },
    {
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "공유 시점이 단톡보다 앞이라면 제가 먼저 선을 넘은 거죠. 그래서 어머니 잘못을 말하더라도 제 위반을 이제는 빼고 말할 수 없습니다.",
      "behaviorHint": "타임라인을 확인하며 체념한 듯 고개를 끄덕인다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-2",
      "id": "family02:beat:b:d-5:evidence_hit"
    }
  ]
}
