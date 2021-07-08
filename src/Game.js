import React, { Component } from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { selectTile, initGame, shuffleTiles } from './actions';
import GameStatusView from './GameStatusView';
import PuzzleView from './PuzzleView';
import { NumImages } from './constants';

class Game extends Component {
    render() {
        /*
        const blocks = this.props.tiles.sort((a, b) => a.pos > b.pos).map(c =>
            <TileView key={c.id}
                id={c.id} pos={c.pos} left={c.left} top={c.top} selected={c.selected}
                imageNumber={this.props.imageNumber}
                onClick={this.props.onTileClicked}
            />
        );
*/
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
                <button className='game-button' onClick={this.props.onInitGame}>Restart game</button>
            </div>
        );
    }
}

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
        onInitGame: numPairs => {
            dispatch(initGame(Math.floor(Math.random() * NumImages) + 1, 4));
            dispatch(shuffleTiles())
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
