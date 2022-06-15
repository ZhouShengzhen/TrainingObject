import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/admin',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/admin/companies/list',
    children: [
      {
        path: '/admin/companies',
        name: 'Companies',
        redirect: '/admin/companies/list',
        component: () => import('@/views/companies/list.vue'),
        mate: {
          title: '租户中心'
        }
      },
      {
        path: '/admin/companies/list',
        name: 'CompaniesList',
        component: () => import('@/views/companies/list.vue'),
        mate: {
          title: '租户中心'
        }
      },
      {
        path: '/admin/companies/staffs',
        name: 'CompaniesStaffs',
        component: () => import('@/views/companies/staffs.vue'),
        mate: {
          title: '添加租户'
        }
      },
      {
        path: '/admin/companies/detail',
        name: 'CompaniesDetail',
        component: () => import('@/views/companies/detail.vue'),
        mate: {
          title: '添加租户'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/admins/login.vue'),
    mate: {
      title: '用户登陆'
    }
  },

  {
    path: '/admin/companies/detail',
    name: 'CompaniesDetail',
    component: () => import('@/views/companies/detail.vue'),
    mate: {
      title: '添加租户'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
