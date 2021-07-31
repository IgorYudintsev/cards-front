import React, {useEffect, useState} from 'react';
import styles from './Registration.module.css'
import {AuthAPI} from "../API/AuthAPI";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, store} from "../redux/store";
import {AuthRegisterThunk} from "../reducers/RegistrationReducer";
import {Redirect, Route} from "react-router-dom";
import {Login} from "./Login";


export const Registration = () => {
    let [error, setError] = useState(false)
    let [redirect, setRedirect] = useState(false)
    let dispatch = useDispatch();
    let AuthData = useSelector<AppStoreType>(state => state.registration)

    // useEffect(() => {
    //     AuthAPI.getPing()
    //         .then((res) => {
    //             console.log(res)
    //         })
    //
    // })

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
                // let items = JSON.stringify(values);
                // console.log(values.email, values.password)
                dispatch(AuthRegisterThunk(values.email, values.password, setError, setRedirect))
            }
        },
    })

    if (redirect) {
        return <Redirect to={'/login'}/>
    }

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
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email ?
                                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        {...formik.getFieldProps('password')}
                                    />
                                    <TextField
                                        type="password" label="Password" margin="normal"
                                        {...formik.getFieldProps('password2')}
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
                    {error && <div className={styles.error}>Email already exists, or your Password must be more than 7
                        characters...</div>}
                </Grid>
            </Grid>
        </div>
    )
}
