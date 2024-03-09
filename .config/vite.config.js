import { defineConfig } from 'vite'
import { alias } from './alias'

export default defineConfig({
  resolve: { alias },
})
