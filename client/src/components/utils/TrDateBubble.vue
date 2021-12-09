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

import { remainingHours, remainingTimeStatus } from '@/utils/index'

@Component
export default class TrDateBubble extends Vue {
  @Prop({
    type: String
  })
  readonly dueDate!: string

  get remainingHours (): number {
    return remainingHours(this.dueDate)
  }

  get remainingTimeStatus (): string {
    return remainingTimeStatus(this.dueDate)
  }

  get dateString (): string {
    let remainingTimeString = ''
    const days = Math.floor(this.remainingHours / 24)
    if (days) remainingTimeString += `${days} days `
    const hours = this.remainingHours % 24
    if (hours) remainingTimeString += `${hours} hours`

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
}

</style>
