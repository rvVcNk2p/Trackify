<template>
  <div
    v-if="show"
    class="input-panel"
    :class="{'input-panel--scrollable': showScrollBlur}"
  >
    <div
      ref="body"
      class="input-panel__body"
    >
      <slot v-bind="scope" />
    </div>
    <div
      v-if="$scopedSlots.footer"
      class="input-panel__footer"
    >
      <slot
        name="footer"
        v-bind="scope"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ResizeObserver from 'resize-observer-polyfill'
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'

@Component
export default class InputPanel extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  readonly show!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isCloseable!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly outClickClose!: boolean

  @Prop({
    // type: Object // TODO
  })
  readonly containerEl: HTMLElement | undefined

  @Ref('body')
  readonly bodyEl!: HTMLElement

  localShow: boolean | null = null
  resizeObserver: ResizeObserver | null = null;
  showScrollBlur = false

  get scope (): InputPanel {
    return this
  }

  toggle (val: boolean): void {
    this.localShow = val
  }

  scrollToEnd (): void {
    this.$nextTick(() => {
      if (this.bodyEl !== null) {
        this.bodyEl.scrollTop = this.bodyEl.scrollHeight
      }
    })
  }

  @Watch('show', { immediate: true })
  onChangePropShow (): void {
    if (this.localShow !== this.show) {
      this.localShow = this.show
    }
  }

  @Watch('localShow')
  onChangeLocalShow (): void {
    if (this.isCloseable) {
      setTimeout(() => {
        if (this.localShow) {
          window.addEventListener('keydown', this._keyboardEventListener)
          window.addEventListener('click', this._clickEventListener)
          this.resizeObserver = new ResizeObserver(() => {
            this.showScrollBlur = this.bodyEl ? this.bodyEl.clientHeight < this.bodyEl.scrollHeight : false
          })
          this.resizeObserver.observe(this.bodyEl)
        } else {
          window.removeEventListener('keydown', this._keyboardEventListener)
          window.removeEventListener('click', this._clickEventListener)
          if (this.bodyEl !== undefined) {
            this.resizeObserver?.unobserve(this.bodyEl)
          }
        }
      })
    }

    if (this.localShow !== this.show) {
      this.$emit('update:show', this.localShow)
    }
  }

  beforeDestroy (): void {
    this.toggle(false)
  }

  private _keyboardEventListener (event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.toggle(false)
    }
  }

  private _clickEventListener (event: MouseEvent) : void {
    const innerInputEl = document.getElementsByClassName('members-input-panel__integrated-input')[0]
    // If you want to persist if the click is inside the input panel element, add this.$el to array bellow
    const containers = [this.containerEl, innerInputEl]
    if (this.outClickClose) containers.push(this.$el)

    const isOutside = !containers.map(el => event.composedPath().includes(el)).reduce((acc, next) => acc || next, false)
    if (isOutside) {
      this.toggle(false)
    }
  }
}
</script>

<style lang="scss">
.input-panel {
  display: flex;
  flex-direction: column;
  max-height: rem(372);
  border-radius: rem(4);
  background-color: $global__color--white;
  box-shadow: 0 rem(4) rem(16) #00000040;
  font-family: $global__font-family;

  .input-panel__body {
    flex: 1;
    scroll-behavior: smooth;
  }

  .input-panel__footer {
    display: flex;
    justify-content: space-between;
    padding: rem(16) rem(17);
    border-top: 1px solid #f2f2f2;
  }

  &.input-panel--scrollable {
    .input-panel__footer {
      border-top: 0 solid;
      box-shadow: 0 rem(-15) rem(20) rem(-20) rgba(#000, 0.3);
    }
  }
}
</style>
