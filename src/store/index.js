import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { EDITION } from '../constants/presentation-modes'
import { actions } from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

const debug = NODE_ENV !== 'production'

export const state = {
  mode: EDITION,
  selectedPresentationId: null,
  selectedSlideId: null,
  presentations: [],
}

export const getters = {
  getMode: state => state.mode,
  getPresentations: state => state.presentations,
  getPresentationById: state => presentationId =>
    state.presentations.find(
      presentation => presentation.id === presentationId,
    ),
  getSelectedPresentationId: state => state.selectedPresentationId,
  getSelectedPresentation: state =>
    state.presentations.filter(
      presentation => presentation.id === state.selectedPresentationId,
    ),
  getselectedSlideId: state => state.selectedSlideId,
  getSelectedSlide: (state, getters) => {
    const presentation = getters.getSelectedPresentation[0]

    if (!presentation || !presentation.slides) {
      return {}
    }
    return presentation.slides.find(slide => slide.id === state.selectedSlideId)
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
