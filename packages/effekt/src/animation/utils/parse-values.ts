import {
  rgxDigits,
  rgxDigitsOnly,
  rgxUnits,
  rgxBrackets,
  rgxPxAll,
  rgxDegTransform,
  rgxColor,
  rgxShadow,
} from '@/utils/regexp'
import { isNumber } from '@/utils/is'
import { hexToRgba, hslaToRgba } from '@/utils'
import type { ParsedValue } from '@/types'

function parseNumber(key: string, value: number): ParsedValue {
  if (rgxPxAll.test(key)) return { value, unit: 'px' }
  if (rgxDegTransform.test(key)) return { value, unit: 'deg' }
  return { value, unit: '' }
}

function parseUnit(value: string): ParsedValue {
  const split = value.split(rgxDigits)
  const v = parseFloat(split[1])
  const unit = split[2]
  return { value: v, unit }
}

function parseColor(value: string): ParsedValue {
  const unit = ''

  if (value.startsWith('#')) {
    return {
      value: hexToRgba(value),
      unit,
    }
  }

  const match = value.match(rgxBrackets) as NonNullable<string[]>
  const v = match[1].split(',').map(Number)

  if (value.startsWith('rgb')) {
    return {
      value: [v[0], v[1], v[2], v[3] || 1],
      unit,
    }
  }

  return {
    value: hslaToRgba(v[0], v[1], v[2], v[3] || 1),
    unit,
  }
}

function parseCssVar(key: string, value: string): ParsedValue {
  const style = window.getComputedStyle(document.documentElement)
  return parseValue(key, style.getPropertyValue(value))
}

function parseShadow(value: string): ParsedValue {
  const split = value.split(' ')
  const values = []
  const units = []

  for (let i = 0, l = split.length; i < l; i++) {
    const v = split[i]
    const parsed = rgxColor.test(v) ? parseColor(v) : parseUnit(v)
    values.push(parsed.value)
    units.push(parsed.unit)
  }

  return {
    value: values as any,
    unit: units[0],
  }
}

export function parseValue(key: string, value: number | string): ParsedValue {
  if (isNumber(value)) return parseNumber(key, value)
  else {
    if (value.startsWith('--')) return parseCssVar(key, value)
    if (rgxDigitsOnly.test(value)) return parseNumber(key, parseFloat(value))
    if (rgxColor.test(value)) return parseColor(value)
    if (rgxShadow.test(key)) return parseShadow(value)
    if (rgxUnits.test(value)) return parseUnit(value)
  }

  throw new TypeError(`Unsupported value '${value}' in '${key}' property.`)
}
