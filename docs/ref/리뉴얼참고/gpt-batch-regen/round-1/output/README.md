# regenerated_cases

입력 파일(사건원본 JSON + tells-beats.ts + v2-atoms.ts)을 기준으로 재생성했습니다.

생성 규칙
- `*-tells-beats.ts`: 기존 tells/beats 객체를 정규화하여 재출력
- `*.json`: 사건원본 JSON에 `claimPolicies`, `executableTells`, `beatScripts`를 병합한 실행용 JSON

사건별 요약
- neighbor-02: neighbor-02-tells-beats.ts, neighbor-02.json / disputes=5, tells=6, beats=36
- neighbor-04: neighbor-04-tells-beats.ts, neighbor-04.json / disputes=5, tells=6, beats=36
- partnership-04: partnership-04-tells-beats.ts, partnership-04.json / disputes=5, tells=6, beats=36
- partnership-11: partnership-11-tells-beats.ts, partnership-11.json / disputes=5, tells=6, beats=36
