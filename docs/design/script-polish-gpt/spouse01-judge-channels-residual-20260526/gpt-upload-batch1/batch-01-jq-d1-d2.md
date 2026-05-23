# Batch 1 — judge_question d-1+d-2 자연화 의뢰 (24 entries × 5 variants = 120건)

> 본 file을 진행하기 전 `policy-01-natural-korean.md` 와 `policy-02-truth-disclosure.md` 를 정독해 주세요.

---

## Frame (배경 context)

| 항목 | 값 |
|------|------|
| 채널 | judge_question (재판관 질문) |
| Dispute 범위 | d-1 (외도 추궁) + d-2 (개인 출금 / 비자금 추궁) |
| Target party | 변동 (이준호 씨 / 박지연 씨 / 두 분) |
| Question types | fact_pursuit (사실 추궁) / motive_search (동기 추적) / empathy_approach (공감 접근) |
| Depth | 1 (출발) → 4 (단정·즉시) |
| 추궁 의도 | 재판관이 외도 의심·자금 출금을 단계별 깊이로 추궁. 같은 questionType 안에서 depth가 깊어질수록 강도 ↑ |
| 진실 영역 (미공개) | 이준호 형 자금 문제 / 박지연 위임장 영역 (Batch 1 단계는 진실 노출 전) |
| 회피 hidden 키워드 | 시댁 / 가족 / 집안 / 형 / 회생 / 형사 / 사기 / 횡령 / 범죄 / 위조 (policy-02 참조) |

### 진실 누설 정책 (★ 절대 준수)

- **모든 entry의 모호 referent 보존**: "다른 관련자" / "다른 사정" / "그쪽 일" 등은 hidden 키워드 회피용. polish 시 hidden 단어로 구체화 X
- **본 Batch 1 entries에는 hidden 키워드 직접 등장 entry 없음** — 자연화 polish 위주
- 단 polish 결과에 hidden 단어 신규 도입 절대 X (자가 점검 list 활용)

### tone(depth) 보존 가이드

| depth | 권장 어미 | 강조 |
|-------|---------|------|
| 1 | "...해 주시겠습니까" / "들려주십시오" | 차분 청유, 출발 |
| 2 | "...해 주시겠습니까" / "말씀해 주십시오" | 좁힘, 정황 분리 |
| 3 | "...해 주십시오" / "답해 주십시오" | 단정 시사, 압박 |
| 4 | "...답하십시오" / "밝히십시오" / "지금 답하십시오" | 단정·즉시, 회피 차단 |

→ depth 4 variants는 어미 자연화하면서도 단정 톤 보존 필수.

---

## ★ Batch 1 어색 패턴 사전 진단 (참고)

다음은 잔존 entries에서 발견된 주요 어색 영역 — polish 시 우선 점검:

| ID | 어색 영역 | polish 방향 (예시) |
|----|---------|------------------|
| judgeq-d-1-fact_pursuit-2-v1 | "누구의 사정과 연결돼 있었는지" — 추상 referent 모호 | "그 통화 상대가 누구였는지" 같이 구체 |
| judgeq-d-1-motive_search-1-v1 | "다른 관련자 이야기를 집에서 자연스럽게 꺼내지 못하게 만든 첫 부담" — 어색 직역체 | "그 관련자 이야기를 집에서 꺼내기 어려웠던 가장 큰 부담" |
| judgeq-d-1-motive_search-2-v1 | "장소를 숨긴 일보다 그 뒤의 사정을 밝히는 일이 더 두려웠던 이유" — 직역체 | "장소보다 그 뒤의 사정을 밝히는 게 더 두려우셨던 이유" |
| judgeq-d-1-motive_search-3-v1 | "...사정을 아예 빼두셨습니까" — "빼두다" 어색 | "...사정을 일부러 숨기셨습니까" |
| judgeq-d-2-fact_pursuit-2-v1 | "그 입장 개인 사정 때문이었는지" — 직역체 referent | "그쪽 개인 사정 때문이었는지" / "본인 개인 사정 때문이었는지" (의미 확인) |
| judgeq-d-2-motive_search-1-v1 | "돈 문제를 박지연 씨에게 열지 못하게 만든" — "열다" 어색 | "돈 문제를 박지연 씨에게 털어놓지 못하게 만든" |
| judgeq-d-2-motive_search-1-v3 | "별도 계좌의 목돈 출금을 배우자에게 말하지 않아도 된다고" — 직역체 | "별도 계좌의 목돈 출금을 배우자에게 알리지 않아도 된다고" |
| judgeq-d-2-empathy_approach-1-v1 | "급한 사정이었습니까, 집에 있는 박지연 씨였습니까" — 양극 대비 어색 | "급한 사정 쪽이었습니까, 집에 있는 박지연 씨 쪽이었습니까" |

