import { getters } from '../../src/store'

test('slides', () => {
  const state = {
    slides: [{ id: '1' }],
  }
  expect(getters.slides(state)).toBe(state.slides)
})

test('selectedSlide', () => {
  const state = {
    selectedSlideId: '1',
    slides: [{ id: '1' }, { id: '2' }],
  }
  expect(getters.selectedSlide(state)).toStrictEqual({ id: '1' })
})

test('selectedSlide / no match', () => {
  const state = {
    selectedSlideId: '3',
    slides: [{ id: '1' }, { id: '2' }],
  }
  expect(getters.selectedSlide(state)).toBe(null)
})

test('presentionMode', () => {
  const state = {
    presentionMode: 'ABC',
  }
  expect(getters.presentionMode(state)).toBe('ABC')
})
