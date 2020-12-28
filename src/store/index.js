import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedImage: {},
    selectedText: {},
    selectedButton: {},
    selectedGif: {},
    selectedVideo: {},
  },
  mutations: {
    setSelectedButton(state, payload) {
      state.selectedButton = {...state.selectedButton, ...payload}
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getSelectedButton: state => state.selectedButton
  }
})
