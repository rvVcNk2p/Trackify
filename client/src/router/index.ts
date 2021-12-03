import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/welcome',
    name: 'home',
    component: () => import(/* webpackChunkName: "projects" */ '../views/HomePage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "projects" */ '../views/LoginPage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import(/* webpackChunkName: "projects" */ '../views/RegistrationPage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/projects',
    name: 'projectList',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectListPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agiles/:boardId/current',
    name: 'agileBoards',
    component: () => import(/* webpackChunkName: "agile-board" */ '../views/AgileBoardPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: { name: 'projectList' }
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
