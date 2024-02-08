import { setOffset } from './set-offset'
import { parseValue } from './parse-values'
import { outQuart } from '@/easing'
import { rgxIsTransform, rgxIsColor } from '@/utils/regexp'
import { isNumber, isString, isObject, isArray } from '@/utils/is'
import type { Easing, RGBA } from '@/types'
import type { ElementData } from '@/types/dom/data'
import type { AnimationOptions, AnimationDeclarations } from '@/types/animation'

export function createElementData(options: AnimationOptions): ElementData {
  const { ease, ...props } = options

  const easing = ease || outQuart
  const keys = Object.keys(props) as (keyof AnimationDeclarations)[]
  const keysLength = keys.length

  const data: ElementData = {
    transform: [],
    color: [],
    other: [],
  }

  for (let i = 0; i < keysLength; i++) {
    let key = keys[i]
    const value = props[key]
    let type: 'transform' | 'color' | 'other' = 'other'

    if (rgxIsTransform.test(key)) {
      type = 'transform'
      if (key.length === 1) {
        key = `translate${key.toUpperCase()}` as typeof key
      }
    }

    if (rgxIsColor.test(key)) type = 'color'

    if (isArray(value)) {
      const valueLength = value.length
      const values: (number | RGBA)[] = []
      const units: Set<string> = new Set()
      const offset: number[] = []
      const easings: Easing[] = !isArray(easing) ? [] : easing

      for (let i = 0; i < valueLength; i++) {
        const v = value[i]

        if (isString(v) || isNumber(v)) {
          const remaining = valueLength - offset.length
          const state = i === 0 ? 0 : setOffset(offset, remaining)
          offset.push(state)

          const parsed = parseValue(key, v)

          values.push(parsed.value)
          units.add(parsed.unit)
          if (!isArray(easing)) easings.push(easing)
        }

        if (isObject(v)) {
          const remaining = valueLength - offset.length
          const state = i === 0 ? 0 : v.offset || setOffset(offset, remaining)
          offset.push(state)

          const parsed = parseValue(key, v.value)

          values.push(parsed.value)
          units.add(parsed.unit)
          if (!isArray(easing)) easings.push(v.ease || easing)
        }
      }

      if (isArray(easing) && easing.length < values.length) {
        while (easing.length < values.length) easings.push(outQuart)
      }

      if (units.size > 1) {
        throw new TypeError(
          `All units of '${key}' property must be of the same type.`,
        )
      }

      const [unit] = units
      data[type].push([key, values, unit, offset, easings])
    }
  }

  return data
}
