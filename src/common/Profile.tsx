import React, {useEffect} from 'react';
import styles from './Registration.module.css'
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {Redirect} from "react-router-dom";

export const Profile = React.memo(() => {
        let dispatch = useDispatch()
        dispatch(ButtonAC('Profile'))//for yellow buuton
       let loginTrue:any=useSelector<AppStoreType>(state => state.login);
        if(loginTrue.length===0){
            console.log('0');
            dispatch(ButtonAC('Login'))//for yellow buuton
            return <Redirect to={'/login'}/>
        }
        return (
            <div className={styles.general}>
                <h1>Profile</h1>
            </div>
        )
    }
)