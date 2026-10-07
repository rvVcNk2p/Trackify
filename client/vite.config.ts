import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use '@/assets/styles/variables' as *;\n"
      }
    }
  },
  server: {
    // main.ts points axios at :8080, API calls are proxied to the Express server.
    // PORT is shared with server.js, so `PORT=5001 npm run dev` moves both
    // (macOS AirPlay Receiver occupies 5000).
    port: 8080,
    strictPort: true,
    proxy: {
      '/api': `http://localhost:${process.env.PORT || 5000}`
    }
  }
})
