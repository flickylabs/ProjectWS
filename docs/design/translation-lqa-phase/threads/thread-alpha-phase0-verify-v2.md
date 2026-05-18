# Codex Thread α — LQA Phase 0 / verify-translations v2 + detect-truth-leak

작성일: 2026-05-19
상위 문서: [translation-lqa-phase/execution-plan-v2.md](../execution-plan-v2.md) §2
주체: Codex thread α (단일, 순차, Phase 2 진입 전 prerequisite)
예상 소요: 2일

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| working tree clean | `git status --short` 빈 출력 또는 의도 untracked만 (별도 작업 영향 없음) |
| 기존 도구 가용 | `scripts/verify-translations.cjs` 존재 ✓ (확인됨) |
| 기존 도구 무결성 | tsc/qa:fast 통과 상태 ✓ |
| 신규 도구 | `scripts/detect-truth-leak.cjs` 아직 없음 (이번에 신규 작성) |

진입 시 위 위배 발견하면 즉시 중단하고 메인 세션에 알림.

---

## §1. 배경 / 산출

Phase 3 본 번역 적용 후 spouse-01 h-d4 박지연 측 [102][104][106]에서 generic placeholder leak 발견(별도 fix 의뢰서 진행 중). 이번 도구가 있었다면 자동 검출 가능했음. 향후 라운드 + Phase 2 LQA의 자동 게이트로 사용.

### 1.1. 두 가지 산출

**산출 A**: `scripts/verify-translations.cjs` v2 — 기존 5 검출 + **신규 7 검출 = 총 12종**
- 입력: 기존과 동일(CSV) + **신규 JSON 스캔 모드** 추가
- 신규 옵션: `--scan-applied` (적용된 src/data JSON 파일 스캔)

**산출 B**: `scripts/detect-truth-leak.cjs` — 4언어 truth-leak 매트릭스 (신규)
- 입력: src/data scriptedAngles/scriptedText JSON 파일 (적용된 외국어 + KO baseline)
- 출력: JSON 리포트 + exit code 1 (위배 발견 시)

### 1.2. npm 스크립트 추가
- `qa:lqa` → `node scripts/verify-translations.cjs --strict --scan-applied && node scripts/detect-truth-leak.cjs --strict`

### 1.3. 적용 후 검증
- 기존 `npm run qa:fast` 영향 없음
- 신규 `npm run qa:lqa` 추가, 단독 게이트

---

## §2. 산출 A 사양 — verify-translations.cjs v2 확장

### 2.1. 기존 구조 (유지)
- `buildReport(rows, glossary, meta)` 함수 (line 42~84)
- `issues` 객체에 검출 타입별 배열 (line 43~49)
- `checkX(row, rowNumber, output)` 함수 패턴 (line 108~177)
- `summary` 카운트 (line 60~71)
- JSON 출력 (line 34)
- `--strict` 옵션으로 exit code (line 37~39)

### 2.2. 신규 7 검출 사양

각 검출은 기존 `checkX` 함수 패턴 따라 추가. `issues` 객체에 키 추가. `summary`에 `*_issues` 카운트 추가.

#### V01: 영문 직역 명사구 (`literalEnglishNounPhrase`)

```js
const LITERAL_NOUN_PHRASE_PATTERNS = [
  /\bthe\s+(\w+\s+){0,2}figure\b/i,
  /\bX\s+(bracket|track|bar|panel|frame|range)\b/i,
  /\b(\w+)\s+authority\b/i,
  /\b(time|space|fact|truth|guilt|innocence)\s+\w+\s+(matter|issue|problem)\b/i,
  // ... 사전 ~30종 (Codex가 영문 직역 사전 확장 — 한국어 어휘식 영문 직역 패턴)
]
function checkLiteralEnglish(row, rowNumber, output) { ... }
```

위배 시 `issues.literalEnglishNounPhrase.push({ rowNumber, locale: 'en', pattern, snippet, ko })`.

#### V02: cross-batch 일관성 (`crossBatchInconsistency`)

같은 `ko` 값이 row 여러 개에 등장하는데 `en`/`ja`/`zh-CN`가 분기되면 위배.

