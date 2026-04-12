/**
 * Thread R: family S5 variant 겹침 해소
 * 12 key의 v2~v5를 고유 표현으로 재작성
 * v1은 유지 (가장 완성도 높은 기준본)
 */
const fs = require('fs');
const path = require('path');

const REWRITES = {
  // d-1 S5 fact_pursuit: 어머니 방문을 조종으로 단정한 걸 인정
  "a-d-1-S5-fact_pursuit-v2": "재판관님, 방문 기록만 보고 조종이라고 결론 낸 건 제가 빨랐습니다. 어머니가 무슨 마음으로 응하셨는지는 끝까지 듣지 못했습니다.",
  "a-d-1-S5-fact_pursuit-v3": "재판관님, 요양원 발걸음이 많다고 해서 곧 압박이라고 읽은 건 제 잘못이었습니다. 어머니 뜻이 거기에 있었을 수도 있다는 걸 이제야 봅니다.",
  "a-d-1-S5-fact_pursuit-v4": "재판관님, 어머니 곁에 누가 자주 있었느냐만 따졌지, 그 자리에서 무슨 일이 오갔는지는 확인하지 않았습니다. 그게 가장 큰 실수였습니다.",
  "a-d-1-S5-fact_pursuit-v5": "재판관님, 정황만으로 단정한 건 인정합니다. 어머니 마지막 몇 달을 놓친 사람이 저였기에 더 날카로웠습니다.",

  // d-1 S5 motive_search: 동생 동기를 탐욕으로만 몰았음
  "a-d-1-S5-motive_search-v2": "재판관님, 제 동생을 좋게 볼 마음이 없었으니 다른 이유를 볼 눈도 닫혀 있었습니다. 그 편견이 모든 판단을 한쪽으로 끌었습니다.",
  "a-d-1-S5-motive_search-v3": "재판관님, 저를 빼고 움직인 선택이 끝까지 자극했습니다. 하지만 그 자극에 제 오래된 미움이 깔려 있었다는 건 이제 인정합니다.",
  "a-d-1-S5-motive_search-v4": "재판관님, 제 동생이 어머니 곁에서 뭘 했든 저는 처음부터 나쁜 쪽으로만 읽었습니다. 그 시선 자체가 문제였습니다.",
  "a-d-1-S5-motive_search-v5": "재판관님, 평생 쌓인 미움이 그 몇 달의 의미까지 한쪽으로 몰아갔습니다. 동기를 열어 보려는 시도를 한 번도 안 한 건 저입니다.",

  // d-1 S5 empathy_approach: 어머니 잃는 두려움 vs 자리 뺏기는 두려움
  "a-d-1-S5-empathy_approach-v2": "재판관님, 어머니를 잃는 무서움과 밀려나는 무서움을 구분하지 못했습니다. 그래서 제 동생 행동을 전부 같은 색으로 칠했습니다.",
  "a-d-1-S5-empathy_approach-v3": "재판관님, 정작 무서웠던 건 어머니 마음이 아니라 거기서 밀려난 제 자리였는지도 모릅니다.",
  "a-d-1-S5-empathy_approach-v4": "재판관님, 제가 어머니를 걱정한 건 사실이지만, 그 안에 제 자리를 지키려는 욕심이 같이 있었습니다. 그걸 이제야 봅니다.",
  "a-d-1-S5-empathy_approach-v5": "재판관님, 어머니를 잃는 슬픔 속에 제 몫을 잃는 분노가 섞여 있었습니다. 그 두 가지를 구분 못 한 게 제일 큰 잘못입니다.",

  // d-2 S5 fact_pursuit: 60대40이 90대10에서 낮아진 것
  "a-d-2-S5-fact_pursuit-v2": "재판관님, 증액이 아니라 감액 조작이었다는 건 인정합니다. 그래도 유서를 손댄 사실 자체는 남습니다.",
  "a-d-2-S5-fact_pursuit-v3": "재판관님, 90에서 60으로 낮춘 거라는 건 이제 압니다. 하지만 어머니 뜻을 바꾼 손이 제 동생이었다는 건 변하지 않습니다.",
  "a-d-2-S5-fact_pursuit-v4": "재판관님, 더 가지려고 고친 게 아니라는 건 들었습니다. 그래도 유서에 손댄 행위 자체가 가벼워지진 않습니다.",
  "a-d-2-S5-fact_pursuit-v5": "재판관님, 비율의 방향이 제가 생각한 것과 반대였다는 건 충격이었습니다. 하지만 어머니 문서를 고친 건 사실이고, 그 무게는 남습니다.",

  // d-2 S5 motive_search: 동생이 돈만 챙기려 한 건 아닐 수 있음
  "a-d-2-S5-motive_search-v2": "재판관님, 이유가 무엇이든 어머니 뜻을 자기 판단으로 고친 건 용납이 안 됩니다.",
  "a-d-2-S5-motive_search-v3": "재판관님, 숫자보다 제 동생이 혼자 결정한 태도가 더 견디기 어렵습니다.",
  "a-d-2-S5-motive_search-v4": "재판관님, 선의였다고 해도 어머니 마지막 뜻을 자기 판단으로 바꿀 권리는 없었습니다. 그 부분은 양보할 수 없습니다.",
  "a-d-2-S5-motive_search-v5": "재판관님, 제 동생이 저를 위해 낮췄다는 말을 듣고도 쉽게 풀리지 않습니다. 어머니 뜻을 대신 정한 건 누가 봐도 월권입니다.",

  // d-2 S5 empathy_approach: 돈이 아니라 상실과 모욕
  "a-d-2-S5-empathy_approach-v2": "재판관님, 60대 40을 처음 봤을 때 느낀 건 상실감과 모욕이었습니다. 돈의 크기가 아니라 제 삶이 남 손에서 정리된 것 같았습니다.",
  "a-d-2-S5-empathy_approach-v3": "재판관님, 어머니 뜻보다 제 삶이 남 손에서 정리된 것 같아서 버티기 어려웠습니다.",
  "a-d-2-S5-empathy_approach-v4": "재판관님, 비율이 문제가 아닙니다. 제가 모르는 사이에 제 몫이 정해졌다는 사실이 모욕이었습니다.",
  "a-d-2-S5-empathy_approach-v5": "재판관님, 유서의 숫자보다 그 숫자를 저 없이 정한 과정이 더 아팠습니다. 이 일이 돈만의 문제는 아니라는 걸 이제야 압니다.",

  // d-5 S5 fact_pursuit: 미움으로 정황을 한쪽으로 묶음
  "a-d-5-S5-fact_pursuit-v2": "재판관님, 어머니를 이용한 사람을 찾겠다면서도 어머니가 실제로 누구에게 무엇을 바랐는지는 제대로 못 봤습니다.",
  "a-d-5-S5-fact_pursuit-v3": "재판관님, 억울했던 건 사실이지만 그 억울함이 판단을 흐린 것도 맞습니다. 정황을 전부 한 방향으로 몰았습니다.",
  "a-d-5-S5-fact_pursuit-v4": "재판관님, 어머니가 진짜 원하신 게 뭔지 듣기보다, 제 동생을 범인으로 세우는 데 더 힘을 쏟았습니다.",
  "a-d-5-S5-fact_pursuit-v5": "재판관님, 제 미움이 증거 읽는 눈까지 가렸습니다. 같은 정황도 제 동생한테 불리하게만 해석했습니다.",

  // d-5 S5 motive_search: 내 동기도 깨끗하지 않았다
  "a-d-5-S5-motive_search-v2": "재판관님, 어머니를 위해 따진다고 하면서 제 자리와 체면을 지키려는 마음이 같이 있었습니다.",
  "a-d-5-S5-motive_search-v3": "재판관님, 제 동생 동기를 끝까지 나쁜 쪽으로만 몰았습니다. 제 미움이 판단을 대신한 겁니다.",
  "a-d-5-S5-motive_search-v4": "재판관님, 제 동기도 깨끗하지 않았다는 걸 인정합니다. 어머니를 지킨다는 말 뒤에 제 몫을 지키려는 계산이 있었습니다.",
  "a-d-5-S5-motive_search-v5": "재판관님, 저는 어머니를 위한다면서도 결국 제 자리를 먼저 봤습니다. 그래서 제 동생의 다른 이유를 한 번도 열어 보지 않았습니다.",

  // d-5 S5 empathy_approach: 미움에 갇혀 있었다
  "a-d-5-S5-empathy_approach-v2": "재판관님, 어머니를 둘러싼 모든 일을 제 미움이 설명해 줄 거라고 착각했습니다.",
  "a-d-5-S5-empathy_approach-v3": "재판관님, 정작 저는 어머니를 잃은 슬픔보다 밀려난 제 자리를 더 두려워했습니다.",
  "a-d-5-S5-empathy_approach-v4": "재판관님, 미움에 갇혀 있으면 상대 행동이 전부 공격으로 보입니다. 저는 그 안에 오래 있었습니다.",
  "a-d-5-S5-empathy_approach-v5": "재판관님, 제 동생을 미워한 세월이 어머니 마지막까지 물들였습니다. 그 미움 없이 봤으면 다르게 읽혔을 장면들이 있었습니다.",

  // h-d4 S5 fact_pursuit: 60대40 뒤에 출생 비밀
  "a-h-d4-S5-fact_pursuit-v2": "재판관님, 유서 비율 뒤에 더 큰 문제가 걸려 있었다는 건 이제 알겠습니다. 하지만 그 사실이 제 삶 전체를 뒤늦게 뒤집은 방식은 받아들이기 어렵습니다.",
  "a-h-d4-S5-fact_pursuit-v3": "재판관님, 유서만 다투는 줄 알았는데 알고 보니 제 존재 자체가 흔들리는 문제였습니다.",
  "a-h-d4-S5-fact_pursuit-v4": "재판관님, 비밀의 이름보다 그 사실이 제 삶을 뒤늦게 뒤집은 방식이 더 아픕니다.",
  "a-h-d4-S5-fact_pursuit-v5": "재판관님, 60대 40 뒤에 제가 모르던 진실이 있었다는 건 인정합니다. 하지만 그 진실을 제 동의 없이 관리한 건 또 다른 문제입니다.",

  // h-d4 S5 motive_search: 90대10을 봤으면 끝까지 파고들었을 것
  "a-h-d4-S5-motive_search-v2": "재판관님, 90대 10을 봤으면 끝까지 파고들었을 거라는 말은 부정 못 합니다. 그 과정에서 감당 못 할 비밀이 나왔을 수도 있습니다.",
  "a-h-d4-S5-motive_search-v3": "재판관님, 그걸 막겠다고 제 삶의 방향을 남이 먼저 정한 건 용납하기 어렵습니다.",
  "a-h-d4-S5-motive_search-v4": "재판관님, 비밀을 지키려 했다는 건 이해합니다. 하지만 그 보호가 제 동의 없이 제 삶을 건드린 겁니다.",
  "a-h-d4-S5-motive_search-v5": "재판관님, 제가 끝까지 팠을 거라는 건 맞습니다. 그래도 그걸 막을 권리까지 제 동생한테 있었다고는 못 합니다.",

  // h-d4 S5 empathy_approach: 출생 비밀보다 삶이 흔들리는 감각
  "a-h-d4-S5-empathy_approach-v2": "재판관님, 어머니 유서가 아니라 제 자리가 재판대에 오른 것 같아서 숨이 막혔습니다.",
  "a-h-d4-S5-empathy_approach-v3": "재판관님, 끝까지 버티고 소리치면서도 속으로는 이미 무너지고 있었습니다.",
  "a-h-d4-S5-empathy_approach-v4": "재판관님, 유서 싸움인 줄 알았는데 결국 제가 누구인지를 묻는 자리가 됐습니다. 그게 제일 무서웠습니다.",
  "a-h-d4-S5-empathy_approach-v5": "재판관님, 비밀이라는 말 자체보다 그 비밀이 제 삶 전체를 뒤집을 수 있다는 감각이 더 두렵습니다.",
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

const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'family-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);
const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'family-v3-01.json');
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
console.log('55%+: ' + high + (high<10?' ✅':' ⚠️'));
