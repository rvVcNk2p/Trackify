import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import board from './modules/board'
import project from './modules/project'
import { FieldArray } from './types'

export type RootState = Record<string, unknown>
export type StoreInstance = Store<RootState>

Vue.use(Vuex)

export function createStore (): StoreInstance {
  return new Vuex.Store({
    state () {
      return {
        selectedBoard: null
      }
    },
    getters: {
      getPossiblePriorities: () => (): Array<FieldArray> => {
        // TODO - Get from selected project || projectBoardId: string
        return [
          { label: 'Show-stopper', value: 'show-stopper' },
          { label: 'Critical', value: 'critical' },
          { label: 'Major', value: 'major' },
          { label: 'Normal', value: null },
          { label: 'Trivial', value: 'trivial' },
          { label: 'Blocker', value: 'blocker' }
        ]
      },
      getPossibleTypes: () => (): Array<FieldArray> => {
        // TODO - Get from selected project || projectBoardId: string
        return [
          { label: 'Epic', value: 'epic' },
          { label: 'Story', value: 'story' },
          { label: 'User Story', value: 'user-story' },
          { label: 'Bug', value: 'bug' },
          { label: 'Task', value: 'task' },
          { label: 'Sub-Task', value: 'sub-task' },
          { label: 'Improvement', value: 'improvement' },
          { label: 'Spike', value: 'spike' }
        ]
      },
      getNavLinks: (state) => {
        const links = [
          {
            path: '/projects',
            label: 'Projects'
          }
        ]
        // TODO - Just Hidisable selected project
        if (state.selectedBoard) {
          links.splice(1, 0, {
            path: `/agiles/${state.selectedBoard}/current`,
            label: 'Agile Board'
          })
        }

        return links
      }
    },
    mutations: {
      setSelectedProject (state, payload) {
        Vue.set(state, 'selectedBoard', payload)
      }
    },
    actions: {},
    modules: {
      project: project<RootState>(true),
      board: board<RootState>(true)
    }
  })
}
