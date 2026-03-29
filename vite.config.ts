import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react')) return 'vendor-react'
          if (id.includes('node_modules/zustand')) return 'vendor-zustand'
          if (id.includes('/src/data/') && (id.includes('truthPolicy') || id.includes('witnessBudget') || id.includes('actionAffinity') || id.includes('evalCases'))) return 'case-data'
          if (id.includes('/src/engine/') && (id.includes('llmDialogue') || id.includes('llmFreeQuestion') || id.includes('witnessEngine') || id.includes('verdictEngine') || id.includes('evalRunner'))) return 'engine'
        },
      },
    },
  },
})
