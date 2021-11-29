import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { ProjectMember } from '@/store/types'
import setAuthToken from '@/utils/auth'

export type BoardState = {
  token: string | null,
  user: ProjectMember | null,
  selectedBoard: string | null
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<BoardState, RootState> {
  return {
    namespaced,
    state () {
      return {
        token: null,
        user: null,
        selectedBoard: null
      }
    },
    getters: {
      getNavLinks: (state) => {
        const authLinks = {
          main: [{
            name: 'projectList',
            label: 'Projects',
            icon: 'space_dashboard'
          }],
          auth: [{
            name: 'login',
            label: 'Log Out',
            icon: 'logout'
          }]
        }
        const guestLinks = {
          main: [{
            name: 'home',
            label: 'Welcome',
            icon: ''
          }],
          auth: [{
            name: 'register',
            label: 'Create a free account',
            icon: 'person_add_alt'
          },
          {
            name: 'login',
            label: 'Log In',
            icon: 'login'
          }]
        }
        // TODO - Hide disable selected project
        if (state.selectedBoard) {
          authLinks.main.push({
            name: 'agileBoards',
            label: 'Agile Board',
            icon: 'developer_board',
            params: { boardId: state.selectedBoard }
          } as any)
        }
        if (state.user) {
          return authLinks
        } else return guestLinks
      }
    },
    mutations: {
      setToken (state, payload) {
        if (payload) {
          const { token, user } = payload
          localStorage.setItem('token', token)
          Vue.set(state, 'token', token)
          Vue.set(state, 'user', user)
        } else {
          localStorage.removeItem('token')
          Vue.set(state, 'token', null)
          Vue.set(state, 'user', null)
        }
        payload ? setAuthToken(payload.token) : setAuthToken(null)
      },
      setSelectedProject (state, payload) {
        Vue.set(state, 'selectedBoard', payload)
      }
    },
    actions: {
      async login ({ commit }, payload) {
        const res = await axios.post('api/auth', payload)
        res.status === 200 && commit('setToken', { token: res.data.token, user: res.data.user })
        return res
      },
      async loadUser ({ commit }) {
        try {
          const res = await axios.get('api/auth')
          res.status === 200 && commit('setToken', { token: localStorage.token, user: res.data })
        } catch (err) {
          commit('setToken', null)
        }
      }
    }
  }
}
