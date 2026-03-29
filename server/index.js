/**
 * Solomon Game — Backend Server
 * Express.js + SQLite
 */
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ── API Routes ──
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

// ── WebAdmin 정적 파일 ──
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── DB 초기화 ──
getDB();

// ── Server Start ──
app.listen(PORT, () => {
  console.log(`Solomon Server running on http://localhost:${PORT}`);
  console.log(`WebAdmin:  http://localhost:${PORT}/admin`);
  console.log(`API Docs:  http://localhost:${PORT}/api/health`);
});

// ── Graceful Shutdown ──
process.on('SIGINT', () => {
  closeDB();
  process.exit(0);
});
process.on('SIGTERM', () => {
  closeDB();
  process.exit(0);
});
