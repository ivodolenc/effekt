import { isFunction, secToMs } from '@/utils'
import type {
  DriverData,
  DriverDataOptions,
  AnimationTarget,
  DelayFunction,
} from '@/types'

function setDelay(
  delay: number | DelayFunction | undefined,
  index: number,
  total: number,
): number {
  if (delay) {
    return isFunction(delay) ? secToMs(delay(index, total)) : secToMs(delay)
  }
  return 0
}

function setRepeat(repeat?: number): number {
  return repeat ? (repeat === Infinity ? 1000 : repeat + 1) : 1
}

export function createDriverData(options: DriverDataOptions = {}): DriverData {
  const el =
    options.el ||
    ({
      value: {},
      index: 0,
      total: 1,
    } as AnimationTarget)
  const data: WeakMap<AnimationTarget['value'], DriverData> = new WeakMap()

  data.set(el!.value, {
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
    delay: setDelay(options.delay, el.index, el.total),
    endDelay: setDelay(options.endDelay, el.index, el.total),
    repeat: setRepeat(options.repeat),
  })

  const d = data.get(el!.value)!
  d.totalDuration = d.duration * d.repeat
  d.maxDuration = d.totalDuration + d.delay + d.endDelay

  return d
}
