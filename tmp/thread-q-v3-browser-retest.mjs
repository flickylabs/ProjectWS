import fs from 'fs'
import path from 'path'
import { chromium } from 'playwright'

const ROOT = 'D:\\ProjectWS'
const OUT_PATH = path.join(ROOT, 'tmp', 'thread-q-v3-browser-retest.json')
const APP_URL = 'http://127.0.0.1:4173/'
const CASE_IDS = ['spouse-v3-01', 'family-v3-01', 'friend-v3-01']

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.addInitScript(() => {
    window.__threadQLogs = []
    const levels = ['log', 'warn', 'error']
    for (const level of levels) {
      const original = console[level].bind(console)
      console[level] = (...args) => {
        const text = args.map((arg) => {
          if (typeof arg === 'string') return arg
          try { return JSON.stringify(arg) } catch { return String(arg) }
        }).join(' ')
        window.__threadQLogs.push({ level, text })
        original(...args)
      }
    }
    window.addEventListener('error', (event) => {
      window.__threadQLogs.push({ level: 'error', text: `[window.error] ${event.message}` })
    })
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason && event.reason.message ? event.reason.message : String(event.reason)
      window.__threadQLogs.push({ level: 'error', text: `[unhandledrejection] ${reason}` })
    })
  })

  await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1500)

  const results = []
  for (const caseId of CASE_IDS) {
    const result = await page.evaluate(async (caseId) => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

      const getLogs = () => (window.__threadQLogs || []).slice()
      const logCursor = getLogs().length

      const [
        storeMod,
        typesMod,
        scriptLoaderMod,
        mediationLoaderMod,
        v3Mod,
        scriptedLoaderMod,
        aftermathMod,
        eventMod,
        autoDialogueMod,
      ] = await Promise.all([
        import('/src/store/useGameStore.ts'),
        import('/src/types/index.ts'),
        import('/src/data/dialogues/phaseScriptLoader.ts'),
        import('/src/data/dialogues/mediationScriptLoader.ts'),
        import('/src/engine/v3GameLoopLoader.ts'),
        import('/src/engine/scriptedTextLoader.ts'),
        import('/src/engine/aftermathResolver.ts'),
        import('/src/engine/gameEventTriggerEngine.ts'),
        import('/src/components/phase/AutoDialoguePhase.tsx'),
      ])

      const [
        caseMod,
        bundleMod,
      ] = await Promise.all([
        import(`/src/data/cases/generated/${caseId}.json`),
        import(`/src/data/scriptedText/${caseId}.json`),
      ])

      const mediationMod = await import(`/src/data/dialogues/mediation/${caseId}.json`).catch(() => ({ default: null }))

      const useGameStore = storeMod.useGameStore
      const GamePhase = typesMod.GamePhase
      const {
        loadPhase1Script,
        loadPhase2Script,
      } = scriptLoaderMod
      const {
        loadMediationScript,
      } = mediationLoaderMod
      const {
        getDossierCards,
        resolveDossierQuestion,
        getEventTexts,
        getAllTransitionBeats,
        getTransitionBeat,
        resetV3State,
      } = v3Mod
      const {
        getScriptedInterrogation,
        getScriptedEvidencePresent,
        getScriptedDossier,
        getScriptedWitness,
        getScriptedAftermath,
        clearScriptedCache,
      } = scriptedLoaderMod
      const { resolveScriptedAftermath } = aftermathMod
      const { evaluateEventTriggers, resetEventTriggerState } = eventMod
      const { triggerDialogueTap } = autoDialogueMod

      const rawCase = structuredClone(caseMod.default ?? caseMod)
      const bundle = bundleMod.default ?? bundleMod
      const mediationBundle = mediationMod.default ?? mediationMod

      function patchCaseData(caseData) {
        const patched = structuredClone(caseData)
        patched.evidence = Array.isArray(patched.evidence) ? patched.evidence : []
        patched.evidenceCombinations = Array.isArray(patched.evidenceCombinations) ? patched.evidenceCombinations : []
        patched.baseEvidenceIds = Array.isArray(patched.baseEvidenceIds) ? patched.baseEvidenceIds : []
        patched.disputes = Array.isArray(patched.disputes) ? patched.disputes : []
        patched.truthTable = Array.isArray(patched.truthTable) ? patched.truthTable : []
        patched.activeLedgerEntries = Array.isArray(patched.activeLedgerEntries) ? patched.activeLedgerEntries : []
        patched.activeThirdParties = Array.isArray(patched.activeThirdParties) ? patched.activeThirdParties : []
        patched.meta = patched.meta ?? {}
        patched.context = patched.context ?? { description: '' }
        patched.solutions = patched.solutions ?? {}
        patched.duo = patched.duo ?? {}
        patched.duo.relationshipLedger = Array.isArray(patched.duo.relationshipLedger) ? patched.duo.relationshipLedger : []
        patched.duo.socialGraph = Array.isArray(patched.duo.socialGraph) ? patched.duo.socialGraph : []
        patched.duo.partyA = patched.duo.partyA ?? {}
        patched.duo.partyB = patched.duo.partyB ?? {}
        for (const party of [patched.duo.partyA, patched.duo.partyB]) {
          party.verbalTells = Array.isArray(party.verbalTells) ? party.verbalTells : []
          party.digitalHabit = party.digitalHabit ?? 'minimal'
          party.callTerms = party.callTerms ?? {}
          party.sensitivePoints = Array.isArray(party.sensitivePoints) ? party.sensitivePoints : []
        }
        return patched
      }

      function sliceText(text, limit = 220) {
        if (!text) return ''
        return text.length > limit ? `${text.slice(0, limit)}…` : text
      }

      function getVisibleText(limit = 4000) {
        return (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, limit)
      }

      function byKey(entries, predicate) {
        return entries.find(predicate) ?? null
      }

      function groupExamples(entries, count = 5) {
        return entries.slice(0, count).map((entry) => ({
          key: entry.key,
          text: sliceText(entry.variants?.[0]?.text || ''),
        }))
      }

      clearScriptedCache()
      resetEventTriggerState()

      const caseData = patchCaseData(rawCase)
      const store = useGameStore.getState()
      store.initializeCase(caseData)
      await nextFrame()
      await sleep(400)

      const caseKey = caseId
      const phase0Visible = getVisibleText()

      const phase1Script = loadPhase1Script(caseData.caseId) ?? []
      const phase2Script = loadPhase2Script(caseData.caseId) ?? []
      const mediationScript = loadMediationScript(caseData.caseId) ?? mediationBundle

      const v3Before = {
        dossierCards: getDossierCards(caseKey),
        events: getEventTexts(caseKey),
        transitionBeats: getAllTransitionBeats(caseKey),
      }

      let transitionSample = null
      if (v3Before.transitionBeats.length > 0) {
        const beat = v3Before.transitionBeats[0]
        resetV3State(caseKey)
        transitionSample = getTransitionBeat(caseKey, beat.party, beat.disputeId, beat.fromState, beat.toState)
      }

      resetV3State(caseKey)
      const dossierSampleQuestion = v3Before.dossierCards.flatMap((card) =>
        card.challenges.flatMap((challenge) => challenge.questions.map((question) => ({ card, challenge, question }))),
      )[0] ?? null
      const dossierResolve = dossierSampleQuestion
        ? resolveDossierQuestion(caseKey, dossierSampleQuestion.question.id)
        : null

      resetV3State(caseKey)
      const eventSnapshots = {}
      const firstDispute = caseData.disputes[0]?.id ?? 'd-1'
      const secondDispute = caseData.disputes[1]?.id ?? firstDispute

      eventSnapshots.contradiction = evaluateEventTriggers({
        caseId: caseKey,
        turn: 5,
        activeParty: 'a',
        questionType: 'fact_pursuit',
        lieStates: {
          a: { [firstDispute]: { currentState: 'S1' } },
          b: { [firstDispute]: { currentState: 'S0' } },
        },
        emotions: {
          a: { phase: 'defensive', internalValue: 20 },
          b: { phase: 'defensive', internalValue: 20 },
        },
        trust: {
          a: { trustTowardJudge: 50 },
          b: { trustTowardJudge: 50 },
        },
        meters: {
          a: { contradictionTokens: 4, leakMeter: 20, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
          b: { contradictionTokens: 0, leakMeter: 20, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
        },
        disputeVisibility: { [firstDispute]: 'visible' },
        transitionsThisTurn: [],
        readiness: { crackedDisputeCount: 1, resolvedDisputeCount: 1, hiddenDisputeCount: 0, successRate: 0.5, status: 'warming' },
        focusDisputeId: firstDispute,
      })

      resetEventTriggerState()
      eventSnapshots.interjection = evaluateEventTriggers({
        caseId: caseKey,
        turn: 6,
        activeParty: 'a',
        questionType: 'fact_pursuit',
        lieStates: {
          a: { [firstDispute]: { currentState: 'S1' } },
          b: { [firstDispute]: { currentState: 'S2' } },
        },
        emotions: {
          a: { phase: 'defensive', internalValue: 15 },
          b: { phase: 'angry', internalValue: 72 },
        },
        trust: {
          a: { trustTowardJudge: 50 },
          b: { trustTowardJudge: 50 },
        },
        meters: {
          a: { contradictionTokens: 0, leakMeter: 20, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
          b: { contradictionTokens: 0, leakMeter: 40, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
        },
        disputeVisibility: { [firstDispute]: 'visible' },
        transitionsThisTurn: [],
        readiness: { crackedDisputeCount: 1, resolvedDisputeCount: 1, hiddenDisputeCount: 0, successRate: 0.5, status: 'warming' },
        focusDisputeId: firstDispute,
      })

      resetEventTriggerState()
      eventSnapshots.outburst = evaluateEventTriggers({
        caseId: caseKey,
        turn: 8,
        activeParty: 'b',
        questionType: 'fact_pursuit',
        lieStates: {
          a: { [secondDispute]: { currentState: 'S2' } },
          b: { [secondDispute]: { currentState: 'S3' } },
        },
        emotions: {
          a: { phase: 'defensive', internalValue: 10 },
          b: { phase: 'angry', internalValue: 88 },
        },
        trust: {
          a: { trustTowardJudge: 50 },
          b: { trustTowardJudge: 50 },
        },
        meters: {
          a: { contradictionTokens: 0, leakMeter: 10, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
          b: { contradictionTokens: 0, leakMeter: 90, empathyMeter: 0, pressureMeter: 0, momentum: 0 },
        },
        disputeVisibility: { [firstDispute]: 'visible', [secondDispute]: 'visible' },
        transitionsThisTurn: [{ party: 'b', disputeId: secondDispute, from: 'S2', to: 'S3' }],
        readiness: { crackedDisputeCount: 2, resolvedDisputeCount: 1, hiddenDisputeCount: 0, successRate: 0.7, status: 'warming' },
        focusDisputeId: secondDispute,
      })

      const interrogationEntries = bundle.channels.interrogation.entries
      const evidenceEntries = bundle.channels.evidence_present.entries
      const dossierEntries = bundle.channels.dossier.entries
      const witnessEntries = bundle.channels.witness.entries
      const aftermathEntries = bundle.channels.aftermath.entries
      const systemEntries = bundle.channels.system_message.entries

      function probeInterrogation(party, questionType, lieState, preferredDisputeId) {
        const entry = byKey(
          interrogationEntries,
          (candidate) =>
            candidate.party === party
            && candidate.questionType === questionType
            && candidate.lieState === lieState
            && (!preferredDisputeId || candidate.disputeId === preferredDisputeId),
        ) ?? byKey(
          interrogationEntries,
          (candidate) => candidate.party === party && candidate.questionType === questionType && candidate.lieState === lieState,
        )

        if (!entry) return null
        const first = getScriptedInterrogation(caseKey, entry.party, entry.disputeId, entry.lieState, entry.questionType)
        const second = getScriptedInterrogation(caseKey, entry.party, entry.disputeId, entry.lieState, entry.questionType)
        return {
          key: entry.key,
          disputeId: entry.disputeId,
          first: first?.text ?? null,
          second: second?.text ?? null,
        }
      }

      function probeEvidence(party, lieBand, preferredEvidenceId) {
        const entry = byKey(
          evidenceEntries,
          (candidate) =>
            candidate.party === party
            && candidate.lieBand === lieBand
            && (!preferredEvidenceId || candidate.evidenceId === preferredEvidenceId),
        ) ?? byKey(
          evidenceEntries,
          (candidate) => candidate.party === party && candidate.lieBand === lieBand,
        )
        if (!entry) return null
        const result = getScriptedEvidencePresent(caseKey, entry.party, entry.evidenceId, lieBand === 'early' ? 'S1' : lieBand === 'mid' ? 'S2' : 'S4', entry.subjectRole)
        return {
          key: entry.key,
          evidenceId: entry.evidenceId,
          subjectRole: entry.subjectRole,
          text: result?.text ?? null,
        }
      }

      function probeDossier(party, lieBand) {
        const entry = byKey(dossierEntries, (candidate) => candidate.party === party && candidate.lieBand === lieBand)
        if (!entry) return null
        const result = getScriptedDossier(caseKey, entry.party, entry.dossierQuestionId, lieBand === 'early' ? 'S1' : lieBand === 'mid' ? 'S2' : 'S4')
        return {
          key: entry.key,
          questionId: entry.dossierQuestionId,
          text: result?.text ?? null,
        }
      }

      function probeWitness(depth) {
        const entry = byKey(witnessEntries, (candidate) => candidate.depth === depth)
        if (!entry) return null
        const first = getScriptedWitness(caseKey, entry.witnessId, depth)
        const second = getScriptedWitness(caseKey, entry.witnessId, depth)
        return {
          key: entry.key,
          witnessId: entry.witnessId,
          first: first?.text ?? null,
          second: second?.text ?? null,
        }
      }

      function buildVerdictInput() {
        const responsibility = {}
        const factFindings = {}
        for (const dispute of caseData.disputes) {
          responsibility[dispute.id] = dispute.correctResponsibility ?? { a: 50, b: 50 }
          factFindings[dispute.id] = dispute.truth ? 'true' : 'false'
        }
        const selectedSolutions = Object.entries(caseData.solutions)
          .flatMap(([category, values]) => (values || []).slice(0, 1).map((value) => `${category}::${value}`))
          .slice(0, 2)
        return {
          factFindings,
          responsibility,
          selectedSolutions,
          evidenceLegality: {},
        }
      }

      const verdictInput = buildVerdictInput()
      const aftermathResolved = resolveScriptedAftermath(caseData, verdictInput)
      const aftermathSamples = aftermathEntries.slice(0, 3).map((entry) => ({
        key: entry.key,
        text: getScriptedAftermath(caseKey, entry.key)?.text ?? null,
      }))

      const playRuns = [
        {
          id: 1,
          label: 'fact-focus',
          probes: [
            probeInterrogation('a', 'fact_pursuit', 'S1', firstDispute),
            probeInterrogation('a', 'fact_pursuit', 'S2', firstDispute),
            probeInterrogation('b', 'fact_pursuit', 'S1', secondDispute),
          ].filter(Boolean),
        },
        {
          id: 2,
          label: 'motive-focus',
          probes: [
            probeInterrogation('a', 'motive_search', 'S1', firstDispute),
            probeInterrogation('a', 'motive_search', 'S2', firstDispute),
            probeInterrogation('b', 'motive_search', 'S1', secondDispute),
          ].filter(Boolean),
        },
        {
          id: 3,
          label: 'empathy-focus',
          probes: [
            probeInterrogation('a', 'empathy_approach', 'S1', firstDispute),
            probeInterrogation('a', 'empathy_approach', 'S4', firstDispute),
            probeInterrogation('b', 'empathy_approach', 'S1', secondDispute),
          ].filter(Boolean),
        },
        {
          id: 4,
          label: 'evidence-early',
          probes: [
            probeEvidence('a', 'early'),
            probeEvidence('b', 'early'),
          ].filter(Boolean),
        },
        {
          id: 5,
          label: 'evidence-late',
          probes: [
            probeEvidence('a', 'mid'),
            probeEvidence('b', 'late'),
          ].filter(Boolean),
        },
        {
          id: 6,
          label: 'witness-depths',
          probes: [
            probeWitness('vague'),
            probeWitness('partial'),
            probeWitness('full'),
          ].filter(Boolean),
        },
        {
          id: 7,
          label: 'dossier-push',
          probes: [
            probeDossier('a', 'early'),
            probeDossier('b', 'mid'),
            probeDossier('b', 'late'),
          ].filter(Boolean),
        },
        {
          id: 8,
          label: 'events-transition',
          probes: [
            eventSnapshots.contradiction,
            eventSnapshots.interjection,
            eventSnapshots.outburst,
            transitionSample,
          ].filter(Boolean),
        },
        {
          id: 9,
          label: 'aftermath-minmax',
          probes: [
            aftermathResolved,
            ...aftermathSamples,
          ].filter(Boolean),
        },
        {
          id: 10,
          label: 'free-play-mix',
          probes: [
            probeInterrogation('a', 'fact_pursuit', 'S5'),
            probeEvidence('a', 'late'),
            probeWitness('full'),
            probeDossier('b', 'late'),
          ].filter(Boolean),
        },
      ]

      // Phase 1/2 render smoke
      useGameStore.getState().setPhase(GamePhase.Phase1_InitialStatement)
      await nextFrame()
      await sleep(250)
      let phase1Guard = 0
      while (useGameStore.getState().currentPhase === GamePhase.Phase1_InitialStatement && phase1Guard < 40) {
        triggerDialogueTap()
        await sleep(60)
        phase1Guard += 1
      }
      await sleep(250)
      const phase1Visible = getVisibleText()
      const phase1DialogueCount = useGameStore.getState().dialogueLog.length

      let phase2Visible = ''
      let phase2DialogueCount = phase1DialogueCount
      if (useGameStore.getState().currentPhase === GamePhase.Phase2_Rebuttal) {
        let phase2Guard = 0
        while (useGameStore.getState().currentPhase === GamePhase.Phase2_Rebuttal && phase2Guard < 40) {
          triggerDialogueTap()
          await sleep(60)
          phase2Guard += 1
        }
        await sleep(250)
        phase2Visible = getVisibleText()
        phase2DialogueCount = useGameStore.getState().dialogueLog.length
      }

      useGameStore.getState().setPhase(GamePhase.Phase6_Mediation)
      await nextFrame()
      await sleep(250)
      const phase6Visible = getVisibleText()

      useGameStore.setState((state) => ({
        verdictInput,
        evidenceStates: {
          ...state.evidenceStates,
          ...(caseData.evidence[0] ? {
            [caseData.evidence[0].id]: { ...(state.evidenceStates?.[caseData.evidence[0].id] ?? {}), presented: true, unlocked: true },
          } : {}),
        },
      }))
      useGameStore.getState().setPhase(GamePhase.Phase7_Verdict)
      await nextFrame()
      await sleep(250)
      const phase7Visible = getVisibleText()

      useGameStore.setState({
        verdictScore: { total: 82, insight: 28, authority: 27, wisdom: 27, title: 'QA probe' },
        verdictSummary: 'QA probe summary',
      })
      useGameStore.getState().setPhase(GamePhase.Result)
      await nextFrame()
      await sleep(250)
      const resultVisible = getVisibleText()

      const caseLogs = getLogs().slice(logCursor)
      const scriptedHits = caseLogs.filter((entry) => entry.text.includes('[Scripted]'))
      const scriptedMisses = caseLogs.filter((entry) => entry.text.includes('[Scripted miss]'))

      const visibleTypos = bundle.channels.interrogation.entries
        .flatMap((entry) => entry.variants.map((variant) => variant.text))
        .filter((text) => /(였은데|았은데|었은데|갔은지|보가는|있은지|했은이|었은이)/.test(text))
        .slice(0, 10)

      const visibleHonorificViolations = []
      for (const channel of ['interrogation', 'evidence_present', 'dossier', 'witness', 'aftermath', 'system_message']) {
        for (const entry of bundle.channels[channel].entries) {
          for (const variant of entry.variants) {
            if (/[가-힣]+씨/.test(variant.text)) {
              visibleHonorificViolations.push({ channel, key: entry.key, text: variant.text })
              if (visibleHonorificViolations.length >= 10) break
            }
          }
          if (visibleHonorificViolations.length >= 10) break
        }
        if (visibleHonorificViolations.length >= 10) break
      }

      return {
        caseId,
        currentPhaseAfterInit: useGameStore.getState().currentPhase,
        phaseSmoke: {
          phase0Visible: sliceText(phase0Visible, 700),
          phase1Visible: sliceText(phase1Visible, 700),
          phase2Visible: sliceText(phase2Visible, 700),
          phase6Visible: sliceText(phase6Visible, 700),
          phase7Visible: sliceText(phase7Visible, 700),
          resultVisible: sliceText(resultVisible, 700),
          phase1DialogueCount,
          phase2DialogueCount,
        },
        initial: {
          caseIdRaw: caseData.caseId,
          partyA: caseData.duo.partyA.name,
          partyB: caseData.duo.partyB.name,
          disputes: caseData.disputes.length,
          evidence: caseData.evidence.length,
          baseEvidenceIds: caseData.baseEvidenceIds,
        },
        scripts: {
          phase1Count: phase1Script.length,
          phase2Count: phase2Script.length,
          mediationPaths: mediationScript?.paths ? Object.keys(mediationScript.paths) : [],
          phase1Samples: phase1Script.slice(0, 3).map((line) => ({ speaker: line.speaker, text: sliceText(line.text) })),
          phase2Samples: phase2Script.slice(0, 3).map((line) => ({ speaker: line.speaker, text: sliceText(line.text) })),
        },
        runtime: {
          dossierCardCount: v3Before.dossierCards.length,
          eventCounts: {
            contradictions: v3Before.events?.contradictions?.length ?? 0,
            interjections: v3Before.events?.interjections?.length ?? 0,
            outbursts: v3Before.events?.emotionalOutbursts?.length ?? 0,
          },
          transitionBeatCount: v3Before.transitionBeats.length,
          transitionSample,
          dossierResolve,
          eventSnapshots,
        },
        bundle: {
          channels: Object.fromEntries(
            Object.entries(bundle.channels).map(([channel, data]) => [channel, data.entries.length]),
          ),
          systemMessageSamples: groupExamples(systemEntries, 3),
          interrogationSamples: groupExamples(interrogationEntries, 3),
          evidenceSamples: groupExamples(evidenceEntries, 3),
          dossierSamples: groupExamples(dossierEntries, 3),
          witnessSamples: groupExamples(witnessEntries, 3),
          aftermathSamples: groupExamples(aftermathEntries, 3),
        },
        playRuns,
        scriptedLogs: {
          hitCount: scriptedHits.length,
          missCount: scriptedMisses.length,
          hits: scriptedHits.slice(0, 40),
          misses: scriptedMisses.slice(0, 20),
        },
        staticIssues: {
          visibleTypos: visibleTypos.map((text) => sliceText(text, 240)),
          visibleHonorificViolations: visibleHonorificViolations.map((item) => ({
            channel: item.channel,
            key: item.key,
            text: sliceText(item.text, 240),
          })),
        },
        errors: caseLogs.filter((entry) => entry.level === 'error').slice(0, 20),
      }
    }, caseId)

    results.push(result)
    await sleep(300)
  }

  fs.writeFileSync(OUT_PATH, `${JSON.stringify({ generatedAt: new Date().toISOString(), appUrl: APP_URL, results }, null, 2)}\n`, 'utf8')
  await browser.close()
  console.log(`wrote ${OUT_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
