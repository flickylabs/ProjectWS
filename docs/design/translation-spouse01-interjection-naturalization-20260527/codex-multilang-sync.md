# Codex Thread — spouse-01 interjection 채널 35 entries 다국어 sync

작성일: 2026-05-23 (게임 내 2026-05-27 cycle)
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-interjection-sync ../ws-spouse01-interjection-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-interjection-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `interjection` channel **35 unique entries polish** (commit on main: `c0dabb70`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- **interjection** — NPC가 재판 중 격앙된 상태로 외치거나 차분한 진술로 끼어드는 발화
- **35 unique entries** (동형 X) — 1:1 ID 매핑
- party=A (박지연, 22 entries) + party=B (이준호, 13 entries)
- minor (차분 끼어듦) + major (격앙 외침) 톤 혼합

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `c0dabb70`)
- evidence_present Batch 5 150 entries / judge_evidence_combo 17 entries — 별도 의뢰서

---

## §2. Polish anchor (35 entries)

main commit `c0dabb70`의 git show 결과로 KO diff 확인.

### 2.1. A (박지연) d-1 (외도 의심) 7 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-a-d-1-minor-v2 | minor | 그 정황을 단순한 오해로 정리할 수는 없습니다. 같은 장소, 같은 시간, 같은 번호가 계속 겹쳤습니다. |
| interject-a-d-1-minor-v3 | minor | 제 남편 말씀대로 단순한 일이었다면, 왜 그 정도로 숨겼는지부터 짚어야 합니다. |
| interject-a-d-1-minor-v5 | minor | 숨긴 이유는 그냥 넘어가면 안 됩니다. 그걸 빼면 제가 왜 무너졌는지도 설명되지 않습니다. |
| interject-a-d-1-major-v1 | major | 아니요, 그건 제가 들을 말이 아닙니다! 그렇게 다 숨겨놓고 이제 와서 저만 예민했다고 하면 끝입니까! |
| interject-a-d-1-major-v2 | major | 이준호, 그런 식으로 말하면 안 되잖아! 내가 왜 거기까지 갔는지 당신이 제일 잘 알잖아! |
| interject-a-d-1-major-v4 | major | 아니요, 그렇게 말하면 저는 또 미친 사람 취급만 받습니다! 그때 당신이 숨긴 것부터 말해야죠! |
| interject-a-d-1-major-v9 | major | 이준호! 조용히 있었다고 네 책임이 없어지는 게 아니야. 내가 왜 그렇게 판단했는지도 말해! |

### 2.2. A d-2 (자금/출금) 6 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-a-d-2-minor-v2 | minor | 돈이 움직인 일을 단순히 가족 일로 덮을 수는 없습니다. 설명도 없었습니다. |
| interject-a-d-2-minor-v6 | minor | 가족이라는 말로 배우자를 배제한 결정을 덮을 수는 없습니다. 먼저 있었던 건 그 결정이었습니다. |
| interject-a-d-2-major-v1 | major | 아니, 돈을 그렇게 움직여놓고 왜 저만 몰아세우는 겁니까! 제가 가만히 있었어야 했다는 말입니까! |
| interject-a-d-2-major-v2 | major | 이준호! 그 돈이 어디로 갔는지도 끝까지 숨겨놓고 왜 나만 이상한 사람으로 만들어! |
| interject-a-d-2-major-v7 | major | 그렇게 포장하지 마! 돈이 빠진 걸 내가 나중에야 알았다는 게 제일 문제잖아! |
| interject-a-d-2-major-v8 | major | 아니, 제가 묻지 않았다면 끝까지 말 안 했을 거 아닙니까! |

### 2.3. A h-d3 (공동 적금 해지 경위) 4 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-a-h-d3-minor-v2 | minor | 그 말은 너무 세게 들립니다. 저는 집을 지키려 했고, 절차가 그만큼 무거운 일이라는 건 외면했습니다. |
| interject-a-h-d3-major-v1 | major | 재판관님, 저는 그렇게 하려던 게 아닙니다! 제 남편이 먼저 저를 벼랑 끝으로 몰았습니다! |
| interject-a-h-d3-major-v5 | major | 그만 그렇게 말해! 내가 혼자 악착같이 꾸민 사람처럼 몰지 마! |
| interject-a-h-d3-major-v10 | major | 이준호! 당신이 먼저 가정을 놓았다고 생각했으니까 내가 그렇게 무너진 거야! |

