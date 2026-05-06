# Implementation Notes for Codex — zh-CN Script Localization

This is a practical handoff for the Codex / Codex-Dev session that will eventually wire zh-CN script content into the runtime. This thread did **not** make any runtime or `src/data/**` changes; everything below is a recommendation.

## What is ready

- UI shell strings for `zh-CN` already exist in `src/i18n/messages/{common,court,verdict,home,profile,settings}.ts`. The locale resolver in `src/i18n/locales.ts` returns the `zh-CN` row when `LOCALE=zh-CN`. **Script content is the missing layer.**
- Glossary (`docs/localization/glossary.csv`) has a complete zh-CN column for ~135 UI/system terms with locked product/brand rows. About 50 additional script-only candidates surface in `SCRIPT_GLOSSARY_CANDIDATES.csv` from this thread; PROJECT_CONTROL_TOWER must lock `needs_decision` rows before bulk script translation begins.
- Pilot translations exist in `PILOT_TRANSLATION_SAMPLES.json` — one entry per requested surface for spouse-01, with up to 3 variants per multi-variant entry plus a `variantPattern_zh_cn` describing the rest.

## What Codex needs to build, in order

### 1. Locale-aware data loaders (small, additive)

Recommended architecture: **sidecar locale files** under `src/data/locales/<locale>/` (see `TEXT_FIELD_EXTRACTION_PLAN.md` Option 1 for the layout).

Each existing loader gets a small helper:

```ts
// pseudo-code
function resolveLocaleText<T extends { id: string; text: string }>(
  base: T,
  localeBundle: Record<string, { text: string; behaviorHint?: string }> | null
): T {
  if (!localeBundle) return base
  const override = localeBundle[base.id]
  if (!override) return base
  return { ...base, text: override.text, ...(override.behaviorHint ? { behaviorHint: override.behaviorHint } : {}) }
}
```

Affected loaders (small additive change each):

- `src/engine/scripted/scriptedTextLoader.ts` (or wherever `scriptedText/*.json` is consumed)
- `src/data/dialogues/phaseScriptLoader.ts`
- `src/data/dialogues/mediationScriptLoader.ts`
- `src/data/cases/caseLoader.ts` (for `cases/generated/*.json` field-level overrides — UI fields only, NOT engine `name`/`description`)
- Any helper that reads `witnessTestimonyData/*.ts`, `evidencePresentationScripts.ts`, `confessionScripts.ts`, `combinationComments.ts` — these become accessor calls that consult a parallel locale JSON.

**Critical**: `evidence[].name` (engine internal) and `evidence[].surfaceName` (UI) must be loaded into **two separate fields** in zh-CN. The loader cannot collapse them, even if the translator confused the two strings — the validator (next section) catches that case.

### 2. Per-locale guard wrapper (CRITICAL — disclosure-policy parity)

The current `npm run check:policy` wrapper validates Korean ScriptedText against `disclosure-policy.md` §4 forbidden-lexeme + paraphrase sets. zh-CN needs a full mirror.

**File**: extend `src/data/disclosurePolicy/{caseId}.json` (Codex schema area) with:

```jsonc
{
  "version": "1.1-zh-cn",
  "forbiddenLexemes": {
    "ko": [...],         // existing
    "zh-CN": [...]       // NEW
  },
  "paraphraseLexemes": {
    "ko": [...],
    "zh-CN": [...]       // NEW — see SCRIPT_GLOSSARY_CANDIDATES.csv "critical" rows for starter list
  },
  "surfaceMap": {
    "ko": {...},
    "zh-CN": {...}       // NEW — mirrors disclosure-policy.md §4 uiSurfaceMap surface texts
  },
  "lieStateGate": {...}   // unchanged — channel × lieState matrix is locale-agnostic
}
```

The wrapper script (likely `scripts/qa-free-interrogation-policy.mjs` or a new `scripts/qa-disclosure-policy.mjs`) takes a `--locale=<code>` flag and:

1. Loads zh-CN sidecar files (or merged in-memory bundle).
2. Walks all surface-only channels per `lieStateGate` matrix.
3. For each variant text in zh-CN, runs `forbiddenLexemes.zh-CN` and `paraphraseLexemes.zh-CN` checks.
4. Hard-fails on any match in surface-only channels at S0/S1/S2.
5. Soft-warns on partial matches at S3+.

### 3. zh-CN starter blocklists per case

Each case's zh-CN blocklist must be authored from the Korean source under `disclosure-policy.md` §4. Starter content (NOT exhaustive — Codex must expand):

#### spouse-01 (§4.1)

Forbidden in surface-only channels (judge / system / dossier-hint / pre-S5 NPC):

```
哥, 亲哥, 大哥,
侄子, 外甥, 中学二年级 (or 初二),
照看, 照看家人, 家事(in 'family circumstance' sense), 家事支援,
委托书伪造, 委托书造假, 投资诈骗,
哥的公寓, 哥名下, 转给哥,
学习用品, 侄子的学校通知
```

Paraphrase set (also blocked):

```
关系绕弯: 年幼的亲戚, 亲属, 血亲, 同血缘的家人
照看变形: 照料一下, 帮忙买生活用品, 帮家人
代付绕弯: 替他还债
小金库绕弯: 私下攒的钱, 偷偷准备的钱
S2 NPC泄露绕弯: 帮家人这件事很急 — pre-S2 不允许直接暴露动机
```

#### family-01 (§4.2)

Forbidden:

```
出生秘密, 血缘不同, 不同血缘,
二十年来B的钱, 拿정후的钱给母亲(translated: 用정후的钱供养母亲),
减少自己份额, 缩小自己的份额, 遗嘱减少自己的份额,
工厂破产代付, 哥的工厂资金
```

