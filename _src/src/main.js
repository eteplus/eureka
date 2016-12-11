import 'whatwg-fetch';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import App from './App';
import routes from './routes';
import STORE from './store';

const { state, actions, mutations } = STORE;

const isDev = process.env.NODE_ENV !== 'production';

Vue.config.devtools = isDev;

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes
});

const store = new Vuex.Store({
  strict: isDev,
  state,
  actions,
  mutations
});

sync(store, router);

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
});

app.$mount('#app');
