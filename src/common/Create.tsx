import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const Create = React.memo(() => {
    useEffect(() => {
        console.log('RG')
    })
    return (
        <div className={styles.general}>
            <h1>Create</h1>
        </div>
    )
})