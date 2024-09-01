import { describe, test, expect } from 'vitest'
import { round } from '@/utils/round'

describe('rounds a number with a specified precision', () => {
  test('based on 1 decimal', () => {
    expect(round(77.6516, 1)).toStrictEqual(77.7)
  })

  test('based on 2 decimal', () => {
    expect(round(278.0686)).toStrictEqual(278.07)
    expect(round(734.50239615, 2)).toStrictEqual(734.5)
  })

  test('based on 3 decimal', () => {
    expect(round(948.203849, 3)).toStrictEqual(948.204)
  })

  test('based on 4 decimal', () => {
    expect(round(172.489745, 4)).toStrictEqual(172.4897)
  })
})
