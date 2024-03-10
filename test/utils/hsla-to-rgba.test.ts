import { describe, test, expect } from 'vitest'
import { hslaToRgba } from '@/utils/hsla-to-rgba'

describe('converts hsla to rgba color format', () => {
  test('returns converted rgba color', () => {
    expect(hslaToRgba(180, 100, 60, 0.3)).toStrictEqual([51, 255, 255, 0.3])

    expect(hslaToRgba(75, 100, 60, 0.6)).toStrictEqual([204, 255, 51, 0.6])

    expect(hslaToRgba(180, 100, 60, 1)).toStrictEqual([51, 255, 255, 1])

    expect(hslaToRgba(75, 100, 60, 1)).toStrictEqual([204, 255, 51, 1])
  })
})
