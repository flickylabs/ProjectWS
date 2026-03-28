/**
 * AI Prompt Manager — DB에서 프롬프트를 가져와 실시간 적용
 *
 * 핵심 기능:
 * 1. 서버에서 프롬프트를 로드하고 로컬 캐시에 저장
 * 2. 변수를 치환하여 최종 프롬프트 생성
 * 3. 서버 연결 실패 시 기본 프롬프트로 폴백
 * 4. 주기적 갱신 (폴링)으로 관리자 변경사항 실시간 반영
 * 5. 프롬프트별 temperature/maxTokens 설정 제공
 */

import { promptApi, type PromptMap, type PromptEntry } from './client';

// 기본 프롬프트 (서버 미연결 시 폴백)
const DEFAULT_PROMPTS: PromptMap = {
  interrogation_system: {
    content: `당신은 한국 법정 갈등 시뮬레이션 게임의 NPC "{name}"({age}세)입니다.
상대: {opponent}. 관계: {relationship}
배경: {context}

## 말투
{speechStyle}

## 호칭 (가장 중요)
- 상대를 부를 때: "{callForm}" (호칭은 3문장 중 1번만. 매번 넣지 마.)
- 재판관에게 상대 언급: "{judgeRef}"
- 감정 폭발: "{angryCall}"
{formalityGuide}
- 재판관에게: 항상 존댓말 ("재판관님, ~입니다")

## 대화 규칙 (반드시 지켜)
1. 한 답변에 재판관에게 1문장 + 상대에게 1문장을 섞어라.
2. 같은 말을 반복하지 마. 이전 대화에서 안 한 새로운 내용을 꺼내.
3. 자기에게 불리한 사실을 먼저 꺼내지 마.
4. 2~3문장. 짧은 문장 1개 + 긴 문장 1개로 리듬감.

{phaseGuide}
{knownFacts}
{disputeInfo}
{emotionInfo}
{evidenceInfo}
{recentDialogue}
{historyContext}

## 질문 유형
- 사실 추궁 → 구체적 사실로 답하거나 방어
- 동기 탐색 → 당시 상황+감정 배경을 설명
- 공감 접근 → 경계를 낮추고 솔직하게

{speechGuideShort}
{outputFormat}`,
    variables: [],
    version: 0,
    updatedAt: '',
    temperature: 0.85,
    maxTokens: 250,
  },
  interrogation_output: {
    content: `## 출력 (JSON만)
{"judgeQuestion":"재판관 질문","npcResponse":"NPC 대사","behaviorHint":"행동묘사"}

judgeQuestion 규칙:
- 반드시 "{disputeName}"을 직접 언급하세요.
- 빈 문자열 금지. 반드시 쟁점명이 포함된 질문을 만드세요.

npcResponse 규칙:
- 반드시 2문장 이상 답변. 빈 문자열/한 글자 금지.

금지: npcResponse에 괄호 행동묘사 넣기, judgeQuestion 빈 문자열, 같은 패턴 반복`,
    variables: [],
    version: 0,
    updatedAt: '',
    temperature: null,
    maxTokens: null,
  },
  interrogation_phase3: {
    content: `## 현재 단계: 심문 (초기)
- 경계심이 높습니다. 준비된 답변 위주로 대응하세요.
- 핵심 비밀은 절대 드러내지 마세요. 표면적인 사실만 언급.`,
    variables: [], version: 0, updatedAt: '', temperature: null, maxTokens: null,
  },
  interrogation_phase4: {
    content: `## 현재 단계: 증거 심리 (중반)
- 증거가 제시된 상태. 무조건 부정하면 불리합니다.
- 새로운 정보를 하나씩 흘리세요.`,
    variables: [], version: 0, updatedAt: '', temperature: null, maxTokens: null,
  },
  interrogation_phase5: {
    content: `## 현재 단계: 최종 심문 (후반)
- 방어가 느슨해졌습니다. 깊은 속내를 드러내세요.
- 고백이 자연스럽게 나올 수 있습니다.`,
    variables: [], version: 0, updatedAt: '', temperature: null, maxTokens: null,
  },
  free_question: {
    content: `당신은 법정 심문 게임의 NPC "{name}"입니다.
캐릭터에 맞게 2~3문장으로 답변하세요.
JSON 출력: {"questionType":"...","disputeId":"...","response":"...","behaviorHint":"..."}`,
    variables: [], version: 0, updatedAt: '', temperature: 0.7, maxTokens: 400,
  },
  testimony_analysis: {
    content: `법정 심문 게임의 진술 분석관입니다.
대화를 분석하여 JSON으로 출력하세요.`,
    variables: [], version: 0, updatedAt: '', temperature: 0.3, maxTokens: 800,
  },
  phase1_generation: {
    content: `초기 진술을 생성하세요. JSON 배열로 출력.`,
    variables: [], version: 0, updatedAt: '', temperature: 0.85, maxTokens: 4000,
  },
  phase2_generation: {
    content: `즉각 반박 대사를 생성하세요. JSON 배열로 출력.`,
    variables: [], version: 0, updatedAt: '', temperature: 0.85, maxTokens: 3000,
  },
};

let promptCache: PromptMap = { ...DEFAULT_PROMPTS };
let lastFetchTime = 0;
let fetchPromise: Promise<void> | null = null;
const CACHE_TTL = 60_000; // 1분 캐시

/**
 * 서버에서 프롬프트를 로드 (캐시 TTL 기반)
 */
export async function loadPrompts(force = false): Promise<void> {
  const now = Date.now();
  if (!force && now - lastFetchTime < CACHE_TTL) return;

  // 중복 요청 방지
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const { prompts } = await promptApi.getAll();
      promptCache = { ...DEFAULT_PROMPTS, ...prompts };
      lastFetchTime = Date.now();
    } catch {
      // 서버 미연결 시 기본 프롬프트 유지
      console.warn('[PromptManager] Server unavailable, using cached/default prompts');
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * 프롬프트 조회 (변수 치환 적용)
 */
export function getPrompt(key: string, variables: Record<string, string> = {}): string {
  const entry = promptCache[key];
  if (!entry) {
    console.warn(`[PromptManager] Unknown prompt key: ${key}`);
    return '';
  }

  let result = entry.content;
  for (const [k, v] of Object.entries(variables)) {
    result = result.replaceAll(`{${k}}`, v);
  }
  return result;
}

/**
 * 프롬프트 원본 조회 (치환 없이)
 */
export function getRawPrompt(key: string): PromptEntry | null {
  return promptCache[key] || null;
}

/**
 * 프롬프트의 LLM 설정 조회 (temperature, maxTokens)
 */
export function getPromptConfig(key: string): { temperature: number; maxTokens: number } {
  const entry = promptCache[key];
  return {
    temperature: entry?.temperature ?? 0.8,
    maxTokens: entry?.maxTokens ?? 300,
  };
}

/**
 * 현재 캐시된 모든 프롬프트 키 목록
 */
export function getPromptKeys(): string[] {
  return Object.keys(promptCache);
}

/**
 * 주기적 갱신 시작 (60초 간격)
 */
let pollTimer: ReturnType<typeof setInterval> | null = null;

export function startPromptPolling(interval = 60_000): void {
  if (pollTimer) return;
  pollTimer = setInterval(() => loadPrompts(true), interval);
}

export function stopPromptPolling(): void {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}
