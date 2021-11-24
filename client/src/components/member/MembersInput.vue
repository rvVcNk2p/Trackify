<template>
  <div class="tr-members-input">
    <div class="tr-members-input__label">
      Members:
    </div>
    <div class="tr-members-input__input-wrapper">
      <input
        ref="inputContainer"
        v-model="filterValue"
        placeholder="Start typing... after 3 characters, options will appears"
        class="tr-members-input__field"
      >
      <input-panel
        :show="filterValue.length > 0"
        :is-closeable="true"
        :container-el="inputContainer"
        @update:show="filterValue = ''"
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
      </input-panel>

      <!-- // TODO - Bubble options -->
      {{ members }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

import InputPanel from '@/components/utils/InputPanel.vue'
import { ProjectMember } from '@/store/types'

import MemberElement from './MemberElement.vue'

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
  possibleOptions!: Array<ProjectMember>

  @Prop({
    type: Array,
    default: ''
  })
  members!: Array<ProjectMember>

  filterValue = ''

  @Ref('inputContainer')
  readonly inputContainer!: HTMLDivElement

  isSearching = false

  get filteredOptions (): Array<ProjectMember> {
    return this.possibleOptions.filter(option => {
      const concatenatedString = `${option.name}${option.email}`.toLowerCase().replace(' ', '')
      return concatenatedString.includes(this.filterValue.toLowerCase()) && !this.members.includes(option)
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
      padding: rem(10);
      overflow: scroll;

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
