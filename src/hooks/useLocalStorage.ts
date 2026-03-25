const STORAGE_KEY = 'solomon-save'

interface SaveData {
  lastCaseId: string | null
  totalGamesPlayed: number
  bestScore: number
  recentCaseIds: string[]
  settings: {
    typingSpeed: 'fast' | 'normal' | 'slow'
    showBehaviorHints: boolean
    autoAdvanceDialogue: boolean
  }
}

const defaultSave: SaveData = {
  lastCaseId: null,
  totalGamesPlayed: 0,
  bestScore: 0,
  recentCaseIds: [],
  settings: {
    typingSpeed: 'normal',
    showBehaviorHints: true,
    autoAdvanceDialogue: true,
  },
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultSave }
    return { ...defaultSave, ...JSON.parse(raw) }
  } catch {
    return { ...defaultSave }
  }
}

export function saveSave(data: Partial<SaveData>) {
  try {
    const current = loadSave()
    const merged = { ...current, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch { /* 무시 */ }
}

export function recordGameComplete(caseId: string, score: number) {
  const save = loadSave()
  save.totalGamesPlayed++
  save.lastCaseId = caseId
  if (score > save.bestScore) save.bestScore = score
  save.recentCaseIds = [caseId, ...save.recentCaseIds.filter((id) => id !== caseId)].slice(0, 10)
  saveSave(save)
}

export function getSettings() {
  return loadSave().settings
}

export function updateSettings(settings: Partial<SaveData['settings']>) {
  const save = loadSave()
  saveSave({ settings: { ...save.settings, ...settings } })
}
