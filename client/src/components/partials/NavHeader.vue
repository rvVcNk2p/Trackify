<template>
  <div class="nav-header">
    <nav class="nav-header__wrapper">
      <div class="nav-header__main-links">
        <div
          v-for="link in navLinks.main"
          :key="link.label"
          class="nav-header__item"
        >
          <nav-link :nav-link="link" />
        </div>
      </div>
      <div class="nav-header__auth-links">
        <div
          v-for="link in navLinks.auth"
          :key="link.label"
          class="nav-header__item"
        >
          <nav-link :nav-link="link" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { NavLink as NavLinkType } from '@/store/types'

import NavLink from './NavLink.vue'

@Component({
  components: {
    NavLink
  }
})
export default class LayoutNavHeader extends Vue {
  get selectedBoard (): string {
    return this.$store.state.auth.selectedBoard
  }

  get navLinks (): Array<NavLinkType> {
    return this.$store.getters['auth/getNavLinks']
  }
}
</script>

<style lang="scss">
.nav-header {
  width: 100%;
  background-color: $global__color--grey_900;

  .nav-header__wrapper {
    display: flex;
    justify-content: space-between;
    max-width: rem(1180);
    margin: 0 auto;
    padding-left: rem(10);
    background-color: $global__color--grey_900;

    .nav-header__auth-links,
    .nav-header__main-links {
      display: flex;
      align-items: center;

      .nav-header__item {
        min-width: fit-content;
        margin-right: rem(25);

        &:last-child {
          margin-right: rem(5);
        }
      }
    }
  }
}
</style>
