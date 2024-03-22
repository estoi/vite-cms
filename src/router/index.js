import { createRouter, createWebHashHistory } from 'vue-router';

const modules = import.meta.glob('./modules/**/*.js', { eager: true });
let routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || [];
  const moduleList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...moduleList);
});

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    hidden: true,
    meta: {
      title: 'home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      title: 'login'
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ '~/views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeModuleList, ...routes]
});

export default router;
