<template>
  <div
    class="project-card"
    v-on="$listeners"
  >
    <div class="project-card__container">
      <div class="project-card__thumbnail">
        <img
          class="project-card__thumbnail-img"
          :src="project.imgUrl || 'https://art.pixilart.com/d04bd8b33083cb4.png'"
          alt=""
        >
      </div>
      <div class="project-card__information">
        <div class="project-card__information-title">
          {{ project.name || 'Trackify - Development' }}
        </div>
        <div class="project-card__information-description">
          {{ project.description || 'Short description about your project' }}
        </div>
      </div>
    </div>

    <div class="project-card__members">
      <div class="project-card__members-avatar">
        <tr-avatar
          v-for="member in project.members"
          :key="member._id + project._id"
          :member="member"
        />
      </div>
      <material-icon
        v-if="!isPreview"
        class="project-card__settings"
        icon="settings"
        @click.stop="setEditableId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { Project } from '@/store/types'

@Component({
  components: {
    TrAvatar,
    MaterialIcon
  }
})
export default class ProjectCard extends Vue {
  @Prop({
    type: Object as () => Project,
    required: true
  })
  readonly project!: Project

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isPreview!: boolean

  setEditableId (): void {
    this.$emit('setEditableProjectId', this.project._id)
  }
}
</script>

<style lang="scss">
.project-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: rem(10);
  padding: 1rem;
  border-radius: $global__radius--small;
  background-color: $global__color--white;
  box-shadow: 0 rem(1) rem(3) rgba(0, 0, 0, 0.12), 0 rem(1) rem(2) rgba(0, 0, 0, 0.24);
  color: $global__color--grey_800;
  cursor: pointer;

  &:hover {
    background-color: $global__color--grey;
  }

  .project-card__container {
    display: flex;
    flex-direction: row;

    .project-card__thumbnail {
      .project-card__thumbnail-img {
        width: rem(48);
        height: rem(48);
      }
    }

    .project-card__information {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: rem(10);

      .project-card__information-title {
        margin-bottom: rem(0.5);
        font-size: rem(18);
        font-weight: bold;
      }

      .project-card__information-description {
        margin-bottom: rem(1);
        font-size: rem(14);
      }
    }
  }

  .project-card__members {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .project-card__members-avatar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .project-card__settings {
      margin-left: rem(10);
    }
  }
}
</style>
