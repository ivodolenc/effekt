/**
 * Combines multiple functions into a single pipeline.
 *
 * @example
 *
 * ```ts
 * import { pipe } from 'effekt'
 *
 * const add3 = (v: number) => v + 3
 * const sub2 = (v: number) => v - 2
 *
 * pipe(add3, sub2)(6) // => 7
 * ```
 */
export function pipe<T>(...functions: ((arg: T) => T)[]): (v: T) => T {
  return (v: T) => functions.reduce((a, b) => b(a), v)
}
