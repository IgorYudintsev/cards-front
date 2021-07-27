import axios from "axios";

let instance = axios.create(
    {
        baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true
    }
)

export const AuthAPI = {
    getPing: () => {
        return instance.get('/ping')
    },

    authRegister(email: string, password: string) {
        return instance.post<RegistrationType>('/auth/register', {email: email, password: password})
    },
}


type RegistrationType = {
    addedUser: {}
    error?: string,
}