# Codex 의뢰 — 진실 누설 70건 P0 즉시 fix (실시간 대응)

## 작업 목표
**3 사건 통합본의 재판관 채널 진실 누설 70건 즉시 수정 + 빌드/tsc 검증**.

## 게임 핵심 원칙 (절대 준수)

> **"진실은 플레이어가 직접 밝혀낸다"** — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 됨.

재판관이 dossier 카드 발동 시 진실 콘텐츠 직접 언급 = 게임 진행 무의미해짐.

## 누설 70건 위치
- 상세: `tmp/truth-leak-detection.json`
- spouse-01: 65건 (judge_evidence_combo 44 / judge_question 10 / judge_contradiction 10 / judge_witness_summon 1)
- family-01: 1건 (judge_question 1) — aftermath 8은 OK (판결 후 narrative)
- friend-01: 4건 (judge_question 2 / judge_evidence_combo 1 / judge_witness_summon 1) — aftermath 1은 OK

## 사용자 지적 잘못 4가지 (절대 회피)

```
❌ "GPS 좌표와 형의 문자 내용을..." → "형 문자" = e-4 진실 노출
❌ "GPS와 형 문자 스레드가..." → 동일
❌ "형과 조카 쪽으로 맞물립니다." → "형/조카" 진실 직접 언급
❌ "GPS 좌표와 형 문자 앞에서는..." → 동일
```

## 사건별 surfaceName 매핑 (재판관 발화 시 surface만 사용)

### spouse-01
| ID | ✅ surface (사용 OK) | ❌ 진실 (재판관 언급 X) |
|---|---|---|
| e-1 | 영수증 묶음 5장 | (조카 학용품 등) |
| e-2 | 블랙박스 GPS 기록 | (오피스텔 주소) |
| e-3 | 통화기록 | (형과의 새벽 통화) |
| **e-4** | **발신자 미상 문자** | **형 문자 / 조카 학교 알림** ★ 가장 자주 누설 |
| e-5 | 개인 계좌 출금 내역 | (이준호 비자금) |
| e-6 | 투자방 카톡 기록 | (박지연 사기) |
| e-7 | 공동 적금 해지 서류 | (위임장 조작) |

추가 금지 키워드 (재판관 발화 시):
- "형", "조카", "친형", "돌봄", "가족을 돌본", "가족 사정"
- "위임장 조작", "투자 사기", "형 빚"

### family-01
- e-7 surface = "어머니 일기장" / 진실 = "출생 비밀 (A 배다른 자식)"
- 재판관 발화에 "출생 비밀", "배다른", "혈연 다른" X
- "20년 동안 B 돈" / "정후 돈으로 어머니" X (S3+ NPC 자백 전)

### friend-01
- 재판관 발화에 "예비신랑이 먼저", "아버지의 사기", "아버지 돈 갈취", "같은 패턴 반복" X
- e-1 surface = "연락 기록" / 진실 = "B→예비신랑 9일 6번 11번"

## dossier 카드 의미 가이드 (judge_evidence_combo)

dossier 카드 = 두 증거 조합으로 드러나는 **진실의 방향성**. 재판관은 그 진실을 "추궁의 단서"로만 사용 — 답은 NPC에게.

### spouse-01 dossier
| 카드 | 의미 (진실) | 재판관 가능한 표현 |
|---|---|---|
| dc-1 | 오피스텔의 사람들 (=형+조카) | ✅ "두 자료가 같은 시각 같은 장소를 가리킵니다. 그 안에 누가 있었는지 들려주시겠습니까." |
| dc-2 | 시댁 얘기만 나오면 싸움 (=시댁 갈등 두려움) | ✅ "두 자료를 합치면 단순 연락이라 보기 어렵습니다. 가족 안에서 무엇이 어렵게 만들었는지 답해 주십시오." |
| dc-3 | 3,000만원의 권한 (=위임장 조작) | ✅ "두 자료가 큰돈 흐름의 권한을 묻게 만듭니다. 그 권한이 어디서 왔는지 밝혀 주십시오." |
| dc-4 | 2,000만원의 수치 | ✅ "두 자료가 한 사람의 큰돈 사용을 가리킵니다. 그 쓰임을 답해 주십시오." |
| dc-5 | 5,000만원의 순서 | ✅ "두 자료가 두 큰돈의 선후를 묻게 만듭니다. 어느 쪽이 먼저였는지 들려주시겠습니까." |

### family-01 dossier (case data 확인 후)
- **출생 비밀 / 60→40 동기 직접 언급 X**

### friend-01 dossier
- **아버지 돈 갈취 / 같은 패턴 반복 직접 언급 X**

## 보정 패턴 가이드

### Before / After 변환 원칙
1. evidence 진실 호칭 → surface 호칭
   - "형 문자 스레드" → "발신자 미상 문자"
   - "형의 문자 시각" → "그 문자의 시각"
   - "투자방 카톡" → 그대로 (surface와 일치)

