/**
 * Linearly interpolates between two numbers based on the progress value.
 *
 * Returns a value that represents a point between `from` and `to` based on the `progress`.
 *
 * When `progress` is 0, it returns `from`. When `progress` is 1, it returns `to`.
 *
 * @example
 * ```ts
 * import { lerp } from 'effekt/utils'
 *
 * lerp(0, 100, 0.5) // Interpolate from 0 to 100 at 50% progress (0.5), returns 50
 * lerp(10, 20, 0) // Interpolate from 10 to 20 at 0% progress (0), returns 10
 * lerp(10, 20, 1) // Interpolate from 10 to 20 at 100% progress (1), returns 20
 * ```
 */
export function lerp(from: number, to: number, progress: number): number {
  return (1 - progress) * from + progress * to
}
