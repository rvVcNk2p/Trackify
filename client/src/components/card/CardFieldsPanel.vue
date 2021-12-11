<template>
  <div class="card-fields-panel">
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
      v-model="defaultIssue.estimation"
      title="estimation"
      validation-type="time"
    />
    <card-field
      v-model="defaultIssue.spentTime"
      title="spentTime"
      validation-type="time"
    />
    <card-field
      v-model="defaultIssue.originalEstimation"
      title="originalEstimation"
      validation-type="time"
    />
    <tr-date-picker
      v-model="defaultIssue.dueDate"
      label="Due Date: "
    />
    <div
      class="card-fields-panel__member"
      @click="isOpen = true"
    >
      <div class="card-fields-panel__member-title">
        Assignee
      </div>
      <div class="card-fields-panel__member-assignee">
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
import MembersInput from '@/components/member/MembersInput.vue'
import MembersInputPanel from '@/components/member/MembersInputPanel.vue'
import TrDatePicker from '@/components/utils/TrDatePicker.vue'
import { FieldArray, Issue, ProjectMember, SprintOption } from '@/store/types'

@Component({
  components: {
    CardField,
    CardFieldArray,
    MembersInput,
    MembersInputPanel,
    TrDatePicker
  }
})
export default class CardFieldsPanel extends Vue {
  @Prop({
    type: Object as () => Issue
  })
  readonly issue!: Issue

  mInit = false

  defaultIssue: Partial<Issue> = {
    priority: null,
    type: null,
    state: null,
    assignee: null,
    estimation: null,
    spentTime: null,
    sprint: null,
    dueDate: null,
    originalEstimation: null
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
    let sprints: Array<Partial<SprintOption>> = this.$store.getters['project/getPossibleSprints'](this.$route.params.boardId)
    if (sprints.length === 0) {
      return [{ value: null, label: 'No sprint' }]
    } else sprints = [{ id: null, name: 'No sprint' } as Partial<SprintOption>, ...sprints]

    return sprints.map((sprint: Partial<SprintOption>) => {
      return {
        value: sprint.id ? sprint.id : null,
        label: sprint.name ? sprint.name : ''
      }
    })
  }

  get assignee (): string {
    return this.issue.assignee ? this.issue.assignee.name : 'Unassigned'
  }

  changeAssignee (member: ProjectMember): void {
    this.defaultIssue.assignee = member
  }

  @Watch('defaultIssue', { deep: true })
  updateIssue (): void {
    if (this.mInit) {
      this.$store.dispatch('board/updateTicket', this.defaultIssue)
    }
  }

  mounted (): void {
    this.$store.dispatch('project/fetchPossibleMembers')
    const { _id, priority, type, state, estimation, spentTime, originalEstimation, assignee, dueDate, sprint } = this.issue
    this.defaultIssue = { _id, priority, type, state, estimation, spentTime, originalEstimation, assignee, dueDate, sprint }
    this.$nextTick(() => {
      this.mInit = true
    })
  }
}
</script>

<style lang="scss">
.card-fields-panel {
  width: 100%;
  margin: rem(10);
  margin-top: rem(10);
  padding: rem(5) rem(0);
  border: rem(1) solid $global__color--grey2;
  border-radius: rem(4);
  box-shadow: 0 rem(1) rem(3) rgba(0, 0, 0, 0.2);

  .card-fields-panel__member {
    display: flex;
    position: relative;
    padding: 0.625rem 1.25rem;
    text-align: left;

    &:hover {
      background-color: $global__color--grey2;
      cursor: pointer;

      .card-fields-panel__member-assignee {
        color: $global__color--red2;
      }
    }

    .card-fields-panel__member-title {
      width: 50%;
      font-size: 0.875rem;
      font-weight: normal;
    }

    .card-fields-panel__member-assignee {
      width: 50%;
      color: $global__color--grey_800;
      font-size: 0.875rem;
      font-weight: normal;
    }
  }
}
</style>
