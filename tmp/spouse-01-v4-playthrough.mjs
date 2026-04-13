import fs from 'fs'
import path from 'path'
import { chromium } from 'playwright'

const ROOT = 'D:\\ProjectWS'
const APP_URL = 'http://127.0.0.1:4173/index-pc.html'
const CASE_KEY = process.env.CASE_KEY ?? 'spouse-01'
const RUN_PROFILE = process.env.RUN_PROFILE ?? 'default'
const OUT_PATH = path.join(ROOT, 'tmp', `${CASE_KEY}-${RUN_PROFILE}.json`)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  browser.on('disconnected', () => {
    console.error('[browser] disconnected')
  })
  const page = await browser.newPage()
  page.on('console', (msg) => {
    console.log(`[page:${msg.type()}] ${msg.text()}`)
  })
  page.on('pageerror', (error) => {
    console.error(`[pageerror] ${error.message}`)
  })
  page.on('close', () => {
    console.error('[page] close')
  })
  page.on('crash', () => {
    console.error('[page] crash')
  })

  await page.addInitScript(() => {
    localStorage.setItem('solomon-intro-seen', 'true')
    window.__threadQLogs = []
    const levels = ['log', 'warn', 'error']
    for (const level of levels) {
      const original = console[level].bind(console)
      console[level] = (...args) => {
        const text = args
          .map((arg) => {
            if (typeof arg === 'string') return arg
            try {
              return JSON.stringify(arg)
            } catch {
              return String(arg)
            }
          })
          .join(' ')
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
  await page.addInitScript((runIds, runProfile) => {
    window.__THREADQ_RUN_IDS = runIds
    window.__THREADQ_RUN_PROFILE = runProfile
  }, process.env.RUN_IDS ?? '', RUN_PROFILE)

  await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1500)

  const result = await page.evaluate(async ({ threadqProfile, threadqRunIds, threadqCaseKey }) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const waitFor = async (predicate, timeout = 5000, interval = 50) => {
      const start = Date.now()
      while (Date.now() - start < timeout) {
        if (predicate()) return true
        await sleep(interval)
      }
      return false
    }
    const toText = (value) => {
      if (typeof value !== 'string') return ''
      return value.replace(/\s+/g, ' ').trim()
    }
    const sliceText = (value, limit = 180) => {
      const text = toText(value)
      return text.length > limit ? `${text.slice(0, limit)}...` : text
    }
    const stateRank = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
    const isSeriousError = (entry) => {
      if (!entry || typeof entry.text !== 'string') return false
      const text = entry.text
      if (/\bTypeError\b/.test(text)) return true
      if (/Cannot read properties/i.test(text)) return true
      if (/ReferenceError/i.test(text)) return true
      if (/is undefined/i.test(text)) return true
      if (/undefined is not/i.test(text)) return true
      if (entry.level === 'error') return true
      return false
    }

    const [
      typesMod,
      hookMod,
      v3Mod,
      meterMod,
      witnessMod,
      caseJson,
      scriptedLoaderMod,
      readinessMod,
    ] = await Promise.all([
      import('/src/types/index.ts'),
      import('/src/hooks/useActionDispatch.ts'),
      import('/src/engine/v3GameLoopLoader.ts'),
      import('/src/engine/meterStagingV2.ts'),
      import('/src/engine/witnessEngine.ts'),
      fetch(`/src/data/cases/generated/${threadqCaseKey}.json`).then((response) => response.json()),
      import('/src/engine/scriptedTextLoader.ts'),
      import('/src/engine/readinessEngine.ts'),
    ])

    const { GamePhase } = typesMod
    const {
      resolveInterjectionV2,
      setSkipNextJudgeQuestion,
      setDossierQuestionOverride,
      actuallyDiscoverEvidence,
      handleContradictionPursue,
    } = hookMod
    const {
      getDossierCards,
      getAvailableDossierQuestions,
      resolveDossierQuestion,
      getContradictionEvent,
      getInterjectionEvent,
      getOutburstEvent,
    } = v3Mod
    const { evaluateDossierUnlock } = meterMod
    const { determineTestimonyDepth } = witnessMod
    const { clearScriptedCache } = scriptedLoaderMod
    const { MAX_INTERROGATION_TURNS_FN } = readinessMod
    const rawCase = structuredClone(caseJson)
    const caseKey = (rawCase.caseId ?? '').replace(/^case-/, '')
    const devWindow = window

    await waitFor(
      () => typeof devWindow.__pcDispatch === 'function' && typeof devWindow.__pcStore?.getState === 'function',
      15000,
      100,
    )

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
        if (typeof party.pcFaceType === 'string') {
          if (party.pcFaceType.startsWith('male')) party.pcFaceType = 'man'
          if (party.pcFaceType.startsWith('female')) party.pcFaceType = 'woman'
        }
        party.sensitivePoints = Array.isArray(party.sensitivePoints) ? party.sensitivePoints : []
      }
      return patched
    }

    const baseCaseData = patchCaseData(rawCase)

    let activeRunMeta = null
    let lastIntroTrace = null

    function getStore() {
      return devWindow.__pcStore.getState()
    }

    function cloneCaseData() {
      return structuredClone(baseCaseData)
    }

    function getLogs(start = 0) {
      return (window.__threadQLogs ?? []).slice(start)
    }

    function compactPhaseHistory(history) {
      const result = []
      for (const phase of history) {
        if (result[result.length - 1] !== phase) result.push(phase)
      }
      return result
    }

    function getLieMap(agent) {
      return Object.fromEntries(
        Object.entries(agent.lieStateMap ?? {}).map(([disputeId, entry]) => [disputeId, entry.currentState]),
      )
    }

    function getCurrentLie(party, disputeId) {
      const store = getStore()
      const agent = party === 'a' ? store.agentA : store.agentB
      return agent.lieStateMap?.[disputeId]?.currentState ?? 'S0'
    }

    function snapshotState() {
      const store = getStore()
      return {
        phase: store.currentPhase,
        phaseHistory: compactPhaseHistory([...store.phaseHistory, store.currentPhase]),
        turnCount: store.turnCount,
        verdictMode: store.verdictMode,
        lieStates: {
          a: getLieMap(store.agentA),
          b: getLieMap(store.agentB),
        },
        evidence: {
          unlocked: Object.entries(store.evidenceStates).filter(([, entry]) => entry.unlocked).map(([id]) => id),
          presented: Object.entries(store.evidenceStates).filter(([, entry]) => entry.presented).map(([id]) => id),
        },
        discovery: Object.fromEntries(
          Object.entries(store.discovery.disputeVisibility ?? {}).map(([id, entry]) => [id, entry.visibility]),
        ),
        calledWitnesses: [...store.calledWitnesses],
        combination: {
          analysisPoints: store.combinationLabRuntime.analysisPoints,
          appliedRecipeIds: [...store.combinationLabRuntime.appliedRecipeIds],
          history: store.combinationLabRuntime.history.map((entry) => ({
            recipeId: entry.recipeId,
            outputId: entry.outputId,
            summary: entry.summary,
            turn: entry.turn,
          })),
        },
        verdictScore: store.verdictScore,
        dialogueTail: store.dialogueLog.slice(-6).map((entry) => ({
          speaker: entry.speaker,
          text: sliceText(entry.text),
        })),
      }
    }

    async function playIntro(choiceIndex = 0) {
      const store = getStore()
      const hiddenNames = (store.caseData?.disputes ?? [])
        .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
        .map((dispute) => dispute.name)
      const trace = {
        choiceIndex,
        steps: [],
      }
      if (store.currentPhase === GamePhase.Phase0_CaseIntro) {
        store.advancePhase()
      }
      await nextFrame()
      await sleep(120)

      let guard = 0
      while (
        [GamePhase.Phase1_InitialStatement, GamePhase.Phase2_Rebuttal].includes(getStore().currentPhase) &&
        guard < 200
      ) {
        const bodyText = toText(document.body?.innerText ?? '')
        const choiceButtons = Array.from(document.querySelectorAll('.v4-choice-panel__option'))
        const options = choiceButtons.map((button) => toText(button.textContent ?? button.innerText ?? ''))
        const step = {
          phase: getStore().currentPhase,
          guard,
          options,
          bodyLeaks: hiddenNames.filter((name) => bodyText.includes(name)),
        }
        if (choiceButtons.length > 0) {
          const index = Math.min(choiceIndex, choiceButtons.length - 1)
          step.selectedIndex = index
          step.selectedText = options[index] ?? null
          choiceButtons[index].click()
          await sleep(150)
        } else {
          step.selectedIndex = null
          step.selectedText = null
          devWindow.__pcTriggerDialogueTap?.()
          await sleep(80)
        }
        trace.steps.push(step)
        guard += 1
      }

      trace.finalPhase = getStore().currentPhase
      lastIntroTrace = trace
      return getStore().currentPhase
    }

    function getPartyName(party) {
      const store = getStore()
      return party === 'a' ? store.caseData?.duo.partyA.name ?? 'A' : store.caseData?.duo.partyB.name ?? 'B'
    }

    function recordEvent(type, detail) {
      if (!activeRunMeta) return
      activeRunMeta.events.push({ type, ...detail })
    }

    async function applyContradictionResolution(event, mode = 'point_out') {
      const store = getStore()
      const v3Event = event.scriptSlot?.textId ? getContradictionEvent(caseKey, event.scriptSlot.textId) : null
      if (mode === 'point_out') {
        for (const eff of event.deferredEffects ?? []) {
          if (eff.type === 'lie_advance') {
            for (let i = 0; i < eff.steps; i += 1) {
              store.transitionLie(eff.party, eff.disputeId, 'event_contradiction_pointout')
            }
          } else if (eff.type === 'emotion_spike') {
            store.changeEmotion(eff.party, eff.delta)
          }
        }
        store.addDialogue({
          speaker: 'judge',
          text: v3Event ? `${v3Event.statementA} ${v3Event.statementB} 이 부분을 지적합니다.` : '진술의 모순을 지적합니다.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
        if (v3Event?.npcReaction) {
          store.addDialogue({
            speaker: event.party,
            text: v3Event.npcReaction,
            relatedDisputes: [event.disputeId],
            turn: store.turnCount,
          })
        }
      } else {
        store.addDialogue({
          speaker: 'system',
          text: '모순 토큰을 보류했습니다.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
      }
      store.setPendingGameEvent(null)
      recordEvent('contradiction', { mode, disputeId: event.disputeId, severity: event.severity })
      await sleep(120)
    }

    async function applyInterjectionResolution(event, mode = 'allow') {
      const store = getStore()
      const v3Event = event.scriptSlot?.textId ? getInterjectionEvent(caseKey, event.scriptSlot.textId) : null
      const text = v3Event?.interjectionLine ?? event.description
      if (mode === 'allow') {
        store.addDialogue({
          speaker: event.party,
          text,
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
        store.addDialogue({
          speaker: 'judge',
          text: '발언을 허용합니다.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
        store.trackMetric('interjectionAllowed')
        store.changeTrust(event.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
      } else {
        store.addDialogue({
          speaker: 'judge',
          text: '발언을 제지합니다.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
      }
      store.setPendingGameEvent(null)
      recordEvent('interjection', { mode, disputeId: event.disputeId, severity: event.severity, text: sliceText(text) })
      await sleep(120)
    }

    async function applyOutburstResolution(event, mode = 'press') {
      const store = getStore()
      const v3Event = event.scriptSlot?.textId ? getOutburstEvent(caseKey, event.scriptSlot.textId) : null
      const text = v3Event?.outburstLine ?? event.description
      store.addDialogue({
        speaker: event.party,
        text,
        relatedDisputes: [event.disputeId],
        turn: store.turnCount,
      })
      if (mode === 'press') {
        store.addDialogue({
          speaker: 'judge',
          text: '계속 말씀하십시오.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
        store.changeEmotion(event.party, 8)
      } else {
        store.addDialogue({
          speaker: 'judge',
          text: '진정하시고 다시 말씀하십시오.',
          relatedDisputes: [event.disputeId],
          turn: store.turnCount,
        })
        store.changeTrust(event.party, 'trustTowardJudge', 12)
        store.changeEmotion(event.party, -10)
      }
      store.setPendingGameEvent(null)
      recordEvent('emotional_burst', { mode, disputeId: event.disputeId, severity: event.severity, text: sliceText(text) })
      await sleep(120)
    }

    async function resolvePending(preferences = {}) {
      let guard = 0
      while (guard < 20) {
        const store = getStore()
        if (store.pendingInterjectionV2) {
          resolveInterjectionV2(preferences.interjectionV2 ?? 'allow')
          recordEvent('interjection_v2', {
            mode: preferences.interjectionV2 ?? 'allow',
            disputeId: store.pendingInterjectionV2.disputeId,
            severity: store.pendingInterjectionV2.severity,
            text: sliceText(store.pendingInterjectionV2.line),
          })
          await sleep(150)
          guard += 1
          continue
        }
        if (store.pendingGameEvent) {
          if (preferences.autoResolveGameEvent === false) break
          if (store.pendingGameEvent.type === 'contradiction') {
            await applyContradictionResolution(store.pendingGameEvent, preferences.contradiction ?? 'point_out')
          } else if (store.pendingGameEvent.type === 'interjection') {
            await applyInterjectionResolution(store.pendingGameEvent, preferences.interjection ?? 'allow')
          } else if (store.pendingGameEvent.type === 'emotional_burst') {
            await applyOutburstResolution(store.pendingGameEvent, preferences.outburst ?? 'press')
          } else {
            store.setPendingGameEvent(null)
          }
          guard += 1
          continue
        }
        if (store.pendingTransitionChoice) {
          if (preferences.autoResolveTransitionChoice === false) break
          recordEvent('transition_choice', {
            label: store.pendingTransitionChoice.label,
            disputeId: store.pendingTransitionChoice.disputeId,
            party: store.pendingTransitionChoice.party,
          })
          store.setPendingTransitionChoice(null)
          await sleep(50)
          guard += 1
          continue
        }
        if (store.pendingPerkChoice) {
          recordEvent('perk_choice', { type: store.pendingPerkChoice.type })
          store.setPendingPerkChoice(null)
          await sleep(50)
          guard += 1
          continue
        }
        if (store.pendingMinigame) {
          if (preferences.autoResolveMinigame === false) break
          recordEvent('minigame', { type: store.pendingMinigame.type })
          store.setPendingMinigame(null)
          await sleep(50)
          guard += 1
          continue
        }
        break
      }
    }

    async function dispatchTurn(action, preferences = {}, options = {}) {
      const beforeTurn = getStore().turnCount
      const beforePhase = getStore().currentPhase
      const beforeLogLen = getStore().dialogueLog.length
      const waitTimeoutMs = options.waitTimeoutMs ?? 12000
      devWindow.__pcDispatch(action)
      await waitFor(
        () =>
          getStore().turnCount > beforeTurn ||
          getStore().currentPhase !== beforePhase ||
          getStore().dialogueLog.length > beforeLogLen,
        waitTimeoutMs,
        50,
      )
      await waitFor(() => !getStore().isLLMLoading, waitTimeoutMs, 50)
      await sleep(120)
      await resolvePending(preferences)
      await sleep(80)
      return snapshotState()
    }

    async function questionToState({ target, disputeId, questionType, targetState, maxTurns = 10, preferences }) {
      const targetAgent = target === 'a' ? getStore().agentA : getStore().agentB
      if (!targetAgent.lieStateMap?.[disputeId]) {
        return null
      }
      let guard = 0
      let lastState = getCurrentLie(target, disputeId)
      while (
        stateRank[getCurrentLie(target, disputeId)] < stateRank[targetState] &&
        guard < maxTurns &&
        getStore().currentPhase === GamePhase.Phase3_Interrogation
      ) {
        await dispatchTurn({ type: 'question', target, disputeId, questionType }, preferences)
        const current = getCurrentLie(target, disputeId)
        if (stateRank[current] <= stateRank[lastState] && guard >= Math.max(2, maxTurns - 2)) break
        lastState = current
        guard += 1
      }
      return getCurrentLie(target, disputeId)
    }

    async function questionSequenceToState({
      target,
      disputeId,
      sequence,
      targetState,
      maxTurns = 10,
      preferences,
      diagnostics,
    }) {
      const turns = []
      let cursor = 0
      if (diagnostics) {
        diagnostics.loopEntered = false
        diagnostics.afterDispatches = []
        diagnostics.loopGate = {
          currentState: getCurrentLie(target, disputeId),
          targetState,
          phaseBeforeLoop: getStore().currentPhase,
          turnBeforeLoop: getStore().turnCount,
          canIterate:
            stateRank[getCurrentLie(target, disputeId)] < stateRank[targetState] &&
            cursor < maxTurns &&
            getStore().currentPhase === GamePhase.Phase3_Interrogation,
        }
      }
      while (
        stateRank[getCurrentLie(target, disputeId)] < stateRank[targetState] &&
        cursor < maxTurns &&
        getStore().currentPhase === GamePhase.Phase3_Interrogation
      ) {
        if (diagnostics) diagnostics.loopEntered = true
        const questionType = sequence[cursor % sequence.length]
        const beforeDialogueCount = getStore().dialogueLog.length
        const beforeState = getCurrentLie(target, disputeId)
        const beforeTurn = getStore().turnCount
        await dispatchTurn({ type: 'question', target, disputeId, questionType }, preferences)
        const afterState = getCurrentLie(target, disputeId)
        if (diagnostics) {
          diagnostics.afterDispatches.push({
            turnAfter: getStore().turnCount,
            turnAdvanced: getStore().turnCount > beforeTurn,
            hd3StateAfter: getStore().agentA.lieStateMap['h-d3']?.currentState,
            dialogueAdded: getStore().dialogueLog.length > beforeDialogueCount,
          })
        }
        const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
          speaker: entry.speaker,
          text: sliceText(entry.text, 220),
        }))
        turns.push({
          turn: cursor + 1,
          questionType,
          beforeState,
          afterState,
          freshDialogues,
        })
        cursor += 1
      }
      if (diagnostics) {
        diagnostics.finalState = getCurrentLie(target, disputeId)
        diagnostics.turnCountAfter = getStore().turnCount
        diagnostics.phaseAfter = getStore().currentPhase
      }
      return {
        finalState: getCurrentLie(target, disputeId),
        turns,
      }
    }

    function findLatestDialogue(speaker, fromIndex = 0) {
      const entries = getStore().dialogueLog.slice(fromIndex).filter((entry) => entry.speaker === speaker)
      const latest = entries[entries.length - 1]
      return latest ? sliceText(latest.text, 240) : null
    }

    function listTexts(selector) {
      return Array.from(document.querySelectorAll(selector))
        .map((node) => toText(node.textContent ?? node.innerText ?? ''))
        .filter(Boolean)
    }

    function listAttrs(selector, attr) {
      return Array.from(document.querySelectorAll(selector))
        .map((node) => toText(node.getAttribute?.(attr) ?? ''))
        .filter(Boolean)
    }

    function collectBodyLeaks(hiddenNames) {
      const bodyText = toText(document.body?.innerText ?? '')
      return hiddenNames.filter((name) => bodyText.includes(name))
    }

    async function closeQuestionChoicePanel() {
      const backdrop = document.querySelector('.pc-question-choice__backdrop')
      if (backdrop) {
        backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextFrame()
        await sleep(80)
      }
    }

    async function openQuestionChoicePanel() {
      const slots = Array.from(document.querySelectorAll('.hotbar-slots .slot'))
      if (slots[0]) {
        slots[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await waitFor(() => Boolean(document.querySelector('.pc-question-choice__panel')), 3000, 50)
        await nextFrame()
        await sleep(80)
      }
    }

    async function collectPhase3UiAudit(hiddenNames) {
      await openQuestionChoicePanel()
      const hotbarDisputeNames = listTexts('.pc-question-choice__dispute-name')
      await closeQuestionChoicePanel()

      return {
        bodyLeaks: collectBodyLeaks(hiddenNames),
        hotbarDisputeNames,
        hotbarLeakNames: hiddenNames.filter((name) => hotbarDisputeNames.some((text) => text.includes(name))),
        ribbonTitles: listAttrs('.pc-dispute-ribbon__chip', 'title'),
        ribbonChipCount: document.querySelectorAll('.pc-dispute-ribbon__chip').length,
        notesTabs: listTexts('.pc-notes-tab'),
        notesTabCount: document.querySelectorAll('.pc-notes-tab').length,
        evidenceNames: listTexts('.pc-ev-notebook__name'),
      }
    }

    function getUnlockedEvidenceIds() {
      return Object.entries(getStore().evidenceStates)
        .filter(([, entry]) => entry.unlocked)
        .map(([id]) => id)
    }

    function diffIds(before, after) {
      return after.filter((id) => !before.includes(id))
    }

    function getEffectiveMaxTurns() {
      return MAX_INTERROGATION_TURNS_FN()
    }

    function pushTurnCap(timeline, label) {
      const store = getStore()
      timeline.push({
        label,
        turnCount: store.turnCount,
        effectiveMaxTurns: getEffectiveMaxTurns(),
        discovery: Object.fromEntries(
          Object.entries(store.discovery.disputeVisibility ?? {}).map(([id, entry]) => [id, entry.visibility]),
        ),
      })
    }

    function filterScriptedTexts(logStart, pattern) {
      return getLogs(logStart)
        .filter((entry) => entry.text.includes('[Scripted]') && pattern.test(entry.text))
        .map((entry) => sliceText(entry.text, 220))
        .slice(0, 20)
    }

    function collectScriptedChannelHits(logStart, channel) {
      const token = `/${channel}/`
      return getLogs(logStart)
        .filter((entry) => entry.text.includes('[Scripted]') && entry.text.includes(token))
        .map((entry) => sliceText(entry.text, 220))
        .slice(0, 20)
    }

    function collectScriptedChannelMisses(logStart, channel) {
      const token = `/${channel}/`
      return getLogs(logStart)
        .filter((entry) => entry.text.includes('[Scripted miss]') && entry.text.includes(token))
        .map((entry) => sliceText(entry.text, 220))
        .slice(0, 20)
    }

    function rectSnapshot(node) {
      if (!node) return null
      const rect = node.getBoundingClientRect()
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
      }
    }

    function styleSnapshot(node) {
      if (!node) return null
      const style = window.getComputedStyle(node)
      return {
        display: style.display,
        position: style.position,
        flexDirection: style.flexDirection,
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        opacity: style.opacity,
      }
    }

    function collectInteractionPanelState() {
      const panel = document.querySelector('.pc-interaction-card')
      const actionWrap = panel?.querySelector('.pc-interaction-card__actions')
      return {
        exists: Boolean(panel),
        title: toText(panel?.querySelector('.pc-interaction-card__title')?.textContent ?? ''),
        subtitle: toText(panel?.querySelector('.pc-interaction-card__subtitle')?.textContent ?? ''),
        body: sliceText(panel?.querySelector('.pc-interaction-card__body')?.innerText ?? '', 320),
        tags: listTexts('.pc-interaction-card__tag'),
        actionTexts: listTexts('.pc-interaction-card__action'),
        actionCount: panel?.querySelectorAll('.pc-interaction-card__action').length ?? 0,
        className: toText(panel?.className ?? ''),
        rect: rectSnapshot(panel),
        actionsStyle: styleSnapshot(actionWrap),
      }
    }

    async function clickFirstEnabled(selector) {
      const nodes = Array.from(document.querySelectorAll(selector)).filter((node) => !node.disabled)
      const target = nodes[0]
      if (!target) return false
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextFrame()
      await sleep(120)
      return true
    }

    async function clickButtonByText(selector, pattern) {
      const buttons = Array.from(document.querySelectorAll(selector)).filter((button) => !button.disabled)
      const target = buttons.find((button) => pattern.test(toText(button.innerText ?? button.textContent ?? '')))
      if (!target) return false
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextFrame()
      await sleep(120)
      return true
    }

    function collectSystemPalette() {
      const rows = Array.from(document.querySelectorAll('.pc-log-system-row'))
      const result = {}
      for (const row of rows) {
        const rowClass = toText(row.className ?? '')
        const category = ['action', 'unlock', 'warning', 'success', 'witness', 'explainer', 'info']
          .find((key) => rowClass.includes(`is-${key}`))
        if (!category || result[category]) continue
        const card = row.querySelector('.pc-log-system-card, .pc-log-system-explainer')
        result[category] = {
          rowClass,
          cardClass: toText(card?.className ?? ''),
          backgroundColor: card ? window.getComputedStyle(card).backgroundColor : null,
          borderColor: card ? window.getComputedStyle(card).borderColor : null,
          text: sliceText(card?.innerText ?? '', 180),
        }
      }
      return result
    }

    function collectMediationUiState() {
      const root = document.querySelector('.pc-mediation')
      const optionsWrap = root?.querySelector('.pc-mediation__options')
      return {
        exists: Boolean(root),
        phaseHeader: toText(document.querySelector('.pc-play-phase')?.innerText ?? ''),
        title: toText(root?.querySelector('.pc-mediation__title')?.textContent ?? ''),
        subtitle: toText(root?.querySelector('.pc-mediation__subtitle')?.textContent ?? ''),
        optionLabels: listTexts('.pc-mediation__option-label'),
        optionCount: root?.querySelectorAll('.pc-mediation__option').length ?? 0,
        rect: rectSnapshot(root),
        style: styleSnapshot(root),
        optionsStyle: styleSnapshot(optionsWrap),
        advanceButtons: listTexts('.pc-mediation__advance-btn'),
      }
    }

    function collectVerdictUiState() {
      const root = document.querySelector('.pc-verdict-screen') ?? document.querySelector('.pc-verdict-main')
      const buttons = Array.from(document.querySelectorAll('.pc-verdict-fact__btn')).map((button) => ({
        text: toText(button.innerText ?? ''),
        main: toText(button.querySelector('.pc-verdict-fact__btn-main')?.textContent ?? ''),
        sub: toText(button.querySelector('.pc-verdict-fact__btn-sub')?.textContent ?? ''),
      }))
      return {
        exists: Boolean(root),
        phaseHeader: toText(document.querySelector('.pc-play-phase')?.innerText ?? ''),
        rect: rectSnapshot(root),
        style: styleSnapshot(root),
        factButtons: buttons,
        step: getVerdictStep(),
      }
    }

    async function collectRichResultScreenState() {
      const base = await collectResultScreenState()
      const heroActionWrap = document.querySelector('.pc-result-hero__actions')
      const tabButtons = Array.from(document.querySelectorAll('.pc-result-tab'))
      if (tabButtons[3]) {
        tabButtons[3].dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextFrame()
        await sleep(120)
      }
      const aftermathParagraphs = Array.from(document.querySelectorAll('.pc-result-panel p'))
        .map((node) => toText(node.textContent ?? ''))
        .filter(Boolean)
      return {
        ...base,
        aftermathParagraphs,
        heroActionButtons: listTexts('.pc-result-hero__button'),
        heroActionWrapStyle: styleSnapshot(heroActionWrap),
      }
    }

    async function navigateToCaseBrowserAudit() {
      const exited = await clickFirstEnabled('.pc-result-hero__button')
      await waitFor(() => Boolean(document.querySelector('.pc-home-v2')), 5000, 50)
      const homeVisible = Boolean(document.querySelector('.pc-home-v2'))
      const openedGeneral = homeVisible ? await clickFirstEnabled('.pc-mode-card') : false
      await waitFor(() => Boolean(document.querySelector('.pc-session-card-v2')), 5000, 50)
      const openedSession = await clickFirstEnabled('.pc-session-card-v2:not(.is-disabled)')
      await waitFor(() => Boolean(document.querySelector('.pc-case-browser-v2')), 5000, 50)
      const stageNode = document.querySelector('.pc-stage-node-v2')
      return {
        exited,
        homeVisible,
        openedGeneral,
        openedSession,
        browserVisible: Boolean(document.querySelector('.pc-case-browser-v2')),
        stageNodeText: toText(stageNode?.innerText ?? ''),
        stageNodeNumber: toText(stageNode?.querySelector('.pc-stage-node-v2__number')?.textContent ?? ''),
        stageNodeState: toText(stageNode?.querySelector('.pc-stage-node-v2__state')?.textContent ?? ''),
        stageNodeHasInlineTitle: Boolean(stageNode?.querySelector('h3, .pc-stage-node-v2__title')),
        stagePreviewTitle: toText(document.querySelector('.pc-stage-preview-v2 h3')?.textContent ?? ''),
      }
    }

    async function collectVerdictFactTitles() {
      const dots = Array.from(document.querySelectorAll('.pc-verdict-fact__dot'))
      const titles = []
      for (const dot of dots) {
        dot.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextFrame()
        await sleep(80)
        titles.push(toText(document.querySelector('.pc-verdict-fact__title')?.textContent ?? ''))
      }
      return {
        dotCount: dots.length,
        titles: [...new Set(titles.filter(Boolean))],
      }
    }

    async function collectResultScreenState() {
      const tabButtons = Array.from(document.querySelectorAll('.pc-result-tab'))
      const tabLabels = tabButtons.map((button) => toText(button.textContent ?? button.innerText ?? ''))
      const openTabAt = async (index) => {
        const buttons = Array.from(document.querySelectorAll('.pc-result-tab'))
        const button = buttons[index]
        if (!button) return false
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextFrame()
        await sleep(120)
        return true
      }

      await openTabAt(3)
      const aftermathText = sliceText(document.querySelector('.pc-result-panel')?.innerText ?? '', 700)

      await openTabAt(4)
      const verdictSummaryText = sliceText(document.querySelector('.pc-result-panel')?.innerText ?? '', 700)
      const heroText = sliceText(document.querySelector('.pc-result-hero')?.innerText ?? '', 420)
      const heroDisputeCountMatch = heroText.match(/쟁점\s*(\d+)개/)

      return {
        tabLabels,
        aftermathText,
        verdictSummaryText,
        heroText,
        heroDisputeCount: heroDisputeCountMatch ? Number(heroDisputeCountMatch[1]) : null,
      }
    }

    async function driveToResultFromCurrentPhase(mode = 'forced') {
      let phase6Ui = null
      let phase7Ui = null
      let verdictFact = null
      let verdictFlow = null
      let resultState = null

      if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
        const store = getStore()
        if (mode === 'forced' && !store.canAdvancePhase()) {
          store.setVerdictMode('forced_incomplete')
        }
        store.advancePhase(GamePhase.Phase6_Mediation)
        await waitFor(() => getStore().currentPhase === GamePhase.Phase6_Mediation, 5000, 50)
      }

      if (getStore().currentPhase === GamePhase.Phase6_Mediation) {
        await nextFrame()
        await sleep(150)
        phase6Ui = {
          text: sliceText(document.body?.innerText ?? '', 360),
          buttons: listTexts('button').slice(0, 14),
        }
        getStore().advancePhase()
        await waitFor(() => getStore().currentPhase === GamePhase.Phase7_Verdict, 5000, 50)
        await nextFrame()
        await sleep(150)
      }

      if (getStore().currentPhase === GamePhase.Phase7_Verdict) {
        phase7Ui = {
          step: getVerdictStep(),
          buttons: listTexts('button').slice(0, 16),
        }
        verdictFact = await collectVerdictFactTitles()
        prefillVerdict()
        const verdictSteps = await progressVerdictUi()
        verdictFlow = {
          verdictSteps,
          verdictScore: getStore().verdictScore,
          finalPhase: getStore().currentPhase,
        }
      }

      if (getStore().currentPhase === GamePhase.Result) {
        await nextFrame()
        await sleep(180)
        resultState = await collectResultScreenState()
      }

      return {
        phase6Ui,
        phase7Ui,
        verdictFact,
        verdictFlow,
        resultState,
      }
    }

    async function driveToResultWithConditionalMediation(mode = 'forced') {
      if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
        const store = getStore()
        if (mode === 'forced' && !store.canAdvancePhase()) {
          store.setVerdictMode('forced_incomplete')
        }
        store.advancePhase(GamePhase.Phase6_Mediation)
        await waitFor(() => getStore().currentPhase === GamePhase.Phase6_Mediation, 5000, 50)
      }

      await nextFrame()
      await sleep(150)
      const phase6Before = collectMediationUiState()
      const optionButtons = Array.from(document.querySelectorAll('.pc-mediation__option'))
      optionButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextFrame()
      await waitFor(() => !getStore().isLLMLoading, 8000, 50)
      await sleep(200)
      const phase6After = collectMediationUiState()
      if (document.querySelector('.pc-mediation__advance-btn')) {
        document.querySelector('.pc-mediation__advance-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      } else {
        getStore().advancePhase()
      }

      await waitFor(() => getStore().currentPhase === GamePhase.Phase7_Verdict, 5000, 50)
      await nextFrame()
      await sleep(150)
      const phase7Before = collectVerdictUiState()
      const verdictFact = await collectVerdictFactTitles()
      prefillVerdict()
      const verdictSteps = await progressVerdictUi()
      let resultState = null
      if (getStore().currentPhase === GamePhase.Result) {
        await nextFrame()
        await sleep(180)
        resultState = await collectRichResultScreenState()
      }
      return {
        phase6Before,
        phase6After,
        phase7Before,
        verdictFact,
        verdictSteps,
        verdictScore: getStore().verdictScore,
        resultState,
      }
    }

    async function ensureEvidenceChainUnlocked() {
      if (!getStore().evidenceStates['e-4']?.unlocked) {
        await questionToState({ target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', targetState: 'S1', maxTurns: 4 })
        if (!getStore().evidenceStates['e-4']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-3', target: 'a' })
        }
      }

      if (!getStore().evidenceStates['e-5']?.unlocked) {
        await questionToState({ target: 'b', disputeId: 'd-2', questionType: 'fact_pursuit', targetState: 'S2', maxTurns: 6 })
        if (!getStore().evidenceStates['e-5']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-4', target: 'b' })
        }
      }

      if (!getStore().discovery.disputeVisibility?.['h-d3'] || getStore().discovery.disputeVisibility['h-d3'].visibility === 'hidden') {
        const store = getStore()
        if (store.canRunCombinationRecipe('combine-5')) {
          const combo = store.runCombinationRecipe('combine-5')
          recordEvent('combination', { recipeId: 'combine-5', ok: combo.ok, reason: combo.reason ?? null, outputId: combo.outputId ?? null })
          await sleep(80)
          await resolvePending()
        }
      }

      if (!getStore().evidenceStates['e-6']?.unlocked) {
        await questionToState({ target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit', targetState: 'S2', maxTurns: 6 })
        if (!getStore().evidenceStates['e-6']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-5', target: 'a' })
        }
      }

      if (!getStore().evidenceStates['e-7']?.unlocked) {
        await questionToState({ target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit', targetState: 'S3', maxTurns: 4 })
        if (!getStore().evidenceStates['e-7']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-6', target: 'a' })
        }
      }

      return snapshotState()
    }

    async function presentEvidenceSequence(sequence) {
      const presented = []
      for (const [index, evidenceId] of sequence.entries()) {
        if (!getStore().evidenceStates[evidenceId]?.unlocked) continue
        const target = index % 2 === 0 ? 'a' : 'b'
        await dispatchTurn({ type: 'evidence_present', evidenceId, target })
        presented.push({
          evidenceId,
          target,
          dialogueTail: snapshotState().dialogueTail,
        })
      }
      return presented
    }

    async function executeDossierQuestion(target) {
      const store = getStore()
      const cards = getDossierCards(caseKey)
      const lieStates = target === 'a' ? store.agentA.lieStateMap : store.agentB.lieStateMap
      const lieMap = Object.fromEntries(Object.entries(lieStates).map(([id, entry]) => [id, entry.currentState]))
      for (const card of cards) {
        const questions = getAvailableDossierQuestions(caseKey, card.id, target, lieMap)
        if (questions.length === 0) continue
        const question = questions[0]
        const resolved = resolveDossierQuestion(caseKey, question.id)
        setDossierQuestionOverride(question.text ?? card.title ?? card.id)
        setSkipNextJudgeQuestion(true)
        if (resolved?.lieAdvance) {
          for (const disputeId of card.relatedDisputes ?? []) {
            store.transitionLie(target, disputeId, 'hard_evidence')
          }
        }
        if (resolved?.revealedAtom) {
          recordEvent('dossier', {
            cardId: card.id,
            questionId: question.id,
            revealedAtomId: resolved.revealedAtomId,
            blockedVector: resolved.blockedVector,
          })
        }
        evaluateDossierUnlock(caseKey, target, card.id)
        return {
          cardId: card.id,
          questionId: question.id,
          revealedAtomId: resolved?.revealedAtomId ?? null,
          lieAdvance: resolved?.lieAdvance ?? false,
          blockedVector: resolved?.blockedVector ?? null,
        }
      }
      return null
    }

    async function ensureTurnFloor(turnFloor) {
      let safety = 0
      while (getStore().turnCount < turnFloor && getStore().currentPhase === GamePhase.Phase3_Interrogation && safety < 8) {
        await dispatchTurn({ type: 'question', target: 'b', disputeId: 'd-2', questionType: 'motive_search' })
        safety += 1
      }
    }

    async function enterVerdict(mode = 'normal') {
      const store = getStore()
      if (store.currentPhase === GamePhase.Phase3_Interrogation) {
        if (mode === 'forced' && !store.canAdvancePhase()) {
          store.setVerdictMode('forced_incomplete')
        }
        if (store.canAdvancePhase() || mode === 'forced') {
          store.advancePhase(GamePhase.Phase6_Mediation)
          await sleep(100)
        }
      }
      if (getStore().currentPhase === GamePhase.Phase6_Mediation) {
        getStore().advancePhase()
        await sleep(120)
      }
      await waitFor(() => getStore().currentPhase === GamePhase.Phase7_Verdict, 5000, 50)
      await nextFrame()
      await sleep(150)
      return snapshotState()
    }

    function prefillVerdict() {
      const store = getStore()
      const caseData = store.caseData
      if (!caseData) return
      for (const dispute of caseData.disputes) {
        const lieA = store.agentA.lieStateMap[dispute.id]?.currentState ?? 'S0'
        const lieB = store.agentB.lieStateMap[dispute.id]?.currentState ?? 'S0'
        const value = lieA === 'S5' || lieB === 'S5' ? 'true' : 'pending'
        store.setFactFinding(dispute.id, value)
        const resp = dispute.correctResponsibility ?? { a: 50, b: 50 }
        store.setResponsibility(dispute.id, resp.a, resp.b)
      }
      for (const [category, options] of Object.entries(caseData.solutions ?? {})) {
        if (Array.isArray(options) && options[0]) {
          store.selectSolution(`${category}::${options[0]}`)
        }
      }
      for (const evidence of caseData.evidence ?? []) {
        if (store.evidenceStates[evidence.id]?.presented) {
          store.setEvidenceLegality(evidence.id, evidence.legitimacy === 'lawful')
        }
      }
    }

    function getVerdictStep() {
      const visibleButtons = Array.from(document.querySelectorAll('button')).filter((button) => button.offsetParent !== null)
      const texts = visibleButtons.map((button) => toText(button.innerText))
      if (texts.some((text) => text.includes('판결 확정') || text.includes('모든 쟁점'))) return 'confirm'
      if (document.querySelector('input[type="range"]')) return 'responsibility'
      if (texts.some((text) => text.includes('그렇') || text.includes('아니') || text.includes('모르'))) return 'fact'
      if (texts.some((text) => text.includes('사용')) && texts.some((text) => text.includes('제외'))) return 'legality'
      return 'solution'
    }

    async function progressVerdictUi() {
      const seenSteps = []
      let safety = 0
      while (getStore().currentPhase === GamePhase.Phase7_Verdict && safety < 10) {
        const step = getVerdictStep()
        if (!seenSteps.includes(step)) seenSteps.push(step)
        const visibleButtons = Array.from(document.querySelectorAll('button')).filter((button) => button.offsetParent !== null && !button.disabled)
        const nextButton = visibleButtons[visibleButtons.length - 1]
        if (!nextButton) break
        nextButton.click()
        await sleep(220)
        await nextFrame()
        safety += 1
        if (getStore().currentPhase === GamePhase.Result) break
      }
      await waitFor(() => getStore().currentPhase === GamePhase.Result, 8000, 50)
      await sleep(180)
      return seenSteps
    }

    function summarizeLogs(logStart) {
      const logs = getLogs(logStart)
      const scriptedMisses = logs.filter((entry) => entry.text.includes('[Scripted miss]'))
      const scriptedHits = logs.filter((entry) => entry.text.includes('[Scripted]'))
      const seriousErrors = logs.filter(isSeriousError)
      const typeErrors = logs.filter((entry) => /\bTypeError\b/.test(entry.text) || /\bundefined\b/i.test(entry.text))
      return {
        total: logs.length,
        scriptedHits: scriptedHits.length,
        scriptedMisses: scriptedMisses.length,
        scriptedMissTexts: scriptedMisses.map((entry) => sliceText(entry.text, 220)).slice(0, 20),
        scriptedHitTexts: scriptedHits.map((entry) => sliceText(entry.text, 220)).slice(0, 20),
        seriousErrors: seriousErrors.map((entry) => sliceText(entry.text, 220)).slice(0, 12),
        typeErrorLike: typeErrors.map((entry) => sliceText(entry.text, 220)).slice(0, 12),
      }
    }

    async function initRun(choiceIndex = 0) {
      clearScriptedCache()
      getStore().initializeCase(cloneCaseData())
      getStore().setVerdictMode('normal')
      await nextFrame()
      await waitFor(() => !document.querySelector('.pc-loading-screen'), 15000, 100)
      await sleep(350)
      await playIntro(choiceIndex)
      await waitFor(() => getStore().currentPhase === GamePhase.Phase3_Interrogation, 12000, 50)
      await sleep(120)
      await resolvePending()
      return snapshotState()
    }

    function hasStyleIssue(text) {
      if (typeof text !== 'string') return false
      return [
        '미리 말씀',
        '사전 상의',
        '특정 ',
        '...'
      ].some((token) => text.includes(token))
    }

    function getEvidenceTarget(evidenceId, fallback = 'a') {
      const evidence = getStore().caseData?.evidence?.find((item) => item.id === evidenceId)
      if (!evidence) return fallback
      if (evidence.subjectParty === 'a') return 'a'
      if (evidence.subjectParty === 'b') return 'b'
      return fallback
    }

    async function advanceDisputeTo({
      disputeId,
      preferredTarget = 'b',
      targetState = 'S2',
      maxTurns = 10,
      preferences = { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
    }) {
      const store = getStore()
      const candidates = preferredTarget === 'b' ? ['b', 'a'] : ['a', 'b']
      for (const target of candidates) {
        if (!store[target === 'a' ? 'agentA' : 'agentB'].lieStateMap?.[disputeId]) continue
        const progress = await questionSequenceToState({
          target,
          disputeId,
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState,
          maxTurns,
          preferences,
        })
        if (stateRank[progress.finalState] >= stateRank[targetState]) {
          return { target, progress }
        }
      }
      return null
    }

    async function advanceExactDisputeTo({
      target,
      disputeId,
      targetState = 'S2',
      maxTurns = 10,
      preferences = { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
    }) {
      const store = getStore()
      const agent = target === 'a' ? store.agentA : store.agentB
      if (!agent.lieStateMap?.[disputeId]) {
        return null
      }
      return questionSequenceToState({
        target,
        disputeId,
        sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
        targetState,
        maxTurns,
        preferences,
      })
    }

    async function presentAllUnlockedEvidence() {
      const entries = []
      for (const evidence of getStore().caseData?.evidence ?? []) {
        const state = getStore().evidenceStates[evidence.id]
        if (!state?.unlocked || state.presented) continue
        const beforeDialogue = getStore().dialogueLog.length
        const target = getEvidenceTarget(evidence.id, 'b')
        await dispatchTurn({ type: 'evidence_present', evidenceId: evidence.id, target })
        entries.push({
          evidenceId: evidence.id,
          target,
          freshDialogues: getStore().dialogueLog.slice(beforeDialogue).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          })),
        })
      }
      return entries
    }

    async function presentEvidenceStep(evidenceId, fallbackTarget = 'b') {
      const state = getStore().evidenceStates[evidenceId]
      const target = getEvidenceTarget(evidenceId, fallbackTarget)
      const beforeDialogue = getStore().dialogueLog.length
      const beforeUnlocked = getUnlockedEvidenceIds()
      if (!state?.unlocked) {
        return {
          evidenceId,
          target,
          attempted: false,
          unlockedBefore: beforeUnlocked,
          unlockedAfter: beforeUnlocked,
          newUnlocked: [],
          freshDialogues: [],
        }
      }
      await dispatchTurn({ type: 'evidence_present', evidenceId, target })
      const afterUnlocked = getUnlockedEvidenceIds()
      return {
        evidenceId,
        target,
        attempted: true,
        unlockedBefore: beforeUnlocked,
        unlockedAfter: afterUnlocked,
        newUnlocked: diffIds(beforeUnlocked, afterUnlocked),
        freshDialogues: getStore().dialogueLog.slice(beforeDialogue).map((entry) => ({
          speaker: entry.speaker,
          text: sliceText(entry.text, 220),
        })),
      }
    }

    async function executeUnlockChain(disputePlan) {
      console.log(`[thread-q] executeUnlockChain start ${disputePlan.map((plan) => `${plan.disputeId}:${plan.targetState}`).join(', ')}`)
      const hiddenNames = (getStore().caseData?.disputes ?? [])
        .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
        .map((dispute) => dispute.name)
      const turnCapTimeline = []
      const steps = []
      const evidenceTimeline = []
      let previousUnlocked = getUnlockedEvidenceIds()
      pushTurnCap(turnCapTimeline, 'start')
      evidenceTimeline.push({ label: 'start', unlocked: [...previousUnlocked], newIds: [...previousUnlocked] })

      const markEvidence = (label) => {
        const current = getUnlockedEvidenceIds()
        evidenceTimeline.push({
          label,
          unlocked: [...current],
          newIds: diffIds(previousUnlocked, current),
        })
        previousUnlocked = current
      }

      for (const plan of disputePlan) {
        console.log(`[thread-q] unlock step ${plan.disputeId} target ${plan.targetState}`)
        const beforeUi = await collectPhase3UiAudit(hiddenNames)
        const result = await advanceDisputeTo(plan)
        console.log(`[thread-q] unlock step ${plan.disputeId} result ${result?.target ?? 'none'}:${result?.progress?.finalState ?? 'null'}`)
        const presented = await presentAllUnlockedEvidence()
        markEvidence(`after_${plan.disputeId}`)
        pushTurnCap(turnCapTimeline, `after_${plan.disputeId}`)
        const afterUi = await collectPhase3UiAudit(hiddenNames)
        steps.push({
          disputeId: plan.disputeId,
          targetState: plan.targetState,
          result,
          beforeUi,
          afterUi,
          presented,
        })
      }

      return { steps, turnCapTimeline, evidenceTimeline }
    }

    async function collectDialogueSamples(samplePlan) {
      console.log(`[thread-q] collectDialogueSamples start ${samplePlan.map((item) => `${item.target}:${item.disputeId}:${item.questionType}`).join(', ')}`)
      const samples = []
      for (const item of samplePlan) {
        const target = item.target
        const disputeId = item.disputeId
        const questionType = item.questionType
        if (!getStore()[target === 'a' ? 'agentA' : 'agentB'].lieStateMap?.[disputeId]) continue
        const beforeDialogue = getStore().dialogueLog.length
        const beforeState = getCurrentLie(target, disputeId)
        await dispatchTurn(
          { type: 'question', target, disputeId, questionType },
          { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        )
        const afterState = getCurrentLie(target, disputeId)
        const freshDialogues = getStore().dialogueLog.slice(beforeDialogue).map((entry) => ({
          speaker: entry.speaker,
          text: sliceText(entry.text, 220),
        }))
        samples.push({
          target,
          disputeId,
          questionType,
          beforeState,
          afterState,
          freshDialogues,
        })
      }
      return samples
    }

    async function initCaseOnly() {
      clearScriptedCache()
      getStore().initializeCase(cloneCaseData())
      getStore().setVerdictMode('normal')
      await nextFrame()
      await waitFor(() => !document.querySelector('.pc-loading-screen'), 15000, 100)
      await waitFor(() => getStore().currentPhase === GamePhase.Phase0_CaseIntro, 8000, 50)
      await sleep(200)
      return snapshotState()
    }

    async function runStrategy(strategy) {
      activeRunMeta = { events: [], notes: [] }
      const logStart = getLogs().length
      if (strategy.id === 201) {
        await initCaseOnly()
      } else {
        await initRun(strategy.choiceIndex ?? 0)
      }

      let detail = {}

      if (strategy.id === 1) {
        const finalState = await questionToState({
          target: 'a',
          disputeId: 'd-1',
          questionType: 'fact_pursuit',
          targetState: 'S5',
          maxTurns: 12,
        })
        detail = { target: getPartyName('a'), disputeId: 'd-1', finalState }
      }

      if (strategy.id === 2) {
        const finalState = await questionToState({
          target: 'b',
          disputeId: 'd-1',
          questionType: 'empathy_approach',
          targetState: 'S5',
          maxTurns: 12,
          preferences: { outburst: 'calm' },
        })
        detail = { target: getPartyName('b'), disputeId: 'd-1', finalState }
      }

      if (strategy.id === 3) {
        const sequence = [
          { target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
          { target: 'b', disputeId: 'd-1', questionType: 'motive_search' },
          { target: 'a', disputeId: 'd-1', questionType: 'empathy_approach' },
          { target: 'b', disputeId: 'd-1', questionType: 'fact_pursuit' },
          { target: 'a', disputeId: 'd-1', questionType: 'motive_search' },
          { target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' },
        ]
        let cursor = 0
        while (
          (stateRank[getCurrentLie('a', 'd-1')] < stateRank.S3 || stateRank[getCurrentLie('b', 'd-1')] < stateRank.S3) &&
          getStore().turnCount < 12 &&
          getStore().currentPhase === GamePhase.Phase3_Interrogation
        ) {
          const action = sequence[cursor % sequence.length]
          await dispatchTurn({ type: 'question', ...action })
          cursor += 1
        }
        detail = { aD1: getCurrentLie('a', 'd-1'), bD1: getCurrentLie('b', 'd-1'), turns: getStore().turnCount }
      }

      if (strategy.id === 4) {
        await ensureEvidenceChainUnlocked()
        const presented = await presentEvidenceSequence(['e-1', 'e-2', 'e-3', 'e-4', 'e-5', 'e-6', 'e-7'])
        detail = { presented, unlocked: snapshotState().evidence.unlocked }
      }

      if (strategy.id === 5) {
        await ensureEvidenceChainUnlocked()
        const recipeResults = []
        for (const recipeId of ['combine-1', 'combine-2', 'combine-3', 'combine-4', 'combine-5', 'combine-6']) {
          const store = getStore()
          const beforePoints = store.combinationLabRuntime.analysisPoints
          const canRun = store.canRunCombinationRecipe(recipeId)
          const result = store.runCombinationRecipe(recipeId)
          recipeResults.push({
            recipeId,
            canRun,
            beforePoints,
            ok: result.ok,
            reason: result.reason ?? null,
            outputId: result.outputId ?? null,
            afterPoints: getStore().combinationLabRuntime.analysisPoints,
          })
          recordEvent('combination', recipeResults[recipeResults.length - 1])
          await sleep(80)
          await resolvePending()
        }
        const dossier = await executeDossierQuestion('a')
        detail = { recipeResults, dossier, combination: snapshotState().combination }
      }

      if (strategy.id === 6) {
        await questionToState({ target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', targetState: 'S3', maxTurns: 8 })
        await questionToState({ target: 'a', disputeId: 'd-2', questionType: 'fact_pursuit', targetState: 'S2', maxTurns: 6 })
        if (!getStore().evidenceStates['e-5']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-4', target: 'a' })
        }
        if (getStore().canRunCombinationRecipe('combine-5')) {
          const result = getStore().runCombinationRecipe('combine-5')
          recordEvent('combination', { recipeId: 'combine-5', ok: result.ok, reason: result.reason ?? null, outputId: result.outputId ?? null })
          await sleep(80)
        }
        await resolvePending()
        await questionToState({ target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit', targetState: 'S3', maxTurns: 8 })
        if (!getStore().evidenceStates['e-6']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-5', target: 'a' })
        }
        if (!getStore().evidenceStates['e-7']?.unlocked && getStore().evidenceStates['e-6']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-6', target: 'a' })
        }
        if (getStore().evidenceStates['e-7']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-7', target: 'a' })
        }
        detail = {
          discovery: snapshotState().discovery,
          lieStates: snapshotState().lieStates,
          evidence: snapshotState().evidence,
        }
      }

      if (strategy.id === 7) {
        const witnessSummaries = []
        for (const witnessId of ['w-1', 'w-2', 'w-3']) {
          if (witnessId === 'w-2') {
            await ensureEvidenceChainUnlocked()
            await questionToState({ target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit', targetState: 'S2', maxTurns: 4 })
          }
          if (witnessId === 'w-3') {
            await ensureEvidenceChainUnlocked()
            await questionToState({ target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit', targetState: 'S4', maxTurns: 6 })
          }
          const store = getStore()
          const witness = store.caseData.duo.socialGraph.find((entry) => entry.id === witnessId)
          const expectedDepth = determineTestimonyDepth(witness, store.getLieState)
          const beforeCount = getStore().dialogueLog.length
          await dispatchTurn({ type: 'call_witness', witnessId })
          const witnessEntry = getStore().dialogueLog.slice(beforeCount).find((entry) => entry.speaker === 'witness')
          const sentenceCount = toText(witnessEntry?.text ?? '').split(/[.!?]\s*/).filter(Boolean).length
          witnessSummaries.push({
            witnessId,
            expectedDepth,
            sentenceCount,
            text: sliceText(witnessEntry?.text ?? '', 240),
          })
        }
        detail = { witnessSummaries }
      }

      if (strategy.id === 8) {
        await questionToState({ target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', targetState: 'S5', maxTurns: 8 })
        await ensureTurnFloor(6)
        await enterVerdict('normal')
        prefillVerdict()
        const verdictSteps = await progressVerdictUi()
        detail = { verdictSteps, verdictScore: getStore().verdictScore }
      }

      if (strategy.id === 9) {
        const filler = [
          { target: 'a', disputeId: 'h-d4', questionType: 'motive_search' },
          { target: 'b', disputeId: 'h-d4', questionType: 'motive_search' },
          { target: 'a', disputeId: 'd-2', questionType: 'motive_search' },
          { target: 'b', disputeId: 'd-2', questionType: 'motive_search' },
        ]
        let cursor = 0
        while (getStore().currentPhase === GamePhase.Phase3_Interrogation && getStore().turnCount < 16) {
          const action = filler[cursor % filler.length]
          await dispatchTurn({ type: 'question', ...action }, { contradiction: 'let_go', interjection: 'block', outburst: 'calm' })
          cursor += 1
        }
        if (getStore().currentPhase === GamePhase.Phase6_Mediation || getStore().currentPhase === GamePhase.Phase7_Verdict) {
          await enterVerdict('forced')
          prefillVerdict()
          const verdictSteps = await progressVerdictUi()
          detail = {
            forcedReached: true,
            verdictMode: getStore().verdictMode,
            verdictSteps,
            verdictScore: getStore().verdictScore,
          }
        } else {
          detail = {
            forcedReached: false,
            verdictMode: getStore().verdictMode,
            turnCount: getStore().turnCount,
          }
        }
      }

      if (strategy.id === 10) {
        for (let i = 0; i < 4; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { interjection: 'allow', outburst: 'press' },
          )
        }
        detail = {
          eventTrail: activeRunMeta.events,
          dialogueTail: snapshotState().dialogueTail,
        }
      }

      if (strategy.id === 101) {
        const factTurns = []
        let warningTurn = null
        let transitionTurn = null

        for (let i = 0; i < 5; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeState = getCurrentLie('a', 'd-1')
          const beforeDialogueCount = getStore().dialogueLog.length
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { contradiction: 'point_out', outburst: 'press' },
          )
          const afterState = getCurrentLie('a', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          const sawWarning = freshDialogues.some((entry) => entry.text.includes('모순이 쌓이고 있습니다'))
          if (sawWarning && warningTurn == null) warningTurn = i + 1
          if (afterState !== beforeState && transitionTurn == null) transitionTurn = i + 1
          factTurns.push({
            turn: i + 1,
            beforeState,
            afterState,
            freshDialogues,
          })
          if (stateRank[afterState] >= stateRank.S1) break
        }

        let motiveFollowUp = null
        if (stateRank[getCurrentLie('a', 'd-1')] >= stateRank.S1 && getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'motive_search' },
            { contradiction: 'point_out', outburst: 'press' },
          )
          motiveFollowUp = {
            beforeState,
            afterState: getCurrentLie('a', 'd-1'),
            freshDialogues: getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
              speaker: entry.speaker,
              text: sliceText(entry.text, 220),
            })),
          }
        }

        detail = {
          check: 'fact_pursuit transition',
          target: getPartyName('a'),
          disputeId: 'd-1',
          factTurns,
          warningTurn,
          transitionTurn,
          warningToNextTurnTransition: warningTurn != null && transitionTurn === warningTurn + 1,
          finalFactState: getCurrentLie('a', 'd-1'),
          motiveFollowUp,
          reachedS1: stateRank[getCurrentLie('a', 'd-1')] >= stateRank.S1,
          motiveReachedS2: motiveFollowUp ? stateRank[motiveFollowUp.afterState] >= stateRank.S2 : false,
        }
      }

      if (strategy.id === 102) {
        const forbiddenPattern = /(위임장|공동 적금|적금을 깼|투자방)/
        const aChecks = []
        const aSequence = ['fact_pursuit', 'motive_search', 'empathy_approach', 'fact_pursuit', 'motive_search']

        for (const questionType of aSequence) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-2')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-2', questionType },
            { contradiction: 'point_out', outburst: 'calm' },
          )
          const afterState = getCurrentLie('a', 'd-2')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          const aText = freshDialogues.filter((entry) => entry.speaker === 'a').map((entry) => entry.text).join(' | ')
          aChecks.push({
            questionType,
            beforeState,
            afterState,
            aText,
            freshDialogues,
          })
          if (stateRank[afterState] >= stateRank.S3) break
        }

        const aTexts = aChecks.map((entry) => entry.aText).filter(Boolean)
        const forbiddenHits = aTexts.filter((text) => forbiddenPattern.test(text))
        const aMaxState = getCurrentLie('a', 'd-2')
        const requestedBadKeys = getLogs(logStart)
          .filter((entry) => /a\|d-2\|S4|a\|d-2\|S5/.test(entry.text))
          .map((entry) => sliceText(entry.text, 220))
          .slice(0, 12)

        const bProgress = await questionSequenceToState({
          target: 'b',
          disputeId: 'd-2',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S5',
          maxTurns: 10,
          preferences: { contradiction: 'point_out', outburst: 'calm' },
        })

        detail = {
          check: 'd-2 mapping and cap',
          aChecks,
          aMaxState,
          aForbiddenHits: forbiddenHits,
          badRequestedKeys: requestedBadKeys,
          bProgress,
          bFinalState: bProgress.finalState,
          aStayedAtOrBelowS3: stateRank[aMaxState] <= stateRank.S3,
          bReachedS5: stateRank[bProgress.finalState] >= stateRank.S5,
        }
      }

      if (strategy.id === 103) {
        const empathyTurns = []
        let firstTransitionAttempt = null

        for (let i = 0; i < 3; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('b', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' },
            { contradiction: 'point_out', outburst: 'calm' },
          )
          const afterState = getCurrentLie('b', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          empathyTurns.push({
            attempt: i + 1,
            beforeState,
            afterState,
            freshDialogues,
          })
          if (afterState !== beforeState && firstTransitionAttempt == null) {
            firstTransitionAttempt = i + 1
          }
        }

        if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          await ensureEvidenceChainUnlocked()
        }

        if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          const filler = [
            { target: 'a', disputeId: 'd-1', questionType: 'motive_search' },
            { target: 'b', disputeId: 'd-2', questionType: 'fact_pursuit' },
            { target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit' },
            { target: 'b', disputeId: 'h-d4', questionType: 'motive_search' },
          ]
          let cursor = 0
          while (getStore().currentPhase === GamePhase.Phase3_Interrogation && getStore().turnCount < 16) {
            const action = filler[cursor % filler.length]
            await dispatchTurn({ type: 'question', ...action }, { contradiction: 'point_out', interjection: 'allow', outburst: 'calm' })
            cursor += 1
          }
        }

        let verdictFlow = null
        if (
          getStore().currentPhase === GamePhase.Phase3_Interrogation ||
          getStore().currentPhase === GamePhase.Phase6_Mediation ||
          getStore().currentPhase === GamePhase.Phase7_Verdict
        ) {
          await enterVerdict('forced')
          prefillVerdict()
          const verdictSteps = await progressVerdictUi()
          verdictFlow = {
            verdictSteps,
            verdictScore: getStore().verdictScore,
            finalPhase: getStore().currentPhase,
          }
        }

        detail = {
          check: 'empathy guarantee and full verdict',
          empathyTurns,
          firstTransitionAttempt,
          guaranteedWithinThree: firstTransitionAttempt != null && firstTransitionAttempt <= 3,
          discovery: snapshotState().discovery,
          lieStates: snapshotState().lieStates,
          verdictFlow,
          eventTrail: activeRunMeta.events,
        }
      }

      if (strategy.id === 201) {
        const caseData = getStore().caseData
        const hiddenDisputes = (caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => ({ id: dispute.id, name: dispute.name }))
        const hiddenNames = hiddenDisputes.map((entry) => entry.name)
        const visibleDisputes = (caseData?.disputes ?? [])
          .filter((dispute) => !dispute.hidden && dispute.v3Visibility !== 'hidden')
          .map((dispute) => ({ id: dispute.id, name: dispute.name }))

        const briefDisputeNames = listTexts('.pc-brief__dispute-name')
        const briefAudit = {
          disputeNames: briefDisputeNames,
          disputeLeakNames: hiddenNames.filter((name) => briefDisputeNames.some((text) => text.includes(name))),
          bodyLeaks: collectBodyLeaks(hiddenNames),
          briefCardCount: document.querySelectorAll('.pc-brief__dispute-card').length,
          initialVisibleDisputeCount: visibleDisputes.length,
        }

        await playIntro(strategy.choiceIndex ?? 0)
        await waitFor(() => getStore().currentPhase === GamePhase.Phase3_Interrogation, 12000, 50)
        await sleep(160)

        const initialSnapshot = snapshotState()
        const phase3Audit = await collectPhase3UiAudit(hiddenNames)
        const initialUnlockedEvidence = [...initialSnapshot.evidence.unlocked]
        const initialHiddenEvidenceState = {
          'e-6': getStore().evidenceStates['e-6']?.unlocked ?? false,
          'e-7': getStore().evidenceStates['e-7']?.unlocked ?? false,
        }

        const hD3Before = getStore().discovery.disputeVisibility?.['h-d3']?.visibility ?? 'hidden'
        await ensureEvidenceChainUnlocked()
        const hD3After = getStore().discovery.disputeVisibility?.['h-d3']?.visibility ?? 'hidden'
        const postEmergeAudit = await collectPhase3UiAudit(hiddenNames)
        const hD4Name = hiddenDisputes.find((entry) => entry.id === 'h-d4')?.name ?? 'h-d4'
        const hD4DialogueLeakTexts = getStore().dialogueLog
          .filter((entry) => toText(entry.text).includes(hD4Name))
          .map((entry) => `${entry.speaker}: ${sliceText(entry.text, 220)}`)
          .slice(0, 12)
        const hD4SystemLeakTexts = getStore().dialogueLog
          .filter((entry) => entry.speaker === 'system' && toText(entry.text).includes(hD4Name))
          .map((entry) => sliceText(entry.text, 220))
          .slice(0, 12)

        detail = {
          check: 'hidden dispute non-exposure',
          hiddenDisputes,
          hD4Name,
          visibleDisputes,
          briefAudit,
          phase3Audit,
          initialDiscovery: initialSnapshot.discovery,
          initialUnlockedEvidence,
          initialHiddenEvidenceState,
          evidenceChain: {
            baseEvidenceIds: [...(caseData?.baseEvidenceIds ?? [])],
            unlockedAtStart: initialUnlockedEvidence,
            unlockedAfterChain: snapshotState().evidence.unlocked,
          },
          hD3Transition: {
            before: hD3Before,
            after: hD3After,
          },
          postEmergeAudit,
          hD4DialogueLeakTexts,
          hD4SystemLeakTexts,
          postDiscovery: snapshotState().discovery,
        }
      }

      if (strategy.id === 202) {
        const factTurns = []
        let warningTurn = null
        let transitionTurn = null

        for (let i = 0; i < 5; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeState = getCurrentLie('a', 'd-1')
          const beforeDialogueCount = getStore().dialogueLog.length
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { contradiction: 'point_out', outburst: 'press' },
          )
          const afterState = getCurrentLie('a', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          const sawWarning = freshDialogues.some((entry) => entry.text.includes('모순이 쌓이고 있습니다'))
          if (sawWarning && warningTurn == null) warningTurn = i + 1
          if (afterState !== beforeState && transitionTurn == null) transitionTurn = i + 1
          factTurns.push({
            turn: i + 1,
            beforeState,
            afterState,
            freshDialogues,
          })
          if (stateRank[afterState] >= stateRank.S1) break
        }

        let motiveFollowUp = null
        if (stateRank[getCurrentLie('a', 'd-1')] >= stateRank.S1 && getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'motive_search' },
            { contradiction: 'point_out', outburst: 'press' },
          )
          motiveFollowUp = {
            beforeState,
            afterState: getCurrentLie('a', 'd-1'),
            freshDialogues: getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
              speaker: entry.speaker,
              text: sliceText(entry.text, 220),
            })),
          }
        }

        const forbiddenPattern = /(위임장|공동 적금|적금을 깼|투자방)/
        const aChecks = []
        const aSequence = ['fact_pursuit', 'motive_search', 'empathy_approach', 'fact_pursuit', 'motive_search']

        for (const questionType of aSequence) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-2')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-2', questionType },
            { contradiction: 'point_out', outburst: 'calm' },
          )
          const afterState = getCurrentLie('a', 'd-2')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          const aText = freshDialogues.filter((entry) => entry.speaker === 'a').map((entry) => entry.text).join(' | ')
          aChecks.push({
            questionType,
            beforeState,
            afterState,
            aText,
            freshDialogues,
          })
          if (stateRank[afterState] >= stateRank.S3) break
        }

        const aTexts = aChecks.map((entry) => entry.aText).filter(Boolean)
        const forbiddenHits = aTexts.filter((text) => forbiddenPattern.test(text))
        const aMaxState = getCurrentLie('a', 'd-2')
        const requestedBadKeys = getLogs(logStart)
          .filter((entry) => /a\|d-2\|S4|a\|d-2\|S5/.test(entry.text))
          .map((entry) => sliceText(entry.text, 220))
          .slice(0, 12)

        const bProgress = await questionSequenceToState({
          target: 'b',
          disputeId: 'd-2',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S5',
          maxTurns: 10,
          preferences: { contradiction: 'point_out', outburst: 'calm' },
        })

        detail = {
          check: 'fact transition and d-2 mapping',
          factTurns,
          warningTurn,
          transitionTurn,
          warningToNextTurnTransition: warningTurn != null && transitionTurn === warningTurn + 1,
          finalFactState: getCurrentLie('a', 'd-1'),
          motiveFollowUp,
          reachedS1: stateRank[getCurrentLie('a', 'd-1')] >= stateRank.S1,
          motiveReachedS2: motiveFollowUp ? stateRank[motiveFollowUp.afterState] >= stateRank.S2 : false,
          aChecks,
          aMaxState,
          aForbiddenHits: forbiddenHits,
          badRequestedKeys: requestedBadKeys,
          bProgress,
          bFinalState: bProgress.finalState,
          aStayedAtOrBelowS3: stateRank[aMaxState] <= stateRank.S3,
          bReachedS5: stateRank[bProgress.finalState] >= stateRank.S5,
        }
      }

      if (strategy.id === 203) {
        const empathyTurns = []
        let firstTransitionAttempt = null

        for (let i = 0; i < 3; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('b', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' },
            { contradiction: 'point_out', outburst: 'calm' },
          )
          const afterState = getCurrentLie('b', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          empathyTurns.push({
            attempt: i + 1,
            beforeState,
            afterState,
            freshDialogues,
          })
          if (afterState !== beforeState && firstTransitionAttempt == null) {
            firstTransitionAttempt = i + 1
          }
        }

        for (let i = 0; i < 4; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { contradiction: 'point_out', interjection: 'allow', outburst: 'press' },
          )
        }

        if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          await ensureEvidenceChainUnlocked()
        }

        if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          const filler = [
            { target: 'a', disputeId: 'h-d3', questionType: 'fact_pursuit' },
            { target: 'b', disputeId: 'd-2', questionType: 'motive_search' },
            { target: 'a', disputeId: 'h-d3', questionType: 'motive_search' },
            { target: 'b', disputeId: 'h-d4', questionType: 'empathy_approach' },
          ]
          let cursor = 0
          while (
            getStore().currentPhase === GamePhase.Phase3_Interrogation &&
            getStore().turnCount < 16 &&
            (getStore().discovery.disputeVisibility?.['h-d4']?.visibility ?? 'hidden') === 'hidden'
          ) {
            const action = filler[cursor % filler.length]
            await dispatchTurn(
              { type: 'question', ...action },
              { contradiction: 'point_out', interjection: 'allow', outburst: 'calm' },
            )
            cursor += 1
          }
        }

        let phase6Ui = null
        if (getStore().currentPhase === GamePhase.Phase3_Interrogation) {
          const store = getStore()
          if (!store.canAdvancePhase()) {
            store.setVerdictMode('forced_incomplete')
          }
          store.advancePhase(GamePhase.Phase6_Mediation)
          await waitFor(() => getStore().currentPhase === GamePhase.Phase6_Mediation, 5000, 50)
        }

        if (getStore().currentPhase === GamePhase.Phase6_Mediation) {
          await nextFrame()
          await sleep(150)
          phase6Ui = {
            text: sliceText(document.body?.innerText ?? '', 360),
            buttons: listTexts('button').slice(0, 12),
          }
          getStore().advancePhase()
          await waitFor(() => getStore().currentPhase === GamePhase.Phase7_Verdict, 5000, 50)
          await nextFrame()
          await sleep(150)
        }

        const phase7Ui = getStore().currentPhase === GamePhase.Phase7_Verdict
          ? {
              step: getVerdictStep(),
              buttons: listTexts('button').slice(0, 12),
            }
          : null

        let verdictFlow = null
        if (getStore().currentPhase === GamePhase.Phase7_Verdict) {
          prefillVerdict()
          const verdictSteps = await progressVerdictUi()
          verdictFlow = {
            verdictSteps,
            verdictScore: getStore().verdictScore,
            finalPhase: getStore().currentPhase,
          }
        }

        detail = {
          check: 'empathy guarantee and full verdict',
          empathyTurns,
          firstTransitionAttempt,
          guaranteedWithinThree: firstTransitionAttempt != null && firstTransitionAttempt <= 3,
          discovery: snapshotState().discovery,
          lieStates: snapshotState().lieStates,
          phase6Ui,
          phase7Ui,
          verdictFlow,
          eventTrail: activeRunMeta.events,
          finalLoadingState: getStore().isLLMLoading,
          dispatchWarnings: getLogs(logStart)
            .filter((entry) => entry.text.includes('[dispatch]'))
            .map((entry) => sliceText(entry.text, 220))
            .slice(0, 12),
        }
      }

      if (strategy.id === 301) {
        const caseData = getStore().caseData
        const hiddenDisputes = (caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => ({ id: dispute.id, name: dispute.name }))
        const hiddenNames = hiddenDisputes.map((entry) => entry.name)
        const d2Name = caseData?.disputes.find((item) => item.id === 'd-2')?.name ?? 'd-2'
        const hD3Name = caseData?.disputes.find((item) => item.id === 'h-d3')?.name ?? 'h-d3'
        const hD4Name = caseData?.disputes.find((item) => item.id === 'h-d4')?.name ?? 'h-d4'

        const initialSnapshot = snapshotState()
        const initialUi = await collectPhase3UiAudit(hiddenNames)
        const turnCapTimeline = []
        pushTurnCap(turnCapTimeline, 'start')
        let previousUnlocked = getUnlockedEvidenceIds()
        const evidenceTimeline = [
          { label: 'start', unlocked: [...previousUnlocked], newIds: [...previousUnlocked] },
        ]
        const markEvidence = (label) => {
          const current = getUnlockedEvidenceIds()
          evidenceTimeline.push({
            label,
            unlocked: [...current],
            newIds: diffIds(previousUnlocked, current),
          })
          previousUnlocked = current
        }

        const aD1Progress = await questionSequenceToState({
          target: 'a',
          disputeId: 'd-1',
          sequence: ['fact_pursuit', 'motive_search', 'fact_pursuit', 'empathy_approach'],
          targetState: 'S3',
          maxTurns: 8,
          preferences: { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
        })
        markEvidence('after_a_d1_to_s3')
        pushTurnCap(turnCapTimeline, 'after_a_d1_to_s3')
        const afterD2Ui = await collectPhase3UiAudit(hiddenNames)

        const aD2Progress = await questionSequenceToState({
          target: 'a',
          disputeId: 'd-2',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S1',
          maxTurns: 4,
          preferences: { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        })
        const d2ScriptedHits = filterScriptedTexts(logStart, /interrogation\/a\|d-2\|/)

        const bD2Progress = await questionSequenceToState({
          target: 'b',
          disputeId: 'd-2',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S2',
          maxTurns: 6,
          preferences: { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        })
        markEvidence('after_b_d2_to_s2')
        pushTurnCap(turnCapTimeline, 'after_b_d2_to_s2')
        const afterHD3Ui = await collectPhase3UiAudit(hiddenNames)

        const hD3Diag = {
          aHasHD3: !!getStore().agentA.lieStateMap['h-d3'],
          bHasHD3: !!getStore().agentB.lieStateMap['h-d3'],
          aHD3State: getStore().agentA.lieStateMap['h-d3']?.currentState ?? 'MISSING',
          bHD3State: getStore().agentB.lieStateMap['h-d3']?.currentState ?? 'MISSING',
          hd3Visibility: getStore().discovery.disputeVisibility['h-d3']?.visibility ?? 'MISSING',
          aD2State: getStore().agentA.lieStateMap['d-2']?.currentState ?? 'MISSING',
          bD2State: getStore().agentB.lieStateMap['d-2']?.currentState ?? 'MISSING',
          e4unlocked: getStore().evidenceStates['e-4']?.unlocked ?? false,
          e5unlocked: getStore().evidenceStates['e-5']?.unlocked ?? false,
          e6unlocked: getStore().evidenceStates['e-6']?.unlocked ?? false,
          turnBefore: getStore().turnCount,
          phaseBefore: getStore().currentPhase,
          isLLMLoading: getStore().isLLMLoading,
        }
        const aHD3Progress = await questionSequenceToState({
          target: 'a',
          disputeId: 'h-d3',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S3',
          maxTurns: 6,
          preferences: { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
          diagnostics: hD3Diag,
        })
        const hD3ScriptedHits = filterScriptedTexts(logStart, /interrogation\/a\|h-d3\|/)
        markEvidence('after_a_hd3_to_s3')
        pushTurnCap(turnCapTimeline, 'after_a_hd3_to_s3')

        if (!getStore().evidenceStates['e-4']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-3', target: 'a' })
          markEvidence('after_present_e3_to_a')
        }
        if (!getStore().evidenceStates['e-5']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-4', target: 'b' })
          markEvidence('after_present_e4_to_b')
        }
        if (!getStore().evidenceStates['e-6']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-5', target: 'a' })
          markEvidence('after_present_e5_to_a')
        }
        if (!getStore().evidenceStates['e-7']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-6', target: 'a' })
          markEvidence('after_present_e6_to_a')
        }

        if ((getStore().discovery.disputeVisibility?.['h-d4']?.visibility ?? 'hidden') === 'hidden' && getStore().canRunCombinationRecipe('combine-5')) {
          const combo = getStore().runCombinationRecipe('combine-5')
          recordEvent('combination', { recipeId: 'combine-5', ok: combo.ok, reason: combo.reason ?? null, outputId: combo.outputId ?? null })
          await sleep(80)
          await resolvePending({ contradiction: 'point_out', outburst: 'press', interjection: 'allow' })
          markEvidence('after_combine_5')
          pushTurnCap(turnCapTimeline, 'after_combine_5')
        }
        if ((getStore().discovery.disputeVisibility?.['h-d4']?.visibility ?? 'hidden') === 'hidden' && getStore().evidenceStates['e-7']?.unlocked) {
          await dispatchTurn({ type: 'evidence_present', evidenceId: 'e-7', target: 'a' })
          markEvidence('after_present_e7_to_a')
          pushTurnCap(turnCapTimeline, 'after_present_e7_to_a')
        }

        const afterHD4Ui = await collectPhase3UiAudit(hiddenNames)
        pushTurnCap(turnCapTimeline, 'after_h_d4_ui_check')
        const hD4Progress = await questionSequenceToState({
          target: 'a',
          disputeId: 'h-d4',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S1',
          maxTurns: 4,
          preferences: { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        })
        const hD4ScriptedHits = filterScriptedTexts(logStart, /interrogation\/a\|h-d4\|/)
        pushTurnCap(turnCapTimeline, 'after_h_d4_questioning')

        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        pushTurnCap(turnCapTimeline, 'after_result')

        detail = {
          check: 'full hidden unlock chain',
          initialDiscovery: initialSnapshot.discovery,
          initialUi,
          turnCapTimeline,
          aD1Progress,
          afterD2Ui,
          aD2Progress,
          d2ScriptedHits,
          bD2Progress,
          afterHD3Ui,
          hD3Diag,
          aHD3Progress,
          hD3ScriptedHits,
          evidenceTimeline,
          afterHD4Ui,
          hD4Name,
          hD4Progress,
          hD4ScriptedHits,
          hD4DialogueLeakTexts: getStore().dialogueLog
            .filter((entry) => toText(entry.text).includes(hD4Name))
            .map((entry) => `${entry.speaker}: ${sliceText(entry.text, 220)}`)
            .slice(0, 12),
          verdictBundle,
          verdictDisputeNames: verdictBundle?.verdictFact?.titles ?? [],
          finalDiscovery: snapshotState().discovery,
        }
      }

      if (strategy.id === 302) {
        const factTurns = []
        let warningTurn = null
        let transitionTurn = null

        for (let i = 0; i < 5; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
          )
          const afterState = getCurrentLie('a', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          if (freshDialogues.some((entry) => entry.text.includes('모순이 쌓이고 있습니다')) && warningTurn == null) warningTurn = i + 1
          if (afterState !== beforeState && transitionTurn == null) transitionTurn = i + 1
          factTurns.push({ turn: i + 1, beforeState, afterState, freshDialogues })
          if (stateRank[afterState] >= stateRank.S1) break
        }

        const empathyTurns = []
        let firstTransitionAttempt = null
        for (let i = 0; i < 3; i += 1) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('b', 'd-1')
          await dispatchTurn(
            { type: 'question', target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' },
            { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
          )
          const afterState = getCurrentLie('b', 'd-1')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          empathyTurns.push({ attempt: i + 1, beforeState, afterState, freshDialogues })
          if (afterState !== beforeState && firstTransitionAttempt == null) firstTransitionAttempt = i + 1
        }

        let extraTurns = 0
        while (
          getStore().currentPhase === GamePhase.Phase3_Interrogation &&
          extraTurns < 6 &&
          (
            !activeRunMeta.events.some((event) => event.type === 'interjection' || event.type === 'interjection_v2') ||
            !activeRunMeta.events.some((event) => event.type === 'emotional_burst')
          )
        ) {
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
            { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
          )
          extraTurns += 1
          if (
            activeRunMeta.events.some((event) => (event.type === 'interjection' || event.type === 'interjection_v2'))
            && activeRunMeta.events.some((event) => event.type === 'emotional_burst')
          ) {
            break
          }
        }

        const verdictBundle = await driveToResultFromCurrentPhase('forced')

        detail = {
          check: 'mechanics and events',
          factTurns,
          warningTurn,
          transitionTurn,
          warningToNextTurnTransition: warningTurn != null && transitionTurn === warningTurn + 1,
          empathyTurns,
          firstTransitionAttempt,
          guaranteedWithinThree: firstTransitionAttempt != null && firstTransitionAttempt <= 3,
          eventTrail: activeRunMeta.events,
          verdictBundle,
          finalLoadingState: getStore().isLLMLoading,
          dispatchWarnings: getLogs(logStart)
            .filter((entry) => entry.text.includes('[dispatch]'))
            .map((entry) => sliceText(entry.text, 220))
            .slice(0, 12),
        }
      }

      if (strategy.id === 303) {
        const hiddenDisputes = (getStore().caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => ({ id: dispute.id, name: dispute.name }))
        const hiddenNames = hiddenDisputes.map((entry) => entry.name)

        await questionSequenceToState({
          target: 'a',
          disputeId: 'd-1',
          sequence: ['fact_pursuit', 'motive_search', 'fact_pursuit', 'empathy_approach'],
          targetState: 'S3',
          maxTurns: 8,
          preferences: { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
        })

        const d2Ui = await collectPhase3UiAudit(hiddenNames)
        const aChecks = []
        for (const questionType of ['fact_pursuit', 'motive_search', 'empathy_approach']) {
          if (getStore().currentPhase !== GamePhase.Phase3_Interrogation) break
          const beforeDialogueCount = getStore().dialogueLog.length
          const beforeState = getCurrentLie('a', 'd-2')
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-2', questionType },
            { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
          )
          const afterState = getCurrentLie('a', 'd-2')
          const freshDialogues = getStore().dialogueLog.slice(beforeDialogueCount).map((entry) => ({
            speaker: entry.speaker,
            text: sliceText(entry.text, 220),
          }))
          aChecks.push({
            questionType,
            beforeState,
            afterState,
            aText: freshDialogues.filter((entry) => entry.speaker === 'a').map((entry) => entry.text).join(' | '),
            freshDialogues,
          })
        }

        const forbiddenTerms = ['\uC704\uC784\uC7A5', '\uACF5\uB3D9 \uC801\uAE08', '\uC801\uAE08\uC744 \uAE7C', '\uD22C\uC790\uBC29']
        const aForbiddenHits = aChecks
          .map((entry) => entry.aText)
          .filter((text) => forbiddenTerms.some((term) => text.includes(term)))

        const bProgress = await questionSequenceToState({
          target: 'b',
          disputeId: 'd-2',
          sequence: ['fact_pursuit', 'motive_search', 'empathy_approach'],
          targetState: 'S5',
          maxTurns: 10,
          preferences: { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        })

        const verdictBundle = await driveToResultFromCurrentPhase('forced')

        detail = {
          check: 'dialogue quality and stability',
          d2Ui,
          aChecks,
          aForbiddenHits,
          bProgress,
          bReachedS5: stateRank[bProgress.finalState] >= stateRank.S5,
          scriptedHitsD2A: filterScriptedTexts(logStart, /interrogation\/a\|d-2\|/),
          scriptedHitsD2B: filterScriptedTexts(logStart, /interrogation\/b\|d-2\|/),
          verdictBundle,
          finalLoadingState: getStore().isLLMLoading,
        }
      }

      if (strategy.id === 902) {
        const caseData = getStore().caseData
        const hiddenDisputes = (caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => ({ id: dispute.id, name: dispute.name }))
        const hiddenNames = hiddenDisputes.map((entry) => entry.name)
        const turnCapTimeline = []
        pushTurnCap(turnCapTimeline, 'start')
        const initialUi = await collectPhase3UiAudit(hiddenNames)

        const bD1Progress = await questionSequenceToState({
          target: 'b',
          disputeId: 'd-1',
          sequence: ['empathy_approach', 'motive_search'],
          targetState: 'S2',
          maxTurns: 3,
          preferences: { contradiction: 'point_out', outburst: 'calm', interjection: 'allow' },
        })
        pushTurnCap(turnCapTimeline, 'after_b_d1_to_s2')
        const preVerdictUi = await collectPhase3UiAudit(hiddenNames)

        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        pushTurnCap(turnCapTimeline, 'after_result')

        detail = {
          check: 'early verdict without hidden unlock',
          turnCapTimeline,
          initialUi,
          bD1Progress,
          preVerdictUi,
          verdictBundle,
          verdictDisputeNames: verdictBundle?.verdictFact?.titles ?? [],
          finalDiscovery: snapshotState().discovery,
        }
      }

      if (strategy.id === 903) {
        const hiddenNames = (getStore().caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => dispute.name)
        const judgeQuestionSamples = []
        const transitionPanels = []

        const askWithTransitionAudit = async (action) => {
          const beforeDialogue = getStore().dialogueLog.length
          await dispatchTurn(
            { type: 'question', ...action },
            {
              contradiction: 'point_out',
              outburst: 'calm',
              interjection: 'allow',
              autoResolveTransitionChoice: false,
            },
            { waitTimeoutMs: 5000 },
          )
          await waitFor(() => Boolean(document.querySelector('.pc-interaction-card')), 1200, 50)
          const panelState = collectInteractionPanelState()
          if (panelState.exists) {
            transitionPanels.push(panelState)
            await clickFirstEnabled('.pc-interaction-card__action')
            await waitFor(() => !document.querySelector('.pc-interaction-card'), 3000, 50)
            await waitFor(() => !getStore().isLLMLoading, 5000, 50)
            await sleep(120)
          }
          const judgeEntry = getStore().dialogueLog
            .slice(beforeDialogue)
            .find((entry) => entry.speaker === 'judge')
          if (judgeEntry) judgeQuestionSamples.push(sliceText(judgeEntry.text, 220))
        }

        await askWithTransitionAudit({ target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' })
        await askWithTransitionAudit({ target: 'a', disputeId: 'd-1', questionType: 'motive_search' })
        await askWithTransitionAudit({ target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' })

        let interjectionAttempts = 0
        while (
          collectScriptedChannelHits(logStart, 'interjection').length === 0 &&
          interjectionAttempts < 8 &&
          getStore().currentPhase === GamePhase.Phase3_Interrogation
        ) {
          await dispatchTurn(
            { type: 'question', target: 'a', disputeId: 'd-1', questionType: interjectionAttempts < 5 ? 'fact_pursuit' : 'motive_search' },
            { contradiction: 'point_out', outburst: 'press', interjection: 'allow' },
            { waitTimeoutMs: 5000 },
          )
          interjectionAttempts += 1
        }

        const contradictionBadgeBefore = toText(
          document.querySelector('.pc-log-system-card.is-action:not(.is-used) .pc-log-system-card__action-badge')?.textContent ?? '',
        )
        let contradictionPanel = null
        let contradictionPath = 'direct'
        if (await clickFirstEnabled('.pc-log-system-card.is-action:not(.is-used)')) {
          contradictionPath = 'ui_card'
          await waitFor(() => Boolean(document.querySelector('.pc-interaction-card')), 3000, 50)
          contradictionPanel = collectInteractionPanelState()
          await clickFirstEnabled('.pc-interaction-card__action')
          await waitFor(() => !document.querySelector('.pc-interaction-card'), 3000, 50)
          await waitFor(() => !getStore().isLLMLoading, 5000, 50)
          await sleep(120)
        } else {
          await handleContradictionPursue(
            'a',
            'd-1',
            '오피스텔에는 간 적 없습니다.',
            '같은 시간대에 근처까지는 갔습니다.',
          )
          await sleep(150)
        }
        const contradictionBadgeAfter = toText(
          document.querySelector('.pc-log-system-card.is-action.is-used .pc-log-system-card__action-badge')?.textContent ?? '',
        )
        let contradictionDirectError = null
        try {
          await handleContradictionPursue(
            'a',
            'd-1',
            '오피스텔에는 간 적이 없습니다.',
            '같은 시간대 같은 주소 기록은 설명이 필요합니다.',
          )
          await sleep(150)
        } catch (error) {
          contradictionDirectError = String(error?.message ?? error)
        }

        const interjectionBefore = collectScriptedChannelHits(logStart, 'interjection').length
        getStore().setPendingInterjectionV2({
          type: 'interjection',
          textId: 'thread-q-manual-interjection',
          line: '제가 끼어드는 건 여기서 더는 못 듣겠어서입니다.',
          choiceLabels: ['허용', '제지'],
          interruptor: 'b',
          target: 'a',
          disputeId: 'd-1',
          quadrant: 'both',
          triggerReason: 'emotion_spike',
          infoLevel: 'partial',
          focusStreak: 3,
          chanceApplied: 1,
          severity: 'major',
          allowEffects: [],
          blockEffects: [],
        })
        await nextFrame()
        resolveInterjectionV2('allow')
        await sleep(150)
        const interjectionAfter = collectScriptedChannelHits(logStart, 'interjection').length

        const evidenceBefore = getUnlockedEvidenceIds()
        getStore().setPendingMinigame({
          type: 'evidence_discovery',
          evidenceId: 'e-4',
          clues: ['오피스텔', '새벽 통화', '현금 출금'],
          npcName: getPartyName('a'),
          lieState: getCurrentLie('a', 'd-1'),
          party: 'a',
          minigameVariant: 'memory',
        })
        await nextFrame()
        await sleep(80)
        const evidenceDiscoveryPendingBefore = Boolean(getStore().pendingMinigame)
        let evidenceDiscoveryError = null
        try {
          actuallyDiscoverEvidence('e-4')
          await waitFor(() => !getStore().isLLMLoading, 5000, 50)
          await sleep(120)
        } catch (error) {
          evidenceDiscoveryError = String(error?.message ?? error)
        }
        const evidenceAfter = getUnlockedEvidenceIds()

        const trustLogStart = getLogs().length
        const trustTurnBefore = getStore().turnCount
        let trustActionError = null
        try {
          await dispatchTurn(
            { type: 'trust_action', actionType: 'separation', target: 'a', disputeId: 'd-1' },
            {},
            { waitTimeoutMs: 2500 },
          )
          await sleep(160)
        } catch (error) {
          trustActionError = String(error?.message ?? error)
        }
        const trustTurnAfter = getStore().turnCount
        const trustErrors = getLogs(trustLogStart)
          .filter((entry) => isSeriousError(entry))
          .map((entry) => sliceText(entry.text, 220))
          .slice(0, 10)

        getStore().setPendingGameEvent({
          type: 'emotional_burst',
          party: 'a',
          disputeId: 'd-1',
          severity: 'major',
          description: '감정이 폭발해 언성이 높아졌다.',
          deferredEffects: [],
          scriptSlot: { textId: 'emotional_burst_major', fallbackText: '' },
        })
        await nextFrame()
        await waitFor(() => Boolean(document.querySelector('.pc-discovery-card')), 3000, 50)
        const emotionalPanel = {
          title: toText(document.querySelector('.pc-discovery-card__title')?.textContent ?? ''),
          subtitle: toText(document.querySelector('.pc-discovery-card__subtitle')?.textContent ?? ''),
          buttons: listTexts('.pc-discovery-card__action'),
          body: sliceText(document.querySelector('.pc-discovery-card__body')?.innerText ?? '', 220),
        }
        const emotionalButtons = Array.from(document.querySelectorAll('.pc-discovery-card__action'))
        emotionalButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextFrame()
        await sleep(160)

        const phase3UiAudit = await collectPhase3UiAudit(hiddenNames)
        const systemPalette = collectSystemPalette()
        const verdictBundle = await driveToResultWithConditionalMediation('forced')
        const caseBrowserAudit = await navigateToCaseBrowserAudit()

        const channelAudit = {}
        for (const channel of [
          'interrogation',
          'judge_question',
          'judge_contradiction',
          'contradiction_pursuit',
          'interjection',
          'trust_action',
          'emotional_overload',
          'evidence_discovery',
          'mediation',
        ]) {
          channelAudit[channel] = {
            hitTexts: collectScriptedChannelHits(logStart, channel),
            missTexts: collectScriptedChannelMisses(logStart, channel),
          }
        }

        detail = {
          check: 'spouse scriptedText 9-channel + ui audit',
          phase3Ui: phase3UiAudit,
          judgeQuestionSamples,
          judgeQuestionsIndirectOnly: judgeQuestionSamples.every((text) => !/["'“”]/.test(text)),
          transitionPanels,
          contradictionBadgeBefore,
          contradictionBadgeAfter,
          contradictionPath,
          contradictionDirectError,
          contradictionPanel,
          interjectionAttempts,
          interjectionInjected: interjectionAfter > interjectionBefore,
          evidenceDiscoveryPendingBefore,
          evidenceUnlockDelta: diffIds(evidenceBefore, evidenceAfter),
          evidenceDiscoveryError,
          trustAction: {
            turnBefore: trustTurnBefore,
            turnAfter: trustTurnAfter,
            advanced: trustTurnAfter > trustTurnBefore,
            error: trustActionError,
            errors: trustErrors,
          },
          emotionalPanel,
          systemPalette,
          verdictBundle,
          caseBrowserAudit,
          channelAudit,
        }
      }

      if (strategy.id === 1001) {
        const chain = await executeUnlockChain([
          { disputeId: 'd-1', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-2', preferredTarget: 'b', targetState: 'S3', maxTurns: 8 },
          { disputeId: 'd-3', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-4', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
        ])
        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        detail = {
          check: 'family unlock chain and phase1 branching',
          introTrace: lastIntroTrace,
          chain,
          verdictBundle,
          phase1Leaks: (lastIntroTrace?.steps ?? []).flatMap((step) => step.bodyLeaks ?? []),
        }
      }

      if (strategy.id === 1002) {
        await executeUnlockChain([
          { disputeId: 'd-1', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-2', preferredTarget: 'b', targetState: 'S3', maxTurns: 8 },
        ])
        const dialogueSamples = await collectDialogueSamples([
          { target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
          { target: 'b', disputeId: 'd-1', questionType: 'fact_pursuit' },
          { target: 'a', disputeId: 'd-2', questionType: 'motive_search' },
          { target: 'b', disputeId: 'd-2', questionType: 'empathy_approach' },
        ])
        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        const dialogueTexts = dialogueSamples.flatMap((sample) => sample.freshDialogues.map((entry) => entry.text))
        detail = {
          check: 'family dialogue quality and tone split',
          introTrace: lastIntroTrace,
          dialogueSamples,
          styleIssueTexts: dialogueTexts.filter(hasStyleIssue),
          verdictBundle,
        }
      }

      if (strategy.id === 1101) {
        const chain = await executeUnlockChain([
          { disputeId: 'd-1', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-2', preferredTarget: 'b', targetState: 'S3', maxTurns: 8 },
          { disputeId: 'd-3', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-4', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-5', preferredTarget: 'a', targetState: 'S1', maxTurns: 4 },
        ])
        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        detail = {
          check: 'friend unlock chain and phase1 branching',
          introTrace: lastIntroTrace,
          chain,
          verdictBundle,
          phase1Leaks: (lastIntroTrace?.steps ?? []).flatMap((step) => step.bodyLeaks ?? []),
        }
      }

      if (strategy.id === 1102) {
        await executeUnlockChain([
          { disputeId: 'd-1', preferredTarget: 'b', targetState: 'S2', maxTurns: 6 },
          { disputeId: 'd-2', preferredTarget: 'b', targetState: 'S3', maxTurns: 8 },
        ])
        const dialogueSamples = await collectDialogueSamples([
          { target: 'a', disputeId: 'd-1', questionType: 'fact_pursuit' },
          { target: 'b', disputeId: 'd-1', questionType: 'empathy_approach' },
          { target: 'a', disputeId: 'd-2', questionType: 'motive_search' },
          { target: 'b', disputeId: 'd-2', questionType: 'fact_pursuit' },
        ])
        const verdictBundle = await driveToResultFromCurrentPhase('forced')
        const dialogueTexts = dialogueSamples.flatMap((sample) => sample.freshDialogues.map((entry) => entry.text))
        detail = {
          check: 'friend dialogue quality and stability',
          introTrace: lastIntroTrace,
          dialogueSamples,
          styleIssueTexts: dialogueTexts.filter(hasStyleIssue),
          verdictBundle,
        }
      }

      if (strategy.id === 1201) {
        const hiddenNames = (getStore().caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => dispute.name)
        const initialUi = await collectPhase3UiAudit(hiddenNames)
        const initialUnlocked = getUnlockedEvidenceIds()

        const d1Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-1',
          targetState: 'S2',
          maxTurns: 6,
        })
        const afterD1Ui = await collectPhase3UiAudit(hiddenNames)
        const unlockedAfterD1 = getUnlockedEvidenceIds()
        const e1Step = await presentEvidenceStep('e-1', 'b')
        const unlockedAfterE1 = getUnlockedEvidenceIds()

        const d2Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-2',
          targetState: 'S3',
          maxTurns: 8,
        })
        const afterD2Ui = await collectPhase3UiAudit(hiddenNames)
        const unlockedAfterD2 = getUnlockedEvidenceIds()
        const evidenceSteps = []
        evidenceSteps.push(await presentEvidenceStep('e-4', 'b'))
        evidenceSteps.push(await presentEvidenceStep('e-5', 'b'))

        const d3Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-3',
          targetState: 'S3',
          maxTurns: 8,
        })
        const afterD3Ui = await collectPhase3UiAudit(hiddenNames)
        const d5VisibilityAfterD3 = getStore().discovery.disputeVisibility?.['d-5']?.visibility ?? 'hidden'
        evidenceSteps.push(await presentEvidenceStep('e-6', 'b'))

        const d4Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-4',
          targetState: 'S2',
          maxTurns: 6,
        })
        const afterD4Ui = await collectPhase3UiAudit(hiddenNames)
        const d5VisibilityAfterD4 = getStore().discovery.disputeVisibility?.['d-5']?.visibility ?? 'hidden'
        evidenceSteps.push(await presentEvidenceStep('e-7', 'b'))

        const d5Progress = await advanceDisputeTo({
          disputeId: 'd-5',
          preferredTarget: 'b',
          targetState: 'S1',
          maxTurns: 4,
        })
        const afterD5Ui = await collectPhase3UiAudit(hiddenNames)
        const verdictBundle = await driveToResultFromCurrentPhase('forced')

        detail = {
          check: 'family targeted sequential unlock verification',
          initialUi,
          initialUnlocked,
          d1Progress,
          afterD1Ui,
          unlockedAfterD1,
          e1Step,
          unlockedAfterE1,
          d2Progress,
          afterD2Ui,
          unlockedAfterD2,
          d3Progress,
          afterD3Ui,
          d5VisibilityAfterD3,
          d4Progress,
          afterD4Ui,
          d5VisibilityAfterD4,
          d5Progress,
          afterD5Ui,
          evidenceSteps,
          verdictBundle,
        }
      }

      if (strategy.id === 1202) {
        const hiddenNames = (getStore().caseData?.disputes ?? [])
          .filter((dispute) => dispute.hidden || dispute.v3Visibility === 'hidden')
          .map((dispute) => dispute.name)
        const initialUi = await collectPhase3UiAudit(hiddenNames)
        const initialUnlocked = getUnlockedEvidenceIds()

        const d1Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-1',
          targetState: 'S2',
          maxTurns: 6,
        })
        const afterD1Ui = await collectPhase3UiAudit(hiddenNames)
        const unlockedAfterD1 = getUnlockedEvidenceIds()

        const d2Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-2',
          targetState: 'S3',
          maxTurns: 8,
        })
        const afterD2Ui = await collectPhase3UiAudit(hiddenNames)
        const unlockedAfterD2 = getUnlockedEvidenceIds()

        const evidenceSteps = []
        evidenceSteps.push(await presentEvidenceStep('e-4', 'b'))

        const d3Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-3',
          targetState: 'S3',
          maxTurns: 8,
        })
        const afterD3Ui = await collectPhase3UiAudit(hiddenNames)
        const d5VisibilityAfterD3 = getStore().discovery.disputeVisibility?.['d-5']?.visibility ?? 'hidden'
        evidenceSteps.push(await presentEvidenceStep('e-5', 'b'))

        const d4Progress = await advanceExactDisputeTo({
          target: 'b',
          disputeId: 'd-4',
          targetState: 'S2',
          maxTurns: 6,
        })
        const afterD4Ui = await collectPhase3UiAudit(hiddenNames)
        const d5VisibilityAfterD4 = getStore().discovery.disputeVisibility?.['d-5']?.visibility ?? 'hidden'
        evidenceSteps.push(await presentEvidenceStep('e-6', 'b'))

        const d5Progress = await advanceDisputeTo({
          disputeId: 'd-5',
          preferredTarget: 'b',
          targetState: 'S1',
          maxTurns: 4,
        })
        const afterD5Ui = await collectPhase3UiAudit(hiddenNames)
        const verdictBundle = await driveToResultFromCurrentPhase('forced')

        detail = {
          check: 'friend targeted sequential unlock verification',
          initialUi,
          initialUnlocked,
          d1Progress,
          afterD1Ui,
          unlockedAfterD1,
          d2Progress,
          afterD2Ui,
          unlockedAfterD2,
          evidenceSteps,
          d3Progress,
          afterD3Ui,
          d5VisibilityAfterD3,
          d4Progress,
          afterD4Ui,
          d5VisibilityAfterD4,
          d5Progress,
          afterD5Ui,
          verdictBundle,
        }
      }

      const finalSnapshot = snapshotState()
      const logs = summarizeLogs(logStart)
      const runResult = {
        run: strategy.id,
        label: strategy.label,
        phasePath: finalSnapshot.phaseHistory,
        turnCount: finalSnapshot.turnCount,
        verdictMode: finalSnapshot.verdictMode,
        verdictScore: finalSnapshot.verdictScore,
        scriptedMissCount: logs.scriptedMisses,
        scriptedHitCount: logs.scriptedHits,
        scriptedMissTexts: logs.scriptedMissTexts,
        scriptedHitTexts: logs.scriptedHitTexts,
        seriousErrors: logs.seriousErrors,
        typeErrorLike: logs.typeErrorLike,
        events: activeRunMeta.events,
        introTrace: lastIntroTrace,
        detail,
        finalSnapshot,
      }
      activeRunMeta = null
      return runResult
    }

    const runProfile = threadqProfile ?? 'default'
    const strategies = runProfile === 'focus4'
      ? [
          { id: 101, label: 'Run 1 — fact_pursuit transition validation', choiceIndex: 0 },
          { id: 102, label: 'Run 2 — d-2 mapping and A S3 cap validation', choiceIndex: 0 },
          { id: 103, label: 'Run 3 — empathy guarantee and verdict stability', choiceIndex: 0 },
        ]
      : runProfile === 'focus4b'
        ? [
            { id: 201, label: 'Run 1 ??hidden dispute non-exposure and unlock chain', choiceIndex: 0 },
            { id: 202, label: 'Run 2 ??fact transition plus d-2 mapping', choiceIndex: 0 },
            { id: 203, label: 'Run 3 ??empathy guarantee plus full verdict stability', choiceIndex: 0 },
          ]
      : runProfile === 'focus7'
        ? [
            { id: 301, label: 'Run 1 ??full hidden unlock chain validation', choiceIndex: 0 },
            { id: 302, label: 'Run 2 ??mechanics and event validation', choiceIndex: 0 },
            { id: 303, label: 'Run 3 ??dialogue quality and stability', choiceIndex: 0 },
          ]
      : runProfile === 'focus9'
        ? [
            { id: 301, label: 'Run 1 ??bonus turn unlock-chain validation', choiceIndex: 0 },
            { id: 902, label: 'Run 2 ??early verdict without bonus turns', choiceIndex: 0 },
            { id: 903, label: 'Run 3 ??scriptedText 9-channel and UI audit', choiceIndex: 0 },
          ]
      : runProfile === 'focus10'
        ? caseKey === 'family-01'
          ? [
              { id: 1001, label: 'family-01 Run 1 unlock chain + phase1 branching', choiceIndex: 0 },
              { id: 1002, label: 'family-01 Run 2 dialogue quality + tone split', choiceIndex: 1 },
            ]
          : caseKey === 'friend-01'
            ? [
                { id: 1101, label: 'friend-01 Run 1 unlock chain + phase1 branching', choiceIndex: 0 },
                { id: 1102, label: 'friend-01 Run 2 dialogue quality + stability', choiceIndex: 2 },
              ]
            : []
      : runProfile === 'focus11'
        ? caseKey === 'family-01'
          ? [
              { id: 1201, label: 'family-01 targeted sequential unlock check', choiceIndex: 0 },
            ]
          : caseKey === 'friend-01'
            ? [
                { id: 1202, label: 'friend-01 targeted sequential unlock check', choiceIndex: 0 },
              ]
            : []
      : [
          { id: 1, label: 'A only d-1 fact_pursuit to S5', choiceIndex: 0 },
          { id: 2, label: 'B only d-1 empathy_approach to S5', choiceIndex: 1 },
          { id: 3, label: 'Alternate A/B balanced actions to S3+', choiceIndex: 0 },
          { id: 4, label: 'Present e-1..e-7 in order', choiceIndex: 0 },
          { id: 5, label: 'Run all 6 combination recipes', choiceIndex: 0 },
          { id: 6, label: 'Hidden dispute chain d-1 -> d-2 -> h-d3 -> h-d4', choiceIndex: 0 },
          { id: 7, label: 'Call all witnesses vague/partial/full', choiceIndex: 0 },
          { id: 8, label: 'Minimal-turn verdict entry and 4-step verdict flow', choiceIndex: 0 },
          { id: 9, label: 'Forced verdict at max turn', choiceIndex: 0 },
          { id: 10, label: 'Interjection induction by same-target streak', choiceIndex: 0 },
        ]

    const selectedIds = (threadqRunIds ?? '')
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value) && value > 0)
    const strategiesToRun = selectedIds.length > 0
      ? strategies.filter((strategy) => selectedIds.includes(strategy.id))
      : strategies

    const runs = []
    for (const strategy of strategiesToRun) {
      console.log(`[thread-q] run ${strategy.id} start`)
      runs.push(await runStrategy(strategy))
      console.log(`[thread-q] run ${strategy.id} done`)
    }

    return {
      caseId: baseCaseData.caseId,
      requestedCaseKey: caseKey,
      runProfile,
      appPhaseOrder: compactPhaseHistory([
        GamePhase.Phase0_CaseIntro,
        GamePhase.Phase1_InitialStatement,
        GamePhase.Phase2_Rebuttal,
        GamePhase.Phase3_Interrogation,
        GamePhase.Phase6_Mediation,
        GamePhase.Phase7_Verdict,
        GamePhase.Result,
      ]),
      runs,
    }
  }, { threadqProfile: RUN_PROFILE, threadqRunIds: process.env.RUN_IDS ?? '', threadqCaseKey: CASE_KEY })

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
  await browser.close()
  console.log(`wrote ${OUT_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
