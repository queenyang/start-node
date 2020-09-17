import Vue from "vue";
import Vuex from "vuex";
import map from "./components/map";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  modules: {
    map
  }
});
export default store;
