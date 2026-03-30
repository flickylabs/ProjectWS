/**
 * Solomon API Client — Backend 서버와 통신
 * 개발: Vite 프록시 → localhost:3001
 * 프로덕션: 동일 도메인 또는 환경변수로 지정
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const opts: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path}: ${res.status} ${text}`);
  }
  return res.json();
}

// ── Notices ──
export interface Notice {
  id: number;
  title: string;
  content: string;
  type: 'info' | 'event' | 'update' | 'maintenance';
  priority: number;
  is_pinned: number;
  is_active?: number;
  created_at: string;
  updated_at: string;
}

export const noticeApi = {
  list: () => request<Notice[]>('/notices'),
};

// ── Mail ──
export interface Mail {
  id: number;
  title: string;
  content: string;
  sender: string;
  reward_type: string | null;
  reward_amount: number;
  reward_data: string | null;
  created_at: string;
  expires_at: string | null;
  is_read: number;
  reward_claimed: number;
  read_at: string | null;
}

export interface MailReward {
  type: string;
  amount: number;
  data: unknown;
}

export const mailApi = {
  getPlayerMail: (playerId: string) => request<Mail[]>(`/mail/player/${playerId}`),
  markRead: (mailId: number, playerId: string) =>
    request<{ ok: boolean }>('/mail/read', 'POST', { mail_id: mailId, player_id: playerId }),
  claimReward: (mailId: number, playerId: string) =>
    request<{ ok: boolean; reward: MailReward }>('/mail/claim', 'POST', { mail_id: mailId, player_id: playerId }),
  unreadCount: (playerId: string) =>
    request<{ count: number }>(`/mail/unread-count/${playerId}`),
};

// ── AI Prompts ──
export interface PromptEntry {
  content: string;
  variables: string[];
  version: number;
  updatedAt: string;
  temperature: number | null;
  maxTokens: number | null;
}

export interface PromptMap {
  [key: string]: PromptEntry;
}

export const promptApi = {
  getAll: () => request<{ prompts: PromptMap; list: unknown[] }>('/ai-prompts'),
};

// ── AI Agents (Block-based) ──
export interface AgentBlockComposition {
  block_key: string;
  sort_order: number;
  condition_field: string | null;
  condition_value: string | null;
}

export interface AgentConfig {
  key: string;
  name: string;
  description: string;
  model: string | null;
  temperature: number | null;
  max_tokens: number | null;
  is_active: number;
  context_flags?: string;  // JSON string
  blocks: AgentBlockComposition[];
}

export interface PromptBlock {
  key: string;
  name: string;
  description: string;
  category: string;
  content: string;
  variables: string[];
  version: number;
  is_active: number;
}

export const agentApi = {
  getAll: () => request<AgentConfig[]>('/ai-agents'),
  getBlocks: () => request<PromptBlock[]>('/ai-blocks'),
};

// ── Players ──
export const playerApi = {
  sync: (id: string, name: string, region: string) =>
    request<{ ok: boolean }>('/players/sync', 'POST', { id, name, region }),
  saveHistory: (data: {
    player_id: string; case_id: string; score: number;
    insight: number; authority: number; wisdom: number;
    relationship_type?: string; name_a?: string; name_b?: string;
    season_id?: string; titles?: string[];
  }) => request<{ id: number }>('/players/history', 'POST', data),
};

// ── Health ──
export const healthApi = {
  check: () => request<{ status: string; timestamp: string }>('/health'),
};
