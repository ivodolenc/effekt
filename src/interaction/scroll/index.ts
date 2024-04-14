// Inspired by Scroll from Framer Motion, 11.0.8, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { isFunction } from '@/utils/is'
import { AnimationController } from '@/animation'
import { getScrollTimeline } from './timeline'
import { observe } from '../observe'
import { attachTimeline } from '../utils'
import type { OnScroll, ScrollOptions } from '@/types/interaction'

/**
 * Creates high performance scroll-linked animations via the `ScrollTimeline` API.
 *
 * @example
 *
 * ```ts
 * import { scroll } from 'effekt/interaction'
 *
 * scroll((progress) => console.log(progress))
 * ```
 *
 * @see [Repository](https://github.com/ivodolenc/effekt)
 */
export function scroll(
  onScroll: OnScroll | AnimationController,
  options?: ScrollOptions,
): VoidFunction {
  const timeline = getScrollTimeline(options)

  if (isFunction(onScroll)) return observe(onScroll, timeline)
  else return attachTimeline(onScroll, timeline)
}
