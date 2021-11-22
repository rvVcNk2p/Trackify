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
        // {
        // _id: '1234',
        // projectId: '1234',
        // backlog: [],
        // availableColumns: [
        //   {
        //     name: 'Backlog',
        //     state: 'backlog',
        //     order: 1
        //   },
        //   {
        //     name: 'Open',
        //     state: 'open',
        //     order: 2
        //   },
        //   {
        //     name: 'In progress, Reopened',
        //     state: 'in-progress',
        //     order: 3
        //   },
        //   {
        //     name: 'Review',
        //     state: 'review',
        //     order: 4
        //   },
        //   {
        //     name: 'In test',
        //     state: 'in-test',
        //     order: 5
        //   },
        //   {
        //     name: 'Demo',
        //     state: 'demo',
        //     order: 6
        //   }],
        // issues: [
        //   {
        //     _id: '1',
        //     title: 'Some cool task',
        //     description: 'Vuex modularizatios',
        //     category: 'Dev',
        //     priority: null,
        //     type: null,
        //     state: 'open',
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: null,
        //     updatedBy: null,
        //     estimation: '1d',
        //     spentTime: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null,
        //     order: 0
        //   },
        //   {
        //     _id: '6',
        //     order: 1,
        //     title: 'Vuex 2',
        //     description: 'Vuex modularizatios',
        //     state: 'open',
        //     category: 'Dev',
        //     estimation: '1d',
        //     spentTime: null,
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: null,
        //     updatedBy: null,
        //     priority: null,
        //     type: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null
        //   },
        //   {
        //     _id: '2',
        //     order: 0,
        //     title: 'Router',
        //     description: '<p>Lorem ispum dolre sum ifan menta.</p><ul data-checked="false"><li>Task 1</li><li>Task 2</li><li>Task 3</li></ul><p><br></p><p>@Someone, pls update this version.</p>',
        //     state: 'in-progress',
        //     category: 'Dev',
        //     estimation: '4h',
        //     spentTime: null,
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Joe Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/man/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updatedBy: null,
        //     priority: null,
        //     type: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null
        //   },
        //   {
        //     _id: '3',
        //     order: 0,
        //     title: 'Project Init',
        //     description: 'Project Initialization',
        //     state: 'review',
        //     category: 'Dev',
        //     estimation: '2h',
        //     spentTime: null,
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: null,
        //     updatedBy: null,
        //     priority: null,
        //     type: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null
        //   },
        //   {
        //     _id: '4',
        //     order: 0,
        //     title: 'Project name',
        //     description: 'Project Name Selection',
        //     state: 'in-test',
        //     category: 'Dev',
        //     estimation: '1h',
        //     spentTime: null,
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: null,
        //     updatedBy: null,
        //     priority: null,
        //     type: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null
        //   },
        //   {
        //     _id: '5',
        //     order: 0,
        //     title: 'Idea Validation',
        //     description: 'Trackify Idea Validation',
        //     state: 'demo',
        //     category: 'Dev',
        //     estimation: '2d',
        //     spentTime: '2d 4h',
        //     created: {
        //       assignee: {
        //         _id: '1',
        //         name: 'Jane Doe',
        //         avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
        //       },
        //       at: new Date()
        //     },
        //     updated: null,
        //     updatedBy: null,
        //     priority: null,
        //     type: null,
        //     sprints: null,
        //     dueDate: null,
        //     originalEstimation: null
        //   }
        // ]
        // }
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
        // const updatedBoards = state.projectBoards.map(board => {
        //   const issues = board.issues?.map(issue => {
        //     if (issue._id === payload._id) {
        //       return { ...issue, ...payload }
        //     } else return issue
        //   })
        //   return { ...board, issues }
        // })
        // Vue.set(state, 'projectBoards', updatedBoards)
      },
      updateDescription (state, payload) {
        // const { issueId, description, title } = payload
        // const updatedBoards = state.projectBoards.map(board => {
        //   const issues = board.issues?.map(issue => {
        //     if (issue._id === issueId) {
        //       return { ...issue, description, title }
        //     } else return issue
        //   })
        //   return { ...board, issues }
        // })
        // Vue.set(state, 'projectBoards', updatedBoards)
      },
      createTicket (state, payload) {
      // TODO - Total rework
        // const selectedBorad = state.projectBoards.filter(board => {
        //   return payload.boardId === board.projectId
        // })[0]

        // let largestId = selectedBorad.issues?.reduce((acc, curr) => {
        //   if (acc < +curr._id) {
        //     return +curr._id
        //   } else return acc
        // }, 0)

        // largestId = largestId ? largestId + 1 : 1

        // const updatedBorads = state.projectBoards.map(board => {
        //   if (board.projectId === payload.boardId) {
        //     if (board.issues === null) {
        //       board.issues = [{ ...payload.ticket, _id: largestId + '' }]
        //     } else {
        //       board.issues?.push({ ...payload.ticket, _id: largestId + '' })
        //     }
        //     return board
        //   } else return board
        // })

        // Vue.set(state, 'projectBoards', updatedBorads)
      },
      updateColumn (state, availableColumns) {
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
        commit('updateColumn', { ...res.data.availableColumns })
      },
      async updateBoardColumn ({ commit }, payload) {
        const res = await axios.put('/api/board/column', payload)
        // TODO - Check if res.data.success
        commit('updateColumn', { ...res.data.availableColumns })
      }
    }
  }
}
