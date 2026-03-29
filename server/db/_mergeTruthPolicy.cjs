/**
 * truthPolicy/witnessBudget 배치 병합 스크립트
 * 사용법: node db/_mergeTruthPolicy.cjs
 *
 * 배치 폴더의 모든 JSON을 읽어서 truthPolicy.ts와 witnessBudget.ts에 병합합니다.
 */
const fs = require('fs');
const path = require('path');

const BATCH_DIR = path.resolve(__dirname, '../../docs/ref/참고용4_확인후제거요망/리뉴얼_참고문서/truthPolicy_batches');
const TRUTH_FILE = path.resolve(__dirname, '../../src/data/truthPolicy.ts');
const WITNESS_FILE = path.resolve(__dirname, '../../src/data/witnessBudget.ts');

// 1. 배치 파일 수집
const batchFiles = fs.readdirSync(BATCH_DIR).filter(f => f.endsWith('.json')).sort();
if (batchFiles.length === 0) {
  console.log('No batch files found in', BATCH_DIR);
  process.exit(0);
}
console.log(`Found ${batchFiles.length} batch files`);

// 2. 기존 데이터 로드
function extractConst(file, varName) {
  const content = fs.readFileSync(file, 'utf-8');
  const match = content.match(new RegExp(`export const ${varName}[^=]*= ({[\\s\\S]*?})\\n\\n`));
  if (!match) {
    // 대안: 파일 끝까지
    const match2 = content.match(new RegExp(`export const ${varName}[^=]*= ({[\\s\\S]*})`));
    if (match2) return JSON.parse(match2[1]);
    return {};
  }
  return JSON.parse(match[1]);
}

let truthPolicies = {};
let witnessBudgets = {};

try { truthPolicies = extractConst(TRUTH_FILE, 'TRUTH_POLICIES'); } catch (e) { console.warn('Failed to parse existing truthPolicy:', e.message); }
try { witnessBudgets = extractConst(WITNESS_FILE, 'WITNESS_BUDGETS'); } catch (e) { console.warn('Failed to parse existing witnessBudget:', e.message); }

console.log(`Existing: ${Object.keys(truthPolicies).length} truthPolicies, ${Object.keys(witnessBudgets).length} witnessBudgets`);

// 3. 배치 병합
let newTP = 0, newWB = 0;
for (const file of batchFiles) {
  const batch = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, file), 'utf-8'));

  if (batch.truthPolicies) {
    for (const [key, val] of Object.entries(batch.truthPolicies)) {
      truthPolicies[key] = val;
      newTP++;
    }
  }
  if (batch.witnessBudgets) {
    for (const [key, val] of Object.entries(batch.witnessBudgets)) {
      witnessBudgets[key] = val;
      newWB++;
    }
  }
  console.log(`  Merged: ${file}`);
}

console.log(`After merge: ${Object.keys(truthPolicies).length} truthPolicies (+${newTP}), ${Object.keys(witnessBudgets).length} witnessBudgets (+${newWB})`);

// 4. truthPolicy.ts 재생성
// states_full만 추출 (TRUTH_POLICIES 형식)
const tpData = {};
for (const [caseKey, parties] of Object.entries(truthPolicies)) {
  tpData[caseKey] = {};
  for (const [party, disputes] of Object.entries(parties)) {
    tpData[caseKey][party] = {};
    for (const [dId, d] of Object.entries(disputes)) {
      tpData[caseKey][party][dId] = d.states_full || d;
    }
  }
}

let tpOut = `/**\n * 사건별 진실 공개 정책 (truthPolicy)\n * 자동 생성 — ${Object.keys(tpData).length}개 사건\n */\n\n`;
tpOut += `export interface TruthPolicyEntry {\n  allowed: string[]\n  forbidden: string[]\n}\n\n`;
tpOut += `export type LieStateKey = "S0" | "S1" | "S2" | "S3" | "S4" | "S5"\n\n`;
tpOut += `export const TRUTH_POLICIES: Record<string, Record<string, Record<string, Record<LieStateKey, TruthPolicyEntry>>>> = ${JSON.stringify(tpData, null, 2)}\n\n`;
tpOut += `export function getFallbackPolicy(\n  allTruthIds: string[],\n  anchorTruthIds: string[],\n  lieState: LieStateKey,\n): TruthPolicyEntry {\n`;
tpOut += `  const stateNum = parseInt(lieState.slice(1))\n`;
tpOut += `  if (stateNum <= 1) return { allowed: [], forbidden: [...allTruthIds] }\n`;
tpOut += `  if (stateNum <= 3) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }\n`;
tpOut += `  if (stateNum === 4) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }\n`;
tpOut += `  return { allowed: [...allTruthIds], forbidden: [] }\n`;
tpOut += `}\n`;

fs.writeFileSync(TRUTH_FILE, tpOut, 'utf-8');
console.log(`Written: ${TRUTH_FILE}`);

// 5. witnessBudget.ts 재생성
let wbOut = `/**\n * 증인별 증언 범위 예산 (witnessBudget)\n * 자동 생성 — ${Object.keys(witnessBudgets).length}개 사건\n */\n\n`;
wbOut += `export interface WitnessBudgetEntry {\n  canState: string[]\n  uncertain: string[]\n  forbidden: string[]\n}\n\n`;
wbOut += `export const WITNESS_BUDGETS: Record<string, Record<string, WitnessBudgetEntry>> = ${JSON.stringify(witnessBudgets, null, 2)}\n`;

fs.writeFileSync(WITNESS_FILE, wbOut, 'utf-8');
console.log(`Written: ${WITNESS_FILE}`);

console.log('\nDone! Run `npx tsc --noEmit` to verify.');
