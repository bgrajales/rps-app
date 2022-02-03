export const gameWinner = ( gameRounds ) => {

    let winPlayer1 = 0
    let winPlayer2 = 0
    let tie = 0

    gameRounds.forEach( ( round ) => {

        if( round.winner === 'player1'){
            winPlayer1++
        } else if (round.winner === 'player2'){
            winPlayer2++
        } else {
            tie++
        }
    
    })

    if( tie === winPlayer1 && tie === winPlayer2 ){
        return 'tie'
    } else if ( tie > winPlayer1 && tie > winPlayer2 ){
        return 'tie'
    } else if ( winPlayer1 > winPlayer2 ){
        return 'player1'
    } else {
        return 'player2'
    }

}