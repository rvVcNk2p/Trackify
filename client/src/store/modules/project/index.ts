import axios from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { Project, ProjectMember } from '@/store/types'

export type ProjectState = {
  projects: Array<Project>,
  possibleMembers: Array<ProjectMember>,
}

export default function createProjectModule<RootState> (namespaced: boolean): Module<ProjectState, RootState> {
  return {
    namespaced,
    state () {
      return {
        projects: [],
        possibleMembers: []
      }
    },
    getters: {
      getProjects: (state) => (userId: string) => {
        const owned = state.projects.filter(project => project.owner === userId)
        const memberOf = state.projects.filter(project => project.members?.some(member => member._id === userId && project.owner !== userId))
        return { owned, memberOf }
      },
      getPossibleMembers: (state) => (projectId: string) => {
        if (projectId) {
          return state.projects.filter(project => project._id === projectId)[0].members
        } else return state.possibleMembers
      },
      getProjectById: (state) => (projectId: string) => {
        return state.projects.filter(project => project._id === projectId)[0]
      },
      getProjectPrefix: (state) => (projectId: string) => {
        if (state.projects.length > 0) {
          return state.projects.filter(project => project._id === projectId)[0].prefix
        } else return null
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
      },
      setPossibleMembers (state, payload) {
        Vue.set(state, 'possibleMembers', payload)
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
      },
      async fetchPossibleMembers ({ commit }) {
        const res = await axios.get('/api/users/all')
        commit('setPossibleMembers', res.data)
      }
    }
  }
}
