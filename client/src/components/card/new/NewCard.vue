/* eslint-disable vue/no-v-html */
<template>
  <div class="new-card">
    <div class="new-card-container">
      <div class="new-card__issue-wrapper">
        <card-issue-description
          :description="newTicket.description"
          :title="newTicket.title"
          :is-editing="true"
          @update="update($event)"
        >
          <div class="new-card__estimation-wrapper">
            <div class="new-card__estimation-title">
              Estimation
            </div>
            <input
              v-model="newTicket.estimation"
              class="new-card__estimation-input"
              title="estimation"
              placeholder="1w 1d 1h 1m"
            >
            <div class="new-card__estimation-information">
              1 week = 5 days, 1 day = 8 hours
            </div>
          </div>
        </card-issue-description>
      </div>
      <div class="new-card__fields-panel">
        <new-card-fields-panel
          :state="state"
          @updatePanelFields="panelFieldsUpdate($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import CardField from '@/components/card/CardField.vue'
import NewCardFieldsPanel from '@/components/card/new/NewCardFieldsPanel.vue'
import CardIssueDescription from '@/components/card/wrapper/CardIssueDescription.vue'
import { Issue } from '@/store/types'

@Component({
  components: {
    CardField,
    NewCardFieldsPanel,
    CardIssueDescription
  }
})
export default class NewCard extends Vue {
  @Prop({
    type: String,
    default: 'backlog'
  })
  readonly state!: string

  newTicket: Partial<Issue> = {
    description: null,
    title: null,
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

  update (newData: { title: string, description: string, action: string }): void {
    const { title, description, action } = newData
    if (action === 'save') {
      this.newTicket = { ...this.newTicket, title, description }
      this.$store.commit('project/createTicket', { ticket: this.newTicket, boardId: this.$route.params.boardId })
    }
    this.$emit('closeModal', action)
  }

  panelFieldsUpdate (val: Partial<Issue>): void {
    this.newTicket = { ...this.newTicket, ...val }
  }
}
</script>

<style lang="scss">
.new-card {
  padding: rem(20);

  .new-card-container {
    display: grid;
    grid-gap: rem(10);
    grid-template-columns: 7fr 3fr;
    background-color: $global__color--grey;

    .new-card__issue-wrapper,
    .new-card__fields-panel {
      height: fit-content;
      background-color: $global__color--grey;
      color: $global__color--grey_800;
    }

    .new-card__estimation-wrapper {
      display: flex;
      align-items: center;
      margin-top: rem(10);
      font-size: rem(14);

      .new-card__estimation-input {
        margin: 0 rem(10);
        padding: rem(2) rem(6);
        font-family: $global__font-family;
      }

      .new-card__estimation-information {
        color: $global__color--grey3;
        font-size: rem(12);
      }
    }

    .new-card__fields-panel {
      .card-fields-panel {
        margin-top: 0;
      }
    }
  }
}
</style>
