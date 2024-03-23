import { rgxIsTransform, rgxIsColor } from '@/utils/regexp'
import { isArray, isObject } from '@/utils/is'
import { outQuart } from '@/easing'
import { calcOffset } from './calc-offset'
import { parseValue } from './parse-values'
import { validateUnits } from './validate-units'
import { setEasing } from './set-easing'
import { KeyframeOptions, AnimationKeyframes, Easing } from '@/types'

export function setKeyframeValues(
  key: string,
  value: string | number | { value: string | number; offset?: number },
  index: number,
  remaining: number,
  keyframe: KeyframeOptions,
  easing: Easing | Easing[],
  easings: Easing[],
) {
  const offset = isObject(value) ? value.offset : undefined
  const v = isObject(value) ? value.value : value

  const state =
    index === 0 ? offset || 0 : offset || calcOffset(keyframe.offset, remaining)
  keyframe.offset.push(state)

  const parsed = parseValue(key, v)
  keyframe.value.push(parsed.value)
  keyframe.units.add(parsed.unit)

  if (!isArray(easing)) easings.push(easing)
}

export function parseKeyframe(
  key: keyof AnimationKeyframes,
  value: AnimationKeyframes[keyof AnimationKeyframes],
  options: Omit<
    KeyframeOptions,
    'type' | 'key' | 'value' | 'units' | 'offset'
  > = {},
): KeyframeOptions | void {
  const keyframe: KeyframeOptions = {
    type: 'other',
    key,
    value: [],
    offset: [],
    units: new Set(),
    ...options,
  }
  const easing = keyframe.ease || outQuart

  if (key.startsWith('on')) return

  if (rgxIsTransform.test(key)) {
    keyframe.type = 'transform'
    if (key.length === 1) keyframe.key = `translate${key.toUpperCase()}`
  }

  if (rgxIsColor.test(key)) keyframe.type = 'color'

  if (isArray(value)) {
    const valueLength = value.length
    if (valueLength < 2) return

    const easings: Easing[] = !isArray(easing) ? [] : easing

    for (let i = 0; i < valueLength; i++) {
      const v = value[i]
      const remaining = valueLength - keyframe.offset.length

      setKeyframeValues(key, v, i, remaining, keyframe, easing, easings)
    }

    validateUnits(key, keyframe.units)
    setEasing(keyframe.value, easing, easings)
    keyframe.ease = easings

    return keyframe
  }

  if (isObject(value) && !isArray(value)) {
    const valueLength = value.value.length
    if (valueLength < 2) return

    const easings: Easing[] = !isArray(easing) ? [] : easing

    for (let i = 0; i < valueLength; i++) {
      const v = value.value[i]
      const remaining = valueLength - keyframe.offset.length

      setKeyframeValues(key, v, i, remaining, keyframe, easing, easings)
    }

    validateUnits(key, keyframe.units)
    setEasing(keyframe.value, easing, easings)

    const { value: v, ease, offset, ...valueOptions } = value
    const _keyframe = {
      ...keyframe,
      ...valueOptions,
      ease: ease || easings,
      offset: offset || keyframe.offset,
      autoplay: keyframe.autoplay,
      playRate: keyframe.playRate,
    }

    return _keyframe
  }
}