→ **모든 어색 영역**은 사용자 polish 패턴 (policy-01의 example 13건)을 참고해 자연화. **위 표는 예시일 뿐**이며 모든 entry를 점검 대상.

---

## 변경 대상 entries (24 entries × 5 variants = 120건)

각 entry의 5 variants는 같은 disputeId·questionType·depth 안에서 다양화. variants 간 tone·어미 차이 보존하되 직역체·정중 청유 어미 반복은 자연화 대상.

---

### d-1 · 사실 추궁 (fact_pursuit) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 표면 사실부터 고정한다. 누가 어디를 어떻게 봤는지 기초 순서를 세우는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-fact_pursuit-1-v1 | 이준호 씨, 매장 마감 뒤 차가 오피스텔로 향한 날들을 먼저 시간순으로 들려주시겠습니까. |
| judgeq-d-1-fact_pursuit-1-v2 | 박지연 씨, 같은 오피스텔로 반복된 출입 기록을 확인하고 처음 어떤 생각이 들었는지부터 말씀해 주시겠습니까. |
| judgeq-d-1-fact_pursuit-1-v3 | 두 분, 오피스텔 방문과 새벽 통화가 처음 겹쳐 보인 시점을 각자 차분히 맞춰 주시겠습니까. |
| judgeq-d-1-fact_pursuit-1-v4 | 이준호 씨, 같은 시간대에 같은 건물로 향한 동선이 왜 반복됐는지 먼저 밝혀 주시겠습니까. |
| judgeq-d-1-fact_pursuit-1-v5 | 박지연 씨, 그 동선을 발견하고 바로 외도라고 굳히기 전 어떤 확인을 하셨는지 들려주시겠습니까. |

### d-1 · 사실 추궁 (fact_pursuit) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 정황을 구성하는 세부 조각으로 좁혀 묻는다. 시간과 연락 상대를 분리해 흔들림을 찾는다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-fact_pursuit-2-v1 | 이준호 씨, 새벽마다 같은 번호와 짧게 이어진 통화가 누구의 사정과 연결돼 있었는지 말씀해 주시겠습니까. |
| judgeq-d-1-fact_pursuit-2-v2 | 박지연 씨, 방문 기록을 보고 난 뒤 새벽 통화까지 같은 흐름으로 읽은 과정을 들려주시겠습니까. |
| judgeq-d-1-fact_pursuit-2-v3 | 이준호 씨, 통화 상대를 밝히지 않은 채 장소만 숨기면 오해가 커질 걸 생각하지 않으셨습니까. |
| judgeq-d-1-fact_pursuit-2-v4 | 박지연 씨, 통화 시간과 오피스텔 방문 기록을 맞춰 보면서 다른 방향의 생각을 해보시지는 않으셨습니까. |
| judgeq-d-1-fact_pursuit-2-v5 | 두 분, 같은 번호와 같은 장소가 겹친 날짜를 하나씩 놓고 어디서 해석이 갈렸는지 정리해 주십시오. |

### d-1 · 사실 추궁 (fact_pursuit) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 초반에는 핵심 인물을 직접 요구하지 않고, 물건 구입 사정의 빈틈만 좁힌다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-fact_pursuit-3-v1 | 이준호 씨, 그 물건이 누구에게 필요했는지와 왜 직접 구입해야 했는지 설명해 주시겠습니까. |
| judgeq-d-1-fact_pursuit-3-v2 | 박지연 씨, 그곳에 다른 여성이 있다고 확신하게 만든 장면과 자료를 구분해 말씀해 주시겠습니까. |
| judgeq-d-1-fact_pursuit-3-v3 | 이준호 씨, 그 물건을 사다 준 상대와 이유를 좀 더 자세히 설명해 주시겠습니까. |
| judgeq-d-1-fact_pursuit-3-v4 | 박지연 씨, 발신자 미상 문자까지 확인하고도 외도 의심을 끝내 떨치지 못한 이유가 무엇인지 말씀해 주십시오. |
| judgeq-d-1-fact_pursuit-3-v5 | 두 분, 물건 구입과 오피스텔 동선이 같은 의심으로 묶인 이유를 각자 알고 있는 범위에서만 정리해 주십시오. |

