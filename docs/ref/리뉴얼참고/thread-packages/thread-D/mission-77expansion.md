# Thread D — Phase 1/2 스크립트 교정 77건 확장 미션

> 작성: 2026-04-05 (CT)
> 선행: Stage-1 7건 PASS (correction-log.md 참조)
> 규모: 77건 x 2 Phase = **154파일**
> 도구: GPT Pro (구조 검증 + 교정) + Claude Code (톤 검수)

---

## 1. 미션 개요

Phase 1과 Phase 2는 게임 시작 시 NPC가 자동 재생하는 사전 스크립트다.
플레이어가 아무 조사도 하지 않은 시점이므로, **여기서 진실이 노출되면 게임이 시작도 전에 끝난다.**

| Phase | 역할 | 톤 수위 |
|-------|------|---------|
| Phase 1 | 양측 초기 진술. 아직 격하지 않은 톤. 표면적 갈등만. | 낮음 |
| Phase 2 | 상대 진술을 듣고 반박. Phase 1보다 감정 상승. | 중간 |

Phase 1 → Phase 2로 감정이 올라가는 **자연스러운 곡선**이 필요하다.

### 작업 규모
- 77건 x 2 Phase = **154파일**
- 파일 위치: `src/data/dialogues/phase1/{case}.json`, `src/data/dialogues/phase2/{case}.json`
- 대상: spouse-02~12, family-02~12, friend-02~12, neighbor-02~12, partnership-02~12, tenant-02~12, workplace-02~12

---

## 2. 교정 기준

### 2-1. 스포일러 방지 (최우선)

각 사건의 `disputes[].anchorTruth`에서 **핵심 키워드**를 추출한 뒤, Phase 1/2 대사에서 검출하면 교정한다.

핵심 키워드 = **인물 실명, 기관 정식명칭, 서비스명, 정확한 금액/날짜**

| Before | After | 사유 |
|--------|-------|------|
| "280만원을 몰래 보냈잖아" | "큰돈을 몰래 보냈잖아" | 정확한 금액 |
| "재가돌봄센터에 예약했다며?" | "어딘가에 예약했다며?" | 기관명 |
| "최민정에게 송금한 거" | "어떤 사람에게 송금한 거" | 인물 실명 |
| "3월 7일에 이체된" | "며칠 뒤 이체된" | 정확한 날짜 |
| "브리지 투자 예치금" | "외부 검토 비용" | 서비스명 |

**일반 어휘(사진, 기록, 환급, 이체 등)는 허용** — anchorTruth의 핵심 결론 키워드만 제거.

### 2-2. 톤 규칙

| 화자 → 대상 | 톤 | 예시 |
|-------------|-----|------|
| 당사자 → 재판관 | **합니다체** | "~입니다", "~했습니다" |
| 당사자 → 상대방 | **반말** | "~했잖아", "~한 거 아니야?" |
| 재판관 → 당사자 | **합니다체** (중립, 사무적) | "~하셨습니까" |
| 시스템 메시지 | 중립, 3인칭, ~다체 | "갈등이 시작된다" |

**금지**: 해요체 전면 금지 (~에요, ~해요, ~거예요, ~했어요, ~있어요, ~같아요, ~됐어요, ~잖아요, ~인가요, ~할게요)

> Stage-1에서 해요체 52건 교정됨. GPT 생성 Phase 1/2에서 **일관적으로** 나타나므로 77건에도 대량 발생 예상.

### 2-3. 호칭 규칙

| 카테고리 | 재판관에게 말할 때 | 상대에게 직접 |
|---------|-----------------|-------------|
| spouse | "제 남편/아내" | callTerms.toPartner ("자기" 등) |
| family | "제 형/동생/어머니" | 이름 또는 관계 호칭 |
| friend | "제 친구" | callTerms.toPartner (이름+"야/아") |
| neighbor | "옆집 분" | callTerms.toPartner |
| partnership | "제 동업자" | callTerms.toPartner |
| tenant | "집주인분/세입자분" | callTerms.toPartner |
| workplace | "제 팀장/팀원" | callTerms.toPartner |

**주의: 재판관이 당사자를 언급할 때는 절대 "제 아내/남편" 사용 금지 → "한지석 씨", "오세린 씨" 형태만**

호칭은 각 사건 case JSON의 `duo.partyA.callTerms`, `duo.partyB.callTerms`에서 확인.

### 2-4. 한국어 품질

