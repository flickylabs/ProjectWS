/**
 * 84건 사건의 솔루션 orientation 태그 매핑 파일 생성 스크립트
 * Usage: node scripts/gen-solution-orientations.cjs
 */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../src/data/cases/generated');
const outPath = path.resolve(__dirname, '../src/data/solutionOrientations.ts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();

const principleKw = [
  '법원','소송','계약','합의서','공증','감사','감독','규정','조례','신고','고발',
  '배상','이행','집행','조정위원회','법률','전문가','감정평가','명세','내역','기록',
  '공개','투명','증빙','확인서','인수인계','정산','반환','서면','의무화','문서',
  '제한','권한','벌금','위약금','중재인','재무','배분','위반','별거','경계',
  '접근권','분리','적용','규칙','절차','공식','제도','체결','조항','명시',
  '약정','보고','감시','점검','인증','등기','공탁','변호사','조정','중재',
  '심의','감사인','회계','세무','관리','통제','제재','처분','시정','명령',
  '강제','의무','책임','배상금','손해','위자료','청구','고소','형사','민사',
  '행정','기관','위원회','센터','공적','공공','시스템','플랫폼','열람','잠금',
  '보관','상환','회수','승인','영수증','외부','후견','신탁','법적','공동열람',
  '공동승인',
];

const reconcileKw = [
  '대화','소통','사과','용서','이해','공감','양해','배려','존중','화해',
  '관계','회복','노력','약속','감정','표현','들어주','마음','함께','직접 만나',
  '솔직하게','상담','인정','진심','위로','격려','지지','동행','나누','경청',
  '수용','포용','타협','양보','조율','협의','상의','의논','협력','동의',
  '공유','참여','동반','연대','유대','친밀','애정','신뢰','믿음','기대',
  '희망','변화','성장','치유','힐링','돌봄','케어','지원','후원','봉사',
  '헌신','배려심','따뜻','온정','유지','보존','개선','향상','가까이',
  '가족회의','확인 문구','오해','재구성','교환',
];

function classify(text) {
  let pScore = 0;
  let rScore = 0;
  for (const kw of principleKw) {
    if (text.includes(kw)) pScore++;
  }
  for (const kw of reconcileKw) {
    if (text.includes(kw)) rScore++;
  }
  if (pScore === 0 && rScore === 0) return 'hybrid';
  if (pScore > 0 && rScore > 0) {
    if (pScore >= rScore * 2) return 'principle';
    if (rScore >= pScore * 2) return 'reconcile';
    return 'hybrid';
  }
  if (pScore > 0) return 'principle';
  return 'reconcile';
}

const lines = [];
let total = 0;
const counts = { principle: 0, reconcile: 0, hybrid: 0 };

for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const caseId = f.replace('.json', '');
  const solutions = data.solutions;
  for (const [category, options] of Object.entries(solutions)) {
    for (let i = 0; i < options.length; i++) {
      const tag = classify(options[i]);
      lines.push(`  ${JSON.stringify(`${caseId}::${category}::${i}`)}: ${JSON.stringify(tag)},`);
      counts[tag]++;
      total++;
    }
  }
}

console.log(`Total: ${total} entries`);
console.log(`  principle: ${counts.principle}`);
console.log(`  reconcile: ${counts.reconcile}`);
console.log(`  hybrid: ${counts.hybrid}`);

const ts = `/**
 * 솔루션 orientation 태그 매핑
 * 84건 사건의 각 솔루션 옵션에 principle/reconcile/hybrid 태그를 부여
 *
 * key: "caseId::category::optionIndex" (0-based)
 * value: 'principle' | 'reconcile' | 'hybrid'
 *
 * - principle: 규범/제도/절차 중심 해결
 * - reconcile: 관계 회복/소통/양보 중심
 * - hybrid: 원칙과 화해가 혼합
 *
 * Total: ${total} entries (${counts.principle} principle, ${counts.reconcile} reconcile, ${counts.hybrid} hybrid)
 */
export type SolutionOrientation = 'principle' | 'reconcile' | 'hybrid';

export const SOLUTION_ORIENTATIONS: Record<string, SolutionOrientation> = {
${lines.join('\n')}
};

/**
 * caseId + category + optionIndex로 orientation 조회
 */
export function getSolutionOrientation(
  caseId: string,
  category: string,
  optionIndex: number,
): SolutionOrientation {
  const key = \`\${caseId}::\${category}::\${optionIndex}\`;
  return SOLUTION_ORIENTATIONS[key] ?? 'hybrid';
}

/**
 * selectedSolution key ("category::optionText") + caseId로 orientation 조회
 * VerdictScreen에서 사용: option text로 index를 찾아 매칭
 */
export function getSolutionOrientationByText(
  caseId: string,
  category: string,
  optionText: string,
  solutions: Record<string, string[]>,
): SolutionOrientation {
  const options = solutions[category];
  if (!options) return 'hybrid';
  const idx = options.indexOf(optionText);
  if (idx === -1) return 'hybrid';
  return getSolutionOrientation(caseId, category, idx);
}
`;

fs.writeFileSync(outPath, ts, 'utf8');
console.log(`Written to ${outPath}`);
