import { Animation } from '@/animation'
import type { AnimationTargets, AnimationOptions } from '@/animation/types'

/**
 * Creates a new `Animation` instance.
 *
 * Provides advanced controls that manage all animated elements.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 *
 * animate('.el', {
 *   x: [0, 600, 300],
 *   background: ['#cf3', '#0df'],
 *   duration: 1,
 * })
 * ```
 *
 * @see [Repository](https://github.com/ivodolenc/effekt)
 */
export function animate(
  targets: AnimationTargets,
  options: AnimationOptions,
): Animation {
  return new Animation(targets, options)
}
