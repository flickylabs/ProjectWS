/**
 * Thread R: friend-v3-01 전체 자동 정화
 */

const fs = require('fs');
const path = require('path');

const TAIL_PATTERNS = [
  /[,.]?\s*다만 범위와 책임은 나눠 봐야 합니다\.?/g,
  /[,.]?\s*다만 범위와 책임은 구분해 주십시오\.?/g,
  /[,.]?\s*상대 쪽 조치 책임도 분명합니다\.?/g,
  /[,.]?\s*그 점은 인정합니다\.?/g,
  /[,.]?\s*저도 그 시점에는 이미 몰렸던 사람처럼 버티고 있었습니다\.?/g,
  /[,.]?\s*그때의 저는 이미 억울함과 손해를 한꺼번에 떠안은 상태였습니다\.?/g,
  /[,.]?\s*저 역시 그 과정에서 이미 손해와 피해를 함께 감당하고 있었습니다\.?/g,
  /[,.]?\s*적어도 제 대응이 거칠었던 점은 인정합니다\.?/g,
  /[,.]?\s*문제는 상대방 측 대응에도 분명히 있습니다\.?/g,
  /[,.]?\s*그때는 너무 흔들렸습니다\.?/g,
  /[,.]?\s*이 부분은 제 책임으로 인정합니다\.?/g,
  /[,.]?\s*이 부분은 제 책임이라고 인정합니다\.?/g,
  /[,.]?\s*그래도 그 기록이 남긴 책임은 분명히 남습니다\.?/g,
  /[,.]?\s*그래서 저는 그 설명을 바로 믿기 어려웠습니다\.?/g,
];

const TERM_FIXES = [
  [/실행 책임/g, '그 선택의 책임'],
  [/구체 금액 송금 영수증/g, '송금 영수증'],
  [/구체 금액 계좌 이체/g, '계좌 이체'],
  [/구체 금액/g, '큰 금액'],
  [/타가밍/g, '타이밍'],
  [/망이뜨렸/g, '망가뜨렸'],
  [/망이집/g, '망가집'],
  [/움직였은지/g, '움직였는지'],
  [/숨겼은지/g, '숨겼는지'],
  [/먼저였은지/g, '먼저였는지'],
  [/무너졌은지/g, '무너졌는지'],
  [/깼은지/g, '깼는지'],
  [/보냈은데/g, '보내고 나서'],
  [/갚은다고/g, '갚겠다고'],
  [/막은다고/g, '막겠다고'],
  [/뭔이를/g, '뭔가를'],
  [/뭔이 /g, '뭔가 '],
  [/잠이 두고/g, '잠깐 두고'],
  [/사와한/g, '사과한'],
  [/도망이려/g, '도망가려'],
  [/집착인이/g, '집착인지'],
  [/경고인이/g, '경고인지'],
  [/있었는이는/g, '있었는지는'],
  [/있었는가가/g, '있었는가 하는 것이'],
  [/"(\d[\d,]*만\s*원)"/g, '$1'],
];

const MANUAL_OVERRIDES = {
  "a-d-1-S4-motive_search-v1": "재판관님, 그때는 감정과 압박이 함께 올라왔습니다. 제 친구가 예비신랑한테 왜 연락했는지, 그 이유를 확인하기도 전에 저는 최악부터 떠올렸습니다.",
  "a-d-1-S4-motive_search-v5": "재판관님, 그때는 감정과 압박이 함께 올라왔습니다. 제 친구와 제가 어떤 계산을 했는지 분리해서 봐 주십시오.",
};

function autoClean(text) {
  let t = text;
  for (const pat of TAIL_PATTERNS) t = t.replace(pat, '');
  for (const [pat, rep] of TERM_FIXES) t = t.replace(pat, rep);
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

const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'friend-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);

const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'friend-v3-01.json');
if (fs.existsSync(extPath)) { console.log('external:', extPath); applyToFile(extPath); }

// 전수 검사
console.log('\n=== friend-v3-01 전수 검사 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
const allTexts = [];
for (const [ch, chData] of Object.entries(fd.channels)) {
  for (const e of chData.entries) {
    for (const v of e.variants) allTexts.push({ id: v.id, text: v.text, ch });
  }
}

const checks = [
  '다만 범위와 책임은', '상대 쪽 조치 책임', '그 점은 인정합니다',
  '적어도 제 대응이', '문제는 상대방 측', '그때는 너무 흔들렸습니다',
  '이 부분은 제 책임으로', '연결되면', '공식기록 채택', '앵커 진실',
  '실행 책임', '구체 금액', '집착인이', '경고인이',
];

// e-X false positive filter
for (const c of checks) {
  const found = allTexts.filter(t => t.text.includes(c));
  if (found.length > 0) {
    console.log(`FAIL: "${c}" ${found.length}건`);
    found.slice(0,2).forEach(f => console.log(`  [${f.ch}] ${f.id}: ${f.text.substring(0,60)}`));
  } else {
    console.log(`PASS: "${c}" 0건`);
  }
}

// e-4/e-5 in non-evidence channels
const eRefs = allTexts.filter(t => t.ch !== 'evidence_present' && /e-\d/.test(t.text));
if (eRefs.length > 0) {
  console.log(`\nFAIL: e-X 참조 (non-evidence) ${eRefs.length}건`);
  eRefs.slice(0,3).forEach(f => console.log(`  [${f.ch}] ${f.id}: ${f.text.substring(0,60)}`));
} else {
  console.log(`\nPASS: e-X 참조 (non-evidence) 0건`);
}

console.log(`\n총: ${allTexts.length}`);
