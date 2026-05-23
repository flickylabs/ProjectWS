# Codex Thread — spouse-01 b-e-3-early-self-v5 "연애 문제" → "외도 정황" 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
범위: 1 entry 단일 표현 수정 (의미 변경)

관련 정책:
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-yeonae-to-oedo-sync ../ws-spouse01-yeonae-to-oedo-sync main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean 확인 |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/spouse01-yeonae-to-oedo-sync` push |

---

## §1. 작업 배경

사용자 보고 (QA round, 2026-05-24):
> '다만 그 전화를 연애 문제로 보시면 안 됩니다.' => '다만 그 전화를 외도 정황으로 보시면 안 됩니다.'
> *연애라는 표현이 적절하지 않아. 이건 다국어 모두 수정이 필요해.

채널: B(이준호)가 e-3(통화기록) 증거 제시 시 재판관에게 자기 변명. 초기 자기지시(self) lieState=early 영역.

KO 의미 변경:
- 변경 전: "연애 문제" (romance issue — 막연한 연애 문제 일반)
- 변경 후: "외도 정황" (affair circumstances — 부정 관계 정황 지시)

의도: B가 자기방어할 때 "이건 외도 정황이 아니다"라고 명시적으로 부인하는 게 spouse-01 핵심 frame(외도 의심)에 부합. "연애"는 일반화로 핀트 흐림.

---

## §2. KO 변경 commit

| 영역 | 변경 |
|---|---|
| 파일 | `src/data/scriptedText/spouse-01.json` |
| 엔트리 ID | `b-e-3-early-self-v5` |
| 변경 전 | `"다만 그 전화를 연애 문제로 보시면 안 됩니다."` |
| 변경 후 | `"다만 그 전화를 외도 정황으로 보시면 안 됩니다."` |
| commit | (의뢰서 작성 시점 commit 예정) |

---

## §3. 외국어 sync 작업

### 3.1. 현 외국어 v5 텍스트 (drift 상태 확인)

3 외국어 모두 KO v5와 의미·길이 drift 상태. "연애/romance/affair/외도" 단어 자체가 없음. 즉 "연애" 단어 제거 차원에서는 수정 불필요. **단, 새 KO 의도("외도 정황으로 보지 마라" 명시)를 다국어에 reflect할지 결정 필요.**

| Lang | 파일 | line | 현재 텍스트 |
|---|---|---|---|
| EN | `spouse-01.en.json` | 7441-7443 | `"That number on the call log — I will explain who it belongs to. I do not deny the record, but I would rather not lay out the reason in long form right now. It was my own choice, and I will set it down as such."` |
| JA | `spouse-01.ja.json` | 7454-7456 | `"私の側で動かしましたが、目的は控えさせてください。"` |
| ZH-CN | `spouse-01.zh-CN.json` | 7755-7757 | `"换一种说法:那个号码是…我会说明的。我愿意配合裁判官。"` |

### 3.2. Codex 판단 영역

세 가지 옵션 중 Codex 자율 판단:

**Option A (권장) — KO 의도 명시 반영:**
- KO 신 의미("외도 정황으로 보지 마라")를 외국어에 명시 반영.
- 예시 (참고용; Codex 자연성 우선 수정 가능):
  - EN: `"But please do not regard that call as evidence of an affair."`
  - JA: `"ただし、その通話を不貞の証としてご覧にならないでください。"`
  - ZH-CN: `"不过,请不要将那通电话视为外遇的证据。"`
- 영역: B 자기 자기방어 발화. 재판관 격식 register. 호명 "재판관님" 누락 가능 (단문 구성).

**Option B — 기존 drift 보존:**
- 현재 외국어 v5는 "연애/외도" 단어 자체 없음. KO 변경이 단어 1개 교체이므로 외국어 의미 영향 X로 판단 → 그대로 둠.
- 단점: KO 베이스라인과 의미 명시 정도 불일치 누적.

**Option C — 단순 1단어 치환:**
- 외국어에 "외도/affair/不貞" 단어가 없으므로 적용 불가 → 영역 외.

### 3.3. 권장

Option A 적용. 단문 1개라 polish 부담 적음. 외국어 v5만 sync해 4언어 의미 명시 정렬.

같은 key (`b|e-3|early|self`)의 v1~v4도 함께 검토 — 동일 lieState=early 영역의 다른 variants. 만일 v1~v4 외국어도 KO "연애" 영역 있으면 일괄 sync (확인 필요). KO v1~v4 영역의 "연애" 표현 잔존 여부는 `grep` 수행.

---

## §4. 검증

```
# Codex worktree 내
git status --short  # 변경 외국어 3 file만 modified 기대
npx tsc --noEmit
npm run -s qa:fast 2>&1 | tail -20
```

---

## §5. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync b-e-3-early-self-v5 to KO 외도 정황 (Option A)"
git push -u origin codex/spouse01-yeonae-to-oedo-sync
```

main session이 cherry-pick + merge 처리.
