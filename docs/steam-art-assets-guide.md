# Project_Solomon Steam Art Assets Guide

Official specs change over time, so check Steamworks templates before final export:

- Steam graphical assets overview: https://partner.steamgames.com/doc/store/assets
- Steam graphical asset rules: https://partner.steamgames.com/doc/store/assets/rules
- Community/client icons: https://partner.steamgames.com/doc/store/assets/community

## Required Steam assets

| Asset | Size / format | Notes |
| --- | --- | --- |
| Header Capsule | 920 x 430 | Logo plus key artwork. |
| Small Capsule | 462 x 174 | Logo must remain readable at small size. |
| Main Capsule | 1232 x 706 | Primary store capsule. |
| Vertical Capsule | 748 x 896 | Logo plus key artwork. |
| Screenshots | 1920 x 1080 minimum, 16:9 | Show actual gameplay/UI. |
| Shortcut Icon | 256 x 256 or 512 x 512, PNG or ICO | Used for desktop shortcut. |
| App Icon | 184 x 184, JPG | Used in compact Steam client/Deck surfaces. |
| Library Capsule | 600 x 900 | Must include logo. |
| Library Hero | 3840 x 1240, PNG | Artwork only, no text. |
| Library Logo | 1280px wide and/or 720px tall, PNG | Transparent logotype/logomark. |
| Library Header Capsule | 920 x 430 | Library presentation. |

## Electron icon assets

Place final local app icons under `build/`:

```text
build/icon.ico
build/icon.png
```

Recommended source:

- Master icon: 1024 x 1024 PNG
- Export ICO with 16, 24, 32, 48, 64, 128, 256 sizes
- Keep the silhouette readable at 32 x 32

After icons are ready, add this to `electron-builder.json`:

```json
"win": {
  "icon": "build/icon.ico"
}
```

## Metadata still needed

- Short description
- Long description
- Legal/copyright line
- Support email or support URL
- Final product display name
- Steam store tags and genre choices
