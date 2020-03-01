import Vue from 'vue'
import Vuex from 'vuex'
import uid from 'uid'
import VuexPersist from 'vuex-persist'
import { PRESENTATION, EDITION } from '../constants/presentation-modes'

Vue.use(Vuex)

const debug = NODE_ENV !== 'production'

const presentationModes = [EDITION, PRESENTATION]

const newSlide = {
  id: uid(),
  title: 'new slide',
  content: '# New slide',
}

const state = {
  newSlide,
  slides: [],
  selectedSlideId: null,
  presentionMode: EDITION,
}

export const getters = {
  slides: state => state.slides,
  selectedSlide: state =>
    state.slides.filter(slide => slide.id === state.selectedSlideId)[0] || null,
  presentionMode: state => state.presentionMode,
}

function getIndex(slides = [], id = 0) {
  return slides.findIndex(slide => slide.id === id)
}

export const mutations = {
  ADD_SLIDE(state, slide) {
    state.slides.push({ ...state.newSlide, ...slide })
  },
  UPDATE_SLIDE(state, entry) {
    const index = getIndex(state.slides, entry.id)

    if (index !== -1) {
      const slide = state.slides[index]
      state.slides.splice(index, 1, { ...slide, ...entry })
    }
  },
  UPDATE_SLIDES(state, slides) {
    state.slides = slides
  },
  DELETE_SLIDE(state, id) {
    state.slides = state.slides.filter(slide => slide.id !== id)
  },
  SELECT_SLIDE(state, id) {
    if (!id) {
      state.selectedSlideId = state.slides[state.slides.length - 1].id
    }

    if (state.selectedSlideId === id) {
      return
    }

    state.selectedSlideId = id
  },
  SELECT_PREVIOUS(state, id) {
    const index = getIndex(state.slides, id)

    if (index < 1) {
      return (state.selectedSlideId = state.slides[state.slides.length - 1].id)
    }

    return (state.selectedSlideId = state.slides[index - 1].id)
  },
  SELECT_NEXT(state, id) {
    const index = getIndex(state.slides, id)

    if (index === -1 || index >= state.slides.length - 1) {
      return (state.selectedSlideId = state.slides[0].id)
    }

    return (state.selectedSlideId = state.slides[index + 1].id)
  },
  SWITCH_MODE(state, mode) {
    if (mode === state.presentionMode) {
      return
    }

    if (presentationModes.includes(mode)) {
      state.presentionMode = mode
    }
  },
}

export const actions = {
  create({ commit }) {
    const id = uid()
    commit('ADD_SLIDE', { id })
    commit('SELECT_SLIDE', id)
  },
  rename({ commit }, { id, title }) {
    commit('UPDATE_SLIDE', { id, title })
  },
  update({ commit }, { id, content }) {
    commit('UPDATE_SLIDE', { id, content })
  },
  remove({ commit }, id) {
    commit('DELETE_SLIDE', id)
  },
  select({ commit }, id) {
    commit('SELECT_SLIDE', id)
  },
  previousSlide({ commit }, id) {
    commit('SELECT_PREVIOUS', id)
  },
  nextSlide({ commit }, id) {
    commit('SELECT_NEXT', id)
  },
  selectLatest({ commit }) {
    commit('SELECT_SLIDE')
  },
  switchMode({ commit }, mode) {
    commit('SWITCH_MODE', mode)
  },
  updateSlides({ commit }, slides) {
    commit('UPDATE_SLIDES', slides)
  },
}

const vuexPersist = new VuexPersist({
  key: 'markdown-slides',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: [vuexPersist.plugin],
})
