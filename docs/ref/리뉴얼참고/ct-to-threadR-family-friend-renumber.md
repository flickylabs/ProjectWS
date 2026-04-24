# CT → 재넘버링 스레드: Family/Friend Stage 재넘버링 (단일 작업)

> 발신: CT (Control Tower)
> 수신: 재넘버링 스레드 (Claude Code subagent 또는 별도 세션)
> 일시: 2026-04-28
> 베이스 커밋: `8d18a39`
> 작업 범위: 단일 작업 (10~30분)

---

## 목표

`src/data/cases/generated/family-01.json` 및 `src/data/cases/generated/friend-01.json`의 **모든 evidence의 stage 필드 값과 관련 키**를 `0/1/2` → `1/2/3`으로 치환.

### 배경

- spouse-01은 04-24에 이미 1/2/3 체계로 재넘버링 완료
- family/friend만 혼자 0/1/2로 남아 **3사건 간 일관성 깨짐**
- 유저 체감 용어로 stage 1/2/3가 자연스러움 ("1단계부터 시작" > "0단계부터")
- [memory/session_handoff_20260428.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\session_handoff_20260428.md) 1순위 항목
- [memory/backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) 1순위 데이터 작업

---

## 대상 범위 상세

각 사건 JSON 파일에서 다음 위치:

### 1. 각 evidence 블록의 `investigationStages` 배열

```json
{
  "id": "ev-1",
  "investigationStages": [
    { "stage": 0, ... },   // → 1
    { "stage": 1, ... },   // → 2
    { "stage": 2, ... }    // → 3
  ]
}
```

### 2. 각 evidence의 `viewerDataByStage` 객체 키

```json
"viewerDataByStage": {
  "0": {...},   // → "1"
  "1": {...},   // → "2"
  "2": {...}    // → "3"
}
```

### 3. 그 외 stage 참조 필드

아래 키가 있으면 동일 치환:
- `unlockAtStage`, `stageGate`, `requiredStage`, `presentStage` 등
- 단, `phase` 필드는 **건드리지 않음** (Phase는 별개 개념, 0~7)
- `lieState` 값 `S0`~`S5`는 **건드리지 않음** (별개 개념)

### 예상 변환 건수

- 각 사건: 7 evidence × 3 stages × 2 위치(investigationStages + viewerDataByStage) ≈ 42건
- 총 84건 (family-01 42 + friend-01 42)

---

## 치환 안전 순서 (⚠️ 중요)

숫자 치환은 **역순(2→3, 1→2, 0→1)**으로 해야 덮어쓰기 안 됨.

순차로 하면:
1. `"stage": 0` → `"stage": 1` 실행 후 기존 값 1과 신규 값 1이 섞임
2. 다음 `"stage": 1` → `"stage": 2` 실행 시 원래 stage 0이었던 것도 같이 변환 → 오염

**반드시 아래 순서**:
1. `"stage": 2` → `"stage": 3`
2. `"stage": 1` → `"stage": 2`
3. `"stage": 0` → `"stage": 1`

viewerDataByStage 키도 동일 역순:
1. `"2":` → `"3":`
2. `"1":` → `"2":`
3. `"0":` → `"1":`

단 `"1":` → `"2":` 류는 JSON 전반에서 많이 매칭될 수 있으므로 **주변 context로 unique 매칭** 필요 (아래 권장 방법 참조).

---

## 작업 절차

### 0. 사전 확인

```bash
# git status clean 확인
git status --short

# 각 파일에서 현재 stage 값 분포 확인
grep -c '"stage": 0' src/data/cases/generated/family-01.json
grep -c '"stage": 1' src/data/cases/generated/family-01.json
grep -c '"stage": 2' src/data/cases/generated/family-01.json
grep -c '"stage": 0' src/data/cases/generated/friend-01.json
grep -c '"stage": 1' src/data/cases/generated/friend-01.json
grep -c '"stage": 2' src/data/cases/generated/friend-01.json
```

예상 출력: 각 값이 대략 7건씩 (evidence 7개 × 1단계씩).
**이 숫자가 다르면 CT에 보고 후 대기**.

### 1. stage 참조 코드 검색 (중요)

치환 전, 코드에서 stage 값을 **하드코딩으로 참조**하는 곳이 있는지 확인:

```bash
grep -rn "stage === 0" src/
grep -rn "stage === 1" src/
grep -rn "stage === 2" src/
grep -rn "stage > 0" src/
grep -rn "stage >= 0" src/
grep -rn "'0' in viewerDataByStage" src/
grep -rn "viewerDataByStage\[0\]" src/
grep -rn "viewerDataByStage\[.0.\]" src/
grep -rn "viewerDataByStage\.0" src/
grep -rn "viewerDataByStage\.\[.0.\]" src/
```

spouse-01이 1/2/3 체계로 이미 동작 중이므로 코드는 일반화되어 있어야 함. 그래도 **누락된 하드코딩 참조가 있으면 CT에 보고** 후 대기 (수정은 CT/Codex가 진행).

### 2. JSON 파일 치환 실행

**권장 방법: Node 스크립트** (안전한 역순 치환)

`tmp/renumber-stages.cjs` 생성:

