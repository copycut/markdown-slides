import uid from 'uid'

export const actions = {
  addPresentation({ commit }) {
    const id = uid(32)
    commit('ADD_PRESENTATION', { id })
    commit('SELECT_PRESENTATION', id)
  },
  addSlide({ commit }) {
    const id = uid(32)
    commit('ADD_SLIDE', { id })
    commit('SELECT_SLIDE', id)
  },
  renameSlide({ commit }, { id, title }) {
    commit('UPDATE_SLIDE', { id, title })
  },
  updatePresentation({ commit }, { id, title }) {
    commit('UPDATE_PRESENTATION', { id, title })
  },
  updateSlide({ commit }, { id, content }) {
    commit('UPDATE_SLIDE', { id, content })
  },
  removePresentation({ commit }, id) {
    commit('DELETE_PRESENTATION', id)
  },
  removeSlide({ commit }, id) {
    commit('DELETE_SLIDE', id)
  },
  selectPresentation({ commit }, id) {
    commit('SELECT_PRESENTATION', id)
  },
  selectSlide({ commit }, id) {
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
