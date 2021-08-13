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
        case "CREATE-CARDS-PACK":{
            let newState = [action.cardPacks,...state];
            return newState
        }
        default:
            return state
    }
}

type GeneralType = getCardsPackACType | AddNewCardsPackACType

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

type AddNewCardsPackACType=ReturnType<typeof AddNewCardsPackAC>
export  const AddNewCardsPackAC=(cardPacks: Array<userType>)=>{
    return {type: 'CREATE-CARDS-PACK', cardPacks} as const
}
export const AddNewCardsPackThunk=()=>(dispatch:Dispatch)=>{
     CardsApi.AddNewCardsPack().then((res)=>{
         // console.log(res.data.newCardsPack)
         dispatch(AddNewCardsPackAC(res.data.newCardsPack))
     })
}