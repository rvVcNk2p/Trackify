import Vue from 'vue'
import { Module } from 'vuex'

import { Snackbar } from '@/store/types'

export type SnackState = {
  snacks: Array<Snackbar> | null,
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<SnackState, RootState> {
  return {
    namespaced,
    state () {
      return {
        snacks: null
      }
    },
    getters: {
      getSnacks: (state: SnackState) => state.snacks
    },
    mutations: {
      addSnack (state, payload) {
        Vue.set(state, 'snacks', state.snacks ? [...state.snacks, payload] : [payload])
      },
      removeSnack (state, payload) {
        Vue.set(state, 'snacks', state.snacks?.filter(s => s.id !== payload))
      }
    },
    actions: {
      initSnack ({ commit }, payload) {
        const snack = { id: Math.random() + '', ...payload }
        commit('addSnack', snack)
        setTimeout(() => {
          commit('removeSnack', snack.id)
          // TODO - Maket timer configurable
        }, 3000)
      }
    }
  }
}
