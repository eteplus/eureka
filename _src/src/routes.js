/* eslint-disable global-require, import/no-dynamic-require */
const routes = [
  {
    path: '/',
    name: 'home',
    component: require('./views/home.vue')
  },
  {
    path: '/article/:year/:month/:title',
    name: 'article',
    component: resolve => require(['./views/article.vue'], resolve)
  },
  {
    path: '/archives',
    name: 'archives',
    component: resolve => require(['./views/archives.vue'], resolve)
  },
  {
    path: '/tags',
    name: 'tags',
    component: resolve => require(['./views/tags.vue'], resolve)
  },
  {
    path: '/tags/:tag',
    name: 'tag',
    component: resolve => require(['./views/tag.vue'], resolve)
  },
  {
    path: '*',
    name: '404',
    component: require('./views/404')
  }
];

export default routes;