### d-1 · 사실 추궁 (fact_pursuit) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 더는 돌릴 수 없도록 결정적 이유를 묻는다. 숨김과 단정의 최종 근거를 바로 세우려는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-fact_pursuit-4-v1 | 이준호 씨, 개인적인 이유로 오피스텔에 간 것이라면 왜 박지연 씨에게 끝까지 숨기셨는지 답해 주십시오. |
| judgeq-d-1-fact_pursuit-4-v2 | 박지연 씨, 오피스텔 방문과 새벽전화를 발견하고 다른 방향의 생각을 해보시지는 않으셨습니까. |
| judgeq-d-1-fact_pursuit-4-v3 | 이준호 씨, 말하지 못한 사정이 있었다 해도 숨기는 방식이 오히려 외도처럼 보일 수 있다는 점을 알고 계셨습니까. |
| judgeq-d-1-fact_pursuit-4-v4 | 박지연 씨, 막연한 정황이 외도라는 확신으로 굳어진 순간이 언제였는지 되짚어 주시겠습니까. |
| judgeq-d-1-fact_pursuit-4-v5 | 두 분, 한쪽의 숨김과 다른 한쪽의 단정이 어디서 서로를 밀어 올렸는지 지금 분리해서 답해 주십시오. |

### d-1 · 동기 추적 (motive_search) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 사실 자체보다 왜 말을 못 했는지의 입구를 연다. 처음의 주저함을 자극하는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-motive_search-1-v1 | 이준호 씨, 다른 관련자 이야기를 집에서 자연스럽게 꺼내지 못하게 만든 첫 부담이 무엇이었습니까. |
| judgeq-d-1-motive_search-1-v2 | 박지연 씨, 기록을 보고도 바로 묻지 않고 혼자 더 확인하게 된 마음의 순서를 들려주시겠습니까. |
| judgeq-d-1-motive_search-1-v3 | 이준호 씨, 그 일을 그곳에 갔다는 설명이라고 생각하면서도 왜 핵심 사정을 뒤로 미루셨습니까. |
| judgeq-d-1-motive_search-1-v4 | 박지연 씨, 의심이 커지는 동안 이준호 씨에게 묻는 대신 자료를 더 보게 된 이유가 있었습니까. |
| judgeq-d-1-motive_search-1-v5 | 두 분, 말하지 못한 이유와 묻지 못한 이유가 각각 어디서 시작됐는지 먼저 짚어 주십시오. |

### d-1 · 동기 추적 (motive_search) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 숨김과 의심이 커진 직접 원인을 묻는다. 이유를 한 단계 더 구체화하는 흐름이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-motive_search-2-v1 | 이준호 씨, 장소를 숨긴 일보다 그 뒤의 사정을 밝히는 일이 더 두려웠던 이유를 들려주시겠습니까. |
| judgeq-d-1-motive_search-2-v2 | 박지연 씨, 의심을 풀기보다 흔적을 더 찾는 방향으로 마음이 기운 이유를 말씀해 주시겠습니까. |
| judgeq-d-1-motive_search-2-v3 | 이준호 씨, 지난 갈등이 다시 커질까 봐 두려웠던 경험이 이번 침묵에 어떻게 이어졌습니까. |
| judgeq-d-1-motive_search-2-v4 | 박지연 씨, 확인을 거듭할수록 외도라는 결론이 더 단단해진 이유가 무엇이었습니까. |
| judgeq-d-1-motive_search-2-v5 | 두 분, 한 사람은 말하지 않고 한 사람은 묻지 않은 시간이 왜 그렇게 길어졌는지 각각 답해 주십시오. |

### d-1 · 동기 추적 (motive_search) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 관계 안쪽의 공포를 직접 건드린다. 시댁 갈등과 버려질 불안을 각각 말하게 만드는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-motive_search-3-v1 | 이준호 씨, 박지연 씨가 크게 반응할까 봐 다른 관련자의 사정을 아예 빼두셨습니까. |
| judgeq-d-1-motive_search-3-v2 | 박지연 씨, 오피스텔 기록을 볼 때 든 감정은 배신당했다는 분노였습니까, 버려질지 모른다는 불안이었습니까? |
| judgeq-d-1-motive_search-3-v3 | 이준호 씨, 누군가를 챙기는 일이었다면 오히려 말해야 한다는 생각을 어느 순간에도 하지 않으셨습니까. |
| judgeq-d-1-motive_search-3-v4 | 박지연 씨, 이준호 씨의 침묵을 보며 다른 설명을 기다리기보다 외도라고 확신한 이유를 들려주십시오. |
| judgeq-d-1-motive_search-3-v5 | 두 분, 말하지 못한 사정이 부부 사이의 오래된 갈등과 어떻게 맞물렸는지 정리해 주십시오. |

