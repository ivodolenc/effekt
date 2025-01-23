import { generateKeyframes } from './generate-keyframes'
import { createEffect, setEasing } from './create-effect'
import { noop, isNumber, isArray } from '@/shared'
import { getElements, msToSec, secToMs, nextTick } from '@/utils'
import type {
  AnimationTargets,
  AnimationOptions,
  AnimationPropertyNames,
  AnimationEventNames,
  AnimationPromise,
  GeneratedKeyframe,
} from './types'

export class Animation {
  #animation!: globalThis.Animation | null
  #animations: globalThis.Animation[] = []
  #onPlay: AnimationOptions['onPlay']
  #onPause: AnimationOptions['onPause']
  #onReverse: AnimationOptions['onReverse']
  #onStop: AnimationOptions['onStop']
  #resolve?: (value: globalThis.Animation[]) => void
  #reject?: (value: any) => void
  #isCompleted: boolean = false
  #isTimeline: boolean

  constructor(targets: AnimationTargets, options: AnimationOptions) {
    const { autoplay = true, commitStyles = true, timeline } = options

    this.#onPlay = options.onPlay
    this.#onPause = options.onPause
    this.#onReverse = options.onReverse
    this.#onStop = options.onStop
    this.#isTimeline = timeline ? true : false

    const els = getElements(targets)
    if (!els.length) return

    const keyframes = new WeakMap<Element, GeneratedKeyframe[]>([
      [els[0], generateKeyframes(options)],
    ])

    for (let i = 0, l = els.length; i < l; i++) {
      const el = els[i]

      for (let kI = 0, kL = keyframes.get(els[0])!.length; kI < kL; kI++) {
        const keyframe = keyframes.get(els[0])![kI]
        const { key, value, ease, composite, offset } = keyframe

        const animation = el.animate(
          {
            [key]: value as any,
            easing: isArray(ease) ? ease.map((e) => setEasing(e)) : undefined,
            composite: isArray(composite) ? composite : undefined,
            offset,
          },
          createEffect({ index: i, total: l }, keyframe),
        )

        if (!autoplay) animation.pause()
        if (commitStyles) {
          animation.finished
            .then((a) => {
              a.commitStyles()
              a.cancel()
            })
            .catch(noop)
        }
        this.#animations.push(animation)
      }
    }

    this.#animation = this.#getAnimation()

    options.onStart?.(this.#animations)

    Promise.all(this.#animations.map((a) => a.finished))
      .then((a) => {
        this.#isCompleted = true
        nextTick(() => {
          this.#resolve?.(a)
          options.onComplete?.(a)
        })
      })
      .catch((err) => {
        nextTick(() => {
          this.#reject?.(err)
          options.onCancel?.(err)
        })
      })
  }

  #each(callback: (a: globalThis.Animation) => void): void {
    for (let i = 0, l = this.#animations.length; i < l; i++) {
      callback(this.#animations[i])
    }
  }

  #set<T extends globalThis.Animation, K extends AnimationPropertyNames>(
    name: AnimationPropertyNames,
    value: T[K],
  ): void {
    this.#each((k) => (k[name] = value as any))
  }

  #run(name: AnimationEventNames): void {
    this.#each((a) => a[name]())
  }

  #numberish(v: globalThis.CSSNumberish): number {
    return isNumber(v) ? v : (v as globalThis.CSSUnitValue).value
  }

  #getAnimation(): globalThis.Animation | null {
    if (this.#isTimeline) return this.#animations[0]
    return this.#animations.reduce((prev, curr) => {
      const pT = prev.effect?.getComputedTiming().endTime as number
      const cT = curr.effect?.getComputedTiming().endTime as number
      return this.#numberish(pT) > this.#numberish(cT) ? prev : curr
    })
  }

  completed: AnimationPromise = new Promise((resolve, reject): void => {
    this.#resolve = resolve
    this.#reject = reject
  })

  play(): void {
    this.#run('play')
    this.#onPlay?.(this.#animations)
  }

  pause(): void {
    this.#run('pause')
    this.#onPause?.(this.#animations)
  }

  reverse(): void {
    this.#run('reverse')
    this.#onReverse?.(this.#animations)
  }

  stop(): void {
    this.#each((a) => {
      a.commitStyles()
      a.cancel()
    })
    this.#onStop?.(this.#animations)
  }

  complete(): void {
    this.#run('finish')
  }

  cancel(): void {
    this.#run('cancel')
  }

  get #endTime(): Readonly<number | null> {
    const t = this.#animation?.effect?.getComputedTiming().endTime
    return t ? this.#numberish(t) : null
  }

  get #currentTime(): Readonly<number | null> {
    const t = this.#animation?.currentTime
    return t ? this.#numberish(t) : null
  }

  get startTime(): number {
    return msToSec(this.#numberish(this.#animations[0].startTime || 0))
  }
  set startTime(t) {
    this.#set('startTime', secToMs(t))
  }

  get time(): number {
    return msToSec(this.#currentTime || 0)
  }
  set time(t) {
    this.#set('currentTime', secToMs(t))
  }

  get playRate(): number {
    return this.#animation?.playbackRate || 1
  }
  set playRate(r) {
    this.#set('playbackRate', r)
  }

  get effect(): globalThis.AnimationEffect | null {
    return this.#animation?.effect || null
  }
  set effect(e) {
    this.#set('effect', e)
  }

  get timeline(): globalThis.AnimationTimeline | null {
    return this.#animation?.timeline || null
  }
  set timeline(t) {
    this.#isTimeline ||= true
    this.#set('timeline', t)
  }

  get playState(): Readonly<globalThis.AnimationPlayState> {
    return this.#animation?.playState || 'idle'
  }

  get progress(): Readonly<number> {
    const cT = this.#currentTime
    const eT = this.#endTime
    return cT && eT ? cT / eT : 0
  }

  get isCompleted(): Readonly<boolean> {
    return this.#isCompleted && !this.#isTimeline
  }
}
