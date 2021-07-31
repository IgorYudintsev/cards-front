import React, {useEffect} from 'react';
import styles from './Registration.module.css'
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch} from "react-redux";

export const Profile = React.memo(() => {
        let dispatch = useDispatch()
        dispatch(ButtonAC('Profile'))
        return (
            <div className={styles.general}>
                <h1>Profile</h1>
            </div>
        )
    }
)