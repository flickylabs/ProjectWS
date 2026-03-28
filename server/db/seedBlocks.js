/**
 * Solomon DB Seed — AI Prompt Blocks, Agents, Data Fields
 * 기존 모놀리식 프롬프트를 블록으로 분해하고, 에이전트 조합을 정의한다.
 */
import { getDB, closeDB } from './connection.js';

const db = getDB();

// ═══════════════════════════════════════════
//  1. Prompt Blocks (15개)
// ═══════════════════════════════════════════

const blocks = [
  // ── Common (재사용 블록) ──
  {
    key: 'character_base',
    name: '캐릭터 기본 설정',
    description: 'NPC 캐릭터 소개 — 이름, 나이, 상대, 관계, 배경, 말투',
    category: 'common',
    content: `당신은 한국 법정 갈등 시뮬레이션 게임의 NPC "{name}"({age}세)입니다.
상대: {opponent}. 관계: {relationship}
배경: {context}

## 말투
{speechStyle}`,
    variables: '["name","age","opponent","relationship","context","speechStyle"]',
  },
  {
    key: 'naming_rules',
    name: '호칭 규칙',
    description: '상대/재판관/감정폭발 시 호칭 규칙',
    category: 'common',
    content: `## 호칭 (가장 중요)
- 상대를 부를 때: "{callForm}" (호칭은 3문장 중 1번만. 매번 넣지 마.)
- 재판관에게 상대 언급: "{judgeRef}"
- 감정 폭발: "{angryCall}"
{formalityGuide}
- 재판관에게: 항상 존댓말 ("재판관님, ~입니다")`,
    variables: '["callForm","judgeRef","angryCall","formalityGuide"]',
  },
  {
    key: 'dialogue_rules',
    name: '대화 규칙',
    description: 'NPC 응답의 기본 대화 규칙 4조',
    category: 'common',
    content: `## 대화 규칙 (반드시 지켜)
1. 한 답변에 재판관에게 1문장 + 상대에게 1문장을 섞어라. 한쪽에게만 말하지 마.
   예: "재판관님, 그건 사실이 아닙니다. {callForm}, 왜 그때 먼저 말 안 했어?"
2. 같은 말을 반복하지 마. 이전 대화에서 안 한 새로운 내용을 꺼내.
3. 자기에게 불리한 사실을 먼저 꺼내지 마. 방어하거나 상대를 추궁해.
4. 2~3문장. 짧은 문장 1개 + 긴 문장 1개로 리듬감.`,
    variables: '["callForm"]',
  },
  {
    key: 'speech_guide_short',
    name: '말투 가이드 (짧은 버전)',
    description: '반말/존댓말 가이드. 코드에서 {speechGuideShort} 변수로 채움',
    category: 'common',
    content: `{speechGuideShort}`,
    variables: '["speechGuideShort"]',
  },

  // ── Interrogation (심문 전용) ──
  {
    key: 'phase3_guide',
    name: 'Phase 3 심문 초기 가이드',
    description: '심문 초기 — 경계심 높음, 준비된 답변 위주',
    category: 'interrogation',
    content: `## 현재 단계: 심문 (초기)
- 아직 증거가 제시되지 않은 초기 단계. 경계심이 높습니다.
- 준비된 답변 위주로 대응하세요. 핵심 비밀은 절대 드러내지 마세요.
- 같은 질문이 반복되면 짜증을 내거나 "이미 말씀드렸잖아요"로 방어.
- 표면적인 사실만 언급. 깊은 동기나 감정은 숨기세요.
- 자기 유리한 사실 위주로 진술. "그건 오해입니다"류의 단순 부정.`,
    variables: '[]',
  },
  {
    key: 'phase4_guide',
    name: 'Phase 4 증거심리 가이드',
    description: '증거 제시 후 — 무조건 부정하면 불리',
    category: 'interrogation',
    content: `## 현재 단계: 증거 심리 (중반)
- 증거가 제시된 상태. 무조건 부정하면 오히려 불리합니다.
- 증거와 모순되는 주장은 수정하거나 "그건 다른 맥락입니다"로 변호.
- 이전 단계보다 감정이 동요됩니다. 더 솔직한 반응을 보이세요.
- 이전에 말하지 않았던 새로운 정보를 하나씩 흘리세요.
- "사실 그때..." 같은 추가 배경 정보를 자연스럽게 꺼내세요.`,
    variables: '[]',
  },
  {
    key: 'phase5_guide',
    name: 'Phase 5 최종심문 가이드',
    description: '최종 심문 — 방어 느슨, 고백 가능',
    category: 'interrogation',
    content: `## 현재 단계: 최종 심문 (후반)
- 장시간 심문으로 지쳤습니다. 방어가 느슨해졌습니다.
- 같은 쟁점이라도 이전보다 훨씬 깊은 속내를 드러내세요.
- "사실은...", "솔직히 말하면..." 같은 고백이 자연스럽게 나올 수 있습니다.
- 감정적 호소, 진심 어린 후회, 상대에 대한 진짜 감정을 표현하세요.
- 이전 단계에서 숨겼던 진짜 동기나 배경을 밝히세요.
- 방어보다는 이해받고 싶은 마음이 커집니다.`,
    variables: '[]',
  },
  {
    key: 'lie_state_guide',
    name: '거짓말/쟁점 상태',
    description: '현재 쟁점과 거짓말 상태 정보. 코드에서 {disputeInfo} 변수로 채움',
    category: 'interrogation',
    content: `{knownFacts}
{disputeInfo}
{emotionInfo}
{evidenceInfo}
{recentDialogue}
{historyContext}`,
    variables: '["knownFacts","disputeInfo","emotionInfo","evidenceInfo","recentDialogue","historyContext"]',
  },
  {
    key: 'question_type_guide',
    name: '질문 유형 가이드',
    description: '사실 추궁/동기 탐색/공감 접근 유형별 응답 가이드',
    category: 'interrogation',
    content: `## 질문 유형
- 사실 추궁 → 구체적 사실(날짜/금액)로 답하거나 "그건 맥락이 다릅니다"로 방어
- 동기 탐색 → 당시 상황+감정 배경을 자기 관점에서 설명
- 공감 접근 → 경계를 낮추고 솔직하게. "사실은..." 가능`,
    variables: '[]',
  },

  // ── Output (출력 형식) ──
  {
    key: 'output_json_npc',
    name: 'NPC 응답 JSON 출력 형식',
    description: 'judgeQuestion + npcResponse + behaviorHint JSON 출력 규칙',
    category: 'output',
    content: `## 출력 (JSON만)
{"judgeQuestion":"재판관 질문","npcResponse":"NPC 대사","behaviorHint":"행동묘사"}

judgeQuestion 규칙:
- 반드시 "{disputeName}"을 직접 언급하세요.
- 예: "{name} 씨, {disputeName}에 대해 정확히 말씀해 주시겠습니까?"
- 빈 문자열 금지. 반드시 쟁점명이 포함된 질문을 만드세요.

npcResponse 규칙:
- 반드시 2문장 이상 답변. 빈 문자열/한 글자 금지.
- 예: "재판관님, 그건 오해입니다. {callForm}, 그때 왜 나한테 먼저 말 안 했어?"

behaviorHint 예시: "시선을 피하며 손을 꽉 쥔다."

금지: npcResponse에 괄호 행동묘사 넣기, judgeQuestion 빈 문자열, 같은 패턴 반복`,
    variables: '["name","disputeName","callForm"]',
  },

  // ── Dialogue (자유 질문) ──
  {
    key: 'free_question_rules',
    name: '자유 질문 규칙',
    description: '플레이어 자유 질문에 대한 NPC 응답 규칙 + JSON 출력 형식',
    category: 'dialogue',
    content: `## 현재 거짓말 상태
{lieStates}
(S0=완강히 부정, S1=동요, S2=일부 인정, S3=책임 전가, S4=감정 호소, S5=인정)

## 쟁점 목록
{disputeList}

{speechGuide}

## 규칙
1. 재판관의 자유 질문에 캐릭터로서 대답하세요.
2. lieState S0~S3이면 절대 진실을 완전히 고백하지 마세요. 회피, 부분 인정, 책임 전가.
3. lieState S4~S5이면 더 솔직하게 답변.
4. 말투와 말버릇을 반영하세요.
5. 답변은 2~3문장. 행동 묘사는 넣지 말고 behaviorHint에 따로 적으세요.

## 출력 형식 (JSON만)
{"questionType":"fact_pursuit|motive_search|empathy_approach|irrelevant","disputeId":"d-1~d-5 중 관련 있는 것, 없으면 null","secondaryDisputeId":"두 번째 쟁점 또는 null","response":"NPC 대사만 (괄호 행동묘사 넣지 마)","behaviorHint":"행동/표정 묘사만 따로"}`,
    variables: '["lieStates","disputeList","speechGuide"]',
  },

  // ── Analysis (진술 분석) ──
  {
    key: 'testimony_analysis_rules',
    name: '진술 분석 규칙',
    description: 'Phase 5 진술 분석 — 대화 기록에서 주장/모순/미해명 추출',
    category: 'analysis',
    content: `법정 심문 게임의 진술 분석관입니다.

쟁점: {disputes}
당사자: {nameA} (A) vs {nameB} (B)

## 지금까지의 대화 기록:
{history}

위 대화를 분석하여 아래 JSON만 출력하세요:
{
  "claimsA": ["{nameA}의 핵심 주장 2~3개 (짧게)"],
  "claimsB": ["{nameB}의 핵심 주장 2~3개 (짧게)"],
  "contradictions": ["A와 B 사이 또는 각자 내부 모순 2~3개 (구체적으로)"],
  "unknowns": ["아직 밝혀지지 않은 점 1~2개"]
}`,
    variables: '["disputes","nameA","nameB","history"]',
  },

  // ── Generation (대사 생성) ──
  {
    key: 'phase1_gen_rules',
    name: 'Phase 1 초기진술 생성',
    description: '사건 시작 시 A/B의 초기 진술 대사를 LLM으로 동적 생성',
    category: 'generation',
    content: `법정 심문 게임. {nameA}({speechStyleA})와 {nameB}({speechStyleB})의 초기 진술.
관계: {relationship}

배경: {context}
쟁점: {disputeList}

{speechGuide}

## 대사 규칙
- A가 먼저 재판관에게 자기 입장 진술(존댓말) → B가 끼어들어 반박(반말) → A가 대응 → 점점 격해짐
- 총 8~10개 대사. A와 B가 번갈아. 시스템(재판관 개입) 1~2개 섞어서.
- 각 대사는 2~3문장으로 완결. 중간에 자르지 마세요.
- (행동 묘사)를 대사 끝에 괄호로.

JSON 배열만 출력.
⚠️ speaker 필드는 반드시 소문자 "a", "b", "system" 중 하나만 사용하세요. 이름을 넣지 마세요.
형식: [{"speaker":"a","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]`,
    variables: '["nameA","speechStyleA","nameB","speechStyleB","relationship","context","disputeList","speechGuide"]',
  },
  {
    key: 'phase2_gen_rules',
    name: 'Phase 2 즉각반박 생성',
    description: '초기 진술 이후 상대방에 대한 즉각 반박 대사를 LLM으로 생성',
    category: 'generation',
    content: `법정 심문 게임의 즉각 반박.
관계: {relationship}

{nameA}({speechStyleA}) vs {nameB}({speechStyleB})

{nameA} 말버릇: {verbalTellsA}
{nameB} 말버릇: {verbalTellsB}

{speechGuide}

## 대사 규칙
- 6~8개 대사. 서로에게 직접 따지는 반박. 감정 격화 + 첫 모순 힌트 1개.
- A가 화제 전환 시도 → B가 잡아당김.
- 마지막에 시스템이 "반박 종료, 심문 시작" 선언.
- 각 대사는 2~3문장. 중간에 자르지 마세요.
- (행동 묘사) 포함. 말버릇 자연스럽게.

JSON 배열만. ⚠️ speaker는 반드시 소문자 "a", "b", "system"만 사용.
[{"speaker":"a","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]
쟁점 id: {disputeListWithNames}`,
    variables: '["nameA","speechStyleA","nameB","speechStyleB","relationship","verbalTellsA","verbalTellsB","speechGuide","disputeListWithNames"]',
  },

  // ── Phase History (이전 스테이지 대화 참조) ──
  {
    key: 'phase_history_context',
    name: '이전 Phase 대화 요약',
    description: 'Phase 1/2에서 양측이 주장한 내용을 Phase 3~5 심문에 참조. 코드에서 {phaseTranscript} 변수로 채움',
    category: 'interrogation',
    content: `## 이전 진술 요약 (Phase 1~2에서 나온 내용)
{phaseTranscript}
⚠️ 위 내용은 이미 공개된 진술입니다. 모순을 만들지 마세요. 새로운 정보를 추가하되, 기존 진술과 일관성을 유지하세요.`,
    variables: '["phaseTranscript"]',
  },
];

