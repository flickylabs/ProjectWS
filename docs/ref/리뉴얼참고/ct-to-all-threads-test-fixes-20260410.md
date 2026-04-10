# CT → 전체 스레드: 117건 테스트 결과 — 수정 지시 (2026-04-10)

> 117건 테스트에서 **Blocker 3건 + Level 4 전건 FAIL**입니다.
> 구조(Level 1~3, 5)는 거의 PASS. **코드 수정과 생성기 수정이 동시에 필요합니다.**

---

# 스레드 A 지시

## 작업 1: scripted 채널 확장 — dossier/investigate/trust/mediation (Critical)

현재 `tryScriptedDialoguePath()`에서 **question과 evidence_present만** scripted 경로를 타고, 나머지는 LLM fallback입니다.

`llmDialogueResolver.ts:1802` 기준, 아래 액션에 대한 scripted 경로가 없습니다:
- `evidence_investigate` (증거 조사)
- `trust_action` (신뢰 행동)
- `call_witness` / witness 응답
- `mediation` (중재)

**scriptedText 번들에 이미 dossier/witness/aftermath/system_message 채널이 있으므로**, 이 채널들을 `tryScriptedDialoguePath()`에 연결해야 합니다.

최소 연결 대상:
```
dossier → evidence_investigate 액션 시 scripted dossier 응답
witness → call_witness 액션 시 scripted witness 응답  
```

trust_action과 mediation은 구조가 다르므로 후순위로 해도 됩니다.

## 작업 2: 생성기 Level 4 핵심 수정

### 4-D6 증인 메타 서술 (117건 FAIL)

**현재**: "증인은 ~ 진술합니다", "증인은 ~ 비교적 또렷하게 설명합니다"
**필요**: 증인이 **직접 1인칭으로 말하는 형태**

```
// 현재 (FAIL)
"재판장님, 관리실 직원 증인은 시점과 경위를 비교적 또렷하게 설명합니다."

// 올바른 형태 (PASS)
"재판장님, 저는 그날 오후 3시쯤 관리실에서 직접 봤습니다. 윗층에서 물이 새기 시작한 건 정확히 그 시간이었습니다."
```

### 4-F8 JSON 필드명 노출 (117건 FAIL)

**현재**: "실제 공장 사고 부분", "폐업 실질적 폐업이었는"
**필요**: 대사에 JSON 데이터 필드가 그대로 삽입되면 안 됨. 자연스러운 한국어 문장으로.

### 4-F10 구어체 부자연스러움 (110건 FAIL)

**현재**: 모든 문장이 완벽한 문어체. "~했습니다. ~입니다. ~였습니다."
**필요**: 법정이지만 **실제 사람이 말하는 톤**. 구어적 흐름, 약간의 말투 변화, 때로는 문장이 자연스럽게 끊기는 것도.

```
// 현재 (부자연스러움)
"해당 사안에 대하여 저는 관련 사실을 인지하고 있었으며, 그에 따른 조치를 취한 것입니다."

// 올바른 형태
"그 부분은... 네, 알고는 있었습니다. 그래서 나름대로 대응을 한 건데, 결과적으로는 부족했던 거죠."
```

### 4-E7/8 증거/dossier 반응 템플릿성

**현재**: 사건명만 바꾼 공통 골격
**필요**: 각 증거의 **구체적 내용**(CCTV면 영상 내용, 채팅이면 채팅 내용)에 대한 반응

## 우선순위

| 순서 | 작업 |
|------|------|
| **1** | dossier/witness scripted 경로 연결 (#1) |
| **2** | 증인 메타 서술 → 1인칭 전환 (4-D6) |
| **3** | JSON 필드명 노출 제거 (4-F8) |
| **4** | 구어체 자연스러움 개선 (4-F10) |
| **5** | 증거/dossier 반응 다양화 (4-E7/8) |

**수정 후 117건 전체 재생성 + validator PASS 확인 후 보고해 주세요.**

---

# 스레드 B 지시

## 작업 1: Phase 3 증거 탭 잠금 (Blocker)

`ActionPanel.tsx:39`의 `isEvidenceLocked()`가 **무조건 false**를 반환하고 있습니다.

PC 핫바(`PCBottomDock.tsx`)에는 `evidencePageLocked`가 이미 있습니다:
```typescript
const evidencePageLocked = !(
  currentPhase === GamePhase.Phase4_Evidence
  || currentPhase === GamePhase.Phase5_ReExamination
)
```

이 로직이 실제 F2 탭 비활성에 반영되고 있는지 확인하세요. 만약 `ActionPanel.tsx`의 `isEvidenceLocked()`가 별도로 존재한다면, PC에서는 사용하지 않는 모바일 잔재일 수 있습니다.

**Phase 1~3에서 F2 증거 탭이 클릭 불가여야 합니다.**

## 작업 2: NPC별 제시 버튼 라벨 (WARN)

`EvidencePresenter.tsx:635`에서 증거 제시 버튼 라벨이 **"제시"**로만 나옵니다.

**변경**: `{partyName}에게 제시` 형태로.

```typescript
// 현재
<button>제시</button>

// 변경
<button>{caseData.duo.partyA.name}에게 제시</button>
<button>{caseData.duo.partyB.name}에게 제시</button>
```

## 우선순위

| 순서 | 작업 |
|------|------|
| **1** | Phase 3 증거 탭 잠금 (#1) — Blocker |
| **2** | NPC별 제시 라벨 (#2) — WARN |

---

# 스레드 C 지시

## 대기

스레드 A와 B의 수정이 또 필요합니다. 특히:
- 스레드 A: dossier/witness scripted 연결 + 생성기 Level 4 수정 + 117건 재생성
- 스레드 B: Phase 3 증거 잠금 + 제시 라벨

**CT가 수정 완료를 확인한 후 재테스트를 요청합니다.**

다음 테스트에서는 위 수정사항이 반영되었는지를 **최우선**으로 확인합니다:
1. Phase 3에서 F2 잠김 확인
2. `[Scripted]` 로그 117건 전부 (dossier/witness 포함)
3. 증인 대사가 1인칭인지
4. JSON 필드명 노출 0건인지
