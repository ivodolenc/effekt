import { describe, test, expect } from 'vitest'
import { pipe } from '@/utils/pipe'

describe('combines multiple functions into a single pipeline', () => {
  const add3 = (v: number) => v + 3
  const sub2 = (v: number) => v - 2
  const multiplyBy4 = (v: number) => v * 4

  test('based on 2 functions', () => {
    expect(pipe(add3, sub2)(4)).toStrictEqual(5)
    expect(pipe(add3, sub2)(6)).toStrictEqual(7)
  })

  test('based on 3 functions', () => {
    expect(pipe(add3, sub2, multiplyBy4)(4)).toStrictEqual(20)
    expect(pipe(add3, sub2, multiplyBy4)(6)).toStrictEqual(28)
  })
})
