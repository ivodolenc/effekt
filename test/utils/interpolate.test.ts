import { describe, test, expect } from 'vitest'
import { interpolate } from '@/utils/interpolate'

describe('creates a linear interpolation from a series of values', () => {
  test('based on 2 numbers', () => {
    expect(interpolate([0, 300], [0, 1])(0)).toStrictEqual(0)
    expect(interpolate([0, 300], [0, 1])(0.5)).toStrictEqual(150)
    expect(interpolate([0, 300], [0, 1])(1)).toStrictEqual(300)
  })

  test('based on 3 numbers', () => {
    expect(interpolate([0, 600, 300], [0, 0.5, 1])(0)).toStrictEqual(0)
    expect(interpolate([0, 600, 300], [0, 0.5, 1])(0.5)).toStrictEqual(600)
    expect(interpolate([0, 600, 300], [0, 0.5, 1])(1)).toStrictEqual(300)
  })

  test('based on 4 numbers', () => {
    expect(
      interpolate([0, 150, 300, 600], [0, 0.33, 0.66, 1])(0),
    ).toStrictEqual(0)
    expect(
      interpolate([0, 150, 300, 600], [0, 0.33, 0.66, 1])(0.5),
    ).toBeCloseTo(227.272)
    expect(
      interpolate([0, 150, 300, 600], [0, 0.33, 0.66, 1])(1),
    ).toStrictEqual(600)
  })

  test('based on 2 arrays of numbers', () => {
    const from = [255, 0, 0, 0]
    const to = [0, 255, 0, 1]

    expect(interpolate([from, to], [0, 1])(0)).toStrictEqual([255, 0, 0, 0])
    expect(interpolate([from, to], [0, 1])(0.5)).toStrictEqual([
      127.5, 127.5, 0, 0.5,
    ])
    expect(interpolate([from, to], [0, 1])(1)).toStrictEqual([0, 255, 0, 1])
  })

  test('based on 3 arrays of numbers', () => {
    const a = [255, 0, 0, 0]
    const b = [0, 255, 0, 1]
    const c = [0, 0, 255, 0]

    expect(interpolate([a, b, c], [0, 0.5, 1])(0)).toStrictEqual([255, 0, 0, 0])
    expect(interpolate([a, b, c], [0, 0.5, 1])(0.5)).toStrictEqual([
      0, 255, 0, 1,
    ])
    expect(interpolate([a, b, c], [0, 0.5, 1])(1)).toStrictEqual([0, 0, 255, 0])
  })
})
