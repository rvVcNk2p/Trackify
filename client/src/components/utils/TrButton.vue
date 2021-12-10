<template>
  <button
    class="tr-button"
    :class="[`tr-button--${theme}`]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TrButton extends Vue {
  @Prop({
    type: String
  })
  theme!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean
}
</script>
<style lang="scss">
.tr-button {
  display: flex;
  align-items: center;
  padding: rem(5) rem(10);
  border: rem(1) solid $global__color--white;
  border-radius: rem(6);
  background-color: transparent;
  color: $global__color--white;
  font-size: rem(16);
  cursor: pointer;

  &:disabled {
    border-color: $global__color--grey2 !important;
    background-color: $global__color--white !important;
    color: $global__color--grey2 !important;
    pointer-events: none;
  }

  &:hover {
    background-color: $global__color--white;
    color: $global__color--grey_800;
  }

  .material-icon {
    margin-right: rem(5);
    font-size: rem(16);
  }

  &.tr-button--dark {
    border: rem(1) solid $global__color--grey_800;
    background-color: $global__color--grey_800;
    color: $global__color--white;

    &:hover {
      opacity: 0.8;
      background-color: $global__color--grey_800;
      color: $global__color--white;
    }
  }

  &.tr-button--outline {
    border: rem(1) solid $global__color--grey_800;
    background-color: $global__color--white;
    color: $global__color--grey_800;

    &:hover {
      opacity: 0.8;
    }
  }

  &.tr-button--danger {
    border: rem(1) solid $global__color--red;
    background-color: $global__color--white;
    color: $global__color--red;
    font-weight: 600;

    &:hover {
      background-color: $global__color--red;
      color: $global__color--white;
    }
  }
}
</style>
