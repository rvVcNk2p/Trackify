/* eslint-disable vue/no-v-html */
<template>
  <div class="card">
    <div class="card-container">
      <div class="card__issue-wrapper">
        <card-issue-toolbar
          v-model="isEditing"
          :due-date="issue.dueDate"
          @update:isEditing="isEditing = $event"
        />
        <card-issue-informations
          :ticket-number="issue.ticketNumber"
          :created-by="issue.createdBy ? issue.createdBy.name : null"
          :created-at="issue.createdAt ? issue.createdAt : null"
          :updated-by="issue.updatedBy ? issue.updatedBy.name : null"
          :updated-at="issue.updatedAt ? issue.updatedAt : null"
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
        <tr-date-bubble
          v-if="issue.dueDate"
          :due-date="issue.dueDate"
        />
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
import TrDateBubble from '@/components/utils/TrDateBubble.vue'
import { Issue } from '@/store/types'

@Component({
  components: {
    CardFieldsPanel,
    CardIssueToolbar,
    CardIssueInformations,
    CardIssueDescription,
    TrDateBubble
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
    grid-template-columns: 6fr 4fr;
    min-height: rem(400);
    background-color: $global__color--grey;

    .card__issue-wrapper,
    .card__fields-panel {
      height: fit-content;
      background-color: $global__color--grey;
      color: $global__color--grey_800;
    }

    .card__fields-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
