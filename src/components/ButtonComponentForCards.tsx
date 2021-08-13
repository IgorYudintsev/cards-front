import React, {useCallback, useState} from 'react';
import styles from './ButtonComponentForCards.module.css'


type ButtonType = {
    title: string
    callBack: () => void
}

export const ButtonComponentForCards = (props: ButtonType) => {

    const onClickHandler = () => {
        props.callBack()
           }

    return (
        <span>
            <button className={styles.button} onClick={onClickHandler}>{props.title}</button>
        </span>
    )
}
