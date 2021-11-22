<template>
  <div class="card-issue-informations">
    <div class="card-issue-informations__header">
      <div class="card-issue-informations__header-wrapper">
        <span class="card-issue-informations__header-id">{{ prefixedId }}</span>
        <span class="card-issue-informations__header-created">
          Created by {{ created.assignee.name }} {{ formatedDate(created.at) }}
        </span>
      </div>
      <div
        v-if="updated"
        class="card-issue-informations__header-updated"
      >
        Updated by {{ updated.assignee.name }} {{ formatedDate(updated.at) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { IssueTimeStamp } from '@/store/types'

@Component
export default class CardIssueInformations extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly id!: string

  @Prop({
    type: Object as () => IssueTimeStamp,
    default: null
  })
  readonly created!: IssueTimeStamp

  @Prop({
    type: Object as () => IssueTimeStamp,
    default: null
  })
  readonly updated!: IssueTimeStamp

  formatedDate (val: Date): string | null {
    return val ? moment(val).fromNow() : null
  }

  get projectPrefix (): string {
    const boardId = this.$route.params.boardId
    return this.$store.getters['project/getProjectPrefix'](boardId)
  }

  get prefixedId (): string {
    return this.projectPrefix + '-' + this.id
  }
}
</script>

<style lang="scss">
.card-issue-informations {
  display: flex;
  flex-direction: column;

  .card-issue-informations__header {
    display: flex;
    flex-direction: column;

    .card-issue-informations__header-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;

      .card-issue-informations__header-id,
      .card-issue-informations__header-created {
        color: $global__color--blue;
        font-size: rem(12);
      }

      .card-issue-informations__header-id {
        min-width: fit-content;
        margin-right: rem(15);
        font-size: rem(16);
        font-weight: 600;
      }
    }

    .card-issue-informations__header-updated {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;
      color: $global__color--blue;
      font-size: rem(12);
    }
  }
}
</style>
