/**
 * Project Solomon backend server.
 * Express.js + SQLite.
 */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDB, closeDB } from './db/connection.js';

import noticesRouter from './routes/notices.js';
import mailRouter from './routes/mail.js';
import aiPromptsRouter from './routes/aiPrompts.js';
import playersRouter from './routes/players.js';
import statsRouter from './routes/stats.js';
import aiAgentsRouter from './routes/aiAgents.js';
import aiBlocksRouter from './routes/aiBlocks.js';
import aiDataFieldsRouter from './routes/aiDataFields.js';
import evalRouter from './routes/eval.js';
import caseMetaRouter from './routes/caseMeta.js';
import seasonsRouter from './routes/seasons.js';
import llmLogRouter from './routes/llmLog.js';
import authRouter from './routes/auth.js';
import llmRouter from './routes/llm.js';
import { requireSteamSession } from './lib/steamAuth.js';

dotenv.config({ quiet: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

function isApiAuthRequired() {
  if (process.env.STEAM_REQUIRE_API_AUTH === '0') return false;
  if (process.env.NODE_ENV === 'production') return true;
  return process.env.STEAM_REQUIRE_API_AUTH === '1';
}

function steamApiAuthGate(req, res, next) {
  if (!isApiAuthRequired()) return next();
  if (req.path === '/health' || req.path.startsWith('/auth/')) return next();
  return requireSteamSession(req, res, next);
}

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api', steamApiAuthGate);
app.use('/api/llm', llmRouter);
app.use('/api/notices', noticesRouter);
app.use('/api/mail', mailRouter);
app.use('/api/ai-prompts', aiPromptsRouter);
app.use('/api/players', playersRouter);
app.use('/api/stats', statsRouter);
app.use('/api/ai-agents', aiAgentsRouter);
app.use('/api/ai-blocks', aiBlocksRouter);
app.use('/api/ai-data-fields', aiDataFieldsRouter);
app.use('/api/eval', evalRouter);
app.use('/api/case-meta', caseMetaRouter);
app.use('/api/seasons', seasonsRouter);
app.use('/api/llm-log', llmLogRouter);

app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

getDB();

app.listen(PORT, HOST, () => {
  console.log(`Solomon Server running on http://${HOST}:${PORT}`);
  console.log(`WebAdmin:  http://${HOST}:${PORT}/admin`);
  console.log(`API Docs:  http://${HOST}:${PORT}/api/health`);
});

process.on('SIGINT', () => {
  closeDB();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeDB();
  process.exit(0);
});
