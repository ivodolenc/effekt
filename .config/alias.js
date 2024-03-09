import { cwd } from 'node:process'
import { resolve } from 'node:path'

const dir = `${resolve(cwd(), './src')}/`

export const alias = [
  { find: /^@\//, replacement: dir },
  { find: /^~\//, replacement: dir },
]
