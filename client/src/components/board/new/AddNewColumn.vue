<template>
  <div class="add-new-column">
    <div class="add-new-column__fields">
      <tr-input
        v-model="defaultColumn.name"
        placeholder="e.g. Backlog"
        label="Name: "
        label-tooltip="We will display this text in the Column Header section."
      />
      <tr-input
        v-model="defaultColumn.state"
        placeholder="e.g. backlog"
        label="State: "
      />
    </div>
    <div class="add-new-column__actions">
      <tr-button
        theme="dark"
        class="add-new-column__actions-save"
        @click="modifyColumn"
      >
        <material-icon :icon="updatableColumn ? 'edit' : 'add'" />
        {{ updatableColumn ? 'Update Column' : 'Create Column' }}
      </tr-button>
      <tr-button
        theme="outline"
        class="add-new-column__actions-cancel"
        @click="$emit('closeModal')"
      >
        Cancel
      </tr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Component, Prop, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import TrInput from '@/components/utils/TrInput.vue'
import { AvailableColumn } from '@/store/types'

@Component({
  components: {
    TrButton,
    TrInput,
    MaterialIcon
  }
})
export default class AddNewColumn extends Vue {
  @Prop({
    type: Object as () => AvailableColumn,
    default: null
  })
  readonly updatableColumn!: AvailableColumn

  defaultColumn: AvailableColumn = {
    _id: null,
    name: null,
    state: null,
    order: null
  }

  modifyColumn (): void {
    const projectId = this.$route.params.boardId

    if (this.updatableColumn) this.updateColumn(projectId)
    else this.createColumn(projectId)

    this.$emit('closeModal')
  }

  updateColumn (projectId: string): void {
    this.$store.commit('project/updateColumn', { column: this.defaultColumn, projectId })
  }

  createColumn (projectId:string): void {
    const column = {
      ...this.defaultColumn,
      _id: uuidv4()
    }
    this.$store.commit('project/createColumn', { column, projectId })
  }

  mounted (): void {
    if (this.updatableColumn) {
      this.defaultColumn = { ...this.updatableColumn }
    }
  }
}
</script>

<style lang="scss">
.add-new-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: rem(20);

  .add-new-column__actions {
    display: flex;
    justify-content: flex-start;
    margin-top: rem(20);

    .add-new-column__actions-save {
      margin-right: rem(10);
    }
  }
}
</style>