```js
function checkCrossBatchConsistency(rows, output) {
  const koGroups = new Map() // ko → [{ rowNumber, en, ja, zh-CN }]
  rows.forEach((row, idx) => {
    if (!normalizeCell(row.ko)) return
    const key = row.ko.trim()
    if (!koGroups.has(key)) koGroups.set(key, [])
    koGroups.get(key).push({ rowNumber: idx + 2, en: row.en, ja: row.ja, 'zh-CN': row['zh-CN'] })
  })
  for (const [ko, group] of koGroups) {
    if (group.length < 2) continue
    for (const locale of LOCALES) {
      const variants = [...new Set(group.map(g => normalizeCell(g[locale])).filter(Boolean))]
      if (variants.length > 1) {
        output.push({ ko: compact(ko), locale, variants: variants.map(compact), occurrences: group.length })
      }
    }
  }
}
```

#### V03: JA 조사 휴리스틱 (`japaneseParticleAnomaly`)

```js
const JA_PARTICLE_PATTERNS = [
  /\p{Script=Han}{2,}を\p{Script=Han}{2,}を/u,  // 명사+を+명사+を 반복
  /[ぁ-ん]がが/,                                  // ががが
  /[ぁ-ん]はは/,
  /^を/m,                                          // 문장 시작 を (불가)
]
function checkJapaneseParticles(row, rowNumber, output) { ... }
```

#### V04: ZH-CN 한국어식 어순 (`chineseKoreanWordOrder`)

```js
const ZH_KOREAN_PATTERNS = [
  /对.+?的.+?来说/,           // "X的Y로서"
  /.+?与.+?之间的.+?是/,      // "X와 Y 사이의 Z는"
  /[一-鿿]{2,}的[一-鿿]{2,}是[一-鿿]{2,}/,  // "X的Y是Z"
  /对于.+?来说，.+?是/,
]
function checkChineseWordOrder(row, rowNumber, output) { ... }
```

#### V05: 인명 표기 분기 (`personNameDivergence`)

glossary에 등록된 인명 외에 src 데이터에 등장하는 인명을 추출 → 같은 인명이 row별로 다른 표기 = 위배.

```js
function checkPersonNameDivergence(rows, glossary, output) {
  const koNames = extractPotentialKoNames(rows)  // 한글 인명 후보 추출
  const glossaryNames = new Set(glossary.map(g => g.ko).filter(n => looksLikePersonName(n)))
  for (const name of koNames) {
    if (glossaryNames.has(name)) continue  // glossary 강제 (V05 영역 외)
    const variants = collectTargetVariants(rows, name)
    for (const locale of LOCALES) {
      if (variants[locale].size > 1) {
        output.push({ ko_name: name, locale, variants: [...variants[locale]] })
      }
    }
  }
}
```

#### V06: 시스템 톤 잔류 (`systemToneRemnant`)

외국어 cell에 해요체/합쇼체 한글 잔류:

```js
const KO_REMNANT_PATTERNS = [
  /[해세요][.。!?]/,            // ~세요, ~해요 잔류
  /[입까니다][.。!?]/,          // ~입니다, ~까니다 잔류
  /[가-힣]+(다|요|네|군|군요)/,  // 일반 한글 동사 어미
]
function checkSystemTone(row, rowNumber, output) {
  for (const locale of LOCALES) {
    const text = normalizeCell(row[locale])
    if (!text) continue
    if (KO_REMNANT_PATTERNS.some(p => p.test(text))) {
      output.push(baseIssue(row, rowNumber, { locale, snippet: compact(text) }))
    }
  }
}
```

#### V07: placeholder leak regex (가장 중요)

박지연 사례의 일반화:

```js
const PLACEHOLDER_LEAK_PATTERNS = {
  en: [
    /what you (hid|concealed|decided) (and|when)/i,
    /what (was|got) (hidden|concealed|decided) when/i,
    /what you actually (hid|concealed|did) (and|when)/i,
    /the things you (hid|concealed) when/i,
  ],
  ja: [
    /何をいつ(隠した|決めた|したのか)/,
    /何時に何を(隠した|決めた)/,
    /いつ何を(隠した|決めた)/,
  ],
  'zh-CN': [
    /你在何时(隐瞒|决定)了什么/,
    /你何时(隐瞒|决定)了什么/,
    /何时.{0,3}(隐瞒|决定).{0,3}什么/,
  ],
}
function checkPlaceholderLeak(row, rowNumber, output) {
  for (const locale of LOCALES) {
    const text = normalizeCell(row[locale])
    if (!text) continue
    for (const pat of PLACEHOLDER_LEAK_PATTERNS[locale] || []) {
      if (pat.test(text)) {
        output.push(baseIssue(row, rowNumber, { locale, pattern: String(pat), snippet: compact(text) }))
        break
      }
    }
  }
}
```

