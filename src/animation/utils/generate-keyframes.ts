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
  const keyframeOptions: KeyframesGenerator['options'] = []

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

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    const value = props[key]
    const keyframe = parseKeyframe(key, value, driverOptions)
    if (keyframe) keyframeOptions.push(keyframe)
  }

  if (!keyframeOptions.length) keyframeOptions.push(driverOptions as any)

  return {
    options: keyframeOptions,
    force3d,
  }
}
