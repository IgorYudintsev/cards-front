import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const  SetNewPassword = React.memo( () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>SetNewPassword</h1>
        </div>
    )
})