import { describe, test, expect } from 'vitest'
import { easingOut, easingInOut, easingOutIn } from '@/easing/modifiers'
import type { Easing } from '@/types'

describe('creates easing modifiers', () => {
  const cubic: Easing = (p) => Math.pow(p, 3)

  test('turns ease-in into ease-out effect', () => {
    const easeOutCubic = easingOut(cubic)

    expect(easeOutCubic(0)).toStrictEqual(0)
    expect(easeOutCubic(0.25)).toBeCloseTo(0.578)
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875)
    expect(easeOutCubic(0.75)).toBeCloseTo(0.984)
    expect(easeOutCubic(1)).toStrictEqual(1)
  })

  test('turns ease-in into ease-in-out effect', () => {
    const easeInOutCubic = easingInOut(cubic)

    expect(easeInOutCubic(0)).toStrictEqual(0)
    expect(easeInOutCubic(0.25)).toBeCloseTo(0.062)
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5)
    expect(easeInOutCubic(0.75)).toBeCloseTo(0.937)
    expect(easeInOutCubic(1)).toStrictEqual(1)
  })

  test('turns ease-in into ease-out-in effect', () => {
    const easeOutInCubic = easingOutIn(cubic)

    expect(easeOutInCubic(0)).toStrictEqual(0)
    expect(easeOutInCubic(0.25)).toBeCloseTo(0.437)
    expect(easeOutInCubic(0.5)).toBeCloseTo(0.5)
    expect(easeOutInCubic(0.75)).toBeCloseTo(0.562)
    expect(easeOutInCubic(1)).toStrictEqual(1)
  })
})
