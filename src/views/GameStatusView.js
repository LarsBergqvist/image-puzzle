import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import EnterNameView from './EnterNameView';
import LeaderBoardView from './LeaderBoardView';

const GameStatus = props => {
    if (props.gameComplete) {
        return <div className='game-status'>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
            {props.highScorePosition > 0 && !props.highScoreListSaved && (
                <EnterNameView />
            )}
            {props.highScorePosition > 0 && props.highScoreListSaved && (
                <LeaderBoardView
                    highScoreList={props.highScoreList}
                    userId={props.userId}
                />
            )}
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
    numClicksWithinTurn: PropTypes.number,
    highScorePosition: PropTypes.number,
    highScoreListSaved: PropTypes.bool,
    highScoreList: PropTypes.object,
    userId: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        turnNo: state.turnNo,
        numClicksWithinTurn: state.numClicksWithinTurn,
        highScoreList: state.highScoreList,
        highScorePosition: state.highScorePosition,
        highScoreListSaved: state.highScoreListSaved,
        userId: state.userId
    }
};

const GameStatusView = connect(
    mapStateToProps
)(GameStatus)

export default GameStatusView;
