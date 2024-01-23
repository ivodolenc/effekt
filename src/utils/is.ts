export const toString = (v: any): string =>
  Object.prototype.toString.call(v).slice(8, -1)

export const isNumber = (v: any): v is number =>
  typeof v === 'number' && !isNaN(v)

export const isString = (v: any): v is string => typeof v === 'string'

export const isStringEmpty = (v: any): v is string =>
  isString(v) && v.trim().length === 0

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