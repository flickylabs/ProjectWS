# Steamworks Upload Templates

This directory contains SteamPipe templates for the Windows + Proton release path.

The repository can build and stage the depot payload with:

```powershell
npm run steam:stage:windows
```

That command produces:

- `release/steam/win-unpacked/`: local Electron directory release
- `release/steam-depot/windows/`: upload payload for the Windows depot

Before uploading in Steamworks, copy the templates and replace:

- `<WINDOWS_DEPOT_ID>` with the Windows depot ID from Steamworks
- optional `setlive` branch value in `app_build_4709340.vdf.template`

Do not upload `steam_appid.txt`; the staging script removes it from the depot payload.
