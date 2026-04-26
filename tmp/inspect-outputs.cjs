// 8 산출물 형식/카운트 검증
const fs = require('fs');
const path = require('path');

const PKG = path.resolve(__dirname, '../gpt-pro-runs/judge-messages-v3/_master/assets-spouse-01/gpt-pro-package');

const files = [
  'sessions/S1-interrogation-variants/output/s1-interrogation-v6-v10-patch.json',
  'sessions/S1-interrogation-variants/output/s1-interrogation-v6-v10-entries.json',
  'sessions/S2-evidence-stage-d1-d2/output/s2-evidence-present-stage-patch.json',
  'sessions/S3-evidence-stage-hd3-hd4/output/s3_evidence_present_stage_entries.json',
  'sessions/S4-dossier-witness/output/S4-dossier-witness-expanded.json',
  'sessions/S5-h-d3-h-d4-channels/output/s5-channel-expansion-only.json',
  'sessions/S6-judge-channels/output/s6-judge-channels-patch.json',
  'sessions/S7-trust-mediation-system-milestone/output/10-scripted-text-s7.json',
  'sessions/S8-aftermath-correction/output/S8_aftermath_expansion_and_tone_patch.json',
];

function shape(x, depth = 0, max = 3) {
  if (depth >= max) return Array.isArray(x) ? `[${x.length}]` : typeof x;
  if (Array.isArray(x)) {
    if (!x.length) return '[]';
    return `[${x.length} × ${shape(x[0], depth+1, max)}]`;
  }
  if (x && typeof x === 'object') {
    const keys = Object.keys(x).slice(0, 8);
    return '{ ' + keys.map(k => `${k}: ${shape(x[k], depth+1, max)}`).join(', ') + (Object.keys(x).length > 8 ? ' ...' : '') + ' }';
  }
  return typeof x;
}

function entryCount(d) {
  // channel 형식
  if (d?.channels) {
    const out = {};
    for (const [ch, body] of Object.entries(d.channels)) {
      if (body?.entries) out[ch] = { keys: body.entries.length, variants: body.entries.reduce((s,e)=>s+(e.variants?.length||0),0) };
      else if (Array.isArray(body)) out[ch] = { items: body.length };
      else out[ch] = { type: typeof body };
    }
    return out;
  }
  // entries 직접
  if (Array.isArray(d?.entries)) return { entries: d.entries.length, variants: d.entries.reduce((s,e)=>s+(e.variants?.length||0),0) };
  if (Array.isArray(d)) return { items: d.length };
  // patch / aftermath_patch / tone_patch 등
  const counts = {};
  for (const [k, v] of Object.entries(d || {})) {
    if (Array.isArray(v)) {
      counts[k] = { items: v.length };
      if (v[0]?.variants) counts[k].variants = v.reduce((s,e)=>s+(e.variants?.length||0),0);
    }
  }
  return counts;
}

for (const rel of files) {
  const full = path.join(PKG, rel);
  console.log('\n--- ' + path.basename(rel) + ' ---');
  try {
    const stat = fs.statSync(full);
    const d = JSON.parse(fs.readFileSync(full, 'utf8'));
    console.log('  size: ' + (stat.size / 1024).toFixed(1) + ' KB');
    console.log('  shape: ' + shape(d));
    console.log('  count: ' + JSON.stringify(entryCount(d)));
  } catch (e) {
    console.log('  ERROR: ' + e.message);
  }
}
