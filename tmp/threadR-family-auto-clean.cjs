/**
 * Thread R: family-v3-01 전체 자동 정화
 *
 * Phase 1: 패턴 기반 꼬리 템플릿 제거
 * Phase 2: 기획 문서 원문 노출 entries 수동 교체
 * Phase 3: 오타/기획용어 수정
 */

const fs = require('fs');
const path = require('path');

// ============ 꼬리 템플릿 ============
const TAIL_PATTERNS = [
  // family 전용 꼬리
  /[,.]?\s*다만 범위와 책임은 나눠 봐야 합니다\.?/g,
  /[,.]?\s*다만 범위와 책임은 구분해 주십시오\.?/g,
  /[,.]?\s*상대 쪽 조치 책임도 분명합니다\.?/g,
  /[,.]?\s*그 점은 인정합니다\.?/g,
  // spouse와 공통
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

// ============ 기획 문서 원문 노출 entries 수동 교체 ============
const MANUAL_OVERRIDES = {
  // B d-1 S0 empathy — 기획 문서 원문이 그대로 들어감
  "b-d-1-S0-empathy_approach-v1": "재판관님, 아직 단정할 단계는 아닙니다. 제 형이 뭐라 하든 저는 어머니를 보러 간 겁니다.",
  "b-d-1-S0-empathy_approach-v2": "재판관님, 찾아간 걸 바로 나쁜 쪽으로 보시면 저는 드릴 말이 없습니다.",
  "b-d-1-S0-empathy_approach-v3": "재판관님, 어머니 곁에 있었다는 것만으로 의도까지 정하시면 곤란합니다.",
  "b-d-1-S0-empathy_approach-v4": "재판관님, 그때 저는 어머니 상태가 걱정됐을 뿐입니다. 다른 계산은 없었습니다.",
  "b-d-1-S0-empathy_approach-v5": "재판관님, 어머니가 힘들어하시는 걸 보고 그냥 돌아올 수가 없었습니다.",

  // B d-1 S1 empathy — 동일 문제
  "b-d-1-S1-empathy_approach-v1": "재판관님, 불리해 보이는 부분이 있다는 건 압니다. 그래도 방문이 많았다는 것만으로 제 의도까지 정하시면 안 됩니다.",
  "b-d-1-S1-empathy_approach-v2": "재판관님, 기록이 쌓인 건 사실입니다. 하지만 그 자리에서 있었던 일은 그렇게 단순하지 않았습니다.",
  "b-d-1-S1-empathy_approach-v3": "재판관님, 제가 자주 간 건 맞습니다. 그래도 갈 때마다 유서 얘기만 한 건 아닙니다.",
  "b-d-1-S1-empathy_approach-v4": "재판관님, 그때 저는 어머니가 흔들리시는 게 보여서 더 자주 간 겁니다. 결과만 보고 판단하지 말아 주십시오.",
  "b-d-1-S1-empathy_approach-v5": "재판관님, 제 행동이 오해받을 수 있다는 건 압니다. 다만 어머니 곁에 있었다는 사실이 곧 조종은 아닙니다.",
};

// ============ 오타/기획용어 수정 ============
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
  [/뭔이 /g, '뭔가 '],
  [/잠이 두고/g, '잠깐 두고'],
  [/사와한/g, '사과한'],
  [/도망이려/g, '도망가려'],
  [/물은다면/g, '묻는다면'],
  [/사가를/g, '사이를'],
  // family 오타
  [/있었는이는/g, '있었는지는'],
  [/판단할 수 있었는이는/g, '판단할 수 있었는지는'],
  [/있었는가가/g, '있었는가 하는 것이'],
  // 따옴표로 감싼 금액 제거
  [/"(\d[\d,]*만\s*원)"/g, '$1'],
];

function autoClean(text) {
  let t = text;

  for (const pat of TAIL_PATTERNS) {
    t = t.replace(pat, '');
  }

  for (const [pat, rep] of TERM_FIXES) {
    t = t.replace(pat, rep);
  }

  // 이중 공백, 끝 정리
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
        // Manual override first
        if (MANUAL_OVERRIDES[v.id]) {
          if (v.text !== MANUAL_OVERRIDES[v.id]) {
            v.text = MANUAL_OVERRIDES[v.id];
            manualChanged++;
          } else skipped++;
          continue;
        }
        // Auto clean
        const cleaned = autoClean(v.text);
        if (cleaned !== v.text) {
          v.text = cleaned;
          autoChanged++;
        } else skipped++;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  자동: ${autoChanged}, 수동: ${manualChanged}, 동일: ${skipped}`);
}

// 적용
const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'family-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);

const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'family-v3-01.json');
if (fs.existsSync(extPath)) {
  console.log('external:', extPath);
  applyToFile(extPath);
}

// ============ 검사 ============
console.log('\n=== family-v3-01 전 채널 잔존 검사 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
const allTexts = [];
for (const [ch, chData] of Object.entries(fd.channels)) {
  for (const e of chData.entries) {
    for (const v of e.variants) allTexts.push({ id: v.id, text: v.text, ch });
  }
}

const checks = [
  '다만 범위와 책임은 나눠 봐야 합니다',
  '다만 범위와 책임은 구분해 주십시오',
  '상대 쪽 조치 책임도 분명합니다',
  '그 점은 인정합니다',
  '적어도 제 대응이 거칠었던 점은 인정합니다',
  '문제는 상대방 측 대응에도 분명히 있습니다',
  '그때는 너무 흔들렸습니다',
  '이 부분은 제 책임으로 인정합니다',
  '연결되면 최종본',
  '개입 질문으로 이동',
  '공식기록 채택',
  '앵커 진실',
  '실행 책임',
  '구체 금액',
  '움직였은',
  '숨겼은',
  '판단할 수 있었는이',
  '있었는가가',
  '"만 원"', // 따옴표 금액
];

for (const c of checks) {
  const found = allTexts.filter(t => t.text.includes(c));
  if (found.length > 0) {
    console.log(`FAIL: "${c}" ${found.length}건`);
    found.slice(0,2).forEach(f => console.log(`  [${f.ch}] ${f.id}`));
  } else {
    console.log(`PASS: "${c}" 0건`);
  }
}

console.log(`\n총 variant: ${allTexts.length}`);
