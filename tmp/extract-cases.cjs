const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

for (const c of ['family-01', 'friend-01']) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/cases/generated', c + '.json'), 'utf8'));
  console.log('='.repeat(60));
  console.log(`## ${c}`);
  console.log(`  title: ${d.meta?.title}`);
  console.log(`  anchorTruth: ${(d.meta?.anchorTruth || '').slice(0, 200)}...`);

  const disputes = d.disputes || [];
  console.log(`  disputes: ${disputes.length}`);
  for (const dp of disputes) {
    console.log(`    - ${dp.id}: ${(dp.label || dp.surface || dp.name || '').slice(0, 80)}`);
  }

  const evs = d.evidences || [];
  console.log(`  evidences: ${evs.length}`);
  for (const ev of evs) {
    console.log(`    - ${ev.id} (${(ev.name || '').slice(0, 30)}): subjectParty=${ev.subjectParty || '?'}, requiredLieState=${ev.requiredLieState || '-'}`);
  }

  // dossier
  const dcRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/claimPolicies', c + '-dossier-cards.json'), 'utf8'));
  const cards = Array.isArray(dcRaw) ? dcRaw : (dcRaw.dossierCards || []);
  console.log(`  dossierCards: ${cards.length}`);
  for (const cd of cards) {
    console.log(`    - ${cd.id} (${(cd.name || '').slice(0, 30)}): ev=${JSON.stringify(cd.evidenceIds || [])}, rd=${JSON.stringify(cd.relatedDisputes || [])}, sp=${cd.subjectParty || '?'}`);
    for (const ch of (cd.challenges || [])) {
      for (const q of (ch.questions || [])) {
        console.log(`      q: ${q.id} target=${ch.targetParty} reqLS=${q.requiredLieState || '-'}`);
      }
    }
  }

  // witnesses
  const sg = d.duo?.socialGraph || [];
  console.log(`  witnesses: ${sg.length}`);
  for (const w of sg) {
    const wp = w.witnessProfile || {};
    console.log(`    - ${w.id} ${w.name || '?'} (bias=${w.bias}, sentA=${wp.sentimentToA || 0}, sentB=${wp.sentimentToB || 0})`);
    console.log(`      addressA="${wp.addressA || ''}", addressB="${wp.addressB || ''}", hidden="${(wp.hiddenAgenda || '').slice(0,50)}"`);
    console.log(`      relatedDisputes=${JSON.stringify(w.relatedDisputeIds || [])}, unlockedByDossier=${JSON.stringify(w.unlockedByDossier || [])}`);
  }

  // ScriptedText current state
  const st = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText', c + '.json'), 'utf8'));
  console.log(`  ScriptedText 현재 상태:`);
  for (const [ch, body] of Object.entries(st.channels || {})) {
    if (body?.entries) {
      const v = body.entries.reduce((s, e) => s + (e.variants?.length || 0), 0);
      console.log(`    ${ch}: ${body.entries.length} cells / ${v} variants`);
    }
  }
  console.log('');
}
