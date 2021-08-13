<template>
  <v-card
      height="200"
      outlined
      class="elevation-12"
      :to="route"
      :disabled="disable"
  >
    <div class="d-flex flex-no-wrap justify-space-between fill-height">
      <div>
        <v-card-title
            v-text="title"
            class="text-h6 text-lg-h4 text-break"
        />

        <v-card-subtitle v-text="subtitle" />

        <v-card-actions class="ma-3">
          <slot name="content" />
        </v-card-actions>
      </div>

      <v-icon class="ma-3" size="100" v-text="icon"/>

    </div>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class CardHome extends Vue {
  @Prop(String) readonly route?: string
  @Prop({ required: true, type: String }) readonly title?: string
  @Prop(String) readonly subtitle?: string
  @Prop({ required: true, type: String }) readonly icon?: string
  @Prop({ default: false, type: Boolean }) readonly disable?: boolean
}
</script>

<style scoped>

</style>
