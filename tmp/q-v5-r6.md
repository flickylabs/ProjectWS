# Q V5 R6

- Phase: `A / Level 3`
- 대상: `spouse-01 viewerData`
- 수행: 원본 viewerData 우선 로딩 및 content key 라우팅 검증
- 근거: `src/data/cases/caseLoader.ts:392`, `src/components/pc/evidence/PCEvidenceViewer.tsx:60`, `src/components/pc/evidence/PCEvidenceViewer.tsx:97`
- 확인 항목: `receipt`, `gps_log`, `bank`, `chat`, `contract`, `log`, `device`
- 판정: `PASS`
- 메모: sessionStorage 복원값보다 원본 JSON viewerData가 우선 사용됨을 확인
