<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="Pesquisando..."
        :header-props="headerProps"
        :footer-props="footerProps"
        no-data-text="Nenhum resultado encontrado"
        class="elevation-12 data-table"
        :search="search"
        :custom-filter="filterTable"
        @click:row="userInfo"
      >
        <template #item.actions="{ item }">
          <v-icon
              color="error"
              @click.stop="removeUserAction(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template #footer.page-text="props">
          Usuários {{props.pageStart}} - {{props.pageStop}} de {{props.itemsLength}}
        </template>
      </v-data-table>
    </v-card>
    <DialogDeleteUser v-if="userRemove" :user="userRemove" @close-dialog="dialogClosed" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { Action, Getter } from "vuex-class"
import { User } from "@/types/User"
import DialogDeleteUser from "@/components/user/DialogDeleteUser.vue"

@Component({
  components: {DialogDeleteUser}
})
export default class DataTableUsers extends Vue {
  readonly headers = [
    { text: 'ID', align: 'center' , value: 'id' },
    { text: 'Nome', value: 'name'},
    { text: 'E-mail', value: 'email' },
    { text: 'Telefone', align: 'center', value: 'phone', sortable: false },
    { text: '', value: 'actions', sortable: false }
  ]
  readonly headerProps = {
    'sort-by-text': 'Ordenar Por'
  }
  readonly footerProps = {
    'items-per-page-options': [5, 10, 20],
    'items-per-page-text': 'Usuários por Pagina'
  }
  private loading = true
  private userRemove?: User | null = null

  @Prop() private search!: string

  @Getter('Users/users') users!: Array<User>

  @Action('Users/fetchUsers') fetchUsers!: () => Promise<any>

  created (): void {
    this.fetchUsers()
    .then(() => {
      this.loading = false
    })
  }

  public userInfo(user: User): void {
    this.$router.push({ name: 'User', params: { id: String(user.id) } })
  }

  public removeUserAction(user: User): void {
    this.userRemove = user
  }

  public dialogClosed(): void {
    this.userRemove = null
  }

  public filterTable (value: string, search: string): boolean {
    return value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
  }

}
</script>

<style scoped>
  .data-table {
    cursor: pointer !important;
  }
</style>
