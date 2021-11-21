<template>
  <router-link
    :key="navLink.label"
    class="nav-link"
    :to="navLink.path"
  >
    {{ navLink.label }}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { NavLink as NavLinkType } from '@/store/types'

@Component
export default class NavLink extends Vue {
  @Prop({
    type: Object as () => NavLinkType,
    required: true
  })
  readonly navLink!: NavLinkType
}
</script>

<style lang="scss">
.nav-link {
  display: inline-flex;
  position: relative;
  align-items: center;
  padding: rem(16) rem(4);
  background-color: $global__color--grey_900;
  color: $global__color--white;
  font-family: $global__font-family;
  font-size: rem(14);
  font-style: normal;
  font-weight: 600;
  line-height: rem(16.8);
  text-decoration: none;

  &.router-link-active {
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: rem(4);
      border-radius: rem(2);
      background-color: $global__color--white;
    }
  }
}
</style>
