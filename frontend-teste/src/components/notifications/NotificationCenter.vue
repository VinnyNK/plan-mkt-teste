<template>
  <div class="notifications">
    <NotificationAlert
        v-for="(notification, i) in notifications"
        :key="i"
        :color="notification.color"
        :type="notification.type"
        :header="notification.header"
        :content="notification.content"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import NotificationAlert from "@/components/notifications/NotificationAlert.vue";
import Notification from '@/notification'

@Component({
  components: {NotificationAlert}
})
export default class NotificationCenter extends Vue {
  protected notifications: Array<any> = []

  created(): void {
    Notification.whenSend((notification: any) => {
      this.notifications.push(notification)
      setTimeout(() => {
        this.notifications.shift()
      }, 10000)
    })
  }
}
</script>

<style scoped>
  .notifications {
    width: 350px;
    margin: 70px 20px 20px;
    position:fixed;
    right: 0;
  }
</style>
