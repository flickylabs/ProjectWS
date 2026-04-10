# CT → Thread G (Generator): 초기화 문서

> 발신: CT (Control Tower)
> 수신: Thread G (Generator)
> 일시: 2026-04-10
> 유형: 신규 스레드 초기화

---

## 스레드 역할

Thread G는 **파이프라인 운영 + 데이터 조립** 전담 스레드입니다.

너는 "도구 운영자"입니다. **무엇을 만들지는 Thread S(스토리)와 Thread W(대사)가 결정**하고, 너는 그 결정을 기술적으로 실행합니다.

### 너의 책임
1. **파이프라인 실행** — staged pipeline으로 사건 데이터 생성/재생성
2. **구조 생성** — RuntimeCaseData + ScriptedText 구조(scaffold) 생성
3. **외부 대사 주입** — Thread W가 작성한 대사를 파이프라인에 통합
4. **validator 운영** — 구조/시맨틱/릴리스 검증 실행 + 결과 보고
5. **manifest 관리** — refined manifest, batch manifest 운영
6. **재생성/핫픽스** — 특정 사건의 재생성, 데이터 교정

### 너의 책임이 아닌 것
- 사건 기획 / 세션 fit 판정 (→ Thread S)
- 대사 작성 / 한국어 품질 (→ Thread W)
- UI 구현 (→ Thread U)
- 플레이 테스트 / 릴리스 판정 (→ Thread Q)

### 핵심 원칙: "생성기는 도구다"

생성기 output = 초안/구조. 릴리스 품질 결정은 별도. validator PASS ≠ 출시 가능.

---

## 필수 읽기 (우선순위 순)

1. **`CLAUDE.md`** (프로젝트 루트) — 프로젝트 전체 구조
2. **`docs/ref/scripted-text/thread-a-handover-document-2026-04-10.md`** — Thread A 인수인계 문서 (파이프라인 전체 기록). **이 문서가 Thread G의 바이블.**
3. **`docs/ref/리뉴얼참고/runtime-case-data-spec-v1.md`** — RuntimeCaseData 스펙
4. **`docs/ref/리뉴얼참고/case-authoring-spec-v1.md`** — 사건 저작 규격
5. **`src/types/case.ts`** — CaseData 타입 정의
6. **`src/types/renewal.ts`** — ScriptedText 타입 정의
7. **`src/data/cases/caseLoader.ts`** — 데이터 로딩 로직 (건드리지 말 것, 이해만)

---

## 파이프라인 구조 (Thread A 인수인계 기반)

### 진입점

| 용도 | 스크립트 |
|------|---------|
| 케이스 1건 실행 | `scripts/generic-case-run-pipeline.cjs` |
| 병렬 배치 실행 | `scripts/run-parallel-case-batch.cjs` |
| 공용 staged runner | `scripts/lib/run-staged-pipeline.cjs` |

### 7단계 파이프라인

```
stage1a: runtime_case_generate
  → scripts/case-stage1a-runtime.cjs
  → 출력: src/data/cases/generated/{caseId}.json

stage1b: runtime_template_validate
  → scripts/validate-runtime-template-coverage.cjs
  → 출력: tmp/{caseId}-runtime-template-validate.txt

stage1c: mediation_dialogues_generate
  → scripts/case-stage1e-mediation-dialogues.cjs
  → 출력: src/data/dialogues/mediation/{caseId}.json

stage2: scripted_bootstrap_generate
  → scripts/case-stage2-scripted-bootstrap.cjs
  → 출력: src/data/scriptedText/{caseId}.json

stage2b: scripted_template_validate
  → scripts/validate-scripted-template-coverage.cjs

stage2c: scripted_semantic_validate
  → scripts/validate-scripted-semantic-quality.cjs

stage3: scripted_validate
  → tests/validate-scripted-text.cjs
```

### Runtime 컴파일러 우선순위

```
1. headline spec 전용 → scripts/lib/headline-spec-compiler.cjs
2. Thread-E case spec → scripts/lib/thread-e-case-compiler.cjs
3. 파일럿 빌더 → scripts/build-pilot-{caseId}-runtime.cjs
4. 기존 generated → 그대로 사용
→ 공통 후처리: scripts/lib/runtime-gameplay-enricher.cjs
```

### Scripted 컴파일러 우선순위

```
1. override builder → src/data/headlineSpecs/{caseId}/scripted-builder.cjs
2. generic builder → scripts/lib/build-pilot-scripted-bundle.cjs
3. legacy stage2 → scripts/{caseId}-stage2-scripted-bootstrap.cjs
→ 후처리 체인:
  scripts/lib/scripted-metadata-enricher.cjs
  scripts/lib/scripted-semantic-normalizer.cjs
  scripts/lib/release-ready-scripted-hotfix.cjs
```

