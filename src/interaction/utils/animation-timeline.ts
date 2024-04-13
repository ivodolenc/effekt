import { AnimationController } from '@/animation'
import { msToSec } from '@/utils'
import { observe } from '../observe'
import type { ProgressTimeline } from '@/types/interaction'

export function setAnimationTimeline<T>(
  controller: AnimationController,
  timeline: ProgressTimeline<T>,
): VoidFunction {
  controller.pause()

  const cancel = observe((progress) => {
    controller.currentTime = msToSec(controller.data.duration * progress)
  }, timeline)

  return () => {
    controller.stop()
    cancel()
  }
}
