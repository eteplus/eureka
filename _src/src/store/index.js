
const wrapError = (name = '', error) => {
  error.name = name;
  return error;
};

const delay = (fetch, timeout = 1000) => {
  setTimeout(fetch, timeout);
};

const store = {
  state: {
    config: {
      site: {},
      github: {}
    },
    global: {
      error: {},
      loading: false
    },
    pages: {
      about: {}
    },
    posts: [], // [{post}]
    tags: [], // [{tag}]
    archives: {}, // { '${year}-${month}': [] }
    articles: {}, // { '${year}-${month}-${title}': { article content } }
    article: {}, // post content.
    tagOfPosts: {}, // { '${tag}': [] }
    tag_posts: [] // tag's posts.
  },
  actions: {
    FETCH: ({ commit }, type) => {
      const url = `/data/${type}.json`;
      const action = `FETCH_${type.toUpperCase()}`;
      const setType = `SET_${type.toUpperCase()}`;
      commit('LOADING', true);
      delay(() => {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          commit(setType, data);
          commit('LOADING', false);
        })
        .catch(error => commit('ERROR', wrapError(action, error)));
      });
    },
    FETCH_CONFIG: ({ commit }) => {
      fetch('/data/config.json')
        .then(res => res.json())
        .then(config => commit('SET_CONFIG', config))
        .catch(error => commit('ERROR', wrapError('FETCH_CONFIG', error)));
    },
    FETCH_ARTICLE: ({ commit, state }, { year, month, title }) => {
      const key = `${year}-${month}-${title}`;
      if (state.articles[key]) {
        commit('SET_ARTICLE', state.articles[key]);
        return;
      }
      commit('LOADING', true);
      delay(() => {
        fetch(`/data/posts/${year}/${month}/${title}.json`)
        .then(res => res.json())
        .then((article) => {
          commit('SET_ARTICLE', article);
          commit('ADD_ARTICLE', {
            key,
            article
          });
          commit('LOADING', false);
        })
        .catch(error => commit('ERROR', wrapError('FETCH_ARTICLE', error)));
      });
    },
    FETCH_TAGOFPOSTS: ({ commit }, tag) => {
      commit('LOADING', true);
      delay(() => {
        fetch(`/data/tags/${tag}.json`)
          .then(res => res.json())
          .then((posts) => {
            commit('SET_TAGPOSTS', posts);
            commit('ADD_TAGOFPOSTS', {
              tag,
              posts
            });
            commit('LOADING', false);
          })
          .catch(error => commit('ERROR', wrapError('FETCH_TAGOFPOSTS', error)));
      });
    },
    FETCH_PAGE: ({ commit }, page) => {
      commit('LOADING', true);
      delay(() => {
        fetch(`/data/pages/${page}.json`)
          .then(res => res.json())
          .then((data) => {
            commit('ADD_PAGE', data);
            commit('LOADING', false);
          })
          .catch(error => commit('ERROR', wrapError('FETCH_PAGE', error)));
      });
    }
  },
  mutations: {
    ERROR: (state, error) => {
      state.global.error = error;
    },
    LOADING: (state, status) => {
      state.global.loading = status;
    },
    SET_CONFIG: (state, config) => {
      state.config = config;
    },
    SET_POSTS: (state, posts) => {
      state.posts = posts;
    },
    SET_TAGS: (state, tags) => {
      state.tags = tags;
    },
    SET_ARCHIVES: (state, archives) => {
      state.archives = archives;
    },
    SET_ARTICLE: (state, article) => {
      state.article = article;
    },
    ADD_ARTICLE: (state, { key, article }) => {
      state.articles[key] = article;
    },
    SET_TAGPOSTS: (state, posts) => {
      state.tag_posts = posts;
    },
    ADD_TAGOFPOSTS: (state, { tag, posts }) => {
      state.tagOfPosts[tag] = posts;
    },
    ADD_PAGE: (state, page) => {
      state.pages[page.name] = page;
    }
  }
};

export default store;
