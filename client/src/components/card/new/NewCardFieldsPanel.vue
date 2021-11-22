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
    <!-- TODO - Assignee -->
    <card-field-array
      v-model="defaultIssue.state"
      title="state"
      :options="possibleStates"
    />
    <card-field
      v-model="defaultIssue.spentTime"
      title="spentTime"
      placeholder="4h 30m"
    />
    <!-- TODO - Sprints -->
    <card-field
      v-model="defaultIssue.originalEstimation"
      title="originalEstimation"
      placeholder="4h 30m"
    />
    <!-- TODO - Due Date -->
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
    originalEstimation: null,
    sprints: null, // TODO - Sprints
    dueDate: null, // TODO - Due Date
    created: {
      assignee: {
        _id: '1',
        name: 'Emma Doe',
        avatar: 'https://randomuser.me/api/portraits/thumb/women/83.jpg'
      },
      at: new Date()
    } // TODO - Assignee
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
    this.$emit('updatePanelFields', this.defaultIssue)
  }

  mounted (): void {
    this.defaultIssue.state = this.state
  }
}
</script>

<style lang="scss">
.new-card-fields-panel {
  margin: rem(10);
  padding: rem(10) rem(0);
  border: rem(1) solid $global__color--grey2;
  border-radius: rem(4);
  box-shadow: 0 rem(1) rem(3) rgba(0, 0, 0, 0.2);
}
</style>
