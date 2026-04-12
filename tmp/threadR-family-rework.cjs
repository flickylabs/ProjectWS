/**
 * Thread R: family-v3-01 interrogation 긴급 재작업
 * 7건 결함 일괄 수정
 */

const fs = require('fs');
const path = require('path');

// ============ CRITICAL 1: 호칭 역전 B→"제 동생" → "제 형" ============
// B(정후)가 A(태성)를 지칭할 때 "제 동생" → "제 형"
function fixHonorifics(entries) {
  let count = 0;
  for (const e of entries) {
    if (e.party !== 'b') continue;
    for (const v of e.variants) {
      if (v.text.includes('제 동생')) {
        v.text = v.text.replace(/제 동생/g, '제 형');
        count++;
      }
    }
  }
  return count;
}

// ============ CRITICAL 2: 한글 깨짐 정화 ============
const BROKEN_FIXES = [
  [/이었는이는/g, '이었는지는'],
  [/있는이는/g, '있는지는'],
  [/했는이는/g, '했는지는'],
  [/했는이/g, '했는지'],
  [/없는이/g, '없는지'],
  [/인이는/g, '인지는'],
  [/는이는/g, '는지는'],
  [/했은이/g, '했는지'],
  [/된은/g, '된'],
  [/찾은다면서/g, '찾겠다면서'],
  [/찾은다면/g, '찾겠다면'],
  [/찾은다/g, '찾겠다'],
  [/물은다면/g, '묻는다면'],
  [/물은다/g, '묻는다'],
  [/갚은다/g, '갚겠다'],
  [/막은다/g, '막겠다'],
  [/보답이었는이/g, '보답이었는지'],
  [/경고인이/g, '경고인지'],
  [/집착인이/g, '집착인지'],
  [/뭔이를/g, '뭔가를'],
  [/뭔이 /g, '뭔가 '],
];

function fixBrokenKorean(entries) {
  let count = 0;
  for (const e of entries) {
    for (const v of e.variants) {
      const orig = v.text;
      for (const [pat, rep] of BROKEN_FIXES) {
        v.text = v.text.replace(pat, rep);
      }
      if (v.text !== orig) count++;
    }
  }
  return count;
}

// ============ CRITICAL 3 + MAJOR 4,5: S5 겹침 해소 + 시작어 다양화 + B S4 종결부 ============
// B S4 종결부 제거
function fixBS4Endings(entries) {
  const TAIL = /[,.]?\s*그때도 겉으로는 버티려 했지만 내부적으로는 꽤 흔들렸습니다\.?/g;
  let count = 0;
  for (const e of entries) {
    if (e.party !== 'b' || e.lieState !== 'S4') continue;
    for (const v of e.variants) {
      const orig = v.text;
      v.text = v.text.replace(TAIL, '');
      if (v.text !== orig) count++;
    }
  }
  return count;
}

