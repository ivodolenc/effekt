export function setRepeat(repeat?: number): number {
  return repeat ? (repeat === Infinity ? 1000 : repeat + 1) : 1
}
