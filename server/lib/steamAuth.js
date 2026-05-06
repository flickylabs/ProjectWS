import crypto from 'node:crypto';

const STEAM_AUTH_ENDPOINT = 'https://partner.steam-api.com/ISteamUserAuth/AuthenticateUserTicket/v1/';
const DEFAULT_SESSION_TTL_SECONDS = 24 * 60 * 60;
const DEFAULT_DEV_SESSION_SECRET = 'dev-only-steam-session-secret';

export class SteamAuthError extends Error {
  constructor(code, message, status = 400, details = undefined) {
    super(message);
    this.name = 'SteamAuthError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function base64UrlEncode(value) {
  const input = typeof value === 'string' ? Buffer.from(value, 'utf8') : value;
  return input.toString('base64url');
}

function base64UrlJson(value) {
  return base64UrlEncode(JSON.stringify(value));
}

function getSessionSecret(env = process.env) {
  const secret = env.STEAM_SESSION_SECRET || env.SESSION_SECRET;
  if (secret) return secret;
  if (env.NODE_ENV === 'production') {
    throw new SteamAuthError('session_secret_missing', 'STEAM_SESSION_SECRET is required in production.', 500);
  }
  return DEFAULT_DEV_SESSION_SECRET;
}

function hmacSha256(input, secret) {
  return crypto.createHmac('sha256', secret).update(input).digest();
}

function isSafeEqual(a, b) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function issueSessionToken(user, options = {}) {
  const env = options.env || process.env;
  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = Number(env.STEAM_SESSION_TTL_SECONDS || DEFAULT_SESSION_TTL_SECONDS);
  const payload = {
    iss: 'solomon-server',
    aud: 'solomon-pc',
    sub: user.steamId,
    steamId: user.steamId,
    personaName: user.personaName || null,
    provider: 'steam',
    mock: Boolean(user.mock),
    appId: env.STEAM_APP_ID || null,
    iat: now,
    exp: now + ttlSeconds,
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const unsigned = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const signature = base64UrlEncode(hmacSha256(unsigned, getSessionSecret(env)));
  return {
    token: `${unsigned}.${signature}`,
    payload,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
}

export function verifySessionToken(token, options = {}) {
  if (!token || typeof token !== 'string') {
    throw new SteamAuthError('token_missing', 'Steam session token is required.', 401);
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new SteamAuthError('token_malformed', 'Steam session token is malformed.', 401);
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const expected = base64UrlEncode(hmacSha256(unsigned, getSessionSecret(options.env || process.env)));
  if (!isSafeEqual(signature, expected)) {
    throw new SteamAuthError('token_invalid', 'Steam session token signature is invalid.', 401);
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
  } catch {
    throw new SteamAuthError('token_malformed', 'Steam session token payload is malformed.', 401);
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp <= now) {
    throw new SteamAuthError('token_expired', 'Steam session token is expired.', 401);
  }

  return payload;
}

export function extractBearerToken(req) {
  const header = req.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

export function requireSteamSession(req, res, next) {
  try {
    req.steamSession = verifySessionToken(extractBearerToken(req));
    next();
  } catch (err) {
    const status = err instanceof SteamAuthError ? err.status : 401;
    res.status(status).json({
      error: err.code || 'steam_session_invalid',
      message: err.message || 'Steam session is invalid.',
    });
  }
}

export function isHexTicket(ticket) {
  return (
    typeof ticket === 'string' &&
    ticket.length >= 16 &&
    ticket.length % 2 === 0 &&
    /^[0-9a-f]+$/i.test(ticket)
  );
}

export function isMockSteamAuthEnabled(env = process.env) {
  if (env.STEAM_AUTH_MOCK === '1' && env.NODE_ENV === 'production') {
    throw new SteamAuthError('steam_auth_mock_forbidden', 'STEAM_AUTH_MOCK cannot be enabled in production.', 500);
  }
  if (env.STEAM_AUTH_MOCK === '1') return true;
  return false;
}

function getSteamAuthConfig(env = process.env) {
  const appId = env.STEAM_APP_ID;
  const webApiKey = env.STEAM_WEB_API_KEY;
  const identity = env.STEAM_AUTH_IDENTITY;
  const missing = [];
  if (!appId) missing.push('STEAM_APP_ID');
  if (!webApiKey) missing.push('STEAM_WEB_API_KEY');
  if (!identity) missing.push('STEAM_AUTH_IDENTITY');
  if (missing.length) {
    throw new SteamAuthError(
      'steam_env_missing',
      `Missing Steam authentication env: ${missing.join(', ')}`,
      500,
      { missing },
    );
  }
  return { appId, webApiKey, identity };
}

function parseSteamAuthResponse(data) {
  const response = data?.response || data;
  const params = response?.params || response;
  const steamId = params?.steamid;
  if (!steamId || !/^\d{17}$/.test(String(steamId))) {
    throw new SteamAuthError('steam_ticket_invalid', 'Steam ticket was not accepted.', 401, data);
  }

  return {
    steamId: String(steamId),
    ownerSteamId: params?.ownersteamid ? String(params.ownersteamid) : null,
    vacBanned: Boolean(params?.vacbanned),
    publisherBanned: Boolean(params?.publisherbanned),
    raw: data,
  };
}

export async function authenticateSteamTicket(ticketHex, options = {}) {
  const env = options.env || process.env;
  if (!isHexTicket(ticketHex)) {
    throw new SteamAuthError('ticket_malformed', 'Steam auth ticket must be a hexadecimal string.', 400);
  }

  if (isMockSteamAuthEnabled(env)) {
    return {
      steamId: env.STEAM_AUTH_MOCK_STEAM_ID || '76561198000000000',
      ownerSteamId: null,
      vacBanned: false,
      publisherBanned: false,
      mock: true,
      raw: { mock: true },
    };
  }

  const { appId, webApiKey, identity } = getSteamAuthConfig(env);
  const url = new URL(STEAM_AUTH_ENDPOINT);
  url.searchParams.set('key', webApiKey);
  url.searchParams.set('appid', appId);
  url.searchParams.set('ticket', ticketHex);
  url.searchParams.set('identity', identity);
  url.searchParams.set('format', 'json');

  const fetchImpl = options.fetchImpl || fetch;
  const response = await fetchImpl(url, { method: 'GET' });
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new SteamAuthError('steam_web_api_bad_json', 'Steam Web API returned invalid JSON.', 502, text);
  }

  if (!response.ok) {
    throw new SteamAuthError('steam_web_api_failed', `Steam Web API failed with HTTP ${response.status}.`, 502, data);
  }

  return {
    ...parseSteamAuthResponse(data),
    mock: false,
  };
}