#### 번역체 9패턴 — 0건 필수
1. ~했던 것이다
2. ~한 바 있다
3. ~인 것으로 보인다
4. ~것으로 확인된다
5. ~할 수 있을 것이다
6. ~라고 할 수 있다
7. ~에 해당한다
8. ~인 것으로 판단된다
9. ~인 것으로 사료된다

#### 기타 금지
- "사전 상의/협의" 0건 (S0-S2 맥락에서)
- "특정 X" 금지 ("특정 기관", "특정 인물" 등)
- 조사 정합성 (받침 유무 확인: 은/는, 이/가, 을/를, 과/와)

### 2-5. 맥락 규칙

- **Phase 1**: 표면적 갈등만. 핵심 진실은 숨긴 채 각자 입장 요약. "무엇이 있었는지"는 숨기되, "어떤 기분인지"는 보여준다.
- **Phase 2**: 상대 진술에 대한 반박. Phase 1보다 감정 상승 허용. 하지만 여전히 핵심 진실은 노출 금지.
- Phase 1 → Phase 2로 **감정이 올라가는 자연스러운 곡선** 필요.

---

## 3. GPT Pro 프롬프트 (복사 가능)

```
너는 솔로몬 법정 게임의 Phase 1/2 스크립트 교정 전문가다.
각 사건의 Phase 1(초기 진술)과 Phase 2(반박 진술)를 검수하고 교정해.

[입력]
1. 사건 case JSON (disputes, anchorTruth, duo.partyA/B의 callTerms)
2. Phase 1 스크립트 JSON
3. Phase 2 스크립트 JSON

[교정 기준]
1. anchorTruth 핵심 키워드(인물 실명, 기관명, 서비스명, 정확 금액, 정확 날짜) → 추상 표현으로 교체
2. 재판관 대상: 합니다체 필수 (~습니다, ~입니다, ~겠습니다)
3. 당사자 간: 반말 유지 (~했잖아, ~한 거 아니야?)
4. 호칭: case JSON의 callTerms 참조
5. 해요체 전면 금지 (~에요, ~해요, ~거예요, ~했어요, ~있어요, ~같아요, ~됐어요, ~잖아요, ~인가요, ~할게요)
6. 번역체 9패턴 금지 (했던 것이다, 한 바 있다, 인 것으로 보인다, 것으로 확인된다, 할 수 있을 것이다, 라고 할 수 있다, 에 해당한다, 인 것으로 판단된다, 인 것으로 사료된다)
7. "사전 상의/협의" 금지
8. "특정 X" 금지 ("특정 기관", "특정 인물" 등)
9. 재판관은 절대 "제 아내/남편" 사용 금지 → "OOO 씨" 형태만
10. Phase 1(감정 낮음) < Phase 2(감정 높음) 수위 자연스러운 곡선

[출력 형식]
교정된 Phase 1 JSON + Phase 2 JSON + corrections 배열:
[
  { "phase": 1, "lineIndex": 3, "before": "...", "after": "...", "reason": "스포일러-금액" },
  { "phase": 2, "lineIndex": 1, "before": "...", "after": "...", "reason": "해요체" },
  ...
]

reason 카테고리: 스포일러-금액, 스포일러-인물명, 스포일러-기관명, 스포일러-날짜, 스포일러-서비스명, 스포일러-anchorTruth직접노출, 해요체, 번역체, 호칭, 특정X, 사전상의, 톤수위, 자연스러움

지금부터 사건을 보내줄게. Phase 1과 Phase 2를 같이 보낼 거야.
```

---

## 4. 배치 순서

7건씩 (Phase 1 + Phase 2 = 14파일/배치), 총 11배치.

| 배치 | 사건 | 파일 수 |
|------|------|---------|
| 1 | spouse-02 ~ spouse-08 | 14파일 |
| 2 | spouse-09 ~ spouse-12, family-02 ~ family-05 | 14파일 |
| 3 | family-06 ~ family-12 | 14파일 |
| 4 | friend-02 ~ friend-08 | 14파일 |
| 5 | friend-09 ~ friend-12, neighbor-02 ~ neighbor-05 | 14파일 |
| 6 | neighbor-06 ~ neighbor-12 | 14파일 |
| 7 | partnership-02 ~ partnership-08 | 14파일 |
| 8 | partnership-09 ~ partnership-12, tenant-02 ~ tenant-05 | 14파일 |
| 9 | tenant-06 ~ tenant-12 | 14파일 |
| 10 | workplace-02 ~ workplace-08 | 14파일 |
| 11 | workplace-09 ~ workplace-12 | 8파일 |

**각 배치 입력**: case JSON + Phase 1 JSON + Phase 2 JSON (사건당 3파일)

---

## 5. 작업 흐름

