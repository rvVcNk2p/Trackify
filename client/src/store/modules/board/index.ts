import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { FieldArray, ProjectBoard } from '@/store/types'

export type BoardState = {
  projectBoard: ProjectBoard | null,
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
        if (state.projectBoard) return state.projectBoard
        else return null
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
      moveTicket (state, payload) {
        // const { issueId, newState, boardId } = payload
        // const updatedBoards = state.projectBoards.map(board => {
        //   if (board.projectId === boardId) {
        //     const lastItemOrder = board.issues?.reduce((acc, curr) => {
        //       if (acc < curr.order && curr.state === newState) {
        //         acc = curr.order
        //       }
        //       return acc
        //     }, 0)

        //     const updatedIssues = board.issues?.map(issue => {
        //       if (issue._id === issueId) {
        //         if (issue.state !== newState) {
        //           issue.state = newState
        //           if (lastItemOrder !== undefined) {
        //             issue.order = lastItemOrder + 1
        //           }
        //         }
        //       }
        //       return issue
        //     })

        //     return { ...board, issues: updatedIssues }
        //   } else return board
        // })
        // Vue.set(state, 'projectBoards', updatedBoards)
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
        Vue.set(state, 'projectBoard', { ...state.projectBoard, availableColumns })
      }
    },
    actions: {
      async fetchProjectBoard ({ commit }, projectId) {
        const res = await axios.get(`/api/board/${projectId}`)
        commit('setProjectBoard', res.data.board)
      },
      async createBoardColumn ({ commit }, payload) {
        const res = await axios.post('/api/board/column', payload)
        // TODO - Check if res.data.success
        commit('updateColumns', { ...res.data.availableColumns })
      },
      async updateBoardColumn ({ commit }, payload) {
        const res = await axios.put('/api/board/column', payload)
        // TODO - Check if res.data.success
        commit('updateColumns', { ...res.data.availableColumns })
      },
      async createTicket ({ commit, state }, payload) {
        let largestId = state.projectBoard?.issues?.reduce((acc, curr) => {
          if (acc < curr.order && payload.state === curr.state) {
            return curr.order
          } else return acc
        }, 0)
        largestId = largestId ? largestId + 1 : 1

        const res = await axios.post('/api/ticket', { newTicket: { ...payload, order: largestId, boardId: state.projectBoard?._id } })
        await axios.post('/api/board/issue', { newTicket: res.data.newTicket })
        // TODO - Check if res.data.success
        commit('createTicket', res.data.newTicket)
      },
      async updateTicket ({ commit }, payload) {
        const res = await axios.put('/api/ticket', { ticket: payload })
        // TODO - Check if res.data.success
        commit('updateTicket', res.data.updatedTicket)
      }
    }
  }
}
