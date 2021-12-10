<template>
  <div
    class="tr-date-bubble"
    :class="[`tr-date-bubble--${remainingTimeStatus}`]"
  >
    {{ dateString }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { remainingMinutes, remainingTimeStatus } from '@/utils/index'

@Component
export default class TrDateBubble extends Vue {
  @Prop({
    type: String
  })
  readonly dueDate!: string

  get remainingMinutes (): number {
    return remainingMinutes(this.dueDate)
  }

  get remainingTimeStatus (): string {
    return remainingTimeStatus(this.dueDate)
  }

  get dateString (): string {
    let remainingTimeString = ''

    const days = Math.floor(this.remainingMinutes / 1440)
    if (days) remainingTimeString += `${days}d`
    const hours = Math.floor((this.remainingMinutes - 1440 * days) / 60)
    if (hours) remainingTimeString += ` ${hours}h`
    const minutes = Math.floor(((this.remainingMinutes - 1440 * days) - 60 * hours))
    if (minutes) remainingTimeString += ` ${minutes}m`

    if (days < 0 || hours < 0 || minutes < 0) remainingTimeString = 'Overdue'
    return remainingTimeString
  }
}
</script>

<style lang="scss">
.tr-date-bubble {
  padding: rem(2) rem(40);
  border-radius: rem(6);
  color: $global__color--white;
  font-size: rem(15);

  &.tr-date-bubble--red {
    background-color: $global__color--red;
  }

  &.tr-date-bubble--orange {
    background-color: $global__color--orange;
  }

  &.tr-date-bubble--yellow {
    background-color: $global__color--yellow;
  }

  &.tr-date-bubble--green {
    background-color: $global__color--green;
  }

  &.tr-date-bubble--overdue {
    background-color: $global__color--grey_800;
  }
}

</style>
