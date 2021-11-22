import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { FieldArray, Project, ProjectBoard } from '@/store/types'

export type ProjectState = {
  projects: Array<Project>,
  projectBoards: Array<ProjectBoard>,
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<ProjectState, RootState> {
  return {
    namespaced,
    state () {
      return {
        projects: [
          {
            _id: '1234',
            imgUrl: 'https://art.pixilart.com/d04bd8b33083cb4.png',
            name: 'Trackify - Development',
            prefix: 'TRF-D',
            description: 'An Issue tracking app like YouTrack or Jira',
            members: [
              {
                _id: '1',
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/thumb/men/74.jpg'
              },
              {
                _id: '2',
                name: 'Bob Doe',
                avatar: 'https://randomuser.me/api/portraits/thumb/men/29.jpg'
              },
              {
                _id: '3',
                name: 'Bill Doe',
                avatar: 'https://randomuser.me/api/portraits/thumb/men/39.jpg'
              },
              {
                _id: '4',
                name: 'Jane Doe',
                avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
              }
            ]
          }
        ],
        projectBoards: [
          {
            _id: '1234',
            projectId: '1234',
            backlog: null,
            availableColumns: [
              {
                _id: '1',
                name: 'Backlog',
                state: 'backlog',
                order: 1
              },
              {
                _id: '2',
                name: 'Open',
                state: 'open',
                order: 2
              },
              {
                _id: '3',
                name: 'In progress, Reopened',
                state: 'in-progress',
                order: 3
              },
              {
                _id: '4',
                name: 'Review',
                state: 'review',
                order: 4
              },
              {
                _id: '5',
                name: 'In test',
                state: 'in-test',
                order: 5
              },
              {
                _id: '6',
                name: 'Demo, Done, Duplicate',
                state: 'demo',
                order: 6
              }],
            issues: [
              {
                _id: '1',
                title: 'Some cool task',
                description: 'Vuex modularizatios',
                category: 'Dev',
                priority: null,
                type: null,
                state: 'open',
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: null,
                updatedBy: null,
                estimation: '1d',
                spentTime: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null,
                order: 0
              },
              {
                _id: '6',
                order: 1,
                title: 'Vuex 2',
                description: 'Vuex modularizatios',
                state: 'open',
                category: 'Dev',
                estimation: '1d',
                spentTime: null,
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: null,
                updatedBy: null,
                priority: null,
                type: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null
              },
              {
                _id: '2',
                order: 0,
                title: 'Router',
                description: '<p>Lorem ispum dolre sum ifan menta.</p><ul data-checked="false"><li>Task 1</li><li>Task 2</li><li>Task 3</li></ul><p><br></p><p>@Someone, pls update this version.</p>',
                state: 'in-progress',
                category: 'Dev',
                estimation: '4h',
                spentTime: null,
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: {
                  assignee: {
                    _id: '1',
                    name: 'Joe Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/man/82.jpg'
                  },
                  at: new Date()
                },
                updatedBy: null,
                priority: null,
                type: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null
              },
              {
                _id: '3',
                order: 0,
                title: 'Project Init',
                description: 'Project Initialization',
                state: 'review',
                category: 'Dev',
                estimation: '2h',
                spentTime: null,
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: null,
                updatedBy: null,
                priority: null,
                type: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null
              },
              {
                _id: '4',
                order: 0,
                title: 'Project name',
                description: 'Project Name Selection',
                state: 'in-test',
                category: 'Dev',
                estimation: '1h',
                spentTime: null,
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: null,
                updatedBy: null,
                priority: null,
                type: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null
              },
              {
                _id: '5',
                order: 0,
                title: 'Idea Validation',
                description: 'Trackify Idea Validation',
                state: 'demo',
                category: 'Dev',
                estimation: '2d',
                spentTime: '2d 4h',
                created: {
                  assignee: {
                    _id: '1',
                    name: 'Jane Doe',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
                  },
                  at: new Date()
                },
                updated: null,
                updatedBy: null,
                priority: null,
                type: null,
                sprints: null,
                dueDate: null,
                originalEstimation: null
              }
            ]
          }
        ]
      }
    },
    getters: {
      getProjects (state) {
        return state.projects
      },
      getProjectById: (state) => (projectId: string) => {
        return state.projects.filter(project => project._id === projectId)[0]
      },
      getProjectPrefix: (state) => (projectId: string) => {
        return state.projects.filter(project => project._id === projectId)[0].prefix
      },
      getProjectBoard: (state) => (projectBoardId: string) => {
        const projectBoard = state.projectBoards.filter(board => board.projectId === projectBoardId)
        if (projectBoard.length > 0) {
          return projectBoard[0]
        } else return null
      },
      getPossibleStates: (state) => (projectBoardId: string): Array<FieldArray> => {
        const possibleStates = state.projectBoards.filter(board => board._id === projectBoardId)[0].availableColumns
        return possibleStates.map(state => {
          return {
            value: state.state,
            label: state.name
          }
        })
      }
    },
    mutations: {
      moveTicket (state, payload) {
        const { issueId, newState, boardId } = payload
        const updatedBoards = state.projectBoards.map(board => {
          if (board._id === boardId) {
            const lastItemOrder = board.issues?.reduce((acc, curr) => {
              if (acc < curr.order && curr.state === newState) {
                acc = curr.order
              }
              return acc
            }, 0)

            const updatedIssues = board.issues?.map(issue => {
              if (issue._id === issueId) {
                if (issue.state !== newState) {
                  issue.state = newState
                  if (lastItemOrder !== undefined) {
                    issue.order = lastItemOrder + 1
                  }
                }
              }
              return issue
            })

            return { ...board, issues: updatedIssues }
          } else return board
        })
        Vue.set(state, 'projectBoards', updatedBoards)
      },
      updateTicket (state, payload) {
        const updatedBoards = state.projectBoards.map(board => {
          const issues = board.issues?.map(issue => {
            if (issue._id === payload._id) {
              return { ...issue, ...payload }
            } else return issue
          })
          return { ...board, issues }
        })
        Vue.set(state, 'projectBoards', updatedBoards)
      },
      updateDescription (state, payload) {
        const { issueId, description, title } = payload
        const updatedBoards = state.projectBoards.map(board => {
          const issues = board.issues?.map(issue => {
            if (issue._id === issueId) {
              return { ...issue, description, title }
            } else return issue
          })
          return { ...board, issues }
        })
        Vue.set(state, 'projectBoards', updatedBoards)
      },
      createTicket (state, payload) {
      // TODO - Total rework
        const selectedBorad = state.projectBoards.filter(board => {
          return payload.boardId === board._id
        })[0]

        let largestId = selectedBorad.issues?.reduce((acc, curr) => {
          if (acc < +curr._id) {
            return +curr._id
          } else return acc
        }, 0)

        largestId = largestId ? largestId + 1 : 1

        const updatedBorads = state.projectBoards.map(board => {
          if (board._id === payload.boardId) {
            if (board.issues === null) {
              board.issues = [{ ...payload.ticket, _id: largestId }]
            } else {
              board.issues?.push({ ...payload.ticket, _id: largestId })
            }
            return board
          } else return board
        })

        Vue.set(state, 'projectBoards', updatedBorads)
      },
      createProject (state, payload) {
      // TODO - Create a total new page for backlog items
        Vue.set(state, 'projects', [...state.projects, payload.newProject])
        Vue.set(state, 'projectBoards', [...state.projectBoards, payload.newBoard])
      },
      updateProject (state, payload) {
        const updatedProjects = state.projects.map(project => {
          if (project._id === payload._id) {
            return { ...project, ...payload }
          }
          return project
        })
        Vue.set(state, 'projects', updatedProjects)
      },
      deleteProject (state, payload) {
        const projectBoards = state.projectBoards.filter(board => board.projectId !== payload)
        const projects = state.projects.filter(project => project._id !== payload)
        Vue.set(state, 'projects', projects)
        Vue.set(state, 'projectBoards', projectBoards)
      },
      createColumn (state, payload) {
        const { column, projectId } = payload

        const updatedProjectBoards = state.projectBoards.map(board => {
          if (board._id === projectId) {
            board.availableColumns.push({ ...column, order: board.availableColumns.length + 1 })
            return board
          } else return board
        })

        Vue.set(state, 'projectBoards', updatedProjectBoards)
      },
      updateColumn (state, payload) {
      // TODO - Update column
        console.log('updateColumn: ', payload)
      }
    },
    actions: {
      async getProjects ({ commit }) {
        const res = await axios.get('/api/project')
        // TODO - Set given projects
        console.log('res: ', res.data.projects)
      },
      async createProject ({ commit }, payload) {
        const resProject = await axios.post('/api/project', payload)
        const projectId = resProject.data.newProject._id
        const resBoard = await axios.post('/api/board', { projectId })
        commit('createProject',
          { newProject: resProject.data.newProject, newBoard: resBoard.data.newBoard }
        )
      },
      async updateProject ({ commit }, payload) {
        const res = await axios.put('/api/project', payload)
        const { updatedProject } = res.data
        commit('updateProject', updatedProject)
      },
      async deleteProject ({ commit }, projectId) {
        await axios.delete(`/api/project/${projectId}`)
        await axios.delete(`/api/board/${projectId}`)
        // TODO - check property isDeleted
        commit('deleteProject', projectId)
      }
    }
  }
}
