# Current Case / Generator Status (2026-04-08)

## 0. Reading Guide
- `generator-pass`: current staged generator path exists and validator PASS is reproducible.
- `legacy-pass`: validator PASS exists, but common generator path is not yet the source of truth.
- `partial`: files or drafts exist, but generator path is not complete or validator is not clean.
- `planned`: designed or selected, but not yet run through current generator.

## 1. Generator-Pass Cases
- `headline-01`
  - runtime: `src/data/cases/generated/headline-01.json`
  - scripted: `src/data/scriptedText/headline-01.json`
  - runtime template validate: `tmp/headline-01-runtime-template-validate.txt`
  - scripted template validate: `tmp/headline-01-scripted-template-validate.txt`
  - semantic validate: `tmp/headline-01-semantic-validate.txt` (`WARN 200`)
  - validate: `tmp/headline-01-stage3-validate.txt`
  - status: generator-pass
- `headline-02`
  - runtime: `src/data/cases/generated/headline-02.json`
  - scripted: `src/data/scriptedText/headline-02.json`
  - runtime template validate: `tmp/headline-02-runtime-template-validate.txt`
  - scripted template validate: `tmp/headline-02-scripted-template-validate.txt`
  - semantic validate: `tmp/headline-02-semantic-validate.txt` (`WARN 109`)
  - validate: `tmp/headline-02-stage3-validate.txt`
  - status: generator-pass
- `spouse-11`
  - runtime: `src/data/cases/generated/spouse-11.json`
  - scripted: `src/data/scriptedText/spouse-11.json`
  - runtime template validate: `tmp/spouse-11-runtime-template-validate.txt`
  - scripted template validate: `tmp/spouse-11-scripted-template-validate.txt`
  - semantic validate: `tmp/spouse-11-semantic-validate.txt` (`WARN 107`)
  - validate: `tmp/spouse-11-stage3-validate.txt`
  - status: generator-pass
- `friend-03`
  - runtime: `src/data/cases/generated/friend-03.json`
  - scripted: `src/data/scriptedText/friend-03.json`
  - runtime template validate: `tmp/friend-03-runtime-template-validate.txt`
  - scripted template validate: `tmp/friend-03-scripted-template-validate.txt`
  - semantic validate: `tmp/friend-03-semantic-validate.txt` (`WARN 160`)
  - validate: `tmp/friend-03-stage3-validate.txt`
  - status: generator-pass
- `tenant-02`
  - runtime: `src/data/cases/generated/tenant-02.json`
  - scripted: `src/data/scriptedText/tenant-02.json`
  - runtime template validate: `tmp/tenant-02-runtime-template-validate.txt`
  - scripted template validate: `tmp/tenant-02-scripted-template-validate.txt`
  - semantic validate: `tmp/tenant-02-semantic-validate.txt` (`WARN 160`)
  - validate: `tmp/tenant-02-stage3-validate.txt`
  - status: generator-pass

## 2. Legacy-Pass Cases
- `spouse-01`
  - scripted: `src/data/scriptedText/spouse-01.json`
  - validate: `tmp/spouse-01-validate-current.txt`
  - status: legacy-pass
- `spouse-02`
  - scripted: `src/data/scriptedText/spouse-02.json`
  - validate: `tmp/spouse-02-validate-pass6.txt`
  - status: legacy-pass

## 3. Partial Cases
- `spouse-03`
  - scripted: `src/data/scriptedText/spouse-03.json`
  - validate: `tmp/spouse-03-validate-after-b-s5-patch.txt`
  - current state: `WARN 18`
  - status: partial
- `spouse-04`
  - scripted: `src/data/scriptedText/spouse-04.json`
  - validate: `tmp/spouse-04-validate-baseline.txt`
  - current state: `FAIL 297`
  - status: partial

## 4. New Headline Concepts
- `headline-01`
  - source concept: `docs/ref/리뉴얼참고/headline-reviewer-vs-owner-case-v1.md`
  - current state: already generator-pass
- `headline-02`
  - source concept: `docs/ref/리뉴얼참고/headline-sasaeng-selfie-case-v1.md`
  - current state: already generator-pass
- `headline-02` alternate draft
  - source concept: `docs/ref/리뉴얼참고/headline-sasaeng-selfie-leak-case-v1.md`
  - current state: alternate draft for same case family, not a separate generated case id

## 5. 84-Case Salvage Queue

### Already fed into generator
- `spouse-11`
- `friend-03`
- `tenant-02`

### Immediate next pilot 3
- `workplace-11`
- `partnership-09`
- `neighbor-08`

### Second pilot wave 6
- `workplace-05`
- `tenant-09`
- `spouse-12`
- `family-09`
- `friend-09`
- `partnership-04`

## 6. What Is Actually Possible Now
- supported cases can be regenerated through current staged generator and validator
- all current supported pipelines now use the same stage1 runtime entry: `scripts/case-stage1a-runtime.cjs`
- all current supported pipelines now use the same stage2 entry: `scripts/case-stage2-scripted-bootstrap.cjs`
- runtime template coverage is now a mandatory compile-time gate and an explicit stage1 log
- scripted template coverage is now a mandatory compile-time gate and an explicit stage2 log
- scripted semantic validation is now an explicit stage2c log
- runtime and scripted template coverage are also enforced inside the common compilers before output is accepted
- common runtime compilation now auto-enriches gameplay-loop fields for supported cases:
  - `baseEvidenceIds`
  - `requires`
  - `requiredLieState`
  - `evidenceCombinations`
  - `hard_evidence` lie progression
- common runtime compilation now also auto-enriches gameplay/UX template fields for supported cases:
  - `meta`
  - `viewerData`
  - `investigationStages`
  - `partyContext`
- common scripted compilation now injects structural semantic metadata:
  - `speaker/listener`
  - `speakerRole/listenerRole`
  - `judgeAddress/judgeAddressState`
  - `counterpartyRef/counterpartyRefState`
  - `relationship`
  - `callTerm/callTermState`
  - `emotion/continuity/reveal/revealGuard`
- batch reruns can be tracked through `tmp/pipeline-batch-status.json`
- headline and non-headline are both supported through one common stage2 compiler contract
- legacy stage2 wrapper entries now also route through the same common scripted compiler contract
- current supported 5-case batch (`headline-01`, `headline-02`, `spouse-11`, `friend-03`, `tenant-02`) is reproducible in parallel and currently `PASS`
- `npm run build:pc` passes after the integrated generator reruns

## 7. What Is Not Finished
- semantic warnings are still high in supported cases, especially `headline-01`, `friend-03`, `tenant-02`
- custom builders still need direct quality tuning for judge-address consistency and S5/confession contour
- scripted runtime selection still ignores adjacent-turn context
- generator-first migration of legacy pass cases
- generator-first migration of the broader 84-case queue

## 8. Next Priority
- stop case expansion
- reduce stage2c semantic warnings in supported generators
- deepen quality-rule inputs for speaker/listener/callTerms/emotion/reveal scope
- make scripted runtime selection context-aware
