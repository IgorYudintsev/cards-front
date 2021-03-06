import {Dispatch} from "redux";
import {CardPacksType, CardsApi, SearchParamsType, userType} from "../API/CardsApi";
import {preloaderAC} from "./PreloaderReducer";

let initialState = {
    cardPacks: [] as Array<userType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 10,
}
export type InitialCardsPackReducerType = typeof initialState
export const CardsPackReducer = (state = initialState, action: GeneralType) => {
    switch (action.type) {
        case 'GET-CARDS-PACK': {
            let newState = {...state};
            newState = action.cardPacks
            return newState;
        }
        case "CREATE-CARDS-PACK": {
            return {
                ...state,
                cardPacks: [action.cardPacks, ...state.cardPacks]
            }
        }
        case "DELETE-CARDS-PACK": {
            let newState = {...state}
            console.log(newState)
            // return newState.cardPacks.filter(f => f._id !== action.id)
            return {
                ...state,
                cardPacks: state.cardPacks.filter(f=>f._id!==action.id)
            }
            // return newState
        }
        case "GET-CARDS-PACK-PAGINATION": {
            return {...state} = action.data
        }
        default:
            return state
    }
}

type GeneralType = getCardsPackACType | AddNewCardsPackACType | getCardsPackForPaginationACType | DeleteCardsPackACType

type getCardsPackACType = ReturnType<typeof getCardsPackAC>
const getCardsPackAC = (cardPacks: CardPacksType) => {
    return {type: 'GET-CARDS-PACK', cardPacks} as const
}

export const getCardsPackThunk = (data: { cardsPack: CardPacksType, pageCount: number, packName?: string, min?: number, max?: number }) => (dispatch: Dispatch) => {
    dispatch(preloaderAC(true))
    CardsApi.GETCardsPack(data)
        .then((res) => {
                dispatch(getCardsPackAC(res.data))
                // dispatch(getCardsPackAC(res.data.cardPacks))
                dispatch(preloaderAC(false))
            }
        )
}

type AddNewCardsPackACType = ReturnType<typeof AddNewCardsPackAC>
export const AddNewCardsPackAC = (cardPacks: Array<userType>) => {
    return {type: 'CREATE-CARDS-PACK', cardPacks} as const
}
export const AddNewCardsPackThunk = (setUserID: (setUser: string) => void) => (dispatch: Dispatch) => {
    dispatch(preloaderAC(true))
    CardsApi.AddNewCardsPack().then((res) => {
        setUserID(res.data.newCardsPack.user_id);
        localStorage.setItem('userId', res.data.newCardsPack.name)// userId-??????????????, ?????????????? ???????????????? ???? name, ???? ???????????????? ?????????? ????????????????
        dispatch(AddNewCardsPackAC(res.data.newCardsPack))
        dispatch(preloaderAC(false))
    })
}

export type getCardsPackForPaginationACType = ReturnType<typeof getCardsPackForPaginationAC>
export const getCardsPackForPaginationAC = (data: CardPacksType) => {
    return {type: 'GET-CARDS-PACK-PAGINATION', data} as const
}
export const getCardsPackForPaginationThunk = (pageOfPagination: number) => (dispatch: Dispatch) => {
    dispatch(preloaderAC(true))
    let pagePageCount = {
        page: pageOfPagination,
        pageCount: 10,
    }
    CardsApi.GETCardsPackForPagination(pagePageCount).then((res) => {
            // console.log(res.data)
            dispatch(getCardsPackForPaginationAC(res.data))
            dispatch(preloaderAC(false))
        }
    )

}

export type DeleteCardsPackACType = ReturnType<typeof DeleteCardsPackAC>
export const DeleteCardsPackAC = (id: string) => {
    return {
        type: "DELETE-CARDS-PACK",
        id
    } as const
}

export const DeleteCardsPackThunk = (mID: string) => (dispatch: Dispatch) => {
    CardsApi.DeleteCardsPack(mID)
        .then((res) => {
                // console.log(res.data.deletedCardsPack._id)
                dispatch(DeleteCardsPackAC(res.data.deletedCardsPack._id))
            }
        )
}