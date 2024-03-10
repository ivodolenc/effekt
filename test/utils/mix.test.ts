import { describe, test, expect } from 'vitest'
import { mix } from '@/utils/mix'

describe('linearly interpolates between the from and to values', () => {
  test('based on positive progress', () => {
    expect(mix(0, 50, 0)).toStrictEqual(0)
    expect(mix(0, 100, 0.3)).toStrictEqual(30)
    expect(mix(0, 150, 0.5)).toStrictEqual(75)
    expect(mix(0, 200, 1)).toStrictEqual(200)
  })

  test('based on negative progress', () => {
    expect(mix(0, 100, -0.3)).toStrictEqual(-30)
    expect(mix(0, 150, -0.5)).toStrictEqual(-75)
    expect(mix(0, 200, -1)).toStrictEqual(-200)
  })
})
