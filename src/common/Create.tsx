import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const Create = () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>Create</h1>
        </div>
    )
}