import { createStore } from 'vuex'
import Root from './Root'

const store = createStore({
  modules: {
    Root
  }
})

export default store
export const useStore = () => store
