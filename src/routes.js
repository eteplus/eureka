/* eslint-disable global-require, import/no-dynamic-require */
const routes = [
  {
    path: '/',
    name: 'index',
    component: require('./views/index.vue')
  },
  {
    path: '/foo',
    name: 'foo',
    component: resolve => require(['./components/Foo.vue'], resolve)
  },
  {
    path: '/bar',
    name: 'bar',
    component: resolve => require(['./components/Bar.vue'], resolve)
  },
  {
    path: '*',
    name: '404',
    component: require('./views/404')
  }
];

export default routes;
