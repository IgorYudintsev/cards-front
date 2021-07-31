import {Dispatch} from "redux";
import {AuthAPI, resDataAddedUserType} from "../API/AuthAPI";

let initialState: string = ''
export const ButtonReducer = (state = initialState, action: generalType) => {
    switch (action.type) {
        case 'SET-REDIRECT': {
            let newState = state;
            newState = action.redirect
            return newState;
        }

        default:
            return state
    }
}
type generalType=ButtonACType

type ButtonACType = ReturnType<typeof ButtonAC>
export let ButtonAC = (redirect: string) => {
    return {
        type: 'SET-REDIRECT',
        redirect
    } as const
}




