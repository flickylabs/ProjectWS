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
          // 사건별 scriptedText 대용량 JSON 분리 (각 2MB+)
          if (id.includes('/src/data/scriptedText/spouse-01')) return 'st-spouse-01'
          if (id.includes('/src/data/scriptedText/family-01')) return 'st-family-01'
          if (id.includes('/src/data/scriptedText/friend-01')) return 'st-friend-01'
          // 사건별 data 묶음
          if (id.includes('/src/data/claimPolicies/spouse-01')) return 'case-spouse-01'
          if (id.includes('/src/data/claimPolicies/family-01')) return 'case-family-01'
          if (id.includes('/src/data/claimPolicies/friend-01')) return 'case-friend-01'
          if (id.includes('/src/data/cases/generated/spouse-01')) return 'case-spouse-01'
          if (id.includes('/src/data/cases/generated/family-01')) return 'case-family-01'
          if (id.includes('/src/data/cases/generated/friend-01')) return 'case-friend-01'
          if (id.includes('/src/data/') && (id.includes('truthPolicy') || id.includes('witnessBudget') || id.includes('actionAffinity') || id.includes('evalCases'))) return 'case-data'
          if (id.includes('/src/engine/') && (id.includes('llmDialogue') || id.includes('llmFreeQuestion') || id.includes('witnessEngine') || id.includes('verdictEngine') || id.includes('evalRunner'))) return 'engine'
        },
      },
    },
  },
})
