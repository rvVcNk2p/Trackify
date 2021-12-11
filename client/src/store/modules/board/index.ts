import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { FieldArray, ProjectBoard } from '@/store/types'

export type BoardState = {
  projectBoard: ProjectBoard | null
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<BoardState, RootState> {
  return {
    namespaced,
    state () {
      return {
        projectBoard: null
      }
    },
    getters: {
      getProjectBoard: (state): ProjectBoard | null => {
        if (state.projectBoard) {
          return state.projectBoard
        } else return null
      },
      getPossibleStates: (state): Array<FieldArray> | null => {
        if (state.projectBoard) {
          return state.projectBoard.availableColumns.map(state => {
            return {
              value: state.state,
              label: state.name
            }
          })
        } else return null
      }
    },
    mutations: {
      setProjectBoard (state, payload) {
        Vue.set(state, 'projectBoard', payload)
      },
      updateTicket (state, payload) {
        const updatedIssues = state.projectBoard?.issues?.map(issue => {
          if (issue._id === payload._id) {
            return { ...issue, ...payload }
          } else return issue
        })
        state.projectBoard && Vue.set(state.projectBoard, 'issues', updatedIssues)
      },
      createTicket (state, payload) {
        state.projectBoard && Vue.set(state.projectBoard, 'issues', [...state.projectBoard.issues, payload])
      },
      updateColumns (state, availableColumns) {
        state.projectBoard && Vue.set(state.projectBoard, 'availableColumns', availableColumns)
      }
    },
    actions: {
      async fetchProjectBoard ({ commit }, projectId) {
        const res = await axios.get(`/api/board/${projectId}`)
        commit('setProjectBoard', res.data.board)
      },
      async updateProjectBoard ({ commit }, payload) {
        const { projectId, selectedSprint } = payload
        const res = await axios.put(`/api/board/${projectId}`, { selectedSprint })
        commit('setProjectBoard', res.data.board)
      },
      async createBoardColumn ({ commit, state }, payload) {
        const order = state.projectBoard?.availableColumns?.length
        const res = await axios.post('/api/board/column', { ...payload, order: order ? order + 1 : 1 })
        // TODO - Check if res.data.success
        commit('updateColumns', res.data.availableColumns)
      },
      async updateBoardColumn ({ commit }, payload) {
        const res = await axios.put('/api/board/column', payload)
        // TODO - Check if res.data.success
        commit('updateColumns', res.data.availableColumns)
      },
      async createTicket ({ commit, state }, payload) {
        let largestId = state.projectBoard?.issues?.reduce((acc, curr) => {
          if (acc < curr.order && payload.state === curr.state) {
            return curr.order
          } else return acc
        }, 0)
        largestId = largestId ? largestId + 1 : 1
        const assignee = payload.assignee ? payload.assignee._id : null

        const res = await axios.post('/api/ticket', { newTicket: { ...payload, order: largestId, boardId: state.projectBoard?._id, assignee } })
        await axios.post('/api/board/issue', { newTicket: res.data.newTicket })
        commit('createTicket', res.data.newTicket)
      },
      async updateTicket ({ commit, rootGetters }, payload) {
        const updatedBy = rootGetters['auth/getUser']._id
        const res = await axios.put('/api/ticket', { ticket: { ...payload, updatedBy } })
        // TODO - Check if res.data.success
        commit('updateTicket', res.data.updatedTicket)
      },
      async moveTicket ({ commit, state, rootGetters }, payload) {
        const updatedBy = rootGetters['auth/getUser']._id
        const lastItemOrder = state.projectBoard?.issues?.reduce((acc, curr) => {
          if (acc < curr.order && curr.state === payload.newState) acc = curr.order
          return acc
        }, 0)
        const ticket = {
          _id: payload._id,
          state: payload.newState,
          order: lastItemOrder ? lastItemOrder + 1 : 1,
          updatedBy
        }
        const res = await axios.put('/api/ticket', { ticket })
        // TODO - Check if res.data.success
        commit('updateTicket', res.data.updatedTicket)
      }
    }
  }
}
