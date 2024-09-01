import { describe, test, expect } from 'vitest'
import { spring as springEasing } from '@/easing/spring'

describe('creates a spring easing effect', () => {
  test('based on default options', () => {
    const spring = springEasing()

    expect(spring(0)).toStrictEqual(0)
    expect(spring(0.25)).toBeCloseTo(1.153)
    expect(spring(0.5)).toBeCloseTo(0.979)
    expect(spring(0.75)).toBeCloseTo(1.002)
    expect(spring(1)).toStrictEqual(1)
  })

  test('based on custom options', () => {
    const spring = springEasing({
      mass: 3.0,
      stiffness: 90,
      damping: 15,
      velocity: 5,
      duration: 2,
    })

    expect(spring(0)).toStrictEqual(0)
    expect(spring(0.25)).toBeCloseTo(1.313)
    expect(spring(0.5)).toBeCloseTo(0.945)
    expect(spring(0.75)).toBeCloseTo(0.998)
    expect(spring(1)).toStrictEqual(1)
  })
})
