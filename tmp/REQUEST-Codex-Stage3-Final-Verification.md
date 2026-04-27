# REQUEST — Stage 3 Final Verification (Stage 2 application 세션 안에 통합)

**상태**: **별도 의뢰서 X / 절차 문서**. Stage 3 = auto-closed by Stage 1 cross-effect (`6d18c63` 시점 P0-surface-name-gate 0 검증 완료). 본 문서는 **Stage 2 application 세션 안에서 수행되는 final verification 절차 + 재오염 시 fallback 절차**를 정리합니다.

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**연계 의뢰서**: `tmp/REQUEST-Codex-Stage2-Application-P0-Disclosure-Gate.md`
**상태 자료**: `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` (auto-closed v2 / skeleton 보존)

---

## 1. 본질

Stage 3은 **별도 patch session으로 진입하지 않습니다**. 다음 세 가지 검증이 Stage 2 application 세션 안에서 final verification으로 수행됩니다.

### 1.1 처리 결정 (사용자 결정 (a) + (α) 정합)
- (a) Stage 1 cross-effect로 자동 닫힘 인정 / 별도 patch X / final verification 단계로 전환
- (α) Final tag = Stage 2 commit에 동시 발행 (`baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3`)

### 1.2 검증 본질
- **Stage 2 patch 적용 후 P0-surface-name-gate가 여전히 0인지** — Stage 2 patch가 surface 영역을 재오염하지 않았는지 확인
- **재오염 detection 시 즉시 fallback 절차** — Stage 3 skeleton + dataset 재활성화 + 별도 patch session 진입 결정

---

## 2. 검증 절차 (Stage 2 application 세션 §6.4 정합)

### 2.1 Stage 2 patch 적용 직후 Gate 재실행

```bash
node scripts/qa-runtime-gate.cjs
```

`tmp/qa-runtime-gate-results/findings.json` 분석:

| 검증 항목 | 종료 조건 | 처리 |
|---|---|---|
| **P0-surface-name-gate** | **0 유지** | PASS — final tag 발행 진행 |
| 위 조건 위반 (>0 newly added) | FAIL | **즉시 중단 + §3 fallback 절차** |
| P0-evidence-stage-gate | 0 유지 (Stage 1 보존) | 추가 검증 |
| P0-disclosure-gate | 87 → 0 (Stage 2 본 영역) | Stage 2 종료 조건 |

### 2.2 검증 명령 (간단 inline)

```bash
node -e "
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('tmp/qa-runtime-gate-results/findings.json', 'utf8'));
const sn = items.filter(f => f.patchPriority === 'P0-surface-name-gate');
const es = items.filter(f => f.patchPriority === 'P0-evidence-stage-gate');
const dg = items.filter(f => f.patchPriority === 'P0-disclosure-gate');
console.log('P0-surface-name-gate:', sn.length, '(expect 0)');
console.log('P0-evidence-stage-gate:', es.length, '(expect 0)');
console.log('P0-disclosure-gate:', dg.length, '(expect 0)');
if (sn.length > 0 || es.length > 0 || dg.length > 0) process.exit(1);
console.log('FINAL VERIFICATION PASS');
"
```

PASS 조건: `P0-surface-name-gate = 0` + `P0-evidence-stage-gate = 0` + `P0-disclosure-gate = 0`.

### 2.3 PASS 시 final tag 발행 (Stage 2 application 의뢰서 §6.5 정합)

```bash
git tag baseline-pre-policy-v3            # final tag (Stage 1/2/3 closing 누적)
git push origin baseline-pre-policy-v3
```

CT-Main 보고에 **Stage 3 final verification PASS** 명시.

---

## 3. Fallback 절차 (P0-surface-name-gate 재오염 시)

### 3.1 즉시 중단 항목
- Stage 2 commit 진행 중이면 **commit 직전 단계에서 중단** (commit 미실행)
- final tag 발행 진행 X
- Codex-Dev → CT-Main 즉시 보고

