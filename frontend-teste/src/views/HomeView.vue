<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="12" sm="6" lg="4">
        <CardHome
            title="Usuários"
            subtitle="Gerenciamento de Usuários"
            icon="mdi-account-group"
            route="/usuarios"
        >
          <template #content>
            <v-btn rounded color="primary" small>
              Ver Usuários
            </v-btn>
          </template>
        </CardHome>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <CardHome title="Função não disponível" icon="mdi-block-helper" disable />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <CardHome title="Função não disponível" icon="mdi-block-helper" disable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import CardHome from "@/components/home/CardHome.vue"

  @Component({
    components: { CardHome }
  })
  export default class Home extends Vue {

  }
</script>
