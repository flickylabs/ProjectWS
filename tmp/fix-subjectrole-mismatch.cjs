// 3 사건 신규 stage cells subjectRole 미스매치 36건 자동 fix
// case data evidence.subjectParty='both'인 evidence의 b party 신규 cells subjectRole='self' → 'both'
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cases = ['spouse-01', 'family-01', 'friend-01'];

const totalSummary = [];
for (const cId of cases) {
  const casePath = path.join(ROOT, 'src/data/cases/generated/' + cId + '.json');
  const stPath = path.join(ROOT, 'src/data/scriptedText/' + cId + '.json');

  const caseData = JSON.parse(fs.readFileSync(casePath, 'utf8'));
  const stData = JSON.parse(fs.readFileSync(stPath, 'utf8'));

  const evMap = Object.fromEntries(caseData.evidence.map(e => [e.id, e.subjectParty]));

  const stageCells = stData.channels.evidence_present.entries.filter(e => {
    const dim4 = e.key.split('|')[3];
    return ['1', '2', '3', 'stage1', 'stage2', 'stage3', 'request_original', 'check_metadata', 'restore_context'].includes(dim4);
  });

  let fixed = 0;
  const fixes = [];
  for (const cell of stageCells) {
    const expectedSubjectRole = evMap[cell.evidenceId] === 'both'
      ? 'both'
      : (evMap[cell.evidenceId] === cell.party ? 'self' : 'other');
    if (cell.subjectRole !== expectedSubjectRole) {
      fixes.push({
        key: cell.key,
        evidenceId: cell.evidenceId,
        party: cell.party,
        oldRole: cell.subjectRole,
        newRole: expectedSubjectRole,
      });
      cell.subjectRole = expectedSubjectRole;
      // subjectParty 필드도 추가 (없으면)
      if (cell.subjectParty === undefined) cell.subjectParty = evMap[cell.evidenceId];
      fixed++;
    }
    // subjectParty 필드 보강 (모든 stage cells에 case data subjectParty 추가)
    if (cell.subjectParty === undefined) {
      cell.subjectParty = evMap[cell.evidenceId];
    }
  }

  // base 42 cells (subjectRole=both 등)에도 subjectParty 보강
  let baseAdded = 0;
  for (const cell of stData.channels.evidence_present.entries) {
    if (cell.subjectParty === undefined) {
      cell.subjectParty = evMap[cell.evidenceId];
      baseAdded++;
    }
  }

  // 적용
  if (process.argv.includes('--apply')) {
    fs.writeFileSync(stPath, JSON.stringify(stData, null, 2) + '\n', 'utf8');
  }

  console.log('=== ' + cId + ' ===');
  console.log('  subjectRole fix:', fixed);
  console.log('  subjectParty 필드 보강:', baseAdded);
  for (const f of fixes.slice(0, 5)) {
    console.log('   ', f.key, ': ' + f.oldRole + ' → ' + f.newRole);
  }
  if (fixes.length > 5) console.log('   ... +' + (fixes.length - 5) + '건');
  totalSummary.push({ caseId: cId, subjectRoleFixed: fixed, subjectPartyAdded: baseAdded });
}

console.log('');
if (process.argv.includes('--apply')) {
  console.log('>>> 적용 완료');
} else {
  console.log('>>> dry-run 모드. --apply 인자로 실제 적용.');
}
console.log(JSON.stringify(totalSummary, null, 2));
