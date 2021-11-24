<template>
  <div
    class="card-field"
    @click="setIsEdit(true)"
  >
    <div class="card-field__title">
      {{ titleString }}
    </div>
    <div
      class="card-field__value"
    >
      {{ valueString }}
    </div>
    <input-panel
      :show="isEditing"
      :is-closeable="true"
      @update:show="setIsEdit($event)"
    >
      <floating-input
        :placeholder="placeholder"
        :value="value"
        @updateValue="updateValue"
      />
    </input-panel>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

import FloatingInput from '@/components/floating/FloatingInput.vue'
import InputPanel from '@/components/utils/InputPanel.vue'
import { capitalize } from '@/utils/index'

@Component({
  components: {
    FloatingInput,
    InputPanel
  }
})
export default class CardField extends Vue {
  @Model('update:value', {
    type: String
  })
  readonly value!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly title!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly placeholder!: string

  isEditing = false

  setIsEdit (val: boolean): void {
    this.isEditing = val
  }

  updateValue (val: string): void {
    this.setIsEdit(false)
    this.$emit('update:value', val)
  }

  get titleString (): string {
    if (this.title === 'spenTime') return 'Spent time'
    else if (this.title === 'originalEstimation') return 'OG estimation'
    else return capitalize(this.title)
  }

  get valueString (): string {
    const nullPlaceholders = {
      estimation: '?',
      spentTime: '?',
      originalEstimation: '?'
    }
    if (this.value === null || this.value === '') {
      return Object.entries(nullPlaceholders).reduce((acc, nextVal) => {
        if (nextVal[0] === this.title) {
          acc = nextVal[1]
        }
        return acc
      }, '')
    } else return this.value
  }
}
</script>

<style lang="scss">
.card-field {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: rem(10) rem(20);
  text-align: left;
  cursor: pointer;

  .card-field__title {
    width: 50%;
    font-size: rem(14);
    font-weight: normal;
  }

  .card-field__value {
    width: 50%;
    color: $global__color--grey_800;
    font-size: rem(14);
    font-weight: normal;
  }

  &:hover {
    background-color: $global__color--grey2;

    .card-field__value {
      color: $global__color--red2;
    }
  }

  @media screen and (max-width: $global__breakpoint--mobile) {
    flex-direction: column;

    .card-field__title {
      margin-bottom: rem(5);
    }

    .card-field__title,
    .card-field__value {
      width: 100%;
    }
  }
}
</style>
