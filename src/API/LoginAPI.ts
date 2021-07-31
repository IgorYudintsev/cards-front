import axios from "axios";

let instance = axios.create(
    {
        baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true
    }
)

export const LoginAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginResponseType>('/auth/login', {...data})
    },
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean
    _v: number
    _id: string
    avatar?: string
    error?: string
}

