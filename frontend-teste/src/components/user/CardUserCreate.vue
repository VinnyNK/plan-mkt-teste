<template>
  <v-card
      :loading="loading"
      class="elevation-12"
  >
    <v-card-title>
      <p class="text-h4">
        Novo Usuário
      </p>
      <v-spacer/>
      <v-checkbox
          v-model="frontValidation"
          label="Validação dos campos"
      />

      <v-btn
          rounded
          color="success"
          text
          :disabled="!formValid && frontValidation"
          :loading="loading"
          @click="saveUser"
      >
        <v-icon left>mdi-content-save</v-icon>
        Criar
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="formValid">
        <v-container fluid>
          <v-row justify="space-around">
            <v-col cols="12" sm="6" class="img-user">
              <v-file-input
                  chips
                  filled
                  label="Selecionar Imagem do Usuário"
                  truncate-length="30"
                  :rules="[rules.required]"
                  v-model="user.photo"
                  @change="onFileChange"
              ></v-file-input>
              <v-img
                  :src="photoPreview"
                  max-height="300"
                  contain
              >
                <template v-slot:placeholder>
                  <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                  >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="12" sm="6">
              <v-row justify="space-around" class="form-user-info">
                <v-col cols="12">
                  <v-text-field
                      label="Nome"
                      filled
                      v-model="user.name"
                      :rules="[rules.required]"
                      required
                  />
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                      label="E-mail"
                      filled
                      v-model="user.email"
                      :rules="[rules.required, rules.validEmail]"
                      required
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                      label="Telefone"
                      filled
                      v-model="user.phone"
                      :rules="[rules.required]"
                      required
                  />
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                      label="Alterar Senha"
                      placeholder="Digite Nova Senha"
                      filled
                      v-model="user.password"
                      type="password"
                      :rules="[(v) => { return rules.minLength(v, 8)}]"
                      required
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Action, Getter } from "vuex-class";
import { User } from "@/types/User";

@Component
export default class CardUserCreate extends Vue {
  private user: User = {
    email: "", name: "", password: "", photo: null
  }
  private loading = false
  private frontValidation = true
  private formValid = false
  private photoPreview = ''
  readonly rules = {
    required: (v: string): boolean | string => !!v || 'Campo é requerido',
    maxLength: (v: string, max: number): boolean | string => (v ? v.length <= max : true) || `Campo não pode ser maior que ${max} caracteres`,
    minLength: (v: string, min: number): boolean | string => (v ? v.length >= min : true) || `Campo não pode ser menor que ${min} caracteres`,
    validEmail: (v: string): boolean | string => /.+@.+\..+/.test(v) || 'Campo precisa ser um e-mail valido'
  }

  @Getter('User/user') userStore!: User

  @Action('User/createUser') createUser!: (user: User) => Promise<any>

  public saveUser(): void {
    this.loading = true
    this.createUser(this.user)
    .then(() => {
      this.loading = false
      this.$router.push({ name: 'User', params: { id: String(this.userStore.id) } })
    })
    .catch(() => {
      this.loading = false
    })
  }

  public onFileChange(): void {
    if (this.user.photo) {
      this.photoPreview = URL.createObjectURL(this.user.photo)
    } else {
      this.photoPreview = ''
    }

  }
}
</script>

<style scoped>

</style>
