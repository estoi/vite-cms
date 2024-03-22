import { DashboardOutlined } from '@vicons/antd';
import Layout from '~/layout/index.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard/workbench',
    meta: {
      title: 'dashboard',
      icon: DashboardOutlined,
      sort: 1
    },
    children: [
      {
        path: 'workbench',
        name: 'workbench',
        meta: {
          title: 'workbench'
        },
        component: () => import('~/views/dashboard/Workbench.vue')
      }
    ]
  }
];

export default routes;
