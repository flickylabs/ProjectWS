const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, 'spouse-02-dossier-card1.json')

const entries = [
  {
    key: 'a|dossier-1.a.q1|early',
    variants: [
      {
        id: 'a|dossier-1.a.q1|early#1',
        text: '나희주 씨, 이 초안은 제가 직접 완성한 문서는 아닙니다. 화면에 떠 있던 문구를 확인한 건 맞지만, 발송본이라고 단정할 단계는 아니었습니다.',
        behaviorHint: '조심스럽게 선을 긋는다.',
      },
      {
        id: 'a|dossier-1.a.q1|early#2',
        text: '제 손이 아예 안 닿았다고는 못 하지만, 저 문장 전체를 제가 단독으로 만든 건 아닙니다. 출력본만으로는 작성자와 전송자를 분리해 봐야 합니다.',
        behaviorHint: '확인 범위와 작성 범위를 나눈다.',
      },
      {
        id: 'a|dossier-1.a.q1|early#3',
        text: '초안 형태로 본 건 맞지만 그걸 바로 제 최종 문서라고 보시면 곤란합니다. 저는 확인과 정리를 했을 뿐, 발송까지 연결된 적은 없습니다.',
        behaviorHint: '최종본과 초안을 구분한다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q1|mid',
    variants: [
      {
        id: 'a|dossier-1.a.q1|mid#1',
        text: '맞습니다. 초안 문구를 제가 정리한 건 사실입니다. 다만 아직 학교로 넘어간 문서는 아니었고, 저는 그 선을 넘기지 않으려 했습니다.',
        behaviorHint: '부분 인정 뒤 경계를 붙인다.',
      },
      {
        id: 'a|dossier-1.a.q1|mid#2',
        text: '제가 손본 초안은 맞습니다. 그러나 작성과 발송은 다릅니다. 그 출력물은 내부 검토용으로만 남겨 둘 생각이었습니다.',
        behaviorHint: '작성과 전송을 분리한다.',
      },
      {
        id: 'a|dossier-1.a.q1|mid#3',
        text: '초안 작성에 제가 관여한 건 인정합니다. 다만 제 의도는 외부 전달이 아니라 내용 확인이었습니다.',
        behaviorHint: '의도와 결과를 나눈다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q1|late',
    variants: [
      {
        id: 'a|dossier-1.a.q1|late#1',
        text: '네, 그 초안은 제가 직접 적었습니다. 다만 그때도 최종 발송이 아니라 정리용 메모라고 생각했고, 그래서 먼저 확인하려 했습니다.',
        behaviorHint: '직접 작성 사실을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q1|late#2',
        text: '제가 쓴 초안입니다. 학교로 보내는 문서가 아니라 제 상황을 정리하는 메모라고 여겼지만, 결과적으로 제가 시작한 일입니다.',
        behaviorHint: '책임의 시작점을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q1|late#3',
        text: '초안은 제 손에서 나왔습니다. 변명하자면 전달본이 아니라 검토본이었지만, 시작한 사람은 저입니다.',
        behaviorHint: '핵심 사실을 짧게 인정한다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q2|early',
    variants: [
      {
        id: 'a|dossier-1.a.q2|early#1',
        text: '익명 글을 본 뒤 바로 상대 계정에 들어간 건 아닙니다. 누가 건드렸는지 확인하려고 기록부터 본 뒤 시간을 보낸 것입니다.',
        behaviorHint: '시간을 벌며 이유를 설명한다.',
      },
      {
        id: 'a|dossier-1.a.q2|early#2',
        text: '익명 글을 보고도 곧바로 달려들지 않았습니다. 공유 노트북의 접속 흔적과 프린터 로그를 먼저 살폈습니다.',
        behaviorHint: '확인 순서를 앞세운다.',
      },
      {
        id: 'a|dossier-1.a.q2|early#3',
        text: '37분은 짧아 보여도 그 사이에 저는 사실 여부를 확인하려 했습니다. 계정 접속은 마지막에 확인된 행동입니다.',
        behaviorHint: '행동의 순서를 조심스럽게 말한다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q2|mid',
    variants: [
      {
        id: 'a|dossier-1.a.q2|mid#1',
        text: '익명 글을 본 뒤 37분 동안 제가 한 일은 확인이었습니다. 공유 노트북에서 메일 접속 흔적을 보고 프린터 로그를 찾아봤습니다.',
        behaviorHint: '기록 확인을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q2|mid#2',
        text: '37분 뒤에 계정을 열어본 건 맞습니다. 그 전에 저는 익명 글과 출력 기록이 같은 선상인지 확인하고 있었습니다.',
        behaviorHint: '지연 이유를 설명한다.',
      },
      {
        id: 'a|dossier-1.a.q2|mid#3',
        text: '제가 37분 만에 계정을 확인한 건 사실입니다. 다만 그건 먼저 확인해야 할 기록이 있어서였습니다.',
        behaviorHint: '부분 인정과 사유를 붙인다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q2|late',
    variants: [
      {
        id: 'a|dossier-1.a.q2|late#1',
        text: '익명 글을 본 뒤 37분 만에 제가 상대 계정을 열어본 건 맞습니다. 프린터 기록과 접속 흔적을 확인하려던 제 판단이었습니다.',
        behaviorHint: '직접 행동을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q2|late#2',
        text: '네, 37분 만에 제가 접속했습니다. 익명 글이 사실인지 확인하고 싶어 기록부터 뒤졌고, 그 다음에야 계정에 들어갔습니다.',
        behaviorHint: '행동의 흐름을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q2|late#3',
        text: '제가 계정을 열어본 시점은 37분 뒤였습니다. 그 사이에 프린터 로그와 메일 흔적을 확인해 본인 쪽인지 판단했습니다.',
        behaviorHint: '기록 확인 후 접속했음을 인정한다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q3|early',
    variants: [
      {
        id: 'a|dossier-1.a.q3|early#1',
        text: '그 문장은 아이를 지키려는 설명의 일부였습니다. 과거 위기를 숨기려던 게 아니라, 지금 상황이 얼마나 불안한지 적으려 했던 것입니다.',
        behaviorHint: '방어적으로 이유를 설명한다.',
      },
      {
        id: 'a|dossier-1.a.q3|early#2',
        text: '별거 위기 문장을 넣은 건 경고를 주려는 뜻이 아니었습니다. 제 불안이 어디서 왔는지 설명하고 싶었습니다.',
        behaviorHint: '의도를 축소해 말한다.',
      },
      {
        id: 'a|dossier-1.a.q3|early#3',
        text: '그 문장은 상대를 겨냥한 무기가 아니라 제 상태를 설명하는 참고였습니다. 그렇다고 해도 민감한 내용이었던 건 압니다.',
        behaviorHint: '민감성은 인정하되 공격성은 부정한다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q3|mid',
    variants: [
      {
        id: 'a|dossier-1.a.q3|mid#1',
        text: '예전 별거 위기 문장을 넣은 건 제 불안과 기준을 설명하려고였습니다. 다만 그 문장이 상대를 압박하는 효과까지 낼 수 있다는 건 알고 있었습니다.',
        behaviorHint: '의도와 파급을 함께 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q3|mid#2',
        text: '그 문장을 넣은 이유는 제 상태를 설명하기 위해서였습니다. 하지만 학교 문서에 들어가면 과거를 무기로 읽힐 수 있다는 점도 알고 있었습니다.',
        behaviorHint: '설명용 문장임을 강조한다.',
      },
      {
        id: 'a|dossier-1.a.q3|mid#3',
        text: '아이를 지키는 맥락을 보여주려 했습니다. 동시에 그 문장이 상대에게 상처가 될 수 있다는 점까지는 제가 감수해야 합니다.',
        behaviorHint: '방어와 책임을 같이 둔다.',
      },
    ],
  },
  {
    key: 'a|dossier-1.a.q3|late',
    variants: [
      {
        id: 'a|dossier-1.a.q3|late#1',
        text: '네, 그 문장은 제가 넣었습니다. 제 불안과 경계를 설명하려는 이유였지만, 결과적으로는 과거를 무기로 쓴 셈입니다.',
        behaviorHint: '직접 책임을 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q3|late#2',
        text: '별거 위기 문장은 제가 넣은 게 맞습니다. 아이를 지키려는 마음이었지만, 그 문장 자체가 상대를 겨냥한 공격으로 읽힐 수 있다는 것도 압니다.',
        behaviorHint: '동기와 결과를 모두 인정한다.',
      },
      {
        id: 'a|dossier-1.a.q3|late#3',
        text: '제가 과거 위기 문장을 끌어온 건 사실입니다. 보호를 말했지만, 학교 문서에서는 결국 무기로 보이게 만들었습니다.',
        behaviorHint: '결과의 왜곡을 인정한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q1|early',
    variants: [
      {
        id: 'b|dossier-1.b.q1|early#1',
        text: '출력물만 보면 이미 전달된 문서처럼 보입니다. 제목도 학교용이고 문구도 너무 정리돼 있어서, 저는 그걸 먼저 발송본으로 읽었습니다.',
        behaviorHint: '겉모양이 준 인상을 말한다.',
      },
      {
        id: 'b|dossier-1.b.q1|early#2',
        text: '초안이라기보다 통보문처럼 보였습니다. 출력 경로와 제목이 딱 학교 제출용처럼 읽혔습니다.',
        behaviorHint: '형식 때문에 오해했음을 말한다.',
      },
      {
        id: 'b|dossier-1.b.q1|early#3',
        text: '제가 실제 발송으로 받아들인 건 문서의 모양 때문입니다. 공유 프린터에서 나온 순간 이미 외부용으로 보였습니다.',
        behaviorHint: '모양과 경로를 근거로 든다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q1|mid',
    variants: [
      {
        id: 'b|dossier-1.b.q1|mid#1',
        text: '공유 프린터에서 뽑힌 데다 제목이 학교 연락용처럼 정리돼 있었습니다. 그래서 초안보다 이미 나간 문서라고 판단했습니다.',
        behaviorHint: '판단 근거를 구체화한다.',
      },
      {
        id: 'b|dossier-1.b.q1|mid#2',
        text: '인쇄물의 형식이 너무 완결돼 있었습니다. 저는 그걸 보고 내부 메모가 아니라 실제 발송본으로 오해했습니다.',
        behaviorHint: '오해의 이유를 설명한다.',
      },
      {
        id: 'b|dossier-1.b.q1|mid#3',
        text: '문서가 학교 쪽 언어로 정리돼 있어서 발송본처럼 보였습니다. 그래서 제가 너무 빨리 기정사실로 받아들였습니다.',
        behaviorHint: '성급한 판단을 인정한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q1|late',
    variants: [
      {
        id: 'b|dossier-1.b.q1|late#1',
        text: '제가 그걸 실제 발송처럼 받아들인 이유는, 문서가 이미 전달본처럼 꾸며져 있었기 때문입니다. 다만 그 상태를 만들어 둔 사람도 결국 저였습니다.',
        behaviorHint: '책임을 되돌린다.',
      },
      {
        id: 'b|dossier-1.b.q1|late#2',
        text: '맞습니다. 제가 발송본처럼 읽었습니다. 제목과 형식이 그렇게 보이게 했고, 그걸 학교가 볼 문서라고 생각했습니다.',
        behaviorHint: '직접 판단을 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q1|late#3',
        text: '문서가 완성형에 가까워 보였고, 저는 그걸 실제 전달본으로 판단했습니다. 결국 제가 먼저 그 흐름에 올라탄 겁니다.',
        behaviorHint: '판단과 선택을 인정한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q2|early',
    variants: [
      {
        id: 'b|dossier-1.b.q2|early#1',
        text: '그때 약속이 있었다는 건 압니다. 하지만 저는 지금 학교에서 벌어질 일을 먼저 봤고, 그래서 상담 기록 문제를 위협 판단에 넣었습니다.',
        behaviorHint: '현재 위험을 먼저 말한다.',
      },
      {
        id: 'b|dossier-1.b.q2|early#2',
        text: '예전 약속을 잊은 건 아닙니다. 다만 그 순간에는 아이 쪽 위험이 더 커 보였고, 그래서 그 기록을 현재 기준으로 다시 봤습니다.',
        behaviorHint: '약속보다 위험을 앞세운다.',
      },
      {
        id: 'b|dossier-1.b.q2|early#3',
        text: '2023년 약속은 기억했습니다. 그래도 지금 당장의 학교 반응이 더 무서워서 상담 기록을 경계 대상으로 끌어왔습니다.',
        behaviorHint: '불안을 전면에 둔다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q2|mid',
    variants: [
      {
        id: 'b|dossier-1.b.q2|mid#1',
        text: '2023년 약속을 기억하면서도 제가 그 문제를 다시 꺼낸 건, 지금의 위협이 더 실제적이라 느꼈기 때문입니다.',
        behaviorHint: '판단의 근거를 밝힌다.',
      },
      {
        id: 'b|dossier-1.b.q2|mid#2',
        text: '약속보다 현재 상황을 우선한 겁니다. 상담 기록이 다시 퍼질 수 있다고 판단해서 위협으로 받아들였습니다.',
        behaviorHint: '우선순위 변경을 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q2|mid#3',
        text: '그때의 약속과 지금의 위험을 동시에 봤습니다. 그런데 제 판단은 결국 위험을 크게 잡는 쪽으로 기울었습니다.',
        behaviorHint: '갈등 속 판단을 설명한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q2|late',
    variants: [
      {
        id: 'b|dossier-1.b.q2|late#1',
        text: '네, 약속이 있었는데도 저는 상담 기록을 현재 위협으로 끌어왔습니다. 아이를 지킨다는 명분이었지만, 결과적으로는 과거를 무기처럼 다룬 셈입니다.',
        behaviorHint: '무기화 사실을 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q2|late#2',
        text: '제가 그 기록을 다시 꺼낸 건 맞습니다. 2023년 약속보다 지금의 공포를 앞세웠고, 그 선택이 선을 넘겼습니다.',
        behaviorHint: '공포를 앞세웠음을 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q2|late#3',
        text: '기억하고도 끌어온 것이 맞습니다. 지금 위험을 막겠다는 생각이었지만, 결국 과거를 현재 협박처럼 써 버렸습니다.',
        behaviorHint: '행위의 성격을 분명히 한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q3|early',
    variants: [
      {
        id: 'b|dossier-1.b.q3|early#1',
        text: '그 말을 이어간 이유는 약속 파기라고까지는 생각하지 않았기 때문입니다. 저는 보호라고 믿었고, 그래서 멈추지 않았습니다.',
        behaviorHint: '자기방어적으로 설명한다.',
      },
      {
        id: 'b|dossier-1.b.q3|early#2',
        text: '알고도 말을 이어간 건 아닙니다. 저는 그 순간만큼은 아이를 위한 경고라고 판단했습니다.',
        behaviorHint: '의도를 보호로 돌린다.',
      },
      {
        id: 'b|dossier-1.b.q3|early#3',
        text: '약속을 어긴다는 감각이 없었던 건 아닙니다. 그래도 저는 먼저 막아야 할 위험이 있다고 봤습니다.',
        behaviorHint: '위험을 우선했다고 말한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q3|mid',
    variants: [
      {
        id: 'b|dossier-1.b.q3|mid#1',
        text: '그게 약속을 건드린다는 건 알고 있었습니다. 그래도 제가 보기엔 아이 쪽 위험이 더 커서 말을 멈추지 못했습니다.',
        behaviorHint: '갈등을 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q3|mid#2',
        text: '약속 파기라는 판단을 알면서도, 저는 먼저 보호가 필요하다고 생각했습니다. 그 경계에서 이미 제가 흔들렸습니다.',
        behaviorHint: '경계에서 흔들렸음을 말한다.',
      },
      {
        id: 'b|dossier-1.b.q3|mid#3',
        text: '알고도 이어간 건 맞습니다. 다만 제 머릿속에서는 침묵보다 경고가 먼저였습니다.',
        behaviorHint: '선택의 순서를 설명한다.',
      },
    ],
  },
  {
    key: 'b|dossier-1.b.q3|late',
    variants: [
      {
        id: 'b|dossier-1.b.q3|late#1',
        text: '네, 알고도 이어갔습니다. 약속을 깨는 말이라는 걸 알면서도, 저는 아이를 내세워 그 선을 넘어섰습니다.',
        behaviorHint: '직접 파기를 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q3|late#2',
        text: '제가 그 순간 약속 파기를 인식하면서도 말을 멈추지 않은 건 사실입니다. 보호를 핑계로 과거를 꺼냈습니다.',
        behaviorHint: '명분과 실책을 함께 인정한다.',
      },
      {
        id: 'b|dossier-1.b.q3|late#3',
        text: '맞습니다. 약속을 어긴다는 걸 알면서도 계속 말했습니다. 그건 보호가 아니라 무기화였습니다.',
        behaviorHint: '행위 성격을 단정적으로 인정한다.',
      },
    ],
  },
]

fs.writeFileSync(outPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
console.log(`wrote ${outPath}`)
