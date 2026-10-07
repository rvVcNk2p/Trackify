<template>
  <div class="tr-avatar">
    <img
      class="tr-avatar__img"
      :src="member && member.avatar ? member.avatar : unassignedUserImg"
      alt=""
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import unassignedUserImg from '@/assets/images/unassigned_user.jpeg'
import { ProjectMember } from '@/store/types'

@Component
export default class TrAvatar extends Vue {
  @Prop({
    type: Object as () => ProjectMember
  })
  readonly member!: ProjectMember | null

  unassignedUserImg = unassignedUserImg
}
</script>

<style lang="scss">
.tr-avatar {
  display: flex;

  .tr-avatar__img {
    width: rem(24);
    height: rem(24);
    margin-left: rem(5);
    border-radius: $global__radius--small;
  }
}
</style>
