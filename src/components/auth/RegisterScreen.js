import React from 'react'
import { Button } from 'react-bootstrap'

export const RegisterScreen = () => {
    return (
        <div>
            
            <header className="container login__header">
                <h1>RPS</h1>
            </header>

            <form className="register__form">
                <div className="register__formDiv">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="register__formDiv">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="register__formDiv">
                    <label htmlFor="password">Repeat password</label>
                    <input type="password" id="password" />
                </div>
            </form>

            <div className="d-grid gap-2 container">
                <Button variant="primary" size="lg">
                    Login
                </Button>
            </div>

        </div>
    )
}
