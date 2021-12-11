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
      ref="datepicker"
      :value="formatedVal"
      class="tr-date-picker__input"
      placeholder="?"
      type="datetime"
      value-type="format"
      :disabled-date="disabledDate"
      :show-hour="isHour"
      :show-minute="false"
      :show-second="false"
      :format="`YYYY-MM-DD${isHour ? ' HH' : ''}`"
      @input="updateValue($event)"
    />
  </div>
</template>

<script lang="ts">
import 'vue2-datepicker/index.css'

import moment from 'moment'
import { Component, Model, Prop, Ref, Vue } from 'vue-property-decorator'
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

  @Prop({
    type: Boolean,
    default: true
  })
  isHour!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  isDisabledDate!: boolean

  @Ref('datepicker')
  datePick!: DatePicker

  get formatedVal (): string | null {
    if (this.value !== null) {
      return moment(this.value).format(`YYYY-MM-DD${this.isHour ? ' HH' : ''}`)
    } else return null
  }

  disabledDate (date: Date): boolean {
    if (this.isDisabledDate) {
      const yesterday = moment().subtract(1, 'days')
      return moment(date) < yesterday
    } else return false
  }

  updateValue (event: Event): void {
    if (event && !this.isHour) this.datePick.closePopup()
    if (this.value && event) {
      const oldMin = this.value.split(' ')[1]
      const newMin = event.split(' ')[1]
      if (oldMin !== newMin) this.datePick.closePopup()
    }
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
      height: auto;
      padding: 0;
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
