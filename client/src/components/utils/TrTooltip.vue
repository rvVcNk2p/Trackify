<template>
  <div class="tr-tooltip">
    <slot />
    <div class="tr-tooltip__content">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TrTooltip extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  description!: string
}
</script>

<style lang="scss">
.tr-tooltip {
  display: flex;
  position: relative;

  &:hover .tr-tooltip__content {
    display: block;
  }

  .tr-tooltip__content {
    display: none;
    position: absolute;
    z-index: 1;
    top: rem(18);
    left: rem(28);
    width: 100%;
    min-width: max-content;
    padding: rem(5) rem(10);

    animation: show 1500ms ease-in;
    border-radius: rem(6);
    background-color: $global__color--grey_800;
    color: $global__color--white;
    font-size: rem(12);
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }

  99% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
