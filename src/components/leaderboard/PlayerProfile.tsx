import { useState } from 'react'
import { loadProfile, saveProfile } from '../../data/leaderboard'

interface Props {
  onClose: () => void
  onSave: () => void
}

export default function PlayerProfile({ onClose, onSave }: Props) {
  const profile = loadProfile()
  const [name, setName] = useState(profile.playerName)

  const handleSave = () => {
    const trimmed = name.trim() || '재판관'
    saveProfile({ ...profile, playerName: trimmed.slice(0, 8) })
    onSave()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/90 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-xs p-5">
        <h3 className="text-sm font-bold text-amber-400 mb-4">닉네임 설정</h3>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={8}
          placeholder="재판관"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
        />
        <p className="text-xs text-gray-600 mt-1">2~8자, 리더보드에 표시됩니다.</p>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 text-xs px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700">취소</button>
          <button onClick={handleSave} disabled={name.trim().length < 2} className="flex-1 text-xs px-3 py-2 rounded-lg bg-amber-600 text-gray-950 font-bold hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500">저장</button>
        </div>
      </div>
    </div>
  )
}
