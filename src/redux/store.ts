import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {RegistrationReducer} from "../reducers/RegistrationReducer";
import {LoginReducer} from "../reducers/LoginReducer";
import {ButtonReducer} from "../reducers/ButtonReducer";
import {CardsPackReducer} from "../reducers/CardsPackReducer";
import {SearchPaginationFilterCPReducer} from "../reducers/SearchPaginationFilterCPReducer";

const reducers = combineReducers({
    button:ButtonReducer,
    registration: RegistrationReducer,
    login:LoginReducer,
    cardsPack:CardsPackReducer,
    // spfCardsPack:SearchPaginationFilterCPReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>