import React, {useEffect} from 'react';
import styles from './Registration.module.css'
import {AuthAPI} from "../API/AuthAPI";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";

export const Registration = () => {
    useEffect(() => {
        AuthAPI.getPing()
            .then((res) => {
                console.log(res)
            })

    })
    return (
        <div className={styles.general}>
            <h1>REGISTRATION</h1>
            <Grid container justify="center">
                <Grid item xs={4}>
                    <div className={styles.border}>
                        <p></p>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Email" margin="normal"/>
                                <TextField type="password" label="Password" margin="normal"/>
                                <TextField type="password" label="Password" margin="normal"/>
                                <Button className={styles.Button} type={'submit'} variant={'contained'} color={'primary'}>Send</Button>
                            </FormGroup>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