### d-1 · 동기 추적 (motive_search) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 핑계가 아니라 선택의 이유를 묻는다. 왜 그렇게까지 상대를 배제하거나 단정했는지를 정면으로 겨눈다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-motive_search-4-v1 | 이준호 씨, 그곳에 갔다는 설명이라고 해도 박지연 씨에게 끝까지 말하지 않은 책임까지 함께 설명해 주십시오. |
| judgeq-d-1-motive_search-4-v2 | 박지연 씨, 외도라고 믿어야만 그 시간을 버틸 수 있었다면 그 이유가 무엇이었는지 말씀해 주십시오. |
| judgeq-d-1-motive_search-4-v3 | 이준호 씨, 개인적인 사정을 우선한 판단이 배우자에게 설명하지 않는 선택으로 바뀐 지점을 밝혀 주십시오. |
| judgeq-d-1-motive_search-4-v4 | 박지연 씨, 왜 그렇게 확신하고 외도 방향으로 밀어붙였는지 그 마음의 근거를 답해 주십시오. |
| judgeq-d-1-motive_search-4-v5 | 두 분, 각자 두려웠다는 말만으로 상대를 밖에 둔 선택을 덮을 수 있는지 지금 답해 주십시오. |

### d-1 · 공감 접근 (empathy_approach) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 판단보다 감정의 첫 반응을 묻는다. 방어를 조금 낮추고 안쪽 정서를 끌어내는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-empathy_approach-1-v1 | 이준호 씨, 오피스텔 일을 떠올릴 때 가장 먼저 마음에 걸리는 사람이 누구인지 말씀해 주시겠습니까. |
| judgeq-d-1-empathy_approach-1-v2 | 박지연 씨, 그 기록을 처음 본 순간 몸으로 먼저 올라온 감정이 무엇이었는지 차분히 들려주시겠습니까. |
| judgeq-d-1-empathy_approach-1-v3 | 이준호 씨, 다른 관련자의 생활을 챙기던 장면과 집에 돌아와 침묵하던 장면 중 무엇이 더 무겁게 남습니까. |
| judgeq-d-1-empathy_approach-1-v4 | 박지연 씨, 새벽 통화를 들은 뒤 어떤 감정이 들었는지 들려주시겠습니까. |
| judgeq-d-1-empathy_approach-1-v5 | 두 분, 그때 서로에게 말하지 못한 감정이 지금 어떤 오해로 남았는지 한 문장씩 정리해 주십시오. |

### d-1 · 공감 접근 (empathy_approach) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 죄책감과 불안을 시간의 흐름 안에서 묻는다. 감정이 커진 지점을 기억하게 만드는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-empathy_approach-2-v1 | 이준호 씨, 숨긴 뒤 집으로 돌아오면서 죄책감이 올라온 순간이 있었다면 언제였습니까. |
| judgeq-d-1-empathy_approach-2-v2 | 박지연 씨, 기록을 더 확인하면서도 스스로 멈추기 어렵다고 느낀 순간이 있었습니까. |
| judgeq-d-1-empathy_approach-2-v3 | 이준호 씨, 누군가를 도운 것이라는 마음과 박지연 씨를 속였다는 마음이 동시에 올라왔습니까. |
| judgeq-d-1-empathy_approach-2-v4 | 박지연 씨, 이준호 씨에게 묻고 싶으면서도 대답이 더 무서울까 봐 물러선 적이 있었습니까. |
| judgeq-d-1-empathy_approach-2-v5 | 두 분, 상처를 줄까 봐 숨기려던 마음과 상처받지 않으려 확인하려던 마음의 엇갈림에 대해 말씀해 주십시오. |

