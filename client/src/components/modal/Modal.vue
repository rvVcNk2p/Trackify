<template>
  <div
    class="modal"
    :class="[ value ? 'modal--open': '']"
  >
    <div
      class="modal__overlay"
      @click="closeModal"
    />
    <div class="modal__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'

@Component({
  components: {
    MaterialIcon
  }
})
export default class Modal extends Vue {
  @Model('update:value', {
    type: Boolean,
    default: false
  })
  readonly value!: boolean

  closeModal (): void {
    setTimeout(() => {
      this.$emit('update:value', false)
    }, 100)
  }

  mounted (): void {
    window.addEventListener('keydown', this._closeOnEsc)
  }

  beforeDestroy (): void {
    window.removeEventListener('keydown', this._closeOnEsc)
  }

  _closeOnEsc (evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
.modal {
  display: none;
  position: relative;

  .modal__overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &.modal--open {
    display: block;
  }

  .modal__content {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 5%;
    width: 90vw;
    min-width: rem(550);
    max-height: rem(500);
    margin: 0 auto;
    margin-top: 5%;
    overflow: scroll;
    border: rem(1) solid rgba(0, 0, 0, 0.2);
    border-radius: rem(4);
    background-color: $global__color--grey;
    cursor: auto;
  }
}
</style>
