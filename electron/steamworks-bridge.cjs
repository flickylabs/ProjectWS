const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_AUTH_IDENTITY = 'solomon-web-api';
const MOCK_STEAM_ID = '76561198000000000';
const DEFAULT_ACHIEVEMENT_IDS = [
  'ACH_FIRST_CASE_CLEARED',
  'ACH_PERFECT_VERDICT',
  'ACH_TRUTH_BREAKTHROUGH',
  'ACH_EVIDENCE_MASTER',
  'ACH_MEDIATION_SUCCESS',
  'ACH_NO_HINT_CLEAR',
  'ACH_ALL_BASE_CASES_CLEARED',
  'ACH_JUDGE_LEVEL_10',
  'ACH_STREAK_7_DAYS',
  'ACH_STEAM_DECK_SESSION',
];

function readLocalSteamAppId() {
  try {
    const appIdPath = path.resolve(process.cwd(), 'steam_appid.txt');
    const appId = fs.readFileSync(appIdPath, 'utf8').trim();
    return /^\d+$/.test(appId) ? appId : undefined;
  } catch {
    return undefined;
  }
}

function getSteamAppId() {
  return process.env.STEAM_APP_ID || readLocalSteamAppId();
}

function getAuthIdentity(identity) {
  return identity || process.env.STEAM_AUTH_IDENTITY || DEFAULT_AUTH_IDENTITY;
}

function ticketPayloadToHex(payload) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('hex');
}

function notImplemented(feature) {
  return async () => ({ ok: false, reason: `${feature} is not implemented yet` });
}

function bufferToHex(value) {
  if (Buffer.isBuffer(value)) return value.toString('hex');
  if (value instanceof Uint8Array) return Buffer.from(value).toString('hex');
  return String(value);
}

