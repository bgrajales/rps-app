

export const setWinner = ( handPlayer1, handPlayer2 ) => {

    if(handPlayer1 === 'null' || handPlayer2 === 'null') {
        return 'null';
    } else if ( handPlayer1 === handPlayer2 ) {
        return 'draw';
    } else if ( handPlayer1 === 'r' && handPlayer2 === 's' ) {
        return 'player1';
    } else if ( handPlayer1 === 'p' && handPlayer2 === 'r' ) {
        return 'player1';
    } else if ( handPlayer1 === 's' && handPlayer2 === 'p' ) {
        return 'player1';
    } else {
        return 'player2';
    }


}