/**
 * Thread R: 기타 5채널 일괄 리뉴얼
 * evidence_present(210) + dossier(72) + witness(27) + aftermath(10) + system_message(12) = 331
 *
 * Phase 1: 패턴 기반 자동 정화
 * Phase 2: 개별 수동 리뉴얼 (evidence_present 접두사/variant 다양화 등)
 */

const fs = require('fs');
const path = require('path');

// ============ Phase 1: 패턴 기반 자동 정화 ============

const TAIL_TEMPLATES = [
  // 3대 꼬리 템플릿 (쉼표 앞 공백 유무 모두 매칭)
  /[,.]?\s*저도 그 시점에는 이미 몰렸던 사람처럼 버티고 있었습니다\.?/g,
  /[,.]?\s*그때의 저는 이미 억울함과 손해를 한꺼번에 떠안은 상태였습니다\.?/g,
  /[,.]?\s*저 역시 그 과정에서 이미 손해와 피해를 함께 감당하고 있었습니다\.?/g,
  // evidence_present mid/late에 붙는 부가 꼬리
  /[,.]?\s*그래도 그 기록이 남긴 책임은 분명히 남습니다\.?/g,
  /[,.]?\s*그래서 저는 그 설명을 바로 믿기 어려웠습니다\.?/g,
  /[,.]?\s*그 기록이 남긴 책임까지 부정하지는 않겠습니다\.?/g,
];

const HEAD_PREFIXES = [
  // e-3 접두사
  /재판관님, 새벽 통화기록부터 먼저 보셔야 합니다만 /g,
  // e-4 접두사
  /재판관님, 학교 알림 문자부터 먼저 보셔야 합니다만 /g,
];

const TERM_FIXES = [
  // 기획 용어 "구체 금액" → 자연어 치환
  [/구체 금액 송금 영수증/g, '송금 영수증'],
  [/구체 금액 계좌 이체/g, '계좌 이체'],
  [/구체 금액/g, '큰 금액'],
  // "실행 책임" → 구어
  [/실행 책임/g, '그 선택의 책임'],
  // 오타 수정
  [/망이뜨렸습니다/g, '망가뜨렸습니다'],
  [/망이집니다/g, '망가집니다'],
  [/타가밍/g, '타이밍'],
  [/사가 /g, '사이에 '],
  [/사가$/gm, '사이에'],
  [/움직였은지/g, '움직였는지'],
  [/숨겼은지/g, '숨겼는지'],
  [/먼저였은지/g, '먼저였는지'],
  [/무너뜨렸은지/g, '무너뜨렸는지'],
  [/무너졌은지/g, '무너졌는지'],
  [/깼은지/g, '깼는지'],
  [/보냈은데/g, '보내고 나서'],
  [/갚은다고/g, '갚겠다고'],
  [/막은다고/g, '막겠다고'],
  [/뭔이 /g, '뭔가 '],
  [/잠이 두고/g, '잠깐 두고'],
  [/숨겼은지/g, '숨겼는지'],
  [/움직였은가/g, '움직였는가'],
  [/사와한/g, '사과한'],
  // 접두사 정리 후 소문자 시작 (재판관님, 뒤가 소문자인 경우)
];

function autoClean(text) {
  let t = text;

  // 1. 꼬리 템플릿 제거
  for (const pat of TAIL_TEMPLATES) {
    t = t.replace(pat, '');
  }

  // 2. 접두사 제거 → "재판관님," 재삽입
  for (const pat of HEAD_PREFIXES) {
    if (pat.test(t)) {
      t = t.replace(pat, '재판관님, ');
    }
  }

  // 3. 기획 용어 / 오타 수정
  for (const [pat, rep] of TERM_FIXES) {
    t = t.replace(pat, rep);
  }

  // 4. 정리: 이중 공백, 끝에 쉼표, 마침표 누락
  t = t.replace(/  +/g, ' ').trim();
  t = t.replace(/,\s*$/, '.');
  if (t.length > 0 && !t.endsWith('.') && !t.endsWith('다') && !t.endsWith('요') && !t.endsWith('까') && !t.endsWith('니다')) {
    // 마침표가 없는 경우 추가하지 않음 (한국어는 종결어미로 끝남)
  }
  // 문장 끝 쉼표 → 마침표
  t = t.replace(/,$/g, '.');

  return t;
}

// ============ Phase 2: 개별 수동 오버라이드 ============

