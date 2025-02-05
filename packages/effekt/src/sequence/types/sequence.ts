import type { SequencePromise } from './options'

export interface Sequence {
  play(): Promise<void>
  pause(): void
  stop(): void
  complete(): void
  cancel(): void
  completed: SequencePromise
  get timeline(): globalThis.AnimationTimeline | null
  set timeline(t: globalThis.AnimationTimeline | null)
  get isCompleted(): Readonly<boolean>
}
