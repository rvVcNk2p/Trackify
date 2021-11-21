<template>
  <div class="card-issue-toolbar">
    <div class="card-issue-toolbar__elements">
      <!-- Link issue -->
      <tr-tooltip description="Link issue">
        <button class="card-issue-toolbar__element--first">
          <material-icon
            icon="add_link"
            class="card-issue-toolbar__element-icon"
          />
        </button>
      </tr-tooltip>
      <!-- Add tag -->
      <div class="card-issue-toolbar__middle-container">
        <tr-tooltip
          v-for="icon in middleIcons"
          :key="icon.icon"
          :description="icon.tooltipText"
        >
          <button
            class="card-issue-toolbar__element--middle"
          >
            <material-icon
              :icon="icon.icon"
              class="card-issue-toolbar__element-icon"
            />
          </button>
        </tr-tooltip>
      </div>
      <!-- Edit issue -->
      <button class="card-issue-toolbar__element--last">
        <material-icon
          icon="more_horiz"
          class="card-issue-toolbar__element-icon"
        />
      </button>
      <!-- Edit issue -->
      <tr-tooltip description="Edit issue">
        <button
          class="card-issue-toolbar__element--edit"
          :disabled="isEditing"
          @click="updateValue"
        >
          <material-icon
            icon="edit"
            class="card-issue-toolbar__element-icon"
          />
        </button>
      </tr-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrTooltip from '@/components/utils/TrTooltip.vue'

@Component({
  components: {
    MaterialIcon,
    TrTooltip
  }
})
export default class CardIssueToolbar extends Vue {
  @Model('udapte:value', {
    type: Boolean,
    default: false
  })
  readonly isEditing!: boolean

  middleIcons = [
    { tooltipText: 'Add tag', icon: 'local_offer' },
    { tooltipText: 'Assign issue', icon: 'person_add' }
  ]

  updateValue (): void {
    this.$emit('update:isEditing', true)
  }
}
</script>

<style lang="scss">
.card-issue-toolbar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: rem(10);

  .card-issue-toolbar__elements {
    display: flex;

    .card-issue-toolbar__element--first,
    .card-issue-toolbar__element--middle,
    .card-issue-toolbar__element--last,
    .card-issue-toolbar__element--edit {
      position: relative;
      padding: 0 rem(15);
      border: rem(1) solid $global__color--blue;
      cursor: pointer;

      .card-issue-toolbar__element-icon {
        display: flex;
      }

      &:hover {
        border-color: $global__color--grey_800;
        background-color: $global__color--grey_800;
        color: $global__color--white;
      }
    }

    .card-issue-toolbar__element--first {
      border-top-left-radius: rem(3);
      border-bottom-left-radius: rem(3);
    }

    .card-issue-toolbar__element--last {
      border-top-right-radius: rem(3);
      border-bottom-right-radius: rem(3);
    }

    .card-issue-toolbar__middle-container {
      display: flex;

      .tr-tooltip {
        &:first-child > .card-issue-toolbar__element--middle {
          border-right: 0;
          border-left: 0;
        }

        &:last-child > .card-issue-toolbar__element--middle {
          border-right: 0;
        }
      }
    }

    .card-issue-toolbar__element--edit {
      margin-left: rem(25);
      border-radius: rem(3);

      &:disabled {
        border-color: $global__color--grey2 !important;
        pointer-events: none;
      }
    }
  }
}
</style>
