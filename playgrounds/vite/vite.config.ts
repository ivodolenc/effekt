import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': resolve('../../packages/effekt/src'),
      '#effekt': resolve('../../packages/effekt/src'),
    },
  },
})
