<template>
  <div class="selected-member-element">
    <selected-member
      v-for="member in members"
      :key="member._id"
      :member="member"
      @remove="$emit('remove', member)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import SelectedMember from '@/components/member/SelectedMember'
import { ProjectMember } from '@/store/types'

@Component({
  components: {
    SelectedMember
  }
})
export default class SelectedMemberList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly members!: Array<ProjectMember>
}
</script>

<style lang="scss">
.selected-member-element {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: rem(10);
}
</style>
