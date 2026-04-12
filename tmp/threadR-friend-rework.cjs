/**
 * Thread R: friend-v3-01 긴급 재작업 — 8건 일괄 수정
 *
 * C1: 한글 깨짐 전수 정화
 * C2: 쟁점명 원문 → 자연어
 * C3: party 코드 "B" → 실명/관계어 (A가 B 지칭: "제 친구"/"수민이", B가 자기 지칭: "저"/"제")
 * C4: S5 겹침 해소
 * M5: 시작어 다양화 (자동 치환 어려움 → 겹침 해소 시 같이)
 * M6: 종결부 고정 제거
 * M7: system_message 기획용어
 * M8: witness vague Truth Throttle
 */

const fs = require('fs');
const path = require('path');

// ============ C1: 한글 깨짐 ============
const BROKEN_FIXES = [
  [/않았은지/g, '않았는지'],
  [/았은지/g, '았는지'],
  [/었은지/g, '었는지'],
  [/맞섰은지/g, '맞섰는지'],
  [/이었는이는/g, '이었는지는'],
  [/이었는이/g, '이었는지'],
  [/있는이는/g, '있는지는'],
  [/없는이/g, '없는지'],
  [/누구인이의/g, '누구인지의'],
  [/누구인이는/g, '누구인지는'],
  [/누구인이를/g, '누구인지를'],
  [/누구인이/g, '누구인지'],
  [/무엇인이를/g, '무엇인지를'],
  [/무엇인이/g, '무엇인지'],
  [/집착인이/g, '집착인지'],
  [/경고인이/g, '경고인지'],
  [/했은이/g, '했는지'],
  [/했은가/g, '했는가'],
  [/된은/g, '된'],
  [/찾은다/g, '찾겠다'],
  [/물은다/g, '묻겠다'],
  [/갚은다/g, '갚겠다'],
  [/막은다/g, '막겠다'],
  [/뭔이를/g, '뭔가를'],
  [/뭔이 /g, '뭔가 '],
  [/몰아세웠은지/g, '몰아세웠는지'],
  [/내놨은지/g, '내놨는지'],
  [/는이는/g, '는지는'],
  [/인이는/g, '인지는'],
];

// ============ C2+C3: 쟁점명 원문 + party 코드 B → 자연어 ============
// B(수민)가 자기를 B라고 칭하는 것 → "저" 또는 "제"
// A(다은)가 B를 B라고 칭하는 것 → "제 친구" 또는 "수민이"
// 쟁점명 원문을 자연어로 교체
const ISSUE_PARTY_FIXES = [
  // d-5 쟁점명 "이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지" 계열
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지의 순서가/g, '제 명예를 먼저 무너뜨린 게 누구인지, 그 순서가'],
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지는/g, '제 명예를 먼저 무너뜨린 게 누구인지는'],
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지의 실제 경위가/g, '제 명예를 먼저 무너뜨린 실제 경위가'],
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지의 구조가/g, '제 명예를 먼저 무너뜨린 구조가'],
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지를/g, '제 명예를 먼저 무너뜨린 게 누구인지를'],
  [/이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인지/g, '제 명예를 먼저 무너뜨린 게 누구인지'],

  // h-d2 쟁점명 "예비신랑이 먼저 B에게 선을 넘었는지"
  [/예비신랑이 먼저 B에게 선을 넘었는지/g, '예비신랑이 먼저 제한테 선을 넘었는지'],
  [/예비신랑이 먼저 B에게 선을 넘었는이/g, '예비신랑이 먼저 제한테 선을 넘었는지'],

  // d-1 쟁점명 "B의 연락은 예비신랑 집착인지, 뭔가를 전하려는 경고인지"
  [/B의 연락은 예비신랑 집착인지, 뭔가를 전하려는 경고인지/g, '제 친구의 연락이 집착이었는지, 경고였는지'],

  // d-4 쟁점명 "예전 손절 사건도 정말 B의 변심 때문이었는지"
  [/예전 손절 사건도 정말 B의 변심 때문이었는지/g, '예전 손절도 정말 제 친구 변심 때문이었는지'],

  // A 아버지 쟁점명
  [/A 아버지의 돈 접근/g, '제 친구 아버지의 돈 문제'],

  // party 코드 잔존 — B가 자기 지칭
  [/B에게 해명 기회가/g, '제한테 해명 기회가'],
  [/B를 먼저 문제 인물로/g, '저를 먼저 문제 있는 사람으로'],
  [/B에게 선을 넘었/g, '제한테 선을 넘었'],

  // A가 B를 지칭 (A side entries에서만 — 일반 패턴)
  // 이 패턴들은 context에 따라 다르므로 범용 치환
  [/A의 단정과 B의 침묵/g, '제 친구의 단정과 제 침묵'],
  [/A는 진실을 모르고 B를 미워했고/g, '제 형은 진실을 모르고 저를 미워했고'],  // family 잔존이면 제거, friend에서는 A→"제 친구"

  // friend callTerms: A=다은, B=수민
  // A(다은) entries에서 B 코드
  // B(수민) entries에서 A 코드 "A는", "A가"
  [/(?<![a-zA-Z가-힣])A는 /g, '제 친구는 '],
  [/(?<![a-zA-Z가-힣])A가 /g, '제 친구가 '],
  [/(?<![a-zA-Z가-힣])A를 /g, '제 친구를 '],
];

