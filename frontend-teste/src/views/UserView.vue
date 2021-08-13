<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
      </v-col>
      <v-col cols="12" lg="11">
        <CardUserInformation />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import CardUserInformation from "@/components/user/CardUserInformation.vue"

@Component({
  components: {CardUserInformation}
})
export default class UserView extends Vue {
}
</script>

<style scoped>

</style>
