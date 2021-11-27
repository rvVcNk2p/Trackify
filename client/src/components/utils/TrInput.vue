<template>
  <div class="tr-input">
    <tr-tooltip
      v-if="labelTooltip"
      :description="labelTooltip"
    >
      <div class="tr-input__label">
        {{ label }}
      </div>
    </tr-tooltip>
    <div
      v-else
      class="tr-input__label"
    >
      {{ label }}
    </div>
    <input
      :value="value"
      class="tr-input__field"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="updateValue($event)"
    >
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

import TrTooltip from '@/components/utils/TrTooltip.vue'

@Component({
  components: {
    TrTooltip
  }
})
export default class TrInput extends Vue {
  @Model('update:value', {
    type: String,
    default: null
  })
  readonly value!: string

  @Prop({
    type: String,
    default: 'text'
  })
  type!: string

  @Prop({
    type: String,
    default: ''
  })
  placeholder!: string

  @Prop({
    type: String,
    default: ''
  })
  label!: string

  @Prop({
    type: String,
    default: null
  })
  labelTooltip!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  updateValue (event: Event): void {
    const { value } = event.currentTarget as HTMLInputElement
    this.$emit('update:value', value)
  }
}
</script>
<style lang="scss">
.tr-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .tr-input__label {
    margin-bottom: rem(5);
    color: $global__color--grey_800;
    font-size: rem(14);
    font-weight: bold;
  }

  .tr-input__field {
    display: flex;
    width: calc(100% - 10px);
    margin-bottom: rem(10);
    color: $global__color--blue;
    font-size: rem(16);
    font-weight: 600;
    text-align: left;
  }
}
</style>
