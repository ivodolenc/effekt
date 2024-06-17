// @vitest-environment jsdom

import { describe, test, expect } from 'vitest'
import { getElements } from '@/utils/get-elements'

describe('gets a parsed list of DOM elements', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  const div = document.querySelector('div')

  test('based on querySelector', () => {
    expect(getElements(div)).toBeTruthy()
    expect(getElements(div)).toContain(div)
    expect(getElements(div)).toBeInstanceOf(Array<Element>)
  })

  test('based on string value', () => {
    expect(getElements('div')).toBeTruthy()
    expect(getElements('div')).toBeInstanceOf(Array<Element>)
  })

  test('based on array of elements', () => {
    expect(getElements([div, div, div])).toBeTruthy()
    expect(getElements([div, div, div])).toBeInstanceOf(Array<Element>)
  })

  test('based on node list', () => {
    const nodeList = document.querySelectorAll('div')

    expect(getElements(nodeList)).toBeTruthy()
    expect(getElements(nodeList)).toBeInstanceOf(Array<Element>)
  })

  test('based on type error', () => {
    const div = document.querySelector('.div')
    const nodeList = document.querySelectorAll('.div')

    expect(() => getElements(div)).toThrowError()
    expect(() => getElements('.div')).toThrowError()
    expect(() => getElements([div, div, div])).toThrowError()
    expect(() => getElements(nodeList)).toThrowError()
  })
})