### Step 1: GPT Pro에 배치 전달
- 섹션 3의 프롬프트 + 사건 3파일(case, phase1, phase2) 전달
- 7건씩 한 세션

### Step 2: GPT Pro 교정 결과 수령
- 교정된 Phase 1/2 JSON + corrections 배열

### Step 3: Claude Code 톤 검수
- 기계 검증 grep 실행 (섹션 6 참조)
- 수동 검수: 교정 후 대사가 자연스러운지, 캐릭터 성격에 맞는지

### Step 4: 파일 적용
- 교정된 JSON을 `src/data/dialogues/phase1/`, `phase2/`에 저장

### Step 5: 배치별 체크리스트 확인 (섹션 6)

---

## 6. 검증 체크리스트

### 매 배치 완료 시 확인

- [ ] anchorTruth 핵심 키워드 0건 (일반 어휘 허용, 핵심 결론만 제거)
- [ ] 재판관 대상 합니다체 100%
- [ ] 당사자 간 반말 유지
- [ ] 해요체 잔존 0건
- [ ] 호칭 callTerms 일치
- [ ] 번역체 9패턴 0건
- [ ] "사전 상의/협의" 0건
- [ ] "특정 X" 0건
- [ ] Phase 1 < Phase 2 감정 수위 자연스러운 상승
- [ ] 재판관이 "제 아내/남편" 사용 0건
- [ ] 교정 후 대사 자연스러움 (비어버리지 않았는지)

### 기계 검증 grep 패턴

```bash
# 해요체 검출
grep -n "에요\|해요\|거예요\|했어요\|있어요\|같아요\|됐어요\|셨어요\|인가요\|건가요\|한데요\|할게요\|잖아요\|없어요" src/data/dialogues/phase1/{batch}.json src/data/dialogues/phase2/{batch}.json

# 번역체 9패턴
grep -n "했던 것이다\|한 바 있다\|것으로 보인다\|것으로 확인된다\|수 있을 것이다\|라고 할 수 있다\|에 해당한다\|것으로 판단된다\|것으로 사료된다" src/data/dialogues/phase1/{batch}.json src/data/dialogues/phase2/{batch}.json

# "특정 X" 패턴
grep -n "특정 " src/data/dialogues/phase1/{batch}.json src/data/dialogues/phase2/{batch}.json

# "사전 상의/협의"
grep -n "사전 상의\|사전 협의" src/data/dialogues/phase1/{batch}.json src/data/dialogues/phase2/{batch}.json
```

**금지 금액/이름/기관은 사건마다 다르므로**, 각 사건의 anchorTruth에서 키워드를 추출하여 개별 grep 실행.

---

## 7. Stage-1에서 발견된 패턴 (77건 확장 시 주의)

Stage-1 교정 총 ~100건에서 발견된 주요 패턴:

| 패턴 | 빈도 | 심각도 | 예상 재발률 |
|------|------|--------|-----------|
| anchorTruth 직접 노출 | 2건 | CRITICAL | 높음 |
| 금지 인물명 등장 | 3건 | HIGH | 중간 |
| 구체적 금액 노출 | ~25건 | HIGH | 높음 |
| 기관명/서비스명 노출 | ~8건 | HIGH | 높음 |
| 구체적 날짜/시간 노출 | ~10건 | MEDIUM | 높음 |
| 해요체 잔존 | ~52건 | MEDIUM | 매우 높음 |

---

## 8. 참고: 기준본 (Stage-1 교정 완료본)

| 파일 | 비고 |
|------|------|
| `src/data/dialogues/phase1/spouse-01.json` | ~10대사, 65줄 |
| `src/data/dialogues/phase2/spouse-01.json` | ~7대사, 64줄 |
| `src/data/dialogues/phase1/family-01.json` | 교정 완료 |
| `src/data/dialogues/phase1/friend-01.json` | 교정 완료 |
| `src/data/dialogues/phase1/neighbor-01.json` | 교정 완료 |
| `src/data/dialogues/phase1/partnership-01.json` | 교정 완료 |
| `src/data/dialogues/phase1/tenant-01.json` | 교정 완료 |
| `src/data/dialogues/phase1/workplace-01.json` | 교정 완료 |
| 교정 내역 상세 | `thread-packages/thread-D/correction-log.md` |

---

## 9. 산출물

- 154파일 교정 완료 (`src/data/dialogues/phase1/*.json`, `phase2/*.json`)
- 배치별 corrections 배열 (교정 내역 추적용)
- 완료 후 CT에 보고: 총 교정 건수 + CRITICAL 발견 건수 + 기계 검증 결과
