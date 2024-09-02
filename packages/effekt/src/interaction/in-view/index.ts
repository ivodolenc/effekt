// Inspired by InView from Framer Motion, 11.0.8, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { isFunction, getElements } from '@/utils'
import type { Targets } from '@/types'
import type { InViewOptions, InViewCallback } from '@/types/interaction'

/**
 * Triggers a callback when the specified elements enter and leave the viewport.
 *
 * @example
 *
 * ```ts
 * import { inView } from 'effekt/interaction'
 *
 * inView('.el', ({ target }) => {
 *   animate(target, { opacity: [0, 1] })
 * })
 * ```
 *
 * @see [Repository](https://github.com/ivodolenc/effekt)
 */
export function inView(
  targets: Targets,
  onEnter: (entry: IntersectionObserverEntry) => void | InViewCallback,
  { root, margin, threshold }: InViewOptions = {},
): VoidFunction {
  const elements = getElements(targets)

  const activeIntersections: WeakMap<Element, InViewCallback> = new WeakMap()

  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const onLeave = activeIntersections.get(entry.target)

      if (entry.isIntersecting === !!onLeave) return

      if (entry.isIntersecting) {
        const newOnLeave = onEnter(entry)

        if (isFunction(newOnLeave)) {
          activeIntersections.set(entry.target, newOnLeave)
        } else {
          observer.unobserve(entry.target)
        }
      } else if (onLeave) {
        onLeave(entry)
        activeIntersections.delete(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin: margin,
    threshold,
  })

  elements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
}
