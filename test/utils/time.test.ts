import { describe, test, expect } from 'vitest'
import { secToMs, msToSec } from '@/utils/time'

describe('converts time units', () => {
  test('converts seconds to milliseconds', () => {
    expect(secToMs(0.3)).toStrictEqual(300)
    expect(secToMs(3.6)).toStrictEqual(3600)
  })

  test('converts milliseconds to seconds', () => {
    expect(msToSec(330)).toStrictEqual(0.33)
    expect(msToSec(2500)).toStrictEqual(2.5)
  })
})
