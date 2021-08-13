<template>
  <v-dialog
      transition="dialog-top-transition"
      v-model="dialog"
      max-width="500"
  >
    <v-card :loading="loading">
      <v-card-title>
        Remover Usuário
      </v-card-title>
      <v-card-text>
        Certeza que deseja remove o usuário '{{ user.name }}' ?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            color="error"
            outlined
            rounded
            @click="remove(user)"
            :disabled="loading"
        >
          Remover
        </v-btn>
        <v-btn
            color="primary"
            rounded
            @click="closeDialog"
            :disabled="loading"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Emit, Watch, Vue, Prop} from "vue-property-decorator"
import {User} from "@/types/User";
import {Action} from "vuex-class";

@Component
export default class DialogDeleteUser extends Vue {
  private dialog = true
  private loading = false

  @Prop({ required: true, type: Object }) readonly user?: User

  @Action('User/deleteUser') deleteUser!: (user: User) => Promise<any>

  @Watch('dialog')
  dialogChanged(): void {
    this.closeDialog()
  }

  @Emit()
  closeDialog(): void {
    this.dialog = false
  }

  public remove(user: User): void {
    this.loading = true
    this.deleteUser(user)
    .then(() => {
      this.loading = false
      this.closeDialog()
    })
  }

}
</script>

<style scoped>

</style>
