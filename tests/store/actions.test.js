import { actions } from '../../src/store/actions'
import { spy } from 'sinon'

test('addPresentation', () => {
  const commit = spy()
  actions.addPresentation({ commit })

  expect(commit.args[0][0]).toBe('ADD_PRESENTATION')
  expect(commit.args[0][1]).toHaveProperty('id')
})

test('addSlide', () => {
  const commit = spy()
  actions.addSlide({ commit })

  expect(commit.args[0][0]).toBe('ADD_SLIDE')
  expect(commit.args[0][1]).toHaveProperty('id')
  expect(commit.args[1][0]).toBe('SELECT_SLIDE')
  expect(commit.args[1][1]).toBeDefined()
})

test('renameSlide', () => {
  const commit = spy()
  const slide = { title: 'test', id: '1' }
  actions.renameSlide({ commit }, slide)

  expect(commit.args[0][0]).toBe('UPDATE_SLIDE')
  expect(commit.args[0][1]).toStrictEqual(slide)
})

test('updateSlide', () => {
  const commit = spy()
  const slide = { id: '1', content: 'This is content' }
  actions.updateSlide({ commit }, slide)

  expect(commit.args[0][0]).toBe('UPDATE_SLIDE')
  expect(commit.args[0][1]).toStrictEqual(slide)
})

test('removePresentation', () => {
  const commit = spy()
  const id = '1'
  actions.removePresentation({ commit }, id)

  expect(commit.args[0][0]).toBe('DELETE_PRESENTATION')
  expect(commit.args[0][1]).toBe(id)
})

test('removeSlide', () => {
  const commit = spy()
  const id = '1'
  actions.removeSlide({ commit }, id)

  expect(commit.args[0][0]).toBe('DELETE_SLIDE')
  expect(commit.args[0][1]).toBe(id)
})

test('selectPresentation', () => {
  const commit = spy()
  const id = '1'
  actions.selectPresentation({ commit }, id)

  expect(commit.args[0][0]).toBe('SELECT_PRESENTATION')
  expect(commit.args[0][1]).toBe(id)
})

test('selectSlide', () => {
  const commit = spy()
  const id = '1'
  actions.selectSlide({ commit }, id)

  expect(commit.args[0][0]).toBe('SELECT_SLIDE')
  expect(commit.args[0][1]).toBe(id)
})

test('previousSlide', () => {
  const commit = spy()
  const id = '1'
  actions.previousSlide({ commit }, id)

  expect(commit.args[0][0]).toBe('SELECT_PREVIOUS')
  expect(commit.args[0][1]).toBe(id)
})

test('nextSlide', () => {
  const commit = spy()
  const id = '1'
  actions.nextSlide({ commit }, id)

  expect(commit.args[0][0]).toBe('SELECT_NEXT')
  expect(commit.args[0][1]).toBe(id)
})

test('selectLatest', () => {
  const commit = spy()
  actions.selectLatest({ commit })

  expect(commit.args[0][0]).toBe('SELECT_SLIDE')
})

test('switchMode', () => {
  const commit = spy()
  const mode = 'presentation'
  actions.switchMode({ commit }, mode)

  expect(commit.args[0][0]).toBe('SWITCH_MODE')
  expect(commit.args[0][1]).toBe(mode)
})

test('updateSlides', () => {
  const commit = spy()
  const slides = [{ id: '1' }, { id: '2' }]
  actions.updateSlides({ commit }, slides)

  expect(commit.args[0][0]).toBe('UPDATE_SLIDES')
  expect(commit.args[0][1]).toStrictEqual(slides)
})
