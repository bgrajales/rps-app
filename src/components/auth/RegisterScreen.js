import { Alert } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userRegister } from '../../actions/auth'

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const [ formValues, handleInputChange ] = useForm({
        userName: '',
        password: '',
        repeatPassword: '',
    })

    const handleRegisterSubmit = (e) => {
        e.preventDefault()

        dispatch( userRegister( formValues.userName, formValues.password, formValues.repeatPassword ) )
    }

    return (
        <div className="auth__pageDiv">
            
            <div className="auth__formDiv shadow">
            <header className="container auth__header">
                <h1>RPS</h1>
            </header>

            {
                error.message && (
                    <Alert severity="error" className="auth__error">
                        { error.message }
                    </Alert>
                )
            }


            <form className="auth__form" onSubmit={ handleRegisterSubmit }>
                <div className="auth__formInput">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="userName" value={ formValues.userName } onChange={ handleInputChange } />
                </div>
                <div className="auth__formInput">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" value={ formValues.password } onChange={ handleInputChange }/>
                </div>
                <div className="auth__formInput">
                    <label htmlFor="password">Repeat password</label>
                    <input className="form-control" type="password" id="repeatPassword" name="repeatPassword" value={ formValues.repeatPassword } onChange={ handleInputChange }/>
                </div>

                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit">
                        Register
                    </Button>
                </div>
            
                <Link to="/login">
                    <p>
                        Already have an account?
                    </p>
                </Link>
            </form>

            
            </div>
        </div>
    )
}
