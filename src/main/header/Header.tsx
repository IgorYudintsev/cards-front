import React, {useState} from 'react';
import styles from './Header.module.css'
import {ButtonComponent} from "../../components/ButtonComponent";

export const Header = () => {
    let [colorButton,setColorButton]=useState('')
    const changeButtonColor=(titleColor:string)=>{
        setColorButton(titleColor)
    }
    return (
        <div className={styles.header}>
            <ButtonComponent title={'Registration'} to={'/registration'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'Login'} to={'/login'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'CreateAccount'} to={'/create'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'Profile'} to={'/profile'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'NotFound'} to={'/404'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'SetNewPassword'} to={'/recovery'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <ButtonComponent title={'RecoveryPassword'} to={'/newPas'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
        </div>
    )
}