import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
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
        <div>
            <header className="container login__header">
                <h1>RPS</h1>
            </header>

            <form className="login__form" onSubmit={ handleLoginSubmit }>
                <div className="login__formDiv">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="userName" value={ formValues.userName } onChange={ handleInputChange }/>
                </div>
                <div className="login__formDiv">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={ formValues.password } onChange={ handleInputChange } />
                </div>

                <div className="d-grid gap-2 container">
                    <Button variant="primary" size="lg" type="submit">
                        Login
                    </Button>
                </div>
            </form>

            
        </div>
    )
}
