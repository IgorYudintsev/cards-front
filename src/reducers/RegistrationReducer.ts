import {Dispatch} from "redux";
import {AuthAPI, resDataAddedUserType} from "../API/AuthAPI";

let initialState: Array<string> = []
export const RegistrationReducer = (state = initialState, action: AuthRegisterACType) => {
    switch (action.type) {
        case 'AUTH-REGISTER': {
            let newState = [action.data,...state];
            console.log(newState)
            return newState;
        }
        default:
            return state
    }
}

type AuthRegisterACType = ReturnType<typeof AuthRegisterAC>
let AuthRegisterAC = (data: resDataAddedUserType) => {
    return {
        type: 'AUTH-REGISTER',
        data:data
    } as const
}

export let AuthRegisterThunk = (email: string, password: string, setError: (value: boolean) => void, setRedirect: (value: boolean) => void) => (dispatch: Dispatch) => {
    AuthAPI.authRegister(email, password)
        .then((res) => {
            console.log(res.data.addedUser)
            dispatch(AuthRegisterAC(res.data.addedUser))
            setRedirect(true)
            setError(false)
        })
        .catch((err) => {
            console.log(err)
            setError(true)
            setRedirect(false)
        })
}

export let RecoveryThunk=(email: string)=>(dispatch: Dispatch)=>{
    AuthAPI.recoveryPassword(email)
        .then((res)=>{
            console.log(res)
        })

}

export let SetNewPasswordThunk=(newPassword: string, token: string,setRedirect:(redirect:boolean)=>void,setError:(error:boolean)=>void)=>(dispatch:Dispatch)=>{
    AuthAPI.setNewPassword(newPassword ,token)
        .then((res)=>{
            setError(false)
            setRedirect(true)
            console.log(res)
        })
        .catch((err) => {
            setError(true)
            setRedirect(false)
            console.log(err)
        })
}



// export let AuthRegisterThunk = (email: string, password: string, setError: (value: boolean) => void, setRedirect: (value: boolean) => void) => async (dispatch: Dispatch) => {
//     try {
//         let res = AuthAPI.authRegister(email, password)
//         setError(false)
//         setRedirect(true)
//         console.log(res)
//     } catch {
//         setError(true)
//         setRedirect(false)
//     }
// }