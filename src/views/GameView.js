import React from 'react';
import './Game.css';
import GameStatusView from './GameStatusView';
import PuzzleView from './PuzzleView';
import RestartButtonsView from './RestartButtonsView';
import GameHeaderView from './GameHeaderView';

const GameView = () =>
    <div className='game'>
        <GameHeaderView />
        <GameStatusView />
        <PuzzleView />
        <RestartButtonsView />
    </div>


export default GameView;
