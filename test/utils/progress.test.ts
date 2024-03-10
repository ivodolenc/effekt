import { describe, test, expect } from 'vitest'
import { progress } from '@/utils/progress'

describe('recalculates progress between the from and to values', () => {
  test('based on positive value', () => {
    expect(progress(0, 100, 30)).toStrictEqual(0.3)
    expect(progress(100, -150, 50)).toStrictEqual(0.2)
  })

  test('based on negative value', () => {
    expect(progress(150, -350, -150)).toStrictEqual(0.6)
    expect(progress(250, -250, -200)).toStrictEqual(0.9)
  })
})
