import { defineConfig, resolvePaths } from '@hypernym/bundler'
import { version, homepage } from './package.json'

const banner = `/*! effekt ${version} | ${homepage} | MIT License | Ivo Dolenc (c) 2024 */\n`

export default defineConfig({
  entries: [
    // Main
    {
      input: './src/index.ts',
      externals: [/^@\/easing/],
      paths: resolvePaths([
        { find: /^@\/easing/, replacement: './easing/index.mjs' },
      ]),
      banner,
    },
    {
      input: './src/index.ts',
      output: './dist/index.min.mjs',
      minify: true,
      banner,
    },
    {
      input: './src/index.ts',
      output: './dist/index.iife.js',
      name: 'Effekt',
      format: 'iife',
      minify: true,
      banner,
    },
    {
      input: './src/index.ts',
      output: './dist/index.umd.js',
      name: 'Effekt',
      format: 'umd',
      minify: true,
      banner,
    },
    {
      dts: './src/types/index.ts',
    },
    // Easing
    {
      input: './src/easing/index.ts',
      externals: [/^@\/utils/],
      paths: resolvePaths([{ find: /^@\/utils/, replacement: '../index.mjs' }]),
    },
    {
      input: './src/easing/index.ts',
      output: './dist/easing/index.min.mjs',
      minify: true,
    },
    {
      input: './src/easing/index.ts',
      output: './dist/easing/index.iife.js',
      name: 'EffektEasing',
      format: 'iife',
      minify: true,
    },
    {
      input: './src/easing/index.ts',
      output: './dist/easing/index.umd.js',
      name: 'EffektEasing',
      format: 'umd',
      minify: true,
    },
    {
      dts: './src/types/easing/index.ts',
      externals: ['@/types'],
      paths: resolvePaths([{ find: /^@\/types/, replacement: '../index.mts' }]),
    },
    // Interaction
    {
      input: './src/interaction/in-view/index.ts',
      output: './dist/interaction/index.mjs',
      externals: ['@/utils'],
      paths: resolvePaths([{ find: /@\/utils$/, replacement: '../index.mjs' }]),
    },
    {
      input: './src/interaction/in-view/index.ts',
      output: './dist/interaction/index.min.mjs',
      minify: true,
    },
    {
      input: './src/interaction/index.ts',
      output: './dist/interaction/index.iife.js',
      name: 'EffektInteraction',
      format: 'iife',
      minify: true,
    },
    {
      input: './src/interaction/index.ts',
      output: './dist/interaction/index.umd.js',
      name: 'EffektInteraction',
      format: 'umd',
      minify: true,
    },
    {
      dts: './src/types/interaction/index.ts',
      externals: ['@/types'],
      paths: resolvePaths([{ find: /^@\/types/, replacement: '../index.mts' }]),
    },
  ],
})
