import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Hello",
    component: () => import("@/views/index.vue")
  },
  {
    path: "/admin",
    name: "AdminHome",
    component: () => import("@/views/home/admin.vue"),
    redirect: "/admin/companies/list",
    children: [
      {
        path: "/admin/companies",
        name: "Companies",
        redirect: "/admin/companies/list",
        component: () => import("@/views/companies/list.vue"),
        mate: {
          title: "租户中心"
        }
      },
      {
        path: "/admin/companies/list",
        name: "CompaniesList",
        component: () => import("@/views/companies/list.vue"),
        mate: {
          title: "租户中心"
        }
      },
      {
        path: "/admin/companies/staffs",
        name: "CompaniesStaffs",
        component: () => import("@/views/companies/staffs.vue"),
        mate: {
          title: "租户员工"
        }
      },
      {
        path: "/admin/companies/detail",
        name: "CompaniesDetail",
        component: () => import("@/views/companies/detail.vue"),
        mate: {
          title: "租户详情"
        }
      },
      {
        path: "/admin/companies/1-1",
        name: "Companies1-1",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      },
      {
        path: "/admin/companies/1-2",
        name: "Companies1-2",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      },
      {
        path: "/admin/companies/1-3",
        name: "Companies1-3",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      },
      {
        path: "/admin/companies/2",
        name: "Companies2",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      },
      {
        path: "/admin/companies/3",
        name: "Companies3",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      }
    ]
  },
  {
    path: "/user",
    name: "UserHome",
    component: () => import("@/views/home/user.vue"),
    redirect: "/user/staffList",
    children: [
      {
        path: "/user/staffList",
        name: "Companies",
        component: () => import("@/views/users/staffList.vue"),
        mate: {
          title: "租户中心"
        }
      },
      {
        path: "/user/1",
        name: "User1",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      },
      {
        path: "/user/2",
        name: "User2",
        component: () => import("@/views/needToBuild.vue"),
        mate: {
          title: "未实现"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/admins/login.vue"),
    mate: {
      title: "用户登陆"
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
