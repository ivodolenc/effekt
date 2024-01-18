import { defineConfig } from '@hypernym/bundler'
import { version, homepage } from './package.json'

const banner = `/*! animer v${version} | ${homepage} | MIT License | Ivo Dolenc (c) 2024 */\n`

export default defineConfig({
  alias: true,
  entries: [
    {
      // animer esm
      input: './src/index.ts',
      output: './dist/index.mjs',
      banner,
    },
    {
      // animer types
      types: './src/types/index.ts',
      output: './dist/types/index.d.ts',
    },
  ],
})