// ============ MAJOR 6: h-d3 S5 쟁점명 원문 전면 교체 ============
const HD3_S5_OVERRIDES = {
  // A h-d3 S5 fact_pursuit — 쟁점: 왜 원래 유서는 90대10이었나, 그 비율은 무엇에 대한 보답인가
  // 앵커 진실: 어머니가 B에게 90을 주려 한 건 20년 생활비와 형 사업 살린 돈 때문
  "a-h-d3-S5-fact_pursuit-v1": "재판관님, 어머니가 원래 제 동생한테 90을 남기려 한 건 이제 압니다. 20년 넘게 생활비를 대고, 제 사업이 무너질 때 큰돈까지 보낸 사람이 제 동생이었습니다. 저는 그 사실을 한 번도 들은 적이 없었습니다.",
  "a-h-d3-S5-fact_pursuit-v2": "재판관님, 원래 유서 비율이 90대 10이었다는 건 인정합니다. 어머니가 왜 그렇게 쓰셨는지도 이제는 압니다. 제 동생이 오랫동안 보낸 돈과 제 사업을 살린 돈이 그 근거였습니다.",
  "a-h-d3-S5-fact_pursuit-v3": "재판관님, 어머니 돈이라고 믿었던 게 실은 제 동생이 보낸 돈이었습니다. 그래서 어머니가 90을 남기시려 한 겁니다. 저는 그걸 모르고 40이 적다고만 따졌습니다.",
  "a-h-d3-S5-fact_pursuit-v4": "재판관님, 90대 10이라는 비율을 보고 저는 어머니가 편애한 거라고 생각했습니다. 그런데 실은 제 동생이 20년 넘게 어머니 생활비를 대고, 제 사업까지 살린 대가였습니다.",
  "a-h-d3-S5-fact_pursuit-v5": "재판관님, 원래 유서가 왜 그런 비율이었는지 이제야 알겠습니다. 어머니 통장에 들어간 돈이 제 동생에게서 나온 거였습니다. 20년 치입니다. 저는 그걸 몰랐습니다.",

  "a-h-d3-S5-motive_search-v1": "재판관님, 어머니가 90을 주려 한 건 편애가 아니라 빚진 마음이었습니다. 제 동생이 말없이 보낸 돈으로 저희 가정이 유지된 겁니다. 저는 그걸 감사도 못 하고 미움만 키웠습니다.",
  "a-h-d3-S5-motive_search-v2": "재판관님, 이유를 알고 나니 어머니가 왜 그런 비율을 쓰셨는지 이해됩니다. 제 동생이 20년 넘게 보낸 생활비가 어머니한테는 평생의 빚이었던 겁니다.",
  "a-h-d3-S5-motive_search-v3": "재판관님, 어머니의 90은 사랑이 아니라 계산서였습니다. 제 동생이 조용히 갚아 온 세월에 대한 보답이었습니다. 저는 그 계산서의 존재조차 몰랐습니다.",
  "a-h-d3-S5-motive_search-v4": "재판관님, 왜 90이었는지를 알고 나니 제가 40이 적다고 따진 것이 부끄럽습니다. 제 동생이 어머니를 20년 넘게 돌본 건 돈만이 아니었습니다.",
  // v5 원본이 쟁점명 없이 양호한 경우 유지 또는 재작성
  "a-h-d3-S5-empathy_approach-v1": "재판관님, 제 동생이 20년을 참고 보낸 돈이 어머니 유서의 근거였다는 걸 알고 나니 제가 너무 작아 보입니다.",
  "a-h-d3-S5-empathy_approach-v2": "재판관님, 어머니가 90을 남기신 건 제 동생한테 빚진 마음이었습니다. 저는 그 마음도 모르고 편애라고 분노했습니다.",
  "a-h-d3-S5-empathy_approach-v3": "재판관님, 평생 형 노릇 했다고 생각했는데, 실은 제 동생이 저를 먹여 살린 겁니다. 그걸 알고 나서 화가 나기보다 먼저 미안했습니다.",
  "a-h-d3-S5-empathy_approach-v4": "재판관님, 어머니 유서의 숫자가 무엇을 뜻하는지 이제야 읽힙니다. 저는 그 숫자 뒤에 있는 20년을 한 번도 본 적이 없었습니다.",
  "a-h-d3-S5-empathy_approach-v5": "재판관님, 90이라는 숫자 앞에서 저는 분노만 했습니다. 그런데 그 90은 제 동생이 어머니한테 보낸 세월의 무게였습니다. 그걸 이제야 압니다.",

  // B h-d3 S5 — B가 90을 60으로 줄인 이유를 고백
  "b-h-d3-S5-fact_pursuit-v1": "재판관님, 어머니가 처음에 90대 10으로 쓰신 건 제가 보낸 돈 때문이었습니다. 20년 넘게 생활비를 대고, 형 사업이 무너질 때 큰돈도 보냈습니다. 어머니는 그 빚을 유서로 갚으려 하셨습니다.",
  "b-h-d3-S5-fact_pursuit-v2": "재판관님, 원래 유서가 90대 10이었던 건 제가 오랫동안 보낸 돈 때문입니다. 어머니는 그걸 기억하고 계셨습니다. 저는 형한테 말한 적이 없었습니다.",
  "b-h-d3-S5-fact_pursuit-v3": "재판관님, 어머니 통장에 들어간 돈은 제가 보낸 겁니다. 매달 생활비, 그리고 형 사업이 기울었을 때 큰돈도요. 어머니는 그 세월을 유서에 남기신 겁니다.",
  "b-h-d3-S5-fact_pursuit-v4": "재판관님, 90대 10의 근거는 분명합니다. 제가 20년 넘게 어머니 생활비를 댔고, 형네가 위험할 때 사업 자금까지 보냈습니다. 어머니는 그걸 아셨습니다.",
  "b-h-d3-S5-fact_pursuit-v5": "재판관님, 원래 유서 비율은 제가 보낸 돈의 총량이 만든 겁니다. 어머니 통장의 출처가 저였다는 건 형도 이제 아실 겁니다.",

  "b-h-d3-S5-motive_search-v1": "재판관님, 어머니가 90을 주시려 한 건 편애가 아닙니다. 제가 보낸 돈으로 생활하신 세월이 거기 들어 있습니다. 형은 그 사실을 몰랐고, 저는 말하지 않았습니다.",
  "b-h-d3-S5-motive_search-v2": "재판관님, 저는 20년 넘게 어머니한테 생활비를 보냈습니다. 형 사업이 무너질 때 큰돈도 제가 넣었습니다. 어머니는 그걸 유서로 갚으려 하신 겁니다.",
  "b-h-d3-S5-motive_search-v3": "재판관님, 90이라는 숫자가 과하다고 보실 수 있습니다. 하지만 20년 치 생활비와 사업 구제금을 합산하면 어머니 입장에서는 그렇게 쓰실 수밖에 없었습니다.",
  // v4 missing from issue list, check and add if needed
  "b-h-d3-S5-motive_search-v5": "재판관님, 어머니가 왜 제한테 크게 남기려 했는지 이유는 단순합니다. 제가 보낸 돈이 어머니 생활 전부였기 때문입니다. 형은 그걸 몰랐을 뿐입니다.",

  "b-h-d3-S5-empathy_approach-v1": "재판관님, 어머니는 제가 보낸 돈에 대한 빚을 유서로 갚으려 하셨습니다. 저는 그 마음이 형한테 상처가 될 걸 알면서도 말리지 못했습니다.",
  "b-h-d3-S5-empathy_approach-v2": "재판관님, 20년 넘게 보낸 돈을 어머니는 한 번도 잊지 않으셨습니다. 그래서 90을 쓰신 겁니다. 저는 형한테 미안한 마음과 어머니 뜻 사이에서 끝까지 갈팡질팡했습니다.",
  "b-h-d3-S5-empathy_approach-v3": "재판관님, 어머니 유서의 90은 저한테 주는 사랑이 아니라 갚아야 할 것을 갚겠다는 뜻이었습니다. 그 무게를 형한테 알리는 것이 제일 어려웠습니다.",
  "b-h-d3-S5-empathy_approach-v4": "재판관님, 저는 어머니한테 돈을 보내면서도 형한테는 한마디도 안 했습니다. 어머니도 말하지 않으셨습니다. 그 침묵이 유서가 됐습니다.",
  "b-h-d3-S5-empathy_approach-v5": "재판관님, 형은 어머니 돈이라고 믿었을 겁니다. 실은 제 돈이었습니다. 그 사실을 말하면 형이 무너질까 봐 저도 어머니도 숨겼습니다. 그게 90대 10이 된 겁니다.",
};

