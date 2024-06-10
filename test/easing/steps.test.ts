import { describe, test, expect } from 'vitest'
import { steps } from '@/easing/steps'

describe('creates a steps easing effect', () => {
  test('based on position end', () => {
    const stepsEnd = steps(4)

    expect(stepsEnd(0)).toStrictEqual(0)
    expect(stepsEnd(0.1)).toStrictEqual(0)
    expect(stepsEnd(0.25)).toStrictEqual(0.25)
    expect(stepsEnd(0.3)).toStrictEqual(0.25)
    expect(stepsEnd(0.55)).toStrictEqual(0.5)
    expect(stepsEnd(0.69)).toStrictEqual(0.5)
    expect(stepsEnd(0.9)).toStrictEqual(0.75)
    expect(stepsEnd(1)).toStrictEqual(1)
  })

  test('based on position start', () => {
    const stepsStart = steps(4, 'start')

    expect(stepsStart(0)).toStrictEqual(0)
    expect(stepsStart(0.1)).toStrictEqual(0.25)
    expect(stepsStart(0.25)).toStrictEqual(0.25)
    expect(stepsStart(0.3)).toStrictEqual(0.5)
    expect(stepsStart(0.55)).toStrictEqual(0.75)
    expect(stepsStart(0.69)).toStrictEqual(0.75)
    expect(stepsStart(0.9)).toStrictEqual(1)
    expect(stepsStart(1)).toStrictEqual(1)
  })
})
