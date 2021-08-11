import React, {useEffect, useState} from 'react';
import styles from './Registration.module.css'
import {Redirect, useLocation} from "react-router-dom";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {AuthLoginThunk} from "../reducers/LoginReducer";
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch} from "react-redux";
import {SetNewPasswordThunk} from "../reducers/RegistrationReducer";

export const SetNewPassword = React.memo(() => {
    const location = useLocation()
    let token = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    let dispatch = useDispatch()

    let [redirect, setRedirect] = useState(false)
    let [error, setError] = useState(false)
    type FormikErrorType = {
        password?: string
        token?: string

    }
    const formik = useFormik({
        initialValues: {
            password: '',
            token: token,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.password.length < 2) {
                errors.password = 'to short password';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values.password, values.token)
            dispatch(SetNewPasswordThunk(values.password, values.token,setRedirect,setError))

            // dispatch(AuthLoginThunk(values.email, values.password, values.checkBox, setError))
            // dispatch(ButtonAC(''))
        },
    })


    return (
        <div className={styles.general}>
            <h1>Set new PASSWORD</h1>
            {redirect && <Redirect to={'/login'}/>}
            {/*{ForgotPass && <Redirect to={'/recovery'}/>}*/}
            <Grid container justify="center">
                <Grid item xs={4}>
                    <div className={styles.border}>
                        <p></p>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormGroup>
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
                                            color={'primary'}>Send new Password</Button>

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
})