const insertBlock = db.prepare(`
  INSERT OR REPLACE INTO ai_prompt_blocks (key, name, description, category, content, variables)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// ═══════════════════════════════════════════
//  2. Agents (5개)
// ═══════════════════════════════════════════

const agents = [
  {
    key: 'interrogation', name: '심문 에이전트',
    description: 'Phase 3~5 심문에서 재판관 질문 + NPC 응답 생성',
    model: null, temperature: 0.85, max_tokens: 250,
    context_flags: JSON.stringify({
      include_knownFacts: true,
      include_disputeInfo: true,
      include_emotionInfo: true,
      include_evidenceInfo: true,
      include_recentDialogue: true,
      include_historyContext: true,
      include_phaseTranscript: true,
      max_recent_dialogues: 5,
      max_known_facts: 4,
    }),
  },
  {
    key: 'free_question', name: '자유 질문 에이전트',
    description: '플레이어 자유 질문에 NPC가 응답',
    model: null, temperature: 0.7, max_tokens: 400,
    context_flags: JSON.stringify({
      include_lieStates: true,
      include_disputeList: true,
      include_speechGuide: true,
    }),
  },
  {
    key: 'testimony_analysis', name: '진술 분석 에이전트',
    description: 'Phase 5 진술 요약/모순 분석',
    model: null, temperature: 0.3, max_tokens: 800,
    context_flags: JSON.stringify({
      include_history: true,
      max_history_entries: 30,
    }),
  },
  {
    key: 'phase1_generator', name: 'Phase 1 대사 생성',
    description: '사건 시작 시 초기 진술 대사 동적 생성',
    model: null, temperature: 0.85, max_tokens: 4000,
    context_flags: JSON.stringify({}),
  },
  {
    key: 'phase2_generator', name: 'Phase 2 대사 생성',
    description: '초기 진술 이후 즉각 반박 대사 생성',
    model: null, temperature: 0.85, max_tokens: 3000,
    context_flags: JSON.stringify({}),
  },
];

const insertAgent = db.prepare(`
  INSERT OR REPLACE INTO ai_agents (key, name, description, model, temperature, max_tokens, context_flags)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// ═══════════════════════════════════════════
//  3. Agent-Block 조합
// ═══════════════════════════════════════════

const agentBlocks = [
  // ── interrogation: 8 블록 (Phase 가이드는 조건부) ──
  { agent: 'interrogation', block: 'character_base',      order: 0 },
  { agent: 'interrogation', block: 'naming_rules',        order: 1 },
  { agent: 'interrogation', block: 'dialogue_rules',      order: 2 },
  { agent: 'interrogation', block: 'phase3_guide',        order: 3, condField: 'phase', condValue: 'Phase3_Interrogation' },
  { agent: 'interrogation', block: 'phase4_guide',        order: 3, condField: 'phase', condValue: 'Phase4_Evidence' },
  { agent: 'interrogation', block: 'phase5_guide',        order: 3, condField: 'phase', condValue: 'Phase5_ReExamination' },
  { agent: 'interrogation', block: 'phase_history_context', order: 3.5, condField: null, condValue: null },
  { agent: 'interrogation', block: 'lie_state_guide',     order: 4 },
  { agent: 'interrogation', block: 'question_type_guide', order: 5 },
  { agent: 'interrogation', block: 'speech_guide_short',  order: 6 },
  { agent: 'interrogation', block: 'output_json_npc',     order: 7 },

  // ── free_question: 3 블록 ──
  { agent: 'free_question', block: 'character_base',        order: 0 },
  { agent: 'free_question', block: 'naming_rules',          order: 1 },
  { agent: 'free_question', block: 'free_question_rules',   order: 2 },

  // ── testimony_analysis: 1 블록 ──
  { agent: 'testimony_analysis', block: 'testimony_analysis_rules', order: 0 },

  // ── phase1_generator: 1 블록 ──
  { agent: 'phase1_generator', block: 'phase1_gen_rules', order: 0 },

  // ── phase2_generator: 1 블록 ──
  { agent: 'phase2_generator', block: 'phase2_gen_rules', order: 0 },
];

const insertAgentBlock = db.prepare(`
  INSERT OR REPLACE INTO ai_agent_blocks (agent_key, block_key, sort_order, condition_field, condition_value)
  VALUES (?, ?, ?, ?, ?)
`);

// ═══════════════════════════════════════════
//  4. Data Fields (세션 데이터 레지스트리)
// ═══════════════════════════════════════════

const dataFields = [
  // character
  { key: 'name',           name: 'NPC 이름',       source: 'character', type: 'string', example: '한지석' },
  { key: 'age',            name: 'NPC 나이',       source: 'character', type: 'number', example: '35' },
  { key: 'opponent',       name: '상대방 이름',    source: 'character', type: 'string', example: '오세린' },
  { key: 'speechStyle',    name: '말투 스타일',    source: 'character', type: 'text',   example: '"정확히"를 자주 쓰며...' },
  { key: 'archetype',      name: '성격 유형',      source: 'character', type: 'string', example: 'avoidant' },
  { key: 'occupation',     name: '직업',           source: 'character', type: 'string', example: '회사원' },
  { key: 'verbalTells',    name: '말버릇',         source: 'character', type: 'text',   example: 'lying일 때: "정확히 말하면..."' },
  // case
  { key: 'relationship',   name: '관계 유형',      source: 'case',      type: 'string', example: '부부' },
  { key: 'context',        name: '사건 배경',      source: 'case',      type: 'text',   example: '공동통장에서...' },
  { key: 'disputeList',    name: '쟁점 목록',      source: 'case',      type: 'text',   example: 'd-1: 무단 인출, d-2: ...' },
  { key: 'disputeName',    name: '현재 쟁점명',    source: 'case',      type: 'string', example: '100만원 사전 상의 약속 위반' },
  // computed (코드에서 조립)
  { key: 'callForm',       name: '상대 호칭',         source: 'computed', type: 'string', example: '자기야' },
  { key: 'judgeRef',       name: '재판관에게 상대언급', source: 'computed', type: 'string', example: '제 남편' },
  { key: 'angryCall',      name: '감정폭발 호칭',     source: 'computed', type: 'string', example: '한지석!' },
  { key: 'formalityGuide', name: '경어 가이드',        source: 'computed', type: 'string', example: '- 상대에게: 반말 (~야, ~잖아)' },
  { key: 'speechGuideShort', name: '말투 가이드(짧은)', source: 'computed', type: 'string', example: '반말, 재판관에게 존댓말' },
  // agent_state
  { key: 'knownFacts',     name: '아는 사실 목록',    source: 'agent_state', type: 'text', example: '- 아내가 150만원을 돌려보냈다' },
  { key: 'disputeInfo',    name: '쟁점+거짓말 상태',  source: 'agent_state', type: 'text', example: '## 현재 쟁점: "..."\\n상태: S1' },
  { key: 'emotionInfo',    name: '감정+말버릇',       source: 'agent_state', type: 'text', example: '현재 감정: defensive' },
  { key: 'lieStates',      name: '전체 거짓말 상태',  source: 'agent_state', type: 'text', example: 'd-1(무단인출): S1, d-2: S0' },
  // session
  { key: 'evidenceInfo',    name: '제시된 증거',      source: 'session', type: 'text', example: '- 통장 내역: 280만원 송금' },
  { key: 'recentDialogue',  name: '최근 대화',        source: 'session', type: 'text', example: '재판관: "설명해주세요"' },
  { key: 'historyContext',  name: '심문 이력 컨텍스트', source: 'session', type: 'text', example: '⚠️ 첫 번째 질문이다' },
  { key: 'history',         name: '전체 대화 기록',    source: 'session', type: 'text', example: '(진술 분석용 30개 대화)' },
  { key: 'phaseTranscript', name: 'Phase 1/2 진술 요약', source: 'session', type: 'text', example: 'A: "300만원은 추석 비용" / B: "그건 외도 자금"' },
];

const insertDataField = db.prepare(`
  INSERT OR REPLACE INTO ai_data_fields (key, name, description, source, data_type, example)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// ── 실행 ──

const seedTx = db.transaction(() => {
  // 기존 조합 데이터 정리 (중복 방지)
  db.prepare('DELETE FROM ai_agent_blocks').run();

  for (const b of blocks) {
    insertBlock.run(b.key, b.name, b.description, b.category, b.content, b.variables);
  }
  for (const a of agents) {
    insertAgent.run(a.key, a.name, a.description, a.model, a.temperature, a.max_tokens, a.context_flags ?? '{}');
  }
  for (const ab of agentBlocks) {
    insertAgentBlock.run(ab.agent, ab.block, ab.order, ab.condField ?? null, ab.condValue ?? null);
  }
  for (const df of dataFields) {
    insertDataField.run(df.key, df.name, df.description ?? null, df.source, df.type, df.example);
  }
});

seedTx();
closeDB();
console.log(`Seed complete: ${blocks.length} blocks, ${agents.length} agents, ${agentBlocks.length} compositions, ${dataFields.length} data fields`);
