const LOW_VALUE_SYSTEM_LOG_PATTERNS: RegExp[] = [
  /동기 탐색이 효과를 보이고 있습니다/,
  /아직 드러나지 않은 쟁점의 단서가 보입니다/,
  /책임 회피 문구가 기록되었습니다/,
  /^누설미터\s+\d+%/,
  /^누설\s*\+\d+%/,
  /숨기던 동기가 흘러나오기 시작합니다/,
  /숨겨진 연결고리가 감지되었습니다/,
]

export function isLowValueSystemDialogueText(text: string | undefined): boolean {
  const normalized = (text ?? '').replace(/\s+/g, ' ').trim()
  if (!normalized) return false
  return LOW_VALUE_SYSTEM_LOG_PATTERNS.some((pattern) => pattern.test(normalized))
}