### 2.3. 신규 옵션: `--scan-applied`

src/data JSON 직접 스캔 모드. 활성 시 CSV 대신 (또는 CSV에 추가로) 적용된 외국어 JSON 파일을 row 형태로 변환해 동일 검사 실행.

스캔 대상 파일:
- `src/data/cases/generated/{spouse,family,friend}-01.{en,ja,zh-CN}.json`
- `src/data/dialogues/mediation/{spouse,family,friend}-v3-01.{en,ja,zh-CN}.json`
- `src/data/dialogues/phase1/{spouse,family,friend}-01.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/{spouse,family,friend}-01_angle_catalog.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/{spouse,family,friend}-01_judge_questions.{en,ja,zh-CN}.json`
- `src/data/scriptedText/{spouse,family,friend}-01.{en,ja,zh-CN}.json`

JSON walker로 string leaf 추출, 각 leaf를 가상 row로 만들어 (`ko` 컬럼은 KO baseline 동일 path의 string leaf) 기존 check 함수 호출.

CLI:
```bash
node scripts/verify-translations.cjs --scan-applied --strict
node scripts/verify-translations.cjs --input docs/...csv --strict  # 기존
node scripts/verify-translations.cjs --scan-applied --input docs/...csv --strict  # 양쪽
```

### 2.4. 출력 확장

`summary`에 신규 카운트 7종 추가:
- `literal_english_noun_phrase_issues`
- `cross_batch_inconsistency_issues`
- `japanese_particle_anomaly_issues`
- `chinese_korean_word_order_issues`
- `person_name_divergence_issues`
- `system_tone_remnant_issues`
- `placeholder_leak_issues`

`issues` 객체에 동일 키 추가.

`meta`에 스캔 모드 표시: `meta.mode = 'csv' | 'applied' | 'both'`.

### 2.5. 합격 기준 (자동)

확장 후 다음 모두 통과:
- `npx tsc -b --noEmit` EXIT=0 (스크립트는 .cjs라 tsc 영향 없음, 확인용)
- `npm run lint` EXIT=0
- 기존 동작 회귀 0건 — `node scripts/verify-translations.cjs --strict` (기존 CSV로 실행) → 기존 5 검출 카운트 동일
- 신규 V07 검출 검증: `node scripts/verify-translations.cjs --scan-applied` → spouse-01 박지연 [102][104][106] EN/JA/ZH-CN 7건씩 = **총 21건 placeholder_leak 검출** (사용자가 사전에 알려준 baseline)

---

## §3. 산출 B 사양 — detect-truth-leak.cjs 신규 작성

### 3.1. 목적

NPC 자백 전 진실 콘텐츠가 player에게 노출되었는지 4언어 매트릭스로 검출. 메모리 [feedback_truth_leak_prohibition](memory) 잘못 패턴 #9의 자동화.

### 3.2. 데이터 모델

```js
// 4언어 truth-leak 키워드 매트릭스
// 케이스 × dispute × { surface (공개 OK) vs hidden (자백 전 노출 금지) }
const TRUTH_LEAK_MATRIX = {
  'spouse-01': {
    'h-d4': {
      hidden: {
        ko:    ['외도', '불륜', '바람 폈'],
        en:    ['affair', 'cheated', 'infidelity'],
        ja:    ['不倫', '浮気', '愛人'],
        'zh-CN': ['外遇', '出轨', '婚外情'],
      },
      surface: {
        ko:    ['오피스텔', '새벽 통화', '현금 인출'],
        en:    ['officetel', 'early-morning calls', 'cash withdrawal'],
        ja:    ['オフィステル', '早朝の通話', '現金出金'],
        'zh-CN': ['韩式商住公寓', '凌晨通话', '现金取款'],
      },
    },
    // ... h-d3, d-1, d-2 동상
  },
  'family-01': {
    'd-4': {
      hidden: {
        ko:    ['출생 비밀', '친자', '입양'],
        en:    ['birth secret', 'biological', 'adopt'],
        ja:    ['出生秘密', '実子', '養子'],
        'zh-CN': ['出生秘密', '亲生', '收养'],
      },
      surface: { /* 일기장 / 메모 등 */ },
    },
    // ... d-1, d-2, d-3, d-5
  },
  'friend-01': { /* ... 동상 */ },
}
```

