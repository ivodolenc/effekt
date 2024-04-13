import { frame, cancelFrame } from '@/engine'
import type { ObserveUpdate, ProgressTimeline } from '@/types/interaction'

export function observe<T>(
  update: ObserveUpdate,
  timeline: ProgressTimeline<T>,
): VoidFunction {
  let prevProgress: number

  const onFrame = () => {
    const { currentTime } = timeline
    const percentage = currentTime === null ? 0 : currentTime.value
    const progress = percentage / 100

    if (prevProgress !== progress) update(progress)

    prevProgress = progress
  }

  frame.update(onFrame, true)

  return () => {
    cancelFrame(onFrame)
    timeline.cancel()
  }
}
