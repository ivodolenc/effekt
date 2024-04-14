import type { TimelineAxis, TimelinePhase } from './shared'

export interface ScrollTimelineOptions {
  source?: HTMLElement | null
  axis?: TimelineAxis
}

export declare class ScrollTimeline {
  constructor(options: ScrollTimelineOptions)
  cancel: VoidFunction
  source: HTMLElement
  axis: TimelineAxis
  phase: TimelinePhase
  currentTime: { value: number } | null
}
