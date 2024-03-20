import { secToMs } from '@/utils'
import { setDelay } from './set-delay'
import { setRepeat } from './set-repeat'
import type { DriverData, DriverDataOptions } from '@/types'

export function createDriverData(options: DriverDataOptions = {}) {
  const data: DriverData = {
    delta: 0,
    timestamp: 0,
    playState: 'idle',
    promiseState: 'pending',
    time: 0,
    initTime: 0,
    startTime: 0,
    pauseTime: null,
    totalDuration: 600,
    progress: 0,
    totalProgress: 1,
    reverseMode: false,
    reverseTime: 0,
    reverseEase: false,
    autoplay: options.autoplay ?? true,
    direction: options.direction || 'normal',
    playRate: options.playRate || 1,
    duration: secToMs(options.duration || 0.6),
    delayStart: setDelay(
      options.delayStart,
      options.el?.index,
      options.el?.total,
    ),
    delayEnd: setDelay(options.delayEnd, options.el?.index, options.el?.total),
    repeat: setRepeat(options.repeat),
  }
  data.totalDuration = data.duration * data.repeat

  return data
}
