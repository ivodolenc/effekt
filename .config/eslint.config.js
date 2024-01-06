import { jsConfig, tsConfig, ignoresConfig } from '@hypernym/eslint-config'

export default [
  jsConfig,
  tsConfig,
  ignoresConfig,
  {
    files: tsConfig.files,
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
    },
  },
]
