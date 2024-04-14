import type { ScrollTimeline } from './scroll-timeline'
import type { TimelineAxis, SourceMeasurements } from './shared'

export interface TimelineData {
  source: HTMLElement | null
  axis: TimelineAxis
}

export interface SourceData {
  sourceMeasurements: SourceMeasurements
  timelineRefs: Set<WeakRef<ScrollTimeline>>
  updateScheduled?: boolean
  disconnect?: VoidFunction
}
