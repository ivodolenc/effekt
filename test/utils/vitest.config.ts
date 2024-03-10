import { defineConfig } from 'vitest/config'
import { alias } from '../../.config/alias'

export default defineConfig({
  resolve: { alias },
  test: {
    include: ['test/utils/**/*.test.ts'],
    reporters: ['verbose'],
  },
})
