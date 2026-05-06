import type { LocaleCode } from '../locales'

export type SettingsMessageKey =
  "settings.title"
  | "settings.close"
  | "settings.closeWithShortcut"
  | "settings.category.display"
  | "settings.category.audio"
  | "settings.category.gameplay"
  | "settings.category.data"
  | "settings.category.language"
  | "settings.category.accessibility"
  | "settings.category.controls"
  | "settings.category.account"
  | "settings.category.about"
  | "settings.category.preview"
  | "settings.preview.nextCycle"
  | "settings.preview.designGuideNote"
  | "settings.preview.accessibility.description"
  | "settings.preview.controls.description"
  | "settings.preview.account.description"
  | "settings.about.title"
  | "settings.about.description"
  | "settings.about.versionGroup"
  | "settings.about.versionBuildLabel"
  | "settings.about.versionBuildValue"
  | "settings.about.engineLabel"
  | "settings.about.engineValue"
  | "settings.about.creditsGroup"
  | "settings.about.credits.title"
  | "settings.about.credits.description"
  | "settings.about.licenseGroup"
  | "settings.about.licenseDescription"
  | "settings.language.title"
  | "settings.language.description"
  | "settings.language.displayLanguage"
  | "settings.language.displayLanguageDescription"
  | "settings.language.current"
  | "settings.language.restartNote"

