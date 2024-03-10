import { describe, test, expect } from 'vitest'
import { clamp } from '@/utils/clamp'

describe('clamps a value within a range of min and max values', () => {
  test('clamps a positive value within the specified range', () => {
    expect(clamp(0, 10, 5)).toStrictEqual(5)
  })

  test('clamps a negative value within the specified range', () => {
    expect(clamp(0, 10, -5)).toStrictEqual(0)
  })

  test('clamps a positive value outside the specified range', () => {
    expect(clamp(0, 10, 15)).toStrictEqual(10)
  })

  test('clamps a negative value outside the specified range', () => {
    expect(clamp(0, 10, -15)).toStrictEqual(0)
  })
})
