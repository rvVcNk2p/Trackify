import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/projects',
    name: 'ProjectList',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectListPage.vue')
  },
  {
    path: '/agiles/:boardId/:selectedSprint',
    name: 'AgileBoards',
    component: () => import(/* webpackChunkName: "agile-board" */ '../views/AgileBoardPage.vue')
  },
  {
    path: '/',
    redirect: { name: 'ProjectList' }
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error-page" */ '../views/ErrorPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
