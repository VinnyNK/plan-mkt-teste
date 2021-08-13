import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Users from "@/views/UsersView.vue"
import User from "@/views/UserView.vue"
import NewUser from "@/views/NewUserView.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: Users
  },
  {
    path: '/usuario/novo',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/usuario/:id',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