### 2.4. A h-d4 (다중 조합) 5 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-a-h-d4-minor-v3 | minor | 그 판단은 조심스럽습니다. 숨김과 감시, 실행을 한데 묶으면 안 됩니다. |
| interject-a-h-d4-minor-v7 | minor | 그런 식으로 정리하면 제가 처음부터 모든 일을 시작한 사람처럼 됩니다. 그건 아닙니다. |
| interject-a-h-d4-major-v2 | major | 이준호! 당신이 입을 닫지 않았으면 내가 그 밤에 그런 판단을 했겠어? |
| interject-a-h-d4-major-v3 | major | 아니요, 그 순서는 그렇게 간단하지 않습니다! 숨긴 일과 실행한 일을 한데 묶으면 안 됩니다! |
| interject-a-h-d4-major-v5 | major | 그렇게 말하지 마! 당신이 먼저 가족 일과 돈 문제를 숨긴 건 사실이잖아! |

### 2.5. B (이준호) d-1 6 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-b-d-1-minor-v1 | minor | 잠깐만요, 재판관님. 제 아내는 결과만 붙들고 말씀하고 있습니다. 그 방문만으로 그렇게까지 단정하실 일은 아닙니다. |
| interject-b-d-1-minor-v2 | minor | 그 말씀은 사실과 다릅니다. 제 아내가 본 건 일부일 뿐이고, 왜 그랬는지는 빠져 있습니다. |
| interject-b-d-1-minor-v5 | minor | 그 점은 정정하고 싶습니다. 방문이 있었다고 해서 바로 외도였다는 뜻은 아닙니다. |
| interject-b-d-1-major-v2 | major | 박지연! 끝까지 듣지도 않고 그렇게 단정하면 어떡해! |
| interject-b-d-1-major-v5 | major | 박지연! 끝까지 듣지도 않고 그렇게 몰아붙이면 내가 어떻게 말을 해! |
| interject-b-d-1-major-v7 | major | 그렇게 말하면 안 됩니다! 제가 왜 그곳에 갔는지를 아예 지워버리는 말입니다! |

### 2.6. B d-2 2 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-b-d-2-minor-v5 | minor | 제 아내 말에는 제가 왜 돈을 움직였는지가 빠져 있습니다. 그 이유를 설명해야 합니다. |
| interject-b-d-2-major-v2 | major | 박지연! 당신도 그 돈 얘기만 붙들지 말고, 왜 그렇게 판단했는지도 같이 말해야 해! |

### 2.7. B h-d3 4 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-b-h-d3-minor-v2 | minor | 그 점은 정리해 두고 싶습니다. 이상한 낌새를 보고도 확인하지 않은 건 제 책임입니다. |
| interject-b-h-d3-minor-v9 | minor | 아내의 선택과 제 침묵은 나눠 봐야 합니다. 둘 다 잘못이지만 같은 일은 아닙니다. |
| interject-b-h-d3-major-v2 | major | 박지연! 내 이름이 들어간 서류를 그렇게 냈으면 말했어야 했잖아! |
| interject-b-h-d3-major-v8 | major | 아니, 그 적금이 그렇게 빠져나간 걸 알고 제가 얼마나 무너졌는지 아십니까! |

### 2.8. B h-d4 1 entry

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| interject-b-h-d4-minor-v2 | minor | 그 점은 따로 봐야 합니다. 숨기기 시작한 일과 서류 처리는 같은 질문이 아닙니다. |

---

## §3. 다국어 번역 원칙

### 3.1. interjection 채널 특이성

NPC가 재판 진행 중 끼어드는 발화 — 청자 (상대 NPC 또는 재판관) 외 자기 변호 외침/항의.