export const settingsMessages = {
  ko: {
    "settings.title": "설정",
    "settings.close": "닫기",
    "settings.closeWithShortcut": "닫기 (Esc)",
    "settings.category.display": "화면",
    "settings.category.audio": "오디오",
    "settings.category.gameplay": "게임플레이",
    "settings.category.data": "데이터",
    "settings.category.language": "언어",
    "settings.category.accessibility": "접근성",
    "settings.category.controls": "키보드",
    "settings.category.account": "계정",
    "settings.category.about": "정보",
    "settings.category.preview": "준비 중",
    "settings.preview.nextCycle": "이 카테고리는 다음 사이클에서 옵션이 추가됩니다.",
    "settings.preview.designGuideNote": "v2.0 디자인 가이드의 카테고리 매트릭스 참고",
    "settings.preview.accessibility.description": "색약 모드·큰 글씨·자막·깜빡임 감소 — 다음 사이클",
    "settings.preview.controls.description": "단축키 커스터마이징 — 다음 사이클",
    "settings.preview.account.description": "로그인·세이브 동기 — 확장 예정",
    "settings.about.title": "정보",
    "settings.about.description": "버전 · 크레딧 · 라이선스",
    "settings.about.versionGroup": "버전",
    "settings.about.versionBuildLabel": "빌드",
    "settings.about.versionBuildValue": "v0.x — 개발 중 (PC 베타)",
    "settings.about.engineLabel": "엔진",
    "settings.about.engineValue": "React 19 · TypeScript 5.9 · Vite 8",
    "settings.about.creditsGroup": "크레딧",
    "settings.about.credits.title": "솔로몬의 딜레마: 진실의 재판",
    "settings.about.credits.description": "AI 둘의 싸움을 인간 지혜로 재판하는 리플레이형 추리 게임",
    "settings.about.licenseGroup": "라이선스",
    "settings.about.licenseDescription": "오픈소스 라이브러리 · 폰트 · 에셋 정보 (개발 중)",
    "settings.language.title": "언어",
    "settings.language.description": "게임 UI에 사용할 표시 언어를 선택합니다.",
    "settings.language.displayLanguage": "표시 언어",
    "settings.language.displayLanguageDescription": "선택 즉시 홈, 설정, 시스템 UI에 적용됩니다.",
    "settings.language.current": "현재 언어",
    "settings.language.restartNote": "일부 사건 본문과 저장된 기록은 다음 화면 전환 이후 갱신될 수 있습니다.",
  },
  en: {
    "settings.title": "Settings",
    "settings.close": "Close",
    "settings.closeWithShortcut": "Close (Esc)",
    "settings.category.display": "Display",
    "settings.category.audio": "Audio",
    "settings.category.gameplay": "Gameplay",
    "settings.category.data": "Data",
    "settings.category.language": "Language",
    "settings.category.accessibility": "Accessibility",
    "settings.category.controls": "Controls",
    "settings.category.account": "Account",
    "settings.category.about": "About",
    "settings.category.preview": "Coming Soon",
    "settings.preview.nextCycle": "Options for this category will be added in a later cycle.",
    "settings.preview.designGuideNote": "See the category matrix in the v2.0 design guide.",
    "settings.preview.accessibility.description": "Color support, larger text, captions, and reduced flashing are planned for a later cycle.",
    "settings.preview.controls.description": "Shortcut customization is planned for a later cycle.",
    "settings.preview.account.description": "Login and save sync are planned as future expansions.",
    "settings.about.title": "About",
    "settings.about.description": "Version · Credits · License",
    "settings.about.versionGroup": "Version",
    "settings.about.versionBuildLabel": "Build",
    "settings.about.versionBuildValue": "v0.x — In Development (PC Beta)",
    "settings.about.engineLabel": "Engine",
    "settings.about.engineValue": "React 19 · TypeScript 5.9 · Vite 8",
    "settings.about.creditsGroup": "Credits",
    "settings.about.credits.title": "Verdict Zero: Trial of Truth",
    "settings.about.credits.description": "A replayable courtroom deduction game where you weigh AI testimony against the truth.",
    "settings.about.licenseGroup": "License",
    "settings.about.licenseDescription": "Open-source library, font, and asset information is in development.",
    "settings.language.title": "Language",
    "settings.language.description": "Choose the display language for the game UI.",
    "settings.language.displayLanguage": "Display Language",
    "settings.language.displayLanguageDescription": "Applies immediately to home, settings, and system UI.",
    "settings.language.current": "Current Language",
    "settings.language.restartNote": "Some case text and saved records may refresh after the next screen transition.",
  },
  ja: {
    "settings.title": "設定",
    "settings.close": "閉じる",
    "settings.closeWithShortcut": "閉じる（Esc）",
    "settings.category.display": "画面",
    "settings.category.audio": "オーディオ",
    "settings.category.gameplay": "ゲームプレイ",
    "settings.category.data": "データ",
    "settings.category.language": "言語",
    "settings.category.accessibility": "アクセシビリティ",
    "settings.category.controls": "操作",
    "settings.category.account": "アカウント",
    "settings.category.about": "情報",
    "settings.category.preview": "準備中",
    "settings.preview.nextCycle": "このカテゴリのオプションは次のサイクルで追加されます。",
    "settings.preview.designGuideNote": "v2.0デザインガイドのカテゴリマトリクスを参照してください。",
    "settings.preview.accessibility.description": "色覚サポート、大きな文字、字幕、点滅軽減は次のサイクルで追加予定です。",
    "settings.preview.controls.description": "ショートカットのカスタマイズは次のサイクルで追加予定です。",
    "settings.preview.account.description": "ログインとセーブ同期は今後の拡張予定です。",
    "settings.about.title": "情報",
    "settings.about.description": "バージョン・クレジット・ライセンス",
    "settings.about.versionGroup": "バージョン",
    "settings.about.versionBuildLabel": "ビルド",
    "settings.about.versionBuildValue": "v0.x — 開発中（PCベータ）",
    "settings.about.engineLabel": "エンジン",
    "settings.about.engineValue": "React 19 · TypeScript 5.9 · Vite 8",
    "settings.about.creditsGroup": "クレジット",
    "settings.about.credits.title": "ソロモンのジレンマ：真実の裁き",
    "settings.about.credits.description": "AI同士の対立を人間の知恵で裁く、リプレイ型の推理ゲーム",
    "settings.about.licenseGroup": "ライセンス",
    "settings.about.licenseDescription": "オープンソースライブラリ、フォント、アセット情報は開発中です。",
    "settings.language.title": "言語",
    "settings.language.description": "ゲームUIに使用する表示言語を選択します。",
    "settings.language.displayLanguage": "表示言語",
    "settings.language.displayLanguageDescription": "ホーム、設定、システムUIにすぐ適用されます。",
    "settings.language.current": "現在の言語",
    "settings.language.restartNote": "一部の事件本文と保存済み記録は、次の画面遷移後に更新される場合があります。",
  },
  "zh-CN": {
    "settings.title": "设置",
    "settings.close": "关闭",
    "settings.closeWithShortcut": "关闭（Esc）",
    "settings.category.display": "画面",
    "settings.category.audio": "音频",
    "settings.category.gameplay": "游戏",
    "settings.category.data": "数据",
    "settings.category.language": "语言",
    "settings.category.accessibility": "无障碍",
    "settings.category.controls": "键盘",
    "settings.category.account": "账号",
    "settings.category.about": "关于",
    "settings.category.preview": "准备中",
    "settings.preview.nextCycle": "此分类的选项将在后续周期中加入。",
    "settings.preview.designGuideNote": "参考 v2.0 设计指南中的分类矩阵。",
    "settings.preview.accessibility.description": "色觉模式、大字体、字幕与降低闪烁将在后续周期加入。",
    "settings.preview.controls.description": "快捷键自定义将在后续周期加入。",
    "settings.preview.account.description": "登录与存档同步计划作为后续扩展加入。",
    "settings.about.title": "关于",
    "settings.about.description": "版本 · 制作 · 许可证",
    "settings.about.versionGroup": "版本",
    "settings.about.versionBuildLabel": "构建",
    "settings.about.versionBuildValue": "v0.x — 开发中（PC Beta）",
    "settings.about.engineLabel": "引擎",
    "settings.about.engineValue": "React 19 · TypeScript 5.9 · Vite 8",
    "settings.about.creditsGroup": "制作",
    "settings.about.credits.title": "真相裁决：零点审判",
    "settings.about.credits.description": "用人类判断审理 AI 证词冲突的可重玩推理游戏",
    "settings.about.licenseGroup": "许可证",
    "settings.about.licenseDescription": "开源库、字体与素材信息仍在开发中。",
    "settings.language.title": "语言",
    "settings.language.description": "选择游戏 UI 使用的显示语言。",
    "settings.language.displayLanguage": "显示语言",
    "settings.language.displayLanguageDescription": "会立即应用到主页、设置与系统 UI。",
    "settings.language.current": "当前语言",
    "settings.language.restartNote": "部分案件正文和已保存记录可能会在下一次界面切换后刷新。",
  },
} as const satisfies Record<LocaleCode, Record<SettingsMessageKey, string>>
