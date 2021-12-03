<template>
  <div class="app">
    <nav-header />
    <router-view />
    <snack-bar-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import NavHeader from '@/components/partials/NavHeader.vue'
import SnackBarList from '@/components/snackbar/SnackBarList.vue'
import setAuthToken from '@/utils/auth'

@Component({
  components: {
    NavHeader,
    SnackBarList
  }
})
export default class App extends Vue {
  async mounted (): Promise<void> {
    localStorage.token && setAuthToken(localStorage.token)
    this.$store.dispatch('auth/loadUser')
  }
}
</script>

<style lang="scss">
.app {
  background-color: $global__color--grey_800;
  color: $global__color--white;
  font-family: $global__font-family;
  text-align: center;
}

body {
  margin: 0;
}
</style>
