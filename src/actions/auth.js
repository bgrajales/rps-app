import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'

import { types } from "../types/types"
import { socket } from './users'
import { finishLoading } from './ui'
// import { startLoading } from "./ui"

export const userLogin = ( userName, password ) => {
    return (dispatch) => {
        console.log(userName, password)

        // dispatch( startLoading() )
        const headers = {
            'Content-Type': 'application/json'
        }

        const user = {
            userName,
            password
        }

        axios.post(apiUrl('login'), JSON.stringify(user), {
            headers: headers
        })
        .then( ({ data }) => {
            console.log(data)

            socket.emit('login', data.user.id)

            dispatch( login( data.user, data.token, data.refreshToken ) )
            
        })
        .catch( err => {
            console.log(err)
            // Swal.fire('Error', err.message, 'error')
        })
    }
}

export const userRegister = ( userName, password, repeatPassword ) => {

    return (dispatch) => {
        console.log(userName, password, repeatPassword)

        // dispatch( startLoading() )
        const headers = {
            'Content-Type': 'application/json'
        }

        const user = {
            userName,
            password,
            repeatPassword
        }

        axios.post(apiUrl('register'), JSON.stringify(user), {
            headers: headers
        })
        .then( ({ data }) => {
            console.log(data)

            socket.emit('login', data.user.id)

            dispatch( login( data.user, data.token, data.refreshToken ) )
            
        })
        .catch( err => {
            console.log(err)
            // Swal.fire('Error', err.message, 'error')
        })
    }
    
}

export const userLogout = (userId) => {
    return (dispatch) => {
        
        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(apiUrl('logout'), JSON.stringify({ userId }), {
            headers: headers
        })
        .then( ({ data }) => {
            dispatch( logout() )
        })
        .catch( err => {
            console.log(err)
            // Swal.fire('Error', err.message, 'error')
        })
            
    }
}

export const userAlreadyLoggedIn = ( refreshToken ) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        const body = {
            refreshToken
        }

        axios.post(apiUrl('alreadyLoggedIn'), JSON.stringify(body), {
            headers: headers
        })
        .then( ({ data }) => {
            dispatch( login( data.user, data.token, refreshToken ) )
            dispatch( finishLoading() )
            socket.emit('login', data.user.id)
        })
        .catch( err => {
            console.log(err)
        })
    }

}

export const login = ( user, token, refreshToken ) => ({
    type: types.LOGIN,
    payload: {
        user,
        token,
        refreshToken
    }
})

export const logout = () => ({
    type: types.LOGOUT
})