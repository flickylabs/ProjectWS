# QW V6 R59: Phase E R59 — PCDialogueLog speaker → bubble 타입 매핑

## 원래 계획
> R59: speaker 필드 → bubble 타입 매핑

## 선행 R20 확인 내용
```
speaker === 'system'  → pc-log-system-row / pc-log-system-card (알림/이벤트 컨테이너)
speaker === 'judge'   → pc-log-judge-center (isolated bubble)
speaker === 'witness' → pc-log-row with witness avatar + pc-log-bubble is-witness
speaker === 'a' | 'b' → pc-log-row with party avatar + bubble
default               → '시스템' fallback (존재)
```

- **집중-10 경계 오염 0건** — UI 분기는 타입 기반 분리 명확
- 빈 content / 오분류 speaker: 데이터 레벨 검증 완료 (Apr 24 전사본 0건)

## 라운드 판정: **R59 완료 — 매핑 정합**
