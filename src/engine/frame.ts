import { createRenderBatcher } from './batcher'

export const {
  schedule: frame,
  cancel: cancelFrame,
  state,
} = createRenderBatcher()