const MANUAL_OVERRIDES = {
  // aftermath 오타만 수정 — 내용은 양호
  "b-primary-fault-v2": "이준호는 돌봄을 변명처럼 말하던 버릇부터 고쳐야 했습니다. 형과 조카를 챙긴 일과, 3,000만 원을 배우자 동의 없이 보낸 일은 끝내 같은 선처 안에 묶이지 않았습니다. 그날 이후 집에서는 숨긴 이유보다 누구 허락으로 돈을 움직였는가가 먼저 남았습니다.",
  "shared-fault-v2": "누가 먼저 배신했는지 묻던 싸움은, 누가 어떤 방식으로 먼저 움직였는지를 따지는 싸움으로 바뀌었습니다. 외도 오해가 걷힌 뒤에도 3,000만 원과 2,000만 원은 서로 다른 상처로 남았고, 합치면 5,000만 원이라는 숫자가 부부 사이에 조용히 눌러앉았습니다. 두 사람은 같은 탁자에 앉았지만, 먼저 사과한 쪽과 먼저 계산서를 펼친 쪽은 끝까지 같지 않았습니다.",
  "procedural-caution-v1": "판결이 끝난 뒤에도 남은 말은 단순했습니다. 공동재산은 선의만으로 혼자 움직일 수 없고, 비밀 송금은 불안만으로 정당화되지 않으며, 의심만으로 상대를 확정해 버리면 관계는 더 빨리 망가집니다. 두 사람은 각자 다르게 틀렸고, 그래서 다시는 같은 방식으로 숨기지 않겠다는 약속부터 적어야 했습니다.",

  // system_message 오타
  "verdict-profile-update-v2": "후속 결이 열립니다. 누가 무엇을 숨겼는지와 누가 무엇을 실행했는지를 따로 정리하십시오.",

  // dossier 오타
  "b-dc-1-b-q1-mid-v2": "재판관님, 숨긴 이유를 좋게 포장할 생각은 없습니다. 형과 조카 이야기부터 꺼내면 제 아내가 시댁 문제로 받아들일까 봐 피했습니다.",
  "b-dc-2-b-q1-mid-v1": "재판관님, 네, 저는 시댁 얘기가 나오면 제 아내와 다시 크게 부딪힐 걸 먼저 떠올렸습니다. 그래서 사실을 말할 타이밍을 계속 놓쳤습니다.",
  "b-dc-2-b-q1-late-v1": "재판관님, 맞습니다. 저는 제 아내가 오해하는 모습보다 시댁 얘기로 다시 터질 싸움을 더 두려워했습니다. 그래서 형과 조카 이야기를 접었고, 그 사이에 제 아내는 딴살림으로까지 받아들였습니다.",

  // b-e-6 "숨겼은지" 오타
  "b-e-6-late-v5": "재판관님, 카톡과 2,000만 원 송금 영수증은 제 아내가 왜 숨겼는지까지 보여 줍니다. 저는 그 마음을 모른 척할 수 없지만, 책임을 없앨 수도 없습니다.",

  // b-e-7-late-v4 "사가" 오타
  "b-e-7-late-v4": "재판관님, 이 통화·출입 대조표와 계좌 이동은 저희 둘의 비밀이 따로 굴러갔다는 걸 보여 줍니다. 결과적으로 5,000만 원이 둘 사이에서 신뢰와 같이 무너졌습니다.",

  // b-e-7-early-v2 "숨겼은지" 오타
  "b-e-7-early-v2": "재판관님, 그 통화·출입 대조표와 계좌 이동은 같은 사건처럼 묶이지만, 누가 먼저 숨겼는지와 누가 먼저 움직였는지는 다릅니다.",

  // b-e-5-mid-v4 "갚은다고"
  "b-e-5-mid-v4": "재판관님, 적금 해지 3,000만 원 계좌 이체를 제가 결정했습니다. 형이 곧 갚겠다고 한 말을 붙들고 있었습니다.",
};

function applyToFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  let autoChanged = 0;
  let manualChanged = 0;
  let skipped = 0;

  const channels = ['evidence_present', 'dossier', 'witness', 'aftermath', 'system_message'];

  for (const ch of channels) {
    if (!data.channels[ch]) continue;
    for (const entry of data.channels[ch].entries) {
      for (const v of entry.variants) {
        // Manual override first
        if (MANUAL_OVERRIDES[v.id]) {
          if (v.text !== MANUAL_OVERRIDES[v.id]) {
            v.text = MANUAL_OVERRIDES[v.id];
            manualChanged++;
          } else {
            skipped++;
          }
          continue;
        }

        // Auto clean
        const cleaned = autoClean(v.text);
        if (cleaned !== v.text) {
          v.text = cleaned;
          autoChanged++;
        } else {
          skipped++;
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  자동: ${autoChanged}, 수동: ${manualChanged}, 동일: ${skipped}`);
}

// 적용
const mainPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-v3-01.json');
console.log('적용:', mainPath);
applyToFile(mainPath);

const extPath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'spouse-v3-01.json');
if (fs.existsSync(extPath)) {
  console.log('external:', extPath);
  applyToFile(extPath);
}

// ============ 검사 ============
console.log('\n=== 전 채널 템플릿/오타 잔존 검사 ===');
const fd = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
const allTexts = [];
const channels = ['evidence_present', 'dossier', 'witness', 'aftermath', 'system_message'];
for (const ch of channels) {
  if (!fd.channels[ch]) continue;
  for (const e of fd.channels[ch].entries) {
    for (const v of e.variants) allTexts.push({ id: v.id, text: v.text, ch });
  }
}

const checks = [
  '저도 그 시점에는 이미 몰렸던 사람처럼',
  '그때의 저는 이미 억울함과 손해를',
  '저 역시 그 과정에서 이미 손해와 피해를',
  '그래도 그 기록이 남긴 책임은 분명히 남습니다',
  '새벽 통화기록부터 먼저 보셔야 합니다만',
  '학교 알림 문자부터 먼저 보셔야 합니다만',
  '구체 금액',
  '실행 책임',
  '망이',
  '타가밍',
  '움직였은',
  '숨겼은',
  '먼저였은',
  '무너졌은',
  '깼은',
  '갚은다',
  '뭔이',
  '사와한',
];

for (const c of checks) {
  const found = allTexts.filter(t => t.text.includes(c));
  if (found.length > 0) {
    console.log(`FAIL: "${c}" ${found.length}건`);
    found.slice(0, 2).forEach(f => console.log(`  [${f.ch}] ${f.id}: ...${f.text.substring(f.text.indexOf(c)-10, f.text.indexOf(c)+c.length+10)}...`));
  } else {
    console.log(`PASS: "${c}" 0건`);
  }
}

console.log(`\n총 variant: ${allTexts.length}`);
