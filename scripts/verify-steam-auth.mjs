import {
  authenticateSteamTicket,
  issueSessionToken,
  verifySessionToken,
} from '../server/lib/steamAuth.js';

process.env.STEAM_AUTH_MOCK = process.env.STEAM_AUTH_MOCK || '1';
process.env.STEAM_APP_ID = process.env.STEAM_APP_ID || '4709340';
process.env.STEAM_AUTH_IDENTITY = process.env.STEAM_AUTH_IDENTITY || 'solomon-web-api';
process.env.STEAM_SESSION_SECRET = process.env.STEAM_SESSION_SECRET || 'local-dev-session-secret';

const auth = await authenticateSteamTicket(Buffer.from('mock-ticket-for-steam-auth').toString('hex'));
const issued = issueSessionToken({
  steamId: auth.steamId,
  personaName: 'Steam Mock Player',
  mock: auth.mock,
});
const verified = verifySessionToken(issued.token);

console.log(JSON.stringify({
  ok: true,
  steamId: auth.steamId,
  mock: auth.mock,
  tokenSubject: verified.sub,
  expiresAt: issued.expiresAt,
}, null, 2));
