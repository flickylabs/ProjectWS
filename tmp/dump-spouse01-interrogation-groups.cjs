const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json');
const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const keys = process.argv.slice(2);

if (keys.length === 0) {
  console.error('usage: node dump-spouse01-interrogation-groups.cjs <entry-key> [...]');
  process.exit(1);
}

const entries = bundle.channels.interrogation.entries;
for (const key of keys) {
  const entry = entries.find((item) => item.key === key);
  if (!entry) {
    console.log(`## ${key}`);
    console.log('(missing)');
    continue;
  }
  console.log(`## ${entry.key}`);
  for (const variant of entry.variants) {
    console.log(`${variant.id}\t${variant.text}`);
  }
}
