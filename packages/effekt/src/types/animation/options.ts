import type { AnimationEffect } from './effect'
import type { AnimationKeyframes } from './keyframes'
import type { AnimationMethods } from './methods'
import type { DriverData } from '@/types/engine'

export type AnimationPromise = Promise<Readonly<DriverData>>
export type AnimationSetProperties = 'currentTime' | 'playRate'
export type AnimationRunMethods =
  | 'play'
  | 'pause'
  | 'stop'
  | 'cancel'
  | 'finish'
  | 'reverse'

export interface AnimationOptions
  extends AnimationEffect,
    AnimationMethods,
    AnimationKeyframes {}
