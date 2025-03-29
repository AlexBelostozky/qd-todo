import { createStore } from 'vuex'

interface State {
  taskList: string[]
}

const store = createStore<State>({
  state (): State {
    return {
      taskList: []
    }
  },

  getters: {},

  mutations: {
    addTask (state, newTask: string) {
      state.taskList.push(newTask)
    },

    getDataFromLocalStorage (state) {
      const localData = localStorage.getItem('taskList')

      if (localData !== null) {
        state.taskList = JSON.parse(localData) as string[]
      }
    },

    sendDataToLocalStorage (state) {
      localStorage.setItem('taskList', JSON.stringify(state.taskList))
    }
  },

  actions: {},

  modules: {}
})

export default store
