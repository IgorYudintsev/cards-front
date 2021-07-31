import React, {useEffect, useState} from 'react';
import styles from './Registration.module.css'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {AuthLoginThunk} from "../reducers/LoginReducer";
import {ButtonAC} from "../reducers/ButtonReducer";

export const Login = React.memo( () => {
    let [error, setError] = useState(false)
    let [redirect, setRedirect] = useState(false)
    let dispatch = useDispatch();
    let LoginData=useSelector<AppStoreType>(state =>state.login)

    type FormikErrorType = {
        email?: string
        password?: string
        checkBox?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkBox: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 2) {
                errors.password = 'to short password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(AuthLoginThunk(values.email, values.password, values.checkBox, setError, setRedirect))
            dispatch(ButtonAC(''))
        },
    })

    if (redirect) {
        dispatch(ButtonAC('Profile'))
        return <Redirect to={'/profile'}/>
    }
    return (
        <div className={styles.general}>
            <h1>LOGIN</h1>
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
                                    {formik.errors.password ?
                                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                                    <FormControlLabel
                                        label={'Remember me'} control={<Checkbox/>}
                                        {...formik.getFieldProps('checkBox')}
                                    />

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
)