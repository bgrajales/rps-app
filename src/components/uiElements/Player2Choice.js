import React from 'react'

import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const Player2Choice = ({ hand }) => {
    
    if ( hand === 'p' ) {
        return (
            <>
                <Paper />
                <h1>Paper</h1>
            </>
        )
    } else if ( hand === 'r' ) {
        return (
            <>
                <Rock />
                <h1>Rock</h1>
            </>
        )
    } else if ( hand === 's' ) {
        return (
            <>
                <Scissors />
                <h1>Scissors</h1>
            </>
        )
    }
}
