const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01'];
const SURFACE_ONLY_CHANNELS = [
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'system_message',
  'dossier',
];
const S1_SCOPE_CHANNELS = ['judge_question', 'interrogation'];
const EARLY_STATES = new Set(['S0', 'S1', 'S2']);

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function readText(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function walkFiles(dir, predicate, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, name.name);
    if (name.isDirectory()) walkFiles(abs, predicate, out);
    else if (predicate(abs)) out.push(abs);
  }
  return out;
}

function oneLine(s) {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}

function excerpt(s, needle) {
  const text = oneLine(s);
  const idx = needle ? text.indexOf(needle) : -1;
  const at = idx >= 0 ? idx : 0;
  const start = Math.max(0, at - 45);
  const end = Math.min(text.length, at + 95);
  return `${start > 0 ? '...' : ''}${text.slice(start, end)}${end < text.length ? '...' : ''}`;
}

function flattenPolicyLexemes(policy) {
  const out = new Set();
  const add = (v) => {
    if (typeof v === 'string' && v.trim()) out.add(v.trim());
    else if (Array.isArray(v)) v.forEach(add);
    else if (v && typeof v === 'object') Object.values(v).forEach(add);
  };
  add(policy.forbiddenLexemes?.globalTruthLexemes);
  add(policy.forbiddenLexemes?.surfaceOnlyChannels);
  add(policy.forbiddenLexemes?.nonConfessionNpcBeforeS5);
  return [...out].sort((a, b) => b.length - a.length);
}

function flattenVariants(caseId, scripted) {
  const rows = [];
  for (const [channel, block] of Object.entries(scripted.channels ?? {})) {
    const entries = Array.isArray(block.entries) ? block.entries : [];
    for (const entry of entries) {
      for (const variant of entry.variants ?? []) {
        const tags = Array.isArray(variant.tags) ? variant.tags : [];
        const speakerTag = tags.find((t) => /^speaker:/.test(t));
        const speaker = entry.party ?? speakerTag?.split(':')[1] ?? null;
        rows.push({
          caseId,
          channel,
          entryKey: entry.key,
          variantId: variant.id,
          lieState: entry.lieState ?? null,
          party: entry.party ?? null,
          speaker,
          text: variant.text ?? '',
          behaviorHint: variant.behaviorHint ?? '',
          entry,
          variant,
        });
      }
    }
  }
  return rows;
}

