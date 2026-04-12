# friend-01 interrogation 개선 검증

- source file: `friend-01-scriptedtext-current.json`
- output file: `friend-01-scriptedtext-improved-step2-interrogation.json`

## 검증 결과
- interrogation entries: 180
- interrogation variants: 900
- behaviorHint changed: 900
- text changed: 0
- structure issues: 0
- hint length range: 38 ~ 60
- hint average length: 50.07

## sample before/after

### a|d-1|S0|fact_pursuit
- text: 손절한 제 전 친구가 제 예비신랑에게 9일 동안 연락했습니다. 저는 그 자체가 선 넘은 일이라고 봅니다.
- before: 핵심 사실을 바로 못 박으며 이미 결론이 난 사람처럼 말한다.
- after: 예전 상처를 현재에 덧씌우며 상대를 먼저 죄인처럼 세운다. 턱만 더 높아진다.

### b|d-1|S3|fact_pursuit
- text: 꼬시려는 게 아니라 경고하려고 연락했습니다.
- before: 짧게 핵심만 말한다. 감정보다 선 긋기가 먼저다.
- after: 숨겨 두던 목적을 꺼내며 이제는 거짓말보다 설명이 더 아픈 단계에 들어선다. 눈빛이 잠깐 흔들린다.

### a|d-3|S4|empathy_approach
- text: 아버지가 이러시는 게 창피하다는 생각이 먼저 듭니다. 딸로서 어떻게 해야 할지 모르겠습니다.
- before: 수치심이 앞서며 딸로서의 자리가 흔들린다.
- after: 숨기던 가족의 패턴을 꺼내며 두려움과 부끄러움이 같이 목을 죈다. 떨린 숨이 먼저 샌다.

### b|d-4|S5|fact_pursuit
- text: 차라리 제가 돈 때문에 변한 사람처럼 보이는 게 낫다고 생각했습니다.
- before: 자기희생의 결론을 담담하게 고백한다. 비장하게 꾸미지 않고 이미 오래 감수한 일처럼 말한다.
- after: 자기 손해까지 말하게 되자 보호와 침묵이 남긴 상처를 받아들인다. 목소리가 아주 낮아진다.

### a|d-5|S5|motive_search
- text: 예전에도 확인 안 하고 끊었고, 이번에도 확인 안 하고 매도했습니다. 제가 반복한 겁니다.
- before: 자기 결함의 패턴을 언어화한다. 사건 하나가 아니라 습관의 문제로 보고 고백한다.
- after: 자기가 만든 상처를 마주하며 상대를 몰아세운 이유가 자기 두려움이었음을 인정한다. 시선이 천천히 떨어진다.
