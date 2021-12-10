<template>
  <div class="new-card-fields-panel">
    <card-field-array
      v-model="defaultIssue.priority"
      title="priority"
      :options="possiblePriorities"
    />
    <card-field-array
      v-model="defaultIssue.type"
      title="type"
      :options="possibleTypes"
    />
    <card-field-array
      v-model="defaultIssue.state"
      title="state"
      :options="possibleStates"
    />
    <card-field-array
      v-model="defaultIssue.sprint"
      title="sprint"
      :options="possibleSprints"
    />
    <card-field
      v-model="defaultIssue.spentTime"
      title="spentTime"
      placeholder="4h 30m"
    />
    <card-field
      v-model="defaultIssue.originalEstimation"
      title="originalEstimation"
      placeholder="4h 30m"
    />
    <tr-date-picker
      v-model="defaultIssue.dueDate"
      label="Due Date: "
    />
    <div
      class="new-card-fields-panel__member"
      @click="isOpen = true"
    >
      <div class="new-card-fields-panel__member-title">
        Assignee
      </div>
      <div class="new-card-fields-panel__member-assignee">
        {{ assignee }}
      </div>
      <members-input-panel
        :is-open="isOpen"
        position="top"
        :member="defaultIssue.assignee"
        :possible-members="possibleMembers"
        @change="changeAssignee($event)"
        @close="isOpen = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import CardField from '@/components/card/CardField.vue'
import CardFieldArray from '@/components/card/CardFieldArray.vue'
import MembersInputPanel from '@/components/member/MembersInputPanel.vue'
import TrDatePicker from '@/components/utils/TrDatePicker.vue'
import { FieldArray, Issue, ProjectMember } from '@/store/types'

@Component({
  components: {
    CardField,
    CardFieldArray,
    MembersInputPanel,
    TrDatePicker
  }
})
export default class CardFieldsPanel extends Vue {
  @Prop({
    type: String,
    default: 'backlog'
  })
  readonly state!: string

  defaultIssue: Partial<Issue> = {
    priority: null,
    type: null,
    state: null,
    estimation: null,
    spentTime: null,
    assignee: null,
    originalEstimation: null,
    sprint: null,
    dueDate: null,
    created: null
  }

  isOpen = false

  get possibleMembers (): Array<ProjectMember> {
    return this.$store.getters['project/getPossibleMembers'](this.$route.params.boardId)
  }

  get possiblePriorities (): Array<FieldArray> {
    const boardId = this.$route.params.boardId
    return this.$store.getters.getPossiblePriorities(boardId)
  }

  get possibleTypes (): Array<FieldArray> {
    const boardId = this.$route.params.boardId
    return this.$store.getters.getPossibleTypes(boardId)
  }

  get possibleStates (): Array<FieldArray> {
    return this.$store.getters['board/getPossibleStates']
  }

  get possibleSprints (): Array<FieldArray> {
    let sprints = this.$store.getters['project/getPossibleSprints'](this.$route.params.boardId)
    if (sprints.length === 0) {
      return [{ id: null, name: 'No sprints' }]
    } else sprints = [{ id: null, name: 'No sprint' }].concat(sprints)

    return sprints.map(sprint => {
      return {
        value: sprint.id,
        label: sprint.name
      }
    })
  }

  get assignee (): string {
    return this.defaultIssue.assignee ? this.defaultIssue.assignee.name : 'Unassigned'
  }

  changeAssignee (member: ProjectMember): void {
    this.defaultIssue.assignee = member
  }

  @Watch('defaultIssue', { deep: true })
  updateIssue ():void {
    this.$emit('updatePanelFields', this.defaultIssue)
  }

  mounted (): void {
    this.$store.dispatch('project/fetchPossibleMembers')

    this.defaultIssue.state = this.state
  }
}
</script>

<style lang="scss">
.new-card-fields-panel {
  margin: rem(10);
  padding: rem(5) rem(0);
  border: rem(1) solid $global__color--grey2;
  border-radius: rem(4);
  box-shadow: 0 rem(1) rem(3) rgba(0, 0, 0, 0.2);

  .new-card-fields-panel__member {
    display: flex;
    position: relative;
    padding: 0.625rem 1.25rem;
    text-align: left;

    &:hover {
      background-color: $global__color--grey2;
      cursor: pointer;

      .new-card-fields-panel__member-assignee {
        color: $global__color--red2;
      }
    }

    .new-card-fields-panel__member-title {
      width: 50%;
      font-size: 0.875rem;
      font-weight: normal;
    }

    .new-card-fields-panel__member-assignee {
      width: 50%;
      color: $global__color--grey_800;
      font-size: 0.875rem;
      font-weight: normal;
    }
  }
}
</style>
