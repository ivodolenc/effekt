import {
  isBrowser,
  isElement,
  isHtmlElement,
  isSvgElement,
  isString,
} from './is'
import type { Targets, ParsedElements } from '@/types'

const isValidElement = (v: any): v is HTMLElement | SVGElement => {
  if (v && (isHtmlElement(v) || isSvgElement(v))) return true
  return false
}

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
 * getElements('.class') // => [el]
 * ```
 */
export function getElements(targets: Targets): ParsedElements {
  if (!isBrowser) return []
  if (isElement(targets)) {
    if (isValidElement(targets)) return [targets]
  } else if (isString(targets)) {
    const els = parseElements(document.querySelectorAll(targets))
    if (els.length) return els
  } else {
    const els = parseElements(targets)
    if (els.length) return els
  }
  console.warn('Effekt: The specified elements were not found in the DOM.')
  return []
}
