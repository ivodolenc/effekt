import { Animation } from '@/animation'
import type { Targets, AnimationOptions } from '@/types'

/**
 * Creates a new `Animation` instance and applies it to the element.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'animer'
 *
 * animate('.el', {
 *   x: [0, 600, 300],
 *   background: ['#cf3', '#0df'],
 *   duration: 1,
 * })
 * ```
 *
 * @see [Repository](https://github.com/ivodolenc/animer)
 */
export function animate(
  targets: Targets,
  options: AnimationOptions,
): Animation {
  return new Animation(targets, options)
}
