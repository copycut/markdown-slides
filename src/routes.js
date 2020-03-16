import Manager from './pages/manager.vue'
import Presentation from './pages/presentation.vue'

export const routes = [
  { path: '/', name: 'manager', component: Manager },
  {
    path: '/presentation/:id',
    name: 'presentation',
    component: Presentation,
    props: true,
  },
  {
    path: '*',
    component: Manager,
  },
]
