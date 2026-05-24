# Codex Thread — spouse-01 자금 흐름 line 4 batch 다국어 sync (Cycle 2)

## Cycle 2 개요

GPT Pro KO 시안 (Cycle 2 4 batch) 적용 후, EN/JA/ZH-CN 다국어 sync 작업. 자금 흐름 line 8 emergence × multi-trigger narrative entry × 3 lang.

### Batch 분할 (GPT Pro batch와 동일 단위)

| Batch | 폴더 | KO entry 수 | 다국어 sync (×3 lang) |
|---|---|---|---|
| 1 | [batch1-dc3-e7/](batch1-dc3-e7/) | 25 | 75 |
| 2 | [batch2-dc7-e6/](batch2-dc7-e6/) | 25 | 75 |
| 3 | [batch3-dc4-w3/](batch3-dc4-w3/) | 25 | 75 |
| 4 | [batch4-hd3-w2/](batch4-hd3-w2/) | 22 | 66 |
| **합계** | | **97** | **291** |

⚠ **entry id list는 사전 미확정** — 본 폴더는 form skeleton. GPT 응답 도착 후 메인 Claude 세션이 각 batch sync 의뢰서의 §2 (KO baseline entry table) 채워서 사용자에게 전달.

## 신규 정책: `cascade_from_card` trigger의 다국어 보존

본 cycle에서 신규 trigger 타입 도입. 각 batch의 §3 다국어 번역 원칙에 다음 명시:

- `priorCard:<id>` tag 그대로 유지 (시스템 lookup용, 번역 X)
- text 본문의 이전 카드 reference (예: "앞서 등재된 [정기 자금 이동의 흔적]…")는 카드명 자체도 4 lang 모두 일관 번역
  - KO: `[정기 자금 이동의 흔적]`
  - EN: `[Regular Movement of Funds]`
  - JA: `[定期的な資金移動の痕跡]`
  - ZH-CN: `[资金定期流动的痕迹]`
- 카드명 번역 baseline은 ScriptedText의 dossierCard label 영역 (기존 spouse-01.{lang}.json) 참조

## Codex 사용 절차

1. 각 batch 폴더를 worktree에 통째 업로드 (또는 worktree spawn 후 폴더 통째 복사)
2. batch 폴더의 `README.md` 절차대로 진행
3. branch push 후 메인 Claude 세션에 보고
4. **4 worktree 병렬 진행 권장** (각 batch는 독립 ScriptedText entry id, 충돌 X)

## 메인 session 후속

4 batch Codex push 모두 도착 시:
1. `git fetch origin`
2. 4 branch (`codex/spouse01-cycle2-batch{1..4}-multilang`) 일괄 확인
3. fast-forward merge (또는 cherry-pick) 4회
4. tsc + build PASS 확인
5. Cycle 2 완료 보고 + Cycle 3 옵션 안내

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
