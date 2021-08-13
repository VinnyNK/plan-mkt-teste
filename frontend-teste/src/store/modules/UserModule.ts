import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"
import UserDataService from "@/services/UserDataService"
import {User} from "@/types/User"
import Notification from "@/notification"

@Module({ namespaced: true })
class UserModule extends VuexModule {
    public _user: User = {
        id: 0,
        email: "",
        name: "",
        phone: 0,
        photo: ""
    }

    get user(): User {
        return this._user
    }

    @Mutation
    public setUser(user: User): void {
        this._user = user
    }

    @Action
    public fetchUser(id: number): Promise<any> {
        return UserDataService.get(id)
            .then(response => {
                this.context.commit('setUser', response.data.data)
            })
    }

    @Action
    public createUser(data: any): Promise<any> {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        return UserDataService.create(formData)
            .then(response => {
                this.context.commit('setUser', response.data.data)
                Notification.send(response.data.message, '', 'success')
            })
    }

    @Action
    public updateUser(updateUser: {id: number, data: any}): Promise<any> {
        if (!(updateUser.data.photo instanceof File)) {
            delete updateUser.data.photo
        }
        const formData = new FormData()
        Object.keys(updateUser.data).forEach(key => formData.append(key, updateUser.data[key]))
        return UserDataService.update(updateUser.id, formData)
            .then(response => {
                this.context.commit('setUser', response.data.data)
                Notification.send(response.data.message, '', 'success')
            })
    }

    @Action
    public deleteUser(user: User): Promise<any> {
        return UserDataService.delete(user.id || 0)
            .then((response) => {
                this.context.commit('Users/removeUser', user, { root:true })
                Notification.send(response.data.message, '', 'success')
            })
    }
}

export default UserModule
