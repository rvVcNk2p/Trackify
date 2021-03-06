<template>
  <div class="new-project">
    <!-- TODO - Validation and permission handling -->
    <tr-input
      v-model="defaultProject.name"
      placeholder="e.g. Trackify - Development"
      label="Project Name"
      :disabled="isDisabled"
    />
    <tr-input
      v-model="defaultProject.description"
      placeholder="e.g. Short description about your project"
      label="Short Description"
      :disabled="isDisabled"
    />
    <tr-input
      v-model="defaultProject.imgUrl"
      placeholder="e.g. https://art.pixilart.com/d04bd8b33083cb4.png"
      label="Project image"
      label-tooltip="Give us an available image address/url."
      :disabled="isDisabled"
    />
    <members-input
      :is-editable="defaultProject.owner === authUserId || defaultProject.owner === null"
      :members="defaultProject.members"
      :possible-options="possibleMembers"
      :is-integrated-input="false"
      @update="defaultProject.members = $event"
    />
    <selected-members-list
      :members="defaultProject.members"
      @remove="removeMember"
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
      :disabled="isDisabled"
    />
    <sprint-input
      v-if="defaultProject._id && (defaultProject.owner === authUserId || defaultProject.owner === null)"
      v-model="defaultProject.availableSprints"
    />
    <div
      v-if="!isDisabled"
      class="new-project__actions"
    >
      <div class="new-project__main-actions">
        <tr-button
          theme="dark"
          @click="modifyProject"
        >
          <material-icon :icon="updatableProject ? 'edit' : 'add'" />
          {{ updatableProject ? 'Update Project' : 'Create Project' }}
        </tr-button>
        <tr-button
          theme="outline"
          class="new-project__actions-cancel"
          @click="$emit('closeModal')"
        >
          Cancel
        </tr-button>
      </div>
      <tr-button
        v-if="updatableProject"
        theme="danger"
        class="new-project__actions-delete"
        @click="deleteProject"
      >
        Delete
      </tr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Vue } from 'vue-property-decorator'

import MembersInput from '@/components/member/MembersInput.vue'
import SelectedMembersList from '@/components/member/SelectedMembersList.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import SprintInput from '@/components/project/sprint/SprintInput.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import TrInput from '@/components/utils/TrInput.vue'
import { Project, ProjectMember } from '@/store/types'

@Component({
  components: {
    TrInput,
    TrButton,
    MembersInput,
    SelectedMembersList,
    MaterialIcon,
    ProjectCard,
    SprintInput
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
    owner: null,
    description: null,
    imgUrl: null,
    availableSprints: [],
    members: []
  }

  @ProvideReactive()
  get projectOwner (): string | null {
    return this.defaultProject.owner || null
  }

  @ProvideReactive()
  get authUserId (): string {
    return this.$store.getters['auth/getUser']._id
  }

  get possibleMembers (): Array<ProjectMember> {
    return this.$store.getters['project/getPossibleMembers']()
  }

  get isDisabled (): boolean {
    if (this.defaultProject._id === null) return false
    else if (this.authUserId === this.projectOwner) return false
    else return true
  }

  removeMember (member: ProjectMember): void {
    this.defaultProject.members = this.defaultProject.members?.filter(
      (m: ProjectMember) => m._id !== member._id
    )
  }

  modifyProject ():void {
    if (this.updatableProject) this.updateProject()
    else this.createProject()
  }

  createProject (): void {
    const ownerId = this.$store.getters['auth/getUser']._id
    const isOwnerAdded = (this.defaultProject.members?.filter(
      (m: ProjectMember) => m._id === ownerId
    ) || []).length > 0

    let members = []
    if (this.defaultProject.members && this.defaultProject.members.length > 0) {
      if (isOwnerAdded) members = [...this.defaultProject.members]
      members = [...this.defaultProject.members, { _id: ownerId }]
    } else members = [{ _id: ownerId }]

    const project = {
      ...this.defaultProject,
      createdAt: new Date().toISOString(),
      owner: ownerId,
      members
    }
    this.$store.dispatch('project/createProject', project)
    this.$emit('closeModal')
  }

  updateProject (): void {
    this.$store.dispatch('project/updateProject', this.defaultProject)
    this.$emit('closeModal')
  }

  deleteProject (): void {
    // TODO - More sophisticated confirmation
    window.confirm('Are you sure you want to delete this project?') &&
      this.$store.dispatch('project/deleteProject', this.defaultProject._id) &&
      this.$emit('closeModal')
  }

  mounted (): void {
    if (this.updatableProject) {
      this.defaultProject = { ...this.defaultProject, ...this.updatableProject }
    }
    this.$store.dispatch('project/fetchPossibleMembers')
  }
}
</script>

<style lang="scss">
.new-project {
  padding: rem(20);

  .new-project__actions {
    display: flex;
    justify-content: space-between;
    margin-top: rem(20);

    .new-project__main-actions {
      display: flex;
    }

    .new-project__actions-cancel,
    .new-project__actions-delete {
      margin-left: rem(10);
    }
  }
}
</style>
