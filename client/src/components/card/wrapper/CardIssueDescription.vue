/* eslint-disable vue/no-v-html */
<template>
  <div class="card-issue-description">
    <div v-show="!isEditing">
      <div class="card-issue-description__title">
        {{ title }}
      </div>
      <div
        v-show="!isEditing"
        class="ql-editor card-issue-description__container"
        v-html="description"
      />
    </div>
    <div
      v-show="isEditing"
      class="card-issue-description__editors"
    >
      <input
        v-model="defaultTitle"
        type="text"
        class="card-issue-description__editors-title"
      >
      <vue-editor
        v-model="defaultDescription"
        class="card-issue-description__editors-editor"
        :editor-toolbar="customToolbar"
      />
      <slot />
      <div class="card-issue-description__editors__actions">
        <button
          class="card-issue-description__editors__save"
          @click="updateData(true)"
        >
          Apply changes
        </button>
        <button
          class="card-issue-description__editors__cancel"
          @click="updateData(false)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VueEditor } from 'vue2-editor'

@Component({
  components: {
    VueEditor
  }
})
export default class CardIssueDescription extends Vue {
  @Prop({
    type: String,
    default: null
  })
  readonly title!: string

  @Prop({
    type: String,
    default: null
  })
  readonly description!: string

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isEditing!: string

  customToolbar = [
    [{ header: [false, 1, 2, 3] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', 'link', 'image'],
    [{ list: 'bullet' }, { list: 'ordered' }, { list: 'check' }]
  ]

  defaultTitle: string | null = null
  defaultDescription: string | null = null

  @Watch('isEditing')
  setEditableInputs ():void {
    this.defaultTitle = this.title
    this.defaultDescription = this.description
  }

  updateData (val: boolean):void {
    const action = val ? 'save' : 'reset'
    this.$emit('update', { title: this.defaultTitle, description: this.defaultDescription, action })
  }
}
</script>

<style lang="scss">
.card-issue-description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .card-issue-description__title {
    display: flex;
    margin-top: rem(10);
    color: $global__color--blue;
    font-size: rem(24);
    font-weight: 600;
    text-align: left;
  }

  .card-issue-description__container {
    min-height: rem(100);
    margin: rem(10) 0 rem(20) 0;
    padding: 0;
  }

  .card-issue-description__editors {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 100%;

    .card-issue-description__editors-title {
      display: flex;
      width: 98.5%;
      margin-top: rem(10);
      margin-bottom: rem(10);
      color: $global__color--blue;
      font-size: rem(24);
      font-weight: 600;
      text-align: left;
    }

    .card-issue-description__editors-editor {
      width: 100%;
      margin-bottom: rem(5);

      .ql-editor {
        min-height: rem(215);
        background-color: $global__color--white;
      }
    }

    .card-issue-description__editors__actions {
      margin-top: rem(10);

      .card-issue-description__editors__save,
      .card-issue-description__editors__cancel {
        padding: rem(5) rem(10);
        border: rem(1) solid $global__color--grey_800;
        border-radius: rem(6);
        background-color: $global__color--grey_800;
        font-family: $global__font-family;
        cursor: pointer;
      }

      .card-issue-description__editors__save {
        margin-right: rem(10);
        color: $global__color--white;

        &:hover {
          opacity: 0.8;
        }
      }

      .card-issue-description__editors__cancel {
        background-color: transparent;
        color: $global__color--grey_800;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

.ql-toolbar.ql-snow {
  padding: 0 !important;
  padding: rem(5) 0 !important;
  font-family: $global__font-family !important;

  .ql-picker-label {
    display: flex;
  }

  .ql-formats {
    margin-right: rem(10) !important;
    margin-bottom: 0 !important;

    &:last-child {
      margin-right: 0 !important;
    }

    .ql-bold,
    .ql-italic,
    .ql-underline,
    .ql-strike,
    button {
      padding: 0;

      svg {
        height: rem(14) !important;
      }
    }
  }
}
</style>
