import axios from "axios";

let instance = axios.create(
    {
        baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true
    }
)


const forgotMessage = `<div style="font-size: 1.2em; font-family: Calibri,sans-serif">` +
    `For password recovery click: <a href='https://neko-back.herokuapp.com/2.0/#/enter_new_password$token$'>here</a></div>`

export const AuthAPI = {
    getPing: () => {
        return instance.get('/ping')
    },

    authRegister(email: string, password: string) {
        return instance.post<RegistrationType>('/auth/register', {email: email, password: password})
    },
    recoveryPassword(email: string) {
        console.log(email)
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px"> To change your password, please follow the link:<a href='http://localhost:3000/newPas/$token$'>link</a></div>`
        }, {withCredentials: true})
    },

    setNewPassword(newPassword: string, token: string) {
        return instance.post('auth/set-new-password', {
                password: newPassword,
                resetPasswordToken: token
            },
        )
    },

}


type RegistrationType = {
    addedUser: resDataAddedUserType
    error?: string,
}

export type resDataAddedUserType = {
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: Date
    verified: boolean
    __v: number
    _id: string
}


