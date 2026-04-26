// family/friend의 contradiction_pursuit / interjection / emotional_overload에서
// 잘못된 spouse 매트릭스 cell key (h-d3, h-d4) → 올바른 dispute id (d-3, d-4) rename
//
// 본문은 family/friend 사건 의미 정확 (확인 완료 — h-d3 본문 = d-3 의미, h-d4 본문 = d-4 의미)
//
// 변경 범위:
// - cell.key: "a|h-d3|S1" → "a|d-3|S1"
// - cell.disputeId: "h-d3" → "d-3"
// - variant.id: "contra-a-h-d3-S1-v1" → "contra-a-d-3-S1-v1"
// - tags / sourceRefs 안에 "h-d3" / "h-d4" 있으면 변경
// - text 변경 X
//
// spouse-01은 case data가 d-1, d-2, h-d3, h-d4이므로 변경 X

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_CHANNELS = ['contradiction_pursuit', 'interjection', 'emotional_overload'];
const RENAME_MAP = { 'h-d3': 'd-3', 'h-d4': 'd-4' };

function renameKey(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [old, neu] of Object.entries(RENAME_MAP)) {
    out = out.split(old).join(neu);
  }
  return out;
}

const stats = {};
for (const c of ['family-01', 'friend-01']) {
  const target = path.join(ROOT, 'src/data/scriptedText/' + c + '.json');
  const data = JSON.parse(fs.readFileSync(target));
  let cellRenamed = 0, variantIdRenamed = 0, tagsRenamed = 0, sourceRefsRenamed = 0;
  for (const ch of TARGET_CHANNELS) {
    const channel = data.channels[ch];
    if (!channel?.entries) continue;
    for (const e of channel.entries) {
      const oldKey = e.key;
      const newKey = renameKey(oldKey);
      if (newKey !== oldKey) {
        e.key = newKey;
        cellRenamed++;
      }
      if (e.disputeId && RENAME_MAP[e.disputeId]) {
        e.disputeId = RENAME_MAP[e.disputeId];
      }
      for (const v of e.variants || []) {
        if (v.id) {
          const newId = renameKey(v.id);
          if (newId !== v.id) {
            v.id = newId;
            variantIdRenamed++;
          }
        }
        if (Array.isArray(v.tags)) {
          for (let i = 0; i < v.tags.length; i++) {
            const newTag = renameKey(v.tags[i]);
            if (newTag !== v.tags[i]) {
              v.tags[i] = newTag;
              tagsRenamed++;
            }
          }
        }
        if (Array.isArray(v.sourceRefs)) {
          for (let i = 0; i < v.sourceRefs.length; i++) {
            const newRef = renameKey(v.sourceRefs[i]);
            if (newRef !== v.sourceRefs[i]) {
              v.sourceRefs[i] = newRef;
              sourceRefsRenamed++;
            }
          }
        }
      }
    }
  }
  stats[c] = { cellRenamed, variantIdRenamed, tagsRenamed, sourceRefsRenamed };
  console.log('=== ' + c + ' ===');
  console.log(' ', JSON.stringify(stats[c]));

  if (process.argv.includes('--apply')) {
    fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
    console.log('  ✓ 적용:', target);
  }
}

console.log('\n>>> ' + (process.argv.includes('--apply') ? '적용 완료' : 'dry-run. --apply로 실제 적용'));
