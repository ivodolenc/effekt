import type { TransformKeyframes } from './transform'
import type { ColorKeyframes } from './color'
import type { OtherKeyframes } from './other'
import type { FilterKeyframes } from './filter'

export interface AnimationKeyframes
  extends TransformKeyframes,
    ColorKeyframes,
    OtherKeyframes,
    FilterKeyframes {}
