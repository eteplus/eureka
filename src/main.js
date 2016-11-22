import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App';
import routes from './routes';

Vue.config.devtools = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

/* eslint-disable no-new */
const app = new Vue({
  router,
  render: h => h(App)
});

app.$mount('#app');
