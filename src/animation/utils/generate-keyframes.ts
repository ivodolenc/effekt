import { parseKeyframe } from './parse-keyframe'
import type {
  AnimationOptions,
  AnimationKeyframes,
  KeyframesGenerator,
} from '@/types'

export function generateKeyframes(
  options: AnimationOptions,
): KeyframesGenerator {
  const {
    autoplay,
    direction,
    playRate,
    duration,
    delay,
    endDelay,
    repeat,
    ease,
    force3d: f3d,
    ...props
  } = options

  const force3d = f3d ?? true
  const keys = Object.keys(props) as (keyof AnimationKeyframes)[]
  const keysLength = keys.length

  const keyframeOptions: KeyframesGenerator['options'] = []
  let hasTransform = false
  let hasFilter = false
  let hasTranslateZ = false

  const driverOptions = {
    autoplay,
    direction,
    playRate,
    duration,
    delay,
    endDelay,
    repeat,
    ease,
  }

  for (let i = 0; i < keysLength; i++) {
    const key = keys[i]
    const value = props[key]

    const keyframe = parseKeyframe(key, value, driverOptions)

    if (keyframe) {
      const { type, key } = keyframe
      keyframeOptions.push(keyframe)
      if (type === 'transform') hasTransform = true
      if (type === 'filter') hasFilter = true
      if (key === 'translateZ') hasTranslateZ = true
    }
  }

  if (!keyframeOptions.length) keyframeOptions.push(driverOptions as any)

  return {
    options: keyframeOptions,
    force3d,
    hasTransform,
    hasFilter,
    hasTranslateZ,
  }
}
