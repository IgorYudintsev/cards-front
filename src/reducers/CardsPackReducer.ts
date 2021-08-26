import {Dispatch} from "redux";
import {CardPacksType, CardsApi, SearchParamsType, userType} from "../API/CardsApi";

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
        case "GET-CARDS-PACK-PAGINATION": {
            return {...state} = action.data
        }
        default:
            return state
    }
}

type GeneralType = getCardsPackACType | AddNewCardsPackACType | getCardsPackForPaginationACType

type getCardsPackACType = ReturnType<typeof getCardsPackAC>
const getCardsPackAC = (cardPacks: CardPacksType) => {
    return {type: 'GET-CARDS-PACK', cardPacks} as const
}

export const getCardsPackThunk = (data:{cardsPack:CardPacksType,pageCount:number, packName: string}) => (dispatch: Dispatch) => {
    CardsApi.GETCardsPack(data)
        .then((res) => {
                dispatch(getCardsPackAC(res.data))
                // dispatch(getCardsPackAC(res.data.cardPacks))
            }
        )
}

type AddNewCardsPackACType = ReturnType<typeof AddNewCardsPackAC>
export const AddNewCardsPackAC = (cardPacks: Array<userType>) => {
    return {type: 'CREATE-CARDS-PACK', cardPacks} as const
}
export const AddNewCardsPackThunk = (setUserID: (setUser: string) => void) => (dispatch: Dispatch) => {
    CardsApi.AddNewCardsPack().then((res) => {
        setUserID(res.data.newCardsPack.user_id);
        localStorage.setItem('userId', res.data.newCardsPack.name)// userId-менялся, поэтому заменили на name, но название ключа оставили
        dispatch(AddNewCardsPackAC(res.data.newCardsPack))
    })
}

export type getCardsPackForPaginationACType = ReturnType<typeof getCardsPackForPaginationAC>
export const getCardsPackForPaginationAC = (data: CardPacksType) => {
    return {type: 'GET-CARDS-PACK-PAGINATION', data} as const
}

export const getCardsPackForPaginationThunk = (pageOfPagination: number) => (dispatch: Dispatch) => {
    let pagePageCount = {
        page: pageOfPagination,
        pageCount: 10,
    }
    CardsApi.GETCardsPackForPagination(pagePageCount).then((res) => {
            // console.log(res.data)
            dispatch(getCardsPackForPaginationAC(res.data))
        }
    )

}