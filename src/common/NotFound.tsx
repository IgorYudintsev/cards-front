import React, {useEffect} from 'react';
import styles from './Registration.module.css'

export const NotFound = React.memo(() => {
        useEffect(() => {
            console.log('RG')
        })
        return (
            <div className={styles.general}>
                <h1>NotFound</h1>
            </div>
        )
    }
)