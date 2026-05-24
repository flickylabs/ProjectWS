# Codex Thread — spouse-01 Cycle 3 외도 line 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역)
범위: 채널 `emergence_narrative` 의 Cycle 3 entry — e-4 (12 variants) + dc-1 (13) + w-1 (13) + dc-2 (13) = 51 variants × 3 lang = **153 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-cycle3-affair-line-multilang ../ws-spouse01-cycle3-affair-line-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/spouse01-cycle3-affair-line-multilang` push |

---

## §1. 작업 배경

Core System narrative wrapper layer Cycle 3 — spouse-01 외도 line (d-1 영역).

- KO commit: main HEAD `6308113c` 시점에 51 entry (`src/data/scriptedText/spouse-01.json` channels.emergence_narrative.entries) 적용 완료
- 본 작업: EN/JA/ZH-CN sync 51 entry × 3 lang = 153 entry 작성
- Brief: `docs/design/core-narrative-cycle3-spouse01-affair-line-20260524/` 정독 권장 (특히 gpt-pro-brief.md + spouse01-tone-samples.md + 진실 노출 정책)

### Cycle 3 처리 emergence (4개)

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 증거 | `e-4` | 발신자 미상 문자 | 4 (cascade / a-interject / b-interject / fallback) | 12 |
| 사건 카드 | `dc-1` | 오피스텔의 사람들 | 4 (combo / cascade / b-interject / fallback) | 13 |
| 증인 | `w-1` | 오피스텔 경비 (호출 가능 surface) | 4 (cascade / a-interject / b-outburst / fallback) | 13 |
| 사건 카드 | `dc-2` | 시댁 얘기만 나오면 싸움 (cross-line d-1+d-2) | 4 (combo / cascade / b-outburst / fallback) | 13 |

### 외도 line cascade chain

```
e-3 (initial) → e-4 → dc-1 → w-1
                ↓
                dc-1 → dc-2 (cross-line: d-1 + d-2)
