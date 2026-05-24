# Codex Thread — spouse-01 emerge-e-5 narrative 17 entry 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역)
범위: 신규 channel `emergence_narrative` 의 첫 entry — emerge-e-5 (17 variants) × 3 lang = **51 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-emerge-e5-multilang ../ws-spouse01-emerge-e5-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/spouse01-emerge-e5-multilang` push |

---

## §1. 작업 배경

Core System narrative wrapper layer Cycle 1 sample.

- KO commit: main branch에 17 entry (`src/data/scriptedText/spouse-01.json` channels.emergence_narrative.entries[0]) 적용 완료
- 본 작업: EN/JA/ZH-CN sync 17 entry × 3 lang = 51 entry 작성

Brief: `docs/design/core-narrative-cycle1-spouse01-e5-emergence-20260524/` 정독 필수 (특히 gpt-pro-brief.md + spouse01-tone-samples.md).

---

## §2. KO baseline (main HEAD)

### 영향 파일

```
src/data/scriptedText/spouse-01.json  channels.emergence_narrative
```

`emergence_narrative` 채널은 **신규**. 외국어 파일에 본 채널 자체가 없음. 신규 channel object를 생성해 추가.

### 17 entry 구조 (한 entry 내 variants 배열, sequence 의미)

| Trigger | # | ID | speaker→listener | 핵심 KO |
|---|---|---|---|---|
| 1 (NPC interjection) | 1 | emerge-e5-via-a-interject-v1 | A→판사 | "재판관님. 오피스텔만 문제가 아닙니다. 남편 통장에서 큰돈이 빠져나간 정황도 있습니다." |
| 1 | 2 | emerge-e5-via-a-interject-judge-react-v1 | 판사→A | "박지연 씨, 방금 말씀하신 큰돈 출금 정황은 어떻게 알게 된 겁니까." |
| 1 | 3 | emerge-e5-via-a-interject-a-response-v1 | A→판사 | "남편이 저 몰래 관리하던 계좌에서 그냥 넘길 수 없는 큰 금액의 출금 내역들이 있었습니다." |
| 1 | 4 | **emerge-e5-via-a-interject-b-shock-v1** | **B→A 반말** | "자기야... 그 계좌를 알고있었어? 그건 내가 따로..." |
| 1 | 5 | **emerge-e5-via-a-interject-a-rebuke-v1** | **A→B 반말** | "지금 그게 중요해? 빠져나간 돈부터 설명해." |
| 1 | 6 | emerge-e5-via-a-interject-judge-decree-v1 | 판사→전체 | "그렇다면 본 법정에 이준호 씨의 개인 계좌 출금 내역을 정식 등재합니다." |
| 2 (combination) | 7 | emerge-e5-via-combo-judge-query-v1 | 판사→B | "이준호 씨, 통화기록과 발신자 미상 문자를 함께 보겠습니다..." |
| 2 | 8 | emerge-e5-via-combo-b-response-v1 | B→판사 | "…개인적으로 따로 관리하던 통장이 있긴 합니다..." |
| 2 | 9 | **emerge-e5-via-combo-a-aware-v1** | **A→B 반말** | "이제야 말하는 거야? 그 통장에서 큰 돈도 빠져나갔잖아." |
| 2 | 10 | emerge-e5-via-combo-judge-decree-v1 | 판사→전체 | "방금 진술에 따라 본 법정에 이준호 씨의..." |
| 3 (emotional outburst) | 11 | emerge-e5-via-b-angry-outburst-v1 | B→판사 | "그럼 제 계좌 출금 내역까지 전부 내놓으라는 겁니까?..." |
| 3 | 12 | emerge-e5-via-b-angry-judge-catch-v1 | 판사→B | "이준호 씨, 방금 스스로 말씀하신 계좌 출금 내역이..." |
| 3 | 13 | emerge-e5-via-b-angry-b-admit-v1 | B→판사 | "…네, 제 개인 계좌에서 출금된 내역이 있습니다." |
| 3 | 14 | **emerge-e5-via-b-angry-a-react-v1** | **A→B 반말** | "이제야 말하는 거야? 그래놓고 내가 괜한 의심을 한다고 나만 이상한 사람 만들고 있었잖아." |
| 3 | 15 | emerge-e5-via-b-angry-judge-decree-v1 | 판사→전체 | "그 진술을 근거로 본 법정에..." |
| Fallback | 16 | emerge-e5-via-judge-auto-decree-v1 | 판사→B | "이준호 씨, 현재까지 제출된 문자와 통화 정황만으로도..." |
| Fallback | 17 | emerge-e5-via-judge-auto-b-respond-v1 | B→판사 | "…네, 그 내역이 있는 건 인정합니다." |

**Bold = NPC↔NPC 직접 발화 (반말 + 부부 호칭)**. 나머지 = NPC↔판사 (격식).

---

## §3. 다국어 번역 원칙

### 3.1. NPC↔판사 영역 (entries 1-3, 6, 7-8, 10, 11-13, 15-17)

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor`/`裁判官`/`审判官` 호명)
- NPC (party): 격식 (`...습니다`, `...만요`, `Your Honor`)
- 종래 spouse-01 톤 보존 — `Ms. Park` / `Mr. Lee Jun-ho` / `パク・ジヨンさん` / `イ・ジュノさん` / `朴智妍女士` / `李俊浩先生`

