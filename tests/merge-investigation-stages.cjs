/**
 * Merge Thread A investigationStages into case JSON files.
 *
 * Thread A output: docs/ref/리뉴얼참고/thread-packages/thread-A/output/*.json
 * Target: src/data/cases/generated/{case}.json -> evidence[].investigationStages
 *
 * Skips -01 cases (already have investigationStages).
 * Overwrites existing investigationStages if present.
 */

const fs = require('fs');
const path = require('path');

const STAGES_DIR = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'thread-packages', 'thread-A', 'output');
const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated');

// ── Step 1: Load all stages data from Thread A output ──

function loadAllStages() {
  const files = fs.readdirSync(STAGES_DIR).filter(f => f.endsWith('.json'));
  const stagesMap = new Map(); // caseName -> { "e-1": [...], "e-2": [...], ... }

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(STAGES_DIR, file), 'utf8'));
    const items = Array.isArray(raw) ? raw : [raw];

    for (const item of items) {
      const caseName = normalizeCaseName(item.case);
      if (!caseName) {
        console.warn(`[WARN] Cannot normalize case name: "${item.case}" in ${file}`);
        continue;
      }
      stagesMap.set(caseName, item.evidenceStages);
    }
  }

  return stagesMap;
}

/**
 * Normalize case name from Thread A output to match case JSON filenames.
 * Thread A uses mixed naming:
 *   - "family-02" (short form)
 *   - "case-friend-03" (caseId form)
 *   - "case-partner-05" (caseId for partnership)
 *   - "case-work-04" (caseId for workplace)
 *
 * We normalize all to the filename form: "family-02", "friend-03", "partnership-05", "workplace-04"
 */
function normalizeCaseName(raw) {
  let name = raw;

  // Strip "case-" prefix if present
  if (name.startsWith('case-')) {
    name = name.slice(5);
  }

  // Map abbreviated category names to full filename forms
  // partner -> partnership, work -> workplace
  if (name.startsWith('partner-') && !name.startsWith('partnership-')) {
    name = 'partnership-' + name.slice('partner-'.length);
  }
  if (name.startsWith('work-') && !name.startsWith('workplace-')) {
    name = 'workplace-' + name.slice('work-'.length);
  }

  return name;
}

// ── Step 2: Merge into case JSONs ──

function mergeStagesToCases(stagesMap) {
  const caseFiles = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort();
  let mergedCount = 0;
  let skippedCount = 0;
  let missingCount = 0;
  const missing = [];
  const merged = [];

  for (const caseFile of caseFiles) {
    const caseName = caseFile.replace('.json', '');

    // Skip -01 cases
    if (caseName.endsWith('-01')) {
      skippedCount++;
      continue;
    }

    const stages = stagesMap.get(caseName);
    if (!stages) {
      missingCount++;
      missing.push(caseName);
      continue;
    }

    const caseFilePath = path.join(CASES_DIR, caseFile);
    const caseData = JSON.parse(fs.readFileSync(caseFilePath, 'utf8'));

    if (!caseData.evidence || !Array.isArray(caseData.evidence)) {
      console.warn(`[WARN] No evidence array in ${caseFile}`);
      continue;
    }

    let evidenceMerged = 0;
    for (const ev of caseData.evidence) {
      const stageData = stages[ev.id];
      if (stageData) {
        ev.investigationStages = stageData;
        evidenceMerged++;
      } else {
        console.warn(`[WARN] No stages for ${caseName} evidence ${ev.id}`);
      }
    }

    // Write back with 2-space indent
    fs.writeFileSync(caseFilePath, JSON.stringify(caseData, null, 2) + '\n', 'utf8');
    mergedCount++;
    merged.push(`${caseName} (${evidenceMerged} evidences)`);
  }

  return { mergedCount, skippedCount, missingCount, missing, merged };
}

// ── Step 3: Validate ──

function validate() {
  const caseFiles = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort();
  let totalEvidence = 0;
  let withStages = 0;
  let withoutStages = 0;
  const issues = [];

  for (const caseFile of caseFiles) {
    const caseName = caseFile.replace('.json', '');
    const caseData = JSON.parse(fs.readFileSync(path.join(CASES_DIR, caseFile), 'utf8'));

    if (!caseData.evidence) continue;

    for (const ev of caseData.evidence) {
      totalEvidence++;
      if (ev.investigationStages && Array.isArray(ev.investigationStages)) {
        withStages++;
        // Check completeness: should have stages 0, 1, 2
        const stageNums = ev.investigationStages.map(s => s.stage).sort();
        if (stageNums.length !== 3 || stageNums[0] !== 0 || stageNums[1] !== 1 || stageNums[2] !== 2) {
          issues.push(`${caseName} ${ev.id}: incomplete stages [${stageNums.join(',')}]`);
        }
      } else {
        withoutStages++;
        issues.push(`${caseName} ${ev.id}: MISSING investigationStages`);
      }
    }
  }

  return { totalEvidence, withStages, withoutStages, issues };
}

// ── Main ──

console.log('=== Loading Thread A stages data ===');
const stagesMap = loadAllStages();
console.log(`Loaded stages for ${stagesMap.size} cases`);
console.log('Cases:', [...stagesMap.keys()].sort().join(', '));

console.log('\n=== Merging into case JSONs (skipping -01) ===');
const result = mergeStagesToCases(stagesMap);
console.log(`Merged: ${result.mergedCount}`);
console.log(`Skipped (-01): ${result.skippedCount}`);
if (result.missingCount > 0) {
  console.log(`Missing stages: ${result.missingCount}`);
  console.log('  ', result.missing.join(', '));
}

console.log('\n=== Validation ===');
const val = validate();
console.log(`Total evidence: ${val.totalEvidence}`);
console.log(`With stages: ${val.withStages}`);
console.log(`Without stages: ${val.withoutStages}`);
if (val.issues.length > 0) {
  console.log(`Issues (${val.issues.length}):`);
  val.issues.forEach(i => console.log('  ', i));
} else {
  console.log('All evidence has complete 3-stage investigationStages!');
}
