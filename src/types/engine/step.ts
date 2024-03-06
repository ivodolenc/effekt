import type { Schedule, Process, FrameData } from './batcher'

export type StepId = 'read' | 'update'

export interface Step {
  schedule: Schedule
  cancel: (process: Process) => void
  process: (data: FrameData) => void
}

export type Steps = {
  [key in StepId]: Step
}