### 3.2. NPC↔NPC 직접 발화 (entries 4, 5, 9, 14) — 핵심

- **반말 + 부부 호칭 필수**
- 한국어: `자기야` / `여보` / 호칭 생략 (자명 시)
- 영어: `Honey,` / `Babe,` / 호칭 생략 (`Are you serious?` 같이 짧은 직설)
- 일본어: `あなた` / `お前` (관계 친밀도 고려) / 호칭 생략
- 중국어: `老公` / `老婆` / 호칭 생략

### 3.3. dynamics 차별성 보존

각 trigger마다 박지연(A)의 인지 상태가 다름:
- Trigger 1: A 이미 알고 있었음 (몰래 봤음) → 정정/본론 directing 톤
- Trigger 2: A 이번에 사실 확정 → "이제야 인정해" — 안도·허무 섞임
- Trigger 3: A B의 격앙 자백 듣고 → "이제야 말하는 거야? 그래놓고..." — 분노+억울함

각 NPC 직접 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.4. 진실 노출 정책 ([[design_spouse01_truth_disclosure_policy]])

- 본 emergence narrative에서 surface 금지 영역:
  - "형에게 현금 전달" / "형 빚" / "개인회생" (S5 이후만 노출)
  - 구체 금액 (3,000만 원 / 500/800/700/1,000) — surface 가능하나 시점 신중
- emergence narrative는 "비자금 통장 존재"까지만 확정. 사용처는 후속 추궁 영역.

---

## §4. 작업 단계

1. worktree spawn (위 §0)
2. KO baseline 확인:
   ```
   git show main:src/data/scriptedText/spouse-01.json | grep -A 30 emergence_narrative
   ```
3. 외국어 파일에 emergence_narrative channel 신규 추가:
   - `src/data/scriptedText/spouse-01.en.json`
   - `src/data/scriptedText/spouse-01.ja.json`
   - `src/data/scriptedText/spouse-01.zh-CN.json`
4. 각 file의 channels object 끝부분에 KO와 동일 구조로 추가
5. 17 variants 모두 (id 동일, text 번역, behaviorHint 번역, tags 그대로, sourceRefs 그대로)

### tag 처리

- tag values는 번역 X (`channel:emergence_narrative`, `speaker:a` 등 그대로)
- `callTerm` 의 한국어 token (`자기야`, `남편`, `박지연_씨` 등)도 그대로 유지 (시스템 lookup용)
- `judgeAddress` 의 `재판관님` 도 그대로 유지

---

## §5. 검증

```
git status --short  # 외국어 3 file만 modified 기대
npx tsc --noEmit
npm run -s qa:fast 2>&1 | tail -20
```

bundle merge 검증:
```
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.zh-CN.json','utf8'))"
```

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync emergence_narrative emerge-e-5 (17 variants × 3 lang)"
git push -u origin codex/spouse01-emerge-e5-multilang
```

main session이 cherry-pick + merge 처리.
