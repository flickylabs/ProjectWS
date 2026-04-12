"""Remove all hotbar/dock duplicate CSS blocks from pc.css and append a single final block."""

import re

CSS_PATH = r'd:\ProjectWS\src\app\pc.css'

with open(CSS_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

original_count = len(lines)
print(f'Original: {original_count} lines')

# Patterns that identify hotbar-related selectors
HOTBAR_KEYWORDS = ['pc-play-hbar', 'pc-play-dock']
HOTBAR_COMMENT_KEYWORDS = ['Hotbar', 'hotbar']

output = []
i = 0
removed_blocks = 0

while i < len(lines):
    line = lines[i]
    stripped = line.rstrip('\n').strip()

    # Check if this is a hotbar-specific comment line (standalone)
    if stripped.startswith('/*') and stripped.endswith('*/'):
        if any(k in stripped for k in HOTBAR_COMMENT_KEYWORDS):
            # Check if next non-empty line is a hotbar selector
            j = i + 1
            while j < len(lines) and lines[j].strip() == '':
                j += 1
            if j < len(lines) and any(k in lines[j] for k in HOTBAR_KEYWORDS):
                # Skip this comment
                i += 1
                continue

    # Check if this line is or starts a hotbar selector
    is_hotbar = False
    if any(k in stripped for k in HOTBAR_KEYWORDS):
        # Could be a selector line (ends with { or ,)
        if stripped.endswith('{') or stripped.endswith(','):
            is_hotbar = True

    if is_hotbar:
        # Collect entire multi-line selector if needed
        selector_lines = [line]
        brace_count = line.count('{') - line.count('}')

        # If it's a multi-selector (ends with ,), check if ALL selectors are hotbar
        # For now, if ANY selector in a multi-selector block is hotbar, check others
        if stripped.endswith(','):
            # Multi-selector: collect all selector lines until we hit {
            j = i + 1
            while j < len(lines):
                sel_line = lines[j]
                selector_lines.append(sel_line)
                brace_count += sel_line.count('{') - sel_line.count('}')
                if '{' in sel_line:
                    break
                j += 1

            # Check if ALL selectors contain hotbar keywords
            all_hotbar = all(
                any(k in sl for k in HOTBAR_KEYWORDS)
                for sl in selector_lines
                if sl.strip() and not sl.strip().startswith('{')
                and not sl.strip() == '{'
            )

            if not all_hotbar:
                # Mixed selector - keep entire block
                output.append(line)
                i += 1
                continue

        # Skip the entire rule block
        j = i
        brace_count = 0
        while j < len(lines):
            brace_count += lines[j].count('{') - lines[j].count('}')
            j += 1
            if brace_count <= 0:
                break

        removed_blocks += 1

        # Skip trailing empty lines
        while j < len(lines) and lines[j].strip() == '':
            j += 1

        i = j
        continue

    output.append(line)
    i += 1

print(f'Removed {removed_blocks} blocks')
print(f'After cleanup: {len(output)} lines')

# Append the consolidated hotbar block
FINAL_HOTBAR = r"""
/* ═══════════════════════════════════════════════════
   HOTBAR — single consolidated block (Thread-U)
   ═══════════════════════════════════════════════════ */

/* Dock container */
body.pc-mode .bottom.pc-play-dock {
  display: block !important;
  position: sticky !important;
  bottom: 0 !important;
  inset: auto !important;
  flex: 0 0 auto !important;
  margin-top: auto !important;
  width: 100% !important;
  padding: 2px 18px 10px !important;
  z-index: 8 !important;
  background: linear-gradient(180deg, rgba(7,7,13,0), rgba(7,7,13,0.88) 26%, rgba(7,7,13,0.98)) !important;
}

/* Hbar grid — narrow char cards + wide center */
body.pc-mode .pc-play-hbar {
  display: grid !important;
  grid-template-columns: 130px minmax(0,1fr) 130px !important;
  align-items: end !important;
  gap: 10px !important;
  width: min(1260px, calc(100% - 40px)) !important;
  margin: 0 auto !important;
}

/* Center column */
body.pc-mode .pc-play-hbar .hb-center {
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  align-self: end !important;
}

/* Hotbar body */
body.pc-mode .pc-play-hbar .hotbar {
  position: relative !important;
  display: grid !important;
  gap: 0 !important;
  min-width: 0 !important;
  padding: 20px 8px 6px !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255,255,255,0.05) !important;
  background: linear-gradient(180deg, rgba(18,18,28,0.98), rgba(11,11,18,0.98)) !important;
  box-shadow: 0 12px 24px rgba(0,0,0,0.22) !important;
}

/* Topbar — F1/F2/F3 + help, floats above hotbar */
body.pc-mode .pc-play-hbar .hotbar-topbar {
  position: absolute !important;
  top: -12px !important;
  left: 8px !important;
  right: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 10px !important;
  min-width: 0 !important;
  pointer-events: none !important;
}

/* Mode / help pill containers */
body.pc-mode .pc-play-hbar .hotbar-modes,
body.pc-mode .pc-play-hbar .hotbar-help {
  pointer-events: auto !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  min-height: 26px !important;
  padding: 3px 6px !important;
  border-radius: 8px !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  background: rgba(10,10,16,0.96) !important;
  box-shadow: 0 6px 12px rgba(0,0,0,0.18) !important;
}

/* Mode button */
body.pc-mode .pc-play-hbar .hotbar-mode {
  min-height: 20px !important;
  padding: 0 6px !important;
  border: 0 !important;
  border-radius: 6px !important;
  background: transparent !important;
  color: rgba(214,218,226,0.5) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
}

body.pc-mode .pc-play-hbar .hotbar-mode.is-active {
  background: rgba(212,162,78,0.14) !important;
  color: #f3e5bd !important;
}

/* Kbd badges */
body.pc-mode .pc-play-hbar .hotbar-mode kbd,
body.pc-mode .pc-play-hbar .hotbar-help kbd {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 22px !important;
  height: 17px !important;
  padding: 0 4px !important;
  border-radius: 5px !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  background: rgba(14,14,22,0.9) !important;
  color: #f0deb4 !important;
  font: inherit !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
}

/* Help text */
body.pc-mode .pc-play-hbar .hotbar-help {
  justify-content: flex-end !important;
  margin-left: auto !important;
  color: rgba(200,205,214,0.7) !important;
  font-size: 10px !important;
}

body.pc-mode .pc-play-hbar .hotbar-help span {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
}

body.pc-mode .pc-play-hbar .hotbar-help__sep {
  margin: 0 2px !important;
  color: rgba(255,255,255,0.15) !important;
}

/* Slots grid */
body.pc-mode .pc-play-hbar .hotbar-slots {
  display: grid !important;
  grid-template-columns: repeat(6, minmax(0,1fr)) !important;
  gap: 6px !important;
  width: 100% !important;
}

/* Individual slot — compact height, padding only */
body.pc-mode .pc-play-hbar .slot {
  position: relative !important;
  min-height: 62px !important;
  padding: 4px 6px 5px !important;
  display: grid !important;
  grid-template-rows: auto 1fr auto !important;
  justify-items: center !important;
  gap: 2px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(255,255,255,0.07) !important;
  background: linear-gradient(180deg, rgba(31,31,43,0.98), rgba(22,22,31,0.98)) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.025) !important;
}

body.pc-mode .pc-play-hbar .slot:hover:not(:disabled) {
  transform: translateY(-2px) !important;
  border-color: rgba(212,162,78,0.18) !important;
  background: linear-gradient(180deg, rgba(38,38,51,0.98), rgba(27,27,37,0.98)) !important;
}

/* Slot key badge */
body.pc-mode .pc-play-hbar .slot-key {
  position: absolute !important;
  top: 4px !important;
  left: 4px !important;
  min-width: 18px !important;
  height: 18px !important;
  padding: 0 4px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 5px !important;
  background: rgba(14,14,22,0.9) !important;
  color: #9fa5b7 !important;
  font-size: 10px !important;
  font-weight: 800 !important;
}

/* Slot icon — maintain size */
body.pc-mode .pc-play-hbar .slot-ico {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

body.pc-mode .pc-play-hbar .slot-ico svg {
  width: 24px !important;
  height: 24px !important;
}

/* Slot label — maintain size */
body.pc-mode .pc-play-hbar .slot-nm {
  font-size: 11px !important;
  line-height: 1.2 !important;
  font-weight: 800 !important;
  color: #d6d8e1 !important;
  text-align: center !important;
}

/* Slot effect dot */
body.pc-mode .pc-play-hbar .slot-eff {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  justify-self: center !important;
}

/* Character cards — narrow */
body.pc-mode .pc-play-hbar .char {
  min-height: 0 !important;
  padding: 8px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  background: linear-gradient(180deg, rgba(18,18,28,0.98), rgba(11,11,18,0.98)) !important;
  box-shadow: 0 10px 18px rgba(0,0,0,0.18) !important;
}

body.pc-mode .pc-play-hbar .char:hover {
  background: rgba(255,255,255,0.035) !important;
}

body.pc-mode .pc-play-hbar .char.spk {
  box-shadow: inset 0 0 0 1px rgba(212,162,78,0.15) !important;
}

body.pc-mode .pc-play-hbar .char-a {
  flex-direction: row !important;
  text-align: left !important;
}

body.pc-mode .pc-play-hbar .char-b {
  flex-direction: row-reverse !important;
  text-align: right !important;
}

body.pc-mode .pc-play-hbar .char-b .char-info {
  justify-items: end !important;
}

/* Face circle — keep large */
body.pc-mode .pc-play-hbar .char-face {
  width: 52px !important;
  height: 52px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 50% !important;
  border: 1px solid rgba(91,141,239,0.24) !important;
  background: rgba(32,46,84,0.38) !important;
  flex-shrink: 0 !important;
}

body.pc-mode .pc-play-hbar .char-face svg {
  width: 36px !important;
  height: 36px !important;
}

body.pc-mode .pc-play-hbar .char-b .char-face {
  border-color: rgba(212,102,102,0.24) !important;
  background: rgba(85,35,43,0.34) !important;
}

/* Char info */
body.pc-mode .pc-play-hbar .char-info {
  flex: 1 !important;
  min-width: 0 !important;
  display: grid !important;
  gap: 3px !important;
}

body.pc-mode .pc-play-hbar .char-nm {
  font-size: 13px !important;
  font-weight: 800 !important;
  color: #f5f2eb !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* Emotion badge */
body.pc-mode .pc-play-hbar .char-emo {
  display: inline-flex !important;
  align-items: center !important;
  min-height: 18px !important;
  padding: 0 6px !important;
  border-radius: 999px !important;
  background: rgba(59,73,124,0.45) !important;
  color: #d6dfff !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  width: fit-content !important;
}

body.pc-mode .pc-play-hbar .char-b .char-emo {
  background: rgba(106,54,67,0.42) !important;
  color: #ffd7df !important;
}

/* HP bar */
body.pc-mode .pc-play-hbar .char-hp {
  display: block !important;
  width: 100% !important;
  max-width: 86px !important;
  height: 4px !important;
  border-radius: 999px !important;
  overflow: hidden !important;
  background: rgba(255,255,255,0.08) !important;
}

body.pc-mode .pc-play-hbar .char-hp-f {
  display: block !important;
  width: 44% !important;
  height: 100% !important;
  border-radius: inherit !important;
  background: linear-gradient(90deg, rgba(212,162,78,0.98), rgba(91,141,239,0.95)) !important;
}
"""

# Ensure file ends with newline, then append
if output and output[-1].strip() != '':
    output.append('\n')

output.append(FINAL_HOTBAR)

with open(CSS_PATH, 'w', encoding='utf-8') as f:
    f.writelines(output)

final_count = sum(1 for line in ''.join(output).split('\n'))
print(f'Final: {final_count} lines (removed ~{original_count - final_count + len(FINAL_HOTBAR.split(chr(10)))} old hotbar lines)')
