import { defineConfig } from '@hypernym/bundler'
import { version, homepage } from './package.json'

const banner = `/*! effekt ${version} | ${homepage} | MIT License | Ivo Dolenc (c) 2024 */\n`

function replacePath(
  path: RegExp | string,
  replace: string,
): (id: string) => string {
  return (id) => {
    if (id.match(path)) return replace
    return id
  }
}

export default defineConfig({
  alias: true,
  entries: [
    // ------------------
    // * Main
    // ------------------
    {
      // esm
      input: './src/index.ts',
      output: './dist/index.mjs',
      externals: [/^@\/easing/],
      paths: (id) => replacePath(/^@\/easing/, './easing/index.mjs')(id),
      banner,
    },
    {
      // esm minified
      input: './src/index.ts',
      output: './dist/index.min.mjs',
      plugins: { esbuild: { minify: true } },
      externals: [/^@\/easing/],
      paths: (id) => replacePath(/^@\/easing/, './easing/index.mjs')(id),
      banner,
    },
    {
      // iife minified
      input: './src/index.ts',
      output: './dist/index.iife.js',
      plugins: { esbuild: { minify: true } },
      format: 'iife',
      name: 'Effekt',
      banner,
    },
    {
      // umd minified
      input: './src/index.ts',
      output: './dist/index.umd.js',
      plugins: { esbuild: { minify: true } },
      format: 'umd',
      name: 'Effekt',
      banner,
    },
    {
      // types
      types: './src/types/index.ts',
      output: './dist/types/index.d.ts',
    },

    // ------------------
    // * Easing
    // ------------------
    {
      // esm
      input: './src/easing/index.ts',
      output: './dist/easing/index.mjs',
      externals: [/^@\/utils/],
      paths: (id) => replacePath(/^@\/utils/, '../index.mjs')(id),
    },
    {
      // esm minified
      input: './src/easing/index.ts',
      output: './dist/easing/index.min.mjs',
      plugins: { esbuild: { minify: true } },
      externals: [/^@\/utils/],
      paths: (id) => replacePath(/^@\/utils/, '../index.mjs')(id),
    },
    {
      // iife minified
      input: './src/easing/index.ts',
      output: './dist/easing/index.iife.js',
      plugins: { esbuild: { minify: true } },
      format: 'iife',
      name: 'EffektEasing',
    },
    {
      // umd minified
      input: './src/easing/index.ts',
      output: './dist/easing/index.umd.js',
      plugins: { esbuild: { minify: true } },
      format: 'umd',
      name: 'EffektEasing',
    },
    {
      // types
      types: './src/types/easing/index.ts',
      output: './dist/types/easing/index.d.ts',
      externals: ['@/types'],
      paths: (id) => replacePath(/^@\/types/, '../index.ts')(id),
    },

    // ------------------
    // * Interaction
    // ------------------
    {
      // esm
      input: './src/interaction/in-view/index.ts',
      output: './dist/interaction/index.mjs',
      externals: [/^@\/utils/],
      paths: (id) => replacePath(/^@\/utils/, '../index.mjs')(id),
    },
    {
      // esm minified
      input: './src/interaction/in-view/index.ts',
      output: './dist/interaction/index.min.mjs',
      plugins: { esbuild: { minify: true } },
      externals: [/^@\/utils/],
      paths: (id) => replacePath(/^@\/utils/, '../index.mjs')(id),
    },
    {
      // iife minified
      input: './src/interaction/index.ts',
      output: './dist/interaction/index.iife.js',
      plugins: { esbuild: { minify: true } },
      format: 'iife',
      name: 'EffektInteraction',
    },
    {
      // umd minified
      input: './src/interaction/index.ts',
      output: './dist/interaction/index.umd.js',
      plugins: { esbuild: { minify: true } },
      format: 'umd',
      name: 'EffektInteraction',
    },
    {
      // types
      types: './src/types/interaction/index.ts',
      output: './dist/types/interaction/index.d.ts',
      externals: ['@/types'],
      paths: (id) => replacePath(/^@\/types/, '../index.ts')(id),
    },
  ],
})
