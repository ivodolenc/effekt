// Inspired by Hypernym Utils, v3.4.1, MIT License, https://github.com/hypernym-studio/utils

const toString = (v: any): string =>
  Object.prototype.toString.call(v).slice(8, -1)

export const noop = (): void => {}

export const isBrowser: boolean = typeof window !== 'undefined'

export const isNumber = (v: any): v is number =>
  typeof v === 'number' && !isNaN(v)

export const isString = (v: any): v is string => typeof v === 'string'

export const isNull = (v: any): v is null => v === null

export const isObject = (v: any): v is object => toString(v) === 'Object'

export const isArray = (v: any): v is any[] => Array.isArray(v)

export const isFunction = (v: any): v is (...args: any[]) => unknown =>
  v instanceof Function

export const isElement = (v: any): v is Element => v instanceof Element
