<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mt-1"
          contain
          width="250"
          src="./assets/logo.png"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" style="margin-left: 20px">
        <v-btn
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            elevation="3"
            fab
            icon
        >
          <v-icon>
            mdi-theme-light-dark
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        expand-on-hover
        bottom
        app
        clipped
    >
      <v-list shaped>
        <v-list-item link :to="{name: 'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-multiple">
          <template #activator>
            <v-list-item>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item link :to="{name: 'Users'}">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lista de Usuários
            </v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{name: 'NewUser'}">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Adicionar Usuário
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <NotificationCenter />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import NotificationCenter from "@/components/notifications/NotificationCenter.vue"

@Component({
  components: { NotificationCenter }
})
export default class App extends Vue {

}

</script>
