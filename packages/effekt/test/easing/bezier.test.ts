import { describe, test, expect } from 'vitest'
import { cubicBezier } from '@/easing/bezier'

describe('creates a cubic-bezier easing effect', () => {
  test('based on linear function', () => {
    const linear = cubicBezier(0, 0, 1, 1)

    expect(linear(0)).toStrictEqual(0)
    expect(linear(0.25)).toStrictEqual(0.25)
    expect(linear(0.5)).toStrictEqual(0.5)
    expect(linear(0.75)).toStrictEqual(0.75)
    expect(linear(1)).toStrictEqual(1)
  })

  test('based on ease-out-cubic function', () => {
    const easeOutCubic = cubicBezier(0.33, 1, 0.68, 1)

    expect(easeOutCubic(0)).toStrictEqual(0)
    expect(easeOutCubic(0.25)).toBeCloseTo(0.577)
    expect(easeOutCubic(0.5)).toBeCloseTo(0.872)
    expect(easeOutCubic(0.75)).toBeCloseTo(0.983)
    expect(easeOutCubic(1)).toStrictEqual(1)
  })
})
