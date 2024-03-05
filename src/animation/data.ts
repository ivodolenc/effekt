import type { AnimationData } from '@/types/animation'

export const defaultData: Omit<
  AnimationData,
  | 'autoplay'
  | 'direction'
  | 'playRate'
  | 'duration'
  | 'delayStart'
  | 'delayEnd'
  | 'repeat'
> = {
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
}

export const readOnly = (): never => {
  throw new TypeError('Cannot assign to read-only property.')
}