### 3.2 보고 내용
- 재오염된 P0-surface-name-gate finding (id / sourcePath / matchedLexemes / actual)
- Stage 2 patch 적용 항목 중 surface 영역에 영향을 준 것으로 의심되는 finding (cluster ID + sourcePath 매핑)
- Gate 출력 비교: Stage 2 적용 전 (0) vs 적용 후 (>0)

### 3.3 CT-Main 결정 단계
1. 재오염 분석 (Stage 2 patch가 어떤 영역에서 surface name 영역을 깨뜨렸는지)
2. 결정 옵션:
   - **(F-1) 재오염 finding이 소수 (<5)** — Stage 2 patch에서 해당 항목만 정정 → 재적용 → final verification 재실행
   - **(F-2) 재오염 finding이 다수 (≥5) 또는 cluster 단위** — Stage 3 skeleton + dataset 재활성화 → 별도 GPT Pro Stage 3 의뢰서 작성 (auto-closed 표시 → 활성 의뢰서로 변환) → Codex-Dev Stage 3 application 세션 진입
3. 결정 후 본 문서를 활성 Stage 3 의뢰서로 승격하거나, Stage 2 patch 정정으로 closing

### 3.4 Stage 3 skeleton + dataset 재활성화 자료 (F-2 진입 시)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` (auto-closed v2 → §1 본질 / §3 cluster / §6 schema 그대로 사용)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate-dataset.json` (23 items / 3 cluster / `evidenceReference` 포함)
- 재오염 finding 추가 시 dataset 갱신 필요

---

## 4. 검증 결과 기록 (application log 안)

`tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md` 마지막 섹션에 다음 추가:

```markdown
## Final Verification (Stage 3 auto-closed status check)

- Stage 2 application 직후 Gate 재실행: PASS / FAIL
- P0-surface-name-gate findings: 0 (expect 0)
- P0-evidence-stage-gate findings: 0 (Stage 1 preserved)
- P0-disclosure-gate findings: 0 (Stage 2 closed)
- Final tag baseline-pre-policy-v3 published: yes / no
- Notes: <재오염 발생 시 finding 영역 / fallback 결정>
```

---

## 5. 검증 후 처리 (PASS 정합)

- Stage 2 application 의뢰서 §10 종료 조건 모두 PASS
- `baseline-pre-policy-v3` final tag 발행 (Stage 2 commit과 동시)
- CT-Main 보고
- **Final P0 closing 종료**

---

## 6. 후속 (CT 영역)

본 final verification 결과 PASS 후:
1. Full Fast Test Finalization 의뢰서 진입 (`tmp/REQUEST-Codex-Full-Fast-Test-Finalization.md`)
2. `6643035` spouse-01 단독 의뢰서 superseded 표시 commit
3. P1 / P2 트랙 의뢰서 작성
4. RC4 진입 결정 (현재 옵션 (ii) / Phase B-3 P1 reclassify로 closing)
5. wip branch cleanup (사용자 승인 후)

---

## 7. 절대 회피선

- 본 문서 = 절차 정리 / 별도 Codex-Dev 세션 진입 X (Stage 2 안에 통합)
- F-2 진입 결정 없이 Stage 3 patch 임의 진행 X
- 재오염 무시한 final tag 발행 X (반드시 Gate 재실행 PASS 후)

---

## 8. 관련 자료

- `tmp/REQUEST-Codex-Stage2-Application-P0-Disclosure-Gate.md` (Stage 2 application — 본 verification은 §6.4 안에서 수행)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` (auto-closed v2 / dataset 재활성화 자료)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate-dataset.json` (재오염 시 재사용)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` (Stage 1 log)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md` (Stage 2 log + final verification 결과)
- `tmp/qa-runtime-gate-results/findings.json` (`6d18c63` baseline / Stage 2 적용 후 갱신)

---

**상태**: Stage 3 final verification 절차 정리 완료. 별도 Codex-Dev 세션 진입 X / Stage 2 application 안에서 검증 수행. PASS 시 final tag 발행 / FAIL 시 fallback 절차 (F-1 또는 F-2).
