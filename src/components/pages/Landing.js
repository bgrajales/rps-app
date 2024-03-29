import React from 'react';
import { Button } from 'react-bootstrap';
import { MutatingDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

export const Landing = () => {

  const isLoading = useSelector(state => state.loader.isLoading);


  return <div className="landing__div">
      <header className="container landing__header">
                <h1>RPS</h1>
                
                <Button onClick={ () => {
                  window.location.href = '/login';
                }}>
                    Login
                </Button>
      </header>

      <main className="container landing__main">
          <div className="landing__text">
            <h2>Welcome to Rock, Paper, Scissors!</h2>
            <p>
                This is a simple game of Rock, Paper, Scissors where you can play against other players.
            </p>
            <p>
                The rules are simple: Rock beats Scissors, Scissors beats Paper, and Paper beats Rock.
            </p>
            <Button onClick={ () => { 
              window.location.href = '/register';
            }}>
                Create an account
            </Button>
          </div>
          <div>
            <img src={ require('../../assets/images/landingImage.png').default } alt="rock-paper-scissors-game" className="landing__image" />
          </div>
      </main>
      {
        isLoading === undefined || isLoading === true ?
        <div className="landing__loader">
          <div className="landing__rpsLoader">
            <MutatingDots ariaLabel="loading-indicator" color={'black'} secondaryColor='black' />
          </div>
        </div>
        :
        null
      }
  </div>;
};
