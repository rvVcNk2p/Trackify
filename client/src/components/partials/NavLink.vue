<template>
  <router-link
    :key="navLink.label"
    :to="{ name: navLink.name, params: navLink.params }"
    class="nav-link"
    @click.native="logOut"
  >
    <material-icon
      v-if="navLink.icon"
      :icon="navLink.icon"
      class="nav-link__icon"
    />
    {{ navLink.label }}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import { NavLink as NavLinkType } from '@/store/types'

@Component({
  components: {
    MaterialIcon
  }
})
export default class NavLink extends Vue {
  @Prop({
    type: Object as () => NavLinkType,
    required: true
  })
  readonly navLink!: NavLinkType

  logOut (): void {
    if (this.navLink.icon === 'logout') {
      this.$store.commit('auth/setToken', null)
      this.$router.push({ name: 'login' })
      this.$store.dispatch('notification/createNotification', {
        message: 'Bye bye, you are now logged out!',
        type: 'success'
      })
    }
  }
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

  .nav-link__icon {
    margin-right: rem(8);
  }

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
