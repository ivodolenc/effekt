import type { Keyframe } from '../keyframe'
import type { Animation } from '../animation'

export function getAnimation<T extends Keyframe | Animation>(
  animations: T[],
): T {
  return animations.reduce((prev, curr) =>
    prev.data.maxDuration > curr.data.maxDuration ? prev : curr,
  )
}
