<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">

      </v-col>
      <v-col cols="12" lg="11">
        <CardUserCreate />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import CardUserCreate from "@/components/user/CardUserCreate.vue"

@Component({
  components: {CardUserCreate}
})
export default class NewUserView extends Vue {

}
</script>

<style scoped>

</style>
