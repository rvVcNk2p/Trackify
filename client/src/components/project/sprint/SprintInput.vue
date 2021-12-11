<template>
  <div class="sprint-input">
    <div class="sprint-input__label">
      Available sprints:
    </div>
    <div class="sprint-input__sprints">
      <div
        v-for="sprint in availableSprints"
        :key="sprint.id"
        class="sprint-input__sprint"
      >
        <div class="sprint-input__informations">
          {{ sprint.name }} - {{ sprint.from }} - {{ sprint.to }}
        </div>
        <div class="sprint-input__action">
          <material-icon
            icon="edit"
            @click="selectSprint(sprint)"
          />
          <material-icon
            icon="delete"
            @click="removeSprint(sprint.id)"
          />
        </div>
      </div>
    </div>
    <div class="sprint-input__add-new">
      <tr-button
        v-if="!isActive"
        theme="outline"
        @click="setActiveState(true)"
      >
        <material-icon
          icon="add"
        />
        Add new sprint
      </tr-button>
    </div>
    <div
      v-if="isActive"
      class="sprint-input__container"
    >
      <div class="sprint-input__wrapper">
        <tr-input
          v-model="selectedSprint.name"
          label="Sprint name:"
          class="sprint-input__name"
        />
        <tr-date-picker
          v-model="selectedSprint.from"
          :is-hour="false"
          :is-disabled-date="false"
          label="Sprint starting date:"
          class="sprint-input__from"
        />
        <tr-date-picker
          v-model="selectedSprint.to"
          :is-hour="false"
          :is-disabled-date="false"
          label="Sprint ending date:"
          class="sprint-input__to"
        />
      </div>
      <div class="sprint-input__actions">
        <tr-button
          class="sprint-input__add"
          :disabled="!isValid"
          theme="dark"
          @click="updateSprints(null)"
        >
          {{ selectedSprint.id ? 'Update sprint' : 'Add new sprint' }}
        </tr-button>
        <tr-button
          class="sprint-input__cancel"
          theme="outline"
          @click="resetSprint()"
        >
          Cancel
          {{ selectedSprint.id ? 'editing' : 'adding' }}
        </tr-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Component, Model, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import TrDatePicker from '@/components/utils/TrDatePicker.vue'
import TrInput from '@/components/utils/TrInput.vue'
import { SprintOption } from '@/store/types'

@Component({
  components: {
    TrInput,
    TrDatePicker,
    TrButton,
    MaterialIcon
  }
})
export default class SprintInput extends Vue {
  selectedSprint = {
    id: null,
    name: '',
    from: null,
    to: null
  }

  isActive = false

  @Model('update:value', {
    type: Array as () => SprintOption[],
    required: true
  })
  readonly availableSprints! : Array<SprintOption>

  get isValid (): boolean {
    return this.selectedSprint.name.length > 0 &&
      this.selectedSprint.from !== null &&
      this.selectedSprint.to !== null
  }

  selectSprint (sprint: SprintOption): void {
    this.setActiveState(true)
    this.selectedSprint = {
      ...sprint
    }
  }

  resetSprint (): void {
    this.selectedSprint = {
      id: null,
      name: '',
      from: null,
      to: null
    }
    this.setActiveState(false)
  }

  updateSprints (): void {
    if (this.selectedSprint.id) {
      this.$emit('update:value', this.availableSprints.map(sprint => {
        if (sprint.id === this.selectedSprint.id) {
          return { ...this.selectedSprint }
        } else return sprint
      }))
      this.resetSprint()
    } else {
      const selectedSprintObj = {
        ...this.selectedSprint,
        id: uuidv4()
      }
      const selectedSprintArr = this.availableSprints.length > 0
        ? [...this.availableSprints, selectedSprintObj]
        : [selectedSprintObj]

      this.$emit('update:value', selectedSprintArr)
      this.resetSprint()
    }
  }

  removeSprint (id: string): void {
    confirm('Are you sure you want to remove this sprint?') &&
      this.$emit('update:value', this.availableSprints.filter(s => s.id !== id))
  }

  setActiveState (val: boolean): void {
    this.isActive = val
  }
}
</script>

<style lang="scss">
.sprint-input {
  margin-bottom: rem(10);
  color: $global__color--grey_800;

  .sprint-input__label {
    margin-bottom: rem(5);
    color: $global__color--grey_800;
    font-size: rem(14);
    font-weight: bold;
    text-align: left;
  }

  .sprint-input__sprints {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: rem(1) solid black;
    border-left: rem(1) solid black;

    .sprint-input__sprint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: rem(5) rem(10);
      border-right: rem(1) solid black;
      border-bottom: rem(1) solid black;
      cursor: pointer;

      .sprint-input__informations {
        display: flex;
      }

      .sprint-input__action {
        display: flex;
      }
    }
  }

  .sprint-input__add-new {
    margin-top: rem(10);
  }

  .sprint-input__container {
    margin: rem(20);
    padding: rem(10);
    border: rem(1) solid black;

    .sprint-input__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tr-input__label {
        margin-top: rem(5);
        margin-bottom: rem(10);
      }

      .sprint-input__from,
      .sprint-input__to {
        display: flex;
        flex-direction: column;

        .tr-date-picker__label {
          margin-bottom: 0.3125rem;
          color: $global__color--grey_800;
          font-size: 0.875rem;
          font-weight: bold;
        }

        div {
          width: 100%;
        }
      }
    }

    .sprint-input__actions {
      display: flex;
      justify-content: flex-start;

      .sprint-input__cancel {
        margin-left: rem(10);
      }
    }
  }
}
</style>