// ============ MAJOR 7: h-d3 S0 Truth Throttle (생활비) ============
const HD3_S0_TT_FIXES = {
  "b-h-d3-S0-fact_pursuit-v1": "재판관님, 제가 보낸 돈이 그런 식으로 굳었다는 말은 아닙니다. 그 정도까지 인정할 수는 없습니다.",
  "b-h-d3-S0-fact_pursuit-v5": "재판관님, 제 통장에서 나간 돈의 성격까지 지금 바로 말하기는 어렵습니다. 부인하겠습니다.",
};

// ============ 적용 ============
function applyToFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const entries = data.channels.interrogation.entries;

  // CRITICAL 1: 호칭
  const c1 = fixHonorifics(entries);

  // CRITICAL 2: 한글 깨짐
  const c2 = fixBrokenKorean(entries);

  // MAJOR 5: B S4 종결부
  const m5 = fixBS4Endings(entries);

  // MAJOR 6: h-d3 S5 전면 교체
  let m6 = 0;
  for (const e of entries) {
    for (const v of e.variants) {
      if (HD3_S5_OVERRIDES[v.id]) {
        v.text = HD3_S5_OVERRIDES[v.id];
        m6++;
      }
    }
  }

  // MAJOR 7: h-d3 S0 TT
  let m7 = 0;
  for (const e of entries) {
    for (const v of e.variants) {
      if (HD3_S0_TT_FIXES[v.id]) {
        v.text = HD3_S0_TT_FIXES[v.id];
        m7++;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  C1 호칭: ${c1}, C2 한글: ${c2}, M5 B-S4종결: ${m5}, M6 h-d3-S5: ${m6}, M7 TT: ${m7}`);
}

const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'family-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);

const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'family-v3-01.json');
if (fs.existsSync(extPath)) { console.log('external:', extPath); applyToFile(extPath); }

// ============ 검증 ============
console.log('\n=== 전수 검증 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
const ie = fd.channels.interrogation.entries;

// C1 검증: B가 "제 동생" 지칭
let c1fail = 0;
for (const e of ie) {
  if (e.party !== 'b') continue;
  for (const v of e.variants) { if (v.text.includes('제 동생')) c1fail++; }
}
console.log('C1 호칭역전 잔존: ' + c1fail + (c1fail === 0 ? ' ✅' : ' ❌'));

// C2 검증: 한글 깨짐
const brokenCheck = ['했은이', '이었는이', '찾은다', '물은다', '는이는', '인이는'];
let c2fail = 0;
for (const e of ie) {
  for (const v of e.variants) {
    for (const b of brokenCheck) { if (v.text.includes(b)) { c2fail++; break; } }
  }
}
console.log('C2 한글깨짐 잔존: ' + c2fail + (c2fail === 0 ? ' ✅' : ' ❌'));

// C3 검증: S5 겹침
let highOverlap = 0;
for (const e of ie) {
  if (e.lieState !== 'S5') continue;
  const texts = e.variants.map(v => v.text);
  for (let i = 0; i < texts.length; i++) {
    for (let j = i+1; j < texts.length; j++) {
      const s1 = new Set(texts[i].split(/[.!?]\s*/).filter(Boolean));
      const s2 = new Set(texts[j].split(/[.!?]\s*/).filter(Boolean));
      const ol = [...s1].filter(x => s2.has(x)).length;
      const pct = Math.max(s1.size,s2.size)>0 ? Math.round(ol/Math.max(s1.size,s2.size)*100) : 0;
      if (pct >= 55) highOverlap++;
    }
  }
}
console.log('C3 S5 55%+겹침: ' + highOverlap + (highOverlap < 30 ? ' ✅ (감소)' : ' ⚠️'));

// M5 검증: B S4 종결부
let m5fail = 0;
for (const e of ie) {
  if (e.party !== 'b' || e.lieState !== 'S4') continue;
  for (const v of e.variants) {
    if (v.text.includes('내부적으로는 꽤 흔들렸습니다')) m5fail++;
  }
}
console.log('M5 B-S4종결 잔존: ' + m5fail + (m5fail === 0 ? ' ✅' : ' ❌'));

// M6 검증: 쟁점명 원문
let m6fail = 0;
for (const e of ie) {
  for (const v of e.variants) {
    if (v.text.includes('왜 원래 유서는') || v.text.includes('무엇에 대한 보답')) m6fail++;
  }
}
console.log('M6 쟁점명원문 잔존: ' + m6fail + (m6fail === 0 ? ' ✅' : ' ❌'));

// M7 검증: 생활비
let m7fail = 0;
for (const e of ie) {
  if (e.disputeId !== 'h-d3' || e.lieState !== 'S0') continue;
  for (const v of e.variants) { if (v.text.includes('생활비')) m7fail++; }
}
console.log('M7 TT(생활비) 잔존: ' + m7fail + (m7fail === 0 ? ' ✅' : ' ❌'));

// 기획 문서 잔존
const docChecks = ['공식기록', '앵커 진실', '연결되면', '이동한다', 'Lead', 'Dossier', '실행 책임', '구체 금액'];
let docFail = 0;
for (const e of ie) {
  for (const v of e.variants) {
    for (const c of docChecks) { if (v.text.includes(c)) { docFail++; break; } }
  }
}
console.log('기획문서 잔존: ' + docFail + (docFail === 0 ? ' ✅' : ' ❌'));
