<template>
  <div
    class="member-element"
    @click="$emit('selectMember', member)"
  >
    <tr-avatar :member="member" />
    <div class="member-element__name">
      {{ member.name }} {{ '＜' + member.email + '＞' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { ProjectMember } from '@/store/types'

@Component({
  components: {
    TrAvatar,
    MaterialIcon
  }
})
export default class MemberElement extends Vue {
  @Prop({
    type: Object as () => ProjectMember,
    required: true
  })
  readonly member!: ProjectMember
}
</script>

<style lang="scss">
.member-element {
  display: flex;
  padding: rem(10) rem(20);
  border-bottom: rem(1) solid $global__color--grey_800;
  background-color: $global__color--white;
  color: $global__color--grey_800;
  cursor: pointer;

  &:hover {
    background-color: $global__color--grey;
  }

  .member-element__name {
    margin-left: rem(10);
  }

  &:last-child {
    margin-right: 0;
    border-bottom: 0;
  }
}
</style>