```

---

## §2. KO baseline (main HEAD `6308113c`)

### 영향 파일

```
src/data/scriptedText/spouse-01.json  channels.emergence_narrative
```

`emergence_narrative` 채널은 Cycle 1에서 도입됨 (Cycle 2까지 9 key 누적). 본 batch는 같은 channel의 entries 배열에 4 새 key 추가 (emerge-e-4 / emerge-dc-1 / emerge-w-1 / emerge-dc-2).

### 51 entry 구조 (main HEAD `6308113c`, KO baseline 확정)

| # | Emergence | Trigger | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|---|
| 1 | **e-4** | cascade_from_card | emerge-e4-via-cascade-judge-mention-v1 | judge→b | priorCard:e-3 — 통화 검토 중 같은 번호 문자 정황, 교신 내용 설명 요청 |
| 2 | e-4 | cascade_from_card | emerge-e4-via-cascade-b-response-v1 | b→judge | 그쪽 사정으로 온 문자, 설명 어려움 |
| 3 | e-4 | cascade_from_card | emerge-e4-via-cascade-judge-decree-v1 | judge→all | [발신자 미상 문자] 정식 등재 |
| 4 | e-4 | npc_interjection (a) | emerge-e4-via-a-interject-v1 | a→judge | A 끼어듦 — 통화만 아니라 문자도 자주 오감 |
| 5 | e-4 | npc_interjection (a) | emerge-e4-via-a-interject-judge-react-v1 | judge→a | 박지연 씨, 문자 스레드 제출 가능 여부 |
| 6 | e-4 | npc_interjection (a) | emerge-e4-via-a-interject-a-response-v1 | a→judge | 휴대폰 캡처본 준비, 통화 시각과 겹침 |
| 7 | e-4 | npc_interjection (a) | emerge-e4-via-a-interject-judge-decree-v1 | judge→all | [발신자 미상 문자] 정식 등재 |
| 8 | e-4 | npc_interjection (b) | emerge-e4-via-b-interject-v1 | b→judge | B 흘림 — 그쪽 사정으로 오던 문자... |
| 9 | e-4 | npc_interjection (b) | emerge-e4-via-b-interject-a-pursue-v1 | a→b | A 추궁 — 그쪽 사정? 그 번호 누구? |
| 10 | e-4 | npc_interjection (b) | emerge-e4-via-b-interject-judge-decree-v1 | judge→all | 발신자 미상 문자 스레드 정식 등재 + 다음 진행 |
| 11 | e-4 | judge_auto_mention | emerge-e4-via-judge-auto-decree-v1 | judge→all | 5턴 fallback — 통화와 함께 [발신자 미상 문자] 자료 추가 |
| 12 | e-4 | judge_auto_mention | emerge-e4-via-judge-auto-b-respond-v1 | b→judge | 예, 받아들이겠습니다 |
| 13 | **dc-1** | combination_result | emerge-dc1-via-combo-judge-query-v1 | judge→b | combine-1 — 영수증·GPS 단일 동선 묶임, 사실 관계 설명 요청 |
| 14 | dc-1 | combination_result | emerge-dc1-via-combo-b-response-v1 | b→judge | 거기 다른 일 있어 들름 (한 박자 늦게) |
| 15 | dc-1 | combination_result | emerge-dc1-via-combo-a-react-v1 | a→judge | 한 번도 들어본 적 없음, 외도 동선 분명 |
| 16 | dc-1 | combination_result | emerge-dc1-via-combo-judge-decree-v1 | judge→all | [오피스텔의 사람들] 사건 카드 정식 등재 |
| 17 | dc-1 | cascade_from_card | emerge-dc1-via-cascade-judge-mention-v1 | judge→all | priorCard:e-4 — 문자·영수증·GPS 같은 시기 동선 연결 |
| 18 | dc-1 | cascade_from_card | emerge-dc1-via-cascade-a-response-v1 | a→judge | 우연으로 넘기기엔 너무 많음 (의심 강화) |
| 19 | dc-1 | cascade_from_card | emerge-dc1-via-cascade-judge-decree-v1 | judge→all | [오피스텔의 사람들] 사건 카드 정식 등재 |
| 20 | dc-1 | npc_interjection (b) | emerge-dc1-via-b-interject-v1 | b→all | 다른 사정 있어 방문할 수 있음, 외도 단정 X |
| 21 | dc-1 | npc_interjection (b) | emerge-dc1-via-b-interject-judge-react-v1 | judge→b | '다른 사정'이 무엇인지 설명 요청 |
| 22 | dc-1 | npc_interjection (b) | emerge-dc1-via-b-interject-b-elaborate-v1 | b→judge | 가족 쪽 어쩔 수 없는 사정, 자세한 건 어려움 |
| 23 | dc-1 | npc_interjection (b) | emerge-dc1-via-b-interject-judge-decree-v1 | judge→all | [오피스텔의 사람들] 사건 카드 정식 등재 |
| 24 | dc-1 | judge_auto_mention | emerge-dc1-via-judge-auto-decree-v1 | judge→all | 4턴 fallback — 영수증·GPS·문자 묶어 [오피스텔의 사람들] 단서 등재 |
| 25 | dc-1 | judge_auto_mention | emerge-dc1-via-judge-auto-a-respond-v1 | a→judge | 예, 받아들이겠습니다 |
| 26 | **w-1** | cascade_from_card | emerge-w1-via-cascade-judge-mention-v1 | judge→all | priorCard:dc-1 — 현장 출입 확인 인물 확보 필요, 오피스텔 경비 소환 가능 |
| 27 | w-1 | cascade_from_card | emerge-w1-via-cascade-a-acknowledge-v1 | a→judge | 동의, 경비 분이 남편 출입 여부 확인 가능 |
| 28 | w-1 | cascade_from_card | emerge-w1-via-cascade-judge-summon-v1 | judge→all | 오피스텔 경비 증인 소환 정식 가능 상태 등재 |
| 29 | w-1 | npc_interjection (a) | emerge-w1-via-a-interject-v1 | a→judge | A 끼어듦 — 블랙박스에 경비님과 인사 장면, 남편 알아볼 것 |
| 30 | w-1 | npc_interjection (a) | emerge-w1-via-a-interject-judge-react-v1 | judge→a | 경비 인적 사항·근무 정보 제출 가능 여부 |
| 31 | w-1 | npc_interjection (a) | emerge-w1-via-a-interject-a-confirm-v1 | a→judge | 그 건물 경비실 상시 근무, 확인 가능 |
| 32 | w-1 | npc_interjection (a) | emerge-w1-via-a-interject-judge-summon-v1 | judge→all | 오피스텔 경비 증인 소환 정식 가능 상태 등재 |
| 33 | w-1 | emotional_outburst (b) | emerge-w1-via-b-outburst-v1 | b→all | B 자기 폭로형 outburst — 경비님은 외도 오해 황당함 알 것, 부르시라 |
| 34 | w-1 | emotional_outburst (b) | emerge-w1-via-b-outburst-judge-catch-v1 | judge→b | 경비 증언이 본인에게 유리하다는 의미, 직접 소환 요청? |
| 35 | w-1 | emotional_outburst (b) | emerge-w1-via-b-outburst-b-admit-v1 | b→judge | 재판관님 판단에 맡김 (위축) |
| 36 | w-1 | emotional_outburst (b) | emerge-w1-via-b-outburst-judge-summon-v1 | judge→all | 오피스텔 경비 증인 소환 정식 가능 상태 등재 |
| 37 | w-1 | judge_auto_mention | emerge-w1-via-judge-auto-summon-v1 | judge→all | 4턴 fallback — 현장 출입 확인 인물 증언 확보 필요, 오피스텔 경비 소환 가능성 정식 등재 |
| 38 | w-1 | judge_auto_mention | emerge-w1-via-judge-auto-a-respond-v1 | a→judge | 예, 받아들이겠습니다 |
| 39 | **dc-2** | combination_result | emerge-dc2-via-combo-judge-query-v1 | judge→b | combine-6 — 이준호 씨의 가족 언급 회피 + 문자 연관성, 입 닫는 패턴 동기 설명 요청 |
| 40 | dc-2 | combination_result | emerge-dc2-via-combo-b-response-v1 | b→judge | …말씀드리기 어렵습니다 (긴 침묵) |
| 41 | dc-2 | combination_result | emerge-dc2-via-combo-a-react-v1 | a→judge | 저도 그 패턴 분명히 느끼고 있었음 |
| 42 | dc-2 | combination_result | emerge-dc2-via-combo-judge-decree-v1 | judge→all | [시댁 얘기만 나오면 싸움] 사건 카드 정식 등재 |
| 43 | dc-2 | cascade_from_card | emerge-dc2-via-cascade-judge-mention-v1 | judge→all | priorCard:dc-1 — [오피스텔의 사람들] 단서와 이준호 씨 회피 패턴 연결한 새로운 접근, 별도 카드 |
| 44 | dc-2 | cascade_from_card | emerge-dc2-via-cascade-a-response-v1 | a→judge | 저도 동일 패턴 여러 차례 확인 |
| 45 | dc-2 | cascade_from_card | emerge-dc2-via-cascade-judge-decree-v1 | judge→all | [시댁 얘기만 나오면 싸움] 사건 카드 정식 등재 |
| 46 | dc-2 | emotional_outburst (b) | emerge-dc2-via-b-outburst-v1 | b→all | B 격앙 — "우리 집 얘기는 이제 그만 좀!" (본인 가족 자기 시점 호칭) |
| 47 | dc-2 | emotional_outburst (b) | emerge-dc2-via-b-outburst-judge-catch-v1 | judge→b | 본인이 회피하는 그 화제 자체를 단서로 검토 |
| 48 | dc-2 | emotional_outburst (b) | emerge-dc2-via-b-outburst-b-admit-v1 | b→judge | …죄송합니다, 더 어려움 (위축) |
| 49 | dc-2 | emotional_outburst (b) | emerge-dc2-via-b-outburst-judge-decree-v1 | judge→all | [시댁 얘기만 나오면 싸움] 사건 카드 정식 등재 |
| 50 | dc-2 | judge_auto_mention | emerge-dc2-via-judge-auto-decree-v1 | judge→all | 4턴 fallback — 이준호 씨 진술 가족 화제 회피 반복, 별도 단서 카드 정리 |
| 51 | dc-2 | judge_auto_mention | emerge-dc2-via-judge-auto-a-respond-v1 | a→judge | 예, 받아들이겠습니다 |

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor` / `判事様` / `审判官` 호명)
- 종래 spouse-01 톤 보존 — `Ms. Park` / `Mr. Lee Jun-ho` / `パク・ジヨンさん` / `イ・ジュノさん` / `朴智妍女士` / `李俊浩先生`

