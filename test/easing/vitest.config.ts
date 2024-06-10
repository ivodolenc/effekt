import { defineConfig } from 'vitest/config'
import { alias } from '../../.config/alias'

export default defineConfig({
  resolve: { alias },
  test: {
    include: ['test/easing/**/*.test.ts'],
    reporters: ['verbose'],
  },
})
