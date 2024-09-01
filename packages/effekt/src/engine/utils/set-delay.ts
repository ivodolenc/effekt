import { secToMs } from '@/utils'
import { isFunction, isUndefined } from '@/utils/is'
import type { DelayFunction } from '@/types'

export function setDelay(
  delay?: number | DelayFunction,
  index?: number,
  total?: number,
): number {
  if (delay && !isUndefined(index) && !isUndefined(total)) {
    return isFunction(delay) ? secToMs(delay(index, total)) : secToMs(delay)
  }
  return 0
}
