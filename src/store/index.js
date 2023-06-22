import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: []
  },
  getters: {
  },
  mutations: {
    addTask (state, newTask) {
      state.taskList.push(newTask);
    },

    getDataFromLocalStorage (state) {
      const localData = JSON.parse(localStorage.getItem('taskList'));
      if (localData) {
        state.taskList = localData;
      }
    },

    sendDataToLocalStorage (state) {
      localStorage.setItem('taskList', JSON.stringify(state.taskList))
    }
  },
  actions: {},
  modules: {
  }
})
