import { isNull, msToSec, secToMs } from '@/utils'
import { frame, cancelFrame, frameData } from './frame'
import type { DriverOptions, DriverData, FrameData } from '@/types'

export class Driver {
  #mapKey = {}
  #dataMap: WeakMap<object, DriverData> = new WeakMap()
  #onRender?: WeakMap<object, DriverOptions['onRender']>
  #onComplete?: WeakMap<object, DriverOptions['onComplete']>
  #isRunning: boolean = false
  #reversePlayRate: boolean = false
  #reversePlayRateTime: number = 0

  constructor(data: DriverData, options: DriverOptions = {}) {
    const { onRender, onComplete } = options

    this.#dataMap.set(this.#mapKey, data)

    if (onRender) {
      this.#onRender = new WeakMap()
      this.#onRender.set(this.#mapKey, onRender)
    }

    if (onComplete) {
      this.#onComplete = new WeakMap()
      this.#onComplete.set(this.#mapKey, onComplete)
    }

    if (this.#data.autoplay) this.play()
  }

  #startDriver(): void {
    if (!this.#isRunning) {
      frame.update(this.#tick, true)
      this.#render(true)
      this.#isRunning = true
    }
  }

  #stopDriver(): void {
    if (this.#isRunning) {
      cancelFrame(this.#tick)
      if (this.#onRender) cancelFrame(this.#onRender.get(this.#mapKey)!)
      this.#isRunning = false
    }
  }

  #render(keepAlive = false): void {
    if (this.#onRender) {
      frame.render(this.#onRender.get(this.#mapKey)!, keepAlive)
    }
  }

  #tick = ({ timestamp, delta }: FrameData) => {
    this.#data.timestamp = timestamp
    this.#data.delta = delta
    let time = 0

    if (!isNull(this.#data.pauseTime)) {
      time = this.#data.pauseTime
    } else if (this.#data.playRate < 0) {
      if (!this.#reversePlayRate) {
        this.#reversePlayRate = true
        this.#reversePlayRateTime = timestamp
        this.#data.startTime =
          this.#data.progress === 0
            ? timestamp * this.#data.playRate
            : this.#data.totalDuration - timestamp - this.#data.time
      }

      time = timestamp - this.#data.startTime / this.#data.playRate
    } else if (this.#data.playRate > 0) {
      if (this.#reversePlayRate) {
        this.#reversePlayRate = false
        this.#data.startTime =
          this.#data.progress === 0
            ? (timestamp - this.#reversePlayRateTime) * 2 + this.#data.initTime
            : this.#reversePlayRateTime -
              (this.#data.totalDuration -
                timestamp -
                this.#data.time +
                this.#reversePlayRateTime)
      }

      time = (timestamp - this.#data.startTime) * this.#data.playRate
    }

    this.#data.time = time
    time = Math.max(time - this.#data.delay, 0)

    if (this.#data.playState === 'finished' && isNull(this.#data.pauseTime)) {
      time = this.#data.totalDuration
    }

    const progress = time / this.#data.duration

    let currentIteration = Math.floor(progress)
    let iterationProgress = progress % 1.0

    if (!iterationProgress && progress >= 1) iterationProgress = 1
    if (iterationProgress === 1) currentIteration--

    const iterationIsOdd = currentIteration % 2
    const repeatIsOdd = this.#data.repeat % 2
    const direction = this.#data.direction

    if (
      this.#data.playRate < 0 ||
      direction === 'reverse' ||
      (direction === 'alternate' && iterationIsOdd) ||
      (direction === 'alternate-reverse' && !iterationIsOdd)
    ) {
      this.#data.isReverse = true
      this.#data.totalProgress = 0

      if (direction === 'alternate' && repeatIsOdd) {
        this.#data.totalProgress = 1
      } else if (direction === 'alternate-reverse' && !repeatIsOdd) {
        this.#data.totalProgress = 1
      }

      iterationProgress = 1 - iterationProgress
    } else {
      this.#data.isReverse = false
    }

    this.#data.progress =
      time >= this.#data.totalDuration
        ? this.#data.totalProgress
        : Math.min(iterationProgress, 1)

    if (
      isNull(this.#data.pauseTime) &&
      (this.#data.playState === 'finished' ||
        time >= this.#data.totalDuration + this.#data.endDelay)
    ) {
      this.#data.playState = 'finished'
      this.#stopDriver()
      this.#render()
      this.#onComplete?.get(this.#mapKey)?.()
    }
  }

  #setPlayRateProgress(rate: number): void {
    if (rate < 0) this.#data.totalProgress = 0
    if (rate > 0) this.#data.totalProgress = 1
    this.#data.playRate = rate
  }

  now(): number {
    return frameData.isProcessing ? frameData.timestamp : performance.now()
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
    this.#data.pauseTime = this.#data.time
  }

  stop(): void {
    this.#data.playState = 'idle'
    this.#stopDriver()
    this.#render()
  }

  cancel(): void {
    this.#data.playState = 'idle'
    this.#stopDriver()
    this.currentTime = 0
    this.#render()
  }

  finish(): void {
    this.#data.playState = 'finished'
    this.#stopDriver()
    this.currentTime = msToSec(this.#data.totalDuration)
    this.#render()
  }

  reverse(): void {
    if (
      this.#data.playRate === 0 ||
      this.#data.progress === 0 ||
      this.#data.progress === 1
    )
      return

    if (this.#data.playRate > 0) {
      this.playRate = 1
      this.playRate = -1
    } else if (this.#data.playRate < 0) {
      this.playRate = -1
      this.playRate = 1
    }
  }

  get #data(): DriverData {
    return this.#dataMap.get(this.#mapKey)!
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
      this.play()
      return
    }
    this.#setPlayRateProgress(rate)
  }
}
