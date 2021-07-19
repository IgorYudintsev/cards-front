import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const Login = () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>Login</h1>
        </div>
    )
}