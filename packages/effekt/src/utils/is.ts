// Inspired by Is Utils from Hypernym Utils, 2.3.0, MIT License, https://github.com/hypernym-studio/utils
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

/**
 * Returns a string representing the object.
 */
const toString = (v: any): string =>
  Object.prototype.toString.call(v).slice(8, -1)

/**
 * Returns a boolean if the given value is a `number`.
 *
 * @example
 *
 * ```ts
 * import { isNumber } from 'effekt'
 *
 * isNumber(33) // => true
 * ```
 */
export const isNumber = (v: any): v is number =>
  typeof v === 'number' && !isNaN(v)

/**
 * Returns a boolean if the given value is a `string`.
 *
 * @example
 *
 * ```ts
 * import { isString } from 'effekt'
 *
 * isString('effekt') // => true
 * ```
 */
export const isString = (v: any): v is string => typeof v === 'string'

/**
 * Returns a boolean if the given value is a `null`.
 *
 * @example
 *
 * ```ts
 * import { isNull } from 'effekt'
 *
 * isNull(null) // => true
 * ```
 */
export const isNull = (v: any): v is null => v === null

/**
 * Returns a boolean if the given value is a `undefined`.
 *
 * @example
 *
 * ```ts
 * import { isUndefined } from 'effekt'
 *
 * isUndefined(undefined) // => true
 * ```
 */
export const isUndefined = (v: any): v is undefined => typeof v === 'undefined'

/**
 * Returns a boolean if the given value is a `object`.
 *
 * @example
 *
 * ```ts
 * import { isObject } from 'effekt'
 *
 * isObject({}) // => true
 * ```
 */
export const isObject = (v: any): v is object => toString(v) === 'Object'

/**
 * Returns a boolean if the given value is a `array`.
 *
 * @example
 *
 * ```ts
 * import { isArray } from 'effekt'
 *
 * isArray([]) // => true
 * ```
 */
export const isArray = (v: any): v is any[] => Array.isArray(v)

/**
 * Returns a boolean if the given value is a `Function`.
 *
 * @example
 *
 * ```ts
 * import { isFunction } from 'effekt'
 *
 * isFunction(() => {}) // => true
 * ```
 */
export const isFunction = (v: any): v is (...args: any[]) => unknown =>
  v instanceof Function

/**
 * Returns a boolean if the given value is a `Element`.
 *
 * @example
 *
 * ```ts
 * import { isElement } from 'effekt'
 *
 * isElement(el) // => true
 * ```
 */
export const isElement = (v: any): v is Element => v instanceof Element

/**
 * Returns a boolean if the given value is a `HTMLElement`.
 *
 * @example
 *
 * ```ts
 * import { isHtmlElement } from 'effekt'
 *
 * isHtmlElement(htmlEl) // => true
 * ```
 */
export const isHtmlElement = (v: any): v is HTMLElement =>
  v instanceof HTMLElement

/**
 * Returns a boolean if the given value is a `SVGElement`.
 *
 * @example
 *
 * ```ts
 * import { isSvgElement } from 'effekt'
 *
 * isSvgElement(svgEl) // => true
 * ```
 */
export const isSvgElement = (v: any): v is SVGElement => v instanceof SVGElement
