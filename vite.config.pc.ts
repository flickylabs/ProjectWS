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
          // 사건별 scriptedText 대용량 JSON을 사건 단위 독립 청크로 분리.
          // 활성 3건이 각 2MB+ 여서 engine 청크에 흡수되면 초기 로드에 부담.
          if (id.includes('/src/data/scriptedText/spouse-01')) return 'st-spouse-01'
          if (id.includes('/src/data/scriptedText/family-01')) return 'st-family-01'
          if (id.includes('/src/data/scriptedText/friend-01')) return 'st-friend-01'
          // 사건별 claimPolicy/structure/game-events JSON도 사건 단위로 묶음.
          if (id.includes('/src/data/claimPolicies/spouse-01')) return 'case-spouse-01'
          if (id.includes('/src/data/claimPolicies/family-01')) return 'case-family-01'
          if (id.includes('/src/data/claimPolicies/friend-01')) return 'case-friend-01'
          if (id.includes('/src/data/cases/generated/spouse-01')) return 'case-spouse-01'
          if (id.includes('/src/data/cases/generated/family-01')) return 'case-family-01'
          if (id.includes('/src/data/cases/generated/friend-01')) return 'case-friend-01'
          // 기타 공용 데이터
          if (id.includes('/src/data/')) return 'case-data'
          // 엔진 세분화
          if (id.includes('/src/engine/llmDialogue') ||
              id.includes('/src/engine/llmFreeQuestion') ||
              id.includes('/src/engine/blueprintPrompt') ||
              id.includes('/src/engine/atomSelectionEngine')) return 'engine-llm'
          if (id.includes('/src/engine/')) return 'engine-core'
        },
      },
    },
  },
  server: {
    port: 5174,
    open: '/index-pc.html',
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
})
