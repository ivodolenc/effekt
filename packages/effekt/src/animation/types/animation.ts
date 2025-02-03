import type { AnimationPromise } from './options'

export interface Animation {
  play(): void
  pause(): void
  reverse(): void
  stop(): void
  complete(): void
  cancel(): void
  completed: AnimationPromise
  get startTime(): number
  get time(): number
  get playRate(): number
  get effect(): globalThis.AnimationEffect | null
  get timeline(): globalThis.AnimationTimeline | null
  get playState(): Readonly<globalThis.AnimationPlayState>
  get progress(): Readonly<number>
  get isCompleted(): Readonly<boolean>
}
