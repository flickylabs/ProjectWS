/**
 * 이모지를 MS Fluent Emoji 이미지로 렌더링하는 컴포넌트.
 * manifest.json에 매핑이 있으면 이미지, 없으면 텍스트 이모지 폴백.
 */
// manifest를 직접 import하지 않고, 정적 매핑으로 번들 — public 폴더 JSON import 문제 회피
const emojiMap: Record<string, string> = {
  "⚖️": "2696-fe0f.png", "⚡": "26a1.png", "🔍": "1f50d.png", "🔒": "1f512.png",
  "📋": "1f4cb.png", "⚠️": "26a0-fe0f.png", "😐": "1f610.png", "📄": "1f4c4.png",
  "😤": "1f624.png", "😰": "1f630.png", "😡": "1f621.png", "🚪": "1f6aa.png",
  "🤝": "1f91d.png", "😞": "1f61e.png", "💡": "1f4a1.png", "💬": "1f4ac.png",
  "👨": "1f468.png", "👩": "1f469.png", "💥": "1f4a5.png", "👑": "1f451.png",
  "🏆": "1f3c6.png", "📊": "1f4ca.png", "🎯": "1f3af.png", "❓": "2753.png",
  "⚠": "26a0.png", "🔓": "1f513.png", "★": "2605.png", "⚙️": "2699-fe0f.png",
  "💭": "1f4ad.png", "🔵": "1f535.png", "🔴": "1f534.png", "🧑‍⚖️": "1f9d1-200d-2696-fe0f.png",
  "🗣️": "1f5e3-fe0f.png", "📤": "1f4e4.png", "🔄": "1f504.png", "📌": "1f4cc.png",
  "📎": "1f4ce.png", "🏠": "1f3e0.png", "⭐": "2b50.png", "➡️": "27a1-fe0f.png",
  "❗": "2757.png", "⏳": "23f3.png", "⚪": "26aa.png", "🏦": "1f3e6.png",
  "📹": "1f4f9.png", "📑": "1f4d1.png", "📱": "1f4f1.png", "📲": "1f4f2.png",
  "⚔️": "2694-fe0f.png", "✍️": "270d-fe0f.png", "🛡️": "1f6e1-fe0f.png", "🔥": "1f525.png",
  "😔": "1f614.png", "✅": "2705.png", "📖": "1f4d6.png", "✂️": "2702-fe0f.png",
  "🔬": "1f52c.png", "🛠": "1f6e0.png", "👂": "1f442.png", "🥇": "1f947.png",
  "🥈": "1f948.png", "🥉": "1f949.png", "🏛️": "1f3db-fe0f.png", "💼": "1f4bc.png",
  "👨‍👩‍👧": "1f468-200d-1f469-200d-1f467.png", "🏢": "1f3e2.png", "🫂": "1fac2.png",
  "🚧": "1f6a7.png", "📍": "1f4cd.png", "👥": "1f465.png", "📂": "1f4c2.png",
  "⏸️": "23f8-fe0f.png", "✋": "270b.png", "🕊️": "1f54a-fe0f.png", "🤔": "1f914.png",
  "🧤": "1f9e4.png", "🔗": "1f517.png", "✓": "2713.png", "✕": "2715.png",
  "✗": "2717.png", "♥": "2665.png",
  "📢": "1f4e2.png", "📨": "1f4e8.png", "👈": "1f448.png", "👉": "1f449.png",
  "❤️": "2764-fe0f.png", "💢": "1f4a2.png", "🎭": "1f3ad.png", "📡": "1f4e1.png",
  "💑": "1f491.png", "🏘️": "1f3d8-fe0f.png",
  "🌱": "tier_01_seedling.png", "🌿": "tier_02_herb.png", "💎": "tier_06_gem.png",
  "📧": "evidence_email.png", "💻": "evidence_digital.png", "📷": "evidence_photo.png",
  "🔐": "evidence_access.png", "🔊": "evidence_audio.png",
}

interface EmojiProps {
  /** 이모지 문자 (예: "⚖️", "😐") */
  char: string
  /** 크기 (px). 기본값 16 */
  size?: number
  /** 추가 className */
  className?: string
}

export default function Emoji({ char, size = 16, className = '' }: EmojiProps) {
  const file = emojiMap[char]

  if (!file) {
    // manifest에 없으면 텍스트 이모지 폴백
    return <span className={className} style={{ fontSize: size }}>{char}</span>
  }

  return (
    <img
      src={`/emoji/${file}`}
      alt={char}
      width={size}
      height={size}
      className={`inline-block align-middle ${className}`}
      loading="lazy"
      draggable={false}
    />
  )
}

/**
 * 텍스트 내의 이모지를 자동으로 이미지로 변환하는 유틸.
 * 시스템 메시지 등에서 "📋 증거 제시:" 같은 텍스트를 처리할 때 사용.
 */
export function replaceEmojisInText(text: string, size = 14): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = []
  let lastIdx = 0
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\u200D)+/gu

  for (const match of text.matchAll(emojiRegex)) {
    const idx = match.index!
    if (idx > lastIdx) {
      parts.push(text.slice(lastIdx, idx))
    }
    const emoji = match[0]
    if (emojiMap[emoji]) {
      parts.push(<Emoji key={idx} char={emoji} size={size} />)
    } else {
      parts.push(emoji)
    }
    lastIdx = idx + emoji.length
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx))
  }
  return parts
}