2. 진실 콘텐츠 직접 언급 → 추상화 (NPC가 답하도록)
   - "형과 조카 쪽으로 맞물립니다" → "두 자료가 같은 가족 영역을 가리킵니다"
   - "가족을 돌본 것이라고" → "그 자리에서 누구를 위해 있었는지"
   - "위임장 조작 의심" → "큰돈 처리 절차의 의심"
   - "출생 비밀" → "가장 민감한 사정"
   - "예비신랑이 먼저" → "그 메시지의 선후"
   - "아버지의 돈 문제" → "송금 흐름의 출처"

3. NPC archetype voice 보존, 재판관은 합니다체 자연체

## 작업 절차 (실시간 대응)

### 1단계: 누설 entries 정독
- `tmp/truth-leak-detection.json` 정독
- 각 entry의 hits 패턴 + 사건 + 채널 + lieState 확인

### 2단계: 사건별 처리
- spouse-01 65건: 가장 큰 작업 (judge_evidence_combo 44 + 다른 채널)
- family-01 1건: judge_question 1
- friend-01 4건: judge_question/combo/witness_summon

### 3단계: 보정 적용
- `src/data/scriptedText/{caseId}.json` 직접 수정
- variant id 매칭 → text 교체
- behaviorHint / tags / sourceRefs 보존

### 4단계: 자동 검증 + 빌드
```bash
node tmp/detect-truth-leak.cjs   # 누설 0건 확인
node tmp/precheck-matrix.cjs     # 매트릭스 정합 확인
npm run build                     # 빌드 통과
npx tsc -b --force                # tsc 통과
```

### 5단계: 산출물 저장
- 적용 결과 통계: `tmp/codex-truth-leak-fix-result.json`
- 변경된 70건 list (before/after) 포함

## 9차원 검토 가이드

각 patch 작성 시:

1. **의미** — 진실 누설 X + NPC가 답할 여지 보존
2. **archetype voice** — 재판관 = 합니다체 + 정중
3. **lieState 호환** — judge_question/contradiction은 NPC lieState 무관 (재판관 항상 진실 알지만 안 말함)
4. **사용자 모범 4 patch** 일관 적용:
   - 1: "쪽이었는데" → "주장이었는데"
   - 2: "무엇을 알고" → "왜 그렇게 확신하고"
   - 3: "흐리면" → "밝히지 않으면"
   - 4: 명사형 → 동사형 자연체

## 잘못 패턴 #1~#9 (절대 회피)

(기존 #1~#8 + 추가)

**#9 (NEW) 진실 누설 금지** — 게임 핵심 원칙 위반.
- 재판관 / 시스템 메시지 / dossier 안내 등에서 NPC 자백 전 진실 콘텐츠 직접 언급 X
- evidence는 surfaceName만 사용
- dossier 카드 의미는 추상화

## 출력 포맷

### 산출물 1: `src/data/scriptedText/{caseId}.json` 직접 수정 (70건 text 교체)

### 산출물 2: `tmp/codex-truth-leak-fix-result.json`
```json
{
  "generatedAt": "...",
  "totalFixed": 70,
  "byCase": {
    "spouse-01": 65, "family-01": 1, "friend-01": 4
  },
  "byChannel": { ... },
  "patches": [
    {
      "caseId": "...",
      "channel": "...",
      "id": "...",
      "before": "...",
      "after": "...",
      "leakPatterns": ["e4_real:형 문자"],
      "rationale": "..."
    }
  ],
  "verification": {
    "truthLeakAfter": 0,
    "buildPass": true,
    "tscPass": true
  }
}
```

### 산출물 3: `tmp/codex-truth-leak-fix-summary.md`
- 사건별 통계 + 채널별
- 대표 patch 10건 (before/after)
- 적용 검증 결과

## 검증 체크리스트 (제출 전 필수)

- [ ] **누설 0건** (`node tmp/detect-truth-leak.cjs` 결과 0건)
- [ ] 70건 모두 수정 (1건도 누락 X)
- [ ] evidence surfaceName만 사용 (진실 호칭 X)
- [ ] dossier 카드 의미 추상화 (직접 언급 X)
- [ ] 사용자 모범 4 patch 패턴 일관
- [ ] 변수 치환 패턴 0건 유지 (이전 작업 결과 보존)
- [ ] 사건 설정 정확 (family A 40/B 60 등)
- [ ] 호칭 ("증인 씨", "제 아내" 등) 위반 0건
- [ ] 깨진 조사 0건
- [ ] 빌드 + tsc 통과

## 참고 메모리

- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` — 사건 핵심 스토리
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md` — 사용자 모범 4 patch
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md` — 한국어 품질
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md` — 잘못 패턴 #1~#8
- `CLAUDE.md` — 게임 핵심 원칙 ("진실은 플레이어가 직접 밝혀낸다")
- `src/data/cases/generated/{caseId}.json` — case data (evidence surfaceName / disputes / dossierCards)
- `src/data/scriptedText/{caseId}.json` — 통합본 (수정 대상)
