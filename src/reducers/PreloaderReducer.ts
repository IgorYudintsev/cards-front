let initialState = false
export const PreloaderReducer = (state = initialState, action: preloaderACType) => {
    switch (action.type) {
        case "ON-OFF": {
            return state = action.value
        }
        default:return state
    }
}

export type preloaderACType = ReturnType<typeof preloaderAC>
export const preloaderAC = (value: boolean) => {
    return {
        type: 'ON-OFF', value
    } as const

}