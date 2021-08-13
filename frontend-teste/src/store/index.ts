import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/modules/UserModule";
import Users from "@/store/modules/UsersModule";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    Users
  }
})

export default store
