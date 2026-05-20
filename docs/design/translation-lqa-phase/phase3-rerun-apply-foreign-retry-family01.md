# LQA Phase 3 Rerun — family-01 EN/JA Retry Brief

작성: 2026-05-20
세션: 외국어 9 thread cherry-pick 후 2개 회귀 revert (commits 4a8ed207 / 3f998e2a)

## 회귀 본성

family-01 EN (이전 2e7bcd60) + family-01 JA (이전 8e41f7cb) 두 thread에서 audit recommendation을 잘못 해석:

- audit 지시: `entries[0-35] variants[*]`에 대해 "**각 variant를 KO 원문에서 재번역하고 반복 템플릿 문장을 삭제. 각 variant별 다양성 유지.**"
- 잘못된 적용: **모든 36 entry × 10 variant = 360 variant를 단일 동일 텍스트로 통일** → 게임에서 NPC 발화 다양성 100% 손실 (P0 회귀)

검증: `a50cf293`(baseline) vs cherry-pick 후 비교 — `interrogation` 0/180 → 180/180 uniform화. CSV target 영역에 속하지만 audit 지시 위반.

## 본 retry의 핵심 정책 — Wildcard 처리

### `variants[*]` 또는 `entries[a-b]` 의미
- audit row가 `entries[0-35].variants[*]`라 적었다면 = **그 범위의 모든 variant를 각각 검토하라**는 의미. 다양성 유지 + 각 variant별 자연스러운 paraphrase 필요.
- **단일 텍스트 통일 ≠ wildcard 의미**. wildcard는 "이 범위 전부 검토"이지 "이 범위 전부 같은 텍스트로"가 아님.

### 작성 기준
1. **각 variant별 unique 텍스트**. 같은 의미를 담되 어휘/문장 구조/길이를 다양화.
2. KO 원본의 variant 다양성을 reference. KO는 이미 main HEAD에 적용됨 — 그 다양성 패턴을 외국어에서도 유지.
3. **무작위 다양화 X**. KO와 의미 동등 + native 자연도가 우선. variant 간 차이는 어휘 선택 / 어순 / 강조점 / 형용사 정도 / 문장 분할 등 자연 발화의 미세한 변형.
4. multi-variant audit row (`variants[0,1,4]` 형식)도 마찬가지: index 3개에 *서로 다른* 자연 paraphrase 적용. 단일 통일 금지.

### Bad / Good 예시 (family-01 JA interrogation entries[15] variants[0..9])

**Bad (회귀)**:
```json
variants[0].text: "유언장에는 제 몫이 동생보다 적게 적혀 있었습니다. 어머니를 돌보고 함께 산 것은 저인데, 왜 동생 몫이 더 큰지 납득할 수 없습니다."
variants[1].text: "유언장에는 제 몫이 동생보다 적게 적혀 있었습니다. 어머니를 돌보고 함께 산 것은 저인데, 왜 동생 몫이 더 큰지 납득할 수 없습니다."
variants[2..9].text: (전부 동일)
```

**Good (지시 부합)**:
KO 원본 variants[0..9]가 각자 다른 표현이라면 그 *각각의* 의미를 JA로 paraphrase. 예시:
```json
variants[0].text: "遺言書には、私の分が弟より少なく書かれていました。母を看取り、一緒に暮らしてきたのは私です。なぜ弟の分の方が大きいのか、納得できません。"
variants[1].text: "遺言書を開くと、私の取り分が弟より少ないと記されていました。母の世話も同居も私が引き受けてきたのに、弟の取り分が大きい理由が分かりません。"
variants[2].text: "遺言書では私の相続分が弟を下回っていました。母の看護も生活も私が担ってきたのに、弟の方が多いのは納得できません。"
...각 variant 자연 발화 paraphrase
```

## 작업 범위 (2 thread)

| Thread | Case | Lang | P0 | 변경 파일 |
|---|---|---|---|---|
| FAR-1 | family-01 | en | 10 | `src/data/scriptedText/family-01.en.json` + `src/data/cases/generated/family-01.en.json` |
| FAR-2 | family-01 | ja | 6 | `src/data/scriptedText/family-01.ja.json` + `src/data/cases/generated/family-01.ja.json` |

CSV (input): `docs/design/translation-lqa-phase/reports/phase3-rerun_family-01_{lang}.csv`

## 진입 조건

| 항목 | 조건 |
|---|---|
| base | main HEAD (`baf075e3` 이상) — 회귀 revert 적용된 baseline |
| worktree | 신규 `D:/solomon-pa-family01-{lang}-retry`, branch `codex/p3-apply-foreign-family01-{lang}-retry` |
| 변경 영역 | 자기 case×lang의 `scriptedText/.json` + `cases/generated/.json`만. KO 파일 X, 다른 case X, src/ X |
| 다양성 검증 자체 | 작성 후 각 entry의 variants가 모두 unique text인지 확인. unique=1 entry 발견 시 retry. |

## 검증 후 commit

```
Apply LQA P3 rerun P0 fixes — family-01 {LANG} ({P0_count}) [retry]

Each affected entry's variants are unique paraphrases of the KO source,
addressing the diversity regression from the prior batch (reverted in
4a8ed207 / 3f998e2a). No two variants share text within an entry.
```

## 검토 흐름

1. Codex worktree commit + push
2. Claude 검토: 다양성 측정 (`uniformEntries` 0 expected) + 의미 동등 + native + 정책
3. 승인 후 cherry-pick → main
4. `qa:lqa` strict + variant uniformity 0 확인

## 관련 메모리

- `feedback-revision-meaning-over-form` — 9차원 의미 보존
- `feedback-natural-korean-vs-translationese` — translationese 회피
- `feedback-broad-homologous-detection` — 광범위 동형 검출 본질 (잘못 패턴 #11)
