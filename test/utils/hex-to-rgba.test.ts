import { describe, test, expect } from 'vitest'
import { hexToRgba } from '@/utils/hex-to-rgba'

describe('converts hex to rgba color format', () => {
  test('parses a 3 char hex color', () => {
    expect(hexToRgba('#cf3')).toStrictEqual([204, 255, 51, 1])
  })

  test('parses a 6 char hex color', () => {
    expect(hexToRgba('#ccff33')).toStrictEqual([204, 255, 51, 1])
  })

  test('parses a 6 char hex color with alpha', () => {
    expect(hexToRgba('#ccff3399')).toStrictEqual([204, 255, 51, 0.6])
  })
})
