import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(cwd(), './src')}/`,
    },
  },
  test: {
    include: ['test/utils/**/*.test.ts'],
    reporters: ['verbose'],
  },
})
