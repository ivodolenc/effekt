import { defineConfig } from '@hypernym/bundler'
import { version, homepage } from './package.json'

const banner = `/*! effekt ${version} | ${homepage} | MIT License | Ivo Dolenc (c) 2024 */\n`

export default defineConfig({
  alias: true,
  entries: [
    {
      // main esm
      input: './src/index.ts',
      output: './dist/index.mjs',
      banner,
    },
    {
      // main esm minified
      input: './src/index.ts',
      output: './dist/index.min.mjs',
      plugins: { esbuild: { minify: true } },
      banner,
    },
    {
      // main iife minified
      input: './src/index.ts',
      output: './dist/index.iife.min.js',
      plugins: { esbuild: { minify: true } },
      format: 'iife',
      name: 'Effekt',
      banner,
    },
    {
      // main umd minified
      input: './src/index.ts',
      output: './dist/index.umd.min.js',
      plugins: { esbuild: { minify: true } },
      format: 'umd',
      name: 'Effekt',
      banner,
    },
    {
      // main types
      types: './src/types/index.ts',
      output: './dist/types/index.d.ts',
    },
    {
      // easing esm
      input: './src/easing/index.ts',
      output: './dist/easing/index.mjs',
    },
    {
      // easing types
      types: './src/types/easing/index.ts',
      output: './dist/types/easing/index.d.ts',
    },
  ],
})
