import type { KeyframeOptions } from '@/types'

export function validateUnits(
  key: string,
  units: KeyframeOptions['units'],
): void {
  if (units.size > 1) {
    throw new TypeError(
      `All units of '${key}' property must be of the same type.`,
    )
  }
}
