const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(ROOT, 'tmp/qa-scripted-results');
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01'];
const DATE = process.env.QA_DATE || '20260427';
const HEAD = 'db0130e';

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function readText(abs) {
  return fs.readFileSync(abs, 'utf8');
}

function rel(abs) {
  return path.relative(ROOT, abs).replace(/\\/g, '/');
}

function walkFiles(dir, predicate, out = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, item.name);
    if (item.isDirectory()) walkFiles(abs, predicate, out);
    else if (predicate(abs)) out.push(abs);
  }
  return out;
}

function oneLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function excerpt(value, max = 150) {
  const text = oneLine(value);
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function rx(source, flags = 'u') {
  return new RegExp(source, flags);
}

function flattenVariants(caseId, scripted) {
  const rows = [];
  for (const [channel, block] of Object.entries(scripted.channels ?? {})) {
    for (const entry of block.entries ?? []) {
      for (const variant of entry.variants ?? []) {
        const tags = Array.isArray(variant.tags) ? variant.tags : [];
        const speakerTag = tags.find((tag) => tag.startsWith('speaker:'));
        rows.push({
          caseId,
          channel,
          entryKey: entry.key,
          variantId: variant.id,
          lieState: entry.lieState ?? null,
          party: entry.party ?? null,
          targetParty: entry.targetParty ?? null,
          speaker: speakerTag ? speakerTag.split(':')[1] : null,
          text: variant.text ?? '',
          behaviorHint: variant.behaviorHint ?? '',
          tags,
        });
      }
    }
  }
  return rows;
}

function rowParty(row) {
  if (row.party === 'a' || row.party === 'b') return row.party;
  if (row.speaker === 'a' || row.speaker === 'b') return row.speaker;
  if (row.targetParty === 'a' || row.targetParty === 'b') return row.targetParty;
  return null;
}

function stratifiedSample(rows, max) {
  if (rows.length <= max) return rows;
  const groups = new Map();
  for (const row of rows) {
    const key = `${row.caseId}:${row.channel}:${row.lieState ?? 'NA'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const result = [];
  const entries = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  let remaining = max;
  let remainingRows = rows.length;
  for (let i = 0; i < entries.length; i += 1) {
    const group = entries[i][1];
    const take = i === entries.length - 1
      ? remaining
      : Math.max(1, Math.min(group.length, Math.round((group.length / remainingRows) * remaining)));
    const step = group.length / take;
    for (let j = 0; j < take && result.length < max; j += 1) {
      result.push(group[Math.floor(j * step)]);
    }
    remaining -= take;
    remainingRows -= group.length;
  }
  return result.slice(0, max);
}

const NPC_CHANNELS = new Set([
  'interrogation',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'evidence_present',
  'trust_action',
  'mediation',
  'dossier',
  'witness',
  'rapport_milestone',
  'contradict_milestone',
]);

const EARLY_STATES = new Set(['S0', 'S1', 'S2']);

const METRICS = {
  victim_cosplay: {
    label: '단정/피해 서사 빈도',
    expected: '>= 70%',
    pass: (ratio) => ratio >= 0.7,
    patterns: [
      rx('이미|분명|확실|답을\\s*알|아니었|아닙니다|맞습니다|상처|억울|참았|배신|속였|거짓|끝났|명백|못\\s*믿'),
    ],
  },
  avoidant: {
    label: 'S0-S2 모호/회피어 비율',
    expected: '>= 50%',
    filter: (row) => EARLY_STATES.has(row.lieState),
    pass: (ratio) => ratio >= 0.5,
    patterns: [
      rx('좀|그냥|복잡|말하기|사정|아직|모르|어렵|그\\s*일|그게|정확히|그런|일단|피하|넘어가|닫았|조심|곤란|입을\\s*닫'),
    ],
  },
  affect_flattening: {
    label: '격앙/감정 폭발 빈도',
    expected: '<= 10%',
    pass: (ratio) => ratio <= 0.1,
    patterns: [
      rx('!|소리|고함|분노|화가\\s*났|화를\\s*냈|말도\\s*안|도대체|그만|못\\s*참|억울해서|폭발|울분|비난을\\s*쏟'),
    ],
  },
  confrontational: {
    label: '직접 공격/추궁 빈도',
    expected: '>= 25%',
    pass: (ratio) => ratio >= 0.25,
    patterns: [
      rx('왜|당신|그쪽|말도\\s*안|책임|거짓|아니잖|뭘|누가|해놓고|몰아|감히|틀렸|앞장|숨길|의심|물러서지'),
    ],
  },
  premature_summary: {
    label: '결론 점프/성급한 요약 빈도',
    expected: '>= 25%',
    pass: (ratio) => ratio >= 0.25,
    patterns: [
      rx('결국|그러니까|그래서|답은|이미|분명|끝났|확실|정리|딱|한마디|결론|못\\s*박|바로|그\\s*말은'),
    ],
  },
  cold_logic: {
    label: '분석/기록/숫자 톤 빈도',
    expected: '>= 35%',
    pass: (ratio) => ratio >= 0.35,
    patterns: [
      rx('숫자|기록|순서|표|계산|비율|시간|정확|자료|근거|논리|항목|단계|확률'),
    ],
  },
};

function runS3(allRows, cases) {
  const parties = [];
  for (const caseId of CASE_IDS) {
    const duo = cases[caseId].duo;
    parties.push({ caseId, party: 'a', name: duo.partyA.name, archetype: duo.partyA.archetype });
    parties.push({ caseId, party: 'b', name: duo.partyB.name, archetype: duo.partyB.archetype });
  }
  const archetypes = ['victim_cosplay', 'avoidant', 'affect_flattening', 'confrontational', 'premature_summary', 'cold_logic'];
  const results = [];
  for (const archetype of archetypes) {
    const metric = METRICS[archetype];
    const members = parties.filter((party) => party.archetype === archetype);
    let rows = [];
    for (const member of members) {
      rows = rows.concat(allRows.filter((row) => row.caseId === member.caseId && NPC_CHANNELS.has(row.channel) && rowParty(row) === member.party));
    }
    if (metric.filter) rows = rows.filter(metric.filter);
    const sample = stratifiedSample(rows, 100);
    const hits = sample.filter((row) => metric.patterns.some((pattern) => pattern.test(`${row.text} ${row.behaviorHint}`)));
    const ratio = sample.length ? hits.length / sample.length : null;
    results.push({
      archetype,
      members,
      metric: metric.label,
      expected: metric.expected,
      sourceTotal: rows.length,
      sampleSize: sample.length,
      hitCount: hits.length,
      ratio: ratio == null ? null : Number(ratio.toFixed(3)),
      status: ratio == null ? 'N/A' : metric.pass(ratio) ? 'PASS' : 'REVIEW',
      examples: hits.slice(0, 10).map((row) => ({
        caseId: row.caseId,
        channel: row.channel,
        variantId: row.variantId,
        lieState: row.lieState,
        excerpt: excerpt(row.text),
      })),
      lowSignalExamples: sample.filter((row) => !hits.includes(row)).slice(0, 6).map((row) => ({
        caseId: row.caseId,
        channel: row.channel,
        variantId: row.variantId,
        lieState: row.lieState,
        excerpt: excerpt(row.text),
      })),
    });
  }
  return results;
}

function scanComponents() {
  const componentFiles = walkFiles(path.join(ROOT, 'src/components'), (file) => /\.(tsx?|jsx?)$/.test(file))
    .map(rel)
    .sort();
  const findings = [];
  const patterns = [
    {
      tc: 'TC-G1',
      priority: 'P1',
      regex: /\b(?:ev|evidence|evDef|selectedEvidence)\.name\b/,
      reason: 'evidence.name 사용 후보. evidence panel/card/hotbar에서는 surfaceName 우선 정책 확인 필요.',
      skip: (line) => /surfaceName\s*\?\?/.test(line) && !/\?\s*(?:ev|evidence)\.name\s*:/.test(line),
    },
    {
      tc: 'TC-G1',
      priority: 'P1',
      regex: /\b(?:ev|evidence|evDef|selectedEvidence)\.description\b/,
      reason: 'evidence.description 사용 후보. surfaceDescription 우선 정책 확인 필요.',
      skip: (line) => /surfaceDescription\s*\?\?/.test(line) && !/\?\s*(?:ev|evidence)\.description\s*:/.test(line),
    },
    {
      tc: 'TC-G2',
      priority: 'P1',
      regex: /\bcard\.name\b/,
      reason: 'dossier card name 사용 후보. uiSurfaceMap 추상화 적용 여부 확인 필요.',
    },
    {
      tc: 'TC-B2/TC-G5',
      priority: 'P1',
      regex: /profile\.archetype|duo\.party[AB]\.archetype/,
      reason: 'archetype 코드 매핑 누락 시 영문 코드 UI 노출 가능.',
    },
    {
      tc: 'TC-G3',
      priority: 'P2',
      regex: /(?:'당사자 A'|'당사자 B'|"당사자 A"|"당사자 B"|`당사자 A`|`당사자 B`|\?\?\s*'A'|\?\?\s*'B'|\?\?\s*"A"|\?\?\s*"B")/,
      reason: 'A/B 또는 당사자 A/B fallback UI 노출 가능.',
    },
  ];
  for (const fileRel of componentFiles) {
    const abs = path.join(ROOT, fileRel);
    const lines = readText(abs).split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      for (const pattern of patterns) {
        pattern.regex.lastIndex = 0;
        if (pattern.regex.test(line) && !(pattern.skip && pattern.skip(line))) {
          findings.push({
            tc: pattern.tc,
            priority: pattern.priority,
            path: fileRel,
            line: index + 1,
            reason: pattern.reason,
            code: line.trim(),
          });
        }
      }
    }
  }
  const priorityOrder = { P0: 0, P1: 1, P2: 2 };
  findings.sort((a, b) => (priorityOrder[a.priority] - priorityOrder[b.priority]) || a.path.localeCompare(b.path) || a.line - b.line);
  return {
    componentFiles,
    scannedFileCount: componentFiles.length,
    findingCount: findings.length,
    findings,
  };
}

function normalizeKey(value) {
  return String(value ?? '').toLowerCase();
}

function getByFlexiblePath(root, expr, caseId) {
  if (!expr) return { found: false };
  let source = root.caseData;
  let pathExpr = expr;
  const claimMatch = /^(?:claimPolicies\/)?([^./]+(?:-dossier-cards)?)\.json?\.(.+)$/.exec(expr);
  if (claimMatch) {
    const file = claimMatch[1].endsWith('.json') ? claimMatch[1] : `${claimMatch[1]}.json`;
    const relPath = `src/data/claimPolicies/${file}`;
    if (!fs.existsSync(path.join(ROOT, relPath))) return { found: false, reason: 'missing-claimPolicy-file' };
    source = readJson(relPath);
    pathExpr = claimMatch[2];
  } else if (/^(?:family|friend|spouse)-01-dossier-cards\./.test(expr)) {
    const firstDot = expr.indexOf('.');
    source = readJson(`src/data/claimPolicies/${expr.slice(0, firstDot)}.json`);
    pathExpr = expr.slice(firstDot + 1);
  } else if (expr.startsWith('claimPolicies/')) {
    return { found: false, reason: 'unsupported-claimPolicies-path' };
  }
  const parts = pathExpr.split('.');
  let cur = source;
  for (const part of parts) {
    if (cur == null) return { found: false };
    const bracket = /^(.+)\[(\d+)\]$/.exec(part);
    if (bracket) {
      cur = cur[bracket[1]];
      cur = Array.isArray(cur) ? cur[Number(bracket[2])] : undefined;
      continue;
    }
    if (Array.isArray(cur)) {
      const key = normalizeKey(part);
      cur = cur.find((item) => normalizeKey(item?.id) === key || normalizeKey(item?.evidenceId) === key || normalizeKey(item?.key) === key);
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(cur, part)) {
      cur = cur[part];
      continue;
    }
    const lowerPart = part.toLowerCase();
    const key = Object.keys(cur).find((candidate) => candidate.toLowerCase() === lowerPart);
    cur = key ? cur[key] : undefined;
  }
  return cur === undefined ? { found: false } : { found: true, value: cur };
}

function policyUiEntries(policy) {
  const raw = policy.uiSurfaceMap?.entries;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((entry) => ({ ...entry, path: entry.path }));
  return Object.entries(raw).map(([entryPath, entry]) => ({ ...entry, path: entryPath }));
}

function getCaseEvidence(caseData, id) {
  return Array.isArray(caseData.evidence)
    ? caseData.evidence.find((ev) => ev.id === id)
    : caseData.evidence?.[id];
}

function textIncludesAny(text, terms) {
  const value = oneLine(text);
  return (terms ?? []).filter((term) => term && value.includes(term));
}

function runS5(cases, policies, allRows) {
  const results = [];
  const surfaceOnlyRows = allRows.filter((row) => ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon', 'system_message', 'dossier'].includes(row.channel));
  for (const caseId of CASE_IDS) {
    const policy = policies[caseId];
    const caseData = cases[caseId];
    const alias = [];
    for (const [evidenceId, mapped] of Object.entries(policy.surfaceMap?.evidence ?? {})) {
      const ev = getCaseEvidence(caseData, evidenceId);
      if (!ev) alias.push({ evidenceId, status: 'MISSING_CASE_EVIDENCE', policySurface: mapped.surfaceName });
      else if (ev.surfaceName !== mapped.surfaceName) alias.push({ evidenceId, status: 'WARN_BASELINE_ALIAS', policySurface: mapped.surfaceName, caseSurface: ev.surfaceName });
    }
    const ui = [];
    for (const entry of policyUiEntries(policy)) {
      const actual = getByFlexiblePath({ caseData }, entry.path, caseId);
      const current = entry.currentText ?? entry.sourceText;
      const surface = entry.surfaceText;
      const truthTerms = entry.truthTerms ?? [];
      const record = {
        path: entry.path,
        exposure: entry.exposure ?? 'unknown',
        currentText: oneLine(current),
        surfaceText: oneLine(surface),
        status: 'UNKNOWN',
        actualText: '',
        truthTermHits: [],
      };
      if (!actual.found) {
        record.status = 'WARN_UNRESOLVED_PATH';
      } else {
        record.actualText = oneLine(Array.isArray(actual.value) ? actual.value.join(' | ') : actual.value);
        record.truthTermHits = textIncludesAny(record.actualText, truthTerms);
        if (surface && record.actualText === oneLine(surface)) record.status = 'PASS_SURFACE_APPLIED';
        else if (current && record.actualText === oneLine(current)) record.status = String(record.exposure).includes('high') || String(record.exposure).includes('ui')
          ? 'WARN_ACTUAL_MATCHES_TRUTH_SOURCE'
          : 'INFO_ACTUAL_MATCHES_POLICY_SOURCE';
        else if (record.truthTermHits.length) record.status = 'WARN_TRUTH_TERMS_IN_ACTUAL';
        else record.status = 'INFO_ACTUAL_DIFFERS_FROM_POLICY_SOURCE';
      }
      ui.push(record);
    }
    const lexemes = new Set();
    const add = (v) => {
      if (typeof v === 'string' && v.trim()) lexemes.add(v.trim());
      else if (Array.isArray(v)) v.forEach(add);
      else if (v && typeof v === 'object') Object.values(v).forEach(add);
    };
    add(policy.forbiddenLexemes?.surfaceOnlyChannels);
    const scriptedHits = [];
    for (const row of surfaceOnlyRows.filter((row) => row.caseId === caseId)) {
      const hits = [...lexemes].filter((term) => term && (row.text.includes(term) || row.behaviorHint.includes(term)));
      if (hits.length) scriptedHits.push({ channel: row.channel, variantId: row.variantId, hits: hits.slice(0, 5), excerpt: excerpt(row.text || row.behaviorHint) });
    }
    results.push({
      caseId,
      evidenceSurfaceStatus: alias.length ? 'WARN' : 'PASS',
      aliasCount: alias.length,
      alias,
      uiEntryCount: ui.length,
      uiStatusCounts: ui.reduce((acc, item) => ((acc[item.status] = (acc[item.status] ?? 0) + 1), acc), {}),
      ui,
      scriptedSurfaceOnlyLexemeHitCount: scriptedHits.length,
      scriptedSurfaceOnlyLexemeHitsPreview: scriptedHits.slice(0, 15),
    });
  }
  return results;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = typeof key === 'function' ? key(item) : item[key];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function table(rows, headers) {
  const lines = [];
  lines.push(`| ${headers.join(' | ')} |`);
  lines.push(`| ${headers.map(() => '---').join(' | ')} |`);
  for (const row of rows) lines.push(`| ${headers.map((h) => row[h] ?? '').join(' | ')} |`);
  return lines.join('\n');
}

const COMMON = `- **Session**: QA-Codex-Scripted
- **HEAD**: ${HEAD} (\`docs(qa): tier-2 QA test cases — functional / scripted / index\`)
- **Commands run**: \`git status --short --branch\` / \`git log --oneline -1\` / \`git diff --quiet && git diff --cached --quiet\` / \`npm run check:all\` / \`node tmp/qa-scripted-results/qa-scripted-s345-detector.cjs\`
- **Known baseline warnings**: 157
- **New warnings**: 0 wrapper delta; QA-only findings are listed separately by plan
- **New hard issues**: 0 wrapper hard regression
- **Known QA blocker**: S-1 6 P0 semantic-bypass candidates, accepted as known and not reprocessed here
- **Warning delta explanation**: baseline-known \`forbiddenLexemes.surfaceOnly\`, \`surfaceName alias\`, and \`legacy-precheck-matrix\` warnings remain WARN-only; no wrapper hard regression observed`;

function writeS3(result) {
  const reviewCount = result.filter((row) => row.status === 'REVIEW').length;
  const rows = result.map((row) => ({
    archetype: row.archetype,
    members: row.members.map((m) => `${m.caseId}/${m.name}`).join('<br>') || 'active cases에 없음',
    sample: row.sampleSize,
    metric: row.metric,
    expected: row.expected,
    measured: row.ratio == null ? 'N/A' : `${Math.round(row.ratio * 100)}% (${row.hitCount}/${row.sampleSize})`,
    status: row.status,
  }));
  let md = `# QA Scripted Result - Plan S-3\n\n${COMMON}\n- **Scope**: TC-D5 archetype voice quantitative static review\n- **PASS / FAIL / BLOCKED**: ${result.length - reviewCount} / ${reviewCount} / 0\n- **P0 findings**: 0\n- **P1 findings**: ${reviewCount} quantitative voice REVIEW rows\n- **P2 findings**: 0\n- **New findings vs known S-1**: S-3 voice metrics only; no new P0 class\n\n## Archetype Metrics\n\n${table(rows, ['archetype', 'members', 'sample', 'metric', 'expected', 'measured', 'status'])}\n\n## Review Entries\n\n`;
  for (const row of result.filter((item) => item.status === 'REVIEW')) {
    md += `### ${row.archetype}\n\n`;
    md += `- sourceTotal: ${row.sourceTotal}, sample: ${row.sampleSize}, measured: ${row.ratio == null ? 'N/A' : `${Math.round(row.ratio * 100)}%`}, expected: ${row.expected}\n`;
    md += `- note: quantitative signal below/above threshold; requires CT voice review, not wrapper hard failure.\n`;
    for (const item of row.lowSignalExamples.slice(0, 5)) {
      md += `- low-signal sample: \`${item.variantId}\` (${item.caseId}/${item.channel}/${item.lieState ?? '-'}) - ${item.excerpt}\n`;
    }
    md += '\n';
  }
  md += `## Files Touched\n\n- \`tmp/qa-scripted-results/qa-scripted-s345-detector.cjs\`\n- \`tmp/qa-scripted-results/qa-scripted-s345-output.json\`\n- \`tmp/qa-scripted-results/${DATE}-S-3-summary.md\`\n\nNo ScriptedText, caseData, runtime, policy, wrapper, or TC documents were modified.\n`;
  fs.writeFileSync(path.join(OUT_DIR, `${DATE}-S-3-summary.md`), md, 'utf8');
}

function writeS4(result) {
  const byPriority = countBy(result.findings, 'priority');
  const byTc = countBy(result.findings, 'tc');
  const findingRows = result.findings.slice(0, 120).map((f) => ({
    priority: f.priority,
    tc: f.tc,
    location: `${f.path}:${f.line}`,
    reason: f.reason,
    code: f.code.replace(/\|/g, '\\|'),
  }));
  let md = `# QA Scripted Result - Plan S-4\n\n${COMMON}\n- **Scope**: TC-G1~G5 src/components/* P7 leakage code audit, read/report only\n- **PASS / FAIL / BLOCKED**: 0 / ${result.findingCount ? 1 : 0} / 0\n- **P0 findings**: 0\n- **P1 findings**: ${byPriority.P1 ?? 0} UI leakage candidates\n- **P2 findings**: ${byPriority.P2 ?? 0} fallback/label candidates\n- **New findings vs known S-1**: UI/P7 code-path class; no new P0 class\n\n## Audit Coverage\n\n- Component files read: ${result.scannedFileCount}\n\n`;
  for (const file of result.componentFiles) md += `- \`${file}\`\n`;
  md += `\n## Finding Counts\n\n`;
  md += `- by priority: ${JSON.stringify(byPriority)}\n`;
  md += `- by TC: ${JSON.stringify(byTc)}\n\n`;
  md += `## Findings\n\n${table(findingRows, ['priority', 'tc', 'location', 'reason', 'code'])}\n\n`;
  md += `## Recommended Direction\n\n- For evidence UI paths, prefer \`surfaceName\` and \`surfaceDescription\` in list/card/modal/hotbar surfaces unless the path is explicitly player-discovered and policy-approved.\n- For dossier UI paths, route \`card.name\`/summary through uiSurfaceMap or equivalent abstraction before rendering.\n- For archetype labels, ensure every active archetype maps to Korean display text with no raw-code fallback.\n- Code changes are out of scope for this QA thread; hand off to Codex-Dev if CT-Main approves.\n\n## Files Touched\n\n- \`tmp/qa-scripted-results/qa-scripted-s345-detector.cjs\`\n- \`tmp/qa-scripted-results/qa-scripted-s345-output.json\`\n- \`tmp/qa-scripted-results/${DATE}-S-4-summary.md\`\n\nNo src/components files were modified.\n`;
  fs.writeFileSync(path.join(OUT_DIR, `${DATE}-S-4-summary.md`), md, 'utf8');
}

function writeS5(result) {
  const totalAliases = result.reduce((sum, item) => sum + item.aliasCount, 0);
  const totalUiWarn = result.reduce((sum, item) => sum + Object.entries(item.uiStatusCounts).filter(([key]) => key.startsWith('WARN')).reduce((s, [, n]) => s + n, 0), 0);
  const rows = result.map((item) => ({
    caseId: item.caseId,
    evidenceSurface: `${item.evidenceSurfaceStatus} (${item.aliasCount})`,
    uiEntries: item.uiEntryCount,
    uiStatusCounts: JSON.stringify(item.uiStatusCounts),
    scriptedSurfaceOnlyHits: item.scriptedSurfaceOnlyLexemeHitCount,
  }));
  let md = `# QA Scripted Result - Plan S-5\n\n${COMMON}\n- **Scope**: uiSurfaceMap vs caseData evidence.surfaceName vs ScriptedText exposure cross-check\n- **PASS / FAIL / BLOCKED**: 0 / ${totalAliases + totalUiWarn ? 1 : 0} / 0\n- **P0 findings**: 0 new P0 class\n- **P1 findings**: ${totalUiWarn} uiSurfaceMap WARN rows; ${totalAliases} baseline-known surfaceName alias rows\n- **P2 findings**: 0\n- **New findings vs known S-1**: S-5 identifies UI/policy-map alignment warnings, not S-1 semantic leak class\n\n## Summary\n\n${table(rows, ['caseId', 'evidenceSurface', 'uiEntries', 'uiStatusCounts', 'scriptedSurfaceOnlyHits'])}\n\n`;
  for (const item of result) {
    md += `## ${item.caseId}\n\n`;
    md += `### evidence.surfaceName\n\n`;
    if (item.alias.length === 0) md += '- PASS: policy surfaceMap evidence surfaceName matches caseData.\n';
    for (const alias of item.alias) {
      md += `- ${alias.status}: ${alias.evidenceId} policy="${alias.policySurface}" case="${alias.caseSurface ?? ''}"\n`;
    }
    md += `\n### uiSurfaceMap entries\n\n`;
    for (const entry of item.ui) {
      md += `- ${entry.status}: \`${entry.path}\` exposure=${entry.exposure}`;
      if (entry.actualText) md += ` actual="${excerpt(entry.actualText, 120)}"`;
      if (entry.surfaceText) md += ` surface="${excerpt(entry.surfaceText, 100)}"`;
      if (entry.truthTermHits.length) md += ` truthHits=${entry.truthTermHits.join(', ')}`;
      md += '\n';
    }
    md += `\n### ScriptedText Surface-Only Exact Lexeme Preview\n\n`;
    md += `- Count: ${item.scriptedSurfaceOnlyLexemeHitCount} (baseline-known WARN area from wrapper, not new hard)\n`;
    for (const hit of item.scriptedSurfaceOnlyLexemeHitsPreview.slice(0, 8)) {
      md += `- \`${hit.variantId}\` ${hit.channel}: ${hit.hits.join(', ')} - ${hit.excerpt}\n`;
    }
    md += '\n';
  }
  md += `## Files Touched\n\n- \`tmp/qa-scripted-results/qa-scripted-s345-detector.cjs\`\n- \`tmp/qa-scripted-results/qa-scripted-s345-output.json\`\n- \`tmp/qa-scripted-results/${DATE}-S-5-summary.md\`\n\nNo ScriptedText, caseData, runtime, policy, wrapper, or TC documents were modified.\n`;
  fs.writeFileSync(path.join(OUT_DIR, `${DATE}-S-5-summary.md`), md, 'utf8');
}

function main() {
  const cases = {};
  const policies = {};
  let allRows = [];
  for (const caseId of CASE_IDS) {
    cases[caseId] = readJson(`src/data/cases/generated/${caseId}.json`);
    policies[caseId] = readJson(`src/data/disclosurePolicy/${caseId}.json`);
    allRows = allRows.concat(flattenVariants(caseId, readJson(`src/data/scriptedText/${caseId}.json`)));
  }
  const output = {
    generatedAt: new Date().toISOString(),
    head: HEAD,
    s3: runS3(allRows, cases),
    s4: scanComponents(),
    s5: runS5(cases, policies, allRows),
  };
  fs.writeFileSync(path.join(OUT_DIR, 'qa-scripted-s345-output.json'), `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  writeS3(output.s3);
  writeS4(output.s4);
  writeS5(output.s5);
  console.log(JSON.stringify({
    s3: output.s3.map((row) => ({ archetype: row.archetype, sampleSize: row.sampleSize, ratio: row.ratio, status: row.status })),
    s4: { scannedFileCount: output.s4.scannedFileCount, findingCount: output.s4.findingCount, byPriority: countBy(output.s4.findings, 'priority') },
    s5: output.s5.map((row) => ({ caseId: row.caseId, aliasCount: row.aliasCount, uiStatusCounts: row.uiStatusCounts, scriptedSurfaceOnlyLexemeHitCount: row.scriptedSurfaceOnlyLexemeHitCount })),
    reports: [
      `tmp/qa-scripted-results/${DATE}-S-3-summary.md`,
      `tmp/qa-scripted-results/${DATE}-S-4-summary.md`,
      `tmp/qa-scripted-results/${DATE}-S-5-summary.md`,
    ],
  }, null, 2));
}

main();
