<template>
  <v-alert
      border="left"
      dismissible
      prominent
      :color="color"
      :type="type"
      :icon="icon"
  >
    <div class="header"><b>{{ header }}</b></div>
    <div>{{ content }}</div>
  </v-alert>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class NotificationAlert extends Vue {
  @Prop({required: true, type: String}) readonly type?: string
  @Prop({type: String}) readonly color?: string
  @Prop({type: String}) readonly icon?: string
  @Prop({required: true, type: String}) readonly header?: string
  @Prop({required: true, type: String}) readonly content?: string
}
</script>

<style scoped>
.header {
  display: block;
}
</style>
