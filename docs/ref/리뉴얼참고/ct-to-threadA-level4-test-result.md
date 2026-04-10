# CT → 스레드 A: Level 4 테스트 결과 — 생성기 수정 필수 항목

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 중요도: **Critical — 28건 중 27건 Level 4 FAIL**
> 관련: `ct-to-threadA-generator-quality-upgrade.md`의 고도화 요청과 함께 참조

---

## 테스트 결과

스레드 C가 28건 전체 126항목 테스트를 완료했습니다.

- Level 1~3, 5: **전부 PASS** — 구조/해금/전이/판결 모두 정상
- **Level 4: 27건 FAIL, 1건 WARN** — 스크립트 품질 미달

---

## FAIL 원인 3가지 (전부 생성기에서 해결해야 함)

### 원인 1: callTerms.toJudge = "상대방" (27/28건)

**현상**: NPC 대사가 `"상대방, 재판관님, 지금 지적된 부분은..."` 식으로 시작.

**원인**: 생성기가 callTerms.toJudge를 모든 케이스에 `"상대방"`으로 고정 설정하고 있음.

**올바른 동작**: 각 케이스의 관계에 맞는 호칭이 들어가야 함:
- 부부: "제 남편이", "제 아내가"
- 직장: "제 팀장이", "제 부하직원이"
- 이웃: "옆집 분이", "윗층 분이"
- 친구: "그 친구가", "도건이가"
- 동업: "제 동업자가", "공동대표가"
- 세입자: "집주인이", "세입자가"
- 의료: "담당 의사가", "환자분이"

**수정 위치**: runtime 생성 시 `duo.partyA.callTerms.toJudge` / `duo.partyB.callTerms.toJudge`에 관계/이름 기반으로 적절한 호칭을 생성. 기획서에 호칭이 명시되어 있으면 그대로, 없으면 관계 유형+이름 기반 자동 생성.

### 원인 2: 템플릿 반복 — variant가 사실상 2~3종 (28/28건)

**현상**:
- `a|d-1|S0|fact_pursuit` 첫 variant가 28건에서 2종뿐
- dossier 첫 variant도 2종뿐 ("상대방, 재판관님, 그 질문은 아직 전제가 너무 앞서 있습니다")
- aftermath 첫 variant는 28건 **전부 동일** ("재판관은 본인 측 책임을 더 무겁게 적습니다...")

**원인**: `build-pilot-scripted-bundle.cjs`의 템플릿이 **사건 고유 내용을 거의 반영하지 않고**, 범용 문장을 채워넣고 있음.

**올바른 동작**: 같은 `S0|fact_pursuit`라도 **각 사건의 쟁점, 증거, 인물 이름, 구체적 상황**이 대사에 반영되어야 함.

예시 — 같은 S0|fact_pursuit이지만 사건마다 달라야 함:
```
tenant-new-01: "보일러 설정 온도를 바꾼 적 없습니다. 앱 기록이 그렇게 나온다면 오류일 수 있습니다."
spouse-new-06: "배아 연장 결정은 둘이 함께 한 겁니다. 제가 일방적으로 중단한 적 없습니다."
workplace-new-02: "스톡옵션 행사 일정은 인사팀에서 안내한 대로 진행한 것뿐입니다."
```

현재: 3개 다 거의 같은 범용 문장.

**수정 방향**:
- 각 사건의 `disputes[].name`, `evidence[].name`, `duo.partyA/B.name`, `meta.emotionalBait` 등을 대사 생성 시 참조
- S0은 해당 쟁점의 핵심 주장을 부정하는 내용
- S2는 해당 쟁점에 대한 구체적 핑계
- S5는 해당 쟁점의 진실을 인정하는 내용
- aftermath는 선택된 솔루션 키에 맞는 후일담

### 원인 3: 증인 full depth 문장 수 부족

**현상**: witness full이 2문장 (기준: 3~5문장)

**수정**: full depth 생성 시 최소 3문장 보장. 증인이 아는 사실을 더 풍부하게 서술.

---

## 추가 이슈

### validator regex 오류

`tests/validate-scripted-text.cjs:25`에 invalid regex SyntaxError가 있어 validator 자체가 실행 불가.

확인 후 수정 부탁합니다.

### VerdictScreen stageMap 누락

`src/components/verdict/VerdictScreen.tsx:198`에서 headline, friend, online, professional, civic 관계 타입이 stageMap에 없어 campaign stage progression이 안 됨.

이건 생성기가 아니라 코드 수정이지만, 확인해 주세요.

---

## 우선순위 (생성기 고도화와 통합)

`ct-to-threadA-generator-quality-upgrade.md`에서 요청한 고도화 + 이번 테스트 결과를 합치면:

| 순서 | 작업 | 테스트 결과 근거 |
|------|------|----------------|
| **1** | **callTerms.toJudge 관계/이름 기반 생성** | 27/28 FAIL의 직접 원인 |
| **2** | **사건 고유 내용 반영 variant 생성** | 28건 템플릿 반복의 직접 원인 |
| **3** | **witness full 3~5문장 보장** | 4-D1 FAIL |
| **4** | **aftermath 사건별 차별화** | 28건 동일 문장 |
| **5** | validator regex 수정 | validator 실행 불가 |
| **6** | 이전 요청의 나머지 (번역체, 해요체, TruthThrottle 강화 등) | 추가 품질 향상 |

**1~4번이 해결되면 Level 4 FAIL의 대부분이 해소됩니다.**

수정 완료 후 기존 28건을 재생성하고, CT가 스레드 C에 재검증을 요청합니다.
그 다음 나머지 72건 생성(`ct-to-threadA-remaining-72-batch.md`)을 진행합니다.
