import {Dispatch} from "redux";
import {AuthAPI} from "../API/AuthAPI";
import {LoginAPI, LoginResponseType} from "../API/LoginAPI";
import {log} from "util";

let  initialState: Array<LoginResponseType> = []
export const LoginReducer = (state = initialState, action: generalType): Array<LoginResponseType> => {
    switch (action.type) {
        case 'AUTH-LOGIN': {
            let newState = [...state]
            // console.log(newState)
            return newState = [action.data]
        }
        case "LOG-OUT":{
            let newState = [...state]
            newState=[]
            console.log(newState)
            return newState
        }

        default:
            return state
    }
}
type generalType = LogOutACType | AuthLoginACType

type AuthLoginACType = ReturnType<typeof AuthLoginAC>
export const AuthLoginAC = (data: LoginResponseType) => {
    return {
        type: 'AUTH-LOGIN',
        data
    } as const
}

export let AuthLoginThunk = (email: string, password: string, rememberMe: boolean, setError: (value: boolean) => void) => (dispatch: Dispatch) => {
    LoginAPI.login({email, password, rememberMe})
        .then((res) => {
            // setRedirect(true)
            setError(false)
            dispatch(AuthLoginAC(res.data))
        })
        .catch((err) => {
            setError(true)
            // setRedirect(false)
            console.log(err)
        })
}

type LogOutACType = ReturnType<typeof LogOutAC>
export const LogOutAC = () => {
    return {
        type: 'LOG-OUT',
    } as const
}

export let LogOutThunk = () => (dispatch: Dispatch) => {
    LoginAPI.logout()
        .then((res) => {
            console.log(res)
            dispatch(LogOutAC())
        })
}