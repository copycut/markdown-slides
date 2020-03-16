import { PRESENTATION, EDITION } from '../constants/presentation-modes'

const presentationModes = [EDITION, PRESENTATION]

const generateNewPresentation = () => ({
  id: null,
  title: 'new presentation',
  slides: [],
})

const generateNewSlide = () => ({
  id: null,
  title: 'new slide',
  content: '# New slide',
})

function getIndex(slides = [], id = 0) {
  return slides.findIndex(slide => slide.id === id)
}

function getActivePresentation(state) {
  return state.presentations.find(
    presentation => presentation.id === state.selectedPresentationId,
  )
}

export const mutations = {
  ADD_PRESENTATION(state, presentation) {
    const newPresentation = { ...generateNewPresentation(), ...presentation }

    state.presentations = [...state.presentations, newPresentation]
  },
  ADD_SLIDE(state, slide) {
    if (state.selectedPresentationId === null) {
      return
    }

    const newSlide = { ...generateNewSlide(), ...slide }

    state.presentations = state.presentations.map(presentation => {
      if (presentation.id === state.selectedPresentationId) {
        return {
          ...presentation,
          slides: [...presentation.slides, newSlide],
        }
      }

      return presentation
    })
  },
  UPDATE_PRESENTATION(state, { id, title }) {
    state.presentations = state.presentations.map(presentation => {
      if (presentation.id === id) {
        presentation.title = title
      }
      return presentation
    })
  },
  UPDATE_SLIDE(state, entry) {
    if (state.selectedPresentationId === null) {
      return
    }

    state.presentations = state.presentations.map(presentation => {
      if (presentation.id === state.selectedPresentationId) {
        presentation.slides = presentation.slides.map(slide => {
          if (slide.id === entry.id) {
            return { ...slide, ...entry }
          }
          return slide
        })
      }
      return presentation
    })
  },
  UPDATE_SLIDES(state, slides) {
    state.presentations = state.presentations.map(presentation => {
      if (presentation.id === state.selectedPresentationId) {
        presentation.slides = slides
      }
      return presentation
    })
  },
  DELETE_PRESENTATION(state, id) {
    state.presentations = state.presentations.filter(
      presentation => presentation.id !== id,
    )
  },
  DELETE_SLIDE(state, id) {
    state.presentations.map(presentation => {
      if (presentation.id === state.selectedPresentationId) {
        presentation.slides = presentation.slides.filter(
          slide => slide.id !== id,
        )
      }
    })
  },
  SELECT_PRESENTATION(state, id) {
    if (state.selectedPresentationId === id) {
      return
    }

    if (!id) {
      const latestPresentation =
        state.presentations[state.presentations.length - 1]
      return (state.selectedPresentationId = latestPresentation.id)
    }

    state.selectedPresentationId = id
  },
  SELECT_SLIDE(state, id) {
    if (state.selectedSlideId === id) {
      return
    }

    if (!id) {
      // get latest slide from active presentation
      const activePresentation = getActivePresentation(state)

      if (!activePresentation || !activePresentation.slides) {
        return
      }

      const lastSlideId =
        activePresentation.slides[activePresentation.slides.length - 1].id

      return (state.selectedSlideId = lastSlideId)
    }

    state.selectedSlideId = id
  },
  SELECT_PREVIOUS(state, id) {
    const activePresentation = getActivePresentation(state)
    const index = getIndex(activePresentation.slides, id)

    if (index < 1) {
      return (state.selectedSlideId =
        activePresentation.slides[activePresentation.slides.length - 1].id)
    }
    return (state.selectedSlideId = activePresentation.slides[index - 1].id)
  },
  SELECT_NEXT(state, id) {
    const activePresentation = getActivePresentation(state)
    const index = getIndex(activePresentation.slides, id)
    if (index === -1 || index >= activePresentation.slides.length - 1) {
      return (state.selectedSlideId = activePresentation.slides[0].id)
    }
    return (state.selectedSlideId = activePresentation.slides[index + 1].id)
  },
  SWITCH_MODE(state, mode) {
    if (mode === state.mode) {
      return
    }
    if (presentationModes.includes(mode)) {
      state.mode = mode
    }
  },
}
