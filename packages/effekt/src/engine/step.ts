// Inspired by Frameloop Step from Framer Motion, 11.3.30, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.2.0, MIT License, https://github.com/ivodolenc/effekt

import type { Step, Process, FrameData } from '@/types'

export function createRenderStep(runNextFrame: () => void): Step {
  let thisFrame = new Set<Process>()
  let nextFrame = new Set<Process>()

  let isProcessing = false
  let flushNextFrame = false

  const toKeepAlive = new WeakSet<Process>()

  let latestFrameData: FrameData = {
    delta: 0.0,
    timestamp: 0.0,
    isProcessing: false,
  }

  function triggerCallback(callback: Process) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback)
      runNextFrame()
    }

    callback(latestFrameData)
  }

  const step: Step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing
      const queue = addToCurrentFrame ? thisFrame : nextFrame

      if (keepAlive) toKeepAlive.add(callback)

      if (!queue.has(callback)) queue.add(callback)

      return callback
    },

    cancel: (callback) => {
      nextFrame.delete(callback)
      toKeepAlive.delete(callback)
    },

    process: (frameData) => {
      latestFrameData = frameData

      if (isProcessing) {
        flushNextFrame = true
        return
      }

      isProcessing = true
      ;[thisFrame, nextFrame] = [nextFrame, thisFrame]

      nextFrame.clear()

      thisFrame.forEach(triggerCallback)

      isProcessing = false

      if (flushNextFrame) {
        flushNextFrame = false
        step.process(frameData)
      }
    },
  }

  return step
}
