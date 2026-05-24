---
name: feedback-external-brief-self-contained-folder
description: 외부 도구(GPT Pro/Codex) 의뢰서 폴더는 self-contained — 참조 파일도 모두 복사 포함. README index 첨부. 사용자 폴더 관리 부담 회피.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 13115bcb-1440-4e69-9d18-2cc04b4569f7
---

## 규칙

외부 도구(GPT Pro / Codex / 등) 의뢰서를 작성할 때 항상 다음을 보장:

1. **Self-contained 폴더 구성**
   - 외부 참조 (`../../../memory/foo.md` 같은 link) X
   - 의뢰서가 참조하는 모든 메모리/사건 정의/톤 sample 파일을 폴더에 **복사**
   - 동일 파일이 여러 폴더에 중복돼도 OK — 사용자 업로드 시 한 번에 묶음 가능

2. **README.md index 필수**
   - 폴더 내 모든 파일 일람 (목적 + 역할)
   - 외부 도구 사용 절차 명시 (구체 prompt)
   - 산출 처리 흐름 명시 (사용자가 응답 받은 후 어떻게 본 세션에 전달할지)

3. **메모리 파일 복사 출처**
   - 원본: `C:\Users\user\.claude\projects\d--ProjectWS\memory\{name}.md`
   - 복사처: `docs/design/{cycle-folder}/{name}.md`
   - 복사본은 commit 포함 (외부 도구 업로드용)

## Why

2026-05-24 Cycle 1 GPT Pro 의뢰서 패키지 작성 후 사용자 지적:
> "아니 GPT 전달용 폴더에 모두 넣어줘. 프로젝트 폴더 관리가 너무 번거로우니 이런 식으로 작업을 한번 할 때마다 각 폴더에 동일한 파일이라 해도 모두 넣어줘"

기존 접근: 의뢰서만 폴더에, 참조 메모리는 외부 폴더 link. 결과: 사용자가 매번 7개 파일을 여러 디렉토리에서 찾아 모아야 했음.

새 접근: 각 작업 폴더는 self-contained. 사용자는 폴더 하나만 보고 모든 파일을 한 번에 업로드.

## How to apply

### 외부 도구 의뢰서 폴더 표준 구조

```
docs/design/{cycle-or-topic}-{date}/
├── README.md                                  # 폴더 index + 외부 도구 사용 절차
├── {tool}-brief.md                            # 주 의뢰서 (gpt-pro-brief.md / codex-multilang-sync.md 등)
├── {topic}-tone-samples.md (옵션)              # 톤 reference (큰 파일 대체)
├── {memory-name-1}.md                          # 메모리 복사본 1
├── {memory-name-2}.md                          # 메모리 복사본 2
└── ...                                        # 의뢰서가 참조하는 모든 메모리/sample 복사
```

### 복사 명령 (PowerShell)

```powershell
$src = "C:\Users\user\.claude\projects\d--ProjectWS\memory"
$dst = "d:\ProjectWS\docs\design\{cycle-folder}"
Copy-Item "$src\{memory-name}.md" "$dst\"
```

### 복사 명령 (Bash)

```bash
cp "/c/Users/user/.claude/projects/d--ProjectWS/memory/{memory-name}.md" \
   "d:/ProjectWS/docs/design/{cycle-folder}/"
```

### README.md template

[feedback-external-brief-path-explicit](feedback_external_brief_path_explicit.md) 의 보고 template 통합:
- 폴더 내 모든 파일 일람
- 외부 도구 사용 절차 (구체 prompt 예시)
- 산출 요약 + 처리 단계 (메인 세션 다음 행동)

### 예외

- 의뢰서가 1개 파일만 참조하고 그 파일이 이미 메인 의뢰서 본문에 인용됐으면 별도 복사 불필요
- 메모리가 매우 자주 update되는 영역이면 (운영성 메모리) 복사 회피 + 외부 link만 — 단 README에 명시

## 관련 메모리

- [[feedback_external_brief_path_explicit]] — 의뢰서 위치 + 사용 방법 명시 정책
- [[design_gpt_batch_folder_structure]] — gpt-upload-batch{N}/ self-contained 4 file 패턴
- [[design_gpt_projects_workflow]] — GPT Projects File 영구 저장 정책
- [[feedback_claude_ko_needs_codex_multilang]] — Codex 다국어 sync 의뢰서 패턴
