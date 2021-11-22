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
    <card-field
      v-model="defaultIssue.estimation"
      title="estimation"
    />
    <card-field
      v-model="defaultIssue.spentTime"
      title="spentTime"
    />
    <card-field
      v-model="defaultIssue.originalEstimation"
      title="originalEstimation"
    />
    <!-- TODO - Assignee -->
    <!-- TODO - Due Date -->
    <!-- TODO - Sprints -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import CardField from '@/components/card/CardField.vue'
import CardFieldArray from '@/components/card/CardFieldArray.vue'
import { FieldArray, Issue } from '@/store/types'

@Component({
  components: {
    CardField,
    CardFieldArray
  }
})
export default class CardFieldsPanel extends Vue {
  @Prop({
    type: Object as () => Issue
  })
  readonly issue!: Issue

  defaultIssue: Partial<Issue> = {
    _id: null,
    priority: null,
    type: null,
    state: null,
    created: null, // TODO - Assignee
    estimation: null,
    spentTime: null,
    sprints: null, // TODO - Sprints
    dueDate: null, // TODO - Due Date
    originalEstimation: null
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

  @Watch('defaultIssue', { deep: true })
  updateIssue ():void {
    this.$store.commit('board/updateTicket', this.defaultIssue)
  }

  mounted (): void {
    const { _id, priority, type, state, estimation, spentTime, originalEstimation } = this.issue
    this.defaultIssue = { _id, priority, type, state, estimation, spentTime, originalEstimation }
  }
}
</script>

<style lang="scss">
.card-fields-panel {
  margin: rem(10);
  margin-top: rem(35);
  padding: rem(10) rem(0);
  border: rem(1) solid $global__color--grey2;
  border-radius: rem(4);
  box-shadow: 0 rem(1) rem(3) rgba(0, 0, 0, 0.2);
}
</style>
