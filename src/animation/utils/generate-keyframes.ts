import { parseKeyframe } from './parse-keyframe'
import type {
  AnimationOptions,
  AnimationKeyframes,
  KeyframeOptions,
} from '@/types'

export function generateKeyframes(
  options: AnimationOptions,
): KeyframeOptions[] {
  const {
    autoplay,
    direction,
    playRate,
    duration,
    delay,
    endDelay,
    repeat,
    ease,
    ...props
  } = options

  const keys = Object.keys(props) as (keyof AnimationKeyframes)[]
  const keysLength = keys.length
  const keyframes: KeyframeOptions[] = []

  for (let i = 0; i < keysLength; i++) {
    const key = keys[i]
    const value = props[key]
    const keyframe = parseKeyframe(key, value, {
      autoplay,
      direction,
      playRate,
      duration,
      delay,
      endDelay,
      repeat,
      ease,
    })
    if (keyframe) keyframes.push(keyframe)
  }

  return keyframes
}
