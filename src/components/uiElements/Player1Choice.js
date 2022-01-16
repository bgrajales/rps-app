import React from 'react'

import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const Player1Choice = ({ hand }) => {
    
    if ( hand === 'p' ) {
        return (
            <>
                <h1>Paper</h1>
                <Paper />
            </>
        )
    } else if ( hand === 'r' ) {
        return (
            <>
                <h1>Rock</h1>
                <Rock />
            </>
        )
    } else if ( hand === 's' ) {
        return (
            <>
                <h1>Scissors</h1>
                <Scissors />
            </>
        )
    }
}
