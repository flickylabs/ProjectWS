---
name: feedback-powershell-encoding-utf8
description: "PowerShell file 작업 시 Get-Content/Set-Content는 -Encoding UTF8 명시 필수. 기본 ANSI 인코딩이 한국어 글자 corruption (mojibake)를 만들고 file 복구 불가능. Write/Edit tool 사용 가능한 경우 PowerShell file swap 회피."
metadata:
  node_type: memory
  type: feedback
  originSessionId: continuation-from-phase3-friend01-start
---

## 원칙

**PowerShell 5.1의 `Get-Content` 기본 동작은 ANSI/Windows-1252 디코딩.** BOM 없는 UTF-8 file에 한국어가 들어 있으면 ANSI로 잘못 읽어 mojibake (`?먯젅???덉튇` 같은 깨진 글자) 생성. 이후 `WriteAllLines`로 UTF-8 인코딩 출력 시 깨진 글자가 그대로 저장되어 **file 전체 corruption**. file이 untracked라 `git checkout` 복구도 불가능.

**Why:** PowerShell 5.1 (Windows PowerShell)은 .NET Framework 기반이라 default file encoding이 system code page (한국어 Windows = CP949). UTF-8 BOM 없는 file은 자동 감지 실패. 2026-05-23 friend-01.case.ts (~2973 line) 작성 중 dispute array 순서 swap을 위해 `Get-Content $path | Set-Content $path` 패턴 사용 → 한국어 KO 텍스트 전체 mojibake → file 복구 불가능 → Write tool로 처음부터 새 작성 (시간 60분+ 소비).

**How to apply:**

1. **PowerShell file 작업 회피 우선**: Read/Edit/Write tool이 해당 작업 가능하면 PowerShell file swap 사용 X. Write/Edit은 UTF-8 보존 보장.
2. **PowerShell 필수 시 -Encoding UTF8 명시**:
   ```powershell
   $lines = Get-Content $path -Encoding UTF8
   # ... modify $lines ...
   [System.IO.File]::WriteAllLines((Resolve-Path $path), $lines, [System.Text.UTF8Encoding]::new($false))
   ```
3. **새 file (untracked) 작업 직전 git add 권장**: file 손상 시 `git checkout HEAD --` 복구 가능. 단 git checkout은 tracked file만 가능.
4. **PowerShell 사용 후 인코딩 검증**: 한국어 영역 정상 표시 확인 (`grep -c "ko('"` 또는 직접 read).

## 적용 사례 (2026-05-23)

friend-01.case.ts 작성 중 d-2 / d-3 dispute 위치를 잘못 작성 → swap을 위해 PowerShell `Get-Content` (default ANSI) 사용 → ~2973 line 한국어 텍스트 전체 corruption. file untracked라 git checkout 불가. Write tool로 처음부터 새 작성 (전체 17 영역 재작성). 작업 시간 60분+ 추가 소비.

**해결책 정착**:
- dispute array 같은 영역 swap은 PowerShell 사용 X. Edit으로 단일 큰 swap 처리 또는 처음부터 정렬된 순서로 Write.
- 대량 file 작업 시 단계별 Write/Edit 진행 (한 번에 큰 PowerShell 영역 X).

## 신규 작업 시 self-check

PowerShell file 작업 직전 확인:
1. **Read/Edit/Write tool로 해결 가능한가?** → Yes면 PowerShell 사용 X.
2. **file이 한국어 / 일본어 / 중국어 등 non-ASCII 영역 포함하는가?** → Yes면 PowerShell `-Encoding UTF8` 필수.
3. **file이 untracked인가?** → Yes면 추가 git add 권장 (복구 보험).
4. **작업 후 한국어 표시 정상한가?** → grep으로 mojibake 패턴 (`?` 글자 일부) 확인.

## 관련 메모리

- [[feedback_qa_session_clean_worktree]] — 진입 조건 (untracked OK 영역의 영향)
- [[feedback_baseline_anchor_scripted_text]] — file 변경 영역 학습 (회귀 영역)
- [[session_handoff_20260523_core_case_phase3_friend01_complete]] — 사고 발생 영역
