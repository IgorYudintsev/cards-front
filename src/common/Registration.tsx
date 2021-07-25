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

    type FormikErrorType = {
        email?: string
        password?: string
        password2?: string
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password !== values.password2) {
                errors.password2 = 'don\'t forget to duplicate password';
            }
            return errors;
        },

        onSubmit: values => {
            if (values.password === values.password2) {
                alert(JSON.stringify(values));
            }
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
                                    {formik.errors.email ?
                                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        name='password' onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        name='password2' onChange={formik.handleChange}
                                        value={formik.values.password2}
                                        placeholder={'enter the same password'}
                                    />
                                    {formik.errors.password2 ?
                                        <div style={{color: 'red'}}>{formik.errors.password2}</div> : null}
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
