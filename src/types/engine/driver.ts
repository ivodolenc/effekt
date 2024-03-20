export interface DriverOptions {
  onRead?: () => void
  onUpdate?: () => void
  onRender?: () => void
  onComplete?: () => void
}