function stratifiedSample(rows, max) {
  if (rows.length <= max) return rows;
  const groups = new Map();
  for (const row of rows) {
    const key = `${row.caseId}:${row.channel}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const result = [];
  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  let remaining = max;
  let remainingRows = rows.length;
  for (let i = 0; i < sortedGroups.length; i += 1) {
    const [, group] = sortedGroups[i];
    const quota = i === sortedGroups.length - 1
      ? remaining
      : Math.max(1, Math.round((group.length / remainingRows) * remaining));
    const take = Math.min(quota, group.length, remaining);
    const step = group.length / take;
    for (let j = 0; j < take; j += 1) {
      result.push(group[Math.floor(j * step)]);
    }
    remaining -= take;
    remainingRows -= group.length;
  }
  return result.slice(0, max);
}

function rx(source, flags = 'u') {
  return new RegExp(source, flags);
}

const SEMANTIC_DIMS = [
  {
    id: 'D1-family-private',
    label: '가족/관계 비밀 우회',
    patterns: [
      rx('집안\\s*쪽\\s*사정'),
      rx('가족\\s*(문제|일|사정|쪽)'),
      rx('친가|시댁|부모|아버지|어머니|동생|아이|학생|학교\\s*알림'),
      rx('말하기\\s*어려운\\s*(집안|가족|개인)'),
    ],
  },
  {
    id: 'D2-care-support',
    label: '돌봄/지원/부양 우회',
    patterns: [
      rx('챙기|돌보|살피|부양|간병|양육'),
      rx('도와|돕|지원|보태|생활비|학용품|교재|병원비'),
      rx('누군가를\\s*(맡|돌|챙)'),
    ],
  },
  {
    id: 'D3-hidden-money',
    label: '비밀 금전/채무/사기 우회',
    patterns: [
      rx('빚|채무|사기|갈취|횡령|비자금|차명'),
      rx('몰래\\s*(돈|송금|보낸|받은|빼낸)'),
      rx('돈을\\s*(받|보내|빼|숨기|빌리|갚)'),
      rx('출처|사용처|실제\\s*돈|현금\\s*흐름'),
    ],
  },
  {
    id: 'D4-document-tamper',
    label: '문서 조작/비율 변경 우회',
    patterns: [
      rx('조작|위조|위임|서명|날인|공증|원본'),
      rx('비율|60\\s*[:대]?\\s*40|90\\s*[:대]?\\s*10|바꿔|고쳐|수정'),
      rx('문서\\s*(처리|변경|작성)\\s*(경위|이유|방향)'),
    ],
  },
  {
    id: 'D5-first-contact',
    label: '선접촉/지시/요구 우회',
    patterns: [
      rx('먼저\\s*(연락|말|접근|찾|보낸)'),
      rx('연락\\s*(순서|시점|흐름|기록)'),
      rx('지시|요구|시켰|불러|찾아갔'),
    ],
  },
  {
    id: 'D6-identity-secret',
    label: '정체성/혈연 비밀 우회',
    patterns: [
      rx('정체성|출생|혈연|친자|가족관계'),
      rx('아버지(?:가|는)?\\s*아니|부친|아빠가\\s*아니'),
      rx('감춰진\\s*(이유|사정|기록)|오래\\s*숨긴'),
    ],
  },
  {
    id: 'D7-repeat-pattern',
    label: '과거 패턴 반복 우회',
    patterns: [
      rx('같은\\s*(방식|흐름|구조|말|문장)'),
      rx('패턴|반복|되풀이|예전에도|전에도|과거에도|그때와'),
      rx('손절|끊어진\\s*이유|다시\\s*보인다'),
    ],
  },
  {
    id: 'D8-specific-truth-bridge',
    label: 'surface 너머 특정 사실 연결',
    patterns: [
      rx('그\\s*안에\\s*누가|누가\\s*있었'),
      rx('한\\s*사실|숨은\\s*사실|진짜\\s*(이유|주체|목적)'),
      rx('실제\\s*(출처|주체|상대|책임)|뒤에\\s*(있는|있던)'),
    ],
  },
  {
    id: 'D9-confession-coverup',
    label: '자백/은폐 책임 우회',
    patterns: [
      rx('인정|고백|자백|실토|털어놓'),
      rx('숨겼|감췄|말하지\\s*않|입을\\s*닫|덮어'),
      rx('알고\\s*있었|책임|잘못|벌어진\\s*이유'),
    ],
  },
];

const ARCHETYPE_METRICS = {
  victim_cosplay: {
    metric: '단정/피해 서사 지표',
    pass: (ratio) => ratio >= 0.7,
    direction: '>= 70%',
    patterns: [rx('이미|분명|확실|답을\\s*알|아니었|아닙니다|맞습니다|상처|억울|참았|배신|끝났|명백')],
  },
  avoidant: {
    metric: '모호/회피어 지표',
    pass: (ratio) => ratio >= 0.5,
    direction: '>= 50%',
    patterns: [rx('좀|그냥|복잡|말하기|사정|아직|모르|어렵|그\\s*일|그게|정확히|그런|일단|피하|넘어가|닫았')],
    sampleFilter: (row) => EARLY_STATES.has(row.lieState),
  },
  affect_flattening: {
    metric: '격앙어 지표',
    pass: (ratio) => ratio <= 0.1,
    direction: '<= 10%',
    patterns: [rx('!|왜|말도\\s*안|화가|분노|억울|소리|웃기|미쳤|절대|도대체|그만|아니잖|뭐가')],
  },
  confrontational: {
    metric: '직접 공격 지표',
    pass: (ratio) => ratio >= 0.25,
    direction: '>= 25% 참고 기준',
    patterns: [rx('왜|당신|그쪽|말도\\s*안|책임|거짓|아니잖|뭘|누가|해놓고|몰아|감히|틀렸')],
  },
  premature_summary: {
    metric: '결론 점프 지표',
    pass: (ratio) => ratio >= 0.25,
    direction: '>= 25% 참고 기준',
    patterns: [rx('결국|그러니까|그래서|답은|이미|분명|끝났|확실|정리|딱|한마디|결론|그\\s*말은')],
  },
  cold_logic: {
    metric: '숫자/기록/순서 지표',
    pass: (ratio) => ratio >= 0.35,
    direction: '>= 35% 참고 기준',
    patterns: [rx('숫자|기록|순서|표|계산|비율|시간|정확|자료|근거|논리')],
  },
};

function hasAnyPattern(text, patterns) {
  return patterns.find((pattern) => pattern.test(text));
}

function runS1(scriptedRowsByCase, policies) {
  const scoped = [];
  for (const rows of Object.values(scriptedRowsByCase)) {
    for (const row of rows) {
      if (row.channel === 'judge_question') scoped.push(row);
      if (row.channel === 'interrogation' && EARLY_STATES.has(row.lieState)) scoped.push(row);
    }
  }
  const sample = stratifiedSample(scoped, 1000);
  const candidates = [];
  const exactInSample = [];
  const dimHits = Object.fromEntries(SEMANTIC_DIMS.map((d) => [d.id, 0]));
  const caseCounts = {};
  const channelCounts = {};
  for (const row of sample) {
    caseCounts[row.caseId] = (caseCounts[row.caseId] ?? 0) + 1;
    channelCounts[row.channel] = (channelCounts[row.channel] ?? 0) + 1;
    const exactLexemes = policies[row.caseId].lexemes.filter((lex) => row.text.includes(lex) || row.behaviorHint.includes(lex));
    if (exactLexemes.length) {
      exactInSample.push({
        caseId: row.caseId,
        channel: row.channel,
        variantId: row.variantId,
        lieState: row.lieState,
        lexemes: exactLexemes.slice(0, 5),
      });
      continue;
    }
    for (const field of ['text', 'behaviorHint']) {
      const value = row[field] ?? '';
      if (!value) continue;
      for (const dim of SEMANTIC_DIMS) {
        const matched = hasAnyPattern(value, dim.patterns);
        if (!matched) continue;
        dimHits[dim.id] += 1;
        candidates.push({
          caseId: row.caseId,
          channel: row.channel,
          variantId: row.variantId,
          entryKey: row.entryKey,
          lieState: row.lieState,
          party: row.party,
          field,
          dimension: dim.id,
          dimensionLabel: dim.label,
          pattern: matched.source,
          excerpt: excerpt(value),
        });
      }
    }
  }
  return {
    scopedTotal: scoped.length,
    sampleSize: sample.length,
    caseCounts,
    channelCounts,
    exactInSampleCount: exactInSample.length,
    exactInSamplePreview: exactInSample.slice(0, 15),
    dimensionHits: dimHits,
    candidateCount: candidates.length,
    candidates,
  };
}

function rowParty(row) {
  if (row.party === 'a' || row.party === 'b') return row.party;
  if (row.speaker === 'a' || row.speaker === 'b') return row.speaker;
  if (row.entry?.targetParty === 'a' || row.entry?.targetParty === 'b') return row.entry.targetParty;
  return null;
}

function runS3(scriptedRowsByCase, cases) {
  const results = [];
  const npcChannels = new Set([
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
  for (const caseId of CASE_IDS) {
    const caseData = cases[caseId];
    const parties = [
      ['a', caseData.duo.partyA],
      ['b', caseData.duo.partyB],
    ];
    for (const [party, profile] of parties) {
      const archetype = profile.archetype;
      const metric = ARCHETYPE_METRICS[archetype] ?? ARCHETYPE_METRICS.cold_logic;
      let rows = scriptedRowsByCase[caseId]
        .filter((row) => npcChannels.has(row.channel))
        .filter((row) => rowParty(row) === party);
      if (metric.sampleFilter) rows = rows.filter(metric.sampleFilter);
      const sample = stratifiedSample(rows, 100);
      const hitRows = sample.filter((row) => metric.patterns.some((pattern) => pattern.test(`${row.text} ${row.behaviorHint}`)));
      const ratio = sample.length ? hitRows.length / sample.length : 0;
      results.push({
        caseId,
        party,
        name: profile.name,
        archetype,
        metric: metric.metric,
        expected: metric.direction,
        sampleSize: sample.length,
        sourceTotal: rows.length,
        hitCount: hitRows.length,
        ratio: Number(ratio.toFixed(3)),
        pass: metric.pass(ratio),
        examples: hitRows.slice(0, 8).map((row) => ({
          channel: row.channel,
          variantId: row.variantId,
          lieState: row.lieState,
          excerpt: excerpt(row.text),
        })),
      });
    }
  }
  return results;
}

function runS4() {
  const componentDir = path.join(ROOT, 'src/components');
  const files = walkFiles(componentDir, (file) => /\.(tsx?|jsx?)$/.test(file));
  const findings = [];
  const addMatches = (file, regex, tc, priority, reason) => {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        findings.push({
          tc,
          priority,
          path: rel,
          line: idx + 1,
          reason,
          code: line.trim(),
        });
      }
    });
  };
  for (const file of files) {
    addMatches(
      file,
      /\b(?:ev|evidence|evDef|selectedEvidence)\.name\b/,
      'TC-G1',
      'P1',
      'evidence.name 렌더/대화/컨텍스트 사용 후보. surfaceName 우선 정책과 충돌 가능.'
    );
    addMatches(
      file,
      /\b(?:ev|evidence|evDef|selectedEvidence)\.description\b/,
      'TC-G1',
      'P1',
      'evidence.description 사용 후보. surfaceDescription 우선 정책과 충돌 가능.'
    );
    addMatches(
      file,
      /\bcard\.name\b/,
      'TC-G2',
      'P1',
      'dossier card name 렌더/대화 후보. uiSurfaceMap 추상화 적용 여부 확인 필요.'
    );
    addMatches(
      file,
      /profile\.archetype|duo\.party[AB]\.archetype/,
      'TC-B2/TC-G5',
      'P1',
      'archetype 코드가 매핑 누락 시 UI에 영문 코드로 fallback될 가능성.'
    );
    addMatches(
      file,
      /['"`](?:A|B|당사자 A|당사자 B)['"`]/,
      'TC-G3',
      'P2',
      'A/B fallback 문자열. caseData 부재 상태에서 UI 노출 가능성 확인 필요.'
    );
  }
  const keyFindings = findings.filter((finding) => {
    if (finding.tc === 'TC-G3' && /speaker === 'a'|speaker === 'b'|party === 'a'|party === 'b'|case 'a'|case 'b'/.test(finding.code)) {
      return false;
    }
    return true;
  });
  return {
    scannedFiles: files.length,
    rawFindingCount: findings.length,
    findingCount: keyFindings.length,
    findings: keyFindings.slice(0, 120),
  };
}

