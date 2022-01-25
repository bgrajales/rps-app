import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({
        userName: '',
        password: '',
    })

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        dispatch( userLogin( formValues.userName, formValues.password ) )
    }

    return (
        <div className="auth__pageDiv">
            <div className="auth__formDiv shadow">
                <header className="container auth__header">
                    <h1>RPS</h1>
                </header>

                <form className="auth__form" onSubmit={ handleLoginSubmit }>
                    <div className="auth__formInput">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" id="username" name="userName" value={ formValues.userName } onChange={ handleInputChange }/>
                    </div>
                    <div className="auth__formInput">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={ formValues.password } onChange={ handleInputChange } />
                    </div>

                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Login
                        </Button>
                    </div>

                    <Link to="/register">
                        <p>
                            Don't have an account?
                        </p>
                    </Link>
                </form>
            </div>
            
        </div>
    )
}
