import Vue from 'vue'
import { Module } from 'vuex'

import { Loading } from '@/store/types'

export default function createProjectModule<RootState> (namespaced: boolean): Module<Loading, RootState> {
  return {
    namespaced,
    state () {
      return {
        isLoading: false
      }
    },
    getters: {
      getLoadingState: (state: Loading) => state.isLoading
    },
    mutations: {
      setLoadingState (state, payload) {
        Vue.set(state, 'isLoading', payload)
      }
    }
  }
}
