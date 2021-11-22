import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { Project } from '@/store/types'

export type ProjectState = {
  projects: Array<Project>,
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<ProjectState, RootState> {
  return {
    namespaced,
    state () {
      return {
        projects: [
          // {
          //   _id: '1234',
          //   imgUrl: 'https://art.pixilart.com/d04bd8b33083cb4.png',
          //   name: 'Trackify - Development',
          //   prefix: 'TRF-D',
          //   description: 'An Issue tracking app like YouTrack or Jira',
          //   members: [
          //     {
          //       _id: '1',
          //       name: 'John Doe',
          //       avatar: 'https://randomuser.me/api/portraits/thumb/men/74.jpg'
          //     },
          //     {
          //       _id: '2',
          //       name: 'Bob Doe',
          //       avatar: 'https://randomuser.me/api/portraits/thumb/men/29.jpg'
          //     },
          //     {
          //       _id: '3',
          //       name: 'Bill Doe',
          //       avatar: 'https://randomuser.me/api/portraits/thumb/men/39.jpg'
          //     },
          //     {
          //       _id: '4',
          //       name: 'Jane Doe',
          //       avatar: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'
          //     }
          //   ]
          // }
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
      }
    },
    mutations: {
      setProjects (state, payload) {
        Vue.set(state, 'projects', payload)
      },
      createProject (state, payload) {
        Vue.set(state, 'projects', [...state.projects, payload])
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
        const projects = state.projects.filter(project => project._id !== payload)
        Vue.set(state, 'projects', projects)
      }
    },
    actions: {
      async fetchProjects ({ commit }) {
        const res = await axios.get('/api/project')
        commit('setProjects', res.data.projects)
      },
      async createProject ({ commit }, payload) {
        const resProject = await axios.post('/api/project', payload)
        const { newProject } = resProject.data
        // Create board along with project
        await axios.post('/api/board', { projectId: newProject._id })
        // TODO - check property newProject
        commit('createProject', newProject)
      },
      async updateProject ({ commit }, payload) {
        const res = await axios.put('/api/project', payload)
        const { updatedProject } = res.data
        commit('updateProject', updatedProject)
      },
      async deleteProject ({ commit }, projectId) {
        await axios.delete(`/api/project/${projectId}`)
        // Delete board along with project
        await axios.delete(`/api/board/${projectId}`)
        // TODO - check property isDeleted
        commit('deleteProject', projectId)
      }
    }
  }
}
