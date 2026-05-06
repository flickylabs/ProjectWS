export interface SteamCloudService {
  readTextFile(name: string): Promise<string | null>
  writeTextFile(name: string, content: string): Promise<boolean>
  listFiles(): Promise<string[]>
}

export interface SteamAchievementService {
  unlock(id: string): Promise<boolean>
  get(id: string): Promise<boolean>
  list(): Promise<Array<{ id: string; achieved: boolean }>>
}

export interface SteamStatsService {
  get(name: string): Promise<number | null>
  set(name: string, value: number): Promise<boolean>
  store(): Promise<boolean>
}

function getSteamBridge(): SteamBridge | null {
  return typeof window !== 'undefined' ? window.steam ?? null : null
}

export const steamCloud: SteamCloudService = {
  async readTextFile(name) {
    const result = await getSteamBridge()?.cloud.readTextFile(name)
    return result?.ok ? result.content ?? '' : null
  },
  async writeTextFile(name, content) {
    const result = await getSteamBridge()?.cloud.writeTextFile(name, content)
    return Boolean(result?.ok)
  },
  async listFiles() {
    const result = await getSteamBridge()?.cloud.listFiles()
    return result?.ok ? result.files ?? [] : []
  },
}

export const steamAchievements: SteamAchievementService = {
  async unlock(id) {
    const result = await getSteamBridge()?.achievements.unlock(id)
    return Boolean(result?.ok)
  },
  async get(id) {
    const result = await getSteamBridge()?.achievements.get(id)
    return Boolean(result?.ok && result.achieved)
  },
  async list() {
    const result = await getSteamBridge()?.achievements.list()
    return result?.ok ? result.achievements ?? [] : []
  },
}

export const steamStats: SteamStatsService = {
  async get(name) {
    const result = await getSteamBridge()?.stats.get(name)
    return result?.ok && typeof result.value === 'number' ? result.value : null
  },
  async set(name, value) {
    const result = await getSteamBridge()?.stats.set(name, value)
    return Boolean(result?.ok)
  },
  async store() {
    const result = await getSteamBridge()?.stats.store()
    return Boolean(result?.ok)
  },
}
