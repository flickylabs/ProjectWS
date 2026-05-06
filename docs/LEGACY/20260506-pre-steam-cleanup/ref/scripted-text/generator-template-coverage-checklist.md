# Generator Template Coverage Checklist

## Purpose
- This checklist is the completion gate for generator work.
- A case is not considered "complete" unless it passes both:
- `template coverage`
- `script quality / validator`

## Gate A: CaseAuthoringSpec Coverage
- Source: [case-authoring-spec-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/case-authoring-spec-v1.md)

### Required case header
- `caseId`
- `legacyCaseId` when needed
- `title`
- `category`
- `summary`
- `headlineHook`
- `sensitivityTags`

### Required meta
- `meta.relationshipType`
- `meta.difficulty`
- `meta.conflictSeed`
- `meta.twistModule`
- `meta.emotionalBait`
- `meta.anchorTruth`
- `meta.resolutionDilemma`

### Required duo
- `duo.partyA`
- `duo.partyB`
- `duo.relationshipLedger`

### Required party fields
- `id`
- `name`
- `age`
- `occupation`
- `incomeBracket`
- `archetype`
- `speechStyle`
- `pride`
- `fear`
- `riskAppetite`
- `digitalHabit`
- `dailyRoutine`
- `sensitivePoints`
- `verbalTells`
- `callTerms`

### Authoring-only fields that must not be silently dropped
- `publicMask`
- `pressureResponse`
- `reputationAxis`

### Required context
- `context.contextType`
- `context.description`
- `context.emotionalPressure`
- `context.affects`
- `context.triggerAmplifier`

### Required disputes
- `id`
- `name`
- `claimA`
- `claimB`
- `publicSummary`
- `truthDescription`
- `hiddenUntil`
- `quadrant`
- `ambiguity`
- `weight`
- `legitimacyIssue`
- `relatedEvidenceIds`
- `mediationLink`
- `correctResponsibility`
- `aSide.justifiedPoint`
- `aSide.hiddenPoint`
- `bSide.justifiedPoint`
- `bSide.hiddenPoint`

### Required evidence
- `id`
- `name`
- `surfaceName`
- `description`
- `surfaceDescription`
- `type`
- `viewerType`
- `reliability`
- `completeness`
- `provenance`
- `legitimacy`
- `proves`
- `isTrap`
- `requires`
- `requiredLieState`
- `subjectParty`
- `isBaseEvidence`
- `viewerDraft`
- `metaDraft`

### Required witness pool
- `id`
- `slot`
- `name`
- `relationTo`
- `knowledgeScope`
- `surfaceKnowledge`
- `witnessedDirectly`
- `bias`
- `distortionRisk`
- `relatedDisputeIds`
- `hiddenAgenda`

### Required dilemma / resolution
- `dilemmaAxes`
- `solutions`

## Gate B: RuntimeCaseData Coverage
- Source: [runtime-case-data-spec-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/runtime-case-data-spec-v1.md)

### Required runtime root
- `caseId`
- `meta`
- `duo`
- `context`
- `disputes`
- `evidence`
- `evidenceCombinations`
- `truthTable`
- `lieConfigA`
- `lieConfigB`
- `solutions`
- `activeLedgerEntries`
- `activeThirdParties`

### Required duo runtime
- `duo.duoId`
- `duo.relationshipType`
- `duo.partyA`
- `duo.partyB`
- `duo.relationshipLedger`
- `duo.socialGraph`

### Required evidence runtime
- `surfaceName`
- `surfaceDescription`
- `requires`
- `requiredLieState`
- `investigationResults`
- `investigationStages`
- `partyContext`
- `viewerData`
- `meta`

### Planned extensions that must be tracked explicitly
- `legacyCaseId`
- `baseEvidenceIds`
- `monetaryDisputeIds`

### Gameplay loop coverage
- `baseEvidenceIds` must contain exactly 3 ids
- base evidence must keep `requires: []`
- non-base evidence should be chained through `requires`
- mid/late evidence should use `requiredLieState`
- `evidenceCombinations` should contain at least 2 meaningful combinations
- at least one major dispute should use `hard_evidence` transition
- too many start-unlocked evidence nodes must be treated as a gameplay warning

## Gate C: Script Authoring Contract Coverage
- Source: [script-authoring-contract-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/script-authoring-contract-v1.md)

### Channel presence
- `interrogation`
- `evidence_present`
- `dossier`
- `witness`
- `aftermath`
- `system_message`

### Required script metadata
- `coverage`
- `entries`
- `variants`
- `truthLevel`
- `stanceHint`
- `behaviorHint`
- `tags`
- `sourceRefs`

### Meaning / speaker contract
- speaker must be correct for the channel
- listener must be correct for the channel
- judge-facing lines must remain judge-facing
- call terms must match relationship and emotion
- one sentence must not mix multiple listeners
- truth throttle must match current lie state
- each variant must carry `speaker:*`
- each variant must carry `listener:*`
- each variant must carry `address:*`
- each variant must carry `relationship:*`
- each variant must carry `callTerm:*`
- each variant must carry `revealScope:*`
- each variant must carry `emotion:*`
- each variant must carry `continuity:*`
- each variant must carry `reveal:*`
- each variant must carry `disclosure:*`
- each variant must carry `responseMode:*`
- judge-facing channels must carry `scope:judge_only`, `register:formal`, `honorific:formal`
- evidence-present variants must carry `trust:*`, `legality:*`, `source:*`

### Quality contract
- content must fit current reveal scope
- response style must differ by channel
- evidence reactions must prioritize source / legality / context
- witness lines must stay witness-perspective
- system messages must stay system voice
- variants must preserve core fact while changing expression
- adjacent lines must maintain emotional continuity

## Current Completion Rule
- `PASS` in validator is necessary but not sufficient.
- A generated case is only "complete" when:
- template fields are present and mapped
- runtime fields are preserved
- channel bundle exists
- script validator passes
- unresolved quality gaps are recorded explicitly

## Immediate Use
- Every generator refactor must be checked against this file.
- Every pilot case must be checked against this file before being marked complete.
- Runtime template validation is mandatory in pipeline stage1.
- Scripted template validation is mandatory in pipeline stage2.
