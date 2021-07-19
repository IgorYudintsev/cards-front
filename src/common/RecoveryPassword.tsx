import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const RecoveryPassword = () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>RecoveryPassword</h1>
        </div>
    )
}