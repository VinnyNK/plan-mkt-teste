<template>
  <v-card
      :loading="loading"
      class="elevation-12"
  >
    <v-card-title>
      <p class="text-h4">
        {{ isEditable ? `Editar ${userNameLocal}` : `Informações de ${userNameLocal}` }}
      </p>
      <v-spacer/>
      <template v-if="!isEditable">
        <v-btn
            rounded
            color="warning"
            text
            @click="isEditable = !isEditable"
        >
          <v-icon left>mdi-pencil</v-icon>
          Editar
        </v-btn>
      </template>
      <template v-else>
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
            @click="saveUpdate"
        >
          <v-icon left>mdi-content-save</v-icon>
          Salvar
        </v-btn>
      </template>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" :disabled="!isEditable" v-model="formValid">
        <v-container fluid>
          <v-row justify="space-around">
            <v-col cols="12" sm="6" class="img-user">
              <v-img
                  :src="localUrlPhoto ? localUrlPhoto : user.photo"
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
              <v-row justify="start" class="form-user-info">
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
                <v-col cols="12" sm="8">
                  <v-file-input
                      chips
                      filled
                      label="Alterar Imagem"
                      truncate-length="30"
                      v-model="localPhoto"
                      @change="onFileChange"
                  ></v-file-input>
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
import { Action, Getter } from "vuex-class"
import { User } from "@/types/User"

@Component
export default class CardUserInformation extends Vue {
  private isEditable = false
  private loading = true
  private frontValidation = true
  private formValid = false
  private userNameLocal?: string = ''
  private localPhoto = null
  private localUrlPhoto? : string | null = null
  private rules = {
    required: (v: string): boolean | string => !!v || 'Campo é requerido',
    maxLength: (v: string, max: number): boolean | string => (v ? v.length <= max : true) || `Campo não pode ser maior que ${max} caracteres`,
    minLength: (v: string, min: number): boolean | string => (v ? v.length >= min : true) || `Campo não pode ser menor que ${min} caracteres`,
    validEmail: (v: string): boolean | string => /.+@.+\..+/.test(v) || 'Campo precisa ser um e-mail valido'
  }

  @Getter('User/user') user?: User

  @Action('User/fetchUser') fetchUser!: (userId: number) => Promise<any>

  @Action('User/updateUser') updateUser!: (updateUser: {id: number, data: any}) => Promise<any>

  created (): void {
    this.fetchUser(Number(this.$route.params.id))
    .then(() => {
      this.loading = false
      this.userNameLocal = this.user?.name
    })
    .catch(() => {
      this.$router.push({ name: 'Users' })
    })
  }

  public saveUpdate(): void {
    this.loading = true
    if (this.localPhoto && this.user) {
      this.user.photo = this.localPhoto
      this.localPhoto = null
    }
    this.updateUser({ id: Number(this.$route.params.id), data: this.user })
    .then(() => {
      this.localUrlPhoto = ''
      this.loading = false
      this.isEditable = false
    })
    .catch(() => {
      console.log(this.user)
      this.loading = false
    })
  }

  public onFileChange(): void {
    if (this.localPhoto) {
      this.localUrlPhoto = URL.createObjectURL(this.localPhoto)
    } else {
      this.localUrlPhoto = null
    }

  }
}
</script>

<style scoped>
.img-user {
  padding: 40px;
}
.form-user-info {
  padding-top: 30px;
}
</style>
