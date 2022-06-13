import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: () => import('@/views/Hello.vue')
  },
  {
    path: '/admin',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    //redirect: '/admin/companies/list',
    children: [
      {
        path: '/admin/companies/list',
        name: 'CompaniesList',
        component: () => import('@/views/companies/index.vue'),
        mate: {
          title: '租户中心'
        }
      },
      {
        path: '/admin/companies/add',
        name: 'CompaniesAdd',
        component: () => import('@/views/companies/add.vue'),
        mate: {
          title: '添加租户'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
