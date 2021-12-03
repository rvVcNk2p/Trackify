<template>
  <div class="snack-bar-list">
    <div
      v-if="snacks.length > 0"
      class="snack-bar-list__content"
    />
    <snack-bar
      v-for="snack in snacks"
      :key="snack.id"
      :snack="snack"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SnackBar from '@/components/snackbar/SnackBar.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { Snackbar as SnackBarType } from '@/store/types'

@Component({
  components: {
    TrAvatar,
    MaterialIcon,
    SnackBar
  }
})
export default class SnackBarList extends Vue {
  get snacks (): Array<SnackBarType> {
    return this.$store.getters['snack/getSnacks'] || []
  }
}
</script>

<style lang="scss">
.snack-bar-list {
  display: flex;
  position: fixed;
  z-index: 9999;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: transparent;
}
</style>
