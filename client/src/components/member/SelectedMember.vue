<template>
  <div class="selected-member">
    <tr-avatar :member="member" />
    <div class="selected-member__name">
      {{ member.name }} {{ '＜' + member.email + '＞' }}
    </div>
    <material-icon
      icon="clear"
      class="selected-member__icon"
      @click="removeMember"
    />
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
export default class SelectedMember extends Vue {
  @Prop({
    type: Object as () => ProjectMember,
    required: true
  })
  readonly member!: ProjectMember

  removeMember (): void {
    window.confirm(`Are you sure you want to remove ${this.member.name} from this project?`) &&
    this.$emit('remove', this.member)
  }
}
</script>

<style lang="scss">
.selected-member {
  display: flex;
  margin-right: rem(10);
  margin-bottom: rem(5);
  padding: rem(5) rem(10);
  border: rem(1) solid $global__color--grey_800;
  border-radius: rem(25);
  background-color: $global__color--white;
  box-shadow: 0 0.0625rem 0.1875rem rgb(0 0 0 / 12%), 0 0.0625rem 0.125rem rgb(0 0 0 / 24%);
  color: $global__color--grey_800;

  .selected-member__name {
    margin-left: rem(10);
  }

  .selected-member__icon {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
