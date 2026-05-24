# Codex Thread — friend-01 Cycle 7 Line A+B 4 batch 다국어 sync

## Cycle 7 개요

GPT Pro KO 시안 (Cycle 7 4 batch) 적용 후, EN/JA/ZH-CN 다국어 sync 작업. Line A (낙인 시작 frame) + Line B (예비신랑 reframe) 5 emergence × multi-trigger narrative entry × 3 lang.

### Batch 분할 (GPT Pro batch와 동일 단위)

| Batch | 폴더 | KO entry 수 (예상) | 다국어 sync (×3 lang) |
|---|---|---|---|
| 1 | [batch1-dc1/](batch1-dc1/) | 13 | 39 |
| 2 | [batch2-dc2-e4/](batch2-dc2-e4/) | 25 | 75 |
| 3 | [batch3-w1/](batch3-w1/) | 13 | 39 |
| 4 | [batch4-w2/](batch4-w2/) | 13 | 39 |
| **합계** | | **~64** | **~192** |

⚠ **entry id list는 사전 미확정** — 본 폴더는 form skeleton. GPT 응답 도착 + 5단계 검토 + 6단계 KO apply 후 메인 Claude 세션이 각 batch sync 의뢰서의 §2 (KO baseline entry table) 채워서 사용자에게 전달.

## 본 cycle 신규 변경 (다국어 영역)

### 변경 1: dc-1 label 다국어 일괄 변경 (Authority KO 이미 commit)

dc-1 label "확인 없이 매도한 건 누구인가" → **"단톡방 글의 근거"**

| 영역 | KO (변경 후) | EN (변경 후 예시) | JA (변경 후 예시) | ZH-CN (변경 후 예시) |
|---|---|---|---|---|
| dossier label (단서) | 단톡방 글의 근거 | Grounds for the Group Chat Post | グループチャット投稿の根拠 | 群聊帖子的依据 |

⚠ 위 다국어 label은 baseline 제안. Batch 1 Codex 작업 시 ScriptedText `dossier` channel 등 기존 영역과 일관성 검토 + 4 lang 모두 일괄 변경.

영향 file (Cycle 7 사후 통합 시점):
- `src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` dossier channel
- `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dossierCards 영역 (label 영역, KO baseline은 derive script 자동 갱신됨)

### 변경 2: 사건 카드 → 단서 명칭 (player-visible text 영역만)

`feedback_dossier_card_renamed_to_clue.md` 정책 — KO + 4 lang 모두 적용:
- KO: 사건 카드 → 단서
- EN: case card / dossier card → clue
- JA: 事件カード → 手がかり
- ZH-CN: 案件卡 → 线索

⚠ **evidence와 layer 구분 절대 유지**:
- evidence = 증거 / evidence / 証拠 / 证据 (raw artifact)
- clue = 단서 / clue / 手がかり / 线索 (derived note from evidence combination)

본 batch는 friend-01 영역만 변경 — spouse-01 / family-01 cross-case sweep는 본 cycle 영역 X (다른 cycle 세션에서 일괄 처리됨).

### 변경 3: `cascade_from_card` trigger 다국어 보존

본 cycle은 cycle 2 신규 trigger `cascade_from_card`도 4종 사용:
- dc-2 cascade: `priorCard:dc-1`
- e-4 cascade: `priorCard:dc-1`
- w-1 cascade: `priorCard:dc-1`
- w-2 cascade: `priorCard:dc-2`

다국어 번역 시:
- `priorCard:<id>` tag → 그대로 (시스템 lookup, 번역 X)
- text 본문의 이전 단서 reference (예: "앞서 [단톡방 글의 근거]가 등재됐습니다…") → 단서명 자체도 4 lang 모두 일관 번역
  - 단서명 번역 baseline은 ScriptedText의 dossier channel 또는 cases/generated 영역 참조 (KO baseline 단서명과 일관)

## Codex 사용 절차

1. 각 batch 폴더를 worktree에 통째 업로드 (또는 worktree spawn 후 폴더 통째 복사)
2. batch 폴더의 `README.md` 절차대로 진행
3. branch push 후 메인 Claude 세션에 보고
4. **4 worktree 병렬 진행 권장** (각 batch는 독립 ScriptedText entry id, 충돌 X)

## 메인 session 후속

4 batch Codex push 모두 도착 시:
1. `git fetch origin`
2. 4 branch (`codex/friend01-cycle7-batch{1..4}-multilang`) 일괄 확인
3. fast-forward merge 또는 JSON union script (배열 영역 충돌 회피 — cycle 2 시점 사고 reference)
4. derive script 실행 (`npx tsx scripts/build-core-case.mjs --case friend-01 --write`)
5. tsc + build + qa:fast PASS
6. Cycle 7 완료 보고 + Cycle 8 (Line C 아버지 line) 진입 안내

## 폴더 정책

self-contained — 외부 참조 X. 권위: `feedback_external_brief_self_contained_folder`

## 5단계 검토 후 fill-in 항목

각 batch `codex-multilang-sync.md` §2 KO baseline entry table은 GPT 응답 도착 + 메인 세션 5단계 검토 + 6단계 KO apply 후 채움. 그때까지는 entry 수만 명시된 skeleton.
