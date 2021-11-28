import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { ProjectMember } from '@/store/types'
import setAuthToken from '@/utils/auth'

export type BoardState = {
  token: string | null,
  user: ProjectMember | null
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<BoardState, RootState> {
  return {
    namespaced,
    state () {
      return {
        token: null,
        user: null
      }
    },
    getters: {

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
      },
      async logout ({ commit }) {
        commit('setToken', null)
      }
    }
  }
}
