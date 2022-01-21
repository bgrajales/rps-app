import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'

import { types } from "../types/types"

import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:4001';
export const socket = socketIOClient(ENDPOINT);

export const getChallengers = ( userId ) => {
        return (dispatch) => {
            const headers = {
                'Content-Type': 'application/json'
            }
    
            axios.get(`${apiUrl('getChallengers')}?userId=${userId}`,{
                headers: headers
            })
            .then( ({ data }) => {
                console.log(data.users)
                dispatch( setOnlineUsers(data.users) )
            })
            .catch( err => {
                console.log(err)
            })
        }
}

export const getStats = ( userId, setStats ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.get((`${apiUrl('getStats')}?userId=${userId}`), {
        headers: headers
    }).then( ({ data }) => {
        setStats({
            gamesPlayed: data.gamesPlayed,
            gamesWon: data.gamesWon,
            winningStreak: data.winningStreak,
        })
    }).catch( err => {
        console.log(err)
    })

}

export const challengeUser = ( userId, challengedId, userName, challengedName, navigate ) => {

    return (dispatch) => {
        console.log(userId, challengedId)
        
        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(`${apiUrl('challengeUser')}?userId=${userId}&challengedId=${challengedId}&userName=${userName}&challengedName=${challengedName}`,{
            headers: headers
        })
        .then( ({ data }) => {
            console.log(data)
            if (data.gameId) {

                socket.emit('sendChallenge', {
                    gameId: data.gameId,
                    challenger: userName,
                    challenged: challengedId,
                })

                navigate(`/app/game/${ data.gameId }`)
            }
            // dispatch( setChallenge(data.challenge) )
        })
        .catch( err => {
            console.log(err)
        })

    }


}

export const getActiveGames = ( userId, setCurrentGames ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.get(`${apiUrl('getActiveGames')}?userId=${userId}`, {
        headers: headers
    }).then( ({ data }) => {
        console.log(data.activeGames)
        setCurrentGames(data.activeGames)
    }).catch( err => {
        console.log(err)
    })


}

export const getGameRound = ( userId, gameId, setRound, setActiveGame ) => {
    
    console.log('getting round', 
        userId,
        gameId)
    axios.get(`${apiUrl('getActiveGameById')}?userId=${userId}&gameId=${gameId}`)
    .then( ({ data }) => {
        console.log(data)
        setActiveGame(data)
        
        const activeGame = data

        setRound({
            round: activeGame.currentRound,
            player1hand: activeGame.rounds[activeGame.currentRound-1].player1hand,
            player2hand: activeGame.rounds[activeGame.currentRound-1].player2hand,
            winner: activeGame.rounds[activeGame.currentRound-1].winner
        })

    })
    .catch( err => {
        console.log(err)
    })

}

export const setActiveGamePlayerHand = ( userId, challengedId, gameId, round, hand, setRound, roundGame, setActiveGame, activeGame ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post(`${apiUrl('setActiveGamePlayerHand')}?userId=${userId}&challengedId=${challengedId}&gameId=${gameId}&round=${round}&hand=${hand}`, {
        headers: headers
    }).then( ({ data }) => {
        console.log(data)

        const newRound = {
            round: round,
            player1hand: hand,
            player2hand: roundGame.player2hand,
            winner: data.winner            
        }
    
        setRound(newRound)

        const newActiveGame = {
            ...activeGame,
            rounds: [
                ...activeGame.rounds.slice(0, round-1),
                newRound,
                ...activeGame.rounds.slice(round)
            ]
        }

        setActiveGame(newActiveGame)
    
    }).catch( err => {
        console.log(err)
    })

}

export const goToNextRound = ( userId, gameId, currentRound, setRound ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( `${apiUrl('nextRound')}?userId=${userId}&gameId=${gameId}&currentRound=${currentRound}`, {
        headers: headers
    }).then( ({ data }) => {
        console.log(data)
        setRound({
            round: currentRound+1,
            player1hand: 'null',
            player2hand: 'null',
            winner: 'null'
        })
    }).catch( err => {
        console.log(err)
    })

}

export const finishGameAction = ( userId, gameId ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( `${apiUrl('finishGame')}?userId=${userId}&gameId=${gameId}`, {
        headers: headers
    }).then( ({ data }) => {
        console.log(data)
    }).catch( err => {
        console.log(err)
    })


}

export const setOnlineUsers = ( users ) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload: users
        })
    }
}

export const getGamesHistory = ( userId, setGames ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.get((`${apiUrl('getGamesHistory')}?userId=${userId}`), {
        headers: headers
    }).then( ({ data }) => {
        console.log(data)
        setGames(data.gamesHistory)
    }).catch( err => {
        console.log(err)
    })

}

export const markNotificationAsRead = ( userId ) => {

    const headers = {
            'Content-Type': 'application/json'
        }
    
        axios.post(`${apiUrl('markNotificationAsRead')}?userId=${userId}`, {
            headers: headers
        }).then( ( { data } ) => {

            console.log(data)
            
        }).catch( err => {
            console.log(err)
        })
    
}

export const deleteSelectedNotif = ( userId, gameId ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post(`${apiUrl('deleteSelectedNotif')}?userId=${userId}&gameId=${gameId}`, {
        headers: headers    
    }).then( ( { data } ) => {

        console.log(data)

    }).catch( err => {
        console.log(err)
    })

}