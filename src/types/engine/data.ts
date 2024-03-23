import type { DelayFunction } from '@/types/shared'

export interface DriverData {
  autoplay: boolean
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  playState: 'finished' | 'idle' | 'paused' | 'running'
  promiseState: 'pending' | 'fulfilled' | 'rejected'
  playRate: number
  duration: number
  repeat: number
  delayStart: number
  delayEnd: number
  delta: number
  timestamp: number
  time: number
  initTime: number
  startTime: number
  pauseTime: number | null
  totalDuration: number
  maxDuration: number
  progress: number
  totalProgress: number
}

export interface DriverDataOptions {
  el?: { index: number; total: number }
  autoplay?: boolean
  direction?: DriverData['direction']
  playRate?: number
  duration?: number
  delayStart?: number | DelayFunction
  delayEnd?: number | DelayFunction
  repeat?: number
}
