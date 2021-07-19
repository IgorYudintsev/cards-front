import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const Profile = () => {
    useEffect(()=>{
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>Profile</h1>
        </div>
    )
}