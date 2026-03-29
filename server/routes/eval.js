/**
 * Eval API — AI 응답 품질 자동 검증
 * GET /api/eval/cases — eval 케이스 목록
 * POST /api/eval/run — 단일 케이스 실행 (서버에서 LLM 호출)
 */
import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

// ── .env에서 API 키 로드 ──
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../../.env');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

let EVAL_CASES = [];
try {
  const raw = readFileSync(resolve(__dirname, '../../src/data/evalCases.ts'), 'utf-8');
  const match = raw.match(/export const EVAL_CASES.*?= (\[[\s\S]*\])/);
  if (match) EVAL_CASES = JSON.parse(match[1]);
} catch (e) {
  console.warn('[Eval] Failed to load eval cases:', e.message);
}

/**
 * GET /api/eval/cases — eval 케이스 목록 반환
 */
router.get('/cases', (req, res) => {
  res.json(EVAL_CASES.map(c => ({
    id: c.id,
    label: c.label,
    agentKey: c.agentKey,
    phase: c.phase,
    target: c.target,
    disputeId: c.disputeId,
    actionType: c.action?.type,
    questionType: c.action?.questionType,
    expectedStance: c.expected?.stance,
    expectedMode: c.expected?.responseMode,
    forbiddenCount: (c.expected?.forbiddenTruthIds || c.actionContract?.forbiddenTruthIds || []).length,
  })));
});

/**
 * POST /api/eval/run — 단일 케이스 실행
 * body: { caseId: "E01" }
 * 서버에서 에이전트 프롬프트 조립 → LLM 호출 → 검증 → 결과 반환
 */
router.post('/run', async (req, res) => {
  const { caseId } = req.body;
  const evalCase = EVAL_CASES.find(c => c.id === caseId);
  if (!evalCase) return res.status(404).json({ error: 'Case not found' });

  const db = getDB();

  try {
    // 1. 에이전트의 블록 조합으로 system prompt 조립
    const agent = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(evalCase.agentKey);
    if (!agent) return res.status(404).json({ error: `Agent ${evalCase.agentKey} not found` });

    const compositions = db.prepare(
      'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order'
    ).all(evalCase.agentKey);

    // 조건부 블록 필터링
    const activeComps = compositions.filter(c => {
      if (!c.condition_field) return true;
      if (c.condition_field === 'phase') return c.condition_value === evalCase.phase;
      return true;
    });

    // 블록 content 조립
    const blockKeys = activeComps.map(c => c.block_key);
    let systemPrompt = '';
    for (const key of blockKeys) {
      const block = db.prepare('SELECT content FROM ai_prompt_blocks WHERE key = ? AND is_active = 1').get(key);
      if (block) systemPrompt += block.content + '\n\n';
    }

    // 변수 치환 — 실제 사건 JSON에서 추출
    const vars = buildCaseVars(evalCase.caseId, evalCase.target, evalCase.disputeId,
      evalCase.action?.type || 'question', evalCase.action?.questionType,
      evalCase.action?.trustActionType, evalCase.actionContract);

    for (const [k, v] of Object.entries(vars)) {
      systemPrompt = systemPrompt.replaceAll(`{${k}}`, v);
    }

    // 2. LLM 호출
    const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set' });

    const llmRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: evalCase.userMessage },
        ],
        temperature: agent.temperature ?? 0.75,
        max_tokens: agent.max_tokens ?? 320,
      }),
    });

    const llmData = await llmRes.json();
    const rawResponse = llmData.choices?.[0]?.message?.content ?? '';

    // 3. JSON 파싱
    let parsed = null;
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch { /* 파싱 실패 */ }

    // 4. 검증
    const checks = runChecks(evalCase, rawResponse, parsed);
    const passed = checks.every(c => c.passed);

    res.json({
      id: evalCase.id,
      label: evalCase.label,
      passed,
      checks,
      rawResponse,
      parsedResponse: parsed,
      systemPromptLength: systemPrompt.length,
      blocksUsed: blockKeys,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * POST /api/eval/run-all — 전체 15케이스 실행
 */
router.post('/run-all', async (req, res) => {
  const results = [];
  for (const evalCase of EVAL_CASES) {
    try {
      // 내부적으로 /run과 같은 로직 실행
      const result = await runSingleCase(evalCase, getDB());
      results.push(result);
    } catch (e) {
      results.push({ id: evalCase.id, label: evalCase.label, passed: false, error: e.message });
    }
  }
  const passed = results.filter(r => r.passed).length;
  res.json({
    total: results.length,
    passed,
    failed: results.length - passed,
    passRate: Math.round((passed / results.length) * 100),
    results,
  });
});

async function runSingleCase(evalCase, db) {
  const agent = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(evalCase.agentKey);
  if (!agent) return { id: evalCase.id, passed: false, error: 'Agent not found' };

  const compositions = db.prepare(
    'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order'
  ).all(evalCase.agentKey);

  const activeComps = compositions.filter(c => {
    if (!c.condition_field) return true;
    if (c.condition_field === 'phase') return c.condition_value === evalCase.phase;
    return true;
  });

  let systemPrompt = '';
  const blockKeys = activeComps.map(c => c.block_key);
  for (const key of blockKeys) {
    const block = db.prepare('SELECT content FROM ai_prompt_blocks WHERE key = ? AND is_active = 1').get(key);
    if (block) systemPrompt += block.content + '\n\n';
  }

  const vars = buildCaseVars(evalCase.caseId, evalCase.target, evalCase.disputeId,
    evalCase.action?.type || 'question', evalCase.action?.questionType,
    evalCase.action?.trustActionType, evalCase.actionContract);
  for (const [k, v] of Object.entries(vars)) {
    systemPrompt = systemPrompt.replaceAll(`{${k}}`, v);
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) return { id: evalCase.id, passed: false, error: 'No API key' };

  const llmRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: evalCase.userMessage },
      ],
      temperature: agent.temperature ?? 0.75,
      max_tokens: agent.max_tokens ?? 320,
    }),
  });

  const llmData = await llmRes.json();
  const rawResponse = llmData.choices?.[0]?.message?.content ?? '';

  let parsed = null;
  try {
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
  } catch {}

  const checks = runChecks(evalCase, rawResponse, parsed);
  return {
    id: evalCase.id,
    label: evalCase.label,
    passed: checks.every(c => c.passed),
    checks,
    rawResponse: rawResponse.slice(0, 500),
    parsedResponse: parsed,
  };
}

