import { Router } from 'express';
import {
  SteamAuthError,
  authenticateSteamTicket,
  issueSessionToken,
  requireSteamSession,
} from '../lib/steamAuth.js';

const router = Router();

router.get('/session', requireSteamSession, (req, res) => {
  res.json({
    ok: true,
    session: {
      steamId: req.steamSession.steamId,
      personaName: req.steamSession.personaName,
      mock: req.steamSession.mock,
      expiresAt: new Date(req.steamSession.exp * 1000).toISOString(),
    },
  });
});

router.post('/steam', async (req, res) => {
  try {
    const ticketHex = req.body?.ticketHex || req.body?.ticket;
    const personaName = typeof req.body?.personaName === 'string' ? req.body.personaName.slice(0, 128) : null;
    const authResult = await authenticateSteamTicket(ticketHex);
    const issued = issueSessionToken({
      steamId: authResult.steamId,
      personaName,
      mock: authResult.mock,
    });

    res.json({
      ok: true,
      token: issued.token,
      session: {
        steamId: authResult.steamId,
        ownerSteamId: authResult.ownerSteamId,
        personaName,
        mock: authResult.mock,
        vacBanned: authResult.vacBanned,
        publisherBanned: authResult.publisherBanned,
        expiresAt: issued.expiresAt,
      },
    });
  } catch (err) {
    const status = err instanceof SteamAuthError ? err.status : 500;
    res.status(status).json({
      error: err.code || 'steam_auth_failed',
      message: err.message || 'Steam authentication failed.',
    });
  }
});

export default router;
