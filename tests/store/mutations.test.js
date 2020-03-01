import { mutations } from '../../src/store'
import { PRESENTATION, EDITION } from '../../src/constants/presentation-modes'

test('ADD_SLIDE', () => {
  const state = {
    slides: [],
  }
  const slide = { id: '1' }
  mutations.ADD_SLIDE(state, slide)

  expect(state.slides).toHaveLength(1)
})

test('UPDATE_SLIDE', () => {
  const state = {
    slides: [{ id: '1', title: 'A' }],
  }
  const slide = { id: '1', title: 'B' }
  mutations.UPDATE_SLIDE(state, slide)

  expect(state.slides[0].title).toBe('B')
})

test('UPDATE_SLIDES', () => {
  const state = {
    slides: [{ id: '1', title: 'A' }],
  }
  const slides = [{ id: '2', title: 'B' }]
  mutations.UPDATE_SLIDES(state, slides)

  expect(state.slides).toHaveLength(1)
  expect(state.slides[0].id).toBe('2')
  expect(state.slides[0].title).toBe('B')
})

test('DELETE_SLIDE', () => {
  const state = {
    slides: [{ id: '1', title: 'A' }],
  }
  mutations.DELETE_SLIDE(state, '1')

  expect(state.slides).toHaveLength(0)
})

test('SELECT_SLIDE', () => {
  const state = {
    selectedSlideId: null,
    slides: [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' },
    ],
  }

  mutations.SELECT_SLIDE(state, '2')
  expect(state.selectedSlideId).toBe('2')

  mutations.SELECT_SLIDE(state)
  expect(state.selectedSlideId).toBe(undefined)
})

test('SELECT_SLIDE / same id', () => {
  const state = {
    selectedSlideId: '2',
    slides: [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' },
    ],
  }

  mutations.SELECT_SLIDE(state, '2')
  expect(state.selectedSlideId).toBe('2')
})

test('SELECT_PREVIOUS', () => {
  const state = {
    selectedSlideId: null,
    slides: [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' },
    ],
  }

  mutations.SELECT_PREVIOUS(state, '2')
  expect(state.selectedSlideId).toBe('1')

  mutations.SELECT_PREVIOUS(state, '1')
  expect(state.selectedSlideId).toBe('3')

  mutations.SELECT_PREVIOUS(state)
  expect(state.selectedSlideId).toBe('3')
})

test('SELECT_NEXT', () => {
  const state = {
    selectedSlideId: null,
    slides: [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' },
    ],
  }

  mutations.SELECT_NEXT(state, '2')
  expect(state.selectedSlideId).toBe('3')

  mutations.SELECT_NEXT(state, '3')
  expect(state.selectedSlideId).toBe('1')

  mutations.SELECT_NEXT(state)
  expect(state.selectedSlideId).toBe('1')
})

test('SWITCH_MODE', () => {
  const state = {
    presentionMode: null,
  }

  mutations.SWITCH_MODE(state, 'test')
  expect(state.presentionMode).toBe(null)

  mutations.SWITCH_MODE(state, PRESENTATION)
  expect(state.presentionMode).toBe(PRESENTATION)

  mutations.SWITCH_MODE(state, EDITION)
  expect(state.presentionMode).toBe(EDITION)
})

test('SWITCH_MODE / same mode', () => {
  const state = {
    presentionMode: PRESENTATION,
  }

  mutations.SWITCH_MODE(state, PRESENTATION)
  expect(state.presentionMode).toBe(PRESENTATION)
})