function runChecks(evalCase, raw, parsed) {
  const checks = [];
  const expected = evalCase.expected || {};
  const npcResponse = parsed?.npcResponse ?? raw;

  checks.push({ name: 'json_parse', passed: !!parsed, detail: parsed ? 'OK' : 'JSON 파싱 실패' });
  if (!parsed) return checks;

  checks.push({ name: 'min_length', passed: (npcResponse?.length ?? 0) >= 10, detail: `길이: ${npcResponse?.length ?? 0}` });

  // truthIds 누출
  const mentioned = parsed.mentionedTruthIds || [];
  const forbidden = expected.forbiddenTruthIds || evalCase.actionContract?.forbiddenTruthIds || [];
  const leaked = mentioned.filter(id => forbidden.includes(id));
  checks.push({ name: 'truth_leak', passed: leaked.length === 0, detail: leaked.length ? `누출: ${leaked.join(',')}` : '누출 없음' });

  // stance
  if (expected.stance?.length) {
    checks.push({ name: 'stance', passed: expected.stance.includes(parsed.stance), detail: `${parsed.stance} (기대: ${expected.stance.join('/')})` });
  }

  // responseMode
  if (expected.responseMode) {
    checks.push({ name: 'mode', passed: parsed.responseMode === expected.responseMode, detail: `${parsed.responseMode} (기대: ${expected.responseMode})` });
  }

  // forbiddenKeywords
  if (expected.forbiddenKeywords?.length) {
    const found = expected.forbiddenKeywords.filter(kw => npcResponse.includes(kw));
    checks.push({ name: 'keywords', passed: found.length === 0, detail: found.length ? `포함: ${found.join(',')}` : '금지어 없음' });
  }

  return checks;
}

// ═══════════════════════════════════════════
// 공통: 사건 JSON에서 풍부한 변수 생성
// ═══════════════════════════════════════════

