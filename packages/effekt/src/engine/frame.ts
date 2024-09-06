import { isBrowser, noop } from '@/utils'
import { createRenderBatcher } from './batcher'

export const {
  schedule: frame,
  cancel: cancelFrame,
  state: frameData,
} = createRenderBatcher(isBrowser ? requestAnimationFrame : noop, true)
