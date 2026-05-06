PC 증거 뷰어 요청 반영 완료했습니다.

핵심 변경:
- `viewerData.media` 공통 payload를 추가했습니다.
- `viewerData.meta.type`는 raw 표현 타입을 유지합니다.
  - 예: `photo_video`, `photo`, `video`, `dashcam`, `financial_record`, `receipt`, `social_post`
- `viewerData.meta.viewerType`를 추가했습니다.
  - 기존 뷰어 라우팅용 normalized 값입니다.
  - 예: `photo_video -> cctv`, `financial_record -> bank`, `social_post -> sns`

실제 반영 타입:
- `photo_video`, `photo`, `video`, `dashcam`, `cctv`
  - `media.imageUrl/posterUrl`
  - `media.frameImages[]`
- `device`
  - `media.imageUrl`
  - `media.screenshotImages[]`
- `sns`, `social_post`
  - `media.imageUrl`
- `chat`, `email`
  - `media.imageUrl`
- `bank`, `financial_record`, `receipt`, `spreadsheet`
  - `media.imageUrl`

필드:
- `viewerData.media.imageUrl`
- `viewerData.media.thumbnailUrl`
- `viewerData.media.posterUrl`
- `viewerData.media.width`
- `viewerData.media.height`
- `viewerData.media.alt`
- `viewerData.media.caption`
- `viewerData.media.frameImages[]`
- `viewerData.media.screenshotImages[]`

적용 범위:
- generated 전체 재-enrich 완료
- refined 117건 기준 media 포함 evidence `337 / 798`

확인용 파일:
- [pc-evidence-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-media-report-2026-04-10.json)
- [thread-a-pc-evidence-media-worklog-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-pc-evidence-media-worklog-2026-04-10.md)

Thread B 쪽 처리 권장:
- 아이콘/표현 라벨은 raw `meta.type`를 그대로 써도 됩니다.
- 실제 서브뷰 라우팅은 `meta.viewerType ?? normalize(meta.type)`를 사용하면 됩니다.
- `media`가 없는 evidence는 기존 텍스트 구조 렌더를 그대로 유지하면 됩니다.
