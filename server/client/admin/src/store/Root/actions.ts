export default {
  // Define your actions here
  setExampleVar({ commit }: { commit: Function }, payload: any) {
    commit('SET_EXAMPLE_VAR', payload);
  },
};
