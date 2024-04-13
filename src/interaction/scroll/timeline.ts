import { ScrollTimeline } from '../polyfill'
import type { ScrollOptions, ProgressTimeline } from '@/types/interaction'

const timelineCache = new Map<
  Element,
  { x?: ProgressTimeline<ScrollOptions>; y?: ProgressTimeline<ScrollOptions> }
>()

export function getScrollTimeline({
  source = document.documentElement,
  axis = 'y',
}: ScrollOptions = {}): ProgressTimeline<ScrollOptions> {
  if (!timelineCache.has(source)) timelineCache.set(source, {})

  const elementCache = timelineCache.get(source)!

  if (!elementCache[axis]) {
    elementCache[axis] = new ScrollTimeline({
      source,
      axis,
    }) as ProgressTimeline<ScrollOptions>
  }

  return elementCache[axis]!
}