function readConfiguredAchievementIds() {
  const configured = (process.env.STEAM_ACHIEVEMENT_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  return configured.length > 0 ? configured : DEFAULT_ACHIEVEMENT_IDS;
}

function createMockBridge() {
  return {
    isAvailable: async () => false,
    getSteamId: async () => process.env.STEAM_MOCK_STEAM_ID || MOCK_STEAM_ID,
    getPersonaName: async () => process.env.STEAM_MOCK_PERSONA_NAME || 'Steam Mock Player',
    getAuthTicketForWebApi: async (identity) => ticketPayloadToHex({
      kind: 'mock-steam-web-api-ticket',
      appId: getSteamAppId(),
      steamId: process.env.STEAM_MOCK_STEAM_ID || MOCK_STEAM_ID,
      identity: getAuthIdentity(identity),
      nonce: crypto.randomBytes(16).toString('hex'),
      issuedAt: new Date().toISOString(),
    }),
    cloud: {
      readTextFile: notImplemented('Steam Cloud readTextFile'),
      writeTextFile: notImplemented('Steam Cloud writeTextFile'),
      listFiles: notImplemented('Steam Cloud listFiles'),
    },
    achievements: {
      unlock: notImplemented('Steam achievements unlock'),
      get: notImplemented('Steam achievements get'),
      list: notImplemented('Steam achievements list'),
    },
    stats: {
      get: notImplemented('Steam stats get'),
      set: notImplemented('Steam stats set'),
      store: notImplemented('Steam stats store'),
    },
  };
}

function loadAdapterModule() {
  const adapterModule = process.env.STEAMWORKS_BRIDGE_MODULE;
  if (!adapterModule) {
    try {
      return require('steamworks.js');
    } catch (err) {
      console.warn('[Steamworks] steamworks.js is unavailable; using mock bridge:', err.message);
      return null;
    }
  }

  const modulePath = path.isAbsolute(adapterModule)
    ? adapterModule
    : path.resolve(process.cwd(), adapterModule);

  try {
    return require(modulePath);
  } catch (err) {
    console.warn('[Steamworks] Failed to load adapter module:', err);
    return null;
  }
}

function normalizeSteamworksJs(steamworks) {
  if (!steamworks || typeof steamworks.init !== 'function') return null;

  const appId = Number(getSteamAppId());
  if (!Number.isInteger(appId) || appId <= 0) {
    console.warn('[Steamworks] STEAM_APP_ID or steam_appid.txt is missing; using mock bridge.');
    return null;
  }

  try {
    const client = steamworks.init(appId);
    const ticketCleanupTimers = new Set();

    return {
      isAvailable: async () => true,
      getSteamId: async () => String(client.localplayer.getSteamId().steamId64),
      getPersonaName: async () => client.localplayer.getName(),
      getAuthTicketForWebApi: async (identity) => {
        const ticket = await client.auth.getAuthTicketForWebApi(getAuthIdentity(identity), 10);
        const timer = setTimeout(() => {
          ticketCleanupTimers.delete(timer);
          try { ticket.cancel(); } catch { /* Steam may already have invalidated it. */ }
        }, 120_000);
        ticketCleanupTimers.add(timer);
        return bufferToHex(ticket.getBytes());
      },
      cloud: {
        readTextFile: async (name) => {
          if (!client.cloud.fileExists(name)) return { ok: false, reason: 'file_not_found' };
          return { ok: true, content: client.cloud.readFile(name) };
        },
        writeTextFile: async (name, content) => ({ ok: client.cloud.writeFile(name, content) }),
        listFiles: async () => ({
          ok: true,
          files: client.cloud.listFiles().map((file) => file.name),
        }),
      },
      achievements: {
        unlock: async (id) => ({ ok: client.achievement.activate(id) }),
        get: async (id) => ({ ok: true, achieved: client.achievement.isActivated(id) }),
        list: async () => ({
          ok: true,
          achievements: readConfiguredAchievementIds().map((id) => ({
            id,
            achieved: client.achievement.isActivated(id),
          })),
        }),
      },
      stats: {
        get: async (name) => ({ ok: true, value: client.stats.getInt(name) ?? undefined }),
        set: async (name, value) => ({ ok: client.stats.setInt(name, Math.trunc(value)) }),
        store: async () => ({ ok: client.stats.store() }),
      },
    };
  } catch (err) {
    console.warn('[Steamworks] Failed to initialize steamworks.js; using mock bridge:', err.message);
    return null;
  }
}

function normalizeAdapter(adapter) {
  if (!adapter) return null;
  const steamworksJs = normalizeSteamworksJs(adapter);
  if (steamworksJs) return steamworksJs;
  if (typeof adapter.init === 'function') return null;

  const factory = adapter.createSteamworksBridge || adapter.createSteamClient || adapter.default;
  const client = typeof factory === 'function'
    ? factory({
        appId: getSteamAppId(),
        authIdentity: process.env.STEAM_AUTH_IDENTITY || DEFAULT_AUTH_IDENTITY,
      })
    : adapter;

  if (!client || typeof client !== 'object') return null;

  return {
    isAvailable: async () => Boolean(await client.isAvailable?.()),
    getSteamId: async () => String(await client.getSteamId()),
    getPersonaName: async () => String(await client.getPersonaName()),
    getAuthTicketForWebApi: async (identity) => {
      const ticket = await client.getAuthTicketForWebApi(getAuthIdentity(identity));
      return bufferToHex(ticket);
    },
    cloud: {
      readTextFile: client.cloud?.readTextFile?.bind(client.cloud) || notImplemented('Steam Cloud readTextFile'),
      writeTextFile: client.cloud?.writeTextFile?.bind(client.cloud) || notImplemented('Steam Cloud writeTextFile'),
      listFiles: client.cloud?.listFiles?.bind(client.cloud) || notImplemented('Steam Cloud listFiles'),
    },
    achievements: {
      unlock: client.achievements?.unlock?.bind(client.achievements) || notImplemented('Steam achievements unlock'),
      get: client.achievements?.get?.bind(client.achievements) || notImplemented('Steam achievements get'),
      list: client.achievements?.list?.bind(client.achievements) || notImplemented('Steam achievements list'),
    },
    stats: {
      get: client.stats?.get?.bind(client.stats) || notImplemented('Steam stats get'),
      set: client.stats?.set?.bind(client.stats) || notImplemented('Steam stats set'),
      store: client.stats?.store?.bind(client.stats) || notImplemented('Steam stats store'),
    },
  };
}

function createSteamBridge() {
  const adapter = normalizeAdapter(loadAdapterModule());
  return adapter || createMockBridge();
}

module.exports = {
  createSteamBridge,
  createMockBridge,
};
