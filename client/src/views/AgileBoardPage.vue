<template>
  <div class="agile-board-page">
    <h1>Agile Board</h1>
    <agile-board-table
      v-if="getProjectboard"
      :board="getProjectboard"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AgileBoardTable from '@/components/board/AgileBoardTable.vue'
import { ProjectBoard } from '@/store/types'

@Component({
  components: {
    AgileBoardTable
  }
})
export default class AgileBoardPage extends Vue {
  get getProjectboard (): ProjectBoard {
    const { boardId } = this.$route.params
    return this.$store.getters['project/getProjectBoard'](boardId)
  }
}
</script>
