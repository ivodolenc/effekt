import { isNull } from '@/utils/is'
import { msToSec, secToMs } from '@/utils'
import { frame, cancelFrame, state } from './frame'
import type { AnimationData } from '@/types/animation'
import type { DriverOptions, FrameData } from '@/types'

export class Driver {
  #data: AnimationData
  #isRunning: boolean = false
  #onUpdate?: DriverOptions['onUpdate']
  #onComplete?: DriverOptions['onComplete']

  constructor(data: AnimationData, options: DriverOptions = {}) {
    this.#data = data
    this.#onUpdate = options.onUpdate
    this.#onComplete = options.onComplete

    if (this.#data.autoplay) this.play()
  }

  #startDriver(): void {
    if (!this.#isRunning) {
      frame.update(this.#tick, true)
      this.#isRunning = true
    }
  }

  #stopDriver(): void {
    if (this.#isRunning) {
      cancelFrame(this.#tick)
      this.#isRunning = false
    }
  }

  #tick = ({ timestamp, delta }: FrameData) => {
    this.#data.delta = delta
    this.#data.timestamp = timestamp

    let time = 0

    if (!isNull(this.#data.pauseTime)) {
      time = this.#data.pauseTime
    } else if (this.#data.playRate < 0) {
      if (!this.#data.reverseMode) {
        this.#data.reverseMode = true
        this.#data.reverseTime = timestamp
        this.#data.startTime =
          this.#data.progress === 0
            ? timestamp * this.#data.playRate
            : this.#data.totalDuration - timestamp - this.#data.time
      }

      time = timestamp - this.#data.startTime / this.#data.playRate
    } else if (this.#data.playRate > 0) {
      if (this.#data.reverseMode) {
        this.#data.reverseMode = false
        this.#data.startTime =
          this.#data.progress === 0
            ? (timestamp - this.#data.reverseTime) * 2 + this.#data.initTime
            : this.#data.reverseTime -
              (this.#data.totalDuration -
                timestamp -
                this.#data.time +
                this.#data.reverseTime)
      }

      time = (timestamp - this.#data.startTime) * this.#data.playRate
    }

    this.#data.time = time

    time = Math.max(time - this.#data.delayStart, 0)

    if (this.#data.playState === 'finished' && isNull(this.#data.pauseTime)) {
      time = this.#data.totalDuration
    }

    const progress = time / this.#data.duration

    let currentIteration = Math.floor(progress)

    let iterationProgress = progress % 1.0
    if (!iterationProgress && progress >= 1) iterationProgress = 1

    iterationProgress === 1 && currentIteration--

    const iterationIsOdd = currentIteration % 2
    const repeatIsOdd = this.#data.repeat % 2
    const direction = this.#data.direction

    if (
      this.#data.playRate < 0 ||
      direction === 'reverse' ||
      (direction === 'alternate' && iterationIsOdd) ||
      (direction === 'alternate-reverse' && !iterationIsOdd)
    ) {
      this.#data.totalProgress = 0

      if (direction === 'alternate' && repeatIsOdd) {
        this.#data.totalProgress = 1
      } else if (direction === 'alternate-reverse' && !repeatIsOdd) {
        this.#data.totalProgress = 1
      }

      iterationProgress = 1 - iterationProgress
    }

    this.#data.progress =
      time >= this.#data.totalDuration
        ? this.#data.totalProgress
        : Math.min(iterationProgress, 1)

    this.#onUpdate?.()

    if (
      isNull(this.#data.pauseTime) &&
      (this.#data.playState === 'finished' ||
        time >= this.#data.totalDuration + this.#data.delayEnd)
    ) {
      this.#data.playState = 'finished'
      this.#stopDriver()
      this.#onComplete?.()
    }
  }

  #setPlayRateProgress(rate: number): void {
    if (rate < 0) this.#data.totalProgress = 0
    if (rate > 0) this.#data.totalProgress = 1
  }

  now(): number {
    return state.isProcessing ? state.timestamp : performance.now()
  }

  play(): void {
    if (this.#isRunning) return

    const now = this.now()

    if (!isNull(this.#data.pauseTime)) {
      this.#data.startTime = now - this.#data.pauseTime
    } else if (!this.#data.startTime) {
      this.#data.initTime = now
      this.#data.startTime = now
    }
    this.#data.pauseTime = null
    this.#data.playState = 'running'
    this.#startDriver()
  }

  pause(): void {
    this.#data.playState = 'paused'
    this.#stopDriver()
    this.#data.pauseTime = this.#data.time
  }

  stop(): void {
    this.#data.playState = 'idle'
    this.#stopDriver()
  }

  cancel(): void {
    this.#data.playState = 'idle'
    this.#stopDriver()
    this.currentTime = 0
  }

  finish(): void {
    this.#data.playState = 'finished'
    this.#stopDriver()
    this.currentTime = msToSec(this.#data.totalDuration)
  }

  reverse(): void {
    if (this.#data.playRate === 0 || this.#data.progress === 0) return
    if (this.#data.playRate > 0) {
      this.#data.direction = 'reverse'
      this.#data.totalProgress = 0
      this.playRate = -1
    } else if (this.#data.playRate < 0) {
      this.#data.direction = 'normal'
      this.#data.totalProgress = 1
      this.playRate = 1
    }
  }

  get currentTime(): number {
    return msToSec(this.#data.time)
  }
  set currentTime(t) {
    const time = secToMs(t)
    this.#data.time = time
    if (
      !isNull(this.#data.pauseTime) ||
      !this.#isRunning ||
      this.#data.playRate === 0
    ) {
      this.#data.pauseTime = time
    } else {
      this.#data.startTime = this.now() - time / this.#data.playRate
    }
  }

  get playRate(): number {
    return this.#data.playRate
  }
  set playRate(rate) {
    if (rate === this.#data.playRate) return
    if (rate === 0 && this.#isRunning) {
      this.#data.playRate = 0
      this.pause()
      return
    }
    if (rate !== 0 && !this.#isRunning) {
      this.#setPlayRateProgress(rate)
      this.#data.playRate = rate
      this.play()
      return
    }
    this.#setPlayRateProgress(rate)
    this.#data.playRate = rate
  }
}
