import http from "@/http-commons"
import Notification from "@/notification"
import {AxiosResponse} from "axios";

class UserDataService {
    getAll(): Promise<any> {
        return http.get(`/users`)
            .catch(err => {
                badRequestNotifications(err.response)
            })
    }

    get(id: number): Promise<any> {
        return http.get(`/users/${id}`)
            .catch(err => {
                badRequestNotifications(err.response)
            })
    }

    create(data: FormData): Promise<any> {
        return http.post('/users', data, { headers: {'Content-Type': 'multipart/form-data' }})
            .catch(err => {
                badRequestNotifications(err.response)
            })
    }

    update(id: number, data: FormData): Promise<any> {
        data.append('_method', 'PUT')
        return http.post(`/users/${id}`, data,{ headers: {'Content-Type': 'multipart/form-data' }})
            .catch(err => {
                badRequestNotifications(err.response)
            })
    }

    delete(id: number): Promise<any> {
        return http.delete(`/users/${id}`)
            .catch(err => {
                badRequestNotifications(err.response)
            })
    }
}

const badRequestNotifications = (errResponse: AxiosResponse) => {
    if (errResponse.status === 400) {
        if (typeof errResponse.data.data === 'object') {
            Object.keys(errResponse.data.data).forEach(attr => Notification.send(errResponse.data.message, `${attr}: ${errResponse.data.data[attr].join('\n')}`, 'error'))
            errResponse.data.data.forEach((data: string, index: string) => Notification.send(errResponse.data.message, `${index}: ${data}`, 'error'))
        } else {
            Notification.send(errResponse.data.message, errResponse.data.data, 'error')
        }
    } else {
        Notification.send(errResponse.data.message, errResponse.data.data, 'error')
    }
}

export default new UserDataService()
