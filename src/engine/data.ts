import { secToMs } from '@/utils'
import { setDelay } from './utils/set-delay'
import { setRepeat } from './utils/set-repeat'
import type { DriverData, DriverDataOptions } from '@/types'

export function createDriverData(options: DriverDataOptions = {}): DriverData {
  const { el } = options
  const key = {}
  const data: WeakMap<object, DriverData> = new WeakMap()

  data.set(key, {
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
    isReverse: false,
    autoplay: options.autoplay ?? true,
    direction: options.direction || 'normal',
    playRate: options.playRate || 1,
    duration: secToMs(options.duration || 0.6),
    delay: setDelay(options.delay, el?.index, el?.total),
    endDelay: setDelay(options.endDelay, el?.index, el?.total),
    repeat: setRepeat(options.repeat),
  })

  const d = data.get(key)!
  d.totalDuration = d.duration * d.repeat
  d.maxDuration = d.totalDuration + d.delay + d.endDelay

  return d
}