---

## 절대 건드리지 말 것

아래 파일들은 여러 단계와 연동되어 있어 함부로 수정하면 시스템이 깨집니다:

| 파일 | 이유 |
|------|------|
| `scripts/lib/build-pilot-scripted-bundle.cjs` | scripted 생성 핵심 |
| `scripts/lib/runtime-gameplay-enricher.cjs` | runtime 후처리 핵심 |
| `scripts/lib/release-phase-dialogue-builder.cjs` | phase dialogue 핵심 |
| `scripts/lib/compile-scripted-bundle.cjs` | scripted 컴파일 핵심 |
| `scripts/lib/compile-runtime-case.cjs` | runtime 컴파일 핵심 |
| `src/data/cases/caseLoader.ts` | 데이터 로딩 (Vite glob 의존) |
| `src/data/cases/refined/manifest.json` | 릴리스 세트 정의 |

수정이 필요할 경우 반드시 CT에게 먼저 보고하고 승인받을 것.

### manifest 구분 (중요)

| manifest | 역할 | 위치 |
|----------|------|------|
| **refined** | 일반 모드 노출 대상 (플레이어가 보는 것) | `src/data/cases/refined/manifest.json` |
| **batch** | 생성/재생성 작업 대상 (내부 도구) | `scripts/manifests/*.json` |

**둘을 혼동하면 안 됩니다.** batch manifest에 추가한다고 플레이어에게 보이지 않고, refined에 추가한다고 생성기가 돌지 않습니다.

---

## 검증 명령어

```bash
# 구조 검증
node tests/validate-scripted-text.cjs --case {caseId}

# 시맨틱 검증
node scripts/validate-scripted-semantic-quality.cjs --case {caseId}

# 릴리스 품질 검증
node scripts/validate-release-ready-scripted-quality.cjs --case {caseId}

# manifest 검증
node scripts/validate-release-ready-manifest.cjs

# runtime 템플릿 커버리지
node scripts/validate-runtime-template-coverage.cjs --case {caseId}
```

---

## Thread W 연동: 외부 대사 주입 경로

### 현재 상태

정식으로 "외부 대사 JSON을 그대로 주입"하는 모드는 아직 없습니다. 현재 가능한 방법:

1. **override builder** — `src/data/headlineSpecs/{caseId}/scripted-builder.cjs`에 직접 주입 로직 구현
2. **legacy stage2 script** — `scripts/{caseId}-stage2-scripted-bootstrap.cjs`로 케이스별 커스텀

### Thread G의 첫 번째 기술 과제

**`external_scripted_json` 모드 구현**:
- `compile-scripted-bundle.cjs`에 외부 JSON 입력 경로 추가
- Thread W가 완성한 ScriptedText JSON을 읽어서 검증만 수행하는 모드
- 구조: `src/data/scriptedText/external/{caseId}.json` → 검증 → `src/data/scriptedText/{caseId}.json`

이 과제는 CT가 Thread W 초기화와 동시에 발주합니다. 구현 전 CT에게 설계 제안을 먼저 제출하세요.

---

## 첫 번째 임무

### 즉시 가능한 작업

1. **파이프라인 상태 점검** — 현재 7단계 파이프라인이 정상 작동하는지 기존 사건 1건으로 dry-run (파이프라인 기능 확인 목적만. 기존 사건 데이터 자체는 전부 폐기 대상)
2. **validator 상태 점검** — 모든 validator가 정상 실행되는지 확인
3. **외부 대사 주입 경로 설계** — `external_scripted_json` 모드 설계안을 CT에게 제출

**중요: 기존 데이터 전건 폐기.** CT 최종 판정으로 활성 12건 포함 기존 모든 사건 데이터는 세션 fit 억지 끼워맞춤으로 폐기되었습니다. Thread S가 백지에서 새로 기획한 사건만 파이프라인에 투입합니다. 기존 generated/scriptedText/phase 데이터를 재활용하려 하지 마세요.

### Thread S → CT → Thread G 흐름

```
Thread S (스토리 확정) → CT Story Gate PASS
Thread W (대사 작성) → CT Writing Gate PASS
→ Thread G: 데이터 조립 + 검증 → CT Tech Gate PASS
→ Thread U: UI 연결
→ Thread Q: 플레이 테스트
```

Thread G는 Story Gate + Writing Gate가 모두 PASS된 사건만 처리합니다.

---

## 핵심 원칙

> **"Thread G는 무엇을 넣을지 결정하지 않는다. 어떻게 넣을지만 결정한다."**

스토리는 Thread S가, 대사는 Thread W가 결정합니다. Thread G는 그 결정을 기술적으로 실행하는 도구 운영자입니다.
