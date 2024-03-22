import { ArticleOutlined } from '@vicons/material';
import Layout from '~/layout/index.vue';

const routes = [
  {
    path: '/article',
    name: 'article',
    component: Layout,
    redirect: '/article/list',
    meta: {
      title: 'article',
      icon: ArticleOutlined,
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: 'list'
        },
        component: () => import('~/views/article/List.vue')
      }
    ]
  }
];

export default routes;
