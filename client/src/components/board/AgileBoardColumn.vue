<template>
  <div class="agile-board-column">
    <!-- Outsource as an AgileBoardHeader component -->
    <div class="agile-board-header">
      <div class="agile-board-header__title">
        {{ header.name }}
      </div>
    </div>
    <div
      class="agile-board-container agile-board-drop-zone"
      :class="[ header.state ]"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <agile-board-ticket
        v-for="issue in orderedIssues"
        :key="issue._id"
        :issue="issue"
      />
      <div
        class="agile-board-column__add-new-card"
        @click="setNewCardModal(true)"
      >
        <material-icon icon="add" />
        <span class="agile-board-column__add-new-card__label">New card...</span>
      </div>
      <modal
        v-if="isNewCardOpen"
        v-model="isNewCardOpen"
      >
        <new-card
          :state="header.state"
          @closeModal="setNewCardModal(false)"
        />
      </modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import AgileBoardTicket from '@/components/board/AgileBoardTicket.vue'
import NewCard from '@/components/card/new/NewCard.vue'
import Modal from '@/components/modal/Modal.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import { AvailableColumn, GroupedIssues } from '@/store/types'

@Component({
  components: {
    AgileBoardTicket,
    MaterialIcon,
    NewCard,
    Modal
  }
})
export default class AgileBoardColumn extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly column!: Array<GroupedIssues>

  @Prop({
    type: Object as () => AvailableColumn,
    required: true
  })
  readonly header!: AvailableColumn

  isNewCardOpen = false

  setNewCardModal (val: boolean): void {
    this.isNewCardOpen = val
  }

  get orderedIssues (): Array<GroupedIssues> {
    return this.column.sort((a, b) => a.order > b.order ? 1 : -1)
  }

  onDrop (evt: DragEvent): void {
    if (evt.dataTransfer) {
      const issueId = evt.dataTransfer.getData('issueID')
      this.$store.commit('moveTicket', {
        boardId: this.$route.params.boardId,
        newState: this.header.state,
        issueId
      })
    }
  }
}
</script>

<style lang="scss">
.agile-board-column {
  display: flex;
  flex-direction: column;
  min-width: rem(256);
  background-color: $global__color--grey_800;

  h1 {
    position: sticky;
    top: 0;
  }

  .agile-board-header {
    display: flex;
    min-width: rem(150);
    min-height: rem(75);
    max-height: rem(75);
    padding: rem(10);
    background-color: $global__color--grey_800;
    color: $global__color--white;

    .agile-board-header__title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: rem(1) solid $global__color--white;
      font-weight: 600;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .agile-board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: rem(150);
    height: 100%;
    padding-bottom: rem(6);

    .agile-board-column__add-new-card {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      margin-left: rem(10);
      padding-bottom: rem(100);
      font-size: rem(10);
      cursor: pointer;

      .material-icons-outlined {
        font-size: rem(10);
      }

      .agile-board-column__add-new-card__label {
        display: none;
      }

      &:hover {
        color: $global__color--red2;

        .agile-board-column__add-new-card__label {
          display: block;
        }
      }
    }
  }

  .agile-board-drop-zone {
    margin-bottom: rem(10);
    padding: rem(10);
  }
}
</style>
