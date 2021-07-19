import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const Registration = () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>REGISTRATION</h1>
        </div>
    )
}