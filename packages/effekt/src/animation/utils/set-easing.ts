import { outQuart } from '@/easing'
import { isArray } from '@/utils'
import type { KeyframeOptions, Easing } from '@/types'

export function setEasing(
  value: KeyframeOptions['value'],
  easing: Easing | Easing[],
  easings: Easing[],
): void {
  if (isArray(easing) && easing.length < value.length) {
    while (easing.length < value.length) easings.push(outQuart)
  }
}
