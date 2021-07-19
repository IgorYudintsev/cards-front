import React, {useState} from 'react';
import styles from './Header.module.css'
import {Button} from "../../components/Button";

export const Header = () => {
    let [colorButton,setColorButton]=useState('')
    const changeButtonColor=(titleColor:string)=>{
        setColorButton(titleColor)
    }
    return (
        <div className={styles.header}>
            <Button title={'Registration'} to={'/registration'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'Login'} to={'/login'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'CreateAccount'} to={'/create'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'Profile'} to={'/profile'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'NotFound'} to={'/404'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'SetNewPassword'} to={'/recovery'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
            <Button title={'RecoveryPassword'} to={'/newPas'} changeButtonColor={changeButtonColor} colorButton={colorButton}/>
        </div>
    )
}