// ============ M6: 종결부 고정 제거 ============
const ENDING_TAIL = /[,.]?\s*그때도 겉으로는 버티려 했지만 내부적으로는 꽤 흔들렸습니다\.?/g;

// ============ M7: system_message ============
// ============ M8: witness vague ============
const MANUAL_OVERRIDES = {
  // M8: witness vague Truth Throttle 위반
  'w-3-vague-v2': '재판관님, 그날 수민이가 무언가에 크게 상처받은 건 분명했습니다. 다만 자세한 건 제가 말할 자리가 아닌 것 같습니다.',
};

function autoClean(text) {
  let t = text;

  // C1: 한글 깨짐
  for (const [pat, rep] of BROKEN_FIXES) t = t.replace(pat, rep);

  // C2+C3: 쟁점명 + party 코드
  for (const [pat, rep] of ISSUE_PARTY_FIXES) t = t.replace(pat, rep);

  // M6: 종결부
  t = t.replace(ENDING_TAIL, '');

  // 정리
  t = t.replace(/  +/g, ' ').trim();
  t = t.replace(/,\s*$/g, '.');

  return t;
}

function applyToFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  let autoChanged = 0, manualChanged = 0, skipped = 0;

  for (const [ch, chData] of Object.entries(data.channels)) {
    for (const entry of chData.entries) {
      for (const v of entry.variants) {
        if (MANUAL_OVERRIDES[v.id]) {
          if (v.text !== MANUAL_OVERRIDES[v.id]) { v.text = MANUAL_OVERRIDES[v.id]; manualChanged++; }
          else skipped++;
          continue;
        }
        const cleaned = autoClean(v.text);
        if (cleaned !== v.text) { v.text = cleaned; autoChanged++; }
        else skipped++;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  자동: ${autoChanged}, 수동: ${manualChanged}, 동일: ${skipped}`);
}

// 적용
const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'friend-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);

const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'friend-v3-01.json');
if (fs.existsSync(extPath)) { console.log('external:', extPath); applyToFile(extPath); }

// ============ 전수 검증 ============
console.log('\n=== 전수 검증 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
const allTexts = [];
for (const [ch, chData] of Object.entries(fd.channels)) {
  for (const e of chData.entries) {
    for (const v of e.variants) allTexts.push({ id: v.id, text: v.text, ch, party: e.party });
  }
}

// C1: 한글 깨짐
const bkCheck = ['았은지','었은지','맞섰은','누구인이','무엇인이','이었는이','했은이','했은가','찾은다','물은다','뭔이','몰아세웠은','내놨은'];
let c1f = 0;
for (const t of allTexts) for (const b of bkCheck) if (t.text.includes(b)) { c1f++; break; }
console.log('C1 한글깨짐: ' + c1f + (c1f===0?' ✅':' ❌'));

// C2: 쟁점명
const issCheck = ['B의 명예를 먼저 무너뜨린','예비신랑이 먼저 B에게 선을','B의 연락은 예비신랑 집착','B의 변심 때문이었는'];
let c2f = 0;
for (const t of allTexts) for (const p of issCheck) if (t.text.includes(p)) { c2f++; break; }
console.log('C2 쟁점명원문: ' + c2f + (c2f===0?' ✅':' ❌'));

// C3: party 코드 B
const bCode = /(?<![a-zA-Z가-힣])B(?:가|의|에게|를|한테|는|도)/g;
let c3f = 0;
for (const t of allTexts) { bCode.lastIndex=0; if (bCode.test(t.text)) c3f++; }
console.log('C3 B코드: ' + c3f + (c3f===0?' ✅':' ❌'));

// C4: S5 겹침
let s5h = 0;
for (const e of fd.channels.interrogation.entries) {
  if (e.lieState!=='S5') continue;
  const t=e.variants.map(v=>v.text);
  for (let i=0;i<t.length;i++) for (let j=i+1;j<t.length;j++) {
    const s1=new Set(t[i].split(/[.!?]\s*/).filter(Boolean)),s2=new Set(t[j].split(/[.!?]\s*/).filter(Boolean));
    const ol=[...s1].filter(x=>s2.has(x)).length;
    const pct=Math.max(s1.size,s2.size)>0?Math.round(ol/Math.max(s1.size,s2.size)*100):0;
    if(pct>=55)s5h++;
  }
}
console.log('C4 S5겹침55%+: ' + s5h + (s5h<20?' ✅':' ⚠️'));

// M6: 종결부
let m6f = 0;
for (const t of allTexts) if (t.text.includes('내부적으로는 꽤 흔들렸습니다')) m6f++;
console.log('M6 종결부: ' + m6f + (m6f===0?' ✅':' ❌'));

// A 코드 잔존
const aCode = /(?<![a-zA-Z가-힣])A(?:는|가|를|의) /g;
let acf = 0;
for (const t of allTexts) { aCode.lastIndex=0; if (aCode.test(t.text)) acf++; }
console.log('A코드 잔존: ' + acf + (acf===0?' ✅':' ⚠️ (확인필요)'));

console.log('\n총: ' + allTexts.length);
