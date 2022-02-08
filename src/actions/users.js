import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'

import { gameWinner } from '../utils/gameWinner'
import { types } from "../types/types"

import socketIOClient from 'socket.io-client'
import { refreshTokenAction } from './auth';

const ENDPOINT = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}`;
export const socket = socketIOClient(ENDPOINT);

export const getChallengers = ( userId, token, refreshToken ) => {
        return (dispatch) => {
            const headers = {
                'Content-Type': 'application/json',
                'authorization': token
            }

            axios.get(`${apiUrl('getChallengers')}?userId=${userId}`,{
                headers: headers
            })
            .then( ({ data }) => {
                dispatch( setOnlineUsers(data.users) )
            })
            .catch( err => {

                if( err.response.status === 403) {
                    dispatch( refreshTokenAction(refreshToken) )
                }
            })
        }
} // Refresh token done

export const getStats = ( userId, setStats, token, refreshToken, setLoading ) => {
    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.get((`${apiUrl('getStats')}?userId=${userId}`), {
            headers: headers
        }).then( ({ data }) => {
            setStats({
                gamesPlayed: data.gamesPlayed,
                gamesWon: data.gamesWon,
                winningStreak: data.winningStreak,
            })
            setLoading(false)
        }).catch( err => {
            setLoading(false)
            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }
} // Refresh token done

export const challengeUser = ( userId, challengedId, userName, challengedName, navigate, token, refreshToken ) => {

    return (dispatch) => {
        
        dispatch( clearError() )

        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.post(`${apiUrl('challengeUser')}`,{
            userId,
            challengedId,
            userName,
            challengedName
        },{
            headers: headers
        })
        .then( ({ data }) => {
            if (data.gameId) {

                socket.emit('sendChallenge', {
                    gameId: data.gameId,
                    challenger: userName,
                    challenged: challengedId,
                })

                socket.emit('joinGame', {
                    gameId: data.gameId,
                })

                sessionStorage.setItem('lastPath', `/app/game/${ data.gameId }`)
                navigate(`/app/game/${ data.gameId }`)
            }
            // dispatch( setChallenge(data.challenge) )
        })
        .catch( err => {
            dispatch( setError(err.response.data.message) )

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })

    }


} // Refresh Token done

export const getActiveGames = ( userId, setCurrentGames, page, setMaxPages, setLoader, token, refreshToken ) => {
    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.get(`${apiUrl('getActiveGames')}?userId=${userId}&page=${page}`, {
            headers: headers
        }).then( ({ data }) => {
            setCurrentGames(data.games)
            setMaxPages(data.maxPages)
            setLoader(false)
        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }

        })
    }
} // Refresh Token done

export const getGameById = ( userId, gameId, setActiveGame, token, refreshToken, setLoader, setChatMessages, setCurrentRound ) => {
    
    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }
        
        axios.get(`${apiUrl('getActiveGameById')}?userId=${userId}&gameId=${gameId}`, {
            headers: headers
        })
        .then( ({ data }) => {

            setActiveGame(data)
            
            setChatMessages(data.chat)
            
            setCurrentRound(data.currentRound)

            setLoader(false)

        })
        .catch( err => {
            setLoader(false)
            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    } // Refresh Token done

} // Refresh Token done

export const getActiveGame = ( userId, gameId, setActiveGame, token, refreshToken, setChatMessages, setLoader, setWinner ) => {
    
    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }
        
        axios.get(`${apiUrl('getActiveGameById')}?userId=${userId}&gameId=${gameId}`, {
            headers: headers
        })
        .then( ({ data }) => {
            setActiveGame(data)
            
            setChatMessages(data.chat)

            setWinner( gameWinner(data.rounds) )

            setLoader(false)
            
        })
        .catch( err => {
            setLoader(false)
            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    } // Refresh Token done

} // Refresh Token done

export const setActiveGamePlayerHand = ( userId, challengedId, gameId, round, hand, token, refreshToken ) => {

    return (dispatch) => {

        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.post(`${apiUrl('setActiveGamePlayerHand')}`,{
            userId,
            challengedId,
            gameId,
            round,
            hand
        },{
            headers: headers
        }).then( ({ data }) => {

            socket.emit('handPicked', {
                gameId: gameId,
                handPicked: hand,
                round: round,
            })
        
        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }

        })
    }

} // Refresh Token done

export const goToNextRound = ( userId, gameId, currentRound, token, refreshToken ) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.get( `${apiUrl('nextRound')}?userId=${userId}&gameId=${gameId}&currentRound=${currentRound}`, {
            headers: headers
        }).then( ({ data }) => {
        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }

        })
    }
} // Refresh Token done

export const finishGameAction = ( userId, gameId, token, refreshToken) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.post( `${apiUrl('finishGame')}`, {
            userId,
            gameId
        }, {
            headers: headers
        }).then( ({ data }) => {
        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }

} // Refresh Token done

export const getGamesHistory = ( userId, setGames, page, setMaxPage, setLoader, token, refreshToken) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.get((`${apiUrl('getGamesHistory')}?userId=${userId}&page=${page}`), {
            headers: headers
        }).then( ({ data }) => {

            setGames(data.games)
            setMaxPage(data.maxPages)
            setLoader(false)
            
        }).catch( err => {
            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }

} // Refresh Token done

export const markNotificationAsRead = ( userId, token, refreshToken ) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.post(`${apiUrl('markNotificationAsRead')}`, {
            userId: userId,
        },{
            headers: headers
        }).then( ( { data } ) => {

            
        }).catch( err => {
            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }
    
} // Refresh Token done

export const deleteSelectedNotif = ( userId, gameId, token, refreshToken) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }

        axios.post(`${apiUrl('deleteSelectedNotif')}`, {
            userId: userId,
            gameId: gameId,
        },{
            headers: headers    
        }).then( ( { data } ) => {


        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }

} // Refresh Token done

export const searchUser = ( userName, setUserSearched, token, refreshToken ) => {

    return (dispatch) => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token,
        }

        axios.get(`${apiUrl('searchUser')}?userName=${userName}`, {
            headers: headers
        }).then( ( { data } ) => {

            
            if( data.userName ) {
                setUserSearched({
                    userName: data.userName,
                    userId: data.userId
                })
            }  

        }).catch( err => {

            if (err.response.status === 403) {
                dispatch(refreshTokenAction( refreshToken ))
            }
        })
    }

} 

export const setOnlineUsers = ( users ) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload: users
        })
    }
}

export const setError = ( message ) => ({
    type: types.ERROR,
    payload: message
})

export const clearError = () => ({
    type: types.CLEAR_ERROR
})