import { createRenderStep } from './step'
import type {
  StepId,
  Steps,
  FrameData,
  Process,
  Batcher,
  RenderBatcher,
} from '@/types'

export const stepsOrder: StepId[] = ['read', 'update']

const maxElapsed = 40

export function createRenderBatcher(
  scheduleNextBatch: (
    callback: FrameRequestCallback,
  ) => void = requestAnimationFrame,
  allowKeepAlive: boolean = true,
): RenderBatcher {
  let runNextFrame = false
  let useDefaultElapsed = true

  const state: FrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false,
  }

  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => (runNextFrame = true))
    return acc
  }, {} as Steps)

  const processStep = (stepId: StepId): void => {
    steps[stepId].process(state)
  }

  const processBatch = (): void => {
    const timestamp = performance.now()

    runNextFrame = false

    state.delta = useDefaultElapsed
      ? 1000 / 60
      : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1)

    state.timestamp = timestamp
    state.isProcessing = true
    stepsOrder.forEach(processStep)
    state.isProcessing = false

    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false
      scheduleNextBatch(processBatch)
    }
  }

  const wake = (): void => {
    runNextFrame = true
    useDefaultElapsed = true
    if (!state.isProcessing) scheduleNextBatch(processBatch)
  }

  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key]
    acc[key] = (process: Process, keepAlive = false, immediate = false) => {
      if (!runNextFrame) wake()
      return step.schedule(process, keepAlive, immediate)
    }
    return acc
  }, {} as Batcher)

  const cancel = (process: Process): void =>
    stepsOrder.forEach((key) => steps[key].cancel(process))

  return { schedule, cancel, state }
}