function buildCaseVars(caseId, target, disputeId, actionType, questionType, trustActionType, actionContractOverride) {
  // caseId → 파일명 매핑 (case-spouse-01 → spouse-01)
  const fileKey = (caseId || '').replace(/^case-/, '').replace(/^work-/, 'workplace-');
  const casePath = resolve(CASES_DIR, fileKey + '.json');

  // 폴백 더미
  const dummy = {
    name: 'NPC', age: '30', opponent: 'Opponent', relationship: '', context: '',
    speechStyle: '', callForm: '상대방', judgeRef: '상대방', angryCall: '상대방!',
    formalityGuide: '', speechGuideShort: '', knownFacts: '',
    disputeInfo: `현재 쟁점: ${disputeId || ''}`, emotionInfo: '현재 감정: defensive',
    evidenceInfo: '', recentDialogue: '', historyContext: '', phaseTranscript: '',
    focusedDisputeId: disputeId || '', disputeName: '',
    actionContract: actionContractOverride ? JSON.stringify(actionContractOverride) : JSON.stringify({ actionType: 'question', responseMode: 'answer_only', answerStyle: 'factual', goal: '', revealBudget: { fact: 1, motive: 1, emotion: 1 }, allowedTruthIds: [], forbiddenTruthIds: [] }),
    trustInfo: JSON.stringify({ trustTowardJudge: 30, fearOfExposure: 50, retaliationWorry: 30 }),
    skillOverlay: '', evidenceAxis: '', investigationResult: '',
  };

  if (!existsSync(casePath)) return dummy;

  try {
    const cd = JSON.parse(readFileSync(casePath, 'utf-8'));
    const party = target === 'b' ? cd.duo.partyB : cd.duo.partyA;
    const opponent = target === 'b' ? cd.duo.partyA : cd.duo.partyB;
    const dispute = cd.disputes.find(d => d.id === disputeId);
    const rawCall = party.callTerms?.toPartner || '상대방';
    const callForm = rawCall === '자기' ? '자기야' : rawCall;

    // lie state
    const lieConfigs = target === 'a' ? cd.lieConfigA : cd.lieConfigB;
    const lieEntry = lieConfigs?.find(l => l.disputeId === disputeId);
    const lieState = lieEntry?.initialState || 'S0';
    const stateInstr = { S0: '이 쟁점을 완전히 부정하세요. 자신감 있게.', S1: '약간 흔들리고 있습니다. 배경을 설명하되 핵심은 부정하세요.', S2: '일부를 인정합니다. "맞지만 이유가 다르다"고 하세요.', S3: '상대 탓으로 돌리세요.', S4: '감정적으로 호소하세요.', S5: '인정합니다. 자기 입장에서 재해석하세요.' };
    const motiveHints = { self_protection: '자기를 보호하려는 마음', face_saving: '체면을 지키려는 마음', shame_avoidance: '수치심을 피하려는 마음', relationship_maintenance: '관계를 지키려는 마음', revenge: '복수심', third_party_protection: '누군가를 보호하려는 마음', career_preservation: '직장/평판을 지키려는 마음' };

    let disputeInfo = '';
    if (dispute) {
      disputeInfo = `## 현재 쟁점: "${dispute.name}"\n내용: ${dispute.truthDescription || ''}\n${stateInstr[lieState] || ''}`;
      if (!dispute.truth && lieState <= 'S1') disputeInfo += '\n(이 쟁점은 사실이 아닙니다 — 억울하게 부정하세요.)';
      disputeInfo += `\n거짓말 동기: ${motiveHints[lieEntry?.lieMotive] || ''}`;
      const others = cd.disputes.filter(d => d.id !== disputeId);
      if (others.length) {
        disputeInfo += `\n\n⚠️ 현재 질문은 "${dispute.name}"에 대한 것입니다. 이 쟁점에만 답하세요.`;
        disputeInfo += `\n❌ 절대 언급 금지: ${others.map(d => `"${d.name}"`).join(', ')}`;
      }
    }

    // knownFacts
    const myQ = target === 'a' ? 'a_only' : 'b_only';
    const facts = (cd.truthTable || []).filter(t => t.quadrant === 'both_know' || t.quadrant === myQ).slice(0, 3);
    const knownFacts = facts.length ? `\n당신이 아는 사실:\n` + facts.map(f => `- ${f.fact}`).join('\n') : '';

    // formality
    const relType = cd.meta?.relationshipType || '';
    const famRel = cd.meta?.familyRelation;
    const relState = cd.meta?.relationshipState;
    let informal = ['spouse', 'friend'].includes(relType);
    if (relType === 'family') {
      informal = famRel === 'siblings';
      if ((famRel === 'parent_child' || famRel === 'inlaw_mother_daughter_in_law')) {
        informal = target === 'a' ? (cd.duo.partyA.age > cd.duo.partyB.age) : (cd.duo.partyB.age > cd.duo.partyA.age);
      }
    }
    if (relType === 'spouse' && (relState === 'separated' || relState === 'strained')) informal = false;

    return {
      name: party.name, age: String(party.age), opponent: opponent.name,
      relationship: relType, context: cd.context?.description || '',
      speechStyle: party.speechStyle || '', callForm,
      judgeRef: party.callTerms?.toJudge || '상대방',
      angryCall: party.callTerms?.angry || opponent.name + ' 씨!',
      formalityGuide: informal ? '- 상대에게: 반말 (~야, ~잖아, ~거야)' : '- 상대에게: 존댓말. 감정 격해지면 반말 가능.',
      speechGuideShort: informal ? '\n말투: 상대에게 반말, 재판관에게 존댓말.' : '\n말투: 상대에게 존댓말, 재판관에게 존댓말.',
      knownFacts, disputeInfo,
      emotionInfo: '현재 감정: defensive', evidenceInfo: '', recentDialogue: '',
      historyContext: '\n⚠️ 이 쟁점에 대해 처음 묻는 질문이다.\n"이미 말씀드렸다" 류의 표현을 쓰지 마세요.',
      phaseTranscript: '', focusedDisputeId: disputeId || '',
      disputeName: dispute?.name || '',
      actionContract: actionContractOverride ? JSON.stringify(actionContractOverride) : JSON.stringify({ actionType: 'question', responseMode: 'answer_only', answerStyle: 'factual', goal: '', revealBudget: { fact: 1, motive: 1, emotion: 1 }, allowedTruthIds: [], forbiddenTruthIds: [] }),
      trustInfo: JSON.stringify({ trustTowardJudge: 30, fearOfExposure: 50, retaliationWorry: 30 }),
      skillOverlay: trustActionType === 'separation' ? '[분리심문 활성]\n- responseMode: answer_only\n- 상대 직접 언급 금지' : '',
      evidenceAxis: '', investigationResult: '',
    };
  } catch { return dummy; }
}

