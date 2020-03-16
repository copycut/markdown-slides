import { getters } from '../../src/store'
import { state as OriginalState } from '../../src/store'

test('getMode', () => {
  const state = {
    ...OriginalState,
    mode: 'ABC',
  }
  expect(getters.getMode(state)).toBe('ABC')
})

test('getPresentations', () => {
  const state = {
    ...OriginalState,
    presentations: [
      {
        id: '1',
        slides: [],
      },
    ],
  }
  expect(getters.getPresentations(state)).toStrictEqual(state.presentations)
})

test('getPresentationById', () => {
  const state = {
    ...OriginalState,
    presentations: [
      {
        id: '1',
        slides: [],
      },
      {
        id: '2',
        slides: [],
      },
    ],
  }
  expect(getters.getPresentationById(state)('2')).toBe(state.presentations[1])
})

test('getSelectedPresentation', () => {
  const state = {
    ...OriginalState,
    selectedPresentationId: '1',
    presentations: [
      {
        id: '1',
        slides: [],
      },
      {
        id: '2',
        slides: [],
      },
    ],
  }
  expect(getters.getSelectedPresentation(state)).toStrictEqual([
    state.presentations[0],
  ])
})

test('getSelectedSlide / no selected presentation', () => {
  const state = {
    ...OriginalState,
    selectedPresentationId: '1',
    presentations: [
      {
        id: '1',
        slides: [
          {
            id: '0',
            title: 'one',
            content: '# one',
            renderedContent: '<h1>one</h1>',
          },
          {
            id: '1',
            title: 'two',
            content: '## two',
            renderedContent: '<h2>two</h2>',
          },
        ],
      },
      {
        id: '2',
        slides: [],
      },
    ],
  }
  expect(getters.getSelectedSlide(state, getters)).toStrictEqual({})
})
