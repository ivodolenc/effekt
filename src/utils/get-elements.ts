import { isElement, isValidElement, isString } from '@/utils/is'
import type { Targets } from '@/types'

/**
 * Gets a parsed list of DOM elements.
 *
 * @example
 *
 * ```ts
 * import { getElements } from 'effekt'
 *
 * getElements('.class')
 * ```
 */
export function getElements(targets: Targets): (HTMLElement | SVGElement)[] {
  const els: (HTMLElement | SVGElement)[] = []

  if (isElement(targets)) {
    if (isValidElement(targets)) return [targets]
  } else if (isString(targets)) {
    const list = document.querySelectorAll(targets)
    if (list.length) {
      const length = list.length
      for (let i = 0; i < length; i++) {
        const el = list[i]
        if (isValidElement(el)) els.push(el)
      }
      return els
    }

    throw new TypeError(`Target '${targets}' is not found.`)
  } else if (targets) {
    const length = targets.length
    for (let i = 0; i < length; i++) {
      const el = targets[i]
      if (isValidElement(el)) els.push(el)
    }
    return els
  }

  throw new TypeError(`Some of the targets were not found.`)
}
