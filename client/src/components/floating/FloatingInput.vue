<template>
  <div class="floating-input">
    <input
      ref="input"
      type="text"
      :value="value"
      :placeholder="placeholder"
    >
    <button @click.stop="updateValue()">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

@Component
export default class FloatingInput extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  readonly value!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly placeholder!: string

  @Ref('input')
  readonly inputEl!: HTMLInputElement

  updateValue (): void {
    this.$emit('updateValue', this.inputEl.value)
  }
}
</script>

<style lang="scss">
.floating-input {
  position: absolute;
  z-index: 1;
  top: rem(30);
  left: 0;
  padding: rem(10);
  border: rem(1) solid $global__color--grey_800;
  background-color: $global__color--white;
}
</style>
