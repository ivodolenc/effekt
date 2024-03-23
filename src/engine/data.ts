import { secToMs } from '@/utils'
import { setDelay } from './utils/set-delay'
import { setRepeat } from './utils/set-repeat'
import type { DriverData, DriverDataOptions } from '@/types'

export function createDriverData(options: DriverDataOptions = {}) {
  const { el } = options

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
    maxDuration: 600,
    progress: 0,
    totalProgress: 1,
    autoplay: options.autoplay ?? true,
    direction: options.direction || 'normal',
    playRate: options.playRate || 1,
    duration: secToMs(options.duration || 0.6),
    delayStart: setDelay(options.delayStart, el?.index, el?.total),
    delayEnd: setDelay(options.delayEnd, el?.index, el?.total),
    repeat: setRepeat(options.repeat),
  }
  data.totalDuration = data.duration * data.repeat
  data.maxDuration = data.totalDuration + data.delayStart + data.delayEnd

  return data
}
