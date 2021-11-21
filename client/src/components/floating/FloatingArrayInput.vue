<template>
  <div class="floating-array-input">
    <div
      v-for="option in options"
      :key="option.value"
      class="floating-array-input__item"
      @click.stop="updateValue(option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { FieldArray } from '@/store/types'

@Component
export default class FloatingArrayInput extends Vue {
  @Prop({
    type: Array
  })
  readonly options!: Array<FieldArray>

  updateValue (val: string): void {
    this.$emit('updateValue', val)
  }
}
</script>

<style lang="scss">
.floating-array-input {
  display: flex;
  position: absolute;
  z-index: 1;
  top: rem(30);
  left: 0;
  flex-direction: column;
  width: rem(185);
  max-height: rem(150);
  padding: rem(10);
  overflow-y: auto;
  border: rem(1) solid $global__color--grey_800;
  background-color: $global__color--white;
}
</style>
