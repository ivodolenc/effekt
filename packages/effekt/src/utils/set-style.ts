import { isUndefined } from './is'

/**
 * Sets the individual CSS style for the element.
 *
 * The `property` and `value` parameters should follow the built-in syntax of the `CSSStyleDeclaration` interface.
 *
 * @example
 *
 * ```ts
 * import { setStyle } from 'effekt'
 *
 * setStyle(el, 'background', 'rgba(255, 255, 255, 1)')
 * ```
 */
export function setStyle(
  el: HTMLElement | SVGElement,
  property: string,
  value: string,
): string {
  const p = property as any

  if (!isUndefined(el.style[p])) return (el.style[p] = value)

  throw new TypeError(`Unsupported '${property}' property.`)
}