### 3.2. 파티 NPC 영역

- **박지연(A)**: 격앙·결단·확신. cascade에서는 차분 동의·신중, 끼어들기/조합에서는 격앙. w-1 a-interject에서는 외도 frame 확신 강. dc-2 영역에서는 신중 동의로 분기.
- **이준호(B)**: 회피→흘림→체념. **w-1 b-outburst / dc-2 b-outburst 에서만 격앙 폭발**, 그 외엔 회피·말끝 흐림 일관.

호칭: `재판관님` / `判事様` / `Your Honor` / `审判官` 일관.

### 3.3. cascade_from_card trigger의 다국어 보존 (핵심)

본 batch의 entry 1-3 (e-4 cascade) + 17-19 (dc-1 cascade) + 26-28 (w-1 cascade) + 43-45 (dc-2 cascade) = 4 cascade chain entries.

- `trigger:cascade_from_card` tag → 그대로 (번역 X)
- `priorCard:e-3` / `priorCard:e-4` / `priorCard:dc-1` tag → 그대로
- text 본문의 이전 entity reference는 entity명 일관 번역:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[통화기록]` | `[Call Record]` (기존 e-3 lockedName 참조) | `[通話記録]` | `[通话记录]` |
| `[발신자 미상 문자]` | `[Unidentified Sender Text]` (기존 e-4 lockedName/surfaceName 참조) | `[発信者不明のメッセージ]` | `[发信人不明的短信]` |
| `[오피스텔의 사람들]` | `[The People at the Officetel]` (기존 dc-1 label 참조) | `[オフィステルの人々]` | `[公寓里的人们]` |
| `[시댁 얘기만 나오면 싸움]` | `[The In-Laws Topic Always Becomes a Fight]` (기존 dc-2 label 참조) | `[婚家の話題が出るたび口論]` | `[一提婆家就吵架]` |

⚠ entity 이름 baseline은 기존 ScriptedText의 evidence/dossierCard label 영역 (spouse-01.{lang}.json) 참조. 기존 번역과 충돌 X — 다른 번역 사용 시 mojibake/inconsistency 발생.

### 3.4. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:
- **combination_result**: 사용자 액션으로 시스템 deterministic 진입 — 판사 발견적 톤
- **cascade_from_card**: 이전 entity 결과의 자연 연속 — 판사 정리적 톤 (이전 entity 명시 인용)
- **npc_interjection**: 상대측 또는 자기 측 NPC 적극 개입 — 격앙·요청 또는 회피·흘림
- **emotional_outburst**: NPC 격앙 폭발 → 자기 폭로형 또는 방어형
- **judge_auto_mention**: 4~5턴 fallback — 판사 결정·종결

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.5. 본인 가족 호칭 자기 시점 정책 (**신규 — 본 cycle 핵심 권위**)

[[feedback_family_address_speaker_perspective]] 권위 — 본 batch의 dc-2 b-outburst에서 처음 발견된 패턴:

- ✗ B(이준호) 발화에 "시댁" (X — 시댁은 아내 시점 호칭, 본인이 자기 가족을 시댁이라 부르면 어색)
- ✓ B(이준호) 자기 시점 호칭: "우리 집 / 우리 가족 / 형 / 형네"

본 정책 다국어 적용:

| 발화 주체 | KO ✓ | EN ✓ | JA ✓ | ZH-CN ✓ |
|---|---|---|---|---|
| B 자기 시점 (entry #46) | "우리 집 얘기" | "Stop bringing up **my family**" | "**うちの家族**の話は" | "**我家**的事" |

- ✗ EN: "in-laws" (아내 시점 외부 호칭)
- ✗ JA: "婚家" (아내 시점)
- ✗ ZH-CN: "婆家" (아내 시점)

⚠ dc-2 사건 카드명 자체 `[시댁 얘기만 나오면 싸움]` = 시스템 narrator 영역으로 OK (재판관/시스템이 부르는 카드명, NPC 본인 발화 영역 X). 다국어 카드명도 일관 — 판사 발화에서는 시스템 카드명 인용 시 사용. 단 B 본인 발화 entry에서만 자기 시점 호칭 사용.

### 3.6. 진실 노출 정책 (본 cycle 가장 위험 영역)

`design_spouse01_truth_disclosure_policy` 권위 엄격 준수.

본 batch 51 entry 전체에서 surface 금지:
- **"친형 / 형 오피스텔 / 조카 / 중2 / 개인회생 / 가족 돌봄 / 조카 돌봄"** (d-1 S4 이상 영역, 본 cycle 모든 entry는 surface 시점 d-1 S1~S2 영역)
- 다국어 번역에서도 동일 — 위 keyword를 자유 번역으로 우회 표현 X (자연 번역 시 빠진 정보면 그대로 두기)
- 허용 영역: "외도 의심 / 외도 오해" / "가족 쪽 일 / 다른 사정 / 챙겨야 할 사람 / 가족 관련 화제" / "회피 패턴 / 입 닫는 패턴 / 동기"

특히 위험 영역:
- entry #20 (dc-1 b-interject) "다른 사정 있어 방문할 수도..." — 영어 번역 시 "family matter" 정도 OK, "took care of nephew" 절대 X
- entry #22 (dc-1 b-elaborate) "가족 쪽에 어쩔 수 없는 사정" — "unavoidable family situation" OK, "brother's debt" X
- entry #33 (w-1 b-outburst) "제가 외도 오해를 받는 게 얼마나 황당한 일인지" — "how absurd these accusations are" OK, "since the truth is family care" X
- entry #46 (dc-2 b-outburst) "우리 집 얘기" — "my family" OK, "my brother / my nephew" X

---

## §4. 작업 단계

1. worktree spawn (위 §0)
2. KO baseline 확인:
   ```
   git show main:src/data/scriptedText/spouse-01.json | grep -B2 -A40 "emerge-e-4\|emerge-dc-1\|emerge-w-1\|emerge-dc-2"
   ```
3. 외국어 파일에 본 batch 51 entry 추가:
   - `src/data/scriptedText/spouse-01.en.json` channels.emergence_narrative.entries 배열에 4 새 key 추가 (emerge-e-4 / emerge-dc-1 / emerge-w-1 / emerge-dc-2)
   - `src/data/scriptedText/spouse-01.ja.json` 동일
   - `src/data/scriptedText/spouse-01.zh-CN.json` 동일
4. 각 entry는 KO와 동일 구조 (id 동일, text 번역, behaviorHint 번역, tags 그대로, sourceRefs 그대로)
5. 각 key 영역 구조 (KO 기준):
   ```json
   { "key": "emerge-e-4", "evidenceId": "e-4", "variants": [12 entry] }
   { "key": "emerge-dc-1", "dossierCardId": "dc-1", "variants": [13 entry] }
   { "key": "emerge-w-1", "witnessId": "w-1", "variants": [13 entry] }
   { "key": "emerge-dc-2", "dossierCardId": "dc-2", "variants": [13 entry] }
   ```

### tag 처리

- tag values는 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:cascade_from_card`, `priorCard:e-3` 등 그대로)
- `callTerm:박지연_씨` / `callTerm:이준호_씨` / `callTerm:재판관님` 같은 한국어 token도 그대로 유지 (시스템 lookup용)
- `comboRecipeId:combine-1` / `comboRecipeId:combine-6` 도 그대로 유지
- `triggerSource:a` / `triggerSource:b` / `triggerSource:judge` 도 그대로 유지

