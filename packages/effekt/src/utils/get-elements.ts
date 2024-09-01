import { isElement, isValidElement, isString } from '@/utils/is'
import type { Targets, ParsedElements } from '@/types'

function parseElements(
  elements: (Element | null)[] | NodeListOf<Element> | null,
): ParsedElements {
  const els: (HTMLElement | SVGElement)[] = []
  if (elements) {
    for (let i = 0, l = elements.length; i < l; i++) {
      const el = elements[i]
      if (isValidElement(el)) els.push(el)
    }
  }
  return els
}

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
export function getElements(targets: Targets): ParsedElements {
  if (isElement(targets)) {
    if (isValidElement(targets)) return [targets]
  } else if (isString(targets)) {
    const els = parseElements(document.querySelectorAll(targets))
    if (els.length) return els
  } else {
    const els = parseElements(targets)
    if (els.length) return els
  }
  throw new TypeError(`Animation target not found.`)
}
