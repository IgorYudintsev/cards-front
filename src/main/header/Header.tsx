import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import {ButtonComponent} from "../../components/ButtonComponent";
import {useDispatch, useSelector} from "react-redux";
import {AuthLoginThunk, LogOutThunk} from "../../reducers/LoginReducer";
import {Redirect} from "react-router-dom";
import {ButtonAC} from "../../reducers/ButtonReducer";
import {AppStoreType} from "../../redux/store";

export const Header = () => {
    let [LogOUT, setLogOUT] = useState(false)
    let LoginData = useSelector<AppStoreType, any[]>(state => state.login)
    let dispatch = useDispatch();
    let [colorButton, setColorButton] = useState('')
    const changeButtonColor = (titleColor: string) => {
        setColorButton(titleColor)
    }
    const logOiutHandler = () => {
        dispatch(LogOutThunk())
        dispatch(ButtonAC('Login'))
        setLogOUT(false)
        // return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        if (LoginData.length > 0) {
            setLogOUT(true)
        }
    }, [LoginData])

    return (
        <div className={styles.header}>
            <ButtonComponent title={'Registration'} to={'/registration'} changeButtonColor={changeButtonColor}
                             colorButton={colorButton}/>
            <ButtonComponent title={'Login'} to={'/login'} changeButtonColor={changeButtonColor}
                             colorButton={colorButton}/>
            {/*<ButtonComponent title={'CreateAccount'} to={'/create'} changeButtonColor={changeButtonColor}*/}
            {/*                 colorButton={colorButton}/>*/}
            <ButtonComponent title={'Profile'} to={'/profile'} changeButtonColor={changeButtonColor}
                             colorButton={colorButton}/>
            {/*<ButtonComponent title={'NotFound'} to={'/404'} changeButtonColor={changeButtonColor}*/}
            {/*                 colorButton={colorButton}/>*/}
            {/*<ButtonComponent title={'SetNewPassword'} to={'/recovery'} changeButtonColor={changeButtonColor}*/}
            {/*                 colorButton={colorButton}/>*/}
            {/*<ButtonComponent title={'RecoveryPassword'} to={'/newPas'} changeButtonColor={changeButtonColor}*/}
            {/*                 colorButton={colorButton}/>*/}
            {LogOUT && <span onClick={logOiutHandler} className={styles.logOut}>LogOUT</span>}
        </div>
    )
}