매트릭스는 코드에 인라인 또는 별도 JSON (`docs/localization/non-dialogue-extract/truth-leak-matrix.json`). 후자 권장(데이터/코드 분리).

### 3.3. 검출 로직

각 케이스 × 각 lang 외국어 source 파일(scriptedAngles judge_questions, scriptedText의 judge/system/mediation/aftermath 채널)을 walk:

```js
function detectTruthLeak(matrix) {
  const findings = []
  for (const caseId of Object.keys(matrix)) {
    for (const lang of ['ko', 'en', 'ja', 'zh-CN']) {
      const files = getCaseFiles(caseId, lang)  // 위 path 목록
      for (const file of files) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'))
        const channelStrings = extractStringsFromChannels(data, ['judge_question', 'judge', 'system', 'mediation', 'aftermath'])
        for (const { key, text } of channelStrings) {
          for (const disputeId of Object.keys(matrix[caseId])) {
            const hiddenKeywords = matrix[caseId][disputeId].hidden[lang] || []
            for (const kw of hiddenKeywords) {
              if (text.includes(kw)) {
                findings.push({ caseId, disputeId, lang, file, key, keyword: kw, snippet: compact(text) })
              }
            }
          }
        }
      }
    }
  }
  return findings
}
```

### 3.4. CLI

```bash
node scripts/detect-truth-leak.cjs                 # 표준 출력 + JSON 파일
node scripts/detect-truth-leak.cjs --strict        # 위배 시 exit 1
node scripts/detect-truth-leak.cjs --case spouse-01  # 한 케이스만
node scripts/detect-truth-leak.cjs --out report.json
```

기본 출력: `docs/localization/non-dialogue-extract/truth-leak-report.json`

### 3.5. 출력 형식

```json
{
  "generatedAt": "2026-05-19T...",
  "matrix": "docs/.../truth-leak-matrix.json",
  "summary": { "total": 0, "byCase": { "spouse-01": 0, ... }, "byLang": { ... } },
  "findings": [
    { "caseId": "spouse-01", "disputeId": "h-d4", "lang": "ja", "file": "...", "key": "judgeQuestions[102].variants[0].text", "keyword": "不倫", "snippet": "..." }
  ]
}
```

### 3.6. 매트릭스 작성

**Codex 책임 범위 외** — 매트릭스 데이터(실제 케이스별 hidden/surface 키워드)는 사용자 + Claude가 별도 작성. Codex는:
- 스크립트 골격 + 인터페이스 작성
- 매트릭스 schema 정의
- 샘플 매트릭스 1~2개 dispute (spouse-01 h-d4 정도)만 placeholder로 채움
- 사용자가 나중에 매트릭스 확장

### 3.7. 합격 기준 (자동)

- 스크립트 실행 EXIT=0 (매트릭스 빈약해도 schema 통과)
- 샘플 매트릭스(spouse-01 h-d4)로 실행 시 spouse-01 외국어에서 hidden 키워드 위배 검출 결과 출력 (수치는 매트릭스 내용에 따라 다름)
- 매트릭스 JSON 검증: schema 일치 (각 dispute에 hidden + surface, 각각 4 lang 키)

---

## §4. npm 스크립트 + CI 통합

`package.json`에 다음 추가:

```json
"scripts": {
  ...기존,
  "qa:lqa": "node scripts/verify-translations.cjs --strict --scan-applied && node scripts/detect-truth-leak.cjs --strict"
}
```

`qa:fast` 등 기존 스크립트는 변경 X.

---

## §5. 테스트 fixtures (필수)

작업 마무리 전 다음 회귀 검증:

### 5.1. 기존 동작 회귀 0
```bash
node scripts/verify-translations.cjs --strict
# 기존 5 검출만 동작. 카운트가 baseline과 동일해야 함 (변경 없음)
```

### 5.2. 신규 V07 검출 검증
```bash
node scripts/verify-translations.cjs --scan-applied --strict 2>&1 | grep placeholder_leak
# 출력: placeholder_leak_issues = 21 (spouse-01 박지연 [102][104][106] × 3 lang × 7 strings 평균)
# 결과 JSON `issues.placeholderLeak` 배열에 21개 entry
# exit 1 (--strict)
```

### 5.3. detect-truth-leak 동작
```bash
node scripts/detect-truth-leak.cjs --strict
# matrix가 spouse-01 h-d4 sample만 있어도 동작. 위배 발견 시 exit 1, 없으면 0.
```

