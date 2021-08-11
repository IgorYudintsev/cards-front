import React from 'react';
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import styles from './Registration.module.css'
import {useFormik} from "formik";
import {RecoveryThunk} from "../reducers/RegistrationReducer";
import {useDispatch} from "react-redux";


export const RecoveryPassword = React.memo(() => {
        let dispatch = useDispatch()

        type FormikErrorType = {
            email?: string
        }

        const formik = useFormik({
            initialValues: {
                email: '',
            },
            validate: (values) => {
                const errors: FormikErrorType = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                return errors;
            },
            onSubmit: values => {
                dispatch(RecoveryThunk(values.email))
                // console.log(values)
                // dispatch(AuthLoginThunk(values.email, values.password, values.checkBox, setError))
                // dispatch(ButtonAC(''))
            },
        })
        return (
            <div className={styles.general}>
                <h1>Recovery Password</h1>
                {/*{redirect && <Redirect to={'/profile'}/>}*/}
                {/*{ForgotPass && <Redirect to={'/recovery'}/>}*/}
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
)