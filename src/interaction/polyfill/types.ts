export type TimelineAxis = 'x' | 'y'
export type TimelinePhase = 'active' | 'inactive'

export interface TimelineOptions {
  source: HTMLElement | null
  axis: TimelineAxis
}

export interface SourceMeasurements {
  scrollLeft: number
  scrollTop: number
  scrollWidth: number
  scrollHeight: number
  clientWidth: number
  clientHeight: number
}

export interface SourceDetails {
  sourceMeasurements: SourceMeasurements
  timelineRefs: Set<WeakRef<ScrollTimeline>>
  updateScheduled?: boolean
  disconnect?: VoidFunction
}

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
