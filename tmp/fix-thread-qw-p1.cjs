// Thread-QW P1 2건 patch:
// 1. spouse-01 / judge_contradiction.entries[5].variants[3]: "더 미루지 마십시오" → "이제 답하실 차례입니다"
// 2. family-01 / judge_evidence_combo.entries[23].variants[4]: "더 미루지 마십시오" → "이제 답해 주십시오"

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const targets = [
  {
    case: 'spouse-01',
    channel: 'judge_contradiction',
    entryIndex: 5,
    variantIndex: 3,
    pattern: /더\s*미루지\s*마십시오/,
    replacement: '이제 답하실 차례입니다',
  },
  {
    case: 'family-01',
    channel: 'judge_evidence_combo',
    entryIndex: 23,
    variantIndex: 4,
    pattern: /더\s*미루지\s*마십시오/,
    replacement: '지금 밝혀 주십시오',
  },
];

for (const t of targets) {
  const target = path.join(ROOT, 'src/data/scriptedText/' + t.case + '.json');
  const data = JSON.parse(fs.readFileSync(target));
  const entry = data.channels[t.channel].entries[t.entryIndex];
  const v = entry.variants[t.variantIndex];
  console.log('=== ' + t.case + ' / ' + t.channel + ' / cell:' + entry.key + ' / v:' + v.id + ' ===');
  console.log('  before:', v.text);
  if (t.pattern.test(v.text)) {
    v.text = v.text.replace(t.pattern, t.replacement);
    console.log('  after :', v.text);
    if (process.argv.includes('--apply')) {
      fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
      console.log('  ✓ 적용');
    }
  } else {
    console.log('  ✗ pattern not matched, 스킵');
  }
}

console.log('\n>>> ' + (process.argv.includes('--apply') ? '적용 완료' : 'dry-run. --apply로 실제 적용'));
