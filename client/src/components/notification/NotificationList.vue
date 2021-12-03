<template>
  <div class="notification-list">
    <div
      v-if="notifications.length > 0"
      class="notification-list__content"
    />
    <notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Notification from '@/components/notification/Notification.vue'
import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { Notification as NotificationType } from '@/store/types'

@Component({
  components: {
    TrAvatar,
    MaterialIcon,
    Notification
  }
})
export default class NotificationList extends Vue {
  get notifications (): Array<NotificationType> {
    return this.$store.getters['notification/getNotifications'] || []
  }
}
</script>

<style lang="scss">
.notification-list {
  display: flex;
  position: fixed;
  z-index: 9999;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: transparent;
}
</style>