### d-1 · 공감 접근 (empathy_approach) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 사실 뒤에 눌려 있던 두려움을 직접 건드린다. 관계 붕괴를 무서워한 마음을 말하게 하는 단계다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-empathy_approach-3-v1 | 이준호 씨, 다른 관련자 이야기를 꺼내는 순간 부부 사이가 더 무너질까 봐 두려웠다는 뜻입니까. |
| judgeq-d-1-empathy_approach-3-v2 | 박지연 씨, 외도 정황보다 더 깊은 곳에서 삶이 무너질까 봐 겁났던 마음도 있었습니까. |
| judgeq-d-1-empathy_approach-3-v3 | 이준호 씨, 그 일을 두고 돌아서는 길에 박지연 씨에게 말해야 한다는 생각이 들지는 않았습니까. |
| judgeq-d-1-empathy_approach-3-v4 | 박지연 씨, 증거를 붙잡고 있을수록 오히려 이준호 씨와 멀어지는 걸 느끼지는 않으셨습니까. |
| judgeq-d-1-empathy_approach-3-v5 | 두 분, 서로를 지키려 했다는 말이 실제로는 서로를 고립시킨 지점이 어디였는지 들려주십시오. |

### d-1 · 공감 접근 (empathy_approach) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 가장 무거운 감정을 선택하게 만든다. 책임과 상처 가운데 무엇이 더 크게 남는지 스스로 보게 하는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-1-empathy_approach-4-v1 | 이준호 씨, 누군가를 지키려 한 마음과 박지연 씨를 다치게 한 죄책감 중 지금 더 무겁게 남는 것은 무엇입니까. |
| judgeq-d-1-empathy_approach-4-v2 | 박지연 씨, 진실을 찾으려던 마음과 버림받지 않으려 버틴 마음 중 무엇이 더 컸습니까. |
| judgeq-d-1-empathy_approach-4-v3 | 이준호 씨, 그때 다른 사람의 사정을 먼저 떠올렸다면 지금은 박지연 씨에게 어떤 말을 먼저 해야 한다고 보십니까. |
| judgeq-d-1-empathy_approach-4-v4 | 박지연 씨, 외도라고 단정했던 마음 뒤에 있던 불안까지 지금 이 자리에서 인정하실 수 있습니까. |
| judgeq-d-1-empathy_approach-4-v5 | 두 분, 오피스텔 문제와 관련하여 느낀 진정한 감정이 무엇인지 말씀해 주십시오. |

### d-2 · 사실 추궁 (fact_pursuit) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 출금 사실과 인지 시점을 먼저 고정한다. 돈의 흐름이 언제 드러났는지 양쪽 입장을 세우는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-fact_pursuit-1-v1 | 이준호 씨, 개인 계좌에서 큰돈이 현금으로 빠져나간 사실, 먼저 인정하시겠습니까? |
| judgeq-d-2-fact_pursuit-1-v2 | 박지연 씨, 그 출금 흔적을 처음 보고 어떤 경로로 확인을 이어갔는지 차례로 들려주시겠습니까. |
| judgeq-d-2-fact_pursuit-1-v3 | 두 분, 개인 계좌 출금과 공동 재산 문제를 처음 어느 시점에 서로 알게 됐는지 맞춰 주십시오. |
| judgeq-d-2-fact_pursuit-1-v4 | 이준호 씨, 그 돈이 공동 적금이 아니라 개인 계좌에서 나온 돈이라는 점을 언제 밝히려 하셨습니까. |
| judgeq-d-2-fact_pursuit-1-v5 | 박지연 씨, 출금 기록을 보면서 단순 지출이 아니라 몰래 옮긴 돈이라고 판단한 이유가 무엇입니까? |

### d-2 · 사실 추궁 (fact_pursuit) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 방식과 판단 근거를 구체화한다. 왜 현금이었는지, 왜 수상하다고 본 건지 따로 묻는다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-fact_pursuit-2-v1 | 이준호 씨, 계좌이체가 아니라 현금으로 꺼낸 이유가 그 입장 개인 사정 때문이었는지 답해 주십시오. |
| judgeq-d-2-fact_pursuit-2-v2 | 박지연 씨, 현금 출금이라는 방식을 보고 이 돈이 다른 생활과 연결됐다고 보신 근거는 무엇입니까. |
| judgeq-d-2-fact_pursuit-2-v3 | 이준호 씨, 현금으로 전달해야 했다는 사정이 있었다면 왜 그 사정을 박지연 씨에게 빼두셨습니까. |
| judgeq-d-2-fact_pursuit-2-v4 | 박지연 씨, 출금 날짜와 오피스텔 기록을 맞춰 보면서 어떤 결론으로 마음이 기울었습니까. |
| judgeq-d-2-fact_pursuit-2-v5 | 두 분, 돈이 빠져나간 경위와 출처 및 사용처에 대해 생각하시는 바를 각자 말씀해 주십시오. |