Paraphrase:

```
遗嘱伪造绕弯: 动过遗嘱, 修改了遗嘱, 改过遗嘱, 改动过原版遗嘱, 用手改过文书
份额减小: 减少自己的份额
工厂资金: 工厂资金 (单独使用 / "工厂资金的来源" "工厂资金走向相同")
长期汇款变形: 二十年每月汇, 二十年汇款, 每月给母亲账户存钱, 长期汇款
出生秘密变形: 血缘不同, 亲生子, 亲生关系, 出生相关事实
60:40变形: 六比四, 60:40, 40:60, 4:6
```

#### friend-01 (§4.3)

Forbidden:

```
未婚夫先, 父亲的诈骗,
父亲拿走的钱, 同样的方式重复,
越界的消息, B的拒绝
```

Paraphrase:

```
接近变形: 越界的消息, 越界的话, 越过界的消息
诈骗绕弯: 多恩的父亲拿走的, 取走, 多恩父亲跟未婚夫开口要钱, 송다은父亲跟未婚夫开口要钱
拒绝绕弯 (judge channel only): 曾拒绝, 拒绝过的事实
反复模式变形: 反复同样的方式, 用同样的方式开口要钱
```

These are starter lists — Codex should expand by walking the Korean paraphrase sets in `disclosure-policy.md` §4.1/§4.2/§4.3 and producing zh-CN equivalents per item, matching the level of paraphrase coverage we already achieved in Korean.

### 4. UI surface map zh-CN equivalents

Each case has a `uiSurfaceMap` table (disclosure-policy.md §4.1, §4.2, §4.3) listing fields where the case data contains truth lexemes that must be replaced by surface phrasing in UI. zh-CN needs the same table.

Example (spouse-01 e-4 evidence):

| field | actual (translated) | surface zh-CN (UI allowed) |
|---|---|---|
| `combinationLab.nodes.e-4.label` | `e-4 与哥哥的短信 + 侄子学校通知` | `e-4 未知发件人的短信` |
| `combinationLab.outputs.dc-2.judgeHint` | `…向李俊昊先生当面追问，或出示哥哥的短信(e-4)便能确认具体情节…` | `…向李俊昊先生当面追问，或出示该短信记录(e-4)便能确认隐藏的细节…` |

Codex must expand this table for all spouse-01 / family-01 / friend-01 entries from the existing Korean uiSurfaceMap rows.

### 5. Validation rules to add (mirror of Korean rules)

- **Surface-vs-truth pair distinctness**: for each evidence object, `name_zh_cn !== surfaceName_zh_cn` and `description_zh_cn !== surfaceDescription_zh_cn`. Fail if collapsed.
- **S5 truth lexeme presence**: for each confession entry, the zh-CN translation MUST contain the case's truth lexeme tokens. This is the inverse rule (truth REQUIRED at S5, FORBIDDEN before S5).
- **Glossary drift**: walk all zh-CN script strings, tokenize, compare to `glossary.csv` zh-CN column. Strings using non-glossary forms for canonical concepts should warn.
- **Channel-tag preservation**: `tags[]` values must be byte-identical to source (no `channel:judge_question` vs `channel:法官提问` drift).

### 6. behaviorHint runtime audit (open question)

Before deciding whether to translate `behaviorHint` in zh-CN sidecars, Codex should answer:

- Does any runtime path read `variant.behaviorHint`? `grep -r "behaviorHint" src/engine src/components` will show consumers.
- Does the LLM/free-interrogation prompt builder include `behaviorHint`?
- If the answer to both is "no, dev-only", pin behaviorHint as `ko`-only metadata and skip translation.

### 7. Recommended sequencing

1. **Lock the glossary** — PROJECT_CONTROL_TOWER decisions on the `needs_decision` rows of `SCRIPT_GLOSSARY_CANDIDATES.csv`.
2. **Author zh-CN forbidden + paraphrase + uiSurfaceMap blocks** in `src/data/disclosurePolicy/{caseId}.json` — three cases. Schema-only; Codex JSON work, no runtime changes.
3. **Extend the policy wrapper** to take `--locale` and walk zh-CN side once a sidecar exists. Empty sidecar = wrapper passes trivially. This step alone unblocks parallel translation work.
4. **Build the loader sidecar resolver** (small additive helper).
5. **Translate** spouse-01 → run wrapper → fix → translate family-01 → friend-01.
6. **Auxiliary surfaces** (phase1, mediation, witnessTestimony, evidencePresentation, confessionScripts, combinationComments, cases/generated UI fields).
7. **PC build QA** with `LOCALE=zh-CN`.

## Out-of-scope for Codex (per disclosure-policy §7)

- Do not auto-translate ScriptedText with an LLM. Per `feedback_revision_meaning_over_form`, machine paraphrase loses the 9-dimensional meaning fidelity. Use GPT Pro pipelines with Claude review (memory `feedback_use_gpt_pro` + `feedback_gpt_pro_claude_review`).
- Do not flip the JSON disclosurePolicy to runtime-import in this pass. Keep `Tier 3` runtime guard default-off.
- Do not modify `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` core logic — only add a small locale resolver hook.

## Critical reminder

The truth-leak guard is the **single most important runtime invariant** in this game (memory `feedback_truth_leak_prohibition`). zh-CN translation introduces a brand-new attack surface for accidental leaks: any translator unfamiliar with the disclosure policy will instinctively concretize the abstracted Korean text ("`그 분`" → "`他哥哥`" feels natural but breaks the game). The wrapper from §2 is the only durable defense. Build the wrapper first, translate later.
