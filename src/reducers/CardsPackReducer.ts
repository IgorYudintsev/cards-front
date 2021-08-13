import {Dispatch} from "redux";
import {CardsApi, userType} from "../API/CardsApi";

let initialState: Array<userType> = []
export const CardsPackReducer = (state = initialState, action: GeneralType) => {
    switch (action.type) {
        case 'GET-CARDS-PACK': {
            let newState = [...state];
            newState = action.cardPacks
            return newState
        }
        default:
            return state
    }
}

type GeneralType = getCardsPackACType

type getCardsPackACType = ReturnType<typeof getCardsPackAC>
const getCardsPackAC = (cardPacks: Array<userType>) => {
    return {type: 'GET-CARDS-PACK', cardPacks} as const
}

export const getCardsPackThunk = () => (dispatch: Dispatch) => {
    CardsApi.GETCardsPack()
        .then((res) => {
                dispatch(getCardsPackAC(res.data.cardPacks))
                // console.log(res.data.cardPacks)
            }
        )
}