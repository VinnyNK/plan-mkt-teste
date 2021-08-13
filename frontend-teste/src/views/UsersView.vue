<template>
  <v-container>
   <v-row justify="center">
     <v-col cols="10">
       <TopActionsTable @on-search="sendSearch" />
     </v-col>
     <v-col cols="12" lg="11">
       <DataTableUsers :search="search" />
     </v-col>
   </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import DataTableUsers from "@/components/users/DataTableUsers.vue"
import TopActionsTable from "@/components/users/TopActionsTable.vue"

@Component({
  components: {TopActionsTable, DataTableUsers}
})
export default class UsersView extends Vue {
  private search = ''

  sendSearch(search: string): void {
    this.search = search
  }
}
</script>

<style scoped>

</style>
