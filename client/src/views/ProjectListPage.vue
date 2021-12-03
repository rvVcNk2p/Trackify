<template>
  <div class="project-list-page">
    <div class="project-list-page__container">
      <div class="project-llit-wrapper">
        <h1 class="project-list-page__container-title">
          PROJECTS
        </h1>
        <tr-button @click="isModalOpen = true">
          <material-icon icon="add" />
          New Project
        </tr-button>
      </div>

      <div class="project-list-page__container-projects">
        <div class="project-list-page__section-title">
          <span class="project-list-page__container-counter">
            [{{ projectCounter(projects.owned) }}]
          </span>
          Owned Projects:
        </div>
        <project-card
          v-for="project in projects.owned"
          :key="project._id"
          :project="project"
          @click="initProjectBoard(project._id)"
          @setEditableProjectId="setEditableProjectId"
        />
        <div class="project-list-page__section-title">
          <span class="project-list-page__container-counter">
            [{{ projectCounter(projects.memberOf) }}]
          </span>
          Member of Projects:
        </div>
        <project-card
          v-for="project in projects.memberOf"
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
        @closeModal="isModalOpen = false"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

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
    const user = this.$store.getters['auth/getUser']
    if (user) {
      return this.$store.getters['project/getProjects'](user._id)
    } else return []
  }

  projectCounter (projects: Array<Project>): number {
    if (projects) {
      return projects.length
    } else return 0
  }

  @Watch('isModalOpen')
  resetEditableProjectId (): void {
    if (!this.isModalOpen) {
      this.editableProjectId = null
    }
  }

  setEditableProjectId (_id: string): void {
    this.editableProjectId = _id
    this.isModalOpen = true
  }

  get editableProject (): Project {
    return this.$store.getters['project/getProjectById'](this.editableProjectId)
  }

  initProjectBoard (projectId: number): void {
    this.$router.push({
      name: 'agileBoards',
      params: {
        boardId: projectId + '',
        selectedSprint: 'current'
      }
    })
  }

  mounted (): void {
    this.$store.dispatch('project/fetchProjects')
  }
}
</script>

<style lang="scss">
.project-list-page {
  width: 100%;
  max-width: $global__breakpoint--max-width;
  height: 100vh;
  margin: 0 auto;

  .project-list-page__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    .project-list-page__section-title {
      margin-top: rem(20);
      margin-bottom: rem(15);
      font-size: rem(20);
      font-weight: 600;
      text-align: left;
    }

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
