import type { StepId } from './step'

export interface FrameData {
  delta: number
  timestamp: number
  isProcessing: boolean
}

export type Process = (data: FrameData) => void

export type Schedule = (
  process: Process,
  keepAlive?: boolean,
  immediate?: boolean,
) => Process

export type Batcher = {
  [key in StepId]: Schedule
}

export interface RenderBatcher {
  schedule: Batcher
  cancel: (process: Process) => void
  state: FrameData
}
