/**
 * Thread R: friend S5 variant 겹침 해소 — 15 key v2~v5 재작성
 */
const fs = require('fs');
const path = require('path');

const REWRITES = {
  // b|d-1|S5 — 연락=경고였다
  "b-d-1-S5-fact_pursuit-v2": "재판관님, 연락 기록만 보면 집착처럼 보입니다. 하지만 저는 경고하려고 전화한 겁니다. 의도가 숨겨진 채 기록만 남았습니다.",
  "b-d-1-S5-fact_pursuit-v3": "재판관님, 먼저 선을 넘은 사람이 따로 있었고, 저는 그걸 제 친구한테 알리려 했습니다. 방법이 틀렸다는 건 압니다.",
  "b-d-1-S5-fact_pursuit-v4": "재판관님, 전화를 여러 번 한 건 사실입니다. 하지만 받지 않으니까 문자까지 보낸 겁니다. 꼬시려는 게 아니라 막으려는 거였습니다.",
  "b-d-1-S5-fact_pursuit-v5": "재판관님, 제가 집착한 게 아닙니다. 경고가 필요한 상황이었고, 직접 나설 수밖에 없었습니다. 그 선택 때문에 지금 여기 서 있습니다.",

  "b-d-1-S5-motive_search-v2": "재판관님, 제 친구가 알기 전에 끝나면 좋겠다고 생각했습니다. 그래서 제가 직접 연락한 겁니다. 좋은 방법은 아니었습니다.",
  "b-d-1-S5-motive_search-v3": "재판관님, 제가 욕먹는 쪽을 택한 겁니다. 제 친구한테 직접 말하면 더 크게 부서질 것 같았습니다.",
  "b-d-1-S5-motive_search-v4": "재판관님, 경고하려는 마음이 먼저였고, 그 과정이 잘못된 건 인정합니다. 연락만 남고 의도는 사라졌습니다.",
  "b-d-1-S5-motive_search-v5": "재판관님, 저는 제 친구를 지키겠다고 나선 건데, 결과적으로 제가 문제 인물이 됐습니다. 그 책임은 피하지 않겠습니다.",

  "b-d-1-S5-empathy_approach-v2": "재판관님, 제 친구를 지키겠다고 한 선택이 저를 더 나쁜 사람으로 만들었습니다. 그래도 그때 아무것도 안 했으면 더 후회했을 겁니다.",
  "b-d-1-S5-empathy_approach-v3": "재판관님, 경고하려고 붙잡은 연락이 저를 집착하는 사람처럼 만들었습니다. 그건 제가 감수한 결과입니다.",
  "b-d-1-S5-empathy_approach-v4": "재판관님, 방법이 틀렸다는 건 압니다. 하지만 가만히 있으면 제 친구가 더 크게 다칠 것 같아서 참을 수 없었습니다.",
  "b-d-1-S5-empathy_approach-v5": "재판관님, 부끄럽고 급했습니다. 그래도 그 연락이 없었으면 제 친구는 결혼 뒤에야 진실을 알았을 겁니다.",

  // b|d-4|S5 — 손절의 진짜 이유
  "b-d-4-S5-fact_pursuit-v2": "재판관님, 예전 손절은 제 변심이 아니었습니다. 제 친구 아버님 쪽 문제가 먼저였고, 저는 그걸 말하지 못해서 악역이 됐습니다.",
  "b-d-4-S5-fact_pursuit-v3": "재판관님, 손절의 원인을 제 변심으로 아시는 건 다릅니다. 진짜 시작은 제 친구 아버님이었습니다.",
  "b-d-4-S5-fact_pursuit-v4": "재판관님, 제가 먼저 떠난 것처럼 보이지만, 사실은 말 못 할 이유가 있어서 밀려난 겁니다.",
  "b-d-4-S5-fact_pursuit-v5": "재판관님, 두 번 다 제가 악역이 됐습니다. 그런데 두 번 다 시작은 제가 아니었습니다.",

  "b-d-4-S5-motive_search-v2": "재판관님, 진실을 말하는 대신 제가 배신한 사람처럼 남는 쪽을 택했습니다. 그 책임은 제가 집니다.",
  "b-d-4-S5-motive_search-v3": "재판관님, 제 친구를 지키려다 그랬습니다. 하지만 변심이 먼저였던 건 아닙니다.",
  "b-d-4-S5-motive_search-v4": "재판관님, 저는 말하면 제 친구가 더 크게 다칠 거라고 생각했습니다. 그래서 혼자 짊어진 겁니다.",
  "b-d-4-S5-motive_search-v5": "재판관님, 그 선택 때문에 예전 손절이 제 변심으로 굳어졌습니다. 진실은 달랐지만 말할 용기가 없었습니다.",

  "b-d-4-S5-empathy_approach-v2": "재판관님, 두 번 다 제가 악역이 된 건 맞습니다. 그게 지금까지 가장 오래 남은 후회입니다.",
  "b-d-4-S5-empathy_approach-v3": "재판관님, 제 친구를 지키겠다는 마음이 결국 제 자리를 없앴습니다. 그래도 다시 돌아가도 같은 선택을 했을 겁니다.",
  "b-d-4-S5-empathy_approach-v4": "재판관님, 예전 손절도 이번 일도 시작은 제가 아니었는데, 끝은 항상 제가 나쁜 사람이었습니다.",
  "b-d-4-S5-empathy_approach-v5": "재판관님, 설명할 용기가 없었습니다. 그래서 제 친구는 지금도 제가 먼저 떠난 걸로 알고 있습니다.",

  // b|d-5|S5 — 명예를 먼저 무너뜨린 건 누구인가
  "b-d-5-S5-fact_pursuit-v2": "재판관님, 한쪽만 탓하고 끝낼 일은 아닙니다. 제 친구가 단톡방에 먼저 퍼뜨린 건 사실이고, 저는 해명을 늦췄습니다.",
  "b-d-5-S5-fact_pursuit-v3": "재판관님, 제 이름이 먼저 무너진 건 제 친구 쪽입니다. 저도 설명을 늦춘 책임은 있습니다.",
  "b-d-5-S5-fact_pursuit-v4": "재판관님, 확인 없이 먼저 퍼뜨린 쪽이 있고, 해명을 늦춘 쪽이 있습니다. 둘 다 기록해야 합니다.",
  "b-d-5-S5-fact_pursuit-v5": "재판관님, 시작이 어디였는지를 봐 주십시오. 저는 또 설명을 늦췄고, 그래서 악역처럼 남았습니다.",

  "b-d-5-S5-motive_search-v2": "재판관님, 제 친구가 무서워서 그렇게 한 건 압니다. 그래도 확인 없이 먼저 퍼뜨린 건 따로 봐야 합니다.",
  "b-d-5-S5-motive_search-v3": "재판관님, 둘 다 기록이 비틀어진 겁니다. 제가 해명을 늦춘 것도 인정합니다.",
  "b-d-5-S5-motive_search-v4": "재판관님, 제 친구의 공포와 제 침묵이 겹쳐서 진실이 뒤집힌 겁니다.",
  "b-d-5-S5-motive_search-v5": "재판관님, 저를 먼저 몰아간 건 사실이고, 저도 해명을 미룬 건 사실입니다. 그 두 가지를 같이 봐 주십시오.",

  "b-d-5-S5-empathy_approach-v2": "재판관님, 저는 또 말을 늦게 해서 제 몫의 책임이 있습니다. 하지만 먼저 무너뜨린 쪽은 저가 아닙니다.",
  "b-d-5-S5-empathy_approach-v3": "재판관님, 그 단톡방에서 먼저 무너진 쪽은 저였습니다. 그 상처는 아직도 남아 있습니다.",
  "b-d-5-S5-empathy_approach-v4": "재판관님, 제 친구가 겁에 질렸다는 건 압니다. 그래도 확인 없이 저를 먼저 몬 건 아픕니다.",
  "b-d-5-S5-empathy_approach-v5": "재판관님, 이번 일이 더 아프게 남는 건, 예전 손절 때랑 같은 구조이기 때문입니다. 또 제가 악역이 됐습니다.",

  // b|h-d2|S5 — 예비신랑이 먼저 선을 넘었다
  "b-h-d2-S5-fact_pursuit-v2": "재판관님, 제가 숨긴 탓에 그림이 뒤집힌 건 맞습니다. 하지만 먼저 선을 넘은 건 그 사람이었습니다.",
  "b-h-d2-S5-fact_pursuit-v3": "재판관님, 저는 계속 거절했습니다. 그런데 숨긴 게 화가 돼서 제가 오히려 가해자처럼 됐습니다.",
  "b-h-d2-S5-fact_pursuit-v4": "재판관님, 시작은 분명 그쪽이었습니다. 저는 거절하고, 경고하고, 그래도 안 되니까 직접 나선 겁니다.",
  "b-h-d2-S5-fact_pursuit-v5": "재판관님, 연락 기록에는 제가 먼저인 것처럼 보이지만, 선을 넘은 순서는 반대입니다.",

  "b-h-d2-S5-motive_search-v2": "재판관님, 수치심과 두려움 때문에 숨겼습니다. 제 친구를 지키겠다는 마음도 있었습니다.",
  "b-h-d2-S5-motive_search-v3": "재판관님, 먼저 선을 넘은 건 그 사람인데, 제가 감당해 보려다 더 꼬인 겁니다.",
  "b-h-d2-S5-motive_search-v4": "재판관님, 저는 혼자 해결하려다 실패했습니다. 그 결과 제가 더 의심받게 됐습니다.",
  "b-h-d2-S5-motive_search-v5": "재판관님, 늦게 말한 건 제 잘못입니다. 하지만 시작부터 제가 원한 일이 아니었습니다.",

  // b|h-d2|S5|empathy_approach — 남은 3건도 확인
  "b-h-d2-S5-empathy_approach-v2": "재판관님, 숨긴 것도, 늦게 말한 것도 제 잘못입니다. 하지만 그 일을 시작한 건 제가 아닙니다.",
  "b-h-d2-S5-empathy_approach-v3": "재판관님, 가장 무서웠던 건 제 친구한테 이 얘기를 꺼내는 순간이었습니다.",
  "b-h-d2-S5-empathy_approach-v4": "재판관님, 제가 먼저 말했으면 이렇게까지 안 왔을 겁니다. 그 용기가 없었습니다.",
  "b-h-d2-S5-empathy_approach-v5": "재판관님, 혼자 견디려다 실패한 겁니다. 그 실패의 대가를 지금 치르고 있습니다.",
};

function applyToFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  let count = 0;
  for (const e of data.channels.interrogation.entries) {
    for (const v of e.variants) {
      if (REWRITES[v.id]) { v.text = REWRITES[v.id]; count++; }
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  ${count}건 교체`);
}

const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'friend-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);
const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'friend-v3-01.json');
if (fs.existsSync(extPath)) { console.log('external:', extPath); applyToFile(extPath); }

// S5 겹침 재검사
console.log('\n=== S5 겹침 재검사 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
let high = 0;
for (const e of fd.channels.interrogation.entries) {
  if (e.lieState !== 'S5') continue;
  const t = e.variants.map(v => v.text);
  for (let i=0;i<t.length;i++) for (let j=i+1;j<t.length;j++) {
    const s1=new Set(t[i].split(/[.!?]\s*/).filter(Boolean));
    const s2=new Set(t[j].split(/[.!?]\s*/).filter(Boolean));
    const ol=[...s1].filter(x=>s2.has(x)).length;
    const pct=Math.max(s1.size,s2.size)>0?Math.round(ol/Math.max(s1.size,s2.size)*100):0;
    if(pct>=55) { high++; console.log('  ' + e.key + ' v' + (i+1) + '/v' + (j+1) + ': ' + pct + '%'); }
  }
}
console.log('55%+: ' + high + (high===0?' ✅':' ⚠️'));
