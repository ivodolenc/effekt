import type { AnimationKeyframes } from './keyframes'
import type { AnimationOptions } from '../options'
import type { AnimationEffect } from '../effect'

export interface GeneratedKeyframeOptions extends AnimationEffect {
  offset?: AnimationOptions['offset']
}

export interface GeneratedKeyframe extends GeneratedKeyframeOptions {
  key: string
  value: AnimationKeyframes[keyof AnimationKeyframes]
}
