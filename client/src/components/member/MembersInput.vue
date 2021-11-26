<template>
  <div class="tr-members-input">
    <div class="tr-members-input__label">
      Members:
    </div>
    <div class="tr-members-input__input-wrapper">
      <input
        v-if="!isIntegratedInput"
        ref="inputContainer"
        v-model="filterValue"
        placeholder="Start typing..."
        class="tr-members-input__field"
      >
      <input-panel
        :show="filterValue.length > 0"
        :is-closeable="true"
        :container-el="inputContainer"
        @update:show="filterValue = ''"
      >
        <div>
          <input
            v-if="isIntegratedInput"
            v-model="filterValue"
            placeholder="Start typing..."
            class="tr-members-input__integrated-input"
          >
          <div
            v-if="filteredOptions.length === 0"
            class="tr-members-input__no-option"
          >
            No options found :(
          </div>
          <member-element
            v-for="member in filteredOptions"
            v-else
            :key="member._id"
            :member="member"
            @selectMember="addMember(member)"
          />
        </div>
      </input-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

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
  readonly possibleOptions!: Array<ProjectMember>

  @Prop({
    type: Array,
    default: ''
  })
  readonly members!: Array<ProjectMember>

  @Prop({
    type: Boolean,
    default: ''
  })
  readonly isIntegratedInput!: boolean

  filterValue = ''
  isSearching = false

  @Ref('inputContainer')
  readonly inputContainer!: HTMLDivElement

  get filteredOptions (): Array<ProjectMember> {
    const membersId = this.members.map(member => member ? member._id : '').join('')
    return this.possibleOptions.filter(option => {
      const concatenatedString = `${option.name}${option.email}`.toLowerCase().replace(' ', '')
      const isNotInMembers = !membersId.includes(option._id)
      return concatenatedString.includes(this.filterValue.toLowerCase()) && isNotInMembers
    })
  }

  addMember (member: ProjectMember): void {
    this.$emit('update', [...this.members, member])
  }

  removeMember (member: ProjectMember): void {
    this.$emit('update', this.members.filter(m => m._id !== member._id))
  }
}
</script>
<style lang="scss">
.tr-members-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: $global__color--grey_800;

  .tr-members-input__label {
    margin-bottom: 0.3125rem;
    color: inherit;
    font-size: 0.875rem;
    font-weight: bold;
  }

  .tr-members-input__input-wrapper {
    position: relative;
    width: 100%;

    .tr-members-input__field {
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
      max-height: rem(110);
      overflow: scroll;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      .tr-members-input__integrated-input {
        width: calc(100% - 20px);
        padding: 10px;
        border: 0;
        border-bottom: 1px solid black;
      }

      .tr-members-input__no-option {
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
