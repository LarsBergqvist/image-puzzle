import React, { Component } from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { selectTile, initGame, shuffleTiles } from '../reducers/actions';
import GameStatusView from './GameStatusView';
import PuzzleView from './PuzzleView';
import { NumImages } from '../constants';
import PropTypes from 'prop-types';

class Game extends Component {
    render() {
        const gameHUD = <GameStatusView
            gameComplete={this.props.gameComplete}
            turnNo={this.props.turnNo}
            onInitGame={this.props.onInitGame}
            numClicksWithinTurn={this.props.numClicksWithinTurn}
        />;

        return (
            <div className='game'>
                <header className='game-header'>
                    <div className='game-title'>Image puzzle</div>
                </header>
                <div className='game-status'>
                    {gameHUD}
                </div>
                <PuzzleView />
                <button className='game-button' onClick={() => this.props.onInitGame(4)}>Restart 4x4</button>
                <button className='game-button' onClick={() => this.props.onInitGame(5)}>Restart 5x5</button>
                <button className='game-button' onClick={() => this.props.onInitGame(6)}>Restart 6x6</button>
                <button className='game-button' onClick={() => this.props.onInitGame(7)}>Restart 7x7</button>
            </div>
        );
    }
}

Game.propTypes = {
    gameComplete: PropTypes.bool,
    turnNo: PropTypes.number,
    onInitGame: PropTypes.func,
    numClicksWithinTurn: PropTypes.number
};

const mapStateToProps = state => {
    return {
        numClicksWithinTurn: state.numClicksWithinTurn,
        turnNo: state.turnNo,
        imageNumber: state.imageNumber,
        gameComplete: state.gameComplete,
        tiles: state.tiles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: id => {
            dispatch(selectTile(id));
        },
        onInitGame: size => {
            dispatch(initGame(Math.floor(Math.random() * NumImages) + 1, size));
            dispatch(shuffleTiles())
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