### 5.4. qa:lqa 통합
```bash
npm run qa:lqa
# 두 도구 순차 실행 + 어느 하나라도 위배 → exit 1
```

---

## §6. 합격 기준 (thread 종료 게이트)

| 항목 | 합격 |
|---|---|
| `scripts/verify-translations.cjs` v2 작동 (12 검출 전부) | ✓ |
| `scripts/detect-truth-leak.cjs` 신규 생성 + 작동 | ✓ |
| `truth-leak-matrix.json` schema + sample (spouse-01 h-d4) | ✓ |
| `package.json` 의 `qa:lqa` 추가 | ✓ |
| 기존 `qa:fast`/`build`/`lint`/`tsc` 회귀 0 | ✓ |
| V07로 spouse-01 박지연 placeholder leak 자동 검출 (21건) | ✓ |
| 작업 commit (자기 영역만) | ✓ |
| `git status --short` 검증 — src/ 변경 0건, scripts/ + package.json + docs/.../truth-leak-matrix.json만 staged | ✓ |

---

## §7. 종료 시 작업

1. 다음 파일들만 staged 확인 (`git diff --cached --stat`):
   - `scripts/verify-translations.cjs` (modified)
   - `scripts/detect-truth-leak.cjs` (new)
   - `package.json` (modified, `qa:lqa` 추가)
   - `docs/localization/non-dialogue-extract/truth-leak-matrix.json` (new, sample 매트릭스)
2. tsc/lint/qa:fast 전부 통과 확인
3. commit:
   ```
   Add LQA Phase 0 tooling — verify-translations v2 + detect-truth-leak

   Extends verify-translations.cjs with 7 new detection patterns (literal
   English noun phrases, cross-batch consistency, JA particle anomalies,
   ZH-CN Korean-influenced word order, person-name divergence, system-tone
   remnants, placeholder leak regex) and adds --scan-applied mode for
   walking src/data JSON directly. Introduces detect-truth-leak.cjs that
   loads a per-case truth-leak matrix (sample for spouse-01 h-d4) and
   flags hidden-keyword leakage in foreign-language judge / system /
   mediation / aftermath channels. Wires both into a new qa:lqa npm
   script so Phase 2 LQA threads have a single hard gate. The V07
   placeholder regex catches the spouse-01 h-d4 박지연 [102][104][106]
   leakage that prompted this work.

   Co-Authored-By: Codex
   ```
4. 메인 세션에 종료 알림:
   ```
   [α 종료] Phase 0 tooling
   - verify v2: 12 checks (5 기존 + 7 신규)
   - detect-truth-leak: 작동 + sample matrix
   - qa:lqa 게이트 추가
   - V07 박지연 leak 21건 자동 검출 확인
   ```

---

## §8. 비-범위

이 thread는 다음을 하지 않는다:

- ❌ truth-leak 매트릭스 본격 작성 (사용자 + Claude 별도 — 케이스별 hidden/surface 키워드 신중 결정 필요)
- ❌ Phase 2 thread 의뢰서 변경
- ❌ src/ 데이터 파일 수정 (검출만, 정정은 Phase 4)
- ❌ 박지연 fix 적용 (별도 [translation-spouse-h-d4-park-fix](../../translation-spouse-h-d4-park-fix/master-task.md) 의뢰)
- ❌ `qa:fast` 변경
- ❌ origin/main push

---

## §9. 참조

### 9.1. 메모리
- [feedback_truth_leak_prohibition](memory) — 잘못 패턴 #9, detect-truth-leak의 본질
- [feedback_translation_pipeline_placeholder_leak](memory) — V07 regex 도출 사례
- [feedback_broad_homologous_detection](memory) — 잘못 패턴 #11, V01~V06 발상 근거

### 9.2. 도구
- 기존 `scripts/verify-translations.cjs` (확장 대상)
- 기존 `scripts/apply-translation-phase3.cjs` (참조, 변경 X)
- glossary: `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv`

### 9.3. 사례
- spouse-01 h-d4 박지연 [102][104][106] = V07 regression의 기준 fixture
- 21건 자동 검출이 합격 조건

---

## §10. 예상 소요

- verify-translations v2 확장 (7 함수 + scan-applied 모드): 약 1일
- detect-truth-leak.cjs 골격 + sample matrix: 약 0.5일
- 회귀 테스트 + qa:lqa 통합: 약 0.5일
- 총 **2일 wall-clock**
