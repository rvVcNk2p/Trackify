<template>
  <div>
    <div
      class="new-board-column"
      @click="setNewColumnModal(true)"
    >
      <div class="new-board-column___label">
        <material-icon icon="add" />
        New column...
      </div>
    </div>
    <modal
      v-if="isNewColumnModalOpen"
      v-model="isNewColumnModalOpen"
    >
      <add-new-column @closeModal="setNewColumnModal(false)" />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AddNewColumn from '@/components/board/new/AddNewColumn.vue'
import Modal from '@/components/modal/Modal.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'

@Component({
  components: {
    MaterialIcon,
    AddNewColumn,
    Modal
  }
})
export default class NewBoardColumn extends Vue {
  isNewColumnModalOpen = false

  setNewColumnModal (val: boolean): void {
    this.isNewColumnModalOpen = val
  }
}
</script>

<style lang="scss">
.new-board-column {
  display: flex;
  align-items: flex-start;
  min-width: rem(150);
  margin-top: rem(5);
  margin-left: rem(10);
  padding-bottom: rem(100);
  font-size: rem(16);
  cursor: pointer;

  .material-icons-outlined {
    font-size: rem(16);
  }

  &:hover {
    color: $global__color--red2;
  }

  .new-board-column___label {
    display: flex;
    align-items: center;
  }
}
</style>
