import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"
import UserDataService from "@/services/UserDataService";
import {User} from "@/types/User";

@Module({ namespaced: true })
class UsersModule extends VuexModule {
    public _users: Array<User> = []

    get users(): Array<User> {
        return this._users
    }

    @Mutation
    public setUsers(users: Array<User>): void {
        this._users = users
    }

    @Mutation
    public addUser(user: User): void {
        this._users.push(user)
    }

    @Mutation
    public removeUser(user: User): void {
        this._users.splice(this._users.indexOf(user), 1)
    }

    @Action
    public fetchUsers(): Promise<any> {
        return UserDataService.getAll()
            .then(response => {
                this.context.commit('setUsers', response.data.data)
            })
    }
}

export default UsersModule
