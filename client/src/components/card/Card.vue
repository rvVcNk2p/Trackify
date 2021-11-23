/* eslint-disable vue/no-v-html */
<template>
  <div class="card">
    <div class="card-container">
      <div class="card__issue-wrapper">
        <card-issue-toolbar
          v-model="isEditing"
          @update:isEditing="isEditing = $event"
        />
        <card-issue-informations
          :ticket-number="issue.ticketNumber"
          :created="issue.created ? issue.created : null"
          :updated="issue.updated ? issue.updated : null"
        />
        <card-issue-description
          :description="issue.description"
          :title="issue.title"
          :is-editing="isEditing"
          @update="update($event)"
        />
        <!-- TODO - Subtask functionality -->
        <!-- TODO - Comments Component + Functionality -->
      </div>
      <div class="card__fields-panel">
        <card-fields-panel
          :issue="issue"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import CardFieldsPanel from '@/components/card/CardFieldsPanel.vue'
import CardIssueDescription from '@/components/card/wrapper/CardIssueDescription.vue'
import CardIssueInformations from '@/components/card/wrapper/CardIssueInformations.vue'
import CardIssueToolbar from '@/components/card/wrapper/CardIssueToolbar.vue'
import { Issue } from '@/store/types'

@Component({
  components: {
    CardFieldsPanel,
    CardIssueToolbar,
    CardIssueInformations,
    CardIssueDescription
  }
})
export default class CardLayout extends Vue {
  @Prop({
    type: Object as () => Issue,
    required: true
  })
  readonly issue!: Issue

  isEditing = false

  update (newData: { title: string, description: string, action: string }): void {
    this.isEditing = false
    if (newData.action === 'save') {
      const payload = {
        _id: this.issue._id,
        title: newData.title,
        description: newData.description
      }
      this.$store.dispatch('board/updateTicket', payload)
    }
  }
}
</script>

<style lang="scss">
.card {
  padding: rem(20);

  .card-container {
    display: grid;
    grid-gap: rem(10);
    grid-template-columns: 7fr 3fr;
    min-height: rem(400);
    background-color: $global__color--grey;

    .card__issue-wrapper,
    .card__fields-panel {
      height: fit-content;
      background-color: $global__color--grey;
      color: $global__color--grey_800;
    }
  }
}
</style>
