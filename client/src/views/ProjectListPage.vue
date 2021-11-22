<template>
  <div class="project-list-page">
    <div class="project-list-page__container">
      <div class="project-llit-wrapper">
        <h1 class="project-list-page__container-title">
          PROJECTS
          <span class="project-list-page__container-counter">
            {{ projects.length > 0 ? projects.length : 0 }}
          </span>
        </h1>
        <tr-button @click="isModalOpen = true">
          <material-icon icon="add" />
          New Project
        </tr-button>
      </div>

      <div class="project-list-page__container-projects">
        <project-card
          v-for="project in projects"
          :key="project._id"
          :project="project"
          @click="initProjectBoard(project._id)"
          @setEditableProjectId="setEditableProjectId"
        />
      </div>
    </div>
    <modal
      v-if="isModalOpen"
      v-model="isModalOpen"
    >
      <new-project
        :updatable-project="editableProjectId ? editableProject : null"
        @closeModal="setModal(false)"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Modal from '@/components/modal/Modal.vue'
import NewProject from '@/components/project/new/NewProject.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import { Project } from '@/store/types'

@Component({
  components: {
    MaterialIcon,
    ProjectCard,
    NewProject,
    Modal,
    TrButton
  }
})
export default class ProjectList extends Vue {
  isModalOpen = false
  editableProjectId: string | null = null

  get projects (): Array<Partial<Project>> | null {
    return this.$store.getters['project/getProjects']
  }

  setModal (val: boolean): void {
    this.isModalOpen = val
    if (!val) this.setEditableProjectId(null)
  }

  setEditableProjectId (_id: string | null): void {
    this.editableProjectId = _id
    if (this.editableProjectId) this.setModal(true)
  }

  get editableProject (): Project {
    return this.$store.getters['project/getProjectById'](this.editableProjectId)
  }

  initProjectBoard (projectId: number): void {
    this.$store.commit('setSelectedProject', projectId)
    this.$router.push({
      name: 'AgileBoards',
      params: {
        boardId: projectId + '',
        selectedSprint: 'current'
      }
    })
  }

  mounted (): void {
    this.$store.dispatch('project/getProjects')
  }
}
</script>

<style lang="scss">
.project-list-page {
  width: 100%;
  max-width: $global__breakpoint--max-width;
  height: 100vw;
  margin: 0 auto;

  .project-list-page__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    .project-llit-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .project-list-page__container-title {
        margin-bottom: rem(10);
        font-size: rem(18);
        font-weight: bold;

        .project-list-page__container-counter {
          margin-left: rem(5);
          font-weight: normal;
        }
      }
    }

    .project-list-page__container-projects {
      width: 100%;
    }
  }
}
</style>