```js
const fs = require('fs');
const path = require('path');

const targets = [
  'src/data/cases/generated/family-01.json',
  'src/data/cases/generated/friend-01.json'
];

for (const target of targets) {
  const full = path.resolve(target);
  let content = fs.readFileSync(full, 'utf8');
  const before = content;

  // stage 필드 값 치환 (역순)
  content = content.replace(/"stage":\s*2\b/g, '"stage": 3');
  content = content.replace(/"stage":\s*1\b/g, '"stage": 2');
  content = content.replace(/"stage":\s*0\b/g, '"stage": 1');

  // viewerDataByStage 키 치환 — 주의: 단순 "2": 는 다른 곳 매칭 위험
  // 대신 viewerDataByStage 블록 안에서만 치환하도록 context 제한
  content = content.replace(
    /("viewerDataByStage"\s*:\s*\{[\s\S]*?\})/g,
    (block) => block
      .replace(/"2"\s*:/g, '"3":')
      .replace(/"1"\s*:/g, '"2":')
      .replace(/"0"\s*:/g, '"1":')
  );

  if (content === before) {
    console.log(`[SKIP] ${target} — no changes`);
  } else {
    fs.writeFileSync(full, content, 'utf8');
    console.log(`[WRITE] ${target}`);
  }
}
```

실행:
```bash
node tmp/renumber-stages.cjs
```

**주의**:
- viewerDataByStage 블록 정규식 매칭이 객체 중첩이 얕다면 문제없지만, 깊은 중첩 시 greedy/lazy 조정 필요
- 실행 후 JSON 파싱 가능성 확인: `node -e "JSON.parse(require('fs').readFileSync('src/data/cases/generated/family-01.json','utf8'))"`
- 실행 후 tmp 스크립트 제거

### 3. 검증

```bash
# 치환 후 0 값이 남아 있지 않은지
grep -c '"stage": 0' src/data/cases/generated/family-01.json   # 0이어야 함
grep -c '"stage": 1' src/data/cases/generated/family-01.json   # 7이어야 함
grep -c '"stage": 2' src/data/cases/generated/family-01.json   # 7이어야 함
grep -c '"stage": 3' src/data/cases/generated/family-01.json   # 7이어야 함

# friend-01 동일
grep -c '"stage": 0' src/data/cases/generated/friend-01.json
grep -c '"stage": 1' src/data/cases/generated/friend-01.json
grep -c '"stage": 2' src/data/cases/generated/friend-01.json
grep -c '"stage": 3' src/data/cases/generated/friend-01.json

# viewerDataByStage 키 확인
grep -c '"viewerDataByStage"' src/data/cases/generated/family-01.json
grep -c '"viewerDataByStage"' src/data/cases/generated/friend-01.json

# spouse-01과 값 분포 일치 확인
grep -c '"stage":' src/data/cases/generated/spouse-01.json
grep -c '"stage":' src/data/cases/generated/family-01.json
grep -c '"stage":' src/data/cases/generated/friend-01.json
```

3사건 모두 "stage":가 동일 카운트여야 함.

### 4. 타입 체크

```bash
npx tsc -b --force
```

에러 없이 통과 필수.

### 5. 헤드리스 회귀

```bash
node tests/run-84-headless.cjs --category family --case family-01
node tests/run-84-headless.cjs --category friend --case friend-01
node tests/run-84-headless.cjs --category spouse --case spouse-01
```

3사건 모두 런타임 에러 없이 완주 확인.

### 6. diff 확인

```bash
git diff --stat src/data/cases/generated/
git diff src/data/cases/generated/family-01.json | head -100
```

예상 변경: stage 값 숫자만 + viewerDataByStage 키만. **다른 필드가 변경되었다면 문제** → rollback + CT 보고.

---

## 산출물

`tmp/renumber-family-friend-report.md` 작성:

```markdown
# Family/Friend Stage 재넘버링 결과

## 치환 건수
- family-01.json: stage 필드 {n}건 + viewerDataByStage 키 {m}건 = 총 {n+m}건
- friend-01.json: stage 필드 {n}건 + viewerDataByStage 키 {m}건 = 총 {n+m}건

## 사전 확인 (stage 참조 하드코딩)
- `grep "stage === 0" src/`: {없음 | 있음: 위치/파일/라인}
- 그 외 하드코딩: {없음 | 상세}
- CT 보고 필요: {예/아니오}

## 검증
- stage 값 분포 (post): family-01 {1=7/2=7/3=7} / friend-01 {동일}
- spouse-01과 값 분포 일치: ✓/✗
- tsc -b --force: ✓/✗
- 헤드리스 family-01: ✓/✗
- 헤드리스 friend-01: ✓/✗
- 헤드리스 spouse-01 (회귀): ✓/✗

## diff 요약
- 변경 파일: 2
- 변경 라인 수: family {N} / friend {N}
- 의도 외 변경: {없음 | 상세}

## 이슈
- {없음 | 상세}

## 후속
- CT 커밋 대기
```

---

## 수정 권한

- **family-01.json / friend-01.json 직접 수정 OK**
- **코드(TS/TSX) 수정 금지** — stage 하드코딩 참조 발견 시 CT 보고만
- **tmp/\*.cjs 스크립트 생성 OK** — 작업 후 **반드시 제거** (git 미추적 상태로)
- **커밋 금지** — CT가 일괄 커밋

---

## 예상 소요

- 순수 작업: 10~15분
- 검증 포함: 20~30분

---

## 참고

- spouse-01 참조: `src/data/cases/generated/spouse-01.json` (이미 1/2/3 체계, 2026-04-24 적용)
- [memory/backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) — 1순위 항목
- [memory/session_handoff_20260428.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\session_handoff_20260428.md) — 1순위 지시

---

## 시작 체크리스트

- [ ] `git status` clean 확인
- [ ] spouse-01.json의 stage 분포가 1/2/3 체계임을 확인 (레퍼런스)
- [ ] 이 문서 정독
- [ ] 절차 0부터 순차 진행
- [ ] 완료 후 산출물 작성 + CT에 커밋 요청
