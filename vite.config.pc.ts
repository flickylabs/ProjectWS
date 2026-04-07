import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.',
  build: {
    outDir: 'dist-pc',
    rollupOptions: {
      input: 'index-pc.html',
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react')) return 'vendor-react'
          if (id.includes('node_modules/zustand')) return 'vendor-zustand'
          if (id.includes('/src/data/')) return 'case-data'
          if (id.includes('/src/engine/')) return 'engine'
        },
      },
    },
  },
  server: {
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
})
