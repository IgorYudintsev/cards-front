import {Dispatch} from "redux";
import {CardPacksType, CardsApi, userType} from "../API/CardsApi";

let initialState = {
    cardPacks: [] as Array<userType>
}
export type InitialCardsPackReducerType = typeof initialState
export const CardsPackReducer = (state = initialState, action: GeneralType)=> {
    switch (action.type) {
        case 'GET-CARDS-PACK': {

            let newState = {...state};
            newState = action.cardPacks
            return newState;


            // let newState = {...state};
            // newState = {...state,cardPacks:action.cardPacks}
            // newState = {...state,cardPacks:action.cardPacks.cardPacks}

        }
        case "CREATE-CARDS-PACK": {
            return {
                ...state,
                cardPacks: [action.cardPacks, ...state.cardPacks]
            }


            // let newState = [action.cardPacks, ...state];
            // // let newState = [action.cardPacks, ...state];
            // return newState
            return state
        }
        default:
            return state
    }
}

type GeneralType = getCardsPackACType | AddNewCardsPackACType

type getCardsPackACType = ReturnType<typeof getCardsPackAC>
const getCardsPackAC = (cardPacks:CardPacksType) => {
    return {type: 'GET-CARDS-PACK', cardPacks} as const
}

export const getCardsPackThunk = () => (dispatch: Dispatch) => {
    CardsApi.GETCardsPack()
        .then((res) => {
                dispatch(getCardsPackAC(res.data))
                // dispatch(getCardsPackAC(res.data.cardPacks))
                console.log(res.data)
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
        localStorage.setItem('userId',res.data.newCardsPack.user_id)
        dispatch(AddNewCardsPackAC(res.data.newCardsPack))
    })
}