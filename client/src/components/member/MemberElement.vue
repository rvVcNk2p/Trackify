<template>
  <div
    class="member-element"
    @click="$emit('selectMember', member)"
  >
    {{ member.name }} - {{ member.email }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import InputPanel from '@/components/utils/InputPanel.vue'
import { ProjectMember } from '@/store/types'

@Component({
  components: {
    InputPanel
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
  color: $global__color--red;
  text-align: left;
}
</style>
