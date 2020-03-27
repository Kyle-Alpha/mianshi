import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    info:{},
    subject:{},

  },
  mutations: {
    setInfo(state,obj){
      state.info=obj
    },
    setSubject(state,obj){
      state.subject=obj
    }
  },
  actions: {},
  getters: {}
})
export default store
