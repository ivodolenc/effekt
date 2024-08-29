import { jsConfig, tsConfig, ignores } from '@hypernym/eslint-config'

/** @type {import("eslint").Linter.Config[]} */
export default [
  jsConfig,
  tsConfig,
  {
    ignores: [...ignores, 'playgrounds/**/*'],
  },
]
