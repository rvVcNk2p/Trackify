<template>
  <div class="agile-board-table">
    <div class="agile-board-table__columns">
      <agile-board-column
        v-for="column in orderedColumns"
        :key="column.state"
        :header="column"
        :column="groupedIssuesByState[column.state] || []"
      />
      <new-board-column />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import AgileBoardColumn from '@/components/board/AgileBoardColumn.vue'
import NewBoardColumn from '@/components/board/NewBoardColumn.vue'
import { AvailableColumn, GroupedIssues, ProjectBoard } from '@/store/types'

@Component({
  components: {
    AgileBoardColumn,
    NewBoardColumn
  }
})
export default class AgileBoardTable extends Vue {
  @Prop({
    type: Object as () => ProjectBoard,
    required: true
  })
  readonly board!: ProjectBoard

  get orderedColumns (): Array<AvailableColumn> {
    return this.board.availableColumns.sort((a, b) => a.order - b.order)
  }

  get groupedIssuesByState (): GroupedIssues | Array<GroupedIssues> {
    if (this.board.issues) {
      return this.board.issues?.reduce<GroupedIssues>((acc, nextVal) => {
        const state = nextVal.state
        if (state) {
          if (!Object.hasOwnProperty.call(acc, state)) {
            acc[state] = [nextVal]
          } else {
            acc[state].push(nextVal)
          }
        }
        return acc
      }, {})
    } else return []
  }
}
</script>

<style lang="scss">
.agile-board-table {
  display: flex;
  flex-direction: column;
  overflow-x: scroll;

  .agile-board-table__columns {
    display: flex;
    min-height: 100vh;
  }
}
</style>