### d-2 · 사실 추궁 (fact_pursuit) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 돈의 최종 도착지와 확인 방식으로 좁혀 들어간다. 출금 뒤의 행선지와 추적 경로를 동시에 세우는 단계다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-fact_pursuit-3-v1 | 이준호 씨, 그 현금이 실제로 누구에게 전달됐고 어떤 급한 사정에 쓰였는지 밝혀 주십시오. |
| judgeq-d-2-fact_pursuit-3-v2 | 박지연 씨, 출금을 본 뒤 계좌와 통화기록을 어떤 순서로 더 확인하셨는지 말씀해 주십시오. |
| judgeq-d-2-fact_pursuit-3-v3 | 이준호 씨, 현금이 본인 손을 떠난 시점과 이동 경로를 날짜와 장소 중심으로 정리해 주십시오. |
| judgeq-d-2-fact_pursuit-3-v4 | 박지연 씨, 그 출금이 다른 관련자 쪽 사정일 수 있다는 가능성을 언제 처음 들으셨습니까. |
| judgeq-d-2-fact_pursuit-3-v5 | 두 분, 개인 비자금 출금과 외도 의심을 같은 선에 놓게 된 과정이 무엇이었는지 답해 주십시오. |

### d-2 · 사실 추궁 (fact_pursuit) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 금액과 목적을 숨길 수 없게 만든다. 독단 처리와 집요한 확인이 각각 어디까지 갔는지 묻는 질문이다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-fact_pursuit-4-v1 | 이준호 씨, 개인 계좌의 목돈 출금을 배우자인 박지연 씨와 상의하지 않고 먼저 처리한 이유를 답하십시오. |
| judgeq-d-2-fact_pursuit-4-v2 | 박지연 씨, 그 출금을 쫓던 불안이 얼마나 커졌고 어떤 행동으로 이어졌는지 말씀해 주십시오. |
| judgeq-d-2-fact_pursuit-4-v3 | 이준호 씨, 본인에게 급한 사정이 있었다고 해도 절차를 건너뛴 책임은 어떻게 보십니까. |
| judgeq-d-2-fact_pursuit-4-v4 | 박지연 씨, 이준호 씨의 출금을 확인하고도 본인의 돈 이동을 숨긴 부분까지 함께 밝히시겠습니까. |
| judgeq-d-2-fact_pursuit-4-v5 | 두 분, 한쪽의 현금 출금과 다른 한쪽의 선제 대응이 어떻게 서로를 더 의심하게 만들었는지 정리해 주십시오. |

### d-2 · 동기 추적 (motive_search) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 돈 문제를 열지 못한 직접 이유와 계속 확인한 직접 이유를 각각 묻는다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-motive_search-1-v1 | 이준호 씨, 돈 문제를 박지연 씨에게 열지 못하게 만든 가장 직접적인 두려움이 무엇이었습니까. |
| judgeq-d-2-motive_search-1-v2 | 박지연 씨, 큰돈이 빠져나간 걸 보고 바로 묻기보다 계속 확인하게 된 이유를 들려주시겠습니까. |
| judgeq-d-2-motive_search-1-v3 | 이준호 씨, 별도 계좌의 목돈 출금을 배우자에게 말하지 않아도 된다고 판단한 근거가 무엇입니까. |
| judgeq-d-2-motive_search-1-v4 | 박지연 씨, 출금 기록을 본 뒤 스스로를 지켜야 한다는 생각이 먼저 올라왔습니까. |
| judgeq-d-2-motive_search-1-v5 | 두 분, 돈을 숨긴 이유와 돈을 추적한 이유가 각각 어떤 불안에서 시작됐는지 말씀해 주십시오. |

