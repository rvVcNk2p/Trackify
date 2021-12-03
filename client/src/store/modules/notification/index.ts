import Vue from 'vue'
import { Module } from 'vuex'

import { Notification } from '@/store/types'

export type NotificationState = {
  notifications: Array<Notification> | null,
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<NotificationState, RootState> {
  return {
    namespaced,
    state () {
      return {
        notifications: null
      }
    },
    getters: {
      getNotifications: (state: NotificationState) => state.notifications
    },
    mutations: {
      addNotification (state, payload) {
        Vue.set(state, 'notifications', state.notifications ? [...state.notifications, payload] : [payload])
      },
      removeNotification (state, payload) {
        Vue.set(state, 'notifications', state.notifications?.filter(s => s.id !== payload))
      }
    },
    actions: {
      createNotification ({ commit }, payload) {
        const notification = { id: Math.random() + '', ...payload }
        commit('addNotification', notification)
        setTimeout(() => {
          commit('removeNotification', notification.id)
          // TODO - Maket timer configurable
        }, 3000)
      }
    }
  }
}