// ═══════════════════════════════════════════
// 커스텀 테스트 API
// ═══════════════════════════════════════════

const CASES_DIR = resolve(__dirname, '../../src/data/cases/generated');

/**
 * GET /api/eval/case-list — 84개 사건 목록
 */
router.get('/case-list', (req, res) => {
  try {
    const files = readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort();
    const list = files.map(f => {
      try {
        const d = JSON.parse(readFileSync(resolve(CASES_DIR, f), 'utf-8'));
        return {
          file: f.replace('.json', ''),
          caseId: d.caseId,
          relationshipType: d.meta?.relationshipType ?? '',
          nameA: d.duo?.partyA?.name,
          nameB: d.duo?.partyB?.name,
          disputeCount: d.disputes?.length ?? 0,
          evidenceCount: d.evidence?.length ?? 0,
          witnessCount: d.duo?.socialGraph?.length ?? 0,
        };
      } catch { return { file: f.replace('.json', ''), error: true }; }
    });
    res.json(list);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * GET /api/eval/case/:fileKey — 사건 상세 (테스트용 파싱)
 */
router.get('/case/:fileKey', (req, res) => {
  const filePath = resolve(CASES_DIR, req.params.fileKey + '.json');
  if (!existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

  try {
    const d = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.json({
      caseId: d.caseId,
      relationshipType: d.meta?.relationshipType ?? '',
      familyRelation: d.meta?.familyRelation,
      relationshipState: d.meta?.relationshipState,
      partyA: { name: d.duo.partyA.name, age: d.duo.partyA.age, speechStyle: d.duo.partyA.speechStyle?.slice(0, 80), callTerms: d.duo.partyA.callTerms },
      partyB: { name: d.duo.partyB.name, age: d.duo.partyB.age, speechStyle: d.duo.partyB.speechStyle?.slice(0, 80), callTerms: d.duo.partyB.callTerms },
      disputes: d.disputes.map(dp => ({ id: dp.id, name: dp.name, truth: dp.truth })),
      evidence: d.evidence.map(e => ({ id: e.id, name: e.name, type: e.type, reliability: e.reliability, proves: e.proves })),
      witnesses: (d.duo.socialGraph || []).map(w => ({ id: w.id, name: w.name, bias: w.bias })),
      truthTable: (d.truthTable || []).map((t, i) => ({ id: `t-${i + 1}`, fact: t.fact?.slice(0, 80), isTrue: t.isTrue, quadrant: t.quadrant })),
      lieConfigA: (d.lieConfigA || []).map(l => ({ disputeId: l.disputeId, initialState: l.initialState, lieMotive: l.lieMotive, collapseViaTrust: l.collapseViaTrust })),
      lieConfigB: (d.lieConfigB || []).map(l => ({ disputeId: l.disputeId, initialState: l.initialState, lieMotive: l.lieMotive, collapseViaTrust: l.collapseViaTrust })),
      context: d.context?.description?.slice(0, 200),
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * POST /api/eval/custom-run — 커스텀 조합 테스트
 * body: { agentKey, phase, target, disputeId, actionType, questionType?, vars? }
 */
router.post('/custom-run', async (req, res) => {
  const { agentKey, phase, target, disputeId, actionType, questionType, trustActionType,
          evidenceId, caseFileKey, userMessageOverride, varsOverride } = req.body;

  const db = getDB();

  try {
    // 에이전트 프롬프트 조립
    const agent = db.prepare('SELECT * FROM ai_agents WHERE key = ?').get(agentKey || 'interrogation');
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const compositions = db.prepare(
      'SELECT * FROM ai_agent_blocks WHERE agent_key = ? ORDER BY sort_order'
    ).all(agent.key);

    const activeComps = compositions.filter(c => {
      if (!c.condition_field) return true;
      if (c.condition_field === 'phase') return c.condition_value === phase;
      return true;
    });

    let systemPrompt = '';
    const blockKeys = activeComps.map(c => c.block_key);
    for (const key of blockKeys) {
      const block = db.prepare('SELECT content FROM ai_prompt_blocks WHERE key = ? AND is_active = 1').get(key);
      if (block) systemPrompt += block.content + '\n\n';
    }

    // 사건 데이터에서 변수 추출
    let caseVars = {};
    if (caseFileKey) {
      const casePath = resolve(CASES_DIR, caseFileKey + '.json');
      if (existsSync(casePath)) {
        const cd = JSON.parse(readFileSync(casePath, 'utf-8'));
        const party = target === 'b' ? cd.duo.partyB : cd.duo.partyA;
        const opponent = target === 'b' ? cd.duo.partyA : cd.duo.partyB;
        const dispute = cd.disputes.find(d => d.id === disputeId);
        const rawCallForm = party.callTerms?.toPartner || '상대방';
        const callForm = rawCallForm === '자기' ? '자기야' : rawCallForm;

        // lie state + 행동 지시
        const lieConfigs = target === 'a' ? cd.lieConfigA : cd.lieConfigB;
        const lieEntry = lieConfigs?.find(l => l.disputeId === disputeId);
        const lieState = lieEntry?.initialState || 'S0';
        const stateInstructions = {
          S0: '이 쟁점을 완전히 부정하세요. 자신감 있게.',
          S1: '약간 흔들리고 있습니다. 배경을 설명하되 핵심은 부정하세요.',
          S2: '일부를 인정합니다. "맞지만 이유가 다르다"고 하세요.',
          S3: '상대 탓으로 돌리세요. "내가 그런 건 상대 때문"이라고.',
          S4: '감정적으로 호소하세요. 논리보다 감정으로.',
          S5: '인정합니다. 사실을 인정하되 자기 입장에서 재해석하세요.',
        };
        const motiveHints = {
          self_protection: '자기를 보호하려는 마음',
          face_saving: '체면을 지키려는 마음',
          shame_avoidance: '수치심을 피하려는 마음 — 공감 질문에 약함',
          relationship_maintenance: '관계를 지키려는 마음 — 비공개 보장에 약함',
          revenge: '복수심 — 압박에 오히려 공격적',
          third_party_protection: '누군가를 보호하려는 마음',
          career_preservation: '직장/평판을 지키려는 마음',
        };

        let disputeInfo = '';
        if (dispute) {
          disputeInfo = `## 현재 쟁점: "${dispute.name}"\n내용: ${dispute.truthDescription || ''}\n${stateInstructions[lieState] || ''}`;
          if (!dispute.truth && lieState <= 'S1') {
            disputeInfo += '\n(이 쟁점은 사실이 아닙니다 — 당신은 진짜로 안 했습니다. 억울하게 부정하세요.)';
          }
          disputeInfo += `\n거짓말 동기: ${motiveHints[lieEntry?.lieMotive] || ''}`;
          const otherDisputes = cd.disputes.filter(d => d.id !== disputeId);
          if (otherDisputes.length > 0) {
            disputeInfo += `\n\n⚠️ 현재 질문은 "${dispute.name}"에 대한 것입니다. 이 쟁점에만 답하세요.`;
            disputeInfo += `\n❌ 절대 언급 금지: ${otherDisputes.map(d => `"${d.name}"`).join(', ')}`;
          }
        }

        // knownFacts
        const myQuadrant = target === 'a' ? 'a_only' : 'b_only';
        const facts = (cd.truthTable || []).filter(t => t.quadrant === 'both_know' || t.quadrant === myQuadrant).slice(0, 3);
        const knownFacts = facts.length > 0
          ? `\n당신이 아는 사실 (현재 쟁점 "${dispute?.name || ''}" 관련):\n` + facts.map(f => `- ${f.fact}`).join('\n')
          : '';

        // formalityGuide
        const relType = cd.meta?.relationshipType || '';
        const famRel = cd.meta?.familyRelation;
        const relState = cd.meta?.relationshipState;
        let isInformal = ['spouse', 'friend'].includes(relType);
        if (relType === 'family') {
          isInformal = famRel === 'siblings';
          if (famRel === 'parent_child' || famRel === 'inlaw_mother_daughter_in_law') {
            const ageA = cd.duo.partyA.age || 0;
            const ageB = cd.duo.partyB.age || 0;
            isInformal = target === 'a' ? ageA > ageB : ageB > ageA;
          }
        }
        if (relType === 'spouse' && (relState === 'separated' || relState === 'strained')) isInformal = false;

        const formalityGuide = isInformal
          ? '- 상대에게: 반말 (~야, ~잖아, ~거야)'
          : '- 상대에게: 존댓말 (~요, ~습니다). 감정 격해지면 반말 전환 가능.';
        const speechGuideShort = isInformal
          ? '\n말투: 상대에게 반말, 재판관에게 존댓말.'
          : '\n말투: 상대에게 존댓말, 재판관에게 존댓말.';

        // responseMode
        const responseModes = {
          fact_pursuit: 'answer_only',
          motive_search: 'answer_then_counter',
          empathy_approach: 'private_confession',
        };
        const responseMode = actionType === 'evidence_present' ? 'evidence_rebuttal'
          : actionType === 'trust_action' ? (trustActionType === 'confidential_protection' ? 'private_confession' : 'answer_only')
          : responseModes[questionType] || 'answer_then_counter';

        // goal
        const goalMap = {
          fact_pursuit: '날짜·금액·행위 여부를 고정한다',
          motive_search: '숨긴 이유와 자기정당화 동기를 끌어낸다',
          empathy_approach: '수치심·두려움·관계유지 동기를 끌어낸다',
          evidence_present: '증거에 대한 직접 반응을 끌어낸다',
          confidential_protection: '상대에게 못 하던 말을 재판관에게만 하게 한다',
          separation: '상대 눈치를 덜 보고 집중하게 한다',
        };
        const goalKey = questionType || trustActionType || actionType;

        const stateNum = parseInt(lieState.slice(1));
        const factBudget = questionType === 'fact_pursuit' ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 2);
        const motiveBudget = questionType === 'motive_search' ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 1);
        const emotionBudget = questionType === 'empathy_approach' ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 2);

        caseVars = {
          name: party.name, age: String(party.age), opponent: opponent.name,
          relationship: relType, context: cd.context?.description || '',
          speechStyle: party.speechStyle || '', callForm,
          judgeRef: party.callTerms?.toJudge || '상대방',
          angryCall: party.callTerms?.angry || opponent.name + ' 씨!',
          formalityGuide, speechGuideShort, knownFacts, disputeInfo,
          emotionInfo: '현재 감정: defensive',
          evidenceInfo: '', recentDialogue: '',
          historyContext: `\n⚠️ 이 쟁점에 대해 처음 묻는 질문이다.\n"이미 말씀드렸다" 류의 표현을 절대 쓰지 마세요.`,
          phaseTranscript: '', focusedDisputeId: disputeId || '',
          actionContract: JSON.stringify({
            actionType: actionType || 'question', ...(questionType ? { questionType } : {}),
            responseMode, goal: goalMap[goalKey] || '현재 쟁점에 답한다',
            revealBudget: { fact: factBudget, motive: motiveBudget, emotion: emotionBudget },
            allowedTruthIds: [], forbiddenTruthIds: [],
          }),
          trustInfo: JSON.stringify({ trustTowardJudge: 30, fearOfExposure: 50, retaliationWorry: 30 }),
          skillOverlay: trustActionType === 'separation' ? '[분리심문 활성]\n- responseMode: answer_only\n- 상대 직접 언급 금지' : '',
          evidenceAxis: '', investigationResult: '',
          disputeName: dispute?.name || '',
        };
      }
    }

    // varsOverride로 덮어쓰기
    const finalVars = { ...caseVars, ...(varsOverride || {}) };
    for (const [k, v] of Object.entries(finalVars)) {
      systemPrompt = systemPrompt.replaceAll(`{${k}}`, v);
    }

    // User message 조립
    const disputeName = finalVars.disputeName || finalVars.focusedDisputeId || '해당 사안';
    let userMessage = userMessageOverride || '';
    if (!userMessage) {
      const qt = questionType || 'fact_pursuit';
      if (actionType === 'question') {
        userMessage = `현재 액션은 ${qt}다.\nfocusedDisputeId: ${disputeId}\nfocusedDisputeName: ${disputeName}\n재판관 질문: "${finalVars.name || 'NPC'} 씨, ${disputeName}에 대해 말씀해 주십시오."\n\n출력은 JSON 객체 하나만 한다.`;
      } else if (actionType === 'evidence_present') {
        userMessage = `현재 액션은 evidence_present다.\nfocusedDisputeId: ${disputeId}\n재판관이 증거를 제시했다.\n\n출력은 JSON 객체 하나만 한다.`;
      } else if (actionType === 'trust_action') {
        userMessage = `현재 액션은 ${trustActionType || 'confidential_protection'}이다.\nfocusedDisputeId: ${disputeId}\n\n출력은 JSON 객체 하나만 한다.`;
      } else {
        userMessage = `focusedDisputeId: ${disputeId}\n출력은 JSON 객체 하나만 한다.`;
      }
    }

    // LLM 호출
    const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set' });

    const llmRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: agent.temperature ?? 0.75,
        max_tokens: agent.max_tokens ?? 320,
      }),
    });

    const llmData = await llmRes.json();
    const rawResponse = llmData.choices?.[0]?.message?.content ?? '';

    let parsed = null;
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch {}

    res.json({
      rawResponse,
      parsedResponse: parsed,
      systemPromptLength: systemPrompt.length,
      blocksUsed: blockKeys,
      userMessage,
      agentKey: agent.key,
      temperature: agent.temperature,
      maxTokens: agent.max_tokens,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
