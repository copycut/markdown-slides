import { shallowMount, config } from '@vue/test-utils'
import { state, getters, actions, mutations } from '../src/store'
import App from '../src/components/app.vue'

config.mocks['$store'] = { state, getters, actions, mutations }

test('App create a new slide when no one is present', () => {
  const wrapper = shallowMount(App)
  expect(wrapper.isVueInstance()).toBeTruthy()
  console.log(state)

  expect(actions.create).toHaveBeenCalled()
})
