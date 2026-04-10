# CT: GPT 리뷰 후속 — 스레드 E + 스레드 A 조율

> 발신: CT
> 수신: 스레드 E (기획), 스레드 A (생성)
> 일시: 2026-04-09

---

## 상황 정리

### GPT 리뷰 결과
- KEEP 75 / DEVELOP 23 / DROP 2
- Wave A 10건: **전부 KEEP** — 충돌 없음
- DROP 2건: `neighbor-new-10` (공동텃밭 pH센서), `civic-new-07` (1365의 18시간)

### 스레드 A 생성 현황
- Wave A 10건 + Wave B 10건 = **20건 전부 생성 완료** (RuntimeCaseData + ScriptedText)
- 기존 11건 포함 총 **31건**이 파이프라인 통과

### 충돌 지점

| 케이스 | 스레드 A 상태 | GPT 판정 | 조치 |
|--------|:-:|:-:|------|
| Wave A 10건 | 생성 완료 | 전부 KEEP | **유지** |
| Wave B 8건 | 생성 완료 | KEEP 또는 DEVELOP | **DEVELOP은 기획 수정 후 재생성** |
| `neighbor-new-10` | 생성 완료 | **DROP** | **삭제 또는 대체** |
| `civic-new-07` | 생성 완료 | **DROP** | **삭제 또는 대체** |

---

## 스레드 E 지시

### 1. DROP 2건 대체 기획

`neighbor-new-10`과 `civic-new-07`을 **대체할 새 사건 2건**을 기획해 주세요.

대체 기준:
- 같은 카테고리(이웃, 공공/제도)에서
- GPT 리뷰에서 언급된 승격 후보 7건 중 선택하거나, 완전 신규 기획
- 재미 점수 8.0 이상 예상되는 것

### 2. DEVELOP 23건 중 Priority 1 (8건) 수정

GPT 피드백을 반영한 기획 수정을 진행해 주세요. 이미 착수했다면 산출물을 CT에 공유.

수정 완료된 기획서 파일명: `thread-e-develop-priority1-fixes.md` (또는 유사)

### 3. Wave B 내 DEVELOP 케이스 식별

Wave B 10건 중 GPT가 DEVELOP 판정한 케이스가 있으면 **어떤 케이스인지, 무엇을 수정해야 하는지** 명시해 주세요. 스레드 A가 재생성할 때 수정된 기획서를 참조해야 합니다.

산출물: `thread-e-wave-b-develop-list.md`

---

## 스레드 A 지시

### 1. DROP 2건 처리

`neighbor-new-10`과 `civic-new-07`은 **생성 파일을 삭제하지 말고 유지**하되, manifest에서 제외하거나 별도 표시해 주세요. 스레드 E가 대체 기획을 주면 새 caseId로 생성합니다.

### 2. Wave B DEVELOP 재생성 대기

스레드 E가 Wave B 내 DEVELOP 케이스의 수정 기획서를 공유하면, 해당 케이스만 재생성합니다. 수정되지 않은 KEEP 케이스는 현재 생성물 유지.

### 3. DEVELOP Priority 1 생성 대기

스레드 E가 Priority 1 (8건) 수정을 완료하면, CT가 스레드 A에 전달합니다. 이 8건은 기존 Wave A/B와 별도 배치로 생성.

### 4. 현재 생성 완료 20건 검증

이미 생성된 20건의 validator 결과를 일괄 보고해 주세요:
```
node scripts/run-parallel-case-batch.cjs --cases [Wave A+B 20건]
```

---

## 작업 흐름 정리

```
[지금]
  스레드 E: DROP 대체 2건 + DEVELOP P1 8건 수정 + Wave B DEVELOP 식별
  스레드 A: Wave A+B 20건 검증 결과 보고, 대기

[스레드 E 완료 후]
  CT: 수정된 기획서를 스레드 A에 전달
  스레드 A: DEVELOP 케이스 재생성 + DROP 대체 케이스 생성

[전체 완료 후]
  스레드 C: 신규 케이스 포함 상세 테스트
```

---

## 우선순위

| 순서 | 담당 | 작업 |
|------|------|------|
| 1 | **스레드 E** | Wave B DEVELOP 식별 + DROP 대체 기획 |
| 2 | **스레드 E** | DEVELOP P1 8건 수정 |
| 3 | **스레드 A** | Wave A+B 20건 검증 보고 |
| 4 | **스레드 A** | DEVELOP 재생성 + DROP 대체 생성 (E 완료 후) |
