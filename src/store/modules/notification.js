import mutation from '@/store/mutations';

const { SHOW_TOAST_NOTIFY } = mutation;
const notificationStore = {
  state: {
    messagePool: [],
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    },
  },
  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_TOAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
