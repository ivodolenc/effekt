import { ignoresConfig } from '@hypernym/eslint-config'
import { jsxConfig, tsxConfig } from '@hypernym/eslint-config/react'

/** @type {import("eslint").Linter.Config[]} */
export default [jsxConfig, tsxConfig, ignoresConfig]
