import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const CardsApi = {
    GETCardsPack: (searchParams: SearchParamsType = {pageCount: 10}) => {
        return instance.get<CardPacksType>('cards/pack', {params: {...searchParams}})
    },
    GETCardsPackForPagination: (pagePageCount: SearchParamsType = {}) => {
        return instance.get<CardPacksType>('cards/pack', {params: {...pagePageCount}})
    },
    AddNewCardsPack: () => {
        return instance.post('cards/pack', {cardsPack: {name:'It-patsan'}})
    },
}


export type userType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type CardPacksType = {
    cardPacks: Array<userType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type SearchParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}