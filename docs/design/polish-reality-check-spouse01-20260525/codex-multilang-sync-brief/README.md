# Codex 다국어 sync 의뢰서 — spouse-01 Phase 1 폴리싱 후속

작성: 2026-05-25 · baseline commit: (case.ts 변경 commit, 본 commit 직후 push 예정)

## 의뢰 배경

2026-05-25 spouse-01 폴리싱 Phase 1 (사용자 결정 5건) 적용 결과, evidence e-8 / e-9 자료 본질이 교체됨:

- **e-8**: 휴대폰 의학 검색 기록 → **종합산부인과병원 주차 영수증 묶음**
- **e-9**: 보험사 견적 자료 → **이준호 명의 산전우울증 자가진단 결과지 + 상담소 예약 확인 명세**

본 commit에서는 **KO 권위 본문만** 신규 자료 명칭으로 갱신함. 외국어 sync 영역은 본 의뢰서로 분리.

## 의뢰 범위

### Thread A — spouse-01.case.ts 4언어 keyword sync

대상 파일: [`src/data/coreCases/spouse-01.case.ts`](../../../../src/data/coreCases/spouse-01.case.ts)

#### A-1) h-d4 dispute `forbiddenKeywords` 4언어 갱신

S0~S3 a/b 각 forbiddenKeywords 배열에서 옛 evidence 명칭을 신규 명칭으로 교체:

| 옛 키워드 | 신규 키워드 |
|---|---|
| `보험 상담` (KO) / `insurance consultation` (EN) / `保険相談` (JA) / `保险咨询` (ZH-CN) | `상담소 예약` / `counseling clinic reservation` / `カウンセリング予約` / `咨询所预约` |
| (`휴대폰 검색`은 KO 본문에만 있고 forbiddenKeywords에는 없음 — 영향 없음) | (그대로) |

진실 핵심 키워드 (`난임 치료비`, `난임 진단`, `출산 가능성 조사`, `의사 친구 상담`)는 **변경 없음**.

#### A-2) `truthLeakOverride` surface keywords 4언어 갱신 (line ~3061)

```ts
'h-d4': {
  surface: keywords(
    ['비자금', '비자금의 원래 목적', '의학 검색 기록', '보험 견적', '혼자 알아본 영역', '부부 침묵'],
    ['hidden funds', 'original purpose of the hidden funds', 'medical search history', 'insurance estimates', 'area researched alone', 'spousal silence'],
    ['隠し資金', '隠し資金の本来の目的', '医学検索履歴', '保険見積もり', '一人で調べた領域', '夫婦の沈黙'],
    ['私房钱', '私房钱原本的用途', '医学搜索记录', '保险报价', '独自查询的领域', '夫妻间的沉默'],
  ),
}
```

교체:
- `의학 검색 기록` → `산부인과 주차 영수증` (KO)
- `medical search history` → `OB-GYN parking receipt` (EN)
- `医学検索履歴` → `産婦人科駐車券` (JA)
- `医学搜索记录` → `妇产科停车票` (ZH-CN)

- `보험 견적` → `산전우울증 자가진단·상담 예약` (KO)
- `insurance estimates` → `prenatal depression self-assessment and counseling appointment` (EN)
- `保険見積もり` → `産前うつ自己診断・カウンセリング予約` (JA)
- `保险报价` → `产前抑郁自我评估和咨询预约` (ZH-CN)

(외국어 정확한 의역은 Codex 판단)

### Thread B — ScriptedText emergence_narrative 4언어 sync

대상 파일:
- [`src/data/scriptedText/spouse-01.json`](../../../../src/data/scriptedText/spouse-01.json) (KO 권위 — Cycle 4 entries 36건)
- [`src/data/scriptedText/spouse-01.en.json`](../../../../src/data/scriptedText/spouse-01.en.json)
- [`src/data/scriptedText/spouse-01.ja.json`](../../../../src/data/scriptedText/spouse-01.ja.json)
- [`src/data/scriptedText/spouse-01.zh-CN.json`](../../../../src/data/scriptedText/spouse-01.zh-CN.json)

대상 entries (Cycle 4 emergence — 모든 `emerge-e8-*`, `emerge-e9-*`, `emerge-dc8-*`, `emerge-hd4-*`):

옛 evidence 명칭 → 신규 명칭 교체:
- `이준호 휴대폰의 의학 검색 기록` / `휴대폰 검색 기록` / `의학 검색` → `종합산부인과 주차 영수증` / `산부인과 주차 영수증` / `산부인과 단독 방문`
- `이준호의 보험사 견적 자료` / `보험 견적` / `보험 상담` / `가입 안 함` → `이준호 명의 산전우울증 자가진단 결과지` / `상담소 예약 명세` / `산전우울증 자가진단` / `상담 예약만`
- `의학 영역` / `의료 영역` → `부모 될 준비 갈래` 또는 문맥 적합 표현

**중요**: 진실 핵심 키워드 (`난임 치료비`, `난임 진단`, `출산 가능성 조사`, `의사 친구 상담`)는 변경 없음. ScriptedText의 hidden 마킹 정책도 변경 없음.

### 검증 4종 (Thread A + B 완료 후)

```
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
npm run qa:fast
node scripts/detect-truth-leak.cjs --strict
node scripts/verify-translations.cjs --strict --scan-applied
```

## 참고 파일 (self-contained)

본 폴더에 함께 첨부:

- `polish-reality-check.md` — 폴리싱 검토 보고서 (상위 폴더 [참조])
- `case-ts-changes-summary.md` — 본 commit case.ts/narrative.ts 변경 요약
- `e8-e9-old-vs-new.md` — 옛 자료 vs 신규 자료 본질 매핑

## 진행 절차 (Cycle 8단계 절차 6/7단계)

1. (사전 완료) Phase 0~5 = 사용자 결정 + Claude case.ts 변경 + 검증 PASS
2. **본 의뢰** = 7단계 (Codex 다국어 sync)
3. 의뢰 산출물 → 8단계 (Claude 사후 통합 cherry-pick + main push)
