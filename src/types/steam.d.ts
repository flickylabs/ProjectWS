export {};

declare global {
  interface SteamBridgeResult {
    ok: boolean;
    reason?: string;
  }

  interface SteamCloudBridge {
    readTextFile(name: string): Promise<SteamBridgeResult & { content?: string }>;
    writeTextFile(name: string, content: string): Promise<SteamBridgeResult>;
    listFiles(): Promise<SteamBridgeResult & { files?: string[] }>;
  }

  interface SteamAchievementsBridge {
    unlock(id: string): Promise<SteamBridgeResult>;
    get(id: string): Promise<SteamBridgeResult & { achieved?: boolean }>;
    list(): Promise<SteamBridgeResult & { achievements?: Array<{ id: string; achieved: boolean }> }>;
  }

  interface SteamStatsBridge {
    get(name: string): Promise<SteamBridgeResult & { value?: number }>;
    set(name: string, value: number): Promise<SteamBridgeResult>;
    store(): Promise<SteamBridgeResult>;
  }

  interface SteamBridge {
    isAvailable(): Promise<boolean>;
    getSteamId(): Promise<string>;
    getPersonaName(): Promise<string>;
    getAuthTicketForWebApi(identity?: string): Promise<string>;
    cloud: SteamCloudBridge;
    achievements: SteamAchievementsBridge;
    stats: SteamStatsBridge;
  }

  interface Window {
    steam?: SteamBridge;
  }
}