### d-2 · 동기 추적 (motive_search) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 가족 보호와 배신감이라는 두 축을 더 분명히 한다. 선택의 감정적 근거를 파고드는 단계다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-motive_search-2-v1 | 이준호 씨, 급한 일이라고 판단했다면 더더욱 함께 말해야 한다는 생각을 왜 뒤로 미루셨습니까. |
| judgeq-d-2-motive_search-2-v2 | 박지연 씨, 그 출금이 단순한 실수보다 배신처럼 느껴진 이유를 장면과 순서를 나눠 들려주십시오. |
| judgeq-d-2-motive_search-2-v3 | 이준호 씨, 그 사정을 말하는 순간 어떤 반응이 가장 두려웠습니까. |
| judgeq-d-2-motive_search-2-v4 | 박지연 씨, 출금 기록을 보는 일이 언제부터 사실 확인보다 대비하는 마음에 가까워졌습니까. |
| judgeq-d-2-motive_search-2-v5 | 두 분, 숨긴 사정이라는 설명과 배우자를 배제한 행동 사이의 간격을 각자 어떻게 보십니까. |

### d-2 · 동기 추적 (motive_search) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 왜 숨김을 먼저 택했는지, 왜 확인을 멈추지 못했는지를 정면으로 묻는다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-motive_search-3-v1 | 이준호 씨, 선의였다는 말보다 먼저 숨김을 택한 이유를 지금은 어떻게 설명하시겠습니까. |
| judgeq-d-2-motive_search-3-v2 | 박지연 씨, 돈을 확인하는 일이 스스로도 멈추기 어려운 일이 된 시점이 언제였습니까. |
| judgeq-d-2-motive_search-3-v3 | 이준호 씨, 그 사정을 지키려다 박지연 씨의 신뢰를 잃을 수 있다는 점을 어느 정도 예상하셨습니까. |
| judgeq-d-2-motive_search-3-v4 | 박지연 씨, 이준호 씨의 비밀 출금을 보면서 왜 상대에게 묻기보다 내 돈부터 지켜야 한다고 느끼셨습니까. |
| judgeq-d-2-motive_search-3-v5 | 두 분, 돈을 두고 각자 상대를 배제한 판단이 시작된 순간을 말씀해 주십시오. |

### d-2 · 동기 추적 (motive_search) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 선택이 월권이나 집착이 될 걸 알면서도 밀어붙인 이유를 설명하게 만든다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-motive_search-4-v1 | 이준호 씨, 급한 사정이 있었다 해도 배우자 동의 없이 밀어붙인 이유를 끝까지 답하십시오. |
| judgeq-d-2-motive_search-4-v2 | 박지연 씨, 제 몫을 지켜야 한다는 생각이 왜 이준호 씨를 추궁하는 선을 넘어가게 했습니까. |
| judgeq-d-2-motive_search-4-v3 | 이준호 씨, 현금을 건넨 것이 필요했다고 해도 그 뒤 침묵까지 정당하다고 보십니까. |
| judgeq-d-2-motive_search-4-v4 | 박지연 씨, 돈 문제를 배신의 증거로 확신하신 이유를 말씀해 주십시오. |
| judgeq-d-2-motive_search-4-v5 | 두 분, 선의와 두려움이 있었다는 말만으로 상대에게 숨긴 돈의 책임이 줄어드는지 답해 주십시오. |

### d-2 · 공감 접근 (empathy_approach) · depth=1 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 돈이 움직이던 순간의 감정 출발점을 묻는다. 사실보다 마음의 첫 반응을 먼저 끌어낸다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-empathy_approach-1-v1 | 이준호 씨, 그 돈을 꺼내던 순간 가장 먼저 떠오른 것은 급한 사정이었습니까, 집에 있는 박지연 씨였습니까. |
| judgeq-d-2-empathy_approach-1-v2 | 박지연 씨, 출금 기록을 처음 봤을 때 분노보다 먼저 공포가 올라왔는지 말씀해 주시겠습니까. |
| judgeq-d-2-empathy_approach-1-v3 | 이준호 씨, 현금을 들고 이동하던 때 마음이 무거워진 장면이 있었습니까. |
| judgeq-d-2-empathy_approach-1-v4 | 박지연 씨, 그 기록을 본 뒤 손이 먼저 굳었는지 머릿속 계산이 먼저 돌았는지 들려주십시오. |
| judgeq-d-2-empathy_approach-1-v5 | 두 분, 돈을 본 순간 각자 어떤 감정이 먼저 올라왔는지 판단보다 먼저 말해 주십시오. |

