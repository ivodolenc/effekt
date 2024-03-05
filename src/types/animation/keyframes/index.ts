import type { TransformKeyframes } from './transform'
import type { ColorKeyframes } from './color'
import type { OtherKeyframes } from './other'

export * from './units'
export * from './transform'
export * from './color'
export * from './other'

export interface AnimationKeyframes
  extends TransformKeyframes,
    ColorKeyframes,
    OtherKeyframes {}
