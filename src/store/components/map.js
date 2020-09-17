import { checkType } from "@/utils/common";
import { getGeoFile } from "@/api/map";

export default {
  namespaced: true,
  state: {
    adcode: "330000",
    boundary: null
  },
  mutations: {
    setValue(state, payload) {
      if (checkType(payload) === "Object") {
        Object.keys(payload).forEach(attr => {
          state[attr] = payload[attr];
        });
      }
    }
  },
  actions: {
    getBoundary({ state, commit }) {
      return new Promise(resolve => {
        getGeoFile({ adcode: state.adcode }).then(res => {
          commit("setValue", { boundary: res });
          resolve();
        });
      });
    }
  }
};
