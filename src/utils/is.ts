// Inspired by Is Utils from Hypernym Utils, 2.3.0, MIT License, https://github.com/hypernym-studio/utils
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

export const toString = (v: any): string =>
  Object.prototype.toString.call(v).slice(8, -1)

export const isNumber = (v: any): v is number =>
  typeof v === 'number' && !isNaN(v)

export const isString = (v: any): v is string => typeof v === 'string'

export const isNull = (v: any): v is null => v === null

export const isUndefined = (v: any): v is undefined => typeof v === 'undefined'

export const isObject = (v: any): v is object => toString(v) === 'Object'

export const isArray = (v: any): v is any[] => Array.isArray(v)

export const isFunction = (v: any): v is (...args: any[]) => unknown =>
  v instanceof Function

export const isElement = (v: any): v is Element => v instanceof Element

export const isHtmlElement = (v: any): v is HTMLElement =>
  v instanceof HTMLElement

export const isSvgElement = (v: any): v is SVGElement => v instanceof SVGElement

export const isValidElement = (v: any): v is HTMLElement | SVGElement => {
  if (v && (isHtmlElement(v) || isSvgElement(v))) return true
  throw new TypeError('Target is not supported.')
}
