import mutation from '@/store/mutations';

const { SET_LOADER_VALUE } = mutation;

const loaderstore = {
  state: {
    isShowLoader: false,
  },
  mutations: {
    [SET_LOADER_VALUE](state, value) {
      state.isShowLoader = value;
    },
  },
  getters: {
    isShowLoader: ({ isShowLoader }) => isShowLoader,
  },
  actions: {
    setLoaderValue({ commit }, value) {
      commit(SET_LOADER_VALUE, value);
    },
  },
};

export default loaderstore;
