import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const aliasDir = `${resolve(cwd(), './src')}/`

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: aliasDir },
      { find: /^~\//, replacement: aliasDir },
    ],
  },
})
