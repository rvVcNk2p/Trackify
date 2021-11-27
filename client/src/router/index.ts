import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "projects" */ '../views/LoginPage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "projects" */ '../views/RegisterPage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectListPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agiles/:boardId/:selectedSprint',
    name: 'AgileBoards',
    component: () => import(/* webpackChunkName: "agile-board" */ '../views/AgileBoardPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: { name: 'ProjectList' }
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error-page" */ '../views/ErrorPage.vue'),
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// TODO - Fetch user
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      // TODO - redirect after successful login
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ path: '/projects' })
    }
  } else {
    next()
  }
})

export default router
