import React, {useEffect} from 'react';
import styles from './Registration.module.css'
import {AuthAPI} from "../API/AuthAPI";

export const Registration = () => {
    useEffect(()=>{
        AuthAPI.getPing()
            .then((res)=>{
                console.log(res)
            })

    })
    return (
        <div className={styles.general}>
            <h1>REGISTRATION</h1>
        </div>
    )
}