<template>
  <div class="new-project">
    <!-- TODO - Validation and permission handling -->
    <tr-input
      v-model="defaultProject.name"
      placeholder="e.g. Trackify - Development"
      label="Project Name"
    />
    <tr-input
      v-model="defaultProject.description"
      placeholder="e.g. Short description about your project"
      label="Short Description"
    />
    <tr-input
      v-model="defaultProject.imgUrl"
      placeholder="e.g. https://art.pixilart.com/d04bd8b33083cb4.png"
      label="Project image"
      label-tooltip="Give us an available image address/url."
    />
    <div class="new-project__preview">
      <project-card
        :key="defaultProject._id"
        :is-preview="true"
        :project="defaultProject"
      />
    </div>
    <tr-input
      v-model="defaultProject.prefix"
      placeholder="e.g. TR => TR-1"
      label="Issues Prefix"
      label-tooltip="Used for tickets unique identification."
    />
    <!-- Project Preview -->
    <div class="new-project__actions">
      <tr-button
        theme="dark"
        class="new-project__actions-save"
        @click="modifyProject"
      >
        <material-icon :icon="updatableProject ? 'edit' : 'add'" />
        {{ updatableProject ? 'Update Project' : 'Create Project' }}
      </tr-button>
      <tr-button
        theme="outline"
        @click="$emit('closeModal')"
      >
        Cancel
      </tr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ProjectCard from '@/components/project/ProjectCard.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import TrInput from '@/components/utils/TrInput.vue'
import { Project } from '@/store/types'

@Component({
  components: {
    TrInput,
    TrButton,
    MaterialIcon,
    ProjectCard
  }
})
export default class NewProject extends Vue {
  @Prop({
    type: Object as () => Project,
    default: null
  })
  readonly updatableProject!: Project

  defaultProject: Partial<Project> = {
    _id: null,
    prefix: null,
    name: null,
    description: null,
    imgUrl: null,
    members: null
  }

  modifyProject ():void {
    if (this.updatableProject) this.updateProject()
    else this.createProject()
  }

  createProject (): void {
    const project = {
      ...this.defaultProject,
      createdAt: new Date().toISOString()
    }
    this.$store.dispatch('createProject', project)
    this.$emit('closeModal')
  }

  updateProject (): void {
    // this.$store.commit('updateProject', this.defaultProject)
    this.$store.dispatch('updateProject', this.defaultProject)
    this.$emit('closeModal')
  }

  mounted (): void {
    // TODO - Remove UUID and handle ID on server
    if (this.updatableProject) {
      this.defaultProject = { ...this.updatableProject }
    }
  }
}
</script>

<style lang="scss">
.new-project {
  padding: rem(20);

  .new-project__actions {
    display: flex;
    justify-content: flex-start;
    margin-top: rem(20);

    .new-project__actions-save {
      margin-right: rem(10);
    }
  }
}
</style>
