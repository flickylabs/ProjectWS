const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
for (const c of ['family-01', 'friend-01']) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/cases/generated', c + '.json'), 'utf8'));
  console.log('## ' + c + ' top-level keys:', Object.keys(d).join(', '));
  // evidences 찾기
  function find(obj, name, depth = 0, found = [], pathStr = '') {
    if (depth > 6 || !obj || typeof obj !== 'object') return found;
    for (const [k, v] of Object.entries(obj)) {
      const p = pathStr ? pathStr + '.' + k : k;
      if (k === name && Array.isArray(v) && v.length) {
        found.push({ path: p, count: v.length, sample: typeof v[0] === 'object' ? Object.keys(v[0]).slice(0,5).join(',') : String(v[0]).slice(0,40) });
      } else if (typeof v === 'object' && v !== null) {
        find(v, name, depth + 1, found, p);
      }
    }
    return found;
  }
  console.log('  evidences arrays:', JSON.stringify(find(d, 'evidences')));
  const st = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText', c + '.json'), 'utf8'));
  const evIds = new Set();
  for (const e of st.channels.evidence_present?.entries || []) evIds.add(e.evidenceId);
  console.log('  ScriptedText evidenceIds:', [...evIds].sort().join(', '));
  console.log('');
}
