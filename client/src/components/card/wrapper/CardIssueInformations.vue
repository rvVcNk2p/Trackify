<template>
  <div class="card-issue-informations">
    <div class="card-issue-informations__header">
      <div class="card-issue-informations__header-wrapper">
        <span class="card-issue-informations__header-id">{{ prefixedId }}</span>
        <span class="card-issue-informations__header-created">
          Created by {{ createdBy }} {{ formatedDate(createdAt) }}
        </span>
      </div>
      <div
        v-if="updatedBy && updatedAt"
        class="card-issue-informations__header-updated"
      >
        Updated by {{ updatedBy }} {{ formatedDate(updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CardIssueInformations extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  readonly ticketNumber!: number

  @Prop({
    type: String,
    default: null
  })
  readonly createdBy!: string

  @Prop({
    type: String,
    default: null
  })
  readonly createdAt!: string

  @Prop({
    type: String,
    default: null
  })
  readonly updatedBy!: string

  @Prop({
    type: String,
    default: null
  })
  readonly updatedAt!: string

  formatedDate (val: Date): string | null {
    return val ? moment(val).fromNow() : null
  }

  get projectPrefix (): string {
    const boardId = this.$route.params.boardId
    return this.$store.getters['project/getProjectPrefix'](boardId)
  }

  get prefixedId (): string {
    return this.projectPrefix + '-' + this.ticketNumber
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
