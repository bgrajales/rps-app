import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { Button } from 'react-bootstrap'

export const GameSettings = () => {
    return (
        <div className="base__div">
            <header className="gameSettings__header">
                <div>
                    <h1>bgrajales91</h1>
                    <div className="gameSettings__readyDiv">
                        <IoMdClose />
                        <p>Not ready</p>
                    </div>
                </div>
                <div>
                    <h1>demonSlayer</h1>
                    <div className="gameSettings__readyDiv">
                        <IoMdClose />
                        <p>Not ready</p>
                    </div>
                </div>
            </header>

            <div className="gameSettings__settingsDiv">
                <div className="gameSettings__item">
                    <h2>Game rounds</h2>
                    <div className="gameSettings__inputDiv">
                        <GrFormPrevious />
                            <h4>3</h4>
                        <GrFormNext />
                    </div>
                </div>
                <div className="gameSettings__item">
                    <h2>Choose time</h2>
                    <div className="gameSettings__inputDiv">
                        <GrFormPrevious />
                            <h4>15 s</h4>
                        <GrFormNext />
                    </div>
                </div>
            </div>

            <div className="d-grid gap-2 container">
                <Button variant="success" size="lg">
                    Ready!
                </Button>
            </div>
        </div>
    )
}