function getCaseEvidence(caseData, id) {
  if (Array.isArray(caseData.evidence)) return caseData.evidence.find((ev) => ev.id === id);
  return caseData.evidence?.[id];
}

function getAtPath(root, expr) {
  const parts = [];
  for (const part of expr.split('.')) {
    const bracket = /^(.+)\[(\d+)\]$/.exec(part);
    if (bracket) {
      parts.push(bracket[1], Number(bracket[2]));
    } else {
      parts.push(part);
    }
  }
  let cur = root;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

function policyUiEntries(policy) {
  const raw = policy.uiSurfaceMap?.entries;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((entry) => ({ ...entry, path: entry.path }));
  return Object.entries(raw).map(([entryPath, entry]) => ({ ...entry, path: entryPath }));
}

function runS5(policies, cases) {
  const caseResults = [];
  for (const caseId of CASE_IDS) {
    const policy = policies[caseId].data;
    const caseData = cases[caseId];
    const aliasMismatches = [];
    for (const [evidenceId, mapped] of Object.entries(policy.surfaceMap?.evidence ?? {})) {
      const actual = getCaseEvidence(caseData, evidenceId);
      if (!actual) {
        aliasMismatches.push({ evidenceId, issue: 'missing-case-evidence', policySurface: mapped.surfaceName });
      } else if (actual.surfaceName !== mapped.surfaceName) {
        aliasMismatches.push({
          evidenceId,
          issue: 'surfaceName-alias',
          policySurface: mapped.surfaceName,
          caseSurface: actual.surfaceName,
        });
      }
    }
    const entries = policyUiEntries(policy);
    const unresolved = [];
    const mismatchedCurrent = [];
    const missingSurface = [];
    const highExposure = [];
    for (const entry of entries) {
      const expected = entry.currentText ?? entry.sourceText;
      const actual = getAtPath(caseData, entry.path);
      if (actual === undefined) {
        unresolved.push({ path: entry.path, expected: oneLine(expected), exposure: entry.exposure });
      } else if (typeof actual === 'string' && expected && actual !== expected) {
        mismatchedCurrent.push({
          path: entry.path,
          expected: oneLine(expected),
          actual: oneLine(actual),
          exposure: entry.exposure,
        });
      }
      if (!entry.surfaceText) missingSurface.push({ path: entry.path, exposure: entry.exposure });
      if (String(entry.exposure ?? '').includes('high')) {
        highExposure.push({ path: entry.path, exposure: entry.exposure, surfaceText: oneLine(entry.surfaceText) });
      }
    }
    caseResults.push({
      caseId,
      evidenceMapped: Object.keys(policy.surfaceMap?.evidence ?? {}).length,
      aliasMismatchCount: aliasMismatches.length,
      aliasMismatches,
      uiEntryCount: entries.length,
      unresolvedCount: unresolved.length,
      unresolved: unresolved.slice(0, 20),
      currentMismatchCount: mismatchedCurrent.length,
      mismatchedCurrent: mismatchedCurrent.slice(0, 20),
      missingSurfaceCount: missingSurface.length,
      missingSurface: missingSurface.slice(0, 20),
      highExposureCount: highExposure.length,
      highExposure: highExposure.slice(0, 20),
    });
  }
  return caseResults;
}

function main() {
  const policies = {};
  const cases = {};
  const scriptedRowsByCase = {};
  for (const caseId of CASE_IDS) {
    const policy = readJson(`src/data/disclosurePolicy/${caseId}.json`);
    policies[caseId] = { data: policy, lexemes: flattenPolicyLexemes(policy) };
    cases[caseId] = readJson(`src/data/cases/generated/${caseId}.json`);
    scriptedRowsByCase[caseId] = flattenVariants(caseId, readJson(`src/data/scriptedText/${caseId}.json`));
  }
  const result = {
    generatedAt: new Date().toISOString(),
    head: process.env.QA_HEAD ?? null,
    s1: runS1(scriptedRowsByCase, policies),
    s3: runS3(scriptedRowsByCase, cases),
    s4: runS4(),
    s5: runS5(policies, cases),
  };
  const out = path.join(ROOT, 'tmp/qa-scripted-results/qa-scripted-detector-output.json');
  fs.writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    s1: {
      scopedTotal: result.s1.scopedTotal,
      sampleSize: result.s1.sampleSize,
      candidateCount: result.s1.candidateCount,
      dimensionHits: result.s1.dimensionHits,
    },
    s3: result.s3.map((r) => ({ caseId: r.caseId, name: r.name, archetype: r.archetype, ratio: r.ratio, pass: r.pass })),
    s4: {
      scannedFiles: result.s4.scannedFiles,
      findingCount: result.s4.findingCount,
    },
    s5: result.s5.map((r) => ({
      caseId: r.caseId,
      aliasMismatchCount: r.aliasMismatchCount,
      uiEntryCount: r.uiEntryCount,
      unresolvedCount: r.unresolvedCount,
      currentMismatchCount: r.currentMismatchCount,
      highExposureCount: r.highExposureCount,
    })),
    output: 'tmp/qa-scripted-results/qa-scripted-detector-output.json',
  }, null, 2));
}

main();
