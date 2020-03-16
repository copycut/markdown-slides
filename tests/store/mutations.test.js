import { mutations } from '../../src/store/mutations'
import { state as originalState } from '../../src/store'
import { PRESENTATION, EDITION } from '../../src/constants/presentation-modes'

test('ADD_PRESENTATION', () => {
  const state = {
    ...originalState,
    presentations: [],
  }
  mutations.ADD_PRESENTATION(state, { id: 'presentation-1' })

  expect(state.presentations).toHaveLength(1)
  expect(state.presentations[0].id).toBe('presentation-1')
})

test('ADD_SLIDE', () => {
  const state = {
    ...originalState,
    selectedPresentationId: '2',
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
  mutations.ADD_SLIDE(state, { id: 'slide-1' })

  expect(state.presentations[1].slides).toHaveLength(1)
})

test('ADD_SLIDE / no presentations selected', () => {
  const state = {
    ...originalState,
    presentations: [
      {
        id: '1',
        slides: [],
      },
    ],
  }
  const slide = { id: 'slide-1' }
  mutations.ADD_SLIDE(state, slide)

  expect(state.presentations[0].slides).toHaveLength(0)
})

test('UPDATE_SLIDE', () => {
  const state = {
    ...originalState,
    selectedPresentationId: '0',
    presentations: [
      {
        id: '0',
        slides: [{ id: '1', title: 'A' }],
      },
    ],
  }
  const slide = { id: '1', title: 'B' }
  mutations.UPDATE_SLIDE(state, slide)

  expect(state.presentations[0].slides[0].title).toBe('B')
})

test('UPDATE_SLIDE', () => {
  const state = {
    ...originalState,
    presentations: [
      {
        id: '0',
        slides: [{ id: '1', title: 'A' }],
      },
    ],
  }
  const slide = { id: '1', title: 'B' }
  mutations.UPDATE_SLIDE(state, slide)

  expect(state.presentations[0].slides[0].title).toBe('A')
})

test('UPDATE_SLIDES', () => {
  const state = {
    ...originalState,
    selectedPresentationId: '0',
    presentations: [
      {
        id: '0',
        slides: [{ id: '1', title: 'A' }],
      },
    ],
  }
  const slides = [{ id: '2', title: 'B' }]
  mutations.UPDATE_SLIDES(state, slides)

  expect(state.presentations[0].slides).toHaveLength(1)
  expect(state.presentations[0].slides[0].id).toBe('2')
  expect(state.presentations[0].slides[0].title).toBe('B')
})

test('DELETE_PRESENTATION', () => {
  const state = {
    ...originalState,
    presentations: [
      {
        id: 'presentation-1',
        slides: [],
      },
    ],
  }
  mutations.DELETE_PRESENTATION(state, 'presentation-1')

  expect(state.presentations).toHaveLength(0)
})

test('DELETE_SLIDE', () => {
  const state = {
    ...originalState,
    selectedPresentationId: '0',
    presentations: [
      {
        id: '0',
        slides: [{ id: '1', title: 'A' }],
      },
    ],
  }
  mutations.DELETE_SLIDE(state, '1')

  expect(state.presentations[0].slides).toHaveLength(0)
})

test('SELECT_PRESENTATION', () => {
  const state = {
    ...originalState,
    selectedPresentationId: 'presentation-1',
    presentations: [
      {
        id: 'presentation-1',
        slides: [],
      },
      {
        id: 'presentation-2',
        slides: [],
      },
      {
        id: 'presentation-3',
        slides: [],
      },
    ],
  }

  mutations.SELECT_PRESENTATION(state, 'presentation-2')
  expect(state.selectedPresentationId).toBe('presentation-2')

  mutations.SELECT_PRESENTATION(state)
  expect(state.selectedPresentationId).toBe('presentation-3')
})

test('SELECT_SLIDE', () => {
  const state = {
    ...originalState,
    selectedSlideId: 'slide-1',
    selectedPresentationId: 'presentation-1',
    presentations: [
      {
        id: 'presentation-1',
        slides: [
          { id: 'slide-1', title: 'A' },
          { id: 'slide-2', title: 'B' },
          { id: 'slide-3', title: 'C' },
        ],
      },
    ],
  }

  mutations.SELECT_SLIDE(state, 'slide-2')
  expect(state.selectedSlideId).toBe('slide-2')

  mutations.SELECT_SLIDE(state)
  expect(state.selectedSlideId).toBe('slide-3')
})

test('SELECT_SLIDE / same id', () => {
  const state = {
    ...originalState,
    selectedSlideId: 'slide-1',
    selectedPresentationId: 'presentation-1',
    presentations: [
      {
        id: 'presentation-1',
        slides: [
          { id: 'slide-1', title: 'A' },
          { id: 'slide-2', title: 'B' },
          { id: 'slide-3', title: 'C' },
        ],
      },
    ],
  }

  mutations.SELECT_SLIDE(state, 'slide-1')
  expect(state.selectedSlideId).toBe('slide-1')
})

test('SELECT_PREVIOUS', () => {
  const state = {
    ...originalState,
    selectedSlideId: 'slide-2',
    selectedPresentationId: 'presentation-1',
    presentations: [
      {
        id: 'presentation-1',
        slides: [
          { id: 'slide-1', title: 'A' },
          { id: 'slide-2', title: 'B' },
          { id: 'slide-3', title: 'C' },
        ],
      },
    ],
  }

  mutations.SELECT_PREVIOUS(state, 'slide-2')
  expect(state.selectedSlideId).toBe('slide-1')

  mutations.SELECT_PREVIOUS(state, 'slide-1')
  expect(state.selectedSlideId).toBe('slide-3')

  mutations.SELECT_PREVIOUS(state)
  expect(state.selectedSlideId).toBe('slide-3')
})

test('SELECT_NEXT', () => {
  const state = {
    ...originalState,
    selectedSlideId: 'slide-2',
    selectedPresentationId: 'presentation-1',
    presentations: [
      {
        id: 'presentation-1',
        slides: [
          { id: 'slide-1', title: 'A' },
          { id: 'slide-2', title: 'B' },
          { id: 'slide-3', title: 'C' },
        ],
      },
    ],
  }

  mutations.SELECT_NEXT(state, 'slide-2')
  expect(state.selectedSlideId).toBe('slide-3')

  mutations.SELECT_NEXT(state, 'slide-3')
  expect(state.selectedSlideId).toBe('slide-1')

  mutations.SELECT_NEXT(state)
  expect(state.selectedSlideId).toBe('slide-1')
})

test('SWITCH_MODE', () => {
  const state = {
    mode: null,
  }

  mutations.SWITCH_MODE(state, 'test')
  expect(state.mode).toBe(null)

  mutations.SWITCH_MODE(state, PRESENTATION)
  expect(state.mode).toBe(PRESENTATION)

  mutations.SWITCH_MODE(state, EDITION)
  expect(state.mode).toBe(EDITION)
})

test('SWITCH_MODE / same mode', () => {
  const state = {
    mode: PRESENTATION,
  }

  mutations.SWITCH_MODE(state, PRESENTATION)
  expect(state.mode).toBe(PRESENTATION)
})
