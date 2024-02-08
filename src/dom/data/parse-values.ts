import {
  rgxDigits,
  rgxDigitsOnly,
  rgxUnits,
  rgxBrackets,
  rgxPxAll,
  rgxDegTransform,
  rgxColor,
} from '@/utils/regexp'
import { isNumber } from '@/utils/is'
import { hexToRgba, hslaToRgba } from '@/utils'
import type { ParsedValue } from '@/types/dom/data'

export function parseNumber(key: string, value: number): ParsedValue {
  if (rgxPxAll.test(key)) return { value, unit: 'px' }
  if (rgxDegTransform.test(key)) return { value, unit: 'deg' }
  return { value, unit: '' }
}

export function parseUnit(value: string): ParsedValue {
  const split = value.split(rgxDigits)
  const v = parseFloat(split[1])
  const unit = split[2]

  return { value: v, unit }
}

export function parseColor(value: string): ParsedValue {
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

export function parseValue(key: string, value: number | string): ParsedValue {
  if (isNumber(value)) return parseNumber(key, value)
  else {
    if (rgxDigitsOnly.test(value)) return parseNumber(key, parseFloat(value))
    if (rgxColor.test(value)) return parseColor(value)
    if (rgxUnits.test(value)) return parseUnit(value)
  }

  throw new TypeError(`Unsupported value '${value}' in '${key}' property.`)
}
