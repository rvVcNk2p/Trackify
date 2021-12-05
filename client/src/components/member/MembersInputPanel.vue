<template>
  <div class="members-input-panel">
    <div class="members-input-panel__input-wrapper">
      <input-panel
        :show="isOpen"
        :is-closeable="true"
        :class="[ position === 'top' ? 'input-panel--top' :'']"
        @update:show="$emit('close')"
      >
        <input
          v-model="filterValue"
          placeholder="Start typing..."
          class="members-input-panel__integrated-input"
        >
        <div
          v-if="filteredOptions.length === 0"
          class="members-input-panel__no-option"
        >
          No options found :(
        </div>
        <member-element
          v-for="member in filteredOptions"
          v-else
          :key="member._id"
          :is-short="true"
          :member="member"
          @selectMember="change(member)"
        />
      </input-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MemberElement from '@/components/member/MemberElement.vue'
import InputPanel from '@/components/utils/InputPanel.vue'
import { ProjectMember } from '@/store/types'

@Component({
  components: {
    InputPanel,
    MemberElement
  }
})
export default class TrMembersInput extends Vue {
  @Prop({
    type: Array,
    default: ''
  })
  readonly possibleMembers!: Array<ProjectMember>

  @Prop({
    type: Object as () => ProjectMember,
    default: null
  })
  readonly member!: ProjectMember

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isOpen!: boolean

  @Prop({
    type: String,
    default: 'bottom'
  })
  readonly position!: string

  filterValue = ''

  get filteredOptions (): Array<ProjectMember> {
    const memberId = this.member ? this.member._id : null
    const pMembers = this.possibleMembers
      .filter(member => member._id !== memberId)
      .filter(member => member.name.toLowerCase().includes(this.filterValue.toLowerCase()))
    if (this.member) {
      return [...pMembers, { _id: null, name: 'Unassigned', email: null, avatar: null }]
    } else return pMembers
  }

  change (member: ProjectMember): void {
    this.$emit('change', member._id ? member : null)
    this.filterValue = ''
  }
}
</script>
<style lang="scss">
.members-input-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: $global__color--grey_800;

  .members-input-panel__input-wrapper {
    position: relative;
    width: 100%;

    .members-input-panel__field {
      display: flex;
      width: calc(100% - 10px);
      margin-bottom: 0.625rem;
      color: #073b4c;
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }

    .input-panel {
      position: absolute;
      top: rem(24);
      max-height: rem(150);
      overflow: scroll;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      &.input-panel--top {
        top: rem(-135) !important;
        left: rem(-200);
        width: rem(210);
      }

      .members-input-panel__integrated-input {
        width: calc(100% - 20px);
        padding: 10px;
        border: 0;
        border-bottom: 1px solid black;
      }

      .members-input-panel__no-option {
        padding: rem(20);
        color: $global__color--grey_800;
        font-size: rem(24);
        font-weight: bold;
        text-align: center;
      }
    }
  }
}
</style>
