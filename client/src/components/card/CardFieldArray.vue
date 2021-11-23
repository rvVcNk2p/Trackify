<template>
  <div
    class="card-field-array"
    @click="setIsEdit(true)"
  >
    <div class="card-field-array__title">
      {{ titleString }}
    </div>
    <div
      class="card-field-array__value"
    >
      {{ valueString }}
    </div>
    <input-panel
      :show="isEditing"
      :is-closeable="true"
      @update:show="setIsEdit($event)"
    >
      <floating-array-input
        :options="options"
        @updateValue="updateValue"
      />
    </input-panel>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

import FloatingArrayInput from '@/components/floating/FloatingArrayInput.vue'
import InputPanel from '@/components/utils/InputPanel.vue'
import { FieldArray } from '@/store/types'
import { capitalize } from '@/utils/index'

@Component({
  components: {
    FloatingArrayInput,
    InputPanel
  }
})
export default class CardFieldArray extends Vue {
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
    type: Array,
    required: true
  })
  readonly options!: Array<FieldArray>

  isEditing = false

  setIsEdit (val: boolean): void {
    this.isEditing = val
  }

  updateValue (val: string): void {
    this.setIsEdit(false)
    this.$emit('update:value', val)
  }

  get titleString (): string {
    return capitalize(this.title)
  }

  get valueString (): string {
    const nullPlaceholders = {
      priority: 'Normal',
      type: 'Task',
      state: 'Backlog',
      created: 'Unassigned', // TODO - created.assignee
      sprint: 'No sprint' // TODO - Sprint
    }
    if (this.value === null) {
      return Object.entries(nullPlaceholders).reduce((acc, nextVal) => {
        if (nextVal[0] === this.title) {
          acc = nextVal[1]
        }
        return acc
      }, '')
    } else {
      return this.options.reduce((acc, nextVal) => {
        if (nextVal.value === this.value) {
          acc = nextVal.label
        }
        return acc
      }, '')
    }
  }
}
</script>

<style lang="scss">
.card-field-array {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: rem(10) rem(20);
  text-align: left;
  cursor: pointer;

  .card-field-array__title {
    width: 50%;
    font-size: rem(14);
    font-weight: normal;
  }

  .card-field-array__value {
    width: 50%;
    color: $global__color--grey_800;
    font-size: rem(14);
    font-weight: normal;
  }

  &:hover {
    background-color: $global__color--grey2;

    .card-field-array__value {
      color: $global__color--red2;
    }
  }
}

@media screen and (max-width: $global__breakpoint--mobile) {
  .card-field-array {
    flex-direction: column;

    .card-field-array__title {
      margin-bottom: rem(5);
    }

    .card-field-array__title,
    .card-field-array__value {
      width: 100%;
    }
  }
}
</style>
