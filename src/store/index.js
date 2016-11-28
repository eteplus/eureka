const store = {
  state: {
    posts: []
  },
  actions: {
    FETCH_POSTS: ({ commit, dispatch, state }, posts) => {
      commit('SET_POSTS', posts);
    }
  },
  mutations: {
    SET_POSTS: (state, posts) => {
      state.posts = posts;
    }
  }
};

export default store;
