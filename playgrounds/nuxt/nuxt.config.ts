import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  telemetry: false,
  devtools: { enabled: false },
  css: ['./styles/app.css'],
  vite: {
    plugins: [tailwindcss() as any],
  },
  alias: {
    '@': resolve('../../packages/effekt/src'),
    '#effekt': resolve('../../packages/effekt/src'),
  },
})
