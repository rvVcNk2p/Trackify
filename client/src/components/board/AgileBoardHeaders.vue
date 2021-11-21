<template>
  <div class="agile-board-header">
    <div
      v-for="column in headers"
      :key="column.state"
      class="agile-board-header__title"
    >
      {{ column.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import AgileBoardTicket from '@/components/board/AgileBoardTicket.vue'
import { AvailableColumn } from '@/store/types'

@Component({
  components: {
    AgileBoardTicket
  }
})
export default class AgileBoardHeaders extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly headers!: Array<AvailableColumn>
}
</script>

<style lang="scss">
.agile-board-header {
  display: flex;
  flex: 1;
  min-width: rem(150);
  padding: 0 rem(6);
  padding-bottom: rem(6);
  background-color: $global__color--grey_800;
  color: $global__color--white;

  .agile-board-header__title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: rem(150);
    margin-right: rem(5);
    padding: rem(10) rem(10);
    border: rem(1) solid $global__color--white;
    font-weight: 600;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
