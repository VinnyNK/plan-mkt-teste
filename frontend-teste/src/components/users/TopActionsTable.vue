<template>
  <v-row justify="space-between">
    <v-col cols="12" sm="4">
      <v-btn
          rounded
          color="primary"
          x-large
          :to="{ name: 'NewUser'}"
      >
        Adicionar Usuário
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
          hide-details
          label="Pesquisa por Nome/E-mail"
          solo-inverted
          rounded
          clearable
          v-model="search"
          @change="onSearch"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator"

@Component
export default class TopActionsTable extends Vue {
  private search = ''

  @Emit()
  onSearch(): string {
    return this.search
  }
}
</script>

<style scoped>

</style>