본 batch 두 톤 분리:
- **minor (차분)**: NPC가 진술을 정정·보완·정리. 격앙 X. 추궁 부드러움. (예: "그 점은 정리해 두고 싶습니다.")
- **major (격앙)**: NPC가 외침·항의. 호명·강조 부사·반복 어휘. 격앙 톤 보존 필수. (예: "이준호! 그 돈이 어디로 갔는지도 끝까지 숨겨놓고…")

### 3.2. 호명 보존 (★ 본 batch 핵심)

| KO 호명 | EN | JA | ZH-CN |
|---------|----|----|-------|
| "이준호!" (격앙 외침) | "Lee Junho!" | "イ・ジュノ!" | "李俊浩!" |
| "박지연!" (격앙 외침) | "Park Jiyeon!" | "パク・チヨン!" | "朴智妍!" |
| "재판관님" (격앙·차분 모두) | "Your Honor" | "裁判官様" / "裁判官" | "审判官" |
| "제 남편" (B 지칭) | "my husband" | "夫" | "我丈夫" |
| "제 아내" (A 지칭) | "my wife" | "妻" | "我妻子" |

격앙 외침의 호명 + 느낌표는 보존. JA에서 "!" 사용은 자연스러운 영역에 한해 보존 또는 "!" 생략 대신 어조 강화 ("…じゃないか!" 등).

### 3.3. 격앙 톤 표현 보존

| KO 격앙 | EN | JA | ZH-CN |
|---------|----|----|-------|
| "그렇게" (강조) | "like that / so" 강조 | "そんなふうに / そんな" | "那样 / 那么" |
| "끝까지" (추궁) | "to the very end / all this time" | "最後まで / ずっと" | "到最后 / 一直" |
| "아니요!" / "아니!" | "No!" 강조 | "違います! / 違う!" | "不! / 不是!" |
| "그만 그렇게 말해!" | "Stop saying it that way!" | "そんなふうに言わないで!" | "别那样说了!" |
| "끝입니까!" | "Is that the end of it?!" | "それで終わりですか!" | "就这样结束吗!" |

### 3.4. 차분 톤 (minor) 자연화

| KO minor 영역 | KO 자연화 | 권장 다국어 |
|---------------|-----------|--------------|
| "그 부분" → 구체화 | "그 정황 / 그 말 / 그 판단 / 그 점" | 구체적 referent 명시 (EN "that situation / that statement / that judgment / that point") |
| 추궁 부드럽게 | "...부터 짚어야 합니다" | "...needs to be addressed first" / "...から確認すべきです" / "...需要先弄清楚" |
| 정정 어미 | "그 점은 정정하고 싶습니다" | "I'd like to correct that point" / "その点は訂正したいです" / "我想纠正那一点" |

### 3.5. 진실 누설 회피

본 batch는 모두 dispute 진행 중 발화. **hidden keyword (가족/형/회생/사기/조작/위법 등) 신규 도입 X**.

KO에서 등장하는 표현 중 유지 영역:
- "가족 일" (a-d-2-minor-v2): 박지연의 의심 frame 표현. 보존. EN "family matter" / JA "家族の事情" / ZH-CN "家事".
- "외도" (b-d-1-minor-v5): B 발화에서 박지연 가설 인용. 보존.

### 3.6. 자연화 톤 보존

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 무생물 주어 회피 | "이상한 낌새를 보고도 확인하지 않은 건 제 책임" | NPC 능동 발화로 / EN "I'm responsible for not checking when I noticed something off" |
| 직접 항의 톤 | "왜 나만 이상한 사람으로 만들어!" | "Why are you making me out to be the strange one!" / "なんで私だけ変な人扱いするの!" / "为什么把我说得像怪人!" |
| 추상명사 정리 | "그 부분" → "그 정황 / 그 말씀 / 그 이유" | 구체 referent 다국어 적용 |

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~58,936 — 회귀 X 확인)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/spouse01-interjection-sync` push
- main session에서 cherry-pick 후 cleanup
