검수 결과

- Evidence 교정: 32건
- DossierCard 교정: 43건

[Evidence 위반]
{"caseId": "tenant-10", "evidenceId": "e-2", "field": "surfaceName", "before": "브로커 단톡방 캡처와 사진 전송", "after": "대화 캡처와 사진 전송 기록", "reason": "직함(브로커)이 surfaceName에 노출됨."}
{"caseId": "tenant-10", "evidenceId": "e-2", "field": "surfaceDescription", "before": "브로커 대화방에서 사진과 문의가 오간 일부 캡처다.", "after": "사진과 문의가 오간 일부 대화 캡처다.", "reason": "직함이 surfaceDescription에 노출됨."}
{"caseId": "tenant-10", "evidenceId": "e-4", "field": "surfaceName", "before": "관리사무소 민원일지와 확인 기록", "after": "민원일지와 확인 기록", "reason": "기관명이 surfaceName에 노출됨."}
{"caseId": "tenant-10", "evidenceId": "e-4", "field": "surfaceDescription", "before": "민원 접수 내역과 현장 확인이 적힌 관리사무소 일지다.", "after": "민원 접수 내역과 현장 확인이 적힌 기록이다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "tenant-11", "evidenceId": "e-3", "field": "surfaceDescription", "before": "시공업체 송금 내역과 자재 영수증이 묶인 비용 자료다.", "after": "송금 내역과 자재 영수증이 묶인 비용 자료다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "tenant-11", "evidenceId": "e-4", "field": "surfaceName", "before": "시공업체 작업범위 톡과 견적서", "after": "작업범위 대화와 견적서", "reason": "기관명과 서비스 뉘앙스가 surfaceName에 노출됨."}
{"caseId": "tenant-11", "evidenceId": "e-4", "field": "surfaceDescription", "before": "시공 현장소장과 나눈 카카오톡과 원본 견적서 묶음이다.", "after": "작업 범위를 주고받은 대화와 원본 견적서 묶음이다.", "reason": "직함·서비스명이 surfaceDescription에 노출됨."}
{"caseId": "tenant-11", "evidenceId": "e-5", "field": "surfaceName", "before": "설비 보수 카톡과 모집 캡처", "after": "설비 보수 대화와 모집 캡처", "reason": "서비스명이 surfaceName에 노출됨."}
{"caseId": "tenant-12", "evidenceId": "e-3", "field": "surfaceName", "before": "관리인 업무일지와 당사자 문자", "after": "업무일지와 문자 기록", "reason": "직함이 surfaceName에 노출됨."}
{"caseId": "tenant-12", "evidenceId": "e-3", "field": "surfaceDescription", "before": "관리인 업무일지와 집주인이 보낸 지시 문자 기록이다.", "after": "업무일지와 지시 내용이 담긴 문자 기록이다.", "reason": "직함이 surfaceDescription에 노출됨."}
{"caseId": "tenant-12", "evidenceId": "e-5", "field": "surfaceName", "before": "입주민 채팅 내보내기와 전파 시간표", "after": "대화 내보내기와 시간표 정리", "reason": "전파 구조를 너무 직접 드러내 anchorTruth 추론을 앞당김."}
{"caseId": "tenant-12", "evidenceId": "e-5", "field": "surfaceDescription", "before": "입주민 채팅 내보내기 파일과 메시지 전달 시간표다.", "after": "대화 내보내기 파일과 시간 순서 정리 자료다.", "reason": "전달 구조를 surfaceDescription에서 너무 직접 드러냄."}
{"caseId": "workplace-02", "evidenceId": "e-3", "field": "surfaceName", "before": "공유 링크 접속 로그와 토큰 기록", "after": "접속 로그와 다운로드 기록", "reason": "공유링크·토큰은 anchorTruth 핵심 경로라 surfaceName에서 노출되면 안 됨."}
{"caseId": "workplace-02", "evidenceId": "e-3", "field": "surfaceDescription", "before": "공유 링크의 접속 이력과 임시 다운로드 토큰 발급 기록", "after": "접속 이력과 임시 내려받기 기록이다.", "reason": "핵심 유출 경로를 surfaceDescription에서 직접 노출함."}
{"caseId": "workplace-02", "evidenceId": "e-4", "field": "surfaceName", "before": "메신저 전달 캡처와 링크 메모", "after": "전달 캡처와 메모", "reason": "링크 전달선이 twist 축이라 surfaceName에서 너무 직접적임."}
{"caseId": "workplace-02", "evidenceId": "e-4", "field": "surfaceDescription", "before": "사내 메신저에서 전달된 내용의 캡처본과 관련 링크 메모", "after": "전달된 내용의 캡처본과 관련 메모다.", "reason": "서비스/경로 정보가 surfaceDescription에 과하게 노출됨."}
{"caseId": "workplace-02", "evidenceId": "e-5", "field": "surfaceName", "before": "인사 조사 접수 메모와 코멘트", "after": "조사 접수 메모와 코멘트", "reason": "기관명이 surfaceName에 노출됨."}
{"caseId": "workplace-02", "evidenceId": "e-5", "field": "surfaceDescription", "before": "인사팀 조사 접수 기록과 타임스탬프가 찍힌 내부 코멘트", "after": "조사 접수 기록과 타임스탬프가 찍힌 내부 코멘트다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "workplace-02", "evidenceId": "e-6", "field": "surfaceName", "before": "감사 면담 확인서와 출입 로그", "after": "면담 확인서와 출입 로그", "reason": "기관/절차명이 surfaceName에 앞세워져 있음."}
{"caseId": "workplace-02", "evidenceId": "e-6", "field": "surfaceDescription", "before": "감사실 면담 확인 문서와 회의실 출입 기록 및 좌석 배치 로그", "after": "면담 확인 문서와 회의실 출입 기록 및 좌석 배치 로그다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "workplace-03", "evidenceId": "e-2", "field": "surfaceName", "before": "멘토방 DM과 전달 메시지", "after": "대화방 메시지와 전달 기록", "reason": "채널명·표현 방식이 surfaceName에 노출됨."}
{"caseId": "workplace-03", "evidenceId": "e-2", "field": "surfaceDescription", "before": "사내 메신저 멘토링 채널의 개인 메시지와 전달된 대화 내용", "after": "개인 메시지와 전달된 대화 내용이다.", "reason": "기관/채널 정보가 surfaceDescription에 노출됨."}
{"caseId": "workplace-03", "evidenceId": "e-5", "field": "surfaceName", "before": "인사 상담 접수와 배정 변경", "after": "상담 접수와 배정 변경", "reason": "기관명이 surfaceName에 노출됨."}
{"caseId": "workplace-03", "evidenceId": "e-5", "field": "surfaceDescription", "before": "인사팀 상담 접수 내역과 업무 배정이 변경된 이력을 담은 문서", "after": "상담 접수 내역과 업무 배정이 변경된 이력을 담은 문서다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "workplace-04", "evidenceId": "e-3", "field": "surfaceName", "before": "막판 수정 메신저 캡처", "after": "막판 수정 대화 캡처", "reason": "서비스/매체명이 surfaceName에 직접 노출됨."}
{"caseId": "workplace-04", "evidenceId": "e-3", "field": "surfaceDescription", "before": "마감 직전 업무 메신저에서 주고받은 대화를 캡처한 이미지 파일", "after": "마감 직전 주고받은 대화를 캡처한 이미지 파일이다.", "reason": "매체명이 surfaceDescription에 직접 노출됨."}
{"caseId": "workplace-04", "evidenceId": "e-5", "field": "surfaceDescription", "before": "배포 파이프라인의 오류 로그와 운영팀이 작성한 사고 메모", "after": "배포 파이프라인의 오류 로그와 사고 메모다.", "reason": "기관/팀 정보가 surfaceDescription에 노출됨."}
{"caseId": "workplace-05", "evidenceId": "e-3", "field": "surfaceDescription", "before": "특정 보안 폴더의 다운로드 이력과 파일 외부 전송 보안 로그", "after": "자료 다운로드 이력과 파일 전송 로그다.", "reason": "'특정 X' 패턴과 매체 정보가 함께 노출됨."}
{"caseId": "workplace-05", "evidenceId": "e-5", "field": "surfaceName", "before": "인사 심사 메모와 발표 순서 변경 기록", "after": "심사 메모와 발표 순서 변경 기록", "reason": "기관명이 surfaceName에 노출됨."}
{"caseId": "workplace-05", "evidenceId": "e-5", "field": "surfaceDescription", "before": "인사 심사 관련 내부 메모와 발표 순서가 변경된 이력 문서", "after": "심사 관련 내부 메모와 발표 순서가 변경된 이력 문서다.", "reason": "기관명이 surfaceDescription에 노출됨."}
{"caseId": "workplace-05", "evidenceId": "e-6", "field": "surfaceName", "before": "과거 출처 정리 이메일 체인", "after": "과거 이메일 체인", "reason": "핵심 진실인 출처 누락 문제를 surfaceName에서 직접 암시함."}
{"caseId": "workplace-05", "evidenceId": "e-6", "field": "surfaceDescription", "before": "이전에 발생한 출처 누락 건에 대한 정리 이메일 스레드 전문", "after": "이전 안건을 둘러싼 논의가 오간 이메일 스레드 전문이다.", "reason": "핵심 진실(출처 누락)을 surfaceDescription에서 직접 노출함."}

[DossierCard 위반]
{"caseId": "tenant-10", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 잘린 문장과 제출 방식까지 직접 제시해 hint 단계를 넘음.", "fix": "윤민주 씨, 처음 낸 대화 화면이 전체 흐름을 다 담지 못했다면, 왜 그 장면부터 승인 근거처럼 내세우셨습니까?"}
{"caseId": "tenant-10", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 특약의 협의 여지와 금지 해석을 구체적으로 까서 방향 제시를 넘음.", "fix": "최상훈 씨, 그 특약을 사실상 금지처럼 받아들이게 만든 이유가 무엇입니까?"}
{"caseId": "tenant-10", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 민원 횟수까지 직접 제시해 너무 구체적임.", "fix": "윤민주 씨, 반려견 관련 불편이 거의 없었다고만 말하기엔 남는 기록이 있는데, 그 표현을 그렇게 단정하신 이유가 무엇입니까?"}
{"caseId": "tenant-10", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 확인 범위와 손해 추정을 거의 결론처럼 말함.", "fix": "최상훈 씨, 확인된 상황보다 손해를 더 크게 보신 이유가 무엇입니까?"}
{"caseId": "tenant-10", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 문자 원문에 승인 표현이 없다는 핵심 판단을 바로 노출함.", "fix": "윤민주 씨, 그 답장을 허락 쪽으로 해석하게 된 가장 큰 이유가 무엇입니까?"}
{"caseId": "tenant-10", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 사진 확인·문자 내용·책임까지 한 번에 열어 너무 구체적임.", "fix": "최상훈 씨, 그때 허용 여부를 분명히 정리하지 않은 이유가 무엇입니까?"}
{"caseId": "tenant-11", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 붙박이장 문·상부장 철거까지 직접 꺼내 너무 구체적임.", "fix": "백나래 씨, 그때 허용 범위를 어디까지로 이해하셨습니까?"}
{"caseId": "tenant-11", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 당시 발언 문구를 직접 들이밀어 hint 단계가 무거움.", "fix": "오성필 씨, 입주 초에 남긴 말이 어떤 범위까지 허용한다는 뜻이었다고 보십니까?"}
{"caseId": "tenant-11", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 정확한 총액과 세부 품목을 먼저 열어 버림.", "fix": "백나래 씨, 비용 항목을 한데 묶어 제시한 기준이 무엇이었습니까?"}
{"caseId": "tenant-11", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 430만원 전부는 아니라는 판단을 먼저 깔아 둠.", "fix": "오성필 씨, 그 비용 가운데 공간에 남는 부분이 있었다는 점은 보십니까?"}
{"caseId": "tenant-11", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 전체 대화 문맥과 구조 변경 승인 판단을 바로 연결해 너무 앞서감.", "fix": "백나래 씨, 전체 대화 흐름을 다시 보면 그 허용을 지금은 어떻게 이해하십니까?"}
{"caseId": "tenant-11", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 홍보 문구와 공로 문제를 직접 결론형으로 던짐.", "fix": "오성필 씨, 그 홍보 문구를 쓸 때 누구의 손이 닿은 공간인지 어떻게 생각하고 계셨습니까?"}
{"caseId": "tenant-12", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 '문제 세입자' 표현과 집주인 직언 여부를 바로 까서 너무 구체적임.", "fix": "이소담 씨, 그 말을 집주인 쪽 책임으로 곧바로 받아들이게 된 이유가 무엇입니까?"}
{"caseId": "tenant-12", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 문제 문구를 그대로 노출하고 '특정 X' 표현도 들어감.", "fix": "문경수 씨, 그 말이 어떤 뜻으로 받아들여질지 충분히 살피셨습니까?"}
{"caseId": "tenant-12", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 25분 만 공개 단톡 업로드라는 시간 정보까지 직접 제시함.", "fix": "이소담 씨, 공개 글을 올리기 전에 바로 확인부터 하지 않은 이유가 무엇입니까?"}
{"caseId": "tenant-12", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 업무일지와 문자 원문을 직접 끌어와 hint 단계를 넘음.", "fix": "문경수 씨, 그 표현을 바로잡는 조치를 바로 하지 않은 이유가 무엇입니까?"}
{"caseId": "tenant-12", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 두 차례 재전달이라는 핵심 복원 결과를 미리 제시함.", "fix": "이소담 씨, 들은 말의 흐름을 더 확인해 보지 않고 곧바로 상대 발언으로 본 이유가 무엇입니까?"}
{"caseId": "tenant-12", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 '전파 시간표'와 '정정 공백'을 바로 제시해 너무 무거움.", "fix": "문경수 씨, 인상이 굳어가는 동안 바로 설명하지 않은 이유가 무엇입니까?"}
{"caseId": "tenant-12", "cardId": "dossier-1", "questionId": "dossier-1.b.q3", "issue": "q3에 '특정 세대' 표현이 들어가 금지 규칙 위반.", "fix": "계약서 규칙상 어느 집을 떠올리게 하는 인상 자체를 피해야 하는데, 그 기준에서 이 문장이 안전했다고 보십니까?"}
{"caseId": "workplace-02", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 공식 조사번호 이전이라는 절차 핵심을 바로 까서 너무 구체적임.", "fix": "한규원 씨, 공식 절차 전부터 차단 조치를 서두른 이유가 무엇입니까?"}
{"caseId": "workplace-02", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 개인 드라이브 업로드라는 핵심 행위를 바로 노출함.", "fix": "조민아 씨, 그 자료를 개인 공간에 옮긴 시점과 이유를 먼저 나눠 말씀해 주시겠습니까?"}
{"caseId": "workplace-02", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 '민아 업로드보다 먼저 열린 링크 경로'라는 twist 핵심을 미리 제시함.", "fix": "한규원 씨, 처음 판단을 그렇게 빠르게 굳힌 근거가 무엇이었습니까?"}
{"caseId": "workplace-02", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 링크 경로 선행 사실을 그대로 열어 hint 규칙 위반.", "fix": "조민아 씨, 다른 가능성이 남아 있었는데도 왜 상대 의도부터 먼저 단정하셨습니까?"}
{"caseId": "workplace-02", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 HR 메모 선행 사실을 바로 박아 넣어 너무 직접적임.", "fix": "한규원 씨, 면담보다 먼저 부정적인 판단이 남게 된 이유를 어떻게 설명하시겠습니까?"}
{"caseId": "workplace-02", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 HR 메모 선행 사실을 직접 제시하고 '당신' 표현까지 사용함.", "fix": "조민아 씨, 면담 전 기록이 있었다는 점이 드러난 지금, 그 압박을 어떻게 느꼈는지 근거와 함께 말씀해 주시겠습니까?"}
{"caseId": "workplace-03", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 19초 클립과 정확한 문제 표현을 그대로 제시함.", "fix": "강도윤 씨, 그날 문제 된 표현을 아예 쓰지 않았다고 보십니까?"}
{"caseId": "workplace-03", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 7시 42분부터의 DM 흐름과 단정 문장 존재를 바로 열어 버림.", "fix": "최희주 씨, 처음 보낸 메시지가 확인보다 단정에 가까워진 이유가 무엇입니까?"}
{"caseId": "workplace-03", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 외부 후보 한재균 맥락까지 미리 제시해 twist를 앞당김.", "fix": "강도윤 씨, 그 자리 맥락을 알면서도 오해를 부를 표현을 쓴 이유가 무엇입니까?"}
{"caseId": "workplace-03", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 공유노트의 HJ 의미를 사실상 먼저 알려 줌.", "fix": "최희주 씨, 약어 메모를 다시 봤을 때도 왜 직접 겨냥이라고 계속 받아들이셨습니까?"}
{"caseId": "workplace-03", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 HR 메모와 입력 시점을 직접 던져 너무 무거움.", "fix": "강도윤 씨, 면담 전 불이익성 기록이 먼저 남은 이유를 설명해 주시겠습니까?"}
{"caseId": "workplace-03", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 원본 메타데이터와 앞 8초 맥락까지 직접 제시해 hint를 넘음.", "fix": "최희주 씨, 잘린 앞부분까지 확인된 뒤에도 왜 같은 해석을 유지하십니까?"}
{"caseId": "workplace-04", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 회의록·보드 코멘트·18시 약속을 직접 제시해 너무 구체적임.", "fix": "서민석 씨, 그날 승인 일정을 직접 챙기겠다고 해놓고 흐름을 놓친 이유가 무엇입니까?"}
{"caseId": "workplace-04", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 QA 원본 로그와 스모크 종료 시점을 바로 까서 hint 규칙 위반.", "fix": "배지우 씨, 완료 표시를 조금 이르게 눌렀다고 볼 여지가 있는데, 그 판단 기준이 무엇이었습니까?"}
{"caseId": "workplace-04", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 20시 7분 승인 메일까지 직접 제시해 너무 무거움.", "fix": "서민석 씨, 늦게 답이 온 뒤에도 팀에 상황을 곧바로 공유하지 않은 이유가 무엇입니까?"}
{"caseId": "workplace-04", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 잘린 캡처와 앞줄 문장 존재를 같이 열어 버림.", "fix": "배지우 씨, 대화 전체보다 일부 장면을 먼저 꺼낸 이유가 무엇입니까?"}
{"caseId": "workplace-04", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 20시대 승인·QA 미완료 신호를 그대로 제시함.", "fix": "서민석 씨, 그 시간대에 여러 신호가 좋지 않다는 걸 알면서도 바로 올리지 않은 이유가 무엇입니까?"}
{"caseId": "workplace-04", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 DevOps 로그와 20시 31분 경고를 직접 제시해 너무 구체적임.", "fix": "배지우 씨, 문제 신호를 보고도 곧바로 알리지 않은 이유가 무엇입니까?"}
{"caseId": "workplace-05", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 회의록·버전 이력·공동기획 문구 삭제 시점까지 바로 열어 버림.", "fix": "오상혁 씨, 발표 자료에서 함께 한 사람의 흔적이 빠지게 된 이유를 어떻게 설명하시겠습니까?"}
{"caseId": "workplace-05", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 날짜가 잘린 노트 사진이라는 약점을 너무 직접 제시함.", "fix": "문가은 씨, 그 사진을 먼저 내세워 원안이라고 주장한 이유가 무엇입니까?"}
{"caseId": "workplace-05", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 2년 전 보류안·배수진 문구·공식 기록 밖 처리까지 직접 열어 버림.", "fix": "오상혁 씨, 예전 안건의 기여 흔적을 공식 기록 밖에 두려 했던 판단을 기억하십니까?"}
{"caseId": "workplace-05", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 권한 회수 전 14분, 일괄 저장, 링크 전송까지 한 번에 제시해 너무 구체적임.", "fix": "문가은 씨, 자료를 한꺼번에 챙긴 행동이 확인만 하려던 수준이었다고 보십니까?"}
{"caseId": "workplace-05", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 HR 메모의 정확한 문구와 시점을 그대로 제시함.", "fix": "오상혁 씨, 해명 전에 부정적인 메모가 먼저 남은 이유가 정말 단순 관리 차원이었습니까?"}
{"caseId": "workplace-05", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 과거 이메일 체인과 선례 이용 가능성을 직접 열어 버림.", "fix": "문가은 씨, 예전 기록을 그대로 둔 채 이번에도 비슷한 방식으로 대응한 건 아닙니까?"}