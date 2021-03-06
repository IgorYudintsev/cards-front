import React, {useCallback, useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from './Button.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {ButtonAC} from "../reducers/ButtonReducer";



type ButtonType = {
    title: string
    to?: string
    colorButton?: string
    changeButtonColor: (title: string) => void
}

export const ButtonComponent = (props: ButtonType) => {
    let dispatch = useDispatch();
    let redirect = useSelector<AppStoreType>(state => state.button);

    const onClickHandler = useCallback(() => {
        props.changeButtonColor(props.title)
        dispatch(ButtonAC(''))
    }, [props.title])

    return (
        <span>
            <button
                onClick={onClickHandler}
                className={
                    (props.colorButton === props.title && redirect !== 'Profile' && redirect !== 'Login')
                    || (props.title === redirect)
                        ? styles.yellow
                        : styles.button}>
                    <NavLink className={styles.navi} to={`${props.to}`}>
                        {props.title}
                    </NavLink>
                </button>
        </span>
    )
}
