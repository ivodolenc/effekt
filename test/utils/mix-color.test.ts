import { describe, test, expect } from 'vitest'
import { mixColor } from '@/utils/mix-color'

describe('linearly interpolates color between the from and to values', () => {
  test('based on positive progress', () => {
    expect(mixColor(0, 50, 0)).toStrictEqual(0)
    expect(mixColor(0, 100, 0.3)).toBeCloseTo(54.772)
    expect(mixColor(0, 150, 0.5)).toBeCloseTo(106.066)
    expect(mixColor(0, 200, 1)).toStrictEqual(200)
  })

  test('based on negative progress', () => {
    expect(mixColor(0, 100, -0.3)).toStrictEqual(0)
    expect(mixColor(0, 150, -0.5)).toStrictEqual(0)
    expect(mixColor(0, 200, -1)).toStrictEqual(0)
  })
})
