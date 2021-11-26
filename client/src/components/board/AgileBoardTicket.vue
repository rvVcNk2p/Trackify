<template>
  <div
    class="agile-board-issue drag-el"
    draggable
    @dragstart="startDrag($event)"
    @dblclick="openModal"
  >
    <div class="agile-board-issue__wrapper">
      <div class="agile-board-issue__header">
        <span class="agile-board-issue__header--id">{{ prefixedId }}</span> {{ issue.title }}
      </div>
      <div class="agile-board-issue__footer">
        <tr-avatar :member="issue.assignee" />
      </div>
    </div>

    <modal
      v-if="isOpen"
      v-model="isOpen"
    >
      <card :issue="issue" />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Card from '@/components/card/Card.vue'
import Modal from '@/components/modal/Modal.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { Issue } from '@/store/types'

@Component({
  components: {
    Modal,
    Card,
    TrAvatar
  }
})
export default class AgileBoardissue extends Vue {
  @Prop({
    type: Object as () => Issue,
    required: true
  })
  readonly issue!: Issue

  isOpen = false

  openModal (): void {
    this.isOpen = true
  }

  get projectPrefix (): string {
    const boardId = this.$route.params.boardId
    const prefix = this.$store.getters['project/getProjectPrefix'](boardId)
    if (prefix === null) {
      this.$store.dispatch('project/fetchProjects')
      return this.$store.getters['project/getProjectPrefix'](boardId)
    } else return prefix
  }

  get prefixedId (): string {
    return this.projectPrefix + '-' + this.issue.ticketNumber
  }

  startDrag (evt: DragEvent): void {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      if (this.issue._id) {
        evt.dataTransfer.setData('issueID', this.issue._id)
      }
    }
  }
}
</script>

<style lang="scss">
.agile-board-issue {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: rem(100);
  margin-top: rem(10);
  margin-bottom: rem(10);
  padding: rem(10);
  border-radius: rem(5);
  background-color: $global__color--grey_900;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: $global__color--white;
  cursor: pointer;

  .agile-board-issue__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: rem(205);
    height: 100%;
    padding: rem(5);

    .agile-board-issue__header {
      display: flex;
      align-items: baseline;
      color: $global__color--grey3;
      font-size: rem(14);
      font-weight: 400;
      cursor: default;

      .agile-board-issue__header--id {
        min-width: fit-content;
        margin-right: rem(5);
        color: $global__color--white;
        font-size: rem(16);
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: $global__color--red2;
          text-decoration: underline;
        }
      }
    }

    .agile-board-issue__footer {
      .tr-avatar__img {
        margin-left: 0;
      }
    }
  }
}

.drag-el {
  margin-bottom: rem(10);
  padding: rem(10);
}
</style>
