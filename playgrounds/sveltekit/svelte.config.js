import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '@': '../../packages/effekt/src',
      '#effekt': '../../packages/effekt/src',
    },
  },
}

export default config
