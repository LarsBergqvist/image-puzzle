import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const GameStatus = props => {
    if (props.gameComplete) {
        return <div className='game-status'>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
        </div>
    } else {
        return <div className='game-status'>
            Turn: <b>{props.turnNo}</b>
            <div className='game-instructions'>
                {props.numClicksWithinTurn === 0 &&
                    <div>
                        Click on the tile that should be moved
                    </div>
                }
                {props.numClicksWithinTurn === 1 &&
                    <div>
                        Click on the tile that should be swapped with the first selected tile
                    </div>
                }
            </div>
        </div>
    }
}

GameStatus.propTypes = {
    gameComplete: PropTypes.bool,
    turnNo: PropTypes.number,
    numClicksWithinTurn: PropTypes.number
};

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        turnNo: state.turnNo,
        numClicksWithinTurn: state.numClicksWithinTurn
    }
}

const GameStatusView = connect(
    mapStateToProps
)(GameStatus)

export default GameStatusView;
