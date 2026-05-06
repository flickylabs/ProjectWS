import type { LocaleCode } from '../locales'

export type HomeMessageKey =
  "home.gameTitle"
  | "home.tagline"
  | "pc.home.moreCases"
  | "pc.home.countdown.ready"
  | "pc.home.countdown.minutesSeconds"
  | "pc.home.countdown.seconds"
  | "pc.resolutionConfirm.rollback"
  | "pc.home.intro.skip"
  | "pc.home.intro.previous"
  | "pc.home.intro.next"
  | "pc.home.intro.enterLobby"
  | "pc.home.intro.slide.digitalCourt.title"
  | "pc.home.intro.slide.digitalCourt.body"
  | "pc.home.intro.slide.conflict.title"
  | "pc.home.intro.slide.conflict.body"
  | "pc.home.intro.slide.interrogation.title"
  | "pc.home.intro.slide.interrogation.body"
  | "pc.home.intro.slide.ready.title"
  | "pc.home.intro.slide.ready.body"

export const homeMessages = {
  ko: {
    "home.gameTitle": "솔로몬의 딜레마: 진실의 재판",
    "home.tagline": "현대판 재판관이 되어 진실의 결을 가려내세요.",
    "pc.home.moreCases": "외 {count}건",
    "pc.home.countdown.ready": "곧 충전",
    "pc.home.countdown.minutesSeconds": "{minutes}분 {seconds}초",
    "pc.home.countdown.seconds": "{seconds}초",
    "pc.resolutionConfirm.rollback": "{seconds}초 후 이전 해상도로 돌아갑니다.",
    "pc.home.intro.skip": "건너뛰기",
    "pc.home.intro.previous": "이전",
    "pc.home.intro.next": "다음",
    "pc.home.intro.enterLobby": "로비 입장",
    "pc.home.intro.slide.digitalCourt.title": "현대판 솔로몬이 되어 갈등을 해결해주세요.",
    "pc.home.intro.slide.digitalCourt.body": "질문, 증거, 판단을 연결하며 서로 다른 진실을 가려내는 모의 재판 게임입니다.",
    "pc.home.intro.slide.conflict.title": "옳고 그름 보다 어긋난 진실에 집중하세요.",
    "pc.home.intro.slide.conflict.body": "감정과 기록, 침묵과 변명, 계산과 오해가 서로 다른 얼굴을 드러냅니다.",
    "pc.home.intro.slide.interrogation.title": "질문하고, 증거를 제시하고, 흐름에 집중해주세요.",
    "pc.home.intro.slide.interrogation.body": "중요한 것은 정보의 양이 아니라, 파편화 된 단서의 연결입니다.",
    "pc.home.intro.slide.ready.title": "첫 사건이 당신을 기다리고 있습니다!",
    "pc.home.intro.slide.ready.body": "원하는 사건을 선택하여 지금 바로 재판을 시작할 수 있습니다.",
  },
  en: {
    "home.gameTitle": "Verdict Zero: Trial of Truth",
    "home.tagline": "Take the bench and weigh every claim against the truth.",
    "pc.home.moreCases": "+{count} more",
    "pc.home.countdown.ready": "Ready soon",
    "pc.home.countdown.minutesSeconds": "{minutes}m {seconds}s",
    "pc.home.countdown.seconds": "{seconds}s",
    "pc.resolutionConfirm.rollback": "Reverting to the previous resolution in {seconds}s.",
    "pc.home.intro.skip": "Skip",
    "pc.home.intro.previous": "Previous",
    "pc.home.intro.next": "Next",
    "pc.home.intro.enterLobby": "Enter Lobby",
    "pc.home.intro.slide.digitalCourt.title": "Step onto the bench and untangle every dispute yourself.",
    "pc.home.intro.slide.digitalCourt.body": "A mock-trial deduction game where questions, evidence, and judgment converge on the truth.",
    "pc.home.intro.slide.conflict.title": "Focus on the truths that don't match, not on right or wrong.",
    "pc.home.intro.slide.conflict.body": "Feeling, records, silence, excuses, calculation, and misunderstanding all wear different faces.",
    "pc.home.intro.slide.interrogation.title": "Ask, present evidence, and stay with the flow of the trial.",
    "pc.home.intro.slide.interrogation.body": "What matters is not the volume of information but how the fragments connect.",
    "pc.home.intro.slide.ready.title": "Your first case is waiting.",
    "pc.home.intro.slide.ready.body": "Pick a case to begin the trial.",
  },
  ja: {
    "home.gameTitle": "ソロモンのジレンマ：真実の裁き",
    "home.tagline": "現代の裁判官となり、証言の奥にある真相を見極めましょう。",
    "pc.home.moreCases": "ほか {count}件",
    "pc.home.countdown.ready": "まもなく回復",
    "pc.home.countdown.minutesSeconds": "{minutes}分{seconds}秒",
    "pc.home.countdown.seconds": "{seconds}秒",
    "pc.resolutionConfirm.rollback": "{seconds}秒後に元の解像度へ戻ります。",
    "pc.home.intro.skip": "スキップ",
    "pc.home.intro.previous": "前へ",
    "pc.home.intro.next": "次へ",
    "pc.home.intro.enterLobby": "ロビーへ",
    "pc.home.intro.slide.digitalCourt.title": "現代のソロモンとなり、争いを解きほぐしましょう。",
    "pc.home.intro.slide.digitalCourt.body": "問い、証拠、判断をつなぎ、食い違う真実を見極める模擬裁判ゲームです。",
    "pc.home.intro.slide.conflict.title": "正しさよりも、食い違う真実に目を向けましょう。",
    "pc.home.intro.slide.conflict.body": "感情と記録、沈黙と言い訳、計算と誤解が、それぞれ別の顔を見せます。",
    "pc.home.intro.slide.interrogation.title": "問い、証拠を示し、流れを見極めましょう。",
    "pc.home.intro.slide.interrogation.body": "重要なのは情報の量ではなく、断片化した手がかりのつながりです。",
    "pc.home.intro.slide.ready.title": "最初の事件があなたを待っています。",
    "pc.home.intro.slide.ready.body": "事件を選べば、すぐに裁判を始められます。",
  },
  "zh-CN": {
    "home.gameTitle": "真相裁决：零点审判",
    "home.tagline": "化身现代裁判官，辨明证词背后的真相。",
    "pc.home.moreCases": "另 {count} 件",
    "pc.home.countdown.ready": "即将补充",
    "pc.home.countdown.minutesSeconds": "{minutes}分{seconds}秒",
    "pc.home.countdown.seconds": "{seconds}秒",
    "pc.resolutionConfirm.rollback": "{seconds}秒后将恢复到之前的分辨率。",
    "pc.home.intro.skip": "跳过",
    "pc.home.intro.previous": "上一步",
    "pc.home.intro.next": "下一步",
    "pc.home.intro.enterLobby": "进入大厅",
    "pc.home.intro.slide.digitalCourt.title": "走上审判席，亲手解开每一场冲突。",
    "pc.home.intro.slide.digitalCourt.body": "这是一款将讯问、证据与判断连接起来，辨明不同真相的模拟法庭游戏。",
    "pc.home.intro.slide.conflict.title": "请关注错位的真相，而不只是对错。",
    "pc.home.intro.slide.conflict.body": "情感与记录、沉默与辩解、计算与误会，会展现出不同面孔。",
    "pc.home.intro.slide.interrogation.title": "发问、出示证据，并把握审理的走向。",
    "pc.home.intro.slide.interrogation.body": "重要的不是信息数量，而是碎片线索之间的连接。",
    "pc.home.intro.slide.ready.title": "第一个案件正在等待你。",
    "pc.home.intro.slide.ready.body": "选择想要的案件，即可立即开始审判。",
  },
} as const satisfies Record<LocaleCode, Record<HomeMessageKey, string>>
