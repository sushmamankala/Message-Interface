import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
	currentUser: null,
	messages: []
}
const getters = {
	currentUser: state => state.currentUser,
}
const actions = {}
const mutations = {
	SET_CURRENT_USER (state, value) {
    state.currentUser = value
  },
	SET_MESSAGES (state, value) {
    state.messages = value
  }
}
export default new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
	plugins: [createPersistedState({
    reducer: state => ({
      currentUser: state.currentUser
    })
  })]
})