<template>
  <div class="agile-board-page">
    <h1>Agile Board</h1>
    <div class="agile-board-page__sprint-selector">
      <div
        class="agile-board-page__backlog-btn"
        @click="setBacklogVisibility"
      >
        <material-icon :icon=" backlogVisibility ? 'visibility_off' : 'visibility' " />
      </div>
      <card-field-array
        v-model="selectedSprint"
        title="sprint"
        :options="possibleSprints"
      />
    </div>

    <div v-if="!getIsLoading">
      <agile-board-table
        v-if="getProjectboard"
        :board="getProjectboard"
      />
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import AgileBoardTable from '@/components/board/AgileBoardTable.vue'
import CardFieldArray from '@/components/card/CardFieldArray.vue'
import LoadingSpinner from '@/components/utils/loading/LoadingSpinner.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import { FieldArray, ProjectBoard, SprintOption } from '@/store/types'

@Component({
  components: {
    AgileBoardTable,
    CardFieldArray,
    MaterialIcon,
    LoadingSpinner
  }
})
export default class AgileBoardPage extends Vue {
  selectedSprint: string | null = null

  @Watch('selectedSprint', { immediate: true })
  setAndUpdateSelectedSprint (): void {
    const selectedSprint = this.selectedSprint ? this.selectedSprint : 'current'
    if (this.$route.params.selectedSprint !== selectedSprint) {
      this.updateSelectedSprint(selectedSprint)
      selectedSprint && this.$router.replace({ params: { selectedSprint } })
    }
    this.fetch()
  }

  get getProjectboard (): ProjectBoard {
    return this.$store.getters['board/getProjectBoard']
  }

  get getIsLoading (): boolean {
    return this.$store.getters['loading/getLoadingState']
  }

  get backlogVisibility (): boolean {
    return this.$store.getters['board/getBacklogVisibility']
  }

  setBacklogVisibility (): void {
    this.$store.commit('board/setBacklogVisibility', !this.backlogVisibility)
  }

  @Watch('getProjectboard')
  setSelectedSprint (): void {
    const savedSprint = this.getProjectboard.selectedSprint
    this.selectedSprint = savedSprint === 'current' ? null : savedSprint
  }

  get possibleSprints (): Array<FieldArray> {
    let sprints: Array<Partial<SprintOption>> = this.$store.getters['project/getPossibleSprints'](this.$route.params.boardId)
    if (sprints.length === 0) {
      return [{ value: null, label: 'No sprint' }]
    } else sprints = [{ id: null, name: 'No sprint' } as Partial<SprintOption>, ...sprints]

    return sprints.map((sprint: Partial<SprintOption>) => {
      return {
        value: sprint.id ? sprint.id : null,
        label: sprint.name ? sprint.name : ''
      }
    })
  }

  updateSelectedSprint (selectedSprint: string | null): void {
    const { boardId } = this.$route.params
    this.$store.dispatch('board/updateProjectBoard', { projectId: boardId, selectedSprint })
  }

  fetch (): void {
    this.$store.dispatch('board/fetchProjectBoard', this.$route.params.boardId)
  }

  mounted (): void {
    this.$store.commit('auth/setSelectedProject', this.$route.params.boardId)
  }
}
</script>

<style lang="scss">
  .agile-board-page {
    .agile-board-page__sprint-selector {
      display: flex;
      align-items: center;
      width: rem(250);
      margin-left: rem(10);

      .agile-board-page__backlog-btn {
        display: flex;
        margin-right: rem(5);
        padding: rem(8) rem(5) rem(9) rem(5);
        border: rem(1) solid $global__color--white;
        cursor: pointer;
      }

      .card-field-array {
        min-width: rem(164);
        padding-left: rem(10);
        border: rem(1) solid white;
        @media screen and (max-width: $global__breakpoint--mobile) {
          flex-direction: row;
        }

        .card-field-array__title {
          margin-bottom: 0;
          @media screen and (max-width: $global__breakpoint--mobile) {
            margin-bottom: 0;
          }
        }

        .card-field-array__value {
          color: $global__color--white;

          &:hover {
            color: $global__color--red2;
          }
        }

        &:hover {
          background-color: $global__color--grey_800;;
        }
      }

      .input-panel {
        color: $global__color--grey_800;
      }
    }
  }
</style>
