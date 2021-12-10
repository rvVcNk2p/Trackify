<template>
  <div class="tr-date-picker">
    <tr-tooltip
      v-if="labelTooltip"
      :description="labelTooltip"
    >
      <div class="tr-date-picker__label">
        {{ label }}
      </div>
    </tr-tooltip>
    <div
      v-else
      class="tr-date-picker__label"
    >
      {{ label }}
    </div>
    <date-picker
      :value="formatedVal"
      placeholder="?"
      :disabled-date="disabledDate"
      class="tr-date-picker__input"
      value-type="format"
      :show-minute="false"
      :show-second="false"
      format="YYYY-MM-DD HH"
      type="datetime"
      @input="updateValue($event)"
    />
  </div>
</template>

<script lang="ts">
import 'vue2-datepicker/index.css'

import moment from 'moment'
import { Component, Model, Prop, Vue } from 'vue-property-decorator'
import DatePicker from 'vue2-datepicker'

import TrTooltip from '@/components/utils/TrTooltip.vue'

@Component({
  components: {
    DatePicker,
    TrTooltip
  }
})
export default class TrDatePicker extends Vue {
  @Model('update:value', {
    type: String,
    default: null
  })
  readonly value!: string

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

  get formatedVal (): string | null {
    if (this.value !== null) {
      return moment(this.value).format('YYYY-MM-DD HH')
    } else return null
  }

  disabledDate (date: Date): boolean {
    const yesterday = moment().subtract(1, 'days')
    return date.getTime() < yesterday
  }

  updateValue (event: Event): void {
    this.$emit('update:value', event)
  }
}
</script>

<style lang="scss">
.tr-date-picker {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: rem(10) rem(20);
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: $global__color--grey2;
  }

  .tr-date-picker__label {
    width: 50%;
    font-size: rem(14);
    font-weight: normal;
  }

  .tr-date-picker__input {
    width: 50%;
    color: $global__color--grey_800;
    font-size: rem(14);
    font-weight: normal;

    &:hover {
      color: $global__color--red2;
    }

    .mx-input {
      padding-left: 0;
      border: 0;
      background: transparent;
      box-shadow: none;
      color: inherit;
      cursor: pointer;

      &::placeholder {
        color: inherit;
      }

      &:hover {
        color: inherit;

        &::placeholder {
          color: inherit;
        }
      }
    }

    .mx-icon-calendar,
    .mx-icon-clear {
      color: inherit;
    }
  }

  @media screen and (max-width: $global__breakpoint--mobile) {
    flex-direction: column;

    .tr-date-picker__label {
      margin-bottom: rem(5);
    }

    .tr-date-picker__label,
    .tr-date-picker__input {
      width: 100%;
    }
  }
}
</style>
