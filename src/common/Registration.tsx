import React, {useEffect} from 'react';
import styles from './Registration.module.css'
import {AuthAPI} from "../API/AuthAPI";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";


export const Registration = () => {
    useEffect(() => {
        AuthAPI.getPing()
            .then((res) => {
                console.log(res)
            })

    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })


    return (
        <div className={styles.general}>
            <h1>REGISTRATION</h1>
            <Grid container justify="center">
                <Grid item xs={4}>
                    <div className={styles.border}>
                        <p></p>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormGroup>
                                    <TextField
                                        label="Email" margin="normal"
                                        name='email' onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        name='password' onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        name='password2' onChange={formik.handleChange}
                                        value={formik.values.password2}
                                    />
                                    <Button className={styles.Button} type={'submit'} variant={'contained'}
                                            color={'primary'}>Send</Button>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
