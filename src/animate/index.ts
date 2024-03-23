import { AnimationController } from '@/animation'
import type { Targets, AnimationOptions } from '@/types'

/**
 * Creates a new `AnimationController` instance.
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
  targets: Targets,
  options: AnimationOptions,
): AnimationController {
  return new AnimationController(targets, options)
}
