import { mix, progress } from '@/utils'

export function setOffset(offset: number[], remaining: number): number {
  const min = offset[offset.length - 1]
  const offsetProgress = progress(0, remaining, 1)
  return mix(min, 1, offsetProgress)
}
