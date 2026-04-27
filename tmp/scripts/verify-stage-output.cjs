#!/usr/bin/env node
/**
 * Stage GPT Pro output verification (Stage 1/2/3 reusable).
 *
 * Usage:
 *   node tmp/scripts/verify-stage-output.cjs --stage 2
 *   node tmp/scripts/verify-stage-output.cjs --stage 2 --output <path> --dataset <path>
 *
 * Default paths (Stage N):
 *   --output  = tmp/GPT-Pro-Stage<N>-*-PACKET/output/stage<N>_patch_output.json
 *               (또는 tmp/qa-codex-integrated-script-patch-v2-results/stage<N>-patch-output.json)
 *   --dataset = tmp/REQUEST-GPT-Pro-Stage<N>-*-dataset.json
 *
 * Verifies (Stage 1 패턴 정합):
 *   - count match (output vs dataset)
 *   - id missing / extra
 *   - input order match
 *   - original != patched (must not be equal)
 *   - matchedLexemes leak in patched (must be 0)
 *   - preservation 5 fields (speaker / target / lieState / evidenceStage / intent)
 *   - rationale empty count
 *   - confidenceFlags distribution
 *   - cluster surface consistency (top phrases per cluster)
 *
 * Exits with code 1 on any verification failure (count mismatch / id mismatch /
 * order mismatch / original==patched / lexeme leak / preservation missing / rationale empty).
 * Exits with code 0 if all PASS (confidenceFlags non-empty is reported but does not fail).
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { stage: null, output: null, dataset: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--stage') args.stage = argv[++i];
    else if (argv[i] === '--output') args.output = argv[++i];
    else if (argv[i] === '--dataset') args.dataset = argv[++i];
  }
  if (!args.stage) {
    console.error('error: --stage <1|2|3> required');
    process.exit(2);
  }
  return args;
}

function findFirstExisting(candidates) {
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function defaultOutputPath(stage) {
  const candidates = [
    `tmp/GPT-Pro-Stage${stage}-P0-Disclosure-Gate-PACKET/output/stage${stage}_patch_output.json`,
    `tmp/GPT-Pro-Stage${stage}-P0-Evidence-Stage-Gate-PACKET/output/stage${stage}_patch_output.json`,
    `tmp/GPT-Pro-Stage${stage}-P0-Surface-Name-Gate-PACKET/output/stage${stage}_patch_output.json`,
    `tmp/qa-codex-integrated-script-patch-v2-results/stage${stage}-patch-output.json`,
  ];
  return findFirstExisting(candidates) || candidates[0];
}

function defaultDatasetPath(stage) {
  const candidates = [
    `tmp/REQUEST-GPT-Pro-Stage${stage}-P0-Disclosure-Gate-dataset.json`,
    `tmp/REQUEST-GPT-Pro-Stage${stage}-P0-Evidence-Stage-Gate-dataset.json`,
    `tmp/REQUEST-GPT-Pro-Stage${stage}-P0-Surface-Name-Gate-dataset.json`,
  ];
  return findFirstExisting(candidates) || candidates[0];
}

function loadJson(p) {
  if (!fs.existsSync(p)) {
    console.error(`error: file not found: ${p}`);
    process.exit(2);
  }
  const raw = fs.readFileSync(p, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`error: JSON parse failed for ${p}: ${e.message}`);
    process.exit(2);
  }
}

function extractItems(data) {
  if (Array.isArray(data)) return data;
  return data.items || data.findings || [];
}

function computeWordDiff(orig, patch) {
  const ow = orig.split(/\s+/);
  const pw = patch.split(/\s+/);
  const diff = [];
  let i = 0,
    j = 0;
  while (i < ow.length || j < pw.length) {
    if (ow[i] === pw[j]) {
      i++;
      j++;
      continue;
    }
    const oStart = i,
      pStart = j;
    while (
      i < ow.length &&
      (j >= pw.length || ow[i] !== pw[j])
    )
      i++;
    if (j < pw.length && i > 0 && ow[i - 1] !== pw[j]) {
      let found = false;
      for (let k = j; k < Math.min(pw.length, j + 5); k++) {
        if (ow[i] === pw[k]) {
          j = k;
          found = true;
          break;
        }
      }
      if (!found) j++;
    }
    diff.push({
      from: ow.slice(oStart, i).join(' '),
      to: pw.slice(pStart, j).join(' '),
    });
    if (i >= ow.length || j >= pw.length) break;
  }
  return diff;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const outputPath = args.output || defaultOutputPath(args.stage);
  const datasetPath = args.dataset || defaultDatasetPath(args.stage);

  console.log(`=== Stage ${args.stage} GPT Pro Output Verification ===`);
  console.log(`output:  ${outputPath}`);
  console.log(`dataset: ${datasetPath}\n`);

  const outRaw = loadJson(outputPath);
  const out = extractItems(outRaw);
  const ds = extractItems(loadJson(datasetPath));

  const errors = [];
  const warnings = [];

  // 1. count
  console.log(`[1] item count: dataset=${ds.length}, output=${out.length}`);
  if (out.length !== ds.length) {
    errors.push(`count mismatch: dataset ${ds.length} vs output ${out.length}`);
  }

  // 2. id missing / extra
  const dsIds = new Set(ds.map((x) => x.id));
  const outIds = new Set(out.map((x) => x.id));
  const missing = [...dsIds].filter((id) => !outIds.has(id));
  const extra = [...outIds].filter((id) => !dsIds.has(id));
  console.log(`[2] id missing: ${missing.length}, extra: ${extra.length}`);
  if (missing.length) {
    errors.push(`missing ids: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? ' ...' : ''}`);
  }
  if (extra.length) {
    errors.push(`extra ids: ${extra.slice(0, 10).join(', ')}${extra.length > 10 ? ' ...' : ''}`);
  }

  // 3. order match
  let orderMismatch = 0;
  for (let i = 0; i < Math.min(ds.length, out.length); i++) {
    if (ds[i].id !== out[i].id) orderMismatch++;
  }
  console.log(`[3] order mismatch: ${orderMismatch}`);
  if (orderMismatch) errors.push(`order mismatch: ${orderMismatch} items`);

  // 4. original == patched
  const noChange = out.filter((x) => x.original === x.patched);
  console.log(`[4] original == patched (must be 0): ${noChange.length}`);
  if (noChange.length) {
    errors.push(
      `original==patched: ${noChange
        .slice(0, 5)
        .map((x) => x.id)
        .join(', ')}`
    );
  }

  // 5. matched lexeme leak in patched
  const leak = [];
  for (const it of out) {
    for (const lex of it.matchedLexemes || []) {
      if (it.patched && lex && it.patched.includes(lex)) {
        leak.push({ id: it.id, lex, cluster: it.clusterId });
        break;
      }
    }
  }
  console.log(`[5] matchedLexemes leak in patched (must be 0): ${leak.length}`);
  if (leak.length) {
    errors.push(
      `lexeme leak: ${leak
        .slice(0, 5)
        .map((x) => `${x.id}[${x.lex}]`)
        .join(', ')}`
    );
  }

  // 6. preservation 5 fields
  const presKeys = ['speaker', 'target', 'lieState', 'evidenceStage', 'intent'];
  const presIssues = [];
  for (const it of out) {
    if (!it.preservation || typeof it.preservation !== 'object') {
      presIssues.push({ id: it.id, reason: 'no preservation' });
      continue;
    }
    for (const k of presKeys) {
      const v = it.preservation[k];
      if (typeof v !== 'string' || v.trim() === '') {
        presIssues.push({ id: it.id, reason: `missing/empty ${k}` });
        break;
      }
    }
  }
  console.log(`[6] preservation issues: ${presIssues.length}`);
  if (presIssues.length) {
    errors.push(
      `preservation: ${presIssues
        .slice(0, 5)
        .map((x) => `${x.id}(${x.reason})`)
        .join(', ')}`
    );
  }

  // 7. rationale empty
  const ratEmpty = out.filter((x) => !x.rationale || x.rationale.trim() === '');
  console.log(`[7] rationale empty (must be 0): ${ratEmpty.length}`);
  if (ratEmpty.length) {
    errors.push(
      `rationale empty: ${ratEmpty
        .slice(0, 5)
        .map((x) => x.id)
        .join(', ')}`
    );
  }

  // 8. confidenceFlags distribution
  const flagged = out.filter(
    (x) => Array.isArray(x.confidenceFlags) && x.confidenceFlags.length > 0
  );
  console.log(`[8] confidenceFlags set: ${flagged.length}`);
  if (flagged.length) {
    const dist = {};
    for (const f of flagged) {
      for (const fl of f.confidenceFlags) {
        dist[fl] = (dist[fl] || 0) + 1;
      }
    }
    console.log('    distribution:', JSON.stringify(dist));
    console.log('    sample:');
    for (const f of flagged.slice(0, 8)) {
      console.log(`      ${f.id} [${f.clusterId}] flags=${JSON.stringify(f.confidenceFlags)}`);
    }
    warnings.push(`confidenceFlags set on ${flagged.length} items — Claude review required`);
  }

  // 9. cluster surface consistency (top phrases)
  const clusters = {};
  for (const it of out) {
    if (!clusters[it.clusterId]) clusters[it.clusterId] = [];
    clusters[it.clusterId].push(it);
  }
  console.log(`\n[9] cluster surface consistency`);
  for (const [cid, items] of Object.entries(clusters).sort()) {
    const surfaces = {};
    for (const it of items) {
      for (const lex of it.matchedLexemes || []) {
        if (!lex) continue;
        const idx = (it.original || '').indexOf(lex);
        if (idx < 0) continue;
        const before = (it.original || '').substring(Math.max(0, idx - 3), idx);
        const beforeIdx = (it.patched || '').indexOf(before);
        if (beforeIdx >= 0 && before.length > 0) {
          const surfaceStart = beforeIdx + before.length;
          const m = (it.patched || '')
            .substring(surfaceStart, Math.min(it.patched.length, surfaceStart + lex.length + 4))
            .match(/[가-힣 ]+/);
          const surface = m ? m[0].trim() : '?';
          const key = `${lex} → ${surface}`;
          surfaces[key] = (surfaces[key] || 0) + 1;
        }
      }
    }
    const top = Object.entries(surfaces)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([k, c]) => `${c}× ${k}`)
      .join(' / ');
    console.log(`    [${cid}] ${items.length} items — ${top || '(no lexeme)'}`);
  }

  // result
  console.log('\n=== RESULT ===');
  if (warnings.length) {
    console.log('WARNINGS:');
    for (const w of warnings) console.log('  -', w);
  }
  if (errors.length) {
    console.log('FAIL:');
    for (const e of errors) console.log('  -', e);
    process.exit(1);
  }
  console.log('PASS — all auto-verification checks succeeded.');
  if (warnings.length) {
    console.log('(WARNINGS above require Claude/CT manual review before Codex-Dev application.)');
  }
}

main();