---

## §5. 검증

```
git status --short  # 외국어 3 file만 modified 기대
npx tsc --noEmit
npm run build  # tsc -b --force + vite build
npm run -s qa:fast 2>&1 | tail -20
```

bundle merge 검증:
```
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.zh-CN.json','utf8'))"
```

### qa:fast PASS 필수 (강화 권위)

Cycle 2 사고 패턴 회피 — qa:fast가 surface-name gate / truth-leak gate 등 게임 정책 위반 검출. P0 발견 시 main session에 보고 + sync.md §3.5 진실 노출 영역 재검토.

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync Cycle 3 외도 line — e-4 + dc-1 + w-1 + dc-2 emergence narrative (51 variants × 3 lang)"
git push -u origin codex/spouse01-cycle3-affair-line-multilang
```

main session이 fast-forward merge 처리.

---

## §7. 자매 cycle (참고)

본 cycle은 spouse-01 외도 line **단일 batch**. 자매 batch 없음.

병렬 진행 중인 사건:
- `family-01` cycle (worktree `ws-family-01-cycle`, branch `family-01-cycle`) — family-01.{lang}.json만 변경, 본 sync와 충돌 X
- `friend-01` cycle (worktree `ws-friend-01-cycle`, branch `friend-01-cycle`) — friend-01.{lang}.json만 변경, 본 sync와 충돌 X

본 Codex worktree는 spouse-01.{lang}.json만 변경 → 다른 cycle worktree와 ScriptedText file 영역 완전 분리.
