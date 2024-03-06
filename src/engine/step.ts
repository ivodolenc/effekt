import type { Step, Process } from '@/types'

class Queue {
  order: Process[] = []
  scheduled: Set<Process> = new Set()

  add(process: Process): true | undefined {
    if (!this.scheduled.has(process)) {
      this.scheduled.add(process)
      this.order.push(process)
      return true
    }
  }

  remove(process: Process): void {
    const index = this.order.indexOf(process)
    if (index !== -1) {
      this.order.splice(index, 1)
      this.scheduled.delete(process)
    }
  }

  clear(): void {
    this.order.length = 0
    this.scheduled.clear()
  }
}

export function createRenderStep(runNextFrame: () => void): Step {
  let thisFrame = new Queue()
  let nextFrame = new Queue()
  let numToRun = 0

  let isProcessing = false
  let flushNextFrame = false

  const toKeepAlive = new WeakSet<Process>()

  const step: Step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing
      const queue = addToCurrentFrame ? thisFrame : nextFrame

      if (keepAlive) toKeepAlive.add(callback)

      if (queue.add(callback) && addToCurrentFrame && isProcessing) {
        numToRun = thisFrame.order.length
      }
      return callback
    },

    cancel: (callback) => {
      nextFrame.remove(callback)
      toKeepAlive.delete(callback)
    },

    process: (frameData) => {
      if (isProcessing) {
        flushNextFrame = true
        return
      }

      isProcessing = true
      ;[thisFrame, nextFrame] = [nextFrame, thisFrame]
      nextFrame.clear()
      numToRun = thisFrame.order.length

      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = thisFrame.order[i]

          callback(frameData)

          if (toKeepAlive.has(callback)) {
            step.schedule(callback)
            runNextFrame()
          }
        }
      }

      isProcessing = false

      if (flushNextFrame) {
        flushNextFrame = false
        step.process(frameData)
      }
    },
  }

  return step
}