### d-2 · 공감 접근 (empathy_approach) · depth=2 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 책임감과 두려움, 확인 충동과 불안이 함께 있었는지를 묻는다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-empathy_approach-2-v1 | 이준호 씨, 그 선택 뒤에 그 사정을 책임져야 한다는 마음과 박지연 씨에게 미안한 마음이 함께 있었습니까. |
| judgeq-d-2-empathy_approach-2-v2 | 박지연 씨, 확인을 멈추면 더 큰 일이 날 것 같았던 순간이 있었는지 말씀해 주십시오. |
| judgeq-d-2-empathy_approach-2-v3 | 이준호 씨, 숨긴 사정이라고 스스로를 달래면서도 집에 돌아와 말문이 막힌 적이 있었습니까. |
| judgeq-d-2-empathy_approach-2-v4 | 박지연 씨, 출금 기록을 볼수록 이준호 씨를 믿고 싶은 마음까지 같이 흔들렸습니까. |
| judgeq-d-2-empathy_approach-2-v5 | 두 분, 돈을 둘러싼 두려움이 상대에게 말하는 힘보다 더 커진 순간을 각자 짚어 주십시오. |

### d-2 · 공감 접근 (empathy_approach) · depth=3 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 상대를 속였다는 죄책감과 삶이 무너질 공포를 각각 직접 말하게 하는 단계다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-empathy_approach-3-v1 | 이준호 씨, 급한 사정을 챙기려는 마음과 박지연 씨를 속였다는 죄책감이 동시에 올라왔던 때가 있었습니까. |
| judgeq-d-2-empathy_approach-3-v2 | 박지연 씨, 그 돈을 본 뒤 관계가 무너지는 불안과 생활이 무너지는 불안이 겹쳤습니까. |
| judgeq-d-2-empathy_approach-3-v3 | 이준호 씨, 그 돈을 건넨 뒤에도 집에서는 평소처럼 행동해야 했던 시간이 어떻게 남아 있습니까. |
| judgeq-d-2-empathy_approach-3-v4 | 박지연 씨, 출금 기록을 붙잡고 있으면서도 이준호 씨에게 확인을 요구하지 못한 마음이 있었습니까. |
| judgeq-d-2-empathy_approach-3-v5 | 두 분, 서로에게 돈 이야기를 하지 못한 감정이 지금 어떤 후회로 남았는지 말씀해 주십시오. |

### d-2 · 공감 접근 (empathy_approach) · depth=4 — 5 variants

**behaviorHint (전 variants 공통 요약)**: 가장 무겁게 남은 생각과 끝내 멈추지 못한 이유를 마음의 언어로 묻게 한다.

| ID | KO 원본 |
|----|---------|
| judgeq-d-2-empathy_approach-4-v1 | 이준호 씨, 현금을 처리하고 집에 돌아오는 길에 가장 오래 남은 생각이 무엇이었습니까. |
| judgeq-d-2-empathy_approach-4-v2 | 박지연 씨, 그 출금이 드러난 뒤에도 확인을 멈추지 못했던 마음을 이제는 말할 수 있습니까. |
| judgeq-d-2-empathy_approach-4-v3 | 이준호 씨, 그 사정을 살펴야 한다는 마음이 박지연 씨를 혼자 불안 속에 두었다는 점을 인정하십니까. |
| judgeq-d-2-empathy_approach-4-v4 | 박지연 씨, 이준호 씨의 출금을 본 뒤 내 돈부터 지키겠다는 마음이 언제 가장 강해졌습니까. |
| judgeq-d-2-empathy_approach-4-v5 | 두 분, 돈을 둘러싼 선택 중 지금 가장 무겁게 남는 장면을 하나씩 말씀해 주십시오. |

---

## 출력 형식 (예시)

```
## Batch 1 결과

judgeq-d-1-fact_pursuit-1-v1:
변경 후: <<polish 결과 KO 한 줄>>
변경 영역: <<영역 1~3 줄, 어떤 번역체 영역을 어떻게 자연화했는지>>

judgeq-d-1-fact_pursuit-1-v2:
변경 후: ...
변경 영역: ...

... (120건 모두)
```

### 출력 시 주의사항

1. 각 ID는 원본 file의 ID 그대로 사용 (`judgeq-d-X-questionType-depth-vN`)
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장 (원본 구조 따라)
3. 변경 영역은 짧고 명료하게 (어떤 어색 패턴을 어떻게 자연화했는지)
4. 추측·해설 추가 X — polish 결과만 명확히 제시
5. 사용자 spot check 시 활용하므로 변경 영역은 검토 가능한 정밀도 필요
6. tone(depth) 차이 보존 — depth=4 variants는 단정 톤 유지
7. 진실 누설 자가 점검 (policy-02) 필수
