import React, {useEffect} from 'react';
import style from "../common/Profile.module.css";
import {getCardsPackForPaginationThunk, InitialCardsPackReducerType} from "../reducers/CardsPackReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";

type propsType = {
    minPagePagination: number
    maxPagePagination: number
}

export const Pagination = (props: propsType) => {
    let cardsPack = useSelector<AppStoreType, InitialCardsPackReducerType>(state => state.cardsPack)
    let arrForPagination = [];
    for (let i = props.minPagePagination; i <= props.maxPagePagination; i++) {
        arrForPagination.push(i)
    }


    let dispatch = useDispatch()
    const onclickHandlerForpagination = (page: number) => {
        dispatch(getCardsPackForPaginationThunk(page))
    }

    return (
        <span className={style.generalForPagination}>
              {arrForPagination.map(m => {
                  return (
                      <span onClick={() => onclickHandlerForpagination(m)}
                            className={cardsPack.page === m ? style.ActivePaginationBlock : style.paginationBlock}>{` ${m} `}</span>
                  )
              })}

        </span>
    );
};

