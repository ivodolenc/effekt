/**
 * Converts `seconds` to `milliseconds`.
 *
 * @example
 *
 * ```ts
 * import { secToMs } from 'animer'
 *
 * secToMs(1) // => 1000
 * ```
 */
export function secToMs(seconds: number): number {
  return seconds * 1000
}

/**
 * Converts `milliseconds` to `seconds`.
 *
 * @example
 *
 * ```ts
 * import { msToSec } from 'animer'
 *
 * msToSec(1000) // => 1
 * ```
 */
export function msToSec(milliseconds: number): number {
  return milliseconds / 1000
}
