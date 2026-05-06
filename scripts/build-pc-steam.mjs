import { spawnSync } from 'node:child_process'

const env = Object.fromEntries(
  Object.entries(process.env).filter(([key, value]) => key && !key.startsWith('=') && value !== undefined),
)

const result = spawnSync('npm run build:pc', [], {
  stdio: 'inherit',
  env: {
    ...env,
    VITE_STEAM_AUTH_REQUIRED: 'true',
  },
  shell: true,
})

process.exit(result.status ?? 1)
