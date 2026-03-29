const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. emojiMap 파싱
const emojiSrc = fs.readFileSync(path.resolve(__dirname, '../../src/components/common/Emoji.tsx'), 'utf-8');
const emojiMap = {};
const entries = emojiSrc.matchAll(/"([^"]+)":\s*"([^"]+\.png)"/g);
for (const e of entries) emojiMap[e[1]] = e[2];

// 2. 실제 파일
const emojiDir = path.resolve(__dirname, '../../public/emoji');
const emojiFiles = new Set(fs.readdirSync(emojiDir));

// 3. 코드에서 Emoji char= 사용
const grepResult = execSync('grep -roh \'Emoji char="[^"]*"\' src/ || true', { cwd: path.resolve(__dirname, '../..'), encoding: 'utf-8' });
const usedInCode = new Set();
grepResult.split('\n').forEach(line => {
  const m = line.match(/char="([^"]+)"/);
  if (m) usedInCode.add(m[1]);
});

// 시스템 메시지에서 직접 사용하는 이모지도 검색
const sysGrep = execSync("grep -roh '[📋📢📨🔍⚡⚖️💡💬📄🏆🎯⭐🔒🔓🔄✅❓⚠️🚧🛠✕✗✓👑📊📂📌📍📤👥🏠✍️⚔️👈👉]' src/ || true", { cwd: path.resolve(__dirname, '../..'), encoding: 'utf-8' });
sysGrep.split('\n').filter(Boolean).forEach(e => usedInCode.add(e.trim()));

console.log(`emojiMap: ${Object.keys(emojiMap).length}개`);
console.log(`실제 파일: ${emojiFiles.size}개`);
console.log(`코드 사용: ${usedInCode.size}개`);

// 4. 매핑O 파일X
console.log('\n=== 매핑O 파일X (깨지는 이모지) ===');
let broken = 0;
for (const [emoji, file] of Object.entries(emojiMap)) {
  if (!emojiFiles.has(file)) { console.log(`  ${emoji} → ${file}`); broken++; }
}
if (!broken) console.log('  없음 ✅');

// 5. 코드사용O 매핑X
console.log('\n=== 코드사용O 매핑X (텍스트 폴백) ===');
let fallback = 0;
for (const e of usedInCode) {
  if (!emojiMap[e]) { console.log(`  "${e}"`); fallback++; }
}
if (!fallback) console.log('  없음 ✅');
else console.log(`  총 ${fallback}개 텍스트 폴백`);

// 6. 파일O 매핑X (미사용)
const mapFiles = new Set(Object.values(emojiMap));
let unused = 0;
for (const f of emojiFiles) {
  if (!mapFiles.has(f)) { unused++; }
}
console.log(`\n미사용 파일: ${unused}개`);
